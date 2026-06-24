import { useState } from "react";
import { Link } from "react-router";
import { Bell, CalendarBlank, CaretRight, Lightning } from "@phosphor-icons/react";

import { Squircle } from "../../components/Squircle";
import { tokens } from "./_v3-tokens";

/*
  v3 element studies — derived from reference screenshots.
  Tokens live in _v3-tokens.ts so v3-website shares the same palette.
*/

export default function V3Elements() {
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
      <TopBar />

      <main className="mx-auto max-w-[1200px] px-8 py-10">
        <Header />

        <Section label="01 · BUTTONS" title="CTAs, secondary, ghost, pill" first>
          <Buttons />
        </Section>

        <Section label="02 · INPUTS" title="Single-line, multi-line, with label">
          <Inputs />
        </Section>

        <Section label="03 · PILL NAV" title="Segmented control / sub-tabs">
          <PillNav />
        </Section>

        <Section label="04 · CARDS" title="Account card, metric card, list card">
          <Cards />
        </Section>

        <Section label="05 · NUMBER TILE" title="Money / metric typography">
          <NumberTile />
        </Section>

        <Section label="06 · LIST ROWS" title="Hairline-separated row patterns">
          <ListRows />
        </Section>

        <Section label="06b · ROW ACTIONS" title="Icon · Label · Meta · Arrow">
          <RowActions />
        </Section>

        <Section label="07 · STATUS RIBBON" title="Success / info / progress strip">
          <Ribbons />
        </Section>

        <Section label="08 · CHIPS" title="Tags, filters, status">
          <Chips />
        </Section>

        <Section label="09 · MODAL" title="Sheet-style overlay">
          <ModalDemo />
        </Section>
      </main>

      <footer className="mx-auto max-w-[1200px] px-8 pb-24 text-xs uppercase tracking-[0.12em]" style={{ color: tokens.muted }}>
        v3 element studies · derived from references · 2026-05-16
      </footer>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Layout chrome                                                      */
/* ------------------------------------------------------------------ */

function TopBar() {
  return (
    <header
      className="px-8 py-4 flex items-center gap-6"
      style={{
        background: tokens.ink,
        color: "white",
      }}
    >
      <Link
        to="/preview"
        className="text-[11px] tracking-[0.12em] uppercase opacity-70 hover:opacity-100 transition-opacity"
        style={{ fontFamily: "Inter" }}
      >
        ← all previews
      </Link>
      <div className="h-4 w-px" style={{ background: "rgba(255,255,255,0.2)" }} />
      <span className="text-[11px] tracking-[0.12em] uppercase opacity-90" style={{ color: tokens.brand }}>
        V3 · ELEMENT STUDIES · OLIVE PASS
      </span>
      <span className="text-sm font-medium">Fold-derived primitives</span>
      <span className="ml-auto text-[11px] tracking-[0.08em] uppercase opacity-50">
        /preview/v3-elements
      </span>
    </header>
  );
}

function Header() {
  return (
    <div className="mb-10">
      <div className="flex items-center gap-3 mb-4">
        <span
          className="inline-block"
          style={{ width: 6, height: 6, borderRadius: 999, background: tokens.brand }}
        />
        <p
          className="text-[10px] uppercase tracking-[0.16em]"
          style={{ color: tokens.brand, fontWeight: 700 }}
        >
          BRAND STUDY · OLIVE SUBSTRATE · GRIDRED SPARK
        </p>
        <span className="text-[10px] uppercase tracking-[0.12em]" style={{ color: tokens.muted }}>
          · 2026-05-16 · v3.02
        </span>
      </div>
      <h1
        className="text-[44px] font-semibold tracking-[-0.025em] leading-[1.05] mb-3"
        style={{ color: tokens.ink }}
      >
        Primitives in the candidate register.
      </h1>
      <p
        className="text-[14px] leading-[1.6] max-w-[64ch]"
        style={{ color: tokens.body }}
      >
        Tailwind v4.3 <code className="font-mono text-[12px]">olive</code> scale end-to-end (hue 106-107).
        Substrate <code className="font-mono text-[12px]">50/100</code>. Hairlines <code className="font-mono text-[12px]">200</code>. Body <code className="font-mono text-[12px]">800</code>. Ink <code className="font-mono text-[12px]">950</code>.
        Squircle corners via <code className="font-mono text-[12px]">figma-squircle</code> (smoothing 0.7–0.8).
        GridRed is the only chromatic spark.
      </p>
      <div className="flex items-center gap-2 mt-5">
        <MicroStat label="ELEMENTS" value="9" />
        <MicroDivider />
        <MicroStat label="COLORS" value="12" />
        <MicroDivider />
        <MicroStat label="RADII" value="11–32" />
        <MicroDivider />
        <MicroStat label="TYPE FACE" value="Inter" />
        <MicroDivider />
        <MicroStat label="REF SET" value="42 SCREENS" />
      </div>
    </div>
  );
}

function MicroStat({ label, value }: { label: string; value: string }) {
  return (
    <span className="flex items-baseline gap-1.5">
      <span className="text-[9px] uppercase tracking-[0.14em]" style={{ color: tokens.muted, fontWeight: 600 }}>
        {label}
      </span>
      <span className="text-[12px] font-semibold" style={{ color: tokens.ink }}>
        {value}
      </span>
    </span>
  );
}

function MicroDivider() {
  return <span style={{ width: 1, height: 10, background: tokens.hairlineStrong }} />;
}

function Section({
  label,
  title,
  first,
  children,
}: {
  label: string;
  title: string;
  first?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section
      className={first ? "" : "mt-12 pt-8"}
      style={
        first
          ? undefined
          : { borderTop: `1px solid ${tokens.hairline}` }
      }
    >
      <div className="flex items-center gap-3 mb-5">
        <span
          className="text-[10px] uppercase tracking-[0.16em]"
          style={{ color: tokens.brand, fontWeight: 700 }}
        >
          {label}
        </span>
        <span style={{ width: 1, height: 10, background: tokens.hairlineStrong }} />
        <h2
          className="text-[14px] font-semibold"
          style={{ color: tokens.ink }}
        >
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  01 — Buttons                                                       */
/* ------------------------------------------------------------------ */

function Buttons() {
  return (
    <div className="flex flex-wrap gap-3 items-center">
      <PrimaryBtn>Approve consent</PrimaryBtn>
      <SecondaryBtn>Don&apos;t connect</SecondaryBtn>
      <GhostBtn>Mark as read</GhostBtn>
      <PillBtn>Get early access</PillBtn>
      <IconPillBtn />
      <DisabledBtn>Submit</DisabledBtn>
    </div>
  );
}

function PrimaryBtn({ children }: { children: React.ReactNode }) {
  const [hover, setHover] = useState(false);
  return (
    <button
      type="button"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ display: "block", background: "none", border: "none", padding: 0, cursor: "pointer", fontFamily: "Inter" }}
    >
      <Squircle
        fill={hover ? tokens.inkHover : tokens.ink}
        cornerRadius={16}
        cornerSmoothing={0.7}
      >
        <span
          className="block px-8 py-4 text-[13px] tracking-[0.08em] uppercase font-semibold"
          style={{ color: "white" }}
        >
          {children}
        </span>
      </Squircle>
    </button>
  );
}

function SecondaryBtn({ children }: { children: React.ReactNode }) {
  return (
    <button
      type="button"
      style={{ display: "block", background: "none", border: "none", padding: 0, cursor: "pointer", fontFamily: "Inter" }}
    >
      <Squircle fill={tokens.chip} cornerRadius={16} cornerSmoothing={0.7}>
        <span
          className="block px-8 py-4 text-[13px] tracking-[0.08em] uppercase font-semibold"
          style={{ color: tokens.ink }}
        >
          {children}
        </span>
      </Squircle>
    </button>
  );
}

function GhostBtn({ children }: { children: React.ReactNode }) {
  return (
    <button
      type="button"
      className="px-5 py-2.5 text-[13px] font-medium"
      style={{
        background: "transparent",
        color: tokens.ink,
        borderRadius: "10px",
        fontFamily: "Inter",
      }}
    >
      {children} →
    </button>
  );
}

function PillBtn({ children }: { children: React.ReactNode }) {
  return (
    <button
      type="button"
      className="px-6 py-3 text-[13px] font-medium transition-colors"
      style={{
        background: tokens.brand,
        color: "white",
        borderRadius: "999px",
        fontFamily: "Inter",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = tokens.brandHover)}
      onMouseLeave={(e) => (e.currentTarget.style.background = tokens.brand)}
    >
      {children}
    </button>
  );
}

function IconPillBtn() {
  return (
    <button
      type="button"
      className="grid place-items-center"
      style={{
        width: 44,
        height: 44,
        background: tokens.chip,
        color: tokens.ink,
        borderRadius: "999px",
      }}
      aria-label="Bell"
    >
      <BellIcon />
    </button>
  );
}

function DisabledBtn({ children }: { children: React.ReactNode }) {
  return (
    <button
      type="button"
      disabled
      className="px-8 py-4 text-[13px] tracking-[0.08em] uppercase font-semibold cursor-not-allowed"
      style={{
        background: tokens.chip,
        color: tokens.muted,
        borderRadius: "14px",
        opacity: 0.7,
        fontFamily: "Inter",
      }}
    >
      {children}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  02 — Inputs                                                        */
/* ------------------------------------------------------------------ */

function Inputs() {
  return (
    <div className="grid grid-cols-2 gap-6 max-w-[720px]">
      <Field label="EMAIL" helper="Where we'll send your early-access invite.">
        <input
          type="email"
          placeholder="you@company.in"
          className="w-full px-4 py-3.5 text-[14px] outline-none"
          style={{
            background: tokens.card,
            color: tokens.ink,
            border: `1px solid ${tokens.hairline}`,
            borderRadius: "12px",
            fontFamily: "Inter",
          }}
        />
      </Field>
      <Field label="ROLE" helper="Optional. Helps us route you.">
        <input
          type="text"
          placeholder="e.g. Plant manager"
          className="w-full px-4 py-3.5 text-[14px] outline-none"
          style={{
            background: tokens.card,
            color: tokens.ink,
            border: `1px solid ${tokens.hairline}`,
            borderRadius: "12px",
            fontFamily: "Inter",
          }}
        />
      </Field>

      <Field label="CONSENT VALID FOR" helper="Daily refresh.">
        <DateRange />
      </Field>

      <Field label="SITE LOAD" helper="Approximate peak kW.">
        <div className="relative">
          <input
            type="text"
            defaultValue="120"
            className="w-full px-4 py-3.5 pr-16 text-[18px] font-semibold outline-none"
            style={{
              background: tokens.card,
              color: tokens.ink,
              border: `1px solid ${tokens.hairline}`,
              borderRadius: "12px",
              fontFamily: "Inter",
            }}
          />
          <span
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[11px] uppercase tracking-[0.1em]"
            style={{ color: tokens.muted, fontWeight: 600 }}
          >
            kW
          </span>
        </div>
      </Field>
    </div>
  );
}

function Field({
  label,
  helper,
  children,
}: {
  label: string;
  helper?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span
        className="text-[11px] uppercase tracking-[0.12em]"
        style={{ color: tokens.inkMuted, fontWeight: 600 }}
      >
        {label}
      </span>
      {children}
      {helper && (
        <span className="text-[12px]" style={{ color: tokens.muted }}>
          {helper}
        </span>
      )}
    </label>
  );
}

function DateRange() {
  return (
    <div className="flex items-center gap-3">
      <PseudoDate value="May 15 2026" />
      <span style={{ color: tokens.muted }}>→</span>
      <PseudoDate value="May 15 2027" />
    </div>
  );
}

function PseudoDate({ value }: { value: string }) {
  return (
    <div
      className="flex-1 flex items-center gap-2 px-3 py-2.5 text-[13px]"
      style={{
        background: tokens.chip,
        color: tokens.ink,
        borderRadius: "10px",
        fontWeight: 500,
      }}
    >
      <CalendarIcon />
      {value}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  03 — Pill nav                                                      */
/* ------------------------------------------------------------------ */

function PillNav() {
  const [active, setActive] = useState("home");
  const items = [
    { key: "home", label: "Home" },
    { key: "products", label: "Products" },
    { key: "platform", label: "Platform", dot: true },
    { key: "economics", label: "Economics" },
    { key: "support", label: "Support" },
  ];
  return (
    <div
      className="inline-flex items-center gap-1 p-1.5"
      style={{ background: "transparent" }}
    >
      {items.map((item) => {
        const isActive = active === item.key;
        return (
          <button
            type="button"
            key={item.key}
            onClick={() => setActive(item.key)}
            className="relative px-5 py-2 text-[13px] font-medium transition-colors"
            style={{
              background: isActive ? tokens.chip : "transparent",
              color: isActive ? tokens.ink : tokens.body,
              borderRadius: "999px",
              fontFamily: "Inter",
            }}
          >
            {item.label}
            {item.dot && (
              <span
                className="absolute"
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: "999px",
                  background: tokens.brand,
                  bottom: -4,
                  left: "50%",
                  transform: "translateX(-50%)",
                }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  04 — Cards                                                         */
/* ------------------------------------------------------------------ */

function Cards() {
  return (
    <div className="grid grid-cols-3 gap-6">
      <ConsentCard />
      <NetWorthCard />
      <ConnectedAccountCard />
    </div>
  );
}

function ConsentCard() {
  return (
    <Squircle
      fill={tokens.card}
      stroke={tokens.hairline}
      cornerRadius={28}
      cornerSmoothing={0.8}
    >
      <div className="p-5">
        <div className="flex items-center justify-between mb-4">
          <span
            className="text-[10px] uppercase tracking-[0.14em]"
            style={{ color: tokens.brand, fontWeight: 700 }}
          >
            CONSENT · ACTIVE
          </span>
          <span className="flex items-center gap-1.5 text-[11px]" style={{ color: tokens.accentLine, fontWeight: 600 }}>
            <span style={{ width: 6, height: 6, borderRadius: 999, background: tokens.accentLine }} />
            Live
          </span>
        </div>
        <Row label="PURPOSE" value="Spending patterns" />
        <Divider />
        <Row label="VALID UNTIL" value="May 15 2027" />
        <Divider />
        <Row label="REFRESH" value="Daily · 02:00 IST" />
        <Divider />
        <Row label="REVOKE FROM" value="Settings" />
        <button
          type="button"
          className="mt-4 flex items-center gap-1 text-[11px] uppercase tracking-[0.12em] font-semibold"
          style={{ color: tokens.ink }}
        >
          Consent details
          <ChevronIcon />
        </button>
      </div>
    </Squircle>
  );
}

function NetWorthCard() {
  return (
    <Squircle
      fill={tokens.card}
      stroke={tokens.hairline}
      cornerRadius={28}
      cornerSmoothing={0.8}
    >
      <div className="p-5">
        <div className="flex items-center justify-between mb-3">
          <span
            className="text-[10px] uppercase tracking-[0.14em]"
            style={{ color: tokens.inkMuted, fontWeight: 700 }}
          >
            SITE SAVINGS · 30D
          </span>
          <span
            className="px-2 py-0.5 text-[10px] uppercase tracking-[0.1em] font-semibold"
            style={{ color: tokens.accentLine, background: tokens.accentSoft, borderRadius: 999 }}
          >
            +12.4%
          </span>
        </div>
        <div className="flex items-baseline gap-1 mb-1">
          <span className="text-[14px] font-medium" style={{ color: tokens.ink }}>
            ₹
          </span>
          <span className="text-[32px] font-bold tracking-[-0.025em] leading-none" style={{ color: tokens.ink }}>
            1,28,420
          </span>
        </div>
        <p className="text-[11px]" style={{ color: tokens.muted }}>
          vs ₹1,14,290 prev period
        </p>
        <div className="mt-3">
          <Spark />
          <div className="flex items-center justify-between mt-1.5">
            <span className="text-[10px] uppercase tracking-[0.1em]" style={{ color: tokens.muted, fontWeight: 600 }}>
              APR 15
            </span>
            <span className="text-[10px] uppercase tracking-[0.1em]" style={{ color: tokens.muted, fontWeight: 600 }}>
              MAY 15
            </span>
          </div>
        </div>
      </div>
    </Squircle>
  );
}

function ConnectedAccountCard() {
  return (
    <Squircle
      fill={tokens.card}
      stroke={tokens.hairline}
      cornerRadius={28}
      cornerSmoothing={0.8}
    >
      <div className="p-5">
        <div className="flex items-start gap-3 mb-4">
          <Squircle
            fill={tokens.chip}
            cornerRadius={11}
            cornerSmoothing={0.7}
            style={{ width: 36, height: 36 }}
          >
            <div className="grid place-items-center" style={{ width: 36, height: 36, color: tokens.ink }}>
              <BoltIcon />
            </div>
          </Squircle>
          <div className="flex-1 min-w-0">
            <p
              className="text-[12px] uppercase tracking-[0.12em] leading-tight"
              style={{ color: tokens.ink, fontWeight: 700 }}
            >
              ATLAS · 03
            </p>
            <p className="text-[11px] mt-0.5" style={{ color: tokens.muted }}>
              SN-7707 · Pune-02 site
            </p>
          </div>
          <span className="flex items-center gap-1 text-[10px] uppercase tracking-[0.1em]" style={{ color: tokens.accentLine, fontWeight: 700 }}>
            <span style={{ width: 5, height: 5, borderRadius: 999, background: tokens.accentLine }} />
            LIVE
          </span>
        </div>
        <div className="flex items-baseline justify-between mb-2">
          <p className="text-[10px] uppercase tracking-[0.14em]" style={{ color: tokens.muted, fontWeight: 600 }}>
            CHARGE LEVEL
          </p>
          <p className="text-[10px] uppercase tracking-[0.1em]" style={{ color: tokens.muted, fontWeight: 600 }}>
            Updated 14:32
          </p>
        </div>
        <div className="flex items-baseline gap-1 mb-2">
          <span
            className="text-[36px] font-bold tracking-[-0.02em] leading-none"
            style={{ color: tokens.ink, fontFamily: "Inter" }}
          >
            82
          </span>
          <span className="text-[18px] font-medium" style={{ color: tokens.muted }}>
            .4%
          </span>
        </div>
        <div className="relative mt-2" style={{ height: 6, background: tokens.pageBgDeep, borderRadius: 999 }}>
          <div
            style={{
              position: "absolute",
              inset: 0,
              width: "82.4%",
              background: tokens.ink,
              borderRadius: 999,
            }}
          />
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="text-[10px] uppercase tracking-[0.1em]" style={{ color: tokens.muted, fontWeight: 600 }}>
            CYCLE 1,247
          </span>
          <span className="text-[10px] uppercase tracking-[0.1em]" style={{ color: tokens.muted, fontWeight: 600 }}>
            48 mWh today
          </span>
        </div>
      </div>
    </Squircle>
  );
}

/* ------------------------------------------------------------------ */
/*  05 — Number tile                                                   */
/* ------------------------------------------------------------------ */

function NumberTile() {
  return (
    <Squircle
      fill={tokens.card}
      stroke={tokens.hairline}
      cornerRadius={28}
      cornerSmoothing={0.8}
      style={{ maxWidth: 440 }}
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <p
            className="text-[10px] uppercase tracking-[0.14em]"
            style={{ color: tokens.inkMuted, fontWeight: 700 }}
          >
            PAYBACK TODAY
          </p>
          <span
            className="px-2 py-0.5 text-[10px] uppercase tracking-[0.1em] font-semibold"
            style={{ color: tokens.accentLine, background: tokens.accentSoft, borderRadius: 999 }}
          >
            ON TRACK
          </span>
        </div>
        <div className="flex items-baseline gap-1">
          <span
            className="text-[18px] font-medium align-top mr-0.5"
            style={{ color: tokens.ink }}
          >
            ₹
          </span>
          <span
            className="text-[64px] font-bold tracking-[-0.035em] leading-none"
            style={{ color: tokens.ink }}
          >
            4,210
          </span>
          <span
            className="text-[26px] font-medium tracking-[-0.02em]"
            style={{ color: tokens.muted }}
          >
            .80
          </span>
        </div>
        <div className="flex items-stretch gap-0 mt-4" style={{ borderTop: `1px solid ${tokens.hairline}` }}>
          <MicroFact label="VS YESTERDAY" value="+₹210" tone="accent" />
          <span style={{ width: 1, background: tokens.hairline }} />
          <MicroFact label="OF TARGET" value="22.6%" />
          <span style={{ width: 1, background: tokens.hairline }} />
          <MicroFact label="TARGET" value="₹18.6L" />
        </div>
      </div>
    </Squircle>
  );
}

/* ------------------------------------------------------------------ */
/*  06 — List rows                                                     */
/* ------------------------------------------------------------------ */

function ListRows() {
  const rows = [
    { name: "ATLAS · 03", meta: "Pune-02 · Live", kwh: "48 mWh", value: "82.4%", tone: "mint" },
    { name: "FlexCube · 500SL", meta: "BLR-01 · Provisioning", kwh: "—", value: "—", tone: "muted" },
    { name: "Rosa · T2 inverter", meta: "GOA-04 · Live", kwh: "12 mWh", value: "94.1%", tone: "mint" },
    { name: "Como · L1", meta: "HYD-02 · Fault", kwh: "—", value: "Offline", tone: "red" },
  ];
  return (
    <Squircle
      fill={tokens.card}
      stroke={tokens.hairline}
      cornerRadius={28}
      cornerSmoothing={0.8}
    >
      <div className="flex items-center justify-between px-5 py-3" style={{ background: tokens.pageBgDeep }}>
        <span className="text-[10px] uppercase tracking-[0.16em]" style={{ color: tokens.inkMuted, fontWeight: 700 }}>
          ASSET · SITE · STATE
        </span>
        <span className="text-[10px] uppercase tracking-[0.14em]" style={{ color: tokens.inkMuted, fontWeight: 600 }}>
          24H · HEALTH
        </span>
      </div>
      {rows.map((row, i) => (
        <div
          key={row.name}
          className="flex items-center gap-4 px-5 py-3.5"
          style={{
            borderTop: `1px solid ${tokens.hairline}`,
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: 999,
              background:
                row.tone === "mint"
                  ? tokens.accentLine
                  : row.tone === "red"
                  ? tokens.brand
                  : tokens.hairlineStrong,
              flexShrink: 0,
            }}
          />
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-semibold leading-tight" style={{ color: tokens.ink }}>
              {row.name}
            </p>
            <p className="text-[11px] mt-0.5" style={{ color: tokens.muted }}>
              {row.meta}
            </p>
          </div>
          <span className="text-[11px] tabular-nums" style={{ color: tokens.muted, fontWeight: 500, width: 64, textAlign: "right" }}>
            {row.kwh}
          </span>
          <span
            className="text-[13px] font-semibold tracking-[-0.01em] tabular-nums"
            style={{
              width: 64,
              textAlign: "right",
              color:
                row.tone === "mint"
                  ? tokens.accentLine
                  : row.tone === "red"
                  ? tokens.brand
                  : tokens.muted,
            }}
          >
            {row.value}
          </span>
        </div>
      ))}
    </Squircle>
  );
}

/* ------------------------------------------------------------------ */
/*  07 — Status ribbon                                                 */
/* ------------------------------------------------------------------ */

function Ribbons() {
  return (
    <div className="flex flex-col gap-3 max-w-[600px]">
      <Ribbon tone="mint">Connection refreshed &amp; data updated!</Ribbon>
      <Ribbon tone="navy">Discovering your bank accounts — this may take a while.</Ribbon>
      <Ribbon tone="red">3 inverters offline at Pune-02. Engineering notified.</Ribbon>
    </div>
  );
}

function Ribbon({ tone, children }: { tone: "mint" | "navy" | "red"; children: React.ReactNode }) {
  const palette = {
    mint: { bg: tokens.accentSoft, fg: tokens.accentLine, dot: tokens.accentLine },
    navy: { bg: tokens.chip, fg: tokens.ink, dot: tokens.ink },
    red: { bg: tokens.brandSoft, fg: tokens.brand, dot: tokens.brand },
  }[tone];
  return (
    <div
      className="flex items-center gap-3 px-5 py-3.5"
      style={{
        background: palette.bg,
        color: palette.fg,
        borderRadius: "14px",
      }}
    >
      <span
        style={{
          width: 8,
          height: 8,
          borderRadius: "999px",
          background: palette.dot,
        }}
      />
      <span className="text-[13px] font-medium">{children}</span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  08 — Chips                                                         */
/* ------------------------------------------------------------------ */

function Chips() {
  return (
    <div className="flex flex-wrap gap-2.5">
      <Chip>Homes</Chip>
      <Chip active>Offices &amp; Industrial</Chip>
      <Chip>Institute</Chip>
      <Chip>Enterprises</Chip>
      <Chip>Hospitality</Chip>
      <Chip tone="mint">Live</Chip>
      <Chip tone="red">Fault</Chip>
    </div>
  );
}

function Chip({
  children,
  active,
  tone,
}: {
  children: React.ReactNode;
  active?: boolean;
  tone?: "mint" | "red";
}) {
  let style: React.CSSProperties = {
    background: tokens.chip,
    color: tokens.ink,
  };
  if (active) style = { background: tokens.ink, color: "white" };
  if (tone === "mint") style = { background: tokens.accentSoft, color: tokens.accentLine };
  if (tone === "red") style = { background: tokens.brandSoft, color: tokens.brand };
  return (
    <span
      className="px-3.5 py-1.5 text-[12px] font-semibold tracking-[0.02em]"
      style={{
        ...style,
        borderRadius: "999px",
      }}
    >
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  09 — Modal                                                         */
/* ------------------------------------------------------------------ */

function ModalDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="px-6 py-3 text-[13px] font-semibold uppercase tracking-[0.08em]"
        style={{
          background: tokens.ink,
          color: "white",
          borderRadius: "14px",
        }}
      >
        Open consent sheet
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 grid place-items-center px-6"
          style={{
            background: "oklch(15.3% 0.006 107.1 / 0.45)",
            backdropFilter: "blur(6px)",
          }}
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-[480px]"
            onClick={(e) => e.stopPropagation()}
            style={{
              filter: "drop-shadow(0 32px 64px oklch(15.3% 0.006 107.1 / 0.30))",
            }}
          >
            <Squircle
              fill={tokens.card}
              cornerRadius={32}
              cornerSmoothing={0.8}
            >
              <div className="p-8">
            <div
              className="mx-auto mb-6 grid place-items-center"
              style={{
                width: 44,
                height: 44,
                background: tokens.chip,
                borderRadius: "999px",
              }}
            >
              <BoltIcon />
            </div>
            <h3
              className="text-[22px] font-semibold tracking-[-0.02em] text-center mb-2"
              style={{ color: tokens.ink }}
            >
              Approve data access
            </h3>
            <p
              className="text-[14px] leading-[1.6] text-center mb-7"
              style={{ color: tokens.body }}
            >
              GridOS will read your meter readings daily for the next 12 months
              to compute payback and flag faults.
            </p>
            <div className="space-y-3 mb-7">
              <Row label="PURPOSE" value="Daily payback tracking" />
              <Divider />
              <Row label="VALID FOR" value="12 months" />
              <Divider />
              <Row label="REVOKE ANYTIME" value="From settings" />
            </div>
            <div className="flex flex-col gap-3">
              <PrimaryBtn>Approve consent</PrimaryBtn>
              <SecondaryBtn>Don&apos;t connect</SecondaryBtn>
            </div>
              </div>
            </Squircle>
          </div>
        </div>
      )}
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  06b — Row actions (Fold-style icon | label | meta | arrow)        */
/* ------------------------------------------------------------------ */

function RowActions() {
  const items = [
    {
      icon: <BoltIcon />,
      title: "Add another site",
      sub: "Apartment / office / industrial",
      meta: "Pune-02",
    },
    {
      icon: <CalendarIcon />,
      title: "Schedule maintenance",
      sub: "Quarterly battery health check",
      meta: "Next: Aug 14",
    },
    {
      icon: <BellIcon />,
      title: "Notification preferences",
      sub: "Fault alerts, monthly statements, ROI digest",
      meta: "3 on",
    },
    {
      icon: <BoltIcon />,
      title: "Export consumption data",
      sub: "Last 90 days · CSV or PDF",
      meta: "—",
    },
  ];
  return (
    <Squircle
      fill={tokens.card}
      stroke={tokens.hairline}
      cornerRadius={28}
      cornerSmoothing={0.8}
    >
      {items.map((row, i) => (
        <button
          key={row.title}
          type="button"
          className="flex w-full items-center gap-4 px-6 py-4 text-left transition-colors"
          style={{
            borderTop: i === 0 ? "none" : `1px solid ${tokens.hairline}`,
            background: "transparent",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = tokens.pageBgDeep)}
          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
        >
          <Squircle
            fill={tokens.chip}
            cornerRadius={11}
            cornerSmoothing={0.7}
            style={{ width: 40, height: 40, flexShrink: 0 }}
          >
            <div className="grid place-items-center" style={{ width: 40, height: 40, color: tokens.ink }}>
              {row.icon}
            </div>
          </Squircle>
          <div className="flex-1 min-w-0">
            <p className="text-[14px] font-semibold leading-tight" style={{ color: tokens.ink }}>
              {row.title}
            </p>
            <p className="text-[12px] mt-0.5" style={{ color: tokens.muted }}>
              {row.sub}
            </p>
          </div>
          <span className="text-[12px] uppercase tracking-[0.08em] font-semibold" style={{ color: tokens.inkMuted }}>
            {row.meta}
          </span>
          <ChevronIcon />
        </button>
      ))}
    </Squircle>
  );
}

/* ------------------------------------------------------------------ */
/*  Atoms                                                              */
/* ------------------------------------------------------------------ */

function MicroFact({ label, value, tone }: { label: string; value: string; tone?: "accent" }) {
  return (
    <div className="flex-1 pt-3">
      <p className="text-[10px] uppercase tracking-[0.12em]" style={{ color: tokens.muted, fontWeight: 600 }}>
        {label}
      </p>
      <p
        className="text-[15px] font-semibold tracking-[-0.01em] mt-0.5"
        style={{ color: tone === "accent" ? tokens.accentLine : tokens.ink }}
      >
        {value}
      </p>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-1">
      <span
        className="text-[11px] uppercase tracking-[0.12em]"
        style={{ color: tokens.inkMuted, fontWeight: 600 }}
      >
        {label}
      </span>
      <span className="text-[13px] font-semibold" style={{ color: tokens.ink }}>
        {value}
      </span>
    </div>
  );
}

function Divider() {
  return <div style={{ height: 1, background: tokens.hairline, margin: "8px 0" }} />;
}

function BellIcon() {
  return <Bell size={18} weight="regular" />;
}

function CalendarIcon() {
  return <CalendarBlank size={14} weight="regular" />;
}

function ChevronIcon() {
  return <CaretRight size={14} weight="bold" color={tokens.inkMuted} style={{ flexShrink: 0 }} />;
}

function BoltIcon() {
  return <Lightning size={18} weight="regular" />;
}

function Spark() {
  return (
    <svg viewBox="0 0 320 80" className="w-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id="sparkFill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={tokens.accentFill} stopOpacity="0.55" />
          <stop offset="100%" stopColor={tokens.accentFill} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M0,60 C40,50 60,40 90,42 C120,44 140,30 170,28 C200,26 220,38 250,30 C275,24 295,18 320,12 L320,80 L0,80 Z"
        fill="url(#sparkFill)"
      />
      <path
        d="M0,60 C40,50 60,40 90,42 C120,44 140,30 170,28 C200,26 220,38 250,30 C275,24 295,18 320,12"
        stroke={tokens.accentLine}
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}
