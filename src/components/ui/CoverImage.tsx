// src/components/ui/CoverImage.tsx
'use client'

import { useState } from 'react'

type Props = {
  src?: string
  alt: string
  className?: string
  // Defaults to book ratio (2:3)
  ratio?: string // e.g. '2 / 3', '3 / 4', '16 / 9'
  // Optional fixed width for shelves; height derives from aspect-ratio
  widthClass?: string // e.g. 'w-16'
}

export default function CoverImage({
  src,
  alt,
  className = '',
  ratio = '2 / 3',
  widthClass = 'w-16',
}: Props) {
  const [loaded, setLoaded] = useState(false)
  const [err, setErr] = useState(false)

  const finalSrc = !src || err ? '/images/reading/placeholder.svg' : src

  return (
    <div className={`relative ${widthClass} overflow-hidden rounded-md border border-white/10 ${className}`} style={{ aspectRatio: ratio }}>
      {/* Skeleton */}
      {!loaded && <div className="absolute inset-0 animate-pulse bg-white/5" />}

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={finalSrc}
        alt={alt}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
        onLoad={() => setLoaded(true)}
        onError={() => setErr(true)}
      />
    </div>
  )
}