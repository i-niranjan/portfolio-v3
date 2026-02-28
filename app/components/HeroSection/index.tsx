import React from "react";
import TerminalText from "./TerminalText";
import { Button } from "@/components/ui/button";
import ScheduleCallButton from "./ScheduleCallButton";

export default function HeroSection() {
  return (
    <div className="h-screen w-full max-w-7xl mx-auto relative ">
      <div className="flex flex-col z-10 relative justify-center items-center  w-full max-w-6xl mx-auto h-full mt-20">
        <div className="flex flex-col gap-15 h-max w-full items-center">
          <h1 className="text-center text-6xl font-inter font-light ">
            I help founders turn product ideas into scalable, production-ready
            systems.
          </h1>
          <p className=" w-full mx-auto text-center text-xl font-normal">
            Because once real users start depending on a product, <br /> every
            technical decision matters.
            <br /> I build with that responsibility in mind.
          </p>

          <ScheduleCallButton />
        </div>
      </div>
      <TerminalText />
    </div>
  );
}
