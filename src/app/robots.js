export default function robots() {
  const baseUrl = 'https://www.ipastellas.com';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
      {
        userAgent: 'GPTBot', // OpenAI's crawler
        allow: '/',
        disallow: ['/admin/'],
      },
      {
        userAgent: 'ChatGPT-User',
        allow: '/',
        disallow: ['/admin/'],
      },
      {
        userAgent: 'Google-Extended', // Google's AI training crawler
        allow: '/',
        disallow: ['/admin/'],
      },
      {
        userAgent: 'anthropic-ai', // Anthropic's Claude crawler
        allow: '/',
        disallow: ['/admin/'],
      },
      {
        userAgent: 'Claude-Web', // Anthropic's web crawler
        allow: '/',
        disallow: ['/admin/'],
      },
      {
        userAgent: 'PerplexityBot', // Perplexity AI
        allow: '/',
        disallow: ['/admin/'],
      },
      {
        userAgent: 'Bytespider', // ByteDance (TikTok)
        allow: '/',
        disallow: ['/admin/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}

