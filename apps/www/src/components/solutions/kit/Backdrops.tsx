/*
  Kit · Backdrops — reusable atmosphere layers for the section library.

  These are pure decoration layers. Drop one inside any `position: relative`
  container (heroes, framed CTAs) as the first child; it paints behind content.

  - BlueprintGrid: faint engineering grid + edge fade. The infra/engineering
    credibility motif (ref: Vercel). On-brand for an energy company.
  - RegistrationCorners: the surveyor "+" marks at a box's corners (ref: Vercel
    framed CTA). Reads as precision/measurement, not decoration-for-its-own-sake.
  - GradientWash: a soft GridRed glow blooming from a point. Used sparingly to
    warm a dark stage; GridRed is the only accent, so this stays subtle.

  No motion here (backdrops shouldn't compete with content); heroes own their
  own animation. Everything is aria-hidden.
*/

import type { CSSProperties } from "react";
import { tokens } from "../../../routes/_preview/_v3-tokens";

export function BlueprintGrid({
  cell = 64,
  dark = false,
  fade = true,
  opacity,
  style,
}: {
  /** Grid cell size in px. */
  cell?: number;
  /** Light lines on a dark stage vs dark lines on light. */
  dark?: boolean;
  /** Radial fade so the grid dies toward the edges. */
  fade?: boolean;
  opacity?: number;
  style?: CSSProperties;
}) {
  const line = dark ? "rgba(255,255,255,0.07)" : "oklch(88% 0.011 106.6 / 0.6)";
  const mask = fade
    ? "radial-gradient(115% 90% at 50% 38%, #000 30%, transparent 78%)"
    : undefined;
  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        backgroundImage: `linear-gradient(to right, ${line} 1px, transparent 1px), linear-gradient(to bottom, ${line} 1px, transparent 1px)`,
        backgroundSize: `${cell}px ${cell}px`,
        WebkitMaskImage: mask,
        maskImage: mask,
        opacity: opacity ?? 1,
        pointerEvents: "none",
        ...style,
      }}
    />
  );
}

export function RegistrationCorners({
  inset = 0,
  size = 14,
  color,
  dark = false,
}: {
  inset?: number;
  size?: number;
  color?: string;
  dark?: boolean;
}) {
  const c = color ?? (dark ? "rgba(255,255,255,0.4)" : tokens.hairlineStrong);
  const mark: CSSProperties = {
    position: "absolute",
    width: size,
    height: size,
    color: c,
  };
  const Plus = ({ pos }: { pos: CSSProperties }) => (
    <span aria-hidden style={{ ...mark, ...pos }}>
      <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
        <path d="M7 0v14M0 7h14" stroke="currentColor" strokeWidth="1" />
      </svg>
    </span>
  );
  const o = inset - size / 2;
  return (
    <>
      <Plus pos={{ top: o, left: o }} />
      <Plus pos={{ top: o, right: o }} />
      <Plus pos={{ bottom: o, left: o }} />
      <Plus pos={{ bottom: o, right: o }} />
    </>
  );
}

export function GradientWash({
  at = "50% 30%",
  size = "120% 90%",
  strength = 0.22,
  style,
}: {
  /** Bloom origin, e.g. "50% 30%". */
  at?: string;
  size?: string;
  /** 0–1 alpha of the GridRed bloom. */
  strength?: number;
  style?: CSSProperties;
}) {
  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        background: `radial-gradient(${size} at ${at}, oklch(0.58 0.245 27 / ${strength}) 0%, transparent 60%)`,
        pointerEvents: "none",
        ...style,
      }}
    />
  );
}
