import React, { CSSProperties, ReactNode } from "react";
import "../../css/glass.css";

// ─── Types ─────────────────────────────────────────────────────────────────

interface BaseProps {
  children?: ReactNode;
  className?: string;
}

interface GlassIconCardProps {
  label: string;
  color?: string;
  className?: string;
}

interface GlassBlobProps {
  color: string;
  size?: number;
  className?: string;
  style?: CSSProperties;
}

interface GlassCodeBlockProps {
  code: string;
}

// ─── Reusable Glass Primitives ─────────────────────────────────────────────

export function GlassCard({ children, className = "" }: BaseProps) {
  return (
    <div className={`glass-card rounded-2xl p-8 ${className}`}>{children}</div>
  );
}

export function GlassFrosted({ children, className = "" }: BaseProps) {
  return (
    <div className={`glass-frosted rounded-2xl p-7 ${className}`}>
      {children}
    </div>
  );
}

export function GlassIconCard({
  label,
  color = "white",
  className = "",
}: GlassIconCardProps) {
  return (
    <div
      className={`glass-icon rounded-3xl w-24 h-24 flex items-center justify-center font-bold text-3xl font-mono ${className}`}
      style={{ color }}
    >
      <span className="relative z-10">{label}</span>
    </div>
  );
}

export function GlassPill({ children, className = "" }: BaseProps) {
  return (
    <span
      className={`glass-pill inline-flex items-center px-4 py-1.5 rounded-full font-mono text-xs tracking-widest text-white/70 ${className}`}
    >
      {children}
    </span>
  );
}

export function GlassBlob({
  color,
  size = 200,
  className = "",
  style = {},
}: GlassBlobProps) {
  return (
    <div
      className={`glass-blob ${className}`}
      style={{ width: size, height: size, background: color, ...style }}
    />
  );
}

export function GlassCodeBlock({ code }: GlassCodeBlockProps) {
  return (
    <div className="glass-code rounded-2xl overflow-hidden">
      {/* Traffic lights bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06]">
        <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
        <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
        <div className="w-3 h-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 font-mono text-[11px] text-white/25 tracking-widest uppercase">
          glass.css
        </span>
      </div>
      <pre
        className="p-5 font-mono text-[13px] leading-relaxed text-white/60 overflow-x-auto"
        dangerouslySetInnerHTML={{ __html: code }}
      />
    </div>
  );
}

// ─── Section Label ─────────────────────────────────────────────────────────

function Label({ children }: BaseProps) {
  return (
    <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-white/25 mb-4">
      {children}
    </p>
  );
}

// ─── Demo Data ─────────────────────────────────────────────────────────────

const SNIPPET: string = `<span style="color:#9b6dff">.glass-card</span>::before {
  content: <span style="color:#f5c842">''</span>;
  position: absolute;
  inset: <span style="color:#f5c842">0</span>;
  border-radius: inherit;
  padding: <span style="color:#f5c842">1px</span>; <span style="color:#ffffff44">/* border thickness */</span>

  background: linear-gradient(
    <span style="color:#f5c842">135deg</span>,
    rgba(255,255,255,<span style="color:#f5c842">0.28</span>) <span style="color:#f5c842">0%</span>,
    transparent <span style="color:#f5c842">60%</span>
  );

  <span style="color:#ffffff44">/* render gradient ONLY on the border area */</span>
  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: <span style="color:#61dafb">exclude</span>;
}`;

interface IconData {
  label: string;
  color: string;
}

const TAGS: string[] = [
  "Next.js",
  "Tailwind",
  "TypeScript",
  "Framer Motion",
  "Radix UI",
  "Zustand",
];

const ICONS: IconData[] = [
  { label: "N", color: "white" },
  { label: "JS", color: "#f5c842" },
  { label: "TS", color: "#3178c6" },
  { label: "⚛", color: "#61dafb" },
];

// ─── Full Showcase Page ────────────────────────────────────────────────────

export default function GlassShowcase() {
  return (
    <div className="glass-bg min-h-screen px-6 py-12">
      <div className="relative z-10 max-w-3xl mx-auto flex flex-col gap-14">
        {/* Header */}
        <p className="font-mono text-[12px] uppercase tracking-[0.2em] text-white/30">
          glass.css — component library
        </p>

        {/* 01 — Core Glass Card */}
        <section>
          <Label>01 — Core Glass Card</Label>
          <GlassCard>
            <h2
              className="font-mono text-3xl font-bold mb-2"
              style={{ color: "#9b6dff" }}
            >
              Core Stack
            </h2>
            <p className="font-mono text-white/55 text-base">
              Built for scale.
            </p>
          </GlassCard>
        </section>

        {/* 02 — Icon Cards */}
        <section>
          <Label>02 — Icon Cards (noise + sheen)</Label>
          <div className="flex gap-5 flex-wrap">
            {ICONS.map((icon) => (
              <GlassIconCard
                key={icon.label}
                label={icon.label}
                color={icon.color}
              />
            ))}
          </div>
        </section>

        {/* 03 — Frosted Panel with blobs */}
        <section>
          <Label>03 — Frosted Panel (backdrop-blur + color blobs)</Label>
          <GlassFrosted className="relative">
            <div className="relative z-10">
              <h3 className="font-mono text-xl font-bold text-white mb-2">
                Glass Refraction
              </h3>
              <p className="font-mono text-sm text-white/50 leading-relaxed max-w-md">
                Achieved with{" "}
                <code className="text-[#9b6dff]">
                  backdrop-filter: blur(40px)
                </code>{" "}
                and a gradient border via{" "}
                <code className="text-[#9b6dff]">mask-composite: exclude</code>.
                The top-left arc is always brighter — mimics how real glass
                catches light.
              </p>
            </div>
          </GlassFrosted>
        </section>

        {/* 04 — Glass Pills */}
        <section>
          <Label>04 — Glass Pills / Tags</Label>
          <div className="flex gap-3 flex-wrap">
            {TAGS.map((tag) => (
              <GlassPill key={tag}>{tag}</GlassPill>
            ))}
          </div>
        </section>

        {/* 05 — Code snippet */}
        <section>
          <Label>05 — The Trick (mask-composite: exclude)</Label>
          <GlassCodeBlock code={SNIPPET} />
        </section>

        {/* 06 — Compound: glass card + pill + icon */}
        <section>
          <Label>06 — Compound Card Example</Label>
          <GlassCard className="flex items-start justify-between gap-6">
            <div className="flex flex-col gap-3">
              <GlassPill>New</GlassPill>
              <h3 className="font-mono text-2xl font-bold text-white mt-1">
                Ship faster.
              </h3>
              <p className="font-mono text-sm text-white/45 leading-relaxed max-w-xs">
                Drop these components into any Next.js + Tailwind project and
                get premium glass UI out of the box.
              </p>
            </div>
            <GlassIconCard label="N" color="white" className="shrink-0" />
          </GlassCard>
        </section>
      </div>
    </div>
  );
}
