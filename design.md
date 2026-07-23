# MBH-Friendly ED Design Toolkit — Design System (design.md)

This file governs the visual identity. It **overrides** any styling notes elsewhere in
the build spec. Derive every color and type decision from here.

## Direction in one line
Warm, minimalist, and calm — a Notion/Anthropic-like reading experience with authentic
Clemson identity, built on a light oat/beige canvas. Professional and quiet, alive in
small ways, never busy. This is a serious tool used by clinicians, architects, and
hospital leadership, so it should feel trustworthy first and characterful second.

Built for **Clemson University's Center for Health Facilities Design & Testing (CHFDT)** —
the Clemson connection is the reason for the palette, not decoration.

## Anti-goals (avoid these)
- The generic "AI cream + terracotta/clay (#D97757) accent" look. We use **true Clemson
  Orange**, which is brighter and more saturated, precisely to sidestep that cliché.
- Corporate SaaS blue, neon accents, heavy gradients, glassmorphism, drop-shadow overload.
- Dense dashboards. Favor whitespace and one clear focus per screen.

## Color palette
Grounded in Clemson's official brand palette (clemson.edu/brand). Named tokens:

| Token | Hex | Role |
|---|---|---|
| `--canvas` (Oat) | `#FAF7F0` | Page background — light warm off-white |
| `--panel` (Parchment) | `#F3EDE1` | Cards, sidebars, raised surfaces |
| `--sand` | `#E7DECD` | Hairline borders, dividers, input outlines |
| `--ink` (Blue Ridge deep) | `#26303A` | Primary text |
| `--ink-soft` (Blue Ridge) | `#3A4958` | Headings / secondary ink (official Clemson) |
| `--muted` (Howard's Rock) | `#6B6058` | Captions, helper text, placeholders |
| `--orange` (Clemson Orange) | `#F66733` | Primary accent — CTAs, active state, highlights |
| `--orange-deep` | `#D9531C` | Accent for text-bearing fills (AA contrast) |
| `--orange-wash` | `#FCE9DF` | Selected/hover backgrounds, subtle fills |
| `--regalia` (Regalia) | `#522D80` | Secondary accent — links, step markers (sparing) |
| `--regalia-wash` | `#ECE6F2` | Regalia-tinted panels/badges |

DAT answer + status colors (from Clemson's secondary palette, kept warm):

| Meaning | Token | Hex |
|---|---|---|
| Yes / aligned | `--yes` (Bowman) | `#566127` |
| Maybe / partial | `--maybe` (deep Anna's Lace) | `#C9922E` |
| No / gap | `--no` (brick) | `#9E3B2E` |
| Not Applicable | `--na` (Innovation) | `#86898C` |

**Usage discipline:** orange is the one loud color — reserve it for the single most
important action or state on any given screen. Regalia is the quiet academic counterpoint;
use it for navigation accents and step numbering, never next to orange competing for
attention. Everything else is oat, parchment, ink.

**Contrast:** use `--orange-deep` (not `--orange`) whenever orange sits behind white text
or acts as body-size text, to meet WCAG AA. `--orange` is for large accents, icons, bars,
and active borders. Body text is always `--ink` on `--canvas`/`--panel`.

## Typography
Two roles, pairing a warm serif with a clean humanist sans. All available on Google Fonts.

- **Display — Fraunces** (soft, warm "old-style" serif). Page titles, section headers, the
  big alignment-score numerals. Use with restraint: a few large moments, not everywhere.
  Weights 400/500 for headings, optical size set high for display sizes.
- **Body / UI — Inter** (neutral, highly legible). All form labels, inputs, tables, body
  copy, buttons. Enable `font-feature-settings: "tnum"` for the report's numeric columns so
  figures align.
- Alt if Inter feels too cool: **Hanken Grotesk** for body warmth. Pick one and commit.

Type scale (rem, 1rem = 16px): 3.0 / 2.25 / 1.75 (Fraunces) — 1.125 / 1.0 / 0.875 / 0.75
(Inter). Line-height 1.6 for body, 1.15 for display. Generous letter-spacing on small
uppercase eyebrows/labels only (`0.06em`); none on body.

## Layout
- **Persistent left rail** on desktop holding the step navigation; collapses to a slim top
  progress bar on mobile (< 768px).
- **Single centered content column**, max-width ~760px for forms and prioritization steps;
  widen to ~1080px only for the Design Alignment matrix and the Report.
- Content sits on `--panel` cards floated over the `--canvas`, ~16px radius, 1px `--sand`
  border, very soft shadow (`0 1px 2px rgba(38,48,58,.04)`), not heavier.
- **Sticky section header** showing the current step title, autosave status ("Saved"), and
  step progress. Roomy padding throughout — err spacious.

## Signature element
The **dependency-chain stepper** in the left rail. Because the toolkit's whole logic is
that each step feeds the next, render the steps connected by a vertical line that *fills
with orange* as the user progresses — the connection is the brand. Completed steps get a
regalia check, the active step an orange marker, upcoming steps a quiet `--sand` dot. This
is the one memorable device; keep everything around it calm. On the Report, the alignment
scores reveal with a gentle count-up and bar-fill — the second and last "alive" moment.

## Motion — "alive but not too much"
- Transitions 150–220ms, ease-out. Step changes: fade + 8px slide. Cards: on hover, 1px
  lift + shadow deepen. Buttons: quick background/scale (0.98 active).
- The stepper line and report bars animate once on entry, not on loop.
- Respect `prefers-reduced-motion: reduce` — disable slides/fills, keep instant states.

## Components (styling intent)
- **Buttons:** primary = `--orange-deep` fill, white text, 10px radius; secondary =
  `--ink` text on transparent with `--sand` border; ghost = text-only in `--ink-soft`.
- **Importance selector:** a horizontal segmented control (Not → Critically), filling
  toward orange as importance rises. Not a plain dropdown — this is a frequent action.
- **Yes/No/Maybe/NA toggle:** segmented, color-coded via the status tokens, with the label
  visible (not just color) for accessibility.
- **Inputs/selects:** `--panel` fill, `--sand` border, `--orange` focus ring (2px), ample
  height (44px min touch target).
- **Report table:** zebra rows in `--canvas`/`--panel`, alignment % shown as a number +
  a horizontal bar tinted by score (low→`--no`, mid→`--maybe`, high→`--yes`).
- **Toasts / empty states:** warm and directive, never apologetic. An empty report says
  "Answer the alignment questions to see your scores," not "No data."

## Clemson branding (do it correctly)
Official assets are now in hand, in `/public/brand/` (source: `Brand Assets/`). Use these
exact files — **do not fabricate a logo or recolor the tiger paw.**

| File | What it is | Where it belongs |
|---|---|---|
| `chfdt-logo.jpg` | The CHFDT "A+H" lockup — "Center for Health Facilities Design & Testing" (orange + Innovation gray, orange medical cross) | Header lockup, primary. Sits in a white/`--panel` chip since the artwork is on white. |
| `college-aac.png` | "College of Architecture, Art and Construction" with the orange tiger paw + Regalia-purple wordmark | Footer attribution, and the welcome screen. Already on the brand palette (orange paw + `--regalia` type). |
| `clemson-paw.svg` | The Clemson tiger paw, official orange | Small mark — favicon, stepper flourish, quiet accents. Never recolored. |
| `toolkit-logo.png` | The toolkit's own badge — a hexagon enclosing an isometric ED room (window, door + medical cross, wayfinding dots), Clemson orange line-art on transparent | The product mark. Paired with the "MBH-Friendly ED / Design Toolkit" wordmark in the marketing header and the auth screen. Reads on both the light beige surface and the dark auth field. |

- **Header lockup:** `chfdt-logo.jpg` at a restrained height (~34–40px), left-aligned, with
  the app name ("MBH-Friendly ED Design Toolkit") set in Inter beside or below it. Because
  the JPG is on a white ground, seat it on a small white rounded chip so it reads as an
  intentional lockup, not a stray rectangle over the oat canvas.
- **Footer:** the `college-aac.png` lockup, small and quiet, plus attribution text to CHFDT
  and the RIPCHD.PED project partners (Clemson, Prisma Health, University of South Carolina).
- The tiger paw (`clemson-paw.svg`) is the app favicon and can appear as a small quiet mark;
  keep it official orange and never stretch or recolor it.
- Orange is the tie to Clemson; that's enough. Don't over-brand every surface — one lockup
  in the header, one in the footer, the paw as a small mark. Let oat/parchment/ink carry the rest.

## Landing surface (marketing pages only)
Everything above governs the **tool** — the wizard, its forms, the report. The **public
front door** (landing `/`, `/about`, `/contact`, and the `/signin` · `/signup` screens) is a
deliberately separate, more expressive surface. It exists to introduce the toolkit and the
CHFDT to first-time visitors, so it may be richer than the calm tool — but it stays the same
brand, not a different one.

What the landing surface is allowed that the tool is not:
- **A Regalia gradient field.** Deep purple hero built from `--grad-hero` (Regalia →
  `--regalia-deep`, with a warm orange bleed in one corner). Regalia carries the atmosphere
  here; on the tool it stays a quiet accent. Tokens: `--regalia-deep/-mid/-glow`, `--grad-hero`,
  `--grad-cta`, `--grad-thread`.
- **Floating frosted cards.** Light `--panel-frost` cards lifted with `--shadow-float` over
  the hero — the "metric card" device. On the oat canvas, glass panels use `--regalia-veil`.
- **Richer entrance motion.** Scroll-reveal (`.reveal`, fade + 20px rise) and slow ambient
  float on the hero cards. Still one orchestrated moment per section, never a loop of effects.

What does **not** change, ever:
- **Orange is still the one loud action color** — reserved for primary CTAs (`--grad-cta` /
  `--orange-deep`). Regalia is atmosphere; it never competes with orange for "act here."
- **AA contrast** (white text only on `--regalia-deep`/`--regalia-mid`, never on light orange),
  visible keyboard focus, `prefers-reduced-motion` honored (floats stop, reveals show at once),
  responsive to 360px. Fraunces + Inter only — Fraunces *italic* may accent one hero word.
- **Brand assets** stay the three official files; the paw is never recolored or stretched.

The **signature marketing motif** is the *dependency chain*: a Regalia→Orange gradient thread
(`--grad-thread` / `.thread-line`) that visually connects priorities to the alignment score,
echoing the tool's stepper connector — the same idea that makes the toolkit itself, expressed
on the front door.

The wizard tool (`app/(wizard)`) uses **none** of these tokens and remains bound by the
anti-goals above. Keep the two surfaces recognizably one family: shared oat canvas in content
sections, shared type, shared orange.

## Quality floor (non-negotiable)
Responsive to 360px; visible keyboard focus on every interactive element; AA contrast
throughout; full keyboard operability of the stepper and toggles; reduced-motion honored;
labels tied to inputs. Ship this by default, no announcement needed.

## Voice & copy
Plain, active, sentence case. Name things by what the user controls ("Save answers," not
"Submit"). An action keeps its name through the flow (the "Save" button produces a "Saved"
status). Helper text explains, it doesn't sell. Keep the toolkit's own domain terms
(objectives, guidelines, alignment score) exactly as the workbook uses them.
