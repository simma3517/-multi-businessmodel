"use client";

import React, { useState } from "react";
import { Navbar } from "./Navbar";
import { HeroSection } from "./HeroSection";
import { SpecialistsSection } from "./SpecialistsSection";
import { Footer } from "./Footer";
import { InfoModal } from "./InfoModal";

export const LandingPage: React.FC = () => {
  const [activeModalTab, setActiveModalTab] = useState<string | null>(null);

  return (
    <div className="min-h-screen min-h-[100dvh] w-full max-w-full flex flex-col justify-between bg-[#080A10] text-slate-100 font-sans selection:bg-slate-700 selection:text-white relative overflow-x-hidden">
      {/* Top Navigation */}
      <Navbar onSelectTab={setActiveModalTab} />

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative">
        {/* 1. First Viewport: Hero */}
        <HeroSection />

        {/* 2. On Scroll: Compact 5 Autonomous Specialists Section */}
        <SpecialistsSection />
      </main>

      {/* Bottom Bar / Footer */}
      <Footer onSelectTab={setActiveModalTab} />

      {/* Interactive Detail Modal for Nav/Footer links */}
      <InfoModal
        activeTab={activeModalTab}
        onClose={() => setActiveModalTab(null)}
      />
    </div>
  );
};
