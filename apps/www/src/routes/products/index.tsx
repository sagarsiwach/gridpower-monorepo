/*
  /products — the GridEnergy product family overview.

  Four classes: Nano, Micro, Mega, Giga — residential to utility scale.
  Tagged-card family (gray header + dense body), supporting blocks consistent
  with homes.tsx. No fabricated numbers. No GridPower mentions.
*/

import type { MetaFunction } from "react-router";
import {
  House, BuildingOffice, Factory, Lightning,
} from "@phosphor-icons/react";
import { tokens } from "../_preview/_v3-tokens";
import { FONT, MONO } from "../../components/solutions/light/atoms";
import {
  TrustBar, AppShowcase, FramedCTA,
} from "../../components/solutions/light/Blocks";
import {
  HowItWorks, StatBand, FaqResources, Gated,
} from "../../components/solutions/light/Modules";
import {
  Band, Wrap, Rise, Eyebrow, H2, Lead, Btn,
} from "../../components/solutions/light/atoms";
import { SolutionDock, type DockLink } from "../../components/solutions/light/SolutionDock";
import { Link } from "react-router";
import { useState } from "react";

export const meta: MetaFunction = () => [
  { title: "Products — GridEnergy" },
  { name: "description", content: "Four storage classes on a single LFP platform and GridOS: Nano for homes, Micro for offices, Mega for industrial, Giga for utility scale." },
];

/* ---- data ---- */

type Family = {
  name: "Nano" | "Micro" | "Mega" | "Giga";
  icon: typeof House;
  tag: string;
  audience: string;
  scale: string;
  what: string;
  suits: string[];
  to: string;
  live: boolean;
};

const FAMILIES: Family[] = [
  {
    name: "Nano",
    icon: House,
    tag: "Residential",
    audience: "Homes",
    scale: "Entry to whole-home",
    what: "A silent, wall-mounted LFP system that replaces the inverter and genset stack in a home. Designed for Indian residential loads, single-phase or three-phase, with seamless switchover and GridOS on your phone.",
    suits: ["Apartments and flats", "Small and large homes", "Villas with solar"],
    to: "/products/nano",
    live: true,
  },
  {
    name: "Micro",
    icon: BuildingOffice,
    tag: "Small commercial",
    audience: "Offices and shops",
    scale: "Office to small commercial",
    what: "A rack-format or cabinet system for offices, shops, and small commercial loads. Handles UPS replacement, peak shaving, and tariff arbitrage from a single cabinet, managed by GridOS.",
    suits: ["Offices and co-working spaces", "Retail and hospitality", "Small factories and warehouses"],
    to: "/contact",
    live: false,
  },
  {
    name: "Mega",
    icon: Factory,
    tag: "Industrial",
    audience: "Factories and campuses",
    scale: "Industrial to campus",
    what: "A containerised or room-scale system for factories, campuses, and larger commercial sites. Demand management, backup, and solar integration across three-phase loads, with fleet-level GridOS.",
    suits: ["Manufacturing facilities", "Institutional campuses", "Large commercial complexes"],
    to: "/contact",
    live: false,
  },
  {
    name: "Giga",
    icon: Lightning,
    tag: "Utility",
    audience: "Grid and infrastructure",
    scale: "Utility to power park",
    what: "A multi-container grid-scale system for power parks, utilities, and large infrastructure projects. GridOS integrates with grid dispatch, renewable intermittency, and SCADA where required.",
    suits: ["Renewable energy parks", "Grid-scale storage projects", "Large infrastructure developers"],
    to: "/contact",
    live: false,
  },
];

const DOCK_LINKS: DockLink[] = [
  { id: "range", label: "Range" },
  { id: "choose", label: "How to choose" },
  { id: "gridos", label: "GridOS" },
  { id: "faq", label: "FAQ" },
];

/* ---- page ---- */

