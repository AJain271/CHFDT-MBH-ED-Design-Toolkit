# MBH-Friendly ED Design Toolkit — Web App Build Spec (v1)

## 1. What this is
A web version of the RIPCHD.PED "Pediatric MBH-Friendly Emergency Department Design
Toolkit," currently an Excel workbook. The app guides a design team through a
**dependency-chained assessment**: early answers weight later ones, ending in a
per-guideline **Alignment Score**.

All content (questions, outcomes, guidelines, strategies, scales) lives in
`content.json`. **Do not hardcode content in components** — render from that file so
the toolkit can be updated without code changes.

## 2. v1 scope
In scope (this is exactly what the workbook implements):
1. **Pre-Planning & Programming (PPT)** — intake worksheet (context capture).
2. **Outcome Prioritization** — rank the 6 design objectives.
3. **Guideline Prioritization** — derive + review guideline importance.
4. **Policy & Process Discussion** — stakeholder discussion prompts (optional/skippable).
5. **Design Alignment Tool (DAT)** — score implementation of design strategies.
6. **DAT Report** — alignment scores + summary.

Out of scope for v1: the MET and PET tools shown in the deck are **not** in the
workbook. Leave clearly-labeled placeholder routes/tabs for them; build nothing.

**Marketing surface (added post-v1).** A public front door introduces the toolkit and the
CHFDT before a visitor enters the tool: an expressive landing (`/`) with a project overview,
a toolkit overview, and a hero; an `/about` page; a `/contact` page; and **mock** `/signin` ·
`/signup` screens. This surface is styled per `design.md § Landing surface` (expressive,
Regalia-gradient) and is deliberately distinct from the calm wizard. It is presentational for
now — the contact form and auth are **not wired to a backend**. Everything still to be built
for real (contact API + email, real auth, funding/acknowledgement copy) is tracked in
`IMPLEMENT.md`. The wizard flow, scoring, and persistence below are unchanged.

## 3. Users & usage
Async, individual users. One person works through the flow at their own pace, can
leave and return, and exports a report. No real-time collaboration in v1.

## 4. Tech stack (recommended)
- **Next.js (App Router) + TypeScript + Tailwind CSS**, deployed on Vercel.
- State: React state + a small store (Zustand is enough) for the in-progress assessment.
- **Persistence via an interface** (see §7) — localStorage now, cloud later.
- PDF export: `@react-pdf/renderer` or print-to-PDF of a dedicated report route.
- Excel export (optional): `xlsx` (SheetJS) to regenerate a filled workbook.

## 5. The scoring engine
Put all of this in `lib/scoring.ts` as **pure functions** — kept separate from the UI so
it stays easy to verify and swap. All rules below are ported verbatim from the workbook
formulas. Scales come from `content.json > config`. Build these alongside the UI (§6);
they don't need to be gated behind tests, but keeping them isolated makes it trivial to
add a golden-case test later (§10).

### 5.1 Importance → score
`importance_scale`: Critically Important/Essential=5, Extremely=4, Very=3,
Moderately=2, Slightly=1, Not Important=0. Unknown/blank → 0.

### 5.2 Objective value (Outcome Prioritization)
For each of the 6 objectives:
`objectiveValue = average( importanceScore(outcome) for each outcome under it )`.
Blanks map to 0 inside the average (matches `AVERAGE(IFERROR(VLOOKUP(...),0))`).

### 5.3 Objective ranking
Sort the 6 objectives by `objectiveValue` **descending** → priority order (First..Sixth).
Ties: preserve original workbook order (stable sort). Mirrors `SORTBY(...,-1)`.

### 5.4 Guideline derived importance (Guideline Prioritization)
Each guideline relates to N objectives (`related_objectives`). Convert each related
objective's **priority position** to a score via `guideline_priority_scale`
(First priority=6, Second=5, ... Sixth=1). Then:
`raw = sum(priorityScore(obj) for related objectives)`
`mean = raw / N`  (N = number of related objectives; guard N=0 → 0)
`rounded = round(mean)`
Map `rounded` back to an importance label via `guideline_summing_scale`
(score 6→Critically Important … 1→Slightly). This is the **derived** importance;
the user may override it in a "Review Importance" field. Downstream uses the override
if present, else the derived value.

### 5.5 Policy/Process row score (discussion aid — low priority)
`score = sum( importanceScore(outcome) for each related_outcome )` → round → label.
Informational only; does not feed the DAT Report. Can ship as read-only weighting.

