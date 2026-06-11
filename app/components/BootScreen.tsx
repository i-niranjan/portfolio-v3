"use client";

import { markBootDone } from "@/lib/boot-gate";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

const STORAGE_KEY = "portfolio:booted";

export default function BootScreen() {
  const rootRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const [active, setActive] = useState(true);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const alreadyBooted = sessionStorage.getItem(STORAGE_KEY) === "1";

    if (alreadyBooted || reducedMotion) {
      markBootDone();
      setActive(false);
      return;
    }

    document.documentElement.style.overflow = "hidden";
    const unlock = () => {
      document.documentElement.style.overflow = "";
    };

    const ctx = gsap.context(() => {
      const bar = root.querySelector<HTMLElement>("[data-boot-bar]");
      const panel = root.querySelector<HTMLElement>("[data-boot-panel]");

      const tl = gsap.timeline({
        onComplete: () => {
          sessionStorage.setItem(STORAGE_KEY, "1");
          unlock();
          setActive(false);
        },
      });
      tlRef.current = tl;

      const progress = { value: 0 };
      tl.to(progress, {
        value: 100,
        duration: 1.1,
        ease: "steps(22)",
        onUpdate: () => {
          if (bar) bar.style.width = `${progress.value}%`;
        },
      })
        .to(panel, {
          duration: 0.06,
          opacity: 0.4,
          yoyo: true,
          repeat: 2,
          ease: "none",
        })
        .add(() => markBootDone())
        .to(root, {
          clipPath: "inset(0% 0% 100% 0%)",
          duration: 0.55,
          ease: "power3.inOut",
        });
    }, root);

    return () => {
      unlock();
      ctx.revert();
    };
  }, []);

  if (!active) return null;

  return (
    <div
      ref={rootRef}
      onClick={() => tlRef.current?.progress(1)}
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-[#050505]"
      style={{ clipPath: "inset(0% 0% 0% 0%)" }}
      aria-hidden
    >
      <div data-boot-panel className="w-[min(260px,68vw)]">
        <div className="h-px w-full bg-white/10">
          <div
            data-boot-bar
            className="h-full bg-primary"
            style={{
              width: "0%",
              boxShadow: "0 0 12px rgba(173,145,234,0.45)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
