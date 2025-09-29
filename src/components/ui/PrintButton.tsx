'use client'

type Props = {
  label?: string
  className?: string
}

export default function PrintButton({ label = 'Download PDF', className = '' }: Props) {
  const onClick = () => window.print()
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-md border border-white/10 px-3 py-1.5 text-xs text-white hover:border-white/30 print:hidden ${className}`}
    >
      {label}
    </button>
  )
}