'use client'

import { Heart } from 'lucide-react'
import { useWishlistStore } from '../lib/wishlist'
import { useState, useEffect } from 'react'

interface WishlistButtonProps {
  product: {
    _id: string
    name: string
    slug: { current: string }
    price: number
    images?: any[]
  }
  imageUrl?: string
}

export default function WishlistButton({ product, imageUrl }: WishlistButtonProps) {
  const { toggle, isInWishlist } = useWishlistStore()
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setHydrated(true)
  }, [])

  const inWishlist = hydrated && isInWishlist(product._id)

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggle({
      productId: product._id,
      name: product.name,
      slug: product.slug.current,
      price: product.price,
      image: imageUrl || '',
    })
  }

  return (
    <button
      onClick={handleClick}
      className="absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-full bg-white/90 shadow-sm flex items-center justify-center hover:bg-white transition-colors"
      aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
    >
      <Heart
        className={`w-4 h-4 transition-colors ${
          inWishlist
            ? 'fill-red-500 text-red-500'
            : 'text-gray-400 hover:text-gray-600'
        }`}
      />
    </button>
  )
}
