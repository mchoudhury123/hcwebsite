'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState, useEffect } from 'react'

interface Review {
  id: number
  name: string
  rating: number
  review: string
  product: string
  date: string
  verified: boolean
}

interface SanityProduct {
  _id: string
  name: string
  slug: { current: string }
}

export default function Reviews() {
  const [currentPage, setCurrentPage] = useState(0)
  const [products, setProducts] = useState<SanityProduct[]>([])
  const reviewsPerPage = 3
  const totalPages = 2

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products')
        if (response.ok) {
          const data = await response.json()
          setProducts(data)
        }
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }
    fetchProducts()
  }, [])

  const reviews: Review[] = [
    {
      id: 1,
      name: "Fabiha",
      rating: 5,
      review: "Absolutely stunning! The embroidery is beautiful and the fabric feels so luxurious. Perfect fit and incredibly comfortable.",
      product: products[0]?.name || "",
      date: "2 weeks ago",
      verified: true
    },
    {
      id: 2,
      name: "Suha",
      rating: 5,
      review: "Love this abaya! The fabric is so soft and the cut is incredibly flattering. Perfect for everyday wear.",
      product: products[1]?.name || "",
      date: "1 month ago",
      verified: true
    },
    {
      id: 3,
      name: "Rumaisa",
      rating: 5,
      review: "Gorgeous design! The modern cut is perfect and the quality is outstanding. I feel so confident wearing it.",
      product: products[2]?.name || "",
      date: "3 weeks ago",
      verified: true
    },
    {
      id: 4,
      name: "Nilli",
      rating: 5,
      review: "Obsessed with this abaya! The fabric is divine and the beading is so delicate. Perfect for special occasions.",
      product: products[3]?.name || "",
      date: "1 week ago",
      verified: true
    },
    {
      id: 5,
      name: "Eshi",
      rating: 5,
      review: "Perfect for daily wear! So comfortable and breathable, yet still looks elegant. Great for the mosque and errands.",
      product: products[4]?.name || "",
      date: "2 months ago",
      verified: true
    },
    {
      id: 6,
      name: "Majeeda",
      rating: 5,
      review: "Exceptional craftsmanship! The attention to detail is remarkable. This has become my signature piece.",
      product: products[5]?.name || "",
      date: "3 weeks ago",
      verified: true
    }
  ]

  const currentReviews = reviews.slice(
    currentPage * reviewsPerPage,
    (currentPage + 1) * reviewsPerPage
  )

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="container-custom">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-[11px] tracking-[0.25em] uppercase text-brand-maroon mb-3">
            Testimonials
          </p>
          <h2 className="text-3xl sm:text-4xl font-serif text-gray-900">
            What Our Customers Say
          </h2>
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          {/* Navigation */}
          <button
            onClick={() => setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages)}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 sm:-translate-x-6 z-10 w-9 h-9 sm:w-10 sm:h-10 border border-gray-200 bg-white rounded-full flex items-center justify-center hover:border-brand-maroon hover:text-brand-maroon transition-colors"
            aria-label="Previous reviews"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            onClick={() => setCurrentPage((prev) => (prev + 1) % totalPages)}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-6 z-10 w-9 h-9 sm:w-10 sm:h-10 border border-gray-200 bg-white rounded-full flex items-center justify-center hover:border-brand-maroon hover:text-brand-maroon transition-colors"
            aria-label="Next reviews"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 px-6 sm:px-10">
            <AnimatePresence mode="wait">
              {currentReviews.map((review, index) => (
                <motion.div
                  key={`${currentPage}-${review.id}`}
                  className="border border-gray-100 p-5 sm:p-6 flex flex-col"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                >
                  {/* Rating */}
                  <div className="flex items-center gap-0.5 mb-3">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 text-brand-gold fill-current" />
                    ))}
                  </div>

                  {/* Review text */}
                  <p className="text-sm text-gray-600 leading-relaxed mb-5 flex-grow">
                    &ldquo;{review.review}&rdquo;
                  </p>

                  {/* Product name */}
                  {review.product && (
                    <p className="text-xs text-brand-maroon mb-3">
                      {review.product}
                    </p>
                  )}

                  {/* Customer info */}
                  <div className="mt-auto flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{review.name}</p>
                      <p className="text-xs text-gray-400">{review.date}</p>
                    </div>
                    {review.verified && (
                      <span className="text-[10px] tracking-wider uppercase text-gray-400 border border-gray-200 px-2 py-0.5">
                        Verified
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Page Indicators */}
          <div className="flex justify-center items-center gap-2 mt-8">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index)}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  index === currentPage ? 'bg-brand-maroon w-6' : 'bg-gray-300'
                }`}
                aria-label={`Go to page ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Rating summary */}
        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 text-brand-gold fill-current" />
              ))}
              <span className="ml-1 text-gray-700 font-medium">4.9</span>
            </div>
            <span className="text-gray-300">|</span>
            <span>Based on customer reviews</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
