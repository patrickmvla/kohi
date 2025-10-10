// src/components/ui/CoverImage.tsx
"use client";

import { useEffect, useState } from "react";

type Props = {
  src?: string;
  alt: string;
  className?: string;
  // Defaults to book ratio (2:3)
  ratio?: string; // e.g. "2 / 3", "3 / 4", "16 / 9"
  // Optional fixed width for shelves; height derives from aspect-ratio
  widthClass?: string; // e.g. "w-16"
  // Performance hints
  loading?: "lazy" | "eager";
  fetchPriority?: "high" | "low" | "auto";
  sizes?: string; // e.g., "(min-width: 640px) 10rem, 8rem"
  // Placeholder control
  placeholderSrc?: string; // fallback image
  // Fit mode
  objectFit?: "cover" | "contain";
  // Callback
  onLoadComplete?: () => void;
};

export default function CoverImage({
  src,
  alt,
  className = "",
  ratio = "2 / 3",
  widthClass = "w-16",
  loading = "lazy",
  fetchPriority = "auto",
  sizes,
  placeholderSrc = "/images/reading/placeholder.svg",
  objectFit = "cover",
  onLoadComplete,
}: Props) {
  const [loaded, setLoaded] = useState(false);
  const [err, setErr] = useState(false);

  // Reset on src change
  useEffect(() => {
    setLoaded(false);
    setErr(false);
  }, [src]);

  const finalSrc = !src || err ? placeholderSrc : src;

  return (
    <div
      className={`relative ${widthClass} overflow-hidden rounded-md border border-white/8 ${className}`}
      style={{ aspectRatio: ratio }}
      aria-busy={!loaded}
    >
      {/* Skeleton */}
      {!loaded && (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-white/5 motion-safe:animate-pulse"
        />
      )}

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={finalSrc}
        alt={alt}
        className={`absolute inset-0 h-full w-full object-${objectFit} transition-opacity duration-300 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        loading={loading}
        // fetchPriority attr is supported by modern browsers
        fetchPriority={fetchPriority}
        // sizes only used by some UAs with <img>; harmless if omitted
        sizes={sizes}
        decoding="async"
        referrerPolicy="no-referrer"
        draggable={false}
        onLoad={() => {
          setLoaded(true);
          onLoadComplete?.();
        }}
        onError={() => setErr(true)}
      />
    </div>
  );
}