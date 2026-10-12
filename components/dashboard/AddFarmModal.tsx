"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { X, Loader2 } from "lucide-react";
import { addDashboardFarm, editDashboardFarm, getDashboardVarieties } from "@/app/dashboard/actions";
import type { CoffeeVariety, Farm } from "@/types/models";

interface AddFarmModalProps {
  /** When provided, the modal edits this farm instead of creating a new one. */
  farm?: Farm;
  onClose: () => void;
  onCreated: () => void;
}

export function AddFarmModal({ farm, onClose, onCreated }: AddFarmModalProps) {
  const isEditing = !!farm;
  const [name, setName] = useState(farm?.name ?? "");
  const [country, setCountry] = useState(farm?.country ?? "India");
  const [region, setRegion] = useState(farm?.region ?? "");
  const [areaHectares, setAreaHectares] = useState(
    farm?.areaHectares != null ? String(farm.areaHectares) : ""
  );
  const [varietyId, setVarietyId] = useState(farm?.primaryVarietyId ?? "");
  const [varieties, setVarieties] = useState<CoffeeVariety[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    getDashboardVarieties().then(({ varieties }) => setVarieties(varieties));
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!name.trim() || !country.trim()) {
      setError("Farm name and country are required.");
      return;
    }
    setIsSubmitting(true);
    const payload = {
      name,
      country,
      region: region || undefined,
      areaHectares: areaHectares ? Number(areaHectares) : undefined,
      primaryVarietyId: varietyId || undefined,
    };
    const result = isEditing
      ? await editDashboardFarm(farm.id, payload)
      : await addDashboardFarm(payload);
    setIsSubmitting(false);
    if (result.ok) {
      onCreated();
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
        aria-labelledby="add-farm-title"
        onClick={(e) => e.stopPropagation()}
        className="glass w-full max-w-md rounded-xl3 border-white/10 p-6 shadow-card sm:p-7"
      >
        <div className="flex items-start justify-between gap-4">
          <h3 id="add-farm-title" className="font-heading text-lg font-semibold text-white">
            {isEditing ? "Edit Farm" : "Add Farm"}
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

        <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-3">
          <input
            type="text"
            required
            placeholder="Farm name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white placeholder:text-white/25 focus:border-coffee-gold focus:outline-none"
          />
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              required
              placeholder="Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white placeholder:text-white/25 focus:border-coffee-gold focus:outline-none"
            />
            <input
              type="text"
              placeholder="Region"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white placeholder:text-white/25 focus:border-coffee-gold focus:outline-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <input
              type="number"
              min="0"
              step="0.1"
              placeholder="Size (hectares)"
              value={areaHectares}
              onChange={(e) => setAreaHectares(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white placeholder:text-white/25 focus:border-coffee-gold focus:outline-none"
            />
            <select
              value={varietyId}
              onChange={(e) => setVarietyId(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white focus:border-coffee-gold focus:outline-none"
            >
              <option value="" className="bg-surface-void">
                Variety (optional)
              </option>
              {varieties.map((v) => (
                <option key={v.id} value={v.id} className="bg-surface-void">
                  {v.name}
                </option>
              ))}
            </select>
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-1 flex items-center justify-center gap-2 rounded-full bg-coffee-gradient px-5 py-3 text-sm font-semibold text-white shadow-glow-gold transition-transform hover:scale-[1.01] disabled:opacity-70"
          >
            {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
            {isSubmitting ? "Saving..." : isEditing ? "Save Changes" : "Add Farm"}
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
}
