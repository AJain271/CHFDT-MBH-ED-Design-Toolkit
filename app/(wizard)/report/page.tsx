"use client";

import { useMemo } from "react";
import Link from "next/link";
import { content } from "@/lib/content";
import { useAssessment } from "@/lib/store/useAssessment";
import { buildDatReport, formatAlignment } from "@/lib/scoring";
import CountUpPercent from "@/components/CountUpPercent";
import AlignmentBar, { alignmentTint } from "@/components/AlignmentBar";
import ReportActions from "@/components/ReportActions";

export default function ReportPage() {
  const a = useAssessment((s) => s.assessment);
  const report = useMemo(() => (a ? buildDatReport(content, a) : null), [a]);

  if (!a || !report) return null;

  const hasScores = report.rows.some((r) => r.alignmentScore !== null);

  if (!hasScores) {
    return (
      <div className="card p-8 text-center">
        <p className="text-display-sm text-ink-soft">Your report will appear here.</p>
        <p className="mx-auto mt-2 max-w-md text-muted">
          Answer the alignment questions to see your scores. Each guideline&apos;s score
          reflects how many of its strategies you&apos;ve marked{" "}
          <span className="text-yes">Yes</span>, weighted by its importance.
        </p>
        <Link
          href="/dat"
          className="mt-5 inline-flex min-h-[44px] items-center rounded-control bg-orange-deep px-4 text-sm font-medium text-white"
        >
          Go to Design Alignment →
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header + actions */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">{a.projectName || "Untitled project"}</p>
          <p className="text-sm text-muted">{a.date}</p>
        </div>
        <ReportActions assessment={a} />
      </div>

      {/* Overall hero */}
      <section className="card overflow-hidden">
        <div className="grid gap-6 p-6 sm:grid-cols-[auto_1fr] sm:items-center">
          <div className="text-center sm:text-left">
            <p className="eyebrow mb-1">Overall alignment</p>
            <div className="font-display text-display-lg leading-none text-ink-soft">
              <CountUpPercent value={report.overall.alignmentScore} />
            </div>
          </div>
          <div className="space-y-2">
            <AlignmentBar score={report.overall.alignmentScore} />
            <p className="text-sm text-muted">
              Weighted across every guideline: {report.overall.scoreObtained} of{" "}
              {report.overall.maximumScore} possible importance-weighted points.
            </p>
          </div>
        </div>
      </section>

      {/* Category roll-ups */}
      <section>
        <p className="eyebrow mb-3">By category</p>
        <div className="grid gap-3 sm:grid-cols-2">
          {report.categories.map((c) => (
            <div key={c.label} className="card p-4">
              <div className="flex items-baseline justify-between">
                <p className="text-sm font-medium text-ink">{c.label}</p>
                <span
                  className="font-display text-2xl"
                  style={{ color: alignmentTint(c.alignmentScore) }}
                >
                  <CountUpPercent value={c.alignmentScore} />
                </span>
              </div>
              <div className="mt-2">
                <AlignmentBar score={c.alignmentScore} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Per-guideline table */}
      <section>
        <p className="eyebrow mb-3">By guideline</p>
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-sand bg-panel/70 text-left">
                  <th className="px-4 py-3 font-medium text-ink-soft">Guideline</th>
                  <th className="px-4 py-3 font-medium text-ink-soft">Importance</th>
                  <th className="px-4 py-3 text-right font-medium text-ink-soft">Yes</th>
                  <th className="px-4 py-3 text-right font-medium text-ink-soft">Items</th>
                  <th className="px-4 py-3 font-medium text-ink-soft">Alignment</th>
                </tr>
              </thead>
              <tbody>
                {report.rows.map((r, i) => (
                  <tr
                    key={r.guideline}
                    className={`border-b border-sand ${i % 2 ? "bg-panel/40" : "bg-canvas"}`}
                  >
                    <td className="max-w-sm px-4 py-3">
                      <span className="text-ink">{r.guideline}</span>
                      <span className="mt-0.5 block text-xs text-muted">{r.category}</span>
                    </td>
                    <td className="px-4 py-3 text-muted">{r.importanceLabel ?? "—"}</td>
                    <td className="px-4 py-3 text-right tnum text-ink">{r.yes}</td>
                    <td className="px-4 py-3 text-right tnum text-muted">{r.totalItems}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <span
                          className="w-11 shrink-0 text-right font-medium tnum"
                          style={{ color: alignmentTint(r.alignmentScore) }}
                        >
                          {formatAlignment(r.alignmentScore)}
                        </span>
                        <div className="min-w-[80px] flex-1">
                          <AlignmentBar score={r.alignmentScore} />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <p className="mt-3 text-xs text-muted">
          Only <span className="text-yes">Yes</span> answers earn points. Not Applicable rows
          are excluded from the item count. A guideline with no scorable items shows “—”.
        </p>
      </section>
    </div>
  );
}
