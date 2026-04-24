import type { Config } from "tailwindcss";
import gridpowerPreset from "@gridpower/tokens/tailwind-preset";
import animate from "tailwindcss-animate";

export default {
  presets: [gridpowerPreset],
  content: [
    "./src/**/*.{ts,tsx}",
    "../../packages/ui/src/**/*.{ts,tsx}",
  ],
  plugins: [animate],
} satisfies Config;
