/* eslint-disable @typescript-eslint/no-explicit-any */

import type { ComponentType } from 'react'
import {
  type LucideIcon,
  Mail,
  Wand2,
  Link as LinkIcon,
  FileText,
  Package,
} from 'lucide-react'

const iconMap: Record<string, LucideIcon> = {
  Mail,
  Wand2,
  Link: LinkIcon,
  FileText,
}

function resolveIcon(name?: string): ComponentType<any> {
  if (!name) return Package
  return iconMap[name] ?? Package
}

export default function ProjectMedia({
  title,
  image,
  icon,
  ratioClass = 'aspect-[16/9]',
  className = '',
}: {
  title: string
  image?: string
  icon?: string
  ratioClass?: string
  className?: string
}) {
  const Icon = resolveIcon(icon)

  return (
    <div
      className={[
        'overflow-hidden rounded-lg border border-white/10',
        'bg-gradient-to-br from-white/10 to-transparent',
        ratioClass,
        className,
      ].join(' ')}
    >
      {image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover"
          loading="lazy"
          decoding="async"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <Icon className="h-12 w-12 text-brand-400" aria-hidden />
        </div>
      )}
    </div>
  )
}