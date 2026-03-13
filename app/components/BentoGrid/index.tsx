import Container from "@/components/container";
import clsx from "clsx";
import React from "react";
import FirstRow from "./FirstRow";
import { ArrowRight, Plus } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { NumberTicker } from "@/components/ui/number-ticker";

export default function BentoGrid() {
  return (
    <Container>
      <div className="grid min-h-screen grid-cols-12 grid-rows-[auto_1fr_1fr] gap-y-5 gap-x-2.5">
        <Column className="col-span-12 ">
          <FirstRow />
        </Column>

        <Column
          bgVariant="plainBlack"
          className="col-span-4  bg-[url(/assets/portrait-image.jpg)] bg-cover bg-center"
        >
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
        <Column className="col-span-3 p-6 relative">
          <Image
            className="absolute right-0 top-0 z-10 animate-pulse"
            src={"/assets/web-asset.png"}
            height={200}
            width={200}
            alt="web asset"
          />
          <div className="flex flex-col w-full h-full justify-end gap-13">
            <div className="space-y-4">
              {["System Design", "DevOps & Tools", "Performance Tuning"].map(
                (i, index) => {
                  return <ListLine text={i} key={index} />;
                },
              )}
            </div>
            <span className="text-xl">Currently Exploring</span>
          </div>
        </Column>

        <div className="col-span-2 gap-4 grid grid-rows-3">
          <Column bgVariant="plainBlack">
            <div className="flex flex-col gap-2 items-center justify-center w-full h-full">
              <div className="font-bold text-5xl flex items-center ">
                <NumberTicker value={2} className="text-5xl font-bold" />
                <Plus className="size-8" />
              </div>
              <span className=" font-semibold">Years of Experience</span>
            </div>
          </Column>
          <Column bgVariant="plainBlack">
            <div className="flex flex-col gap-2 items-center justify-center w-full h-full">
              <div className="font-bold text-5xl flex items-center ">
                <NumberTicker value={8} className="text-5xl font-bold" />{" "}
                <Plus className="size-8" />
              </div>
              <span className=" font-semibold">Projects Shipped</span>
            </div>
          </Column>
          <div></div>
        </div>
        <Column className="col-span-4"></Column>
        <Column className="col-span-6"></Column>
      </div>
    </Container>
  );
}

const Column = ({
  children,
  className,
  bgVariant = "gradient",
}: {
  children?: React.ReactNode;
  className?: string;
  bgVariant?: "plainBlack" | "gradient";
}) => {
  return (
    <div
      className={cn(
        className,
        "glass-frosted relative overflow-hidden rounded-xl ",
        bgVariant === "gradient"
          ? `bg-linear-to-tr from-black/90 via-black/80 to-white/10  backdrop-blur-2xl `
          : "bg-black",
      )}
    >
      {children}
    </div>
  );
};

const ListLine = ({ text }: { text: string }) => {
  return (
    <span className="flex  gap-2  items-center text text-white/90 text-xs ">
      <ArrowRight size={14} /> {text}
    </span>
  );
};
