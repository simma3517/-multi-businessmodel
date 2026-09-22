"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Plus,
  MessageSquare,
  Trash2,
  X,
  Search,
  PanelLeftClose,
} from "lucide-react";
import { Conversation } from "@/lib/types";
import { groupConversationsByDate } from "@/lib/utils";

interface AssistantSidebarProps {
  conversations: Conversation[];
  activeConversationId: string | null;
  onSelectConversation: (id: string) => void;
  onNewChat: () => void;
  onDeleteConversation: (id: string, e: React.MouseEvent) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const AssistantSidebar: React.FC<AssistantSidebarProps> = ({
  conversations,
  activeConversationId,
  onSelectConversation,
  onNewChat,
  onDeleteConversation,
  isOpen,
  onClose,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredConversations = conversations.filter((c) =>
    (c.title || "Business Analysis")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const grouped = groupConversationsByDate(filteredConversations);

  const renderGroup = (title: string, items: Conversation[]) => {
    if (items.length === 0) return null;

    return (
      <div className="mb-4">
        <h3 className="text-[11px] font-mono uppercase tracking-wider text-slate-500 px-3 mb-1.5">
          {title}
        </h3>
        <div className="space-y-1">
          {items.map((conv) => {
            const isActive = conv.id === activeConversationId;
            return (
              <div
                key={conv.id}
                onClick={() => {
                  onSelectConversation(conv.id);
                  if (typeof window !== "undefined" && window.innerWidth < 768) {
                    onClose();
                  }
                }}
                className={`group flex items-center justify-between px-3 py-2 rounded-xl cursor-pointer text-xs sm:text-sm transition-all ${
                  isActive
                    ? "bg-[#141A29] text-white font-medium border border-[#27354F]"
                    : "text-slate-400 hover:bg-[#0E131F] hover:text-slate-200 border border-transparent"
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0 flex-1">
                  <MessageSquare
                    className={`w-4 h-4 shrink-0 ${
                      isActive ? "text-cyan-400" : "text-slate-500"
                    }`}
                  />
                  <span className="truncate">
                    {conv.title || "Business Analysis"}
                  </span>
                </div>

                <button
                  onClick={(e) => onDeleteConversation(conv.id, e)}
                  title="Delete session"
                  className="opacity-0 group-hover:opacity-100 p-1 hover:text-rose-400 rounded hover:bg-white/[0.06] transition-all"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Mobile Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 md:hidden animate-fade-in"
      />

      {/* Sidebar Container */}
      <aside
        className="fixed md:static inset-y-0 left-0 z-50 w-64 lg:w-72 bg-[#07090E] border-r border-[#161D2C] flex flex-col transition-all duration-200 shrink-0"
      >
        {/* Top Header & Brand */}
        <div className="p-3.5 border-b border-[#161D2C] space-y-3">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-6 h-6 rounded-md bg-white text-[#080A10] font-black text-xs flex items-center justify-center shadow-sm">
                S
              </div>
              <span className="font-extrabold text-sm tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                SYNORA
              </span>
            </Link>

            {/* Minimize / Close Sidebar Button */}
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/[0.06] border border-transparent hover:border-slate-700/40 transition-colors"
              title="Collapse history sidebar"
              aria-label="Collapse sidebar"
            >
              <PanelLeftClose className="w-4 h-4 text-slate-400 hover:text-cyan-400 transition-colors" />
            </button>
          </div>

          {/* New Chat Button */}
          <button
            onClick={() => {
              onNewChat();
              if (typeof window !== "undefined" && window.innerWidth < 768) {
                onClose();
              }
            }}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-[#121824] hover:bg-[#182234] border border-[#223048] hover:border-cyan-500/40 text-slate-100 hover:text-white text-xs sm:text-sm font-semibold shadow-sm transition-all group"
          >
            <Plus className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
            <span>New Chat</span>
          </button>

          {/* Search Bar */}
          {conversations.length > 0 && (
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search history..."
                className="w-full bg-[#0B0F17] border border-[#1A2234] rounded-xl pl-8 pr-2.5 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 transition-colors"
              />
            </div>
          )}
        </div>

        {/* History List */}
        <div className="flex-1 overflow-y-auto px-2.5 py-3 custom-scrollbar">
          {filteredConversations.length === 0 ? (
            <div className="text-center py-10 px-4 text-xs sm:text-sm text-slate-500 space-y-1">
              <p>{searchQuery ? "No matching sessions found." : "No history yet."}</p>
              <p className="text-xs text-slate-600">Start an inquiry to view sessions.</p>
            </div>
          ) : (
            <>
              {renderGroup("Today", grouped.today)}
              {renderGroup("Yesterday", grouped.yesterday)}
              {renderGroup("Previous 7 Days", grouped.previous7Days)}
              {renderGroup("Older", grouped.older)}
            </>
          )}
        </div>

        {/* Footer Status */}
        <div className="p-3 border-t border-[#161D2C] bg-[#05070B] flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center gap-1.5 font-mono text-[11px] text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Active Mesh</span>
          </span>
          <span className="text-slate-500 text-[11px] font-mono">SYNORA v2.0</span>
        </div>
      </aside>
    </>
  );
};
