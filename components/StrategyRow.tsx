"use client";

import AnswerToggle from "@/components/AnswerToggle";
import { useAssessment } from "@/lib/store/useAssessment";
import type { Strategy } from "@/lib/types";

export default function StrategyRow({ strategy }: { strategy: Strategy }) {
  const a = useAssessment((s) => s.assessment);
  const setDatAnswer = useAssessment((s) => s.setDatAnswer);
  const setDatNote = useAssessment((s) => s.setDatNote);
  const setDatConflict = useAssessment((s) => s.setDatConflict);
  if (!a) return null;

  const row = String(strategy.row);
  const answer = a.datAnswers[row];
  const note = a.datNotes?.[row] ?? "";
  const conflict = a.datConflicts?.[row] ?? "";
  const hasDetails = note.trim() !== "" || conflict.trim() !== "";

  return (
    <div className="px-5 py-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between lg:gap-6">
        <div className="min-w-0">
          <p className="text-[15px] text-ink">{strategy.strategy}</p>
          <span className="mt-1.5 inline-block rounded-full border border-sand bg-canvas px-2 py-0.5 text-xs text-muted">
            {strategy.design_feature_category}
          </span>
        </div>
        <div className="shrink-0">
          <AnswerToggle
            label={strategy.strategy}
            value={answer}
            onChange={(v) => setDatAnswer(strategy.row, v)}
          />
        </div>
      </div>

      <details className="mt-2 group" open={hasDetails}>
        <summary className="cursor-pointer list-none text-xs text-regalia hover:underline">
          <span className="group-open:hidden">+ Add notes or conflicts</span>
          <span className="hidden group-open:inline">Notes &amp; conflicts</span>
        </summary>
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          <textarea
            className="field min-h-[52px] resize-y text-sm"
            placeholder="Notes"
            value={note}
            onChange={(e) => setDatNote(strategy.row, e.target.value)}
          />
          <textarea
            className="field min-h-[52px] resize-y text-sm"
            placeholder="Conflicts / trade-offs"
            value={conflict}
            onChange={(e) => setDatConflict(strategy.row, e.target.value)}
          />
        </div>
      </details>
    </div>
  );
}
