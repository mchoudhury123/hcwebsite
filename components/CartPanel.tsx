'use client'

import { X, Trash2, Minus, Plus, Loader2, ShoppingBag } from 'lucide-react'
import { useCartStore } from '../lib/cart'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import Link from 'next/link'
import { useState, useEffect } from 'react'

interface CartPanelProps {
  onClose: () => void
}

export default function CartPanel({ onClose }: CartPanelProps) {
  const { items, remove, updateQty, getTotal, clear } = useCartStore()
  const total = getTotal()
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  const handleUpdateQty = (productId: string, variantId: string, newQty: number) => {
    if (newQty <= 0) {
      remove(productId, variantId)
    } else {
      updateQty(productId, variantId, newQty)
    }
  }

  const handleCheckout = async () => {
    if (items.length === 0) return
    setIsCheckingOut(true)
    try {
      onClose()
      window.location.href = '/checkout'
    } catch (error) {
      console.error('Checkout error:', error)
    } finally {
      setIsCheckingOut(false)
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-5 border-b border-gray-100">
        <h2 className="text-sm tracking-[0.15em] uppercase font-medium text-gray-900">Cart</h2>
        <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
          <X size={18} />
        </button>
      </div>

      {/* Items */}
      <div className="flex-1 overflow-y-auto p-5">
        {!isHydrated ? (
          <div className="text-center py-12">
            <Loader2 className="w-6 h-6 animate-spin mx-auto mb-3 text-gray-400" />
            <p className="text-sm text-gray-400">Loading...</p>
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingBag className="w-10 h-10 text-gray-300 mx-auto mb-4" />
            <p className="text-sm font-medium text-gray-900 mb-1">Your cart is empty</p>
            <p className="text-xs text-gray-400 mb-6">Add items to get started</p>
            <Button onClick={onClose} className="bg-brand-maroon hover:bg-brand-burgundy text-white text-xs tracking-wider uppercase">
              Continue Shopping
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={`${item.productId}-${item.variantId}`}
                className="flex items-start gap-3 pb-4 border-b border-gray-50"
              >
                {/* Image */}
                <div className="relative w-16 h-20 bg-gray-50 flex-shrink-0 overflow-hidden">
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ShoppingBag className="w-5 h-5 text-gray-300" />
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-gray-900 truncate">{item.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    {item.size && (
                      <span className="text-[10px] text-gray-400 uppercase tracking-wider">
                        {item.size}
                      </span>
                    )}
                    {item.size && item.color && <span className="text-gray-200">|</span>}
                    {item.color && (
                      <span className="text-[10px] text-gray-400 capitalize tracking-wider">
                        {item.color}
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-medium text-gray-900 mt-1.5">
                    &pound;{item.price.toFixed(2)}
                  </p>

                  {/* Qty controls */}
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center border border-gray-200">
                      <button
                        onClick={() => handleUpdateQty(item.productId, item.variantId, item.qty - 1)}
                        className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="w-7 text-center text-xs font-medium">{item.qty}</span>
                      <button
                        onClick={() => handleUpdateQty(item.productId, item.variantId, item.qty + 1)}
                        className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                    <button
                      onClick={() => remove(item.productId, item.variantId)}
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
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Subtotal</span>
            <span className="text-base font-medium text-gray-900">&pound;{total.toFixed(2)}</span>
          </div>

          <Button
            onClick={handleCheckout}
            disabled={isCheckingOut}
            className="w-full bg-brand-maroon hover:bg-brand-burgundy text-white text-xs tracking-wider uppercase py-3 disabled:opacity-50"
          >
            {isCheckingOut ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                Processing...
              </span>
            ) : (
              'Checkout'
            )}
          </Button>

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
