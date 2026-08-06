"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { ALERT_RULES, type AlertRule } from "@/lib/data/mockDashboard";
import { cn } from "@/lib/utils";

function Toggle({ active, onToggle }: { active: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={active}
      className={cn(
        "relative h-6 w-11 shrink-0 rounded-full transition-colors",
        active ? "bg-coffee-leaf" : "bg-white/10"
      )}
    >
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 500, damping: 32 }}
        className="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow"
        style={{ left: active ? 22 : 2 }}
      />
    </button>
  );
}

export function AlertsSection() {
  const [rules, setRules] = useState<AlertRule[]>(ALERT_RULES);

  function toggle(id: string) {
    setRules((prev) => prev.map((r) => (r.id === id ? { ...r, active: !r.active } : r)));
  }

  return (
    <div className="glass rounded-xl3 p-6 shadow-card">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="font-heading text-lg font-semibold text-white">Alert Rules</h3>
        <button
          type="button"
          className="flex items-center gap-1.5 rounded-full bg-coffee-gradient px-4 py-2 text-xs font-semibold text-white shadow-glow-gold"
        >
          <Plus className="h-3.5 w-3.5" />
          New Alert
        </button>
      </div>

      <div className="flex flex-col gap-2.5">
        {rules.map((rule, i) => (
          <motion.div
            key={rule.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.06 }}
            className="flex items-center gap-4 rounded-xl bg-white/[0.03] px-4 py-3.5"
          >
            <div className="flex-1">
              <p className="text-sm font-medium text-white">{rule.label}</p>
              <p className="mt-0.5 text-xs text-white/40">{rule.condition}</p>
            </div>
            <span className="rounded-full bg-white/[0.05] px-2.5 py-1 text-[11px] font-medium text-white/50">
              {rule.channel}
            </span>
            <Toggle active={rule.active} onToggle={() => toggle(rule.id)} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
