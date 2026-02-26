"use client";

import gsap from "gsap";
import { ChartBarIcon } from "lucide-react";
import React, { useEffect, useRef } from "react";

export default function DoubleLineGridOverlay({
  containerClass = "max-w-7xl mx-auto",

  lineOpacity = "bg-white/10",
  gapPx = 10,
}: {
  containerClass?: string;
  evenColShade?: string;
  lineOpacity?: string;
  gapPx?: number;
}) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const separators = [0, 2, 4, 6, 8, 10, 12];

  useEffect(() => {
    let cleanup: (() => void) | undefined;

    const animate = async () => {
      const root = rootRef.current;
      if (!root) {
        return;
      }

      const ctx = gsap.context(() => {
        const lines = gsap.utils.toArray<HTMLElement>(".grid-line", root);
        const separatorsEls = gsap.utils.toArray<HTMLElement>(
          ".grid-separator",
          root,
        );

        if (!lines.length || !separatorsEls.length) {
          return;
        }

        gsap.set(lines, { opacity: 0.08 });

        gsap.to(lines, {
          opacity: 0.3,
          duration: 3.8,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          stagger: {
            each: 0.05,
            from: "random",
          },
        });

        gsap.to(separatorsEls, {
          x: () => gsap.utils.random(-3, 3),
          y: () => gsap.utils.random(-2, 2),
          duration: () => gsap.utils.random(8, 12),
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          stagger: {
            each: 0.2,
            from: "edges",
          },
        });
      }, root);

      cleanup = () => ctx.revert();
    };

    animate();

    return () => cleanup?.();
  }, []);

  return (
    <div ref={rootRef} className="fixed inset-0 pointer-events-none -z-10">
      <div className={`${containerClass} relative h-full`}>
        {separators.map((col) => {
          const pct = (col / 12) * 100;

          return (
            <div
              key={col}
              className="grid-separator absolute top-0 h-full"
              style={{ left: `${pct}%`, transform: "translateX(0)" }}
            >
              <div
                className={`grid-line absolute top-0  h-full w-px ${lineOpacity}`}
                style={{ transform: `translateX(${-(gapPx + 1)}px)` }}
              />
              <div
                className={`grid-line absolute top-0 h-full w-px ${lineOpacity}`}
                style={{ transform: `translateX(${1}px)` }} // ~gap of gapPx between them
              ></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
