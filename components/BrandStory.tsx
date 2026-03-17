'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function BrandStory() {
  return (
    <section className="relative overflow-hidden min-h-[500px] lg:min-h-[600px]">
      {/* Full-width background image */}
      <Image
        src="/bottom.jpg"
        alt="Haybah Collections"
        fill
        className="object-cover object-left"
        sizes="100vw"
        quality={95}
        priority
      />

      {/* Gradient overlay - transparent on left (model visible), darkens toward right (text readable) */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#F5F0EB]/40 to-[#F5F0EB]/90 lg:to-[#F5F0EB]/95" />

      {/* Mobile overlay for text readability */}
      <div className="absolute inset-0 bg-[#F5F0EB]/60 lg:hidden" />

      {/* Content grid */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 min-h-[500px] lg:min-h-[600px]">
        {/* Left: Empty space to let the model show through */}
        <div className="hidden lg:block" />

        {/* Right: Brand Text */}
        <motion.div
          className="flex flex-col justify-center px-8 sm:px-12 lg:px-16 xl:px-20 py-16 lg:py-20"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <p className="text-xs tracking-[0.2em] uppercase text-[#C8A882] mb-4">
            The Art of Modern Elegance
          </p>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-brand-dark leading-tight mb-8">
            HAYBAH<br />
            <span className="font-light">COLLECTIONS</span>
          </h2>

          <div className="space-y-4 max-w-md">
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              <span className="font-semibold text-gray-900">It&apos;s more than clothing.</span> It&apos;s
              an expression of modern femininity in all its diversity. We don&apos;t just create wardrobe
              pieces — we craft instruments of self-expression for women who embrace both tradition
              and contemporary style.
            </p>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              Each abaya is thoughtfully designed with premium materials, celebrating the grace
              of Islamic heritage while embracing the elegance of modern fashion.
            </p>
          </div>

          <Link href="/shop" className="mt-8 inline-block">
            <motion.button
              className="group/btn flex items-center gap-3 px-8 sm:px-10 py-3.5 sm:py-4 bg-brand-dark text-white text-sm sm:text-base tracking-[0.2em] uppercase hover:bg-brand-maroon transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Shop Our Abayas
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
