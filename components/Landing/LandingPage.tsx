"use client";

import React, { useState } from "react";
import { Navbar } from "./Navbar";
import { HeroSection } from "./HeroSection";
import { Footer } from "./Footer";
import { InfoModal } from "./InfoModal";

export const LandingPage: React.FC = () => {
  const [activeModalTab, setActiveModalTab] = useState<string | null>(null);

  return (
    <div className="h-screen w-screen flex flex-col justify-between bg-[#080A10] text-slate-100 font-sans selection:bg-slate-700 selection:text-white relative overflow-hidden">
      {/* Top Navigation */}
      <Navbar onSelectTab={setActiveModalTab} />

      {/* Main Center Hero */}
      <main className="flex-1 flex flex-col justify-center relative">
        <HeroSection />
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
