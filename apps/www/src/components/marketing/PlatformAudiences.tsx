/*
  PlatformAudiences — the home "One platform, every kind of site" section.

  Six audience BANDS (Home · Office · Industrial · Institute · Enterprise ·
  Hospitality) stacked one after another. Each band is a full-bleed 800px image
  container: a lifestyle/product photo of that audience fills it, a cinematic
  scrim keeps text legible, the audience label sits top-left, and the four real
  solution spokes ride the bottom as frosted-glass tiles.

  Imagery: only the Home set exists today (/images/solutions/homes-*.png). Bands
  without a photo render a branded placeholder backdrop — drop a real image path
  into `image` and the band lights up, no other change needed.

  Grounded entirely in the registered routes in routes.ts; nothing invented.
  Office + Industrial both draw from the /solutions/offices-industrial hub (four
  spokes: small-office, mid-office, large-campus, factory); cards without a
  dedicated spoke route deep-link to that hub — flagged inline.

  Locked language: olive substrate + GridRed spark, Inter (_v3-tokens + atoms).
  Reduced-motion safe via <Rise>.
*/

import { type CSSProperties, useState } from "react";
import { Link } from "react-router";
import {
  ArrowRight,
  BuildingApartment,
  House,
  Sun,
  Buildings,
  Storefront,
  BuildingOffice,
  FirstAid,
  Factory,
  Wrench,
  Warehouse,
  GraduationCap,
  Books,
  Bank,
  Bed,
  HardDrives,
  CellTower,
  Stethoscope,
  Network,
  ForkKnife,
  type Icon,
} from "@phosphor-icons/react";
import { tokens } from "../../routes/_preview/_v3-tokens";
import { FONT, MONO, Rise } from "../solutions/light/atoms";

type SpokeCard = { icon: Icon; name: string; blurb: string; to: string };
type Audience = {
  key: string;
  icon: Icon;
  name: string;
  tagline: string;
  hub: string;
  image?: string; // full-bleed backdrop; falls back to a branded placeholder
  cards: SpokeCard[];
};

