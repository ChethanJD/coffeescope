"use client";

import { createContext, useContext, useEffect, type ReactNode } from "react";

type ThemeContextValue = {
  theme: "dark";
  resolvedTheme: "dark";
  setTheme: (theme: "dark") => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    document.documentElement.classList.remove("light");
    document.documentElement.classList.add("dark");
  }, []);

  const setTheme = () => {
    document.documentElement.classList.remove("light");
    document.documentElement.classList.add("dark");
  };

  return (
    <ThemeContext.Provider
      value={{
        theme: "dark",
        resolvedTheme: "dark",
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }

  return context;
}
