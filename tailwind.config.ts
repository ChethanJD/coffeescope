import type { Config } from "tailwindcss";

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
          bean: "#5C3B21",
          gold: "#C98A45",
          leaf: "#3A7D44",
          amber: "#E0A85C",
        },
        surface: {
          void: "#0B0908",
          card: "#171310",
          raised: "#1C1713",
        },
      },
      fontFamily: {
        heading: ["var(--font-inter)", "sans-serif"],
        body: ["var(--font-manrope)", "sans-serif"],
      },
      backgroundImage: {
        "coffee-gradient":
          "linear-gradient(135deg, #C98A45 0%, #E0A85C 100%)",
        "coffee-radial":
          "radial-gradient(circle at 50% 0%, rgba(201,138,69,0.14), transparent 60%)",
        "glass-sheen":
          "linear-gradient(180deg, rgba(255,255,255,0.075) 0%, rgba(255,255,255,0) 100%)",
      },
      boxShadow: {
        "glow-gold": "0 0 40px -8px rgba(201,138,69,0.42)",
        "glow-leaf": "0 0 40px -8px rgba(58,125,68,0.40)",
        card: "0 18px 55px rgba(0,0,0,0.34)",
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
