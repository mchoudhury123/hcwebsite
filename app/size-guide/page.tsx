'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function SizeGuidePage() {
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
            Size Guide
          </h1>
          <p className="text-sm text-gray-500 max-w-lg mx-auto">
            Find your perfect fit with our comprehensive sizing guide
          </p>
        </div>
      </section>

      <div className="container-custom py-10 sm:py-14 max-w-3xl mx-auto">
        {/* Size Chart */}
        <div className="mb-10">
          <h2 className="text-lg font-serif text-gray-900 mb-4">Abaya Size Chart</h2>

          <div className="overflow-x-auto border border-gray-100">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left py-3 px-4 font-medium text-gray-900 tracking-wide uppercase">Size</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 tracking-wide uppercase">UK Size</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 tracking-wide uppercase">Height</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 tracking-wide uppercase">Bust (in)</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 tracking-wide uppercase">Length (in)</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 tracking-wide uppercase">Sleeve (in)</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { size: '50', uk: '6-8', height: '5\'0"', bust: '34-36', length: '54', sleeve: '24' },
                  { size: '52', uk: '10-12', height: '5\'2"', bust: '38-40', length: '55', sleeve: '24.5' },
                  { size: '54', uk: '14-16', height: '5\'4"', bust: '42-44', length: '56', sleeve: '25' },
                  { size: '56', uk: '18-20', height: '5\'6"', bust: '46-48', length: '57', sleeve: '25.5' },
                  { size: '58', uk: '22-24', height: '5\'8"', bust: '50-52', length: '58', sleeve: '26' },
                  { size: '60', uk: '26-28', height: '6\'0"', bust: '54-56', length: '59', sleeve: '26.5' },
                ].map((row) => (
                  <tr key={row.size} className="border-b border-gray-50 hover:bg-gray-50/50">
                    <td className="py-2.5 px-4 font-medium text-brand-maroon">{row.size}</td>
                    <td className="py-2.5 px-4 text-gray-500">{row.uk}</td>
                    <td className="py-2.5 px-4 text-gray-500">{row.height}</td>
                    <td className="py-2.5 px-4 text-gray-500">{row.bust}</td>
                    <td className="py-2.5 px-4 text-gray-500">{row.length}</td>
                    <td className="py-2.5 px-4 text-gray-500">{row.sleeve}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* How to Measure */}
        <div className="mb-10">
          <h2 className="text-lg font-serif text-gray-900 mb-4">How to Measure</h2>

          <div className="grid md:grid-cols-3 gap-5">
            <div className="border border-gray-100 p-5">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Bust Measurement</h3>
              <p className="text-xs text-gray-500 leading-relaxed mb-3">
                Measure around the fullest part of your bust, keeping the tape measure parallel to the floor.
              </p>
              <p className="text-[10px] text-brand-maroon tracking-wider uppercase">
                Tip: Wear a well-fitted bra when measuring
              </p>
            </div>

            <div className="border border-gray-100 p-5">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Length Preference</h3>
              <p className="text-xs text-gray-500 leading-relaxed mb-3">
                Our abayas are designed to fall to ankle length. Consider your height when choosing a size.
              </p>
              <p className="text-[10px] text-brand-maroon tracking-wider uppercase">
                Tip: Most customers prefer 2-3 inches above the floor
              </p>
            </div>

            <div className="border border-gray-100 p-5">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Fit Preference</h3>
              <p className="text-xs text-gray-500 leading-relaxed mb-3">
                Abayas are designed for a modest, comfortable fit with room for movement.
              </p>
              <p className="text-[10px] text-brand-maroon tracking-wider uppercase">
                Tip: When in doubt, size up for comfort
              </p>
            </div>
          </div>
        </div>

        {/* Fit Guide */}
        <div className="grid md:grid-cols-2 gap-5 mb-10">
          <div className="border border-gray-100 p-5">
            <h3 className="text-sm font-medium text-gray-900 mb-4">Different Body Types</h3>
            <div className="space-y-3">
              <div>
                <h4 className="text-xs font-medium text-gray-700">Petite (5&rsquo;0&rdquo; - 5&rsquo;2&rdquo;)</h4>
                <p className="text-xs text-gray-500">Sizes 50-52 for proportional length</p>
              </div>
              <div>
                <h4 className="text-xs font-medium text-gray-700">Average (5&rsquo;4&rdquo; - 5&rsquo;6&rdquo;)</h4>
                <p className="text-xs text-gray-500">Sizes 54-56 work perfectly</p>
              </div>
              <div>
                <h4 className="text-xs font-medium text-gray-700">Tall (5&rsquo;8&rdquo; - 6&rsquo;0&rdquo;)</h4>
                <p className="text-xs text-gray-500">Sizes 58-60 provide optimal length</p>
              </div>
            </div>
          </div>

          <div className="border border-gray-100 p-5">
            <h3 className="text-sm font-medium text-gray-900 mb-4">Fabric Considerations</h3>
            <div className="space-y-3">
              <div>
                <h4 className="text-xs font-medium text-gray-700">Chiffon & Lightweight</h4>
                <p className="text-xs text-gray-500">Flows beautifully - true to size recommended</p>
              </div>
              <div>
                <h4 className="text-xs font-medium text-gray-700">Silk & Structured</h4>
                <p className="text-xs text-gray-500">More fitted - consider sizing up if between sizes</p>
              </div>
              <div>
                <h4 className="text-xs font-medium text-gray-700">Jersey & Stretch</h4>
                <p className="text-xs text-gray-500">Comfortable fit - true to size works well</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="border-t border-gray-100 pt-8 text-center">
          <p className="text-sm text-gray-500 mb-4">Still unsure about sizing?</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/contact"
              className="inline-block bg-brand-maroon hover:bg-brand-burgundy text-white text-xs tracking-[0.15em] uppercase px-6 py-3 transition-colors"
            >
              Get Sizing Help
            </Link>
            <Link
              href="/returns"
              className="inline-block border border-gray-200 text-gray-700 hover:border-gray-900 hover:text-gray-900 text-xs tracking-[0.15em] uppercase px-6 py-3 transition-colors"
            >
              View Return Policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
