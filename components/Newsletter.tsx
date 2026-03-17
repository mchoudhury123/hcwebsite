'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Mail } from 'lucide-react'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
      setEmail('')
      setTimeout(() => setSubmitted(false), 3000)
    }
  }

  return (
    <section className="bg-[#F5F0EB] py-16 sm:py-20">
      <div className="container-custom">
        <motion.div
          className="max-w-2xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl sm:text-3xl font-serif text-brand-dark mb-3">
            Subscribe to our newsletter to receive updates on our latest collections
          </h2>
          <p className="text-sm text-gray-500 mb-8">
            Get <span className="font-semibold text-gray-700">10% off</span> your first order by subscribing to our newsletter
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <div className="relative flex-1">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="email"
                placeholder="Enter your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-300 bg-white text-sm focus:ring-1 focus:ring-brand-maroon focus:border-brand-maroon outline-none transition-colors"
              />
            </div>
            <button
              type="submit"
              className="px-8 py-3 bg-brand-dark text-white text-sm tracking-[0.15em] uppercase hover:bg-brand-maroon transition-colors"
            >
              Subscribe
            </button>
          </form>

          {submitted && (
            <motion.p
              className="text-sm text-green-600 mt-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Thank you for subscribing!
            </motion.p>
          )}

          <p className="text-[11px] text-gray-400 mt-4">
            You can unsubscribe from the newsletter at any time
          </p>
        </motion.div>
      </div>
    </section>
  )
}
