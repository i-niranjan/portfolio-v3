"use client";

import { onBootDone } from "@/lib/boot-gate";
import gsap from "gsap";
import { useEffect, useRef } from "react";

export default function HeroIntro({
  children,
}: {
  children: React.ReactNode;
}) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reducedMotion) return;

    let cancelled = false;

    const title = root.querySelector<HTMLElement>("[data-hero-title]");
    const fades = root.querySelectorAll<HTMLElement>("[data-hero-fade]");

    // Hide immediately; the timeline starts once the boot screen releases
    const ctx = gsap.context(() => {
      if (title) gsap.set(title, { opacity: 0, y: 28, filter: "blur(10px)" });
      gsap.set(fades, { opacity: 0, y: 16 });
    }, root);

    onBootDone(() => {
      if (cancelled) return;

      // ctx.add keeps the deferred timeline owned by this context
      ctx.add(() => {
        const tl = gsap.timeline({ delay: 0.15 });

        if (title) {
          tl.to(title, {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1,
            ease: "power3.out",
          });
        }

        tl.to(
          fades,
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: "power3.out",
          },
          title ? "-=0.5" : 0,
        );
      });
    });

    return () => {
      cancelled = true;
      ctx.revert();
    };
  }, []);

  return <div ref={rootRef}>{children}</div>;
}
