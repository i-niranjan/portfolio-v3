"use client";

import gsap from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrambleTextPlugin, ScrollTrigger);

/** Scrambles in its text on viewport entry, then does one CRT flicker. */
export default function ScrambleLabel({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      gsap
        .timeline({
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        })
        .to(el, {
          duration: 1,
          ease: "none",
          scrambleText: {
            text,
            chars: "!@#$%░▒▓01",
            speed: 0.4,
            tweenLength: false,
          },
        })
        .to(el, {
          duration: 0.07,
          opacity: 0.35,
          yoyo: true,
          repeat: 3,
          ease: "none",
        })
        .to(el, { opacity: 1, duration: 0.05 });
    }, el);

    return () => ctx.revert();
  }, [text]);

  // Text is rendered server-side and scrambled over; no-JS still shows it
  return (
    <span ref={ref} className={className}>
      {text}
    </span>
  );
}
