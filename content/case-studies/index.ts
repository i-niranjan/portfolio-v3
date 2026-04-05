import type { CaseStudyEntry, CaseStudyMetadata } from "@/app/work/types";
import BmsPlatform, {
  metadata as bmsPlatformMetadata,
} from "@/content/case-studies/bms-platform.mdx";
import Indinite, {
  metadata as indiniteMetadata,
} from "@/content/case-studies/indinite.mdx";
import Sck, { metadata as sckMetadata } from "@/content/case-studies/sck.mdx";
import Vos, { metadata as vosMetadata } from "@/content/case-studies/vos.mdx";
import VosStory, {
  metadata as vosStoryMetadata,
} from "@/content/case-studies/vos-story.mdx";
import Yonnova, {
  metadata as yonnovaMetadata,
} from "@/content/case-studies/yonnova.mdx";

const caseStudies: CaseStudyEntry[] = [
  { metadata: bmsPlatformMetadata, Content: BmsPlatform },
  { metadata: indiniteMetadata, Content: Indinite },
  { metadata: sckMetadata, Content: Sck },
  { metadata: vosMetadata, Content: Vos },
  { metadata: vosStoryMetadata, Content: VosStory },
  { metadata: yonnovaMetadata, Content: Yonnova },
].sort((left, right) => left.metadata.order - right.metadata.order);

export function getAllCaseStudies(): CaseStudyEntry[] {
  return caseStudies;
}

export function getProjectCards(): CaseStudyMetadata[] {
  return caseStudies.map((study) => study.metadata);
}

export function getCaseStudyBySlug(slug: string): CaseStudyEntry | undefined {
  return caseStudies.find((study) => study.metadata.slug === slug);
}
