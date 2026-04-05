import { IconX } from "@tabler/icons-react";
import { motion } from "motion/react";
import Image from "next/image";
import { createPortal } from "react-dom";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ProjectMeta } from "./types";

interface ExpandedOverlayProps {
  project: ProjectMeta;
  onClose: () => void;
}

function WordFadeText({ text }: { text: string }) {
  return (
    <p className="text-sm leading-relaxed text-white/60">
      {text.split(" ").map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          initial={{ opacity: 0, filter: "blur(4px)", y: 4 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          transition={{
            delay: 0.35 + index * 0.03,
            duration: 0.28,
            ease: "easeOut",
          }}
          className="mr-1 inline-block"
        >
          {word}
        </motion.span>
      ))}
    </p>
  );
}

function RightFrame({ project }: { project: ProjectMeta }) {
  const frameRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const mouse = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const [tagVisible, setTagVisible] = useState(false);
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => setSettled(true), 80);
    return () => window.clearTimeout(timeoutId);
  }, []);

  const handleMouseMove = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    const rect = frameRef.current?.getBoundingClientRect();
    if (!rect) {
      return;
    }

    mouse.current = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  }, []);

  useEffect(() => {
    const tick = () => {
      pos.current.x += (mouse.current.x - pos.current.x) * 0.12;
      pos.current.y += (mouse.current.y - pos.current.y) * 0.12;

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

  return (
    <div className="flex flex-col gap-4">
      <div
        ref={frameRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setTagVisible(true)}
        onMouseLeave={() => setTagVisible(false)}
        className="glass-card relative aspect-video w-full cursor-none overflow-hidden rounded-[2px]"
      >
        <Image
          fill
          src={project.coverImage}
          alt={project.title}
          className="object-cover"
          style={{
            transform: settled ? "scale(1)" : "scale(1.05)",
            transition: "transform 0.85s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        />

        <div
          ref={tagRef}
          className="pointer-events-none absolute left-0 top-0 z-10 whitespace-nowrap rounded-full bg-white px-[14px] py-[6px] font-commit text-[10px] uppercase tracking-[0.12em] text-black transition-opacity duration-200"
          style={{
            opacity: tagVisible ? 1 : 0,
            willChange: "transform",
          }}
        >
          View -&gt;
        </div>
      </div>

      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="mb-1 text-xs font-medium tracking-[0.01em] text-white/55">
            {project.title}
          </p>
          <p className="font-commit text-[11px] tracking-[0.08em] text-white/20">
            {project.client} / {project.year}
          </p>
        </div>

        <div className="flex flex-wrap justify-end gap-1.5">
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
  );
}

export function ExpandedOverlay({ project, onClose }: ExpandedOverlayProps) {
  return createPortal(
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.45 }}
        className="fixed inset-0 z-[9998]"
        style={{ backdropFilter: "blur(22px) brightness(0.22)" }}
        onClick={onClose}
      />

      <motion.div
        className="pointer-events-none fixed inset-0 z-[9999] flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="glass-frosted pointer-events-auto relative mx-8 flex min-h-[480px] w-full max-w-[960px] items-center gap-16 overflow-hidden rounded-[4px] px-10 py-10"
          style={{ background: "rgba(255,255,255,0.03)" }}
          initial={{ opacity: 0, y: 12, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.99 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative z-[1] flex min-w-0 flex-1 flex-col gap-6">
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.5, ease: "easeOut" }}
              style={{ transformOrigin: "left" }}
              className="h-px w-12 bg-white/25"
            />

            <div className="overflow-hidden">
              <motion.h1
                className="leading-none font-semibold tracking-tight text-white"
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
              href={`/projects/case-studies/${project.slug}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85, duration: 0.35, ease: "easeOut" }}
              className="glass-card inline-flex self-start gap-3 overflow-hidden rounded-[2px] px-[18px] py-[10px] text-[11px] font-semibold uppercase tracking-[0.14em] text-white/85 no-underline transition-colors duration-200 hover:bg-white/9"
              style={{ background: "rgba(255,255,255,0.05)" }}
            >
              Read Case Study
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M2 10L10 2M10 2H4M10 2v6" />
              </svg>
            </motion.a>
          </div>

          <motion.div
            className="relative z-[1] flex w-[46%] flex-shrink-0 flex-col gap-4"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: 0.15,
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <RightFrame project={project} />
          </motion.div>
        </motion.div>

        <motion.button
          type="button"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="glass-pill pointer-events-auto absolute right-8 top-8 flex items-center gap-2 rounded-full bg-white/4 px-[14px] py-[6px] text-[11px] uppercase tracking-[0.12em] text-white/30 transition-colors duration-200 hover:bg-white/8 hover:text-white/75"
        >
          <IconX size={14} stroke={1.5} />
          Esc
        </motion.button>
      </motion.div>
    </>,
    document.body,
  );
}
