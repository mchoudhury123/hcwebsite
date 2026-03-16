'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function ShippingPage() {
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
            Shipping Information
          </h1>
          <p className="text-sm text-gray-500 max-w-lg mx-auto">
            Everything you need to know about our shipping policies and delivery options
          </p>
        </div>
      </section>

      <div className="container-custom py-10 sm:py-14 max-w-3xl mx-auto">
        {/* Shipping Options */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <div className="border border-gray-100 p-5">
            <h2 className="text-sm font-medium tracking-wide uppercase text-gray-900 mb-4">UK Delivery</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Standard UK Delivery (2-3 weeks)</span>
                <span className="font-medium text-gray-900">&pound;4.99</span>
              </div>
              <div className="bg-brand-muted p-3">
                <p className="text-xs text-gray-500">
                  <strong className="text-gray-700">Please note:</strong> All UK orders currently have a delivery time of 2-3 weeks due to high demand.
                </p>
              </div>
              <div className="border-t border-gray-100 pt-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-brand-maroon font-medium">Free delivery on orders over &pound;75</span>
                  <span className="text-brand-maroon font-medium">FREE</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border border-gray-100 p-5">
            <h2 className="text-sm font-medium tracking-wide uppercase text-gray-900 mb-4">International</h2>
            <div className="space-y-3">
              <div className="bg-gray-50 p-3 border border-gray-100">
                <p className="text-sm font-medium text-gray-700 mb-1">
                  We currently do not ship internationally
                </p>
                <p className="text-xs text-gray-500">
                  International shipping is planned for the future. We&rsquo;re working on expanding our delivery services.
                </p>
              </div>
              <p className="text-xs text-gray-400">
                Sign up for our newsletter to be notified when international shipping becomes available.
              </p>
            </div>
          </div>
        </div>

        {/* Processing & Packaging */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <div className="border border-gray-100 p-5">
            <h2 className="text-sm font-medium tracking-wide uppercase text-gray-900 mb-4">Processing Time</h2>
            <div className="space-y-3 text-xs text-gray-500 leading-relaxed">
              <p>
                All orders have an estimated delivery time of <strong className="text-gray-700">2-3 weeks</strong>.
              </p>
              <p>
                Orders placed after 2 PM on Friday will be processed on the following Monday.
              </p>
              <p>
                During peak seasons (Eid, Ramadan), processing may take additional time.
              </p>
            </div>
          </div>

          <div className="border border-gray-100 p-5">
            <h2 className="text-sm font-medium tracking-wide uppercase text-gray-900 mb-4">Packaging</h2>
            <div className="space-y-3 text-xs text-gray-500 leading-relaxed">
              <p>
                All items are carefully packaged in our signature Haybah Collections packaging.
              </p>
              <p>
                Delicate items like chiffon abayas are wrapped in tissue paper for extra protection.
              </p>
              <p>
                We use eco-friendly packaging materials wherever possible.
              </p>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="border-t border-gray-100 pt-8 text-center">
          <p className="text-sm text-gray-500 mb-4">Need help with your order?</p>
          <Link
            href="/contact"
            className="inline-block bg-brand-maroon hover:bg-brand-burgundy text-white text-xs tracking-[0.15em] uppercase px-6 py-3 transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  )
}
