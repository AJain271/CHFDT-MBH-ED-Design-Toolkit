import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { LinkButton } from "@/components/ui/Button";

/** Clearly-labeled placeholder for the MET and PET tools, which are shown in
 *  the deck but are NOT in the v1 workbook (BUILD_SPEC §2). Nothing is built. */
export default function ToolPlaceholder({
  code,
  name,
}: {
  code: string;
  name: string;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-canvas">
      <Header />
      <main className="mx-auto w-full max-w-form flex-1 px-4 py-20 sm:px-6">
        <span className="inline-block rounded-full border border-sand bg-panel px-3 py-1 text-xs font-medium text-muted">
          Not in v1
        </span>
        <h1 className="mt-4 text-display-md text-ink-soft">
          {name} <span className="text-muted">({code})</span>
        </h1>
        <p className="mt-4 max-w-lg text-muted">
          This tool appears in the toolkit overview but isn&apos;t part of the current
          workbook, so it&apos;s not built yet. This page is a placeholder so the route
          exists for when it lands.
        </p>
        <div className="mt-8">
          <LinkButton href="/" variant="secondary">
            ← Back to the toolkit
          </LinkButton>
        </div>
      </main>
      <Footer />
    </div>
  );
}
