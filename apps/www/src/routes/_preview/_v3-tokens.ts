/*
  Shared v3 design tokens. Olive substrate + warm ink + GridRed spark.
  Olive values are Tailwind v4.3 OKLCH (hue 106-107, low-chroma yellow-green).
  Brand red is GridRed from archived DESIGN-v1.md.
*/

export const tokens = {
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

  /* accent (same scale, just deeper) */
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
