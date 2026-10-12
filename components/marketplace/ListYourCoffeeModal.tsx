"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { X, Loader2, CheckCircle2 } from "lucide-react";
import { createListingAction } from "@/app/marketplace/actions";

interface ListYourCoffeeModalProps {
  onClose: () => void;
}

const FIELD_CLASS =
  "w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white placeholder:text-white/25 focus:border-coffee-gold focus:outline-none";

export function ListYourCoffeeModal({ onClose }: ListYourCoffeeModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [priceInr, setPriceInr] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("kg");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [created, setCreated] = useState(false);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const price = Number(priceInr);
    const qty = Number(quantity);
    if (!name.trim() || !price || !qty) {
      setError("Name, price, and quantity are required.");
      return;
    }

    setIsSubmitting(true);
    const result = await createListingAction({
      name: name.trim(),
      description: description.trim() || undefined,
      priceInr: price,
      quantity: qty,
      unit,
    });
    setIsSubmitting(false);

    if (result.ok) {
      setCreated(true);
    } else {
      setError(result.error);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="presentation"
      className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto bg-black/75 px-4 py-6 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.97 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="list-coffee-title"
        onClick={(e) => e.stopPropagation()}
        className="glass w-full max-w-md rounded-xl3 border-white/10 p-6 shadow-card sm:p-7"
      >
        <div className="flex items-start justify-between gap-4">
          <h3 id="list-coffee-title" className="font-heading text-lg font-semibold text-white">
            List Your Coffee
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="rounded-full p-1.5 text-white/40 hover:bg-white/[0.06] hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {created ? (
          <div className="mt-6 flex flex-col items-center gap-3 py-6 text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-coffee-leaf/20 bg-coffee-leaf/10">
              <CheckCircle2 className="h-6 w-6 text-coffee-leaf" />
            </span>
            <p className="text-sm font-medium text-white">Listing created</p>
            <p className="max-w-xs text-xs leading-5 text-white/40">
              Your lot has been saved. Marketplace browsing currently shows sample listings —
              your real listing is stored and will appear once the marketplace grid is
              switched over to live data.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-2 rounded-full border border-white/10 bg-white/[0.05] px-5 py-2.5 text-xs font-semibold text-white/80 transition hover:bg-white/[0.09]"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-3">
            {!created && (
              <p className="text-xs text-white/40">You must be signed in to list a product.</p>
            )}
            <input
              type="text"
              required
              placeholder="Lot name (e.g. Chikmagalur AA)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={FIELD_CLASS}
            />
            <textarea
              rows={3}
              placeholder="Description (grade, processing method, certifications, etc.)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`${FIELD_CLASS} resize-none`}
            />
            <div className="grid grid-cols-3 gap-3">
              <input
                type="number"
                min="0"
                step="0.01"
                required
                placeholder="Price/kg (₹)"
                value={priceInr}
                onChange={(e) => setPriceInr(e.target.value)}
                className={`${FIELD_CLASS} col-span-1`}
              />
              <input
                type="number"
                min="0"
                step="0.01"
                required
                placeholder="Quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className={`${FIELD_CLASS} col-span-1`}
              />
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className={`${FIELD_CLASS} col-span-1`}
              >
                <option value="kg" className="bg-surface-void">
                  kg
                </option>
                <option value="quintal" className="bg-surface-void">
                  quintal
                </option>
              </select>
            </div>

            {error && <p className="text-sm text-red-400">{error}</p>}

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-1 flex items-center justify-center gap-2 rounded-full bg-coffee-gradient px-5 py-3 text-sm font-semibold text-white shadow-glow-gold transition-transform hover:scale-[1.01] disabled:opacity-70"
            >
              {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
              {isSubmitting ? "Creating..." : "Create Listing"}
            </button>
          </form>
        )}
      </motion.div>
    </motion.div>
  );
}
