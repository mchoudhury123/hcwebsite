import { Metadata } from 'next'
import ContactClient from './ContactClient'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Haybah Collections. We\'re here to help with any questions about our modest fashion collections.',
  keywords: 'contact haybah, customer service, modest fashion support, abaya inquiries',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact Us - Haybah Collections',
    description: 'Get in touch with Haybah Collections. We\'re here to help with any questions about our modest fashion collections.',
    url: '/contact',
    type: 'website',
  },
}

export default function ContactPage() {
  return <ContactClient />
}
