export type AgentName =
  | "ManagerOrchestrator"
  | "SalesAgent"
  | "FinanceAgent"
  | "StockAgent"
  | "SupportAgent"
  | "HRAgent"
  | string;

export interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: number;
  agentsUsed?: string[];
  followUpQuestions?: string[];
  status?: "pending" | "streaming" | "completed" | "error";
  error?: string;
  threadId?: string;
}

export interface ChatRequest {
  message: string;
  threadId?: string;
  conversationId?: string;
}

export interface ChatResponse {
  answer: string;
  agentsUsed: string[];
  followUpQuestions: string[];
  threadId?: string;
}

export interface Conversation {
  id: string;
  title: string;
  threadId?: string;
  createdAt: number;
  updatedAt: number;
  messages: ChatMessage[];
}

export interface SuggestedQuestion {
  id: string;
  text: string;
  category: "Sales" | "Profit" | "Stock" | "Risks" | "Strategy" | "HR" | "Support" | "FinTech" | "General";
  icon: string;
  badge?: string;
}

export interface AzureFoundryConfig {
  projectEndpoint: string;
  apiKey?: string;
  agentName: string;
  tenantId?: string;
  clientId?: string;
  clientSecret?: string;
  demoMode: boolean;
}