const AUDIENCES: Audience[] = [
  {
    key: "home",
    icon: House,
    name: "Home",
    tagline: "From a single flat to a three-phase villa.",
    hub: "/solutions/homes",
    image: "/images/solutions/home-hero.webp",
    cards: [
      { icon: BuildingApartment, name: "Apartment", blurb: "Wall-mounted backup that keeps essentials, and a room cool, through every cut.", to: "/solutions/homes/apartment" },
      { icon: House, name: "Small home", blurb: "Whole-home backup, ACs included, the moment the grid drops.", to: "/solutions/homes/small-home" },
      { icon: Buildings, name: "Large home & villa", blurb: "Three-phase backup that rides every cut in silence, on autopilot.", to: "/solutions/homes/large-home" },
      { icon: Sun, name: "Solar + storage", blurb: "Bank your rooftop solar by day and run on it after dark.", to: "/solutions/homes/solar-storage" },
    ],
  },
  {
    key: "office",
    icon: BuildingOffice,
    name: "Office",
    tagline: "Servers and people, never offline.",
    hub: "/solutions/offices-industrial",
    cards: [
      { icon: Storefront, name: "Small office", blurb: "Clean, seamless backup so a cut never costs a working session.", to: "/solutions/offices-industrial/small-office" },
      { icon: BuildingOffice, name: "Mid-size office", blurb: "A whole floor kept online, with peak-tariff savings the rest of the day.", to: "/solutions/offices-industrial/mid-office" },
      { icon: Storefront, name: "Retail & showroom", blurb: "Lights, billing counters, and POS that stay up through every cut.", to: "/solutions/offices-industrial" },
      { icon: FirstAid, name: "Clinic", blurb: "Silent, reliable backup where equipment and patients can't wait.", to: "/solutions/offices-industrial" },
    ],
  },
  {
    key: "industrial",
    icon: Factory,
    name: "Industrial",
    tagline: "Hold the line, cut the peaks.",
    hub: "/solutions/offices-industrial",
    cards: [
      { icon: Factory, name: "Factory", blurb: "Three-phase backup and demand-charge management for the shop floor.", to: "/solutions/offices-industrial/factory" },
      { icon: Buildings, name: "Large campus", blurb: "A spread-out site backed and demand-managed as one system.", to: "/solutions/offices-industrial/large-campus" },
      { icon: Wrench, name: "Workshop & light industry", blurb: "Storage that rides cuts and trims demand charges, no genset noise.", to: "/solutions/offices-industrial" },
      { icon: Warehouse, name: "Warehouse & cold storage", blurb: "Refrigeration and racking that ride outages without spoilage.", to: "/solutions/offices-industrial" },
    ],
  },
  {
    key: "institute",
    icon: GraduationCap,
    name: "Institute",
    tagline: "Classes never stop for a cut.",
    hub: "/solutions/institutes",
    cards: [
      { icon: GraduationCap, name: "School", blurb: "Classrooms, labs, and the server room running through every outage.", to: "/solutions/institutes/school" },
      { icon: Books, name: "College", blurb: "Put campus rooftops to work — store daytime solar and run on it.", to: "/solutions/institutes/college" },
      { icon: Bank, name: "University", blurb: "Every building backed and metered from one GridOS dashboard.", to: "/solutions/institutes/university" },
      { icon: Bed, name: "Hostels", blurb: "Overnight comfort that holds, silent and safe around students.", to: "/solutions/institutes/hostels" },
    ],
  },
  {
    key: "enterprise",
    icon: Network,
    name: "Enterprise",
    tagline: "One console, every site.",
    hub: "/solutions/enterprises",
    cards: [
      { icon: HardDrives, name: "Data centre", blurb: "Clean, uninterrupted critical power with UPS-grade transfer.", to: "/solutions/enterprises/data-center" },
      { icon: CellTower, name: "Telecom", blurb: "Sites that stay up on stored power, with no diesel run.", to: "/solutions/enterprises/telecom" },
      { icon: Stethoscope, name: "Hospital", blurb: "Life-critical load protected with seamless switchover.", to: "/solutions/enterprises/hospital" },
      { icon: Network, name: "Multi-site", blurb: "Every location in one console, with a per-site cost ledger.", to: "/solutions/enterprises/multi-site" },
    ],
  },
  {
    key: "hospitality",
    icon: Bed,
    name: "Hospitality",
    tagline: "Guests never feel the cut.",
    hub: "/solutions/hospitality",
    cards: [
      { icon: Bed, name: "Hotel", blurb: "Rooms cool and lifts moving the moment the grid drops.", to: "/solutions/hospitality/hotel" },
      { icon: Sun, name: "Resort", blurb: "Three-phase backup across spread-out property blocks.", to: "/solutions/hospitality/resort" },
      { icon: ForkKnife, name: "Restaurant", blurb: "Kitchens and cold storage that ride every cut without spoilage.", to: "/solutions/hospitality/restaurant" },
      { icon: Storefront, name: "Mall", blurb: "High-footfall retail kept trading through outages.", to: "/solutions/hospitality/mall" },
    ],
  },
];

/* TEMP (reference only): show the home render across every band so Sagar can
   preview the full treatment end-to-end. Remove this line — bands then fall back
   to their branded "PHOTOGRAPHY — TBD" placeholder until real photos land. */
const REFERENCE_IMAGE = "/images/solutions/home-hero.webp";

/* Cinematic scrim: dark at the very top (label), image breathes in the middle,
   dark at the bottom (the card rail). Keeps white legible over any photo. */
const SCRIM =
  "linear-gradient(180deg, rgba(12,12,10,0.52) 0%, rgba(12,12,10,0.10) 20%, rgba(12,12,10,0.06) 46%, rgba(12,12,10,0.42) 68%, rgba(12,12,10,0.88) 100%)";

