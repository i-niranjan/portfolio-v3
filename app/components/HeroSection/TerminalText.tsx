"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";

gsap.registerPlugin(ScrambleTextPlugin);

export default function TerminalText() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const lines = gsap.utils.toArray<HTMLParagraphElement>(
      containerRef.current.querySelectorAll("p"),
    );

    const tl = gsap.timeline();

    lines.forEach((line) => {
      tl.to(line, {
        duration: 1,
        scrambleText: {
          text: line.dataset.text!,
          chars: "XO01",
          speed: 0.5,
        },
      });
    });
  }, []);

  const terminalLines = [
    "[BUILD SUCCESS]",
    "Deploying to production...",
    "Scaling instance 3/6...",
    "Monitoring health checks...",
  ];

  return (
    <div className="pointer-events-none absolute left-2 top-14 z-0 hidden w-full max-w-[9.5rem] rounded-xl border border-white/8 bg-black/18 backdrop-blur-xl md:block">
      <div className="flex flex-col gap-y-2 border-b border-white/8 py-1.5 px-2.5">
        <div className="flex flex-row gap-x-2">
          <div className="h-1.5 w-1.5 rounded-full bg-red-500/20"></div>
          <div className="h-1.5 w-1.5 rounded-full bg-yellow-500/20"></div>
          <div className="h-1.5 w-1.5 rounded-full bg-green-500/20"></div>
        </div>
      </div>

      <pre className="overflow-auto px-2.5 py-2.5 text-[9px] font-mono text-primary/28">
        <code ref={containerRef} className="grid gap-y-1">
          {terminalLines.map((text, index) => (
            <p key={index} data-text={text}></p>
          ))}
        </code>
      </pre>
    </div>
  );
}
