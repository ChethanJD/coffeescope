import type { Metadata } from "next";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Sign In — CoffeeScope",
};

export default function LoginPage() {
  return (
    <AuthLayout
      eyebrow="Welcome back"
      title="Sign in to CoffeeScope"
      subtitle="Access live prices, predictions, and your saved farms."
    >
      <LoginForm />
    </AuthLayout>
  );
}
