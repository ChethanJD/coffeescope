"use client";

import { useEffect, useState } from "react";
import { Clock3, Globe2 } from "lucide-react";

type Market = { city: string; timezone: string; openHour: number; closeHour: number };

const MARKETS: Market[] = [
  { city: "New York", timezone: "America/New_York", openHour: 8, closeHour: 13 },
  { city: "London", timezone: "Europe/London", openHour: 8, closeHour: 16 },
  { city: "Mumbai", timezone: "Asia/Kolkata", openHour: 9, closeHour: 17 },
];

function statusFor(market: Market) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: market.timezone,
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts();
  const hour = Number(parts.find((part) => part.type === "hour")?.value ?? 0);
  const minute = Number(parts.find((part) => part.type === "minute")?.value ?? 0);
  const isOpen = hour >= market.openHour && hour < market.closeHour;
  const minutes = isOpen
    ? (market.closeHour - hour) * 60 - minute
    : hour < market.openHour
      ? (market.openHour - hour) * 60 - minute
      : (24 - hour + market.openHour) * 60 - minute;

  return { isOpen, minutes, time: `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}` };
}

export function MarketStatusBar() {
  const [, setTick] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setTick((tick) => tick + 1), 60_000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="relative z-10 border-y border-white/[0.07] bg-black/20 px-6 py-3 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center gap-3 overflow-x-auto text-xs">
        <span className="flex shrink-0 items-center gap-1.5 font-semibold uppercase tracking-wider text-white/45">
          <Globe2 className="h-3.5 w-3.5 text-coffee-gold" /> Market hours
        </span>
        {MARKETS.map((market) => {
          const status = statusFor(market);
          return (
            <div key={market.city} className="flex shrink-0 items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5">
              <span className={`h-1.5 w-1.5 rounded-full ${status.isOpen ? "animate-pulse bg-coffee-leaf" : "bg-white/25"}`} />
              <span className="font-medium text-white/75">{market.city}</span>
              <span className={status.isOpen ? "text-coffee-leaf" : "text-white/40"}>{status.isOpen ? "Open" : "Closed"}</span>
              <span className="flex items-center gap-1 text-white/35"><Clock3 className="h-3 w-3" /> {status.time}</span>
              {status.isOpen && status.minutes <= 60 && <span className="text-coffee-gold">Closes in {status.minutes}m</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
