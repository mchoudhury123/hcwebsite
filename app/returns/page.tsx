'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="border-b border-gray-100 py-12 sm:py-16">
        <div className="container-custom text-center">
          <Link
            href="/"
            className="inline-flex items-center text-xs tracking-wider uppercase text-gray-400 hover:text-brand-maroon transition-colors mb-6"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-1.5" />
            Back to Home
          </Link>

          <h1 className="text-3xl sm:text-4xl font-serif text-gray-900 mb-3">
            Returns & Exchanges
          </h1>
        </div>
      </section>

      <div className="container-custom py-10 sm:py-14 max-w-3xl mx-auto">
        <div className="border border-gray-100 p-6 mb-8">
          <h2 className="text-lg font-serif text-gray-900 mb-2">No Returns or Exchanges</h2>
          <p className="text-sm text-gray-500 leading-relaxed">
            We are not currently accepting refunds. There are <strong className="text-gray-700">no returns or exchanges due to shipping from the UAE.</strong>
          </p>
        </div>

        {/* Contact */}
        <div className="border-t border-gray-100 pt-8 text-center">
          <p className="text-sm text-gray-500 mb-4">Have a question about your order?</p>
          <Link
            href="/contact"
            className="inline-block bg-brand-maroon hover:bg-brand-burgundy text-white text-xs tracking-[0.15em] uppercase px-6 py-3 transition-colors"
          >
            Contact Customer Service
          </Link>
        </div>
      </div>
    </div>
  )
}
