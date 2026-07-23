import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";

/**
 * Marketing-surface layout (design.md § Landing surface): the expressive front door —
 * fixed transparent header over a gradient banner, rich footer. Distinct from the calm
 * wizard chrome in app/(wizard).
 */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="site-canvas flex min-h-screen flex-col">
      <div className="scroll-progress" aria-hidden />
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
