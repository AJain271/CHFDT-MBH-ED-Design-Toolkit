"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Scroll-reveal wrapper for the marketing surface (design.md § Landing surface).
 * Content rises + fades in the first time it enters the viewport. Kept deliberately on a
 * plain IntersectionObserver + CSS class (not framer-motion) so basic section content is
 * rock-solid and degrades via the `.reveal` noscript fallback — framer-motion is reserved
 * for the richer depth pieces (hero stagger, parallax, the thread-draw, the scroll demo).
 * Reduced motion is honored in globals.css (the `.reveal` rule shows instantly).
 */
export default function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  /** Stagger in ms — sequences sibling reveals. */
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
