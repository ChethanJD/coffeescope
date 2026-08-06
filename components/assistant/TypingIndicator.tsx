"use client";

import { motion } from "framer-motion";
import { Coffee } from "lucide-react";

export function TypingIndicator() {
  return (
    <div className="flex items-end gap-2">
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-coffee-gradient">
        <Coffee className="h-3.5 w-3.5 text-white" />
      </span>
      <div className="flex items-center gap-1 rounded-2xl rounded-bl-md bg-white/[0.06] px-4 py-3">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="h-1.5 w-1.5 rounded-full bg-black/40"
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
          />
        ))}
      </div>
    </div>
  );
}
