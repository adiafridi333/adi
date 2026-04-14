import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "bg-primary": "#0A0A0A",
        "bg-secondary": "#111111",
        "bg-card": "#1A1A1A",
        accent: "#EC3337",
        "accent-hover": "#F25558",
        "text-primary": "#F5F5F5",
        "text-secondary": "#A0A0A0",
        border: "#2A2A2A",
      },
      fontFamily: {
        playfair: ["var(--font-playfair)"],
        dm: ["var(--font-dm-sans)"],
      },
      borderRadius: {
        card: "4px",
        btn: "2px",
      },
      keyframes: {
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "count-up": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in-up": "fade-in-up 0.6s ease-out forwards",
        "fade-in": "fade-in 0.5s ease-out forwards",
        "count-up": "count-up 0.4s ease-out forwards",
      },
    },
  },
  plugins: [],
};
export default config;
