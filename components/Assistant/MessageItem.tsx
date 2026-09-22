"use client";

import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  User,
  Copy,
  Check,
  AlertCircle,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Bot,
} from "lucide-react";
import { ChatMessage } from "@/lib/types";
import { formatTime, formatAgentDisplayName } from "@/lib/utils";

interface MessageItemProps {
  message: ChatMessage;
  isLastMessage: boolean;
  onSelectSuggestion: (question: string) => void;
  isLoading: boolean;
  onRetry?: () => void;
  onNewChat?: () => void;
}

export const MessageItem: React.FC<MessageItemProps> = ({
  message,
  isLastMessage,
  onSelectSuggestion,
  isLoading,
  onRetry,
}) => {
  const isUser = message.role === "user";
  const [copied, setCopied] = useState(false);

  // Clean redundant "Consulted Agents:" or trailing "Consulted ..." text from raw LLM output
  const cleanedContent = React.useMemo(() => {
    if (!message.content) return "";
    return message.content
      .replace(/(\n|^)\s*(?:\*\*)?Consulted\s+(?:Agents|Specialists)?:?(?:\*\*)?[^\n]*(\n|$)/gi, "\n\n")
      .replace(/(\n|^)\s*Consulted\s+[^.\n]+(?:specialists|agents)?[.]?/gi, "")
      .trim();
  }, [message.content]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(cleanedContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  if (isUser) {
    return (
      <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 py-3 flex justify-end animate-fade-in">
        <div className="max-w-xl bg-[#131A2B] border border-[#212E48] rounded-2xl px-5 py-3.5 shadow-md space-y-1">
          <div className="flex items-center justify-between gap-4 text-xs font-mono text-slate-400">
            <span className="font-semibold text-slate-300">You</span>
            <span>{formatTime(message.timestamp)}</span>
          </div>
          <p className="text-sm sm:text-base text-slate-100 font-normal leading-relaxed whitespace-pre-wrap">
            {message.content}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 py-3 animate-fade-in">
      <div className="bg-[#0B0F1A]/90 border border-[#182338] rounded-2xl p-5 sm:p-6 shadow-xl backdrop-blur-md space-y-4">
        {/* Header row: SYNORA + Time + Copy */}
        <div className="flex items-center justify-between border-b border-[#161F32] pb-3.5">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-r from-emerald-500 to-cyan-500 flex items-center justify-center text-white shrink-0 shadow-sm shadow-emerald-500/20">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="text-sm font-bold text-white tracking-tight mr-2">
                SYNORA
              </span>
              <span className="text-[11px] text-slate-500 font-mono">
                {formatTime(message.timestamp)}
              </span>
            </div>
          </div>

          {message.status !== "error" && (
            <button
              onClick={handleCopy}
              title="Copy analysis"
              className="text-slate-400 hover:text-white px-2.5 py-1 rounded-lg hover:bg-white/[0.06] text-xs inline-flex items-center gap-1.5 transition-colors border border-transparent hover:border-slate-700/50"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-xs font-mono text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span className="text-xs font-mono">Copy</span>
                </>
              )}
            </button>
          )}
        </div>

        {/* Active Agents Used (Highlighted in Green Badges) */}
        {message.agentsUsed && message.agentsUsed.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 pt-0.5">
            <span className="text-xs font-mono text-emerald-400 font-semibold flex items-center gap-1.5 mr-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Agents Engaged:</span>
            </span>
            {message.agentsUsed.map((agentName) => (
              <div
                key={agentName}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-950/50 border border-emerald-500/30 text-emerald-300 text-xs font-medium shadow-sm"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>{formatAgentDisplayName(agentName)}</span>
              </div>
            ))}
          </div>
        )}

        {/* Body Content */}
        {message.status === "error" ? (
          <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/30 text-rose-200 space-y-2">
            <div className="flex items-center gap-2 text-sm font-semibold text-rose-300">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>Unable to complete analysis.</span>
            </div>
            <p className="text-xs sm:text-sm text-rose-200/80">
              Please try asking again or verify your connection.
            </p>
            {onRetry && (
              <button
                onClick={onRetry}
                className="mt-2 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-xs font-semibold text-white transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retry</span>
              </button>
            )}
          </div>
        ) : (
          <div className="prose-synora leading-relaxed text-slate-200 text-sm sm:text-base">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {cleanedContent}
            </ReactMarkdown>
          </div>
        )}

        {/* Follow-up Suggestions (Max 2 concise items) */}
        {isLastMessage &&
          !isLoading &&
          message.followUpQuestions &&
          message.followUpQuestions.length > 0 && (
            <div className="pt-3.5 border-t border-[#161F32] space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                Suggested Next Inquiries:
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {message.followUpQuestions.slice(0, 2).map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => onSelectSuggestion(q)}
                    className="px-3 py-1.5 rounded-xl bg-[#0F1524] hover:bg-[#162035] border border-[#1E2B45] hover:border-cyan-500/40 text-xs sm:text-sm text-slate-300 hover:text-white transition-all text-left flex items-center gap-2 group shadow-sm"
                  >
                    <span>{q}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}
      </div>
    </div>
  );
};
