"use client";

import { useEffect, useRef, useState } from "react";

/** Gentle count-up for alignment scores — the report's "alive" moment
 *  (design.md § Signature element). Honors prefers-reduced-motion. */
export default function CountUpPercent({
  value,
  className,
  durationMs = 900,
}: {
  /** 0–1, or null for "no score yet". */
  value: number | null;
  className?: string;
  durationMs?: number;
}) {
  const target = value === null ? null : Math.round(value * 100);
  const [display, setDisplay] = useState(0);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    if (target === null) return;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setDisplay(target);
      return;
    }
    const start = performance.now();
    const from = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs);
      const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
      setDisplay(Math.round(from + (target - from) * eased));
      if (t < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [target, durationMs]);

  if (target === null) return <span className={className}>—</span>;
  return (
    <span className={`tnum ${className ?? ""}`}>
      {display}
      <span className="text-[0.6em] align-baseline">%</span>
    </span>
  );
}
