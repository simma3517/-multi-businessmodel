"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface NavbarProps {
  onSelectTab?: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onSelectTab }) => {
  return (
    <header className="w-full bg-[#080A10]/95 backdrop-blur-md border-b border-[#1A2234] py-3.5 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-md bg-white text-[#080A10] font-black text-xs flex items-center justify-center shadow-sm">
            S
          </div>
          <span className="text-sm font-bold tracking-tight text-white">
            SYNORA
          </span>
          <span className="text-[11px] font-mono text-slate-400 hidden sm:inline border-l border-slate-700 pl-2 ml-0.5">
            Multi-Agent Intelligence
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-slate-300">
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
        </nav>

        {/* Launch Action */}
        <div className="flex items-center gap-3">
          <Link
            href="/assistant"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white text-[#080A10] hover:bg-slate-200 text-xs font-semibold shadow-sm transition-all"
          >
            <span>Launch Assistant</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </header>
  );
};
