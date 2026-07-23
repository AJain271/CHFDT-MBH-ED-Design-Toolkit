import Image from "next/image";
import Link from "next/link";

/**
 * Rich marketing footer (design.md § Landing surface, § Clemson branding). Three columns —
 * CHFDT contact + lockup, project acknowledgements, and the Clemson link — over a quiet
 * Regalia-deep field so it reads as the closing bookend to the gradient hero.
 *
 * NOTE: the contact email/address and the funding line are placeholders pending real
 * copy from the team — tracked in IMPLEMENT.md. No funders are invented here.
 */
export default function SiteFooter() {
  return (
    <footer className="bg-regalia-deep text-white/80">
      {/* Thread motif: the dependency chain closing the page. */}
      <div className="h-1 w-full bg-grad-thread" aria-hidden />

      <div className="mx-auto max-w-shell px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-3">
          {/* CHFDT contact */}
          <div>
            <span className="inline-flex items-center rounded-lg bg-white p-2 shadow-card ring-1 ring-white/10">
              <Image
                src="/brand/chfdt-logo.jpg"
                alt="Center for Health Facilities Design & Testing"
                width={150}
                height={44}
                className="h-9 w-auto"
              />
            </span>
            <p className="mt-4 text-sm leading-relaxed text-white/70">
              Center for Health Facilities Design &amp; Testing (CHFDT), part of Clemson
              University&apos;s College of Architecture, Art and Construction.
            </p>
            <ul className="mt-4 space-y-1.5 text-sm">
              <li>
                <a
                  href="mailto:chfdt@clemson.edu"
                  className="text-white/80 underline-offset-4 hover:text-white hover:underline"
                >
                  chfdt@clemson.edu
                </a>
              </li>
              <li className="text-white/60">Lee Hall, Clemson University</li>
              <li className="text-white/60">Clemson, SC 29634</li>
              <li>
                <Link
                  href="/contact"
                  className="font-medium text-white underline-offset-4 hover:underline"
                >
                  Contact the team →
                </Link>
              </li>
            </ul>
          </div>

          {/* Acknowledgements */}
          <div>
            <p className="eyebrow text-white/50">Acknowledgements</p>
            <p className="mt-4 text-sm leading-relaxed text-white/70">
              This toolkit is part of the{" "}
              <span className="text-white">RIPCHD.PED</span> project — Realizing Improved
              Patient Care through Human-Centered Design in the pediatric emergency
              department.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-white/70">
              Developed in partnership with{" "}
              <span className="text-white/90">Clemson University</span>,{" "}
              <span className="text-white/90">Prisma Health</span>, and the{" "}
              <span className="text-white/90">University of South Carolina</span>.
            </p>
            {/* TODO(copy): replace with the specific grant / funder acknowledgement. */}
            <p className="mt-3 text-xs leading-relaxed text-white/45">
              Funding and grant acknowledgement to be added.
            </p>
          </div>

          {/* Clemson */}
          <div className="md:justify-self-end">
            <p className="eyebrow text-white/50">A Clemson University initiative</p>
            <a
              href="https://www.clemson.edu"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-3 rounded-card p-1 transition-colors hover:bg-white/5"
              aria-label="Clemson University home page (opens in a new tab)"
            >
              <Image
                src="/brand/clemson-paw.svg"
                alt=""
                width={40}
                height={40}
                className="h-9 w-9"
              />
              <span className="flex flex-col leading-tight">
                <span className="font-display text-lg text-white">Clemson University</span>
                <span className="text-xs text-white/55">clemson.edu →</span>
              </span>
            </a>
            <div className="mt-6 inline-flex rounded-lg bg-white/95 p-2.5">
              <Image
                src="/brand/college-aac.png"
                alt="Clemson University — College of Architecture, Art and Construction"
                width={190}
                height={57}
                className="h-11 w-auto"
              />
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Clemson University · CHFDT. All rights reserved.</p>
          <p>MBH-Friendly ED Design Toolkit — a RIPCHD.PED tool.</p>
        </div>
      </div>
    </footer>
  );
}
