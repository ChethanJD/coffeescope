"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { PREDICTION_HISTORY } from "@/lib/data/mockDashboard";
import { getDashboardPredictionHistory } from "@/app/dashboard/actions";
import type { SavedPredictionRow } from "@/services/forecast";

export function PredictionsSection() {
  const [rows, setRows] = useState<SavedPredictionRow[] | null>(null);
  const [source, setSource] = useState<"database" | "unavailable">("unavailable");

  useEffect(() => {
    getDashboardPredictionHistory().then((result) => {
      setRows(result.rows);
      setSource(result.source);
    });
  }, []);

  const isReal = source === "database";
  const loading = rows === null;

  return (
    <div className="glass overflow-hidden rounded-xl3 shadow-card">
      <div className="p-6 pb-0">
        <h3 className="font-heading text-lg font-semibold text-white">Prediction History</h3>
        <p className="mt-1 text-xs text-white/40">
          {isReal
            ? "Forecasts you've saved for later reference"
            : "Tracking how AI forecasts compared to actual market prices"}
        </p>
        {!loading && !isReal && (
          <p className="mt-3 w-fit rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/40">
            Showing demo data — connect Supabase and sign in for real history
          </p>
        )}
      </div>

      {loading && <p className="px-6 py-8 text-sm text-white/40">Loading...</p>}

      {!loading && isReal && rows!.length === 0 && (
        <p className="px-6 py-10 text-center text-sm text-white/50">
          No prediction history yet. Save a forecast from the AI page to track it here.
        </p>
      )}

      {!loading && isReal && rows!.length > 0 && (
        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-white/10 text-left text-xs uppercase tracking-wide text-white/40">
                <th className="px-6 py-3 font-medium">Saved</th>
                <th className="px-6 py-3 font-medium">Forecast Date</th>
                <th className="px-6 py-3 font-medium">Predicted</th>
                <th className="px-6 py-3 font-medium">Confidence</th>
                <th className="px-6 py-3 font-medium">Model</th>
              </tr>
            </thead>
            <tbody>
              {rows!.map((row, i) => (
                <motion.tr
                  key={row.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="border-b border-white/[0.04] text-white/70 last:border-0"
                >
                  <td className="px-6 py-3.5">{new Date(row.savedAt).toLocaleDateString()}</td>
                  <td className="px-6 py-3.5">
                    {row.forecast ? new Date(row.forecast.forecastDate).toLocaleDateString() : "—"}
                  </td>
                  <td className="px-6 py-3.5 font-medium text-white">
                    {row.forecast ? `₹${row.forecast.predictedPricePerKgInr.toFixed(2)}` : "—"}
                  </td>
                  <td className="px-6 py-3.5">
                    {row.forecast?.confidence != null ? (
                      <span className="rounded-full bg-coffee-leaf/15 px-2.5 py-1 text-xs font-semibold text-coffee-leaf">
                        {Math.round(row.forecast.confidence * 100)}%
                      </span>
                    ) : (
                      <span className="text-white/30">—</span>
                    )}
                  </td>
                  <td className="px-6 py-3.5 text-xs text-white/40">
                    {row.forecast?.modelVersion ?? "—"}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && !isReal && (
        <div className="mt-2 overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-white/10 text-left text-xs uppercase tracking-wide text-white/40">
                <th className="px-6 py-3 font-medium">Date</th>
                <th className="px-6 py-3 font-medium">Horizon</th>
                <th className="px-6 py-3 font-medium">Predicted</th>
                <th className="px-6 py-3 font-medium">Actual</th>
                <th className="px-6 py-3 font-medium">Accuracy</th>
              </tr>
            </thead>
            <tbody>
              {PREDICTION_HISTORY.map((row, i) => (
                <motion.tr
                  key={row.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="border-b border-white/[0.04] text-white/70 last:border-0"
                >
                  <td className="px-6 py-3.5">{row.date}</td>
                  <td className="px-6 py-3.5">{row.horizon}</td>
                  <td className="px-6 py-3.5 font-medium text-white">₹{row.predicted.toFixed(2)}</td>
                  <td className="px-6 py-3.5">
                    {row.actual !== null ? `₹${row.actual.toFixed(2)}` : "Pending"}
                  </td>
                  <td className="px-6 py-3.5">
                    {row.accuracy !== null ? (
                      <span className="rounded-full bg-coffee-leaf/15 px-2.5 py-1 text-xs font-semibold text-coffee-leaf">
                        {row.accuracy}%
                      </span>
                    ) : (
                      <span className="text-white/30">—</span>
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div className="h-6" />
    </div>
  );
}
