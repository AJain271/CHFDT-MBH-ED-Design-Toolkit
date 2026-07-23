import type { Metadata } from "next";
import AuthCard from "@/components/auth/AuthCard";

export const metadata: Metadata = {
  title: "Sign in · MBH-Friendly ED Design Toolkit",
};

export default function SignInPage() {
  return <AuthCard mode="signin" />;
}
