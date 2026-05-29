/*
  Shared v3 design tokens. Olive substrate + warm ink + GridRed spark.
  Olive values are Tailwind v4.3 OKLCH (hue 106-107, low-chroma yellow-green).
  Brand red is GridRed from archived DESIGN-v1.md.
*/

import { useEffect, useState } from "react";

export const lightTokens = {
  /* substrate */
  pageBg: "oklch(98.8% 0.003 106.5)",      // olive-50
  pageBgDeep: "oklch(96.6% 0.005 106.5)",  // olive-100
  card: "#ffffff",
  cardSoft: "oklch(98.8% 0.003 106.5)",    // olive-50

  /* hairlines */
  hairline: "oklch(93% 0.007 106.5)",      // olive-200
  hairlineStrong: "oklch(88% 0.011 106.6)", // olive-300

  /* ink */
  ink: "oklch(15.3% 0.006 107.1)",         // olive-950
  inkHover: "oklch(22.8% 0.013 107.4)",    // olive-900
  inkMuted: "oklch(46.6% 0.025 107.3)",    // olive-600

  /* body text */
  body: "oklch(28.6% 0.016 107.4)",        // olive-800
  muted: "oklch(58% 0.031 107.3)",         // olive-500

  /* accent */
  accentSoft: "oklch(96.6% 0.005 106.5)",  // olive-100
  accentFill: "oklch(73.7% 0.021 106.9)",  // olive-400
  accentLine: "oklch(39.4% 0.023 107.4)",  // olive-700

  /* brand */
  brand: "oklch(0.58 0.245 27)",
  brandHover: "oklch(0.50 0.245 27)",
  brandSoft: "oklch(0.95 0.040 27)",

  /* chip */
  chip: "oklch(96.6% 0.005 106.5)",        // olive-100
  chipActive: "#ffffff",
} as const;

/*
  Dark mirror — substrate inverts, ink inverts, accents adapted.
  Same olive hue, just flipped lightness. Brand red stays — works on both.
*/
export const darkTokens = {
  /* substrate — deep olive base */
  pageBg: "oklch(15.3% 0.006 107.1)",      // olive-950 (was olive-50)
  pageBgDeep: "oklch(11% 0.005 107.1)",    // deeper than olive-950 (custom)
  card: "oklch(22.8% 0.013 107.4)",        // olive-900 (the “card” surface)
  cardSoft: "oklch(18% 0.010 107.4)",      // between 900 and 950

  /* hairlines — barely-visible warm separators on dark */
  hairline: "oklch(28.6% 0.016 107.4)",    // olive-800
  hairlineStrong: "oklch(39.4% 0.023 107.4)", // olive-700

  /* ink — warm near-white */
  ink: "oklch(98.8% 0.003 106.5)",         // olive-50 (was olive-950)
  inkHover: "oklch(93% 0.007 106.5)",      // olive-200
  inkMuted: "oklch(73.7% 0.021 106.9)",    // olive-400

  /* body text */
  body: "oklch(88% 0.011 106.6)",          // olive-300
  muted: "oklch(58% 0.031 107.3)",         // olive-500 (kept — works both modes)

  /* accent — same olive family at deeper saturation steps that read on dark */
  accentSoft: "oklch(22.8% 0.013 107.4)",  // olive-900
  accentFill: "oklch(58% 0.031 107.3)",    // olive-500
  accentLine: "oklch(73.7% 0.021 106.9)",  // olive-400

  /* brand — GridRed stays, brandSoft inverts to dark-red tint */
  brand: "oklch(0.58 0.245 27)",
  brandHover: "oklch(0.65 0.230 27)",      // slightly lighter for dark-bg hover
  brandSoft: "oklch(0.30 0.140 27)",       // dark red wash for fault bg

  /* chip */
  chip: "oklch(22.8% 0.013 107.4)",        // olive-900
  chipActive: "oklch(28.6% 0.016 107.4)",  // olive-800
} as const;

/*
  Backwards-compat: existing imports of `tokens` still resolve to light.
  Other v3 routes (v3-website, v3-elements, v3-mobile) that don't opt in
  to theming continue to read light values.
*/
export const tokens = lightTokens;

export type Tokens = Record<keyof typeof lightTokens, string>;
export type Theme = "light" | "dark";

/*
  Global theme state for the v3-megamenu route (preview scope).
  Components inside v3-megamenu read tokens via useMegamenuTheme().
  Other v3 routes remain unaffected and continue using `tokens` (light).
*/
let currentTheme: Theme = "light";
const themeListeners = new Set<(t: Theme) => void>();

export function setMegamenuTheme(t: Theme) {
  if (currentTheme === t) return;
  currentTheme = t;
  themeListeners.forEach((fn) => fn(t));
}

export function getMegamenuTheme(): Theme {
  return currentTheme;
}

export function useMegamenuTheme(): { theme: Theme; tokens: Tokens; toggle: () => void } {
  const [theme, setTheme] = useState<Theme>(currentTheme);
  useEffect(() => {
    themeListeners.add(setTheme);
    return () => {
      themeListeners.delete(setTheme);
    };
  }, []);
  return {
    theme,
    tokens: theme === "dark" ? darkTokens : lightTokens,
    toggle: () => setMegamenuTheme(theme === "dark" ? "light" : "dark"),
  };
}
