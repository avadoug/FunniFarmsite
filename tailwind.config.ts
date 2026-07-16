import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: "#fffaf0",
          100: "#f8efd9",
          200: "#eadbb8",
        },
        forest: {
          50: "#edf4e8",
          100: "#d8e6cf",
          500: "#49623b",
          700: "#26351f",
          900: "#121a10",
        },
        harvest: {
          100: "#fae8b2",
          300: "#e8be5d",
          500: "#b77b28",
          700: "#6d4317",
        },
        ink: "#171611",
        clay: "#8d5132",
        berry: "#51315c",
        moss: "#72874e",
      },
      boxShadow: {
        farm: "0 24px 55px rgba(38, 53, 31, 0.18)",
        soft: "0 12px 30px rgba(23, 22, 17, 0.11)",
        insetPaper: "inset 0 0 0 1px rgba(23, 22, 17, 0.08)",
      },
      fontFamily: {
        display: ["Georgia", "Cambria", "Times New Roman", "serif"],
        sans: ["var(--font-body)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        fibers:
          "radial-gradient(circle at 18% 15%, rgba(183, 123, 40, .12) 0 1px, transparent 1px), radial-gradient(circle at 82% 40%, rgba(73, 98, 59, .1) 0 1px, transparent 1px)",
        paper:
          "linear-gradient(135deg, rgba(255,250,240,.96), rgba(248,239,217,.96)), radial-gradient(circle at 20% 20%, rgba(232,190,93,.22), transparent 28%), radial-gradient(circle at 80% 0%, rgba(73,98,59,.14), transparent 24%)",
      },
      borderRadius: {
        seed: "1.15rem",
      },
    },
  },
  plugins: [],
};

export default config;
