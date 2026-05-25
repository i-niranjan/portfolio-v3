"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";

interface CardSpotlightProps {
  glowColor?: string;
  size?: number;
  /** parent tilt in degrees on mousemove; 0 disables tilt */
  tilt?: number;
}

export default function CardSpotlight({
  glowColor = "rgba(173,145,234,0.18)",
  size = 420,
  tilt = 0,
}: CardSpotlightProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const parent = el.parentElement as HTMLElement | null;
    if (!parent) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const enableTilt = tilt > 0 && !reducedMotion;

    if (enableTilt) {
      parent.style.transformStyle = "preserve-3d";
      parent.style.willChange = "transform";
    }

    let raf = 0;
    let pendingX = 0;
    let pendingY = 0;

    const onMove = (e: MouseEvent) => {
      const rect = parent.getBoundingClientRect();
      pendingX = e.clientX - rect.left;
      pendingY = e.clientY - rect.top;

      if (enableTilt) {
        const cx = rect.width / 2;
        const cy = rect.height / 2;
        const rx = ((pendingY - cy) / cy) * -tilt;
        const ry = ((pendingX - cx) / cx) * tilt;
        gsap.to(parent, {
          rotateX: rx,
          rotateY: ry,
          duration: 0.5,
          ease: "power2.out",
          transformPerspective: 1000,
          transformOrigin: "center",
        });
      }

      if (raf) return;
      raf = requestAnimationFrame(() => {
        el.style.setProperty("--gx", `${pendingX}px`);
        el.style.setProperty("--gy", `${pendingY}px`);
        raf = 0;
      });
    };

    const onEnter = () => {
      el.style.opacity = "1";
    };

    const onLeave = () => {
      el.style.opacity = "0";
      if (enableTilt) {
        gsap.to(parent, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.7,
          ease: "power3.out",
        });
      }
    };

    parent.addEventListener("mousemove", onMove);
    parent.addEventListener("mouseenter", onEnter);
    parent.addEventListener("mouseleave", onLeave);

    return () => {
      parent.removeEventListener("mousemove", onMove);
      parent.removeEventListener("mouseenter", onEnter);
      parent.removeEventListener("mouseleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
      if (enableTilt) {
        gsap.set(parent, { clearProps: "rotateX,rotateY,transform" });
      }
    };
  }, [tilt]);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[1] rounded-[inherit] opacity-0 transition-opacity duration-300"
      style={{
        background: `radial-gradient(${size}px circle at var(--gx, 50%) var(--gy, 50%), ${glowColor}, transparent 60%)`,
      }}
    />
  );
}
