"use client";

import React from "react";
import Link from "next/link";
import {
  Bot,
  ArrowDown,
  Sparkles,
  XCircle,
  CheckCircle2,
  Layers,
  ArrowRight,
  TrendingUp,
  CircleDollarSign,
  Package,
} from "lucide-react";

export const DifferentiatorSection: React.FC = () => {
  return (
    <section id="architecture" className="py-20 md:py-28 border-t border-[#1A2234] bg-[#080A10]/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Core Value Proposition */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0E1524] border border-[#1E2D44] text-xs font-mono text-cyan-400">
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              <span>Multi-Agent Architecture</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Not Another Chatbot. <br />
              <span className="bg-gradient-to-r from-[#A5B4FC] via-[#38BDF8] to-[#6EE7B7] bg-clip-text text-transparent">
                An Orchestration Mesh.
              </span>
            </h2>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Generic single-prompt LLMs guess across disconnected domains. SYNORA routes complex problems through domain-isolated specialists and synthesizes a verified strategic plan.
            </p>

            {/* Comparison Cards */}
            <div className="space-y-3 pt-2">
              <div className="p-4 rounded-xl bg-[#0F131D] border border-rose-500/20 text-xs space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-rose-400">
                  <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>Generic Single-Prompt LLMs</span>
                </div>
                <p className="text-slate-400 pl-6 leading-relaxed text-[11px]">
                  One prompt hallucinating financial formulas, inventory reorder cycles, and sales pipelines simultaneously with zero telemetry isolation.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0F1424] border border-cyan-500/30 text-xs space-y-1.5 shadow-lg">
                <div className="flex items-center gap-2 font-bold text-cyan-300">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>SYNORA Autonomous Agent Mesh</span>
                </div>
                <p className="text-slate-300 pl-6 leading-relaxed text-[11px]">
                  Five autonomous micro-agents with dedicated analytical tools, coordinated and synthesized into unified executive briefs.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/assistant"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#5B6BF6] to-[#00A3E0] hover:from-[#4F5FE8] hover:to-[#0092CC] text-white text-xs font-semibold shadow-md transition-all"
              >
                <span>Launch SYNORA Workspace</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Right Column: Live Orchestration Flow Diagram */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-[#0C101A] border border-[#1E273A] shadow-2xl space-y-4">
              {/* Step 1: User Complex Prompt */}
              <div className="p-4 rounded-xl bg-[#080A10] border border-[#1A2234] shadow-inner">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                    Incoming Business Inquiry
                  </span>
                  <span className="text-[10px] font-mono text-cyan-400">User Query</span>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-white">
                  &ldquo;Sales are down 12% in APAC, gross margin dropped to 28%, and shipping delays are rising.&rdquo;
                </p>
              </div>

              {/* Flow Down Indicator */}
              <div className="flex justify-center">
                <div className="w-6 h-6 rounded-full bg-[#141B2B] border border-[#25334D] flex items-center justify-center text-cyan-400">
                  <ArrowDown className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Step 2: Manager Orchestration Decision */}
              <div className="p-4 rounded-xl bg-[#121829] border border-cyan-500/30 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-sm">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">
                      SYNORA Manager Orchestrator
                    </span>
                    <span className="text-[11px] text-cyan-300">
                      Delegates to 3 Parallel Specialists: Sales, Finance, Inventory
                    </span>
                  </div>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                  A2A Mesh Routing
                </span>
              </div>

              {/* Flow Down Indicator */}
              <div className="flex justify-center">
                <div className="w-6 h-6 rounded-full bg-[#141B2B] border border-[#25334D] flex items-center justify-center text-cyan-400">
                  <ArrowDown className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Step 3: Targeted Agents Consulted */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl bg-[#080A10] border border-rose-500/30 text-center space-y-1">
                  <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-rose-400">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>Sales Specialist</span>
                  </div>
                  <span className="text-[10px] text-slate-400 block">
                    APAC conversion dropped 14% at final stage
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#080A10] border border-emerald-500/30 text-center space-y-1">
                  <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-emerald-400">
                    <CircleDollarSign className="w-3.5 h-3.5" />
                    <span>Finance Specialist</span>
                  </div>
                  <span className="text-[10px] text-slate-400 block">
                    COGS surged 24% due to emergency air freight
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#080A10] border border-amber-500/30 text-center space-y-1">
                  <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-amber-400">
                    <Package className="w-3.5 h-3.5" />
                    <span>Inventory Specialist</span>
                  </div>
                  <span className="text-[10px] text-slate-400 block">
                    SKU-901 stockout caused unfulfilled orders
                  </span>
                </div>
              </div>

              {/* Flow Down Indicator */}
              <div className="flex justify-center">
                <div className="w-6 h-6 rounded-full bg-[#141B2B] border border-[#25334D] flex items-center justify-center text-cyan-400">
                  <ArrowDown className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Step 4: Synthesized Output */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-[#121829] to-[#0A131A] border border-cyan-500/40 text-xs text-slate-200 shadow-xl space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-cyan-300 font-bold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Synthesized Strategic Action Plan</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">Executive Brief</span>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  &ldquo;APAC sales decline (-12%) is directly caused by a stockout of SKU-901. Emergency air shipping inflated COGS by 24%, compressing gross margin to 28%. Expediting sea-freight batch #88 will recover $38,000 in lost weekly margin.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
