"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import CountUp from "./CountUp";

/**
 * Scroll-driven capability demo (design.md § Landing surface). A pinned browser frame that
 * advances through the toolkit's four defining moments as you scroll — prioritize → weight →
 * score → report — recreated from the real design tokens (no screenshots, crisp at any size).
 * The purple field deepens as you scroll, carrying the page's light→dark transition so the
 * hand-off into the CTA is seamless.
 *
 * IMPORTANT (why only ONE screen renders at a time): an earlier version mounted all four
 * screens absolutely-stacked and cross-faded them with framer-motion opacity. Whenever those
 * motion values weren't yet driving the DOM (SSR, pre-hydration), every screen rendered fully
 * opaque and garbled on top of each other. Here we render only the active screen and remount it
 * on change (`key`) with a short CSS fade — overlap is structurally impossible regardless of JS.
 * Reduced motion falls back to a static, stacked walk-through of the same four screens.
 */

const STEPS = [
  {
    n: 1,
    title: "Rank what matters",
    caption:
      "Rate each design objective's importance. Your team's priorities drive everything downstream.",
  },
  {
    n: 2,
    title: "Weight the guidelines",
    caption:
      "Every guideline inherits importance from your ranking — derived automatically, yours to override.",
  },
  {
    n: 3,
    title: "Score the design",
    caption:
      "Mark how the design implements each strategy: Yes, No, Maybe, or N/A. Only 'Yes' counts toward alignment.",
  },
  {
    n: 4,
    title: "Read the alignment",
    caption:
      "A per-guideline alignment score — and an overall figure you can share, defend, and build from.",
  },
];

export default function ScrollDemo() {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // The field deepens from light purple to Regalia as you scroll, landing exactly on the
  // CTA band's opening color (--regalia-deep) so the two sections read as one continuous wash.
  const bg = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ["#e4d6f2", "#7a55a8", "#33194f"],
  );

  // Advance the active screen at clean quarter boundaries. Only this integer drives which
  // single screen is mounted, so there is never more than one screen in the frame.
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const s = v < 0.27 ? 0 : v < 0.52 ? 1 : v < 0.77 ? 2 : 3;
    setActive((prev) => (prev === s ? prev : s));
  });

  // Reduced motion: a plain stacked walkthrough on the light field, all screens visible.
  if (reduce) {
    return (
      <section className="sec-demo">
        <div className="mx-auto max-w-shell px-4 py-20 sm:px-6">
          <div className="grad-card rounded-card border border-sand/60 p-6 sm:p-8">
            <DemoHeading />
          </div>
          <div className="mt-10 space-y-10">
            {STEPS.map((s, i) => (
              <div key={s.n} className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
                <StepCaption step={s} active />
                <BrowserFrame title={s.title}>
                  <Screen index={i} active />
                </BrowserFrame>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={ref}
      id="demo"
      className="relative h-[300vh]"
      // Solid fallback wash across the whole 300vh so the section is never see-through;
      // it opens on light purple and lands exactly on the CTA band's --regalia-deep.
      style={{ background: "linear-gradient(180deg, var(--wash-purple) 0%, var(--regalia-deep) 100%)" }}
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        {/* Deepening purple field, painted over the fallback within the pinned viewport */}
        <motion.div className="absolute inset-0" style={{ background: bg }} aria-hidden />
        {/* subtle grid over the field */}
        <div
          className="pointer-events-none absolute inset-0 opacity-50"
          style={{
            backgroundImage: "var(--grid-img)",
            backgroundSize: "var(--grid-size) var(--grid-size)",
          }}
          aria-hidden
        />

        {/* Both columns stretch to a single shared height (grid default align: stretch). */}
        <div className="relative z-10 mx-auto grid w-full max-w-shell items-stretch gap-6 px-4 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:gap-8">
          {/* Captions on a frosted panel — legible whatever the field is doing */}
          <div className="grad-card flex flex-col rounded-card border border-white/70 p-5 shadow-card sm:p-6">
            <DemoHeading />
            <ol className="mt-5 flex flex-1 flex-col justify-center gap-1">
              {STEPS.map((s, i) => (
                <StepCaption key={s.n} step={s} active={active === i} />
              ))}
            </ol>
          </div>

          {/* Pinned frame — exactly one screen mounted, remounted with a fade on change. */}
          <BrowserFrame title={STEPS[active].title}>
            <div key={active} className="demo-screen h-full">
              <Screen index={active} active />
            </div>
          </BrowserFrame>
        </div>
      </div>
    </section>
  );
}

function DemoHeading() {
  return (
    <div className="max-w-md">
      <p className="eyebrow text-orange-deep">See it work</p>
      <h2 className="mt-2 font-display text-[1.5rem] font-normal leading-tight text-ink-soft">
        Four steps, scored as you scroll.
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        Watch a project move through the toolkit — from raw priorities to a defensible
        alignment score.
      </p>
    </div>
  );
}

function StepCaption({ step, active }: { step: (typeof STEPS)[number]; active: boolean }) {
  return (
    <li
      className={`flex gap-3 rounded-control border p-2.5 transition-colors duration-300 ${
        active ? "border-orange/40 bg-orange-wash/60" : "border-transparent"
      }`}
    >
      <span
        className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-display text-xs tnum transition-colors ${
          active ? "bg-grad-cta text-white" : "bg-panel text-muted ring-1 ring-sand"
        }`}
      >
        {step.n}
      </span>
      <div>
        <p className={`text-sm font-medium ${active ? "text-ink" : "text-ink-soft"}`}>
          {step.title}
        </p>
        <p
          className={`text-xs leading-snug transition-colors ${
            active ? "text-muted" : "text-muted/70"
          }`}
        >
          {step.caption}
        </p>
      </div>
    </li>
  );
}

function BrowserFrame({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="grad-card flex h-full flex-col overflow-hidden rounded-card border border-sand shadow-glow">
      <div className="flex shrink-0 items-center gap-3 border-b border-sand bg-panel px-4 py-3">
        <span className="flex gap-1.5" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full bg-no/50" />
          <span className="h-2.5 w-2.5 rounded-full bg-maybe/50" />
          <span className="h-2.5 w-2.5 rounded-full bg-yes/50" />
        </span>
        <span className="truncate rounded-full bg-canvas px-3 py-1 text-xs text-muted ring-1 ring-sand">
          MBH-Friendly ED Toolkit · {title}
        </span>
      </div>
      {/* Body grows to the shared column height; min-height keeps it comfortable on mobile
          and in the reduced-motion static variant where there is no stretch to fill. */}
      <div className="min-h-[248px] flex-1 p-5 sm:p-6">{children}</div>
    </div>
  );
}

/* ---------- The four recreated screens ---------- */

function Screen({ index, active }: { index: number; active: boolean }) {
  if (index === 0) return <PrioritizeScreen />;
  if (index === 1) return <GuidelinesScreen />;
  if (index === 2) return <ScoreScreen />;
  return <ReportScreen active={active} />;
}

const prioritize = [
  { label: "Improve Safety & Security", filled: 6 },
  { label: "Improve Communication", filled: 4 },
  { label: "Optimize Efficiency & Effectiveness", filled: 3 },
];

function PrioritizeScreen() {
  return (
    <div className="flex h-full flex-col justify-center gap-5">
      {prioritize.map((row) => (
        <div key={row.label}>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium text-ink">{row.label}</span>
            <span className="text-xs text-muted">
              {row.filled === 6 ? "Critically important" : row.filled >= 4 ? "Very important" : "Moderately"}
            </span>
          </div>
          <div className="flex gap-1.5">
            {Array.from({ length: 6 }).map((_, i) => (
              <span
                key={i}
                className={`h-2.5 flex-1 rounded-full ${i < row.filled ? "bg-orange" : "bg-sand"}`}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

const guidelines = [
  { label: "Maximize staff's situational awareness", badge: "Critically important", tone: "orange" },
  { label: "Create sensory-friendly support", badge: "Very important", tone: "regalia" },
  { label: "Support patient dignity & comfort", badge: "Extremely important", tone: "orange" },
];

function GuidelinesScreen() {
  return (
    <div className="flex h-full flex-col justify-center gap-3">
      {guidelines.map((g) => (
        <div
          key={g.label}
          className="flex items-center justify-between gap-3 rounded-control border border-sand bg-panel px-4 py-3"
        >
          <span className="text-sm font-medium text-ink">{g.label}</span>
          <span
            className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${
              g.tone === "orange" ? "bg-orange-wash text-orange-deep" : "bg-regalia-wash text-regalia"
            }`}
          >
            {g.badge}
          </span>
        </div>
      ))}
      <p className="mt-1 text-center text-xs text-muted">Inherited from your objective ranking ↑</p>
    </div>
  );
}

