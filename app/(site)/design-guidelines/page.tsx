import type { Metadata } from "next";
import Link from "next/link";
import PageBanner from "@/components/site/PageBanner";
import Reveal from "@/components/site/Reveal";

export const metadata: Metadata = {
  title: "Design Guidelines · MBH-Friendly ED Design Toolkit",
  description:
    "The thirteen MBH-friendly ED design guidelines developed through the RIPCHD.PED study.",
};

export default function DesignGuidelinesPage() {
  return (
    <>
      <PageBanner
        eyebrow="Design Guidelines"
        title="The thirteen MBH-friendly ED design guidelines."
        subtitle="The framework that came out of the RIPCHD.PED study — and the backbone of the assessment."
      />

      <section>
        <div className="mx-auto max-w-shell px-4 py-20 sm:px-6 lg:py-24">
          <Reveal className="max-w-2xl">
            <p className="eyebrow text-orange-deep">Coming soon</p>
            <h2 className="mt-3 font-display text-display-md font-normal text-ink-soft">
              Guideline detail is on its way.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              This page will walk through each of the thirteen guidelines — what it means, why
              it matters for pediatric mental and behavioral health care, and the strategies
              that support it. In the meantime, you can work through them inside the guided
              assessment.
            </p>
          </Reveal>

          <Reveal delay={80}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
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
