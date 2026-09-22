import React from "react";
import { Sparkles, Bot } from "lucide-react";

export const AnalyzingIndicator: React.FC = () => {
  return (
    <div className="flex items-start gap-3.5 py-4 max-w-3xl mx-auto w-full px-4 md:px-6 animate-fade-in">
      {/* BizFlow AI Avatar */}
      <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-bizflow-600 via-teal-500 to-cyan-400 flex items-center justify-center text-slate-950 shadow-md shadow-bizflow-500/25 shrink-0">
        <Sparkles className="w-4 h-4 text-slate-950 stroke-[2.5] animate-spin-slow" />
      </div>

      <div className="flex-1 space-y-2">
        <div className="p-3.5 rounded-xl bg-dark-card/90 border border-dark-border/80 shadow-md max-w-md space-y-2">
          <div className="flex items-center gap-2.5">
            <div className="flex space-x-1.5 items-center">
              <span className="w-2 h-2 rounded-full bg-bizflow-400 animate-bounce [animation-delay:-0.3s]"></span>
              <span className="w-2 h-2 rounded-full bg-bizflow-400 animate-bounce [animation-delay:-0.15s]"></span>
              <span className="w-2 h-2 rounded-full bg-bizflow-400 animate-bounce"></span>
            </div>
            <span className="text-xs sm:text-sm font-semibold text-white">
              Analyzing your business...
            </span>
          </div>

          {/* Subtle Agent Indicators */}
          <div className="flex items-center gap-1.5 text-[10px] text-slate-400 pt-1 border-t border-white/[0.04]">
            <span className="text-slate-500">Orchestrating:</span>
            <span className="px-1.5 py-0.5 rounded bg-dark-bg text-rose-300 font-mono">Sales</span>
            <span className="px-1.5 py-0.5 rounded bg-dark-bg text-emerald-300 font-mono">Finance</span>
            <span className="px-1.5 py-0.5 rounded bg-dark-bg text-amber-300 font-mono">Stock</span>
            <span className="px-1.5 py-0.5 rounded bg-dark-bg text-sky-300 font-mono">Support</span>
            <span className="px-1.5 py-0.5 rounded bg-dark-bg text-indigo-300 font-mono">HR</span>
          </div>
        </div>
      </div>
    </div>
  );
};
