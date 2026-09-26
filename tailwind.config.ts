import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg:        "#050810",
        "bg-alt":  "#070b14",
        surface:   "rgba(255,255,255,0.04)",
        accent:    "#00F5C8",
        "accent-dim": "rgba(0,245,200,0.12)",
        "accent-glow": "rgba(0,245,200,0.20)",
        "text-primary": "#F0EEF8",
        "text-muted": "#8A8896",
        "text-sub": "#4A4856",
        border: "rgba(255,255,255,0.08)",
        "border-glow": "rgba(0,245,200,0.22)",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
      backgroundImage: {
        "radial-glow": "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(0,245,200,0.06) 0%, transparent 70%)",
        "radial-glow-left": "radial-gradient(ellipse 60% 80% at 0% 50%, rgba(0,245,200,0.04) 0%, transparent 60%)",
      },
      backdropBlur: { glass: "24px" },
      animation: {
        "spin-slow": "spin 20s linear infinite",
        "spin-reverse": "spin 15s linear infinite reverse",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "scan": "scan 4s linear infinite",
        "blink": "blink 1.2s step-end infinite",
        "orbit-1": "orbit 12s linear infinite",
        "orbit-2": "orbit 18s linear infinite reverse",
        "orbit-3": "orbit 25s linear infinite",
        "drift": "drift 20s linear infinite",
      },
      keyframes: {
        "pulse-glow": {
          "0%,100%": { boxShadow: "0 0 12px rgba(0,245,200,0.2)" },
          "50%": { boxShadow: "0 0 24px rgba(0,245,200,0.5)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%":     { transform: "translateY(-8px)" },
        },
        scan: {
          "0%":   { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        blink: {
          "0%,100%": { opacity: "1" },
          "50%":     { opacity: "0" },
        },
        orbit: {
          "0%":   { transform: "rotate(0deg) translateX(var(--orbit-r)) rotate(0deg)" },
          "100%": { transform: "rotate(360deg) translateX(var(--orbit-r)) rotate(-360deg)" },
        },
        drift: {
          "0%": { transform: "translateY(100vh) translateX(-20px)", opacity: "0" },
          "10%": { opacity: "1" },
          "90%": { opacity: "1" },
          "100%": { transform: "translateY(-200px) translateX(20px)", opacity: "0" },
        },
      },
      boxShadow: {
        glass: "0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)",
        "glass-hover": "0 16px 48px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.1)",
        "accent-glow": "0 0 20px rgba(0,245,200,0.3), 0 0 60px rgba(0,245,200,0.1)",
        "accent-sm": "0 0 10px rgba(0,245,200,0.25)",
      },
    },
  },
  plugins: [],
};
export default config;
