'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { SanityProduct, getAllProducts } from '../lib/sanity.queries'
import { urlForProduct } from '../lib/sanity.image'

interface ProductGridSanityProps {
  onAddToCart: (product: any) => void
}

export default function ProductGridSanity({ onAddToCart }: ProductGridSanityProps) {
  const [products, setProducts] = useState<SanityProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await getAllProducts()
        setProducts(fetchedProducts)
      } catch (err) {
        setError('Failed to fetch products')
        console.error('Error fetching products:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (loading) {
    return (
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-maroon mx-auto"></div>
            <p className="mt-4 text-gray-500">Loading products...</p>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center">
            <p className="text-red-500">{error}</p>
            <p className="text-gray-500 mt-2">Please check your Sanity configuration</p>
          </div>
        </div>
      </section>
    )
  }

  if (products.length === 0) {
    return (
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center">
            <h2 className="text-3xl lg:text-4xl font-serif text-brand-maroon mb-4">
              NO PRODUCTS YET
            </h2>
            <p className="text-base text-gray-500 max-w-2xl mx-auto mb-8">
              Head to your Sanity Studio to add your first products!
            </p>
            <a
              href="/studio"
              className="btn-primary inline-block"
            >
              Go to Studio
            </a>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl lg:text-4xl font-serif text-brand-maroon mb-3">
            FEATURED ABAYAS
          </h2>
          <p className="text-base text-gray-500 max-w-2xl mx-auto">
            Discover our most beloved pieces, crafted with premium materials and timeless elegance.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product, index) => {
            const isOnSale = product.compareAtPrice && product.compareAtPrice > product.price
            const savings = isOnSale ? (product.compareAtPrice! - product.price) : 0

            return (
              <motion.div
                key={product._id}
                className="group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                viewport={{ once: true }}
              >
                <Link href={`/product/${product.slug?.current || '#'}`} className="block">
                  {/* Product Image */}
                  <div className="relative aspect-[3/4] bg-gray-50 overflow-hidden mb-3">
                    {/* Badges */}
                    <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1.5">
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

                    {/* Product Image */}
                    {product.images && product.images.length > 0 ? (
                      <Image
                        src={urlForProduct(product.images[0])}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                        sizes="(max-width: 768px) 50vw, 25vw"
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
                  <h3 className="text-xs sm:text-sm font-medium tracking-wide uppercase text-gray-900 group-hover:text-brand-maroon transition-colors duration-200 line-clamp-2">
                    {product.name}
                  </h3>

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
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
