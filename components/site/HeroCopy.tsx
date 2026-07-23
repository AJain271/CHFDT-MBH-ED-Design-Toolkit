import Link from "next/link";

/**
 * Hero copy with an orchestrated page-load entrance (design.md § Landing surface): headline
 * → eyebrow → subhead → CTAs → attribution stagger in. Deliberately pure CSS (`.hero-in`
 * with per-child delay) rather than JS animation, so the most important content on the page
 * can never be left hidden by a slow or failed script. Reduced motion shows it all at rest.
 */
export default function HeroCopy() {
  return (
    <div className="max-w-xl">
      <h1
        className="hero-in font-display text-[2.6rem] font-normal leading-[1.08] text-ink-soft sm:text-[3.25rem]"
        style={{ animationDelay: "0ms" }}
      >
        Design an emergency department that holds every patient{" "}
        <span className="italic text-orange-deep">calmly</span>.
      </h1>

      <p
        className="hero-in mt-5 inline-flex items-center gap-2 rounded-full border border-orange/30 bg-white/60 px-3 py-1 text-xs font-semibold uppercase tracking-[0.06em] text-orange-deep backdrop-blur-sm"
        style={{ animationDelay: "90ms" }}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-orange" aria-hidden />
        Pediatric MBH-friendly ED design tool
      </p>

      <p
        className="hero-in mt-6 max-w-lg text-lg leading-relaxed text-ink/80"
        style={{ animationDelay: "180ms" }}
      >
        A guided, dependency-chained assessment: your team&apos;s early priorities weight the
        later ones, ending in a per-guideline{" "}
        <span className="font-medium text-ink">alignment score</span> you can share, defend,
        and build from.
      </p>

      <div
        className="hero-in mt-9 flex flex-wrap items-center gap-3"
        style={{ animationDelay: "270ms" }}
      >
        <Link
          href="/setup"
          className="cta-primary inline-flex min-h-[52px] items-center justify-center gap-2 rounded-control px-6 text-base font-semibold shadow-card"
        >
          Start the assessment <span aria-hidden>→</span>
        </Link>
        <Link
          href="/signup"
          className="cta-secondary inline-flex min-h-[52px] items-center justify-center rounded-control border border-sand bg-white/60 px-6 text-base font-medium text-ink backdrop-blur-sm hover:bg-white"
        >
          Create an account
        </Link>
      </div>

      <p className="hero-in mt-8 text-sm text-muted" style={{ animationDelay: "360ms" }}>
        Built by Clemson University&apos;s CHFDT · Part of the RIPCHD.PED project
      </p>
    </div>
  );
}
