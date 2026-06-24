import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getProduct, getProductsByCollection, getProducts } from '@/app/lib/sanity.server'
import { urlForHighQuality } from '@/lib/sanity.image'
import { SITE_URL, SITE_NAME } from '@/lib/seo'
import JsonLd from '@/components/JsonLd'
import ProductClient from './ProductClient'

interface ProductPageProps {
  params: {
    slug: string
  }
}

// Build absolute, CDN-optimised image URLs for a product's images.
function productImageUrls(product: any): string[] {
  return (product.images || [])
    .filter((img: any) => img?.asset)
    .map((img: any) => {
      try {
        return urlForHighQuality(img)
      } catch {
        return null
      }
    })
    .filter(Boolean) as string[]
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  try {
    const product = await getProduct(params.slug)

    if (!product) {
      return {
        title: 'Product Not Found',
        description: 'The requested product could not be found.',
        robots: { index: false, follow: false },
      }
    }

    const canonical = `/product/${params.slug}`
    const description =
      product.description?.slice(0, 160) ||
      `Shop the ${product.name} from ${SITE_NAME} — premium, elegant modest fashion.`
    const images = productImageUrls(product)

    return {
      title: product.name,
      description,
      alternates: { canonical },
      openGraph: {
        type: 'website',
        title: `${product.name} - ${SITE_NAME}`,
        description,
        url: `${SITE_URL}${canonical}`,
        images: images.length ? images : undefined,
      },
      twitter: {
        card: 'summary_large_image',
        title: `${product.name} - ${SITE_NAME}`,
        description,
        images: images.length ? [images[0]] : undefined,
      },
    }
  } catch (error) {
    console.error('Error generating metadata:', error)
    return {
      title: 'Product',
      description: 'Product details',
    }
  }
}

export async function generateStaticParams() {
  try {
    const products = await getProducts()
    return products.map((product) => ({
      slug: product.slug.current,
    }))
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}

export const revalidate = 60

export default async function ProductPage({ params }: ProductPageProps) {
  try {
    console.log('=== PRODUCT PAGE DEBUG ===')
    console.log('Loading product with slug:', params.slug)
    
    // Test the query directly
    const product = await getProduct(params.slug)
    
    console.log('Raw product data:', product)
    console.log('Product type:', typeof product)
    console.log('Product keys:', product ? Object.keys(product) : 'No product')
    
    if (!product) {
      console.log('Product not found, redirecting to not-found')
      notFound()
    }

    // Filter out images without a valid asset reference
    product.images = product.images?.filter((img: any) => img.asset) || []

    console.log('Product loaded successfully:', {
      name: product.name,
      variants: product.variants?.length || 0,
      images: product.images?.length || 0,
      price: product.price,
      isActive: product.isActive
    })

    // Ensure variants exist and are properly loaded
    if (!product.variants || product.variants.length === 0) {
      console.warn(`Product ${product.name} has no variants loaded`)
    }

    // Get related products from the same collection
    let relatedProducts: any[] = []
    try {
      relatedProducts = await getProductsByCollection(
        product.collections?.[0]?.slug?.current || '',
        3,
        product._id
      )
      console.log('Related products loaded:', relatedProducts.length)
    } catch (error: any) {
      console.warn('Failed to load related products:', error)
    }

    // Calculate discount percentage
    const discountPercentage = product.compareAtPrice && product.price
      ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
      : 0

    console.log('Rendering ProductClient with:', {
      productName: product.name,
      variantsCount: product.variants?.length || 0,
      relatedProductsCount: relatedProducts.length,
      discountPercentage
    })

    // --- Structured data (schema.org) -------------------------------------
    const canonical = `${SITE_URL}/product/${params.slug}/`
    const images = productImageUrls(product)
    const inStock = (product.variants || []).some((v: any) => (v?.stock ?? 0) > 0)
    const collection = product.collections?.[0]

    const productSchema = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.name,
      description: product.description || `${product.name} from ${SITE_NAME}.`,
      ...(images.length ? { image: images } : {}),
      sku: product.variants?.[0]?.sku || product._id,
      brand: { '@type': 'Brand', name: SITE_NAME },
      offers: {
        '@type': 'Offer',
        url: canonical,
        priceCurrency: 'GBP',
        price: Number(product.price || 0).toFixed(2),
        availability: inStock
          ? 'https://schema.org/InStock'
          : 'https://schema.org/OutOfStock',
        itemCondition: 'https://schema.org/NewCondition',
        seller: { '@type': 'Organization', name: SITE_NAME },
      },
    }

    const breadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'Shop', item: `${SITE_URL}/shop/` },
        ...(collection?.slug?.current
          ? [{
              '@type': 'ListItem',
              position: 3,
              name: collection.title,
              item: `${SITE_URL}/collection/${collection.slug.current}/`,
            }]
          : []),
        {
          '@type': 'ListItem',
          position: collection?.slug?.current ? 4 : 3,
          name: product.name,
          item: canonical,
        },
      ],
    }

    return (
      <>
        <JsonLd data={[productSchema, breadcrumbSchema]} />
        <ProductClient
          product={product}
          relatedProducts={relatedProducts}
          discountPercentage={discountPercentage}
        />
      </>
    )
  } catch (error: any) {
    console.error('=== CRITICAL ERROR IN PRODUCT PAGE ===')
    console.error('Error loading product:', error)
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      params: params
    })
    
    // Return a simple error page instead of notFound() to see what's happening
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center space-y-4 max-w-md mx-auto px-4">
          <h1 className="text-xl font-serif text-gray-900">Error Loading Product</h1>
          <p className="text-sm text-gray-500">
            There was an error loading this product. Please try again.
          </p>
          <a
            href="/"
            className="inline-block bg-brand-maroon hover:bg-brand-burgundy text-white text-xs tracking-[0.15em] uppercase px-6 py-3 transition-colors"
          >
            Return to Home
          </a>
        </div>
      </div>
    )
  }
}
