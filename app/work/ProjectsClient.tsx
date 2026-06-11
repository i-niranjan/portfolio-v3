"use client";

import TransitionLink from "@/app/components/TransitionLink";
import type { ProjectMeta } from "@/app/work/types";
import { onBootDone } from "@/lib/boot-gate";
import CalButton from "@/components/cal-modal";
import { IconArrowUpRight } from "@tabler/icons-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  ViewTransition,
} from "react";

gsap.registerPlugin(ScrollTrigger);

interface ProjectsClientProps {
  projects: ProjectMeta[];
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/* ─── Scroll progress hairline ─────────────────────────────────── */
function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const trigger = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        bar.style.transform = `scaleX(${self.progress})`;
      },
    });

    return () => trigger.kill();
  }, []);

  return (
    <div
      ref={barRef}
      className="fixed left-0 top-0 z-50 h-[2px] w-full origin-left bg-[#9b6dff]/70"
      style={{ transform: "scaleX(0)" }}
    />
  );
}

/* ─── Fixed side index (desktop) ───────────────────────────────── */
function SideIndex({
  projects,
  activeIndex,
}: {
  projects: ProjectMeta[];
  activeIndex: number;
}) {
  return (
    <nav
      aria-label="Project index"
      className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-3 lg:flex"
    >
      {projects.map((project, index) => {
        const isActive = index === activeIndex;
        return (
          <button
            key={project.slug}
            type="button"
            aria-label={project.title}
            onClick={() => {
              document
                .getElementById(`project-${project.slug}`)
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="group flex cursor-pointer items-center gap-2 py-0.5"
          >
            <span
              className="font-commit text-[10px] tracking-[0.12em] transition-all duration-300"
              style={{
                color: isActive
                  ? "rgba(255,255,255,0.9)"
                  : "rgba(255,255,255,0.25)",
              }}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <span
              className="h-px bg-white transition-all duration-300"
              style={{
                width: isActive ? 28 : 12,
                opacity: isActive ? 0.9 : 0.2,
              }}
            />
          </button>
        );
      })}
    </nav>
  );
}

/* ─── Intro ────────────────────────────────────────────────────── */
function Intro({ projectCount }: { projectCount: number }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    let cancelled = false;
    const lines = root.querySelectorAll("[data-intro-line]");
    const fades = root.querySelectorAll("[data-intro-fade]");

    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) {
        gsap.set([lines, fades], { yPercent: 0, y: 0, opacity: 1 });
        return;
      }

      gsap.set(lines, { yPercent: 110 });
      gsap.set(fades, { opacity: 0, y: 20 });
    }, root);

    if (!prefersReducedMotion()) {
      // Wait for the first-visit boot screen before playing the intro
      onBootDone(() => {
        if (cancelled) return;
        ctx.add(() => {
          const tl = gsap.timeline({ delay: 0.15 });
          tl.to(lines, {
            yPercent: 0,
            duration: 1.1,
            stagger: 0.12,
            ease: "power4.out",
          }).to(
            fades,
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.12,
              ease: "power3.out",
            },
            "-=0.55",
          );
        });
      });
    }

    return () => {
      cancelled = true;
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative flex min-h-[88vh] flex-col justify-between px-5 pb-10 pt-32 sm:px-8 md:pt-40 lg:px-14"
    >
      <h1 className="font-inter font-semibold uppercase leading-[0.92] tracking-[-0.04em] text-white">
        <span className="block overflow-hidden">
          <span
            data-intro-line
            className="block text-[clamp(3.4rem,12.5vw,11.5rem)]"
          >
            Selected
          </span>
        </span>
        <span className="block overflow-hidden">
          <span
            data-intro-line
            className="block text-[clamp(3.4rem,12.5vw,11.5rem)]"
          >
            Work
            <sup className="ml-3 align-super font-commit text-[clamp(0.8rem,2vw,1.4rem)] font-normal tracking-[0.1em] text-white/35">
              ({projectCount})
            </sup>
          </span>
        </span>
      </h1>

      <div className="mt-16 flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
        <p
          data-intro-fade
          className="max-w-md text-base leading-7 text-white/55 sm:text-lg sm:leading-8"
        >
          I design and build thoughtful digital experiences that balance
          performance with aesthetics — crafted with attention to detail,
          usability, and a seamless user journey.
        </p>
        <div
          data-intro-fade
          className="flex items-center gap-3 font-commit text-[10px] uppercase tracking-[0.2em] text-white/30"
        >
          <span className="inline-block h-8 w-px animate-pulse bg-white/30" />
          Scroll to explore
        </div>
      </div>
    </section>
  );
}

