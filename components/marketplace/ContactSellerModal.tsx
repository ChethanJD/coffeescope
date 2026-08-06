"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, CheckCircle2 } from "lucide-react";
import type { MarketplaceListing } from "@/lib/data/mockMarketplace";

export function ContactSellerModal({
  listing,
  onClose,
}: {
  listing: MarketplaceListing;
  onClose: () => void;
}) {
  const [message, setMessage] = useState(
    `Hi, I'm interested in your ${listing.variety} lot (${listing.quantityKg.toLocaleString()} kg, Grade ${listing.grade}). Could you share more details?`
  );
  const [email, setEmail] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !message.trim()) return;
    setIsSending(true);
    // Mock send — swap for a real POST /api/marketplace/contact call later.
    await new Promise((resolve) => setTimeout(resolve, 900));
    setIsSending(false);
    setSent(true);
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 px-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.97 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="glass w-full max-w-md rounded-xl3 p-6 shadow-card sm:p-7"
      >
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-heading text-lg font-semibold text-white">
              Contact {listing.farmName}
            </h3>
            <p className="mt-1 text-xs text-white/40">{listing.location}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-8 w-8 items-center justify-center rounded-full text-white/50 hover:bg-white/[0.06] hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {sent ? (
          <div className="mt-6 flex flex-col items-center gap-3 py-6 text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-coffee-leaf/15">
              <CheckCircle2 className="h-6 w-6 text-coffee-leaf" />
            </span>
            <p className="text-sm font-medium text-white">Message sent</p>
            <p className="max-w-xs text-xs text-white/40">
              {listing.farmName} typically responds within 1–2 business days.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-2 rounded-full bg-white/[0.06] px-5 py-2 text-xs font-semibold text-white/80 hover:bg-white/[0.1]"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSend} className="mt-5 flex flex-col gap-3">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-white/60">
                Your email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full rounded-xl border border-white/10 bg-black/50 px-4 py-2.5 text-sm text-white placeholder:text-white/40 backdrop-blur-sm focus:border-coffee-gold focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-white/60">
                Message
              </label>
              <textarea
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full resize-none rounded-xl border border-white/10 bg-black/50 px-4 py-2.5 text-sm text-white placeholder:text-white/40 backdrop-blur-sm focus:border-coffee-gold focus:outline-none"
              />
            </div>
            <button
              type="submit"
              disabled={isSending}
              className="mt-1 flex items-center justify-center gap-2 rounded-full bg-coffee-gradient px-5 py-3 text-sm font-semibold text-white shadow-glow-gold transition-transform hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60"
            >
              {isSending ? "Sending..." : (
                <>
                  <Send className="h-4 w-4" />
                  Send Message
                </>
              )}
            </button>
          </form>
        )}
      </motion.div>
    </motion.div>
  );
}
