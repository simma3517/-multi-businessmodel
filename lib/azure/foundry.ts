import { AzureFoundryConfig, ChatResponse } from "../types";
import { generateSmartFollowUps, formatAgentDisplayName } from "../utils";

interface ConversationHistoryStore {
  [threadId: string]: Array<{ role: "system" | "user" | "assistant"; content: string }>;
}

// In-memory server-side thread store for multi-turn conversational context
const threadMemory: ConversationHistoryStore = {};

/**
 * Azure AI Foundry Agent Service Client
 * 
 * Securely communicates with the Microsoft Azure AI Foundry endpoint.
 * Synthesizes business queries across specialized agents:
 * SalesAgent, FinanceAgent, StockAgent, SupportAgent, HRAgent.
 */
class AzureFoundryService {
  private openaiEndpoint: string;
  private projectEndpoint: string;
  private apiKey: string;
  private deploymentName: string;
  private agentName: string;
  private isDemoMode: boolean;

  constructor() {
    this.openaiEndpoint =
      process.env.AZURE_AI_FOUNDRY_OPENAI_ENDPOINT ||
      "https://simranjit-bizflow-ai103-260921.services.ai.azure.com/openai/v1";
    this.projectEndpoint =
      process.env.AZURE_AI_FOUNDRY_PROJECT_ENDPOINT ||
      "https://simranjit-bizflow-ai103-260921.services.ai.azure.com/api/projects/bizflow-multi-agent";
    this.apiKey = process.env.AZURE_AI_FOUNDRY_API_KEY || "";
    this.deploymentName = process.env.AZURE_AI_FOUNDRY_DEPLOYMENT_NAME || "bizflow-model";
    this.agentName = process.env.AZURE_AI_FOUNDRY_AGENT_NAME || "ManagerOrchestrator";
    this.isDemoMode = process.env.DEMO_MODE === "true" || !this.apiKey;
  }

  /**
   * Main entry point to send a message to ManagerOrchestrator
   */
  public async sendMessage(
    message: string,
    existingThreadId?: string
  ): Promise<ChatResponse> {
    if (this.isDemoMode) {
      return this.handleDemoResponse(message, existingThreadId);
    }

    try {
      return await this.executeAzureFoundryChat(message, existingThreadId);
    } catch (error) {
      console.error("[AzureFoundryService] Error calling Azure Foundry:", error);
      throw new Error("Sorry, BizFlow couldn't complete the analysis. Please try again.");
    }
  }

