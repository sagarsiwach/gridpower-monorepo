/*
  /preview/all-blocks — every block we've built, one page, one language.

  The full restrained library: the Blocks set + the Stripe-distilled Modules +
  the floating dock, each labelled. This is the complete menu of options to
  assemble solution pages from. Sample content; numbers gated. Internal: noindex.
*/

import type { MetaFunction } from "react-router";
import {
  HouseLine, House, Buildings, Sun, Storefront, Factory,
  BatteryChargingVertical, CurrencyInr, SpeakerSimpleX, DeviceMobile, ShieldCheck, Leaf,
} from "@phosphor-icons/react";
import { GlobalHeader } from "../../components/site/GlobalHeader";
import { SiteFooter } from "../../components/site/SiteFooter";
import { tokens } from "./_v3-tokens";
import { FONT, MONO } from "../../components/solutions/light/atoms";
import {
  SolutionHero, TrustBar, RangeGrid, SystemRows, OutcomeGrid, Comparison, AppShowcase, FramedCTA,
} from "../../components/solutions/light/Blocks";
import {
  FaqResources, CustomerSwitcher, CapabilityTiers, HowItWorks, StatBand, StoryCards, Gated,
} from "../../components/solutions/light/Modules";
import { SolutionDock, type DockLink } from "../../components/solutions/light/SolutionDock";

