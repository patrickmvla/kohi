// src/app/page.tsx (or the file you shared)
import type { Metadata } from "next";
import dynamic from "next/dynamic";

import Hero from "@/components/Hero";
import Footer from "@/components/Footer";

import { caseStudies } from "@/lib/case-studies";
import { readingItems } from "@/lib/reading";

// Code-split non-LCP sections to keep first paint lean
const Skills = dynamic(() => import("@/components/Skills"), { ssr: true });
const FeaturedWork = dynamic(() => import("@/components/FeaturedWork"), { ssr: true });
const Principles = dynamic(() => import("@/components/Principles"), { ssr: true });
const ReadingNow = dynamic(() => import("@/components/ReadingNow"), { ssr: true });
const ContactCTA = dynamic(() => import("@/components/ContactCTA"), { ssr: true });

export const metadata: Metadata = {
  title: "kohi — Patrick Mvula",
  description:
    "Calm, reliable software — built with intent. Projects, principles, and what’s shaping my thinking.",
};

const clamp = (n?: number) => Math.max(0, Math.min(100, n ?? 0));

// Build the reading shelf: currently reading, sorted by progress desc, clamped
const readingShelf = readingItems
  .filter((i) => i.status === "reading")
  .sort((a, b) => (b.progress ?? 0) - (a.progress ?? 0))
  .slice(0, 4)
  .map((i) => ({
    title: i.title,
    author: i.author,
    cover: i.cover,
    progress: clamp(i.progress),
  }));

export default function Home() {
  const featured = caseStudies.find((s) => s.featured) ?? caseStudies[0];

  return (
    <main id="main" role="main">
      <Hero />
      <Skills />
      {featured && <FeaturedWork cs={featured} />}
      <Principles />
      <ReadingNow books={readingShelf} />
      <ContactCTA />
      <Footer />
    </main>
  );
}