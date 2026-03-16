'use client'

import ProductGallery from '@/components/ProductGallery'
import VariantSelector from '@/components/VariantSelector'
import RelatedProducts from '@/components/RelatedProducts'
import ReviewsDisplay from '@/components/ReviewsDisplay'
import ReviewForm from '@/components/ReviewForm'
import Link from 'next/link'

interface ProductClientProps {
  product: any
  relatedProducts: any[]
  discountPercentage: number
}

export default function ProductClient({ product, relatedProducts, discountPercentage }: ProductClientProps) {
  // Validate required product data
  if (!product || !product.name || !product.price) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center space-y-4 max-w-md mx-auto px-4">
          <h1 className="text-xl font-serif text-gray-900">Product Data Error</h1>
          <p className="text-sm text-gray-500">
            This product is missing required information.
          </p>
          <Link
            href="/"
            className="inline-block bg-brand-maroon hover:bg-brand-burgundy text-white text-xs tracking-[0.15em] uppercase px-6 py-3 transition-colors"
          >
            Return to Home
          </Link>
        </div>
      </div>
    )
  }

  const isOnSale = product.compareAtPrice && product.price && product.compareAtPrice > product.price
  const savings = isOnSale ? (product.compareAtPrice - product.price) : 0

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": product.name,
            "description": product.description,
            "image": product.images?.map((img: any) => img.asset?.url || img) || [],
            "offers": {
              "@type": "Offer",
              "price": product.price,
              "priceCurrency": "GBP",
              "availability": product.variants?.some((v: any) => v.stock > 0)
                ? "https://schema.org/InStock"
                : "https://schema.org/OutOfStock",
              "priceValidUntil": new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()
            },
            "brand": {
              "@type": "Brand",
              "name": "Haybah Collections"
            },
            "category": product.collections?.[0]?.title || "Abaya"
          })
        }}
      />

      <div className="min-h-screen bg-white">
        {/* Breadcrumb */}
        <div className="border-b border-gray-100">
          <div className="container-custom py-3">
            <nav className="text-xs text-gray-400">
              <Link href="/" className="hover:text-gray-600 transition-colors">Home</Link>
              <span className="mx-2">/</span>
              <Link href="/shop" className="hover:text-gray-600 transition-colors">Shop</Link>
              {product.collections?.[0]?.title && (
                <>
                  <span className="mx-2">/</span>
                  <span className="hover:text-gray-600">{product.collections[0].title}</span>
                </>
              )}
              <span className="mx-2">/</span>
              <span className="text-gray-600">{product.name}</span>
            </nav>
          </div>
        </div>

        {/* Product Section */}
        <div className="container-custom py-8 sm:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Product Gallery */}
            <ProductGallery images={product.images} name={product.name} />

            {/* Product Info */}
            <div className="space-y-5 lg:pt-2">
              {/* Product Title */}
              <h1 className="text-xl sm:text-2xl tracking-[0.1em] uppercase font-medium text-gray-900">
                {product.name}
              </h1>

              {/* Price */}
              <div className="flex items-center gap-3">
                <span className="text-lg font-medium text-gray-900">
                  &pound;{product.price.toFixed(2)}
                </span>
                {isOnSale && (
                  <>
                    <span className="text-sm text-gray-400 line-through">
                      &pound;{product.compareAtPrice.toFixed(2)}
                    </span>
                    <span className="text-xs font-semibold text-red-600 bg-red-50 px-2 py-0.5">
                      SAVE &pound;{savings.toFixed(2)}
                    </span>
                  </>
                )}
              </div>

              {/* Badges */}
              {product.badges && product.badges.length > 0 && (
                <div className="flex gap-2">
                  {product.badges.includes('new-arrival') && (
                    <span className="text-[10px] tracking-wider uppercase bg-gray-900 text-white px-2.5 py-1">
                      New
                    </span>
                  )}
                  {product.badges.includes('best-seller') && (
                    <span className="text-[10px] tracking-wider uppercase bg-brand-maroon text-white px-2.5 py-1">
                      Best Seller
                    </span>
                  )}
                </div>
              )}

              {/* Description */}
              {product.description && (
                <p className="text-sm text-gray-500 leading-relaxed">
                  {product.description}
                </p>
              )}

              {/* Variant Selector */}
              {product.variants && product.variants.length > 0 ? (
                <VariantSelector product={product} />
              ) : (
                <div className="border border-gray-100 p-4">
                  <p className="text-sm text-gray-500 text-center">Product variants will be available soon</p>
                </div>
              )}
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-16 sm:mt-20">
              <RelatedProducts products={relatedProducts} />
            </div>
          )}

          {/* Reviews Section */}
          <div className="mt-16 sm:mt-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <ReviewsDisplay
                productSlug={product.slug?.current || product.slug}
                onReviewSubmitted={() => {
                  window.location.reload()
                }}
              />
              <ReviewForm
                productId={product._id}
                productSlug={product.slug?.current || product.slug}
                productName={product.name}
                onSubmitSuccess={() => {
                  window.location.reload()
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
