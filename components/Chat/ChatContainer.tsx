"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChatMessage, ChatResponse, Conversation } from "@/lib/types";
import { generateId } from "@/lib/utils";
import { WelcomeScreen } from "./WelcomeScreen";
import { MessageBubble } from "../Message/MessageBubble";
import { AnalyzingIndicator } from "../Loading/AnalyzingIndicator";
import { ChatInput } from "./ChatInput";

interface ChatContainerProps {
  currentConversation: Conversation | null;
  onUpdateConversation: (updated: Conversation) => void;
  onCreateConversation: (firstMessage: string) => Promise<string>;
}

export const ChatContainer: React.FC<ChatContainerProps> = ({
  currentConversation,
  onUpdateConversation,
  onCreateConversation,
}) => {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const messages = currentConversation?.messages || [];

  const scrollToBottom = (behavior: ScrollBehavior = "smooth") => {
    messagesEndRef.current?.scrollIntoView({ behavior });
  };

  useEffect(() => {
    scrollToBottom("smooth");
  }, [messages, isLoading]);

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

    let activeConvId = currentConversation?.id;
    let activeThreadId = currentConversation?.threadId;
    let updatedMessages: ChatMessage[];

    if (!currentConversation) {
      // Create new conversation
      const newConv: Conversation = {
        id: generateId(),
        title: trimmed.length > 36 ? `${trimmed.substring(0, 36)}...` : trimmed,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        messages: [userMessage],
      };
      activeConvId = newConv.id;
      updatedMessages = [userMessage];
      onUpdateConversation(newConv);
    } else {
      updatedMessages = [...currentConversation.messages, userMessage];
      onUpdateConversation({
        ...currentConversation,
        updatedAt: Date.now(),
        messages: updatedMessages,
      });
    }

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: trimmed,
          threadId: activeThreadId,
          conversationId: activeConvId,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to fetch response from BizFlow AI");
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

      onUpdateConversation({
        id: activeConvId || generateId(),
        title:
          currentConversation?.title ||
          (trimmed.length > 36 ? `${trimmed.substring(0, 36)}...` : trimmed),
        threadId: data.threadId || activeThreadId,
        createdAt: currentConversation?.createdAt || Date.now(),
        updatedAt: Date.now(),
        messages: finalMessages,
      });
    } catch (err: any) {
      console.error("[ChatContainer] Error sending message:", err);

      const errorMessage: ChatMessage = {
        id: generateId(),
        role: "assistant",
        content: "",
        timestamp: Date.now(),
        status: "error",
        error: "Sorry, BizFlow couldn't complete the analysis. Please try again.",
      };

      onUpdateConversation({
        id: activeConvId || generateId(),
        title: currentConversation?.title || trimmed,
        threadId: activeThreadId,
        createdAt: currentConversation?.createdAt || Date.now(),
        updatedAt: Date.now(),
        messages: [...updatedMessages, errorMessage],
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-dark-bg">
      {/* Central Messages Viewport or Welcome Screen */}
      <div className="flex-1 overflow-y-auto">
        {messages.length === 0 ? (
          <WelcomeScreen
            onSelectPrompt={handleSendMessage}
            isLoading={isLoading}
          />
        ) : (
          <div className="flex flex-col min-h-full">
            {messages.map((msg, index) => (
              <MessageBubble
                key={msg.id}
                message={msg}
                isLastMessage={index === messages.length - 1}
                onSelectSuggestion={handleSendMessage}
                isLoading={isLoading}
              />
            ))}

            {isLoading && <AnalyzingIndicator />}

            <div ref={messagesEndRef} className="h-6" />
          </div>
        )}
      </div>

      {/* Floating Chat Input */}
      <ChatInput
        input={input}
        setInput={setInput}
        onSendMessage={handleSendMessage}
        isLoading={isLoading}
      />
    </div>
  );
};
