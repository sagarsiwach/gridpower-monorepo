import type { MetaFunction } from "react-router";
import { BookOpen, Books, GraduationCap, Buildings, ShieldCheck, CurrencyInr, Sun, ChartLineUp, BatteryChargingVertical, PlugsConnected } from "@phosphor-icons/react";
import { SolutionTemplate, type SolutionData } from "../../components/solutions/SolutionTemplate";

export const meta: MetaFunction = () => [
  { title: "Institutes — GridEnergy" },
  { name: "description", content: "Storage and solar for schools, colleges, and university campuses." },
];

const DATA: SolutionData = {
  kicker: "03 · Institutes",
  title: "Reliable power for places that can't pause.",
  subtitle: "Storage and solar for schools, colleges, and campuses — backup for labs and exams, lower running costs, and a clean-energy story students can see. Built for bursty campus loads.",
  productHint: "the Micro & Mega families",
  solutions: [
    { icon: BookOpen, name: "School microgrid", sub: "Backup plus rooftop solar for a single school." },
    { icon: Books, name: "College block", sub: "Per-building storage for classrooms and labs." },
    { icon: GraduationCap, name: "University campus", sub: "Multi-site storage rolled up into one console." },
    { icon: Buildings, name: "Hostels & PG", sub: "Shared-meter storage for residential blocks." },
  ],
  problems: [
    "Power cuts that interrupt classes, labs, exams, and digital learning.",
    "Diesel gensets running on tight institutional budgets.",
    "Rooftop solar that exports cheap by day and does nothing at night.",
    "No simple way to track energy use or savings across buildings.",
  ],
  outcomes: [
    { icon: ShieldCheck, title: "Always-on campus", body: "Critical blocks stay powered through outages, automatically." },
    { icon: CurrencyInr, title: "Lower running costs", body: "Store cheap or solar power and cut diesel and tariff spend." },
    { icon: Sun, title: "Solar that works at night", body: "Bank daytime solar and use it after dark instead of exporting cheap." },
    { icon: ChartLineUp, title: "Per-building visibility", body: "GridOS tracks energy and savings building by building." },
    { icon: BatteryChargingVertical, title: "Phased rollout", body: "Start with one block, expand across the campus over time." },
    { icon: PlugsConnected, title: "Open & supportable", body: "Open standards, remote diagnostics, no vendor lock-in." },
  ],
};

export default function Page() {
  return <SolutionTemplate data={DATA} />;
}
