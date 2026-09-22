"use client";

import React, { useState } from "react";
import { Sparkles, ArrowRight, Check, Building2, Package, Target, Bot } from "lucide-react";
import { RECOMMENDED_PROMPTS } from "@/lib/utils";

interface OnboardingScreenProps {
  onCompleteOnboarding: (businessContext: {
    businessType: string;
    products: string;
    focus: string;
  }, initialPrompt?: string) => void;
  onSkip: () => void;
}

const BUSINESS_TYPE_OPTIONS = [
  "E-Commerce & Retail",
  "B2B SaaS / Software",
  "Electronics & Hardware",
  "Manufacturing & Supply",
  "Healthcare & Pharma",
  "Consulting & Agency",
];

const FOCUS_OPTIONS = [
  "Diagnosing falling sales",
  "Improving profit margins",
  "Resolving inventory stockouts",
  "Comprehensive business health check",
];

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({
  onCompleteOnboarding,
  onSkip,
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [businessType, setBusinessType] = useState("");
  const [products, setProducts] = useState("");
  const [focus, setFocus] = useState("");
  const [customTypeInput, setCustomTypeInput] = useState("");

  const handleStep1Submit = (type: string) => {
    setBusinessType(type);
    setStep(2);
  };

  const handleStep2Submit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!products.trim()) return;
    setStep(3);
  };

  const handleStep3Submit = (selectedFocus: string) => {
    setFocus(selectedFocus);
    setStep(4);
  };

  const handleFinalLaunch = (prompt?: string) => {
    onCompleteOnboarding(
      {
        businessType: businessType || "General Business",
        products: products || "Products and services",
        focus: focus || "Overall performance",
      },
      prompt
    );
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-8 max-w-2xl mx-auto w-full animate-fade-in">
      {/* Header */}
      <div className="text-center mb-8 space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-bizflow-950/80 border border-bizflow-800/80 text-bizflow-300 text-xs font-semibold shadow-sm">
          <Bot className="w-3.5 h-3.5 text-bizflow-400" />
          <span>ManagerOrchestrator Setup</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Let&apos;s understand your business.
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
          Before I analyze your business, tell me a little about what you do so the specialized agents can deliver tailored insights.
        </p>
      </div>

      {/* Step Container Card */}
      <div className="w-full p-6 sm:p-8 rounded-2xl bg-dark-card/90 border border-dark-border shadow-2xl space-y-6">
        {/* Step Indicator */}
        <div className="flex items-center justify-between text-xs text-slate-400 border-b border-dark-border/60 pb-3">
          <span className="font-semibold text-slate-300">
            Step {step} of 4:{" "}
            {step === 1 && "Business Type"}
            {step === 2 && "Products & Services"}
            {step === 3 && "Primary Objective"}
            {step === 4 && "Context Ready"}
          </span>
          <button
            onClick={onSkip}
            className="text-slate-400 hover:text-slate-200 transition-colors"
          >
            Skip setup &rarr;
          </button>
        </div>

        {/* STEP 1: What type of business do you run? */}
        {step === 1 && (
          <div className="space-y-4 animate-fade-in">
            <div className="flex items-center gap-2.5 text-white font-bold text-sm sm:text-base">
              <Building2 className="w-4 h-4 text-bizflow-400" />
              <span>What type of business do you run?</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {BUSINESS_TYPE_OPTIONS.map((option) => (
                <button
                  key={option}
                  onClick={() => handleStep1Submit(option)}
                  className="p-3.5 rounded-xl bg-dark-bg/80 hover:bg-dark-cardHover border border-dark-border hover:border-bizflow-500/50 text-left text-xs font-semibold text-slate-200 hover:text-white transition-all shadow-sm"
                >
                  {option}
                </button>
              ))}
            </div>

            {/* Custom Input */}
            <div className="pt-2">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (customTypeInput.trim()) handleStep1Submit(customTypeInput.trim());
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  placeholder="Or type custom business type..."
                  value={customTypeInput}
                  onChange={(e) => setCustomTypeInput(e.target.value)}
                  className="flex-1 bg-dark-bg/90 border border-dark-border focus:border-bizflow-500/50 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={!customTypeInput.trim()}
                  className="px-4 py-2.5 rounded-xl bg-dark-card hover:bg-dark-cardHover border border-dark-border text-xs font-bold text-white disabled:opacity-40"
                >
                  Next &rarr;
                </button>
              </form>
            </div>
          </div>
        )}

        {/* STEP 2: What products or services do you offer? */}
        {step === 2 && (
          <div className="space-y-4 animate-fade-in">
            <div className="flex items-center gap-2.5 text-white font-bold text-sm sm:text-base">
              <Package className="w-4 h-4 text-cyan-400" />
              <span>Got it. What products or services do you offer?</span>
            </div>

            <form onSubmit={handleStep2Submit} className="space-y-4">
              <textarea
                rows={3}
                placeholder="e.g. Enterprise SaaS platform for logistics, smart home hardware, retail apparel..."
                value={products}
                onChange={(e) => setProducts(e.target.value)}
                className="w-full bg-dark-bg/90 border border-dark-border focus:border-bizflow-500/50 rounded-xl p-3.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none resize-none"
              />

              <div className="flex items-center justify-between pt-1">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-xs text-slate-400 hover:text-white"
                >
                  &larr; Back
                </button>

                <button
                  type="submit"
                  disabled={!products.trim()}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-bizflow-500 to-teal-400 text-slate-950 font-bold text-xs disabled:opacity-30"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>
        )}

        {/* STEP 3: What is your primary focus right now? */}
        {step === 3 && (
          <div className="space-y-4 animate-fade-in">
            <div className="flex items-center gap-2.5 text-white font-bold text-sm sm:text-base">
              <Target className="w-4 h-4 text-teal-400" />
              <span>What is your primary focus right now?</span>
            </div>

            <div className="space-y-2.5">
              {FOCUS_OPTIONS.map((f) => (
                <button
                  key={f}
                  onClick={() => handleStep3Submit(f)}
                  className="w-full p-3.5 rounded-xl bg-dark-bg/80 hover:bg-dark-cardHover border border-dark-border hover:border-bizflow-500/50 text-left text-xs font-semibold text-slate-200 hover:text-white flex items-center justify-between transition-all"
                >
                  <span>{f}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                </button>
              ))}
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="text-xs text-slate-400 hover:text-white"
              >
                &larr; Back
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Context Ready & Quick Launch */}
        {step === 4 && (
          <div className="space-y-6 animate-fade-in text-center">
            <div className="w-12 h-12 mx-auto rounded-full bg-bizflow-500/20 border border-bizflow-500/40 flex items-center justify-center text-bizflow-300">
              <Check className="w-6 h-6 stroke-[3]" />
            </div>

            <div className="space-y-1.5">
              <h3 className="text-base sm:text-lg font-bold text-white">
                Perfect. I have enough context to start analyzing your business.
              </h3>
              <p className="text-xs text-slate-400">
                Operating profile: <strong className="text-slate-200">{businessType}</strong> &bull; Focus: <strong className="text-bizflow-300">{focus}</strong>
              </p>
            </div>

            {/* Curated Questions to start */}
            <div className="space-y-2 text-left pt-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                Choose a question to analyze first:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {RECOMMENDED_PROMPTS.slice(0, 4).map((q) => (
                  <button
                    key={q.id}
                    onClick={() => handleFinalLaunch(q.text)}
                    className="p-3 rounded-xl bg-dark-bg/90 hover:bg-dark-cardHover border border-dark-border hover:border-bizflow-500/50 text-left text-xs text-slate-200 hover:text-white font-medium transition-all flex items-center justify-between"
                  >
                    <span className="truncate mr-2">{q.text}</span>
                    <ArrowRight className="w-3 h-3 text-bizflow-400 shrink-0" />
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => handleFinalLaunch()}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-bizflow-500 to-teal-400 text-slate-950 font-bold text-xs shadow-lg shadow-bizflow-500/25 hover:scale-[1.01] transition-transform"
            >
              Open Live Assistant Workspace &rarr;
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
