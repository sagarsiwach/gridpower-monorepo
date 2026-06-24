/*
  /preview/modules — flexible module library, batch 1 (distilled from Stripe).
  Each block is a prop-driven module in the V3 language; sample content is
  GridEnergy-appropriate and honest (no fabricated customers/numbers — gated).
  Internal route: noindex.
*/

import type { MetaFunction } from "react-router";
import { House, Storefront, Buildings, Factory } from "@phosphor-icons/react";
import { GlobalHeader } from "../../components/site/GlobalHeader";
import { SiteFooter } from "../../components/site/SiteFooter";
import { tokens } from "./_v3-tokens";
import {
  FaqResources, CustomerSwitcher, CapabilityTiers, HowItWorks, StatBand, StoryCards, Gated,
  FONT, MONO,
} from "../../components/solutions/light/Modules";

export const meta: MetaFunction = () => [
  { title: "Module library — batch 1 (internal)" },
  { name: "robots", content: "noindex" },
];

const FAQS = [
  { q: "How is this better than my inverter?", a: "It replaces both your inverter and its battery with one silent, sealed LFP system, adds seamless switchover, and is managed from your phone. It outlasts the lead-acid batteries you replace every few years." },
  { q: "Will it run my AC?", a: "From essentials up to whole-home including ACs, depending on the size you choose. We confirm exactly what your system runs, and for how long, at the site survey." },
  { q: "Do I need solar?", a: "No. It works as pure backup and bill-savings storage on its own. If you have solar it makes it far more valuable; if you do not, you can add it later through our partners." },
  { q: "What is the warranty?", a: <Gated note="add real warranty years + cycles">Exact years and cycle terms: TBD</Gated> },
  { q: "What about maintenance?", a: "Sealed and effectively maintenance-free, with health monitored remotely through GridOS. No genset servicing, no battery top-ups." },
];

const RESOURCES = [
  { kind: "Guide", title: "How home battery storage actually works", body: "Backup, bill savings, and solar: what a storage system does, in plain language.", to: "/support" },
  { kind: "Explainer", title: "LFP vs lead-acid: why chemistry matters", body: "Why LFP is the safer, longer-lived battery, and what that means for your home.", to: "/support" },
  { kind: "Checklist", title: "What to ask before you buy storage", body: "The questions that separate a real backup system from a repackaged inverter.", to: "/support" },
];

const SWITCHER_CASES = [
  { tab: "Home", name: "Home", visual: "Install photo TBD", blurb: "A villa that rides every cut in silence, ACs included.", products: ["Nano", "GridOS"], stats: [{ value: <Gated note="hours of whole-home backup">—</Gated>, label: "Whole-home backup" }, { value: <Gated note="annual bill saving model">—</Gated>, label: "Annual bill saving" }] },
  { tab: "Resort", name: "Resort", visual: "Install photo TBD", blurb: "A coastal resort that keeps guests powered without a genset.", products: ["Mega", "GridOS"], stats: [{ value: <Gated note="rooms backed">—</Gated>, label: "Rooms backed up" }, { value: <Gated note="diesel offset">—</Gated>, label: "Diesel offset" }] },
  { tab: "Factory", name: "Factory", visual: "Install photo TBD", blurb: "A production line protected from every dip and demand spike.", products: ["Giga", "GridOS"], stats: [{ value: <Gated note="peak shaved">—</Gated>, label: "Peak demand shaved" }, { value: <Gated note="uptime">—</Gated>, label: "Critical-load uptime" }] },
];

const TIERS = [
  { tag: "Home", title: "Nano", body: "Silent whole-home backup and bill savings. Wall- or floor-mounted, solar-ready.", to: "/products/nano", icon: House },
  { tag: "Small business", title: "Micro", body: "Clean UPS backup and tariff arbitrage for a shop or single office.", to: "/products", icon: Storefront },
  { tag: "Commercial", title: "Mega", body: "Multi-feeder storage, peak shaving, and demand management for larger sites.", to: "/products", icon: Buildings },
  { tag: "Industrial", title: "Giga", body: "Drop-in backup and energy management at production scale.", to: "/products", icon: Factory },
];

