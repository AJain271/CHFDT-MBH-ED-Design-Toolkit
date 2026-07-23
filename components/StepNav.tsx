"use client";

import { useRouter } from "next/navigation";
import { STEPS } from "@/lib/steps";
import { Button } from "@/components/ui/Button";

/** Back / Continue controls at the foot of each step. Names describe what the
 *  user controls (design.md § Voice). */
export default function StepNav({ slug }: { slug: string }) {
  const router = useRouter();
  const i = STEPS.findIndex((s) => s.slug === slug);
  const prev = i > 0 ? STEPS[i - 1] : null;
  const next = i < STEPS.length - 1 ? STEPS[i + 1] : null;

  return (
    <div className="mt-10 flex items-center justify-between border-t border-sand pt-6">
      {prev ? (
        <Button variant="secondary" onClick={() => router.push(prev.path)}>
          <span aria-hidden>←</span> {prev.label}
        </Button>
      ) : (
        <span />
      )}
      {next && (
        <Button variant="primary" onClick={() => router.push(next.path)}>
          {next.slug === "report" ? "See the report" : `Continue to ${next.label.toLowerCase()}`}{" "}
          <span aria-hidden>→</span>
        </Button>
      )}
    </div>
  );
}
