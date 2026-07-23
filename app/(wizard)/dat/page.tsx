"use client";

import { useMemo } from "react";
import { content, config } from "@/lib/content";
import { useAssessment } from "@/lib/store/useAssessment";
import { rankObjectives, reviewedImportanceLabel } from "@/lib/scoring";
import StrategyRow from "@/components/StrategyRow";
import StepNav from "@/components/StepNav";
import type { Strategy, Guideline } from "@/lib/types";

export default function DatPage() {
  const a = useAssessment((s) => s.assessment);

  const strategies = content.design_alignment.strategies;
  const ranked = useMemo(
    () =>
      a ? rankObjectives(config, content.outcome_prioritization.objectives, a.outcomeImportance) : [],
    [a]
  );

  if (!a) return null;

  // Guideline lookup for importance labels.
  const guidelineByName = new Map<string, Guideline>();
  for (const g of content.guideline_prioritization.guidelines) {
    guidelineByName.set(g.guideline.trim().toLowerCase(), g);
  }

  // Group strategies: category -> guideline -> strategies (preserve order).
  const groups: {
    category: string;
    guidelines: { guideline: string; items: Strategy[] }[];
  }[] = [];
  for (const s of strategies) {
    let cat = groups.find((g) => g.category === s.category);
    if (!cat) {
      cat = { category: s.category, guidelines: [] };
      groups.push(cat);
    }
    let gl = cat.guidelines.find((g) => g.guideline === s.guideline);
    if (!gl) {
      gl = { guideline: s.guideline, items: [] };
      cat.guidelines.push(gl);
    }
    gl.items.push(s);
  }

  const answered = Object.keys(a.datAnswers).length;
  const total = strategies.length;

  return (
    <div className="space-y-6">
      <div className="card flex flex-wrap items-center justify-between gap-3 p-4">
        <p className="text-sm text-ink-soft">
          Mark how your design implements each strategy. Only{" "}
          <span className="font-medium text-yes">Yes</span> counts toward the alignment
          score; <span className="text-na">N/A</span> is excluded entirely.
        </p>
        <span className="tnum whitespace-nowrap text-sm text-muted">
          {answered} of {total} answered
        </span>
      </div>

      {groups.map((cat) => (
        <section key={cat.category} className="space-y-4">
          <h2 className="text-display-sm">{cat.category}</h2>
          {cat.guidelines.map((gl) => {
            const g = guidelineByName.get(gl.guideline.trim().toLowerCase());
            const importance = g
              ? reviewedImportanceLabel(config, g, ranked, a.guidelineReview[String(g.row)])
              : null;
            return (
              <div key={gl.guideline} className="card overflow-hidden">
                <header className="flex flex-wrap items-center justify-between gap-2 border-b border-sand bg-panel/70 px-5 py-3">
                  <h3 className="text-[15px] font-semibold text-ink">{gl.guideline}</h3>
                  {importance && (
                    <span className="rounded-full bg-orange-wash px-2.5 py-0.5 text-xs font-medium text-orange-deep">
                      {importance}
                    </span>
                  )}
                </header>
                <div className="divide-y divide-sand">
                  {gl.items.map((s) => (
                    <StrategyRow key={s.row} strategy={s} />
                  ))}
                </div>
              </div>
            );
          })}
        </section>
      ))}

      <StepNav slug="dat" />
    </div>
  );
}