/* Wallet-stack geometry. Each card pins a little LOWER than the one before it
   (STACK_TOP + index·STACK_STEP), so the earlier cards' top edges peek above the
   new one — a deck of cards piling up. STACK_TOP clears the sticky site header. */
const STACK_TOP = 92;
const STACK_STEP = 20;

export function PlatformAudiences() {
  return (
    <section style={{ background: tokens.pageBg, borderTop: `1px solid ${tokens.hairline}` }}>
      {/* Header — no kicker overline, per lock. */}
      <div style={{ maxWidth: 1240, marginInline: "auto", paddingInline: "clamp(24px, 3.5vw, 48px)", paddingTop: "clamp(72px, 9vh, 120px)", paddingBottom: "clamp(36px, 5vh, 56px)" }}>
        <Rise>
          <h2 style={{ fontFamily: FONT, color: tokens.ink, fontSize: "clamp(30px, 4vw, 48px)", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1.04, textWrap: "balance", maxWidth: "15ch" }}>
            One platform, every kind of site.
          </h2>
        </Rise>
        <Rise delay={0.06}>
          <p style={{ color: tokens.muted, fontSize: 17, lineHeight: 1.6, marginTop: 18, maxWidth: 600 }}>
            From a single home to utility infrastructure — the same storage hardware and the
            same GridOS software, sized to the site it powers.
          </p>
        </Rise>
      </div>

      {/* Wallet-stack of big cards — contained, not full-bleed. */}
      <div
        className="ge-aud-stack"
        style={{ maxWidth: 1240, marginInline: "auto", paddingInline: 24, paddingBottom: "clamp(48px, 7vh, 110px)" }}
      >
        {AUDIENCES.map((a, i) => (
          <AudienceBand key={a.key} a={a} index={i} />
        ))}
      </div>

      <style>{`
        @media (max-width: 900px) {
          /* Drop the sticky pin on small screens — cards stack normally. */
          .ge-aud-band { position: static !important; height: auto !important; min-height: 0 !important; margin-bottom: 20px !important; }
          .ge-aud-inner { padding-block: 40px !important; }
          .ge-aud-rail { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 560px) {
          .ge-aud-rail { grid-template-columns: 1fr !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          .ge-aud-band { position: static !important; height: auto !important; min-height: 560px; margin-bottom: 20px !important; }
        }
      `}</style>
    </section>
  );
}

