"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";

gsap.registerPlugin(ScrambleTextPlugin);

export default function TerminalReadout() {
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    const tl = gsap.timeline({ delay: 0.4 });

    tl.to(textRef.current, {
      duration: 1.8,
      scrambleText: {
        text: "> currently_at: SourceCatch Konnect",
        chars: "!@#$%░▒▓01",
        speed: 0.4,
        tweenLength: false,
      },
      ease: "none",
    }).to(textRef.current, {
      duration: 0.08,
      opacity: 0.4,
      yoyo: true,
      repeat: 3,
      ease: "none",
      delay: 0.1,
    }).to(textRef.current, {
      opacity: 1,
      duration: 0.05,
    });
  }, []);

  return (
    <div className="flex items-center gap-1.5 font-mono text-xs">
      <span
        ref={textRef}
        className="text-primary/70"
        style={{ textShadow: "0 0 8px rgba(173,145,234,0.35)" }}
      />
      <span className="animate-pulse text-primary/50">▋</span>
    </div>
  );
}
