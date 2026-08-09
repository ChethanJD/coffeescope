"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

interface UseCountUpOptions {
  decimals?: number;
  duration?: number;
}

/**
 * Animates a numeric value from 0 to `value` once the returned ref enters
 * the viewport. Returns the ref to attach and the formatted display string.
 */
export function useCountUp(
  value: number,
  { decimals = 2, duration = 1.4 }: UseCountUpOptions = {}
) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, {
    duration,
    bounce: 0,
  });
  const [display, setDisplay] = useState((0).toFixed(decimals));

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    const unsubscribe = spring.on("change", (latest) => {
      setDisplay(latest.toFixed(decimals));
    });
    return unsubscribe;
  }, [spring, decimals]);

  return { ref, display };
}
