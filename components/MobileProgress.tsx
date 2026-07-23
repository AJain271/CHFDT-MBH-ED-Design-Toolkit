"use client";

import { usePathname } from "next/navigation";
import { STEPS } from "@/lib/steps";

/** On mobile the left rail collapses to a slim top progress bar
 *  (design.md § Layout). */
export default function MobileProgress() {
  const pathname = usePathname();
  const activeIndex = Math.max(0, STEPS.findIndex((s) => pathname.startsWith(s.path)));
  const pct = ((activeIndex + 1) / STEPS.length) * 100;
  const step = STEPS[activeIndex];

  return (
    <div className="lg:hidden">
      <div className="flex items-center justify-between px-4 pb-2 pt-1 text-xs">
        <span className="font-medium text-ink-soft">{step?.label}</span>
        <span className="tnum text-muted">
          Step {activeIndex + 1} of {STEPS.length}
        </span>
      </div>
      <div className="h-1 w-full bg-sand" aria-hidden>
        <div
          className="h-full bg-orange transition-[width] duration-300 ease-out-soft"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
