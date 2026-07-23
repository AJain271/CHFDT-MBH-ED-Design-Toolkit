"use client";

import { useState } from "react";

/** Destination inbox — placeholder pending the real address (see IMPLEMENT.md). */
const CONTACT_EMAIL = "chfdt@clemson.edu";

type Payload = {
  name: string;
  email: string;
  organization: string;
  message: string;
};

/**
 * The whole "how it sends" concern lives here so wiring a real backend later is a
 * one-function change (see IMPLEMENT.md → Contact form).
 *
 * For now it composes a pre-filled email in the visitor's mail client — real enough to be
 * useful, no server required.
 *
 * TODO(api): replace the mailto with
 *   await fetch("/api/contact", { method: "POST", body: JSON.stringify(payload) })
 * and surface server validation errors.
 */
async function submitContact(payload: Payload): Promise<void> {
  const subject = encodeURIComponent(`Toolkit enquiry — ${payload.name}`);
  const body = encodeURIComponent(
    `Name: ${payload.name}\nEmail: ${payload.email}\nOrganization: ${payload.organization}\n\n${payload.message}`,
  );
  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
}

const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export default function ContactForm() {
  const [form, setForm] = useState<Payload>({
    name: "",
    email: "",
    organization: "",
    message: "",
  });
  const [honey, setHoney] = useState(""); // spam honeypot — humans never fill this
  const [errors, setErrors] = useState<Partial<Record<keyof Payload, string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  function set<K extends keyof Payload>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function validate(): boolean {
    const next: Partial<Record<keyof Payload, string>> = {};
    if (!form.name.trim()) next.name = "Please add your name.";
    if (!form.email.trim()) next.email = "Please add your email.";
    else if (!emailOk(form.email)) next.email = "That email doesn't look right.";
    if (!form.message.trim()) next.message = "Let us know how we can help.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (honey) return; // bot
    if (!validate()) return;
    setStatus("sending");
    await submitContact(form);
    setStatus("sent");
  }

  if (status === "sent") {
    return (
      <div className="card grad-card p-8 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-yes/15 text-yes">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M5 13l4 4L19 7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h3 className="mt-4 font-display text-display-sm font-normal text-ink-soft">
          Your message is ready to send.
        </h3>
        <p className="mx-auto mt-2 max-w-sm text-muted">
          We opened a pre-filled email in your mail app. Prefer to write directly? Reach us at{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="font-medium text-orange-deep underline-offset-4 hover:underline"
          >
            {CONTACT_EMAIL}
          </a>
          .
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 inline-flex min-h-[44px] items-center justify-center rounded-control border border-sand px-5 text-sm font-medium text-ink transition-colors hover:bg-panel"
        >
          Write another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="card grad-card p-6 sm:p-8">
      {/* honeypot */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={honey}
        onChange={(e) => setHoney(e.target.value)}
        className="hidden"
        aria-hidden
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Name"
          id="name"
          value={form.name}
          onChange={(v) => set("name", v)}
          error={errors.name}
          autoComplete="name"
        />
        <Field
          label="Email"
          id="email"
          type="email"
          value={form.email}
          onChange={(v) => set("email", v)}
          error={errors.email}
          autoComplete="email"
        />
      </div>

      <div className="mt-5">
        <Field
          label="Organization"
          id="organization"
          optional
          value={form.organization}
          onChange={(v) => set("organization", v)}
          autoComplete="organization"
        />
      </div>

      <div className="mt-5">
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-ink">
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          value={form.message}
          onChange={(e) => set("message", e.target.value)}
          aria-invalid={!!errors.message}
          className="field resize-y"
          placeholder="Tell us about your project or question…"
        />
        {errors.message && <p className="mt-1.5 text-sm text-no">{errors.message}</p>}
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="cta-primary mt-7 inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-control px-6 text-base font-semibold shadow-card disabled:opacity-60 sm:w-auto"
      >
        {status === "sending" ? "Sending…" : "Send message"}
        {status !== "sending" && <span aria-hidden>→</span>}
      </button>
      <p className="mt-3 text-xs text-muted">
        This preview composes an email in your mail app. A hosted form is on the way.
      </p>
    </form>
  );
}

function Field({
  label,
  id,
  value,
  onChange,
  error,
  type = "text",
  optional = false,
  autoComplete,
}: {
  label: string;
  id: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  type?: string;
  optional?: boolean;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-ink">
        {label}
        {optional && <span className="ml-1 text-xs font-normal text-muted">(optional)</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={!!error}
        autoComplete={autoComplete}
        className="field"
      />
      {error && <p className="mt-1.5 text-sm text-no">{error}</p>}
    </div>
  );
}
