import type { MDXComponents } from "mdx/types";
import type { ComponentType } from "react";

export interface ProjectReview {
  initials: string;
  name: string;
  role: string;
  text: string;
}

export interface CaseStudyStat {
  label: string;
  value: string;
}

export interface CaseStudyMetadata {
  slug: string;
  order: number;
  title: string;
  subtitle: string;
  description: string;
  client: string;
  year: string;
  role: string;
  tags: string[];
  heroImage: string;
  coverImage: string;
  stats: CaseStudyStat[];
  review: ProjectReview;
}

export interface CaseStudyEntry {
  metadata: CaseStudyMetadata;
  Content: ComponentType<{
    components?: MDXComponents;
  }>;
}

export interface TocSection {
  id: string;
  label: string;
}

export type ProjectMeta = CaseStudyMetadata;
