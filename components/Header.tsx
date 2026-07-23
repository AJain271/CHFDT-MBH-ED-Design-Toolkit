import Image from "next/image";
import Link from "next/link";

/**
 * App header with the official CHFDT lockup. The artwork is on a white ground,
 * so it sits on a small white chip to read as an intentional lockup over the
 * oat canvas (design.md § Clemson branding).
 */
export default function Header() {
  return (
    <header className="border-b border-sand bg-canvas/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-wide items-center gap-3 px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-3" aria-label="MBH-Friendly ED Design Toolkit — home">
          <span className="inline-flex items-center rounded-lg bg-white p-1.5 shadow-card ring-1 ring-sand">
            <Image
              src="/brand/chfdt-logo.jpg"
              alt="Center for Health Facilities Design & Testing"
              width={132}
              height={38}
              priority
              className="h-[34px] w-auto"
            />
          </span>
          <span className="hidden flex-col leading-tight sm:flex">
            <span className="font-display text-base text-ink-soft">
              MBH-Friendly ED Design Toolkit
            </span>
            <span className="text-xs text-muted">Pediatric emergency department design</span>
          </span>
        </Link>
      </div>
    </header>
  );
}
