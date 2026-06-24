import {
  BatteryFull,
  BatteryCharging,
  ChartBar,
  ChartLine,
  CheckCircle,
  Circuitry,
  ClipboardText,
  Cpu,
  Lock,
  HardDrive,
  Lightning,
  WarningCircle,
  Wrench,
} from "@phosphor-icons/react";

import { ProductHero } from "../../../components/solutions/ProductHero";
import { SpecTable } from "../../../components/solutions/SpecTable";
import { WhatsInBox } from "../../../components/solutions/WhatsInBox";
import { InstallTimeline } from "../../../components/solutions/InstallTimeline";
import { GalleryStrip } from "../../../components/solutions/GalleryStrip";
import { GridOSCallout } from "../../../components/solutions/GridOSCallout";
import { tokens } from "../_v3-tokens";

/* ------------------------------------------------------------------ */
/*  Apartment ESS — realistic demo data                                */
/* ------------------------------------------------------------------ */

const HERO_DATA = {
  kicker: "GRIDENERGY · HOMES · APARTMENT ESS",
  productName: "Apartment ESS Pack",
  tagline:
    "Wall-mounted lithium iron phosphate storage for Indian apartments. Pairs with your existing rooftop solar or runs standalone against grid tariff arbitrage. Pays back in 26 months at ₹6/unit.",
  keySpecInline: "7.4 kWh · single phase · 48V · IP65 · LiFePO4",
  primaryCta: { label: "Configure for your flat", href: "#" },
  FallbackIcon: BatteryFull,
};

const SPEC_SECTIONS = [
  {
    label: "Energy",
    rows: [
      { name: "Usable capacity", value: "7.4 kWh", note: "@ 95% DoD" },
      { name: "Nominal voltage", value: "48 V", note: "LiFePO4" },
      { name: "Cell chemistry", value: "LiFePO4 (lithium iron phosphate)" },
      { name: "Cycle life", value: "6,000+ cycles", note: "@ 80% capacity" },
      { name: "Calendar life", value: "15 years", note: "ambient 25 °C" },
    ],
  },
  {
    label: "Power",
    rows: [
      { name: "Continuous output", value: "3.6 kW", note: "single phase" },
      { name: "Peak output (10 s)", value: "5.0 kW" },
      { name: "Charge power", value: "3.6 kW", note: "CC/CV" },
      { name: "Round-trip efficiency", value: "≥ 96 %", note: "DC–DC" },
      { name: "Inverter type", value: "Grid-tie / off-grid hybrid" },
    ],
  },
  {
    label: "Physical",
    rows: [
      { name: "Dimensions (H × W × D)", value: "840 × 510 × 215 mm" },
      { name: "Weight", value: "72 kg", note: "fully assembled" },
      { name: "Enclosure rating", value: "IP65", note: "outdoor-rated" },
      { name: "Operating temperature", value: "−10 °C to +55 °C" },
      { name: "Mounting", value: "Wall-mount (included bracket kit)" },
    ],
  },
  {
    label: "Communications",
    rows: [
      { name: "GridOS interface", value: "Modbus TCP + MQTT v5" },
      { name: "Connectivity", value: "Ethernet + Wi-Fi 6 (dual band)" },
      { name: "Standards", value: "OCPP 2.0.1, BIS IS 16270" },
      { name: "Remote updates", value: "OTA, signed firmware" },
      { name: "Data retention", value: "90-day local log, cloud sync" },
    ],
  },
  {
    label: "Compliance & Warranty",
    rows: [
      { name: "Safety certifications", value: "UL 9540A, IEC 62619" },
      { name: "BIS certification", value: "IS 16270:2014" },
      { name: "Product warranty", value: "10 years" },
      { name: "Capacity warranty", value: "80 % retention at year 10" },
      { name: "On-site SLA", value: "Next business day · all India" },
    ],
  },
];

