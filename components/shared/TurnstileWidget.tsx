"use client";

import { useEffect, useId, useRef } from "react";
import Script from "next/script";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: string | HTMLElement,
        options: { sitekey: string; callback: (token: string) => void; theme?: string }
      ) => string;
      reset: (widgetId?: string) => void;
    };
  }
}

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

interface TurnstileWidgetProps {
  onVerify: (token: string) => void;
}

/**
 * Renders nothing when NEXT_PUBLIC_TURNSTILE_SITE_KEY isn't set — the
 * form still works, just without the extra CAPTCHA layer (honeypot +
 * server-side rate limit still apply either way).
 */
export function TurnstileWidget({ onVerify }: TurnstileWidgetProps) {
  const containerId = useId().replace(/:/g, "");
  const widgetIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (!SITE_KEY) return;

    function render() {
      if (window.turnstile && !widgetIdRef.current) {
        widgetIdRef.current = window.turnstile.render(`#${containerId}`, {
          sitekey: SITE_KEY!,
          callback: onVerify,
          theme: "dark",
        });
      }
    }

    if (window.turnstile) {
      render();
    } else {
      // The script tag below fires this once loaded; poll briefly as a fallback.
      const interval = setInterval(() => {
        if (window.turnstile) {
          render();
          clearInterval(interval);
        }
      }, 200);
      return () => clearInterval(interval);
    }
  }, [containerId, onVerify]);

  if (!SITE_KEY) return null;

  return (
    <>
      <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer />
      <div id={containerId} />
    </>
  );
}
