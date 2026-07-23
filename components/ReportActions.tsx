"use client";

import { Button } from "@/components/ui/Button";
import type { Assessment } from "@/lib/types";

/** Export controls for the report. Print-to-PDF uses the browser's own dialog
 *  (dedicated report route); JSON export saves the raw assessment for backup. */
export default function ReportActions({ assessment }: { assessment: Assessment }) {
  const exportJson = () => {
    const blob = new Blob([JSON.stringify(assessment, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const safe = (assessment.projectName || "assessment").replace(/[^\w.-]+/g, "-");
    link.href = url;
    link.download = `${safe}-alignment.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-wrap gap-2 print:hidden">
      <Button variant="primary" onClick={() => window.print()}>
        Print / save as PDF
      </Button>
      <Button variant="secondary" onClick={exportJson}>
        Export data (JSON)
      </Button>
    </div>
  );
}
