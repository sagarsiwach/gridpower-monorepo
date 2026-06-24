/*
  /solutions/homes — the HOMES HUB (live, navbar target).

  This page's job is to sell the CATEGORY of home energy storage and then ROUTE
  the visitor to the home-type spoke that fits them. It deliberately carries no
  spoke-level detail (no per-type spec tables, no single-flat install photos, no
  product deep-dives) — those live on the spokes:
    /solutions/homes/apartment  (built)
    /solutions/homes/small-home  (catch-all renders gracefully until built)
    /solutions/homes/large-home  (")
    /solutions/homes/solar-storage  (")

  Assembled from the canonical block library (Blocks + Modules) in the locked
  restrained language (olive + GridRed, Inter), with the unified SolutionDock.
  The ROUTER section is the hub's real navigation and is built inline here so it
  reads as a deliberate "pick your situation" grid, distinct from the atmospheric
  hero carousel. Header + footer come from root.tsx. Numbers route through <Gated>.

  Conversion path (locked): primary CTA = "Configure your system" → /configure,
  secondary = "Book a site survey" → /contact. Applied on hero, FramedCTA, dock.
*/

import { type CSSProperties, useState } from "react";
import { Link } from "react-router";
import type { MetaFunction } from "react-router";
import {
  BatteryChargingVertical, CurrencyInr, SpeakerSimpleX, DeviceMobile, ShieldCheck, Leaf,
  Buildings, House, Sun, ArrowRight, Check, type Icon,
} from "@phosphor-icons/react";
import { tokens } from "../_preview/_v3-tokens";
import { Band, Wrap, Rise, Eyebrow, H2, Lead, FONT, MONO } from "../../components/solutions/light/atoms";
import {
  TrustBar, SystemRows, OutcomeGrid, Comparison, FramedCTA,
} from "../../components/solutions/light/Blocks";
import { HeroCarousel, type HeroSlide } from "../../components/solutions/light/HeroCarousel";
import { HowItWorks, StatBand, FaqResources, Gated } from "../../components/solutions/light/Modules";
import { SolutionDock, type DockLink } from "../../components/solutions/light/SolutionDock";

export const meta: MetaFunction = () => [
  { title: "Home energy storage · GridEnergy" },
  { name: "description", content: "Silent, lifetime home storage that backs up your whole home, cuts your bill, and makes your solar worth it. Managed by GridOS. Find the system built for your kind of home." },
];

/* Conversion path — single source of truth for the locked CTAs */
const CONFIGURE = { label: "Configure your system", to: "/configure" };
const SURVEY = { label: "Book a site survey", to: "/contact" };

const HERO_SLIDES: HeroSlide[] = [
  { image: "/images/solutions/homes-apartment.png", eyebrow: "Apartments & flats", kicker: "Apartment energy storage", title: "Silent backup for your flat.", sub: "Compact, wall-mounted storage that keeps your essentials, and a room cool, running through every cut.",
    points: ["Wall-mounted, fits a utility nook", "Silent LFP, no genset or fumes", "Backup and bill savings, run from your phone"],
    primary: CONFIGURE, secondary: { label: "Explore apartments", to: "/solutions/homes/apartment" } },
  { image: "/images/solutions/homes-small.png", eyebrow: "Small homes", kicker: "Whole-home energy storage", title: "Whole-home essentials, ACs included.", sub: "Backup and bill savings for a small home, silent and seamless the moment the grid drops.",
    points: ["Backs up essentials, ACs included", "Seamless switchover the moment grid drops", "Tariff-smart charging via GridOS"],
    primary: CONFIGURE, secondary: { label: "Explore small homes", to: "/solutions/homes/small-home" } },
  { image: "/images/solutions/homes-large.png", eyebrow: "Large homes & villas", kicker: "Three-phase home storage", title: "Whole-villa power, on autopilot.", sub: "Three-phase backup and tariff-smart savings for a large home, run entirely from your phone.",
    points: ["Whole-villa, three-phase backup", "Tariff-smart savings on autopilot", "Run entirely from the GridOS app"],
    primary: CONFIGURE, secondary: { label: "Explore villas", to: "/solutions/homes/large-home" } },
  { image: "/images/solutions/homes-solar.png", eyebrow: "Solar + storage", kicker: "Solar plus storage", title: "Bank your solar. Run on it after dark.", sub: "Stop exporting cheap by day and buying back dear at night. Store your solar and live on it through the peak.",
    points: ["Store your solar, use it after dark", "Stop exporting cheap, buying back dear", "Backup and self-use, managed by GridOS"],
    primary: CONFIGURE, secondary: { label: "Explore solar storage", to: "/solutions/homes/solar-storage" } },
];

