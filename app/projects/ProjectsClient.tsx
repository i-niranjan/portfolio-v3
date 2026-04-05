"use client";

import { ExpandedOverlay } from "@/app/projects/expandedOverlay";
import type { ProjectMeta } from "@/app/projects/types";
import { Marquee } from "@/components/ui/marquee";
import { AnimatePresence } from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface ProjectsClientProps {
  projects: ProjectMeta[];
}

export function ProjectsClient({ projects }: ProjectsClientProps) {
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  const [expandedSlug, setExpandedSlug] = useState<string | null>(null);

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setExpandedSlug(null);
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const isAnyHovered = hoveredSlug !== null;
  const expandedProject =
    projects.find((project) => project.slug === expandedSlug) ?? null;

  return (
    <div className="min-h-screen w-full">
      <div
        className="pointer-events-none fixed inset-0 z-10 bg-black transition-opacity duration-500 ease-in-out"
        style={{ opacity: isAnyHovered ? 0.55 : 0 }}
      />

      <div className="mx-auto max-w-7xl">
        <div className="flex w-full items-center pb-20 pt-45">
          <div className="flex w-full justify-end">
            <h1 className="max-w-3xl text-left font-inter text-3xl leading-12 text-white">
              I design and build thoughtful digital experiences that balance
              performance with aesthetics. Each project is crafted with
              attention to detail, focusing on usability, clarity, and a
              seamless user journey.
            </h1>
          </div>
        </div>
      </div>

      <div className="relative z-20 w-full">
        <Marquee pauseOnHover className="[--duration:20s]">
          {projects.map((project) => {
            const isHovered = hoveredSlug === project.slug;
            const isDimmed = isAnyHovered && !isHovered;

            return (
              <button
                key={project.slug}
                type="button"
                onMouseEnter={() => setHoveredSlug(project.slug)}
                onMouseLeave={() => setHoveredSlug(null)}
                onClick={() => setExpandedSlug(project.slug)}
                className="glass-frosted relative h-50 w-100 cursor-pointer overflow-hidden rounded-sm text-left"
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
                  src={project.coverImage}
                  alt={project.title}
                  className="object-cover"
                />
              </button>
            );
          })}
        </Marquee>
      </div>

      {expandedProject ? (
        <AnimatePresence>
          <ExpandedOverlay
            key={expandedProject.slug}
            project={expandedProject}
            onClose={() => setExpandedSlug(null)}
          />
        </AnimatePresence>
      ) : null}
    </div>
  );
}
