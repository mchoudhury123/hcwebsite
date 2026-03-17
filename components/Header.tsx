'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Menu, X, ShoppingBag, Heart } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useCartStore } from '../lib/cart'
import { useWishlistStore } from '../lib/wishlist'
import CartPanel from './CartPanel'
import WishlistPanel from './WishlistPanel'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isWishlistOpen, setIsWishlistOpen] = useState(false)
  const [isHydrated, setIsHydrated] = useState(false)
  const { items, getItemCount } = useCartStore()
  const { getCount: getWishlistCount } = useWishlistStore()
  const itemCount = getItemCount()
  const wishlistCount = getWishlistCount()

  // Ensure hydration is complete before rendering cart state
  useEffect(() => {
    setIsHydrated(true)
  }, [])

  // Listen for cart and wishlist panel open events
  useEffect(() => {
    const handleOpenCart = () => setIsCartOpen(true)
    const handleOpenWishlist = () => setIsWishlistOpen(true)

    window.addEventListener('openCartPanel', handleOpenCart)
    window.addEventListener('openWishlistPanel', handleOpenWishlist)

    return () => {
      window.removeEventListener('openCartPanel', handleOpenCart)
      window.removeEventListener('openWishlistPanel', handleOpenWishlist)
    }
  }, [])

  return (
    <header className="sticky top-0 z-50 shadow-elegant" style={{ backgroundColor: '#EDE8E1' }}>
      <div className="container-custom">
        <div className="grid grid-cols-3 items-center h-16 sm:h-20">
          {/* Left side - Navigation (Desktop) & Menu Button (Mobile) */}
          <div className="flex items-center justify-start">
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-6 lg:space-x-8">
              <motion.a
                href="/"
                className="text-brand-dark hover:text-brand-maroon transition-colors font-medium text-sm lg:text-base"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Home
              </motion.a>

              <motion.a
                href="/shop"
                className="text-brand-dark hover:text-brand-maroon transition-colors font-medium text-sm lg:text-base"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Shop
              </motion.a>
              <motion.a
                href="/about"
                className="text-brand-dark hover:text-brand-maroon transition-colors font-medium text-sm lg:text-base"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                About
              </motion.a>
              <motion.a
                href="/contact"
                className="text-brand-dark hover:text-brand-maroon transition-colors font-medium text-sm lg:text-base"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Contact
              </motion.a>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-brand-dark hover:text-brand-maroon transition-colors"
            >
              {isMenuOpen ? <X size={20} className="sm:w-6 sm:h-6" /> : <Menu size={20} className="sm:w-6 sm:h-6" />}
            </button>
          </div>

          {/* Center - Logo */}
          <motion.div
            className="flex items-center justify-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <a href="/" className="flex items-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/newlogo.svg"
                alt="Haybah Collections"
                className="h-10 sm:h-12 w-auto"
              />
            </a>
          </motion.div>

          {/* Right side - Wishlist & Cart Icons */}
          <motion.div
            className="flex items-center justify-end gap-1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <button
              onClick={() => setIsWishlistOpen(!isWishlistOpen)}
              className="relative p-2 text-brand-dark hover:text-brand-maroon transition-colors"
            >
              <Heart size={20} className="sm:w-6 sm:h-6" />
              {isHydrated && wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-gold text-white text-xs rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center font-bold">
                  {wishlistCount > 99 ? '99+' : wishlistCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setIsCartOpen(!isCartOpen)}
              className="relative p-2 text-brand-dark hover:text-brand-maroon transition-colors"
            >
              <ShoppingBag size={20} className="sm:w-6 sm:h-6" />
              {isHydrated && itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-gold text-white text-xs rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center font-bold">
                  {itemCount > 99 ? '99+' : itemCount}
                </span>
              )}
            </button>
          </motion.div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            className="lg:hidden border-t border-[#DDD8D1]"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="py-3 sm:py-4 space-y-2 sm:space-y-3">
              <a
                href="/"
                className="block py-2 text-brand-dark hover:text-brand-maroon transition-colors font-medium text-sm sm:text-base"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </a>

              <a
                href="/shop"
                className="block py-2 text-brand-dark hover:text-brand-maroon transition-colors font-medium text-sm sm:text-base"
                onClick={() => setIsMenuOpen(false)}
              >
                Shop
              </a>
              <a
                href="/about"
                className="block py-2 text-brand-dark hover:text-brand-maroon transition-colors font-medium text-sm sm:text-base"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </a>
              <a
                href="/contact"
                className="block py-2 text-brand-dark hover:text-brand-maroon transition-colors font-medium text-sm sm:text-base"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </a>
            </nav>
          </motion.div>
        )}

        {/* Cart Slide-in Panel */}
        {isCartOpen && (
          <motion.div
            className="fixed inset-0 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setIsCartOpen(false)}
            />
            <motion.div
              className="absolute right-0 top-0 h-full w-full max-w-sm sm:max-w-md bg-white shadow-2xl"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <CartPanel onClose={() => setIsCartOpen(false)} />
            </motion.div>
          </motion.div>
        )}

        {/* Wishlist Slide-in Panel */}
        {isWishlistOpen && (
          <motion.div
            className="fixed inset-0 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setIsWishlistOpen(false)}
            />
            <motion.div
              className="absolute right-0 top-0 h-full w-full max-w-sm sm:max-w-md bg-white shadow-2xl"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <WishlistPanel onClose={() => setIsWishlistOpen(false)} />
            </motion.div>
          </motion.div>
        )}
      </div>
    </header>
  )
}
