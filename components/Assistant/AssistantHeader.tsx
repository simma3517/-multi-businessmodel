"use client";

import React from "react";
import Link from "next/link";
import { Plus, PanelLeftClose, PanelLeft } from "lucide-react";

interface AssistantHeaderProps {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
  onNewChat: () => void;
}

export const AssistantHeader: React.FC<AssistantHeaderProps> = ({
  isSidebarOpen,
  onToggleSidebar,
  onNewChat,
}) => {
  // If sidebar is already open, do not render a distracting empty border bar
  if (isSidebarOpen) {
    return null;
  }

  return (
    <header className="h-14 border-b border-[#161D2C] bg-[#07090E]/80 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 shrink-0 animate-fade-in">
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onToggleSidebar}
          className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-white/[0.06] border border-transparent hover:border-slate-700/50 transition-all flex items-center gap-1.5 text-xs"
          title="Open History Sidebar"
          aria-label="Open history sidebar"
        >
          <PanelLeft className="w-4 h-4 text-cyan-400" />
        </button>

        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-6 h-6 rounded-md bg-white text-[#080A10] font-black text-xs flex items-center justify-center shadow-sm">
            S
          </div>
          <span className="font-extrabold text-sm tracking-tight text-white group-hover:text-cyan-300 transition-colors">
            SYNORA
          </span>
        </Link>
      </div>

      {/* Right side: New Chat */}
      <div className="flex items-center gap-3">
        <button
          onClick={onNewChat}
          className="flex items-center gap-1.5 text-xs font-semibold text-white bg-[#141B2B] hover:bg-[#1C263D] border border-[#26354D] hover:border-cyan-500/40 px-3.5 py-1.5 rounded-xl shadow-sm transition-all"
        >
          <Plus className="w-3.5 h-3.5 text-cyan-400" />
          <span>New Chat</span>
        </button>
      </div>
    </header>
  );
};
