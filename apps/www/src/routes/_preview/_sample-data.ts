/*
  Sample content for the solution-page direction samples.
  Copy is lifted from the real /solutions/homes and /solutions/offices-industrial
  pages so the samples read like the actual site. Numbers route through <Gated>.
*/

import {
  BatteryChargingVertical, CurrencyInr, SpeakerSimpleX, DeviceMobile, ShieldCheck, Leaf,
  House, HouseLine, Sun, Buildings, Briefcase, BuildingOffice, Factory, Lightning,
  ChartLineUp, PlugsConnected,
} from "@phosphor-icons/react";
import { Gated } from "../../components/marketing/Primitives";
import { createElement } from "react";
import type { SampleContent } from "../../components/solutions/light/SamplePage";

export const homesContent: SampleContent = {
  audience: "Homes",
  hero: {
    eyebrow: "Home energy storage",
    title: "Silent, lifetime power for your whole home.",
    sub: "One sealed system replaces your inverter, battery, and genset. Backs up your home, cuts your bill, and finally makes your solar worth it.",
    chips: ["Runs your ACs", "Seamless switchover", "Managed from your phone"],
    primary: { label: "Book a free site survey", to: "/contact" },
    secondary: { label: "Explore the range", to: "/products" },
    visual: "GridOS app + Nano unit",
  },
  trust: {
    lead: "Built on LFP chemistry and open standards",
    items: ["Safer LFP cells", "Sealed, maintenance-free", "GridOS app control", "No vendor lock-in"],
  },
  range: {
    label: "Range",
    title: "Storage sized to your home.",
    intro: "Pick the home that looks like yours. Each is powered by the right GridEnergy product and the same GridOS software.",
    items: [
      { icon: HouseLine, name: "Apartment / flat", sub: "Compact storage for essential-load backup." },
      { icon: House, name: "Small home", sub: "Whole-home essentials and a couple of ACs." },
      { icon: Buildings, name: "Large home / villa", sub: "Whole-villa backup, often 3-phase." },
      { icon: Sun, name: "Solar + storage", sub: "Bank your solar, run on it after dark." },
    ],
  },
  what: {
    label: "What it is",
    title: "A battery, an inverter, solar-ready, run by software.",
    intro: "One sealed system replaces the box of parts in your utility room. Here is what is inside, in plain language.",
    features: [
      { kicker: "The battery", title: "Stores power for when you need it.", body: "Safe, long-life LFP cells store cheap, off-peak, or solar power and release it during cuts and expensive hours.", bullets: ["LFP chemistry, safe and long-lived", "Modular, add capacity later", "Sealed and maintenance-free"], visual: "LFP battery module" },
      { kicker: "The inverter", title: "Switches over before you notice.", body: "An integrated inverter delivers clean power and hands over from grid to battery seamlessly when the supply drops.", bullets: ["Seamless switchover on an outage", "Clean, stable output", "One unit, no separate inverter"], visual: "Integrated power unit" },
      { kicker: "GridOS", title: "The brain that makes it pay.", body: "GridOS decides when to charge, when to discharge, and how much to hold in reserve, and shows you everything from your phone.", bullets: ["Tariff-aware scheduling", "Backup reserve protection", "Live monitoring and alerts"], visual: "GridOS dashboard" },
    ],
  },
  outcomes: {
    label: "Outcomes",
    title: "What you actually get.",
    intro: "Not a spec sheet. The things that change about living with your power.",
    items: [
      { icon: BatteryChargingVertical, title: "Backup that runs your home", body: "Whole-home or essentials, including your ACs, with seamless switchover when the grid drops." },
      { icon: CurrencyInr, title: "Lower bills", body: "Store cheap or solar power and use it at peak-tariff hours." },
      { icon: SpeakerSimpleX, title: "Silence", body: "No genset, no fumes, no noise. It just works." },
      { icon: DeviceMobile, title: "Smart", body: "Monitor and control everything from your phone via GridOS." },
      { icon: ShieldCheck, title: "Safe", body: "LFP chemistry, the safer, longer-lived battery type." },
      { icon: Leaf, title: "Independence", body: "Less grid, less diesel, more control over your own power." },
    ],
  },
  comparison: {
    title: "Against the diesel genset you would otherwise buy.",
    intro: "Same job, backing up your home through a cut. Two very different ways to live with it.",
    usLabel: "GridEnergy",
    themLabel: "Diesel genset",
    rows: [
      { label: "Noise", us: "Silent", them: "Loud" },
      { label: "Fumes", us: "None", them: "Diesel exhaust" },
      { label: "Running cost", us: "Stored / solar power", them: "Diesel, every hour" },
      { label: "Switchover", us: "Seamless", them: "Manual / delayed" },
      { label: "Servicing", us: "Remote, maintenance-free", them: "Regular, hands-on" },
      { label: "Control", us: "From your phone", them: "None" },
    ],
  },
  money: {
    label: "Economics",
    title: "The honest numbers, once they are yours.",
    intro: "We will not quote a generic payback. We size to your tariff and load and show real figures at survey. Subsidies, where you qualify, come on top.",
    items: [
      { label: "Typical payback", note: "compute payback model per home profile before publishing" },
      { label: "Lifetime savings", note: "compute lifetime savings model" },
      { label: "Subsidy support", note: "cite PM Surya Ghar / state scheme + eligibility once confirmed" },
    ],
  },
  steps: {
    label: "How buying works",
    title: "From enquiry to your app, in five steps.",
    items: [
      { t: "Enquire", b: "Tell us about your home and goals." },
      { t: "Free site survey", b: "We assess your load, roof, and backup needs." },
      { t: "Custom proposal", b: "A sized system, the economics, a clear quote." },
      { t: "Pro install", b: "Authorised install and commissioning." },
      { t: "App onboarding", b: "GridOS set up, you are in control." },
    ],
  },
  faqs: {
    label: "Questions",
    title: "The objections, answered honestly.",
    items: [
      { q: "How is this better than my inverter?", a: "It replaces both your inverter and its battery with one silent, sealed LFP system, adds seamless switchover, and is managed from your phone. It is designed to outlast the lead-acid batteries you replace every few years." },
      { q: "Will it run my AC?", a: "Depending on the size you choose and your load, yes, from essentials up to whole-home including ACs. We confirm exactly what your system runs, and for how long, at the site survey." },
      { q: "Do I need solar?", a: "No. It works as pure backup and bill-savings storage on its own. If you have solar it makes it far more valuable; if you do not, you can add it later through our partners." },
      { q: "What is the warranty?", a: createElement(Gated, { note: "add real warranty years + cycles", children: "Exact years and cycle terms: TBD" }) },
      { q: "What about maintenance?", a: "The hardware is sealed and designed to be effectively maintenance-free, with health monitored remotely through GridOS. No genset servicing, no battery top-ups." },
    ],
  },
  cta: { title: "Ready to never sit in the dark again?", sub: "Book a free site survey. No obligation, no call to qualify." },
};

