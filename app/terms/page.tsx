'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function TermsPage() {
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
            Terms of Service
          </h1>
          <p className="text-sm text-gray-500 max-w-lg mx-auto">
            Please read these terms carefully before using our website and services.
          </p>
        </div>
      </section>

      <div className="container-custom py-10 sm:py-14 max-w-3xl mx-auto">
        {/* Last Updated */}
        <div className="border-b border-gray-100 pb-6 mb-8">
          <p className="text-xs text-gray-400 tracking-wider uppercase">
            Last Updated: {new Date().toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })}
          </p>
        </div>

        {/* Acceptance of Terms */}
        <div className="mb-8">
          <h2 className="text-lg font-serif text-gray-900 mb-3">Acceptance of Terms</h2>
          <p className="text-xs text-gray-500 leading-relaxed">
            By accessing and using Haybah Collections website, you accept and agree to be bound by the terms
            and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
          </p>
        </div>

        {/* Products & Services */}
        <div className="mb-8">
          <h2 className="text-lg font-serif text-gray-900 mb-4">Products & Services</h2>

          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-1.5">Product Descriptions</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                We strive to provide accurate product descriptions and images. However, actual colors and details
                may vary slightly due to monitor settings and lighting conditions.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-1.5">Availability</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                All products are subject to availability. We reserve the right to discontinue any product at any time.
                If an item becomes unavailable after your order, we will notify you promptly.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-1.5">Pricing</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                All prices are in British Pounds (GBP) and include VAT where applicable.
                We reserve the right to modify prices at any time without prior notice.
              </p>
            </div>
          </div>
        </div>

        {/* Orders & Payment */}
        <div className="mb-8">
          <h2 className="text-lg font-serif text-gray-900 mb-4">Orders & Payment</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Order Process</h3>
              <ul className="space-y-2 text-xs text-gray-500">
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 bg-brand-maroon rounded-full mt-1.5 flex-shrink-0"></span>
                  Orders are confirmed via email
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 bg-brand-maroon rounded-full mt-1.5 flex-shrink-0"></span>
                  Payment is processed securely through Stripe
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 bg-brand-maroon rounded-full mt-1.5 flex-shrink-0"></span>
                  Orders are processed within 1-2 business days
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 bg-brand-maroon rounded-full mt-1.5 flex-shrink-0"></span>
                  Shipping confirmation sent upon dispatch
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Payment Methods</h3>
              <ul className="space-y-2 text-xs text-gray-500">
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 bg-brand-maroon rounded-full mt-1.5 flex-shrink-0"></span>
                  Credit/Debit cards (Visa, Mastercard, American Express)
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 bg-brand-maroon rounded-full mt-1.5 flex-shrink-0"></span>
                  Apple Pay and Google Pay
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 bg-brand-maroon rounded-full mt-1.5 flex-shrink-0"></span>
                  Secure payment processing via Stripe
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 bg-brand-maroon rounded-full mt-1.5 flex-shrink-0"></span>
                  All transactions are encrypted and secure
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* User Obligations */}
        <div className="mb-8">
          <h2 className="text-lg font-serif text-gray-900 mb-4">User Obligations</h2>

          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-1.5">Account Information</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                You are responsible for maintaining the confidentiality of your account information and for all
                activities that occur under your account. You must provide accurate and complete information.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-1.5">Prohibited Activities</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                You agree not to use our services for any unlawful purpose or to solicit others to perform
                unlawful acts. You must not violate any international, federal, or state regulations.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-1.5">Intellectual Property</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                All content on this website, including text, graphics, logos, and images, is the property of
                Haybah Collections and is protected by copyright laws.
              </p>
            </div>
          </div>
        </div>

        {/* Limitation of Liability */}
        <div className="mb-8">
          <h2 className="text-lg font-serif text-gray-900 mb-4">Limitation of Liability</h2>

          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-1.5">General Disclaimer</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Haybah Collections shall not be liable for any indirect, incidental, special, consequential,
                or punitive damages resulting from your use of our services.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-1.5">Maximum Liability</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Our total liability to you for any claims arising from the use of our services shall not exceed
                the amount you paid for the specific product or service in question.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-1.5">Force Majeure</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                We shall not be liable for any failure to perform due to circumstances beyond our reasonable
                control, including but not limited to natural disasters, government actions, or technical failures.
              </p>
            </div>
          </div>
        </div>

        {/* Changes to Terms */}
        <div className="mb-10">
          <h2 className="text-lg font-serif text-gray-900 mb-3">Changes to Terms</h2>
          <p className="text-xs text-gray-500 leading-relaxed">
            We reserve the right to modify these terms at any time. Changes will be effective immediately upon
            posting on our website. Your continued use of our services after any changes constitutes acceptance
            of the new terms.
          </p>
        </div>

        {/* Contact */}
        <div className="border-t border-gray-100 pt-8 text-center">
          <p className="text-sm text-gray-500 mb-4">Questions about our terms?</p>
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
