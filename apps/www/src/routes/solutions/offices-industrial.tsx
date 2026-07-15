/*
  /solutions/offices-industrial — the Offices & Industrial category landing page.

  Built from the canonical block library (Blocks + Stripe-distilled Modules) in
  the locked restrained language (olive + GridRed, Inter), with the unified
  SolutionDock. Mirrors the homes.tsx template exactly. Audience: SMEs, shops,
  and small industrial units. Product class: Nano / Micro. Numbers route through
  <Gated>. The global header + footer come from root.tsx.
*/

import type { MetaFunction } from "react-router";
import {
  BatteryChargingVertical, CurrencyInr, SpeakerSimpleX, ChartLineUp, ShieldCheck, PlugsConnected,
} from "@phosphor-icons/react";
import { tokens } from "../_preview/_v3-tokens";
import { FONT } from "../../components/solutions/light/atoms";
import {
  TrustBar, SystemRows, OutcomeGrid, Comparison, AppShowcase, FramedCTA,
} from "../../components/solutions/light/Blocks";
import { HeroCarousel, type HeroSlide } from "../../components/solutions/light/HeroCarousel";
import { HowItWorks, StatBand, CustomerSwitcher, FaqResources, Gated } from "../../components/solutions/light/Modules";
import { SolutionDock, type DockLink } from "../../components/solutions/light/SolutionDock";

export const meta: MetaFunction = () => [
  { title: "Storage for offices & industrial units — GridEnergy" },
  { name: "description", content: "Silent backup that keeps shops, offices, and small industrial units running through cuts, with peak-tariff and demand savings. Run from GridOS." },
];

// TODO: audience imagery — reusing homes-*.png hero assets until office/industrial photography exists.
const HERO_SLIDES: HeroSlide[] = [
  { image: "/images/solutions/homes-small.png", eyebrow: "Retail & showrooms", kicker: "Storage for retail", title: "Keep the shop open through every cut.", sub: "Backup that holds your lights, billing counters, and POS the moment the grid drops, with no genset and no noise on the floor.",
    points: ["Backs up POS, lights, and chillers", "Silent LFP, no fumes on the floor", "Run from your phone via GridOS"],
    primary: { label: "Book a site survey", to: "/contact" }, secondary: { label: "Explore the range", to: "/products" } },
  { image: "/images/solutions/homes-apartment.png", eyebrow: "Small offices", kicker: "Storage for small offices", title: "Servers and people, never offline.", sub: "Clean, seamless backup for your servers, workstations, and network so a cut never costs you a working session.",
    points: ["Seamless switchover for servers and PCs", "Clean, stable output for sensitive gear", "Peak-tariff charging via GridOS"],
    primary: { label: "Book a site survey", to: "/contact" }, secondary: { label: "Explore the range", to: "/products" } },
  { image: "/images/solutions/homes-large.png", eyebrow: "Workshops & light industry", kicker: "Three-phase storage", title: "Three-phase backup for the shop floor.", sub: "Three-phase storage that rides through cuts and trims demand charges for workshops and small industrial units.",
    points: ["Three-phase backup for production load", "Peak shaving and demand savings", "Quieter and cleaner than a diesel genset"],
    primary: { label: "Book a site survey", to: "/contact" }, secondary: { label: "Explore the range", to: "/products" } },
  { image: "/images/solutions/homes-solar.png", eyebrow: "Clinics", kicker: "Storage for clinics", title: "Care that never waits for power.", sub: "Silent, reliable backup for clinics, where equipment and patients cannot wait for a genset to start.",
    points: ["Instant backup for critical equipment", "Silent and clean, no exhaust indoors", "Health monitored remotely in GridOS"],
    primary: { label: "Book a site survey", to: "/contact" }, secondary: { label: "Explore the range", to: "/products" } },
];

const DOCK_LINKS: DockLink[] = [
  { id: "what", label: "System" },
  { id: "outcomes", label: "Outcomes" },
  { id: "compare", label: "Compare" },
  { id: "gridos", label: "GridOS" },
  { id: "faq", label: "FAQ" },
];

