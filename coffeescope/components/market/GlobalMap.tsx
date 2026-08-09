"use client";

import { motion } from "framer-motion";
import { projectLonLat } from "@/lib/geo";
import { COUNTRY_MARKET_DATA, type CountryMarketData } from "@/lib/data/mockCountries";

const WIDTH = 1000;
const HEIGHT = 500;
const HUB = { x: WIDTH / 2, y: 56 };

// Soft decorative glow field roughly hinting at continents — intentionally
// abstract (a data-visualization aesthetic, not literal cartography) so we
// don't need real coastline path data or a third-party map provider.
const GLOW_FIELD: { lon: number; lat: number; r: number; color: string }[] = [
  { lon: -60, lat: -15, r: 90, color: "#5C3B21" }, // South America
  { lon: -100, lat: 40, r: 110, color: "#3A7D44" }, // North America
  { lon: 20, lat: 5, r: 110, color: "#D6A55C" }, // Africa
  { lon: 15, lat: 50, r: 70, color: "#3A7D44" }, // Europe
  { lon: 90, lat: 30, r: 130, color: "#5C3B21" }, // Asia
  { lon: 135, lat: -25, r: 60, color: "#D6A55C" }, // Australia
];

function WireframeWorld() {
  const verticalLines = Array.from({ length: 11 }, (_, i) => (i * WIDTH) / 10);
  const horizontalLines = Array.from({ length: 6 }, (_, i) => (i * HEIGHT) / 5);

  return (
    <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="absolute inset-0 h-full w-full">
      <defs>
        {GLOW_FIELD.map((g, i) => (
          <radialGradient key={i} id={`glow-${i}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={g.color} stopOpacity="0.35" />
            <stop offset="100%" stopColor={g.color} stopOpacity="0" />
          </radialGradient>
        ))}
      </defs>

      {GLOW_FIELD.map((g, i) => {
        const { x, y } = projectLonLat(g.lon, g.lat, WIDTH, HEIGHT);
        return <circle key={i} cx={x} cy={y} r={g.r} fill={`url(#glow-${i})`} />;
      })}

      {verticalLines.map((x, i) => (
        <line key={`v-${i}`} x1={x} y1={0} x2={x} y2={HEIGHT} stroke="white" strokeOpacity={0.04} />
      ))}
      {horizontalLines.map((y, i) => (
        <line key={`h-${i}`} x1={0} y1={y} x2={WIDTH} y2={y} stroke="white" strokeOpacity={0.04} />
      ))}
      <line x1={0} y1={HEIGHT / 2} x2={WIDTH} y2={HEIGHT / 2} stroke="white" strokeOpacity={0.08} />
    </svg>
  );
}

function TradeLines({ activeId }: { activeId: string | null }) {
  return (
    <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="absolute inset-0 h-full w-full">
      {COUNTRY_MARKET_DATA.map((country, i) => {
        const { x, y } = projectLonLat(country.longitude, country.latitude, WIDTH, HEIGHT);
        const midY = (HUB.y + y) / 2;
        const path = `M${HUB.x},${HUB.y} Q${HUB.x},${midY} ${x},${y}`;
        const isActive = country.id === activeId;
        return (
          <motion.path
            key={country.id}
            d={path}
            fill="none"
            stroke={isActive ? "#D6A55C" : "white"}
            strokeOpacity={isActive ? 0.6 : 0.12}
            strokeWidth={isActive ? 1.5 : 1}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, delay: 0.3 + i * 0.15, ease: "easeOut" }}
          />
        );
      })}
      <circle cx={HUB.x} cy={HUB.y} r={4} fill="#D6A55C" />
      <circle cx={HUB.x} cy={HUB.y} r={9} fill="none" stroke="#D6A55C" strokeOpacity={0.4} />
    </svg>
  );
}

export function GlobalMap({
  onSelectCountry,
  selectedId,
}: {
  onSelectCountry: (c: CountryMarketData) => void;
  selectedId: string | null;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="glass relative overflow-hidden rounded-xl3 shadow-card"
      style={{ aspectRatio: `${WIDTH} / ${HEIGHT}` }}
    >
      <WireframeWorld />
      <TradeLines activeId={selectedId} />

      <div
        className="absolute flex -translate-x-1/2 flex-col items-center text-center"
        style={{ left: `${(HUB.x / WIDTH) * 100}%`, top: `${(HUB.y / HEIGHT) * 100}%`, marginTop: -34 }}
      >
        <span className="whitespace-nowrap rounded-full bg-white/[0.06] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white/60">
          CoffeeScope Network
        </span>
      </div>

      {COUNTRY_MARKET_DATA.map((country) => {
        const { x, y } = projectLonLat(country.longitude, country.latitude, WIDTH, HEIGHT);
        const isActive = country.id === selectedId;
        return (
          <button
            key={country.id}
            type="button"
            aria-label={`View ${country.name} market data`}
            onClick={() => onSelectCountry(country)}
            className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5"
            style={{ left: `${(x / WIDTH) * 100}%`, top: `${(y / HEIGHT) * 100}%` }}
          >
            <span className="relative flex h-5 w-5 items-center justify-center">
              <span
                className={`absolute h-5 w-5 rounded-full bg-coffee-gold/40 ${
                  isActive ? "animate-ping" : ""
                }`}
              />
              <span
                className={`relative h-2.5 w-2.5 rounded-full border-2 border-white shadow-glow-gold transition-colors ${
                  isActive ? "bg-coffee-leaf" : "bg-coffee-gold"
                }`}
              />
            </span>
            <span
              className={`whitespace-nowrap rounded-full px-2 py-0.5 text-[11px] font-medium transition-colors ${
                isActive ? "bg-coffee-leaf/20 text-white" : "bg-black/40 text-white/60"
              }`}
            >
              {country.name}
            </span>
          </button>
        );
      })}
    </motion.div>
  );
}
