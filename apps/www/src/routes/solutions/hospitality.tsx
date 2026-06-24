/*
  /solutions/hospitality — the Hospitality category landing page (live, navbar target).

  Hotels, resorts, restaurants, and banquet halls. Built from the canonical block
  library (Blocks + Modules) in the locked restrained language (olive + GridRed,
  Inter), with the unified SolutionDock. Mirrors homes.tsx structure exactly.
  Numbers route through <Gated>. The global header + footer come from root.tsx.

  TODO: audience imagery — reusing homes-*.png hero assets until hospitality
  photography is shot. Replace the /images/solutions/homes-*.png paths below.
*/

import type { MetaFunction } from "react-router";
import {
  BatteryChargingVertical, CurrencyInr, SpeakerSimpleX, DeviceMobile, ShieldCheck, Snowflake,
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
  { title: "Energy storage for hotels & restaurants — GridEnergy" },
  { name: "description", content: "Silent backup that keeps guest comfort, kitchens, and lifts running through every cut, cuts peak-tariff bills, and shows every property in GridOS." },
];

const HERO_SLIDES: HeroSlide[] = [
  // TODO: audience imagery — homes-apartment.png stands in for a boutique-hotel shot
  { image: "/images/solutions/homes-apartment.png", eyebrow: "Boutique hotels", kicker: "Hotel energy storage", title: "Guests never feel the cut.", sub: "Silent storage keeps rooms cool, lifts moving, and lights steady the moment the grid drops, with no genset roar near guests.",
    points: ["Seamless switchover, no AC drop or flicker", "Silent LFP, no genset noise near rooms", "Run from your phone through GridOS"],
    primary: { label: "Book a site survey", to: "/contact" }, secondary: { label: "Explore the range", to: "/products" } },
  // TODO: audience imagery — homes-large.png stands in for a resort shot
  { image: "/images/solutions/homes-large.png", eyebrow: "Resorts", kicker: "Three-phase property storage", title: "Backup across the whole property.", sub: "Three-phase backup for spread-out resort blocks, kitchens, and cold storage, with one view of every property in GridOS.",
    points: ["Whole-property, three-phase backup", "Kitchen and cold-storage protection", "Multi-property view in GridOS"],
    primary: { label: "Book a site survey", to: "/contact" }, secondary: { label: "Explore the range", to: "/products" } },
  // TODO: audience imagery — homes-small.png stands in for a restaurant shot
  { image: "/images/solutions/homes-small.png", eyebrow: "Restaurants & cafes", kicker: "Kitchen and cold-storage backup", title: "Keep the kitchen running.", sub: "Backup for cold storage, refrigeration, and service through a cut, with peak-tariff savings the rest of the day.",
    points: ["Cold storage and refrigeration backup", "Quiet service, no genset in the alley", "Peak-tariff savings via GridOS"],
    primary: { label: "Book a site survey", to: "/contact" }, secondary: { label: "Explore the range", to: "/products" } },
  // TODO: audience imagery — homes-solar.png stands in for a banquet/events shot
  { image: "/images/solutions/homes-solar.png", eyebrow: "Banquet & events", kicker: "Event-grade backup", title: "Never lose power mid-event.", sub: "Silent, seamless backup for banquet halls and event venues, so lighting, sound, and AC hold through any cut.",
    points: ["Seamless backup mid-event", "Silent, no genset near guests", "Tariff-smart charging via GridOS"],
    primary: { label: "Book a site survey", to: "/contact" }, secondary: { label: "Explore the range", to: "/products" } },
];

const DOCK_LINKS: DockLink[] = [
  { id: "what", label: "System" },
  { id: "outcomes", label: "Outcomes" },
  { id: "compare", label: "Compare" },
  { id: "gridos", label: "GridOS" },
  { id: "faq", label: "FAQ" },
];

