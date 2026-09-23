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
  ShieldCheck,
  Zap,
} from "lucide-react";

interface AgentNode {
  id: string;
  name: string;
  domain: string;
  role: string;
  query: string;
  metric: string;
  icon: any;
  color: string;
  badgeBg: string;
  borderColor: string;
}

const AGENTS: AgentNode[] = [
  {
    id: "sales",
    name: "Sales Specialist",
    domain: "Sales & Pipeline",
    role: "Monitors deal conversion velocity, pipeline drop-offs, and pricing discount elasticity.",
    query: "Why are sales falling despite high marketing spend?",
    metric: "Conversion & Deal Velocity",
    icon: TrendingUp,
    color: "text-rose-400",
    badgeBg: "bg-rose-500/10",
    borderColor: "border-rose-500/30",
  },
  {
    id: "finance",
    name: "Finance Specialist",
    domain: "Unit Economics",
    role: "Audits COGS variance, operating expense spikes, freight surcharges, and gross margins.",
    query: "Why is net profit decreasing while revenue grows?",
    metric: "COGS & Margin Audit",
    icon: CircleDollarSign,
    color: "text-emerald-400",
    badgeBg: "bg-emerald-500/10",
    borderColor: "border-emerald-500/30",
  },
  {
    id: "inventory",
    name: "Inventory Specialist",
    domain: "Supply Chain",
    role: "Flags stockout risks on high-margin SKUs, supplier lead drift, and slow-moving batches.",
    query: "Which high-margin products need immediate inventory attention?",
    metric: "Stockout & Lead Time Drift",
    icon: Package,
    color: "text-amber-400",
    badgeBg: "bg-amber-500/10",
    borderColor: "border-amber-500/30",
  },
  {
    id: "support",
    name: "Support Specialist",
    domain: "Customer Retention",
    role: "Surfaces CSAT sentiment drift, checkout ticket clusters, defect spikes, and churn risks.",
    query: "What are the primary support complaints driving customer churn?",
    metric: "CSAT Drift & Churn Triggers",
    icon: Headphones,
    color: "text-cyan-400",
    badgeBg: "bg-cyan-500/10",
    borderColor: "border-cyan-500/30",
  },
  {
    id: "hr",
    name: "HR Specialist",
    domain: "Workforce Capacity",
    role: "Analyzes team workload distribution, overtime burnout flags, and sprint delivery rate.",
    query: "How is team workload and overtime impacting delivery velocity?",
    metric: "Workload & Burnout Velocity",
    icon: Users,
    color: "text-indigo-400",
    badgeBg: "bg-indigo-500/10",
    borderColor: "border-indigo-500/30",
  },
];

