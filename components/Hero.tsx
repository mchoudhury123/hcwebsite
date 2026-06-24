'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative min-h-[85vh] sm:min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/back.jpg)' }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Slogan words - staggered animation */}
        <div className="mb-8 sm:mb-10">
          <motion.p
            className="text-xs sm:text-sm tracking-[0.4em] uppercase text-white/60 mb-6 sm:mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Haybah Collections
          </motion.p>

          <div className="space-y-1 sm:space-y-2">
            <motion.span
              className="block text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-serif text-white tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              Prestige.
            </motion.span>
            <motion.span
              className="block text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-serif text-white/90 tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
            >
              Dignity.
            </motion.span>
            <motion.span
              className="block text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-serif italic text-[#C8A882] tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.8 }}
            >
              Fashion.
            </motion.span>
          </div>

          {/* Keyword-rich, crawlable H1 (one per page) */}
          <motion.h1
            className="mt-7 sm:mt-9 text-sm sm:text-lg md:text-xl font-serif tracking-[0.15em] uppercase text-white/85"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            Luxury Abayas, Arabic &amp; Islamic Dresses
          </motion.h1>
        </div>

        {/* CTA */}
        <motion.div
          className="flex flex-col items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
        >
          <Link href="/shop">
            <motion.button
              className="px-10 sm:px-14 py-3.5 sm:py-4 border-2 border-white text-white text-sm sm:text-base tracking-[0.25em] uppercase hover:bg-white hover:text-gray-900 transition-colors duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Shop Collection
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
