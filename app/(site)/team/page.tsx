import type { Metadata } from "next";
import Link from "next/link";
import PageBanner from "@/components/site/PageBanner";
import Reveal from "@/components/site/Reveal";

export const metadata: Metadata = {
  title: "RIPCHD.PED Team · MBH-Friendly ED Design Toolkit",
  description:
    "The research and clinical partners behind the RIPCHD.PED project and the MBH-Friendly ED Design Toolkit.",
};

const partners = [
  { name: "Clemson University", role: "CHFDT · research & design" },
  { name: "Prisma Health", role: "Clinical practice partner" },
  { name: "University of South Carolina", role: "Research partner" },
];

export default function TeamPage() {
  return (
    <>
      <PageBanner
        eyebrow="RIPCHD.PED Team"
        title="The people behind the project."
        subtitle="A collaboration across research and clinical partners, funded by the Agency for Healthcare Research and Quality (AHRQ)."
      />

      <section>
        <div className="mx-auto max-w-shell px-4 py-20 sm:px-6 lg:py-24">
          <Reveal className="max-w-2xl">
            <p className="eyebrow text-orange-deep">Partners</p>
            <h2 className="mt-3 font-display text-display-md font-normal text-ink-soft">
              A partnership project.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              RIPCHD.PED — Realizing Improved Patient Care through Human-Centered Design for
              pediatric mental and behavioral health in the emergency department — brings
              together clinicians, architects, and researchers.
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
            {/* TODO(copy): named team members / roster to be supplied. */}
            <p className="mt-6 text-sm text-muted">
              Full team roster and acknowledgements to be added.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <div className="mt-12 flex flex-wrap items-center gap-4">
              <Link
                href="/setup"
                className="cta-primary inline-flex min-h-[52px] items-center justify-center gap-2 rounded-control px-6 text-base font-semibold shadow-card"
              >
                Open the Design Toolkit <span aria-hidden>→</span>
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
