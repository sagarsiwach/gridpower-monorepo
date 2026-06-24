/*
  HeroC — Variant C: "Pick your home" segmented entry.

  No traditional hero. Four image-led tiles ARE the hero. User taps a
  tile; that tile expands, the other three compress. A GridRed indicator
  ring shares its identity across tiles via `layoutId`. Numbers
  (payback months, rupee cost) tick from 0 → target on selection.
  Unselected tiles dim. Reduced-motion gets instant transitions.

  Apple "which iPhone" pattern adapted for residential batteries.
  Apply `delight` (number ticker, brand pill, kenburns) then `overdrive`
  (shared-element indicator, AnimatePresence morph, optimistic CTA reveal).

  One file. No props. Default export.
*/

import { useEffect, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  animate as motionAnimate,
} from "motion/react";
import {
  ArrowRight,
  Buildings,
  House,
  HouseLine,
  Sun,
} from "@phosphor-icons/react";

import { tokens } from "../../../routes/_preview/_v3-tokens";
import { Logo } from "../../Logo";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

type Tile = {
  id: "apartment" | "small" | "large" | "solar";
  name: string;
  index: string;
  capacity: string;
  phase: string;
  image: string;
  Icon: typeof House;
  paybackMonths: number;
  costLakh: number;
  spec: string;
};

