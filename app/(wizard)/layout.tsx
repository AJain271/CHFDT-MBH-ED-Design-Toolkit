import WizardShell from "@/components/WizardShell";

export default function WizardLayout({ children }: { children: React.ReactNode }) {
  return <WizardShell>{children}</WizardShell>;
}
