import { Suspense } from 'react'
import type { Metadata } from 'next'
import ReceiptClient from './ReceiptClient'

export const metadata: Metadata = {
  title: 'Order Receipt',
  robots: { index: false, follow: false },
}

export default function ReceiptPage() {
  return (
    <Suspense fallback={<div>Loading receipt...</div>}>
      <ReceiptClient />
    </Suspense>
  )
}
