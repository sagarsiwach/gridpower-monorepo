import { useState, type ComponentType } from "react";
import {
  CarBattery,
  ChartLineDown,
  Lightning,
  SunDim,
  type IconWeight,
} from "@phosphor-icons/react";
import { motion, useReducedMotion } from "motion/react";
import { useMegamenuTheme } from "../../../routes/_preview/_v3-tokens";

type IconComponent = ComponentType<{ size?: number; color?: string; weight?: IconWeight }>;

type Tile = {
  Icon: IconComponent;
  kicker: string;
  statement: string;
  support: string;
  callout: string;
  ambient?: boolean;
};

const TILES: Tile[] = [
  {
    Icon: ChartLineDown,
    kicker: "LOWER BILLS",
    statement: "Cut grid draw at peak-rate hours.",
    support: "Storage discharges during 6–10pm window when tariffs spike.",
    callout: "₹3,200/mo average saved",
  },
  {
    Icon: Lightning,
    kicker: "GRID FAILS, YOU DON'T",
    statement: "8–24 hours of essentials, automatic.",
    support: "Auto-switch in 12ms. Fridge, lights, fans, Wi-Fi never blink.",
    callout: "12ms cutover",
    ambient: true,
  },
  {
    Icon: SunDim,
    kicker: "USE YOUR SOLAR",
    statement: "Store daytime solar, use it after sundown.",
    support:
      "Stop exporting power to the grid for ₹3/unit while paying ₹9/unit to draw it back at night.",
    callout: "78% self-sufficient",
  },
  {
    Icon: CarBattery,
    kicker: "EV-READY",
    statement: "Charge your EV off stored power.",
    support: "No new connection. No load upgrade. Your storage IS your EV charger backbone.",
    callout: "Up to 7kW output",
  },
];

export default function OutcomeTiles() {
  const { tokens } = useMegamenuTheme();
  const reduce = useReducedMotion();

  return (
    <section
      style={{
        background: tokens.pageBg,
        borderTop: `1px solid ${tokens.hairline}`,
        borderBottom: `1px solid ${tokens.hairline}`,
      }}
    >
      <div className="mx-auto max-w-[1280px]" style={{ padding: "128px 32px" }}>
        <motion.div
          className="mb-14"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center gap-2 mb-4">
            <motion.span
              style={{ width: 5, height: 5, borderRadius: 999, background: tokens.brand }}
              animate={reduce ? undefined : { scale: [1, 1.6, 1], opacity: [1, 0.6, 1] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            />
            <span
              className="text-[11px] uppercase tracking-[0.18em]"
              style={{ color: tokens.brand, fontWeight: 700 }}
            >
              WHAT IT DOES
            </span>
          </div>
          <h2
            style={{
              color: tokens.ink,
              fontSize: "clamp(28px, 3.5vw, 44px)",
              fontWeight: 600,
              letterSpacing: "-0.025em",
              lineHeight: 1.1,
              maxWidth: "22ch",
            }}
          >
            Four things that change the day after install.
          </h2>
        </motion.div>

        <motion.div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            border: `1px solid ${tokens.hairline}`,
            borderRadius: 20,
            overflow: "hidden",
            background: tokens.card,
          }}
          initial={reduce ? false : { opacity: 0, scale: 0.985 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {TILES.map((tile, i) => (
            <OutcomeCell
              key={tile.kicker}
              tile={tile}
              index={i}
              isRightCol={i % 2 === 1}
              isBottomRow={i >= 2}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function OutcomeCell({
  tile,
  index,
  isRightCol,
  isBottomRow,
}: {
  tile: Tile;
  index: number;
  isRightCol: boolean;
  isBottomRow: boolean;
}) {
  const { tokens } = useMegamenuTheme();
  const reduce = useReducedMotion();
  const [hovered, setHovered] = useState(false);

  const { Icon } = tile;

  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={reduce ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: 0.1 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      style={{
        padding: "40px 36px",
        borderLeft: isRightCol ? `1px solid ${tokens.hairline}` : undefined,
        borderTop: isBottomRow ? `1px solid ${tokens.hairline}` : undefined,
        position: "relative",
        overflow: "hidden",
        background: hovered ? tokens.cardSoft : tokens.card,
        transition: "background 0.25s ease",
      }}
    >

      <div style={{ position: "relative" }}>
        <motion.div
          style={{ marginBottom: 20, display: "inline-block" }}
          animate={{ rotate: hovered && !reduce ? -6 : 0, scale: hovered && !reduce ? 1.08 : 1 }}
          transition={{ type: "spring", stiffness: 240, damping: 18 }}
        >
          <Icon size={32} color={tokens.ink} weight={hovered ? "fill" : "regular"} />
        </motion.div>

        <p
          className="text-[10px] uppercase tracking-[0.18em]"
          style={{ color: tokens.brand, fontWeight: 700, marginBottom: 10 }}
        >
          {tile.kicker}
        </p>

        <p
          style={{
            color: tokens.ink,
            fontSize: 28,
            fontWeight: 600,
            letterSpacing: "-0.02em",
            lineHeight: 1.15,
            marginBottom: 12,
          }}
        >
          {tile.statement}
        </p>

        <p
          style={{
            color: tokens.muted,
            fontSize: 14,
            lineHeight: 1.55,
            maxWidth: "44ch",
          }}
        >
          {tile.support}
        </p>

        <motion.div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            background: tokens.brandSoft,
            border: `1px solid ${tokens.brand}`,
            borderRadius: 999,
            padding: "4px 12px",
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
          }}
          initial={reduce ? false : { opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45, delay: 0.3 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          {tile.ambient && (
            <motion.span
              style={{
                width: 5,
                height: 5,
                borderRadius: 999,
                background: tokens.brand,
                display: "inline-block",
              }}
              animate={reduce ? undefined : { scale: [1, 1.5, 1], opacity: [0.9, 0.4, 0.9] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
          <span
            className="text-[11px] font-semibold"
            style={{ color: tokens.brand, whiteSpace: "nowrap" }}
          >
            {tile.callout}
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
}