export default function SolutionsHospitality() {
  return (
    <div style={{ fontFamily: FONT, background: tokens.pageBg }}>
      <main>
        <HeroCarousel slides={HERO_SLIDES} />

        <TrustBar lead="Built on LFP chemistry and open standards" items={["Safer LFP cells", "Sealed, maintenance-free", "GridOS app control", "No vendor lock-in"]} />

        <SystemRows
          label="What it is"
          title="A battery, an inverter, solar-ready, run by software."
          intro="One sealed system replaces the genset and switchgear in your plant room."
          features={[
            { kicker: "The battery", title: "Stores power for when guests need it.", body: "Safe, long-life LFP cells store cheap, off-peak, or solar power and release it during cuts and expensive peak hours.", bullets: ["LFP chemistry, safe and long-lived", "Modular, add capacity per property", "Sealed and maintenance-free"], visual: "LFP battery module" },
            { kicker: "The inverter", title: "Switches over before a guest notices.", body: "An integrated inverter delivers clean power and hands over from grid to battery seamlessly, so ACs, lifts, and lights never flicker.", bullets: ["Seamless switchover on an outage", "Clean, stable output for sensitive kit", "Micro and Mega units for any load"], visual: "Integrated power unit" },
            { kicker: "GridOS", title: "Every property, one screen.", body: "GridOS decides when to charge, when to discharge, and how much to hold in reserve, and shows every site from one dashboard.", bullets: ["Tariff-aware scheduling", "Backup reserve protection", "Multi-property monitoring and alerts"], visual: "GridOS dashboard" },
          ]}
        />

        <OutcomeGrid
          label="Outcomes"
          title="What you actually get."
          intro="Not a spec sheet. The things that change about running a property through a cut."
          items={[
            { icon: BatteryChargingVertical, title: "Backup guests never feel", body: "Rooms, lifts, and lights stay on with seamless switchover when the grid drops." },
            { icon: SpeakerSimpleX, title: "Silence near guests", body: "No genset roar by the rooms or the dining terrace. It just works." },
            { icon: Snowflake, title: "Kitchen and cold storage protected", body: "Refrigeration and cold storage ride through outages without spoilage." },
            { icon: CurrencyInr, title: "Lower peak-tariff bills", body: "Store cheap or solar power and use it through expensive peak hours." },
            { icon: DeviceMobile, title: "Multi-property view", body: "Monitor and control every site from one GridOS dashboard." },
            { icon: ShieldCheck, title: "Safe", body: "LFP chemistry, the safer, longer-lived battery type, with no fuel on site." },
          ]}
        />

        <Comparison
          title="Against the diesel genset you would otherwise run."
          intro="Same job, backing the property through a cut. Two very different ways to live with it near guests."
          usLabel="GridEnergy" themLabel="Diesel genset"
          rows={[
            { label: "Noise near guests", us: "Silent", them: "Loud" },
            { label: "Fumes", us: "None", them: "Diesel exhaust" },
            { label: "Running cost", us: "Stored / solar power", them: "Diesel, every hour" },
            { label: "Switchover", us: "Seamless", them: "Manual / delayed" },
            { label: "Servicing", us: "Remote, maintenance-free", them: "Regular, hands-on" },
            { label: "Multi-property view", us: "One dashboard", them: "None" },
          ]}
        />

        <HowItWorks eyebrow="How buying works" title="From enquiry to your app, in three steps." media="Buying flow visual"
          steps={[
            { t: "Free site survey", b: "We assess each property's load, roof, and backup needs on site, no obligation." },
            { t: "Custom proposal", b: "A sized system per property, the real economics, and a clear quote built around your tariff." },
            { t: "Pro install & app", b: "Authorised install and commissioning, then GridOS set up across your properties." },
          ]}
        />

        <StatBand title="The honest numbers, once they are yours." lead="We size to your tariff and load and show real figures at survey. Subsidies, where you qualify, come on top."
          stats={[
            { value: <Gated note="compute payback model per property profile">—</Gated>, label: "Typical payback" },
            { value: <Gated note="compute lifetime savings model">—</Gated>, label: "Lifetime savings" },
            { value: <Gated note="cite applicable C&I / state scheme + eligibility">—</Gated>, label: "Subsidy support" },
          ]}
        />

        <CustomerSwitcher title="Sized for every kind of property."
          cases={[
            { tab: "Boutique hotel", name: "Boutique hotel", visual: "Install photo TBD", blurb: "A hotel where rooms stay cool and lifts keep moving through every cut.", products: ["Micro", "GridOS"], stats: [{ value: <Gated note="backup hours">—</Gated>, label: "Room-load backup" }, { value: <Gated note="bill saving">—</Gated>, label: "Monthly bill saving" }] },
            { tab: "Resort", name: "Resort", visual: "Install photo TBD", blurb: "A spread-out resort backed block by block, with one view of every site.", products: ["Mega", "GridOS"], stats: [{ value: <Gated note="backup hours">—</Gated>, label: "Whole-property backup" }, { value: <Gated note="bill saving">—</Gated>, label: "Annual bill saving" }] },
            { tab: "Restaurant", name: "Restaurant", visual: "Install photo TBD", blurb: "A kitchen and cold store that ride every cut without spoilage or a genset.", products: ["Micro", "GridOS"], stats: [{ value: <Gated note="cold-storage backup hours">—</Gated>, label: "Cold-storage backup" }, { value: <Gated note="peak-tariff saving">—</Gated>, label: "Peak-tariff saving" }] },
          ]}
        />

        <AppShowcase label="GridOS" title="The smart layer most installers don't give you." intro="A battery is hardware. GridOS is the software that turns it into savings and keeps every property in view." visual="GridOS app"
          features={["Live state of charge, grid, and solar per site", "Backup reserve held automatically", "Tariff-aware charge and discharge", "Outage alerts and savings across properties"]}
        />

        <FaqResources eyebrow="Questions" title="The objections, answered honestly." lead="Learn how property storage works."
          faqs={[
            { q: "Will guests hear or smell it?", a: "No. It is a silent, sealed LFP system with no fuel and no exhaust, so it can sit near rooms, kitchens, or a dining terrace without the roar or fumes of a genset." },
            { q: "Will it hold an event or a full kitchen?", a: "From critical loads up to whole-property including ACs, lifts, and cold storage, depending on the size you choose between Micro and Mega. We confirm exactly what each system runs, and for how long, at the survey." },
            { q: "Can I see all my properties together?", a: "Yes. GridOS shows every site from one dashboard, with live state of charge, backup reserve, and alerts per property." },
            { q: "What is the warranty?", a: <Gated note="add real warranty years + cycles">Exact years and cycle terms: TBD</Gated> },
            { q: "What about maintenance?", a: "Sealed and effectively maintenance-free, with health monitored remotely through GridOS. No genset servicing, no fuel logistics." },
          ]}
          resources={[
            { kind: "Guide", title: "How property storage actually works", body: "Backup, peak-tariff savings, and solar self-use for hospitality, in plain language.", to: "/support" },
            { kind: "Explainer", title: "Why guests never feel the cut", body: "How seamless switchover keeps ACs, lifts, and lights steady through an outage.", to: "/support" },
            { kind: "Checklist", title: "What to ask before you buy backup", body: "The questions that separate real silent backup from a repackaged genset.", to: "/support" },
          ]}
        />

        <FramedCTA title="Ready to keep guests comfortable through every cut?" sub="Book a free site survey. No obligation, no call to qualify."
          primary={{ label: "Book a free site survey", to: "/contact" }} secondary={{ label: "Explore the range", to: "/products" }} />
      </main>

      <SolutionDock label="Hospitality storage" links={DOCK_LINKS}
        secondary={{ label: "Catalog", to: "/products" }} primary={{ label: "Get a quote", to: "/contact" }} />
    </div>
  );
}
