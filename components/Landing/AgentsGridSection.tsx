"use client";

import React from "react";
import Link from "next/link";
import {
  TrendingUp,
  CircleDollarSign,
  Package,
  Headphones,
  Users,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from "lucide-react";

interface AgentInfo {
  id: string;
  name: string;
  role: string;
  tag: string;
  description: string;
  capabilities: string[];
  sampleQuery: string;
  icon: any;
  color: string;
  badgeBg: string;
  borderColor: string;
}

const AGENTS: AgentInfo[] = [
  {
    id: "sales",
    name: "Sales Specialist",
    role: "Pipeline Conversion & Revenue",
    tag: "Revenue Engine",
    description: "Analyzes funnel conversion drop-offs, pricing discount elasticity, and rep quota velocity.",
    capabilities: [
      "Pipeline stage drop-off audit",
      "Discount elasticity & leakages",
      "Regional conversion diagnostics",
    ],
    sampleQuery: "Why are my sales falling despite high marketing spend?",
    icon: TrendingUp,
    color: "text-rose-400",
    badgeBg: "bg-rose-500/10 text-rose-300 border-rose-500/20",
    borderColor: "hover:border-rose-500/40",
  },
  {
    id: "finance",
    name: "Finance Specialist",
    role: "Unit Economics & Profit Margins",
    tag: "Financial Audit",
    description: "Audits COGS variance, operating expenses, gross margin compression, and cash runway.",
    capabilities: [
      "COGS variance & gross margin audits",
      "OpEx overhead spike detection",
      "Cash runway & working capital",
    ],
    sampleQuery: "Why is net profit decreasing while revenue is growing?",
    icon: CircleDollarSign,
    color: "text-emerald-400",
    badgeBg: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
    borderColor: "hover:border-emerald-500/40",
  },
  {
    id: "inventory",
    name: "Inventory Specialist",
    role: "Stock Availability & Supply Velocity",
    tag: "Supply Chain",
    description: "Monitors stockout risks on top SKUs, supplier lead times, and slow-moving batch drains.",
    capabilities: [
      "High-margin SKU stockout alerts",
      "Slow-moving inventory audits",
      "Supplier lead-time drift tuning",
    ],
    sampleQuery: "Which high-margin products need immediate inventory attention?",
    icon: Package,
    color: "text-amber-400",
    badgeBg: "bg-amber-500/10 text-amber-300 border-amber-500/20",
    borderColor: "hover:border-amber-500/40",
  },
  {
    id: "support",
    name: "Support Specialist",
    role: "Customer Sentiment & Retention",
    tag: "Customer Care",
    description: "Surfaces sentiment drift, checkout ticket clusters, and product defect escalations.",
    capabilities: [
      "CSAT sentiment drift analysis",
      "Product defect ticket clusters",
      "VIP client churn risk signals",
    ],
    sampleQuery: "What are the primary support complaints driving customer churn?",
    icon: Headphones,
    color: "text-cyan-400",
    badgeBg: "bg-cyan-500/10 text-cyan-300 border-cyan-500/20",
    borderColor: "hover:border-cyan-500/40",
  },
  {
    id: "hr",
    name: "HR Specialist",
    role: "Workforce Capacity & Team Velocity",
    tag: "Human Capital",
    description: "Evaluates workload distribution, overtime burnout indicators, and sprint delivery velocity.",
    capabilities: [
      "Department workload balance",
      "Sprint delivery completion rates",
      "Overtime burnout signal alerts",
    ],
    sampleQuery: "How is employee attendance and team workload impacting delivery?",
    icon: Users,
    color: "text-indigo-400",
    badgeBg: "bg-indigo-500/10 text-indigo-300 border-indigo-500/20",
    borderColor: "hover:border-indigo-500/40",
  },
];

export const AgentsGridSection: React.FC = () => {
  return (
    <section id="specialists" className="py-20 md:py-24 border-t border-[#1A2234] bg-[#080A10]/70 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0E1524] border border-[#1E2D44] text-[11px] font-mono text-cyan-400 shadow-sm">
            <Sparkles className="w-3 h-3" />
            <span>5 Autonomous Specialists</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Meet Your Autonomous AI Specialists
          </h2>

          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-xl mx-auto">
            Five domain-isolated intelligence nodes operating in parallel, unified by the SYNORA Manager Orchestrator.
          </p>
        </div>

        {/* 5 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {AGENTS.map((agent) => {
            const Icon = agent.icon;
            return (
              <div
                key={agent.id}
                className={`p-6 rounded-2xl bg-[#0C101A] border border-[#1E273A] ${agent.borderColor} flex flex-col justify-between space-y-5 shadow-lg transition-all duration-200 group hover:bg-[#0E1320]`}
              >
                <div className="space-y-4">
                  {/* Top Header */}
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded-xl bg-[#141B2B] border border-[#25334D] flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                      <Icon className={`w-4 h-4 ${agent.color}`} />
                    </div>
                    <span className={`text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-md border ${agent.badgeBg}`}>
                      {agent.tag}
                    </span>
                  </div>

                  {/* Name & Role */}
                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {agent.name}
                    </h3>
                    <span className="text-xs text-slate-400 font-medium block mt-0.5">
                      {agent.role}
                    </span>
                    <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                      {agent.description}
                    </p>
                  </div>

                  {/* Capabilities */}
                  <div className="pt-3 border-t border-[#1A2234] space-y-1.5">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block">
                      Core Diagnostics
                    </span>
                    {agent.capabilities.map((cap, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span>{cap}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Action Link */}
                <div className="pt-3 border-t border-[#1A2234]">
                  <Link
                    href={`/assistant?prompt=${encodeURIComponent(agent.sampleQuery)}`}
                    className="w-full inline-flex items-center justify-between py-2 px-3 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-200 hover:text-white border border-[#25334D] transition-colors group/btn"
                  >
                    <span>Ask Specialist</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover/btn:text-cyan-400 group-hover/btn:translate-x-1 transition-all" />
                  </Link>
                </div>
              </div>
            );
          })}

          {/* 6th Card: Manager Orchestrator Summary */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-[#10172B] to-[#0A0E18] border border-cyan-500/30 flex flex-col justify-between space-y-5 shadow-xl md:col-span-2 lg:col-span-1">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-sm">
                  <Sparkles className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-md bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                  Manager Mesh
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold text-white">
                  Manager Orchestrator
                </h3>
                <span className="text-xs text-cyan-400 font-medium block mt-0.5">
                  Multi-Agent Synthesis Engine
                </span>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  Autonomously delegates your business questions to the right specialists, cross-correlates findings, and synthesizes unified action strategies.
                </p>
              </div>

              <div className="pt-3 border-t border-cyan-500/20 space-y-1.5 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Parallel A2A Agent Communication</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  <span>Zero Manual SQL or Disconnected Sheets</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-cyan-500/20">
              <Link
                href="/assistant"
                className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-gradient-to-r from-[#5B6BF6] to-[#00A3E0] hover:from-[#4F5FE8] hover:to-[#0092CC] text-xs font-semibold text-white shadow-md transition-all"
              >
                <span>Launch Assistant Workspace</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
