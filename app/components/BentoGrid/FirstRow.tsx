"use client";

import React, { useEffect, useRef } from "react";

import { Marquee } from "@/components/ui/marquee";
import * as StackIcons from "./StackIcons";
import Image from "next/image";
import gsap from "gsap";
import { useLenis } from "lenis/react";

const GsapIcon = () => (
  <Image
    src={"/assets/gif/gsap-logo.gif"}
    alt="GSAP"
    width={48}
    height={48}
    unoptimized
    className="w-full h-full object-cover"
  />
);

const coreStack = [
  StackIcons.ReactIcon,
  StackIcons.NextIcon,
  StackIcons.JsIcon,
  StackIcons.TsIcon,
  StackIcons.TailwindIcon,
  StackIcons.MotionIcon,
  GsapIcon,
  StackIcons.ExpressIcon,
  StackIcons.PostgreSqlIcon,
  StackIcons.MongoDBIcon,
  StackIcons.DockerIcon,
  StackIcons.NginxIcon,
  StackIcons.GithubActionsIcon,
  StackIcons.RedisIcon,
  StackIcons.LinuxIcon,
  StackIcons.ReduxIcon,
  StackIcons.MedusaIcon,
  StackIcons.GitIcon,
  StackIcons.StripeIcon,
  StackIcons.VercelIcon,
];

export default function FirstRow() {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  // Marquee belt speeds up with scroll velocity, then settles back
  useEffect(() => {
    const el = marqueeRef.current;
    if (!el || !lenis) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reducedMotion) return;

    let rate = 1;
    const update = () => {
      const target = 1 + Math.min(Math.abs(lenis.velocity) * 0.35, 5);
      rate += (target - rate) * 0.08;
      el.getAnimations({ subtree: true }).forEach((animation) => {
        if (
          animation instanceof CSSAnimation &&
          animation.animationName.includes("marquee")
        ) {
          animation.playbackRate = rate;
        }
      });
    };

    gsap.ticker.add(update);
    return () => gsap.ticker.remove(update);
  }, [lenis]);

  return (
    <div className="grid h-full gap-2 sm:grid-cols-6 sm:gap-0">
      <div className="flex flex-col justify-center p-5">
        <span className="font-semibold text-xl text-primary">Core Stack</span>
        <span className="text-sm">Built for scale.</span>
      </div>
      <div
        ref={marqueeRef}
        className="relative flex items-center overflow-hidden p-4 sm:col-span-5 sm:p-5"
      >
        <div className="absolute top-1 left-0 z-50 h-full w-16 bg-linear-to-r from-[#020202] via-[#020202]/70 to-black/0 sm:w-40"></div>
        <div className="absolute top-0 right-0 z-50 h-full w-16 bg-linear-to-l from-[#090909] via-[#090909]/70 to-black/0 sm:w-40"></div>
        <Marquee pauseOnHover className="[--duration:60s]">
          {coreStack.map((Icon, index) => (
            <IconBox key={index}>
              <Icon />
            </IconBox>
          ))}
        </Marquee>
      </div>
    </div>
  );
}

const IconBox = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="group flex h-12 w-12 items-center justify-center rounded-md border glass-icon p-2 grayscale-[0.85] opacity-70 transition-all duration-300 hover:grayscale-0 hover:opacity-100 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[0_0_12px_rgba(173,145,234,0.25)]">
      {children}
    </div>
  );
};
