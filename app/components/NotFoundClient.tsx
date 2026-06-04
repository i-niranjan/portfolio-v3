"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import TransitionLink from "@/app/components/TransitionLink";

/* ─── pixel art "404" drawn on canvas ─────────────────────────── */
const PIXEL = 6; // size of one "pixel" block
const GAP = 1; // gap between blocks

// 5×7 bitmap font – each char is a 5-column × 7-row grid
const GLYPHS: Record<string, number[][]> = {
  "4": [
    [1, 0, 0, 1, 0],
    [1, 0, 0, 1, 0],
    [1, 0, 0, 1, 0],
    [1, 1, 1, 1, 1],
    [0, 0, 0, 1, 0],
    [0, 0, 0, 1, 0],
    [0, 0, 0, 1, 0],
  ],
  "0": [
    [0, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 1, 1],
    [1, 0, 1, 0, 1],
    [1, 1, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 1, 1, 0],
  ],
};

const CHARS = ["4", "0", "4"];
const COLS = 5;
const ROWS = 7;
const CHAR_GAP = 3; // gap columns between chars

function buildPixels() {
  const pixels: { cx: number; cy: number }[] = [];
  CHARS.forEach((ch, ci) => {
    const glyph = GLYPHS[ch];
    const xOffset = ci * (COLS + CHAR_GAP);
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        if (glyph[r][c]) {
          pixels.push({
            cx: (xOffset + c) * (PIXEL + GAP) + PIXEL / 2,
            cy: r * (PIXEL + GAP) + PIXEL / 2,
          });
        }
      }
    }
  });
  return pixels;
}

const TOTAL_COLS = CHARS.length * COLS + (CHARS.length - 1) * CHAR_GAP;
const CANVAS_W = TOTAL_COLS * (PIXEL + GAP) - GAP;
const CANVAS_H = ROWS * (PIXEL + GAP) - GAP;

/* ─── scanline overlay ─────────────────────────────────────────── */
function useScanline(ref: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.fromTo(
      el,
      { top: "-10%" },
      { top: "110%", duration: 3, ease: "none", repeat: -1, delay: 0.5 },
    );
  }, [ref]);
}

export default function NotFoundClient() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const scanRef = useRef<HTMLDivElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLParagraphElement | null>(null);
  const btnRef = useRef<HTMLDivElement | null>(null);

  useScanline(scanRef);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const pixels = buildPixels();
    const DIM = "rgba(173,145,234,0.12)";
    const LIT = "rgba(173,145,234,0.85)";

    const lit = new Array(pixels.length).fill(false);

    const redraw = () => {
      ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);
      pixels.forEach(({ cx, cy }, i) => {
        ctx.fillStyle = lit[i] ? LIT : DIM;
        ctx.fillRect(cx - PIXEL / 2, cy - PIXEL / 2, PIXEL, PIXEL);
      });
    };

    redraw();

    // randomise order so pixels fire across the whole grid
    const order = pixels.map((_, i) => i).sort(() => Math.random() - 0.5);

    order.forEach((pixelIdx, rank) => {
      gsap.delayedCall(rank * 0.022, () => {
        let flickers = 0;
        const maxFlickers = Math.floor(Math.random() * 4) + 2;
        const tick = () => {
          lit[pixelIdx] = !lit[pixelIdx];
          redraw();
          flickers++;
          if (flickers < maxFlickers) {
            gsap.delayedCall(0.04 + Math.random() * 0.06, tick);
          } else {
            lit[pixelIdx] = true;
            redraw();
          }
        };
        tick();
      });
    });

    // ambient opacity pulse after all pixels are lit
    const pulse = { v: 0.85 };
    gsap.to(pulse, {
      v: 1,
      duration: 2.4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: order.length * 0.022 + 0.5,
      onUpdate() {
        canvas.style.opacity = String(pulse.v);
      },
    });
  }, []);

  useEffect(() => {
    gsap.fromTo(
      [wrapRef.current, textRef.current, btnRef.current],
      { opacity: 0, y: 12 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.1,
        delay: 0.2,
      },
    );
  }, []);

  return (
    <div className="relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center gap-10 px-6">
      {/* pixel canvas wrapper */}
      <div ref={wrapRef} className="relative opacity-0">
        {/* CRT scanline */}
        <div
          ref={scanRef}
          className="pointer-events-none absolute left-0 right-0 z-10 h-8"
          style={{
            background:
              "linear-gradient(180deg, transparent 0%, rgba(173,145,234,0.06) 50%, transparent 100%)",
          }}
        />
        <canvas
          ref={canvasRef}
          width={CANVAS_W}
          height={CANVAS_H}
          style={{ imageRendering: "pixelated", display: "block" }}
        />
      </div>

      {/* message */}
      <p
        ref={textRef}
        className="font-commit text-[11px] uppercase text-white/30 opacity-0"
      >
        Bro you're lost ig🐶
      </p>

      {/* subtle button */}
      <div ref={btnRef} className="opacity-0">
        <TransitionLink
          href="/"
          className="font-commit inline-flex items-center gap-3 text-sm uppercase  text-white/30 transition-colors duration-200 hover:text-white/60"
        >
          <span
            className="inline-block h-px w-5 bg-white/20 transition-all duration-200 group-hover:w-8"
            aria-hidden="true"
          />
          return home 🛖
        </TransitionLink>
      </div>
    </div>
  );
}
