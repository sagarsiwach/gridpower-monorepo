/*
  StoryFlow — scroll-scrubbed "why storage" narrative.

  This file is the *tuning surface*. Geometry (the wire path + node anchors),
  the story copy, and the default animation values all live here as plain data,
  so the shape and pacing can be fine-tuned without touching the engine
  (StoryFlow.tsx). During dev, Dial Kit overrides the DIALS defaults live in the
  browser; whatever feels right gets written back here as the new default.

  Coordinate space: a single SVG stage, viewBox 600 x 1200 (portrait 1:2).
  All node anchors are fractions of that box (xf, yf in 0..1) so they map 1:1
  onto the SVG coordinates and onto the absolutely-positioned image overlay.

  The wire is the ONLY SVG. Solar / battery / lock / stack are placeholder
  image slots (NodeSlot) — Sagar drops AI-generated art in later; positions and
  the animation don't change when the art lands.
*/

import { tokens } from "../../../routes/_preview/_v3-tokens";

/* ---- Stage ------------------------------------------------------------- */

export const STAGE = { w: 600, h: 1200 } as const;

/* ---- Wire paths -------------------------------------------------------- */
/*
  MAIN is the surviving, controlled line — the spine the energy pulse rides
  and the route that reaches the GridEnergy stack. WASTE branches peel off at
  the fan point and dissipate (drawn, then faded) — "most of it is wasted".
  Every path carries pathLength="1" in the SVG so draw-on is a simple
  strokeDashoffset 1 -> 0, independent of the path's real length.
*/
export const FAN_Y = 300; // y where the waste branches peel away from MAIN

export const WIRE = {
  main: "M 300 20 L 300 1180",
  waste: [
    "M 300 300 C 180 400 110 470 60 600",
    "M 300 300 C 250 430 190 560 130 720",
    "M 300 300 C 420 400 490 470 540 600",
  ],
} as const;

/* ---- Node slots (placeholder image anchors) ---------------------------- */
/*
  key drives the reveal timing in the engine; anchor is fraction-of-stage.
  `w`/`h` are the placeholder box size in px (the AI art will be sized to fit).
*/
export type NodeKey = "solar" | "battery" | "lockin" | "stack";

export interface StoryNode {
  key: NodeKey;
  label: string;   // shown on the placeholder until real art lands
  hint: string;    // what the AI image should depict
  anchor: { xf: number; yf: number };
  w: number;
  h: number;
  reveal: number;  // 0..1 point on the scrubbed timeline where it fades in
}

export const NODES: StoryNode[] = [
  { key: "solar",   label: "Solar array",              hint: "stack of solar panels, schematic line art", anchor: { xf: 0.5, yf: 0.11 }, w: 240, h: 150, reveal: 0.06 },
  { key: "battery", label: "Black-box battery",        hint: "sealed battery cabinet, no readout",         anchor: { xf: 0.5, yf: 0.48 }, w: 210, h: 190, reveal: 0.46 },
  { key: "lockin",  label: "Vendor lock-in",           hint: "padlock / closed proprietary connector",     anchor: { xf: 0.5, yf: 0.66 }, w: 170, h: 150, reveal: 0.64 },
  { key: "stack",   label: "GridEnergy stack + GridOS", hint: "clean unified storage stack with GridOS UI", anchor: { xf: 0.5, yf: 0.86 }, w: 260, h: 210, reveal: 0.84 },
];

/* ---- Story scenes (right column copy) ---------------------------------- */
/*
  These scroll in the normal document flow (motion whileInView reveals). The
  left wire is scrubbed by GSAP over the same scroll, so beat i of the copy
  and node i of the wire naturally line up. `node` links a scene to the node it
  is talking about (used only for authoring clarity / future highlight sync).
*/
export interface StoryScene {
  node: NodeKey;
  title: string;
  body: string;
}

export const SCENES: StoryScene[] = [
  {
    node: "solar",
    title: "India doesn't lack power.",
    body: "We generate enough — we over-build it. Solar floods the grid by day; demand peaks after dark. The gap was never generation. It's storage.",
  },
  {
    node: "battery",
    title: "So most of it is wasted.",
    body: "With nowhere to put the surplus, energy spills off the grid. Only a fraction is ever captured — the rest simply bleeds away.",
  },
  {
    node: "battery",
    title: "And what you can buy is a black box.",
    body: "A battery and a phone number. No live data, no scheduling, no proof it's doing its job on the night you actually need it.",
  },
  {
    node: "lockin",
    title: "Then you're locked in.",
    body: "Closed systems tie you to one vendor's hardware, firmware, and pricing. Switching later costs more than the system did.",
  },
  {
    node: "stack",
    title: "GridEnergy makes it one controlled stack.",
    body: "Storage, power electronics, and GridOS as a single managed system — every electron measured, scheduled, and yours. Open protocols, no lock-in.",
  },
];

/* ---- Dial defaults ----------------------------------------------------- */
/*
  These are the *baseline* values. In dev the Dial Kit panel starts here and
  Sagar tunes live; the resolved values are what actually drive the engine.
  Numeric tuples are [value, min, max, step] (Dial Kit renders a slider).
*/
export const DIALS = {
  scrub: [1, 0, 3, 0.1] as [number, number, number, number],
  sceneVh: [86, 50, 140, 2] as [number, number, number, number],
  wireWidth: [2.5, 0.5, 8, 0.5] as [number, number, number, number],
  pulseR: [7, 2, 22, 1] as [number, number, number, number],
  wasteEndOpacity: [0.14, 0, 1, 0.02] as [number, number, number, number],
  guideOpacity: [0.1, 0, 0.4, 0.01] as [number, number, number, number],
  wireColor: { type: "color", default: tokens.brand } as const,
  markers: false, // Dial Kit toggle — shows ScrollTrigger start/end markers
};

export const COLORS = {
  brand: tokens.brand,
  waste: tokens.muted,
  ink: tokens.ink,
  body: tokens.body,
  muted: tokens.muted,
  card: tokens.card,
  hairline: tokens.hairline,
  hairlineStrong: tokens.hairlineStrong,
  pageBg: tokens.pageBg,
  pageBgDeep: tokens.pageBgDeep,
} as const;
