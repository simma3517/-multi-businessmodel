"use client";

import React from "react";
import Link from "next/link";
import {
  X,
  TrendingUp,
  CircleDollarSign,
  Package,
  Headphones,
  Users,
  CheckCircle2,
  ArrowRight,
  Cpu,
  Workflow,
  Network,
  Layers,
  Sparkles,
} from "lucide-react";

interface InfoModalProps {
  activeTab: string | null;
  onClose: () => void;
}

export const InfoModal: React.FC<InfoModalProps> = ({ activeTab, onClose }) => {
  if (!activeTab) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-4xl max-h-[85vh] overflow-y-auto bg-[#0C101A] border border-[#222E47] rounded-2xl shadow-2xl p-6 sm:p-8 text-slate-200 custom-scrollbar">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* 5 Specialists Tab */}
        {activeTab === "specialists" && (
          <div className="space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-mono uppercase tracking-wider text-cyan-400">
                Autonomous Specialists
              </span>
              <h2 className="text-2xl font-bold text-white">
                5 Domain-Specific Intelligence Nodes
              </h2>
              <p className="text-xs text-slate-400">
                Parallel specialist agents analyzing isolated business telemetry before Manager synthesis.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-[#111726] border border-[#1E273A] space-y-2">
                <div className="flex items-center gap-2 text-white font-bold text-sm">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                  <span>Sales Specialist</span>
                </div>
                <p className="text-xs text-slate-300">
                  Monitors pipeline velocity, discount elasticity, stage drop-offs, and rep attainment patterns.
                </p>
                <div className="text-[11px] text-cyan-400 font-mono">
                  Sample: &ldquo;Why are sales falling despite high marketing spend?&rdquo;
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#111726] border border-[#1E273A] space-y-2">
                <div className="flex items-center gap-2 text-white font-bold text-sm">
                  <CircleDollarSign className="w-4 h-4 text-emerald-400" />
                  <span>Finance Specialist</span>
                </div>
                <p className="text-xs text-slate-300">
                  Audits COGS variance, operating expense spikes, runway burn, and gross margin compression.
                </p>
                <div className="text-[11px] text-cyan-400 font-mono">
                  Sample: &ldquo;Why is net profit decreasing while revenue grows?&rdquo;
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#111726] border border-[#1E273A] space-y-2">
                <div className="flex items-center gap-2 text-white font-bold text-sm">
                  <Package className="w-4 h-4 text-amber-400" />
                  <span>Inventory Specialist</span>
                </div>
                <p className="text-xs text-slate-300">
                  Tracks high-margin stockout risks, safety thresholds, supplier lead-time drift, and slow batches.
                </p>
                <div className="text-[11px] text-cyan-400 font-mono">
                  Sample: &ldquo;Which high-margin SKUs need immediate restocking?&rdquo;
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#111726] border border-[#1E273A] space-y-2">
                <div className="flex items-center gap-2 text-white font-bold text-sm">
                  <Headphones className="w-4 h-4 text-indigo-400" />
                  <span>Support Specialist</span>
                </div>
                <p className="text-xs text-slate-300">
                  Surfaces CSAT sentiment drift, checkout ticket clusters, defect escalation, and VIP churn triggers.
                </p>
                <div className="text-[11px] text-cyan-400 font-mono">
                  Sample: &ldquo;What support friction points are causing churn?&rdquo;
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#111726] border border-[#1E273A] space-y-2 md:col-span-2">
                <div className="flex items-center gap-2 text-white font-bold text-sm">
                  <Users className="w-4 h-4 text-rose-400" />
                  <span>HR Specialist</span>
                </div>
                <p className="text-xs text-slate-300">
                  Evaluates team capacity, overtime burnout flags, delivery sprint velocity, and headcount planning.
                </p>
                <div className="text-[11px] text-cyan-400 font-mono">
                  Sample: &ldquo;How is overtime and team workload impacting delivery velocity?&rdquo;
                </div>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <Link
                href="/assistant"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-white text-xs font-semibold hover:opacity-90 transition-opacity"
              >
                <span>Launch Assistant Workspace</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}

        {/* Architecture & Orchestration Tab */}
        {(activeTab === "architecture" || activeTab === "orchestration") && (
          <div className="space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-mono uppercase tracking-wider text-cyan-400">
                Multi-Agent Architecture
              </span>
              <h2 className="text-2xl font-bold text-white">
                Deterministic Orchestration Mesh
              </h2>
              <p className="text-xs text-slate-400">
                Hierarchical synthesis routing queries through domain-isolated specialists into a unified strategic plan.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-[#111726] border border-[#1E273A] space-y-2">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                  <Cpu className="w-4 h-4" />
                </div>
                <h3 className="text-xs font-bold text-white">1. Query Classification</h3>
                <p className="text-xs text-slate-400">
                  The Manager Agent analyzes intent, extracts key entity constraints, and activates the required domain specialists.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#111726] border border-[#1E273A] space-y-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                  <Network className="w-4 h-4" />
                </div>
                <h3 className="text-xs font-bold text-white">2. Parallel Execution</h3>
                <p className="text-xs text-slate-400">
                  Specialists simultaneously query their respective telemetry stores without cross-domain pollution.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#111726] border border-[#1E273A] space-y-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <Layers className="w-4 h-4" />
                </div>
                <h3 className="text-xs font-bold text-white">3. Synthesis &amp; Action Plan</h3>
                <p className="text-xs text-slate-400">
                  The Orchestrator reconciles anomalies, computes root causes, and outputs structured action recommendations.
                </p>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <Link
                href="/assistant"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-white text-xs font-semibold hover:opacity-90 transition-opacity"
              >
                <span>Open Workspace</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}

        {/* Workflow Tab */}
        {activeTab === "workflow" && (
          <div className="space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-mono uppercase tracking-wider text-cyan-400">
                End-to-End Workflow
              </span>
              <h2 className="text-2xl font-bold text-white">
                From Raw Telemetry to Executive Strategy
              </h2>
              <p className="text-xs text-slate-400">
                Zero manual SQL querying or disconnected sheet stitching required.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#111726] border border-[#1E273A]">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white">Step 1: Ask Natural Language Question</h4>
                  <p className="text-xs text-slate-400">
                    Input complex cross-departmental queries (e.g. margin leakages, inventory bottlenecks, or customer churn).
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#111726] border border-[#1E273A]">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white">Step 2: Live Reasoning Visualization</h4>
                  <p className="text-xs text-slate-400">
                    Watch real-time status pulses as Sales, Finance, Inventory, Support, and HR specialists execute in parallel.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#111726] border border-[#1E273A]">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white">Step 3: Executive Summary &amp; Direct Specialist Drilldowns</h4>
                  <p className="text-xs text-slate-400">
                    Receive clear executive summaries with actionable bullets and the ability to drill down into any single agent.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <Link
                href="/assistant"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-white text-xs font-semibold hover:opacity-90 transition-opacity"
              >
                <span>Try Workspace Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}

        {/* Scenarios Tab */}
        {activeTab === "scenarios" && (
          <div className="space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-mono uppercase tracking-wider text-cyan-400">
                Enterprise Use Cases
              </span>
              <h2 className="text-2xl font-bold text-white">
                Real-World Cross-Functional Scenarios
              </h2>
              <p className="text-xs text-slate-400">
                Pre-configured multi-agent diagnostic scenarios ready to run.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <Link
                href="/assistant?prompt=Why%20are%20my%20sales%20falling%20despite%20high%20marketing%20spend%3F"
                className="p-4 rounded-xl bg-[#111726] border border-[#1E273A] hover:border-cyan-500/50 transition-all space-y-2 group"
              >
                <div className="flex items-center justify-between text-white font-bold text-xs">
                  <span>Revenue &amp; CAC Friction</span>
                  <ArrowRight className="w-3.5 h-3.5 text-cyan-400 group-hover:translate-x-1 transition-transform" />
                </div>
                <p className="text-xs text-slate-400">
                  Cross-analyzes marketing acquisition ad spend, sales funnel conversion drop-offs, and pricing elasticity.
                </p>
              </Link>

              <Link
                href="/assistant?prompt=Why%20is%20net%20profit%20decreasing%20while%20revenue%20is%20growing%3F"
                className="p-4 rounded-xl bg-[#111726] border border-[#1E273A] hover:border-cyan-500/50 transition-all space-y-2 group"
              >
                <div className="flex items-center justify-between text-white font-bold text-xs">
                  <span>Gross Margin Compression</span>
                  <ArrowRight className="w-3.5 h-3.5 text-cyan-400 group-hover:translate-x-1 transition-transform" />
                </div>
                <p className="text-xs text-slate-400">
                  Audits COGS inflation, unexpected shipping/freight fees, overhead spikes, and discount leakage.
                </p>
              </Link>

              <Link
                href="/assistant?prompt=Which%20high-margin%20products%20need%20immediate%20inventory%20attention%3F"
                className="p-4 rounded-xl bg-[#111726] border border-[#1E273A] hover:border-cyan-500/50 transition-all space-y-2 group"
              >
                <div className="flex items-center justify-between text-white font-bold text-xs">
                  <span>Supply Chain &amp; Stockout Risk</span>
                  <ArrowRight className="w-3.5 h-3.5 text-cyan-400 group-hover:translate-x-1 transition-transform" />
                </div>
                <p className="text-xs text-slate-400">
                  Identifies highest gross-margin SKUs nearing stockout threshold alongside supplier lead-time drift.
                </p>
              </Link>

              <Link
                href="/assistant?prompt=What%20are%20the%20primary%20support%20complaints%20driving%20customer%20churn%3F"
                className="p-4 rounded-xl bg-[#111726] border border-[#1E273A] hover:border-cyan-500/50 transition-all space-y-2 group"
              >
                <div className="flex items-center justify-between text-white font-bold text-xs">
                  <span>Sentiment &amp; Churn Attribution</span>
                  <ArrowRight className="w-3.5 h-3.5 text-cyan-400 group-hover:translate-x-1 transition-transform" />
                </div>
                <p className="text-xs text-slate-400">
                  Correlates customer support ticket clusters and checkout bugs directly with client account churn.
                </p>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
