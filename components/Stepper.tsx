"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { STEPS } from "@/lib/steps";
import { isStepComplete } from "@/lib/progress";
import { useAssessment } from "@/lib/store/useAssessment";

/**
 * The signature dependency-chain stepper (design.md § Signature element):
 * steps connected by a vertical line that FILLS with orange as the user
 * progresses — the connection is the brand. Completed steps get a regalia
 * check, the active step an orange marker, upcoming steps a quiet --sand dot.
 */
export default function Stepper() {
  const pathname = usePathname();
  const assessment = useAssessment((s) => s.assessment);

  const activeIndex = Math.max(
    0,
    STEPS.findIndex((s) => pathname.startsWith(s.path))
  );

  // Fill the connector up to the furthest of {active step, last completed step}.
  let furthest = activeIndex;
  STEPS.forEach((s, i) => {
    if (isStepComplete(s.slug, assessment) && i > furthest) furthest = i;
  });
  const fillPct = STEPS.length > 1 ? (furthest / (STEPS.length - 1)) * 100 : 0;

  return (
    <nav aria-label="Assessment steps" className="relative">
      {/* Connector track + fill */}
      <div
        className="absolute left-[15px] top-4 bottom-4 w-[2px] rounded bg-sand"
        aria-hidden
      >
        <div
          className="w-full rounded bg-orange transition-[height] duration-500 ease-out-soft"
          style={{ height: `${fillPct}%` }}
        />
      </div>

      <ol className="relative flex flex-col gap-1">
        {STEPS.map((step, i) => {
          const isActive = i === activeIndex;
          const complete = isStepComplete(step.slug, assessment);
          const state = isActive ? "active" : complete ? "complete" : "upcoming";

          return (
            <li key={step.slug}>
              <Link
                href={step.path}
                aria-current={isActive ? "step" : undefined}
                className={[
                  "group flex items-center gap-3 rounded-control px-2 py-2 transition-colors duration-150",
                  isActive ? "bg-orange-wash" : "hover:bg-panel",
                ].join(" ")}
              >
                <Marker state={state} index={i + 1} />
                <span className="flex flex-col">
                  <span
                    className={[
                      "text-sm leading-tight",
                      isActive ? "font-semibold text-ink" : "text-ink-soft",
                    ].join(" ")}
                  >
                    {step.label}
                  </span>
                  {step.optional && (
                    <span className="text-xs text-muted">Optional</span>
                  )}
                </span>
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

function Marker({ state, index }: { state: "active" | "complete" | "upcoming"; index: number }) {
  if (state === "complete") {
    return (
      <span
        className="z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-regalia-wash text-regalia ring-2 ring-canvas"
        aria-hidden
      >
        <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M4 10.5l4 4 8-9" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    );
  }
  if (state === "active") {
    return (
      <span
        className="z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange text-white shadow-card ring-2 ring-canvas"
        aria-hidden
      >
        <span className="text-xs font-semibold tnum">{index}</span>
      </span>
    );
  }
  return (
    <span
      className="z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-panel text-muted ring-2 ring-canvas"
      aria-hidden
    >
      <span className="text-xs tnum">{index}</span>
    </span>
  );
}
