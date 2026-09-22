"use client";

import React, { useRef, useEffect } from "react";
import {
  TrendingUp,
  CircleDollarSign,
  Package,
  Headphones,
  ArrowUp,
  Sparkles,
  ArrowRight,
} from "lucide-react";

interface ConversationalOnboardingProps {
  input: string;
  setInput: (value: string) => void;
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

const RECOMMENDED_QUESTIONS = [
  {
    id: "sales-rev",
    label: "Why are sales falling despite high ad spend?",
    icon: TrendingUp,
    color: "text-rose-400",
  },
  {
    id: "margin-comp",
    label: "Why is net profit decreasing while revenue grows?",
    icon: CircleDollarSign,
    color: "text-emerald-400",
  },
  {
    id: "stockout-risk",
    label: "Which high-margin products are at stockout risk?",
    icon: Package,
    color: "text-amber-400",
  },
  {
    id: "support-churn",
    label: "What support complaints are driving customer churn?",
    icon: Headphones,
    color: "text-cyan-400",
  },
];

export const ConversationalOnboarding: React.FC<ConversationalOnboardingProps> = ({
  input,
  setInput,
  onSendMessage,
  isLoading,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isLoading) return;
    onSendMessage(input);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="relative flex-1 flex flex-col justify-center items-center px-4 sm:px-6 py-10 max-w-3xl mx-auto w-full min-h-[calc(100vh-40px)]">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[320px] bg-gradient-to-tr from-indigo-600/12 via-cyan-500/10 to-emerald-500/8 blur-[100px] pointer-events-none rounded-full" />

      <div className="relative w-full space-y-8 text-center animate-fade-in z-10">
        {/* Top Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0E1524]/80 backdrop-blur-sm border border-[#1E2D44] text-xs font-mono text-cyan-400 shadow-sm mx-auto">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Synchronized Multi-Agent Intelligence</span>
        </div>

        {/* Big Greeting Headline */}
        <div className="space-y-3">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white font-sans leading-tight">
            How can SYNORA help <br />
            <span className="bg-gradient-to-r from-[#A5B4FC] via-[#38BDF8] to-[#6EE7B7] bg-clip-text text-transparent">
              your business today?
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-md mx-auto leading-relaxed">
            Ask any question across Sales, Finance, Inventory, Support, and HR.
          </p>
        </div>

        {/* =========================================================================
            PROMINENT CENTERED QUESTION ASKING INPUT
            ========================================================================= */}
        <div className="pt-2 max-w-2xl mx-auto w-full">
          <form
            onSubmit={handleSubmit}
            className="relative flex items-center bg-[#0C101A]/90 backdrop-blur-md rounded-2xl border border-[#1E273A] focus-within:border-cyan-400/60 focus-within:shadow-[0_0_30px_-5px_rgba(56,189,248,0.25)] transition-all p-2 shadow-lg"
          >
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
              rows={1}
              placeholder="Ask anything about your sales, margins, inventory, support, or team..."
              className="w-full bg-transparent text-slate-100 placeholder-slate-500 text-sm sm:text-base resize-none py-3.5 pl-4 pr-14 focus:outline-none min-h-[52px] rounded-xl leading-relaxed font-sans"
            />

            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              title="Send question"
              aria-label="Send question"
              className="absolute right-3.5 w-10 h-10 rounded-xl bg-gradient-to-r from-[#5B6BF6] to-[#00A3E0] hover:from-[#4F5FE8] hover:to-[#0092CC] text-white flex items-center justify-center font-bold hover:scale-105 active:scale-95 transition-all shadow-md shadow-indigo-500/30 disabled:opacity-25 disabled:pointer-events-none"
            >
              {isLoading ? (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <ArrowUp className="w-5 h-5 stroke-[2.5]" />
              )}
            </button>
          </form>
        </div>

        {/* =========================================================================
            RECOMMENDED QUESTIONS
            ========================================================================= */}
        <div className="pt-2 max-w-2xl mx-auto w-full space-y-3 text-left">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5 font-medium">
              <Sparkles className="w-3 h-3 text-cyan-400" />
              <span>Recommended Questions:</span>
            </span>
            <span className="text-xs text-slate-500 font-mono hidden sm:inline">
              Click to ask
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {RECOMMENDED_QUESTIONS.map((q) => {
              const Icon = q.icon;
              return (
                <button
                  key={q.id}
                  onClick={() => !isLoading && onSendMessage(q.label)}
                  disabled={isLoading}
                  className="p-3.5 rounded-xl bg-[#0C101A]/80 hover:bg-[#121826] border border-[#1A2234] hover:border-cyan-500/40 text-left transition-all flex items-center justify-between gap-3 group shadow-sm disabled:opacity-50"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-7 h-7 rounded-lg bg-[#141B2B] border border-[#25334D] flex items-center justify-center shrink-0">
                      <Icon className={`w-3.5 h-3.5 ${q.color}`} />
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-slate-300 group-hover:text-white transition-colors leading-snug">
                      {q.label}
                    </span>
                  </div>

                  <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all shrink-0" />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
