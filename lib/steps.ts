/**
 * The dependency-chained wizard steps. Order matters — each step feeds the next,
 * which is the whole premise of the toolkit and the reason for the stepper's
 * filling connector line (design.md § Signature element).
 */
export type Step = {
  slug: string;
  path: string;
  /** Short label for the left-rail stepper. */
  label: string;
  /** Full title for the sticky section header. */
  title: string;
  /** One-line helper shown under the title. */
  blurb: string;
  optional?: boolean;
};

export const STEPS: Step[] = [
  {
    slug: "setup",
    path: "/setup",
    label: "Project setup",
    title: "Project setup",
    blurb: "Name the project and set the basics. Everything else builds on this.",
  },
  {
    slug: "ppt",
    path: "/ppt",
    label: "Pre-planning",
    title: "Pre-Planning & Programming",
    blurb: "Capture the context of the ED so the assessment is grounded in your project.",
  },
  {
    slug: "outcomes",
    path: "/outcomes",
    label: "Outcome priorities",
    title: "Outcome Prioritization",
    blurb: "Rate each outcome's importance. This ranks your six design objectives.",
  },
  {
    slug: "guidelines",
    path: "/guidelines",
    label: "Guideline priorities",
    title: "Guideline Prioritization",
    blurb: "Review the importance each guideline inherits from your objective ranking.",
  },
  {
    slug: "policy",
    path: "/policy",
    label: "Policy & process",
    title: "Policy & Process Discussion",
    blurb: "Discussion prompts to align stakeholders. Optional — you can skip ahead.",
    optional: true,
  },
  {
    slug: "dat",
    path: "/dat",
    label: "Design alignment",
    title: "Design Alignment",
    blurb: "Score how your design implements each strategy: Yes, No, Maybe, or N/A.",
  },
  {
    slug: "report",
    path: "/report",
    label: "Report",
    title: "DAT Report",
    blurb: "Your per-guideline alignment scores, roll-ups, and export.",
  },
];

export function stepIndex(slug: string): number {
  return STEPS.findIndex((s) => s.slug === slug);
}
