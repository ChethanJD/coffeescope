import type { MetadataRoute } from "next";
const routes=["","/market","/analytics","/ai","/dashboard","/marketplace","/weather","/news","/disease-detection","/calculator","/about","/docs","/api-docs","/support","/contact"];
export default function sitemap(): MetadataRoute.Sitemap { const base="https://coffeescope.ai"; return routes.map(route=>({url:`${base}${route}`,changeFrequency:route===""||route==="/market"?"daily":"weekly",priority:route===""?1:0.7})); }
