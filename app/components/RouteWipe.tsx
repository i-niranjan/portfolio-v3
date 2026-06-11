"use client";

import {
  ROUTE_WIPE_EVENT,
  type RouteWipeRequestDetail,
} from "@/lib/view-transition-navigation";
import gsap from "gsap";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

const COLUMNS = 6;

export default function RouteWipe() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const pendingRef = useRef(false);
  const safetyRef = useRef<number>(0);
  const pathname = usePathname();

  const reveal = () => {
    const overlay = overlayRef.current;
    if (!overlay || !pendingRef.current) return;
    window.clearTimeout(safetyRef.current);

    const columns = overlay.querySelectorAll("[data-wipe-column]");
    gsap.set(columns, { transformOrigin: "top center" });
    gsap.to(columns, {
      scaleY: 0,
      duration: 0.55,
      stagger: 0.055,
      ease: "power4.inOut",
      onComplete: () => {
        overlay.style.visibility = "hidden";
        overlay.style.pointerEvents = "none";
        pendingRef.current = false;
        document.documentElement.classList.remove("route-wiping");
      },
    });
  };

  const revealRef = useRef(reveal);
  revealRef.current = reveal;

  useEffect(() => {
    const onRequest = (e: Event) => {
      const event = e as CustomEvent<RouteWipeRequestDetail>;
      const overlay = overlayRef.current;
      if (!overlay) return;

      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (reducedMotion) return; // let navigation proceed plainly

      // Case studies keep their cover→hero image morph; don't cover it
      if (event.detail.href.includes("/work/case-studies/")) return;

      if (pendingRef.current) {
        // A wipe is already in flight; swallow the duplicate click
        event.preventDefault();
        return;
      }

      event.preventDefault();
      pendingRef.current = true;
      // The wipe owns this navigation — mute the route-content
      // view-transition fade so the page doesn't animate twice
      document.documentElement.classList.add("route-wiping");

      const columns = overlay.querySelectorAll("[data-wipe-column]");

      overlay.style.visibility = "visible";
      overlay.style.pointerEvents = "auto";
      gsap.set(columns, { scaleY: 0, transformOrigin: "bottom center" });

      gsap.to(columns, {
        scaleY: 1,
        duration: 0.5,
        stagger: 0.055,
        ease: "power4.inOut",
        onComplete: () => {
          event.detail.proceed();
        },
      });

      // If the route never changes (error, same page), don't trap the user
      safetyRef.current = window.setTimeout(() => revealRef.current(), 2500);
    };

    window.addEventListener(ROUTE_WIPE_EVENT, onRequest);
    return () => window.removeEventListener(ROUTE_WIPE_EVENT, onRequest);
  }, []);

  // New route committed — give it a beat to paint, then uncover
  useEffect(() => {
    if (!pendingRef.current) return;
    const t = window.setTimeout(() => revealRef.current(), 180);
    return () => window.clearTimeout(t);
  }, [pathname]);

  return (
    <div
      ref={overlayRef}
      aria-hidden
      className="fixed inset-0 z-[9990] flex"
      style={{ visibility: "hidden", pointerEvents: "none" }}
    >
      {Array.from({ length: COLUMNS }, (_, i) => (
        <div
          key={i}
          data-wipe-column
          className="h-full flex-1 bg-[#050505]"
          style={{ transform: "scaleY(0)", willChange: "transform" }}
        />
      ))}
    </div>
  );
}
