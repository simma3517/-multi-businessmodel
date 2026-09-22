"use client";

import React from "react";
import { MessageSquareCode, Cpu, GitMerge, FileCheck2, ArrowRight } from "lucide-react";

export const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      step: "01",
      title: "Query & Ingestion",
      badge: "Natural Language",
      description: "Ask complex strategic or operational business questions in natural language.",
      icon: MessageSquareCode,
      color: "text-indigo-400",
      bg: "bg-indigo-500/10 border-indigo-500/30",
    },
    {
      step: "02",
      title: "Manager Decomposition",
      badge: "A2A Delegation",
      description: "ManagerOrchestrator breaks query into sub-problems and routes to specialist agents.",
      icon: Cpu,
      color: "text-cyan-400",
      bg: "bg-cyan-500/10 border-cyan-500/30",
    },
    {
      step: "03",
      title: "Parallel Analysis",
      badge: "5 Autonomous Nodes",
      description: "Sales, Finance, Inventory, Support, and HR run domain tools concurrently.",
      icon: GitMerge,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10 border-emerald-500/30",
    },
    {
      step: "04",
      title: "Executive Synthesis",
      badge: "Unified Action Plan",
      description: "Cross-domain correlations synthesized into one actionable executive decision brief.",
      icon: FileCheck2,
      color: "text-amber-400",
      bg: "bg-amber-500/10 border-amber-500/30",
    },
  ];

  return (
    <section id="workflow" className="py-24 md:py-32 border-t border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-xs font-mono text-cyan-300">
            <span>Execution Pipeline</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            How SYNORA Orchestrates <br />
            <span className="bg-gradient-to-r from-cyan-300 via-indigo-300 to-purple-300 bg-clip-text text-transparent">
              Synchronized Intelligence
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            From raw executive inquiry to full cross-departmental business diagnosis in four deterministic steps.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="p-6 rounded-3xl bg-gradient-to-b from-[#111728] to-[#0B0F19] border border-white/[0.08] hover:border-white/[0.18] flex flex-col justify-between min-h-[260px] shadow-xl hover:-translate-y-1 transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-10 h-10 rounded-2xl flex items-center justify-center border ${item.bg}`}
                    >
                      <Icon className={`w-5 h-5 ${item.color}`} />
                    </div>
                    <span className="text-xs font-mono font-bold text-slate-500 group-hover:text-slate-300 transition-colors">
                      {item.step}
                    </span>
                  </div>

                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/[0.05] text-slate-400 border border-white/[0.06] mb-2 inline-block">
                    {item.badge}
                  </span>

                  <h3 className="text-base font-bold text-white tracking-tight mb-2">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/[0.06] flex items-center gap-1.5 text-[11px] font-mono text-slate-500">
                  <span>Stage {idx + 1} of 4</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
