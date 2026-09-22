import React, { useRef, useEffect } from "react";
import { ArrowUp, Sparkles } from "lucide-react";

interface ChatInputProps {
  input: string;
  setInput: (value: string) => void;
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  input,
  setInput,
  onSendMessage,
  isLoading,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea height as content changes
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        180
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

  return (
    <div className="sticky bottom-0 bg-gradient-to-t from-dark-bg via-dark-bg/95 to-transparent pt-3 pb-4 md:pb-6 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Animated Running Border Wrapper */}
        <div className="relative p-[1.5px] rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 focus-within:shadow-[0_0_30px_-5px_rgba(45,212,191,0.3)] group">
          {/* Traveling Glowing Light Beam on Border */}
          <div className="absolute inset-[-200%] animate-border-beam bg-[conic-gradient(from_0deg,transparent_0deg,transparent_270deg,rgba(45,212,191,0.25)_300deg,#2dd4bf_335deg,#38bdf8_360deg)] pointer-events-none" />

          {/* Inner Input Container */}
          <form
            onSubmit={handleSubmit}
            className="relative flex items-end bg-[#0D111A]/95 backdrop-blur-2xl rounded-[15px] border border-white/[0.06] transition-colors"
          >
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
              rows={1}
              placeholder="Ask anything about your business..."
              className="w-full bg-transparent text-slate-100 placeholder-slate-400 text-xs sm:text-sm resize-none py-3.5 pl-4 pr-12 focus:outline-none max-h-44 min-h-[48px] rounded-[15px] leading-relaxed"
            />

            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              title="Send question"
              className="absolute right-2.5 bottom-2.5 w-8 h-8 rounded-xl bg-gradient-to-tr from-bizflow-500 via-teal-400 to-cyan-400 text-slate-950 flex items-center justify-center font-bold shadow-md shadow-bizflow-500/30 hover:scale-105 active:scale-95 transition-all disabled:opacity-20 disabled:scale-100 disabled:pointer-events-none"
            >
              {isLoading ? (
                <span className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></span>
              ) : (
                <ArrowUp className="w-4 h-4 stroke-[2.5]" />
              )}
            </button>
          </form>
        </div>

        {/* Responsible AI Disclaimer & Shortcut Hint */}
        <div className="flex items-center justify-between mt-2 px-1 text-[11px] text-slate-400">
          <span>AI-generated analysis may contain errors. Verify important business decisions.</span>
          <span className="hidden sm:inline text-slate-400">
            <kbd className="px-1.5 py-0.5 rounded bg-dark-card border border-dark-border text-slate-400 text-[10px] font-mono">
              ↵ Enter
            </kbd>
          </span>
        </div>
      </div>
    </div>
  );
};
