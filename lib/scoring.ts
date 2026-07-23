/**
 * Scoring engine — pure functions, ported verbatim from the RIPCHD.PED workbook
 * formulas (BUILD_SPEC §5). Kept UI-free so it stays easy to verify and swap.
 * All scales come from content.json > config.
 */

import type {
  Config,
  Content,
  Objective,
  Guideline,
  Strategy,
  DatAnswer,
  Assessment,
} from "@/lib/types";

/* ------------------------------------------------------------------ */
/* Small helpers                                                       */
/* ------------------------------------------------------------------ */

/** Case/space-insensitive key so slightly inconsistent labels still match
 *  (mirrors Excel VLOOKUP, which is case-insensitive). */
function norm(s: string | null | undefined): string {
  return (s ?? "").trim().toLowerCase();
}

function scaleLookup(scale: { label: string; score: number }[], label: string): number | undefined {
  const key = norm(label);
  const hit = scale.find((e) => norm(e.label) === key);
  return hit?.score;
}

function scoreToLabel(scale: { label: string; score: number }[], score: number): string | null {
  const hit = scale.find((e) => e.score === score);
  return hit?.label ?? null;
}

/* ------------------------------------------------------------------ */
/* §5.1 Importance → score                                             */
/* ------------------------------------------------------------------ */

/** Critically/Essential=5 … Not Important=0. Unknown/blank → 0. */
export function importanceScore(config: Config, label: string | null | undefined): number {
  return scaleLookup(config.importance_scale, label ?? "") ?? 0;
}

/* ------------------------------------------------------------------ */
/* §5.2 Objective value (Outcome Prioritization)                       */
/* ------------------------------------------------------------------ */

/** average( importanceScore(outcome) ) over the objective's outcomes;
 *  blanks map to 0 inside the average (AVERAGE(IFERROR(VLOOKUP,0))). */
export function objectiveValue(
  config: Config,
  objective: Objective,
  outcomeImportance: Record<string, string>
): number {
  const outcomes = objective.outcomes;
  if (outcomes.length === 0) return 0;
  const sum = outcomes.reduce(
    (acc, o) => acc + importanceScore(config, outcomeImportance[String(o.row)]),
    0
  );
  return sum / outcomes.length;
}

export type RankedObjective = {
  objective: string;
  value: number;
  /** 1-based priority position (1 = highest). */
  position: number;
  /** e.g. "First priority" from guideline_priority_scale. */
  priorityLabel: string | null;
};

/* ------------------------------------------------------------------ */
/* §5.3 Objective ranking                                              */
/* ------------------------------------------------------------------ */

/** Sort objectives by value DESC; ties preserve original order (stable).
 *  Mirrors SORTBY(...,-1). Returns each objective with its priority position. */
export function rankObjectives(
  config: Config,
  objectives: Objective[],
  outcomeImportance: Record<string, string>
): RankedObjective[] {
  const withValue = objectives.map((o, i) => ({
    objective: o.objective,
    value: objectiveValue(config, o, outcomeImportance),
    original: i,
  }));

  withValue.sort((a, b) => {
    if (b.value !== a.value) return b.value - a.value;
    return a.original - b.original; // stable tie-break
  });

  const priorityScale = config.guideline_priority_scale; // First=6 … Sixth=1
  return withValue.map((o, idx) => {
    const position = idx + 1;
    return {
      objective: o.objective,
      value: o.value,
      position,
      priorityLabel: priorityScale[idx]?.label ?? null,
    };
  });
}

/** Map objective name -> priority position (1-based), case-insensitive. */
function objectivePositionMap(ranked: RankedObjective[]): Map<string, number> {
  const m = new Map<string, number>();
  ranked.forEach((r) => m.set(norm(r.objective), r.position));
  return m;
}

/* ------------------------------------------------------------------ */
/* §5.4 Guideline derived importance                                   */
/* ------------------------------------------------------------------ */

export type DerivedImportance = {
  /** rounded summing score (1–6), or 0 if no related objectives. */
  score: number;
  /** importance label from guideline_summing_scale, or null. */
  label: string | null;
};

/** For each related objective, convert its priority POSITION to a score via
 *  guideline_priority_scale (First=6 … Sixth=1), average over N, round, then
 *  map back to an importance label via guideline_summing_scale. */
