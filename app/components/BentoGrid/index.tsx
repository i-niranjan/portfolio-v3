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

        <Column className="col-span-4  bg-[url(/assets/portrait-image.jpg)] bg-cover bg-center">
          <div className="flex h-full w-full items-end p-6">
            <div
              className=" z-10
        w-full flex flex-col gap-1"
            >
              <span className="text-white text-2xl font-bold">
                Niranjan Chaudhari
              </span>
              <span className="text-white/50 text-base">
                A Full Stack Developer
              </span>
            </div>
          </div>
          <div className="h-40 w-full absolute bg-linear-to-t from-black via-black/70 to-black/0 bottom-0"></div>
        </Column>
        <Column className="col-span-5">
          <div className="flex w-full h-full p-6 flex-col gap-2 text-xl ">
            <h2>About me</h2>
            <span className="text-sm text-white/50">
              Hello. Enjoying the portfolio so far?
              <br />
              Here&apos;s the quick version of me. <br />
              <br />I started development in 2024, building basic frontend
              websites and just figuring things out. Eventually moved into
              full-stack played around with headless WordPress + Next.js, built
              a lead CRM for a logistics company… and after that I kinda never
              stopped. <br />
              <br /> Since then it&apos;s been ERP systems, event booking
              platforms, agency websites, parallax-heavy animated stuff,
              eCommerce with Medusa.
              <br />
              <br /> Still building. Still learning. Still trying to do it
              better each time.
            </span>
          </div>
        </Column>
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
        "glass-frosted relative overflow-hidden rounded-xl bg-linear-to-tr from-black/90 via-black/80 to-white/10 backdrop-blur-2xl",
      )}
    >
      {children}
    </div>
  );
};
