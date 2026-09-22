"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export const HeroSection: React.FC = () => {
  return (
    <section className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 text-center py-12">
      {/* Subtle central radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[360px] bg-gradient-to-r from-indigo-500/15 via-cyan-500/10 to-transparent blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto space-y-7">
        {/* Top Tag Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0E1524] border border-[#1E2D44] text-xs font-mono text-cyan-400 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span className="tracking-wide">Instant Autonomous Enterprise Insights</span>
        </div>

        {/* Big Bold Headline (Exact match to reference screenshot) */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
          Your Business Has the Data. <br />
          <span className="bg-gradient-to-r from-[#A5B4FC] via-[#38BDF8] to-[#6EE7B7] bg-clip-text text-transparent">
            SYNORA Uncovers the Strategy.
          </span>
        </h1>

        {/* Subtitle (Exact match to reference screenshot) */}
        <p className="text-sm sm:text-base md:text-lg text-slate-400 font-normal leading-relaxed max-w-2xl mx-auto">
          Stop navigating 12 disconnected dashboards. Experience unified multi-agent intelligence across Sales, Finance, Inventory, Support, and HR.
        </p>

        {/* Primary Glowing Gradient CTA Button (Exact match to reference screenshot) */}
        <div className="pt-2 flex items-center justify-center">
          <Link
            href="/assistant"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#5B6BF6] to-[#00A3E0] hover:from-[#4F5FE8] hover:to-[#0092CC] text-white text-sm font-semibold shadow-[0_0_35px_-5px_rgba(79,70,229,0.45)] hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <span>Launch SYNORA Workspace</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
