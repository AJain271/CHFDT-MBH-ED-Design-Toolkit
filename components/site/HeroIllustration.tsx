"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import FloatingCard from "./FloatingCard";

/**
 * The hero centerpiece (design.md § Landing surface — custom illustration + floating cards).
 * A hand-built, abstract top-down PLAN of an MBH-friendly emergency department — the artifact
 * of the toolkit's own world (architects read plans). Calm treatment bays with staff
 * sightlines, a highlighted sensory-calm room, and an orange care-path threading the space.
 * The frosted metric cards parallax at different depths as the page scrolls (they still float
 * ambiently); the plan drifts gently the other way. Reduced motion holds everything still.
 * All original vector art — no external or stock assets.
 */
export default function HeroIllustration() {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Different travel per card → parallax depth. Static when reduced motion is on.
  const r = (a: number, b: number): [number, number] => (reduce ? [0, 0] : [a, b]);
  const yPlan = useTransform(scrollYProgress, [0, 1], r(-18, 18));
  const yA = useTransform(scrollYProgress, [0, 1], r(52, -52));
  const yB = useTransform(scrollYProgress, [0, 1], r(30, -30));
  const yC = useTransform(scrollYProgress, [0, 1], r(74, -74));
  const yD = useTransform(scrollYProgress, [0, 1], r(18, -18));

  return (
    <motion.div
      ref={ref}
      className="relative mx-auto w-full max-w-[520px]"
      initial={{ opacity: 0, scale: reduce ? 1 : 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.svg
        style={{ y: yPlan }}
        viewBox="0 0 560 640"
        className="w-full drop-shadow-[0_26px_50px_rgba(82,45,128,0.18)]"
        role="img"
        aria-label="Abstract floor plan of a mental and behavioral health–friendly pediatric emergency department: calm treatment bays with staff sightlines, a highlighted sensory-calm room, and an orange care path threading the space."
      >
        <defs>
          <radialGradient id="calm" cx="50%" cy="40%" r="70%">
            <stop offset="0%" stopColor="#f66733" stopOpacity="0.45" />
            <stop offset="55%" stopColor="#7a4bb0" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#7a4bb0" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="path" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#d9531c" />
            <stop offset="100%" stopColor="#f66733" />
          </linearGradient>
          <clipPath id="envelope">
            <path d="M40,600 L40,230 Q40,70 280,70 Q520,70 520,230 L520,600 Q520,624 496,624 L64,624 Q40,624 40,600 Z" />
          </clipPath>
        </defs>

        {/* Building envelope */}
        <path
          d="M40,600 L40,230 Q40,70 280,70 Q520,70 520,230 L520,600 Q520,624 496,624 L64,624 Q40,624 40,600 Z"
          fill="rgba(255,255,255,0.55)"
          stroke="rgba(82,45,128,0.30)"
          strokeWidth="2"
        />

        <g clipPath="url(#envelope)" strokeLinecap="round">
          {/* Sensory-calm room (top, highlighted) */}
          <rect x="196" y="104" width="168" height="118" rx="18" fill="url(#calm)" />
          <rect
            x="196"
            y="104"
            width="168"
            height="118"
            rx="18"
            fill="none"
            stroke="#e07a3f"
            strokeOpacity="0.6"
            strokeWidth="1.5"
          />
          <circle cx="280" cy="150" r="20" fill="#f9c9a8" fillOpacity="0.7" />
          <circle cx="280" cy="150" r="8" fill="#fbe3d2" />
          <circle cx="252" cy="192" r="7" fill="rgba(82,45,128,0.55)" />
          <circle cx="272" cy="196" r="5" fill="rgba(82,45,128,0.4)" />

          {/* Corridor spine */}
          <rect x="252" y="222" width="56" height="300" fill="rgba(82,45,128,0.04)" />

          {/* Treatment bays */}
          {[0, 1, 2].map((i) => {
            const y = 250 + i * 92;
            return (
              <g key={`bay-l-${i}`}>
                <rect
                  x="70"
                  y={y}
                  width="168"
                  height="74"
                  rx="10"
                  fill="rgba(255,255,255,0.5)"
                  stroke="rgba(82,45,128,0.18)"
                  strokeWidth="1.5"
                />
                <rect x="86" y={y + 18} width="46" height="30" rx="6" fill="rgba(82,45,128,0.13)" />
              </g>
            );
          })}
          {[0, 1, 2].map((i) => {
            const y = 250 + i * 92;
            return (
              <g key={`bay-r-${i}`}>
                <rect
                  x="322"
                  y={y}
                  width="168"
                  height="74"
                  rx="10"
                  fill="rgba(255,255,255,0.5)"
                  stroke="rgba(82,45,128,0.18)"
                  strokeWidth="1.5"
                />
                <rect x="428" y={y + 18} width="46" height="30" rx="6" fill="rgba(82,45,128,0.13)" />
              </g>
            );
          })}

          {/* Central staff station */}
          <rect x="256" y="330" width="48" height="60" rx="8" fill="#f66733" fillOpacity="0.18" stroke="#d9531c" strokeOpacity="0.8" strokeWidth="1.5" />
          <circle cx="280" cy="360" r="6" fill="#d9531c" />

          {/* Sightlines from the station to every bay */}
          <g stroke="#d9531c" strokeOpacity="0.42" strokeWidth="1.4" strokeDasharray="2 6">
            <line x1="280" y1="360" x2="120" y2="287" />
            <line x1="280" y1="360" x2="120" y2="379" />
            <line x1="280" y1="360" x2="120" y2="471" />
            <line x1="280" y1="360" x2="440" y2="287" />
            <line x1="280" y1="360" x2="440" y2="379" />
            <line x1="280" y1="360" x2="440" y2="471" />
          </g>

          {/* Waiting / arrival zone */}
          <rect x="70" y="540" width="420" height="72" rx="12" fill="rgba(255,255,255,0.45)" stroke="rgba(82,45,128,0.16)" strokeWidth="1.5" />
          <g fill="rgba(82,45,128,0.42)">
            {[110, 150, 190, 230, 330, 370, 410, 450].map((cx) => (
              <circle key={cx} cx={cx} cy="576" r="7" />
            ))}
          </g>
          <circle cx="280" cy="576" r="10" fill="rgba(86,97,39,0.85)" />

          {/* The care path */}
          <path
            d="M280,624 L280,560 Q280,540 280,522 L280,392 M280,330 L280,222"
            fill="none"
            stroke="url(#path)"
            strokeWidth="3.5"
            strokeDasharray="1 10"
          />
          <circle cx="280" cy="500" r="4" fill="#d9531c" />
          <circle cx="280" cy="410" r="4" fill="#d9531c" />
          <circle cx="280" cy="250" r="4" fill="#d9531c" />
        </g>
      </motion.svg>

      {/* Floating metric cards — parallax (motion) + ambient float (CSS) compose cleanly */}
      <motion.div style={{ y: yA }} className="absolute -left-3 top-[20%] w-[168px] sm:-left-8">
        <FloatingCard eyebrow="Alignment score" value="87%" sub="This ED, scored" rail="yes" float="animate-float-slow" />
      </motion.div>
      <motion.div style={{ y: yB }} className="absolute -right-2 top-[8%] w-[172px] sm:-right-8">
        <FloatingCard eyebrow="Guided flow" value="7 steps" sub="Priorities → report" rail="regalia" float="animate-float-med" />
      </motion.div>
      <motion.div style={{ y: yC }} className="absolute -left-2 bottom-[16%] w-[176px] sm:-left-10">
        <FloatingCard eyebrow="Design guidelines" value="15" sub="Scored for alignment" rail="orange" float="animate-float-med" />
      </motion.div>
      <motion.div style={{ y: yD }} className="absolute -right-1 bottom-[6%] w-[172px] sm:-right-6">
        <FloatingCard eyebrow="Design objectives" value="6" sub="Ranked by your team" rail="regalia" float="animate-float-slow" />
      </motion.div>
    </motion.div>
  );
}
