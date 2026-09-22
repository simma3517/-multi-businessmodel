import React from "react";
import { Bot, Check, ShieldCheck } from "lucide-react";
import { formatAgentDisplayName } from "@/lib/utils";

interface AgentUsageBadgeProps {
  agentsUsed?: string[];
}

export const AgentUsageBadge: React.FC<AgentUsageBadgeProps> = ({ agentsUsed }) => {
  if (!agentsUsed || agentsUsed.length === 0) {
    return null;
  }

  const isSingle = agentsUsed.length === 1;

  return (
    <div className="mt-5 pt-3.5 border-t border-dark-border/50">
      <div className="inline-flex flex-col sm:flex-row sm:items-center gap-2 bg-[#0E1320]/90 border border-dark-border/80 px-3.5 py-2 rounded-xl text-xs shadow-md">
        <div className="flex items-center gap-1.5 text-bizflow-300 font-semibold">
          <Bot className="w-3.5 h-3.5 text-bizflow-400" />
          <span>{isSingle ? "Agent consulted:" : "Agents consulted:"}</span>
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          {agentsUsed.map((agent) => (
            <span
              key={agent}
              className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-bizflow-950/90 text-bizflow-200 border border-bizflow-800/70 text-[11px] font-medium shadow-sm"
            >
              <Check className="w-3 h-3 text-bizflow-400 stroke-[2.5]" />
              {formatAgentDisplayName(agent)}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
