"use client";

import type {
  CaseStudyMetadata,
  CaseStudyStat,
  TocSection,
} from "@/app/work/types";
import { caseStudyMDXComponents } from "@/app/work/case-studies/[slug]/caseStudyMdx";
import { getCaseStudyBySlug } from "@/content/case-studies";
import { motion, useInView } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState, ViewTransition } from "react";

interface CaseStudyPageClientProps {
  slug: string;
  metadata: CaseStudyMetadata;
}

const SHOW_CASE_STUDY_DRAFT_NOTICE = true;

function StatsRow({ stats }: { stats: CaseStudyStat[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-5% 0px" });

  return (
    <div
      ref={ref}
      className="mb-13 grid grid-cols-1 gap-2.5 sm:grid-cols-2 xl:grid-cols-4"
    >
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.5,
            delay: index * 0.07,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="rounded-[4px] bg-white/[0.025] px-[18px] py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.1),inset_0_-1px_0_rgba(255,255,255,0.03),0_0_0_1px_rgba(255,255,255,0.06)] backdrop-blur-[20px]"
        >
          <p className="mb-1 text-[21px] font-semibold tracking-[-0.02em] text-white/88">
            {stat.value}
          </p>
          <p className="font-commit text-[10px] uppercase tracking-[0.08em] text-white/28">
            {stat.label}
          </p>
        </motion.div>
      ))}
    </div>
  );
}

function Hero({
  metadata,
  slug,
}: {
  metadata: CaseStudyMetadata;
  slug: string;
}) {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative mb-8 aspect-[4/3] w-full overflow-hidden rounded-[4px] shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_0_0_1px_rgba(255,255,255,0.07),0_40px_80px_rgba(0,0,0,0.7)] sm:aspect-[16/9] md:mb-10 lg:aspect-[21/8]"
      >
        <ViewTransition name={`case-${metadata.slug}`}>
          <Image
            fill
            src={metadata.heroImage}
            alt={metadata.title}
            priority
            className="object-cover"
            style={{ transition: "transform 1.2s cubic-bezier(0.22,1,0.36,1)" }}
          />
        </ViewTransition>
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(8,8,8,0.6)_100%)]" />
      </motion.div>

      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
        style={{ transformOrigin: "left" }}
        className="mb-6 h-px w-10 bg-white/20"
      />

      <div className="mb-3.5 overflow-hidden">
        <motion.h1
          initial={{ y: "105%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-[clamp(2.2rem,5vw,3.8rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-white/94"
        >
          {metadata.title}
        </motion.h1>
      </div>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.38, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="mb-10 max-w-[520px] text-[15px] leading-[1.65] text-white/38 md:mb-13"
      >
        {metadata.subtitle}
      </motion.p>
    </div>
  );
}

function Sidebar({
  metadata,
  sections,
  activeSection,
  onSelect,
}: {
  metadata: CaseStudyMetadata;
  sections: TocSection[];
  activeSection: string;
  onSelect: (id: string) => void;
}) {
  const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const navRef = useRef<HTMLElement>(null);
  const [indicatorY, setIndicatorY] = useState(0);
  const [indicatorH, setIndicatorH] = useState(0);

  // Reposition the indicator whenever activeSection changes
  useEffect(() => {
    const activeEl = buttonRefs.current[activeSection];
    const navEl = navRef.current;
    if (!activeEl || !navEl) return;

    const navTop = navEl.getBoundingClientRect().top;
    const elRect = activeEl.getBoundingClientRect();

    setIndicatorY(elRect.top - navTop);
    setIndicatorH(elRect.height);
  }, [activeSection]);

  return (
    <motion.aside
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="w-full flex-shrink-0 pt-1 lg:sticky lg:top-20 lg:w-[174px]"
    >
      <p className="mb-3.5 font-commit text-[10px] uppercase tracking-[0.12em] text-white/20">
        Contents
      </p>

      {/* Nav wrapper — relative so the indicator is positioned against it */}
      <nav ref={navRef} className="relative flex flex-col gap-0.5">
        {/* Sliding indicator — single element, animates position */}
        <motion.div
          aria-hidden
          className="absolute left-0 w-px bg-white/50"
          animate={{ y: indicatorY, height: indicatorH }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Static rail behind it */}
        <div className="absolute left-0 top-0 h-full w-px bg-white/8" />

        {sections.map((section) => {
          const isActive = activeSection === section.id;
          return (
            <button
              key={section.id}
              ref={(el) => {
                buttonRefs.current[section.id] = el;
              }}
              type="button"
              onClick={() => onSelect(section.id)}
              className="bg-transparent py-[6px] pl-3 text-left text-sm tracking-[0.01em] transition-colors duration-300"
              style={{
                color: isActive
                  ? "rgba(255,255,255,0.86)"
                  : "rgba(255,255,255,0.28)",
              }}
            >
              {section.label}
            </button>
          );
        })}
      </nav>

      <div className="mt-9 flex flex-col gap-3.5 border-t border-white/7 pt-6">
        {[
          { key: "Client", value: metadata.client },
          { key: "Year", value: metadata.year },
          { key: "Role", value: metadata.role },
        ].map((item) => (
          <div key={item.key}>
            <p className="mb-1 font-commit text-[10px] uppercase tracking-[0.12em] text-white/20">
              {item.key}
            </p>
            <p className="text-sm leading-[1.5] text-white/48">{item.value}</p>
          </div>
        ))}
      </div>
    </motion.aside>
  );
}

