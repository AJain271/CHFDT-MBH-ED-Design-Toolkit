import Link from "next/link";
import Hero from "@/components/site/Hero";
import ProjectOverview from "@/components/site/ProjectOverview";
import ToolkitOverview from "@/components/site/ToolkitOverview";
import ScrollDemo from "@/components/site/ScrollDemo";
import Reveal from "@/components/site/Reveal";

export default function LandingPage() {
  return (
    <>
      <Hero />
      <ProjectOverview />
      <ToolkitOverview />
      <ScrollDemo />

      {/* Closing CTA — the wash deepens into Regalia here, into the footer */}
      <section className="sec-4 relative isolate overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 top-1/3 h-72 w-72 rounded-full bg-orange/20 blur-3xl"
        />
        <div className="mx-auto max-w-shell px-4 pb-24 pt-20 text-center sm:px-6">
          <Reveal>
            <h2 className="mx-auto max-w-2xl font-display text-display-md font-normal text-white">
              Ready to see how your ED design measures up?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/75">
              Start the guided assessment — your progress saves as you go, and you can return
              any time.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/setup"
                className="cta-primary inline-flex min-h-[52px] items-center justify-center gap-2 rounded-control px-6 text-base font-semibold shadow-card"
              >
                Start the assessment <span aria-hidden>→</span>
              </Link>
              <Link
                href="/about"
                className="cta-secondary inline-flex min-h-[52px] items-center justify-center rounded-control border border-white/35 bg-white/10 px-6 text-base font-medium text-white hover:bg-white/20"
              >
                Learn more
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
