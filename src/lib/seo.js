/**
 * Shared metadata builders.
 *
 * Next.js replaces the `openGraph` object wholesale when a child route declares
 * one — it does not merge field-by-field. Every page that sets `openGraph` must
 * therefore restate `images`, `siteName` and `locale` or they disappear from the
 * rendered head. These helpers exist so that can't happen again.
 */

export const SITE_URL = 'https://www.ipastellas.com';
export const SITE_NAME = 'Ioannis Pastellas';

export const OG_IMAGE = {
  url: '/og-image.png',
  width: 1200,
  height: 630,
  alt: 'Ioannis Pastellas, Machine Learning Engineer',
  type: 'image/png',
};

/** Build a complete Open Graph object. Always includes an image. */
export function buildOpenGraph({
  title,
  description,
  path = '',
  type = 'website',
  images = [OG_IMAGE],
  ...rest
}) {
  return {
    type,
    locale: 'en_US',
    alternateLocale: ['el_GR'],
    siteName: SITE_NAME,
    url: `${SITE_URL}${path}`,
    title,
    description,
    images,
    ...rest,
  };
}

/** Build a complete Twitter card object. Always includes an image. */
export function buildTwitter({ title, description, images = [`${SITE_URL}/og-image.png`] }) {
  return {
    card: 'summary_large_image',
    title,
    description,
    images,
  };
}
