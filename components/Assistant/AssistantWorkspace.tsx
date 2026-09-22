"use client";

import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { Conversation, ChatMessage, ChatResponse } from "@/lib/types";
import { generateId } from "@/lib/utils";
import { AssistantHeader } from "./AssistantHeader";
import { AssistantSidebar } from "./AssistantSidebar";
import { ConversationalOnboarding } from "./ConversationalOnboarding";
import { MessageItem } from "./MessageItem";
import { AssistantAnalyzing } from "./AssistantAnalyzing";
import { AssistantInput } from "./AssistantInput";

const STORAGE_KEY = "synora_workspace_convos_v2";

export const AssistantWorkspace: React.FC = () => {
  const searchParams = useSearchParams();
  const initialPrompt = searchParams.get("prompt");

  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load conversation history from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: Conversation[] = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setConversations(parsed);
        }
      }
    } catch (e) {
      console.warn("Failed to load local conversations:", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save conversations to localStorage
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(conversations));
    } catch (e) {
      console.warn("Failed to persist conversations:", e);
    }
  }, [conversations, isLoaded]);

  // Handle URL prompt query param on load
  const hasTriggeredInitialPrompt = useRef(false);
  useEffect(() => {
    if (isLoaded && initialPrompt && !hasTriggeredInitialPrompt.current) {
      hasTriggeredInitialPrompt.current = true;
      handleSendMessage(initialPrompt);
    }
  }, [isLoaded, initialPrompt]);

  const activeConversation =
    conversations.find((c) => c.id === activeConversationId) || null;

  const messages = activeConversation?.messages || [];

  const scrollToBottom = (behavior: ScrollBehavior = "smooth") => {
    messagesEndRef.current?.scrollIntoView({ behavior });
  };

  useEffect(() => {
    scrollToBottom("smooth");
  }, [messages, isLoading]);

  const handleSelectConversation = (id: string) => {
    setActiveConversationId(id);
  };

  const handleNewChat = () => {
    setActiveConversationId(null);
    setInput("");
  };

  const handleDeleteConversation = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setConversations((prev) => prev.filter((c) => c.id !== id));
    if (activeConversationId === id) {
      setActiveConversationId(null);
    }
  };

  const handleSendMessage = async (textToSend: string) => {
    const trimmed = textToSend.trim();
    if (!trimmed || isLoading) return;

    setInput("");
    setIsLoading(true);

    const userMessage: ChatMessage = {
      id: generateId(),
      role: "user",
      content: trimmed,
      timestamp: Date.now(),
      status: "completed",
    };

    let targetConvId = activeConversationId;
    let targetThreadId = activeConversation?.threadId;
    let updatedMessages: ChatMessage[];

    if (!activeConversation) {
      const newId = generateId();
      targetConvId = newId;
      const newConv: Conversation = {
        id: newId,
        title: trimmed.length > 38 ? `${trimmed.substring(0, 38)}...` : trimmed,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        messages: [userMessage],
      };
      updatedMessages = [userMessage];
      setConversations((prev) => [newConv, ...prev]);
      setActiveConversationId(newId);
    } else {
      updatedMessages = [...activeConversation.messages, userMessage];
      setConversations((prev) =>
        prev.map((c) =>
          c.id === activeConversation.id
            ? { ...c, updatedAt: Date.now(), messages: updatedMessages }
            : c
        )
      );
    }

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: trimmed,
          threadId: targetThreadId,
          conversationId: targetConvId,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to communicate with SYNORA Manager Orchestrator");
      }

      const data: ChatResponse = await res.json();

      const assistantMessage: ChatMessage = {
        id: generateId(),
        role: "assistant",
        content: data.answer || "No response received.",
        timestamp: Date.now(),
        agentsUsed: Array.isArray(data.agentsUsed) ? data.agentsUsed : [],
        followUpQuestions: Array.isArray(data.followUpQuestions)
          ? data.followUpQuestions
          : [],
        status: "completed",
        threadId: data.threadId,
      };

      const finalMessages = [...updatedMessages, assistantMessage];

      setConversations((prev) =>
        prev.map((c) =>
          c.id === targetConvId
            ? {
                ...c,
                threadId: data.threadId || c.threadId,
                updatedAt: Date.now(),
                messages: finalMessages,
              }
            : c
        )
      );
    } catch (err) {
      console.error("[AssistantWorkspace] Error sending message:", err);

      const errorMessage: ChatMessage = {
        id: generateId(),
        role: "assistant",
        content: "",
        timestamp: Date.now(),
        status: "error",
        error: "Sorry, SYNORA couldn't complete the analysis. Please try again.",
      };

      setConversations((prev) =>
        prev.map((c) =>
          c.id === targetConvId
            ? {
                ...c,
                updatedAt: Date.now(),
                messages: [...updatedMessages, errorMessage],
              }
            : c
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (!isLoaded) {
    return (
      <div className="h-screen w-screen bg-[#080A10] flex flex-col items-center justify-center text-slate-400 text-sm font-mono space-y-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-indigo-500 to-cyan-500 p-[1px] animate-pulse">
          <div className="w-full h-full bg-[#080A10] rounded-[7px]" />
        </div>
        <span>Initializing SYNORA...</span>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#080A10] text-slate-100 font-sans selection:bg-slate-700 selection:text-white">
      {/* Sidebar (Minimizable / Closeable) */}
      <AssistantSidebar
        conversations={conversations}
        activeConversationId={activeConversationId}
        onSelectConversation={handleSelectConversation}
        onNewChat={handleNewChat}
        onDeleteConversation={handleDeleteConversation}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main Workspace Viewport (Expands to 100% when sidebar is closed) */}
      <div className="flex-1 flex flex-col h-full min-w-0 overflow-hidden relative">
        <AssistantHeader
          isSidebarOpen={isSidebarOpen}
          onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
          onNewChat={handleNewChat}
        />

        {/* Conversation Area or Onboarding */}
        <div className="flex-1 overflow-y-auto">
          {messages.length === 0 ? (
            <ConversationalOnboarding
              input={input}
              setInput={setInput}
              onSendMessage={handleSendMessage}
              isLoading={isLoading}
            />
          ) : (
            <div className="flex flex-col min-h-full pb-4">
              {messages.map((msg, index) => (
                <MessageItem
                  key={msg.id}
                  message={msg}
                  isLastMessage={index === messages.length - 1}
                  onSelectSuggestion={handleSendMessage}
                  isLoading={isLoading}
                  onRetry={() => {
                    const lastUserMsg = [...messages].reverse().find((m) => m.role === "user");
                    if (lastUserMsg) {
                      handleSendMessage(lastUserMsg.content);
                    }
                  }}
                  onNewChat={handleNewChat}
                />
              ))}

              {isLoading && <AssistantAnalyzing />}

              <div ref={messagesEndRef} className="h-4" />
            </div>
          )}
        </div>

        {/* Bottom Input Bar (Active when conversation has messages) */}
        {messages.length > 0 && (
          <AssistantInput
            input={input}
            setInput={setInput}
            onSendMessage={handleSendMessage}
            isLoading={isLoading}
          />
        )}
      </div>
    </div>
  );
};
