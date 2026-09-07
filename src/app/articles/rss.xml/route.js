import { createClient } from '@supabase/supabase-js';

const SITE_URL = 'https://www.ipastellas.com';

export const revalidate = 3600;

function escapeXml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  let articles = [];
  if (url && key) {
    try {
      const supabase = createClient(url, key);
      const { data, error } = await supabase
        .from('articles')
        .select('slug, title, excerpt, date, updated_at')
        .eq('published', true)
        .order('date', { ascending: false })
        .limit(50);
      if (!error && data) articles = data;
    } catch (error) {
      console.error('Error building RSS feed:', error);
    }
  }

  const items = articles
    .map((article) => {
      const link = `${SITE_URL}/articles/${article.slug}`;
      const pubDate = new Date(article.updated_at || article.date || Date.now()).toUTCString();
      return `    <item>
      <title>${escapeXml(article.title)}</title>
      <link>${escapeXml(link)}</link>
      <guid isPermaLink="true">${escapeXml(link)}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${escapeXml(article.excerpt || '')}</description>
    </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Ioannis Pastellas Articles</title>
    <link>${SITE_URL}/articles</link>
    <description>Writing on reinforcement learning, multi-agent systems, and applied ML.</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/articles/rss.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
