# IMPLEMENT.md — what still needs to be built for real

This tracks the parts of the **marketing surface** (landing / about / contact / auth) that
are currently **visual only** and need real wiring later. The tool itself (wizard, scoring,
persistence) is complete and unaffected by anything here. See `BUILD_SPEC.md` for scope and
`design.md § Landing surface` for the visual rules these pages follow.

Status legend: `[ ]` not started · `[~]` stubbed/visual only · `[x]` done.

## Contact form → real delivery
- `[~]` **Contact form UI** — built at `app/(site)/contact/page.tsx` +
  `components/site/ContactForm.tsx`. Client-side validation and success/error states work;
  the submit handler is isolated in one function (`submitContact()`) so only that swaps.
- `[ ]` **API route** — add `app/api/contact/route.ts` (POST) that validates the payload
  `{ name, email, organization, message }` server-side and sends the email.
- `[ ]` **Email delivery** — pick a provider (Resend / AWS SES / SMTP), add the API key to
  env (`.env.local`, and Vercel project env), send to the CHFDT destination address.
- `[ ]` **Destination address** — CONFIRM the real inbox to receive submissions.
  (Currently the form composes a `mailto:` to a placeholder address — replace it.)
- `[ ]` **Anti-spam** — honeypot field is present in the UI; add rate-limiting / a captcha
  if abuse appears.

## Authentication (replace the mock)
- `[~]` **Mock Sign in / Sign up screens** — `app/(auth)/signin` and `app/(auth)/signup`.
  Styled, validated, non-functional; both currently route to `/setup` ("continue as guest").
- `[ ]` **Real auth** — accounts + sessions (e.g. NextAuth/Auth.js, Clerk, or Supabase auth).
  This pairs with the cloud persistence move: swap `LocalStorageStore` for `ApiStore` behind
  the existing `AssessmentStore` interface (`lib/store/`, BUILD_SPEC §7) so saved assessments
  follow the account.
- `[ ]` **Gate + guest mode** — decide what requires an account vs. what stays local-only;
  keep a guest path into the tool.

## Content the user still needs to supply
- `[ ]` **Acknowledgements / funding text** — the footer + about page have a clearly-marked
  placeholder for specific grant/funder wording. Provide the exact text (no funders were
  invented). Partner attribution (Clemson, Prisma Health, USC) is already in place.
- `[ ]` **CHFDT contact details** — confirm the public email and mailing address shown in the
  footer and on the contact page (placeholders are in now).

## Imagery & media to source (optional, would elevate the landing)
The hero is a hand-built SVG (no external assets needed to ship). Real media would add
authenticity — the team retrieves these; drop into `/public/media/`:
- `[ ]` **Photos of RIPCHD.PED prototype / simulation ED spaces** — the strongest add; real
  research imagery is unique where stock looks generic. Landscape, ≥1600px wide, JPG/WebP.
  Placement: a band in the Project/About section.
- `[ ]` **Sensory-calm room detail shots** (lighting, materials, nature views) — a small
  gallery/feature strip on About. ≥1200px.
- `[ ]` **CHFDT team photo or Lee Hall exterior** — human touch on About / footer. ≥1200px.
- `[ ]` **Short ambient video (optional)** — 10–20s silent, calm, looping clip for a hero or
  section background. MP4 + WebM, ≤5 MB, 1920×1080, muted, `loop`, with a poster image;
  must pause under `prefers-reduced-motion`.
- `[ ]` **Open Graph / social share image** (1200×630) for link previews — can be generated
  in-repo from the brand system if preferred over a photo.
- `[ ]` Analytics (privacy-respecting) if the team wants visit data.

## Notes
- Landing motion uses **framer-motion** (added dep) for reveals, hero stagger, hero-card
  parallax, and the scroll-fill step thread; plus a native CSS `animation-timeline`
  scroll-progress bar (no JS). All honor `prefers-reduced-motion`. The wizard tool is
  untouched and dependency-light.
