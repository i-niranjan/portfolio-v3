"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatted = now.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
      setTime(formatted);
    };

    updateTime(); // set immediately
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);
  return (
    <header className="fixed top-0 z-999  w-full ">
      {/* <div className="absolute pointer-events-none top-0 left-0 w-full  h-50 bg-gradient-to-b from-[#0a0a0a] via-[#0a0a0a]/70 to-transparent"></div>{" "} */}
      <div className="flex items-end justify-between  px-2 py-6 w-full h-full max-w-7xl mx-auto">
        <div className="flex gap-6">
          <div className="px-2 flex backdrop-blur-md z-50 relative items-center gap-2 border font-normal text-primary border-primary rounded-[0.25rem] w-max">
            {time} <IconClock />
          </div>
          <div className="flex gap-2 items-end justify-end leading-none backdrop-blur-md rounded-md">
            <UserIcon />
            <span className="text-primary text-base">
              Hi, I&apos;m Niranjan...
            </span>
          </div>
        </div>

        <nav className="absolute left-1/2 -translate-x-1/2 uppercase flex gap-10 items-end backdrop-blur-md px-3 py-2 rounded-md">
          <Link
            className="active:text-primary text-base leading-none"
            href={"/"}
          >
            Home
          </Link>
          <Link
            className="active:text-primary text-base leading-none"
            href={"/projects"}
          >
            Projects
          </Link>
          <Link
            className="active:text-primary text-base leading-none"
            href={"#"}
          >
            About
          </Link>
        </nav>
        <Link
          href={"#"}
          className="text-primary flex gap-2 z-10 items-center  leading-none text-base"
        >
          <TelePhone />{" "}
          <span className="leading-none block translate-y-[1px]">TALK</span>
        </Link>
      </div>
    </header>
  );
}

const IconClock = () => {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M17 6.47594H16.1872V10.5241H17V6.47594Z" fill="#AD91EA" />
      <path
        d="M16.1872 10.5241H15.3797V12.1444H16.1872V10.5241Z"
        fill="#AD91EA"
      />
      <path
        d="M16.1872 4.85562H15.3797V6.47593H16.1872V4.85562Z"
        fill="#AD91EA"
      />
      <path
        d="M15.3797 12.1444H14.5722V13.7594H15.3797V12.1444Z"
        fill="#AD91EA"
      />
      <path
        d="M15.3797 3.24063H14.5722V4.85563H15.3797V3.24063Z"
        fill="#AD91EA"
      />
      <path
        d="M14.5722 13.7594H13.7594V14.5722H14.5722V13.7594Z"
        fill="#AD91EA"
      />
      <path
        d="M14.5722 2.42781H13.7594V3.24062H14.5722V2.42781Z"
        fill="#AD91EA"
      />
      <path
        d="M13.7594 14.5722H12.1391V15.3797H13.7594V14.5722Z"
        fill="#AD91EA"
      />
      <path
        d="M13.7594 1.62032H12.1391V2.42782H13.7594V1.62032Z"
        fill="#AD91EA"
      />
      <path
        d="M7.28342 9.71656H8.09623V10.5241H8.90373V9.71656H9.71124V8.90375H12.9519V8.09625H9.71124V7.28344H8.90373V2.42781H8.09623V7.28344H7.28342V8.09625H6.47592V8.90375H7.28342V9.71656Z"
        fill="#AD91EA"
      />
      <path
        d="M12.1391 15.3797H10.5241V16.1925H12.1391V15.3797Z"
        fill="#AD91EA"
      />
      <path
        d="M12.1391 0.807495H10.5241V1.62031H12.1391V0.807495Z"
        fill="#AD91EA"
      />
      <path d="M10.524 16.1925H6.47592V17H10.524V16.1925Z" fill="#AD91EA" />
      <path d="M10.524 0H6.47592V0.8075H10.524V0Z" fill="#AD91EA" />
      <path
        d="M6.47593 15.3797H4.85562V16.1925H6.47593V15.3797Z"
        fill="#AD91EA"
      />
      <path
        d="M6.47593 0.807495H4.85562V1.62031H6.47593V0.807495Z"
        fill="#AD91EA"
      />
      <path
        d="M4.85563 14.5722H3.23532V15.3797H4.85563V14.5722Z"
        fill="#AD91EA"
      />
      <path
        d="M4.85563 1.62032H3.23532V2.42782H4.85563V1.62032Z"
        fill="#AD91EA"
      />
      <path
        d="M3.23533 13.7594H2.42783V14.5722H3.23533V13.7594Z"
        fill="#AD91EA"
      />
      <path
        d="M3.23533 2.42781H2.42783V3.24062H3.23533V2.42781Z"
        fill="#AD91EA"
      />
      <path d="M2.4278 12.1444H1.6203V13.7594H2.4278V12.1444Z" fill="#AD91EA" />
      <path d="M2.4278 3.24063H1.6203V4.85563H2.4278V3.24063Z" fill="#AD91EA" />
      <path
        d="M1.62031 10.5241H0.807495V12.1444H1.62031V10.5241Z"
        fill="#AD91EA"
      />
      <path
        d="M1.62031 4.85562H0.807495V6.47593H1.62031V4.85562Z"
        fill="#AD91EA"
      />
      <path d="M0.8075 6.47594H0V10.5241H0.8075V6.47594Z" fill="#AD91EA" />
    </svg>
  );
};

