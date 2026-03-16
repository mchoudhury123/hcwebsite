'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function PrivacyPage() {
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
            Privacy Policy
          </h1>
          <p className="text-sm text-gray-500 max-w-lg mx-auto">
            Your privacy is important to us. Learn how we collect, use, and protect your personal information.
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

        {/* Information We Collect */}
        <div className="mb-10">
          <h2 className="text-lg font-serif text-gray-900 mb-4">Information We Collect</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Personal Information</h3>
              <ul className="space-y-2 text-xs text-gray-500">
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 bg-brand-maroon rounded-full mt-1.5 flex-shrink-0"></span>
                  Name and contact details (email, phone, address)
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 bg-brand-maroon rounded-full mt-1.5 flex-shrink-0"></span>
                  Payment information (processed securely by Stripe)
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 bg-brand-maroon rounded-full mt-1.5 flex-shrink-0"></span>
                  Order history and preferences
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 bg-brand-maroon rounded-full mt-1.5 flex-shrink-0"></span>
                  Communication preferences
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Technical Information</h3>
              <ul className="space-y-2 text-xs text-gray-500">
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 bg-brand-maroon rounded-full mt-1.5 flex-shrink-0"></span>
                  Device information and IP address
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 bg-brand-maroon rounded-full mt-1.5 flex-shrink-0"></span>
                  Browser type and version
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 bg-brand-maroon rounded-full mt-1.5 flex-shrink-0"></span>
                  Pages visited and time spent
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 bg-brand-maroon rounded-full mt-1.5 flex-shrink-0"></span>
                  Cookies and similar technologies
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* How We Use Information */}
        <div className="mb-10">
          <h2 className="text-lg font-serif text-gray-900 mb-4">How We Use Your Information</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Order Processing</h3>
              <ul className="space-y-2 text-xs text-gray-500">
                <li>Process and fulfill your orders</li>
                <li>Send order confirmations and updates</li>
                <li>Handle returns and customer service</li>
                <li>Process payments securely</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Communication</h3>
              <ul className="space-y-2 text-xs text-gray-500">
                <li>Respond to your inquiries</li>
                <li>Send important service updates</li>
                <li>Provide customer support</li>
                <li>Send marketing communications (with consent)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Data Protection */}
        <div className="mb-10">
          <h2 className="text-lg font-serif text-gray-900 mb-4">How We Protect Your Data</h2>

          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-1.5">Security Measures</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                We implement industry-standard security measures including SSL encryption, secure payment processing,
                and regular security audits to protect your personal information.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-1.5">Data Retention</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                We retain your personal information only for as long as necessary to provide our services,
                comply with legal obligations, and resolve disputes.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-1.5">Third-Party Services</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                We use trusted third-party services like Stripe for payments and Sanity for content management.
                These services have their own privacy policies and security measures.
              </p>
            </div>
          </div>
        </div>

        {/* Your Rights */}
        <div className="mb-10">
          <h2 className="text-lg font-serif text-gray-900 mb-4">Your Rights</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Access & Control</h3>
              <ul className="space-y-2 text-xs text-gray-500">
                <li>Access your personal information</li>
                <li>Update or correct your data</li>
                <li>Request deletion of your data</li>
                <li>Opt-out of marketing communications</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Contact Us</h3>
              <p className="text-xs text-gray-500 mb-3">
                If you have any questions about this Privacy Policy or want to exercise your rights,
                please contact us.
              </p>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="border-t border-gray-100 pt-8 text-center">
          <p className="text-sm text-gray-500 mb-4">Questions about privacy?</p>
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
