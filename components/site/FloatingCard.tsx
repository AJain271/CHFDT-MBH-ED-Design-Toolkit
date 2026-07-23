import type { ReactNode } from "react";

/**
 * Frosted "metric card" that floats over the hero illustration
 * (design.md § Landing surface — floating frosted cards). Light panel, soft float
 * shadow, a small colored rail keying it to a value.
 */
export default function FloatingCard({
  eyebrow,
  value,
  sub,
  rail = "orange",
  className = "",
  float,
  children,
}: {
  eyebrow: string;
  value: ReactNode;
  sub?: string;
  /** Left rail accent — the value's meaning color. */
  rail?: "orange" | "regalia" | "yes";
  className?: string;
  /** Ambient float animation class from tailwind (float-slow / float-med). */
  float?: string;
  children?: ReactNode;
}) {
  const railColor =
    rail === "regalia" ? "bg-regalia" : rail === "yes" ? "bg-yes" : "bg-orange";

  return (
    <div
      className={`pointer-events-none flex w-full items-stretch gap-3 rounded-2xl bg-gradient-to-br from-white via-white to-orange-wash/60 p-3.5 pr-4 shadow-float ring-1 ring-white/80 backdrop-blur-sm ${
        float ?? ""
      } ${className}`}
    >
      <span className={`w-1 shrink-0 rounded-full ${railColor}`} aria-hidden />
      <div className="min-w-0">
        <p className="text-[0.62rem] font-semibold uppercase tracking-[0.08em] text-muted">
          {eyebrow}
        </p>
        <p className="font-display text-2xl leading-tight text-ink-soft tnum">{value}</p>
        {sub && <p className="text-xs text-muted">{sub}</p>}
        {children}
      </div>
    </div>
  );
}
