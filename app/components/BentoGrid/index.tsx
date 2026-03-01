import Container from "@/components/container";
import clsx from "clsx";
import React from "react";
import FirstRow from "./FirstRow";

export default function BentoGrid() {
  return (
    <Container>
      <div className="grid min-h-screen grid-cols-12 grid-rows-[auto_1fr_1fr] gap-y-5 gap-x-2.5">
        <Column className="col-span-12 ">
          <FirstRow />
        </Column>

        <Column className="col-span-4"></Column>
        <Column className="col-span-5"></Column>
        <Column className="col-span-3"></Column>

        <Column className="col-span-2"></Column>
        <Column className="col-span-4"></Column>
        <Column className="col-span-6"></Column>
      </div>
    </Container>
  );
}

const Column = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={clsx(
        className,
        "glass-frosted rounded-xl bg-linear-to-tr from-black/90 via-black/80 to-white/10 backdrop-blur-2xl",
      )}
    >
      {children}
    </div>
  );
};
