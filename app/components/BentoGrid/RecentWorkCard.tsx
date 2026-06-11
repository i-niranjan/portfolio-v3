"use client";

import TransitionLink from "@/app/components/TransitionLink";
import type { ProjectMeta } from "@/app/work/types";
import { useState } from "react";

const DEFAULT_BG = "/assets/brand-slide/indinite-slide.png";

export default function RecentWorkCard({
  projects,
}: {
  projects: ProjectMeta[];
}) {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  const backgrounds = [
    { key: "default", src: DEFAULT_BG },
    ...projects.map((project) => ({
      key: project.slug,
      src: project.coverImage,
    })),
  ];
  const activeKey = activeSlug ?? "default";

  return (
    <TransitionLink
      href="/work"
      className="relative block h-full w-full overflow-hidden"
    >
      {backgrounds.map(({ key, src }) => (
        <div
          key={key}
          className="absolute inset-0 bg-cover bg-center transition-[opacity,transform] duration-700 group-hover/work:scale-105"
          style={{
            backgroundImage: `url('${src}')`,
            opacity: key === activeKey ? 1 : 0,
          }}
          aria-hidden
        />
      ))}
      <div
        className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/0"
        aria-hidden
      />

      <div className="relative flex h-full w-full flex-col justify-between p-5">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(173,145,234,0.8)]" />
            <span className="text-[10px] uppercase tracking-[0.28em] text-white/50">
              Selected
            </span>
          </div>
          <span className="text-[10px] uppercase tracking-[0.28em] text-white/40 transition-colors group-hover/work:text-primary">
            View All →
          </span>
        </div>

        <div className="space-y-3">
          <div
            className="space-y-1.5"
            onMouseLeave={() => setActiveSlug(null)}
          >
            {projects.map((project) => (
              <div
                key={project.slug}
                onMouseEnter={() => setActiveSlug(project.slug)}
                className="flex items-center justify-between gap-3 border-b border-white/5 pb-1.5 text-sm last:border-0"
              >
                <span
                  className={`truncate transition-colors duration-300 ${
                    activeSlug === project.slug
                      ? "text-primary"
                      : "text-white/85"
                  }`}
                >
                  {project.title}
                </span>
                <span className="shrink-0 text-[11px] uppercase tracking-wider text-white/35">
                  {project.year}
                </span>
              </div>
            ))}
          </div>
          <div className="flex items-end justify-between pt-1">
            <div>
              <h3 className="text-xl">Recent Work</h3>
              <span className="text-sm text-white/50">
                Crafting Excellence
              </span>
            </div>
            <span className="text-primary transition-transform group-hover/work:translate-x-1">
              <RightArrow />
            </span>
          </div>
        </div>
      </div>
    </TransitionLink>
  );
}

const RightArrow = () => (
  <svg
    width="19"
    height="19"
    viewBox="0 0 19 19"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8.98179 0L6.74006 2.24173L11.3363 6.83792L9.07978 9.0944L11.3703 11.385L6.88689 15.8684L9.19252 18.174L18.1742 9.19239L8.98179 0Z"
      fill="#AD91EA"
    />
    <path
      d="M9.07998 9.09445L6.77434 6.78882L4.53262 9.03055L6.83825 11.3362L9.07998 9.09445Z"
      fill="#AD91EA"
    />
    <path
      d="M4.53254 9.0308L2.24198 6.74023L0.000252201 8.98196L2.29082 11.2725L4.53254 9.0308Z"
      fill="#AD91EA"
    />
  </svg>
);
