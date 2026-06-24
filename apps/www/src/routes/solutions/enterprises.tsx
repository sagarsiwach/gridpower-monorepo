/*
  /solutions/enterprises — the Enterprises category landing page.

  Built from the canonical block library (Blocks + Stripe-distilled Modules) in
  the locked restrained language (olive + GridRed, Inter), with the unified
  SolutionDock. Mirrors the homes.tsx template exactly. Audience: larger
  corporate and multi-site commercial estates. Product class: Mega / Giga.
  Numbers route through <Gated>. The global header + footer come from root.tsx.
*/

import type { MetaFunction } from "react-router";
import {
  ShieldCheck, CurrencyInr, SpeakerSimpleX, ChartLineUp, Network, Leaf,
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
  { title: "Storage for enterprises — GridEnergy" },
  { name: "description", content: "Demand-charge management, UPS and genset replacement, and multi-site fleet visibility for corporate and commercial estates. Run from GridOS." },
];

// TODO: audience imagery — reusing homes-*.png hero assets until enterprise photography exists.
const HERO_SLIDES: HeroSlide[] = [
  { image: "/images/solutions/homes-large.png", eyebrow: "Corporate campuses", kicker: "Storage for campuses", title: "Resilience for the whole campus.", sub: "Demand-charge management and critical-load backup for a corporate campus, run as one system from GridOS.",
    points: ["Critical-load backup with reserve", "Demand-charge management across the campus", "One operator view in GridOS"],
    primary: { label: "Talk to our team", to: "/contact" }, secondary: { label: "Explore the range", to: "/products" } },
  { image: "/images/solutions/homes-small.png", eyebrow: "Multi-site retail", kicker: "Multi-site storage", title: "Every store, one console.", sub: "Backup and tariff savings at each location, rolled up into a single fleet view across every store.",
    points: ["Backup and savings per location", "Fleet visibility across every site", "Per-site cost and energy ledger"],
    primary: { label: "Talk to our team", to: "/contact" }, secondary: { label: "Explore the range", to: "/products" } },
  { image: "/images/solutions/homes-apartment.png", eyebrow: "Data-adjacent loads", kicker: "Storage for critical loads", title: "Clean, uninterrupted critical power.", sub: "UPS and genset replacement for data-adjacent and other loads where switchover and power quality cannot slip.",
    points: ["Seamless transfer for critical load", "Clean, stable output", "Replaces UPS and genset duty"],
    primary: { label: "Talk to our team", to: "/contact" }, secondary: { label: "Explore the range", to: "/products" } },
  { image: "/images/solutions/homes-solar.png", eyebrow: "Manufacturing", kicker: "Storage for manufacturing", title: "Hold the line, cut the peaks.", sub: "Three-phase backup and demand-charge management for manufacturing sites, with ESG reporting from GridOS.",
    points: ["Three-phase backup for production", "Demand-charge management", "Resilience and ESG reporting in GridOS"],
    primary: { label: "Talk to our team", to: "/contact" }, secondary: { label: "Explore the range", to: "/products" } },
];

const DOCK_LINKS: DockLink[] = [
  { id: "what", label: "System" },
  { id: "outcomes", label: "Outcomes" },
  { id: "compare", label: "Compare" },
  { id: "gridos", label: "GridOS" },
  { id: "faq", label: "FAQ" },
];

