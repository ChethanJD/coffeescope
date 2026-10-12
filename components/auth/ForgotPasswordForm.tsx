"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Loader2, CheckCircle2 } from "lucide-react";
import { FormField } from "@/components/auth/FormField";
import { requestPasswordReset } from "@/lib/auth/actions";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!email) {
      setError("Email is required");
      return;
    }

    setIsSubmitting(true);
    try {
      await requestPasswordReset(email);
      setIsSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSent) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col items-center gap-3 rounded-xl border border-white/10 bg-white/[0.045] px-5 py-8 text-center"
      >
        <CheckCircle2 className="h-8 w-8 text-coffee-gold" />
        <p className="text-sm text-white/70">
          If an account exists for <span className="text-white">{email}</span>, we&apos;ve sent a
          password reset link.
        </p>
        <Link href="/login" className="text-sm font-medium text-coffee-gold hover:underline">
          Back to sign in
        </Link>
      </motion.div>
    );
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
        label="Email"
        type="email"
        name="email"
        placeholder="you@company.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={error ?? undefined}
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-2 flex items-center justify-center gap-2 rounded-full bg-coffee-gradient px-5 py-3.5 text-sm font-semibold text-white shadow-glow-gold transition-transform hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60"
      >
        {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
        {isSubmitting ? "Sending..." : "Send reset link"}
      </button>

      <p className="mt-4 text-center text-sm text-white/40">
        Remembered your password?{" "}
        <Link href="/login" className="font-medium text-coffee-gold hover:underline">
          Sign in
        </Link>
      </p>
    </motion.form>
  );
}
