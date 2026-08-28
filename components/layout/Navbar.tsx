"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Coffee, ChevronDown, LayoutDashboard, ShoppingBag, CloudSun, Newspaper, Bug, Calculator } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useScrolled } from "@/hooks/useScrollPosition";
import { ThemeToggle } from "@/components/ThemeToggle";
import type { NavItem } from "@/types";

const PRIMARY_NAV: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Market", href: "/market" },
  { label: "Analytics", href: "/analytics" },
  { label: "AI Forecast", href: "/ai" },
];

const MORE_NAV: Array<NavItem & { icon: LucideIcon }> = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Marketplace", href: "/marketplace", icon: ShoppingBag },
  { label: "Weather", href: "/weather", icon: CloudSun },
  { label: "News", href: "/news", icon: Newspaper },
  { label: "Disease Detection", href: "/disease-detection", icon: Bug },
  { label: "Calculator", href: "/calculator", icon: Calculator },
];

export function Navbar() {
  const scrolled = useScrolled(24);
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      if (moreRef.current && !moreRef.current.contains(event.target as Node)) {
        setMoreOpen(false);
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-500",
        scrolled ? "py-3" : "py-6"
      )}
    >
      <div
        className={cn(
          "mx-auto flex max-w-7xl items-center justify-between rounded-2xl border border-white/10 px-4 shadow-[0_12px_40px_rgba(0,0,0,0.22)] backdrop-blur-xl transition-all duration-500 sm:px-5",
          scrolled
            ? "glass mx-3 bg-black/35 sm:mx-6 lg:mx-auto"
            : "bg-[#100D0B]/60 shadow-[0_8px_32px_rgba(0,0,0,0.14)] mx-3 sm:mx-6 lg:mx-auto"
        )}
        style={{ height: scrolled ? 58 : 66 }}
      >
        {/* Logo */}
        <Link
          href="/"
          aria-label="CoffeeScope home"
          className="group flex shrink-0 items-center gap-2.5 font-heading text-lg font-semibold tracking-tight text-white"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-coffee-gradient shadow-glow-gold">
            <Coffee className="h-4 w-4 text-white transition-transform duration-300 group-hover:-rotate-6" strokeWidth={2.5} />
          </span>
          CoffeeScope
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Primary navigation" className="hidden items-center gap-1 lg:flex">
          {PRIMARY_NAV.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative rounded-xl px-3.5 py-2 text-[13px] font-medium transition-all duration-200",
                  active
                    ? "bg-white/[0.08] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
                    : "text-white/65 hover:bg-white/[0.045] hover:text-white"
                )}
              >
                {item.label}
                {active && (
                  <motion.span
                    layoutId="navbar-active"
                    className="absolute inset-x-3 bottom-0 h-px bg-coffee-gold"
                  />
                )}
              </Link>
            );
          })}

          <div ref={moreRef} className="relative">
            <button
              type="button"
              aria-haspopup="menu"
              aria-expanded={moreOpen}
              onClick={() => setMoreOpen((value) => !value)}
              className={cn(
                "flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-[13px] font-medium transition-all duration-200",
                moreOpen || MORE_NAV.some((item) => isActive(item.href))
                  ? "bg-white/[0.08] text-white"
                  : "text-white/65 hover:bg-white/[0.045] hover:text-white"
              )}
            >
              More
              <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", moreOpen && "rotate-180")} />
            </button>

            <AnimatePresence>
              {moreOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.98 }}
                  transition={{ duration: 0.16 }}
                  role="menu"
                  className="absolute right-0 top-[calc(100%+10px)] w-64 rounded-2xl border border-white/10 bg-[#15110f]/90 p-2 shadow-2xl backdrop-blur-2xl"
                >
                  {MORE_NAV.map((item) => {
                    const active = isActive(item.href);
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        role="menuitem"
                        onClick={() => setMoreOpen(false)}
                        className={cn(
                          "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors",
                          active ? "bg-white/[0.08] text-white" : "text-white/65 hover:bg-white/[0.05] hover:text-white"
                        )}
                      >
                        <Icon className="h-4 w-4 text-coffee-gold" />
                        {item.label}
                      </Link>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        {/* Login CTA */}
        <div className="hidden items-center gap-1.5 lg:flex">
          <ThemeToggle />
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

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white transition-colors hover:bg-white/[0.08] lg:hidden"
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
              <div className="grid grid-cols-2 gap-1.5">
                {[...PRIMARY_NAV, ...MORE_NAV].map((item) => {
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "rounded-xl px-3 py-3 text-sm font-medium transition-colors",
                        active ? "bg-white/[0.08] text-white" : "text-white/70 hover:bg-white/[0.05] hover:text-white"
                      )}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>
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