const UserIcon = () => {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 35 35"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M34.9232 13.9716H33.181V20.9519H34.9232V13.9716Z"
        fill="#AD91EA"
      />
      <path
        d="M10.4761 13.971H12.2182V12.2174H13.9718V10.4753H20.9518V12.2174H22.7054V10.4753H27.9432V12.2174H29.6854V26.1889H31.4389V22.7046H33.1811V20.951H31.4389V13.971H33.1811V12.2174H31.4389V5.23745H29.6854V6.97958H27.9432V5.23745H24.4475V3.48386H12.2182V5.23745H10.4761V6.97958H8.73392V10.4753H6.98033V5.23745H5.2382V10.4753H3.49606V12.2174H10.4761V13.971Z"
        fill="#AD91EA"
      />
      <path
        d="M29.6846 26.1886H27.9425V27.9422H29.6846V26.1886Z"
        fill="#AD91EA"
      />
      <path
        d="M29.6846 3.48386H27.9425V5.23738H29.6846V3.48386Z"
        fill="#AD91EA"
      />
      <path
        d="M27.9437 22.7048H26.1902V24.4468H27.9437V22.7048Z"
        fill="#AD91EA"
      />
      <path
        d="M27.9438 17.4564H26.1902V20.9521H27.9438V17.4564Z"
        fill="#AD91EA"
      />
      <path
        d="M27.9437 1.74284H26.1902V3.4849H27.9437V1.74284Z"
        fill="#AD91EA"
      />
      <path
        d="M12.2182 27.9432V31.4447H8.73395V33.1868H5.23822V34.929H33.1811V33.1868H29.6854V31.4447H26.1897V29.6911H27.9433V27.949L12.2182 27.9432ZM24.4475 33.1811H17.4675V31.4447H13.9718V29.6911H24.4533L24.4475 33.1811Z"
        fill="#AD91EA"
      />
      <path
        d="M26.1893 24.4476H20.9513V26.1898H26.1893V24.4476Z"
        fill="#AD91EA"
      />
      <path
        d="M20.9517 22.7048H19.2096V24.4468H20.9517V22.7048Z"
        fill="#AD91EA"
      />
      <path
        d="M19.2098 17.4564H17.4677V20.9521H19.2098V17.4564Z"
        fill="#AD91EA"
      />
      <path d="M20.952 12.217H17.4677V13.9706H20.952V12.217Z" fill="#AD91EA" />
      <path
        d="M13.9718 13.9716H12.2181V20.9519H13.9718V13.9716Z"
        fill="#AD91EA"
      />
      <path d="M26.1891 0H10.4753V1.74216H26.1891V0Z" fill="#AD91EA" />
      <path
        d="M12.2174 26.1886H10.4753V27.9422H12.2174V26.1886Z"
        fill="#AD91EA"
      />
      <path
        d="M12.2174 20.952H10.4753V22.7055H12.2174V20.952Z"
        fill="#AD91EA"
      />
      <path
        d="M3.49606 22.7048V24.447H8.73416V26.1892H10.4764V22.7048H3.49606Z"
        fill="#AD91EA"
      />
      <path
        d="M10.4761 1.74284H8.73407V3.4849H10.4761V1.74284Z"
        fill="#AD91EA"
      />
      <path
        d="M8.73345 3.48386H6.97992V5.23738H8.73345V3.48386Z"
        fill="#AD91EA"
      />
      <path
        d="M6.98029 13.9716H5.23822V15.7137H6.98029V13.9716Z"
        fill="#AD91EA"
      />
      <path
        d="M5.23822 15.7135H3.49606V19.2093H5.23822V15.7135Z"
        fill="#AD91EA"
      />
      <path
        d="M3.49547 20.952H1.74194V22.7055H3.49547V20.952Z"
        fill="#AD91EA"
      />
      <path
        d="M3.49547 12.217H1.74194V13.9705H3.49547V12.217Z"
        fill="#AD91EA"
      />
      <path d="M1.74221 13.9716H0V20.9519H1.74221V13.9716Z" fill="#AD91EA" />
    </svg>
  );
};

