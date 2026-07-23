"use client";

import { useMemo } from "react";
import { content, config } from "@/lib/content";
import { useAssessment } from "@/lib/store/useAssessment";
import { rankObjectives, guidelineDerivedImportance } from "@/lib/scoring";
import StepNav from "@/components/StepNav";

export default function GuidelinesPage() {
  const a = useAssessment((s) => s.assessment);
  const setGuidelineReview = useAssessment((s) => s.setGuidelineReview);

  const guidelines = content.guideline_prioritization.guidelines;
  const ranked = useMemo(
    () => (a ? rankObjectives(config, content.outcome_prioritization.objectives, a.outcomeImportance) : []),
    [a]
  );

  if (!a) return null;

  const rated = Object.values(a.outcomeImportance).some((v) => v && v.trim() !== "");

  // Group guidelines by category, preserving order.
  const groups: { category: string; rows: typeof guidelines }[] = [];
  for (const g of guidelines) {
    let grp = groups.find((x) => x.category === g.category);
    if (!grp) {
      grp = { category: g.category, rows: [] };
      groups.push(grp);
    }
    grp.rows.push(g);
  }

  return (
    <div className="space-y-6">
      {!rated && (
        <div className="card border-orange/40 bg-orange-wash/50 p-4 text-sm text-ink-soft">
          These importances are derived from your outcome priorities. Rate some outcomes in
          the previous step to see them fill in — you can still override any value here.
        </div>
      )}

      {groups.map((group) => (
        <section key={group.category} className="card overflow-hidden">
          <header className="border-b border-sand bg-panel/70 px-5 py-3">
            <h2 className="text-display-sm">{group.category}</h2>
          </header>

          <div className="divide-y divide-sand">
            {group.rows.map((g) => {
              const derived = guidelineDerivedImportance(config, g, ranked);
              const override = a.guidelineReview[String(g.row)] ?? "";
              return (
                <div
                  key={g.row}
                  className="grid gap-3 px-5 py-4 sm:grid-cols-[1fr_auto] sm:items-start sm:gap-6"
                >
                  <div>
                    <p className="text-[15px] font-medium text-ink">{g.guideline}</p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {g.related_objectives.map((o) => (
                        <span
                          key={o}
                          className="rounded-full bg-regalia-wash px-2 py-0.5 text-xs text-regalia"
                        >
                          {o}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="sm:w-64">
                    <p className="text-xs text-muted">
                      Derived importance:{" "}
                      <span className="font-medium text-ink-soft">
                        {derived.label ?? "—"}
                      </span>
                    </p>
                    <label className="mt-1.5 block">
                      <span className="sr-only">Review importance for {g.guideline}</span>
                      <select
                        className="field"
                        value={override}
                        onChange={(e) => setGuidelineReview(g.row, e.target.value)}
                      >
                        <option value="">Use derived ({derived.label ?? "—"})</option>
                        {config.dropdowns.importance.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      ))}

      <StepNav slug="guidelines" />
    </div>
  );
}
