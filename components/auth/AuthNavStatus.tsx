"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { logout } from "@/lib/auth/actions";

interface AuthNavStatusProps {
  variant: "desktop" | "mobile";
  onNavigate?: () => void;
}

/**
 * Renders the existing Login/Get Started links when signed out (or when
 * Supabase isn't configured, so local demo mode is unaffected), and a
 * user email + logout affordance when signed in. Kept as a standalone
 * component so Navbar's existing markup/classes stay untouched.
 */
export function AuthNavStatus({ variant, onNavigate }: AuthNavStatusProps) {
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      setChecked(true);
      return;
    }

    const supabase = createClient();

    supabase.auth.getUser().then(({ data }) => {
      setEmail(data.user?.email ?? null);
      setChecked(true);
    });

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      setEmail(session?.user?.email ?? null);
    });

    return () => subscription.subscription.unsubscribe();
  }, []);

  async function handleLogout() {
    try {
      await logout();
    } finally {
      onNavigate?.();
      router.push("/");
      router.refresh();
    }
  }

  // Avoid a signed-out flash before the first client check resolves.
  if (!checked) return null;

  if (email) {
    return variant === "desktop" ? (
      <div className="flex items-center gap-2">
        <span className="max-w-[140px] truncate text-[13px] text-white/60" title={email}>
          {email}
        </span>
        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-[13px] font-semibold text-white/70 transition-colors hover:bg-white/[0.05] hover:text-white"
        >
          <LogOut className="h-3.5 w-3.5" />
          Logout
        </button>
      </div>
    ) : (
      <button
        type="button"
        onClick={handleLogout}
        className="flex items-center justify-center gap-1.5 rounded-full px-4 py-2 text-center text-sm font-semibold text-white/80"
      >
        <LogOut className="h-4 w-4" />
        Logout ({email})
      </button>
    );
  }

  return variant === "desktop" ? (
    <div className="flex items-center gap-1.5">
      <Link
        href="/login"
        className="rounded-xl px-3.5 py-2 text-[13px] font-semibold text-white/70 transition-colors hover:bg-white/[0.05] hover:text-white"
      >
        Login
      </Link>
      <Link
        href="/signup"
        className="rounded-xl bg-coffee-gradient px-4 py-2 text-[13px] font-semibold text-white shadow-glow-gold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(201,138,69,0.28)] active:translate-y-0"
      >
        Get Started
      </Link>
    </div>
  ) : (
    <>
      <Link
        href="/login"
        onClick={onNavigate}
        className="rounded-full px-4 py-2 text-center text-sm font-semibold text-white/80"
      >
        Login
      </Link>
      <Link
        href="/signup"
        onClick={onNavigate}
        className="rounded-full bg-coffee-gradient px-4 py-2 text-center text-sm font-semibold text-white"
      >
        Get Started
      </Link>
    </>
  );
}
