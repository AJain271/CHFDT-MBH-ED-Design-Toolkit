"use client";

import type { DatAnswer } from "@/lib/types";

/**
 * Yes / No / Maybe / N/A segmented control, color-coded via the status tokens
 * with the label always visible for accessibility (design.md § Components).
 */
const OPTIONS: { value: DatAnswer; short: string; token: string }[] = [
  { value: "Yes", short: "Yes", token: "var(--yes)" },
  { value: "No", short: "No", token: "var(--no)" },
  { value: "Maybe", short: "Maybe", token: "var(--maybe)" },
  { value: "Not Applicable", short: "N/A", token: "var(--na)" },
];

export default function AnswerToggle({
  value,
  onChange,
  label,
}: {
  value: DatAnswer | undefined;
  onChange: (a: DatAnswer) => void;
  label?: string;
}) {
  return (
    <div
      role="radiogroup"
      aria-label={label ?? "Implementation"}
      className="inline-flex gap-1 rounded-control border border-sand bg-panel p-1"
    >
      {OPTIONS.map((opt) => {
        const selected = value === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={selected}
            title={opt.value}
            onClick={() => onChange(opt.value)}
            className={[
              "min-w-[52px] rounded-[7px] px-3 py-1.5 text-sm font-medium transition-all duration-150 ease-out-soft",
              selected ? "text-white shadow-card" : "text-ink-soft hover:bg-canvas",
            ].join(" ")}
            style={selected ? { backgroundColor: opt.token } : undefined}
          >
            {opt.short}
          </button>
        );
      })}
    </div>
  );
}
