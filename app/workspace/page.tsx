"use client";

import React, { Suspense } from "react";
import { AssistantWorkspace } from "@/components/Assistant/AssistantWorkspace";

export default function WorkspacePage() {
  return (
    <Suspense
      fallback={
        <div className="h-screen w-screen bg-[#0B0F17] flex items-center justify-center text-slate-400 text-xs font-mono">
          <span className="animate-pulse">Loading BIZFLOW AI Assistant...</span>
        </div>
      }
    >
      <AssistantWorkspace />
    </Suspense>
  );
}
