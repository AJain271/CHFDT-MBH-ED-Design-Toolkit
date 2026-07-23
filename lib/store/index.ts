import type { Assessment, AssessmentMeta } from "@/lib/types";

/**
 * Persistence interface (BUILD_SPEC §7). All storage goes through this so the
 * cloud move is a single new implementation — do NOT scatter storage calls.
 */
export interface AssessmentStore {
  load(id: string): Promise<Assessment | null>;
  save(a: Assessment): Promise<void>;
  list(): Promise<AssessmentMeta[]>;
  remove(id: string): Promise<void>;
}

/** Create a blank assessment with sensible defaults. */
export function newAssessment(partial?: Partial<Assessment>): Assessment {
  const now = new Date().toISOString();
  return {
    id:
      partial?.id ??
      (typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `a_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`),
    projectName: partial?.projectName ?? "",
    date: partial?.date ?? now.slice(0, 10),
    description: partial?.description ?? "",
    ppt: partial?.ppt ?? {},
    outcomeImportance: partial?.outcomeImportance ?? {},
    guidelineReview: partial?.guidelineReview ?? {},
    policyResponses: partial?.policyResponses ?? {},
    datAnswers: partial?.datAnswers ?? {},
    datNotes: partial?.datNotes ?? {},
    datConflicts: partial?.datConflicts ?? {},
    createdAt: partial?.createdAt ?? now,
    updatedAt: partial?.updatedAt ?? now,
  };
}
