"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Stepper from "@/components/Stepper";
import MobileProgress from "@/components/MobileProgress";
import SaveStatus from "@/components/SaveStatus";
import HydrationGate from "@/components/HydrationGate";
import { STEPS } from "@/lib/steps";

/**
 * Wizard chrome: persistent left rail (stepper) on desktop, slim top progress
 * bar on mobile, sticky section header with title + autosave status, and the
 * centered content column (design.md § Layout).
 */
export default function WizardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const step = STEPS.find((s) => pathname.startsWith(s.path)) ?? STEPS[0];
  // Report and DAT get the wide column; forms stay in the narrow reading column.
  const wide = step.slug === "report" || step.slug === "dat";

  return (
    <div className="flex min-h-screen flex-col bg-canvas">
      <Header />
      <MobileProgress />

      <div className="mx-auto flex w-full max-w-wide flex-1 gap-8 px-4 py-6 sm:px-6">
        {/* Left rail */}
        <aside className="hidden w-56 shrink-0 lg:block">
          <div className="sticky top-6">
            <p className="eyebrow mb-3 px-2">Your progress</p>
            <Stepper />
          </div>
        </aside>

        {/* Content */}
        <main className="min-w-0 flex-1">
          <HydrationGate>
            {/* Sticky section header */}
            <div className="sticky top-0 z-10 -mx-4 mb-6 border-b border-sand bg-canvas/85 px-4 py-3 backdrop-blur sm:-mx-6 sm:px-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="eyebrow">
                    Step {STEPS.indexOf(step) + 1} of {STEPS.length}
                  </p>
                  <h1 className="mt-0.5 text-display-sm">{step.title}</h1>
                </div>
                <div className="mt-1 shrink-0">
                  <SaveStatus />
                </div>
              </div>
              <p className="mt-2 max-w-2xl text-sm text-muted">{step.blurb}</p>
            </div>

            <div
              key={pathname}
              className={`step-enter mx-auto ${wide ? "max-w-wide" : "max-w-form"}`}
            >
              {children}
            </div>
          </HydrationGate>
        </main>
      </div>

      <Footer />
    </div>
  );
}
