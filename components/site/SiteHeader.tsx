"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/design-guidelines", label: "Design Guidelines" },
  { href: "/setup", label: "Design Toolkit" },
  { href: "/team", label: "RIPCHD.PED Team" },
  { href: "/contact", label: "Contact Us" },
];

/**
 * Marketing-surface header (design.md § Landing surface). The page reads light beige at
 * the top, so text stays dark ink throughout — always legible. The bar is transparent over
 * the hero and condenses to a frosted panel on scroll. The active tab is marked with a
 * curved orange pill. No logo lockup for now — a clean wordmark carries identity.
 */
export default function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter,border-color] duration-300 ease-out-soft ${
        scrolled || open
          ? "border-b-2 border-sand bg-canvas/85 shadow-[0_4px_18px_-6px_rgba(38,48,58,0.16)] backdrop-blur-md"
          : "border-b-2 border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-shell items-center justify-between gap-4 px-4 py-3.5 sm:px-6">
        {/* Wordmark — the toolkit badge + clear type */}
        <Link
          href="/"
          className="group flex items-center gap-2.5"
          aria-label="MBH-Friendly ED Design Toolkit — home"
        >
          <Image
            src="/brand/toolkit-logo.png"
            alt=""
            width={40}
            height={40}
            priority
            className="h-9 w-9 shrink-0 transition-transform group-hover:scale-105"
            aria-hidden
          />
          <span className="flex flex-col leading-tight">
            <span className="font-display text-[1.05rem] font-medium tracking-tight text-ink">
              MBH-Friendly ED
            </span>
            <span className="text-[0.68rem] font-medium uppercase tracking-[0.14em] text-muted">
              Design Toolkit
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {NAV.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`whitespace-nowrap rounded-full px-3 py-2 text-[0.9rem] font-medium transition-colors ${
                  active
                    ? "border border-orange/45 bg-orange-wash text-orange-deep"
                    : "border border-transparent text-ink-soft hover:bg-ink/[0.07] hover:text-ink"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Link
            href="/signin"
            className="cta-secondary whitespace-nowrap rounded-full px-3 py-2 text-[0.9rem] font-medium text-ink-soft hover:bg-ink/[0.07] hover:text-ink"
          >
            Sign in
          </Link>
          <Link
            href="/signup"
            className="cta-primary inline-flex min-h-[42px] items-center justify-center gap-2 whitespace-nowrap rounded-full px-4 text-[0.9rem] font-semibold shadow-card"
          >
            Get started <span aria-hidden>→</span>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="inline-flex h-11 w-11 items-center justify-center rounded-control text-ink lg:hidden"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
            {open ? (
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M4 7h16M4 12h16M4 17h16"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu sheet */}
      {open && (
        <div
          id="mobile-menu"
          className="border-t border-sand bg-canvas/95 px-4 pb-6 pt-2 backdrop-blur-md lg:hidden"
        >
          <nav className="flex flex-col" aria-label="Primary">
            {NAV.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`border-b border-sand/70 py-3 text-base font-medium ${
                    active ? "text-orange-deep" : "text-ink-soft"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="mt-4 flex flex-col gap-2">
            <Link
              href="/signin"
              className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-sand text-sm font-medium text-ink"
            >
              Sign in
            </Link>
            <Link
              href="/signup"
              className="cta-primary inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full text-sm font-semibold"
            >
              Get started <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
