"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const options = [
    { value: "light" as const, label: "Light", icon: Sun },
    { value: "dark" as const, label: "Dark", icon: Moon },
    { value: "system" as const, label: "Auto", icon: Monitor },
  ];

  return <div className="inline-flex rounded-full border border-white/10 bg-black/20 p-1" aria-label="Colour theme">
    {options.map(({ value, label, icon: Icon }) => <button key={value} type="button" onClick={() => setTheme(value)} title={label} className={`flex items-center gap-1 rounded-full px-2.5 py-1.5 text-xs transition-colors ${theme === value ? "bg-white/15 text-white" : "text-white/45 hover:text-white"}`}><Icon className="h-3.5 w-3.5" /><span className="hidden sm:inline">{label}</span></button>)}
  </div>;
}
