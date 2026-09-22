import React from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  TrendingDown,
  CircleDollarSign,
  Package,
  AlertTriangle,
  Activity,
  Users,
  Sparkles,
} from "lucide-react";

export const ExampleQuestionsSection: React.FC = () => {
  const questions = [
    {
      text: "Why are my sales falling despite high marketing spend?",
      desc: "Decomposes acquisition channel ROI, customer conversion velocity, and churn attribution.",
      icon: <TrendingDown className="w-4 h-4 text-rose-400" />,
      domain: "Sales & Acquisition",
      agents: ["Sales", "Finance"],
    },
    {
      text: "Why is net profit compressing while gross revenue is at record high?",
      desc: "Audits COGS variance, supplier freight surcharges, and discounting margin leakage.",
      icon: <CircleDollarSign className="w-4 h-4 text-emerald-400" />,
      domain: "Unit Economics",
      agents: ["Finance", "Inventory"],
    },
    {
      text: "Which high-margin products need immediate inventory attention?",
      desc: "Flags low-stock top revenue SKUs and identifies capital tied in obsolete batches.",
      icon: <Package className="w-4 h-4 text-amber-400" />,
      domain: "Supply Chain",
      agents: ["Inventory", "Sales"],
    },
    {
      text: "What are the biggest operational risks facing my business right now?",
      desc: "Holistic multi-agent stress test synthesizing all five business domains concurrently.",
      icon: <AlertTriangle className="w-4 h-4 text-purple-400" />,
      domain: "Executive Strategy",
      agents: ["Sales", "Finance", "Inventory", "Support", "HR"],
    },
    {
      text: "Give me a complete 360° health check of my company.",
      desc: "Full executive synthesis across sales velocity, margins, inventory buffers, and CSAT.",
      icon: <Activity className="w-4 h-4 text-cyan-400" />,
      domain: "Executive Audit",
      agents: ["All 5 Specialists"],
    },
    {
      text: "How is engineering workload and overtime impacting project delivery?",
      desc: "Correlates team velocity, sprint completion rates, and developer burnout signals.",
      icon: <Users className="w-4 h-4 text-indigo-400" />,
      domain: "Workforce & Talent",
      agents: ["HR", "Support"],
    },
  ];

  return (
    <section id="scenarios" className="py-24 md:py-32 relative border-t border-white/[0.08] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-xs font-mono text-emerald-300">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Pre-Engineered Scenarios</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Ask Better Questions. <br />
            <span className="bg-gradient-to-r from-emerald-300 via-cyan-300 to-indigo-300 bg-clip-text text-transparent">
              Receive Executive Clarity.
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            SYNORA understands the complex context of C-suite decision-making. Try any scenario directly in the live workspace.
          </p>
        </div>

        {/* 6 Example Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {questions.map((q, index) => (
            <Link
              key={index}
              href={`/workspace?prompt=${encodeURIComponent(q.text)}`}
              className="group p-6 rounded-3xl bg-gradient-to-b from-[#111728] to-[#0A0E17] border border-white/[0.08] hover:border-indigo-500/40 flex flex-col justify-between space-y-4 shadow-xl hover:-translate-y-1 transition-all duration-200"
            >
              <div className="space-y-3.5">
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-2xl bg-white/[0.04] border border-white/[0.06]">
                    {q.icon}
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/[0.04] text-slate-400 border border-white/[0.06]">
                    {q.domain}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                  &ldquo;{q.text}&rdquo;
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {q.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400">
                  <span>Agents:</span>
                  <span className="text-slate-300 font-medium">
                    {q.agents.join(" · ")}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-cyan-400 font-semibold group-hover:text-cyan-300">
                  <span className="text-[11px]">Analyze</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
