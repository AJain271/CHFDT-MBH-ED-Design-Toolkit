"use client";

import { config } from "@/lib/content";

/**
 * Horizontal segmented control for importance, filling toward orange as
 * importance rises (design.md § Components). Not a plain dropdown — this is the
 * most frequent action in prioritization. Order is low→high so the fill reads
 * left-to-right; labels are kept exactly as the workbook uses them.
 */

// content order is high→low; reverse to low→high for the fill metaphor.
const OPTIONS = [...config.importance_scale].sort((a, b) => a.score - b.score);
const MAX = Math.max(...OPTIONS.map((o) => o.score));

// Short labels for the segments; full label available via title/aria.
const SHORT: Record<string, string> = {
  "Not Important": "Not",
  "Slightly important": "Slightly",
  "Moderately Important": "Moderately",
  "Very Important": "Very",
  "Extremely Important": "Extremely",
  "Critically Important / Essential": "Critically",
};

export default function ImportanceSelect({
  value,
  onChange,
  label,
}: {
  value: string;
  onChange: (label: string) => void;
  label?: string;
}) {
  return (
    <div
      role="radiogroup"
      aria-label={label ?? "Importance"}
      className="inline-flex w-full flex-wrap gap-1 rounded-control border border-sand bg-panel p-1"
    >
      {OPTIONS.map((opt) => {
        const selected = value === opt.label;
        // Fill intensity rises with score.
        const intensity = opt.score / MAX; // 0..1
        return (
          <button
            key={opt.label}
            type="button"
            role="radio"
            aria-checked={selected}
            title={opt.label}
            onClick={() => onChange(selected ? "" : opt.label)}
            className={[
              "flex-1 whitespace-nowrap rounded-[7px] px-2 py-2 text-xs font-medium transition-all duration-150 ease-out-soft",
              selected
                ? "text-white shadow-card"
                : "text-ink-soft hover:bg-orange-wash",
            ].join(" ")}
            style={
              selected
                ? {
                    // Blend from a warm mid to deep orange as importance rises,
                    // keeping white text on AA-safe fills.
                    backgroundColor:
                      intensity >= 0.8 ? "var(--orange-deep)" : "var(--orange)",
                    opacity: 0.55 + intensity * 0.45,
                  }
                : undefined
            }
          >
            {SHORT[opt.label] ?? opt.label}
          </button>
        );
      })}
    </div>
  );
}
