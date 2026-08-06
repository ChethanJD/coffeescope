"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Apple AirPods-style scroll-linked image sequence.
 *
 * Preloads every frame, then pins the canvas in the viewport and scrubs
 * the frame index in lockstep with scroll position via GSAP ScrollTrigger.
 * Renders at devicePixelRatio (capped at 2x) for sharp mobile/Retina
 * output, and crops each frame like CSS `object-fit: cover` so nothing
 * distorts or letterboxes. Respects prefers-reduced-motion by showing a
 * static final frame instead of animating.
 *
 * USAGE
 * -----
 * <ScrollImageSequence
 *   frameCount={180}
 *   framePath="/frames/"
 *   scrollDistanceVh={400}
 * />
 *
 * Put your actual frame files in /public/frames/ (or wherever framePath
 * points) — Next.js serves everything under /public/ at the site root.
 * Default naming pattern is frame_0001.jpg, frame_0002.jpg, ... — pass a
 * custom `frameName` function if yours differs.
 */

interface ScrollImageSequenceProps {
  frameCount: number;
  framePath?: string;
  frameName?: (index: number) => string;
  scrollDistanceVh?: number;
  className?: string;
}

export function ScrollImageSequence({
  frameCount,
  framePath = "/frames/",
  frameName,
  scrollDistanceVh = 400,
  className = "",
}: ScrollImageSequenceProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const stateRef = useRef({ frame: 0 });

  const [loadedCount, setLoadedCount] = useState(0);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    const sticky = stickyRef.current;
    if (!canvas || !section || !sticky) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resolveFrameName =
      frameName ?? ((i: number) => `${framePath}frame_${String(i + 1).padStart(4, "0")}.jpg`);

    let cancelled = false;
    let tween: gsap.core.Tween | null = null;

    function drawFrame(index: number) {
      const i = Math.max(0, Math.min(frameCount - 1, Math.round(index)));
      const img = imagesRef.current[i];
      if (!img || !img.complete || !img.naturalWidth) return;

      const cw = canvas!.width;
      const ch = canvas!.height;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;
      const canvasRatio = cw / ch;
      const imgRatio = iw / ih;

      let sx: number, sy: number, sw: number, sh: number;
      if (imgRatio > canvasRatio) {
        sh = ih;
        sw = ih * canvasRatio;
        sx = (iw - sw) / 2;
        sy = 0;
      } else {
        sw = iw;
        sh = iw / canvasRatio;
        sx = 0;
        sy = (ih - sh) / 2;
      }
      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, cw, ch);
    }

    function resizeCanvas() {
      const rect = canvas!.getBoundingClientRect();
      canvas!.width = Math.round(rect.width * dpr);
      canvas!.height = Math.round(rect.height * dpr);
      drawFrame(stateRef.current.frame);
    }

    function setupScrollTrigger() {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      resizeCanvas();
      drawFrame(0);

      if (prefersReducedMotion) {
        drawFrame(frameCount - 1);
        return;
      }

      gsap.registerPlugin(ScrollTrigger);

      tween = gsap.to(stateRef.current, {
        frame: frameCount - 1,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5, // slight inertia smoothing — avoids stutter vs raw scrub:true
          pin: sticky,
          pinSpacing: false,
          anticipatePin: 1,
        },
        onUpdate: () => drawFrame(stateRef.current.frame),
      });
    }

    // --- Preload every frame, then wire up ScrollTrigger once done ---
    let loaded = 0;
    const images: HTMLImageElement[] = new Array(frameCount);

    for (let i = 0; i < frameCount; i++) {
      const img = new window.Image();
      img.decoding = "async";
      img.onload = img.onerror = () => {
        if (cancelled) return;
        loaded += 1;
        setLoadedCount(loaded);
        if (i === 0) resizeCanvas();
        if (loaded === frameCount) {
          setIsReady(true);
          setupScrollTrigger();
        }
      };
      img.src = resolveFrameName(i);
      images[i] = img;
    }
    imagesRef.current = images;

    function handleResize() {
      resizeCanvas();
    }
    window.addEventListener("resize", handleResize);

    return () => {
      cancelled = true;
      window.removeEventListener("resize", handleResize);
      tween?.scrollTrigger?.kill();
      tween?.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [frameCount, framePath]);

  const progressPct = frameCount > 0 ? Math.round((loadedCount / frameCount) * 100) : 0;

  return (
    <section
      ref={sectionRef}
      className={`relative w-full bg-surface-void ${className}`}
      style={{ height: `${scrollDistanceVh}vh` }}
      aria-label="Product scroll animation"
    >
      <div
        ref={stickyRef}
        className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden bg-surface-void"
      >
        <canvas ref={canvasRef} className="block h-full w-full" aria-hidden="true" />

        {!isReady && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-surface-void transition-opacity duration-500">
            <div className="h-9 w-9 animate-spin rounded-full border-[2.5px] border-white/15 border-t-coffee-gold" />
            <p className="text-xs tracking-wide text-white/50">Loading {progressPct}%</p>
          </div>
        )}
      </div>
    </section>
  );
}
