import { IconArrowUpRight, IconX } from "@tabler/icons-react";
import { motion } from "motion/react";
import Image from "next/image";
import { createPortal } from "react-dom";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  ViewTransition,
} from "react";
import type { ProjectMeta } from "./types";
import { DitherShader } from "@/components/ui/dither-shader"; // adjust path
import { useRouter } from "next/navigation";
import { navigateWithTransition } from "@/lib/view-transition-navigation";
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

function RightFrame({
  project,
  isClosing,
}: {
  project: ProjectMeta;
  isClosing: boolean;
}) {
  const frameRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const mouse = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const [tagVisible, setTagVisible] = useState(false);
  const [settled, setSettled] = useState(false);
  const [showReal, setShowReal] = useState(false);

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      const rect = frameRef.current?.getBoundingClientRect();
      if (!rect) return;
      mouse.current = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };
    },
    [],
  );

  useEffect(() => {
    const t = window.setTimeout(() => setSettled(true), 80);
    return () => window.clearTimeout(t);
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
      <ViewTransition name={`case-${project.slug}`}>
        <div
          ref={frameRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => {
            if (isClosing) return;
            setTagVisible(true);
            setShowReal(true);
          }}
          onMouseLeave={() => {
            setTagVisible(false);
            setShowReal(false);
          }}
          className="glass-card relative aspect-video w-full cursor-none overflow-hidden rounded-[2px]"
        >
          <DitherShader
            src={project.coverImage}
            ditherMode="noise"
            colorMode="original"
            primaryColor="#000000"
            secondaryColor="#9b6dff"
            gridSize={2}
            brightness={-0.1}
            contrast={1.15}
            objectFit="cover"
            animated={true}
            className="absolute inset-0 h-full w-full"
          />

          <div
            className="absolute inset-0"
            style={{
              opacity: showReal && !isClosing ? 1 : 0,
              transition: "opacity 800ms cubic-bezier(0.4, 0, 0.2, 1)",
            }}
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
          </div>

          <div
            ref={tagRef}
            className="pointer-events-none absolute left-0 top-0 z-10 whitespace-nowrap rounded-full bg-white px-[14px] py-[6px] font-commit text-[10px] uppercase tracking-[0.12em] text-black transition-opacity duration-200"
            style={{
              opacity: tagVisible && !isClosing ? 1 : 0,
              willChange: "transform",
            }}
          >
            View -&gt;
          </div>
        </div>
      </ViewTransition>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="mb-1 text-xs font-medium tracking-[0.01em] text-white/55">
            {project.title}
          </p>
          <p className="font-commit text-[11px] tracking-[0.08em] text-white">
            {project.year}
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
  const [closing, setClosing] = useState(false);
  const router = useRouter();
  const handleClose = useCallback(() => {
    if (closing) return;
    setClosing(true);
    // Beat 1: dither reclaims (0–400ms)
    // Beat 2: modal exits (400–750ms)
    setTimeout(onClose, 750);
  }, [closing, onClose]);

  // Esc key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [handleClose]);

  return createPortal(
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: closing ? 0 : 1 }}
        transition={{ duration: closing ? 0.35 : 0.45, ease: "easeInOut" }}
        className="fixed inset-0 z-[9998]"
        style={{ backdropFilter: "blur(8px) grayscale(100%) brightness(0.6)" }}
        onClick={handleClose}
      />

      {/* Modal */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 md:p-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="glass-frosted pointer-events-auto relative flex max-h-[calc(100vh-2rem)] w-full max-w-[960px] flex-col gap-7 overflow-y-auto rounded-[4px] bg-black/90 px-5 py-6 backdrop-blur-2xl sm:px-7 sm:py-8 md:mx-8 md:min-h-[480px] md:flex-row md:items-center md:gap-16 md:overflow-hidden md:px-10 md:py-10"
          initial={{ opacity: 0, y: 12, scale: 0.985 }}
          animate={{
            opacity: closing ? 0 : 1,
            y: closing ? 16 : 0,
            scale: closing ? 0.97 : 1,
            filter: closing ? "blur(6px)" : "blur(0px)",
          }}
          transition={{
            duration: closing ? 0.35 : 0.5,
            // Exit starts after dither has had 400ms to reclaim
            delay: closing ? 0.4 : 0,
            ease: closing ? [0.4, 0, 1, 1] : [0.22, 1, 0.36, 1],
          }}
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

            <motion.button
              onClick={() => {
                navigateWithTransition(
                  router.push,
                  `/work/case-studies/${project.slug}`,
                );
                handleClose(); // let animation run alongside
              }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85, duration: 0.35, ease: "easeOut" }}
              whileHover="hovered"
              className="glass-card group relative flex w-full cursor-pointer items-center justify-center gap-3 overflow-hidden rounded-[2px] px-[18px] py-[10px] text-xs font-semibold uppercase tracking-[0.14em] text-white/85 no-underline sm:w-max sm:justify-start"
              style={{ background: "rgba(255,255,255,0.05)" }}
            >
              {/* Purple shimmer sweep on hover */}
              <motion.span
                className="pointer-events-none absolute inset-0"
                variants={{
                  hovered: {
                    background: [
                      "linear-gradient(90deg, transparent 0%, rgba(155,109,255,0.08) 50%, transparent 100%)",
                      "linear-gradient(90deg, transparent 100%, rgba(155,109,255,0.08) 150%, transparent 200%)",
                    ],
                    x: ["-100%", "100%"],
                    transition: { duration: 0.55, ease: "easeInOut" },
                  },
                }}
              />

              <motion.span
                variants={{
                  hovered: { x: 2, color: "rgba(255,255,255,1)" },
                }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="relative z-10"
              >
                Read Case Study
              </motion.span>

              {/* Arrow shifts diagonally and brightens */}
              <motion.span
                className="relative z-10"
                variants={{
                  hovered: {
                    x: 3,
                    y: -3,
                    color: "#9b6dff",
                  },
                }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <IconArrowUpRight size={14} />
              </motion.span>

              {/* Bottom border pulse — draws in from left on hover */}
              <motion.span
                className="pointer-events-none absolute bottom-0 left-0 h-px bg-[#9b6dff]"
                initial={{ scaleX: 0, opacity: 0 }}
                variants={{
                  hovered: {
                    scaleX: 1,
                    opacity: 0.6,
                    transition: { duration: 0.3, ease: "easeOut" },
                  },
                }}
                style={{ transformOrigin: "left", width: "100%" }}
              />
            </motion.button>
          </div>

          <motion.div
            className="relative z-[1] flex w-full flex-shrink-0 flex-col gap-4 md:w-[46%]"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: 0.15,
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <RightFrame project={project} isClosing={closing} />
          </motion.div>
        </motion.div>

        {/* Close button */}
        <div className="absolute right-4 top-4 sm:right-8 sm:top-8">
          <motion.button
            type="button"
            onClick={handleClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: closing ? 0 : 1 }}
            transition={{ delay: closing ? 0 : 0.6, duration: 0.2 }}
            className="glass-pill pointer-events-auto flex items-center gap-2 rounded-full bg-white/4 px-[14px] py-[6px] text-[11px] uppercase tracking-[0.12em] text-white/30 transition-colors duration-200 hover:bg-white/8 hover:text-white/75"
          >
            <IconX size={14} stroke={1.5} />
            Esc
          </motion.button>
        </div>
      </motion.div>
    </>,
    document.body,
  );
}