const BOX_ITEMS = [
  { Icon: BatteryFull, name: "Battery module", qty: 4, note: "1.85 kWh each, 48V LiFePO4" },
  { Icon: Circuitry, name: "BMS controller", qty: 1, note: "Integrated per module" },
  { Icon: Lightning, name: "Hybrid inverter", qty: 1, note: "3.6 kW, grid-tie/off-grid" },
  { Icon: BatteryCharging, name: "DC cable harness", qty: 1, note: "Pre-terminated, 1.5 m" },
  { Icon: HardDrive, name: "Wall mounting frame", qty: 1, note: "Powder-coated steel" },
  { Icon: Wrench, name: "Installation kit", qty: 1, note: "Bolts, anchors, gaskets" },
  { Icon: Cpu, name: "GridOS gateway", qty: 1, note: "RJ45 + Wi-Fi, DIN-rail" },
  { Icon: ClipboardText, name: "Commissioning docs", qty: 1, note: "QR-linked, multilingual" },
  { Icon: CheckCircle, name: "Test load bank", qty: 1, note: "For factory acceptance test" },
];

const TIMELINE_STEPS = [
  {
    day: "Day 1",
    label: "Site survey & design",
    sub: "Load audit, single-line diagram, anchor-point mapping, GridOS pre-config.",
  },
  {
    day: "Day 2",
    label: "Civil & cabling",
    sub: "Wall anchor, conduit run, AC/DC circuit isolation, earth bonding.",
  },
  {
    day: "Day 3",
    label: "Unit installation",
    sub: "Frame mount, module rack, inverter wire-up, gateway LAN connection.",
  },
  {
    day: "Day 4",
    label: "Commissioning",
    sub: "BMS pairing, GridOS enrollment, factory acceptance test, owner walkthrough.",
  },
  {
    day: "Day 5",
    label: "Go-live + handover",
    sub: "Live metering verification, GridOS dashboard access, warranty activation.",
  },
];

const GALLERY_IMAGES = [
  {
    src: "/images/solutions/ess-gallery-1.jpg",
    alt: "Apartment ESS wall-mount installation",
    caption: "Wall-mounted unit — Pune-02 RWA, Block B stairwell",
  },
  {
    src: "/images/solutions/ess-gallery-2.jpg",
    alt: "BMS controller close-up",
    caption: "BMS controller — cell-level monitoring at 100 ms sample rate",
  },
  {
    src: "/images/solutions/ess-gallery-3.jpg",
    alt: "GridOS dashboard on tablet",
    caption: "GridOS owner dashboard — SOC, savings, fault timeline",
  },
  {
    src: "/images/solutions/ess-gallery-4.jpg",
    alt: "Battery module internals",
    caption: "LiFePO4 prismatic cells — 6,000 cycle rated",
  },
  {
    src: "/images/solutions/ess-gallery-5.jpg",
    alt: "Commissioning walkthrough",
    caption: "Day 5 commissioning handover — Bangalore pilot site",
  },
];

const GRIDOS_FEATURES = [
  {
    Icon: ChartBar,
    title: "Daily meter reads",
    sub: "Per-asset SOC, import/export, and tariff-adjusted savings — every 15 minutes.",
  },
  {
    Icon: ChartLine,
    title: "Payback math inline",
    sub: "Cumulative ₹ saved vs. finance cost, updated nightly from DISCOM tariff feed.",
  },
  {
    Icon: WarningCircle,
    title: "Fault flags that flag",
    sub: "Cell-level thermal warnings, BMS state changes, grid outage timestamps. No silent failures.",
  },
  {
    Icon: Lock,
    title: "Open standards. No lock-in.",
    sub: "OCPP 2.0.1, Modbus TCP, MQTT v5. Self-hostable. Export your data any time.",
  },
];

/* ------------------------------------------------------------------ */
/*  Section caption utility                                            */
/* ------------------------------------------------------------------ */

