"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, TrendingUp, CircleDollarSign, Package, Headphones, Users } from "lucide-react";

const REASONING_STEPS = [
  "Manager Orchestrator analyzing query...",
  "Delegating sub-tasks to specialized domain agents...",
  "Synthesizing findings across active specialists...",
];

export const AssistantAnalyzing: React.FC = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStepIndex((prev) => (prev + 1) % REASONING_STEPS.length);
    }, 1600);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 py-3 animate-fade-in">
      <div className="bg-[#0B0F1A]/90 border border-[#182338] rounded-2xl p-5 sm:p-6 shadow-xl backdrop-blur-md space-y-4">
        {/* Top status */}
        <div className="flex items-center justify-between border-b border-[#161F32] pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-r from-emerald-500 to-cyan-500 flex items-center justify-center text-white shrink-0 shadow-sm shadow-emerald-500/20">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <span className="text-sm font-bold text-white tracking-tight">
              SYNORA Orchestrator
            </span>
          </div>

          <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Analyzing</span>
          </span>
        </div>

        {/* Dynamic Reasoning Step */}
        <p className="text-xs sm:text-sm font-mono text-cyan-300/90 py-1">
          {REASONING_STEPS[currentStepIndex]}
        </p>

        {/* ACTIVE AGENTS BEING USED (Highlighted in Green) */}
        <div className="space-y-2 pt-1 border-t border-[#161F32]">
          <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 flex items-center gap-1.5 font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Active Specialists Engaged:</span>
          </span>

          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-medium shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
              <span>Sales Specialist</span>
            </div>

            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-medium shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <CircleDollarSign className="w-3.5 h-3.5 text-emerald-400" />
              <span>Finance Specialist</span>
            </div>

            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-medium shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <Package className="w-3.5 h-3.5 text-emerald-400" />
              <span>Inventory Specialist</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
