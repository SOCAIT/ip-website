import { NextResponse } from 'next/server';

/**
 * Contact form endpoint.
 *
 * Before this existed, src/components/Info.js showed an `alert()` claiming the
 * message had been sent and then threw it away. Nothing here ever reports
 * success unless the message was actually handed off.
 *
 * Set CONTACT_WEBHOOK_URL (server-side, NOT NEXT_PUBLIC_) to any endpoint that
 * accepts a JSON POST — an n8n webhook, a Zapier catch hook, a Resend function.
 * While it is unset the route returns 503 and the form tells the visitor to
 * email directly instead of silently swallowing their message.
 */

export const runtime = 'nodejs';

const MAX_LENGTHS = { name: 120, email: 200, message: 5000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Small in-memory throttle. Serverless instances are short-lived, so this is a
// speed bump against casual abuse, not a real rate limiter.
const RATE_LIMIT = { windowMs: 60_000, max: 3 };
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
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  // Honeypot: a real person never fills a field they cannot see.
  if (body.company) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const name = String(body.name ?? '').trim();
  const email = String(body.email ?? '').trim();
  const message = String(body.message ?? '').trim();

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Name, email and message are all required.' }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: 'That email address does not look valid.' }, { status: 400 });
  }
  for (const [field, limit] of Object.entries(MAX_LENGTHS)) {
    if ({ name, email, message }[field].length > limit) {
      return NextResponse.json({ error: `Your ${field} is too long.` }, { status: 400 });
    }
  }

  const ip =
    request.headers.get('x-nf-client-connection-ip') ||
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    'unknown';
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'Too many messages in a short time. Please try again in a minute.' },
      { status: 429 },
    );
  }

  const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
  if (!webhookUrl) {
    console.error('CONTACT_WEBHOOK_URL is not set — contact form cannot deliver messages.');
    return NextResponse.json(
      { error: 'The contact form is not available right now.' },
      { status: 503 },
    );
  }

  try {
    const upstream = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        email,
        message,
        source: 'ipastellas.com/info',
        receivedAt: new Date().toISOString(),
      }),
      signal: AbortSignal.timeout(10_000),
    });

    if (!upstream.ok) {
      console.error('Contact webhook responded', upstream.status, await upstream.text());
      return NextResponse.json({ error: 'Could not deliver your message.' }, { status: 502 });
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.error('Contact webhook request failed:', error);
    return NextResponse.json({ error: 'Could not deliver your message.' }, { status: 502 });
  }
}
