import React from "react";
import TerminalText from "./TerminalText";
import ScheduleCallButton from "./ScheduleCallButton";
import Container from "@/components/container";
import TransitionLink from "@/app/components/TransitionLink";
import MagneticHover from "@/app/components/effects/MagneticHover";

export default function HeroSection() {
  return (
    <Container>
      <section className="relative isolate overflow-hidden">
        <div className="pointer-events-none absolute inset-x-[12%] top-24 h-72 rounded-full bg-[radial-gradient(circle_at_center,rgba(173,145,234,0.18),rgba(173,145,234,0.08)_35%,transparent_72%)] blur-3xl" />
        {/* <div className="pointer-events-none absolute inset-x-10 top-14 bottom-16 rounded-[2rem] border border-white" /> */}
        {/* <div className="pointer-events-none absolute inset-x-[4.5rem] top-[5.5rem] bottom-24 rounded-[1.75rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.03),transparent_22%,transparent_78%,rgba(255,255,255,0.02))]" /> */}
        <div className="pointer-events-none absolute inset-x-6 top-20 bottom-20 opacity-[0.12] grid-columns-bg md:inset-x-24 md:opacity-[0.18]" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:radial-gradient(rgba(255,255,255,0.9)_0.6px,transparent_0.6px)] [background-size:18px_18px] [mask-image:radial-gradient(circle_at_center,black_28%,transparent_82%)]" />

        <div className="pointer-events-none absolute left-10 top-28 hidden h-8 w-8 sm:block">
          <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/12" />
          <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-white/12" />
        </div>

        <div className="pointer-events-none absolute bottom-28 left-12 hidden h-px w-16 bg-white/10 sm:block" />
        <div className="pointer-events-none absolute bottom-24 right-10 hidden h-10 w-10 border-r border-b border-white/10 sm:block" />

        <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl flex-col items-center justify-center py-24 md:py-28">
          <TerminalText />

          <div className="flex h-max w-full max-w-4xl flex-col items-center gap-7 md:gap-10">
            <h1 className="text-center font-inter text-[2.45rem] font-light leading-[1.06] tracking-[-0.05em] text-white sm:text-6xl md:text-7xl lg:text-5xl">
              I help founders turn product ideas into{" "}
              <span className="bg-[linear-gradient(180deg,rgba(255,255,255,1),rgba(173,145,234,0.78))] bg-clip-text text-transparent">
                scalable, production-ready systems
              </span>
              .
            </h1>

            <p className="max-w-2xl text-center text-sm font-normal leading-7 text-white sm:text-base sm:leading-normal">
              Because once real users start depending on a product, every
              technical decision matters. I build with that responsibility in
              mind.
            </p>

            <div className="flex flex-col items-center gap-4 pt-2 sm:flex-row sm:gap-5">
              <ScheduleCallButton />
              <MagneticHover strength={0.25}>
                <TransitionLink
                  href="/work"
                  className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-[10px] border border-white/15 bg-white/[0.02] px-5 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-white/70 transition-colors hover:border-white/35 hover:bg-white/[0.05] hover:text-white sm:px-6 sm:py-3.5 sm:text-[13px] sm:tracking-[0.24em]"
                >
                  <span>View Work</span>
                  <svg
                    width="14"
                    height="10"
                    viewBox="0 0 14 10"
                    fill="none"
                    className="transition-transform group-hover:translate-x-1"
                  >
                    <path
                      d="M1 5h11M8 1l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="square"
                      fill="none"
                    />
                  </svg>
                </TransitionLink>
              </MagneticHover>
            </div>
          </div>

          <div className="pointer-events-none absolute bottom-10 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/35 md:flex">
            <span className="text-[10px] uppercase tracking-[0.4em]">
              Scroll
            </span>
            <span className="relative block h-8 w-px overflow-hidden">
              <span className="absolute inset-x-0 top-0 h-full bg-white/15" />
              <span className="absolute inset-x-0 top-0 h-3 animate-[scrollCue_2s_ease-in-out_infinite] bg-gradient-to-b from-transparent via-white/80 to-transparent" />
            </span>
          </div>
        </div>
      </section>
    </Container>
  );
}
