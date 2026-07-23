"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Mode = "signin" | "signup";

const copy: Record<Mode, { title: string; sub: string; cta: string; altText: string; altHref: string; altLabel: string }> = {
  signin: {
    title: "Welcome back",
    sub: "Sign in to pick up your assessment.",
    cta: "Sign in",
    altText: "New to the toolkit?",
    altHref: "/signup",
    altLabel: "Create an account",
  },
  signup: {
    title: "Create your account",
    sub: "Save your progress and return any time.",
    cta: "Create account",
    altText: "Already have an account?",
    altHref: "/signin",
    altLabel: "Sign in",
  },
};

/**
 * MOCK authentication (see IMPLEMENT.md → Authentication). No accounts exist yet, so the
 * form validates but does not authenticate — it routes into the tool as a guest. Kept honest
 * with a visible notice so it's never mistaken for a working login.
 */
export default function AuthCard({ mode }: { mode: Mode }) {
  const router = useRouter();
  const c = copy[mode];
  const [busy, setBusy] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO(auth): call the real auth provider; on success route to /setup or the saved step.
    setBusy(true);
    router.push("/setup");
  }

  return (
    <div className="grad-card w-full max-w-md rounded-card p-7 shadow-glow sm:p-9">
      <span className="inline-flex items-center gap-2 rounded-full bg-regalia-wash px-3 py-1 text-xs font-medium text-regalia">
        Preview · accounts coming soon
      </span>
      <h1 className="mt-4 font-display text-display-sm font-normal text-ink-soft">{c.title}</h1>
      <p className="mt-1 text-muted">{c.sub}</p>

      <form onSubmit={onSubmit} className="mt-7 space-y-5">
        {mode === "signup" && (
          <div>
            <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-ink">
              Full name
            </label>
            <input id="name" type="text" autoComplete="name" className="field" required />
          </div>
        )}
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink">
            Email
          </label>
          <input id="email" type="email" autoComplete="email" className="field" required />
        </div>
        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium text-ink">
              Password
            </label>
            {mode === "signin" && (
              <span className="text-xs text-muted">Reset (coming soon)</span>
            )}
          </div>
          <input
            id="password"
            type="password"
            autoComplete={mode === "signup" ? "new-password" : "current-password"}
            className="field"
            required
          />
        </div>

        <button
          type="submit"
          disabled={busy}
          className="cta-primary inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-control px-6 text-base font-semibold shadow-card disabled:opacity-60"
        >
          {c.cta} <span aria-hidden>→</span>
        </button>
      </form>

      <div className="my-6 flex items-center gap-3 text-xs uppercase tracking-[0.06em] text-muted">
        <span className="h-px flex-1 bg-sand" />
        or
        <span className="h-px flex-1 bg-sand" />
      </div>

      <Link
        href="/setup"
        className="inline-flex min-h-[48px] w-full items-center justify-center rounded-control border border-sand text-sm font-medium text-ink transition-colors hover:bg-panel"
      >
        Continue as guest
      </Link>

      <p className="mt-6 text-center text-sm text-muted">
        {c.altText}{" "}
        <Link
          href={c.altHref}
          className="font-medium text-orange-deep underline-offset-4 hover:underline"
        >
          {c.altLabel}
        </Link>
      </p>
    </div>
  );
}
