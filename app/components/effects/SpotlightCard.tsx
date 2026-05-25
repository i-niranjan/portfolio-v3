"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  /** how much the card tilts in degrees (0 disables tilt) */
  tilt?: number;
}

export default function SpotlightCard({
  children,
  className,
  glowColor = "rgba(173,145,234,0.18)",
  tilt = 0,
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    const glow = glowRef.current;
    if (!el || !glow) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      glow.style.setProperty("--gx", `${x}px`);
      glow.style.setProperty("--gy", `${y}px`);

      if (tilt > 0 && !reducedMotion) {
        const cx = rect.width / 2;
        const cy = rect.height / 2;
        const rx = ((y - cy) / cy) * -tilt;
        const ry = ((x - cx) / cx) * tilt;
        gsap.to(el, {
          rotateX: rx,
          rotateY: ry,
          duration: 0.5,
          ease: "power2.out",
          transformPerspective: 900,
          transformOrigin: "center",
        });
      }
    };

    const onEnter = () => {
      gsap.to(glow, { opacity: 1, duration: 0.4, ease: "power2.out" });
    };

    const onLeave = () => {
      gsap.to(glow, { opacity: 0, duration: 0.5, ease: "power2.out" });
      if (tilt > 0 && !reducedMotion) {
        gsap.to(el, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.7,
          ease: "power3.out",
        });
      }
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [tilt]);

  return (
    <div
      ref={ref}
      className={className}
      style={{ position: "relative", willChange: "transform" }}
    >
      <div
        ref={glowRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] rounded-[inherit] opacity-0 transition-opacity"
        style={{
          background: `radial-gradient(420px circle at var(--gx, 50%) var(--gy, 50%), ${glowColor}, transparent 60%)`,
        }}
      />
      {children}
    </div>
  );
}
