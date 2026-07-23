import type { Metadata } from "next";
import AuthCard from "@/components/auth/AuthCard";

export const metadata: Metadata = {
  title: "Create account · MBH-Friendly ED Design Toolkit",
};

export default function SignUpPage() {
  return <AuthCard mode="signup" />;
}
