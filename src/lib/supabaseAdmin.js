import { createClient } from '@supabase/supabase-js';

// Service-role client for the /api/admin/* route handlers. Server code only:
// never import this from a 'use client' file.
//
// SUPABASE_SERVICE_ROLE_KEY belongs in .env.local and nowhere else. The admin
// is localhost-only, so leaving the key out of Netlify means the deployed site
// cannot write to the database even if every other check failed.

let client;

export function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    const error = new Error('SUPABASE_SERVICE_ROLE_KEY is not set — add it to .env.local');
    error.status = 500;
    throw error;
  }
  if (!client) {
    client = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return client;
}
