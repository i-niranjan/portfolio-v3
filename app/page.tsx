import React from "react";
import DoubleLineGridOverlay from "./components/DoubleLineGridOverlay";
import HeroSection from "./components/HeroSection";
import BentoGrid from "./components/BentoGrid";
import GlassShowcase from "./components/GlassComp";
import "@/css/glass.css";
export default function page() {
  return (
    <div className="">
      <HeroSection />
      <BentoGrid />
      <GlassShowcase />
      <div className="min-h-screen"></div>
      <DoubleLineGridOverlay />
    </div>
  );
}
