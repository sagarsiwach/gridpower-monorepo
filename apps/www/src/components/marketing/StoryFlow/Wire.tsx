/*
  Wire — the single SVG in the story. Nothing else here is SVG.

  Layers (bottom to top):
    1. guide   — faint full-length copy of every path, always visible, so the
                 track is legible before it draws (and a fine-tune reference).
    2. waste   — branches that draw out then fade (the wasted energy).
    3. main    — the surviving controlled spine; draws top -> bottom.
    4. pulse   — a dot that rides `main` via GSAP MotionPath.

  All animated paths carry pathLength={1} so the engine draws them with a
  strokeDashoffset 1 -> 0 regardless of real geometry. The engine targets the
  className hooks (.sf-guide / .sf-waste / .sf-main / .sf-pulse) — keep them.

  Static/reduced-motion/mobile fallback: the default attributes below render
  the fully-drawn diagram. The engine only overrides these on capable desktop.
*/

import { STAGE, WIRE, COLORS } from "./story.config";

export function Wire({
  wireWidth,
  wireColor,
  guideOpacity,
  pulseR,
}: {
  wireWidth: number;
  wireColor: string;
  guideOpacity: number;
  pulseR: number;
}) {
  return (
    <svg
      viewBox={`0 0 ${STAGE.w} ${STAGE.h}`}
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      style={{
        display: "block",
        overflow: "visible",
        // top of the wire dissolves upward — reads as descending from the
        // hero globe that sits centered above this section.
        WebkitMaskImage: "linear-gradient(to bottom, transparent 0, #000 6%, #000 100%)",
        maskImage: "linear-gradient(to bottom, transparent 0, #000 6%, #000 100%)",
      }}
    >
      {/* 1. Guide track — faint, always visible */}
      <g fill="none" stroke={COLORS.ink} strokeOpacity={guideOpacity} strokeWidth={wireWidth} strokeLinecap="round">
        <path d={WIRE.main} />
        {WIRE.waste.map((d, i) => (
          <path key={`g${i}`} d={d} />
        ))}
      </g>

      {/* 2. Waste branches — drawn then faded by the engine */}
      <g fill="none" stroke={COLORS.waste} strokeWidth={wireWidth} strokeLinecap="round">
        {WIRE.waste.map((d, i) => (
          <path key={`w${i}`} className="sf-waste" d={d} pathLength={1} strokeDasharray={1} strokeDashoffset={0} />
        ))}
      </g>

      {/* 3. Main controlled spine */}
      <path
        className="sf-main"
        d={WIRE.main}
        fill="none"
        stroke={wireColor}
        strokeWidth={wireWidth + 0.5}
        strokeLinecap="round"
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={0}
      />

      {/* 4. Energy pulse — rides `main` via MotionPath (hidden until engine runs) */}
      <circle
        className="sf-pulse"
        r={pulseR}
        cx={300}
        cy={20}
        fill={wireColor}
        opacity={0}
        style={{ filter: `drop-shadow(0 0 6px ${wireColor})` }}
      />
    </svg>
  );
}
