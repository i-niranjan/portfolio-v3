"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  /** CSS selector to stagger-reveal inside the container */
  selector?: string;
  y?: number;
  stagger?: number;
  duration?: number;
  delay?: number;
}

export default function ScrollReveal({
  children,
  className,
  selector = "[data-reveal]",
  y = 28,
  stagger = 0.08,
  duration = 0.9,
  delay = 0,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reducedMotion) return;

    const targets = el.querySelectorAll<HTMLElement>(selector);
    if (!targets.length) return;

    const ctx = gsap.context(() => {
      gsap.set(targets, { opacity: 0, y });
      gsap.to(targets, {
        opacity: 1,
        y: 0,
        duration,
        delay,
        stagger,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          once: true,
        },
      });
    }, el);

    return () => ctx.revert();
  }, [selector, y, stagger, duration, delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
