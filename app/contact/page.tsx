"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Send, Mail } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setIsSending(true);
    await new Promise((resolve) => setTimeout(resolve, 900));
    setIsSending(false);
    setSent(true);
  }

  return (
    <PageShell>
      <div className="mx-auto max-w-xl px-6 pb-24">
        <span className="text-xs font-semibold uppercase tracking-widest text-coffee-gold">
          Contact
        </span>
        <h1 className="mt-3 font-heading text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Get in touch
        </h1>
        <p className="mt-4 text-white/50">
          Questions, feedback, or partnership ideas — send us a message and
          we'll get back to you.
        </p>

        <div className="glass mt-8 rounded-xl3 p-6 shadow-card sm:p-7">
          {sent ? (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center py-8 text-center"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-coffee-leaf/15">
                <Check className="h-6 w-6 text-coffee-leaf" />
              </span>
              <p className="mt-4 font-heading text-base font-semibold text-white">
                Message sent
              </p>
              <p className="mt-1.5 text-sm text-white/50">
                We typically respond within 1–2 business days.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="text"
                required
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white placeholder:text-white/25 focus:border-coffee-gold focus:outline-none"
              />
              <input
                type="email"
                required
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white placeholder:text-white/25 focus:border-coffee-gold focus:outline-none"
              />
              <textarea
                required
                rows={5}
                placeholder="How can we help?"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white placeholder:text-white/25 focus:border-coffee-gold focus:outline-none"
              />
              <button
                type="submit"
                disabled={isSending}
                className="mt-1 flex items-center justify-center gap-2 rounded-full bg-coffee-gradient px-5 py-3 text-sm font-semibold text-white shadow-glow-gold transition-transform hover:scale-[1.01] disabled:opacity-70"
              >
                {isSending ? "Sending..." : "Send Message"}
                {!isSending && <Send className="h-3.5 w-3.5" />}
              </button>
            </form>
          )}
        </div>

        <p className="mt-6 flex items-center gap-2 text-sm text-white/40">
          <Mail className="h-4 w-4" />
          Or email us directly at{" "}
          <a href="mailto:hello@coffeescope.ai" className="text-coffee-gold hover:underline">
            hello@coffeescope.ai
          </a>
        </p>
      </div>
    </PageShell>
  );
}
