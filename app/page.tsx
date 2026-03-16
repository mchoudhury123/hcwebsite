import { Suspense } from 'react'
import { getFeaturedProducts, getRevalidateTime } from './lib/sanity.server'
import { urlForProduct } from '../lib/sanity.image'

import Hero from '../components/Hero'
import JustLanded from '../components/JustLanded'
import Collections from '../components/Collections'
import ProductGrid from '../components/ProductGrid'
import Reviews from '../components/Reviews'
import Footer from '../components/Footer'

// ISR: Revalidate every 10 seconds for testing
export const revalidate = 10

// Generate metadata
export async function generateMetadata() {
  return {
    title: 'Haybah Collections - Luxury Abayas & Islamic Fashion',
    description: 'Discover our exclusive collection of premium Abayas, crafted with elegance and sophistication. From classic designs to modern fashion statements.',
    keywords: 'Abaya, Islamic Fashion, Modest Fashion, Luxury Abayas, Haybah Collections',
  }
}

// Server-side data fetching
async function getHomePageData() {
  try {
    const featuredProducts = await getFeaturedProducts()
    return { featuredProducts }
  } catch (error) {
    console.error('Error fetching home page data:', error)
    return { featuredProducts: [] }
  }
}

// Loading component for Suspense
function ProductGridSkeleton() {
  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="text-center mb-10">
          <div className="h-8 bg-gray-100 rounded animate-pulse mx-auto w-48 mb-3"></div>
          <div className="h-4 bg-gray-100 rounded animate-pulse mx-auto w-72"></div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-7xl mx-auto">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-[3/4] bg-gray-100 mb-3"></div>
              <div className="h-3 bg-gray-100 rounded mb-2 w-3/4"></div>
              <div className="h-4 bg-gray-100 rounded w-1/3"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default async function HomePage() {
  const { featuredProducts } = await getHomePageData()

  return (
    <main className="min-h-screen">
      <Hero />

      {/* Delivery Notice */}
      <div className="border-b border-gray-100 py-2.5 text-center bg-white">
        <p className="text-xs sm:text-sm text-gray-500">
          <span className="font-medium text-gray-700">Delivery:</span> 2-3 weeks due to high demand. Thank you for your patience.
        </p>
      </div>

      <JustLanded />
      <Collections />

      <Suspense fallback={<ProductGridSkeleton />}>
        <ProductGrid
          products={featuredProducts}
          title="Featured"
          subtitle="Our most beloved pieces, crafted with premium materials."
          showCartButton={false}
        />
      </Suspense>

      <Reviews />

      <Footer />
    </main>
  )
}
