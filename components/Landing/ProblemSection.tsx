import React from "react";
import { TrendingDown, CircleDollarSign, PackageX, MessageSquareWarning, UserMinus, ShieldAlert, ArrowRight } from "lucide-react";

export const ProblemSection: React.FC = () => {
  const silos = [
    {
      title: "Sales Silos",
      desc: "Revenue slips due to unmonitored lead drops and deal cycle delays without cross-departmental context.",
      icon: <TrendingDown className="w-5 h-5 text-rose-400" />,
      border: "border-rose-500/30",
      accent: "from-rose-500/10",
      pill: "Pipeline Blindspot",
    },
    {
      title: "Finance Gaps",
      desc: "Profit margins erode quietly under unexpected supplier freight surcharges and hidden overhead creep.",
      icon: <CircleDollarSign className="w-5 h-5 text-emerald-400" />,
      border: "border-emerald-500/30",
      accent: "from-emerald-500/10",
      pill: "COGS Drift",
    },
    {
      title: "Stockout Friction",
      desc: "Top revenue SKUs run out of stock while slow movers tie up hundreds of thousands in working capital.",
      icon: <PackageX className="w-5 h-5 text-amber-400" />,
      border: "border-amber-500/30",
      accent: "from-amber-500/10",
      pill: "Working Capital Trap",
    },
    {
      title: "Support Escalations",
      desc: "Customer dissatisfaction signals and bug clusters build up without alerting executive leadership early.",
      icon: <MessageSquareWarning className="w-5 h-5 text-cyan-400" />,
      border: "border-cyan-500/30",
      accent: "from-cyan-500/10",
      pill: "Silent Churn Risk",
    },
    {
      title: "Workforce Strain",
      desc: "Departmental burnout, overtime spikes, and staffing bottlenecks throttle organizational sprint delivery.",
      icon: <UserMinus className="w-5 h-5 text-indigo-400" />,
      border: "border-indigo-500/30",
      accent: "from-indigo-500/10",
      pill: "Burnout Velocity",
    },
  ];

  return (
    <section className="py-24 md:py-32 relative border-t border-white/[0.08] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/25 text-xs font-mono text-rose-300">
            <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
            <span>The Enterprise Data Crisis</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Your Business Data is Fragmented. <br />
            <span className="bg-gradient-to-r from-rose-300 via-amber-200 to-cyan-300 bg-clip-text text-transparent">
              SYNORA Bridges the Silos.
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Isolated dashboards fail because business problems never stay in one department. A drop in sales is caused by a stockout, which strains cash flow and spikes support tickets.
          </p>
        </div>

        {/* 5 Domain Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {silos.map((silo, index) => (
            <div
              key={index}
              className={`p-5 rounded-3xl bg-gradient-to-b ${silo.accent} via-[#0D121F] to-[#07090F] border ${silo.border} flex flex-col justify-between space-y-4 hover:-translate-y-1 transition-all duration-200 shadow-xl group`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-xl bg-white/[0.05] border border-white/[0.08] w-fit">
                    {silo.icon}
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/[0.05] text-slate-400 border border-white/[0.06]">
                    {silo.pill}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-white tracking-tight">{silo.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{silo.desc}</p>
              </div>

              <div className="pt-3 border-t border-white/[0.06] text-[11px] font-mono text-cyan-400 flex items-center gap-1">
                <span>Unified by SYNORA</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
