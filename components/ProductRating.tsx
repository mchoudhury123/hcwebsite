'use client'

import { Star } from 'lucide-react'
import { useState, useEffect } from 'react'

interface RatingsData {
  [slug: string]: { average: number; count: number }
}

let cachedRatings: RatingsData | null = null
let fetchPromise: Promise<RatingsData> | null = null

async function fetchRatings(): Promise<RatingsData> {
  if (cachedRatings) return cachedRatings
  if (fetchPromise) return fetchPromise

  fetchPromise = fetch('/api/reviews/ratings')
    .then((res) => res.json())
    .then((data) => {
      cachedRatings = data
      return data
    })
    .catch(() => {
      fetchPromise = null
      return {}
    })

  return fetchPromise
}

interface ProductRatingProps {
  slug: string
}

export default function ProductRating({ slug }: ProductRatingProps) {
  const [rating, setRating] = useState<{ average: number; count: number } | null>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    fetchRatings().then((data) => {
      setRating(data[slug] || null)
      setLoaded(true)
    })
  }, [slug])

  if (!loaded) return null

  if (!rating || rating.count === 0) {
    return (
      <p className="text-[10px] sm:text-xs text-gray-400 mt-0.5">No reviews</p>
    )
  }

  return (
    <div className="flex items-center gap-1 mt-0.5">
      <div className="flex items-center">
        {Array.from({ length: 5 }, (_, i) => {
          const filled = i + 1 <= Math.round(rating.average)
          return (
            <Star
              key={i}
              className={`w-3 h-3 ${
                filled
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-gray-300'
              }`}
            />
          )
        })}
      </div>
      <span className="text-[10px] sm:text-xs text-gray-400">({rating.count})</span>
    </div>
  )
}