/* The router: the four home-type spokes the hub points to. */
type HomeRoute = {
  id: string;
  icon: Icon;
  eyebrow: string;
  title: string;
  youAreThisIf: string;
  fit: string[];
  to: string;
  built: boolean;
};

const HOME_ROUTES: HomeRoute[] = [
  {
    id: "route-apartment",
    icon: Buildings,
    eyebrow: "Apartments & flats",
    title: "Apartment",
    youAreThisIf: "You live in a flat and want essentials, and one room cool, through every cut.",
    fit: ["Wall-mounted, fits a nook", "Single-phase essentials"],
    to: "/solutions/homes/apartment",
    built: true,
  },
  {
    id: "route-small-home",
    icon: House,
    eyebrow: "Small homes",
    title: "Small home",
    youAreThisIf: "You own a small home and want whole-home backup, ACs included, the moment the grid drops.",
    fit: ["Whole-home essentials", "ACs and fridge through a cut"],
    to: "/solutions/homes/small-home",
    built: false,
  },
  {
    id: "route-large-home",
    icon: House,
    eyebrow: "Large homes & villas",
    title: "Large home or villa",
    youAreThisIf: "You have a villa or large home on a three-phase connection and want it to ride every cut in silence.",
    fit: ["Three-phase backup", "Tariff-smart on autopilot"],
    to: "/solutions/homes/large-home",
    built: false,
  },
  {
    id: "route-solar-storage",
    icon: Sun,
    eyebrow: "Solar + storage",
    title: "Solar + storage",
    youAreThisIf: "You already have rooftop solar and want to bank it by day and run on it after dark.",
    fit: ["Stores your own solar", "Backup plus self-use"],
    to: "/solutions/homes/solar-storage",
    built: false,
  },
];

const DOCK_LINKS: DockLink[] = [
  { id: "what", label: "System" },
  { id: "router", label: "Your home" },
  { id: "outcomes", label: "Outcomes" },
  { id: "compare", label: "Compare" },
  { id: "faq", label: "FAQ" },
];

/* ------------------------------------------------------------------ */
/*  RouterSection — the hub's real job. A deliberate "pick your        */
/*  situation" grid, visually distinct from the atmospheric carousel:  */
/*  the carousel is mood, this is navigation. Reduced-motion is        */
/*  handled by <Rise>; hover is a simple non-essential transform.      */
/* ------------------------------------------------------------------ */
function RouterSection() {
  return (
    <Band id="router">
      <div style={{ maxWidth: 720, marginBottom: 48 }}>
        <Rise><div style={{ marginBottom: 16 }}><Eyebrow>Find your home</Eyebrow></div></Rise>
        <Rise delay={0.04}><H2 max={620}>Which home is yours?</H2></Rise>
        <Rise delay={0.08}>
          <div style={{ marginTop: 16 }}>
            <Lead>Home storage is sized to the home it backs up. Pick the one that sounds like yours and see the system built for it.</Lead>
          </div>
        </Rise>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 270px), 1fr))", gap: 18 }}>
        {HOME_ROUTES.map((r, i) => (
          <Rise key={r.id} delay={i * 0.05}>
            <RouteCard r={r} />
          </Rise>
        ))}
      </div>
    </Band>
  );
}

