"use client";

import gsap from "gsap";
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
        const beams = gsap.utils.toArray<HTMLElement>(".grid-beam", root);

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

        beams.forEach((beam) => {
          const run = () => {
            gsap.set(beam, { top: "-15%", opacity: 0 });
            const travel = gsap.utils.random(3.5, 7);
            const tl = gsap.timeline({
              onComplete: () => {
                gsap.delayedCall(gsap.utils.random(2.5, 7), run);
              },
            });
            tl.to(beam, {
              opacity: gsap.utils.random(0.4, 0.75),
              duration: 0.5,
              ease: "sine.out",
            })
              .to(
                beam,
                {
                  top: "115%",
                  duration: travel,
                  ease: "none",
                },
                0,
              )
              .to(
                beam,
                {
                  opacity: 0,
                  duration: 0.7,
                  ease: "sine.in",
                },
                `>-${Math.min(0.9, travel * 0.2)}`,
              );
          };
          gsap.delayedCall(gsap.utils.random(0, 4), run);
        });
      }, root);

      cleanup = () => ctx.revert();
    };

    animate();

    return () => cleanup?.();
  }, []);

  return (
    <div ref={rootRef} className="fixed inset-0 pointer-events-none -z-10">
      <div className={`${containerClass} relative h-full overflow-hidden`}>
        {separators.map((col) => {
          const pct = (col / 12) * 100;
          const beamOnFirst = col % 4 === 0;

          return (
            <div
              key={col}
              className="grid-separator absolute top-0 h-full"
              style={{ left: `${pct}%`, transform: "translateX(0)" }}
            >
              <div
                className={`grid-line absolute top-0 h-full w-px ${lineOpacity}`}
                style={{ transform: `translateX(${-(gapPx + 1)}px)` }}
              >
                {beamOnFirst && (
                  <span
                    className="grid-beam absolute left-1/2 -translate-x-1/2 top-0 h-24 w-px pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.85) 50%, transparent 100%)",
                      boxShadow: "0 0 6px rgba(255,255,255,0.45)",
                      opacity: 0,
                    }}
                  />
                )}
              </div>
              <div
                className={`grid-line absolute top-0 h-full w-px ${lineOpacity}`}
                style={{ transform: `translateX(${1}px)` }}
              >
                {!beamOnFirst && (
                  <span
                    className="grid-beam absolute left-1/2 -translate-x-1/2 top-0 h-24 w-px pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.85) 50%, transparent 100%)",
                      boxShadow: "0 0 6px rgba(255,255,255,0.45)",
                      opacity: 0,
                    }}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
