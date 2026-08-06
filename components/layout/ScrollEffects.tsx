"use client";

import { useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollEffects() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 28, restDelta: 0.001 });

  useEffect(() => {
    const selectors = ["main section > div.mx-auto", "main section article", "main section [class*='rounded-xl3']", "main section [class*='rounded-xl2']"].join(",");
    const elements = Array.from(document.querySelectorAll<HTMLElement>(selectors));
    const unique = [...new Set(elements)].filter((element) => !element.closest("footer"));
    unique.forEach((element, index) => {
      element.classList.add("scroll-reveal");
      element.style.setProperty("--scroll-delay", `${Math.min((index % 4) * 70, 210)}ms`);
    });
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add("scroll-reveal--visible"); observer.unobserve(entry.target); }
    }), { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    unique.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return <motion.div aria-hidden="true" className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-coffee-gold shadow-glow-gold" style={{ scaleX: progress }} />;
}
