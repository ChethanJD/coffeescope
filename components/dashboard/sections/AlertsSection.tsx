"use client";

import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { ALERT_RULES } from "@/lib/data/mockDashboard";
import { getDashboardAlerts, toggleDashboardAlert } from "@/app/dashboard/actions";
import { NewAlertModal } from "@/components/dashboard/NewAlertModal";
import { cn } from "@/lib/utils";
import type { AlertRule } from "@/types/models";

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

function describeRule(rule: AlertRule): { label: string; condition: string } {
  const c = rule.condition as { operator?: string; value?: number; metric?: string };
  if (rule.ruleType === "price") {
    return {
      label: "Price alert",
      condition: `Price ${c.operator === "above" ? "rises above" : "falls below"} ₹${c.value}`,
    };
  }
  if (rule.ruleType === "weather") {
    const metricLabel =
      c.metric === "rain_probability"
        ? "Rain probability"
        : c.metric === "temperature"
          ? "Temperature"
          : "Humidity";
    return {
      label: "Weather alert",
      condition: `${metricLabel} ${c.operator === "above" ? "rises above" : "falls below"} ${c.value}`,
    };
  }
  return { label: "Disease alert", condition: "Disease risk detected" };
}

export function AlertsSection() {
  const [rules, setRules] = useState<AlertRule[] | null>(null);
  const [source, setSource] = useState<"database" | "unavailable">("unavailable");
  const [showNewModal, setShowNewModal] = useState(false);

  const refresh = useCallback(() => {
    getDashboardAlerts().then((result) => {
      setRules(result.rules);
      setSource(result.source);
    });
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const isReal = source === "database";
  const loading = rules === null;

  async function toggleReal(id: string, current: boolean) {
    // Optimistic update, reconciled by a refresh after the request settles.
    setRules((prev) => prev?.map((r) => (r.id === id ? { ...r, isActive: !current } : r)) ?? prev);
    await toggleDashboardAlert({ id, isActive: !current });
    refresh();
  }

  const [demoRules, setDemoRules] = useState(ALERT_RULES);
  function toggleDemo(id: string) {
    setDemoRules((prev) => prev.map((r) => (r.id === id ? { ...r, active: !r.active } : r)));
  }

  return (
    <div className="glass rounded-xl3 p-6 shadow-card">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="font-heading text-lg font-semibold text-white">Alert Rules</h3>
        <button
          type="button"
          onClick={() => setShowNewModal(true)}
          className="flex items-center gap-1.5 rounded-full bg-coffee-gradient px-4 py-2 text-xs font-semibold text-white shadow-glow-gold"
        >
          <Plus className="h-3.5 w-3.5" />
          New Alert
        </button>
      </div>

      {loading && <p className="text-sm text-white/40">Loading your alerts...</p>}

      {!loading && isReal && rules!.length === 0 && (
        <p className="rounded-xl bg-white/[0.03] px-4 py-6 text-center text-sm text-white/50">
          No alerts yet. Create one to get notified about price or weather changes.
        </p>
      )}

      {!loading && isReal && rules!.length > 0 && (
        <div className="flex flex-col gap-2.5">
          {rules!.map((rule, i) => {
            const { label, condition } = describeRule(rule);
            return (
              <motion.div
                key={rule.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.06 }}
                className="flex items-center gap-4 rounded-xl bg-white/[0.03] px-4 py-3.5"
              >
                <div className="flex-1">
                  <p className="text-sm font-medium text-white">{label}</p>
                  <p className="mt-0.5 text-xs text-white/40">{condition}</p>
                </div>
                <span className="rounded-full bg-white/[0.05] px-2.5 py-1 text-[11px] font-medium capitalize text-white/50">
                  {rule.channel}
                </span>
                <Toggle active={rule.isActive} onToggle={() => toggleReal(rule.id, rule.isActive)} />
              </motion.div>
            );
          })}
        </div>
      )}

      {!loading && !isReal && (
        <>
          <p className="-mt-2 mb-4 w-fit rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/40">
            Showing demo data — connect Supabase and sign in to manage real alerts
          </p>
          <div className="flex flex-col gap-2.5">
            {demoRules.map((rule, i) => (
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
                <Toggle active={rule.active} onToggle={() => toggleDemo(rule.id)} />
              </motion.div>
            ))}
          </div>
        </>
      )}

      {showNewModal && (
        <NewAlertModal
          onClose={() => setShowNewModal(false)}
          onCreated={() => {
            setShowNewModal(false);
            refresh();
          }}
        />
      )}
    </div>
  );
}
