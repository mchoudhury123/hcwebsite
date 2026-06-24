import { Metadata } from 'next'
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, SITE_LOCALE, TWITTER_HANDLE } from '@/lib/seo'

export const siteConfig = {
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  ogImage: '/newlogo.png',
  twitterImage: '/newlogo.png',
  keywords: ['Abaya', 'Abayas UK', 'Modest Fashion', 'Islamic Clothing', 'Luxury Abaya', 'Muslim Women Fashion'],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  metadataBase: new URL(SITE_URL),
  openGraph: {
    type: 'website',
    locale: SITE_LOCALE,
    url: SITE_URL,
    title: `${SITE_NAME} - Luxury Abaya Designs`,
    description: SITE_DESCRIPTION,
    siteName: SITE_NAME,
    images: [
      {
        url: '/newlogo.png',
        alt: `${SITE_NAME} - Luxury Abaya Designs`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} - Luxury Abaya Designs`,
    description: SITE_DESCRIPTION,
    images: ['/newlogo.png'],
    creator: TWITTER_HANDLE,
    site: TWITTER_HANDLE,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export function constructMetadata({
  title,
  description,
  image,
  canonical,
  noIndex,
}: {
  title?: string
  description?: string
  image?: string
  /** Site-relative path (e.g. "/shop") used as the canonical URL for the page. */
  canonical?: string
  noIndex?: boolean
} = {}): Metadata {
  return {
    title: title || siteConfig.name,
    description: description || siteConfig.description,
    keywords: siteConfig.keywords,
    authors: siteConfig.authors,
    creator: siteConfig.creator,
    ...(canonical ? { alternates: { canonical } } : {}),
    openGraph: {
      ...siteConfig.openGraph,
      ...(canonical ? { url: canonical } : {}),
      title: title
        ? `${title} - ${siteConfig.name}`
        : siteConfig.openGraph.title,
      description: description || siteConfig.openGraph.description,
      images: image
        ? [
            {
              url: image,
              width: 1200,
              height: 630,
              alt: title || siteConfig.openGraph.title,
            },
          ]
        : siteConfig.openGraph.images,
    },
    twitter: {
      ...siteConfig.twitter,
      title: title
        ? `${title} - ${siteConfig.name}`
        : siteConfig.twitter.title,
      description: description || siteConfig.twitter.description,
      images: image ? [image] : siteConfig.twitter.images,
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}
