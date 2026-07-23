"use client";

import { useMemo } from "react";
import { content, config } from "@/lib/content";
import { useAssessment } from "@/lib/store/useAssessment";
import { rankObjectives, objectiveValue } from "@/lib/scoring";
import ImportanceSelect from "@/components/ImportanceSelect";
import StepNav from "@/components/StepNav";

export default function OutcomesPage() {
  const a = useAssessment((s) => s.assessment);
  const setOutcomeImportance = useAssessment((s) => s.setOutcomeImportance);

  const objectives = content.outcome_prioritization.objectives;
  const ranked = useMemo(
    () => (a ? rankObjectives(config, objectives, a.outcomeImportance) : []),
    [a, objectives]
  );

  if (!a) return null;

  const positionOf = new Map(ranked.map((r) => [r.objective, r]));
  const anyRated = Object.values(a.outcomeImportance).some((v) => v && v.trim() !== "");

  return (
    <div className="space-y-6">
      {/* Live ranking readout */}
      <div className="card p-5">
        <p className="eyebrow mb-3">Live objective ranking</p>
        {anyRated ? (
          <ol className="space-y-2">
            {ranked.map((r) => (
              <li key={r.objective} className="flex items-center gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-regalia-wash text-xs font-semibold text-regalia tnum">
                  {r.position}
                </span>
                <span className="flex-1 text-sm text-ink">{r.objective}</span>
                <span className="tnum text-sm text-muted">{r.value.toFixed(2)}</span>
                <div className="hidden h-1.5 w-24 overflow-hidden rounded bg-sand sm:block">
                  <div
                    className="h-full rounded bg-orange transition-[width] duration-300 ease-out-soft"
                    style={{ width: `${(r.value / 5) * 100}%` }}
                  />
                </div>
              </li>
            ))}
          </ol>
        ) : (
          <p className="text-sm text-muted">
            Rate the outcomes below to rank your six design objectives. The ranking updates
            as you go, and feeds the guideline priorities in the next step.
          </p>
        )}
      </div>

      {/* Objectives with their outcomes */}
      {objectives.map((obj) => {
        const r = positionOf.get(obj.objective);
        const val = objectiveValue(config, obj, a.outcomeImportance);
        return (
          <section key={obj.objective} className="card overflow-hidden">
            <header className="flex items-center justify-between gap-3 border-b border-sand bg-panel/70 px-5 py-3">
              <div className="flex items-center gap-3">
                {r && anyRated && (
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-wash text-xs font-semibold text-orange-deep tnum">
                    {r.position}
                  </span>
                )}
                <h2 className="text-display-sm">{obj.objective}</h2>
              </div>
              <span className="tnum whitespace-nowrap text-sm text-muted">
                value {val.toFixed(2)}
              </span>
            </header>

            <div className="divide-y divide-sand">
              {obj.outcomes.map((o) => (
                <div key={o.row} className="px-5 py-4">
                  <p className="text-[15px] font-medium text-ink">{o.outcome}</p>
                  <p className="mt-1 text-sm text-muted">{o.description}</p>
                  <div className="mt-3">
                    <ImportanceSelect
                      label={`Importance of ${o.outcome}`}
                      value={a.outcomeImportance[String(o.row)] ?? ""}
                      onChange={(label) => setOutcomeImportance(o.row, label)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        );
      })}

      <StepNav slug="outcomes" />
    </div>
  );
}
