import type { Metadata } from "next";
import Link from "next/link";
import PageBanner from "@/components/site/PageBanner";
import ToolkitOverview from "@/components/site/ToolkitOverview";
import Reveal from "@/components/site/Reveal";

export const metadata: Metadata = {
  title: "About · MBH-Friendly ED Design Toolkit",
  description:
    "About the RIPCHD.PED MBH-Friendly ED Design Toolkit and Clemson University's Center for Health Facilities Design & Testing.",
};

const partners = [
  { name: "Clemson University", role: "CHFDT · research & design" },
  { name: "Prisma Health", role: "Clinical practice partner" },
  { name: "University of South Carolina", role: "Research partner" },
];

export default function AboutPage() {
  return (
    <>
      <PageBanner
        eyebrow="About"
        title="A research toolkit for calmer pediatric emergency care."
        subtitle="Built by Clemson University's Center for Health Facilities Design & Testing as part of the RIPCHD.PED project."
      />

      <section>
        <div className="mx-auto max-w-shell px-4 py-20 sm:px-6 lg:py-24">
          <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <Reveal>
              <p className="eyebrow text-orange-deep">The mission</p>
              <h2 className="mt-3 font-display text-display-md font-normal text-ink-soft">
                Environments that help, not escalate.
              </h2>
            </Reveal>
            <Reveal delay={80} className="max-w-2xl">
              <p className="text-lg leading-relaxed text-ink">
                Children and youth in mental or behavioral health crisis often wait for care
                in emergency departments designed for physical injury — bright, loud, and
                exposed. The built environment can either calm or compound that distress.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-muted">
                This toolkit turns years of RIPCHD.PED research into design objectives,
                guidelines, and strategies a project team can weigh against their own
                priorities — producing an alignment score that shows, concretely, where a
                design supports patients and where it falls short.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-muted">
                It began life as a linked Excel workbook used in research settings. This web
                version preserves that scoring logic exactly, while making it something a
                whole team — clinicians, architects, and hospital leadership — can work
                through together.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <ToolkitOverview />

      {/* Partners / acknowledgements */}
      <section>
        <div className="mx-auto max-w-shell px-4 py-20 sm:px-6 lg:py-24">
          <Reveal className="max-w-2xl">
            <p className="eyebrow text-orange-deep">Acknowledgements</p>
            <h2 className="mt-3 font-display text-display-md font-normal text-ink-soft">
              A partnership project.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              RIPCHD.PED — Realizing Improved Patient Care through Human-Centered Design in
              the pediatric emergency department — is a collaboration across research and
              clinical partners.
            </p>
          </Reveal>

          <Reveal delay={60}>
            <ul className="mt-10 grid gap-4 sm:grid-cols-3">
              {partners.map((p) => (
                <li key={p.name} className="card card-lift grad-card p-6">
                  <p className="font-display text-lg text-ink-soft">{p.name}</p>
                  <p className="mt-1 text-sm text-muted">{p.role}</p>
                </li>
              ))}
            </ul>
            {/* TODO(copy): specific grant / funder acknowledgement text — see IMPLEMENT.md. */}
            <p className="mt-6 text-sm text-muted">
              Funding and grant acknowledgement to be added.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <div className="mt-12 flex flex-wrap items-center gap-4">
              <Link
                href="/setup"
                className="cta-primary inline-flex min-h-[52px] items-center justify-center gap-2 rounded-control px-6 text-base font-semibold shadow-card"
              >
                Start the assessment <span aria-hidden>→</span>
              </Link>
              <Link
                href="/contact"
                className="cta-secondary inline-flex min-h-[52px] items-center justify-center rounded-control border border-sand bg-white/50 px-6 text-base font-medium text-ink hover:bg-white"
              >
                Contact the team
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