export default function ProductsIndex() {
  return (
    <div style={{ fontFamily: FONT, background: tokens.pageBg }}>
      <main>
        {/* Hero */}
        <section style={{ background: tokens.pageBg, paddingTop: 80, paddingBottom: 88, borderBottom: `1px solid ${tokens.hairline}` }}>
          <Wrap>
            <Rise>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "7px 14px", borderRadius: 999, background: tokens.card, border: `1px solid ${tokens.hairline}`, fontSize: 13, fontWeight: 600, color: tokens.body, marginBottom: 24 }}>
                <span aria-hidden style={{ width: 7, height: 7, borderRadius: 999, background: tokens.brand }} />
                Products
              </span>
              <h1 style={{ fontFamily: FONT, color: tokens.ink, fontSize: "clamp(38px,5.2vw,60px)", fontWeight: 600, letterSpacing: "-0.035em", lineHeight: 1.02, textWrap: "balance", maxWidth: "18ch" }}>
                One platform. Every scale.
              </h1>
              <p style={{ color: tokens.muted, fontSize: 19, lineHeight: 1.55, marginTop: 20, maxWidth: 500 }}>
                Four storage classes on the same LFP chemistry and the same GridOS software. From a home that needs silent backup to infrastructure that needs grid-scale dispatch.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 30 }}>
                <Btn to="/solutions/homes">Find my size</Btn>
                <Btn to="/contact" kind="secondary">Talk to us</Btn>
              </div>
            </Rise>
          </Wrap>
        </section>

        <TrustBar
          lead="Same chemistry and platform, every class"
          items={["LFP cells, every unit", "GridOS standard", "Modular capacity", "Open protocols"]}
        />

        {/* Range — four family cards */}
        <Band id="range">
          <div style={{ maxWidth: 720, marginBottom: 56 }}>
            <Rise><div style={{ marginBottom: 16 }}><Eyebrow>The range</Eyebrow></div></Rise>
            <Rise delay={0.04}><H2>Nano to Giga.</H2></Rise>
            <Rise delay={0.08}><div style={{ marginTop: 16 }}><Lead>Pick the scale that fits your load. The intelligence, the chemistry, and the platform are identical across every class.</Lead></div></Rise>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 480px), 1fr))", gap: 20 }}>
            {FAMILIES.map((f, i) => <FamilyCard key={f.name} family={f} delay={i * 0.05} />)}
          </div>
        </Band>

        {/* How to choose */}
        <HowItWorks
          eyebrow="How to choose"
          title="Match your load to the right class."
          tone="deep"
          media="Sizing reference visual"
          steps={[
            { t: "Define your critical load", b: "Work out what you need to keep running: lights and essentials, ACs, or your whole facility. This sets the capacity class." },
            { t: "Tell us your site", b: "We look at your tariff, available solar, phase configuration, and physical space — which shapes the exact size and install type." },
            { t: "Get a sized proposal", b: "A clear quote with real economics, not estimates. We confirm capacity, runtime, and payback figures at survey." },
          ]}
        />

        <StatBand
          title="Numbers only once they are yours."
          lead="We size every system to your real tariff and load, then show you the figures. Subsidies, where you qualify, come on top."
          stats={[
            { value: <Gated note="compute payback range across classes">—</Gated>, label: "Typical payback range" },
            { value: <Gated note="compute bill saving range">—</Gated>, label: "Annual bill saving" },
            { value: <Gated note="cite applicable subsidy schemes">—</Gated>, label: "Subsidy available" },
          ]}
        />

        {/* Shared platform strip */}
        <AppShowcase
          label="GridOS"
          title="The software platform behind every class."
          intro="Every GridEnergy system, from the smallest Nano in a flat to a Giga installation on a power park, runs GridOS. One platform that learns your load and shows you the economics."
          visual="GridOS platform visual"
          features={[
            "Live state of charge, grid, and solar in real time",
            "Tariff-aware scheduling: charge cheap, discharge dear",
            "Backup reserve protected automatically",
            "Outage alerts, health monitoring, and savings dashboard",
            "Fleet view for multi-site installations",
          ]}
        />

        <FaqResources
          eyebrow="Questions"
          title="Common questions about the range."
          lead="If it's not here, ask us directly."
          faqs={[
            { q: "What is the difference between Nano and Micro?", a: "Nano is designed for residential loads: single home, single or three phase, wall-mounted or compact floor unit. Micro scales to office and small commercial loads with higher continuous output and rack or cabinet form factor. Both run GridOS and use LFP cells." },
            { q: "Can I start with a Nano and upgrade to a Micro later?", a: "The Nano and Micro are separate product lines sized for different load profiles. You can expand capacity within the Nano range by adding modules. Moving to a larger class involves a new system install. We assess this at survey and plan it honestly from the start." },
            { q: "Are Micro, Mega, and Giga available now?", a: "Nano is available now. Micro, Mega, and Giga are in the commercial pipeline. Contact us to discuss timelines and register interest for your site." },
            { q: "What does 'modular' mean in practice?", a: "You start with a base capacity and add battery modules later without replacing the inverter or control hardware. This lets you match initial budget to initial load, then grow the system as your usage or budget changes." },
            { q: "Do all classes support solar?", a: "Yes. Every class has solar-ready connections and GridOS handles combined solar and storage management. Nano ships solar-ready and can be paired with your existing rooftop installation or solar added through our partners." },
            { q: "What warranty applies?", a: <Gated note="add verified warranty years and cycle guarantee per class">Warranty terms: TBD per class, confirmed at proposal stage</Gated> },
          ]}
          resources={[
            { kind: "Guide", title: "How battery storage works for homes", body: "Backup, bill savings, and solar: what a storage system does, in plain language.", to: "/support" },
            { kind: "Guide", title: "Choosing between residential and commercial storage", body: "The load, phase, and form-factor differences that determine which class is right.", to: "/support" },
            { kind: "Checklist", title: "Questions to ask before you buy", body: "The six questions that separate a real storage system from a repackaged inverter.", to: "/support" },
          ]}
        />

        <FramedCTA
          title="Not sure which class fits your site?"
          sub="Start with your home or facility. We recommend the right class and confirm the economics."
          primary={{ label: "Book a free survey", to: "/contact" }}
          secondary={{ label: "Explore the Nano", to: "/products/nano" }}
        />
      </main>

      <SolutionDock
        label="Products"
        links={DOCK_LINKS}
        secondary={{ label: "Nano detail", to: "/products/nano" }}
        primary={{ label: "Get a quote", to: "/contact" }}
      />
    </div>
  );
}

