import type { Assessment } from "@/lib/types";

/** Whether a given step has meaningful data yet — drives the stepper's
 *  completed-check state. Kept dependency-free so the stepper stays pure. */
export function isStepComplete(slug: string, a: Assessment | null): boolean {
  if (!a) return false;
  const any = (o?: Record<string, string>) =>
    !!o && Object.values(o).some((v) => v != null && String(v).trim() !== "");
  switch (slug) {
    case "setup":
      return a.projectName.trim() !== "";
    case "ppt":
      return any(a.ppt);
    case "outcomes":
      return any(a.outcomeImportance);
    case "guidelines":
      // Guidelines derive automatically once outcomes exist; count reviewed/derived.
      return any(a.outcomeImportance);
    case "policy":
      return any(a.policyResponses);
    case "dat":
      return any(a.datAnswers as unknown as Record<string, string>);
    case "report":
      return any(a.datAnswers as unknown as Record<string, string>);
    default:
      return false;
  }
}
