import type { ReactNode } from "react";
import { Lightning, House, BuildingOffice, SolarPanel } from "@phosphor-icons/react";
import { AudienceHero } from "../../../components/solutions/AudienceHero";
import { InPageAudienceTabs } from "../../../components/solutions/InPageAudienceTabs";
import { ROICalculator } from "../../../components/solutions/ROICalculator";
import { TrustStrip } from "../../../components/solutions/TrustStrip";
import { tokens } from "../_v3-tokens";

/* ------------------------------------------------------------------ */
/*  Demo data — realistic Homes audience content                       */
/* ------------------------------------------------------------------ */

// AudienceHero visual slot: a placeholder product render card
function HomesHeroVisual() {
  return (
    <div
      style={{
        width: "100%",
        minHeight: 360,
        background: tokens.pageBgDeep,
        border: `1px solid ${tokens.hairline}`,
        borderRadius: 24,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
        padding: 24,
      }}
    >
      <SolarPanel size={48} weight="duotone" color={tokens.inkMuted} />
      <p
        className="text-[11px] uppercase tracking-[0.14em] text-center"
        style={{ color: tokens.muted, fontWeight: 600 }}
      >
        Product render · Apartment ESS 5kWh
      </p>
      <div
        style={{
          marginTop: 8,
          borderTop: `1px solid ${tokens.hairline}`,
          width: "100%",
          paddingTop: 16,
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 0,
        }}
      >
        {[
          { label: "CAPACITY", value: "5 kWh" },
          { label: "CYCLES", value: "6,000+" },
          { label: "WARRANTY", value: "10 yr" },
        ].map((f, i) => (
          <div
            key={f.label}
            style={{
              borderLeft: i === 0 ? "none" : `1px solid ${tokens.hairline}`,
              padding: "0 12px",
            }}
          >
            <p
              className="text-[9px] uppercase tracking-[0.14em]"
              style={{ color: tokens.muted, fontWeight: 700 }}
            >
              {f.label}
            </p>
            <p
              className="text-[16px] font-bold tracking-[-0.02em] mt-0.5"
              style={{ color: tokens.ink }}
            >
              {f.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// InPageAudienceTabs content panels
function TabContent({ icon, title, body }: { icon: ReactNode; title: string; body: string }) {
  return (
    <div
      style={{
        background: tokens.card,
        border: `1px solid ${tokens.hairline}`,
        borderRadius: 20,
        padding: 24,
        display: "flex",
        gap: 16,
        alignItems: "flex-start",
      }}
    >
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: 12,
          background: tokens.pageBgDeep,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          color: tokens.inkMuted,
        }}
      >
        {icon}
      </div>
      <div>
        <p
          className="text-[15px] font-semibold tracking-[-0.015em] mb-1.5"
          style={{ color: tokens.ink }}
        >
          {title}
        </p>
        <p className="text-[13px] leading-[1.6]" style={{ color: tokens.body }}>
          {body}
        </p>
      </div>
    </div>
  );
}

const TAB_ITEMS = [
  {
    key: "apartment-ess",
    label: "Apartment ESS",
    content: (
      <TabContent
        icon={<House size={20} weight="duotone" />}
        title="Apartment ESS · 5–15 kWh"
        body="Replace your inverter-battery setup with a floor-mount LFP stack. Pairs with existing solar or runs standalone. GridOS gives you daily meter reads, fault flags, and payback math against your housing society's tariff."
      />
    ),
  },
  {
    key: "large-home",
    label: "Large Home",
    content: (
      <TabContent
        icon={<BuildingOffice size={20} weight="duotone" />}
        title="Large Home / Villa · 20–40 kWh"
        body="Sized for bungalows and larger plots with high AC load and diesel backup currently running. Stack install in utility room. Average payback 24 months on Pune tariff. Diesel offset is the headline ROI driver."
      />
    ),
  },
  {
    key: "solar-storage-combo",
    label: "Solar + Storage",
    content: (
      <TabContent
        icon={<Lightning size={20} weight="duotone" />}
        title="Solar + Storage Combo"
        body="Already have rooftop solar? Add storage to capture excess generation and eliminate grid dependency in evening peaks. GridOS reconciles your meter exports and imports daily so you know exactly what the system earned."
      />
    ),
  },
];

// TrustStrip stats + partners
const TRUST_STATS = [
  { label: "SITES DEPLOYED", value: "187", sub: "11 states · 5 sectors" },
  { label: "MWH DELIVERED", value: "12.4M", sub: "since Q1 2024" },
  { label: "AVG PAYBACK", value: "26 mo", sub: "vs 48 mo industry" },
  { label: "OPEN STANDARDS", value: "OCPP 2.0.1", sub: "+ Modbus · MQTT" },
];

const TRUST_PARTNERS = [
  { name: "Tata Power Solar" },
  { name: "MNRE Approved" },
  { name: "BIS Certified" },
  { name: "DISCOM Ready" },
  { name: "IEC 62619" },
];

/* ------------------------------------------------------------------ */
/*  Demo section wrapper                                               */
/* ------------------------------------------------------------------ */

function DemoLabel({ label }: { label: string }) {
  return (
    <div
      className="flex items-center gap-3 mb-6"
      style={{ marginTop: 64 }}
    >
      <div style={{ flex: 1, height: 1, background: tokens.hairline }} />
      <span
        className="text-[10px] uppercase tracking-[0.18em]"
        style={{ color: tokens.muted, fontWeight: 700, whiteSpace: "nowrap" }}
      >
        {label}
      </span>
      <div style={{ flex: 1, height: 1, background: tokens.hairline }} />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  SectionTop — default export, demo all 4 components                */
/* ------------------------------------------------------------------ */

export default function SectionTop() {
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
        .v3-sol-page ::selection { background: ${tokens.brand}; color: #ffffff; }
        .v3-sol-page .v3-display {
          font-family: var(--font-display);
          font-weight: 600;
        }
        .v3-sol-page :is(h1, h2, h3) {
          font-family: var(--font-body, Inter, ui-sans-serif);
          font-optical-sizing: auto;
        }
        input[type="number"]::-webkit-inner-spin-button,
        input[type="number"]::-webkit-outer-spin-button {
          opacity: 0.4;
        }
      `}</style>

      <div className="v3-sol-page">
        {/* Preview header strip */}
        <div
          className="px-8 py-3 flex items-center gap-6"
          style={{ background: tokens.ink, color: "white" }}
        >
          <span
            className="text-[11px] tracking-[0.12em] uppercase opacity-70"
          >
            ← CLUSTER A — TOP OF PAGE
          </span>
          <div style={{ width: 1, height: 16, background: "rgba(255,255,255,0.2)" }} />
          <span
            className="text-[11px] tracking-[0.12em] uppercase"
            style={{ color: tokens.brand, fontWeight: 700 }}
          >
            V3 · SOLUTIONS COMPONENTS
          </span>
          <span className="text-[13px] font-medium">GridEnergy · Homes audience · section-top demo</span>
          <span className="ml-auto text-[11px] tracking-[0.08em] uppercase opacity-50">
            /preview/v3-solutions/section-top
          </span>
        </div>

        <div className="mx-auto max-w-[1280px] px-8 pb-24">

          {/* 01 — AudienceHero */}
          <DemoLabel label="01 · AUDIENCE HERO" />
          <AudienceHero
            kicker="01 · HOMES"
            headline="Power that pays itself back."
            lead="Battery storage for Indian apartments and homes. Know your payback date on day one. GridOS logs every meter reading, flags every fault, and shows you exactly when the asset breaks even."
            primaryCta={{ label: "Get early access", href: "#early-access" }}
            secondaryCta={{ label: "See the math", href: "#roi" }}
            microcopy="No card. 48-hour personalised proposal."
            microStats={[
              { label: "HOMES LIVE", value: "340+", delta: "across 8 cities" },
              { label: "AVG PAYBACK", value: "28 mo", delta: "residential tariff" },
              { label: "DIESEL OFFSET", value: "94%", delta: "avg on Pune installs" },
            ]}
            visual={<HomesHeroVisual />}
          />

          {/* 02 — InPageAudienceTabs */}
          <DemoLabel label="02 · IN-PAGE AUDIENCE TABS" />
          <InPageAudienceTabs
            items={TAB_ITEMS}
            defaultKey="apartment-ess"
          />

          {/* 03 — ROICalculator */}
          <DemoLabel label="03 · ROI CALCULATOR" />
          <div className="max-w-[640px]">
            <ROICalculator
              ctaLabel="Get personalised math →"
              ctaHref="#early-access"
            />
          </div>

          {/* 04 — TrustStrip */}
          <DemoLabel label="04 · TRUST STRIP" />
          <TrustStrip
            stats={TRUST_STATS}
            partners={TRUST_PARTNERS}
          />

        </div>
      </div>
    </div>
  );
}
