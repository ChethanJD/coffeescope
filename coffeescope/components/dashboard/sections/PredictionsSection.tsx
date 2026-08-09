"use client";

import { motion } from "framer-motion";
import { PREDICTION_HISTORY } from "@/lib/data/mockDashboard";

export function PredictionsSection() {
  return (
    <div className="glass overflow-hidden rounded-xl3 shadow-card">
      <div className="p-6 pb-0">
        <h3 className="font-heading text-lg font-semibold text-white">Prediction History</h3>
        <p className="mt-1 text-xs text-white/40">
          Tracking how AI forecasts compared to actual market prices
        </p>
      </div>

      <div className="mt-5 overflow-x-auto">
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
      <div className="h-6" />
    </div>
  );
}
