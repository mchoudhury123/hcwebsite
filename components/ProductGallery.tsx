'use client'

import Image from 'next/image'
import { urlForHighQuality } from '@/lib/sanity.image'

interface ProductGalleryProps {
  images: any[]
  name: string
}

export default function ProductGallery({ images, name }: ProductGalleryProps) {
  if (!images || images.length === 0) {
    return (
      <div className="aspect-[3/4] bg-gray-50 flex items-center justify-center">
        <p className="text-sm text-gray-400">No images available</p>
      </div>
    )
  }

  const isOdd = images.length > 1 && images.length % 2 !== 0
  const pairedImages = isOdd ? images.slice(0, -1) : images
  const lastImage = isOdd ? images[images.length - 1] : null

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
      {pairedImages.map((image, index) => (
        <div
          key={index}
          className="relative aspect-[3/4] bg-gray-50 overflow-hidden"
        >
          <Image
            src={urlForHighQuality(image)}
            alt={`${name} - Image ${index + 1}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 40vw"
            priority={index < 2}
            quality={95}
          />
        </div>
      ))}

      {/* Last image spans full width if odd number */}
      {lastImage && (
        <div className="relative aspect-[3/4] md:aspect-[3/2] bg-gray-50 overflow-hidden md:col-span-2">
          <Image
            src={urlForHighQuality(lastImage)}
            alt={`${name} - Image ${images.length}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 80vw"
            quality={95}
          />
        </div>
      )}
    </div>
  )
}
