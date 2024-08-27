import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)"],
        mono: ["var(--font-geist-mono)"],
      },
      colors: {
        foreground: {
          0: "#0a0a0a",
          1: "#0a0a0a",
        },
        layer: {
          0: "#fcfcf7",
          1: "#d6c8fb",
        },
      },
      screens: {
        "2xl": "2560px",
      },
    },
  },
  plugins: [],
};
export default config;
