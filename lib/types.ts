/**
 * Types for content.json and the in-progress assessment.
 * Content is the single source of truth — components render from it, never hardcode.
 */

export type ScaleEntry = { label: string; score: number };
export type ValueEntry = { label: string; value: number };
export type CategoryDef = { label: string; description: string };

export type Config = {
  importance_scale: ScaleEntry[];
  guideline_summing_scale: ScaleEntry[];
  guideline_priority_scale: ScaleEntry[];
  implemented_scale: ValueEntry[];
  design_element_categories: CategoryDef[];
  dropdowns: Record<string, string[]>;
};

export type PptItem = {
  row: number;
  kind: "question" | "subitem";
  text: string;
  response_dropdown: string | null;
  open_ended: boolean;
};

export type Outcome = { row: number; outcome: string; description: string };
export type Objective = { objective: string; outcomes: Outcome[] };

export type Guideline = {
  row: number;
  category: string;
  guideline: string;
  related_objectives: string[];
};

export type PolicyItem = {
  row: number;
  section: string;
  consideration: string;
  design_implication_question: string;
  relevant_design_elements: string[];
  related_outcomes: string[];
};

export type Strategy = {
  row: number;
  category: string;
  guideline: string;
  strategy: string;
  design_feature_category: string;
  served_outcomes: string[];
};

export type Content = {
  config: Config;
  ppt: { title: string; items: PptItem[] };
  outcome_prioritization: { title: string; objectives: Objective[]; note: string };
  guideline_prioritization: { title: string; guidelines: Guideline[]; note: string };
  policy_process: { title: string; items: PolicyItem[]; note: string };
  design_alignment: { title: string; strategies: Strategy[] };
  dat_report: { title: string; note: string; columns: string[] };
};

/** DAT answer domain. Empty string / undefined means unanswered. */
export type DatAnswer = "Yes" | "No" | "Maybe" | "Not Applicable";

export type Assessment = {
  id: string;
  projectName: string;
  date: string;
  description?: string;
  /** itemRow -> response (open text and/or dropdown selection) */
  ppt: Record<string, string>;
  /** outcomeRow -> importance label */
  outcomeImportance: Record<string, string>;
  /** guidelineRow -> override importance label */
  guidelineReview: Record<string, string>;
  /** policyRow -> open-ended response */
  policyResponses: Record<string, string>;
  /** strategyRow -> answer */
  datAnswers: Record<string, DatAnswer>;
  /** strategyRow -> notes */
  datNotes?: Record<string, string>;
  /** strategyRow -> conflicts */
  datConflicts?: Record<string, string>;
  createdAt: string;
  updatedAt: string;
};

export type AssessmentMeta = {
  id: string;
  projectName: string;
  date: string;
  updatedAt: string;
};
