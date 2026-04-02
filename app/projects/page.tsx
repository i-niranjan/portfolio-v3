"use client";
import { Marquee } from "@/components/ui/marquee";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { IconArrowRight, IconX } from "@tabler/icons-react";

const PROJECT_META: Record<
  string,
  {
    title: string;
    description: string;
    slug: string;
    review: { initials: string; name: string; role: string; text: string };
  }
> = {
  "1": {
    title: "BMS Platform",
    description:
      "A comprehensive building management system with real-time monitoring, analytics and smart automation built for enterprise scale.",
    slug: "bms-platform",
    review: {
      initials: "AR",
      name: "Arjun Rao",
      role: "CTO, BuildCore",
      text: "Transformed how our team interacts with infrastructure. The clarity of the interface made adoption instant.",
    },
  },
  "2": {
    title: "Indinite",
    description:
      "End-to-end brand identity and mobile experience crafted for a next-gen startup pushing the boundaries of digital commerce.",
    slug: "indinite",
    review: {
      initials: "SM",
      name: "Sara Mehta",
      role: "Founder, Indinite",
      text: "We went from zero to a brand that people genuinely stop and notice. Every detail felt intentional.",
    },
  },
  "3": {
    title: "SCK",
    description:
      "A bold e-commerce storefront engineered for conversion, built around visual storytelling and a frictionless checkout flow.",
    slug: "sck",
    review: {
      initials: "KP",
      name: "Kabir Patel",
      role: "Head of Growth, SCK",
      text: "Conversion jumped 38% in the first month. The storefront finally matches the quality of our product.",
    },
  },
  "4": {
    title: "VOS",
    description:
      "Voice-operated software with an intuitive, accessibility-first interface designed to reduce friction for power users.",
    slug: "vos",
    review: {
      initials: "LN",
      name: "Leila Nouri",
      role: "Product Lead, VOS",
      text: "The design thinking here is rare. Users with accessibility needs finally felt seen and prioritized.",
    },
  },
  "5": {
    title: "VOS Story",
    description:
      "A visual campaign capturing the origin story and mission behind VOS through motion and editorial design.",
    slug: "vos-story",
    review: {
      initials: "RK",
      name: "Rohan Kumar",
      role: "Marketing Director, VOS",
      text: "The campaign ran for 3 weeks and our story reach tripled. It finally felt like us.",
    },
  },
  "6": {
    title: "Yonnova",
    description:
      "Modern brand identity and digital presence for an innovative health-tech company entering a crowded market with clarity.",
    slug: "yonnova",
    review: {
      initials: "DN",
      name: "Divya Nair",
      role: "CEO, Yonnova",
      text: "We looked like a Series B company on day one of launch. Investors noticed before we even pitched.",
    },
  },
};

// Word-by-word smooth fade — keep as is
function WordFadeText({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <p className="text-white/60 text-sm leading-relaxed">
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, filter: "blur(4px)", y: 4 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          transition={{
            delay: 0.35 + i * 0.03,
            duration: 0.28,
            ease: "easeOut",
          }}
          className="inline-block mr-[4px]"
        >
          {word}
        </motion.span>
      ))}
    </p>
  );
}

