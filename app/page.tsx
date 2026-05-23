import React from "react";
import DoubleLineGridOverlay from "./components/DoubleLineGridOverlay";
import HeroSection from "./components/HeroSection";
import BentoGrid from "./components/BentoGrid";

export default function page() {
  return (
    <div className="">
      <HeroSection />
      <BentoGrid />

      <DoubleLineGridOverlay />
    </div>
  );
}
