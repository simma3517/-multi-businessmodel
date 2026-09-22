import React from "react";
import {
  TrendingDown,
  CircleDollarSign,
  PackageSearch,
  Brain,
  Activity,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
} from "lucide-react";
import { RECOMMENDED_PROMPTS, SHORT_QUERY_PILLS } from "@/lib/utils";

interface WelcomeScreenProps {
  onSelectPrompt: (prompt: string) => void;
  isLoading: boolean;
}

const ICON_CONFIG: Record<
  string,
  { icon: React.ReactNode; bg: string; border: string; glow: string }
> = {
  TrendingDown: {
    icon: <TrendingDown className="w-4 h-4 text-rose-400" />,
    bg: "bg-rose-950/30",
    border: "border-rose-900/40",
    glow: "group-hover:border-rose-500/40 group-hover:shadow-rose-500/10",
  },
  CircleDollarSign: {
    icon: <CircleDollarSign className="w-4 h-4 text-emerald-400" />,
    bg: "bg-emerald-950/30",
    border: "border-emerald-900/40",
    glow: "group-hover:border-emerald-500/40 group-hover:shadow-emerald-500/10",
  },
  PackageSearch: {
    icon: <PackageSearch className="w-4 h-4 text-cyan-400" />,
    bg: "bg-cyan-950/30",
    border: "border-cyan-900/40",
    glow: "group-hover:border-cyan-500/40 group-hover:shadow-cyan-500/10",
  },
  Brain: {
    icon: <Brain className="w-4 h-4 text-violet-400" />,
    bg: "bg-violet-950/30",
    border: "border-violet-900/40",
    glow: "group-hover:border-violet-500/40 group-hover:shadow-violet-500/10",
  },
  Activity: {
    icon: <Activity className="w-4 h-4 text-teal-300" />,
    bg: "bg-teal-950/40",
    border: "border-teal-800/50",
    glow: "group-hover:border-teal-400/50 group-hover:shadow-teal-500/20",
  },
};

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onSelectPrompt,
  isLoading,
}) => {
  const top4Prompts = RECOMMENDED_PROMPTS.slice(0, 4);
  const featuredHealthCheck = RECOMMENDED_PROMPTS[4]; // 5th prompt

  return (
    <div className="flex-1 flex flex-col justify-center items-center px-4 sm:px-6 py-6 md:py-10 max-w-3xl mx-auto w-full animate-fade-in">
      {/* Brand & Executive Header */}
      <div className="text-center mb-8 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-dark-card/90 border border-dark-border text-bizflow-300 text-xs font-medium shadow-sm backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-bizflow-400" />
          <span className="text-slate-300 font-normal">Connected to</span>
          <span className="font-semibold text-bizflow-300">Azure AI Foundry</span>
          <span className="w-1 h-1 rounded-full bg-slate-600" />
          <span className="text-slate-400 text-[11px]">Multi-Agent A2A</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
          BIZFLOW{" "}
          <span className="bg-gradient-to-r from-bizflow-300 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
            AI
          </span>
        </h1>

        <p className="text-sm md:text-base text-slate-400 font-normal max-w-lg mx-auto">
          Executive multi-agent intelligence analyzing Sales, Finance, Inventory, Support & HR.
        </p>
      </div>

      {/* 5 Curated Business Questions */}
      <div className="w-full space-y-3">
        {/* Top 4 Questions in 2x2 Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
          {top4Prompts.map((prompt) => {
            const config = ICON_CONFIG[prompt.icon] || ICON_CONFIG.TrendingDown;
            return (
              <button
                key={prompt.id}
                onClick={() => !isLoading && onSelectPrompt(prompt.text)}
                disabled={isLoading}
                className={`group relative flex flex-col justify-between p-4 rounded-xl bg-dark-card/80 hover:bg-dark-cardHover border border-dark-border/80 ${config.glow} text-left transition-all duration-200 shadow-lg shadow-black/20 disabled:opacity-50 hover:-translate-y-0.5`}
              >
                <div className="flex items-start justify-between w-full mb-3">
                  <div className={`p-2.5 rounded-lg ${config.bg} border ${config.border} shrink-0`}>
                    {config.icon}
                  </div>
                  <span className="text-[10px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded-md bg-dark-bg/90 border border-dark-border/90 text-slate-400 group-hover:text-slate-200 transition-colors">
                    {prompt.badge}
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-[13px] font-semibold text-slate-100 group-hover:text-white transition-colors">
                      {prompt.text}
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-bizflow-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 ml-1.5" />
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-1">
                    {prompt.subtitle}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* 5th Highlighted Feature Question: Full Health Check */}
        {featuredHealthCheck && (
          <button
            onClick={() => !isLoading && onSelectPrompt(featuredHealthCheck.text)}
            disabled={isLoading}
            className="group relative w-full flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-dark-card via-dark-card to-bizflow-950/40 hover:to-bizflow-950/70 border border-dark-border/90 hover:border-bizflow-500/50 text-left transition-all duration-200 shadow-xl shadow-black/30 disabled:opacity-50 hover:-translate-y-0.5"
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="p-2.5 rounded-lg bg-teal-950/60 border border-teal-800/60 text-teal-300 shrink-0 group-hover:scale-105 transition-transform">
                <Activity className="w-4 h-4 text-teal-300" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs sm:text-[13px] font-bold text-white group-hover:text-bizflow-200 transition-colors">
                    {featuredHealthCheck.text}
                  </span>
                  <span className="hidden sm:inline text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-bizflow-500/15 border border-bizflow-500/30 text-bizflow-300">
                    {featuredHealthCheck.badge}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 truncate mt-0.5">
                  {featuredHealthCheck.subtitle}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0 pl-3">
              <span className="text-xs font-medium text-bizflow-400 hidden md:inline">Run 360° Audit</span>
              <ArrowUpRight className="w-4 h-4 text-bizflow-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </div>
          </button>
        )}
      </div>

      {/* Quick Pills */}
      <div className="w-full flex items-center justify-center gap-1.5 flex-wrap pt-4">
        <span className="text-[11px] text-slate-500 mr-1">Short queries:</span>
        {SHORT_QUERY_PILLS.map((pill) => (
          <button
            key={pill.label}
            onClick={() => !isLoading && onSelectPrompt(pill.query)}
            disabled={isLoading}
            className="text-[11px] font-medium text-slate-300 hover:text-white bg-dark-card/60 hover:bg-dark-card border border-dark-border/80 hover:border-bizflow-500/40 px-2.5 py-1 rounded-lg transition-all disabled:opacity-50"
          >
            {pill.label}
          </button>
        ))}
      </div>
    </div>
  );
};
