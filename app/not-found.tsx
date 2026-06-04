import type { Metadata } from "next";
import NotFoundClient from "@/app/components/NotFoundClient";
import { siteConfig } from "@/lib/seo";

export const metadata: Metadata = {
  title: "404 — Page Not Found",
  description: "This page doesn't exist. Head back to explore Niranjan's work.",
  alternates: { canonical: "/404" },
  robots: { index: false, follow: false },
  openGraph: {
    title: "404 — Page Not Found",
    description: "This page doesn't exist. Head back to explore Niranjan's work.",
    url: "/404",
    siteName: siteConfig.name,
  },
};

export default function NotFound() {
  return <NotFoundClient />;
}
