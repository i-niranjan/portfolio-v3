import React from "react";
import { ReactIcon } from "./StackIcons";

export default function FirstRow() {
  return (
    <div className=" grid grid-cols-6 h-full">
      <div className=" p-5  flex flex-col">
        <span className="font-semibold text-xl text-primary">Core Stack</span>
        <span className="text-sm">Built for scale.</span>
      </div>
      <div className="col-span-5 p-5 flex items-center">
        <IconBox>
          <ReactIcon />
        </IconBox>
      </div>
    </div>
  );
}

const IconBox = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="p-2 rounded-md border glass-icon h-12 w-12">{children}</div>
  );
};
