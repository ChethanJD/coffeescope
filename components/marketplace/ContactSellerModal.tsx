"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { X, Send, CheckCircle2 } from "lucide-react";
import type { MarketplaceListing } from "@/lib/data/mockMarketplace";

export function ContactSellerModal({ listing, onClose }: { listing: MarketplaceListing; onClose: () => void }) {
  const [message, setMessage] = useState(
    `Hi, I'm interested in your ${listing.variety} lot (${listing.quantityKg.toLocaleString()} kg, Grade ${listing.grade}). Could you share more details?`
  );
  const [email, setEmail] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !message.trim()) return;
    setIsSending(true);
    await new Promise((resolve) => setTimeout(resolve, 900));
    setIsSending(false); setSent(true);
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      role="presentation" className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto bg-black/75 px-4 py-6 backdrop-blur-sm"
      onClick={onClose}>
      <motion.div initial={{ opacity: 0, y: 16, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 16, scale: 0.97 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }} role="dialog" aria-modal="true" aria-labelledby="contact-seller-title"
        onClick={(e) => e.stopPropagation()} className="glass w-full max-w-md rounded-xl3 border-white/10 p-6 shadow-card sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <div><h3 id="contact-seller-title" className="font-heading text-lg font-semibold text-white">Contact {listing.farmName}</h3>
            <p className="mt-1 text-xs text-white/40">{listing.location}</p></div>
          <button type="button" onClick={onClose} aria-label="Close dialog"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/[0.06] bg-white/[0.04] text-white/50 transition hover:bg-white/[0.08] hover:text-white focus:outline-none focus:ring-2 focus:ring-coffee-gold/30">
            <X className="h-4 w-4" />
          </button>
        </div>

        {sent ? (
          <div className="mt-6 flex flex-col items-center gap-3 py-6 text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-coffee-leaf/20 bg-coffee-leaf/10"><CheckCircle2 className="h-6 w-6 text-coffee-leaf" /></span>
            <p className="text-sm font-medium text-white">Message sent</p>
            <p className="max-w-xs text-xs leading-5 text-white/40">{listing.farmName} typically responds within 1–2 business days.</p>
            <button type="button" onClick={onClose} className="mt-2 rounded-full border border-white/10 bg-white/[0.05] px-5 py-2.5 text-xs font-semibold text-white/80 transition hover:bg-white/[0.09]">Done</button>
          </div>
        ) : (
          <form onSubmit={handleSend} className="mt-5 flex flex-col gap-4">
            <label className="space-y-1.5"><span className="block text-xs font-medium text-white/60">Your email</span>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com"
                className="w-full rounded-xl border border-white/10 bg-white/[0.045] px-4 py-3 text-sm text-white placeholder:text-white/25 outline-none transition focus:border-coffee-gold/60 focus:ring-2 focus:ring-coffee-gold/10" /></label>
            <label className="space-y-1.5"><span className="block text-xs font-medium text-white/60">Message</span>
              <textarea required rows={4} value={message} onChange={(e) => setMessage(e.target.value)}
                className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.045] px-4 py-3 text-sm text-white placeholder:text-white/25 outline-none transition focus:border-coffee-gold/60 focus:ring-2 focus:ring-coffee-gold/10" /></label>
            <button type="submit" disabled={isSending}
              className="mt-1 flex items-center justify-center gap-2 rounded-full border border-coffee-gold/20 bg-coffee-gradient px-5 py-3 text-sm font-semibold text-white shadow-glow-gold transition-all hover:-translate-y-0.5 hover:brightness-110 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-coffee-gold/30">
              {isSending ? "Sending..." : <><Send className="h-4 w-4" />Send Message</>}
            </button>
          </form>
        )}
      </motion.div>
    </motion.div>
  );
}
