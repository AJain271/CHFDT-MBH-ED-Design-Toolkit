import Reveal from "./Reveal";

/**
 * Project overview — the narrative "what this is and why" (BUILD_SPEC §1).
 * Warm oat canvas so it reads as one family with the tool; the signature dependency-chain
 * thread appears as the pull-quote's left rail.
 */
export default function ProjectOverview() {
  return (
    <section id="overview" className="sec-2">
      <div className="mx-auto max-w-shell px-4 pb-20 pt-10 sm:px-6 lg:pb-28 lg:pt-16">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow text-orange-deep">The project</p>
            <h2 className="mt-3 font-display text-display-md font-normal text-ink-soft">
              From a spreadsheet into a tool teams can actually use together.
            </h2>
          </Reveal>

          <Reveal delay={80} className="max-w-xl">
            <p className="text-lg leading-relaxed text-ink">
              The MBH-Friendly ED Design Toolkit helps hospital teams design pediatric
              emergency departments that support patients experiencing mental and behavioral
              health crises. It began as the RIPCHD.PED research workbook — dozens of linked
              spreadsheet formulas — and is now a guided web assessment anyone on the team
              can run.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              Clinicians, architects, and hospital leadership move through it together:
              capture the project&apos;s context, prioritize what matters, then score how the
              design measures up — guideline by guideline.
            </p>

            {/* Pull-quote carrying the dependency-chain premise. */}
            <blockquote className="mt-8 flex gap-4 rounded-card bg-[color:var(--regalia-veil)] p-6">
              <span className="thread-line w-1 shrink-0 rounded-full" aria-hidden />
              <p className="font-display text-xl italic leading-snug text-ink-soft">
                Every early priority weights the decisions that follow — so the final
                alignment score reflects{" "}
                <span className="text-orange-deep not-italic">your</span> team&apos;s values,
                not a generic checklist.
              </p>
            </blockquote>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
