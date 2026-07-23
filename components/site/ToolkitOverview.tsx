import { content } from "@/lib/content";
import Reveal from "./Reveal";
import CountUp from "./CountUp";
import StepChain from "./StepChain";

/**
 * Toolkit overview — the structured "how it works" (design.md § Signature element).
 * Fully data-driven: the seven-step chain from lib/steps, the six objectives and fifteen
 * guidelines counted from content.json. The vertical gradient thread mirrors the tool's own
 * dependency-chain stepper — the front-door echo of what makes the toolkit work.
 */
export default function ToolkitOverview() {
  const objectives = content.outcome_prioritization.objectives;
  const guidelineCount = content.guideline_prioritization.guidelines.length;
  const strategyCount = content.design_alignment.strategies.length;

  const stats = [
    { value: objectives.length, label: "design objectives", sub: "ranked by your team" },
    { value: guidelineCount, label: "design guidelines", sub: "scored for alignment" },
    { value: strategyCount, label: "design strategies", sub: "Yes · No · Maybe · N/A" },
  ];

  return (
    <section id="toolkit" className="sec-3">
      <div className="mx-auto max-w-shell px-4 py-20 sm:px-6 lg:py-28">
        <Reveal className="max-w-2xl">
          <p className="eyebrow text-orange-deep">The toolkit</p>
          <h2 className="mt-3 font-display text-display-md font-normal text-ink-soft">
            Seven steps, one connected chain.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            Each step feeds the next. That dependency is the whole idea — and the reason your
            result is specific to your project rather than a one-size checklist.
          </p>
        </Reveal>

        {/* Stats */}
        <Reveal delay={60}>
          <dl className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {stats.map((s) => (
              <div key={s.label} className="card card-lift grad-card p-6">
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <p className="font-display text-4xl text-orange-deep tnum">
                    <CountUp to={s.value} />
                  </p>
                  <p className="mt-1 font-medium capitalize text-ink">{s.label}</p>
                  <p className="text-sm text-muted">{s.sub}</p>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <div className="mt-16 grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          {/* Seven-step chain — the thread fills as you scroll */}
          <Reveal>
            <StepChain />
          </Reveal>

          {/* Six objectives */}
          <Reveal delay={80}>
            <div className="card-lift grad-card rounded-card border border-sand p-7">
              <p className="eyebrow text-regalia">What your team ranks</p>
              <h3 className="mt-2 font-display text-display-sm font-normal text-ink-soft">
                The six design objectives
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                You rate each objective&apos;s importance. Those rankings cascade down the
                chain to weight all {guidelineCount} guidelines.
              </p>
              <ul className="mt-5 space-y-2.5">
                {objectives.map((o, i) => (
                  <li key={o.objective} className="flex items-center gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-orange-wash text-xs font-semibold text-orange-deep tnum">
                      {i + 1}
                    </span>
                    <span className="text-sm font-medium text-ink">{o.objective}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
