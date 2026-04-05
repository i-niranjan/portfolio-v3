"use client";

import { ReactLenis, type LenisRef } from "lenis/react";
import "lenis/dist/lenis.css";
import { useRef } from "react";

export default function LenisProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<LenisRef>(null);

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        lerp: 0.1,
        duration: 1.2,

        smoothWheel: true,

        touchMultiplier: 1,
        wheelMultiplier: 1,
        infinite: false,
        orientation: "vertical",
        overscroll: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
