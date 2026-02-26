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
    <div className="absolute top-20 left-1 z-0 w-full min-h-43 max-w-xs  border border-border/10 backdrop-blur-2xl">
      {/* Top Bar */}
      <div className="flex flex-col gap-y-2 border-b border-border/10 p-4">
        <div className="flex flex-row gap-x-2">
          <div className="h-2 w-2 rounded-full opacity-10 bg-red-500"></div>
          <div className="h-2 w-2 rounded-full opacity-10 bg-yellow-500"></div>
          <div className="h-2 w-2 rounded-full opacity-10 bg-green-500"></div>
        </div>
      </div>

      {/* Terminal Body */}
      <pre className="p-4 overflow-auto text-sm font-mono text-primary/40">
        <code ref={containerRef} className="grid gap-y-1">
          {terminalLines.map((text, index) => (
            <p key={index} data-text={text}></p>
          ))}
        </code>
      </pre>
    </div>
  );
}
