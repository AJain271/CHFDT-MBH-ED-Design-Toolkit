/**
 * Slim banner opening the About / Contact pages on the warm beige→orange band, so every
 * marketing page shares the same light surface and the fixed header stays legible
 * (design.md § Landing surface).
 */
export default function PageBanner({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="sec-1 relative isolate overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 top-4 h-64 w-64 rounded-full bg-orange/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-20 top-10 h-60 w-60 rounded-full bg-regalia/12 blur-3xl"
      />
      <div className="mx-auto max-w-shell px-4 pb-16 pt-32 sm:px-6 lg:pt-36">
        <p className="eyebrow text-orange-deep">{eyebrow}</p>
        <h1 className="mt-3 max-w-3xl font-display text-[2.4rem] font-normal leading-tight text-ink-soft sm:text-display-lg">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink/80">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
