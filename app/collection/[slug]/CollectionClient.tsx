'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import QuickAddButton from '@/components/QuickAddButton'
import { urlForImage } from '@/lib/sanity.image'
import ProductRating from '@/components/ProductRating'
import WishlistButton from '@/components/WishlistButton'

interface CollectionClientProps {
  collection: any
  products: any[]
}

export default function CollectionClient({ collection, products }: CollectionClientProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-16 sm:py-20 bg-gray-950">
        {collection.heroImage && (
          <div className="absolute inset-0">
            <Image
              src={urlForImage(collection.heroImage, 1200, 600)}
              alt={`${collection.title} collection`}
              fill
              className="object-cover opacity-25"
              sizes="100vw"
              priority
            />
          </div>
        )}
        <div className="relative z-10 container-custom text-center">
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl font-serif text-white mb-3"
          >
            {collection.title}
          </motion.h1>
          {collection.description && (
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-sm text-white/70 max-w-lg mx-auto"
            >
              {collection.description}
            </motion.p>
          )}
        </div>
      </section>

      {/* Products */}
      <section className="py-10 sm:py-14">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-sm text-gray-500">
                {products.length} product{products.length !== 1 ? 's' : ''}
              </p>
            </div>
            <Link href="/shop" className="text-xs tracking-wider uppercase text-gray-400 hover:text-brand-maroon transition-colors">
              View All &rarr;
            </Link>
          </div>

          {products.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-sm text-gray-500 mb-4">This collection is currently empty.</p>
              <Button asChild className="bg-brand-maroon hover:bg-brand-burgundy text-white text-xs tracking-wider uppercase">
                <Link href="/shop">Browse All Products</Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {products.map((product: any, index: number) => {
                const hasStock = product.variants?.some((v: any) => v.stock > 0 && v.isActive)
                const isOnSale = product.compareAtPrice && product.compareAtPrice > product.price
                const savings = isOnSale ? (product.compareAtPrice - product.price) : 0

                return (
                  <motion.div
                    key={product._id}
                    className="group"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.4) }}
                  >
                    <Link href={`/product/${product.slug.current}`} className="block">
                      <div className="relative aspect-[3/4] bg-gray-50 overflow-hidden mb-3">
                        <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1.5">
                          {!hasStock && (
                            <span className="bg-yellow-400 text-gray-900 text-[10px] sm:text-xs font-semibold px-2 py-1 tracking-wide">
                              Out of stock
                            </span>
                          )}
                          {isOnSale && (
                            <span className="bg-red-500 text-white text-[10px] sm:text-xs font-bold px-2 py-1 tracking-wide">
                              SAVE&pound;{savings.toFixed(2)}
                            </span>
                          )}
                          {product.badges && product.badges.includes('new-arrival') && (
                            <span className="bg-black text-white text-[10px] sm:text-xs font-semibold px-2 py-1 tracking-wide">
                              NEW
                            </span>
                          )}
                        </div>

                        {/* Wishlist Button */}
                        <WishlistButton product={product} imageUrl={product.images?.[0] ? urlForImage(product.images[0]) : ''} />

                        {hasStock && (
                          <div className="absolute bottom-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <QuickAddButton product={product} variant="overlay" />
                          </div>
                        )}

                        {product.images && product.images.length > 0 ? (
                          <Image
                            src={urlForImage(product.images[0])}
                            alt={`${product.name} - ${product.collections?.[0]?.title || 'Abaya'}`}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                            sizes="(max-width: 768px) 50vw, 25vw"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-100">
                            <p className="text-gray-400 text-sm">No image</p>
                          </div>
                        )}
                      </div>
                    </Link>

                    <div className="space-y-1.5">
                      <Link href={`/product/${product.slug.current}`}>
                        <h3 className="text-xs sm:text-sm font-medium tracking-wide uppercase text-gray-900 group-hover:text-brand-maroon transition-colors duration-200 line-clamp-2">
                          {product.name}
                        </h3>
                      </Link>

                      <div className="flex items-center gap-2">
                        {isOnSale ? (
                          <>
                            <span className="text-sm sm:text-base font-semibold text-red-600">
                              &pound;{product.price.toFixed(2)}
                            </span>
                            <span className="text-xs sm:text-sm text-gray-400 line-through">
                              &pound;{product.compareAtPrice.toFixed(2)}
                            </span>
                          </>
                        ) : (
                          <span className="text-sm sm:text-base font-semibold text-gray-900">
                            &pound;{product.price.toFixed(2)}
                          </span>
                        )}
                      </div>

                      <ProductRating slug={product.slug.current} />
                    </div>
                  </motion.div>
                )
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
