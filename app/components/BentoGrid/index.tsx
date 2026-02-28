import Container from "@/components/container";
import React from "react";

export default function BentoGrid() {
  return (
    <Container>
      <div className="grid min-h-screen grid-cols-12 grid-rows-[auto_1fr_1fr] gap-y-5 gap-x-2.5">
        <div className="col-span-12 glass-frosted row-span-1 h-20  rounded-xl backdrop-blur-2xl"></div>

        <div className="col-span-4 row-span-1 border">Middle Left</div>
        <div className="col-span-5 row-span-1 border">Middle center</div>
        <div className="col-span-3 row-span-1 border">Middle Right</div>

        <div className="col-span-2 border">Bottom Left</div>
        <div className="col-span-4 border">Bottom Left</div>
        <div className="col-span-6 border">Bottom Right</div>
      </div>
    </Container>
  );
}
