import HeroCopy from "./HeroCopy";
import HeroIllustration from "./HeroIllustration";

/**
 * Landing hero (design.md § Landing surface). Opens the page's warm beige→orange band with
 * the toolkit's thesis and the plan illustration. Dark ink text on the light wash; orange
 * stays the one loud action. Copy staggers in on load; the illustration parallaxes on scroll.
 */
export default function Hero() {
  return (
    <section className="sec-1 relative isolate overflow-hidden">
      {/* soft ambient tones — the "highlights" of orange + purple */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full bg-regalia/15 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 -top-10 h-80 w-80 rounded-full bg-orange/20 blur-3xl"
      />

      <div className="mx-auto grid max-w-shell items-center gap-12 px-4 pb-16 pt-28 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:pb-16 lg:pt-32">
        <HeroCopy />

        <div className="relative lg:pl-4">
          <HeroIllustration />
        </div>
      </div>
    </section>
  );
}