function RouteCard({ r }: { r: HomeRoute }) {
  const [h, setH] = useState(false);
  const Ico = r.icon;
  const cardStyle: CSSProperties = {
    display: "flex", flexDirection: "column", height: "100%", textDecoration: "none",
    background: tokens.card,
    border: `1px solid ${h ? tokens.hairlineStrong : tokens.hairline}`,
    borderRadius: 18, padding: 26, position: "relative", overflow: "hidden",
    transition: "border-color .2s ease, transform .2s ease, box-shadow .25s ease",
    transform: h ? "translateY(-3px)" : "none",
    boxShadow: h ? "0 22px 48px -30px oklch(15.3% 0.006 107.1 / 0.34)" : "none",
  };
  return (
    <Link
      to={r.to}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={cardStyle}
      id={r.id}
    >
      {/* number + icon header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
        <span style={{ display: "grid", placeItems: "center", width: 46, height: 46, borderRadius: 13, background: tokens.pageBgDeep, border: `1px solid ${tokens.hairline}` }}>
          <Ico size={23} weight="duotone" color={tokens.ink} />
        </span>
        <span style={{ fontFamily: MONO, fontSize: 10.5, fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: tokens.muted }}>{r.eyebrow}</span>
      </div>

      <h3 style={{ fontFamily: FONT, color: tokens.ink, fontSize: 21, fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.15 }}>{r.title}</h3>

      <p style={{ fontFamily: FONT, color: tokens.body, fontSize: 14.5, lineHeight: 1.5, marginTop: 10 }}>
        <span style={{ color: tokens.brand, fontWeight: 600 }}>This is you if </span>
        {r.youAreThisIf}
      </p>

      <ul style={{ marginTop: 16, marginBottom: 22, display: "flex", flexDirection: "column", gap: 8, listStyle: "none", padding: 0 }}>
        {r.fit.map((f) => (
          <li key={f} style={{ display: "flex", gap: 9, alignItems: "flex-start" }}>
            <Check size={14} weight="bold" color={tokens.brand} style={{ flexShrink: 0, marginTop: 3 }} />
            <span style={{ fontFamily: FONT, color: tokens.muted, fontSize: 13.5, lineHeight: 1.4 }}>{f}</span>
          </li>
        ))}
      </ul>

      <span style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: "auto", color: tokens.brand, fontSize: 13.5, fontWeight: 600 }}>
        {r.built ? "See this system" : "Explore this home"}
        <ArrowRight size={13} weight="bold" style={{ transform: h ? "translateX(3px)" : "none", transition: "transform .16s ease" }} />
      </span>
    </Link>
  );
}

export default function SolutionsHomes() {
  return (
    <div style={{ fontFamily: FONT, background: tokens.pageBg }}>
      <main>
        {/* 1 · Hero carousel — atmosphere + identity. Primary CTA configures,
            each slide's secondary deep-links to its spoke. */}
        <HeroCarousel slides={HERO_SLIDES} />

        <TrustBar lead="Built on LFP chemistry and open standards" items={["Safer LFP cells", "Sealed, maintenance-free", "GridOS app control", "No vendor lock-in"]} />

        {/* 2 · What home storage is — lives on the hub so spokes don't repeat it. */}
        <SystemRows
          label="What it is"
          title="A battery, an inverter, solar-ready, run by software."
          intro="One sealed system replaces the box of parts in your utility room. The same three parts back up every kind of home, sized to fit."
          features={[
            { kicker: "The battery", title: "Stores power for when you need it.", body: "Safe, long-life LFP cells store cheap, off-peak, or solar power and release it during cuts and expensive hours.", bullets: ["LFP chemistry, safe and long-lived", "Modular, add capacity later", "Sealed and maintenance-free"], visual: "LFP battery module" },
            { kicker: "The inverter", title: "Switches over before you notice.", body: "An integrated inverter delivers clean power and hands over from grid to battery seamlessly when the supply drops.", bullets: ["Seamless switchover on an outage", "Clean, stable output", "One unit, no separate inverter"], visual: "Integrated power unit" },
            { kicker: "GridOS", title: "The brain that makes it pay.", body: "GridOS decides when to charge, when to discharge, and how much to hold in reserve, and shows you everything from your phone.", bullets: ["Tariff-aware scheduling", "Backup reserve protection", "Live monitoring and alerts"], visual: "GridOS dashboard" },
          ]}
        />

        {/* 3 · THE ROUTER — the hub's real job: route to the right spoke. */}
        <RouterSection />

        {/* 4 · Outcomes — category-level, what living with it changes. */}
        <OutcomeGrid
          label="Outcomes"
          title="What you actually get."
          intro="Not a spec sheet. The things that change about living with your power, whatever home you start from."
          items={[
            { icon: BatteryChargingVertical, title: "Backup that runs your home", body: "Whole-home or essentials, including your ACs, with seamless switchover when the grid drops." },
            { icon: CurrencyInr, title: "Lower bills", body: "Store cheap or solar power and use it at peak-tariff hours." },
            { icon: SpeakerSimpleX, title: "Silence", body: "No genset, no fumes, no noise. It just works." },
            { icon: DeviceMobile, title: "Smart", body: "Monitor and control everything from your phone via GridOS." },
            { icon: ShieldCheck, title: "Safe", body: "LFP chemistry, the safer, longer-lived battery type." },
            { icon: Leaf, title: "Independence", body: "Less grid, less diesel, more control over your own power." },
          ]}
        />

        {/* 5 · The most persuasive home block — against the genset they'd buy. */}
        <Comparison
          title="Against the diesel genset you would otherwise buy."
          intro="Same job, backing up your home through a cut. Two very different ways to live with it."
          usLabel="GridEnergy" themLabel="Diesel genset"
          rows={[
            { label: "Noise", us: "Silent", them: "Loud" },
            { label: "Fumes", us: "None", them: "Diesel exhaust" },
            { label: "Running cost", us: "Stored / solar power", them: "Diesel, every hour" },
            { label: "Switchover", us: "Seamless", them: "Manual / delayed" },
            { label: "Servicing", us: "Remote, maintenance-free", them: "Regular, hands-on" },
            { label: "Control", us: "From your phone", them: "None" },
          ]}
        />

        {/* 6 · How buying works — the flow. Economics stay gated below. */}
        <HowItWorks eyebrow="How buying works" title="From enquiry to your app, in three steps." media="Buying flow visual"
          steps={[
            { t: "Free site survey", b: "We assess your load, roof, and backup needs at your place, no obligation." },
            { t: "Custom proposal", b: "A sized system, the real economics, and a clear quote built around your tariff." },
            { t: "Pro install & app", b: "Authorised install and commissioning, then GridOS set up on your phone." },
          ]}
        />

        <StatBand title="The honest numbers, once they are yours." lead="We size to your tariff and load and show real figures at survey. Subsidies, where you qualify, come on top."
          stats={[
            { value: <Gated note="compute payback model per home profile">—</Gated>, label: "Typical payback" },
            { value: <Gated note="compute lifetime savings model">—</Gated>, label: "Lifetime savings" },
            { value: <Gated note="cite PM Surya Ghar / state scheme + eligibility">—</Gated>, label: "Subsidy support" },
          ]}
        />

        {/* 7 · Category objections, answered. CTA + dock follow. */}
        <FaqResources eyebrow="Questions" title="The objections, answered honestly." lead="Learn how home storage works."
          faqs={[
            { q: "How is this better than my inverter?", a: "It replaces both your inverter and its battery with one silent, sealed LFP system, adds seamless switchover, and is managed from your phone. It outlasts the lead-acid batteries you replace every few years." },
            { q: "Will it run my AC?", a: "From essentials up to whole-home including ACs, depending on the size you choose. We confirm exactly what your system runs, and for how long, at the site survey." },
            { q: "Do I need solar?", a: "No. It works as pure backup and bill-savings storage on its own. If you have solar it makes it far more valuable; if you do not, you can add it later through our partners." },
            { q: "What is the warranty?", a: <Gated note="add real warranty years + cycles">Exact years and cycle terms: TBD</Gated> },
            { q: "What about maintenance?", a: "Sealed and effectively maintenance-free, with health monitored remotely through GridOS. No genset servicing, no battery top-ups." },
          ]}
          resources={[
            { kind: "Guide", title: "How home battery storage actually works", body: "Backup, bill savings, and solar: what a storage system does, in plain language.", to: "/support" },
            { kind: "Explainer", title: "LFP vs lead-acid: why chemistry matters", body: "Why LFP is the safer, longer-lived battery, and what that means for your home.", to: "/support" },
            { kind: "Checklist", title: "What to ask before you buy storage", body: "The questions that separate a real backup system from a repackaged inverter.", to: "/support" },
          ]}
        />

        <FramedCTA title="Ready to never sit in the dark again?" sub="Configure a system for your home now, or book a free site survey. No obligation."
          primary={CONFIGURE} secondary={SURVEY} />
      </main>

      <SolutionDock label="Home storage" links={DOCK_LINKS}
        secondary={SURVEY} primary={CONFIGURE} />
    </div>
  );
}
