"use client";

import { motion } from "framer-motion";
import { CheckCircle2, AlertTriangle, ShieldAlert, Pill, HelpCircle } from "lucide-react";
import { ConfidenceGauge } from "@/components/prediction/ConfidenceGauge";
import { cn } from "@/lib/utils";
import type { DiagnosisResult as DiagnosisResultType } from "@/lib/diseaseDetection/mockAnalyze";

const SEVERITY_META = {
  Low: { color: "text-coffee-leaf", bg: "bg-coffee-leaf/15" },
  Moderate: { color: "text-coffee-gold", bg: "bg-coffee-gold/15" },
  High: { color: "text-red-400", bg: "bg-red-500/15" },
};

const DISCLAIMER =
  "This is an automated estimate, not a professional diagnosis. For valuable crops or " +
  "uncertain cases, confirm with your local agricultural extension office before taking action.";

export function DiagnosisResult({ result }: { result: DiagnosisResultType }) {
  if (result.status === "inconclusive") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="glass flex flex-col items-center gap-3 rounded-xl3 p-7 text-center shadow-card"
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/[0.06]">
          <HelpCircle className="h-6 w-6 text-white/50" />
        </span>
        <h3 className="font-heading text-lg font-semibold text-white">Unable to identify</h3>
        <p className="max-w-sm text-sm leading-relaxed text-white/50">
          The confidence for this sample ({Math.round(result.confidence)}%) is too low for a
          reliable result. Try a closer, well-lit photo of a single affected leaf or cherry, or
          consult your local agricultural extension office.
        </p>
        <p className="mt-2 max-w-sm text-xs leading-relaxed text-white/30">{DISCLAIMER}</p>
      </motion.div>
    );
  }

  const { disease, confidence } = result;
  const isHealthy = disease.id === "healthy";
  const severityMeta = SEVERITY_META[disease.severity];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="glass rounded-xl3 p-6 shadow-card sm:p-7"
    >
      <div className="flex flex-wrap items-start justify-between gap-6">
        <div className="flex items-start gap-3">
          <span
            className={cn(
              "mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
              severityMeta.bg
            )}
          >
            {isHealthy ? (
              <CheckCircle2 className={cn("h-5 w-5", severityMeta.color)} />
            ) : (
              <AlertTriangle className={cn("h-5 w-5", severityMeta.color)} />
            )}
          </span>
          <div>
            <h3 className="font-heading text-lg font-semibold text-white">{disease.name}</h3>
            <span
              className={cn(
                "mt-1 inline-block rounded-full px-2.5 py-1 text-[11px] font-semibold",
                severityMeta.bg,
                severityMeta.color
              )}
            >
              {disease.severity} severity
            </span>
          </div>
        </div>
        <ConfidenceGauge confidence={confidence} />
      </div>

      <p className="mt-5 text-sm leading-relaxed text-white/60">{disease.description}</p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-xl2 bg-white/[0.03] p-4">
          <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-white/40">
            <ShieldAlert className="h-3.5 w-3.5 text-coffee-gold" />
            Recommended Treatment
          </span>
          <ul className="mt-3 flex flex-col gap-2">
            {disease.treatment.map((step, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-white/70">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-coffee-gold" />
                {step}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl2 bg-white/[0.03] p-4">
          <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-white/40">
            <Pill className="h-3.5 w-3.5 text-coffee-leaf" />
            Recommended Product
          </span>
          <p className="mt-3 text-sm font-medium text-white">{disease.recommendedProduct}</p>
        </div>
      </div>

      <p className="mt-5 text-xs leading-relaxed text-white/30">{DISCLAIMER}</p>
    </motion.div>
  );
}
