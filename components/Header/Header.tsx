import React from "react";
import { Menu, Plus, Sparkles, Bot } from "lucide-react";

interface HeaderProps {
  onToggleSidebar: () => void;
  onNewChat: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onToggleSidebar,
  onNewChat,
}) => {
  return (
    <header className="h-14 border-b border-white/[0.06] bg-[#0B0F17]/80 backdrop-blur-xl px-4 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-dark-card transition-colors md:hidden"
          title="Toggle chat history"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-sm tracking-tight text-white">
              BIZFLOW <span className="text-bizflow-400">AI</span>
            </span>
            <span className="text-xs text-slate-500 hidden sm:inline">•</span>
            <span className="text-xs font-semibold text-slate-300 hidden sm:inline flex items-center gap-1">
              <Bot className="w-3.5 h-3.5 text-bizflow-400" />
              ManagerOrchestrator
            </span>
          </div>

          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950/40 border border-emerald-800/40 text-[11px] text-emerald-300 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Connected to Azure AI Foundry</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={onNewChat}
          className="flex items-center gap-1.5 text-xs font-bold text-slate-950 bg-gradient-to-r from-bizflow-500 to-teal-400 hover:from-bizflow-400 hover:to-teal-300 px-3.5 py-1.5 rounded-lg shadow-md shadow-bizflow-500/20 transition-all hover:scale-105 active:scale-95"
        >
          <Plus className="w-3.5 h-3.5 stroke-[3]" />
          <span>New Chat</span>
        </button>
      </div>
    </header>
  );
};
