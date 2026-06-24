import type { Metadata } from 'next'
import './globals.css'
import { playfair, inter, notoNaskh, fontVariables } from './fonts'
import Header from '../components/Header'
import JsonLd from '../components/JsonLd'
import { Analytics } from "@vercel/analytics/next"
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, SITE_LOCALE, TWITTER_HANDLE } from '@/lib/seo'

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} - Luxury Abaya Designs`,
    template: `%s - ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: ['Abaya', 'Abayas UK', 'Modest Fashion', 'Islamic Clothing', 'Luxury Abaya', 'Muslim Women Fashion', SITE_NAME],
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
  },
  manifest: '/site.webmanifest',
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

// Site-wide structured data: identifies the brand (Organization) and enables
// the sitelinks search box (WebSite) in Google search results.
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/newlogo.svg`,
  description: SITE_DESCRIPTION,
  sameAs: [
    'https://www.instagram.com/haybahcollections',
  ],
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  publisher: { '@id': `${SITE_URL}/#organization` },
  inLanguage: 'en-GB',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${SITE_URL}/shop?search={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" dir="ltr" className={fontVariables}>
      <body className="antialiased">
        <JsonLd data={[organizationSchema, websiteSchema]} />
        <Header />
        {children}
        <Analytics />
      </body>
    </html>
  )
} 