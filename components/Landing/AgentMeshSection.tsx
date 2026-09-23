"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  TrendingUp,
  CircleDollarSign,
  Package,
  Headphones,
  Users,
  Bot,
  Sparkles,
  ArrowRight,
} from "lucide-react";

export const AgentMeshSection: React.FC = () => {
  const [hoveredAgent, setHoveredAgent] = useState<string | null>(null);

  const agents = [
    {
      id: "sales",
      name: "Sales Specialist",
      tag: "Revenue Engine",
      subtitle: "Pipeline & Conversion Velocity",
      query: "Why are my sales falling despite high marketing spend?",
      desc: "Analyzes funnel drop-offs, discount elasticity, and rep quota attainment.",
      icon: TrendingUp,
      color: "text-rose-400",
      border: "border-rose-500/30",
      bg: "bg-rose-500/10",
    },
    {
      id: "finance",
      name: "Finance Specialist",
      tag: "Financial Audit",
      subtitle: "Margins & Unit Economics",
      query: "Why is net profit decreasing while revenue is growing?",
      desc: "Audits COGS variance, operating expenses, gross margins, and runway.",
      icon: CircleDollarSign,
      color: "text-emerald-400",
      border: "border-emerald-500/30",
      bg: "bg-emerald-500/10",
    },
    {
      id: "stock",
      name: "Stock Specialist",
      tag: "Supply Chain",
      subtitle: "Availability & SKU Velocity",
      query: "Which high-margin products need immediate inventory attention?",
      desc: "Monitors top SKU stockout risks, lead-time drift, and slow-moving batches.",
      icon: Package,
      color: "text-amber-400",
      border: "border-amber-500/30",
      bg: "bg-amber-500/10",
    },
    {
      id: "support",
      name: "Support Specialist",
      tag: "Customer Care",
      subtitle: "Sentiment & Retention",
      query: "What are the primary support complaints driving customer churn?",
      desc: "Surfaces CSAT sentiment drift, defect clusters, and VIP churn triggers.",
      icon: Headphones,
      color: "text-cyan-400",
      border: "border-cyan-500/30",
      bg: "bg-cyan-500/10",
    },
    {
      id: "hr",
      name: "HR Specialist",
      tag: "Human Capital",
      subtitle: "Workforce & Team Capacity",
      query: "How is employee attendance and team workload impacting delivery?",
      desc: "Evaluates team capacity, overtime burnout flags, and sprint completion.",
      icon: Users,
      color: "text-indigo-400",
      border: "border-indigo-500/30",
      bg: "bg-indigo-500/10",
    },
  ];

  return (
    <section id="specialists" className="py-20 md:py-28 border-t border-[#1A2234] bg-[#080A10]/95 relative overflow-hidden">
      {/* Central radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[600px] h-[350px] bg-gradient-to-r from-indigo-500/10 via-cyan-500/10 to-transparent blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        {/* Section Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0E1524] border border-[#1E2D44] text-xs font-mono text-cyan-400 shadow-sm mx-auto">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Multi-Agent Orchestration Mesh</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            One Manager. Five Specialists. <br />
            <span className="bg-gradient-to-r from-[#A5B4FC] via-[#38BDF8] to-[#6EE7B7] bg-clip-text text-transparent">
              One Unified Strategy.
            </span>
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-slate-400 font-normal leading-relaxed max-w-xl mx-auto">
            Instead of general guesswork, specialized agents analyze isolated telemetry before the Manager synthesizes the unified answer.
          </p>
        </div>

        {/* =========================================================================
            MULTI-AGENT ORCHESTRATION MESH DIAGRAM (Manager -> Sales, Finance, Stock -> Support, HR)
            ========================================================================= */}
        <div className="pt-4 max-w-2xl mx-auto">
          <div className="p-6 sm:p-7 rounded-2xl bg-[#0C101A] border border-[#1E273A] shadow-2xl relative overflow-hidden">
            {/* Top Node: Manager */}
            <div className="flex flex-col items-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500/20 via-cyan-500/20 to-indigo-500/20 border border-cyan-500/40 text-xs font-bold text-white shadow-md shadow-cyan-500/10">
                <Bot className="w-4 h-4 text-cyan-400" />
                <span>Manager Orchestrator</span>
                <span className="text-[10px] font-mono text-cyan-300 font-normal border-l border-cyan-500/30 pl-2">
                  Central Synthesis Node
                </span>
              </div>

              {/* Connecting Lines Down to Row 1 */}
              <div className="w-full flex justify-center py-2 text-slate-600">
                <svg className="w-72 h-8 text-[#25334D]" viewBox="0 0 260 30" fill="none">
                  <line x1="130" y1="0" x2="130" y2="30" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
                  <line x1="130" y1="0" x2="35" y2="30" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
                  <line x1="130" y1="0" x2="225" y2="30" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
                </svg>
              </div>
            </div>

            {/* Row 1 Nodes: Sales, Finance, Stock */}
            <div className="grid grid-cols-3 gap-3">
              {agents.slice(0, 3).map((ag) => {
                const Icon = ag.icon;
                return (
                  <Link
                    key={ag.id}
                    href={`/assistant?prompt=${encodeURIComponent(ag.query)}`}
                    onMouseEnter={() => setHoveredAgent(ag.id)}
                    onMouseLeave={() => setHoveredAgent(null)}
                    className={`p-3.5 rounded-xl bg-[#080A10] border ${ag.border} hover:border-cyan-400/60 transition-all flex flex-col items-center text-center space-y-1.5 group shadow-sm hover:scale-[1.02]`}
                  >
                    <div className={`w-7 h-7 rounded-lg ${ag.bg} flex items-center justify-center`}>
                      <Icon className={`w-3.5 h-3.5 ${ag.color}`} />
                    </div>
                    <span className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {ag.name}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono line-clamp-1">
                      {ag.subtitle}
                    </span>
                  </Link>
                );
              })}
            </div>

            {/* Connecting Lines Down to Row 2 */}
            <div className="w-full flex justify-center py-2 text-slate-600">
              <svg className="w-56 h-8 text-[#25334D]" viewBox="0 0 200 30" fill="none">
                <line x1="50" y1="0" x2="70" y2="30" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
                <line x1="150" y1="0" x2="130" y2="30" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
              </svg>
            </div>

            {/* Row 2 Nodes: Support, HR */}
            <div className="grid grid-cols-2 gap-3.5 max-w-sm mx-auto">
              {agents.slice(3, 5).map((ag) => {
                const Icon = ag.icon;
                return (
                  <Link
                    key={ag.id}
                    href={`/assistant?prompt=${encodeURIComponent(ag.query)}`}
                    onMouseEnter={() => setHoveredAgent(ag.id)}
                    onMouseLeave={() => setHoveredAgent(null)}
                    className={`p-3.5 rounded-xl bg-[#080A10] border ${ag.border} hover:border-cyan-400/60 transition-all flex flex-col items-center text-center space-y-1.5 group shadow-sm hover:scale-[1.02]`}
                  >
                    <div className={`w-7 h-7 rounded-lg ${ag.bg} flex items-center justify-center`}>
                      <Icon className={`w-3.5 h-3.5 ${ag.color}`} />
                    </div>
                    <span className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {ag.name}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono line-clamp-1">
                      {ag.subtitle}
                    </span>
                  </Link>
                );
              })}
            </div>

            {/* Bottom active status bar */}
            <div className="mt-5 pt-3.5 border-t border-[#1A2234] flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span className="flex items-center gap-1.5 text-slate-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>5 Autonomous Specialists Connected</span>
              </span>
              <span className="text-cyan-400 hover:underline">Click node to launch query →</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
