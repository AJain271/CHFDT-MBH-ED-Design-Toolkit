import Image from "next/image";
import Link from "next/link";

/**
 * Hero copy with an orchestrated page-load entrance (design.md § Landing surface): the CHFDT
 * lockup + title card → subhead → CTAs → attribution stagger in. Deliberately pure CSS
 * (`.hero-in` with per-child delay) rather than JS animation, so the most important content on
 * the page can never be left hidden by a slow or failed script. Reduced motion shows it all
 * at rest.
 *
 * The A+H (Center for Health Facilities Design & Testing) lockup and the project's own title —
 * "Mental and Behavioral Health Friendly Emergency Department Design" — share a single white
 * card over the warm wash, echoing the RIPCHD.PED site's hero. The logo is a transparent PNG,
 * so it sits directly on the white ground with no chip of its own.
 */
export default function HeroCopy() {
  return (
    <div className="max-w-xl">
      <div
        className="hero-in rounded-xl bg-white px-7 py-6 shadow-card ring-1 ring-sand sm:px-9"
        style={{ animationDelay: "0ms" }}
      >
        <Image
          src="/brand/chfdt-logo.png"
          alt="Center for Health Facilities Design & Testing"
          width={360}
          height={103}
          priority
          className="h-auto w-[200px] sm:w-[270px]"
        />
        <h1 className="mt-5 font-display text-[1.5rem] font-medium leading-[1.15] text-regalia sm:text-[1.95rem]">
          Mental and Behavioral Health Friendly Emergency Department Design
        </h1>
        <div className="mt-4 h-0.5 w-full rounded-full bg-regalia/80" aria-hidden />
      </div>

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