function FilmStrip({ src, title }: { src: string; title: string }) {
  return (
    <div
      className="relative flex items-center justify-center"
      style={{ height: 420 }}
    >
      {/* Ghost strip — scrolling film behind */}
      <div
        className="absolute overflow-hidden"
        style={{
          width: 180,
          height: 420,
          right: 40,
          opacity: 0.12,
          borderRadius: 4,
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)",
        }}
      >
        <motion.div
          animate={{ y: ["0%", "-50%"] }}
          transition={{ duration: 8, ease: "linear", repeat: Infinity }}
          style={{ display: "flex", flexDirection: "column" }}
        >
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="relative flex-shrink-0"
              style={{ width: 180, height: 120, marginBottom: 6 }}
            >
              <Image
                fill
                src={src}
                alt=""
                className="object-cover"
                style={{ borderRadius: 3 }}
              />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Second ghost strip — opposite direction, further right */}
      <div
        className="absolute overflow-hidden"
        style={{
          width: 140,
          height: 360,
          right: -10,
          opacity: 0.07,
          borderRadius: 4,
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 25%, black 75%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, black 25%, black 75%, transparent 100%)",
        }}
      >
        <motion.div
          animate={{ y: ["-50%", "0%"] }}
          transition={{ duration: 11, ease: "linear", repeat: Infinity }}
          style={{ display: "flex", flexDirection: "column" }}
        >
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="relative flex-shrink-0"
              style={{ width: 140, height: 100, marginBottom: 6 }}
            >
              <Image
                fill
                src={src}
                alt=""
                className="object-cover"
                style={{ borderRadius: 3 }}
              />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Main tall portrait card */}
      <motion.div
        initial={{ opacity: 0, y: 30, rotate: -1 }}
        animate={{ opacity: 1, y: 0, rotate: -1 }}
        transition={{ delay: 0.25, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative flex-shrink-0"
        style={{
          width: 220,
          height: 340,
          borderRadius: 6,
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,0.1)",
          zIndex: 10,
        }}
      >
        <Image fill src={src} alt={title} className="object-cover" />
        {/* Top edge film holes detail */}
        <div
          className="absolute top-0 left-0 right-0 flex justify-around items-center px-2"
          style={{ height: 14, background: "rgba(0,0,0,0.55)" }}
        >
          {[...Array(7)].map((_, i) => (
            <div
              key={i}
              style={{
                width: 6,
                height: 4,
                borderRadius: 1,
                background: "rgba(255,255,255,0.15)",
              }}
            />
          ))}
        </div>
        <div
          className="absolute bottom-0 left-0 right-0 flex justify-around items-center px-2"
          style={{ height: 14, background: "rgba(0,0,0,0.55)" }}
        >
          {[...Array(7)].map((_, i) => (
            <div
              key={i}
              style={{
                width: 6,
                height: 4,
                borderRadius: 1,
                background: "rgba(255,255,255,0.15)",
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function ExpandedOverlay({
  project,
  src,
  onClose,
}: {
  project: (typeof PROJECT_META)[string];
  src: string;
  onClose: () => void;
}) {
  return createPortal(
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.45 }}
        className="fixed inset-0 z-[9998]"
        style={{ backdropFilter: "blur(22px) brightness(0.25)" }}
        onClick={onClose}
      />

      <motion.div
        className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div
          className="pointer-events-auto w-full max-w-[900px] px-8 flex items-center gap-16"
          style={{ minHeight: 480 }}
        >
          {/* LEFT — text content — untouched */}
          <div className="flex-1 flex flex-col gap-6 min-w-0">
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.5, ease: "easeOut" }}
              style={{ transformOrigin: "left" }}
              className="h-px bg-white/25 w-12"
            />

            <div className="overflow-hidden">
              <motion.h1
                className="text-white font-semibold tracking-tight leading-none"
                style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)" }}
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  delay: 0.15,
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {project.title}
              </motion.h1>
            </div>

            <WordFadeText text={project.description} />

            <motion.a
              href={`/case-studies/${project.slug}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85, duration: 0.35, ease: "easeOut" }}
              className="self-start inline-flex items-center gap-3 text-xs font-semibold text-white border border-white/40 hover:bg-white/10 transition-colors duration-200 px-5 py-3 tracking-widest uppercase"
              style={{ borderRadius: 0 }}
            >
              Read Case Study
              <IconArrowRight size={14} stroke={2} />
            </motion.a>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.05, duration: 0.4, ease: "easeOut" }}
              className="flex items-start gap-3 border-t border-white/10 pt-5 mt-1"
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-white text-xs font-semibold">
                {project.review.initials}
              </div>
              <div className="flex flex-col gap-1 min-w-0">
                <div className="flex items-baseline gap-2">
                  <span className="text-white text-xs font-semibold">
                    {project.review.name}
                  </span>
                  <span className="text-white/35 text-xs">
                    {project.review.role}
                  </span>
                </div>
                <p className="text-white/50 text-xs leading-relaxed">
                  "{project.review.text}"
                </p>
              </div>
            </motion.div>
          </div>

          {/* RIGHT — film strip */}
          <motion.div
            className="flex-shrink-0"
            style={{ width: "42%" }}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: 0.15,
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <FilmStrip src={src} title={project.title} />
          </motion.div>
        </div>

        <motion.button
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="absolute top-8 right-8 text-white/30 hover:text-white/70 transition-colors duration-200 pointer-events-auto flex items-center gap-2 text-xs tracking-widest uppercase"
          style={{ background: "none", border: "none", cursor: "pointer" }}
        >
          <IconX size={14} stroke={1.5} />
          Esc
        </motion.button>
      </motion.div>
    </>,
    document.body,
  );
}

export default function Projects() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  const projects = [
    { id: "1", src: "/projects/bms_2.png" },
    { id: "2", src: "/projects/indinite_2.png" },
    { id: "3", src: "/projects/sck.png" },
    { id: "4", src: "/projects/vos_2.png" },
    { id: "5", src: "/projects/vos-story.png" },
    { id: "6", src: "/projects/yonnova.png" },
  ];

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setExpandedId(null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const isAnyHovered = hoveredId !== null;
  const expandedProject = expandedId ? PROJECT_META[expandedId] : null;
  const expandedSrc = projects.find((p) => p.id === expandedId)?.src ?? "";

  return (
    <div className="min-h-screen w-full">
      <div
        className="fixed inset-0 bg-black pointer-events-none z-10 transition-opacity duration-500 ease-in-out"
        style={{ opacity: isAnyHovered ? 0.55 : 0 }}
      />

      <div className="max-w-7xl mx-auto">
        <div className="w-full flex items-center pt-45 pb-20">
          <div className="w-full flex justify-end">
            <h1 className="text-white text-3xl font-inter leading-12 text-left max-w-3xl">
              I design and build thoughtful digital experiences that balance
              performance with aesthetics. Each project is crafted with
              attention to detail, focusing on usability, clarity, and a
              seamless user journey.
            </h1>
          </div>
        </div>
      </div>

      <div className="w-full relative z-20">
        <Marquee pauseOnHover className="[--duration:20s]">
          {projects.map((i) => {
            const isHovered = hoveredId === i.id;
            const isDimmed = isAnyHovered && !isHovered;

            return (
              <div
                key={i.id}
                onMouseEnter={() => setHoveredId(i.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => setExpandedId(i.id)}
                className="relative glass-frosted w-100 h-50 rounded-sm cursor-pointer"
                style={{
                  transition:
                    "transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), filter 0.4s ease, opacity 0.4s ease",
                  transform: isHovered ? "scale(1.08)" : "scale(1)",
                  filter: isDimmed
                    ? "blur(3px) brightness(0.5)"
                    : "blur(0px) brightness(1)",
                  opacity: isDimmed ? 0.6 : 1,
                  zIndex: isHovered ? 30 : 1,
                }}
              >
                <Image
                  fill
                  src={i.src}
                  alt="project images"
                  className="object-cover"
                />
              </div>
            );
          })}
        </Marquee>
      </div>

      {mounted && expandedProject && (
        <AnimatePresence>
          <ExpandedOverlay
            key={expandedId}
            project={expandedProject}
            src={expandedSrc}
            onClose={() => setExpandedId(null)}
          />
        </AnimatePresence>
      )}
    </div>
  );
}
