"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";

/** Slow hover-float for decorative sprites (replaces animate-pulse). */
export default function FloatingSprite({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reducedMotion) return;

    const tween = gsap.to(el, {
      y: -8,
      rotation: -2,
      duration: 2.6,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
    });

    return () => {
      tween.kill();
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