export default function SolutionsEnterprises() {
  return (
    <div style={{ fontFamily: FONT, background: tokens.pageBg }}>
      <main>
        <HeroCarousel slides={HERO_SLIDES} />

        <TrustBar lead="Built on LFP chemistry and open standards" items={["Safer LFP cells", "Sealed, maintenance-free", "GridOS fleet console", "No vendor lock-in"]} />

        <SystemRows
          label="What it is"
          title="A battery, an inverter, solar-ready, run by software."
          intro="One sealed system replaces the UPS and genset duty at each site, and reports to one console."
          features={[
            { kicker: "The battery", title: "Stores power at the scale you run.", body: "Safe, long-life LFP cells store off-peak or solar power and release it during cuts and expensive demand windows, sized for larger loads.", bullets: ["LFP chemistry, safe and long-lived", "Modular Mega and Giga capacity", "Sealed and maintenance-free"], visual: "LFP battery rack" },
            { kicker: "The inverter", title: "Transfers without a flicker.", body: "An integrated inverter delivers clean power and hands over from grid to battery seamlessly when the supply drops, protecting sensitive load.", bullets: ["Seamless transfer for critical load", "Clean, stable three-phase output", "Replaces UPS and genset duty"], visual: "Integrated power unit" },
            { kicker: "GridOS", title: "The console for the whole estate.", body: "GridOS schedules charge and discharge against your tariff, manages demand, and rolls every site into one operator view with reporting.", bullets: ["Demand-charge management", "Multi-site fleet visibility", "Resilience and ESG reporting"], visual: "GridOS fleet console" },
          ]}
        />

        <OutcomeGrid
          label="Outcomes"
          title="What you actually get."
          intro="Not a spec sheet. The things that change about running power across the estate."
          items={[
            { icon: ShieldCheck, title: "Resilience you can sign off on", body: "Critical load protected with seamless transfer and held reserve at every site." },
            { icon: CurrencyInr, title: "Demand-charge management", body: "Software shaves peak demand and time-of-use charges across the fleet." },
            { icon: Network, title: "One console, every site", body: "Roll up sites into a single operator view with a per-site cost ledger." },
            { icon: SpeakerSimpleX, title: "UPS and genset replacement", body: "Cut fuel, noise, and emissions while clean power keeps load running." },
            { icon: ChartLineUp, title: "Power quality", body: "Clean, stable supply for sensitive corporate and production equipment." },
            { icon: Leaf, title: "Resilience and ESG reporting", body: "GridOS reports energy, savings, and emissions for your ESG disclosures." },
          ]}
        />

        <Comparison
          title="Against the UPS and genset fleet you would otherwise run."
          intro="Same job, keeping every site up through a cut. Two very different ways to run it at scale."
          usLabel="GridEnergy" themLabel="UPS + genset"
          rows={[
            { label: "Noise", us: "Silent", them: "Loud gensets" },
            { label: "Fumes", us: "None", them: "Diesel exhaust" },
            { label: "Running cost", us: "Stored / solar power", them: "Diesel, every hour" },
            { label: "Demand charges", us: "Managed by software", them: "Untouched" },
            { label: "Fleet view", us: "One GridOS console", them: "Site by site" },
            { label: "ESG reporting", us: "Built in", them: "Manual" },
          ]}
        />

        <HowItWorks eyebrow="How buying works" title="From enquiry to a live fleet, in three steps." media="Rollout flow visual"
          steps={[
            { t: "Site and load assessment", b: "We assess load, tariff, and resilience needs across your sites, no obligation." },
            { t: "Sized proposal", b: "A sized system per site, the real economics, and a clear quote built around your demand profile." },
            { t: "Rollout & console", b: "Authorised install and commissioning, then GridOS set up as one console for your team." },
          ]}
        />

        <StatBand title="The honest numbers, once they are yours." lead="We size to your tariff, load, and resilience needs and show real figures at assessment. Subsidies, where you qualify, come on top."
          stats={[
            { value: <Gated note="compute payback model per estate profile">—</Gated>, label: "Typical payback" },
            { value: <Gated note="compute demand-charge saving model">—</Gated>, label: "Demand savings" },
            { value: <Gated note="cite applicable commercial / industrial scheme + eligibility">—</Gated>, label: "Subsidy support" },
          ]}
        />

        <CustomerSwitcher title="Sized for every kind of estate."
          cases={[
            { tab: "Campus", name: "Campus", visual: "Install photo TBD", blurb: "A corporate campus with critical-load backup and managed demand, run as one system.", products: ["Mega", "GridOS"], stats: [{ value: <Gated note="backup hours">—</Gated>, label: "Critical-load backup" }, { value: <Gated note="demand reduction">—</Gated>, label: "Demand reduction" }] },
            { tab: "Retail fleet", name: "Retail fleet", visual: "Install photo TBD", blurb: "A retail chain with backup and savings at every store, rolled into one fleet view.", products: ["Mega", "GridOS"], stats: [{ value: <Gated note="sites managed">—</Gated>, label: "Sites in one console" }, { value: <Gated note="annual saving">—</Gated>, label: "Annual fleet saving" }] },
            { tab: "Manufacturing", name: "Manufacturing", visual: "Install photo TBD", blurb: "A manufacturing site that holds production through cuts and trims its demand charges.", products: ["Giga", "GridOS"], stats: [{ value: <Gated note="peak shaving">—</Gated>, label: "Peak demand shaved" }, { value: <Gated note="diesel offset">—</Gated>, label: "Diesel offset" }] },
          ]}
        />

        <AppShowcase label="GridOS" title="One console for the whole estate." intro="A battery is hardware. GridOS is the software that turns a fleet of systems into managed demand, resilience, and reporting." visual="GridOS fleet console"
          features={["Multi-site fleet visibility", "Demand-charge management", "Per-site cost and energy ledger", "Resilience and ESG reporting"]}
        />

        <FaqResources eyebrow="Questions" title="The objections, answered honestly." lead="Learn how storage works across an estate."
          faqs={[
            { q: "Can it replace our UPS and gensets?", a: "Yes. One sealed LFP system covers UPS-grade transfer and genset-duty backup, with clean output for sensitive load. No fuel, no exhaust, no monthly servicing visit." },
            { q: "How does multi-site rollup work?", a: "Each site reports to GridOS, which rolls them into one operator view with a per-site cost and energy ledger. You manage the whole fleet from a single console." },
            { q: "Does it help with demand charges and ESG?", a: "GridOS shaves peak demand and time-of-use charges, and reports energy, savings, and emissions for your ESG disclosures. The exact saving depends on your tariff and load, which we model at assessment." },
            { q: "What is the warranty?", a: <Gated note="add real warranty years + cycles">Exact years and cycle terms: TBD</Gated> },
            { q: "What about maintenance?", a: "Sealed and effectively maintenance-free, with health monitored remotely through GridOS across every site. No genset servicing, no fuel runs." },
          ]}
          resources={[
            { kind: "Guide", title: "How storage cuts an enterprise bill", body: "Demand-charge management, peak shaving, and tariff arbitrage across an estate, in plain language.", to: "/support" },
            { kind: "Explainer", title: "UPS and genset replacement, done right", body: "Why one storage system can cover both UPS-grade transfer and genset-duty backup.", to: "/support" },
            { kind: "Checklist", title: "What to ask before a multi-site rollout", body: "The questions that separate a real fleet platform from a box of disconnected systems.", to: "/support" },
          ]}
        />

        <FramedCTA title="Ready to run your estate on managed power?" sub="Talk to our team. No obligation, no call to qualify."
          primary={{ label: "Talk to our team", to: "/contact" }} secondary={{ label: "Explore the range", to: "/products" }} />
      </main>

      <SolutionDock label="Enterprises" links={DOCK_LINKS}
        secondary={{ label: "Catalog", to: "/products" }} primary={{ label: "Get a quote", to: "/contact" }} />
    </div>
  );
}
