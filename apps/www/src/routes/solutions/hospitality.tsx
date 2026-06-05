import type { MetaFunction } from "react-router";
import { Bed, TreePalm, ForkKnife, ShoppingBag, ShieldCheck, CurrencyInr, Sun, ChartLineUp, BatteryChargingVertical, PlugsConnected } from "@phosphor-icons/react";
import { SolutionTemplate, type SolutionData } from "../../components/solutions/SolutionTemplate";

export const meta: MetaFunction = () => [
  { title: "Hospitality — GridEnergy" },
  { name: "description", content: "Round-the-clock storage for hotels, resorts, restaurants, and malls." },
];

const DATA: SolutionData = {
  kicker: "05 · Hospitality",
  title: "Guests never see the grid go down.",
  subtitle: "Round-the-clock storage for hotels, resorts, restaurants, and malls — silent backup that protects the guest experience, shaves brutal HVAC peaks, and offsets diesel at off-grid properties.",
  productHint: "the Mega & Giga families",
  solutions: [
    { icon: Bed, name: "Hotels", sub: "Property-wide backup that's invisible to guests." },
    { icon: TreePalm, name: "Resorts", sub: "Off-grid resilience and diesel offset." },
    { icon: ForkKnife, name: "Restaurants", sub: "Kitchen and cold-chain backup for QSR chains." },
    { icon: ShoppingBag, name: "Malls", sub: "HVAC peak shaving across large footprints." },
  ],
  problems: [
    "Outages that hit guest experience, kitchens, and cold storage.",
    "Diesel gensets that bring noise and fumes to a premium setting.",
    "Crushing HVAC peak-hour charges across large properties.",
    "Remote and off-grid resorts dependent on expensive fuel.",
  ],
  outcomes: [
    { icon: ShieldCheck, title: "Seamless backup", body: "Silent, instant switchover — guests never notice an outage." },
    { icon: CurrencyInr, title: "Lower HVAC bills", body: "Peak shaving cuts the most expensive hours of cooling." },
    { icon: Sun, title: "Off-grid ready", body: "Pair with solar for resilient, low-fuel remote properties." },
    { icon: ChartLineUp, title: "Property visibility", body: "GridOS tracks energy and savings across the whole site." },
    { icon: BatteryChargingVertical, title: "Chain-ready", body: "Roll out across outlets and properties on one console." },
    { icon: PlugsConnected, title: "No lock-in", body: "Works with existing solar and building systems." },
  ],
};

export default function Page() {
  return <SolutionTemplate data={DATA} />;
}
