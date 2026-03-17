'use client'

import { motion } from 'framer-motion'
import { useState, useMemo, useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { urlForProduct } from '../lib/sanity.image'
import { SanityProductWithVariants } from '../app/lib/sanity.server'
import { useCartStore } from '../lib/cart'
import QuickAddButton from './QuickAddButton'
import ProductRating from './ProductRating'
import WishlistButton from './WishlistButton'

interface Collection {
  _id: string
  title: string
  slug: { current: string }
}

interface ProductGridProps {
  products: SanityProductWithVariants[]
  title?: string
  subtitle?: string
  showCartButton?: boolean
  collections?: Collection[]
  showTabs?: boolean
}

export default function ProductGrid({
  products,
  title = "FEATURED ABAYAS",
  subtitle = "Discover our most beloved pieces, crafted with premium materials and timeless elegance.",
  showCartButton = true,
  collections = [],
  showTabs = false,
}: ProductGridProps) {
  const { add, isInCart } = useCartStore()
  const [activeTab, setActiveTab] = useState('all')
  const scrollRef = useRef<HTMLDivElement>(null)

  const filteredProducts = useMemo(() => {
    if (activeTab === 'all') return products
    return products.filter((product) =>
      product.collections?.some((c: any) => c.slug?.current === activeTab)
    )
  }, [activeTab, products])

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return
    const cardWidth = scrollRef.current.firstElementChild?.clientWidth || 250
    const gap = 20
    const scrollAmount = cardWidth + gap
    scrollRef.current.scrollBy({
      left: direction === 'right' ? scrollAmount : -scrollAmount,
      behavior: 'smooth',
    })
  }

  if (!products || products.length === 0) {
    return (
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center">
            <h2 className="text-4xl lg:text-5xl font-serif text-brand-maroon mb-4">
              NO PRODUCTS YET
            </h2>
            <p className="text-lg text-brand-dark max-w-2xl mx-auto mb-8">
              Head to your Sanity Studio to add your first products!
            </p>
            <a href="/studio" className="btn-primary inline-block">Go to Studio</a>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        {/* Header with title and tabs */}
        {showTabs && collections.length > 0 ? (
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-10">
            <div>
              <h2 className="text-3xl lg:text-4xl font-serif text-brand-maroon">
                {title}
              </h2>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-4 py-2 text-xs tracking-[0.15em] uppercase border transition-colors ${
                  activeTab === 'all'
                    ? 'border-brand-maroon text-brand-maroon bg-brand-maroon/5'
                    : 'border-gray-200 text-gray-500 hover:border-gray-400'
                }`}
              >
                All
              </button>
              {collections.map((collection) => (
                <button
                  key={collection._id}
                  onClick={() => setActiveTab(collection.slug.current)}
                  className={`px-4 py-2 text-xs tracking-[0.15em] uppercase border transition-colors ${
                    activeTab === collection.slug.current
                      ? 'border-brand-maroon text-brand-maroon bg-brand-maroon/5'
                      : 'border-gray-200 text-gray-500 hover:border-gray-400'
                  }`}
                >
                  {collection.title}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-serif text-brand-maroon mb-3">
              {title}
            </h2>
            <p className="text-base text-gray-500 max-w-2xl mx-auto">
              {subtitle}
            </p>
          </motion.div>
        )}

        {/* Scroll arrows */}
        {filteredProducts.length > 5 && (
          <div className="hidden lg:flex justify-end gap-2 mb-4">
            <button
              onClick={() => scroll('left')}
              className="w-9 h-9 border border-gray-200 flex items-center justify-center text-gray-500 hover:border-brand-maroon hover:text-brand-maroon transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-9 h-9 border border-gray-200 flex items-center justify-center text-gray-500 hover:border-brand-maroon hover:text-brand-maroon transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        <div
          ref={scrollRef}
          className="flex gap-4 md:gap-5 overflow-x-auto scrollbar-hide pb-2 snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {filteredProducts.map((product, index) => {
            const hasStock = product.variants && product.variants.length > 0 && product.variants.some(v => v.stock > 0 && v.isActive)
            const isOnSale = product.compareAtPrice && product.compareAtPrice > product.price
            const savings = isOnSale ? (product.compareAtPrice! - product.price) : 0

            return (
              <motion.div
                key={product._id}
                className="group flex-shrink-0 w-[45%] sm:w-[40%] md:w-[30%] lg:w-[calc((100%-80px)/5)] snap-start"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: Math.min(index * 0.06, 0.3) }}
                viewport={{ once: true }}
              >
                {/* Product Image Container */}
                <Link href={`/product/${product.slug.current}`} className="block">
                  <div className="relative aspect-[3/4] bg-gray-50 overflow-hidden mb-3">
                    {/* Badges */}
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
                    <WishlistButton product={product} imageUrl={product.images?.[0] ? urlForProduct(product.images[0]) : ''} />

                    {/* Quick Add Overlay Button */}
                    {showCartButton && hasStock && (
                      <div className="absolute bottom-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <QuickAddButton product={product} variant="overlay" />
                      </div>
                    )}

                    {/* Product Image */}
                    {product.images && product.images.length > 0 ? (
                      <Image
                        src={urlForProduct(product.images[0])}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                        quality={90}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-100">
                        <p className="text-gray-400 text-sm">No image</p>
                      </div>
                    )}
                  </div>
                </Link>

                {/* Product Info */}
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
                          &pound;{product.compareAtPrice!.toFixed(2)}
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
      </div>
    </section>
  )
}
