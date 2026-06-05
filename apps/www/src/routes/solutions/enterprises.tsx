import type { MetaFunction } from "react-router";
import { HardDrives, Broadcast, FirstAid, Network, ShieldCheck, CurrencyInr, ChartLineUp, BatteryChargingVertical, Lightning, PlugsConnected } from "@phosphor-icons/react";
import { SolutionTemplate, type SolutionData } from "../../components/solutions/SolutionTemplate";

export const meta: MetaFunction = () => [
  { title: "Enterprises — GridEnergy" },
  { name: "description", content: "Load-critical storage with multi-site rollup for data centers, telecom, and hospitals." },
];

const DATA: SolutionData = {
  kicker: "04 · Enterprises",
  title: "Load-critical storage, rolled up across every site.",
  subtitle: "For data centers, telecom, and hospitals — where downtime isn't an option and you run dozens of sites. Critical-load backup, grid stability, and one console for the whole estate.",
  productHint: "the Mega & Giga families",
  solutions: [
    { icon: HardDrives, name: "Data centers", sub: "Rack UPS and grid storage for uptime-critical loads." },
    { icon: Broadcast, name: "Telecom towers", sub: "Diesel replacement and backup across tower fleets." },
    { icon: FirstAid, name: "Hospitals", sub: "Critical-load backup with clean grid stability." },
    { icon: Network, name: "Multi-site", sub: "Many assets, one GridOS console and cost ledger." },
  ],
  problems: [
    "Downtime that costs revenue, SLAs, or — in healthcare — far worse.",
    "Diesel fleets across remote sites, expensive to fuel and maintain.",
    "Power quality issues that stress sensitive equipment.",
    "No single view of energy, cost, or health across the estate.",
  ],
  outcomes: [
    { icon: ShieldCheck, title: "Uptime you can sign off on", body: "Critical load protected with seamless transfer and reserve." },
    { icon: Network, title: "One console, every site", body: "Roll up 30+ sites into a single operator view." },
    { icon: CurrencyInr, title: "Per-site cost ledger", body: "See energy and spend site by site, asset by asset." },
    { icon: Lightning, title: "Diesel replacement", body: "Cut fuel, noise, and emissions across the fleet." },
    { icon: ChartLineUp, title: "Grid-quality power", body: "Stabilise supply for sensitive enterprise equipment." },
    { icon: PlugsConnected, title: "Open & self-hostable", body: "Open protocols and APIs — integrate with your own stack." },
  ],
};

export default function Page() {
  return <SolutionTemplate data={DATA} />;
}
