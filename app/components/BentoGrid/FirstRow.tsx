import React from "react";

import { Marquee } from "@/components/ui/marquee";
import * as StackIcons from "./StackIcons";
import Image from "next/image";

const GsapIcon = () => (
  <img
    src={"/assets/gif/gsap-logo.gif"}
    alt="GSAP"
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
  return (
    <div className="grid h-full gap-2 sm:grid-cols-6 sm:gap-0">
      <div className="flex flex-col justify-center p-5">
        <span className="font-semibold text-xl text-primary">Core Stack</span>
        <span className="text-sm">Built for scale.</span>
      </div>
      <div className="relative flex items-center overflow-hidden p-4 sm:col-span-5 sm:p-5">
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
    <div className=" flex items-center justify-center   rounded-md border glass-icon w-12 h-12 p-2">
      {children}
    </div>
  );
};