### 5.6 DAT Report — Alignment Score (the key output)
Per guideline, over its strategies where answer != "Not Applicable":
- `importanceWeight` = importanceScore( guideline's reviewed importance label )
- `totalItems` = count(answer != "Not Applicable")
- `yes` = count(answer == "Yes")
- `maximumScore` = totalItems * importanceWeight
- `scoreObtained` = yes * importanceWeight
- `alignmentScore = maximumScore == 0 ? null : scoreObtained / maximumScore` (0–1, show as %)

**Only "Yes" counts as 1. "No", "Maybe", "Not Applicable" all count as 0** for the score.
(Note: `content.json > config.implemented_scale` lists No=-1, but the report formulas
never use it. Use Yes=1, everything else=0.)

Also provide overall roll-ups: category-level and whole-toolkit weighted alignment %.

## 6. Screen flow
A left-nav / stepper wizard, one section per step, progress saved continuously:

1. **Welcome / project setup** — project name, date, brief description.
2. **Pre-Planning** — render `ppt.items`; questions vs sub-items; dropdown
   (`response_dropdown` → `config.dropdowns[...]`) and/or open-ended text.
3. **Outcome Prioritization** — for each objective, list its outcomes with description +
   an importance dropdown. Live-show computed objective values and the resulting ranking.
4. **Guideline Prioritization** — table of 15 guidelines showing derived importance +
   an editable "Review Importance" override.
5. **Policy & Process Discussion** — grouped prompts with open-ended responses;
   optional, skippable.
6. **Design Alignment** — grouped by category → guideline → strategies; each strategy
   shows its text + design-feature category, with a Yes/No/Maybe/NA control, plus
   Notes and Conflicts fields.
7. **Report** — the DAT Report table + roll-ups + charts, with export buttons.

UX requirements: intuitive, low-friction, obvious progress, autosave, ability to jump
between completed steps, mobile-friendly. Explanatory text/tooltips from the
`description` fields.

## 7. Persistence (local now, cloud later)
Define one interface and swap implementations — do NOT scatter storage calls:
```ts
interface AssessmentStore {
  load(id: string): Promise<Assessment | null>;
  save(a: Assessment): Promise<void>;
  list(): Promise<AssessmentMeta[]>;
}
```
v1: `LocalStorageStore`. Later: `ApiStore` (same interface) hitting a Next.js route +
DB. Keep all persistence behind this interface so the cloud move is one file.

## 8. Data model (sketch)
```ts
type Assessment = {
  id: string; projectName: string; date: string;
  ppt: Record<string, string>;                 // itemRow -> response
  outcomeImportance: Record<string, string>;   // outcomeRow -> importance label
  guidelineReview: Record<string, string>;     // guidelineRow -> override label
  policyResponses: Record<string, string>;
  datAnswers: Record<string, "Yes"|"No"|"Maybe"|"Not Applicable">; // strategyRow -> answer
  datNotes?: Record<string, string>;
};
```
Use the stable `row` values from `content.json` as keys so content can grow safely.

## 9. Visual identity
**See `design.md` — it is authoritative for all color, type, layout, motion, and copy.**
Do not use the toolkit slide deck's teal/crimson/amber palette. In brief: warm-minimalist,
light oat/beige canvas, authentic Clemson identity (Clemson Orange accent + Regalia
purple), Fraunces display + Inter body, calm and spacious with restrained motion. Every
token lives in `design.md`; render `styles/tokens.css` from it.

## 10. Verifying correctness (optional, do it whenever you like)
No tests are required to ship v1. When you want confidence the port matches Excel, fill
the workbook with one complete answer set, record the resulting objective ranking,
guideline importances, and DAT alignment %s ("golden case"), and assert `lib/scoring.ts`
reproduces them. Good edge cases: an all-NA guideline (alignment = null), all-blank
prioritization, and ties in ranking. Because scoring is isolated (§5), this is a small
add later, not a prerequisite now.

## 11. Suggested repo structure
```
/content/content.json
/lib/scoring.ts
/lib/scoring.test.ts   // optional — add later (§10)
/lib/store/{index.ts,localStorage.ts}
/app/(wizard)/{setup,ppt,outcomes,guidelines,policy,dat,report}/page.tsx
/components/{Stepper,ImportanceSelect,StrategyRow,ReportTable,...}
/styles/tokens.css     // generated from design.md — palette + type as CSS variables
```


