"use client";

import { content } from "@/lib/content";
import { useAssessment } from "@/lib/store/useAssessment";
import StepNav from "@/components/StepNav";
import type { PolicyItem } from "@/lib/types";

export default function PolicyPage() {
  const a = useAssessment((s) => s.assessment);
  const setPolicyResponse = useAssessment((s) => s.setPolicyResponse);
  if (!a) return null;

  // Group by section, then by consideration, preserving order.
  const sections: { section: string; groups: { consideration: string; items: PolicyItem[] }[] }[] =
    [];
  for (const item of content.policy_process.items) {
    let sec = sections.find((s) => s.section === item.section);
    if (!sec) {
      sec = { section: item.section, groups: [] };
      sections.push(sec);
    }
    let grp = sec.groups.find((g) => g.consideration === item.consideration);
    if (!grp) {
      grp = { consideration: item.consideration, items: [] };
      sec.groups.push(grp);
    }
    grp.items.push(item);
  }

  return (
    <div className="space-y-6">
      <div className="card border-regalia/30 bg-regalia-wash/40 p-4 text-sm text-ink-soft">
        These are discussion prompts to align your stakeholders — architects, clinicians, and
        leadership. Responses are for your team&apos;s record; they don&apos;t affect the
        alignment score. Answer what&apos;s useful and skip the rest.
      </div>

      {sections.map((sec) => (
        <section key={sec.section} className="card overflow-hidden">
          <header className="border-b border-sand bg-panel/70 px-5 py-3">
            <h2 className="text-display-sm">{sec.section}</h2>
          </header>

          <div className="divide-y divide-sand">
            {sec.groups.map((grp) => (
              <div key={grp.consideration} className="px-5 py-4">
                <p className="eyebrow mb-3">{grp.consideration}</p>
                <div className="space-y-5">
                  {grp.items.map((item) => (
                    <div key={item.row}>
                      <label
                        htmlFor={`policy-${item.row}`}
                        className="block text-[15px] text-ink"
                      >
                        {item.design_implication_question}
                      </label>
                      {item.relevant_design_elements.length > 0 && (
                        <div className="mt-1.5 flex flex-wrap gap-1.5">
                          {item.relevant_design_elements.map((el) => (
                            <span
                              key={el}
                              className="rounded-full border border-sand bg-canvas px-2 py-0.5 text-xs text-muted"
                            >
                              {el}
                            </span>
                          ))}
                        </div>
                      )}
                      <textarea
                        id={`policy-${item.row}`}
                        className="field mt-2 min-h-[64px] resize-y"
                        placeholder="Notes from your discussion (optional)"
                        value={a.policyResponses[String(item.row)] ?? ""}
                        onChange={(e) => setPolicyResponse(item.row, e.target.value)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}

      <StepNav slug="policy" />
    </div>
  );
}
