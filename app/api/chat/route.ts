import { NextRequest, NextResponse } from "next/server";
import { azureFoundryService } from "@/lib/azure/foundry";
import { ChatRequest, ChatResponse } from "@/lib/types";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as ChatRequest;

    if (!body || typeof body.message !== "string" || !body.message.trim()) {
      return NextResponse.json(
        { error: "Message is required and must be a non-empty string." },
        { status: 400 }
      );
    }

    const cleanMessage = body.message.trim();
    const threadId = body.threadId;

    // Call Azure Foundry Agent Service (or demo handler if unconfigured)
    const response: ChatResponse = await azureFoundryService.sendMessage(
      cleanMessage,
      threadId
    );

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("[API/chat] Error processing request:", error);
    
    // Return sanitized message, never exposing secrets or internal traces
    return NextResponse.json(
      {
        error: "Sorry, BizFlow couldn't complete the analysis. Please try again.",
        answer: "Sorry, BizFlow couldn't complete the analysis. Please try again.",
        agentsUsed: [],
        followUpQuestions: [
          "Why are my sales falling?",
          "Why is my profit decreasing?",
          "Which products need attention?",
        ],
      },
      { status: 500 }
    );
  }
}
