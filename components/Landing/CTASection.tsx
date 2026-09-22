"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export const CTASection: React.FC = () => {
  return (
    <section className="py-24 md:py-32 relative border-t border-white/[0.08] overflow-hidden">
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-r from-indigo-600/20 via-cyan-500/15 to-emerald-500/10 blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-cyan-300">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Instant Autonomous Enterprise Insights</span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight font-sans">
          Your Business Has the Data. <br />
          <span className="bg-gradient-to-r from-indigo-300 via-cyan-200 to-emerald-300 bg-clip-text text-transparent">
            SYNORA Uncovers the Strategy.
          </span>
        </h2>

        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Stop navigating 12 disconnected dashboards. Experience unified multi-agent intelligence across Sales, Finance, Inventory, Support, and HR.
        </p>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/assistant"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-500 via-indigo-600 to-cyan-500 text-white hover:from-indigo-600 hover:to-cyan-600 text-sm font-bold shadow-2xl shadow-indigo-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <span>Launch SYNORA Workspace</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
