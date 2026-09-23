"use client";

import React, { Suspense } from "react";
import { AssistantWorkspace } from "@/components/Assistant/AssistantWorkspace";

export default function AssistantPage() {
  return (
    <Suspense
      fallback={
        <div className="h-screen h-[100dvh] w-full max-w-full bg-[#0B0F17] flex items-center justify-center text-slate-400 text-xs font-mono">
          <span className="animate-pulse">Loading SYNORA AI Assistant...</span>
        </div>
      }
    >
      <AssistantWorkspace />
    </Suspense>
  );
}
