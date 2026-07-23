import type { Config } from "tailwindcss";

/**
 * Tailwind maps the CSS variables from styles/tokens.css (generated from design.md).
 * Colors are referenced as bg-canvas, text-ink, border-sand, etc.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "var(--canvas)",
        panel: "var(--panel)",
        sand: "var(--sand)",
        ink: "var(--ink)",
        "ink-soft": "var(--ink-soft)",
        muted: "var(--muted)",
        orange: "var(--orange)",
        "orange-deep": "var(--orange-deep)",
        "orange-wash": "var(--orange-wash)",
        regalia: "var(--regalia)",
        "regalia-wash": "var(--regalia-wash)",
        "regalia-deep": "var(--regalia-deep)",
        "regalia-mid": "var(--regalia-mid)",
        "regalia-glow": "var(--regalia-glow)",
        yes: "var(--yes)",
        maybe: "var(--maybe)",
        no: "var(--no)",
        na: "var(--na)",
      },
      fontFamily: {
        display: "var(--font-display)",
        body: "var(--font-body)",
      },
      fontSize: {
        // Fraunces display scale
        "display-lg": ["3rem", { lineHeight: "1.15" }],
        "display-md": ["2.25rem", { lineHeight: "1.15" }],
        "display-sm": ["1.75rem", { lineHeight: "1.2" }],
        // Inter body scale
        lg: ["1.125rem", { lineHeight: "1.6" }],
        base: ["1rem", { lineHeight: "1.6" }],
        sm: ["0.875rem", { lineHeight: "1.55" }],
        xs: ["0.75rem", { lineHeight: "1.5" }],
      },
      letterSpacing: {
        eyebrow: "0.06em",
      },
      borderRadius: {
        card: "var(--radius-card)",
        control: "var(--radius-control)",
      },
      boxShadow: {
        card: "var(--shadow-card)",
        "card-hover": "var(--shadow-card-hover)",
        float: "var(--shadow-float)",
        glow: "var(--shadow-glow)",
      },
      backgroundImage: {
        "grad-hero": "var(--grad-hero)",
        "grad-cta": "var(--grad-cta)",
        "grad-thread": "var(--grad-thread)",
      },
      maxWidth: {
        form: "760px",
        wide: "1080px",
        shell: "1200px",
      },
      transitionTimingFunction: {
        "out-soft": "var(--ease-out)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        "float-slow": "float 7s ease-in-out infinite",
        "float-med": "float 5.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
