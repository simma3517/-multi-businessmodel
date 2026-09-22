import React from "react";
import {
  Plus,
  MessageSquare,
  Trash2,
  X,
  Sparkles,
  Bot,
} from "lucide-react";
import { Conversation } from "@/lib/types";
import { groupConversationsByDate } from "@/lib/utils";

interface SidebarProps {
  conversations: Conversation[];
  activeConversationId: string | null;
  onSelectConversation: (id: string) => void;
  onNewChat: () => void;
  onDeleteConversation: (id: string, e: React.MouseEvent) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  conversations,
  activeConversationId,
  onSelectConversation,
  onNewChat,
  onDeleteConversation,
  isOpen,
  onClose,
}) => {
  const grouped = groupConversationsByDate(conversations);

  const renderConversationGroup = (title: string, items: Conversation[]) => {
    if (items.length === 0) return null;

    return (
      <div className="mb-4">
        <h3 className="text-[10px] font-bold tracking-wider uppercase text-slate-500 px-3 mb-1.5">
          {title}
        </h3>
        <div className="space-y-0.5">
          {items.map((conv) => {
            const isActive = conv.id === activeConversationId;
            return (
              <div
                key={conv.id}
                onClick={() => {
                  onSelectConversation(conv.id);
                  if (window.innerWidth < 768) onClose();
                }}
                className={`group flex items-center justify-between px-3 py-2 rounded-xl cursor-pointer text-xs font-medium transition-all ${
                  isActive
                    ? "bg-[#131926] text-bizflow-300 border border-dark-border shadow-sm"
                    : "text-slate-300 hover:bg-[#131926]/60 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0 flex-1">
                  <MessageSquare
                    className={`w-3.5 h-3.5 shrink-0 ${
                      isActive ? "text-bizflow-400" : "text-slate-500 group-hover:text-slate-400"
                    }`}
                  />
                  <span className="truncate">{conv.title || "Business Analysis"}</span>
                </div>

                <button
                  onClick={(e) => onDeleteConversation(conv.id, e)}
                  title="Delete chat"
                  className="opacity-0 group-hover:opacity-100 p-1 hover:text-rose-400 rounded transition-opacity"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 md:hidden animate-fade-in"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-50 w-64 lg:w-72 bg-[#0D111A] border-r border-white/[0.06] flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Brand & New Chat Header */}
        <div className="p-3.5 border-b border-white/[0.06] space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-bizflow-500 to-cyan-400 flex items-center justify-center text-slate-950 font-bold shadow-md shadow-bizflow-500/20">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-sm tracking-tight text-white">
                BIZFLOW <span className="text-bizflow-400">AI</span>
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-1 text-slate-400 hover:text-white md:hidden"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <button
            onClick={() => {
              onNewChat();
              if (window.innerWidth < 768) onClose();
            }}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-bizflow-500/15 via-dark-card to-dark-card hover:bg-dark-cardHover text-white text-xs font-semibold border border-bizflow-500/30 hover:border-bizflow-500/60 shadow-sm transition-all"
          >
            <Plus className="w-4 h-4 text-bizflow-400" />
            <span>+ New Chat</span>
          </button>
        </div>

        {/* Conversation History List */}
        <div className="flex-1 overflow-y-auto px-2 py-3">
          {conversations.length === 0 ? (
            <div className="text-center py-8 px-4 text-xs text-slate-500">
              <Bot className="w-5 h-5 mx-auto mb-2 text-slate-600" />
              <p>No chat history yet.</p>
              <p className="text-[11px] text-slate-600 mt-1">
                Start a business conversation.
              </p>
            </div>
          ) : (
            <>
              {renderConversationGroup("Today", grouped.today)}
              {renderConversationGroup("Yesterday", grouped.yesterday)}
              {renderConversationGroup("Previous 7 Days", grouped.previous7Days)}
              {renderConversationGroup("Older", grouped.older)}
            </>
          )}
        </div>

        {/* Footer: Azure Indicator */}
        <div className="p-3.5 border-t border-white/[0.06] bg-[#090C13] text-[11px] space-y-1">
          <div className="flex items-center gap-1.5 font-semibold text-slate-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>ManagerOrchestrator Connected</span>
          </div>
          <div className="text-[10px] text-slate-500 flex items-center justify-between font-mono">
            <span>Azure AI Foundry</span>
            <span>A2A Multi-Agent</span>
          </div>
        </div>
      </aside>
    </>
  );
};
