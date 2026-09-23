"use client";

import React from "react";
import Link from "next/link";
import { Sparkles } from "lucide-react";

interface FooterProps {
  onSelectTab?: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  return (
    <footer className="w-full border-t border-[#1A2234] py-6 px-4 sm:px-6 lg:px-8 bg-[#080A10]/95 backdrop-blur-md text-slate-400 text-xs w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
        {/* Brand & Copyright */}
        <div className="flex items-center gap-2.5">
          <div className="w-5 h-5 rounded-md bg-[#101726] border border-[#1E293B] flex items-center justify-center text-cyan-400">
            <Sparkles className="w-3 h-3" />
          </div>
          <span className="font-bold text-white tracking-tight">
            SYNORA
          </span>
          <span className="text-slate-500 font-mono text-[11px] ml-1 sm:ml-2">
            © 2026 Synchronized Intelligence &amp; Multi-Agent Mesh
          </span>
        </div>

        {/* Footer Links */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-slate-400 text-xs">
          <Link href="/assistant" className="hover:text-white transition-colors">
            AI Assistant
          </Link>
          <button
            onClick={() => onSelectTab?.("architecture")}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Architecture
          </button>
          <a
            href="#specialists"
            className="hover:text-white transition-colors cursor-pointer"
          >
            5 Specialists
          </a>
        </div>
      </div>
    </footer>
  );
};
