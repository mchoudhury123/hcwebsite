import { Metadata } from 'next'
import ThankYouClient from './ThankYouClient'

export const metadata: Metadata = {
  title: 'Thank You',
  description: 'Thank you for your order! Your purchase has been confirmed and we\'ll be in touch soon.',
  robots: { index: false, follow: false },
}

export default function ThankYouPage() {
  return <ThankYouClient />
}

