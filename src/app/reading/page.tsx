// src/app/reading/page.tsx
import type { Metadata } from "next";
import ReadingHero from "@/components/reading/ReadingHero";
import CurrentlyReading from "@/components/reading/CurrentlyReading";
import ReadingExplorer from "@/components/reading/ReadingExplorer";
import {
  readingItems,
  getCurrentlyReading,
  listReadingItems,
} from "@/lib/reading";

export const metadata: Metadata = {
  title: "Reading — kohi",
  description: "Books, papers, and articles shaping my current thinking.",
};

export default function ReadingPage() {
  // Subset for the top shelf
  const current = getCurrentlyReading(readingItems);

  // Deduplicate explorer (exclude current items) and sort “recent”
  const currentSlugs = new Set(current.map((i) => i.slug));
  const rest = listReadingItems({
    sort: "recent",
    source: readingItems.filter((i) => !currentSlugs.has(i.slug)),
  });

  return (
    <main>
      <ReadingHero />
      {current.length > 0 && <CurrentlyReading items={current} />}
      <div id="library">
        <ReadingExplorer items={rest} />
      </div>
    </main>
  );
}