function DraftCaseStudyNotice({ metadata }: { metadata: CaseStudyMetadata }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.18, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden rounded-[4px] border border-white/7 bg-white/[0.025] px-5 py-8  backdrop-blur-[20px] sm:px-7 sm:py-10"
    >
      <h2 className="mb-4 max-w-155 text-[clamp(1.6rem,4vw,2.65rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-white/92">
        Still Working on the full {metadata.title} case study...
      </h2>
    </motion.section>
  );
}

export function CaseStudyPageClient({
  slug,
  metadata,
}: CaseStudyPageClientProps) {
  const caseStudy = getCaseStudyBySlug(slug);
  const Content = caseStudy?.Content;
  const [sections, setSections] = useState<TocSection[]>([]);
  const [activeSection, setActiveSection] = useState("");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [navVisible, setNavVisible] = useState(true);
  const lastScrollY = useRef(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const root = document.documentElement;
      const progress = root.scrollTop / (root.scrollHeight - root.clientHeight);
      setScrollProgress(Math.min(1, Math.max(0, progress)));
      setNavVisible(
        root.scrollTop < lastScrollY.current || root.scrollTop < 80,
      );
      lastScrollY.current = root.scrollTop;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const headings = Array.from(
        contentRef.current?.querySelectorAll<HTMLElement>(
          '[data-toc-heading="true"]',
        ) ?? [],
      );

      const nextSections = headings.map((heading) => ({
        id: heading.id,
        label: heading.dataset.headingLabel ?? heading.textContent ?? "",
      }));

      setSections(nextSections);
      setActiveSection(nextSections[0]?.id ?? "");
    });

    return () => window.cancelAnimationFrame(frame);
  }, [slug]);

  useEffect(() => {
    const headings = Array.from(
      contentRef.current?.querySelectorAll<HTMLElement>(
        '[data-toc-heading="true"]',
      ) ?? [],
    );

    if (!headings.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection((entry.target as HTMLElement).id);
          }
        });
      },
      { threshold: 0.3, rootMargin: "-10% 0px -60% 0px" },
    );

    headings.forEach((heading) => observer.observe(heading));

    return () => observer.disconnect();
  }, [sections]);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  if (!Content) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#080808] font-['Helvetica_Neue',Helvetica,Arial,sans-serif] text-white">
      {/* <TopNav
        tags={metadata.tags}
        visible={navVisible}
        scrollProgress={scrollProgress}
      /> */}

      <div className="pt-[52px]">
        <div className="mx-auto max-w-[1060px] px-4 pb-0 pt-8 md:px-10 md:pt-10">
          <Hero metadata={metadata} slug={slug} />
        </div>

        <div className="mx-auto flex max-w-[1060px] flex-col gap-8 px-4 pb-20 md:px-10 lg:flex-row lg:items-start lg:gap-[60px] lg:pb-[120px]">
          {!SHOW_CASE_STUDY_DRAFT_NOTICE ? (
            <Sidebar
              metadata={metadata}
              sections={sections}
              activeSection={activeSection}
              onSelect={scrollToSection}
            />
          ) : null}

          <main className="min-w-0 flex-1">
            <StatsRow stats={metadata.stats} />

            <div ref={contentRef} className="min-w-0">
              {SHOW_CASE_STUDY_DRAFT_NOTICE ? (
                <DraftCaseStudyNotice metadata={metadata} />
              ) : (
                <Content components={caseStudyMDXComponents} />
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
