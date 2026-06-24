// Central SEO configuration — single source of truth for the canonical domain,
// brand name and structured-data helpers used across the site.
//
// NOTE: next.config.js permanently redirects the bare domain to the www host,
// so the canonical URL MUST use www to avoid canonicals that point at a redirect.

export const SITE_URL = 'https://www.haybahcollections.co.uk'
export const SITE_NAME = 'Haybah Collections'
export const SITE_DESCRIPTION =
  'Discover our exclusive collection of premium Abayas, crafted with elegance and sophistication. Luxury modest fashion for the modern Muslim woman.'
export const SITE_LOCALE = 'en_GB'
export const TWITTER_HANDLE = '@haybahcollections'

/** Build an absolute URL from a site-relative path. */
export function absoluteUrl(path: string = '/'): string {
  if (/^https?:\/\//i.test(path)) return path
  return `${SITE_URL}${path.startsWith('/') ? '' : '/'}${path}`
}

// Default Open Graph image used when a page does not supply its own.
// TODO: replace with a purpose-built 1200x630 share image (e.g. /og-image.jpg)
// for richer social previews; currently falls back to the brand logo.
export const DEFAULT_OG_IMAGE = {
  url: '/newlogo.png',
  alt: `${SITE_NAME} - Luxury Abaya Designs`,
}
