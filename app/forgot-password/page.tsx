import type { Metadata } from "next";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";

export const metadata: Metadata = {
  title: "Reset Password — CoffeeScope",
};

export default function ForgotPasswordPage() {
  return (
    <AuthLayout
      eyebrow="Password reset"
      title="Forgot your password?"
      subtitle="Enter your email and we'll send you a link to reset it."
    >
      <ForgotPasswordForm />
    </AuthLayout>
  );
}
