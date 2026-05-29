import type { CSSProperties, ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check, Lightning, SignIn } from "@phosphor-icons/react";

import { Logo } from "../../components/Logo";
import { tokens } from "./_v3-tokens";

/*
  v3-website uses plain rounded rectangles (border-radius) instead of squircles.
  `Rect` accepts the same prop shape as Squircle (drop-in replacement) but
  ignores `cornerSmoothing`. Reverted per design feedback 2026-05-16.
*/
function Rect({
  children,
  fill,
  stroke,
  strokeWidth = 1,
  cornerRadius = 16,
  className,
  style,
}: {
  children: ReactNode;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  cornerRadius?: number;
  cornerSmoothing?: number;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      className={className}
      style={{
        background: fill,
        border: stroke ? `${strokeWidth}px solid ${stroke}` : undefined,
        borderRadius: cornerRadius,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/*
  v3 website blocks — applies the v3 element design language to
  marketing-page surfaces. Nav, hero, stats, audience grid, feature
  row, CTA banner, footer. Same olive + GridRed language.
*/

export default function V3Website() {
  return (
    <div
      className="v3-page"
      style={{
        background: tokens.pageBg,
        color: tokens.body,
        fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
        minHeight: "100vh",
      }}
    >
      <style>{`
        .v3-page ::selection { background: ${tokens.brand}; color: #ffffff; }
        .v3-page ::-moz-selection { background: ${tokens.brand}; color: #ffffff; }
        .v3-page :is(h1, h2, h3, h4, h5, h6) {
          font-family: var(--font-body);
          font-weight: 600;
          font-optical-sizing: auto;
        }
        .v3-page .v3-display {
          font-family: var(--font-display);
          font-weight: 600;
        }
      `}</style>

      <PreviewHeader />

      <UtilityBar />
      <MainNav />

      <Hero />
      <StatStrip />
      <AudienceGrid />
      <FeatureRow />
      <SecondaryFeature />
      <CTABanner />
      <Footer />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Preview chrome                                                     */
/* ------------------------------------------------------------------ */

function PreviewHeader() {
  return (
    <header
      className="px-8 py-3 flex items-center gap-6"
      style={{ background: tokens.ink, color: "white" }}
    >
      <Link
        to="/preview"
        className="text-[11px] tracking-[0.12em] uppercase opacity-70 hover:opacity-100"
      >
        ← all previews
      </Link>
      <div className="h-4 w-px" style={{ background: "rgba(255,255,255,0.2)" }} />
      <span
        className="text-[11px] tracking-[0.12em] uppercase"
        style={{ color: tokens.brand, fontWeight: 700 }}
      >
        V3 · WEBSITE BLOCKS
      </span>
      <span className="text-[13px] font-medium">GridEnergy marketing — v3 language applied</span>
      <span className="ml-auto text-[11px] tracking-[0.08em] uppercase opacity-50">
        /preview/v3-website
      </span>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/*  01 — Utility bar (top, slim)                                       */
/* ------------------------------------------------------------------ */

function UtilityBar() {
  return (
    <div style={{ background: tokens.pageBgDeep, borderBottom: `1px solid ${tokens.hairline}` }}>
      <div className="mx-auto max-w-[1280px] px-8 flex items-center justify-between py-2">
        <div className="flex items-center gap-2">
          <span style={{ width: 6, height: 6, borderRadius: 999, background: tokens.accentLine }} />
          <span className="text-[11px] uppercase tracking-[0.14em]" style={{ color: tokens.inkMuted, fontWeight: 600 }}>
            All systems operational
          </span>
        </div>
        <nav className="flex items-center gap-1">
          {["About", "Partners", "Platform", "Resources", "Support", "Contact"].map((item) => (
            <a
              key={item}
              href="#"
              className="text-[12px] transition-colors"
              style={{
                color: tokens.inkMuted,
                fontWeight: 500,
                padding: "5px 10px",
                borderRadius: 8,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = tokens.card;
                (e.currentTarget as HTMLElement).style.color = tokens.ink;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "transparent";
                (e.currentTarget as HTMLElement).style.color = tokens.inkMuted;
              }}
            >
              {item}
            </a>
          ))}
          <span style={{ width: 6 }} />
          <a
            href="#"
            className="flex items-center gap-1.5 text-[12px] font-semibold transition-colors"
            style={{
              color: tokens.brand,
              background: tokens.card,
              padding: "5px 12px 5px 10px",
              borderRadius: 999,
              border: `1px solid ${tokens.hairline}`,
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = tokens.brand)}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = tokens.hairline)}
          >
            <SignIn size={13} weight="bold" color={tokens.brand} />
            Sign in
          </a>
        </nav>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  02 — Main nav (sticky, audience-led)                               */
/* ------------------------------------------------------------------ */

function MainNav() {
  const audiences = ["Homes", "Offices & Industrial", "Institute", "Enterprises", "Hospitality"];
  return (
    <div
      style={{
        borderBottom: `1px solid ${tokens.hairline}`,
        background: `color-mix(in oklch, ${tokens.pageBg} 95%, transparent)`,
        backdropFilter: "blur(8px)",
        position: "sticky",
        top: 0,
        zIndex: 30,
      }}
    >
      <div className="mx-auto max-w-[1280px] px-8 flex items-center justify-between py-4">
        <Link to="/" className="flex items-center gap-2.5" aria-label="GridEnergy home">
          <Logo variant="gridenergy" size={30} />
          <span className="text-[15px] font-semibold tracking-[-0.02em]" style={{ color: tokens.ink }}>
            GridEnergy
          </span>
        </Link>

        <nav className="flex items-center gap-7">
          {audiences.map((a) => (
            <a key={a} href="#" className="text-[13px] font-medium" style={{ color: tokens.body }}>
              {a}
            </a>
          ))}
        </nav>

        <div className="flex items-center">
          <button
            type="button"
            className="flex items-center gap-1.5 px-4 py-2.5 text-[12px] uppercase tracking-[0.08em] font-semibold transition-colors"
            style={{ background: tokens.brand, color: "white", border: "none", borderRadius: 12, cursor: "pointer" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = tokens.brandHover)}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = tokens.brand)}
          >
            <Lightning size={13} weight="fill" color="white" />
            Get early access
          </button>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  03 — Hero                                                          */
/* ------------------------------------------------------------------ */

function Hero() {
  return (
    <section className="mx-auto max-w-[1280px] px-8 pt-20 pb-16">
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-7">
          <div className="flex items-center gap-2 mb-5">
            <span style={{ width: 6, height: 6, borderRadius: 999, background: tokens.brand }} />
            <span className="text-[10px] uppercase tracking-[0.16em]" style={{ color: tokens.brand, fontWeight: 700 }}>
              GRIDENERGY · BATTERY STORAGE
            </span>
            <span style={{ width: 1, height: 10, background: tokens.hairlineStrong }} />
            <span className="text-[10px] uppercase tracking-[0.14em]" style={{ color: tokens.inkMuted, fontWeight: 600 }}>
              India · open standards
            </span>
          </div>
          <h1
            className="v3-display text-[72px] leading-[0.98] tracking-[-0.035em] font-semibold mb-6"
            style={{ color: tokens.ink }}
          >
            Storage that pays itself back.
          </h1>
          <p className="text-[17px] leading-[1.55] max-w-[54ch] mb-8" style={{ color: tokens.body }}>
            18 to 36 months on a typical commercial install. GridOS gives every operator a console
            that does not lie — daily meter readings, fault flags, payback timeline.
          </p>
          <div className="flex items-center gap-3 mb-10">
            <PillCTA tone="brand">Get early access</PillCTA>
            <PillCTA tone="ghost">Talk to sales →</PillCTA>
            <span style={{ width: 1, height: 24, background: tokens.hairlineStrong }} />
            <span className="text-[12px]" style={{ color: tokens.muted }}>
              No card. 12 quarterly readings.
            </span>
          </div>

          <div className="flex items-stretch gap-0">
            <HeroMicroStat label="WAITLIST" value="2,140" delta="+184 this week" />
            <span style={{ width: 1, background: tokens.hairline }} />
            <HeroMicroStat label="SITES LIVE" value="187" delta="across 11 states" />
            <span style={{ width: 1, background: tokens.hairline }} />
            <HeroMicroStat label="AVG PAYBACK" value="26mo" delta="vs 48mo industry" />
          </div>
        </div>

        <div className="col-span-12 lg:col-span-5">
          <HeroVisualCard />
        </div>
      </div>
    </section>
  );
}

function HeroMicroStat({ label, value, delta }: { label: string; value: string; delta: string }) {
  return (
    <div className="flex-1 first:pl-0 px-4">
      <p className="text-[10px] uppercase tracking-[0.14em] mb-1" style={{ color: tokens.muted, fontWeight: 600 }}>
        {label}
      </p>
      <p className="text-[24px] font-semibold tracking-[-0.02em] leading-none" style={{ color: tokens.ink }}>
        {value}
      </p>
      <p className="text-[11px] mt-1" style={{ color: tokens.inkMuted }}>
        {delta}
      </p>
    </div>
  );
}

function HeroVisualCard() {
  return (
    <Rect
      fill={tokens.card}
      stroke={tokens.hairline}
      cornerRadius={28}
      cornerSmoothing={0.8}
    >
      <div className="p-5">
        {/* asset header */}
        <div className="flex items-center gap-3 mb-5">
          <Rect
            fill={tokens.chip}
            cornerRadius={11}
            cornerSmoothing={0.7}
            style={{ width: 36, height: 36 }}
          >
            <div className="grid place-items-center" style={{ width: 36, height: 36, color: tokens.ink }}>
              <BoltIcon />
            </div>
          </Rect>
          <div className="flex-1">
            <p className="text-[12px] uppercase tracking-[0.12em] leading-tight" style={{ color: tokens.ink, fontWeight: 700 }}>
              ATLAS · 03 · PUNE-02
            </p>
            <p className="text-[11px] mt-0.5" style={{ color: tokens.muted }}>
              Commissioned 2026-03-04 · 312 days live
            </p>
          </div>
          <span className="flex items-center gap-1 text-[10px] uppercase tracking-[0.1em]" style={{ color: tokens.accentLine, fontWeight: 700 }}>
            <span style={{ width: 5, height: 5, borderRadius: 999, background: tokens.accentLine }} />
            LIVE
          </span>
        </div>

        {/* main number */}
        <p className="text-[10px] uppercase tracking-[0.14em] mb-1" style={{ color: tokens.muted, fontWeight: 600 }}>
          PAYBACK ACCRUED · YTD
        </p>
        <div className="flex items-baseline gap-1 mb-1">
          <span className="text-[14px] font-medium" style={{ color: tokens.ink }}>₹</span>
          <span className="text-[44px] font-bold tracking-[-0.03em] leading-none" style={{ color: tokens.ink }}>
            8,42,310
          </span>
        </div>
        <p className="text-[11px]" style={{ color: tokens.muted }}>
          22.6% of ₹37.2L cost · on track for month 26
        </p>

        {/* progress bar */}
        <div className="relative mt-4" style={{ height: 8, background: tokens.pageBgDeep, borderRadius: 999 }}>
          <div
            style={{
              position: "absolute",
              inset: 0,
              width: "22.6%",
              background: tokens.ink,
              borderRadius: 999,
            }}
          />
          <div
            style={{
              position: "absolute",
              top: -3,
              left: "22.6%",
              width: 2,
              height: 14,
              background: tokens.brand,
              transform: "translateX(-1px)",
            }}
          />
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="text-[10px] uppercase tracking-[0.1em]" style={{ color: tokens.muted, fontWeight: 600 }}>
            MAR 2026
          </span>
          <span className="text-[10px] uppercase tracking-[0.1em]" style={{ color: tokens.brand, fontWeight: 700 }}>
            ↑ TODAY
          </span>
          <span className="text-[10px] uppercase tracking-[0.1em]" style={{ color: tokens.muted, fontWeight: 600 }}>
            MAY 2028
          </span>
        </div>

        {/* footer fact row */}
        <div className="grid grid-cols-3 mt-5 pt-4" style={{ borderTop: `1px solid ${tokens.hairline}` }}>
          <MicroFact label="kWh today" value="142" />
          <MicroFact label="kWh / mo avg" value="3,820" />
          <MicroFact label="Faults · 90d" value="0" tone="accent" />
        </div>
      </div>
    </Rect>
  );
}

/* ------------------------------------------------------------------ */
/*  04 — Stat strip                                                    */
/* ------------------------------------------------------------------ */

function StatStrip() {
  const stats = [
    { label: "SITES DEPLOYED", value: "187", sub: "11 states · 5 sectors" },
    { label: "MWH DELIVERED", value: "12.4M", sub: "since Q1 2024" },
    { label: "AVG PAYBACK", value: "26 mo", sub: "vs 48 mo industry" },
    { label: "OPEN STANDARDS", value: "OCPP 2.0.1", sub: "+ Modbus · MQTT" },
  ];
  return (
    <section className="mx-auto max-w-[1280px] px-8 pb-16">
      <Rect
        fill={tokens.card}
        stroke={tokens.hairline}
        cornerRadius={24}
        cornerSmoothing={0.8}
      >
        <div className="grid grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="p-6"
              style={{ borderLeft: i === 0 ? "none" : `1px solid ${tokens.hairline}` }}
            >
              <p className="text-[10px] uppercase tracking-[0.14em] mb-2" style={{ color: tokens.muted, fontWeight: 700 }}>
                {s.label}
              </p>
              <p className="text-[32px] font-bold tracking-[-0.03em] leading-none" style={{ color: tokens.ink }}>
                {s.value}
              </p>
              <p className="text-[11px] mt-2" style={{ color: tokens.inkMuted }}>
                {s.sub}
              </p>
            </div>
          ))}
        </div>
      </Rect>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  05 — Audience grid                                                 */
/* ------------------------------------------------------------------ */

function AudienceGrid() {
  const groups = [
    {
      name: "Homes",
      kicker: "01",
      tag: "Apartments · large homes · solar+storage",
      links: ["Apartment ESS", "Large home", "Solar storage combo"],
    },
    {
      name: "Offices & Industrial",
      kicker: "02",
      tag: "Mid-office · large campus · factory backup",
      links: ["Small office", "Mid-office UPS", "Factory backup"],
    },
    {
      name: "Institute",
      kicker: "03",
      tag: "Schools · colleges · universities",
      links: ["School microgrid", "College block", "University campus"],
    },
    {
      name: "Enterprises",
      kicker: "04",
      tag: "Data centers · telecom · hospitals",
      links: ["Data centers", "Telecom towers", "Multi-site"],
    },
    {
      name: "Hospitality",
      kicker: "05",
      tag: "Hotels · resorts · restaurants · malls",
      links: ["Hotels", "Resorts", "Malls"],
    },
  ];
  return (
    <section className="mx-auto max-w-[1280px] px-8 pb-16">
      <div className="flex items-end justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span style={{ width: 6, height: 6, borderRadius: 999, background: tokens.brand }} />
            <span className="text-[10px] uppercase tracking-[0.16em]" style={{ color: tokens.brand, fontWeight: 700 }}>
              SOLUTIONS · BY AUDIENCE
            </span>
          </div>
          <h2 className="text-[36px] font-semibold tracking-[-0.025em] leading-tight" style={{ color: tokens.ink }}>
            Storage shaped to your load.
          </h2>
          <p className="text-[14px] mt-2 max-w-[56ch]" style={{ color: tokens.body }}>
            Pick the building. We&apos;ll show you what to install, the bill of materials, the ROI math.
          </p>
        </div>
        <a href="#" className="flex items-center gap-1.5 text-[12px] uppercase tracking-[0.1em] font-semibold" style={{ color: tokens.ink }}>
          Compare all 5
          <Arrow />
        </a>
      </div>

      <div className="grid grid-cols-5 gap-4">
        {groups.map((g) => (
          <a key={g.name} href="#" className="block group">
            <Rect
              fill={tokens.card}
              stroke={tokens.hairline}
              cornerRadius={22}
              cornerSmoothing={0.8}
            >
              <div className="p-5 min-h-[200px] flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <span className="text-[10px] uppercase tracking-[0.16em]" style={{ color: tokens.muted, fontWeight: 700 }}>
                    {g.kicker}
                  </span>
                  <Arrow tone="muted" />
                </div>
                <h3 className="text-[18px] font-semibold tracking-[-0.02em] leading-tight mb-1" style={{ color: tokens.ink }}>
                  {g.name}
                </h3>
                <p className="text-[11px] leading-snug mb-4" style={{ color: tokens.muted }}>
                  {g.tag}
                </p>
                <ul className="flex flex-col gap-1.5 mt-auto" style={{ borderTop: `1px solid ${tokens.hairline}`, paddingTop: 12 }}>
                  {g.links.map((l) => (
                    <li key={l} className="flex items-center justify-between text-[12px]" style={{ color: tokens.body }}>
                      <span>{l}</span>
                      <Arrow tone="muted" small />
                    </li>
                  ))}
                </ul>
              </div>
            </Rect>
          </a>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  06 — Feature row                                                   */
/* ------------------------------------------------------------------ */

function FeatureRow() {
  return (
    <section className="mx-auto max-w-[1280px] px-8 py-20" style={{ borderTop: `1px solid ${tokens.hairline}` }}>
      <div className="grid grid-cols-12 gap-12 items-center">
        <div className="col-span-12 lg:col-span-5">
          <div className="flex items-center gap-2 mb-4">
            <span style={{ width: 6, height: 6, borderRadius: 999, background: tokens.brand }} />
            <span className="text-[10px] uppercase tracking-[0.16em]" style={{ color: tokens.brand, fontWeight: 700 }}>
              PLATFORM · GRIDOS
            </span>
          </div>
          <h2 className="text-[40px] font-semibold tracking-[-0.025em] leading-[1.05] mb-5" style={{ color: tokens.ink }}>
            One console.<br />
            Every asset you own.
          </h2>
          <p className="text-[15px] leading-[1.6] mb-6 max-w-[48ch]" style={{ color: tokens.body }}>
            GridOS is the operator console that ships with every install. Real meter readings.
            Real fault flags. Daily reconciliation against your billed consumption.
          </p>
          <ul className="flex flex-col gap-3 mb-7">
            {[
              ["Open APIs", "OCPP 2.0.1 · Modbus TCP · MQTT v5"],
              ["Multi-site", "Roll up 30+ assets into one ledger"],
              ["No lock-in", "Self-host the console on your own infra"],
              ["Pays itself back", "We bill against actual savings only"],
            ].map(([title, sub]) => (
              <li key={title} className="flex items-start gap-3">
                <Rect
                  fill={tokens.chip}
                  cornerRadius={8}
                  cornerSmoothing={0.7}
                  style={{ width: 22, height: 22, flexShrink: 0, marginTop: 2 }}
                >
                  <div className="grid place-items-center" style={{ width: 22, height: 22, color: tokens.ink }}>
                    <CheckIcon />
                  </div>
                </Rect>
                <div>
                  <p className="text-[14px] font-semibold leading-tight" style={{ color: tokens.ink }}>
                    {title}
                  </p>
                  <p className="text-[12px] mt-0.5" style={{ color: tokens.muted }}>
                    {sub}
                  </p>
                </div>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-3">
            <PillCTA tone="ink">Tour the console →</PillCTA>
            <a href="#" className="text-[12px] uppercase tracking-[0.1em] font-semibold" style={{ color: tokens.ink }}>
              Read the docs
            </a>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-7">
          <ConsoleMockup />
        </div>
      </div>
    </section>
  );
}

function ConsoleMockup() {
  return (
    <Rect
      fill={tokens.card}
      stroke={tokens.hairline}
      cornerRadius={28}
      cornerSmoothing={0.8}
    >
      <div className="p-5">
        {/* mock toolbar */}
        <div className="flex items-center justify-between pb-3 mb-4" style={{ borderBottom: `1px solid ${tokens.hairline}` }}>
          <div className="flex items-center gap-2">
            <span style={{ width: 18, height: 18, borderRadius: 6, background: tokens.ink }} />
            <span className="text-[12px] font-semibold" style={{ color: tokens.ink }}>
              GridOS · All sites
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[10px] uppercase tracking-[0.12em]" style={{ color: tokens.muted, fontWeight: 600 }}>
              Updated 14:32 IST
            </span>
            <span style={{ width: 1, height: 12, background: tokens.hairlineStrong }} />
            <span className="flex items-center gap-1 text-[10px] uppercase tracking-[0.1em]" style={{ color: tokens.accentLine, fontWeight: 700 }}>
              <span style={{ width: 5, height: 5, borderRadius: 999, background: tokens.accentLine }} />
              ALL LIVE
            </span>
          </div>
        </div>

        {/* mock list */}
        <div className="flex flex-col">
          {[
            ["ATLAS · 03", "Pune-02", "82.4%", "mint"],
            ["Rosa · T2 inverter", "GOA-04", "94.1%", "mint"],
            ["FlexCube · 500SL", "BLR-01", "Provisioning", "muted"],
            ["Como · L1", "HYD-02", "Offline", "red"],
            ["Atlas · 04", "DEL-09", "78.2%", "mint"],
          ].map(([name, site, val, tone], i) => (
            <div
              key={String(name)}
              className="flex items-center gap-4 py-2.5"
              style={{ borderTop: i === 0 ? "none" : `1px solid ${tokens.hairline}` }}
            >
              <span
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: 999,
                  background:
                    tone === "mint"
                      ? tokens.accentLine
                      : tone === "red"
                      ? tokens.brand
                      : tokens.hairlineStrong,
                  flexShrink: 0,
                }}
              />
              <span className="text-[12px] font-semibold flex-1" style={{ color: tokens.ink }}>
                {name}
              </span>
              <span className="text-[11px]" style={{ color: tokens.muted }}>
                {site}
              </span>
              <span
                className="text-[12px] font-semibold tabular-nums"
                style={{
                  color:
                    tone === "mint"
                      ? tokens.accentLine
                      : tone === "red"
                      ? tokens.brand
                      : tokens.muted,
                  width: 86,
                  textAlign: "right",
                }}
              >
                {val}
              </span>
            </div>
          ))}
        </div>

        {/* mock footer fact row */}
        <div className="grid grid-cols-3 mt-5 pt-4" style={{ borderTop: `1px solid ${tokens.hairline}` }}>
          <MicroFact label="ASSETS LIVE" value="4 / 5" tone="accent" />
          <MicroFact label="MWH TODAY" value="262" />
          <MicroFact label="FAULTS · 24H" value="1" />
        </div>
      </div>
    </Rect>
  );
}

/* ------------------------------------------------------------------ */
/*  07 — Secondary feature                                             */
/* ------------------------------------------------------------------ */

function SecondaryFeature() {
  return (
    <section
      className="py-20"
      style={{ background: tokens.pageBgDeep, borderTop: `1px solid ${tokens.hairline}`, borderBottom: `1px solid ${tokens.hairline}` }}
    >
      <div className="mx-auto max-w-[1280px] px-8">
        <div className="flex items-center gap-2 mb-4">
          <span style={{ width: 6, height: 6, borderRadius: 999, background: tokens.brand }} />
          <span className="text-[10px] uppercase tracking-[0.16em]" style={{ color: tokens.brand, fontWeight: 700 }}>
            ECONOMICS · ROI MATH
          </span>
        </div>
        <h2 className="text-[40px] font-semibold tracking-[-0.025em] leading-[1.05] mb-4 max-w-[20ch]" style={{ color: tokens.ink }}>
          Every install carries its own payback timeline.
        </h2>
        <p className="text-[15px] leading-[1.6] mb-10 max-w-[58ch]" style={{ color: tokens.body }}>
          We don&apos;t sell capacity — we sell the math that makes capacity pay. Every solution page
          ships with cost stack, payback months, and rupee-per-kWh against your tariff.
        </p>

        <div className="grid grid-cols-3 gap-4">
          {[
            { kicker: "MID-OFFICE · 120 KW", title: "26 mo", sub: "vs 48mo industry avg" },
            { kicker: "FACTORY BACKUP · 500 KW", title: "22 mo", sub: "tariff-arbitrage heavy" },
            { kicker: "DATA CENTER · 1 MW", title: "31 mo", sub: "redundancy uplift" },
          ].map((c) => (
            <Rect
              key={c.kicker}
              fill={tokens.card}
              stroke={tokens.hairline}
              cornerRadius={22}
              cornerSmoothing={0.8}
            >
              <div className="p-5">
                <p className="text-[10px] uppercase tracking-[0.14em] mb-3" style={{ color: tokens.muted, fontWeight: 700 }}>
                  {c.kicker}
                </p>
                <p className="text-[48px] font-bold tracking-[-0.035em] leading-none" style={{ color: tokens.ink }}>
                  {c.title}
                </p>
                <p className="text-[12px] mt-2" style={{ color: tokens.inkMuted }}>
                  {c.sub}
                </p>
                <a
                  href="#"
                  className="flex items-center gap-1 mt-4 text-[11px] uppercase tracking-[0.12em] font-semibold"
                  style={{ color: tokens.ink }}
                >
                  Run your numbers
                  <Arrow small />
                </a>
              </div>
            </Rect>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  08 — CTA banner                                                    */
/* ------------------------------------------------------------------ */

function CTABanner() {
  return (
    <section className="mx-auto max-w-[1280px] px-8 py-20">
      <Rect fill={tokens.ink} cornerRadius={28} cornerSmoothing={0.8}>
        <div className="p-12 md:p-16 grid grid-cols-12 gap-8 items-end">
          <div className="col-span-12 md:col-span-8">
            <div className="flex items-center gap-2 mb-5">
              <span style={{ width: 6, height: 6, borderRadius: 999, background: tokens.brand }} />
              <span
                className="text-[10px] uppercase tracking-[0.16em]"
                style={{ color: tokens.brand, fontWeight: 700 }}
              >
                EARLY ACCESS · 2,140 ON WAITLIST
              </span>
            </div>
            <h2
              className="v3-display text-[44px] font-semibold tracking-[-0.025em] leading-[1.05] mb-3"
              style={{ color: "#ffffff" }}
            >
              Start with the math.<br />
              We&apos;ll bring the asset.
            </h2>
            <p className="text-[15px] leading-[1.6] max-w-[48ch]" style={{ color: "rgba(255,255,255,0.7)" }}>
              Give us your site load and tariff. We&apos;ll send back a sized stack, payback timeline,
              and a sample GridOS console for your site within 48 hours.
            </p>
          </div>
          <div className="col-span-12 md:col-span-4 flex md:justify-end gap-3">
            <PillCTA tone="brand">Get early access</PillCTA>
            <a
              href="#"
              className="flex items-center text-[12px] uppercase tracking-[0.1em] font-semibold"
              style={{ color: "rgba(255,255,255,0.85)" }}
            >
              Read whitepaper →
            </a>
          </div>
        </div>
      </Rect>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  09 — Footer                                                        */
/* ------------------------------------------------------------------ */

function Footer() {
  return (
    <footer style={{ borderTop: `1px solid ${tokens.hairline}` }}>
      <div className="mx-auto max-w-[1280px] px-8 py-16">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-4">
            <Link to="/" className="flex items-center gap-2.5 mb-5">
              <Logo variant="gridenergy" size={30} />
              <span className="text-[15px] font-semibold tracking-[-0.02em]" style={{ color: tokens.ink }}>
                GridEnergy
              </span>
            </Link>
            <p className="text-[13px] leading-[1.6] max-w-[36ch] mb-5" style={{ color: tokens.body }}>
              Built by DeltaEV Mobility Pvt Ltd. Open standards, operator-first storage for India.
            </p>
            <div className="flex items-center gap-2">
              <span style={{ width: 6, height: 6, borderRadius: 999, background: tokens.accentLine }} />
              <span className="text-[11px] uppercase tracking-[0.12em]" style={{ color: tokens.inkMuted, fontWeight: 600 }}>
                All systems operational
              </span>
            </div>
          </div>

          <FooterCol heading="Solutions" links={["Homes", "Offices & Industrial", "Institute", "Enterprises", "Hospitality"]} />
          <FooterCol heading="Platform" links={["GridOS", "Mobile app", "Economics", "Products", "Resources"]} />
          <FooterCol heading="Company" links={["About", "Partners", "Support", "Contact", "Careers", "Blog"]} />
          <FooterCol heading="Legal" links={["Privacy", "Terms", "Cookies", "Compliance", "Status"]} />
        </div>

        <div
          className="mt-12 pt-6 flex items-center justify-between text-[11px]"
          style={{ borderTop: `1px solid ${tokens.hairline}`, color: tokens.muted }}
        >
          <span>© 2026 DeltaEV Mobility Pvt Ltd · Dharwad · India</span>
          <a href="#" className="flex items-center gap-1.5 font-semibold uppercase tracking-[0.12em]" style={{ color: tokens.ink }}>
            Also from GridPower
            <Arrow small />
            GridCharge
          </a>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ heading, links }: { heading: string; links: string[] }) {
  return (
    <div className="col-span-6 lg:col-span-2">
      <p className="text-[10px] uppercase tracking-[0.16em] mb-4" style={{ color: tokens.inkMuted, fontWeight: 700 }}>
        {heading}
      </p>
      <ul className="flex flex-col gap-2.5">
        {links.map((l) => (
          <li key={l}>
            <a href="#" className="text-[13px]" style={{ color: tokens.body }}>
              {l}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Atoms                                                              */
/* ------------------------------------------------------------------ */

function PillCTA({ tone, children }: { tone: "brand" | "ink" | "ghost"; children: React.ReactNode }) {
  if (tone === "ghost") {
    return (
      <a
        href="#"
        className="px-5 py-3 text-[13px] uppercase tracking-[0.08em] font-semibold"
        style={{ color: tokens.ink }}
      >
        {children}
      </a>
    );
  }
  const fill = tone === "brand" ? tokens.brand : tokens.ink;
  return (
    <button type="button" style={{ display: "block", background: "none", border: "none", padding: 0, cursor: "pointer" }}>
      <Rect fill={fill} cornerRadius={14} cornerSmoothing={0.75}>
        <span className="block px-6 py-3 text-[13px] uppercase tracking-[0.08em] font-semibold" style={{ color: "white" }}>
          {children}
        </span>
      </Rect>
    </button>
  );
}

function MicroFact({ label, value, tone }: { label: string; value: string; tone?: "accent" }) {
  return (
    <div className="px-3 first:pl-0 last:pr-0">
      <p className="text-[10px] uppercase tracking-[0.12em]" style={{ color: tokens.muted, fontWeight: 600 }}>
        {label}
      </p>
      <p
        className="text-[14px] font-semibold tracking-[-0.01em] mt-0.5"
        style={{ color: tone === "accent" ? tokens.accentLine : tokens.ink }}
      >
        {value}
      </p>
    </div>
  );
}

function Arrow({ tone, small }: { tone?: "muted"; small?: boolean }) {
  const s = small ? 10 : 12;
  return <ArrowRight size={s} weight="bold" color={tone === "muted" ? tokens.muted : undefined} />;
}

function CheckIcon() {
  return <Check size={12} weight="bold" />;
}

function BoltIcon() {
  return <Lightning size={16} weight="regular" />;
}
