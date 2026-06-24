import JsonLd from './JsonLd'

// Visible, keyword-relevant content + FAQ for the homepage. Gives search engines
// substantive text to rank for "abaya", "Arabic dresses" and "Islamic dresses",
// and the FAQPage schema makes the Q&As eligible for rich results in Google.

const faqs = [
  {
    q: 'What is an abaya?',
    a: 'An abaya is a long, flowing outer garment worn by many Muslim women for modest dress. At Haybah Collections our abayas are designed as elegant Islamic dresses that combine traditional modesty with contemporary style.',
  },
  {
    q: 'Do you sell Arabic and Islamic dresses?',
    a: 'Yes. Our collection features abayas, Arabic dresses and modest Islamic dresses suitable for everyday wear, work, Eid and special occasions — all crafted from premium materials.',
  },
  {
    q: 'Do you deliver abayas across the UK?',
    a: 'Yes, Haybah Collections ships abayas and Islamic dresses throughout the UK. Estimated delivery times are shown at checkout and on our shipping page.',
  },
  {
    q: 'How do I choose the right abaya size?',
    a: 'Each abaya lists available sizes, and our size guide includes adult and kids measurements so you can find the right fit before you order.',
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}

export default function SeoContent() {
  return (
    <section className="bg-white py-16 sm:py-20 border-t border-gray-100">
      <JsonLd data={faqSchema} />
      <div className="container-custom max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-xs tracking-[0.2em] uppercase text-[#C8A882] mb-3">
            Luxury Modest Fashion
          </p>
          <h2 className="text-3xl sm:text-4xl font-serif text-gray-900">
            Premium Abayas, Arabic &amp; Islamic Dresses
          </h2>
        </div>

        <div className="space-y-4 text-sm sm:text-base text-gray-600 leading-relaxed">
          <p>
            Haybah Collections is a UK home for elegant modest fashion. We design and curate
            premium <strong>abayas</strong>, <strong>Arabic dresses</strong> and{' '}
            <strong>Islamic dresses</strong> for women who want timeless modesty with a
            contemporary edge. Every piece is made with carefully chosen fabrics and a flattering,
            comfortable cut.
          </p>
          <p>
            From understated everyday abayas to statement designs for Eid and special occasions,
            our collection brings together classic Islamic dress and modern styling. Browse the
            full range, filter by size and colour, and find the perfect abaya delivered to your
            door across the UK.
          </p>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl sm:text-3xl font-serif text-gray-900 text-center mb-8">
            Frequently Asked Questions
          </h2>
          <dl className="space-y-6">
            {faqs.map((f) => (
              <div key={f.q} className="border-b border-gray-100 pb-6">
                <dt className="text-base font-medium text-gray-900 mb-2">{f.q}</dt>
                <dd className="text-sm sm:text-base text-gray-600 leading-relaxed">{f.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
