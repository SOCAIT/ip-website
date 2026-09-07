import { NextResponse } from 'next/server';

/**
 * Server-side proxy for the chat assistant.
 *
 * The n8n webhook used to be read from NEXT_PUBLIC_CHAT_WEBHOOK_URL inside the
 * chat component, which meant Next inlined the full URL into the public client
 * bundle — anyone could POST to it directly and burn the LLM quota behind it.
 * The client now talks to this route and the URL never leaves the server.
 *
 * Prefer CHAT_WEBHOOK_URL; the NEXT_PUBLIC_ name is still read so the assistant
 * keeps working before the environment variable is renamed.
 */

export const runtime = 'nodejs';

const MAX_MESSAGE_LENGTH = 2000;
const RATE_LIMIT = { windowMs: 60_000, max: 12 };
const hits = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const bucket = (hits.get(ip) || []).filter((t) => now - t < RATE_LIMIT.windowMs);
  bucket.push(now);
  hits.set(ip, bucket);
  if (hits.size > 500) {
    for (const [key, times] of hits) {
      if (!times.some((t) => now - t < RATE_LIMIT.windowMs)) hits.delete(key);
    }
  }
  return bucket.length > RATE_LIMIT.max;
}

export async function POST(request) {
  const webhookUrl = process.env.CHAT_WEBHOOK_URL || process.env.NEXT_PUBLIC_CHAT_WEBHOOK_URL;
  if (!webhookUrl) {
    return NextResponse.json(
      { error: 'The assistant is not configured. Set CHAT_WEBHOOK_URL.' },
      { status: 503 },
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const chatInput = String(body.chatInput ?? '').trim();
  const sessionId = String(body.sessionId ?? '').slice(0, 100);

  if (!chatInput) {
    return NextResponse.json({ error: 'Message is empty.' }, { status: 400 });
  }
  if (chatInput.length > MAX_MESSAGE_LENGTH) {
    return NextResponse.json({ error: 'That message is too long.' }, { status: 400 });
  }

  const ip =
    request.headers.get('x-nf-client-connection-ip') ||
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    'unknown';
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'Too many messages in a short time. Wait a minute and try again.' },
      { status: 429 },
    );
  }

  try {
    const upstream = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chatInput, sessionId }),
      signal: AbortSignal.timeout(60_000),
    });

    const contentType = upstream.headers.get('content-type') || '';
    const raw = contentType.includes('application/json')
      ? await upstream.json()
      : await upstream.text();

    if (!upstream.ok) {
      console.error('Chat webhook responded', upstream.status, raw);
      return NextResponse.json({ error: 'The assistant is unavailable right now.' }, { status: 502 });
    }

    // n8n returns the answer under a few different keys depending on the node.
    let output = '';
    if (typeof raw === 'string') output = raw;
    else if (raw && typeof raw === 'object') {
      const candidate = raw.output ?? raw.message ?? raw.text;
      output = typeof candidate === 'string' ? candidate : JSON.stringify(raw);
    } else {
      output = String(raw);
    }

    return NextResponse.json({ output }, { status: 200 });
  } catch (error) {
    console.error('Chat webhook request failed:', error);
    return NextResponse.json({ error: 'The assistant is unavailable right now.' }, { status: 502 });
  }
}
