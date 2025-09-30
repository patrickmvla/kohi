import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills"; // <- add
import FeaturedWork from "@/components/FeaturedWork";
import Principles from "@/components/Principles";
import BlogTeaser from "@/components/BlogTeaser";
import ReadingNow from "@/components/ReadingNow";
import ContactCTA from "@/components/ContactCTA";
import Footer from "@/components/Footer";

import { caseStudies } from "@/lib/case-studies";
import { posts } from "@/lib/posts";
import { readingItems } from "@/lib/reading";
import ContactRHF from "@/components/ContactRHF";

const readingShelf = readingItems
  .filter((i) => i.status === "reading")
  .slice(0, 4)
  .map((i) => ({
    title: i.title,
    author: i.author,
    cover: i.cover,
    progress: i.progress ?? 0,
  }));

export default function Home() {
  const featured = caseStudies.find((s) => s.featured) ?? caseStudies[0];

  return (
    <main id="main">
      {/* <Header /> */}
      <Hero />
      <Skills /> {/* <- here */}
      {featured && <FeaturedWork cs={featured} />}
      <Principles />
      {/* <BlogTeaser posts={posts} limit={3} /> */}
      <ReadingNow books={readingShelf} />
      <ContactCTA />
      {/* <ContactRHF /> */}
      <Footer />
    </main>
  );
}
