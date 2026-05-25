import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "lenis/dist/lenis.css";
import "@/css/glass.css";
import LenisProvider from "@/app/components/lenis-provider";
import RouteTransitionShell from "@/app/components/RouteTransitionShell";
import { JsonLd } from "@/app/components/JsonLd";
import { personJsonLd, siteConfig, websiteJsonLd } from "@/lib/seo";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.name,
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.creator,
  publisher: siteConfig.name,
  alternates: {
    canonical: "/",
  },
  keywords: [
    "Niranjan Chaudhari",
    "Niranjan Full Stack Developer",
    "Niranjan Chaudhari Developer",
    "product engineer",
    "full stack developer",
    "Next.js developer",
    "portfolio",
    "startup product development",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    creator: siteConfig.twitter,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={` ${inter.variable} antialiased  relative`}>
        <JsonLd data={[personJsonLd(), websiteJsonLd()]} />
        <LenisProvider>
          <Header />

          <main>
            <RouteTransitionShell>{children}</RouteTransitionShell>
          </main>

          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
