import React from "react";
import TerminalText from "./TerminalText";
import { Button } from "@/components/ui/button";
import ScheduleCallButton from "./ScheduleCallButton";
import Container from "@/components/container";

export default function HeroSection() {
  return (
    <Container>
      <div className="flex flex-col z-10 relative justify-center items-center  w-full max-w-6xl mx-auto min-h-screen mt-15">
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
    </Container>
  );
}
