"use client";

import React, { useRef, useEffect } from "react";
import { ArrowUp } from "lucide-react";

interface AssistantInputProps {
  input: string;
  setInput: (value: string) => void;
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

const QUICK_TAGS = [
  { label: "#sales", insert: "Investigate revenue and pipeline conversion: " },
  { label: "#finance", insert: "Audit gross margins and COGS breakdown: " },
  { label: "#inventory", insert: "Check stockout risk and supplier lead times: " },
  { label: "#support", insert: "Surface customer support churn triggers: " },
  { label: "#hr", insert: "Analyze team workload and sprint velocity: " },
];

export const AssistantInput: React.FC<AssistantInputProps> = ({
  input,
  setInput,
  onSendMessage,
  isLoading,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        160
      )}px`;
    }
  }, [input]);

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

  const handleInsertTag = (tagText: string) => {
    setInput(tagText);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  return (
    <div className="sticky bottom-0 bg-gradient-to-t from-[#080A10] via-[#080A10]/95 to-transparent pt-3 pb-6 px-4 md:px-6">
      <div className="max-w-3xl mx-auto space-y-2">
        {/* Input Card */}
        <form
          onSubmit={handleSubmit}
          className="relative flex items-end bg-[#0C101A] rounded-2xl border border-[#1E273A] focus-within:border-cyan-500/50 shadow-xl transition-all"
        >
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
            rows={1}
            placeholder="Ask SYNORA anything about your business..."
            className="w-full bg-transparent text-slate-100 placeholder-slate-500 text-sm sm:text-base resize-none py-4 pl-5 pr-14 focus:outline-none max-h-44 min-h-[52px] rounded-2xl leading-relaxed font-sans"
          />

          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            title="Send query"
            aria-label="Send query"
            className="absolute right-3 bottom-3 w-8 h-8 rounded-xl bg-gradient-to-r from-[#5B6BF6] to-[#00A3E0] hover:from-[#4F5FE8] hover:to-[#0092CC] text-white flex items-center justify-center font-bold hover:scale-105 active:scale-95 transition-all shadow-md disabled:opacity-20 disabled:pointer-events-none"
          >
            {isLoading ? (
              <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <ArrowUp className="w-4 h-4 stroke-[2.5]" />
            )}
          </button>
        </form>

        {/* Minimal hint */}
        <div className="flex items-center justify-between px-2 text-xs text-slate-500">
          <span>Sales · Finance · Inventory · Support · HR</span>
          <span className="hidden sm:inline">Enter to send</span>
        </div>
      </div>
    </div>
  );
};
