"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { X, Loader2 } from "lucide-react";
import { addDashboardAlert } from "@/app/dashboard/actions";

interface NewAlertModalProps {
  onClose: () => void;
  onCreated: () => void;
}

const FIELD_CLASS =
  "w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white placeholder:text-white/25 focus:border-coffee-gold focus:outline-none";

export function NewAlertModal({ onClose, onCreated }: NewAlertModalProps) {
  const [ruleType, setRuleType] = useState<"price" | "weather">("price");
  const [operator, setOperator] = useState<"above" | "below">("above");
  const [value, setValue] = useState("");
  const [metric, setMetric] = useState<"rain_probability" | "temperature" | "humidity">(
    "rain_probability"
  );
  const [channel, setChannel] = useState<"email" | "sms" | "whatsapp" | "push">("email");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

    const numericValue = Number(value);
    if (!value || Number.isNaN(numericValue)) {
      setError("Enter a valid number.");
      return;
    }

    setIsSubmitting(true);
    const result = await addDashboardAlert(
      ruleType === "price"
        ? { ruleType: "price", condition: { operator, value: numericValue }, channel }
        : { ruleType: "weather", condition: { metric, operator, value: numericValue }, channel }
    );
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
        aria-labelledby="new-alert-title"
        onClick={(e) => e.stopPropagation()}
        className="glass w-full max-w-md rounded-xl3 border-white/10 p-6 shadow-card sm:p-7"
      >
        <div className="flex items-start justify-between gap-4">
          <h3 id="new-alert-title" className="font-heading text-lg font-semibold text-white">
            New Alert
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
          <select
            value={ruleType}
            onChange={(e) => setRuleType(e.target.value as "price" | "weather")}
            className={FIELD_CLASS}
          >
            <option value="price" className="bg-surface-void">
              Price alert
            </option>
            <option value="weather" className="bg-surface-void">
              Weather alert
            </option>
          </select>

          {ruleType === "weather" && (
            <select
              value={metric}
              onChange={(e) => setMetric(e.target.value as typeof metric)}
              className={FIELD_CLASS}
            >
              <option value="rain_probability" className="bg-surface-void">
                Rain probability
              </option>
              <option value="temperature" className="bg-surface-void">
                Temperature
              </option>
              <option value="humidity" className="bg-surface-void">
                Humidity
              </option>
            </select>
          )}

          <div className="grid grid-cols-2 gap-3">
            <select
              value={operator}
              onChange={(e) => setOperator(e.target.value as "above" | "below")}
              className={FIELD_CLASS}
            >
              <option value="above" className="bg-surface-void">
                Rises above
              </option>
              <option value="below" className="bg-surface-void">
                Falls below
              </option>
            </select>
            <input
              type="number"
              required
              placeholder={ruleType === "price" ? "e.g. 600" : "e.g. 70"}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className={FIELD_CLASS}
            />
          </div>

          <select
            value={channel}
            onChange={(e) => setChannel(e.target.value as typeof channel)}
            className={FIELD_CLASS}
          >
            <option value="email" className="bg-surface-void">
              Email
            </option>
            <option value="sms" className="bg-surface-void">
              SMS
            </option>
            <option value="whatsapp" className="bg-surface-void">
              WhatsApp
            </option>
            <option value="push" className="bg-surface-void">
              Push
            </option>
          </select>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-1 flex items-center justify-center gap-2 rounded-full bg-coffee-gradient px-5 py-3 text-sm font-semibold text-white shadow-glow-gold transition-transform hover:scale-[1.01] disabled:opacity-70"
          >
            {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
            {isSubmitting ? "Saving..." : "Create Alert"}
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
}
