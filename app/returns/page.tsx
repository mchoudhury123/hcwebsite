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
          <p className="text-sm text-gray-500 max-w-lg mx-auto">
            We want you to love your Haybah Collections pieces. Here&rsquo;s our hassle-free returns policy.
          </p>
        </div>
      </section>

      <div className="container-custom py-10 sm:py-14 max-w-3xl mx-auto">
        {/* Return Policy Overview */}
        <div className="border border-gray-100 p-6 mb-8">
          <h2 className="text-lg font-serif text-gray-900 mb-2">30-Day Return Policy</h2>
          <p className="text-sm text-gray-500 leading-relaxed">
            We offer a <strong className="text-gray-700">30-day return policy</strong> from the date of delivery.
            Items must be in their original condition with tags attached and in original packaging.
          </p>
        </div>

        {/* What Can/Cannot Be Returned */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <div className="border border-gray-100 p-5">
            <h3 className="text-sm font-medium text-gray-900 mb-4">Returnable Items</h3>
            <ul className="space-y-2.5 text-xs text-gray-500">
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 bg-green-500 rounded-full mt-1.5 flex-shrink-0"></span>
                Unworn abayas with original tags
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 bg-green-500 rounded-full mt-1.5 flex-shrink-0"></span>
                Items in original packaging
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 bg-green-500 rounded-full mt-1.5 flex-shrink-0"></span>
                Accessories (scarves, belts) in new condition
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 bg-green-500 rounded-full mt-1.5 flex-shrink-0"></span>
                Items purchased within the last 30 days
              </li>
            </ul>
          </div>

          <div className="border border-gray-100 p-5">
            <h3 className="text-sm font-medium text-gray-900 mb-4">Non-Returnable Items</h3>
            <ul className="space-y-2.5 text-xs text-gray-500">
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 bg-red-400 rounded-full mt-1.5 flex-shrink-0"></span>
                Worn or altered items
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 bg-red-400 rounded-full mt-1.5 flex-shrink-0"></span>
                Items without original tags
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 bg-red-400 rounded-full mt-1.5 flex-shrink-0"></span>
                Custom or personalized items
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 bg-red-400 rounded-full mt-1.5 flex-shrink-0"></span>
                Items purchased over 30 days ago
              </li>
            </ul>
          </div>
        </div>

        {/* Return Process */}
        <div className="mb-10">
          <h2 className="text-lg font-serif text-gray-900 mb-6">How to Return an Item</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-8 h-8 bg-gray-900 text-white text-xs font-medium flex items-center justify-center mx-auto mb-3">
                1
              </div>
              <h4 className="text-sm font-medium text-gray-900 mb-1">Contact Us</h4>
              <p className="text-xs text-gray-500">
                Email us with your order number and reason for return
              </p>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 bg-gray-900 text-white text-xs font-medium flex items-center justify-center mx-auto mb-3">
                2
              </div>
              <h4 className="text-sm font-medium text-gray-900 mb-1">Package Item</h4>
              <p className="text-xs text-gray-500">
                Pack the item in original packaging with tags attached
              </p>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 bg-gray-900 text-white text-xs font-medium flex items-center justify-center mx-auto mb-3">
                3
              </div>
              <h4 className="text-sm font-medium text-gray-900 mb-1">Send Back</h4>
              <p className="text-xs text-gray-500">
                Use our prepaid return label and drop off at any post office
              </p>
            </div>
          </div>
        </div>

        {/* Refund Information */}
        <div className="mb-10">
          <h2 className="text-lg font-serif text-gray-900 mb-4">Refund Information</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Processing Time</h3>
              <ul className="space-y-2 text-xs text-gray-500">
                <li>Refunds processed within 3-5 business days</li>
                <li>Bank processing may take additional 3-7 days</li>
                <li>Email confirmation sent when refund is processed</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Refund Method</h3>
              <ul className="space-y-2 text-xs text-gray-500">
                <li>Refunded to original payment method</li>
                <li>Store credit available upon request</li>
                <li>Original shipping costs not refunded (unless our error)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="border-t border-gray-100 pt-8 text-center">
          <p className="text-sm text-gray-500 mb-4">Need to start a return?</p>
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
