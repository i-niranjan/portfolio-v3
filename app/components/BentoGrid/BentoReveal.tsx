"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

/**
 * Boot-up entrance for the bento grid: cards cascade in from the top-left
 * of the grid while each card's border draws itself around the perimeter.
 * Expects cards marked with [data-reveal] and border rects with [data-border-draw].
 */
export default function BentoReveal({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reducedMotion) return;

    const cards = el.querySelectorAll<HTMLElement>("[data-reveal]");
    if (!cards.length) return;

    const ctx = gsap.context(() => {
      gsap.set(cards, {
        opacity: 0,
        y: 30,
        scale: 0.965,
        clipPath: "inset(6% 6% 6% 6% round 12px)",
      });

      ScrollTrigger.batch(cards, {
        start: "top 88%",
        once: true,
        onEnter: (batch) => {
          const tl = gsap.timeline();
          tl.to(batch, {
            opacity: 1,
            y: 0,
            scale: 1,
            clipPath: "inset(0% 0% 0% 0% round 12px)",
            duration: 0.85,
            stagger: 0.09,
            ease: "power3.out",
            clearProps: "clipPath,transform",
          });

          batch.forEach((card, index) => {
            const rect = (card as HTMLElement).querySelector(
              "[data-border-draw]",
            );
            if (!rect) return;
            tl.fromTo(
              rect,
              { strokeDashoffset: 1, opacity: 1 },
              {
                strokeDashoffset: 0,
                duration: 0.9,
                ease: "power2.inOut",
              },
              index * 0.09 + 0.1,
            ).to(rect, { opacity: 0, duration: 0.6 }, ">+0.15");
          });
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
