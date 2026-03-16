'use client'

import { useState, useEffect } from 'react'
import { Check, Minus, Plus } from 'lucide-react'
import { useCartStore } from '@/lib/cart'
import { urlForProduct } from '@/lib/sanity.image'
import Link from 'next/link'

interface VariantSelectorProps {
  product: any
}

export default function VariantSelector({ product }: VariantSelectorProps) {
  const [selectedSize, setSelectedSize] = useState<string>('')
  const [selectedColor, setSelectedColor] = useState<string>('')
  const [selectedVariant, setSelectedVariant] = useState<any>(null)
  const [quantity, setQuantity] = useState(1)
  const [showAddedMessage, setShowAddedMessage] = useState(false)
  const { add, openCartPanel } = useCartStore()

  // Get unique sizes and colors from variants
  const sizes = Array.from(new Set(product.variants.map((v: any) => v.size)))
    .sort((a, b) => {
      const sizeOrder = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']
      const aIndex = sizeOrder.indexOf(a as string)
      const bIndex = sizeOrder.indexOf(b as string)
      if (aIndex === -1 && bIndex === -1) return (a as string).localeCompare(b as string)
      if (aIndex === -1) return 1
      if (bIndex === -1) return -1
      return aIndex - bIndex
    }) as string[]
  const colors = Array.from(new Set(product.variants.map((v: any) => v.color))).sort() as string[]

  // Find the specific variant when both size and color are selected
  const specificVariant = product.variants.find((v: any) =>
    v.size === selectedSize && v.color === selectedColor && v.isActive
  )

  // Update selected variant when size/color changes
  useEffect(() => {
    if (selectedSize && selectedColor) {
      setSelectedVariant(specificVariant)
    } else {
      setSelectedVariant(null)
    }
  }, [selectedSize, selectedColor, specificVariant])

  // Auto-select first available size/color
  useEffect(() => {
    if (sizes.length > 0 && !selectedSize) {
      setSelectedSize(sizes[0])
    }
    if (colors.length > 0 && !selectedColor) {
      setSelectedColor(colors[0])
    }
  }, [sizes, colors, selectedSize, selectedColor])

  const handleAddToCart = () => {
    if (!selectedVariant) return
    if (selectedVariant.stock <= 0) return

    add({
      productId: product._id,
      variantId: selectedVariant._id,
      name: product.name,
      price: selectedVariant.priceOverride || product.price,
      qty: quantity,
      image: product.images?.[0] ? urlForProduct(product.images[0]) : '',
      slug: product.slug.current,
      size: selectedVariant.size,
      color: selectedVariant.color,
      sku: selectedVariant.sku
    })

    openCartPanel()
    setShowAddedMessage(true)
    setTimeout(() => {
      setShowAddedMessage(false)
    }, 2000)
  }

  // Color hex mapping for swatches
  const getColorHex = (color: string): string => {
    const variant = product.variants.find((v: any) => v.color === color)
    if (variant?.hexCode) return variant.hexCode

    const colorMap: Record<string, string> = {
      'black': '#000000',
      'white': '#FFFFFF',
      'navy': '#1B2A4A',
      'brown': '#8B6F47',
      'beige': '#D4C5A9',
      'cream': '#F5F0E8',
      'grey': '#808080',
      'gray': '#808080',
      'maroon': '#800000',
      'burgundy': '#800020',
      'green': '#2D5A3D',
      'blue': '#2B4570',
      'pink': '#D4A0A0',
      'natural': '#D2C4B0',
      'khaki': '#C3B091',
      'olive': '#556B2F',
      'charcoal': '#36454F',
      'taupe': '#8B7D6B',
      'nude': '#E3C9A8',
      'purple': '#6B3A6B',
      'red': '#B22222',
      'gold': '#C9A84C',
      'silver': '#A8A8A8',
      'rose': '#C48B8B',
      'dusty pink': '#D4A0A0',
      'dusky pink': '#D4A0A0',
      'teal': '#2E6E6E',
    }
    return colorMap[color.toLowerCase()] || '#CCCCCC'
  }

  const isOutOfStock = selectedVariant && selectedVariant.stock === 0

  // Calculate free delivery threshold
  const freeDeliveryThreshold = 75
  const currentPrice = (selectedVariant?.priceOverride || product.price) * quantity
  const remainingForFreeDelivery = Math.max(0, freeDeliveryThreshold - currentPrice)
  const deliveryProgress = Math.min(100, (currentPrice / freeDeliveryThreshold) * 100)

  return (
    <div className="space-y-6">
      {/* Colour Selection */}
      {colors.length > 0 && (
        <div>
          <p className="text-sm text-gray-900 mb-3">
            Colour: <span className="capitalize">{selectedColor}</span>
          </p>
          <div className="flex items-center gap-2.5">
            {colors.map((color) => {
              const isAvailable = product.variants.some((v: any) =>
                v.color === color && v.isActive && v.stock > 0
              )
              const isSelected = selectedColor === color
              const hex = getColorHex(color)
              const isLight = ['white', 'cream', 'beige', 'natural', 'nude'].includes(color.toLowerCase())

              return (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  disabled={!isAvailable}
                  className={`relative w-8 h-8 rounded-full transition-all duration-200 ${
                    !isAvailable ? 'opacity-30 cursor-not-allowed' : ''
                  } ${
                    isSelected
                      ? 'ring-2 ring-offset-2 ring-brand-maroon'
                      : isLight ? 'ring-1 ring-gray-200' : ''
                  }`}
                  style={{ backgroundColor: hex }}
                  title={color}
                  aria-label={`Select colour ${color}`}
                />
              )
            })}
          </div>
        </div>
      )}

      {/* Size Selection */}
      {sizes.length > 0 && (
        <div>
          <p className="text-sm text-gray-900 mb-3">
            Length (Inches)
          </p>
          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => {
              const isAvailable = product.variants.some((v: any) =>
                v.size === size && v.isActive && v.stock > 0
              )
              const isSelected = selectedSize === size

              return (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  disabled={!isAvailable}
                  className={`min-w-[48px] h-10 px-3 border text-sm font-medium transition-all duration-200 ${
                    isSelected
                      ? 'bg-brand-maroon text-white border-brand-maroon'
                      : isAvailable
                      ? 'bg-white text-gray-700 border-gray-300 hover:border-brand-maroon'
                      : 'bg-gray-50 text-gray-300 border-gray-100 cursor-not-allowed line-through'
                  }`}
                >
                  {size}
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* Size Guide Link */}
      <Link
        href="/size-guide"
        className="inline-flex items-center gap-1.5 text-xs text-gray-500 underline underline-offset-2 hover:text-gray-900 transition-colors"
      >
        Size Guide
      </Link>

      {/* Quantity + Add to Bag */}
      <div className="flex items-center gap-3">
        {/* Quantity Selector */}
        <div className="flex items-center border border-gray-300 h-12">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-10 h-full flex items-center justify-center text-gray-500 hover:text-gray-900 transition-colors"
            disabled={quantity <= 1}
          >
            <Minus size={14} />
          </button>
          <span className="w-10 h-full flex items-center justify-center text-sm font-medium border-x border-gray-300">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity(Math.min(selectedVariant?.stock || 10, quantity + 1))}
            className="w-10 h-full flex items-center justify-center text-gray-500 hover:text-gray-900 transition-colors"
            disabled={quantity >= (selectedVariant?.stock || 10)}
          >
            <Plus size={14} />
          </button>
        </div>

        {/* Add to Bag Button */}
        {showAddedMessage ? (
          <button
            disabled
            className="flex-1 h-12 bg-green-700 text-white text-xs tracking-[0.2em] uppercase font-medium flex items-center justify-center gap-2"
          >
            <Check size={16} />
            Added to Bag
          </button>
        ) : (
          <button
            onClick={handleAddToCart}
            disabled={!selectedVariant || isOutOfStock}
            className="flex-1 h-12 bg-brand-maroon hover:bg-brand-burgundy text-white text-xs tracking-[0.2em] uppercase font-medium transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {isOutOfStock ? 'Out of Stock' : 'Add to Bag'}
          </button>
        )}
      </div>

      {/* Free Delivery Notice */}
      <div className="border border-gray-200 p-3.5">
        {remainingForFreeDelivery > 0 ? (
          <>
            <p className="text-xs text-gray-600 mb-2">
              Add <strong className="text-gray-900">&pound;{remainingForFreeDelivery.toFixed(2)}</strong> more to qualify for free delivery
            </p>
            <div className="w-full h-1 bg-gray-100 overflow-hidden">
              <div
                className="h-full bg-brand-maroon transition-all duration-300"
                style={{ width: `${deliveryProgress}%` }}
              />
            </div>
          </>
        ) : (
          <p className="text-xs text-green-700 font-medium">
            You qualify for free delivery!
          </p>
        )}
      </div>

      {/* Delivery Info */}
      <p className="text-xs text-gray-400">
        Estimated delivery: 2-3 weeks
      </p>
    </div>
  )
}