export function guidelineDerivedImportance(
  config: Config,
  guideline: Guideline,
  ranked: RankedObjective[]
): DerivedImportance {
  const positions = objectivePositionMap(ranked);
  const related = guideline.related_objectives;
  const n = related.length;
  if (n === 0) return { score: 0, label: null };

  const priorityScale = config.guideline_priority_scale;
  let raw = 0;
  for (const objName of related) {
    const pos = positions.get(norm(objName));
    // position (1..6) indexes into priority scale (scale[pos-1] => First..Sixth)
    const score = pos ? priorityScale[pos - 1]?.score ?? 0 : 0;
    raw += score;
  }
  const mean = raw / n;
  const rounded = Math.round(mean);
  const label = scoreToLabel(config.guideline_summing_scale, rounded);
  return { score: rounded, label };
}

/** Reviewed importance = user override if present, else derived (§5.4). */
export function reviewedImportanceLabel(
  config: Config,
  guideline: Guideline,
  ranked: RankedObjective[],
  override: string | undefined | null
): string | null {
  if (override && override.trim() !== "") return override;
  return guidelineDerivedImportance(config, guideline, ranked).label;
}

/* ------------------------------------------------------------------ */
/* §5.5 Policy/Process row score (discussion aid — informational only) */
/* ------------------------------------------------------------------ */

/** Build outcome-name -> row lookup from the outcome prioritization content. */
function outcomeRowByName(content: Content): Map<string, number> {
  const m = new Map<string, number>();
  for (const obj of content.outcome_prioritization.objectives) {
    for (const o of obj.outcomes) m.set(norm(o.outcome), o.row);
  }
  return m;
}

export type PolicyWeight = {
  /** summed importance scores of related outcomes (raw). */
  raw: number;
  /** raw rounded, then mapped to an importance label via guideline_summing_scale. */
  label: string | null;
  /** how many related outcomes actually matched a rated outcome. */
  matched: number;
};

/**
 * §5.5 — informational weighting for a policy/process row:
 * sum(importanceScore(user's importance for each related outcome)) → round →
 * label. Does NOT feed the DAT Report. Unmatched outcome names contribute 0.
 */
export function policyRowWeight(
  content: Content,
  relatedOutcomes: string[],
  outcomeImportance: Record<string, string>
): PolicyWeight {
  const config = content.config;
  const rowByName = outcomeRowByName(content);
  let raw = 0;
  let matched = 0;
  for (const name of relatedOutcomes) {
    const row = rowByName.get(norm(name));
    if (row == null) continue;
    const label = outcomeImportance[String(row)];
    if (label && label.trim() !== "") matched++;
    raw += importanceScore(config, label);
  }
  const rounded = Math.round(raw);
  // Clamp into the summing scale's range for a best-effort label.
  const scale = config.guideline_summing_scale;
  const maxScore = Math.max(...scale.map((s) => s.score));
  const clamped = Math.min(rounded, maxScore);
  return { raw, label: scoreToLabel(scale, clamped), matched };
}

/* ------------------------------------------------------------------ */
/* §5.6 DAT Report — Alignment Score                                   */
/* ------------------------------------------------------------------ */

export type GuidelineAlignment = {
  category: string;
  guideline: string;
  importanceLabel: string | null;
  importanceWeight: number;
  totalItems: number;
  yes: number;
  maybe: number;
  no: number;
  na: number;
  unanswered: number;
  maximumScore: number;
  scoreObtained: number;
  /** 0–1, or null when there is nothing to score (maximumScore === 0). */
  alignmentScore: number | null;
};

const ANSWER_NA: DatAnswer = "Not Applicable";

/**
 * Per guideline, over its strategies:
 *  - importanceWeight = importanceScore(reviewed importance label)
 *  - totalItems = count(answer is Yes/No/Maybe)  [NA and blank excluded,
 *    matching Excel COUNTIF(range,"<>Not Applicable") which ignores blanks]
 *  - yes = count(answer == "Yes")            (only Yes counts as 1)
 *  - maximumScore = totalItems * importanceWeight
 *  - scoreObtained = yes * importanceWeight
 *  - alignmentScore = maximumScore == 0 ? null : scoreObtained / maximumScore
 */
