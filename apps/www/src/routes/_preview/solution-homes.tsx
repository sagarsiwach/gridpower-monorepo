/*
  /preview/solution-homes — the canonical solution page, assembled.

  All 13 blocks in order, in one restrained language (olive + GridRed), merging
  the Blocks library with the Stripe-distilled Modules (HowItWorks, StatBand,
  CustomerSwitcher, FaqResources) and the floating SolutionDock (block 13).
  This is the template; the other four audiences are the same skeleton, different
  content. Sample content; numbers gated. Internal route: noindex.
*/

import type { MetaFunction } from "react-router";
import {
  HouseLine, House, Buildings, Sun, BatteryChargingVertical, CurrencyInr,
  SpeakerSimpleX, DeviceMobile, ShieldCheck, Leaf,
} from "@phosphor-icons/react";
import { GlobalHeader } from "../../components/site/GlobalHeader";
import { SiteFooter } from "../../components/site/SiteFooter";
import { tokens } from "./_v3-tokens";
import { FONT } from "../../components/solutions/light/atoms";
import {
  SolutionHero, TrustBar, RangeGrid, SystemRows, OutcomeGrid, Comparison, AppShowcase, FramedCTA,
} from "../../components/solutions/light/Blocks";
import { HowItWorks, StatBand, CustomerSwitcher, FaqResources, Gated } from "../../components/solutions/light/Modules";
import { SolutionDock, type DockLink } from "../../components/solutions/light/SolutionDock";

export const meta: MetaFunction = () => [
  { title: "Solution page — Homes (assembled, internal)" },
  { name: "robots", content: "noindex" },
];

const DOCK_LINKS: DockLink[] = [
  { id: "range", label: "Range" },
  { id: "what", label: "System" },
  { id: "outcomes", label: "Outcomes" },
  { id: "compare", label: "Compare" },
  { id: "gridos", label: "GridOS" },
  { id: "faq", label: "FAQ" },
];