const score = [
  { label: "Clear sightlines from the staff station", answer: "Yes" },
  { label: "Ligature-resistant fixtures throughout", answer: "Maybe" },
  { label: "Patient-adjustable lighting & sound", answer: "Yes" },
];
const answerOptions = ["Yes", "No", "Maybe", "N/A"] as const;
const answerTone: Record<string, string> = {
  Yes: "bg-yes text-white",
  No: "bg-no text-white",
  Maybe: "bg-maybe text-white",
  "N/A": "bg-na text-white",
};

function ScoreScreen() {
  return (
    <div className="flex h-full flex-col justify-center gap-5">
      {score.map((row) => (
        <div key={row.label}>
          <p className="mb-2 text-sm font-medium text-ink">{row.label}</p>
          <div className="flex gap-1.5">
            {answerOptions.map((a) => (
              <span
                key={a}
                className={`flex-1 rounded-control px-2 py-1.5 text-center text-xs font-medium ${
                  a === row.answer ? answerTone[a] : "bg-panel text-muted ring-1 ring-sand"
                }`}
              >
                {a}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

const report = [
  { label: "Situational awareness", pct: 92, tone: "yes" },
  { label: "Sensory-friendly support", pct: 68, tone: "maybe" },
  { label: "Patient dignity & comfort", pct: 80, tone: "yes" },
];
const barTone: Record<string, string> = {
  yes: "bg-yes",
  maybe: "bg-maybe",
  no: "bg-no",
};

function ReportScreen({ active }: { active: boolean }) {
  return (
    <div className="flex h-full flex-col justify-center">
      <div className="mb-5 flex items-end justify-between">
        <div>
          <p className="eyebrow text-muted">Overall alignment</p>
          <p className="font-display text-5xl text-orange-deep tnum">
            {active ? <CountUp to={87} suffix="%" duration={1200} /> : "0%"}
          </p>
        </div>
        <span className="rounded-full bg-yes/15 px-3 py-1 text-xs font-medium text-yes">
          Strong alignment
        </span>
      </div>
      <div className="space-y-3">
        {report.map((r) => (
          <div key={r.label}>
            <div className="mb-1 flex items-center justify-between text-sm">
              <span className="text-ink">{r.label}</span>
              <span className="tnum text-muted">{r.pct}%</span>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full bg-sand">
              <motion.div
                className={`h-full rounded-full ${barTone[r.tone]}`}
                initial={{ width: 0 }}
                animate={{ width: active ? `${r.pct}%` : 0 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
