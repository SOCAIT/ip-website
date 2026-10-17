import { NextResponse } from 'next/server';
import { adminRoute, httpError } from '@/lib/adminGuard';
import { getSupabaseAdmin } from '@/lib/supabaseAdmin';

export const dynamic = 'force-dynamic';

const BUCKET = 'article-images';
const MAX_BYTES = 20 * 1024 * 1024;

// No SVG: it can carry script.
const EXTENSIONS = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/webp': 'webp',
  'image/gif': 'gif',
  'image/avif': 'avif',
};

export const POST = adminRoute(async (request) => {
  const form = await request.formData();
  const file = form.get('file');
  if (!file || typeof file === 'string') throw httpError(400, 'No file provided');

  const ext = EXTENSIONS[file.type];
  if (!ext) throw httpError(415, `Unsupported image type: ${file.type || 'unknown'}`);
  if (file.size > MAX_BYTES) throw httpError(413, 'Image is larger than 20 MB');

  const folder = String(form.get('folder') || '').replace(/[^a-z0-9_-]/gi, '');
  const filePath = `${folder ? `${folder}/` : ''}${crypto.randomUUID()}.${ext}`;

  const storage = getSupabaseAdmin().storage.from(BUCKET);
  const { error } = await storage.upload(filePath, Buffer.from(await file.arrayBuffer()), {
    contentType: file.type,
    cacheControl: '3600',
    upsert: false,
  });
  if (error) throw httpError(400, error.message);

  const { data: { publicUrl } } = storage.getPublicUrl(filePath);
  return NextResponse.json({ url: publicUrl }, { status: 201 });
});

export const DELETE = adminRoute(async (request) => {
  const { url } = await request.json().catch(() => ({}));
  const marker = `/${BUCKET}/`;
  const filePath = typeof url === 'string' ? url.split(marker)[1] : '';
  if (!filePath || filePath.includes('..') || filePath.startsWith('/')) {
    throw httpError(400, 'Not an article-images URL');
  }

  const { error } = await getSupabaseAdmin().storage.from(BUCKET).remove([filePath]);
  if (error) throw httpError(400, error.message);
  return NextResponse.json({ ok: true });
});
