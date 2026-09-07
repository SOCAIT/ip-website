# ipastellas.com

Personal site of Ioannis Pastellas — Next.js 15 (App Router), React 19, deployed on Netlify.

## Running locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm start          # serve the production build
npm run lint
```

## Environment variables

Set these in your local env file for development and in the Netlify UI for production.

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | yes | Articles + admin CMS |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | yes | Articles + admin CMS |
| `CONTACT_WEBHOOK_URL` | **yes, to receive messages** | Server-side endpoint the contact form posts to (n8n, Zapier, or anything that accepts a JSON POST). **Until this is set the form shows an error and points visitors at the mailto link — it never claims a message was sent.** |
| `CHAT_WEBHOOK_URL` | for the AI assistant | Upstream chat webhook, read server-side only. Falls back to `NEXT_PUBLIC_CHAT_WEBHOOK_URL` so nothing breaks before you rename it — do rename it, since the `NEXT_PUBLIC_` prefix used to publish the URL in the browser bundle. |
| `ADMIN_PASSWORD` | for `/admin` | Gates the CMS in production (which is also localhost-only via middleware). |
| `SITE_PASSWORD` | optional | Password-gates the whole site and sets `noindex`. |

## Content

- **Articles** live in Supabase and are edited at `/admin` (localhost only). The index at `/articles` is server-rendered so crawlers and link unfurlers see the posts.
- **Project case studies** live in `src/content/projects.js`. A project with a `blocks` array gets a page at `/portfolio/<slug>`, rendered by the same `<ArticleContent>` renderer the articles use. A project with only `externalLink` links straight out; one with neither renders as a non-interactive card.

## Social share image

`public/og-image.png` is generated, not hand-made. After changing the tagline or proof points:

```bash
python3 scripts/generate-og-image.py
```

## Images

`next.config.mjs` sets `images.unoptimized: true` — it was added to fix production 404s on Netlify. Heavy assets are therefore pre-sized WebP committed to `public/`: the hero is 190 KB at its original 1587×2245 dimensions, down from a 3.1 MB PNG. If you re-enable optimization, verify images on a Netlify deploy preview before merging.
