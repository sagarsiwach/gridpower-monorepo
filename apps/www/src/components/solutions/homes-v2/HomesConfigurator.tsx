/*
  HomesConfigurator — V1 form-driven "find your system" experience.

  Locked decision: V1 is form-driven (home type -> recommended Nano + one clean
  visual + CTA). The cinematic zoom/fade "customize your home" experience is
  V1.5, once rendered composite assets exist — the selection/crossfade structure
  here is the shell those assets drop into. Image swap cross-fades today; the
  zoom choreography is the flagged upgrade.

  Every concrete figure (capacity, payback, price) is gated — none ship as fact.
*/

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Buildings, House, HouseLine, Sun, ArrowRight, type Icon } from "@phosphor-icons/react";
import { tokens } from "../../../routes/_preview/_v3-tokens";
import { Gated } from "../../marketing/Primitives";

type Key = "apartment" | "small" | "large" | "solar";

const OPTIONS: { key: Key; icon: Icon; label: string; image: string; family: string; powers: string; capNote: string; payNote: string }[] = [
  {
    key: "apartment",
    icon: Buildings,
    label: "Apartment / flat",
    image: "/images/solutions/homes-apartment.png",
    family: "Nano (compact)",
    powers: "Essentials backup — lights, fans, Wi-Fi, TV, a room AC.",
    capNote: "confirm apartment Nano usable kWh",
    payNote: "confirm payback for apartment profile",
  },
  {
    key: "small",
    icon: House,
    label: "Small home",
    image: "/images/solutions/homes-small.png",
    family: "Nano",
    powers: "Whole-home essentials plus a couple of ACs through an outage.",
    capNote: "confirm small-home Nano usable kWh",
    payNote: "confirm payback for small-home profile",
  },
  {
    key: "large",
    icon: HouseLine,
    label: "Large home / villa",
    image: "/images/solutions/homes-large.png",
    family: "Nano (3-phase) / Micro",
    powers: "Whole villa including multiple ACs, often 3-phase.",
    capNote: "confirm large-home capacity + phase",
    payNote: "confirm payback for large-home profile",
  },
  {
    key: "solar",
    icon: Sun,
    label: "Solar + storage",
    image: "/images/solutions/homes-solar.png",
    family: "Nano + solar (via partners)",
    powers: "Bank daytime solar, run on it after dark, back up the rest.",
    capNote: "confirm solar-combo sizing",
    payNote: "confirm payback for solar-combo profile",
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

export default function HomesConfigurator() {
  const reduce = useReducedMotion() ?? false;
  const [key, setKey] = useState<Key>("small");
  const active = OPTIONS.find((o) => o.key === key)!;

  return (
    <div
      style={{
        background: tokens.card,
        border: `1px solid ${tokens.hairline}`,
        borderRadius: 24,
        overflow: "hidden",
        boxShadow: "0 40px 80px -50px oklch(15.3% 0.006 107.1 / 0.5)",
      }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Visual side (cinematic-ready slot) */}
        <div style={{ position: "relative", minHeight: 340, background: tokens.ink, overflow: "hidden" }}>
          <AnimatePresence initial={false}>
            <motion.img
              key={active.key}
              src={active.image}
              alt={active.label}
              initial={reduce ? false : { opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduce ? 0 : 0.6, ease: EASE }}
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
              draggable={false}
            />
          </AnimatePresence>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0.1), rgba(0,0,0,0.45))" }} />
          <div style={{ position: "absolute", left: 20, bottom: 18, zIndex: 2 }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.85)" }}>
              Recommended
            </span>
            <p style={{ color: "#fff", fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em", marginTop: 2 }}>
              {active.family}
            </p>
          </div>
          <div style={{ position: "absolute", top: 14, right: 14, zIndex: 2 }}>
            <Gated note="V1.5: replace image crossfade with cinematic zoom/fade composite renders (home-type x product x solar)">
              <span style={{ fontSize: 10, color: "#fff" }}>cinematic render</span>
            </Gated>
          </div>
        </div>

        {/* Form side */}
        <div style={{ padding: "30px 30px 34px" }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: tokens.brand }}>
            Find your system
          </p>
          <h3 style={{ color: tokens.ink, fontSize: 24, fontWeight: 600, letterSpacing: "-0.02em", marginTop: 10 }}>
            Which one is your home?
          </h3>

          {/* Home-type selector */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 18 }}>
            {OPTIONS.map((o) => {
              const on = o.key === key;
              const Icon = o.icon;
              return (
                <button
                  key={o.key}
                  type="button"
                  onClick={() => setKey(o.key)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 9,
                    textAlign: "left",
                    padding: "11px 13px",
                    borderRadius: 12,
                    cursor: "pointer",
                    border: `1px solid ${on ? tokens.brand : tokens.hairlineStrong}`,
                    background: on ? tokens.brandSoft : tokens.pageBg,
                    transition: "all 0.15s ease",
                  }}
                >
                  <Icon size={20} weight="duotone" color={on ? tokens.brand : tokens.ink} />
                  <span style={{ fontSize: 13, fontWeight: 600, color: tokens.ink }}>{o.label}</span>
                </button>
              );
            })}
          </div>

          {/* Result */}
          <div style={{ marginTop: 22, borderTop: `1px solid ${tokens.hairline}`, paddingTop: 18 }}>
            <p style={{ color: tokens.body, fontSize: 15, lineHeight: 1.55 }}>{active.powers}</p>
            <div style={{ display: "flex", gap: 22, marginTop: 16, flexWrap: "wrap" }}>
              <div>
                <p style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: tokens.muted }}>Capacity</p>
                <div style={{ marginTop: 5 }}><Gated note={active.capNote}>— kWh</Gated></div>
              </div>
              <div>
                <p style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: tokens.muted }}>Typical payback</p>
                <div style={{ marginTop: 5 }}><Gated note={active.payNote}>— months</Gated></div>
              </div>
            </div>
          </div>

          <a
            href="/contact"
            style={{ marginTop: 24, display: "inline-flex", alignItems: "center", gap: 8, background: tokens.brand, color: "#fff", fontSize: 14, fontWeight: 600, padding: "13px 22px", borderRadius: 13, textDecoration: "none" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = tokens.brandHover)}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = tokens.brand)}
          >
            Get a quote for this
            <ArrowRight size={14} weight="bold" />
          </a>
          <p style={{ fontSize: 12, color: tokens.muted, marginTop: 12 }}>
            Final capacity and payback are confirmed at your free site survey.
          </p>
        </div>
      </div>
    </div>
  );
}