  /**
   * Communicates with Azure AI Foundry Endpoint
   */
  private async executeAzureFoundryChat(
    message: string,
    existingThreadId?: string
  ): Promise<ChatResponse> {
    const threadId = existingThreadId || `thread_az_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    // Initialize conversation memory with system instruction if new thread
    if (!threadMemory[threadId]) {
      threadMemory[threadId] = [
        {
          role: "system",
          content: `You are Manager Orchestrator, the central AI orchestration brain of SYNORA.
You coordinate specialized agents across Sales, Finance, Inventory, Support, and HR to provide concise, executive-grade business analysis.

Guidelines:
1. Keep responses clear, direct, and concise (do not write overwhelming essays).
2. Structure your answer with clear markdown:
   - **Summary**: 2-3 direct sentences answering the user.
   - **Key Drivers**: 2-3 concise bullet points identifying root causes.
   - **Recommended Next Steps**: 2-3 practical, high-impact actions (keep them short and actionable).
3. Mention which specialists were consulted (e.g. Sales, Finance).
4. Never output raw JSON, system traces, or verbose filler.`,
        },
      ];
    }

    // Append user message
    threadMemory[threadId].push({
      role: "user",
      content: message,
    });

    // Keep memory bounded to last 12 turns for performance
    if (threadMemory[threadId].length > 12) {
      threadMemory[threadId] = [
        threadMemory[threadId][0],
        ...threadMemory[threadId].slice(-10),
      ];
    }

    const endpointUrl = `${this.openaiEndpoint.replace(/\/$/, "")}/chat/completions`;

    const res = await fetch(endpointUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": this.apiKey,
      },
      body: JSON.stringify({
        model: this.deploymentName,
        messages: threadMemory[threadId],
        temperature: 0.7,
      }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error(`[AzureFoundry] HTTP ${res.status}:`, errorText);
      throw new Error(`Azure AI Foundry returned status ${res.status}`);
    }

    const data = await res.json();
    const answer = data.choices?.[0]?.message?.content || "No response received from ManagerOrchestrator.";

    // Store assistant response in thread memory
    threadMemory[threadId].push({
      role: "assistant",
      content: answer,
    });

    // Inspect the real response text for agents involved
    const agentsUsed = this.detectAgentsFromResponse(answer);

    // Generate contextual follow-up questions
    const followUpQuestions = generateSmartFollowUps(message, answer);

    return {
      answer,
      agentsUsed,
      followUpQuestions,
      threadId,
    };
  }

  /**
   * Detects which specialized agents were referenced or consulted in the real answer.
   * If none are found, returns [] (strictly never inventing agents).
   */
  private detectAgentsFromResponse(answerText: string): string[] {
    const agents: string[] = [];
    const text = answerText.toLowerCase();

    if (/salesagent|\bsales\b/i.test(text) && !agents.includes("SalesAgent")) {
      agents.push("SalesAgent");
    }
    if (/financeagent|\bfinance\b|\bprofit\b|\bfinancial\b/i.test(text) && !agents.includes("FinanceAgent")) {
      agents.push("FinanceAgent");
    }
    if (/stockagent|\bstock\b|\binventory\b/i.test(text) && !agents.includes("StockAgent")) {
      agents.push("StockAgent");
    }
    if (/supportagent|\bsupport\b|\bcustomer service\b/i.test(text) && !agents.includes("SupportAgent")) {
      agents.push("SupportAgent");
    }
    if (/hragent|\bhr\b|\battendance\b|\bworkforce\b/i.test(text) && !agents.includes("HRAgent")) {
      agents.push("HRAgent");
    }

    return agents;
  }

  /**
   * Clean DEMO response handler for offline development
   */
  private async handleDemoResponse(
    message: string,
    existingThreadId?: string
  ): Promise<ChatResponse> {
    await new Promise((r) => setTimeout(r, 1200));
    const threadId = existingThreadId || `thread_demo_${Date.now()}`;
    const followUps = generateSmartFollowUps(message, "");
    
    // Determine relevant agents from the user prompt
    const msg = message.toLowerCase();
    const agentsUsed: string[] = [];
    if (/sale|revenue|lead|deal|customer acquisition/i.test(msg)) agentsUsed.push("SalesAgent");
    if (/profit|margin|cogs|cost|expense|burn/i.test(msg)) agentsUsed.push("FinanceAgent");
    if (/stock|inventory|sku|supplier|shipping|lead time/i.test(msg)) agentsUsed.push("StockAgent");
    if (/support|ticket|csat|sentiment|complaint|churn/i.test(msg)) agentsUsed.push("SupportAgent");
    if (/hr|employee|attendance|team|capacity|workload/i.test(msg)) agentsUsed.push("HRAgent");
    
    if (agentsUsed.length === 0) {
      agentsUsed.push("SalesAgent", "FinanceAgent");
    }

    const answer = `### Executive Summary
SYNORA coordinated **${agentsUsed.map((a) => formatAgentDisplayName(a)).join(" and ")}** to evaluate your inquiry: **"${message}"**.

- **Key Findings**: Direct analysis of telemetry shows a 14% variance in primary performance drivers. Cross-domain correlations between revenue velocity and operational lead times were verified.
- **Recommended Action**: Reallocate budget towards top-converting acquisition channels and adjust safety buffers on fast-moving SKUs.`;

    return {
      answer,
      agentsUsed,
      followUpQuestions: followUps,
      threadId,
    };
  }
}

export const azureFoundryService = new AzureFoundryService();
