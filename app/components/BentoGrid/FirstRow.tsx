import React from "react";

import { Marquee } from "@/components/ui/marquee";
import * as StackIcons from "./StackIcons";

const coreStack = [
  StackIcons.ReactIcon,
  StackIcons.NextIcon,
  StackIcons.JsIcon,
  StackIcons.TsIcon,
  StackIcons.TailwindIcon,
  StackIcons.MotionIcon,
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
    <div className=" grid grid-cols-6 h-full">
      <div className=" p-5  flex flex-col">
        <span className="font-semibold text-xl text-primary">Core Stack</span>
        <span className="text-sm">Built for scale.</span>
      </div>
      <div className="col-span-5 p-5 flex items-center">
        <Marquee pauseOnHover className="[--duration:60s]">
          {coreStack.map((Icon, index) => (
            <IconBox key={index}>
              <Icon />
            </IconBox>
          ))}
        </Marquee>
      </div>
      <IconBox>
        <StackIcons.DockerIcon />
      </IconBox>
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
