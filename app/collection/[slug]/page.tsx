import { notFound } from 'next/navigation'
import { client } from '@/lib/sanity'
import { urlForHighQuality } from '@/lib/sanity.image'
import { SITE_URL, SITE_NAME } from '@/lib/seo'
import JsonLd from '@/components/JsonLd'
import CollectionClient from './CollectionClient'

interface CollectionPageProps {
  params: { slug: string }
}

export async function generateMetadata({ params }: CollectionPageProps) {
  const collection = await client.fetch(
    `*[_type == "collection" && slug.current == $slug][0] {
      title,
      description,
      heroImage
    }`,
    { slug: params.slug }
  )

  if (!collection) {
    return {
      title: 'Collection Not Found',
      description: 'The requested collection could not be found.',
      robots: { index: false, follow: false },
    }
  }

  const canonical = `/collection/${params.slug}`
  const description =
    collection.description?.slice(0, 160) ||
    `Explore our ${collection.title} collection of premium Abayas at ${SITE_NAME}.`

  let ogImage: string | undefined
  try {
    if (collection.heroImage?.asset) ogImage = urlForHighQuality(collection.heroImage)
  } catch {
    ogImage = undefined
  }

  return {
    title: collection.title,
    description,
    alternates: { canonical },
    openGraph: {
      type: 'website',
      title: `${collection.title} - ${SITE_NAME}`,
      description,
      url: `${SITE_URL}${canonical}`,
      images: ogImage ? [ogImage] : undefined,
    },
  }
}

export async function generateStaticParams() {
  const collections = await client.fetch(
    `*[_type == "collection"] {
      slug
    }`
  )

  return collections.map((collection: any) => ({
    slug: collection.slug.current,
  }))
}

// Revalidate every 60 seconds
export const revalidate = 60

export default async function CollectionPage({ params }: CollectionPageProps) {
  const collection = await client.fetch(
    `*[_type == "collection" && slug.current == $slug][0] {
      _id,
      title,
      description,
      heroImage,
      products[]->{
        _id,
        name,
        slug,
        price,
        compareAtPrice,
        images,
        badges,
        variants[]{
          _id,
          size,
          color,
          stock,
          isActive
        }
      }
    }`,
    { slug: params.slug }
  )

  if (!collection) {
    notFound()
  }

  const products = collection.products || []

  const canonical = `${SITE_URL}/collection/${params.slug}/`

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Shop', item: `${SITE_URL}/shop/` },
      { '@type': 'ListItem', position: 3, name: collection.title, item: canonical },
    ],
  }

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: collection.title,
    numberOfItems: products.length,
    itemListElement: products
      .filter((p: any) => p?.slug?.current)
      .map((p: any, i: number) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `${SITE_URL}/product/${p.slug.current}/`,
        name: p.name,
      })),
  }

  return (
    <>
      <JsonLd data={[breadcrumbSchema, itemListSchema]} />
      <CollectionClient collection={collection} products={products} />
    </>
  )
}
