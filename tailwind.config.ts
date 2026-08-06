import type { Config } from "tailwindcss";

// Design tokens are centralized here so every component in the app
// pulls from the same source of truth instead of hardcoding hex values.
const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        coffee: {
          bean: "#5C3B21",   // Primary
          gold: "#D6A55C",  // Secondary
          leaf: "#3A7D44",  // Accent green
        },
        surface: {
          void: "#0B0B0B",   // Background
          card: "#161616",  // Cards
          raised: "#1E1E1E",
        },
      },
      fontFamily: {
        heading: ["var(--font-inter)", "sans-serif"],
        body: ["var(--font-manrope)", "sans-serif"],
      },
      backgroundImage: {
        "coffee-gradient":
          "linear-gradient(135deg, #5C3B21 0%, #D6A55C 100%)",
        "coffee-radial":
          "radial-gradient(circle at 50% 0%, rgba(214,165,92,0.15), transparent 60%)",
        "glass-sheen":
          "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0) 100%)",
      },
      boxShadow: {
        "glow-gold": "0 0 40px -8px rgba(214,165,92,0.45)",
        "glow-leaf": "0 0 40px -8px rgba(58,125,68,0.45)",
        card: "0 8px 30px rgba(0,0,0,0.35)",
      },
      borderRadius: {
        xl2: "1.25rem",
        xl3: "1.75rem",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-delay": "float 6s ease-in-out 2s infinite",
        "spin-slow": "spin 40s linear infinite",
        shimmer: "shimmer 2.5s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-16px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
