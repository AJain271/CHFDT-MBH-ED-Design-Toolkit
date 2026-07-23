"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { STEPS } from "@/lib/steps";

/**
 * The seven-step chain with a thread that FILLS with the Regalia→Orange gradient as you
 * scroll through it — the marketing echo of the tool's own stepper connector, whose whole
 * premise is that each step feeds the next (design.md § Signature element). A faint track sits
 * beneath; the gradient scrubs over it with scroll. Reduced motion shows the thread already
 * full.
 */
export default function StepChain() {
  const ref = useRef<HTMLOListElement | null>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 78%", "end 55%"],
  });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <ol ref={ref} className="relative">
      {/* faint full-height track */}
      <span
        className="absolute bottom-2 left-[18px] top-2 w-[3px] rounded-full bg-sand"
        aria-hidden
      />
      {/* the filling thread */}
      <motion.span
        style={{ scaleY: reduce ? 1 : scaleY }}
        className="thread-line absolute bottom-2 left-[18px] top-2 w-[3px] origin-top rounded-full"
        aria-hidden
      />

      {STEPS.map((step, i) => (
        <li key={step.slug} className="relative flex gap-5 pb-7 last:pb-0">
          <span className="relative z-10 mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-sand bg-canvas font-display text-sm text-ink-soft shadow-card tnum">
            {i + 1}
          </span>
          <div className="pt-1">
            <p className="font-medium text-ink">
              {step.title}
              {step.optional && (
                <span className="ml-2 rounded-full bg-regalia-wash px-2 py-0.5 text-xs font-normal text-regalia">
                  Optional
                </span>
              )}
            </p>
            <p className="text-sm leading-relaxed text-muted">{step.blurb}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