export default function SolutionHomes() {
  return (
    <div style={{ fontFamily: FONT, background: tokens.pageBg }}>
      <div style={{ position: "sticky", top: 0, zIndex: 60, background: "oklch(98.8% 0.003 106.5 / 0.85)", backdropFilter: "saturate(180%) blur(12px)", borderBottom: `1px solid ${tokens.hairline}` }}>
        <div style={{ maxWidth: 1180, marginInline: "auto", paddingInline: 28, paddingBlock: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: tokens.ink }}>Assembled solution page · Homes · 13 blocks</span>
          <span style={{ fontFamily: "monospace", fontSize: 11, color: tokens.muted }}>restrained · sample content</span>
        </div>
      </div>

      <div className="hidden lg:contents"><GlobalHeader /></div>

      {/* 1 */}
      <SolutionHero
        eyebrow="Home energy storage"
        title="Silent, lifetime power for your whole home."
        sub="One sealed system replaces your inverter, battery, and genset. Backs up your home, cuts your bill, and finally makes your solar worth it."
        chips={["Runs your ACs", "Seamless switchover", "Managed from your phone"]}
        primary={{ label: "Book a free site survey", to: "/contact" }}
        secondary={{ label: "Explore the range", to: "/products" }}
        visual="GridOS app + Nano unit"
      />

      {/* 2 */}
      <TrustBar lead="Built on LFP chemistry and open standards" items={["Safer LFP cells", "Sealed, maintenance-free", "GridOS app control", "No vendor lock-in"]} />

      {/* 3 */}
      <RangeGrid
        label="Range"
        title="Storage sized to your home."
        intro="Pick the home that looks like yours. Each is powered by the right GridEnergy product and the same GridOS software."
        items={[
          { icon: HouseLine, name: "Apartment / flat", sub: "Compact storage for essential-load backup." },
          { icon: House, name: "Small home", sub: "Whole-home essentials and a couple of ACs." },
          { icon: Buildings, name: "Large home / villa", sub: "Whole-villa backup, often 3-phase." },
          { icon: Sun, name: "Solar + storage", sub: "Bank your solar, run on it after dark." },
        ]}
      />

      {/* 4 */}
      <SystemRows
        label="What it is"
        title="A battery, an inverter, solar-ready, run by software."
        intro="One sealed system replaces the box of parts in your utility room."
        features={[
          { kicker: "The battery", title: "Stores power for when you need it.", body: "Safe, long-life LFP cells store cheap, off-peak, or solar power and release it during cuts and expensive hours.", bullets: ["LFP chemistry, safe and long-lived", "Modular, add capacity later", "Sealed and maintenance-free"], visual: "LFP battery module" },
          { kicker: "The inverter", title: "Switches over before you notice.", body: "An integrated inverter delivers clean power and hands over from grid to battery seamlessly when the supply drops.", bullets: ["Seamless switchover on an outage", "Clean, stable output", "One unit, no separate inverter"], visual: "Integrated power unit" },
          { kicker: "GridOS", title: "The brain that makes it pay.", body: "GridOS decides when to charge, when to discharge, and how much to hold in reserve, and shows you everything from your phone.", bullets: ["Tariff-aware scheduling", "Backup reserve protection", "Live monitoring and alerts"], visual: "GridOS dashboard" },
        ]}
      />

      {/* 5 */}
      <OutcomeGrid
        label="Outcomes"
        title="What you actually get."
        intro="Not a spec sheet. The things that change about living with your power."
        items={[
          { icon: BatteryChargingVertical, title: "Backup that runs your home", body: "Whole-home or essentials, including your ACs, with seamless switchover when the grid drops." },
          { icon: CurrencyInr, title: "Lower bills", body: "Store cheap or solar power and use it at peak-tariff hours." },
          { icon: SpeakerSimpleX, title: "Silence", body: "No genset, no fumes, no noise. It just works." },
          { icon: DeviceMobile, title: "Smart", body: "Monitor and control everything from your phone via GridOS." },
          { icon: ShieldCheck, title: "Safe", body: "LFP chemistry, the safer, longer-lived battery type." },
          { icon: Leaf, title: "Independence", body: "Less grid, less diesel, more control over your own power." },
        ]}
      />

      {/* 6 */}
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

      {/* 7 */}
      <HowItWorks eyebrow="How buying works" title="From enquiry to your app, in three steps." media="Buying flow visual"
        steps={[
          { t: "Free site survey", b: "We assess your load, roof, and backup needs at your place, no obligation." },
          { t: "Custom proposal", b: "A sized system, the real economics, and a clear quote built around your tariff." },
          { t: "Pro install & app", b: "Authorised install and commissioning, then GridOS set up on your phone." },
        ]}
      />

      {/* 8 */}
      <StatBand title="The honest numbers, once they are yours." lead="We size to your tariff and load and show real figures at survey. Subsidies, where you qualify, come on top."
        stats={[
          { value: <Gated note="compute payback model per home profile">—</Gated>, label: "Typical payback" },
          { value: <Gated note="compute lifetime savings model">—</Gated>, label: "Lifetime savings" },
          { value: <Gated note="cite PM Surya Ghar / state scheme + eligibility">—</Gated>, label: "Subsidy support" },
        ]}
      />

      {/* 9 */}
      <CustomerSwitcher title="Sized for every kind of home."
        cases={[
          { tab: "Apartment", name: "Apartment", visual: "Install photo TBD", blurb: "A flat that keeps the essentials and a room cool through every cut.", products: ["Nano", "GridOS"], stats: [{ value: <Gated note="backup hours">—</Gated>, label: "Essential-load backup" }, { value: <Gated note="bill saving">—</Gated>, label: "Monthly bill saving" }] },
          { tab: "Villa", name: "Villa", visual: "Install photo TBD", blurb: "A villa that rides every cut in silence, ACs included.", products: ["Nano", "GridOS"], stats: [{ value: <Gated note="backup hours">—</Gated>, label: "Whole-home backup" }, { value: <Gated note="bill saving">—</Gated>, label: "Annual bill saving" }] },
          { tab: "Solar home", name: "Solar home", visual: "Install photo TBD", blurb: "A rooftop-solar home that finally runs on its own power after dark.", products: ["Nano", "GridOS"], stats: [{ value: <Gated note="solar self-use">—</Gated>, label: "Solar self-use" }, { value: <Gated note="grid independence">—</Gated>, label: "Grid independence" }] },
        ]}
      />

      {/* 10 */}
      <AppShowcase label="GridOS" title="The smart layer most installers don't give you." intro="A battery is hardware. GridOS is the software that turns it into savings, and keeps you in control." visual="GridOS app"
        features={["Live state of charge, grid, and solar", "Backup reserve held automatically", "Tariff-aware charge and discharge", "Outage alerts and savings on your phone"]}
      />

      {/* 11 */}
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

      {/* 12 */}
      <FramedCTA title="Ready to never sit in the dark again?" sub="Book a free site survey. No obligation, no call to qualify."
        primary={{ label: "Book a free site survey", to: "/contact" }} secondary={{ label: "Explore the range", to: "/products" }} />

      <SiteFooter />

      {/* 13 */}
      <SolutionDock label="Home storage" links={DOCK_LINKS} cta={{ label: "Book a survey", to: "/contact" }} />
    </div>
  );
}
