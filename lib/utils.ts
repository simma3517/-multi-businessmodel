import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { SuggestedQuestion } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateId(): string {
  return `${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

export function formatAgentDisplayName(agent: string): string {
  const map: Record<string, string> = {
    ManagerOrchestrator: "Manager Orchestrator",
    SalesAgent: "Sales Specialist",
    FinanceAgent: "Finance Specialist",
    StockAgent: "Inventory Specialist",
    SupportAgent: "Support Specialist",
    HRAgent: "HR Specialist",
    sales: "Sales Specialist",
    finance: "Finance Specialist",
    inventory: "Inventory Specialist",
    stock: "Inventory Specialist",
    support: "Support Specialist",
    hr: "HR Specialist",
  };
  return map[agent] || `${agent.replace(/Agent$/i, "")} Specialist`;
}

export function formatTime(timestamp: number): string {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(new Date(timestamp));
}

export function groupConversationsByDate<T extends { updatedAt: number }>(
  items: T[]
): { today: T[]; yesterday: T[]; previous7Days: T[]; older: T[] } {
  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const startOfYesterday = startOfToday - 86400000;
  const startOf7DaysAgo = startOfToday - 7 * 86400000;

  const today: T[] = [];
  const yesterday: T[] = [];
  const previous7Days: T[] = [];
  const older: T[] = [];

  for (const item of items) {
    if (item.updatedAt >= startOfToday) {
      today.push(item);
    } else if (item.updatedAt >= startOfYesterday) {
      yesterday.push(item);
    } else if (item.updatedAt >= startOf7DaysAgo) {
      previous7Days.push(item);
    } else {
      older.push(item);
    }
  }

  return { today, yesterday, previous7Days, older };
}

export const RECOMMENDED_PROMPTS = [
  {
    id: "rec-1",
    text: "Why are my sales falling?",
    category: "Revenue",
    icon: "TrendingDown",
    badge: "Sales",
    subtitle: "Analyze revenue trends, pipeline drop-offs & conversion rates",
  },
  {
    id: "rec-2",
    text: "Why is my profit decreasing?",
    category: "Financials",
    icon: "CircleDollarSign",
    badge: "Finance",
    subtitle: "Inspect COGS, operating margins & cost escalations",
  },
  {
    id: "rec-3",
    text: "Which products need inventory attention?",
    category: "Operations",
    icon: "PackageSearch",
    badge: "Stock",
    subtitle: "Detect stockout risks, slow-moving items & reorder gaps",
  },
  {
    id: "rec-4",
    text: "What are the biggest risks facing my business?",
    category: "Risk & Strategy",
    icon: "Brain",
    badge: "Risk",
    subtitle: "Cross-domain audit of financial, operational & customer threats",
  },
  {
    id: "rec-5",
    text: "Give me a complete health check of my business.",
    category: "Executive Summary",
    icon: "Activity",
    badge: "Multi-Agent 360°",
    subtitle: "Comprehensive synthesis across Sales, Finance, Inventory, Support & HR",
  },
];

export const SHORT_QUERY_PILLS = [
  { label: "Sales?", query: "sales?" },
  { label: "Profit?", query: "profit?" },
  { label: "Inventory?", query: "stock?" },
  { label: "Risks?", query: "What are my biggest business risks?" },
  { label: "Health Check?", query: "Give me a complete health check of my business." },
];

export function generateSmartFollowUps(query: string, answerText: string): string[] {
  const q = query.toLowerCase();
  
  if (q.includes("sales") || q.includes("revenue") || q.includes("falling")) {
    return [
      "Which specific product is declining?",
      "How to improve sales this quarter?",
    ];
  }

  if (q.includes("profit") || q.includes("margin") || q.includes("decreasing")) {
    return [
      "Break down COGS vs OpEx",
      "Which products have highest margins?",
    ];
  }

  if (q.includes("stock") || q.includes("product") || q.includes("inventory")) {
    return [
      "Which items need immediate restocking?",
      "Which slow items should be discounted?",
    ];
  }

  if (q.includes("support") || q.includes("churn") || q.includes("customer")) {
    return [
      "Top customer complaints driving churn",
      "How to improve CSAT resolution time?",
    ];
  }

  if (q.includes("hr") || q.includes("employee") || q.includes("attendance")) {
    return [
      "Team workload distribution",
      "Overtime burnout indicators",
    ];
  }

  return [
    "What action should I prioritize first?",
    "Show department breakdown",
  ];
}