export function guidelineAlignment(
  config: Config,
  guidelineName: string,
  category: string,
  strategies: Strategy[],
  answers: Record<string, DatAnswer>,
  importanceLabel: string | null
): GuidelineAlignment {
  const importanceWeight = importanceScore(config, importanceLabel);

  let yes = 0;
  let maybe = 0;
  let no = 0;
  let na = 0;
  let unanswered = 0;

  for (const s of strategies) {
    const a = answers[String(s.row)];
    if (a === "Yes") yes++;
    else if (a === "Maybe") maybe++;
    else if (a === "No") no++;
    else if (a === ANSWER_NA) na++;
    else unanswered++;
  }

  const totalItems = yes + maybe + no; // answered, non-NA
  const maximumScore = totalItems * importanceWeight;
  const scoreObtained = yes * importanceWeight;
  const alignmentScore = maximumScore === 0 ? null : scoreObtained / maximumScore;

  return {
    category,
    guideline: guidelineName,
    importanceLabel,
    importanceWeight,
    totalItems,
    yes,
    maybe,
    no,
    na,
    unanswered,
    maximumScore,
    scoreObtained,
    alignmentScore,
  };
}

export type RollUp = {
  label: string;
  scoreObtained: number;
  maximumScore: number;
  /** weighted alignment (sum obtained / sum max), or null. */
  alignmentScore: number | null;
};

export type DatReport = {
  rows: GuidelineAlignment[];
  categories: RollUp[];
  overall: RollUp;
};

/** Group strategies by their guideline while preserving first-seen order. */
function groupStrategiesByGuideline(strategies: Strategy[]) {
  const order: string[] = [];
  const byGuideline = new Map<string, Strategy[]>();
  const categoryOf = new Map<string, string>();
  for (const s of strategies) {
    if (!byGuideline.has(s.guideline)) {
      byGuideline.set(s.guideline, []);
      categoryOf.set(s.guideline, s.category);
      order.push(s.guideline);
    }
    byGuideline.get(s.guideline)!.push(s);
  }
  return { order, byGuideline, categoryOf };
}

function rollUp(label: string, rows: GuidelineAlignment[]): RollUp {
  const scoreObtained = rows.reduce((a, r) => a + r.scoreObtained, 0);
  const maximumScore = rows.reduce((a, r) => a + r.maximumScore, 0);
  return {
    label,
    scoreObtained,
    maximumScore,
    alignmentScore: maximumScore === 0 ? null : scoreObtained / maximumScore,
  };
}

/**
 * Full DAT Report: per-guideline alignment rows + category and whole-toolkit
 * weighted roll-ups (§5.6). Guideline importance uses the reviewed label
 * (override if present, else derived from the prioritization).
 */
export function buildDatReport(content: Content, assessment: Assessment): DatReport {
  const config = content.config;
  const ranked = rankObjectives(
    config,
    content.outcome_prioritization.objectives,
    assessment.outcomeImportance
  );

  // Map guideline name -> its content guideline (for importance derivation).
  const guidelineByName = new Map<string, Guideline>();
  for (const g of content.guideline_prioritization.guidelines) {
    guidelineByName.set(norm(g.guideline), g);
  }

  const { order, byGuideline, categoryOf } = groupStrategiesByGuideline(
    content.design_alignment.strategies
  );

  const rows: GuidelineAlignment[] = order.map((guidelineName) => {
    const strategies = byGuideline.get(guidelineName)!;
    const category = categoryOf.get(guidelineName)!;
    const gl = guidelineByName.get(norm(guidelineName));
    const importanceLabel = gl
      ? reviewedImportanceLabel(config, gl, ranked, assessment.guidelineReview[String(gl.row)])
      : null;
    return guidelineAlignment(
      config,
      guidelineName,
      category,
      strategies,
      assessment.datAnswers,
      importanceLabel
    );
  });

  // Category roll-ups (first-seen order).
  const catOrder: string[] = [];
  const byCategory = new Map<string, GuidelineAlignment[]>();
  for (const r of rows) {
    if (!byCategory.has(r.category)) {
      byCategory.set(r.category, []);
      catOrder.push(r.category);
    }
    byCategory.get(r.category)!.push(r);
  }
  const categories = catOrder.map((c) => rollUp(c, byCategory.get(c)!));
  const overall = rollUp("Whole toolkit", rows);

  return { rows, categories, overall };
}

/** Convenience: format a 0–1 alignment as a whole-number percent string. */
export function formatAlignment(score: number | null): string {
  if (score === null) return "—";
  return `${Math.round(score * 100)}%`;
}
