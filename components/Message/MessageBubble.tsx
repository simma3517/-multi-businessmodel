import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { User, Sparkles, Copy, Check, AlertCircle, RotateCcw, Plus } from "lucide-react";
import { ChatMessage } from "@/lib/types";
import { formatTime } from "@/lib/utils";
import { AgentUsageBadge } from "../AgentBadge/AgentUsageBadge";
import { FollowUpSuggestions } from "../SuggestedQuestions/FollowUpSuggestions";

interface MessageBubbleProps {
  message: ChatMessage;
  isLastMessage: boolean;
  onSelectSuggestion: (question: string) => void;
  isLoading: boolean;
  onRetry?: () => void;
  onNewChat?: () => void;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  isLastMessage,
  onSelectSuggestion,
  isLoading,
  onRetry,
  onNewChat,
}) => {
  const isUser = message.role === "user";
  const [copied, setCopied] = useState(false);

  // Clean any duplicated "Consulted Agents:" or "I will consult..." lines from raw text
  const cleanedContent = React.useMemo(() => {
    if (!message.content) return "";
    return message.content
      .replace(/(\n|^)\s*(?:\*\*)?Consulted Agents:?(?:\*\*)?[^\n]*(\n|$)/gi, "\n\n")
      .trim();
  }, [message.content]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div
      className={`py-5 px-4 md:px-6 w-full transition-colors ${
        isUser
          ? "bg-transparent"
          : "bg-dark-sidebar/50 border-y border-white/[0.04]"
      }`}
    >
      <div className="max-w-3xl mx-auto flex items-start gap-3.5 sm:gap-4">
        {/* Avatar */}
        {isUser ? (
          <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 shrink-0 shadow-sm mt-0.5">
            <User className="w-4 h-4" />
          </div>
        ) : (
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-bizflow-600 via-teal-500 to-cyan-400 flex items-center justify-center text-slate-950 shadow-md shadow-bizflow-500/25 shrink-0 mt-0.5">
            <Sparkles className="w-4 h-4 text-slate-950 stroke-[2.5]" />
          </div>
        )}

        {/* Content Box */}
        <div className="flex-1 min-w-0 space-y-2">
          {/* Header row: Name & timestamp */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-semibold text-slate-200">
                {isUser ? "You" : "BIZFLOW AI"}
              </span>
              <span className="text-[11px] text-slate-500 font-mono">
                {formatTime(message.timestamp)}
              </span>
            </div>

            {!isUser && message.status !== "error" && (
              <button
                onClick={handleCopy}
                title="Copy response"
                className="text-slate-400 hover:text-slate-200 p-1 rounded-md hover:bg-dark-card transition-colors text-xs inline-flex items-center gap-1"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-bizflow-400" />
                    <span className="text-[11px] text-bizflow-400 font-medium">Copied</span>
                  </>
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            )}
          </div>

          {/* Message text / markdown / error */}
          {message.status === "error" ? (
            <div className="p-4 rounded-xl bg-red-950/30 border border-red-900/50 text-red-200 space-y-3">
              <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-red-300">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span>Something went wrong while analyzing your request.</span>
              </div>
              <div className="flex items-center gap-2 pt-1">
                {onRetry && (
                  <button
                    onClick={onRetry}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-900/40 hover:bg-red-900/60 border border-red-700/50 text-xs font-semibold text-white transition-colors"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Try Again</span>
                  </button>
                )}
                {onNewChat && (
                  <button
                    onClick={onNewChat}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-dark-card hover:bg-dark-cardHover border border-dark-border text-xs font-medium text-slate-300 transition-colors"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Start New Chat</span>
                  </button>
                )}
              </div>
            </div>
          ) : isUser ? (
            <div className="text-xs sm:text-sm md:text-[15px] text-slate-100 whitespace-pre-wrap leading-relaxed">
              {message.content}
            </div>
          ) : (
            <div className="prose-bizflow text-xs sm:text-sm md:text-[15px]">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {cleanedContent}
              </ReactMarkdown>

              {/* Real Agent Usage Indicator */}
              <AgentUsageBadge agentsUsed={message.agentsUsed} />

              {/* Context-aware Follow-up Suggestions (shown for last completed assistant message) */}
              {isLastMessage && !isLoading && (
                <FollowUpSuggestions
                  suggestions={message.followUpQuestions}
                  onSelectSuggestion={onSelectSuggestion}
                  disabled={isLoading}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
