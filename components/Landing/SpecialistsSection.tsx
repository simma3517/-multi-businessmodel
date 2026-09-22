"use client";

import React, { useState } from "react";
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

interface Specialist {
  id: string;
  name: string;
  role: string;
  description: string;
  focusAreas: string[];
  sampleQuery: string;
  icon: any;
  color: string;
}

const SPECIALISTS: Specialist[] = [
  {
    id: "sales",
    name: "Sales Specialist",
    role: "Pipeline Conversion & Revenue Velocity",
    description:
      "Analyzes deal movement across funnel stages, conversion attribution drop-offs, pricing discount elasticity, and regional revenue contractions.",
    focusAreas: [
      "Pipeline stage drop-off and velocity diagnostics",
      "Discount elasticity & revenue margin leakage",
      "Regional and channel conversion attribution",
      "Rep quota attainment and sales ramp velocity",
    ],
    sampleQuery: "Why are my sales falling despite high marketing spend?",
    icon: TrendingUp,
    color: "text-rose-400",
  },
  {
    id: "finance",
    name: "Finance Specialist",
    role: "Unit Economics & Profit Margins",
    description:
      "Audits operational expenses, COGS variance, gross margin compression, unexpected freight surcharges, and cash runway projections.",
    focusAreas: [
      "COGS variance & gross margin erosion audits",
      "Operating expense spikes & overhead creep",
      "Cash runway, burn multiple & working capital",
      "LTV/CAC ratio & unit economics validation",
    ],
    sampleQuery: "Why is net profit decreasing while revenue is growing?",
    icon: CircleDollarSign,
    color: "text-emerald-400",
  },
  {
    id: "inventory",
    name: "Inventory Specialist",
    role: "Stock Availability & Supply Velocity",
    description:
      "Monitors stockout risks, SKU movement velocity, supplier lead-time drift, safety stock thresholds, and capital tied in slow-moving inventory.",
    focusAreas: [
      "Stockout risk early warning on high-margin SKUs",
      "Slow-moving batch identification & capital drain",
      "Supplier lead-time drift and reorder tuning",
      "Inventory turnover velocity & safety stock buffers",
    ],
    sampleQuery: "Which high-margin products need immediate inventory attention?",
    icon: Package,
    color: "text-amber-400",
  },
  {
    id: "support",
    name: "Support Specialist",
    role: "Customer Sentiment & Retention",
    description:
      "Surfaces sentiment drift, recurring product defects, ticket escalation clusters, and VIP client friction before it leads to account churn.",
    focusAreas: [
      "CSAT sentiment drift and negative review trends",
      "Product defect and checkout error escalation",
      "Ticket backlog & resolution velocity bottlenecks",
      "VIP customer retention risk indicators",
    ],
    sampleQuery: "What are the primary support complaints driving customer churn?",
    icon: Headphones,
    color: "text-cyan-400",
  },
  {
    id: "hr",
    name: "HR Specialist",
    role: "Workforce Capacity & Team Velocity",
    description:
      "Analyzes workload distribution, overtime burnout indicators, departmental velocity, and headcount capacity planning.",
    focusAreas: [
      "Departmental capacity and workload distribution",
      "Sprint delivery velocity and completion rates",
      "Overtime burnout signals & attendance patterns",
      "Headcount expansion feasibility & payroll burn",
    ],
    sampleQuery: "How is employee attendance and team workload impacting delivery?",
    icon: Users,
    color: "text-indigo-400",
  },
];

export const SpecialistsSection: React.FC = () => {
  const [activeId, setActiveId] = useState<string>("sales");
  const activeSpecialist =
    SPECIALISTS.find((s) => s.id === activeId) || SPECIALISTS[0];
  const Icon = activeSpecialist.icon;

  return (
    <section id="specialists" className="py-20 border-t border-[#1A2234] bg-[#080A10]/60 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0E1524] border border-[#1E2D44] text-[11px] font-mono text-cyan-400">
            <Sparkles className="w-3 h-3" />
            <span>Autonomous Domain Specialists</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Five Autonomous Specialists. <br />
            <span className="bg-gradient-to-r from-[#A5B4FC] via-[#38BDF8] to-[#6EE7B7] bg-clip-text text-transparent">
              Coordinated in Parallel.
            </span>
          </h2>

          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-xl mx-auto">
            Instead of general guesswork, each specialized agent analyzes isolated domain telemetry before the Manager Orchestrator synthesizes the unified strategy.
          </p>
        </div>

        {/* 2-Column Clean Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* Left: 5 Agent Selection Tabs */}
          <div className="md:col-span-5 space-y-2">
            {SPECIALISTS.map((spec) => {
              const isActive = spec.id === activeId;
              const SpecIcon = spec.icon;
              return (
                <button
                  key={spec.id}
                  onClick={() => setActiveId(spec.id)}
                  className={`w-full text-left p-3.5 rounded-xl transition-all flex items-center justify-between ${
                    isActive
                      ? "bg-[#141A29] text-white border border-[#27354F] shadow-md"
                      : "bg-[#0C101A] text-slate-400 hover:bg-[#111726] hover:text-slate-200 border border-[#1A2234]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        isActive
                          ? "bg-white/10 text-white"
                          : "bg-white/5 text-slate-400"
                      }`}
                    >
                      <SpecIcon className={`w-4 h-4 ${isActive ? spec.color : ""}`} />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">
                        {spec.name}
                      </div>
                      <div className="text-[11px] text-slate-400 line-clamp-1">
                        {spec.role}
                      </div>
                    </div>
                  </div>

                  <ArrowRight
                    className={`w-3.5 h-3.5 transition-opacity ${
                      isActive ? "text-cyan-400 opacity-100" : "opacity-0"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right: Active Specialist Detailed Card */}
          <div className="md:col-span-7">
            <div className="p-6 rounded-2xl bg-[#0C101A] border border-[#1E273A] space-y-5 shadow-xl">
              <div className="flex items-center justify-between pb-3.5 border-b border-[#1A2234]">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#141B2B] border border-[#25334D] flex items-center justify-center text-white shadow-sm">
                    <Icon className={`w-4 h-4 ${activeSpecialist.color}`} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">
                      {activeSpecialist.name}
                    </h3>
                    <span className="text-[10px] font-mono text-cyan-400">
                      Autonomous Domain Node
                    </span>
                  </div>
                </div>

                <Link
                  href={`/assistant?prompt=${encodeURIComponent(activeSpecialist.sampleQuery)}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#5B6BF6] to-[#00A3E0] hover:from-[#4F5FE8] hover:to-[#0092CC] text-white text-xs font-semibold shadow-sm transition-all"
                >
                  <span>Ask Agent</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              <div className="space-y-1">
                <h4 className="text-xs font-semibold text-slate-200">
                  {activeSpecialist.role}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {activeSpecialist.description}
                </p>
              </div>

              {/* Core Capabilities */}
              <div className="space-y-2 pt-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block">
                  Domain Analysis Capabilities:
                </span>
                <div className="space-y-1.5">
                  {activeSpecialist.focusAreas.map((area, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2 text-xs text-slate-300"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{area}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sample Query Link */}
              <div className="pt-3 border-t border-[#1A2234] flex items-center justify-between text-xs">
                <span className="text-[11px] text-slate-500 font-mono">Sample Query:</span>
                <Link
                  href={`/assistant?prompt=${encodeURIComponent(activeSpecialist.sampleQuery)}`}
                  className="text-cyan-400 hover:text-cyan-300 font-medium text-xs truncate max-w-[280px]"
                >
                  &ldquo;{activeSpecialist.sampleQuery}&rdquo;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
