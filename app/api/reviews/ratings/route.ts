import { NextResponse } from 'next/server'
import { createClient } from '@sanity/client'

const sanityClient = createClient({
  projectId: 'gnppn7qx',
  dataset: 'production',
  apiVersion: '2024-07-01',
  token: 'skzWsjcPZ6bouozWpiRdUEnOhlCD4xyXy0nqUPaj3ga83uK8TInGYDpu3bHLHoR2DoAxxzdpELy8CU1P2qMzICr2N2MuyNsyoGNiGMYBliutJcfP6M61s2qHhY4ML01Nzl2A9amEiF0MWZah2pLpyDRkzo5nWQMz5292pHff0HKYYkHiI8F5',
  useCdn: false,
})

export async function GET() {
  try {
    const reviews = await sanityClient.fetch(`
      *[_type == "review" && status == "approved"] {
        productSlug,
        rating
      }
    `)

    // Group by productSlug and calculate averages
    const ratings: Record<string, { average: number; count: number }> = {}

    for (const review of reviews) {
      const slug = review.productSlug
      if (!slug) continue

      if (!ratings[slug]) {
        ratings[slug] = { average: 0, count: 0 }
      }
      ratings[slug].count += 1
      ratings[slug].average += review.rating
    }

    // Calculate averages
    for (const slug in ratings) {
      ratings[slug].average = Math.round((ratings[slug].average / ratings[slug].count) * 10) / 10
    }

    const response = NextResponse.json(ratings)
    response.headers.set('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=120')
    return response
  } catch (error) {
    console.error('Error fetching ratings:', error)
    return NextResponse.json({}, { status: 500 })
  }
}