const TILES: Tile[] = [
  {
    id: "apartment",
    name: "Apartment ESS",
    index: "01",
    capacity: "3–7 kWh",
    phase: "Single phase",
    image: "/images/solutions/homes-apartment.png",
    Icon: Buildings,
    paybackMonths: 24,
    costLakh: 6.4,
    spec: "Stacked LFP · wall-mount · diesel-gen replacement",
  },
  {
    id: "small",
    name: "Small home",
    index: "02",
    capacity: "7–15 kWh",
    phase: "Single phase",
    image: "/images/solutions/homes-small.png",
    Icon: House,
    paybackMonths: 28,
    costLakh: 12.8,
    spec: "Hybrid inverter · whole-home backup · 4hr autonomy",
  },
  {
    id: "large",
    name: "Large home",
    index: "03",
    capacity: "15–30 kWh",
    phase: "3-phase",
    image: "/images/solutions/homes-large.png",
    Icon: HouseLine,
    paybackMonths: 32,
    costLakh: 26.5,
    spec: "3-phase · zero-export ready · GridOS monitoring",
  },
  {
    id: "solar",
    name: "Solar + storage",
    index: "04",
    capacity: "Inverter + battery",
    phase: "Combo",
    image: "/images/solutions/homes-solar.png",
    Icon: Sun,
    paybackMonths: 22,
    costLakh: 18.2,
    spec: "5–10 kWp PV · MPPT hybrid · net-meter compatible",
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;
const SPRING = { type: "spring" as const, stiffness: 380, damping: 34, mass: 0.9 };

/* ------------------------------------------------------------------ */
/*  Hooks                                                              */
/* ------------------------------------------------------------------ */

/* Smooth integer/decimal ticker driven by a motion value. */
function useTicker(target: number, active: boolean, decimals = 0) {
  const mv = useMotionValue(0);
  const [display, setDisplay] = useState(active ? target : 0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!active) {
      mv.set(0);
      setDisplay(0);
      return;
    }
    if (reduce) {
      mv.set(target);
      setDisplay(target);
      return;
    }
    const controls = motionAnimate(mv, target, {
      duration: 0.9,
      ease: EASE,
    });
    const unsub = mv.on("change", (v) => {
      setDisplay(decimals === 0 ? Math.round(v) : Number(v.toFixed(decimals)));
    });
    return () => {
      controls.stop();
      unsub();
    };
  }, [target, active, decimals, mv, reduce]);

  return display;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function HeroC() {
  const reduce = useReducedMotion();
  const [selectedId, setSelectedId] = useState<Tile["id"] | null>(null);
  const [hoverId, setHoverId] = useState<Tile["id"] | null>(null);
  const rootRef = useRef<HTMLElement>(null);

  const selected = useMemo(
    () => TILES.find((t) => t.id === selectedId) ?? null,
    [selectedId]
  );

  /* selection state for indicator + dim logic */
  const focusedId = selectedId ?? hoverId;

  return (
    <section
      ref={rootRef}
      aria-label="Pick your home"
      className="relative w-full overflow-hidden"
      style={{
        minHeight: "100vh",
        background: tokens.pageBg,
        color: tokens.ink,
        fontFamily:
          'Inter, "InterVariable", ui-sans-serif, system-ui, sans-serif',
        fontOpticalSizing: "auto",
      }}
    >
      {/* faint substrate vignette — earns its keep by giving the tile band a stage */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(120% 60% at 50% 100%, ${tokens.pageBgDeep} 0%, transparent 60%)`,
        }}
      />

      <div
        className="relative mx-auto flex h-full w-full flex-col"
        style={{
          maxWidth: 1280,
          minHeight: "100vh",
          padding: "32px clamp(20px, 4vw, 56px) 32px",
        }}
      >
        {/* ---------- TOP BAND: brand + kicker + headline ---------- */}
        <header
          className="flex flex-col"
          style={{ paddingTop: 8 }}
        >
          <div className="flex items-center justify-between">
            <div
              className="flex items-center"
              style={{ gap: 10 }}
            >
              <Logo variant="gridenergy" size={26} />
              <span
                style={{
                  fontSize: 15,
                  fontWeight: 600,
                  letterSpacing: "-0.02em",
                  color: tokens.ink,
                }}
              >
                GridEnergy
              </span>
            </div>

            <div
              className="hidden sm:flex items-center"
              style={{
                gap: 8,
                padding: "6px 10px 6px 8px",
                background: tokens.card,
                border: `1px solid ${tokens.hairline}`,
                borderRadius: 999,
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.08em",
                color: tokens.inkMuted,
                textTransform: "uppercase",
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: 999,
                  background: tokens.brand,
                  boxShadow: `0 0 0 4px ${tokens.brandSoft}`,
                }}
              />
              4 of 4 stacks live
            </div>
          </div>

          <div style={{ marginTop: "clamp(24px, 5vh, 56px)" }}>
            <p
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.16em",
                color: tokens.brand,
                textTransform: "uppercase",
                marginBottom: 14,
              }}
            >
              Residential storage · India
            </p>

            <h1
              style={{
                fontSize: "clamp(40px, 6.2vw, 72px)",
                fontWeight: 600,
                letterSpacing: "-0.035em",
                lineHeight: 0.98,
                color: tokens.ink,
                maxWidth: 920,
                margin: 0,
              }}
            >
              Pick the home you&rsquo;re building for.
              <span style={{ color: tokens.muted, fontWeight: 500 }}>
                {" "}
                Payback math shows itself.
              </span>
            </h1>
          </div>
        </header>

        {/* ---------- TILE BAND ---------- */}
        <div
          className="relative flex-1"
          style={{
            marginTop: "clamp(24px, 4vh, 44px)",
            marginBottom: "clamp(20px, 3vh, 32px)",
            display: "flex",
            alignItems: "stretch",
          }}
        >
          <TileRow
            selectedId={selectedId}
            focusedId={focusedId}
            onSelect={(id) =>
              setSelectedId((prev) => (prev === id ? null : id))
            }
            onHover={setHoverId}
            reduce={!!reduce}
          />
        </div>

        {/* ---------- BOTTOM BAND: microcopy + CTAs ---------- */}
        <footer
          className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
          style={{ minHeight: 92 }}
        >
          <div style={{ maxWidth: 520 }}>
            <p
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.14em",
                color: tokens.muted,
                textTransform: "uppercase",
                marginBottom: 8,
              }}
            >
              {selected ? "Stack · " + selected.name : "Step 1 of 3"}
            </p>
            <AnimatePresence mode="wait" initial={false}>
              <motion.p
                key={selected ? "selected-" + selected.id : "empty"}
                initial={reduce ? false : { opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -4 }}
                transition={{ duration: 0.18, ease: EASE }}
                style={{
                  fontSize: 15,
                  lineHeight: 1.55,
                  color: tokens.body,
                  margin: 0,
                }}
              >
                {selected
                  ? `${selected.spec}. Bill against actual savings only — no upfront platform fee.`
                  : "Tap a tile to see numbers. Indian buyers, INR, months. We bill against actual savings only — no platform fee until your meter agrees."}
              </motion.p>
            </AnimatePresence>
          </div>

          <div
            className="flex items-center"
            style={{ gap: 10 }}
          >
            <CTASecondary disabled={!selected} />
            <CTAPrimary active={!!selected} reduce={!!reduce} />
          </div>
        </footer>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  TileRow — flex layout that morphs widths on selection              */
/* ------------------------------------------------------------------ */

function TileRow({
  selectedId,
  focusedId,
  onSelect,
  onHover,
  reduce,
}: {
  selectedId: Tile["id"] | null;
  focusedId: Tile["id"] | null;
  onSelect: (id: Tile["id"]) => void;
  onHover: (id: Tile["id"] | null) => void;
  reduce: boolean;
}) {
  return (
    <div
      role="radiogroup"
      aria-label="Residential stack options"
      className="grid w-full"
      style={{
        gap: 12,
        gridTemplateColumns: gridForSelection(selectedId),
        transition: reduce
          ? "none"
          : "grid-template-columns 0.55s cubic-bezier(0.22, 1, 0.36, 1)",
        alignItems: "stretch",
      }}
    >
      {TILES.map((tile) => {
        const isSelected = selectedId === tile.id;
        const isDimmed = selectedId !== null && !isSelected;
        const isFocused = focusedId === tile.id;
        return (
          <TileCard
            key={tile.id}
            tile={tile}
            isSelected={isSelected}
            isDimmed={isDimmed}
            isFocused={isFocused}
            anySelected={selectedId !== null}
            onSelect={() => onSelect(tile.id)}
            onHover={(h) => onHover(h ? tile.id : null)}
            reduce={reduce}
          />
        );
      })}
    </div>
  );
}

function gridForSelection(id: Tile["id"] | null): string {
  if (!id) return "repeat(4, minmax(0, 1fr))";
  // Selected tile takes ~52%, others split the rest. Mobile collapses via media query
  // by virtue of the grid still being four columns; we accept horizontal squeeze on mobile —
  // the expanded tile remains tappable and legible.
  return TILES.map((t) => (t.id === id ? "5.2fr" : "1fr")).join(" ");
}

/* ------------------------------------------------------------------ */
/*  TileCard                                                           */
/* ------------------------------------------------------------------ */

function TileCard({
  tile,
  isSelected,
  isDimmed,
  isFocused,
  anySelected,
  onSelect,
  onHover,
  reduce,
}: {
  tile: Tile;
  isSelected: boolean;
  isDimmed: boolean;
  isFocused: boolean;
  anySelected: boolean;
  onSelect: () => void;
  onHover: (hovered: boolean) => void;
  reduce: boolean;
}) {
  const months = useTicker(tile.paybackMonths, isSelected, 0);
  const lakh = useTicker(tile.costLakh, isSelected, 1);

  return (
    <button
      type="button"
      role="radio"
      aria-checked={isSelected}
      onClick={onSelect}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      onFocus={() => onHover(true)}
      onBlur={() => onHover(false)}
      className="group relative h-full overflow-hidden text-left focus:outline-none"
      style={{
        background: tokens.card,
        border: `1px solid ${
          isFocused ? tokens.hairlineStrong : tokens.hairline
        }`,
        borderRadius: 22,
        cursor: "pointer",
        opacity: isDimmed ? 0.5 : 1,
        filter: isDimmed ? "saturate(0.7)" : "none",
        transition: reduce
          ? "none"
          : "opacity 0.35s cubic-bezier(0.22, 1, 0.36, 1), filter 0.35s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.2s ease, box-shadow 0.3s ease, transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
        transform: isFocused && !anySelected ? "translateY(-2px)" : "translateY(0)",
        boxShadow: isSelected
          ? "0 22px 50px -28px oklch(15.3% 0.006 107.1 / 0.32)"
          : isFocused
          ? "0 14px 28px -22px oklch(15.3% 0.006 107.1 / 0.20)"
          : "0 0 0 0 transparent",
        display: "flex",
        flexDirection: "column",
        minWidth: 0,
        minHeight: 360,
      }}
    >
      {/* GridRed shared-element selection ring */}
      {isSelected && (
        <motion.span
          layoutId="heroc-selection-ring"
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            borderRadius: 22,
            border: `1.5px solid ${tokens.brand}`,
            boxShadow: `0 0 0 4px ${tokens.brandSoft}`,
          }}
          transition={reduce ? { duration: 0 } : SPRING}
        />
      )}

      {/* image area */}
      <div
        className="relative w-full overflow-hidden"
        style={{
          background: tokens.pageBgDeep,
          aspectRatio: isSelected ? "21 / 9" : "4 / 5",
          flex: "0 0 auto",
          transition: reduce
            ? "none"
            : "aspect-ratio 0.55s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        <img
          src={tile.image}
          alt={tile.name}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full"
          style={{
            objectFit: "cover",
            transform: isSelected
              ? "scale(1.06)"
              : isFocused
              ? "scale(1.03)"
              : "scale(1)",
            transition: reduce
              ? "none"
              : "transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        />

        {/* image-band scrim — keeps top-row labels legible on any photo */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0"
          style={{
            height: 80,
            background:
              "linear-gradient(180deg, oklch(15.3% 0.006 107.1 / 0.32) 0%, transparent 100%)",
          }}
        />

        {/* upper-left index pill */}
        <div
          className="absolute"
          style={{
            top: 12,
            left: 12,
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "5px 9px",
            background: "rgba(255,255,255,0.92)",
            backdropFilter: "blur(6px)",
            border: `1px solid ${tokens.hairline}`,
            borderRadius: 999,
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.14em",
            color: tokens.ink,
            textTransform: "uppercase",
          }}
        >
          <tile.Icon size={12} weight="duotone" />
          <span>{tile.index}</span>
        </div>

        {/* upper-right brand arrow pill — appears when selected */}
        <AnimatePresence>
          {isSelected && (
            <motion.div
              key="selected-pill"
              initial={reduce ? false : { opacity: 0, scale: 0.85, y: -4 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, scale: 0.85, y: -4 }}
              transition={{ duration: 0.22, ease: EASE }}
              className="absolute"
              style={{
                top: 12,
                right: 12,
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "5px 10px 5px 8px",
                background: tokens.brand,
                color: "#fff",
                borderRadius: 999,
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: 999,
                  background: "#fff",
                }}
              />
              Selected
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* text area — different layouts for compressed vs expanded */}
      <div
        className="flex min-w-0 flex-1 flex-col"
        style={{
          padding: isSelected ? "20px 22px 22px" : "14px 14px 16px",
          gap: isSelected ? 14 : 6,
          transition: reduce
            ? "none"
            : "padding 0.45s cubic-bezier(0.22, 1, 0.36, 1), gap 0.45s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        <div
          className="flex flex-col"
          style={{ gap: 2, minWidth: 0 }}
        >
          <p
            style={{
              fontSize: isSelected ? 22 : 15,
              fontWeight: 600,
              letterSpacing: "-0.02em",
              color: tokens.ink,
              lineHeight: 1.15,
              margin: 0,
              transition: reduce
                ? "none"
                : "font-size 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {tile.name}
          </p>
          <p
            style={{
              fontSize: isSelected ? 13 : 11,
              fontWeight: 500,
              color: tokens.muted,
              lineHeight: 1.35,
              margin: 0,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {tile.capacity} · {tile.phase}
          </p>
        </div>

        {/* expanded body: number ticker + spec */}
        <AnimatePresence initial={false}>
          {isSelected && (
            <motion.div
              key="expanded-body"
              initial={reduce ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: 4 }}
              transition={{ duration: 0.22, ease: EASE, delay: reduce ? 0 : 0.05 }}
              className="flex w-full flex-wrap"
              style={{ gap: 18, marginTop: 6 }}
            >
              <Stat
                label="Payback"
                value={
                  <>
                    <span style={{ fontSize: 36, fontWeight: 700, letterSpacing: "-0.03em" }}>
                      {months}
                    </span>
                    <span style={{ fontSize: 14, fontWeight: 500, color: tokens.muted, marginLeft: 4 }}>
                      mo
                    </span>
                  </>
                }
              />
              <span
                aria-hidden
                style={{
                  width: 1,
                  alignSelf: "stretch",
                  background: tokens.hairline,
                }}
              />
              <Stat
                label="Typical cost"
                value={
                  <>
                    <span style={{ fontSize: 18, fontWeight: 500, color: tokens.muted, marginRight: 2 }}>
                      ₹
                    </span>
                    <span style={{ fontSize: 36, fontWeight: 700, letterSpacing: "-0.03em" }}>
                      {Math.floor(lakh)}
                    </span>
                    <span style={{ fontSize: 18, fontWeight: 500, color: tokens.muted }}>
                      .{((lakh % 1) * 10).toFixed(0)}L
                    </span>
                  </>
                }
              />
              <div
                className="w-full"
                style={{
                  fontSize: 12,
                  color: tokens.inkMuted,
                  lineHeight: 1.5,
                }}
              >
                {tile.spec}
              </div>

              <a
                href={`/solutions/homes/${tile.id}`}
                className="inline-flex items-center"
                style={{
                  gap: 8,
                  padding: "10px 14px",
                  background: tokens.ink,
                  color: "#fff",
                  borderRadius: 12,
                  fontSize: 13,
                  fontWeight: 600,
                  letterSpacing: "-0.01em",
                }}
                onClick={(e) => e.stopPropagation()}
              >
                Configure this
                <ArrowRight size={13} weight="bold" />
              </a>
            </motion.div>
          )}
        </AnimatePresence>

        {/* compressed body footer: chevron affordance */}
        {!isSelected && (
          <div
            className="mt-auto flex items-center justify-between"
            style={{ paddingTop: 10, borderTop: `1px dashed ${tokens.hairline}` }}
          >
            <span
              style={{
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.14em",
                color: tokens.muted,
                textTransform: "uppercase",
              }}
            >
              {tile.paybackMonths} mo · ₹{tile.costLakh.toFixed(1)}L
            </span>
            <span
              style={{
                color: isFocused ? tokens.brand : tokens.inkMuted,
                transform: isFocused ? "translateX(2px)" : "translateX(0)",
                transition: reduce ? "none" : "transform 0.2s ease, color 0.2s ease",
              }}
            >
              <ArrowRight size={13} weight="bold" />
            </span>
          </div>
        )}
      </div>
    </button>
  );
}

function Stat({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex flex-col" style={{ gap: 4, minWidth: 110 }}>
      <span
        style={{
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: "0.14em",
          color: tokens.muted,
          textTransform: "uppercase",
        }}
      >
        {label}
      </span>
      <span
        className="inline-flex items-baseline"
        style={{ color: tokens.ink, lineHeight: 1 }}
      >
        {value}
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  CTAs                                                               */
/* ------------------------------------------------------------------ */

function CTAPrimary({ active, reduce }: { active: boolean; reduce: boolean }) {
  return (
    <a
      href={active ? "#payback" : undefined}
      aria-disabled={!active}
      className="inline-flex items-center"
      style={{
        gap: 8,
        padding: "12px 18px",
        background: active ? tokens.brand : tokens.chip,
        color: active ? "#fff" : tokens.muted,
        border: `1px solid ${active ? tokens.brand : tokens.hairline}`,
        borderRadius: 12,
        fontSize: 14,
        fontWeight: 600,
        letterSpacing: "-0.01em",
        pointerEvents: active ? "auto" : "none",
        transform: active ? "translateY(0)" : "translateY(0)",
        transition: reduce
          ? "none"
          : "background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease, transform 0.2s cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    >
      {active ? "See payback math" : "Tap a tile to see numbers"}
      <ArrowRight size={13} weight="bold" />
    </a>
  );
}

function CTASecondary({ disabled }: { disabled: boolean }) {
  return (
    <a
      href={disabled ? undefined : "#compare"}
      aria-disabled={disabled}
      className="hidden sm:inline-flex items-center"
      style={{
        gap: 6,
        padding: "12px 14px",
        background: "transparent",
        color: disabled ? tokens.muted : tokens.ink,
        border: `1px solid ${tokens.hairline}`,
        borderRadius: 12,
        fontSize: 13,
        fontWeight: 600,
        letterSpacing: "-0.01em",
        pointerEvents: disabled ? "none" : "auto",
        opacity: disabled ? 0.6 : 1,
        transition: "opacity 0.2s ease, border-color 0.2s ease, color 0.2s ease",
      }}
    >
      Compare all four
    </a>
  );
}
