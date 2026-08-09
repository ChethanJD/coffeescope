"use client";

import { useEffect, useMemo, useState } from "react";
import { Icon } from "leaflet";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { ArrowDownRight, ArrowUpRight, Mountain, Droplets } from "lucide-react";

type Origin = { id: string; name: string; country: string; region: string; position: [number, number]; price: number; change: number; variety: "Arabica" | "Robusta"; altitude: string; process: string; harvest: "Active" | "Upcoming" | "Complete"; score: number };
const ORIGINS: Origin[] = [
  { id: "eth", name: "Yirgacheffe", country: "Ethiopia", region: "Gedeo Zone", position: [6.162, 38.205], price: 485, change: 3.2, variety: "Arabica", altitude: "1,750–2,200m", process: "Washed", harvest: "Upcoming", score: 94 },
  { id: "bra", name: "Santos", country: "Brazil", region: "Minas Gerais", position: [-21.5, -45], price: 278, change: 0.9, variety: "Arabica", altitude: "900–1,200m", process: "Natural", harvest: "Complete", score: 82 },
  { id: "col", name: "Supremo", country: "Colombia", region: "Huila", position: [2.535, -75.527], price: 392, change: -1.8, variety: "Arabica", altitude: "1,500–1,900m", process: "Washed", harvest: "Active", score: 88 },
  { id: "vie", name: "Central Highlands", country: "Vietnam", region: "Dak Lak", position: [12.8, 108.05], price: 195, change: -2.4, variety: "Robusta", altitude: "500–800m", process: "Natural", harvest: "Active", score: 76 },
  { id: "ken", name: "AA", country: "Kenya", region: "Nyeri", position: [-0.416, 36.951], price: 520, change: 1.5, variety: "Arabica", altitude: "1,700–2,100m", process: "Washed", harvest: "Complete", score: 92 },
  { id: "ind", name: "Mandheling", country: "Indonesia", region: "North Sumatra", position: [2.115, 98.658], price: 310, change: 0.4, variety: "Arabica", altitude: "1,100–1,500m", process: "Giling Basah", harvest: "Active", score: 85 },
];
const icon = new Icon({ iconUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 24 24' fill='%23D6A55C' stroke='%230B0B0B' stroke-width='2'%3E%3Cpath d='M18 8h1a4 4 0 0 1 0 8h-1'/%3E%3Cpath d='M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z'/%3E%3C/svg%3E", iconSize: [32, 32], iconAnchor: [16, 32], popupAnchor: [0, -30] });

function MapFocus({ origin }: { origin: Origin | null }) { const map = useMap(); useEffect(() => { map.flyTo(origin?.position ?? [10, 20], origin ? 7 : 2, { duration: 1.2 }); }, [map, origin]); return null; }

export default function OriginMapClient() {
  const [filter, setFilter] = useState<"All" | "Arabica" | "Robusta">("All");
  const [selected, setSelected] = useState<Origin | null>(null);
  const origins = useMemo(() => ORIGINS.filter((origin) => filter === "All" || origin.variety === filter), [filter]);
  return <div className="grid gap-6 lg:grid-cols-[330px_1fr]">
    <div className="glass rounded-xl3 p-4"><div className="mb-4 flex items-center justify-between"><h3 className="font-heading text-lg font-semibold text-white">Origin Explorer</h3><span className="text-xs text-white/45">{origins.length} shown</span></div><div className="mb-4 flex gap-1.5">{(["All", "Arabica", "Robusta"] as const).map((value) => <button key={value} type="button" onClick={() => setFilter(value)} className={`rounded-full px-3 py-1.5 text-xs font-medium ${filter === value ? "bg-coffee-gradient text-white" : "bg-white/[0.05] text-white/55 hover:text-white"}`}>{value}</button>)}</div><div className="max-h-[428px] space-y-2 overflow-y-auto pr-1">{origins.map((origin) => <button type="button" key={origin.id} onClick={() => setSelected(origin)} className={`w-full rounded-xl border p-3 text-left transition-colors ${selected?.id === origin.id ? "border-coffee-gold bg-coffee-gold/10" : "border-white/[0.07] bg-white/[0.03] hover:bg-white/[0.06]"}`}><div className="flex justify-between gap-3"><div><p className="font-medium text-white">{origin.name}</p><p className="text-xs text-white/45">{origin.country} · {origin.region}</p></div><div className="text-right"><p className="font-semibold text-white">${origin.price}</p><p className={`flex items-center justify-end gap-0.5 text-xs ${origin.change >= 0 ? "text-coffee-leaf" : "text-red-400"}`}>{origin.change >= 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}{Math.abs(origin.change)}%</p></div></div><p className="mt-2 text-xs text-white/45">Harvest {origin.harvest} · Score {origin.score}</p></button>)}</div></div>
    <div className="h-[520px] overflow-hidden rounded-xl3 border border-white/[0.08]"><MapContainer center={[10, 20]} zoom={2} className="h-full w-full" scrollWheelZoom><TileLayer attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>' url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" /><MapFocus origin={selected} />{origins.map((origin) => <Marker key={origin.id} position={origin.position} icon={icon} eventHandlers={{ click: () => setSelected(origin) }}><Popup><div className="min-w-44 text-stone-900"><b>{origin.name}</b><p className="mb-2 text-xs text-stone-500">{origin.country} · {origin.region}</p><p className="flex items-center gap-1 text-xs"><Mountain size={12} />{origin.altitude}</p><p className="flex items-center gap-1 text-xs"><Droplets size={12} />{origin.process}</p><p className="mt-2 border-t pt-2 font-semibold">${origin.price} <span className={origin.change >= 0 ? "text-emerald-600" : "text-red-600"}>{origin.change >= 0 ? "+" : ""}{origin.change}%</span></p></div></Popup></Marker>)}</MapContainer></div>
  </div>;
}