function SectionCaption({ label }: { label: string }) {
  return (
    <div
      style={{
        background: tokens.ink,
        padding: "8px 32px",
        display: "flex",
        alignItems: "center",
        gap: 10,
      }}
    >
      <span
        style={{
          fontSize: 9,
          fontWeight: 700,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: tokens.brand,
        }}
      >
        COMPONENT
      </span>
      <span
        style={{
          width: 1,
          height: 10,
          background: "rgba(255,255,255,0.15)",
        }}
      />
      <span
        style={{
          fontSize: 10,
          fontWeight: 500,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.5)",
        }}
      >
        {label}
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main demo export                                                   */
/* ------------------------------------------------------------------ */

export default function SectionDetail() {
  return (
    <div
      style={{
        background: tokens.pageBg,
        color: tokens.body,
        fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
        minHeight: "100vh",
      }}
    >
      <style>{`
        * { box-sizing: border-box; }
        ::selection { background: ${tokens.brand}; color: #ffffff; }
        :is(h1, h2, h3, h4, h5, h6) {
          font-family: var(--font-body, Inter, ui-sans-serif, system-ui, sans-serif);
          font-weight: 600;
          font-optical-sizing: auto;
        }
        .v3-display {
          font-family: var(--font-display, 'Clash Grotesk', Inter, ui-sans-serif, system-ui, sans-serif);
          font-weight: 600;
        }
      `}</style>

      {/* Preview chrome */}
      <div
        style={{
          background: tokens.ink,
          color: "white",
          padding: "12px 32px",
          display: "flex",
          alignItems: "center",
          gap: 16,
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <span
          style={{
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: tokens.brand,
          }}
        >
          V3 · SOLUTIONS
        </span>
        <span style={{ width: 1, height: 14, background: "rgba(255,255,255,0.15)" }} />
        <span style={{ fontSize: 13, fontWeight: 500, color: "rgba(255,255,255,0.7)" }}>
          Cluster B — Product/Detail Blocks · Apartment ESS demo
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginLeft: "auto" }}>
          {[
            "ProductHero",
            "SpecTable",
            "WhatsInBox",
            "InstallTimeline",
            "GalleryStrip",
            "GridOSCallout",
          ].map((name) => (
            <span
              key={name}
              style={{
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: "0.08em",
                color: "rgba(255,255,255,0.35)",
              }}
            >
              {name}
            </span>
          ))}
        </div>
      </div>

      {/* 1. ProductHero */}
      <SectionCaption label="ProductHero — solution page hero, 50/50 split, Clash Grotesk headline" />
      <ProductHero {...HERO_DATA} />

      {/* 2. SpecTable */}
      <SectionCaption label="SpecTable — dense tabular specs, hairline-divided, Geist Mono values" />
      <SpecTable sections={SPEC_SECTIONS} />

      {/* 3. WhatsInBox */}
      <SectionCaption label="WhatsInBox — visual inventory, 3-col grid, duotone icons, brand-tinted qty pills" />
      <WhatsInBox items={BOX_ITEMS} />

      {/* 4. InstallTimeline */}
      <SectionCaption label="InstallTimeline — horizontal desktop, vertical mobile, GridRed active node" />
      <InstallTimeline steps={TIMELINE_STEPS} />

      {/* 5. GalleryStrip */}
      <SectionCaption label="GalleryStrip — snap-scroll carousel, hover caption, opens full-size in new tab" />
      <GalleryStrip images={GALLERY_IMAGES} />

      {/* 6. GridOSCallout */}
      <SectionCaption label="GridOSCallout — ink bg, 5/7 split, 4 feature rows, ASCII console mockup fallback" />
      <GridOSCallout
        kicker="PLATFORM · GRIDOS"
        headline="The console your site actually needs."
        lead="Daily meter reads. Per-asset payback math. Fault flags that flag. Open standards — OCPP 2.0.1, Modbus TCP, MQTT v5. Self-hostable. No vendor lock-in."
        features={GRIDOS_FEATURES}
      />

      {/* bottom spacer */}
      <div style={{ height: 80, background: tokens.ink }} />
    </div>
  );
}
