"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Coffee, Twitter, Linkedin, Github, ArrowRight, Check } from "lucide-react";

const FOOTER_LINKS: { heading: string; links: { label: string; href: string }[] }[] = [
  {
    heading: "Product",
    links: [
      { label: "Live Market", href: "/" },
      { label: "Global Market", href: "/market" },
      { label: "Marketplace", href: "/marketplace" },
      { label: "Analytics", href: "/analytics" },
      { label: "AI Prediction", href: "/ai" },
      { label: "Disease Detection", href: "/disease-detection" },
      { label: "Profit Calculator", href: "/calculator" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Documentation", href: "/docs" },
      { label: "API", href: "/api-docs" },
      { label: "Support", href: "/support" },
      { label: "Status", href: "/status" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cookie Policy", href: "/cookies" },
    ],
  },
];

function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:flex-row">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@company.com"
        disabled={submitted}
        className="w-full rounded-full border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white placeholder:text-white/25 focus:border-coffee-gold focus:outline-none disabled:opacity-60 sm:w-56"
      />
      <button
        type="submit"
        disabled={submitted}
        className="flex items-center justify-center gap-1.5 rounded-full bg-coffee-gradient px-5 py-2.5 text-sm font-semibold text-white shadow-glow-gold transition-transform hover:scale-[1.02] disabled:opacity-80"
      >
        {submitted ? (
          <>
            <Check className="h-3.5 w-3.5" />
            Subscribed
          </>
        ) : (
          <>
            Subscribe
            <ArrowRight className="h-3.5 w-3.5" />
          </>
        )}
      </button>
    </form>
  );
}

export function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] bg-surface-void px-6 pb-10 pt-16 sm:pt-20">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_2fr]">
          {/* Brand + newsletter */}
          <div>
            <Link href="/" className="flex items-center gap-2 font-heading text-lg font-semibold text-white">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-coffee-gradient shadow-glow-gold">
                <Coffee className="h-4 w-4 text-white" strokeWidth={2.5} />
              </span>
              CoffeeScope
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/45">
              AI-powered coffee market intelligence for farmers, exporters,
              traders, and buyers — real-time prices, weather, and
              predictive analytics in one platform.
            </p>

            <div className="mt-6">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-white/40">
                Get market updates
              </p>
              <NewsletterForm />
            </div>

            <div className="mt-6 flex items-center gap-3">
              {[
                { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
                { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
                { icon: Github, href: "https://github.com", label: "GitHub" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/[0.05] text-white/50 transition-colors hover:bg-white/[0.1] hover:text-white"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {FOOTER_LINKS.map((group) => (
              <div key={group.heading}>
                <h4 className="text-xs font-semibold uppercase tracking-wide text-white/40">
                  {group.heading}
                </h4>
                <ul className="mt-4 flex flex-col gap-3">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-white/60 transition-colors hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-8 text-xs text-white/35 sm:flex-row"
        >
          <span>© {new Date().getFullYear()} CoffeeScope. All rights reserved.</span>
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-coffee-leaf" />
            All systems operational
          </span>
        </motion.div>
      </div>
    </footer>
  );
}