const TelePhone = () => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.1394 2.57062H16.2844V5.14124H17.1394V2.57062Z"
        fill="#AD91EA"
      />
      <path
        d="M16.2844 11.1375H15.4294V16.2844H16.2844V11.1375Z"
        fill="#AD91EA"
      />
      <path
        d="M16.2844 1.71001H15.4294V2.57063H16.2844V1.71001Z"
        fill="#AD91EA"
      />
      <path
        d="M15.4293 16.2844H14.5687V17.1394H15.4293V16.2844Z"
        fill="#AD91EA"
      />
      <path
        d="M15.4293 9.42751H14.5687V11.1375H15.4293V9.42751Z"
        fill="#AD91EA"
      />
      <path
        d="M16.2844 5.14125H13.7137V5.99625H16.2844V5.14125Z"
        fill="#AD91EA"
      />
      <path
        d="M15.4293 0.854996H14.5687V1.71H15.4293V0.854996Z"
        fill="#AD91EA"
      />
      <path
        d="M14.5687 8.56688H13.7137V9.4275H14.5687V8.56688Z"
        fill="#AD91EA"
      />
      <path d="M14.5687 17.1394H2.57062V18H14.5687V17.1394Z" fill="#AD91EA" />
      <path
        d="M13.7138 3.42563H12.8588V5.14125H13.7138V3.42563Z"
        fill="#AD91EA"
      />
      <path
        d="M12.8588 2.57062H4.28625V3.42562H12.8588V2.57062Z"
        fill="#AD91EA"
      />
      <path
        d="M11.9981 11.1375H11.1431V14.5687H11.9981V11.1375Z"
        fill="#AD91EA"
      />
      <path
        d="M11.1431 14.5688H10.2825V15.4238H11.1431V14.5688Z"
        fill="#AD91EA"
      />
      <path
        d="M11.1431 10.2825H10.2825V11.1375H11.1431V10.2825Z"
        fill="#AD91EA"
      />
      <path
        d="M10.2825 15.4238H6.85687V16.2844H10.2825V15.4238Z"
        fill="#AD91EA"
      />
      <path
        d="M9.4275 11.1375H7.71187V11.9981H6.85687V13.7137H7.71187V14.5687H9.4275V13.7137H10.2825V11.9981H9.4275V11.1375Z"
        fill="#AD91EA"
      />
      <path
        d="M10.2825 9.42751H6.85687V10.2825H10.2825V9.42751Z"
        fill="#AD91EA"
      />
      <path
        d="M6.85689 14.5688H6.00189V15.4238H6.85689V14.5688Z"
        fill="#AD91EA"
      />
      <path
        d="M6.85689 10.2825H6.00189V11.1375H6.85689V10.2825Z"
        fill="#AD91EA"
      />
      <path
        d="M6.00186 11.1375H5.14124V14.5687H6.00186V11.1375Z"
        fill="#AD91EA"
      />
      <path
        d="M5.14122 6.85687H6.85685V8.56687H10.2825V6.85687H11.9981V8.56687H13.7137V7.71187H12.8587V5.99625H9.42747V7.71187H7.71185V5.99625H4.28622V7.71187H3.4256V8.56687H5.14122V6.85687Z"
        fill="#AD91EA"
      />
      <path
        d="M4.28622 3.42563H3.4256V5.14125H4.28622V3.42563Z"
        fill="#AD91EA"
      />
      <path d="M14.5687 0H2.57062V0.855H14.5687V0Z" fill="#AD91EA" />
      <path
        d="M3.42562 8.56688H2.57062V9.4275H3.42562V8.56688Z"
        fill="#AD91EA"
      />
      <path
        d="M2.57064 16.2844H1.71564V17.1394H2.57064V16.2844Z"
        fill="#AD91EA"
      />
      <path
        d="M2.57064 9.42751H1.71564V11.1375H2.57064V9.42751Z"
        fill="#AD91EA"
      />
      <path
        d="M3.42561 5.14125H0.85498V5.99625H3.42561V5.14125Z"
        fill="#AD91EA"
      />
      <path
        d="M2.57064 0.854996H1.71564V1.71H2.57064V0.854996Z"
        fill="#AD91EA"
      />
      <path
        d="M1.71561 11.1375H0.85498V16.2844H1.71561V11.1375Z"
        fill="#AD91EA"
      />
      <path
        d="M1.71561 1.71001H0.85498V2.57063H1.71561V1.71001Z"
        fill="#AD91EA"
      />
      <path d="M0.855 2.57062H0V5.14124H0.855V2.57062Z" fill="#AD91EA" />
    </svg>
  );
};
