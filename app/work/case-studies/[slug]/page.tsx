import { CaseStudyPageClient } from "@/app/work/case-studies/[slug]/CaseStudyPageClient";
import { getAllCaseStudies, getCaseStudyBySlug } from "@/content/case-studies";
import { absoluteUrl, siteConfig } from "@/lib/seo";
import type { Metadata } from "next";
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

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = getCaseStudyBySlug(slug);

  if (!caseStudy) {
    return {};
  }

  const { metadata } = caseStudy;
  const path = `/work/case-studies/${metadata.slug}`;
  const title = `${metadata.title} Case Study`;

  return {
    title,
    description: metadata.description,
    alternates: {
      canonical: path,
    },
    keywords: [
      metadata.title,
      metadata.client,
      metadata.role,
      ...metadata.tags,
      "case study",
      "portfolio",
    ],
    openGraph: {
      type: "article",
      url: path,
      siteName: siteConfig.name,
      title: `${title} | ${siteConfig.name}`,
      description: metadata.description,
      images: [
        {
          url: absoluteUrl(metadata.coverImage || metadata.heroImage),
          width: 1200,
          height: 630,
          alt: `${metadata.title} case study preview`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteConfig.name}`,
      description: metadata.description,
      images: [absoluteUrl(metadata.coverImage || metadata.heroImage)],
    },
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const caseStudy = getCaseStudyBySlug(slug);

  if (!caseStudy) {
    notFound();
  }

  return <CaseStudyPageClient slug={slug} metadata={caseStudy.metadata} />;
}
