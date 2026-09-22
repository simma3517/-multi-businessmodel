import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";

interface FollowUpSuggestionsProps {
  suggestions?: string[];
  onSelectSuggestion: (question: string) => void;
  disabled?: boolean;
}

export const FollowUpSuggestions: React.FC<FollowUpSuggestionsProps> = ({
  suggestions,
  onSelectSuggestion,
  disabled = false,
}) => {
  if (!suggestions || suggestions.length === 0) {
    return null;
  }

  return (
    <div className="mt-5 pt-2">
      <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium mb-2.5">
        <Sparkles className="w-3.5 h-3.5 text-bizflow-400" />
        <span>Explore further:</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {suggestions.map((question, index) => (
          <button
            key={index}
            onClick={() => !disabled && onSelectSuggestion(question)}
            disabled={disabled}
            className="group inline-flex items-center gap-2 text-xs text-left text-slate-300 hover:text-white bg-dark-card/90 hover:bg-dark-cardHover border border-dark-border hover:border-bizflow-500/50 px-3 py-2 rounded-xl transition-all duration-150 disabled:opacity-50 disabled:pointer-events-none shadow-md shadow-black/10 hover:-translate-y-0.5"
          >
            <ArrowRight className="w-3 h-3 text-bizflow-400 group-hover:translate-x-0.5 transition-transform shrink-0" />
            <span className="font-medium">{question}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
