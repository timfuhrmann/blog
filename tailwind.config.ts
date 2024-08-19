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
        foreground: {
          0: "#0a0a0a",
          1: "#fcfcf7",
        },
        layer: {
          0: "#D6C8FB",
          1: "#0a0a0a",
        },
      },
    },
  },
  plugins: [],
};
export default config;
