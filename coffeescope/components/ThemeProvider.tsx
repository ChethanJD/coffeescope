"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type Theme = "light" | "dark" | "system";
type ResolvedTheme = "light" | "dark";
type ThemeContextValue = { theme: Theme; resolvedTheme: ResolvedTheme; setTheme: (theme: Theme) => void };

const ThemeContext = createContext<ThemeContextValue | null>(null);

function resolveTheme(theme: Theme): ResolvedTheme {
  return theme === "system"
    ? window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
    : theme;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("system");
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>("dark");

  useEffect(() => {
    const stored = localStorage.getItem("coffeescope-theme");
    const next = stored === "light" || stored === "dark" || stored === "system" ? stored : "system";
    setTheme(next);
  }, []);

  useEffect(() => {
    const active = resolveTheme(theme);
    setResolvedTheme(active);
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(active);
    localStorage.setItem("coffeescope-theme", theme);

    const query = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => theme === "system" && setResolvedTheme(resolveTheme("system"));
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, [theme]);

  return <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
}
