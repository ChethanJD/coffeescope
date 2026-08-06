"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Fixed-position animated background whose frame is driven by how far the
 * user has scrolled down the WHOLE page (0% at top, 100% at bottom) —
 * nothing is pinned, no scroll-hijacking. Page content scrolls normally
 * in front of it. Pair with a semi-transparent section background (see
 * `.bg-surface-void` override in globals.css) so the animation is
 * actually visible behind the content instead of hidden behind opaque
 * panels.
 *
 * USAGE
 * -----
 * Mount once near the top of a page's JSX (it's `position: fixed`, so
 * placement in the DOM doesn't affect layout):
 *
 * <ScrollBackgroundSequence frameCount={120} framePath="/frames/" />
 */

interface ScrollBackgroundSequenceProps {
  frameCount: number;
  framePath?: string;
  frameName?: (index: number) => string;
  opacity?: number;
}

export function ScrollBackgroundSequence({
  frameCount,
  framePath = "/frames/",
  frameName,
  opacity = 1,
}: ScrollBackgroundSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const [loadedCount, setLoadedCount] = useState(0);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resolveFrameName =
      frameName ?? ((i: number) => `${framePath}frame_${String(i + 1).padStart(4, "0")}.jpg`);

    let cancelled = false;
    let scrollTrigger: ScrollTrigger | null = null;

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
      canvas!.width = Math.round(window.innerWidth * dpr);
      canvas!.height = Math.round(window.innerHeight * dpr);
      drawFrame(currentFrameRef.current);
    }

    function setupScrollTracking() {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      resizeCanvas();
      drawFrame(0);

      if (prefersReducedMotion) {
        drawFrame(Math.round(frameCount / 2));
        return;
      }

      gsap.registerPlugin(ScrollTrigger);

      // Tracks whole-document scroll progress (0 -> 1) with no pinning.
      scrollTrigger = ScrollTrigger.create({
        start: 0,
        end: () => Math.max(document.documentElement.scrollHeight - window.innerHeight, 1),
        scrub: 0.4, // light smoothing so frame changes don't feel jittery
        onUpdate: (self) => {
          currentFrameRef.current = self.progress * (frameCount - 1);
          drawFrame(currentFrameRef.current);
        },
      });
    }

    // --- Preload every frame, then start tracking scroll ---
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
          setupScrollTracking();
        }
      };
      img.src = resolveFrameName(i);
      images[i] = img;
    }
    imagesRef.current = images;

    function handleResize() {
      resizeCanvas();
      ScrollTrigger.refresh();
    }
    window.addEventListener("resize", handleResize);

    return () => {
      cancelled = true;
      window.removeEventListener("resize", handleResize);
      scrollTrigger?.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [frameCount, framePath]);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden="true">
      <canvas
        ref={canvasRef}
        className="h-full w-full"
        style={{
          opacity: isReady ? opacity : 0,
          filter: "brightness(1.25) contrast(1.1) saturate(1.1)",
          transition: "opacity 0.8s ease",
        }}
      />
    </div>
  );
}
