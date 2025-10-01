import ContactCTA from "@/components/ContactCTA";
import FeaturedWork from "@/components/FeaturedWork";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Principles from "@/components/Principles";
import ReadingNow from "@/components/ReadingNow";
import Skills from "@/components/Skills"; // <- add

import { caseStudies } from "@/lib/case-studies";
import { readingItems } from "@/lib/reading";

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
