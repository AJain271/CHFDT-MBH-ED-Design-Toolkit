import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 rounded-control text-sm font-medium transition-[background-color,transform,box-shadow] duration-150 ease-out-soft active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 min-h-[44px] px-4";

const variants: Record<Variant, string> = {
  // Primary uses --orange-deep for AA contrast behind white text (design.md § Contrast).
  primary: "bg-orange-deep text-white hover:brightness-105 shadow-card",
  secondary: "border border-sand text-ink bg-transparent hover:bg-panel",
  ghost: "text-ink-soft hover:bg-panel",
};

type ButtonProps = ComponentPropsWithoutRef<"button"> & { variant?: Variant };
type LinkButtonProps = ComponentPropsWithoutRef<typeof Link> & { variant?: Variant };

export function Button({ variant = "primary", className = "", ...props }: ButtonProps) {
  return <button className={`${base} ${variants[variant]} ${className}`} {...props} />;
}

export function LinkButton({ variant = "primary", className = "", ...props }: LinkButtonProps) {
  return <Link className={`${base} ${variants[variant]} ${className}`} {...props} />;
}