/* ─── Lerped "View" cursor tag ─────────────────────────────────── */
function useCursorTag() {
  const frameRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const mouse = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  const onMouseMove = useCallback((event: React.MouseEvent<HTMLElement>) => {
    const rect = frameRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouse.current = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  }, []);

  useEffect(() => {
    const tick = () => {
      pos.current.x += (mouse.current.x - pos.current.x) * 0.14;
      pos.current.y += (mouse.current.y - pos.current.y) * 0.14;
      if (tagRef.current) {
        const halfWidth = tagRef.current.offsetWidth / 2;
        const halfHeight = tagRef.current.offsetHeight / 2;
        tagRef.current.style.transform = `translate(${pos.current.x - halfWidth}px, ${pos.current.y - halfHeight}px)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return { frameRef, tagRef, visible, setVisible, onMouseMove };
}

/* ─── Project chapter ──────────────────────────────────────────── */
function ProjectSection({
  project,
  index,
  total,
}: {
  project: ProjectMeta;
  index: number;
  total: number;
}) {
  const rootRef = useRef<HTMLElement>(null);
  const { frameRef, tagRef, visible, setVisible, onMouseMove } = useCursorTag();
  const reversed = index % 2 === 1;
  const indexLabel = String(index + 1).padStart(2, "0");

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const frame = root.querySelector("[data-frame]");
      const parallax = root.querySelector("[data-parallax]");
      const ghost = root.querySelector("[data-ghost]");
      const lines = root.querySelectorAll("[data-reveal-line]");
      const fades = root.querySelectorAll("[data-reveal-fade]");

      if (prefersReducedMotion()) {
        gsap.set(lines, { yPercent: 0 });
        gsap.set(fades, { opacity: 1, y: 0 });
        if (frame) gsap.set(frame, { clipPath: "inset(0% 0% 0% 0%)" });
        return;
      }

      // Cover reveal: frame un-clips as the section enters
      if (frame) {
        gsap.fromTo(
          frame,
          { clipPath: "inset(18% 8% 18% 8%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.3,
            ease: "power3.inOut",
            scrollTrigger: { trigger: frame, start: "top 82%", once: true },
          },
        );
      }

      // Parallax: image drifts inside its frame as you scroll past
      if (parallax) {
        gsap.fromTo(
          parallax,
          { yPercent: -9 },
          {
            yPercent: 9,
            ease: "none",
            scrollTrigger: {
              trigger: root,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      }

      // Ghost index drifts the opposite way, slower
      if (ghost) {
        gsap.fromTo(
          ghost,
          { yPercent: 18 },
          {
            yPercent: -18,
            ease: "none",
            scrollTrigger: {
              trigger: root,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      }

      // Text: masked line reveals + staggered fades
      gsap.set(lines, { yPercent: 110 });
      gsap.set(fades, { opacity: 0, y: 18 });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: root, start: "top 62%", once: true },
      });
      tl.to(lines, {
        yPercent: 0,
        duration: 0.9,
        stagger: 0.08,
        ease: "power4.out",
      }).to(
        fades,
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: "power3.out" },
        "-=0.5",
      );
    }, root);

    return () => ctx.revert();
  }, []);

  const href = `/work/case-studies/${project.slug}`;

  return (
    <section
      ref={rootRef}
      id={`project-${project.slug}`}
      data-project-section
      className="relative flex min-h-screen items-center overflow-hidden px-5 py-20 sm:px-8 lg:px-14 lg:py-28"
    >
      {/* Ghost index number */}
      <span
        data-ghost
        aria-hidden
        className={`pointer-events-none absolute top-8 select-none font-inter text-[clamp(9rem,24vw,22rem)] font-semibold leading-none tracking-[-0.05em] text-white/[0.04] ${
          reversed ? "left-0 -translate-x-[8%]" : "right-0 translate-x-[8%]"
        }`}
      >
        {indexLabel}
      </span>

      <div className="mx-auto grid w-full max-w-[1500px] items-end gap-8 lg:grid-cols-12 lg:gap-12">
        {/* Cover */}
        <div
          className={`lg:col-span-8 ${reversed ? "lg:order-2 lg:col-start-5" : "lg:order-1"}`}
        >
          <TransitionLink
            href={href}
            aria-label={`View case study: ${project.title}`}
            className="block"
          >
            <div
              ref={frameRef}
              data-frame
              onMouseMove={onMouseMove}
              onMouseEnter={() => setVisible(true)}
              onMouseLeave={() => setVisible(false)}
              className="group relative aspect-[16/10] w-full overflow-hidden rounded-[4px] shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_0_0_1px_rgba(255,255,255,0.06),0_40px_80px_rgba(0,0,0,0.6)] lg:cursor-none"
            >
              <div className="h-full w-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]">
                <div data-parallax className="absolute -inset-y-[12%] inset-x-0">
                  <ViewTransition name={`case-${project.slug}`}>
                    <Image
                      fill
                      src={project.coverImage}
                      alt={project.title}
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      className="object-cover"
                    />
                  </ViewTransition>
                </div>
              </div>

              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(8,8,8,0.35),transparent_40%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              {/* Lerped cursor tag */}
              <div
                ref={tagRef}
                className="pointer-events-none absolute left-0 top-0 z-10 hidden items-center gap-1 whitespace-nowrap rounded-full bg-white px-[14px] py-[6px] font-commit text-[10px] uppercase tracking-[0.12em] text-black transition-opacity duration-200 lg:flex"
                style={{ opacity: visible ? 1 : 0, willChange: "transform" }}
              >
                View
                <IconArrowUpRight size={12} stroke={2} />
              </div>
            </div>
          </TransitionLink>
        </div>

        {/* Text block */}
        <div
          className={`flex flex-col gap-5 lg:col-span-4 lg:pb-2 ${
            reversed ? "lg:order-1 lg:col-start-1 lg:row-start-1" : "lg:order-2"
          }`}
        >
          <div
            data-reveal-fade
            className="flex items-center gap-3 font-commit text-[10px] tracking-[0.15em] text-white/35"
          >
            <span>
              {indexLabel} / {String(total).padStart(2, "0")}
            </span>
            <span className="h-px w-8 bg-white/20" />
            <span>{project.year}</span>
            {project.draft ? (
              <>
                <span className="h-px w-8 bg-white/20" />
                <span className="flex items-center gap-1.5 text-[#c4a8ff]/70">
                  <span className="inline-block h-1 w-1 animate-pulse rounded-full bg-[#9b6dff]" />
                  Writing
                </span>
              </>
            ) : null}
          </div>

          <TransitionLink href={href} className="group/title block no-underline">
            <h2 className="overflow-hidden font-inter font-semibold uppercase leading-[1.02] tracking-[-0.03em] text-white">
              <span
                data-reveal-line
                className="block text-[clamp(2rem,4.5vw,3.6rem)] transition-colors duration-300 group-hover/title:text-[#c4a8ff]"
              >
                {project.title}
              </span>
            </h2>
          </TransitionLink>

          <p
            data-reveal-fade
            className="max-w-sm text-sm leading-relaxed text-white/50"
          >
            {project.subtitle}
          </p>

          <div data-reveal-fade className="flex flex-col gap-4">
            <p className="font-commit text-[11px] uppercase tracking-[0.1em] text-white/40">
              {project.role}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="glass-pill rounded-full px-[9px] py-1 font-commit text-[10px] uppercase tracking-[0.1em] text-white/35"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Closing CTA ──────────────────────────────────────────────── */
function ClosingCta() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const lines = root.querySelectorAll("[data-reveal-line]");
      const fades = root.querySelectorAll("[data-reveal-fade]");

      if (prefersReducedMotion()) {
        gsap.set(lines, { yPercent: 0 });
        gsap.set(fades, { opacity: 1, y: 0 });
        return;
      }

      gsap.set(lines, { yPercent: 110 });
      gsap.set(fades, { opacity: 0, y: 16 });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: root, start: "top 70%", once: true },
      });
      tl.to(lines, {
        yPercent: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power4.out",
      }).to(
        fades,
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: "power3.out" },
        "-=0.5",
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="flex min-h-[70vh] flex-col items-center justify-center gap-8 px-5 py-24 text-center"
    >
      <p
        data-reveal-fade
        className="font-commit text-[10px] uppercase tracking-[0.2em] text-white/30"
      >
        Next step
      </p>

      <h2 className="font-inter font-semibold uppercase leading-[0.95] tracking-[-0.04em] text-white">
        <span className="block overflow-hidden">
          <span data-reveal-line className="block text-[clamp(2.4rem,7vw,6rem)]">
            Have a project
          </span>
        </span>
        <span className="block overflow-hidden">
          <span data-reveal-line className="block text-[clamp(2.4rem,7vw,6rem)]">
            in mind?
          </span>
        </span>
      </h2>

      <div data-reveal-fade>
        <CalButton>
          <button
            type="button"
            data-cal-namespace="30min"
            data-cal-link="iniranjan/30min"
            data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true","theme":"dark"}'
            className="glass-frosted group flex cursor-pointer items-center gap-3 rounded-[4px] px-7 py-4 text-xs font-semibold uppercase tracking-[0.14em] text-white/85 transition-colors duration-300 hover:text-white"
          >
            Schedule a call
            <IconArrowUpRight
              size={14}
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#9b6dff]"
            />
          </button>
        </CalButton>
      </div>
    </section>
  );
}

/* ─── Page ─────────────────────────────────────────────────────── */
export function ProjectsClient({ projects }: ProjectsClientProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const sections = Array.from(
      container.querySelectorAll<HTMLElement>("[data-project-section]"),
    );

    const triggers = sections.map((section, index) =>
      ScrollTrigger.create({
        trigger: section,
        start: "top center",
        end: "bottom center",
        onToggle: (self) => {
          if (self.isActive) setActiveIndex(index);
        },
      }),
    );

    return () => triggers.forEach((trigger) => trigger.kill());
  }, [projects.length]);

  return (
    <div ref={containerRef} className="relative min-h-screen w-full">
      <ScrollProgress />
      <SideIndex projects={projects} activeIndex={activeIndex} />

      <Intro projectCount={projects.length} />

      {projects.map((project, index) => (
        <ProjectSection
          key={project.slug}
          project={project}
          index={index}
          total={projects.length}
        />
      ))}

      <ClosingCta />
    </div>
  );
}
