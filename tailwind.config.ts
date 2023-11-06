import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "midnight-sky": "#172D42",
        aero: "#0E2D64",
        hydrogen: "#12A1E0",
        clear: "#F9F8F5",
        dust: "#646668",
        slate: "#808D87",
      },
    },
  },
  plugins: [],
} satisfies Config;
