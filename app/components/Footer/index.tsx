import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Footer() {
  const SocialLinks = [
    {
      text: "Github",
      link: "#",
    },
    {
      text: "LinkedIn",
      link: "#",
    },
    {
      text: "Instagram",
      link: "#",
    },
    {
      text: "X (Twitter)",
      link: "#",
    },
  ];

  const explore = [
    {
      text: "About Me",
      url: "#",
    },
    {
      text: "Journal",
      url: "#",
    },
    {
      text: "Work",
      url: "#",
    },
  ];

  return (
    <footer className="w-full max-w-7xl mx-auto  h-120 grid grid-cols-6 py-16">
      <div className="col-span-2 bg-[url('/assets/chrome51.png')] bg-contain bg-no-repeat relative ml-4 ">
        <div className="absolute w-100 h-full left-0 top-0 bg-linear-to-r from-[#0a0a0a] via-[#0a0a0a]/70 to-black/0"></div>
      </div>
      <div className="px-2 space-y-8">
        <div className="space-y-3 ">
          <span className="flex gap-3 items-center">
            <RightArrowIcon /> <span className="text-xl">Socials</span>
          </span>
          <div className="pl-3 flex flex-col items-start min-h-35">
            {SocialLinks.map((i, index) => (
              <Button
                key={index}
                variant={"link"}
                className="uppercase text-sm text-white/30 underline"
                asChild
              >
                <Link href={i.link}>{i.text}</Link>
              </Button>
            ))}
          </div>
        </div>

        <div>
          <span className="flex gap-3 items-center">
            <RightArrowIcon /> <span className="text-xl">Contact</span>
          </span>

          <Button
            variant={"ghost"}
            size={"icon"}
            className=" text-sm ml-7  text-primary "
            asChild
          >
            <Link href={"mailto:iniranjanchaudhari@gmail.com"} className="">
              <Mail className="size-6" />
            </Link>
          </Button>
        </div>
      </div>
      <div className=" space-y-8">
        <div className="space-y-3 px-2 ">
          <span className="flex gap-3 items-center">
            <RightArrowIcon /> <span className="text-xl">Explore</span>
          </span>
          <div className="pl-3 flex flex-col items-start min-h-35">
            {explore.map((i, index) => (
              <Button
                key={index}
                variant={"link"}
                className="uppercase text-sm text-white/30 underline"
                asChild
              >
                <Link href={i.url}>{i.text}</Link>
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-3 px-2">
          <Button
            variant={"ghost"}
            size={"icon"}
            className=" text-sm px-0 text-white rounded-sm! h-16 glass-frosted w-[98%]"
            asChild
          >
            <Link href={"mailto:iniranjanchaudhari@gmail.com"} className="">
              Schedule A Call
            </Link>
          </Button>
        </div>
      </div>
    </footer>
  );
}

const RightArrowIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 20 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4.99184 0V4.99177H10.0165V10.0164H15.0082V15.0082H20V0H4.99184Z"
      fill="#AD91EA"
    />
    <path
      d="M10.0165 10.0164H4.99184V15.0081H10.0165V10.0164Z"
      fill="#AD91EA"
    />
    <path d="M4.99177 15.0083H0V20.0329H4.99177V15.0083Z" fill="#AD91EA" />
  </svg>
);
