'use client'

import { X, Trash2, Heart } from 'lucide-react'
import { useWishlistStore } from '../lib/wishlist'
import { Button } from './ui/button'
import Link from 'next/link'
import { useState, useEffect } from 'react'

interface WishlistPanelProps {
  onClose: () => void
}

export default function WishlistPanel({ onClose }: WishlistPanelProps) {
  const { items, remove } = useWishlistStore()
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-5 border-b border-gray-100">
        <h2 className="text-sm tracking-[0.15em] uppercase font-medium text-gray-900">Wishlist</h2>
        <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
          <X size={18} />
        </button>
      </div>

      {/* Items */}
      <div className="flex-1 overflow-y-auto p-5">
        {!isHydrated ? (
          <div className="text-center py-12">
            <p className="text-sm text-gray-400">Loading...</p>
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="w-10 h-10 text-gray-300 mx-auto mb-4" />
            <p className="text-sm font-medium text-gray-900 mb-1">Your wishlist is empty</p>
            <p className="text-xs text-gray-400 mb-6">Save items you love for later</p>
            <Button onClick={onClose} className="bg-brand-maroon hover:bg-brand-burgundy text-white text-xs tracking-wider uppercase">
              Continue Shopping
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.productId}
                className="flex items-start gap-3 pb-4 border-b border-gray-50"
              >
                {/* Image */}
                <Link
                  href={`/product/${item.slug}`}
                  onClick={onClose}
                  className="relative w-16 h-20 bg-gray-50 flex-shrink-0 overflow-hidden"
                >
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Heart className="w-5 h-5 text-gray-300" />
                    </div>
                  )}
                </Link>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <Link href={`/product/${item.slug}`} onClick={onClose}>
                    <h3 className="text-sm font-medium text-gray-900 truncate hover:text-brand-maroon transition-colors">
                      {item.name}
                    </h3>
                  </Link>
                  <p className="text-sm font-medium text-gray-900 mt-1.5">
                    &pound;{item.price.toFixed(2)}
                  </p>

                  <div className="flex items-center gap-3 mt-2">
                    <Link
                      href={`/product/${item.slug}`}
                      onClick={onClose}
                      className="text-[10px] tracking-wider uppercase text-brand-maroon hover:text-brand-burgundy transition-colors font-medium"
                    >
                      View Product
                    </Link>
                    <button
                      onClick={() => remove(item.productId)}
                      className="text-gray-300 hover:text-red-400 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      {isHydrated && items.length > 0 && (
        <div className="border-t border-gray-100 p-5 space-y-3">
          <p className="text-xs text-center text-gray-400">
            {items.length} item{items.length !== 1 ? 's' : ''} saved
          </p>
          <button
            onClick={onClose}
            className="w-full text-center text-xs text-gray-400 hover:text-gray-600 transition-colors py-1"
          >
            Continue Shopping
          </button>
        </div>
      )}
    </div>
  )
}
