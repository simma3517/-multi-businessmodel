import React from "react";
import { TrendingUp, CircleDollarSign, Package, Headphones, Users, CheckCircle2, Bot } from "lucide-react";

export const AgentsSection: React.FC = () => {
  const agents = [
    {
      name: "SalesAgent",
      role: "Revenue & Pipelines",
      desc: "Understand sales trends, product performance, and revenue movement across customer segments.",
      icon: <TrendingUp className="w-5 h-5 text-rose-400" />,
      tag: "Sales Intelligence",
      capabilities: ["Conversion attribution", "Deal cycle velocity", "Regional sales diagnostics"],
      border: "border-rose-900/40",
      badgeBg: "bg-rose-950/40 text-rose-300 border-rose-800/50",
    },
    {
      name: "FinanceAgent",
      role: "Margins & Runway",
      desc: "Analyze revenue, expenses, profitability, and financial trends to optimize unit economics.",
      icon: <CircleDollarSign className="w-5 h-5 text-emerald-400" />,
      tag: "Financial Audit",
      capabilities: ["COGS & gross margin tracking", "Cash flow forecasting", "Expense variance audits"],
      border: "border-emerald-900/40",
      badgeBg: "bg-emerald-950/40 text-emerald-300 border-emerald-800/50",
    },
    {
      name: "StockAgent",
      role: "Inventory & Supply",
      desc: "Monitor inventory levels, product demand, and potential stock constraints to prevent revenue loss.",
      icon: <Package className="w-5 h-5 text-amber-400" />,
      tag: "Supply Chain",
      capabilities: ["Stockout alert prediction", "Slow-moving inventory audit", "Supplier reorder timeline"],
      border: "border-amber-900/40",
      badgeBg: "bg-amber-950/40 text-amber-300 border-amber-800/50",
    },
    {
      name: "SupportAgent",
      role: "Customer Sentiment",
      desc: "Understand customer complaints, order escalations, and service issues impacting client retention.",
      icon: <Headphones className="w-5 h-5 text-sky-400" />,
      tag: "Customer Care",
      capabilities: ["Ticket sentiment analysis", "Bug & defect escalation", "CSAT satisfaction metrics"],
      border: "border-sky-900/40",
      badgeBg: "bg-sky-950/40 text-sky-300 border-sky-800/50",
    },
    {
      name: "HRAgent",
      role: "Workforce & Talent",
      desc: "Analyze attendance patterns, team velocity, and staffing information to maintain peak productivity.",
      icon: <Users className="w-5 h-5 text-indigo-400" />,
      tag: "Human Capital",
      capabilities: ["Attendance trend audit", "Workforce capacity planning", "Department workload balance"],
      border: "border-indigo-900/40",
      badgeBg: "bg-indigo-950/40 text-indigo-300 border-indigo-800/50",
    },
  ];

  return (
    <section id="agents" className="py-20 md:py-28 bg-[#0D111A]/80 border-y border-white/[0.06] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-bizflow-400">
            Autonomous Specialists
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Meet Your Business AI Team
          </h2>
          <p className="text-base text-slate-400 font-normal">
            One manager. Five specialists. One unified answer.
          </p>
        </div>

        {/* 5 Professional Agent Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.map((agent, index) => (
            <div
              key={index}
              className={`p-6 rounded-2xl bg-dark-card/90 border ${agent.border} flex flex-col justify-between space-y-5 shadow-xl shadow-black/20 hover:border-bizflow-500/40 transition-all duration-300 group`}
            >
              <div className="space-y-4">
                {/* Header with Icon & Tag */}
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-xl bg-dark-bg border border-white/[0.08] shadow-inner group-hover:scale-105 transition-transform">
                    {agent.icon}
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border ${agent.badgeBg}`}>
                    {agent.tag}
                  </span>
                </div>

                {/* Agent Name & Description */}
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-bizflow-200 transition-colors">
                    {agent.name}
                  </h3>
                  <span className="text-xs font-semibold text-slate-400 block mb-2">
                    {agent.role}
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {agent.desc}
                  </p>
                </div>
              </div>

              {/* Capabilities checklist */}
              <div className="pt-4 border-t border-white/[0.06] space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                  Core Analytics
                </span>
                <div className="space-y-1.5">
                  {agent.capabilities.map((cap, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-400">
                      <CheckCircle2 className="w-3.5 h-3.5 text-bizflow-400 shrink-0" />
                      <span>{cap}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {/* 6th Card: ManagerOrchestrator Overview */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-bizflow-950/60 via-dark-card to-dark-card border border-bizflow-500/30 flex flex-col justify-between space-y-5 shadow-2xl">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-xl bg-bizflow-500/20 border border-bizflow-500/40 text-bizflow-300 shadow-inner">
                  <Bot className="w-5 h-5 text-bizflow-300" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-bizflow-500/20 text-bizflow-300 border border-bizflow-500/40">
                  Central Orchestrator
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white">
                  ManagerOrchestrator
                </h3>
                <span className="text-xs font-semibold text-bizflow-400 block mb-2">
                  Azure AI Foundry Agent Engine
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Decides which specialists to consult, routes queries via A2A protocols, and synthesizes multi-dimensional findings into one actionable response.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-bizflow-800/40 space-y-2">
              <div className="text-[11px] font-semibold text-bizflow-200 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-bizflow-400 animate-pulse"></span>
                <span>Coordinates All 5 Specialists Simultaneously</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
