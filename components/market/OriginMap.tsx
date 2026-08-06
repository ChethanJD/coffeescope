"use client";

import dynamic from "next/dynamic";

export const OriginMap = dynamic(() => import("@/components/market/OriginMapClient"), {
  ssr: false,
  loading: () => <div className="glass flex h-[520px] items-center justify-center rounded-xl3 text-sm text-white/50">Loading origin map…</div>,
});
