"use client";

import { content, config } from "@/lib/content";
import { useAssessment } from "@/lib/store/useAssessment";
import StepNav from "@/components/StepNav";
import type { PptItem } from "@/lib/types";

export default function PptPage() {
  const a = useAssessment((s) => s.assessment);
  const setPpt = useAssessment((s) => s.setPpt);
  if (!a) return null;

  const items = content.ppt.items;

  return (
    <div>
      <div className="card divide-y divide-sand overflow-hidden">
        {items.map((item) => (
          <PptRow
            key={item.row}
            item={item}
            value={a.ppt[String(item.row)] ?? ""}
            note={a.ppt[`${item.row}:note`] ?? ""}
            onValue={(v) => setPpt(item.row, v)}
            onNote={(v) => setPpt(`${item.row}:note`, v)}
          />
        ))}
      </div>

      <StepNav slug="ppt" />
    </div>
  );
}

function PptRow({
  item,
  value,
  note,
  onValue,
  onNote,
}: {
  item: PptItem;
  value: string;
  note: string;
  onValue: (v: string) => void;
  onNote: (v: string) => void;
}) {
  const isSub = item.kind === "subitem";
  const options = item.response_dropdown ? config.dropdowns[item.response_dropdown] : null;
  const fieldId = `ppt-${item.row}`;

  return (
    <div className={isSub ? "px-5 py-3 pl-8 sm:pl-10" : "px-5 py-4"}>
      <label
        htmlFor={fieldId}
        className={[
          "block",
          isSub ? "text-sm text-ink-soft" : "text-[15px] font-medium text-ink",
        ].join(" ")}
      >
        {item.text}
      </label>

      <div className="mt-2 space-y-2">
        {options ? (
          <>
            <select
              id={fieldId}
              className="field max-w-md"
              value={value}
              onChange={(e) => onValue(e.target.value)}
            >
              <option value="">Select…</option>
              {options.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            <input
              className="field"
              placeholder="Add a note (optional)"
              value={note}
              onChange={(e) => onNote(e.target.value)}
            />
          </>
        ) : (
          <textarea
            id={fieldId}
            className="field min-h-[52px] resize-y"
            placeholder="Your response"
            value={value}
            onChange={(e) => onValue(e.target.value)}
          />
        )}
      </div>
    </div>
  );
}
