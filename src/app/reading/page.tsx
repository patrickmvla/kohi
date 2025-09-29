// src/app/reading/page.tsx
import type { Metadata } from 'next'
import ReadingHero from '@/components/reading/ReadingHero'
import CurrentlyReading from '@/components/reading/CurrentlyReading'
import ReadingExplorer from '@/components/reading/ReadingExplorer'
import { readingItems } from '@/lib/reading'

export const metadata: Metadata = {
  title: 'Reading — kohi',
  description: 'Books, papers, and articles shaping my current thinking.',
}

export default function ReadingPage() {
  return (
    <main>
      <ReadingHero />
      <CurrentlyReading items={readingItems} />
      <ReadingExplorer items={readingItems} />
    </main>
  )
}