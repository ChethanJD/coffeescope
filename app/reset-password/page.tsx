import type { Metadata } from "next";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm";

export const metadata: Metadata = {
  title: "Set New Password — CoffeeScope",
};

export default function ResetPasswordPage() {
  return (
    <AuthLayout
      eyebrow="Password reset"
      title="Choose a new password"
      subtitle="Enter and confirm your new password below."
    >
      <ResetPasswordForm />
    </AuthLayout>
  );
}
