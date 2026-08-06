"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { FormField } from "@/components/auth/FormField";
import { SocialAuthButtons } from "@/components/auth/SocialAuthButtons";
import { loginSchema } from "@/lib/validation/authSchemas";
import { mockLogin } from "@/lib/auth/mockAuth";

export function LoginForm() {
  const router = useRouter();
  const [values, setValues] = useState({ email: "", password: "", remember: false });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);

    const result = loginSchema.safeParse(values);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        fieldErrors[issue.path[0] as string] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setIsSubmitting(true);
    try {
      await mockLogin(result.data);
      router.push("/dashboard");
    } catch {
      setFormError("Something went wrong. Please try again.");
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
        label="Email"
        type="email"
        name="email"
        placeholder="you@company.com"
        value={values.email}
        onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
        error={errors.email}
      />
      <FormField
        label="Password"
        type="password"
        name="password"
        placeholder="••••••••"
        value={values.password}
        onChange={(e) => setValues((v) => ({ ...v, password: e.target.value }))}
        error={errors.password}
      />

      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center gap-2 text-white/50">
          <input
            type="checkbox"
            checked={values.remember}
            onChange={(e) => setValues((v) => ({ ...v, remember: e.target.checked }))}
            className="h-4 w-4 rounded border-white/20 bg-black/5 accent-coffee-gold"
          />
          Remember me
        </label>
        <Link href="/forgot-password" className="text-coffee-gold hover:underline">
          Forgot password?
        </Link>
      </div>

      {formError && <p className="text-sm text-red-400">{formError}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-2 flex items-center justify-center gap-2 rounded-full bg-coffee-gradient px-5 py-3.5 text-sm font-semibold text-white shadow-glow-gold transition-transform hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60"
      >
        {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
        {isSubmitting ? "Signing in..." : "Sign In"}
      </button>

      <div className="my-2 flex items-center gap-3 text-xs text-white/30">
        <span className="h-px flex-1 bg-black/10" />
        or continue with
        <span className="h-px flex-1 bg-black/10" />
      </div>

      <SocialAuthButtons />

      <p className="mt-4 text-center text-sm text-white/40">
        Don't have an account?{" "}
        <Link href="/signup" className="font-medium text-coffee-gold hover:underline">
          Sign up
        </Link>
      </p>
    </motion.form>
  );
}
