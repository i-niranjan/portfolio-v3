import { ProjectsClient } from "@/app/work/ProjectsClient";
import { getProjectCards } from "@/content/case-studies";
import { absoluteUrl, siteConfig } from "@/lib/seo";
import type { Metadata } from "next";

const title = "Selected Work";
const description =
  "Case studies and shipped product work by Niranjan Chaudhari, spanning product design, UX/UI, dashboards, and production-ready web systems.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/work",
  },
  openGraph: {
    type: "website",
    url: "/work",
    siteName: siteConfig.name,
    title: `${title} | ${siteConfig.name}`,
    description,
    images: [
      {
        url: absoluteUrl(siteConfig.ogImage),
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} selected work`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | ${siteConfig.name}`,
    description,
    images: [absoluteUrl(siteConfig.ogImage)],
  },
};

export default function ProjectsPage() {
  return <ProjectsClient projects={getProjectCards()} />;
}
