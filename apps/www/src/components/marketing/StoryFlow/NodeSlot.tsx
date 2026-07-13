/*
  NodeSlot — a placeholder image anchor on the wire stage.

  Renders a dashed schematic box at a fraction-of-stage anchor. This is where
  the AI-generated art (solar array, black-box battery, lock, GridEnergy stack)
  drops in later: pass `src` and it swaps the dashed box for the image, same
  position, same reveal animation. The engine animates these via the
  `.sf-node` / `.sf-node-<key>` classes — do not remove them.
*/

import type { StoryNode } from "./story.config";
import { COLORS } from "./story.config";

export function NodeSlot({ node, src }: { node: StoryNode; src?: string }) {
  const { xf, yf } = node.anchor;
  const highlight = node.key === "stack"; // the solution reads warm/branded

  return (
    <div
      className={`sf-node sf-node-${node.key}`}
      style={{
        position: "absolute",
        left: `${xf * 100}%`,
        top: `${yf * 100}%`,
        width: node.w,
        height: node.h,
        maxWidth: "72%",
        transform: "translate(-50%, -50%)",
        pointerEvents: "none",
      }}
    >
      {src ? (
        <img
          src={src}
          alt={node.label}
          style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
        />
      ) : (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "grid",
            placeItems: "center",
            padding: 12,
            textAlign: "center",
            borderRadius: 14,
            border: `1.5px dashed ${highlight ? COLORS.brand : COLORS.hairlineStrong}`,
            background: highlight ? `${COLORS.brand}0e` : `${COLORS.card}cc`,
            backdropFilter: "blur(2px)",
            boxShadow: highlight ? `0 8px 30px ${COLORS.brand}22` : "0 6px 20px rgba(20,20,20,0.05)",
          }}
        >
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: highlight ? COLORS.brand : COLORS.ink, letterSpacing: "-0.01em" }}>
              {node.label}
            </div>
            <div style={{ fontSize: 10.5, color: COLORS.muted, marginTop: 4, lineHeight: 1.4, fontWeight: 500 }}>
              {node.hint}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
