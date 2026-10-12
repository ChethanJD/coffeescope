"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { FormField } from "@/components/auth/FormField";
import { updatePassword } from "@/lib/auth/actions";

const PASSWORD_MIN_LENGTH = 8;

export function ResetPasswordForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);

    const fieldErrors: Record<string, string> = {};
    if (password.length < PASSWORD_MIN_LENGTH) {
      fieldErrors.password = `Password must be at least ${PASSWORD_MIN_LENGTH} characters`;
    }
    if (password !== confirmPassword) {
      fieldErrors.confirmPassword = "Passwords don't match";
    }
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setIsSubmitting(true);
    try {
      await updatePassword(password);
      router.push("/login?passwordReset=1");
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      onSubmit={handleSubmit}
      className="flex flex-col gap-4"
      noValidate
    >
      <FormField
        label="New password"
        type="password"
        name="password"
        placeholder="At least 8 characters"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={errors.password}
      />
      <FormField
        label="Confirm new password"
        type="password"
        name="confirmPassword"
        placeholder="••••••••"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        error={errors.confirmPassword}
      />

      {formError && <p className="text-sm text-red-400">{formError}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-2 flex items-center justify-center gap-2 rounded-full bg-coffee-gradient px-5 py-3.5 text-sm font-semibold text-white shadow-glow-gold transition-transform hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60"
      >
        {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
        {isSubmitting ? "Updating..." : "Update password"}
      </button>
    </motion.form>
  );
}
