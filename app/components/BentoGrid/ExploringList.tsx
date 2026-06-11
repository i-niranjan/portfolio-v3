"use client";

import gsap from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrambleTextPlugin, ScrollTrigger);

export default function ExploringList({ items }: { items: string[] }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reducedMotion) {
      root
        .querySelectorAll<HTMLElement>("[data-typed-text]")
        .forEach((line) => {
          line.textContent = line.dataset.typedText ?? "";
        });
      return;
    }

    const ctx = gsap.context(() => {
      const lines = root.querySelectorAll<HTMLElement>("[data-typed-text]");
      const cursors = root.querySelectorAll<HTMLElement>("[data-typed-cursor]");

      gsap.set(cursors, { opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: root, start: "top 85%", once: true },
      });

      lines.forEach((line, index) => {
        const cursor = cursors[index];
        if (cursor) tl.set(cursor, { opacity: 1 });
        tl.to(line, {
          duration: 0.9,
          ease: "none",
          scrambleText: {
            text: line.dataset.typedText ?? "",
            chars: "!@#$%░▒▓01",
            speed: 0.4,
            tweenLength: false,
          },
        });
        // Cursor hands off to the next line; the last one keeps blinking
        if (cursor && index < lines.length - 1) {
          tl.set(cursor, { opacity: 0 });
        }
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="space-y-4">
      {items.map((text, index) => (
        <span
          key={text}
          className="flex items-center gap-2 text-xs text-white/90"
        >
          <ArrowRight size={14} className="shrink-0" />
          <span data-typed-text={text} className="font-mono" />
          <span
            data-typed-cursor
            className={
              index === items.length - 1
                ? "animate-pulse text-primary/60"
                : "text-primary/60"
            }
          >
            ▋
          </span>
        </span>
      ))}
    </div>
  );
}
