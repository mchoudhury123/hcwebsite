'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

export default function JustLanded() {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left - Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="text-[11px] tracking-[0.25em] uppercase text-brand-maroon mb-3">
              New Arrivals
            </p>
            <h2 className="text-3xl sm:text-4xl font-serif text-gray-900 mb-5 leading-tight">
              Just Landed
            </h2>
            <p className="text-base text-gray-500 mb-8 leading-relaxed max-w-md">
              Discover the latest additions to our collection. Fresh designs crafted for everyday elegance and special occasions.
            </p>
            <Link href="/shop?collections=new-arrivals">
              <button className="btn-primary text-xs tracking-[0.15em] uppercase">
                Shop New Arrivals
              </button>
            </Link>
          </motion.div>

          {/* Right - Images */}
          <motion.div
            className="grid grid-cols-3 gap-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            viewport={{ once: true }}
          >
            {[
              { src: '/prestige.png', alt: 'New arrival abaya - Prestige' },
              { src: '/dignity.png', alt: 'New arrival abaya - Dignity' },
              { src: '/Fashion.png', alt: 'New arrival abaya - Fashion' },
            ].map((img, i) => (
              <Link key={i} href="/shop?collections=new-arrivals">
                <div className="relative aspect-[3/4] bg-gray-50 overflow-hidden">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 1024px) 33vw, 20vw"
                  />
                </div>
              </Link>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
