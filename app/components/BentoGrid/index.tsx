import Container from "@/components/container";
import clsx from "clsx";
import React from "react";
import FirstRow from "./FirstRow";
import { ArrowRight, Plus } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { NumberTicker } from "@/components/ui/number-ticker";
import { Button } from "@/components/ui/button";
import { Globe } from "@/components/ui/globe";

export default function BentoGrid() {
  return (
    <Container>
      <div
        id="about"
        className="grid min-h-screen scroll-mt-32 grid-cols-1 gap-x-2.5 gap-y-5 py-16 md:grid-cols-6 lg:grid-cols-12 lg:grid-rows-[auto_1fr_1fr] lg:py-20"
      >
        <Column className="md:col-span-6 lg:col-span-12">
          <FirstRow />
        </Column>

        <Column
          bgVariant="plainBlack"
          className="min-h-[420px] bg-[url(/assets/portrait-image.jpg)] bg-cover bg-center md:col-span-3 lg:col-span-4 lg:min-h-0"
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
        <Column className="md:col-span-3 lg:col-span-5">
          <div className="flex h-full w-full flex-col gap-2 p-6 text-xl">
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
        <Column className="relative min-h-[300px] p-6 md:col-span-6 lg:col-span-3 lg:min-h-0">
          <Image
            className="absolute right-0 top-0 z-10 h-auto w-36 animate-pulse sm:w-[200px]"
            src={"/assets/web-asset.png"}
            height={200}
            width={200}
            alt="web asset"
          />
          <div className="flex h-full w-full flex-col justify-end gap-13">
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

        <div className="flex flex-col gap-4 md:col-span-2 lg:col-span-2">
          <Column bgVariant="plainBlack" className="h-30">
            <div className="flex flex-col gap-2 items-center justify-center w-full h-full">
              <div className="font-bold text-5xl flex items-center ">
                <NumberTicker value={2} className="text-5xl font-bold" />
                <Plus className="size-8" />
              </div>
              <span className=" font-semibold">Years of Experience</span>
            </div>
          </Column>
          <Column bgVariant="plainBlack" className="h-30">
            <div className="flex flex-col gap-2 items-center justify-center w-full h-full">
              <div className="font-bold text-5xl flex items-center ">
                <NumberTicker value={8} className="text-5xl font-bold" />{" "}
                <Plus className="size-8" />
              </div>
              <span className=" font-semibold">Projects Shipped</span>
            </div>
          </Column>
          <div className="space-y-2">
            <Column
              className="flex w-full cursor-pointer items-center gap-3 rounded-md! px-3 py-2 transition-all hover:scale-105 sm:w-max"
              bgVariant="plainBlack"
            >
              <BookIcon /> <span>Insights</span> <ArrowIcon />
            </Column>
            <Column
              className="flex w-full cursor-pointer items-center gap-3 rounded-md! px-3 py-2 transition-all hover:scale-105 sm:w-max"
              bgVariant="plainBlack"
            >
              <PhoneIcon /> <span>Connect</span> <ArrowIcon />
            </Column>
            <Column
              className="flex w-full cursor-pointer items-center gap-3 rounded-md! px-3 py-2 transition-all hover:scale-105 sm:w-max"
              bgVariant="plainBlack"
            >
              <RocketIcon /> <span>Work</span> <ArrowIcon />
            </Column>
          </div>
        </div>
        <Column className="min-h-[320px] pt-18 md:col-span-4 lg:col-span-4 lg:min-h-0">
          <div className="w-full h-full bg-[url('/assets/brand-slide/indinite-slide.png')] bg-cover flex items-end">
            <div className="p-4 flex justify-between w-full items-end">
              <div className="space-x-2">
                <Button size={"icon-sm"} variant={"ghost"}>
                  <LeftArrow />
                </Button>
                <Button size={"icon-sm"} variant={"ghost"}>
                  <RightArrow />
                </Button>
              </div>
              <div className="text-right">
                <h3 className="text-xl">Recent Work</h3>
                <span className="text-sm text-white/50">
                  Crafting Excellence
                </span>
              </div>
            </div>
          </div>
        </Column>
        <Column className="relative min-h-[360px] md:col-span-6 lg:col-span-6 lg:min-h-0">
          <div className="relative h-full w-full">
            <div className="flex items-center w-full flex-col pt-20">
              <span>Based In India</span>
              <span className="italic flex gap-2 items-center">
                <LightningIcon /> Available Worldwide
              </span>
            </div>
            <Globe className="top-25" />
          </div>
        </Column>
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

const BookIcon = () => (
  <svg
    width="23"
    height="21"
    viewBox="0 0 23 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M23 2.19214H21.9075V18.6156H23V2.19214Z" fill="#AD91EA" />
    <path
      d="M21.9075 18.6157H14.2385V19.7154H21.9075V18.6157Z"
      fill="#AD91EA"
    />
    <path
      d="M18.6228 2.19214H17.5303V3.28464H18.6228V2.19214Z"
      fill="#AD91EA"
    />
    <path
      d="M18.6228 8.76147H16.4306V9.85397H18.6228V8.76147Z"
      fill="#AD91EA"
    />
    <path
      d="M18.6228 13.1387H13.1459V14.2384H18.6228V13.1387Z"
      fill="#AD91EA"
    />
    <path
      d="M18.6228 10.9539H13.1459V12.0464H18.6228V10.9539Z"
      fill="#AD91EA"
    />
    <path
      d="M15.3381 8.76147H13.1459V9.85397H15.3381V8.76147Z"
      fill="#AD91EA"
    />
    <path
      d="M17.5303 6.56934H13.1459V7.66902H17.5303V6.56934Z"
      fill="#AD91EA"
    />
    <path d="M18.6228 4.3772H13.1459V5.47689H18.6228V4.3772Z" fill="#AD91EA" />
    <path
      d="M16.4306 2.19214H13.1459V3.28464H16.4306V2.19214Z"
      fill="#AD91EA"
    />
    <path d="M19.7153 0H12.0535V1.0925H19.7153V0Z" fill="#AD91EA" />
    <path
      d="M14.2384 19.7153H8.76874V20.8078H14.2384V19.7153Z"
      fill="#AD91EA"
    />
    <path
      d="M9.86124 8.76147H8.76874V9.85397H9.86124V8.76147Z"
      fill="#AD91EA"
    />
    <path
      d="M9.86124 6.56934H8.76874V7.66902H9.86124V6.56934Z"
      fill="#AD91EA"
    />
    <path d="M9.86124 4.3772H8.76874V5.47689H9.86124V4.3772Z" fill="#AD91EA" />
    <path
      d="M9.86124 2.19214H8.76874V3.28464H9.86124V2.19214Z"
      fill="#AD91EA"
    />
    <path
      d="M8.76873 18.6157H1.09967V19.7154H8.76873V18.6157Z"
      fill="#AD91EA"
    />
    <path
      d="M9.86123 13.1387H6.57654V14.2384H9.86123V13.1387Z"
      fill="#AD91EA"
    />
    <path
      d="M9.86124 10.9539H5.47687V12.0464H9.86124V10.9539Z"
      fill="#AD91EA"
    />
    <path d="M5.4769 13.1387H4.3844V14.2384H5.4769V13.1387Z" fill="#AD91EA" />
    <path
      d="M4.38437 9.85406H5.47687V8.76156H6.57656V9.85406H7.66906V1.0925H10.9537V0H3.29187V1.0925H4.38437V9.85406Z"
      fill="#AD91EA"
    />
    <path
      d="M2.19217 17.5232H9.86123V18.6157H13.1459V17.5232H20.815V2.19222H21.9075V1.09253H19.7153V16.4307H12.0534V1.09253H10.9537V16.4307H3.29186V1.09253H1.09967V2.19222H2.19217V17.5232Z"
      fill="#AD91EA"
    />
    <path d="M1.09969 2.19214H0V18.6156H1.09969V2.19214Z" fill="#AD91EA" />
  </svg>
);

const PhoneIcon = () => (
  <svg
    width="22"
    height="21"
    viewBox="0 0 22 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_1051_384)">
      <path
        d="M15.2041 4.92847V6.92347H13.1072V9.92909H15.2041V11.9241H18.3459V9.92909H20.4428V6.92347H18.3459V4.92847H15.2041Z"
        fill="#AD91EA"
      />
      <path d="M18.346 18.9263H17.301V19.9238H18.346V18.9263Z" fill="#AD91EA" />
      <path
        d="M17.3009 19.9238H15.204V21.0001H17.3009V19.9238Z"
        fill="#AD91EA"
      />
      <path
        d="M15.2041 17.9287H14.1591V18.9262H13.1072V19.9237H15.2041V17.9287Z"
        fill="#AD91EA"
      />
      <path
        d="M14.1591 16.9248H13.1072V17.9289H14.1591V16.9248Z"
        fill="#AD91EA"
      />
      <path
        d="M13.1072 17.9287H12.0622V18.9262H13.1072V17.9287Z"
        fill="#AD91EA"
      />
      <path
        d="M13.1072 19.9238H9.96533V21.0001H13.1072V19.9238Z"
        fill="#AD91EA"
      />
      <path
        d="M11.0172 13.9255H9.96533V17.9287H11.0172V13.9255Z"
        fill="#AD91EA"
      />
      <path
        d="M11.0172 1.92285H9.96533V5.92598H11.0172V1.92285Z"
        fill="#AD91EA"
      />
      <path
        d="M8.92031 18.9262H4.72656V19.9237H9.96531V17.9287H8.92031V18.9262Z"
        fill="#AD91EA"
      />
      <path
        d="M9.96529 0.925293H8.92029V1.92279H9.96529V0.925293Z"
        fill="#AD91EA"
      />
      <path
        d="M9.96534 12.9282H7.86847V13.9257H9.96534V12.9282Z"
        fill="#AD91EA"
      />
      <path
        d="M9.96534 5.92603H7.86847V6.92353H9.96534V5.92603Z"
        fill="#AD91EA"
      />
      <path
        d="M7.86842 1.92285H6.82343V4.92848H8.9203V2.92691H7.86842V1.92285Z"
        fill="#AD91EA"
      />
      <path
        d="M6.82343 17.9287H7.86842V16.9247H8.9203V14.9231H6.82343V17.9287Z"
        fill="#AD91EA"
      />
      <path
        d="M7.86842 6.92334H6.82343V12.928H7.86842V6.92334Z"
        fill="#AD91EA"
      />
      <path d="M8.92031 0H4.72656V0.925312H8.92031V0Z" fill="#AD91EA" />
      <path
        d="M4.72658 17.9287H3.68158V18.9262H4.72658V17.9287Z"
        fill="#AD91EA"
      />
      <path
        d="M4.72658 0.925293H3.68158V1.92279H4.72658V0.925293Z"
        fill="#AD91EA"
      />
      <path
        d="M3.68157 15.9272H2.6297V17.9288H3.68157V15.9272Z"
        fill="#AD91EA"
      />
      <path
        d="M3.68157 1.92285H2.6297V3.92441H3.68157V1.92285Z"
        fill="#AD91EA"
      />
      <path
        d="M2.62969 3.92432H1.55719V15.9271H2.62969V3.92432Z"
        fill="#AD91EA"
      />
    </g>
    <defs>
      <clipPath id="clip0_1051_384">
        <rect width="22" height="21" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const RocketIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 22 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4.86374e-05 19.9028H2.09692V20.9547H4.86374e-05V19.9028Z"
      fill="#AD91EA"
    />
    <path
      d="M2.09697 20.9551H3.14197V22.0001H2.09697V20.9551Z"
      fill="#AD91EA"
    />
    <path
      d="M3.14191 13.6194H4.19379V14.6644H3.14191V15.7163H2.09691V10.4775H3.14191V13.6194Z"
      fill="#AD91EA"
    />
    <path
      d="M3.14195 19.9028H5.23883V20.9547H3.14195V19.9028Z"
      fill="#AD91EA"
    />
    <path
      d="M3.14191 9.43262H4.19379V10.4776H3.14191V9.43262Z"
      fill="#AD91EA"
    />
    <path
      d="M5.23882 18.8579H7.33569V19.9029H5.23882V18.8579Z"
      fill="#AD91EA"
    />
    <path
      d="M6.28363 14.6644H5.23863V13.6194H4.19363V12.5744H5.23863V9.43253H4.19363V8.38065H5.23863V5.23877H6.28363V14.6644Z"
      fill="#AD91EA"
    />
    <path
      d="M7.33561 20.9551H8.38062V22.0001H7.33561V20.9551Z"
      fill="#AD91EA"
    />
    <path
      d="M7.33561 12.5745H8.38062V13.6195H7.33561V12.5745Z"
      fill="#AD91EA"
    />
    <path
      d="M7.33561 10.4775H8.38062V11.5225H7.33561V10.4775Z"
      fill="#AD91EA"
    />
    <path
      d="M8.38068 18.8579H9.43256V20.9548H8.38068V18.8579Z"
      fill="#AD91EA"
    />
    <path
      d="M8.38065 16.7612H12.5744V17.8131H8.38065V16.7612Z"
      fill="#AD91EA"
    />
    <path d="M8.38068 1.04492H9.43256V2.0968H8.38068V1.04492Z" fill="#AD91EA" />
    <path d="M9.43246 0L11.5225 0V1.045H9.43246V0Z" fill="#AD91EA" />
    <path
      d="M8.38065 6.28377H9.43253V5.23877H11.5225V6.28377H10.4775V7.33565H11.5225V6.28377H12.5744V8.38065H11.5225V9.43253H9.43253V8.38065H8.38065V6.28377Z"
      fill="#AD91EA"
    />
    <path
      d="M11.5225 18.8579H12.5744V20.9548H11.5225V18.8579Z"
      fill="#AD91EA"
    />
    <path
      d="M14.6713 15.7162H13.6194V16.7612H12.5744V15.7162H8.38064V16.7612H7.33564V15.7162H6.28376V14.6643H14.6713V15.7162Z"
      fill="#AD91EA"
    />
    <path d="M11.5225 1.04492H12.5744V2.0968H11.5225V1.04492Z" fill="#AD91EA" />
    <path
      d="M12.5744 20.9551H13.6194V22.0001H12.5744V20.9551Z"
      fill="#AD91EA"
    />
    <path
      d="M13.6194 18.8579H15.7163V19.9029H13.6194V18.8579Z"
      fill="#AD91EA"
    />
    <path
      d="M12.5744 3.14217V2.09717H13.6194V3.14217H14.6713V5.23905H13.6194V4.19405H7.33564V5.23905H6.28376V3.14217H7.33564V2.09717H8.38064V3.14217H12.5744Z"
      fill="#AD91EA"
    />
    <path
      d="M14.6712 5.23877H15.7162V8.38065H16.7612V9.43253H15.7162V12.5744H16.7612V13.6194H15.7162V14.6644H14.6712V5.23877Z"
      fill="#AD91EA"
    />
    <path
      d="M15.7163 19.9028H17.8132V20.9547H15.7163V19.9028Z"
      fill="#AD91EA"
    />
    <path
      d="M16.7613 9.43262H17.8132V10.4776H16.7613V9.43262Z"
      fill="#AD91EA"
    />
    <path
      d="M17.8131 20.9551H18.8581V22.0001H17.8131V20.9551Z"
      fill="#AD91EA"
    />
    <path
      d="M17.8131 10.4775H18.8581V15.7163H17.8131V14.6644H16.7612V13.6194H17.8131V10.4775Z"
      fill="#AD91EA"
    />
    <path d="M18.8581 19.9028H20.955V20.9547H18.8581V19.9028Z" fill="#AD91EA" />
    <path d="M20.955 20.9551H22V22.0001H20.955V20.9551Z" fill="#AD91EA" />
  </svg>
);

const ArrowIcon = () => (
  <svg
    width="14"
    height="8"
    viewBox="0 0 14 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9.14001 0V1.52H10.67V3.05H12.19V4.57H13.71V0H9.14001Z"
      fill="#AD91EA"
    />
    <path d="M10.67 3.05005H9.14001V4.57005H10.67V3.05005Z" fill="#AD91EA" />
    <path d="M9.14 4.57007H7.62V6.10007H9.14V4.57007Z" fill="#AD91EA" />
    <path
      d="M7.61997 3.05005H6.08997V4.57005H7.61997V3.05005Z"
      fill="#AD91EA"
    />
    <path
      d="M6.09007 1.52002H4.57007V3.05002H6.09007V1.52002Z"
      fill="#AD91EA"
    />
    <path
      d="M4.57005 3.05005H3.05005V4.57005H4.57005V3.05005Z"
      fill="#AD91EA"
    />
    <path
      d="M3.05002 4.57007H1.52002V6.10007H3.05002V4.57007Z"
      fill="#AD91EA"
    />
    <path d="M1.52 6.1001H0V7.6201H1.52V6.1001Z" fill="#AD91EA" />
  </svg>
);

const LeftArrow = () => (
  <svg
    width="19"
    height="19"
    viewBox="0 0 19 19"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9.19239 18.1743L11.4341 15.9325L6.83792 11.3363L9.09439 9.07986L6.80383 6.7893L11.2873 2.30584L8.98166 0.000209723L0 8.98186L9.19239 18.1743Z"
      fill="#AD91EA"
      fillOpacity="0.9"
    />
    <path
      d="M9.09443 9.0798L11.4001 11.3854L13.6418 9.14371L11.3362 6.83807L9.09443 9.0798Z"
      fill="#AD91EA"
      fillOpacity="0.9"
    />
    <path
      d="M13.6418 9.14321L15.9324 11.4338L18.1741 9.19205L15.8836 6.90148L13.6418 9.14321Z"
      fill="#AD91EA"
      fillOpacity="0.9"
    />
  </svg>
);

const RightArrow = () => (
  <svg
    width="19"
    height="19"
    viewBox="0 0 19 19"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8.98179 0L6.74006 2.24173L11.3363 6.83792L9.07978 9.0944L11.3703 11.385L6.88689 15.8684L9.19252 18.174L18.1742 9.19239L8.98179 0Z"
      fill="#AD91EA"
    />
    <path
      d="M9.07998 9.09445L6.77434 6.78882L4.53262 9.03055L6.83825 11.3362L9.07998 9.09445Z"
      fill="#AD91EA"
    />
    <path
      d="M4.53254 9.0308L2.24198 6.74023L0.000252201 8.98196L2.29082 11.2725L4.53254 9.0308Z"
      fill="#AD91EA"
    />
  </svg>
);

const LightningIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M18 6.85681H17.145V11.1431H18V6.85681Z" fill="#AD91EA" />
    <path d="M17.145 11.1432H16.29V12.8588H17.145V11.1432Z" fill="#AD91EA" />
    <path d="M17.145 5.14685H16.29V6.85685H17.145V5.14685Z" fill="#AD91EA" />
    <path d="M16.29 12.8588H15.4294V14.5744H16.29V12.8588Z" fill="#AD91EA" />
    <path d="M16.29 3.43127H15.4294V5.1469H16.29V3.43127Z" fill="#AD91EA" />
    <path
      d="M15.4294 14.5743H14.5744V15.4293H15.4294V14.5743Z"
      fill="#AD91EA"
    />
    <path
      d="M15.4294 2.57617H14.5744V3.43117H15.4294V2.57617Z"
      fill="#AD91EA"
    />
    <path
      d="M14.5744 15.4294H12.8588V16.2901H14.5744V15.4294Z"
      fill="#AD91EA"
    />
    <path d="M14.5744 1.7157H12.8588V2.57632H14.5744V1.7157Z" fill="#AD91EA" />
    <path d="M12.8588 16.29H11.1431V17.145H12.8588V16.29Z" fill="#AD91EA" />
    <path
      d="M12.8588 0.860596H11.1431V1.7156H12.8588V0.860596Z"
      fill="#AD91EA"
    />
    <path
      d="M8.5725 3.43127V4.28627H7.7175V5.1469H6.8625V6.0019H6.00188V6.8569H5.14688V7.71752H4.28625V9.43315H5.14688V10.2881H7.7175V11.1431H6.8625V12.8588H6.00188V14.5744H7.7175V13.7138H8.5725V12.8588H9.43313V12.0038H10.2881V11.1431H11.1431V10.2881H12.0038V8.57252H11.1431V7.71752H9.43313V6.8569H10.2881V6.0019H11.1431V5.1469H12.0038V3.43127H8.5725Z"
      fill="#AD91EA"
    />
    <path d="M11.1431 17.145H6.86249V18H11.1431V17.145Z" fill="#AD91EA" />
    <path d="M11.1431 0H6.86249V0.860625H11.1431V0Z" fill="#AD91EA" />
    <path d="M6.86251 16.29H5.14688V17.145H6.86251V16.29Z" fill="#AD91EA" />
    <path
      d="M6.86251 0.860596H5.14688V1.7156H6.86251V0.860596Z"
      fill="#AD91EA"
    />
    <path
      d="M5.14687 15.4294H3.43124V16.2901H5.14687V15.4294Z"
      fill="#AD91EA"
    />
    <path d="M5.14687 1.7157H3.43124V2.57632H5.14687V1.7157Z" fill="#AD91EA" />
    <path
      d="M3.43123 14.5743H2.57623V15.4293H3.43123V14.5743Z"
      fill="#AD91EA"
    />
    <path
      d="M3.43123 2.57617H2.57623V3.43117H3.43123V2.57617Z"
      fill="#AD91EA"
    />
    <path
      d="M2.57623 12.8588H1.71561V14.5744H2.57623V12.8588Z"
      fill="#AD91EA"
    />
    <path d="M2.57623 3.43127H1.71561V5.1469H2.57623V3.43127Z" fill="#AD91EA" />
    <path
      d="M1.71563 11.1432H0.860626V12.8588H1.71563V11.1432Z"
      fill="#AD91EA"
    />
    <path
      d="M1.71563 5.14685H0.860626V6.85685H1.71563V5.14685Z"
      fill="#AD91EA"
    />
    <path d="M0.860625 6.85681H0V11.1431H0.860625V6.85681Z" fill="#AD91EA" />
  </svg>
);
