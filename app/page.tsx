import React from "react";
import DoubleLineGridOverlay from "./components/DoubleLineGridOverlay";
import HeroSection from "./components/HeroSection";

export default function page() {
  return (
    <div className="min-h-[200vh]">
      <HeroSection />
      <DoubleLineGridOverlay />
    </div>
  );
}
