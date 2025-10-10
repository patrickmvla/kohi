import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllCaseStudies, getCaseStudyBySlug } from "@/lib/data";
import CaseStudyPage from "@/components/projects/CaseStudyPage";

type Params = { slug: string };

export default async function Page({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const cs = await getCaseStudyBySlug(decodeURIComponent(slug));
  if (!cs) notFound();
  return <CaseStudyPage cs={cs} />;
}

export async function generateStaticParams() {
  const all = await getAllCaseStudies();
  return all.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<Params> }
): Promise<Metadata> {
  const { slug } = await params;
  const cs = await getCaseStudyBySlug(decodeURIComponent(slug));
  if (!cs) return {};

  const title = `${cs.title} — Case study`;
  const description = cs.tagline || cs.summary.slice(0, 160);
  const ogImages = cs.image ? [{ url: cs.image, alt: cs.title }] : [];

  return {
    title,
    description,
    openGraph: { title, description, images: ogImages },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: cs.image ? [cs.image] : [],
    },
  };
}