export const meta: MetaFunction = () => [
  { title: "All blocks — full library (internal)" },
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

function Labeled({ name, origin, children }: { name: string; origin: string; children: React.ReactNode }) {
  return (
    <div style={{ position: "relative" }}>
      <div style={{ position: "sticky", top: 0, zIndex: 30, maxWidth: 1180, marginInline: "auto", paddingInline: 28 }}>
        <span style={{ display: "inline-flex", gap: 8, alignItems: "center", transform: "translateY(14px)", fontFamily: MONO, fontSize: 10.5, letterSpacing: "0.06em", color: tokens.brand, background: tokens.card, border: `1px solid ${tokens.hairline}`, borderRadius: 6, padding: "3px 9px" }}>
          {name} <span style={{ color: tokens.muted }}>· {origin}</span>
        </span>
      </div>
      {children}
    </div>
  );
}

export default function AllBlocks() {
  return (
    <div style={{ fontFamily: FONT, background: tokens.pageBg }}>
      <div className="hidden lg:contents"><GlobalHeader /></div>

      <Labeled name="SolutionHero" origin="Blocks · hero (split)">
        <SolutionHero eyebrow="Home energy storage" title="Silent, lifetime power for your whole home."
          sub="One sealed system replaces your inverter, battery, and genset. Backs up your home, cuts your bill, and finally makes your solar worth it."
          chips={["Runs your ACs", "Seamless switchover", "Managed from your phone"]}
          primary={{ label: "Book a free site survey", to: "/contact" }} secondary={{ label: "Explore the range", to: "/products" }}
          visual="GridOS app + Nano unit" />
      </Labeled>

      <Labeled name="TrustBar" origin="Blocks · trust strip">
        <TrustBar lead="Built on LFP chemistry and open standards" items={["Safer LFP cells", "Sealed, maintenance-free", "GridOS app control", "No vendor lock-in"]} />
      </Labeled>

      <Labeled name="RangeGrid" origin="Blocks · option cards">
        <RangeGrid label="Range" title="Storage sized to your home." intro="Pick the home that looks like yours. Each is powered by the right GridEnergy product and the same GridOS software."
          items={[
            { icon: HouseLine, name: "Apartment / flat", sub: "Compact storage for essential-load backup." },
            { icon: House, name: "Small home", sub: "Whole-home essentials and a couple of ACs." },
            { icon: Buildings, name: "Large home / villa", sub: "Whole-villa backup, often 3-phase." },
            { icon: Sun, name: "Solar + storage", sub: "Bank your solar, run on it after dark." },
          ]} />
      </Labeled>

      <Labeled name="SystemRows" origin="Blocks · alternating feature rows">
        <SystemRows label="What it is" title="A battery, an inverter, solar-ready, run by software." intro="One sealed system replaces the box of parts in your utility room."
          features={[
            { kicker: "The battery", title: "Stores power for when you need it.", body: "Safe, long-life LFP cells store cheap, off-peak, or solar power and release it during cuts and expensive hours.", bullets: ["LFP chemistry, safe and long-lived", "Modular, add capacity later", "Sealed and maintenance-free"], visual: "LFP battery module" },
            { kicker: "GridOS", title: "The brain that makes it pay.", body: "GridOS decides when to charge, when to discharge, and how much to hold in reserve, and shows you everything from your phone.", bullets: ["Tariff-aware scheduling", "Backup reserve protection", "Live monitoring and alerts"], visual: "GridOS dashboard" },
          ]} />
      </Labeled>

      <Labeled name="OutcomeGrid" origin="Blocks · outcomes grid">
        <OutcomeGrid label="Outcomes" title="What you actually get." intro="Not a spec sheet. The things that change about living with your power."
          items={[
            { icon: BatteryChargingVertical, title: "Backup that runs your home", body: "Whole-home or essentials, including your ACs, with seamless switchover." },
            { icon: CurrencyInr, title: "Lower bills", body: "Store cheap or solar power and use it at peak-tariff hours." },
            { icon: SpeakerSimpleX, title: "Silence", body: "No genset, no fumes, no noise. It just works." },
            { icon: DeviceMobile, title: "Smart", body: "Monitor and control everything from your phone via GridOS." },
            { icon: ShieldCheck, title: "Safe", body: "LFP chemistry, the safer, longer-lived battery type." },
            { icon: Leaf, title: "Independence", body: "Less grid, less diesel, more control over your own power." },
          ]} />
      </Labeled>

      <Labeled name="Comparison" origin="Blocks · vs-table">
        <Comparison title="Against the diesel genset you would otherwise buy." intro="Same job, backing up your home through a cut. Two very different ways to live with it."
          usLabel="GridEnergy" themLabel="Diesel genset"
          rows={[
            { label: "Noise", us: "Silent", them: "Loud" },
            { label: "Running cost", us: "Stored / solar power", them: "Diesel, every hour" },
            { label: "Switchover", us: "Seamless", them: "Manual / delayed" },
            { label: "Servicing", us: "Remote, maintenance-free", them: "Regular, hands-on" },
          ]} />
      </Labeled>

      <Labeled name="CapabilityTiers" origin="Modules · product spectrum (Stripe)">
        <CapabilityTiers eyebrow="The range" title="One platform, sized to your load." lead="The same GridOS software across every product, from a single home to a factory." spectrumLeft="Smallest load" spectrumRight="Largest load"
          tiers={[
            { tag: "Home", title: "Nano", body: "Silent whole-home backup and bill savings. Wall- or floor-mounted, solar-ready.", to: "/products/nano", icon: House },
            { tag: "Small business", title: "Micro", body: "Clean UPS backup and tariff arbitrage for a shop or single office.", to: "/products", icon: Storefront },
            { tag: "Commercial", title: "Mega", body: "Multi-feeder storage, peak shaving, and demand management for larger sites.", to: "/products", icon: Buildings },
            { tag: "Industrial", title: "Giga", body: "Drop-in backup and energy management at production scale.", to: "/products", icon: Factory },
          ]} />
      </Labeled>

      <Labeled name="HowItWorks" origin="Modules · numbered 3-step (Stripe)">
        <HowItWorks eyebrow="How buying works" title="From enquiry to your app, in three steps." media="Buying flow visual"
          steps={[
            { t: "Free site survey", b: "We assess your load, roof, and backup needs at your place, no obligation." },
            { t: "Custom proposal", b: "A sized system, the real economics, and a clear quote built around your tariff." },
            { t: "Pro install & app", b: "Authorised install and commissioning, then GridOS set up on your phone." },
          ]} />
      </Labeled>

      <Labeled name="StatBand" origin="Modules · stat band (Stripe)">
        <StatBand title="The honest numbers, once they are yours." lead="We size to your tariff and load and show real figures at survey."
          stats={[
            { value: <Gated note="payback model">—</Gated>, label: "Typical payback" },
            { value: <Gated note="lifetime savings">—</Gated>, label: "Lifetime savings" },
            { value: <Gated note="subsidy">—</Gated>, label: "Subsidy support" },
          ]} />
      </Labeled>

      <Labeled name="CustomerSwitcher" origin="Modules · logo box (Stripe)">
        <CustomerSwitcher title="Sized for every kind of home."
          cases={[
            { tab: "Apartment", name: "Apartment", visual: "Install photo TBD", blurb: "A flat that keeps the essentials and a room cool through every cut.", products: ["Nano", "GridOS"], stats: [{ value: <Gated note="backup">—</Gated>, label: "Essential-load backup" }, { value: <Gated note="saving">—</Gated>, label: "Monthly bill saving" }] },
            { tab: "Villa", name: "Villa", visual: "Install photo TBD", blurb: "A villa that rides every cut in silence, ACs included.", products: ["Nano", "GridOS"], stats: [{ value: <Gated note="backup">—</Gated>, label: "Whole-home backup" }, { value: <Gated note="saving">—</Gated>, label: "Annual bill saving" }] },
            { tab: "Solar home", name: "Solar home", visual: "Install photo TBD", blurb: "A rooftop-solar home that finally runs on its own power after dark.", products: ["Nano", "GridOS"], stats: [{ value: <Gated note="self-use">—</Gated>, label: "Solar self-use" }, { value: <Gated note="independence">—</Gated>, label: "Grid independence" }] },
          ]} />
      </Labeled>

      <Labeled name="StoryCards" origin="Modules · case-study cards (Stripe)">
        <StoryCards eyebrow="Proof" title="Real installs, real results." lead="Homes and sites already running on GridEnergy."
          cards={[
            { logo: "Install 01", quote: "Placeholder: a real install story goes here once captured.", cta: "Read the story", to: "/support" },
            { logo: "Install 02", quote: "Placeholder: a real install story goes here once captured.", cta: "Read the story", to: "/support" },
            { logo: "Install 03", quote: "Placeholder: a real install story goes here once captured.", cta: "Read the story", to: "/support" },
          ]} />
      </Labeled>

      <Labeled name="AppShowcase" origin="Blocks · GridOS showcase">
        <AppShowcase label="GridOS" title="The smart layer most installers don't give you." intro="A battery is hardware. GridOS is the software that turns it into savings, and keeps you in control." visual="GridOS app"
          features={["Live state of charge, grid, and solar", "Backup reserve held automatically", "Tariff-aware charge and discharge", "Outage alerts and savings on your phone"]} />
      </Labeled>

      <Labeled name="FaqResources" origin="Modules · FAQ + resources (Stripe)">
        <FaqResources eyebrow="Questions" title="The objections, answered honestly." lead="Learn how home storage works."
          faqs={[
            { q: "How is this better than my inverter?", a: "It replaces both your inverter and its battery with one silent, sealed LFP system, adds seamless switchover, and is managed from your phone." },
            { q: "Will it run my AC?", a: "From essentials up to whole-home including ACs, depending on the size you choose. We confirm exactly what your system runs at the site survey." },
            { q: "Do I need solar?", a: "No. It works as pure backup and bill-savings storage on its own. If you have solar it makes it far more valuable." },
            { q: "What is the warranty?", a: <Gated note="add real warranty years + cycles">Exact years and cycle terms: TBD</Gated> },
          ]}
          resources={[
            { kind: "Guide", title: "How home battery storage actually works", body: "Backup, bill savings, and solar: what a storage system does, in plain language.", to: "/support" },
            { kind: "Explainer", title: "LFP vs lead-acid: why chemistry matters", body: "Why LFP is the safer, longer-lived battery, and what that means for your home.", to: "/support" },
            { kind: "Checklist", title: "What to ask before you buy storage", body: "The questions that separate a real backup system from a repackaged inverter.", to: "/support" },
          ]} />
      </Labeled>

      <Labeled name="FramedCTA" origin="Blocks · closing CTA">
        <FramedCTA title="Ready to never sit in the dark again?" sub="Book a free site survey. No obligation, no call to qualify."
          primary={{ label: "Book a free site survey", to: "/contact" }} secondary={{ label: "Explore the range", to: "/products" }} />
      </Labeled>

      <SiteFooter />

      <SolutionDock label="All blocks" links={DOCK_LINKS} secondary={{ label: "Catalog", to: "/products" }} primary={{ label: "Get a quote", to: "/contact" }} />
    </div>
  );
}
