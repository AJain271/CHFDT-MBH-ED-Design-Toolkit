import Image from "next/image";
import Link from "next/link";

/**
 * Minimal auth chrome (design.md § Landing surface): a focused screen on the Regalia
 * gradient field — logo home-link only, no site nav or footer. Distinct from both the
 * marketing pages and the calm tool.
 */
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative isolate flex min-h-screen flex-col bg-grad-hero">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-regalia-glow/30 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 bottom-10 h-72 w-72 rounded-full bg-orange/20 blur-3xl"
      />

      <header className="relative z-10 px-4 py-6 sm:px-6">
        <Link
          href="/"
          className="inline-flex items-center gap-3"
          aria-label="MBH-Friendly ED Design Toolkit — home"
        >
          <Image
            src="/brand/toolkit-logo.png"
            alt=""
            width={40}
            height={40}
            priority
            className="h-9 w-9 shrink-0"
            aria-hidden
          />
          <span className="font-display text-white">MBH-Friendly ED Design Toolkit</span>
        </Link>
      </header>

      <main className="relative z-10 flex flex-1 items-center justify-center px-4 py-10 sm:px-6">
        {children}
      </main>
    </div>
  );
}