const STEPS = [
  { t: "Free site survey", b: "We assess your load, roof, and backup needs at your place, no obligation." },
  { t: "Custom proposal", b: "A sized system, the real economics, and a clear quote built around your tariff." },
  { t: "Pro install & app", b: "Authorised install and commissioning, then GridOS set up on your phone." },
];

const STATS = [
  { value: <Gated note="uptime SLA once defined">—</Gated>, label: "Uptime, monitored by GridOS" },
  { value: <Gated note="install count once real">—</Gated>, label: "Homes & sites running" },
  { value: <Gated note="cities served">—</Gated>, label: "Cities served" },
  { value: <Gated note="warranty years">—</Gated>, label: "Year limited warranty" },
];

const STORIES = [
  { logo: "Install 01", quote: "Placeholder: a real install story goes here once captured.", cta: "Read the story", to: "/support" },
  { logo: "Install 02", quote: "Placeholder: a real install story goes here once captured.", cta: "Read the story", to: "/support" },
  { logo: "Install 03", quote: "Placeholder: a real install story goes here once captured.", cta: "Read the story", to: "/support" },
];

export default function ModulesPreview() {
  return (
    <div style={{ fontFamily: FONT, background: tokens.pageBg }}>
      <div style={{ position: "sticky", top: 0, zIndex: 60, background: "oklch(98.8% 0.003 106.5 / 0.85)", backdropFilter: "saturate(180%) blur(12px)", borderBottom: `1px solid ${tokens.hairline}` }}>
        <div style={{ maxWidth: 1180, marginInline: "auto", paddingInline: 28, paddingBlock: 12, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
          <span style={{ fontFamily: FONT, fontSize: 14, fontWeight: 600, color: tokens.ink }}>Module library · batch 1</span>
          <span style={{ fontFamily: MONO, fontSize: 11, color: tokens.muted }}>distilled from Stripe · sample content, layout only</span>
        </div>
      </div>

      <div className="hidden lg:contents"><GlobalHeader /></div>

      <Labeled name="FaqResources — FAQ + resources (Stripe Billing FAQ)">
        <FaqResources eyebrow="Questions" title="Frequently asked questions" lead="Learn how home storage works." faqs={FAQS} resources={RESOURCES} />
      </Labeled>

      <Labeled name="CustomerSwitcher — logo box / featured story switcher">
        <CustomerSwitcher title="Sized for every kind of site." cases={SWITCHER_CASES} />
      </Labeled>

      <Labeled name="CapabilityTiers — capability/product spectrum (no-code→API)">
        <CapabilityTiers eyebrow="The range" title="One platform, sized to your load." lead="The same GridOS software across every product, from a single home to a factory." spectrumLeft="Smallest load" spectrumRight="Largest load" tiers={TIERS} />
      </Labeled>

      <Labeled name="HowItWorks — numbered 3-step (create a link, sell anywhere)">
        <HowItWorks eyebrow="How buying works" title="From enquiry to your app, in three steps." steps={STEPS} media="Buying flow visual" />
      </Labeled>

      <Labeled name="StatBand — headline + stat grid (scales with you)">
        <StatBand title="Storage that scales with you." lead="The proof points, shown once they are real, never a generic number." stats={STATS} />
      </Labeled>

      <Labeled name="StoryCards — case-study cards (trusted by industry leaders)">
        <StoryCards eyebrow="Proof" title="Real installs, real results." lead="Homes and sites already running on GridEnergy." cards={STORIES} />
      </Labeled>

      <SiteFooter />
    </div>
  );
}

function Labeled({ name, children }: { name: string; children: React.ReactNode }) {
  return (
    <div style={{ position: "relative" }}>
      <div style={{ position: "sticky", top: 49, zIndex: 30, maxWidth: 1180, marginInline: "auto", paddingInline: 28 }}>
        <span style={{ display: "inline-block", transform: "translateY(14px)", fontFamily: MONO, fontSize: 10.5, letterSpacing: "0.08em", color: tokens.brand, background: tokens.card, border: `1px solid ${tokens.hairline}`, borderRadius: 6, padding: "3px 8px" }}>{name}</span>
      </div>
      {children}
    </div>
  );
}
