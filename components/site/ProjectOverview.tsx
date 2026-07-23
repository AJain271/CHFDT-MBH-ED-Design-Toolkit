import Reveal from "./Reveal";

/**
 * RIPCHD.PED Project Overview — the narrative "what this is and why", carried verbatim from
 * the RIPCHD.PED site copy (the study's own words). Warm oat canvas so it reads as one family
 * with the tool. Left rail states the project + its expansion; the right column carries the
 * body and the two volume references.
 */
export default function ProjectOverview() {
  return (
    <section id="overview" className="sec-2">
      <div className="mx-auto max-w-shell px-4 pb-20 pt-10 sm:px-6 lg:pb-28 lg:pt-16">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow text-orange-deep">RIPCHD.PED Project Overview</p>
            <h2 className="mt-3 font-display text-display-md font-normal text-ink-soft">
              Realizing Improved Patient Care through Human-centered Design for Pediatric
              Mental and Behavioral Health in the Emergency Department.
            </h2>
          </Reveal>

          <Reveal delay={80} className="max-w-xl">
            <p className="text-lg leading-relaxed text-ink">
              Mental and behavioral health (MBH) conditions affected 1 in every 5 children in
              the United States in 2023. With this rise in pediatric MBH concerns, an
              increasing number of children in MBH crisis and their care partners are visiting
              emergency departments (ED) for MBH care. Though EDs are well equipped to address
              medical emergencies, they struggle to meet the care needs of pediatric MBH
              patients and their care partners. The goal of the RIPCHD.PED patient safety
              learning lab funded by the Agency for Healthcare Research and Quality (AHRQ) is
              to improve the safety and experiences of children with MBH conditions in the ED
              while also improving provider well-being.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              This 4-year research study is a collaboration between Prisma Health, the
              University of South Carolina, and Clemson University. Twelve EDs (10 urban and 2
              rural) within hospitals in medically underserved communities (5 EDs) and Mental
              Health Healthcare Provider Shortage Areas (all EDs) in South Carolina are
              participating in this study. The study resulted in the development of thirteen
              MBH-friendly ED design guidelines. These guidelines provide the framework for
              the MBH-Friendly ED Design Toolkit.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted">
              More information about the study and its findings is available in the RIPCHD.PED
              Books.
            </p>

            {/* Volume references — links to be supplied (currently placeholders). */}
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#"
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-control border border-regalia/35 bg-[color:var(--regalia-veil)] px-5 text-sm font-semibold text-regalia transition-colors hover:bg-regalia-wash"
              >
                RIPCHD.PED Volume 1 <span aria-hidden>↗</span>
              </a>
              <a
                href="#"
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-control border border-regalia/35 bg-[color:var(--regalia-veil)] px-5 text-sm font-semibold text-regalia transition-colors hover:bg-regalia-wash"
              >
                RIPCHD.PED Volume 2 <span aria-hidden>↗</span>
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
