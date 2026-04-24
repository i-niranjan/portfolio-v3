import CalButton from "@/components/cal-modal";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Footer() {
  const SocialLinks = [
    {
      text: "Github",
      link: "https://github.com/i-niranjan",
    },
    {
      text: "LinkedIn",
      link: "https://www.linkedin.com/in/niranjan-chaudhari-26157b194/",
    },

    {
      text: "X (Twitter)",
      link: "https://x.com/imniranjann",
    },
  ];

  const explore = [
    {
      text: "About Me",
      url: "/#about",
    },
    // {
    //   text: "Journal",
    //   url: "#",
    // },
    {
      text: "Work",
      url: "/work",
    },
  ];

  return (
    <footer className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-8 px-4 py-12 sm:px-6 md:grid-cols-6 md:gap-0 md:py-16 lg:h-120 lg:px-0">
      <div className="relative min-h-64 bg-[url('/assets/chrome51.png')] bg-contain bg-no-repeat md:col-span-2 md:ml-4 md:min-h-0">
        <div className="absolute left-0 top-0 h-full w-full max-w-100 bg-linear-to-r from-[#0a0a0a] via-[#0a0a0a]/70 to-black/0"></div>
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
                <Link href={i.link} target="_blank" rel="noopener noreferrer">
                  {i.text}
                </Link>
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
            className=" text-xl ml-7  text-primary "
            asChild
          >
            <Link href={"mailto:iniranjanchaudhari@gmail.com"} className="">
              <MailIcon />
            </Link>
          </Button>
        </div>
      </div>
      <div className="space-y-8">
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
          <CalButton>
            <Button
              data-cal-namespace="30min"
              data-cal-link="iniranjan/30min"
              data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true","theme":"dark"}'
              variant={"ghost"}
              size={"icon"}
              className="cursor-pointer text-sm px-0 text-white rounded-sm! h-16 glass-frosted w-[98%]"
            >
              Schedule A Call
            </Button>
          </CalButton>
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

const MailIcon = () => (
  <svg
    className="size-6"
    width="100px"
    height="auto"
    viewBox="0 0 32 26"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M32 3.05005H30.47V22.85H32V3.05005Z" fill="#AD91EA" />
    <path d="M30.4699 22.85H28.95V24.38H30.4699V22.85Z" fill="#AD91EA" />
    <path d="M30.4699 1.52002H28.95V3.05002H30.4699V1.52002Z" fill="#AD91EA" />
    <path
      d="M28.9501 4.56995H27.4301V7.61995H28.9501V4.56995Z"
      fill="#AD91EA"
    />
    <path d="M28.9501 24.38H3.05005V25.9H28.9501V24.38Z" fill="#AD91EA" />
    <path d="M27.43 19.8101H25.9V21.3301H27.43V19.8101Z" fill="#AD91EA" />
    <path d="M27.43 7.62H25.9V9.13999H27.43V7.62Z" fill="#AD91EA" />
    <path d="M25.9 18.28H24.38V19.81H25.9V18.28Z" fill="#AD91EA" />
    <path d="M25.9 9.14001H24.38V10.66H25.9V9.14001Z" fill="#AD91EA" />
    <path d="M24.38 16.76H22.85V18.28H24.38V16.76Z" fill="#AD91EA" />
    <path d="M24.38 10.66H22.85V12.19H24.38V10.66Z" fill="#AD91EA" />
    <path d="M22.85 15.24H21.33V16.76H22.85V15.24Z" fill="#AD91EA" />
    <path d="M22.85 12.1899H21.33V13.7099H22.85V12.1899Z" fill="#AD91EA" />
    <path d="M21.33 13.71H18.28V15.24H21.33V13.71Z" fill="#AD91EA" />
    <path d="M18.28 15.24H13.71V16.76H18.28V15.24Z" fill="#AD91EA" />
    <path d="M13.71 13.71H10.66V15.24H13.71V13.71Z" fill="#AD91EA" />
    <path d="M10.66 15.24H9.14001V16.76H10.66V15.24Z" fill="#AD91EA" />
    <path d="M10.66 12.1899H9.14001V13.7099H10.66V12.1899Z" fill="#AD91EA" />
    <path d="M9.14 16.76H7.62V18.28H9.14V16.76Z" fill="#AD91EA" />
    <path d="M9.14 10.66H7.62V12.19H9.14V10.66Z" fill="#AD91EA" />
    <path d="M7.61997 18.28H6.08997V19.81H7.61997V18.28Z" fill="#AD91EA" />
    <path d="M7.61997 9.14001H6.08997V10.66H7.61997V9.14001Z" fill="#AD91EA" />
    <path
      d="M6.08995 19.8101H4.56995V21.3301H6.08995V19.8101Z"
      fill="#AD91EA"
    />
    <path d="M6.08995 7.62H4.56995V9.13999H6.08995V7.62Z" fill="#AD91EA" />
    <path d="M28.9501 0H3.05005V1.52H28.9501V0Z" fill="#AD91EA" />
    <path
      d="M4.57005 4.56995H3.05005V7.61995H4.57005V4.56995Z"
      fill="#AD91EA"
    />
    <path d="M3.05002 22.85H1.52002V24.38H3.05002V22.85Z" fill="#AD91EA" />
    <path
      d="M3.05002 1.52002H1.52002V3.05002H3.05002V1.52002Z"
      fill="#AD91EA"
    />
    <path d="M1.52 3.05005H0V22.85H1.52V3.05005Z" fill="#AD91EA" />
  </svg>
);
