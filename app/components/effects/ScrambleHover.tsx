"use client";

import gsap from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { useRef } from "react";

gsap.registerPlugin(ScrambleTextPlugin);

/** Text that scrambles back into itself on hover. */
export default function ScrambleHover({
  text,
  className,
  chars = "!@#$%░▒▓01",
}: {
  text: string;
  className?: string;
  chars?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  const scramble = () => {
    const el = ref.current;
    if (!el || tweenRef.current?.isActive()) return;
    tweenRef.current = gsap.to(el, {
      duration: 0.6,
      ease: "none",
      scrambleText: { text, chars, speed: 0.5, tweenLength: false },
    });
  };

  return (
    <span ref={ref} onMouseEnter={scramble} className={className}>
      {text}
    </span>
  );
}
