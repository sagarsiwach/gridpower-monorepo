import type { MetaFunction } from "react-router";
import { Briefcase, BuildingOffice, Buildings, Factory, CurrencyInr, ShieldCheck, ChartLineUp, BatteryChargingVertical, Lightning, PlugsConnected } from "@phosphor-icons/react";
import { SolutionTemplate, type SolutionData } from "../../components/solutions/SolutionTemplate";

export const meta: MetaFunction = () => [
  { title: "Offices & Industrial — GridEnergy" },
  { name: "description", content: "Backup, UPS, and tariff arbitrage for offices, shops, and factories." },
];

const DATA: SolutionData = {
  kicker: "02 · Offices & Industrial",
  title: "Keep the lights, machines, and margins on.",
  subtitle: "Storage that backs up critical load, shaves your peaks, and arbitrages your tariff — for offices, shops, and factories. Replace the diesel genset and stop bleeding on demand charges.",
  productHint: "the Micro & Mega families",
  solutions: [
    { icon: Briefcase, name: "Small office", sub: "Clean UPS backup for a single office or shop." },
    { icon: BuildingOffice, name: "Mid-office", sub: "Backup plus tariff arbitrage across the working day." },
    { icon: Buildings, name: "Large campus", sub: "Multi-feeder storage for bigger commercial sites." },
    { icon: Factory, name: "Factory backup", sub: "Drop-in backup and demand management for production." },
  ],
  problems: [
    "Diesel gensets that cost a fortune to run and fill the place with noise and fumes.",
    "Demand and peak-hour charges quietly inflating every electricity bill.",
    "Power cuts that stop production lines and corrupt sensitive equipment.",
    "No visibility into where energy actually goes across the site.",
  ],
  outcomes: [
    { icon: ShieldCheck, title: "Uninterrupted operations", body: "Critical load rides through outages with seamless switchover." },
    { icon: CurrencyInr, title: "Lower energy bills", body: "Peak shaving and tariff arbitrage cut demand and time-of-use costs." },
    { icon: Lightning, title: "Diesel offset", body: "Run on stored power instead of a genset — quieter, cleaner, cheaper." },
    { icon: ChartLineUp, title: "Energy visibility", body: "GridOS shows consumption and savings per feeder, in real time." },
    { icon: BatteryChargingVertical, title: "Scales with you", body: "Add capacity as load grows — modular from office to factory." },
    { icon: PlugsConnected, title: "Open integration", body: "Works with your solar and existing systems, no lock-in." },
  ],
};

export default function Page() {
  return <SolutionTemplate data={DATA} />;
}