export const officesContent: SampleContent = {
  audience: "Offices & Industrial",
  hero: {
    eyebrow: "Offices & Industrial",
    title: "Keep the lights, machines, and margins on.",
    sub: "Storage that backs up critical load, shaves your peaks, and arbitrages your tariff. Replace the diesel genset and stop bleeding on demand charges.",
    chips: ["Peak shaving", "Diesel offset", "Per-feeder visibility"],
    primary: { label: "Talk to our team", to: "/contact" },
    secondary: { label: "See the products", to: "/products" },
    visual: "GridOS site dashboard",
  },
  trust: {
    lead: "Drop-in for offices, shops, and factories",
    items: ["Critical-load UPS", "Tariff arbitrage", "Modular to factory scale", "Works with your solar"],
  },
  range: {
    label: "Range",
    title: "From a single shop to a multi-feeder site.",
    intro: "The Micro and Mega families scale with your load. Same GridOS software across every site.",
    items: [
      { icon: Briefcase, name: "Small office", sub: "Clean UPS backup for a single office or shop." },
      { icon: BuildingOffice, name: "Mid-office", sub: "Backup plus tariff arbitrage across the working day." },
      { icon: Buildings, name: "Large campus", sub: "Multi-feeder storage for bigger commercial sites." },
      { icon: Factory, name: "Factory backup", sub: "Drop-in backup and demand management for production." },
    ],
  },
  what: {
    label: "What it is",
    title: "Storage, power electronics, and software, as one system.",
    intro: "It sits behind your meter and across your feeders. Here is what each part does.",
    features: [
      { kicker: "The battery", title: "Rides your site through outages.", body: "Modular LFP banks back up critical load and store off-peak power for the expensive hours, scaling from one office to a full factory.", bullets: ["LFP chemistry, safe and long-lived", "Modular from office to factory", "Sealed and maintenance-free"], visual: "Mega battery rack" },
      { kicker: "Power electronics", title: "Clean UPS, no genset lag.", body: "Grid-interactive inverters deliver clean power and hand over to storage with no break, protecting sensitive equipment and production lines.", bullets: ["Seamless switchover on an outage", "Protects sensitive equipment", "Demand and peak management"], visual: "Power conversion unit" },
      { kicker: "GridOS", title: "Where your energy actually goes.", body: "GridOS schedules charge and discharge against your tariff, shaves peaks automatically, and shows consumption and savings per feeder in real time.", bullets: ["Tariff arbitrage and peak shaving", "Per-feeder visibility", "Savings reporting"], visual: "GridOS site dashboard" },
    ],
  },
  outcomes: {
    label: "Outcomes",
    title: "What changes on site.",
    intro: "The operational and financial differences, not a feature list.",
    items: [
      { icon: ShieldCheck, title: "Uninterrupted operations", body: "Critical load rides through outages with seamless switchover." },
      { icon: CurrencyInr, title: "Lower energy bills", body: "Peak shaving and tariff arbitrage cut demand and time-of-use costs." },
      { icon: Lightning, title: "Diesel offset", body: "Run on stored power instead of a genset, quieter, cleaner, cheaper." },
      { icon: ChartLineUp, title: "Energy visibility", body: "GridOS shows consumption and savings per feeder, in real time." },
      { icon: BatteryChargingVertical, title: "Scales with you", body: "Add capacity as load grows, modular from office to factory." },
      { icon: PlugsConnected, title: "Open integration", body: "Works with your solar and existing systems, no lock-in." },
    ],
  },
  comparison: {
    title: "Against the diesel genset and the demand bill.",
    intro: "The two costs every site carries today, and what storage does to each.",
    usLabel: "GridEnergy",
    themLabel: "Diesel genset",
    rows: [
      { label: "Running cost", us: "Stored / off-peak power", them: "Diesel, every hour" },
      { label: "Demand charges", us: "Shaved automatically", them: "Paid in full" },
      { label: "Switchover", us: "Seamless UPS", them: "Genset lag" },
      { label: "Emissions & noise", us: "None on site", them: "Exhaust + noise" },
      { label: "Energy visibility", us: "Per feeder, live", them: "None" },
      { label: "Scaling", us: "Add modules", them: "Buy another genset" },
    ],
  },
  money: {
    label: "Economics",
    title: "The numbers, sized to your site.",
    intro: "Payback depends on your tariff, demand profile, and load. We model it against your bills, not a generic case.",
    items: [
      { label: "Demand-charge saving", note: "model peak-shaving saving against real tariff before publishing" },
      { label: "Tariff-arbitrage saving", note: "compute ToU arbitrage per site profile" },
      { label: "Typical payback", note: "compute commercial payback model + cite assumptions" },
    ],
  },
  steps: {
    label: "How it works",
    title: "From site assessment to live savings.",
    items: [
      { t: "Assessment", b: "We study your bills, load, and feeders." },
      { t: "Design", b: "A sized system and modelled savings." },
      { t: "Proposal", b: "Clear scope, economics, and timeline." },
      { t: "Install", b: "Commissioned with minimal disruption." },
      { t: "Operate", b: "GridOS runs and reports, hands-off." },
    ],
  },
  faqs: {
    label: "Questions",
    title: "What operations teams ask first.",
    items: [
      { q: "Will it protect sensitive equipment?", a: "Yes. Grid-interactive inverters deliver clean, stable power and hand over to storage with no break, so production lines and sensitive equipment ride through cuts." },
      { q: "How does it cut my bill?", a: "Two ways: peak shaving trims the demand charge, and tariff arbitrage stores off-peak power to use during expensive hours. GridOS does both automatically." },
      { q: "Can it replace our genset?", a: "For most backup duties, yes, quieter, cleaner, and cheaper to run. For very long outages we size storage around your worst-case and can keep a genset as deep backup if you want one." },
      { q: "What does it cost and when does it pay back?", a: createElement(Gated, { note: "compute commercial payback model + cite assumptions", children: "Payback model: TBD, sized to your tariff" }) },
      { q: "Does it work with our existing solar?", a: "Yes. It is built on open standards and integrates with your solar and existing systems, with no lock-in." },
    ],
  },
  cta: { title: "Stop paying the genset and the demand bill.", sub: "Talk to our team for a site assessment sized to your load." },
};

export const SAMPLE_CONTENT = { homes: homesContent, offices: officesContent } as const;
export type SampleRouteKey = keyof typeof SAMPLE_CONTENT;