export default function SolutionsOfficesIndustrial() {
  return (
    <div style={{ fontFamily: FONT, background: tokens.pageBg }}>
      <main>
        <HeroCarousel slides={HERO_SLIDES} />

        <TrustBar lead="Built on LFP chemistry and open standards" items={["Safer LFP cells", "Sealed, maintenance-free", "GridOS app control", "No vendor lock-in"]} />

        <SystemRows
          label="What it is"
          title="A battery, an inverter, solar-ready, run by software."
          intro="One sealed system replaces the genset and the box of parts in your utility room."
          features={[
            { kicker: "The battery", title: "Stores power for when you need it.", body: "Safe, long-life LFP cells store cheap, off-peak, or solar power and release it during cuts and expensive demand hours.", bullets: ["LFP chemistry, safe and long-lived", "Modular, add capacity as load grows", "Sealed and maintenance-free"], visual: "LFP battery module" },
            { kicker: "The inverter", title: "Switches over before work stops.", body: "An integrated inverter delivers clean power and hands over from grid to battery seamlessly when the supply drops.", bullets: ["Seamless switchover on an outage", "Clean output for servers and POS", "Single-phase or three-phase"], visual: "Integrated power unit" },
            { kicker: "GridOS", title: "The brain that makes it pay.", body: "GridOS decides when to charge, when to discharge, and how much to hold in reserve, and shows your consumption and savings from your phone.", bullets: ["Peak-tariff aware scheduling", "Demand and backup reserve protection", "Live monitoring and alerts"], visual: "GridOS dashboard" },
          ]}
        />

        <OutcomeGrid
          label="Outcomes"
          title="What you actually get."
          intro="Not a spec sheet. The things that change about running your operation."
          items={[
            { icon: ShieldCheck, title: "Backup that keeps you trading", body: "Lights, POS, servers, and critical load ride through outages with seamless switchover." },
            { icon: CurrencyInr, title: "Lower bills", body: "Peak shaving and tariff arbitrage cut your time-of-use and demand charges." },
            { icon: SpeakerSimpleX, title: "Silence", body: "No genset, no fumes, no noise on the shop floor or in the office." },
            { icon: ChartLineUp, title: "Visibility", body: "See consumption and savings, feeder by feeder, from your phone via GridOS." },
            { icon: BatteryChargingVertical, title: "Scales with you", body: "Modular capacity that grows from a single shop to a small industrial unit." },
            { icon: PlugsConnected, title: "Open integration", body: "Works with your solar and existing systems, with no vendor lock-in." },
          ]}
        />

        <Comparison
          title="Against the diesel genset you would otherwise run."
          intro="Same job, keeping your operation running through a cut. Two very different ways to live with it."
          usLabel="GridEnergy" themLabel="Diesel genset"
          rows={[
            { label: "Noise", us: "Silent", them: "Loud on the floor" },
            { label: "Fumes", us: "None", them: "Diesel exhaust" },
            { label: "Running cost", us: "Stored / solar power", them: "Diesel, every hour" },
            { label: "Switchover", us: "Seamless", them: "Manual / delayed" },
            { label: "Demand charges", us: "Shaved by software", them: "Untouched" },
            { label: "Control", us: "From your phone", them: "None" },
          ]}
        />

        <HowItWorks eyebrow="How buying works" title="From enquiry to your app, in three steps." media="Buying flow visual"
          steps={[
            { t: "Free site survey", b: "We assess your load, tariff, and backup needs at your site, no obligation." },
            { t: "Custom proposal", b: "A sized system, the real economics, and a clear quote built around your tariff and demand profile." },
            { t: "Pro install & app", b: "Authorised install and commissioning, then GridOS set up for your team." },
          ]}
        />

        <StatBand title="The honest numbers, once they are yours." lead="We size to your tariff, load, and demand profile and show real figures at survey. Subsidies, where you qualify, come on top."
          stats={[
            { value: <Gated note="compute payback model per site profile">—</Gated>, label: "Typical payback" },
            { value: <Gated note="compute demand-charge saving model">—</Gated>, label: "Demand savings" },
            { value: <Gated note="cite applicable commercial / industrial scheme + eligibility">—</Gated>, label: "Subsidy support" },
          ]}
        />

        <CustomerSwitcher title="Sized for every kind of site."
          cases={[
            { tab: "Retail", name: "Retail", visual: "Install photo TBD", blurb: "A shop that keeps billing, lights, and chillers running through every cut.", products: ["Nano", "GridOS"], stats: [{ value: <Gated note="backup hours">—</Gated>, label: "Counter-load backup" }, { value: <Gated note="bill saving">—</Gated>, label: "Monthly bill saving" }] },
            { tab: "Office", name: "Office", visual: "Install photo TBD", blurb: "An office whose servers and people never lose a working session.", products: ["Micro", "GridOS"], stats: [{ value: <Gated note="backup hours">—</Gated>, label: "Server backup" }, { value: <Gated note="bill saving">—</Gated>, label: "Annual bill saving" }] },
            { tab: "Workshop", name: "Workshop", visual: "Install photo TBD", blurb: "A workshop that rides cuts and trims its demand charges in silence.", products: ["Micro", "GridOS"], stats: [{ value: <Gated note="peak shaving">—</Gated>, label: "Demand reduction" }, { value: <Gated note="diesel offset">—</Gated>, label: "Diesel offset" }] },
          ]}
        />

        <AppShowcase label="GridOS" title="The software layer most installers don't give you." intro="A battery is hardware. GridOS is the software that turns it into savings, and keeps you in control of every feeder." visual="GridOS app"
          features={["Live state of charge, grid, and solar", "Backup reserve held automatically", "Peak-tariff charge and discharge", "Consumption and savings per feeder"]}
        />

        <FaqResources eyebrow="Questions" title="The objections, answered honestly." lead="Learn how storage works for your site."
          faqs={[
            { q: "How is this better than a genset?", a: "It replaces the genset with one silent, sealed LFP system, adds seamless switchover, shaves your demand charges, and is managed from your phone. No fuel, no exhaust, no monthly servicing visit." },
            { q: "Will it run my three-phase load?", a: "Yes, single-phase and three-phase systems are both available. We confirm exactly what your system runs, and for how long, at the site survey." },
            { q: "Can it cut my demand charges?", a: "GridOS discharges the battery during your peak windows to shave demand and time-of-use charges. The exact saving depends on your tariff and load, which we model at survey." },
            { q: "What is the warranty?", a: <Gated note="add real warranty years + cycles">Exact years and cycle terms: TBD</Gated> },
            { q: "What about maintenance?", a: "Sealed and effectively maintenance-free, with health monitored remotely through GridOS. No genset servicing, no fuel runs, no battery top-ups." },
          ]}
          resources={[
            { kind: "Guide", title: "How storage cuts a commercial bill", body: "Backup, peak shaving, and tariff arbitrage: what a storage system does for a business, in plain language.", to: "/support" },
            { kind: "Explainer", title: "Demand charges, and how to shave them", body: "Why demand charges inflate a commercial bill, and how software-managed storage reduces them.", to: "/support" },
            { kind: "Checklist", title: "What to ask before you replace a genset", body: "The questions that separate a real backup system from a repackaged inverter.", to: "/support" },
          ]}
        />

        <FramedCTA title="Ready to stop running on diesel?" sub="Book a free site survey. No obligation, no call to qualify."
          primary={{ label: "Book a site survey", to: "/contact" }} secondary={{ label: "Explore the range", to: "/products" }} />
      </main>

      <SolutionDock label="Offices & industrial" links={DOCK_LINKS}
        secondary={{ label: "Catalog", to: "/products" }} primary={{ label: "Get a quote", to: "/contact" }} />
    </div>
  );
}
