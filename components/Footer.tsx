import Image from "next/image";

/**
 * Quiet footer: the College of Architecture, Art and Construction lockup +
 * attribution to CHFDT and the RIPCHD.PED project partners
 * (design.md § Clemson branding).
 */
export default function Footer() {
  return (
    <footer className="mt-16 border-t border-sand bg-panel/60">
      <div className="mx-auto flex max-w-wide flex-col gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <Image
          src="/brand/college-aac.png"
          alt="Clemson University — College of Architecture, Art and Construction"
          width={180}
          height={54}
          className="h-11 w-auto"
        />
        <div className="max-w-md text-xs leading-relaxed text-muted">
          <p>
            Built by the{" "}
            <span className="text-ink-soft">Center for Health Facilities Design &amp; Testing (CHFDT)</span>{" "}
            at Clemson University.
          </p>
          <p className="mt-1">
            Part of the RIPCHD.PED project, in partnership with Clemson University, Prisma
            Health, and the University of South Carolina.
          </p>
        </div>
      </div>
    </footer>
  );
}
