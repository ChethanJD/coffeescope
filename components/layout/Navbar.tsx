"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Coffee } from "lucide-react";
import { cn } from "@/lib/utils";
import { useScrolled } from "@/hooks/useScrollPosition";
import type { NavItem } from "@/types";

const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Market", href: "/market" },
  { label: "Shop", href: "/marketplace" },
  { label: "Weather", href: "/weather" },
  { label: "News", href: "/news" },
  { label: "Stats", href: "/analytics" },
  { label: "AI", href: "/ai" },
  { label: "Disease", href: "/disease-detection" },
  { label: "Calc", href: "/calculator" },
  { label: "Dash", href: "/dashboard" },
];

export function Navbar() {
  const scrolled = useScrolled(24);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-500",
        scrolled ? "py-3" : "py-6"
      )}
    >
      <div
        className={cn(
          "mx-auto flex max-w-7xl items-center justify-between rounded-full px-5 transition-all duration-500",
          scrolled
            ? "glass mx-4 shadow-card sm:mx-8 lg:mx-auto"
            : "bg-transparent px-6"
        )}
        style={{ height: scrolled ? 56 : 64 }}
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-heading text-lg font-semibold tracking-tight text-white"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-coffee-gradient shadow-glow-gold">
            <Coffee className="h-4 w-4 text-white" strokeWidth={2.5} />
          </span>
          CoffeeScope
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group relative rounded-full px-4 py-2 text-sm font-medium text-white/70 transition-colors hover:text-white"
            >
              {item.label}
              <span className="absolute inset-x-4 -bottom-0.5 h-px scale-x-0 bg-coffee-gold transition-transform duration-300 group-hover:scale-x-100" />
            </Link>
          ))}
        </nav>

        {/* Login CTA */}
        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/login"
            className="rounded-full px-4 py-2 text-sm font-semibold text-white/80 transition-colors hover:text-white"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="rounded-full bg-coffee-gradient px-5 py-2 text-sm font-semibold text-white shadow-glow-gold transition-transform hover:scale-[1.03] active:scale-[0.98]"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-full text-white lg:hidden"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="glass mx-4 mt-3 rounded-3xl p-6 lg:hidden"
          >
            <nav className="flex flex-col gap-1">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl px-3 py-3 text-base font-medium text-white/80 transition-colors hover:bg-white/5 hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-3 flex flex-col gap-2 border-t border-white/10 pt-4">
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-full px-4 py-2 text-center text-sm font-semibold text-white/80"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-full bg-coffee-gradient px-4 py-2 text-center text-sm font-semibold text-white"
                >
                  Get Started
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
