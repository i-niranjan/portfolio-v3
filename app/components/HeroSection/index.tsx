import React from "react";
import TerminalText from "./TerminalText";
import ScheduleCallButton from "./ScheduleCallButton";
import Container from "@/components/container";
import TransitionLink from "@/app/components/TransitionLink";

const proofPoints = [
  "2+ Years Building",
  "8+ Projects Shipped",
  "Available Worldwide",
];

export default function HeroSection() {
  return (
    <Container>
      <section className="relative isolate overflow-hidden px-4 sm:px-6">
        <div className="pointer-events-none absolute inset-x-[12%] top-24 h-72 rounded-full bg-[radial-gradient(circle_at_center,rgba(173,145,234,0.18),rgba(173,145,234,0.08)_35%,transparent_72%)] blur-3xl" />
        {/* <div className="pointer-events-none absolute inset-x-10 top-14 bottom-16 rounded-[2rem] border border-white" /> */}
        {/* <div className="pointer-events-none absolute inset-x-[4.5rem] top-[5.5rem] bottom-24 rounded-[1.75rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.03),transparent_22%,transparent_78%,rgba(255,255,255,0.02))]" /> */}
        <div className="pointer-events-none absolute inset-x-24 top-20 bottom-20 opacity-[0.18] grid-columns-bg" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:radial-gradient(rgba(255,255,255,0.9)_0.6px,transparent_0.6px)] [background-size:18px_18px] [mask-image:radial-gradient(circle_at_center,black_28%,transparent_82%)]" />

        <div className="pointer-events-none absolute left-10 top-28 h-8 w-8">
          <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/12" />
          <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-white/12" />
        </div>

        <div className="pointer-events-none absolute bottom-28 left-12 h-px w-16 bg-white/10" />
        <div className="pointer-events-none absolute bottom-24 right-10 h-10 w-10 border-r border-b border-white/10" />

        <div className="relative z-10 flex min-h-screen w-full max-w-6xl mx-auto flex-col items-center justify-center py-28">
          <TerminalText />

          <div className="flex h-max w-full max-w-4xl flex-col items-center gap-8 md:gap-10">
            <h1 className=" text-center font-inter text-5xl font-light leading-[1.02] tracking-[-0.05em] text-white sm:text-6xl md:text-7xl lg:text-5xl ">
              I help founders turn product ideas into{" "}
              <span className="bg-[linear-gradient(180deg,rgba(255,255,255,1),rgba(173,145,234,0.78))] bg-clip-text text-transparent">
                scalable, production-ready systems
              </span>
              .
            </h1>

            <p className="max-w-2xl text-center text-base  text-white font-normal sm:text-base">
              Because once real users start depending on a product, every
              technical decision matters. I build with that responsibility in
              mind.
            </p>

            <div className="flex flex-col items-center gap-5 pt-2">
              <ScheduleCallButton />
              <TransitionLink
                href="/work"
                className="group inline-flex items-center gap-3 text-xs uppercase tracking-[0.32em] text-white/40 transition-colors hover:text-white/70"
              >
                <span className="h-px w-8 bg-white/18 transition-all group-hover:w-12 group-hover:bg-white/35" />
                View Work
              </TransitionLink>
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
}
