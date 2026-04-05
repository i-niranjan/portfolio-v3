import { CaseStudyPageClient } from "@/app/projects/case-studies/[slug]/CaseStudyPageClient";
import { getAllCaseStudies, getCaseStudyBySlug } from "@/content/case-studies";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllCaseStudies().map(({ metadata }) => ({
    slug: metadata.slug,
  }));
}

export const dynamicParams = false;

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const caseStudy = getCaseStudyBySlug(slug);

  if (!caseStudy) {
    notFound();
  }

  return <CaseStudyPageClient slug={slug} metadata={caseStudy.metadata} />;
}
