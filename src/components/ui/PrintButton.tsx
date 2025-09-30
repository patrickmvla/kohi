'use client'

type Props = {
  label?: string
  className?: string
}

export default function PrintButton({ label = 'Download PDF', className = '' }: Props) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className={[
        'inline-flex items-center gap-1.5 rounded-md',
        'border border-white/10 bg-transparent px-2.5 py-1.5 text-xs',
        'text-zinc-400 hover:text-white hover:border-white/20',
        'focus:outline-none focus-visible:ring-2 ring-brand-600/60',
        'transition-colors print:hidden',
        className,
      ].join(' ')}
      aria-label={label}
    >
      <span aria-hidden className="opacity-70">⤓</span>
      <span>{label}</span>
    </button>
  )
}