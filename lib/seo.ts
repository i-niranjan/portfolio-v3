export const siteConfig = {
  name: "Niranjan Chaudhari",
  title: "Niranjan Chaudhari | Software Engineer",
  description:
    "Niranjan Chaudhari helps founders turn product ideas into scalable, production-ready systems.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://iniranjan.com",
  creator: "Niranjan Chaudhari",
  email: "iniranjanchaudhari@gmail.com",
  jobTitle: "Software Engineer",
  twitter: "@imniranjann",
  sameAs: [
    "https://github.com/i-niranjan",
    "https://x.com/imniranjann",
    "https://www.linkedin.com/in/niranjann/",
  ],
};

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    url: siteConfig.url,
    image: absoluteUrl("/assets/portrait-image.jpg"),
    jobTitle: siteConfig.jobTitle,
    email: `mailto:${siteConfig.email}`,
    description: siteConfig.description,
    sameAs: siteConfig.sameAs,
  } as const;
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: "en-US",
    author: {
      "@type": "Person",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  } as const;
}

export function breadcrumbJsonLd(crumbs: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

interface CaseStudyJsonLdInput {
  slug: string;
  title: string;
  description: string;
  image: string;
  year: string;
  client: string;
  role: string;
  tags: string[];
}

export function caseStudyJsonLd(input: CaseStudyJsonLdInput) {
  const pageUrl = absoluteUrl(`/work/case-studies/${input.slug}`);

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    mainEntityOfPage: { "@type": "WebPage", "@id": pageUrl },
    headline: input.title,
    description: input.description,
    image: absoluteUrl(input.image),
    keywords: input.tags.join(", "),
    inLanguage: "en-US",
    datePublished: `${input.year}-01-01`,
    author: {
      "@type": "Person",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Person",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    about: {
      "@type": "CreativeWork",
      name: `${input.title} — ${input.client}`,
      creator: {
        "@type": "Person",
        name: siteConfig.name,
        roleName: input.role,
      },
    },
  } as const;
}
