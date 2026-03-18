import { Marquee } from "@/components/ui/marquee";
import React from "react";

export default function Projects() {
  const projects = [
    {
      id: "1",
    },
    {
      id: "2",
    },
    {
      id: "3",
    },
    {
      id: "4",
    },
    {
      id: "5",
    },
  ];
  return (
    <div className="min-h-screen w-full ">
      <div className="max-w-7xl mx-auto">
        <div className="w-full flex items-center pt-45 pb-20 ">
          <div className="w-full  flex justify-end ">
            <h1 className="text-white  text-3xl font-inter leading-12 text-left max-w-3xl">
              I design and build thoughtful digital experiences that balance
              performance with aesthetics. Each project is crafted with
              attention to detail, focusing on usability, clarity, and a
              seamless user journey.
            </h1>
          </div>
        </div>
      </div>
      <div className="w-full">
        <Marquee pauseOnHover className="[--duration:20s]">
          {projects.map((i) => (
            <div key={i.id} className="w-100 h-50 border rounded-sm"></div>
          ))}
        </Marquee>
      </div>
    </div>
  );
}
