"use client";

import CalButton from "@/components/cal-modal";
import { IconArrowUpRight } from "@tabler/icons-react";

const CTA_TEXT = "Let's build something";

export default function FooterCta() {
  return (
    <div className="border-y border-white/10">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-16 sm:px-6 md:py-20 lg:px-2">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary/60">
          &gt; open_to_work
        </p>

        <CalButton>
          <button
            type="button"
            data-cal-namespace="30min"
            data-cal-link="iniranjan/30min"
            data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true","theme":"dark"}'
            className="group flex w-full cursor-pointer flex-wrap items-center gap-x-4 gap-y-2 text-left"
          >
            {/* Roll-up text: purple copy slides in from below, transform-only */}
            <span className="relative block overflow-hidden font-inter text-[clamp(2.2rem,7vw,5.5rem)] font-semibold uppercase leading-[1.05] tracking-[-0.04em]">
              <span className="block text-white transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">
                {CTA_TEXT}
              </span>
              <span
                aria-hidden
                className="absolute left-0 top-full block text-primary transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full"
              >
                {CTA_TEXT}
              </span>
            </span>
            <IconArrowUpRight
              className="size-[clamp(1.6rem,4vw,3rem)] shrink-0 self-center text-primary transition-transform duration-300 ease-out group-hover:rotate-45"
              stroke={1.5}
            />
          </button>
        </CalButton>

        <p className="max-w-md text-sm leading-6 text-white/40">
          Have a product idea, a half-built system, or a deadline that worries
          you? Tell me about it — usually replies within a day.
        </p>
      </div>
    </div>
  );
}
