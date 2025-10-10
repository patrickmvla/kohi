// components/projects/ProjectMedia.tsx
"use client";

import Image, { type StaticImageData } from "next/image";
import {
  type LucideIcon,
  Mail,
  Wand2,
  Link as LinkIcon,
  FileText,
  Clapperboard,
  Package,
} from "lucide-react";
import { useState } from "react";

const iconMap = {
  Mail,
  Wand2,
  Link: LinkIcon,
  FileText,
  Clapperboard
} as const;

export type IconName = keyof typeof iconMap;

function resolveIcon(name?: string): LucideIcon {
  // Accepts loose string for backward compatibility, narrows to IconName if possible
  if (!name) return Package;
  return (iconMap as Record<string, LucideIcon>)[name] ?? Package;
}

type Props = {
  title: string;
  image?: string | StaticImageData;
  icon?: string; // keep as string for compatibility; prefer IconName going forward
  ratioClass?: string;
  className?: string;
  alt?: string; // optional custom alt; defaults to title
  priority?: boolean; // pass true for LCP media
  sizes?: string; // e.g., "(min-width: 1024px) 33vw, 100vw"
};

export default function ProjectMedia({
  title,
  image,
  icon,
  ratioClass = "aspect-[16/9]",
  className = "",
  alt,
  priority = false,
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
}: Props) {
  const [loaded, setLoaded] = useState(false);
  const Icon = resolveIcon(icon);
  const altText = alt ?? title;

  return (
    <div
      className={[
        "relative overflow-hidden rounded-lg border border-white/10 bg-white/5",
        ratioClass,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {image ? (
        <>
          <Image
            src={image}
            alt={altText}
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover opacity-0 transition-opacity duration-300 data-[loaded=true]:opacity-100"
            onLoadingComplete={() => setLoaded(true)}
            data-loaded={loaded}
          />
          {!loaded && (
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-white/[0.06] motion-safe:animate-pulse"
            />
          )}
        </>
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <Icon className="h-12 w-12 text-brand-400" aria-hidden="true" />
          <span className="sr-only">{title} placeholder</span>
        </div>
      )}
    </div>
  );
}
