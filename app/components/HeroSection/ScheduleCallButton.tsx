"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { getCalApi } from "@calcom/embed-react";

/* ─── HeadsetIcon ─────────────────────────────────────────────── */
const HeadsetIcon: React.FC = () => {
  const iconRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(iconRef.current, {
        filter: "drop-shadow(0 0 5px rgba(220,60,40,0.95))",
        duration: 1.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <svg
      ref={iconRef}
      width="20"
      height="20"
      viewBox="0 0 32 31"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M30.47 13.72H28.95V12.19H25.9V4.58002H24.38V22.86H25.9V27.43H27.43V24.38H28.95V22.86H30.47V21.34H32V15.24H30.47V13.72ZM27.43 21.34H25.9V13.72H27.43V21.34Z"
        fill="#E73D3A"
      />
      <path d="M25.9 27.43H21.33V28.96H25.9V27.43Z" fill="#E73D3A" />
      <path d="M24.38 3.04999H22.85V4.57999H24.38V3.04999Z" fill="#E73D3A" />
      <path d="M22.85 1.53003H21.33V3.05003H22.85V1.53003Z" fill="#E73D3A" />
      <path d="M21.33 0H10.66V1.53H21.33V0Z" fill="#E73D3A" />
      <path d="M21.33 28.96H16.76V30.48H21.33V28.96Z" fill="#E73D3A" />
      <path d="M21.33 25.91H16.76V27.43H21.33V25.91Z" fill="#E73D3A" />
      <path d="M16.76 27.43H15.24V28.96H16.76V27.43Z" fill="#E73D3A" />
      <path d="M10.66 1.53003H9.14001V3.05003H10.66V1.53003Z" fill="#E73D3A" />
      <path d="M9.14 3.04999H7.62V4.57999H9.14V3.04999Z" fill="#E73D3A" />
      <path
        d="M6.09 12.19H3.05V13.72H1.52V15.24H0V21.34H1.52V22.86H3.05V24.38H6.09V22.86H7.62V4.58002H6.09V12.19ZM6.09 21.34H4.57V13.72H6.09V21.34Z"
        fill="#E73D3A"
      />
    </svg>
  );
};

/* ─── ScheduleCallButton ──────────────────────────────────────── */
interface ScheduleCallButtonProps {
  onClick?: () => void;
  label?: string;
}

const ScheduleCallButton: React.FC<ScheduleCallButtonProps> = ({
  onClick,
  label = "Schedule A Call",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const scanlineRef = useRef<HTMLDivElement>(null);

  // Top-left corner refs
  const topEdgeLeftRef = useRef<HTMLDivElement>(null);
  const leftEdgeRef = useRef<HTMLDivElement>(null);

  // Top-right corner refs
  const topEdgeRightRef = useRef<HTMLDivElement>(null);
  const rightEdgeRef = useRef<HTMLDivElement>(null);

  /* ── Noise texture ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const { width: w, height: h } = canvas;
    const imageData = ctx.createImageData(w, h);
    for (let i = 0; i < imageData.data.length; i += 4) {
      const v = Math.random() * 255;
      imageData.data[i] = v;
      imageData.data[i + 1] = v;
      imageData.data[i + 2] = v;
      imageData.data[i + 3] = 18;
    }
    ctx.putImageData(imageData, 0, 0);
  }, []);

  /* ── GSAP: ambient animations ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Ambient shimmer on top edge lines (staggered)
      gsap.to([topEdgeLeftRef.current, topEdgeRightRef.current], {
        opacity: 0.4,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.3,
      });

      // Ambient pulse on vertical edge lines
      gsap.to([leftEdgeRef.current, rightEdgeRef.current], {
        opacity: 0.3,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.5,
      });
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "30min" });
      cal("ui", {
        theme: "dark",
        cssVarsPerTheme: {
          light: { "cal-brand": "#ad91ea" },
          dark: { "cal-brand": "#ad91ea" },
        },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

  /* ── Hover handlers ── */
  const handleMouseEnter = (): void => {
    gsap.to(buttonRef.current, {
      scale: 1.04,
      duration: 0.2,
      ease: "power2.out",
    });

    // Grow top edge lines to cover full width
    gsap.to(topEdgeLeftRef.current, {
      right: "0%",
      opacity: 1,
      duration: 0.4,
      ease: "power3.out",
    });
    gsap.to(topEdgeRightRef.current, {
      left: "0%",
      opacity: 1,
      duration: 0.4,
      ease: "power3.out",
    });

    // Grow vertical edge lines downward to full height
    gsap.to([leftEdgeRef.current, rightEdgeRef.current], {
      bottom: "0%",
      opacity: 1,
      duration: 0.4,
      ease: "power3.out",
    });
  };

  const handleMouseLeave = (): void => {
    gsap.to(buttonRef.current, { scale: 1, duration: 0.2, ease: "power2.out" });

    // Shrink top edges back
    gsap.to(topEdgeLeftRef.current, {
      right: "55%",
      opacity: 0.7,
      duration: 0.35,
      ease: "power2.in",
    });
    gsap.to(topEdgeRightRef.current, {
      left: "55%",
      opacity: 0.7,
      duration: 0.35,
      ease: "power2.in",
    });

    // Shrink vertical edges back
    gsap.to([leftEdgeRef.current, rightEdgeRef.current], {
      bottom: "50%",
      opacity: 0.6,
      duration: 0.35,
      ease: "power2.in",
    });
  };

  const handleMouseDown = (): void => {
    gsap.to(buttonRef.current, {
      scale: 0.97,
      duration: 0.1,
      ease: "power2.in",
    });
  };

  const handleMouseUp = (): void => {
    gsap.to(buttonRef.current, {
      scale: 1.04,
      duration: 0.15,
      ease: "power2.out",
    });
  };

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      aria-label={label}
      data-cal-namespace="30min"
      data-cal-link="iniranjan/30min"
      data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true","theme":"dark"}'
      className="relative cursor-pointer overflow-hidden rounded-[10px] border-none bg-transparent px-6 py-3.5 outline-none sm:px-9"
      style={{ willChange: "transform, opacity" }}
    >
      {/* ── Radial dark base ── */}
      <div
        className="absolute inset-0 rounded-[10px] z-0"
        style={{
          background:
            "radial-gradient(ellipse at 40% 40%, #2a0a08 0%, #1a0503 60%, #0d0201 100%)",
        }}
      />

      {/* ── Glass border: glow + inner shadow ── */}
      <div
        className="absolute inset-0 rounded-[10px] z-[1] pointer-events-none"
        style={{
          border: "1px solid rgba(180,60,40,0.35)",
          boxShadow:
            "0 0 0 1px rgba(255,80,50,0.08), inset 0 0 12px rgba(200,50,30,0.15), 0 0 20px rgba(200,50,30,0.12)",
        }}
      />

      {/* Horizontal top-left line: anchored at left=0, shrinks from the right */}
      <div
        ref={topEdgeLeftRef}
        className="absolute top-0 left-0 h-px z-[3] pointer-events-none"
        style={{
          right: "55%", // default: covers left ~45%; expands to 0% on hover
          background:
            "linear-gradient(90deg, rgba(255,210,180,0.9) 0%, rgba(255,160,120,0.65) 55%, transparent 100%)",
          opacity: 0.7,
        }}
      />

      {/* Vertical left line: anchored at top=0, shrinks from the bottom */}
      <div
        ref={leftEdgeRef}
        className="absolute top-0 left-0 w-px z-[3] pointer-events-none"
        style={{
          bottom: "50%", // default: covers top 50%; expands to 0% on hover
          background:
            "linear-gradient(180deg, rgba(255,210,180,0.9) 0%, rgba(255,160,120,0.55) 55%, transparent 100%)",
          opacity: 0.6,
        }}
      />

      {/* ══════════════════════════════════════
          TOP-RIGHT CORNER GLASS REFLECTION
      ══════════════════════════════════════ */}

      {/* Horizontal top-right line: anchored at right=0, shrinks from the left */}
      <div
        ref={topEdgeRightRef}
        className="absolute top-0 right-0 h-px z-[3] pointer-events-none"
        style={{
          left: "55%", // default: covers right ~45%; expands to 0% on hover
          background:
            "linear-gradient(270deg, rgba(255,210,180,0.9) 0%, rgba(255,160,120,0.65) 55%, transparent 100%)",
          opacity: 0.7,
        }}
      />

      {/* Vertical right line: anchored at top=0, shrinks from the bottom */}
      <div
        ref={rightEdgeRef}
        className="absolute top-0 right-0 w-px z-[3] pointer-events-none"
        style={{
          bottom: "50%", // default: covers top 50%; expands to 0% on hover
          background:
            "linear-gradient(180deg, rgba(255,210,180,0.9) 0%, rgba(255,160,120,0.55) 55%, transparent 100%)",
          opacity: 0.6,
        }}
      />

      {/* ── Bottom edge reflection ── */}
      <div
        className="absolute bottom-0 h-px z-[3] pointer-events-none"
        style={{
          left: "20%",
          right: "20%",
          background:
            "linear-gradient(90deg, transparent 0%, rgba(180,60,40,0.4) 50%, transparent 100%)",
        }}
      />

      {/* ── Scanline sweep ── */}
      <div className="absolute inset-0 rounded-[10px] overflow-hidden z-[2] pointer-events-none">
        <div
          ref={scanlineRef}
          className="absolute left-0 right-0 pointer-events-none"
          style={{
            height: "25%",
            background:
              "linear-gradient(180deg, transparent 0%, rgba(255,80,50,0.04) 50%, transparent 100%)",
          }}
        />
      </div>

      {/* ── Noise canvas ── */}
      <canvas
        ref={canvasRef}
        width={400}
        height={80}
        className="absolute inset-0 rounded-[10px] z-4 pointer-events-none"
        style={{ mixBlendMode: "screen" }}
      />

      {/* ── Label + icon ── */}
      <span className="text-red relative z-5 flex select-none items-center gap-2.5 text-[14px] font-bold uppercase tracking-[0.14em] sm:text-[17px] sm:tracking-[0.18em]">
        {label}
        <HeadsetIcon />
      </span>
    </button>
  );
};

export default ScheduleCallButton;
