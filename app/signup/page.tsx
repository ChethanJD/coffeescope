import type { Metadata } from "next";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { SignupForm } from "@/components/auth/SignupForm";

export const metadata: Metadata = {
  title: "Create Account — CoffeeScope",
};

export default function SignupPage() {
  return (
    <AuthLayout
      eyebrow="Get started"
      title="Create your account"
      subtitle="Join farmers, exporters, and traders using AI market intelligence."
    >
      <SignupForm />
    </AuthLayout>
  );
}