function AudienceBand({ a, index }: { a: Audience; index: number }) {
  const Ico = a.icon;
  const backdrop = a.image ?? REFERENCE_IMAGE; // TEMP: reference preview across all bands
  return (
    <section
      className="ge-aud-band"
      style={{
        // Wallet-stack: each card pins a little lower than the last, so the deck
        // piles up on screen. Later DOM order paints on top → card N+1 covers N.
        position: "sticky",
        top: STACK_TOP + index * STACK_STEP,
        width: "100%",
        height: "clamp(560px, 78vh, 760px)",
        marginBottom: 28,
        display: "flex",
        overflow: "hidden",
        borderRadius: 28,
        background: tokens.ink,
        boxShadow: "0 18px 44px -28px rgba(0,0,0,0.55)",
      }}
    >
      {/* Backdrop — real photo (or the TEMP reference image on every band). */}
      <img
        src={backdrop}
        alt=""
        aria-hidden
        loading="lazy"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
      />

      {/* Cinematic scrim. */}
      <div aria-hidden style={{ position: "absolute", inset: 0, background: SCRIM, pointerEvents: "none" }} />

      {/* Content — label top / spoke rail bottom. */}
      <div
        className="ge-aud-inner"
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          paddingInline: "clamp(24px, 3.5vw, 48px)",
          paddingBlock: "clamp(28px, 4vh, 48px)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: 32,
        }}
      >
        {/* Label block */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 24, flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span style={{ display: "grid", placeItems: "center", width: 54, height: 54, borderRadius: 15, background: "rgba(255,255,255,0.16)", border: "1px solid rgba(255,255,255,0.24)", flexShrink: 0 }}>
              <Ico size={27} weight="duotone" color="#fff" />
            </span>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontFamily: MONO, fontSize: 11, fontWeight: 500, letterSpacing: "0.14em", color: "rgba(255,255,255,0.72)" }}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 style={{ fontFamily: FONT, color: "#fff", fontSize: "clamp(26px, 3vw, 38px)", fontWeight: 600, letterSpacing: "-0.025em", lineHeight: 1.05, textShadow: "0 2px 20px rgba(0,0,0,0.35)" }}>
                  {a.name}
                </h3>
              </div>
              <p style={{ fontFamily: FONT, color: "rgba(255,255,255,0.86)", fontSize: 16, lineHeight: 1.4, marginTop: 6, textShadow: "0 1px 12px rgba(0,0,0,0.35)" }}>{a.tagline}</p>
            </div>
          </div>
          <SeeAll to={a.hub} label={`All ${a.name.toLowerCase()} solutions`} />
        </div>

        {/* Spoke rail */}
        <div className="ge-aud-rail" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
          {a.cards.map((c) => (
            <SpokeTile key={c.name} c={c} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SpokeTile({ c }: { c: SpokeCard }) {
  const [h, setH] = useState(false);
  const Ico = c.icon;
  const style: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    textDecoration: "none",
    background: h ? "rgba(20,20,18,0.82)" : "rgba(16,16,14,0.68)",
    border: `1px solid ${h ? "rgba(255,255,255,0.30)" : "rgba(255,255,255,0.16)"}`,
    borderRadius: 16,
    padding: 20,
    transition: "background .2s ease, border-color .2s ease, transform .2s ease",
    transform: h ? "translateY(-3px)" : "none",
  };
  return (
    <Link to={c.to} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={style}>
      <span style={{ display: "grid", placeItems: "center", width: 40, height: 40, borderRadius: 11, background: "rgba(255,255,255,0.10)", border: "1px solid rgba(255,255,255,0.16)", marginBottom: 14 }}>
        <Ico size={20} weight="duotone" color="#fff" />
      </span>
      <h4 style={{ fontFamily: FONT, color: "#fff", fontSize: 16.5, fontWeight: 600, letterSpacing: "-0.015em", lineHeight: 1.2 }}>{c.name}</h4>
      <p style={{ fontFamily: FONT, color: "rgba(255,255,255,0.74)", fontSize: 13, lineHeight: 1.5, marginTop: 7 }}>{c.blurb}</p>
      <span style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: "auto", paddingTop: 16, color: "#fff", fontSize: 13, fontWeight: 600 }}>
        Explore
        <ArrowRight size={12} weight="bold" color={tokens.brand} style={{ transform: h ? "translateX(3px)" : "none", transition: "transform .16s ease" }} />
      </span>
    </Link>
  );
}

function PlaceholderBackdrop({ name }: { name: string }) {
  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        background: `radial-gradient(120% 120% at 50% 0%, ${tokens.inkHover} 0%, ${tokens.ink} 60%, oklch(11% 0.005 107.1) 100%)`,
        display: "grid",
        placeItems: "center",
      }}
    >
      <span style={{ fontFamily: MONO, fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.34)" }}>
        {name} photography — TBD
      </span>
    </div>
  );
}

function SeeAll({ to, label }: { to: string; label: string }) {
  const [h, setH] = useState(false);
  return (
    <Link
      to={to}
      onClick={(e) => e.stopPropagation()} // don't trigger the header's return-scroll
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{ display: "inline-flex", alignItems: "center", gap: 7, fontFamily: FONT, fontSize: 13.5, fontWeight: 600, color: "#fff", textDecoration: "none", whiteSpace: "nowrap", padding: "8px 14px", borderRadius: 999, background: "rgba(255,255,255,0.10)", border: "1px solid rgba(255,255,255,0.22)" }}
    >
      {label}
      <ArrowRight size={13} weight="bold" color={tokens.brand} style={{ transform: h ? "translateX(3px)" : "none", transition: "transform .16s ease" }} />
    </Link>
  );
}
