import React from "react";
import { ShieldCheck, Cpu, Layers, Sparkles, Database, Lock, CheckCircle } from "lucide-react";

export const TrustStrip: React.FC = () => {
  const integrations = [
    { name: "Azure AI Foundry", tag: "Isolated Tenancy", icon: Cpu, color: "text-cyan-400" },
    { name: "OpenAI GPT-4o", tag: "Multi-Agent Engine", icon: Sparkles, color: "text-emerald-400" },
    { name: "Snowflake & Databricks", tag: "Data Warehouse Connectors", icon: Database, color: "text-indigo-400" },
    { name: "SOC2 Type II", tag: "Zero Retention", icon: ShieldCheck, color: "text-amber-400" },
    { name: "Enterprise E2E", tag: "Air-Gapped Ready", icon: Lock, color: "text-purple-400" },
  ];

  return (
    <div className="border-y border-white/[0.08] bg-[#070A12]/80 backdrop-blur-xl py-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400 tracking-wider uppercase shrink-0">
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
            <span>Enterprise-Grade Multi-Agent Infrastructure</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {integrations.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/[0.07] hover:border-white/[0.15] transition-colors"
                >
                  <Icon className={`w-3.5 h-3.5 ${item.color}`} />
                  <span className="text-xs font-semibold text-slate-200">{item.name}</span>
                  <span className="text-[10px] font-mono text-slate-500 hidden sm:inline">
                    · {item.tag}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
