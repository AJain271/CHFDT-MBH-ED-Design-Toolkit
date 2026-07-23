"use client";

import { useEffect } from "react";
import { useAssessment } from "@/lib/store/useAssessment";

/** Loads the saved assessment from localStorage before rendering the wizard,
 *  so screens never flash empty then repopulate. */
export default function HydrationGate({ children }: { children: React.ReactNode }) {
  const hydrated = useAssessment((s) => s.hydrated);
  const hydrate = useAssessment((s) => s.hydrate);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  if (!hydrated) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center text-sm text-muted">
        <span className="animate-pulse">Loading your assessment…</span>
      </div>
    );
  }
  return <>{children}</>;
}
