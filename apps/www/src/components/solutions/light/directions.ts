/*
  Three light design directions for the solution-page samples.

  All three live inside the locked V3 system: olive substrate + GridRed accent,
  Inter / Clash Grotesk / Geist Mono. No new hues. They differ in section
  vocabulary, surface treatment, density, type scale, and how freely the accent
  and texture are used — the levers that separate a Stripe page from a Linear
  page from a Vercel/Apple page while staying one brand.

  A page block reads a `Direction` and adapts. Heroes are bespoke per direction
  (they differ most); body blocks are shared and tuned by these knobs.
*/

import { tokens } from "../../../routes/_preview/_v3-tokens";

export const FONT = "Inter, ui-sans-serif, system-ui, sans-serif";
export const DISPLAY = '"Clash Grotesk", Inter, ui-sans-serif, system-ui, sans-serif';
export const MONO = '"Geist Mono", ui-monospace, SFMono-Regular, monospace';
export const EASE = [0.22, 1, 0.36, 1] as const;

export type DirectionKey = "aurora" | "blueprint" | "atlas";

export type Direction = {
  key: DirectionKey;
  name: string;
  /** one-line reference, shown on the comparison switcher */
  reference: string;
  blurb: string;

  /* surface treatment for cards / tiles */
  cardBg: string;
  cardRadius: number;
  /** full border string, or null for borderless */
  cardBorder: string | null;
  cardShadow: string;
  cardShadowHover: string;

  /* vertical rhythm */
  sectionPy: number;
  /** gap between stacked feature groups */
  groupGap: number;
  /** grid gap inside card grids */
  gridGap: number;

  /* type */
  headingFont: string;
  /** clamp() for section h2 */
  h2: string;
  h2Tracking: string;
  h2Weight: number;
  /** default alignment of section headings */
  headingAlign: "left" | "center";
  introSize: number;

  /* texture + accent intensity */
  texture: "none" | "dots" | "wash";
  /** kickers rendered in mono (Linear-ish) vs the sentence-case label */
  monoLabels: boolean;
  /** how freely GridRed appears: warm = washes + chips, restrained = CTA + dots, mono = one moment */
  accent: "warm" | "restrained" | "mono";
  /** small radius for chips / pills */
  chipRadius: number;
};

/* ------------------------------------------------------------------ */
/*  A — Aurora  (Stripe-leaning)                                       */
/*  Warm light, soft gradient washes, floating cards with real depth,  */
/*  rounded and friendly, accent used generously.                      */
/* ------------------------------------------------------------------ */
const aurora: Direction = {
  key: "aurora",
  name: "Aurora",
  reference: "Stripe-leaning",
  blurb: "Warm light, soft gradient washes, floating product cards, rounded and friendly. Accent used generously.",

  cardBg: tokens.card,
  cardRadius: 22,
  cardBorder: `1px solid ${tokens.hairline}`,
  cardShadow: "0 1px 2px oklch(15.3% 0.006 107.1 / 0.04), 0 18px 40px -30px oklch(15.3% 0.006 107.1 / 0.28)",
  cardShadowHover: "0 1px 2px oklch(15.3% 0.006 107.1 / 0.05), 0 28px 56px -28px oklch(15.3% 0.006 107.1 / 0.34)",

  sectionPy: 108,
  groupGap: 88,
  gridGap: 20,

  headingFont: FONT,
  h2: "clamp(30px, 4vw, 46px)",
  h2Tracking: "-0.03em",
  h2Weight: 600,
  headingAlign: "center",
  introSize: 18,

  texture: "wash",
  monoLabels: false,
  accent: "warm",
  chipRadius: 999,
};

/* ------------------------------------------------------------------ */
/*  B — Blueprint  (Linear-leaning)                                    */
/*  Crisp near-white, faint dot grid, flat hairline cards, tight type, */
/*  mono meta labels, restrained accent, bento rhythm.                 */
/* ------------------------------------------------------------------ */
const blueprint: Direction = {
  key: "blueprint",
  name: "Blueprint",
  reference: "Linear-leaning",
  blurb: "Crisp near-white, faint dot grid, flat hairline cards, tight refined type, mono meta labels. Precise and product-grade.",

  cardBg: tokens.card,
  cardRadius: 12,
  cardBorder: `1px solid ${tokens.hairline}`,
  cardShadow: "none",
  cardShadowHover: "0 0 0 1px " + tokens.hairlineStrong,

  sectionPy: 84,
  groupGap: 64,
  gridGap: 14,

  headingFont: FONT,
  h2: "clamp(26px, 3.2vw, 38px)",
  h2Tracking: "-0.032em",
  h2Weight: 600,
  headingAlign: "left",
  introSize: 16,

  texture: "dots",
  monoLabels: true,
  accent: "restrained",
  chipRadius: 8,
};

/* ------------------------------------------------------------------ */
/*  C — Atlas  (Vercel / Apple-leaning)                                */
/*  Big air, large centered display type, borderless surfaces,         */
/*  near-monochrome with a single red moment. Calm and gallery-like.   */
/* ------------------------------------------------------------------ */
const atlas: Direction = {
  key: "atlas",
  name: "Atlas",
  reference: "Vercel / Apple-leaning",
  blurb: "Big air, large centered display type, borderless surfaces, near-monochrome with a single red moment. Calm and gallery-like.",

  cardBg: tokens.pageBg,
  cardRadius: 18,
  cardBorder: null,
  cardShadow: "none",
  cardShadowHover: "none",

  sectionPy: 132,
  groupGap: 112,
  gridGap: 28,

  headingFont: DISPLAY,
  h2: "clamp(34px, 5vw, 60px)",
  h2Tracking: "-0.04em",
  h2Weight: 600,
  headingAlign: "center",
  introSize: 19,

  texture: "none",
  monoLabels: false,
  accent: "mono",
  chipRadius: 999,
};

export const DIRECTIONS: Record<DirectionKey, Direction> = { aurora, blueprint, atlas };
export const DIRECTION_LIST: Direction[] = [aurora, blueprint, atlas];
