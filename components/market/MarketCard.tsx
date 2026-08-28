"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowUpRight,
  ArrowDownRight,
  Coffee,
} from "lucide-react";

import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { Sparkline } from "@/components/ui/Sparkline";
import { cn } from "@/lib/utils";
import type { MarketQuote } from "@/types";

const VARIETY_ACCENT: Record<MarketQuote["variety"], string> = {
  Arabica: "#D6A55C",
  Robusta: "#3A7D44",
};

function ChangeBadge({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  const isPositive = value >= 0;

  return (
    <div className="flex items-center justify-between rounded-xl bg-white/[0.03] px-3 py-2">
      <span className="text-xs font-medium text-white/45">
        {label}
      </span>

      <span
        className={cn(
          "flex items-center gap-1 text-sm font-semibold",
          isPositive ? "text-coffee-leaf" : "text-red-400"
        )}
      >
        {isPositive ? (
          <ArrowUpRight className="h-3.5 w-3.5" />
        ) : (
          <ArrowDownRight className="h-3.5 w-3.5" />
        )}

        {Math.abs(value).toFixed(2)}%
      </span>
    </div>
  );
}

export function MarketCard({
  quote,
  index,
}: {
  quote: MarketQuote;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  /*
   * Important:
   * Keep the initial server render identical to the initial
   * client render. The interactive 3D transform is enabled
   * only after hydration.
   */
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const accent = VARIETY_ACCENT[quote.variety];

  // Pointer-driven 3D tilt.
  const rotateXRaw = useMotionValue(0);
  const rotateYRaw = useMotionValue(0);

  const rotateX = useSpring(rotateXRaw, {
    stiffness: 300,
    damping: 30,
  });

  const rotateY = useSpring(rotateYRaw, {
    stiffness: 300,
    damping: 30,
  });

  const glowX = useTransform(
    rotateY,
    [-8, 8],
    [0, 100]
  );

  const glowY = useTransform(
    rotateX,
    [8, -8],
    [0, 100]
  );

  const glowBackground = useTransform(
    [glowX, glowY],
    ([gx, gy]: number[]) =>
      `radial-gradient(320px circle at ${gx}% ${gy}%, ${accent}22, transparent 70%)`
  );

  function handlePointerMove(
    e: React.PointerEvent<HTMLDivElement>
  ) {
    /*
     * The 3D effect is intentionally disabled until the component
     * has hydrated. It is also limited to mouse input so touch
     * devices don't get unwanted movement.
     */
    if (!isMounted || e.pointerType !== "mouse") {
      return;
    }

    const el = cardRef.current;

    if (!el) {
      return;
    }

    const rect = el.getBoundingClientRect();

    const px =
      (e.clientX - rect.left) / rect.width;

    const py =
      (e.clientY - rect.top) / rect.height;

    rotateYRaw.set((px - 0.5) * 12);
    rotateXRaw.set((0.5 - py) * 12);
  }

  function handlePointerLeave() {
    rotateXRaw.set(0);
    rotateYRaw.set(0);
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 32,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        margin: "-10% 0px",
      }}
      transition={{
        duration: 0.6,
        delay: index * 0.12,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{
        perspective: 1000,
      }}
    >
      <motion.div
        ref={cardRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        style={
          isMounted
            ? {
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
              }
            : {
                rotateX: 0,
                rotateY: 0,
                transformStyle: "flat",
              }
        }
        className="glass group relative overflow-hidden rounded-xl3 p-4 shadow-card sm:p-6 lg:p-7"
      >
        {/* Pointer-follow glow */}
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: glowBackground,
          }}
        />

        <div className="relative flex items-start justify-between">
          <div className="flex items-center gap-3">
            <span
              className="flex h-11 w-11 items-center justify-center rounded-full"
              style={{
                backgroundColor: `${accent}1F`,
              }}
            >
              <Coffee
                className="h-5 w-5"
                style={{
                  color: accent,
                }}
              />
            </span>

            <div>
              <h3 className="font-heading text-lg font-semibold text-white">
                {quote.variety}
              </h3>

              <p className="text-xs text-white/40">
                {quote.currency}
              </p>
            </div>
          </div>

          <span className="flex items-center gap-1.5 rounded-full bg-white/[0.04] px-2.5 py-1 text-[11px] font-medium text-white/50">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-coffee-leaf" />
            Live
          </span>
        </div>

        <div className="relative mt-6">
          <AnimatedCounter
            value={quote.price}
            prefix="₹"
            className="font-heading text-3xl font-semibold text-white sm:text-4xl lg:text-5xl"
          />
        </div>

        <div className="relative mt-5">
          <Sparkline
            data={quote.sparkline}
            color={accent}
          />
        </div>

        <div className="relative mt-5 grid grid-cols-2 gap-2">
          <ChangeBadge
            label="24h"
            value={quote.changeDaily}
          />

          <ChangeBadge
            label="7d"
            value={quote.changeWeekly}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}