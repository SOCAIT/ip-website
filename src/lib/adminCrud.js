import { NextResponse } from 'next/server';
import { adminRoute, httpError } from './adminGuard';
import { getSupabaseAdmin } from './supabaseAdmin';

// Server-side CRUD behind the localhost /admin. Every admin write goes through
// here with the service-role key, so the anon key shipped to browsers needs no
// write access to these tables.

// Markers the handwriting pipeline leaves for a human to resolve. An article
// still carrying one must not go live, whichever button publishes it.
const REVIEW_MARKERS = ['[unclear:', '[figure:'];

const TABLES = {
  articles: {
    fields: [
      'title', 'slug', 'excerpt', 'cover_image', 'author_name', 'author_avatar',
      'author_bio', 'blocks', 'published', 'category', 'date',
    ],
    guardPublish: true,
  },
  automations: {
    fields: [
      'title', 'slug', 'platform', 'description', 'trigger', 'output', 'tools',
      'workflow_json', 'cover_image', 'published', 'updated_at',
    ],
    guardPublish: false,
  },
};

async function readBody(request, fields) {
  let body;
  try {
    body = await request.json();
  } catch {
    throw httpError(400, 'Request body must be JSON');
  }
  const row = {};
  for (const field of fields) {
    if (body && Object.prototype.hasOwnProperty.call(body, field)) row[field] = body[field];
  }
  if (Object.keys(row).length === 0) throw httpError(400, 'No editable fields in request');
  return row;
}

function assertNoReviewMarkers(row) {
  const text = JSON.stringify([row.title, row.excerpt, row.blocks]);
  const found = REVIEW_MARKERS.filter((marker) => text.includes(marker));
  if (found.length > 0) {
    const listed = found.map((marker) => `${marker} …]`).join(' and ');
    throw httpError(422, `Resolve the ${listed} markers before publishing`);
  }
}

function unwrap({ data, error }) {
  if (error) throw httpError(error.code === 'PGRST116' ? 404 : 400, error.message);
  return data;
}

export function collectionRoutes(table) {
  const { fields, guardPublish } = TABLES[table];

  return {
    GET: adminRoute(async () => {
      const data = unwrap(
        await getSupabaseAdmin().from(table).select('*').order('created_at', { ascending: false })
      );
      return NextResponse.json(data);
    }),

    POST: adminRoute(async (request) => {
      const row = await readBody(request, fields);
      if (guardPublish && row.published !== false) assertNoReviewMarkers(row);
      const data = unwrap(await getSupabaseAdmin().from(table).insert([row]).select().single());
      return NextResponse.json(data, { status: 201 });
    }),
  };
}

export function itemRoutes(table) {
  const { fields, guardPublish } = TABLES[table];

  const getRow = async (id) =>
    unwrap(await getSupabaseAdmin().from(table).select('*').eq('id', id).single());

  return {
    GET: adminRoute(async (request, { params }) => {
      const { id } = await params;
      return NextResponse.json(await getRow(id));
    }),

    PATCH: adminRoute(async (request, { params }) => {
      const { id } = await params;
      const patch = await readBody(request, fields);
      if (guardPublish && patch.published === true) {
        assertNoReviewMarkers({ ...(await getRow(id)), ...patch });
      }
      const data = unwrap(
        await getSupabaseAdmin().from(table).update(patch).eq('id', id).select().single()
      );
      return NextResponse.json(data);
    }),

    DELETE: adminRoute(async (request, { params }) => {
      const { id } = await params;
      unwrap(await getSupabaseAdmin().from(table).delete().eq('id', id));
      return NextResponse.json({ ok: true });
    }),
  };
}
