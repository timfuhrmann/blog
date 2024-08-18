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
        foreground: "#0a0a0a",
        layer: {
          0: "#fcfcf7",
        },
        primary: "#D6C8FB",
      },
    },
  },
  plugins: [],
};
export default config;
