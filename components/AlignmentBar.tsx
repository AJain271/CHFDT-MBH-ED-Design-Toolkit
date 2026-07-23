"use client";

import { useEffect, useState } from "react";

/** Alignment % as a horizontal bar tinted by score: low→--no, mid→--maybe,
 *  high→--yes (design.md § Report table). Fills once on entry. */
export function alignmentTint(score: number | null): string {
  if (score === null) return "var(--na)";
  if (score < 0.5) return "var(--no)";
  if (score < 0.8) return "var(--maybe)";
  return "var(--yes)";
}

export default function AlignmentBar({ score }: { score: number | null }) {
  const [w, setW] = useState(0);
  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const target = score === null ? 0 : score * 100;
    if (reduce) {
      setW(target);
      return;
    }
    const id = requestAnimationFrame(() => setW(target));
    return () => cancelAnimationFrame(id);
  }, [score]);

  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-sand" aria-hidden>
      <div
        className="h-full rounded-full transition-[width] duration-700 ease-out-soft"
        style={{ width: `${w}%`, backgroundColor: alignmentTint(score) }}
      />
    </div>
  );
}