export const SystemOverviewSection: React.FC = () => {
  const [selectedAgentId, setSelectedAgentId] = useState<string>("sales");
  const selectedAgent = AGENTS.find((a) => a.id === selectedAgentId) || AGENTS[0];
  const ActiveIcon = selectedAgent.icon;

  return (
    <section
      id="system-overview"
      className="py-16 sm:py-24 border-t border-[#1A2234] bg-[#07090F] relative overflow-hidden w-full max-w-full"
    >
      {/* Subtle ambient radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[650px] h-[380px] bg-gradient-to-r from-indigo-500/10 via-cyan-500/10 to-transparent blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10 w-full max-w-full overflow-hidden">
        {/* Clean Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-[#0E1524] border border-[#1E2D44] text-[11px] sm:text-xs font-mono text-cyan-400 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span>Multi-Agent Architecture</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-tight">
            How SYNORA Coordinates Intelligence
          </h2>

          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-xl mx-auto">
            A central Manager Orchestrator coordinates five domain specialists in parallel to reconcile business anomalies into one strategic decision brief.
          </p>
        </div>

        {/* =========================================================================
            CENTRAL ORCHESTRATION DIAGRAM (Fully responsive)
            ========================================================================= */}
        <div className="bg-[#0C101A] border border-[#1E273A] rounded-2xl sm:rounded-3xl p-4 sm:p-7 shadow-2xl space-y-5 sm:space-y-6 relative overflow-hidden w-full max-w-full">
          {/* Top: Central Manager Node */}
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex items-center justify-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl sm:rounded-2xl bg-[#141C2E] border border-cyan-500/40 text-xs sm:text-sm font-bold text-white shadow-lg shadow-cyan-500/10 max-w-full">
              <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-lg bg-gradient-to-r from-indigo-500 to-cyan-500 flex items-center justify-center text-white shrink-0">
                <Bot className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
              </div>
              <span className="truncate">SYNORA Manager Orchestrator</span>
              <span className="text-[10px] font-mono text-cyan-300 font-normal border-l border-cyan-500/30 pl-2 hidden md:inline">
                Central Synthesis Node
              </span>
            </div>

            {/* Connecting visual cues */}
            <div className="py-2 text-slate-600 flex flex-col items-center">
              <div className="w-[1.5px] h-3 sm:h-4 bg-gradient-to-b from-cyan-500/50 to-slate-700" />
              <span className="text-[9px] sm:text-[10px] font-mono text-slate-400 uppercase tracking-wider pt-1">
                Parallel Autonomous Specialist Delegation
              </span>
            </div>
          </div>

          {/* 5 Specialist Node Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3">
            {AGENTS.map((agent, index) => {
              const isSelected = agent.id === selectedAgentId;
              const Icon = agent.icon;
              const isLastOnMobile = index === 4; // 5th item
              return (
                <button
                  key={agent.id}
                  onClick={() => setSelectedAgentId(agent.id)}
                  className={`p-3 rounded-xl sm:rounded-2xl border text-left transition-all flex flex-col justify-between gap-2 cursor-pointer relative group ${
                    isLastOnMobile ? "col-span-2 sm:col-span-1" : ""
                  } ${
                    isSelected
                      ? `bg-[#141D2E] text-white ${agent.borderColor} shadow-lg shadow-cyan-500/5 ring-1 ring-cyan-500/30`
                      : "bg-[#080B12] text-slate-400 border-[#182236] hover:bg-[#101624] hover:text-slate-200"
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <div
                      className={`w-6 h-6 sm:w-7 sm:h-7 rounded-lg flex items-center justify-center ${
                        isSelected ? agent.badgeBg : "bg-white/5"
                      }`}
                    >
                      <Icon
                        className={`w-3.5 h-3.5 ${
                          isSelected ? agent.color : "text-slate-400 group-hover:text-slate-200"
                        }`}
                      />
                    </div>
                    <span
                      className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${
                        isSelected ? "bg-cyan-400 animate-pulse" : "bg-slate-700"
                      }`}
                    />
                  </div>

                  <div>
                    <div className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors truncate">
                      {agent.name}
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono truncate">
                      {agent.domain}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Agent Detail & 1-Click Launch Card */}
          <div className="p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-[#080C14] border border-[#1C273C] flex flex-col md:flex-row items-start md:items-center justify-between gap-3.5 sm:gap-4 overflow-hidden">
            <div className="space-y-1.5 flex-1 min-w-0 w-full">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[11px] sm:text-xs font-mono text-cyan-400 font-semibold">
                  Selected Specialist:
                </span>
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <ActiveIcon className={`w-3.5 h-3.5 ${selectedAgent.color}`} />
                  {selectedAgent.name}
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed break-words">
                {selectedAgent.role}
              </p>
              <div className="text-[11px] font-mono text-slate-400 pt-0.5 break-words">
                <span className="text-slate-500">Sample Query: </span>
                <span className="text-cyan-300 italic">&ldquo;{selectedAgent.query}&rdquo;</span>
              </div>
            </div>

            <Link
              href={`/assistant?prompt=${encodeURIComponent(selectedAgent.query)}`}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#5B6BF6] to-[#00A3E0] hover:from-[#4F5FE8] hover:to-[#0092CC] text-white text-xs font-semibold shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all shrink-0 w-full md:w-auto justify-center"
            >
              <span>Test This Agent</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* 3 Quick Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 text-xs">
          <div className="p-4 rounded-xl sm:rounded-2xl bg-[#0A0E18] border border-[#1A2336] space-y-1">
            <div className="flex items-center gap-2 font-bold text-white">
              <Zap className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Zero Cross-Pollution</span>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Specialists execute in parallel isolated runtimes without domain data leakage.
            </p>
          </div>

          <div className="p-4 rounded-xl sm:rounded-2xl bg-[#0A0E18] border border-[#1A2336] space-y-1">
            <div className="flex items-center gap-2 font-bold text-white">
              <Sparkles className="w-4 h-4 text-indigo-400 shrink-0" />
              <span>Root Cause Synthesis</span>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Correlates cross-departmental symptoms (e.g. stockouts causing margin loss &amp; support tickets).
            </p>
          </div>

          <div className="p-4 rounded-xl sm:rounded-2xl bg-[#0A0E18] border border-[#1A2336] space-y-1">
            <div className="flex items-center gap-2 font-bold text-white">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Enterprise Ready</span>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Deterministic tool execution with zero data retention and SOC2 compliance.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
