import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/{app,icons,components}/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["var(--font-roboto)"],
      },
      colors: {
        background: "var(--background)",
        primary: {
          500: "var(--primary-500)",
          600: "var(--primary-600)",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
