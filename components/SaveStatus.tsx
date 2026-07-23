"use client";

import { useAssessment } from "@/lib/store/useAssessment";

/** Autosave indicator. The "Save" action's product is a "Saved" status
 *  (design.md § Voice: an action keeps its name through the flow). */
export default function SaveStatus() {
  const status = useAssessment((s) => s.saveStatus);
  const label = status === "saving" ? "Saving…" : status === "saved" ? "Saved" : "";
  if (!label) return null;
  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-muted">
      <span
        className={[
          "h-1.5 w-1.5 rounded-full",
          status === "saving" ? "bg-maybe" : "bg-yes",
        ].join(" ")}
        aria-hidden
      />
      {label}
    </span>
  );
}