/* ---- FamilyCard ---- */

function FamilyCard({ family, delay }: { family: Family; delay: number }) {
  const [hover, setHover] = useState(false);
  const Icon = family.icon;

  const inner = (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        height: "100%",
        background: tokens.card,
        border: `1px solid ${hover && family.live ? tokens.hairlineStrong : tokens.hairline}`,
        borderRadius: 20,
        overflow: "hidden",
        transform: hover && family.live ? "translateY(-2px)" : "none",
        boxShadow: hover && family.live ? "0 18px 40px -28px oklch(15.3% 0.006 107.1 / 0.3)" : "none",
        transition: "border-color .2s ease, transform .2s ease, box-shadow .25s ease",
        display: "flex",
        flexDirection: "column" as const,
      }}
    >
      {/* gray header */}
      <div
        style={{
          background: tokens.pageBgDeep,
          borderBottom: `1px solid ${tokens.hairline}`,
          padding: "12px 22px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
          <span style={{ display: "grid", placeItems: "center", width: 30, height: 30, borderRadius: 9, background: tokens.card, border: `1px solid ${tokens.hairline}` }}>
            <Icon size={16} weight="duotone" color={tokens.inkMuted} />
          </span>
          <span style={{ fontFamily: MONO, fontSize: 10.5, fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: tokens.inkMuted }}>{family.tag}</span>
        </span>
        {family.live ? (
          <span style={{ fontFamily: MONO, fontSize: 9.5, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: tokens.brand }}>Available</span>
        ) : (
          <span style={{ fontFamily: MONO, fontSize: 9.5, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: tokens.muted }}>Coming soon</span>
        )}
      </div>

      {/* body */}
      <div style={{ padding: "24px 24px 28px", display: "flex", flexDirection: "column" as const, flex: 1, gap: 16 }}>
        <div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 10, flexWrap: "wrap" as const }}>
            <h3 style={{ fontFamily: FONT, fontSize: 28, fontWeight: 600, letterSpacing: "-0.025em", color: tokens.ink }}>{family.name}</h3>
            <span style={{ fontFamily: FONT, fontSize: 13, fontWeight: 500, color: tokens.muted }}>{family.audience}</span>
          </div>
          <p style={{ fontFamily: MONO, fontSize: 10.5, fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase" as const, color: family.live ? tokens.brand : tokens.inkMuted, marginTop: 6 }}>{family.scale}</p>
        </div>

        <p style={{ color: tokens.body, fontSize: 15, lineHeight: 1.6 }}>{family.what}</p>

        <div>
          <p style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: tokens.inkMuted, marginBottom: 10 }}>Suits</p>
          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column" as const, gap: 8 }}>
            {family.suits.map((s) => (
              <li key={s} style={{ display: "flex", alignItems: "flex-start", gap: 9 }}>
                <span aria-hidden style={{ width: 5, height: 5, borderRadius: 999, background: tokens.brand, flexShrink: 0, marginTop: 8 }} />
                <span style={{ fontFamily: FONT, fontSize: 13.5, color: tokens.body, lineHeight: 1.45 }}>{s}</span>
              </li>
            ))}
          </ul>
        </div>

        <div style={{ marginTop: "auto", paddingTop: 8 }}>
          {family.live ? (
            <span style={{ display: "inline-flex", alignItems: "center", gap: 7, color: tokens.brand, fontSize: 13.5, fontWeight: 600, fontFamily: FONT }}>
              Explore Nano
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                <path d="M2.5 6h7M6.5 3l3 3-3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          ) : (
            <span style={{ display: "inline-flex", alignItems: "center", gap: 7, color: tokens.muted, fontSize: 13.5, fontWeight: 500, fontFamily: FONT }}>
              Contact us for details
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                <path d="M2.5 6h7M6.5 3l3 3-3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <Rise delay={delay}>
      {family.live ? (
        <Link to={family.to} style={{ textDecoration: "none", display: "block", height: "100%" }}>
          {inner}
        </Link>
      ) : (
        <Link to={family.to} style={{ textDecoration: "none", display: "block", height: "100%", cursor: "default" }} tabIndex={-1} aria-disabled="true">
          {inner}
        </Link>
      )}
    </Rise>
  );
}
