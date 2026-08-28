"use client";

import { useEffect } from "react";

export function ScrollEffects() {
  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-scroll-reveal]")
    );

    if (elements.length === 0) {
      return;
    }

    elements.forEach((element, index) => {
      element.classList.add("scroll-reveal");

      element.style.setProperty(
        "--scroll-delay",
        `${Math.min((index % 4) * 70, 210)}ms`
      );
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("scroll-reveal--visible");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    elements.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return null;
}

export default ScrollEffects;