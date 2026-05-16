import { useState, type CSSProperties, type ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Bed,
  BookOpen,
  Books,
  Broadcast,
  Buildings,
  Briefcase,
  BuildingOffice,
  CaretRight,
  Factory,
  FirstAid,
  ForkKnife,
  GraduationCap,
  HardDrives,
  House,
  HouseLine,
  List,
  Network,
  ShoppingBag,
  Sun,
  TreePalm,
  X,
  type Icon,
} from "@phosphor-icons/react";

import { Logo } from "../../components/Logo";
import { tokens } from "./_v3-tokens";

/*
  Mobile menu prototype. Phone-frame mockup with three states:
  - closed: nav bar with hamburger
  - root: drawer with 5 audiences + utility + CTAs
  - drilled-in: per-audience solutions + featured + spotlight, with back arrow
*/

function Rect({
  children,
  fill,
  stroke,
  strokeWidth = 1,
  cornerRadius = 16,
  className,
  style,
  onClick,
}: {
  children: ReactNode;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  cornerRadius?: number;
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
}) {
  return (
    <div
      className={className}
      onClick={onClick}
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

type Audience = {
  key: string;
  label: string;
  kicker: string;
  blurb: string;
  solutions: { Icon: Icon; name: string; sub: string }[];
  featured: { label: string; meta: string }[];
  spotlight: { kicker: string; title: string; bullet: string; cta: string };
};

const AUDIENCES: Audience[] = [
  {
    key: "homes",
    label: "Homes",
    kicker: "01",
    blurb: "Apartment ESS to whole-home storage. Roof solar optional.",
    solutions: [
      { Icon: Buildings, name: "Apartment ESS", sub: "3–7 kWh · single phase" },
      { Icon: House, name: "Small home", sub: "7–15 kWh · single phase" },
      { Icon: HouseLine, name: "Large home", sub: "15–30 kWh · 3-phase" },
      { Icon: Sun, name: "Solar storage combo", sub: "Inverter + battery" },
    ],
    featured: [
      { label: "Apartment RWA case study", meta: "Pune-02 · 26mo payback" },
      { label: "Home ROI calculator", meta: "Run your numbers" },
      { label: "Datasheet · Atlas-01", meta: "PDF · 1.2MB" },
    ],
    spotlight: {
      kicker: "POPULAR",
      title: "Apartment ESS pack",
      bullet: "7.4 kWh modular · pays back at ₹6/unit",
      cta: "Configure for your flat",
    },
  },
  {
    key: "offices",
    label: "Offices & Industrial",
    kicker: "02",
    blurb: "Mid-office UPS to factory backup at 1MW.",
    solutions: [
      { Icon: Briefcase, name: "Small office", sub: "30–80 kWh · UPS" },
      { Icon: BuildingOffice, name: "Mid-office UPS", sub: "100–250 kWh" },
      { Icon: Buildings, name: "Large campus", sub: "500 kWh+ · multi-feeder" },
      { Icon: Factory, name: "Factory backup", sub: "1MW+ · OCPP" },
    ],
    featured: [
      { label: "Pune-02 factory case", meta: "22mo payback · 500kW" },
      { label: "Office ROI calculator", meta: "Run your tariff" },
      { label: "FlexCube 500SL datasheet", meta: "PDF · 2.4MB" },
    ],
    spotlight: {
      kicker: "MOST DEPLOYED",
      title: "FlexCube 500SL",
      bullet: "500 kWh containerised · 30 deployed in India",
      cta: "Schedule a site survey",
    },
  },
  {
    key: "institute",
    label: "Institute",
    kicker: "03",
    blurb: "Schools, colleges, university campuses.",
    solutions: [
      { Icon: BookOpen, name: "School microgrid", sub: "Backup + roof solar" },
      { Icon: Books, name: "College block", sub: "Per-building storage" },
      { Icon: GraduationCap, name: "University campus", sub: "Multi-site rollup" },
      { Icon: Buildings, name: "Hostels & PG", sub: "Shared-meter packs" },
    ],
    featured: [
      { label: "IIT-Goa pilot", meta: "Multi-block · GridOS" },
      { label: "Institute funding guide", meta: "PMS · 60% subsidy" },
      { label: "Maintenance contracts", meta: "Annual + 4-hour SLA" },
    ],
    spotlight: {
      kicker: "PARTNER PROGRAM",
      title: "Education subsidy stack",
      bullet: "Up to 60% PMS subsidy + free design audit",
      cta: "Talk to education team",
    },
  },
  {
    key: "enterprises",
    label: "Enterprises",
    kicker: "04",
    blurb: "Data centers, telecom, hospitals, multi-site.",
    solutions: [
      { Icon: HardDrives, name: "Data centers", sub: "Rack UPS + grid storage" },
      { Icon: Broadcast, name: "Telecom towers", sub: "Diesel replacement" },
      { Icon: FirstAid, name: "Hospitals", sub: "Critical load + stability" },
      { Icon: Network, name: "Multi-site", sub: "30+ assets · one console" },
    ],
    featured: [
      { label: "Vodafone tower rollout", meta: "180 sites · 12mo" },
      { label: "Enterprise SLA tiers", meta: "4hr / 8hr / next-day" },
      { label: "GridOS API docs", meta: "OCPP 2.0.1 · MQTT" },
    ],
    spotlight: {
      kicker: "MULTI-SITE",
      title: "GridOS Enterprise",
      bullet: "Roll up 30+ sites · self-host on your infra",
      cta: "Book platform demo",
    },
  },
  {
    key: "hospitality",
    label: "Hospitality",
    kicker: "05",
    blurb: "Hotels, resorts, restaurants, malls.",
    solutions: [
      { Icon: Bed, name: "Hotels", sub: "200–800 kWh per property" },
      { Icon: TreePalm, name: "Resorts", sub: "Off-grid + diesel offset" },
      { Icon: ForkKnife, name: "Restaurants", sub: "60–150 kWh · QSR" },
      { Icon: ShoppingBag, name: "Malls", sub: "1MW+ · HVAC peak shaving" },
    ],
    featured: [
      { label: "Resort case · Goa", meta: "Diesel offset · 18mo" },
      { label: "Mall HVAC playbook", meta: "Peak-hour arbitrage" },
      { label: "Franchise rollout SLA", meta: "30+ outlet bundles" },
    ],
    spotlight: {
      kicker: "OFF-GRID",
      title: "Resort + solar stack",
      bullet: "Diesel offset 80%+ · tourism-board compliant",
      cta: "Talk to hospitality team",
    },
  },
];

type View = "closed" | "root" | string;

export default function V3Mobile() {
  return (
    <div
      className="v3-page"
      style={{
        background: tokens.pageBgDeep,
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
      `}</style>

      <PreviewHeader />

      <main className="mx-auto max-w-[1200px] px-8 py-12">
        <Header />
        <div className="flex justify-center">
          <PhoneFrame>
            <MobileApp />
          </PhoneFrame>
        </div>
        <Captions />
      </main>
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
      <span className="text-[11px] tracking-[0.12em] uppercase" style={{ color: tokens.brand, fontWeight: 700 }}>
        V3 · MOBILE MENU
      </span>
      <span className="text-[13px] font-medium">GridEnergy — mobile nav prototype</span>
      <span className="ml-auto text-[11px] tracking-[0.08em] uppercase opacity-50">
        /preview/v3-mobile
      </span>
    </header>
  );
}

function Header() {
  return (
    <div className="mb-10 text-center">
      <div className="flex items-center justify-center gap-2 mb-3">
        <span style={{ width: 6, height: 6, borderRadius: 999, background: tokens.brand }} />
        <span className="text-[10px] uppercase tracking-[0.16em]" style={{ color: tokens.brand, fontWeight: 700 }}>
          MOBILE MENU PROTOTYPE
        </span>
      </div>
      <h1 className="text-[36px] font-semibold tracking-[-0.025em] leading-[1.1] mb-3" style={{ color: tokens.ink }}>
        Tap the hamburger to open. Tap an audience to drill in.
      </h1>
      <p className="text-[14px] leading-[1.6] max-w-[52ch] mx-auto" style={{ color: tokens.body }}>
        Three states in one interactive frame: closed → root menu → audience drill-down. Tap
        outside the frame to dismiss. Mobile dimensions: 390×844 (iPhone 14).
      </p>
    </div>
  );
}

function Captions() {
  return (
    <div className="grid grid-cols-3 gap-4 mt-10 max-w-[860px] mx-auto">
      {[
        { kicker: "01 · CLOSED", title: "Mobile nav bar", sub: "Logo left + hamburger right. No drawer." },
        { kicker: "02 · ROOT", title: "Root menu drawer", sub: "5 audiences + utility links + CTAs at bottom." },
        { kicker: "03 · DRILLED", title: "Audience detail", sub: "Solutions tile grid + featured + spotlight, stacked." },
      ].map((c) => (
        <Rect key={c.kicker} fill={tokens.card} stroke={tokens.hairline} cornerRadius={14}>
          <div className="p-4">
            <p className="text-[10px] uppercase tracking-[0.14em] mb-2" style={{ color: tokens.brand, fontWeight: 700 }}>
              {c.kicker}
            </p>
            <p className="text-[14px] font-semibold leading-tight mb-1" style={{ color: tokens.ink }}>
              {c.title}
            </p>
            <p className="text-[12px]" style={{ color: tokens.muted }}>
              {c.sub}
            </p>
          </div>
        </Rect>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Phone frame                                                        */
/* ------------------------------------------------------------------ */

function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        width: 390,
        height: 844,
        borderRadius: 56,
        background: tokens.ink,
        padding: 10,
        boxShadow: "0 32px 96px oklch(15.3% 0.006 107.1 / 0.30)",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 46,
          background: tokens.pageBg,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* status bar */}
        <div
          className="flex items-center justify-between px-7"
          style={{ height: 44, color: tokens.ink }}
        >
          <span className="text-[13px] font-semibold">9:41</span>
          <span className="text-[12px]" style={{ color: tokens.ink }}>
            ▮▮▮▮▮
          </span>
        </div>
        {/* notch */}
        <div
          style={{
            position: "absolute",
            top: 8,
            left: "50%",
            transform: "translateX(-50%)",
            width: 110,
            height: 28,
            background: tokens.ink,
            borderRadius: 18,
          }}
        />
        {children}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  The mobile app — manages all 3 states                              */
/* ------------------------------------------------------------------ */

function MobileApp() {
  const [view, setView] = useState<View>("closed");
  const audience = AUDIENCES.find((a) => a.key === view);

  return (
    <>
      {/* underlying page (visible only when closed) */}
      <MobilePage onOpenMenu={() => setView("root")} />

      {/* root menu drawer */}
      {view === "root" && (
        <MobileRoot
          onPickAudience={(k) => setView(k)}
          onClose={() => setView("closed")}
        />
      )}

      {/* drilled-in audience view */}
      {audience && (
        <MobileAudience
          audience={audience}
          onBack={() => setView("root")}
          onClose={() => setView("closed")}
        />
      )}
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Page (closed state) — minimal hero preview                         */
/* ------------------------------------------------------------------ */

function MobilePage({ onOpenMenu }: { onOpenMenu: () => void }) {
  return (
    <div style={{ position: "absolute", top: 44, left: 0, right: 0, bottom: 0 }}>
      <MobileNavBar onOpenMenu={onOpenMenu} />
      <div className="px-5 py-6">
        <div className="flex items-center gap-2 mb-3">
          <span style={{ width: 5, height: 5, borderRadius: 999, background: tokens.brand }} />
          <span className="text-[9px] uppercase tracking-[0.16em]" style={{ color: tokens.brand, fontWeight: 700 }}>
            GRIDENERGY · BATTERY STORAGE
          </span>
        </div>
        <h2 className="text-[34px] tracking-[-0.025em] leading-[1.02] mb-4" style={{ color: tokens.ink, fontFamily: "var(--font-display)" }}>
          Storage that pays itself back.
        </h2>
        <p className="text-[13px] leading-[1.55] mb-5" style={{ color: tokens.body }}>
          18 to 36 months on a typical commercial install. GridOS gives every operator a console that does not lie.
        </p>
        <button
          type="button"
          className="px-5 py-3 text-[12px] uppercase tracking-[0.08em] font-semibold"
          style={{ background: tokens.brand, color: "white", borderRadius: 12, border: "none" }}
        >
          Get early access
        </button>
      </div>
    </div>
  );
}

function MobileNavBar({ onOpenMenu }: { onOpenMenu: () => void }) {
  return (
    <div
      className="flex items-center justify-between px-5 py-3"
      style={{ borderBottom: `1px solid ${tokens.hairline}`, background: tokens.pageBgDeep }}
    >
      <div className="flex items-center gap-2">
        <Logo variant="gridenergy" size={26} />
        <span className="text-[14px] font-semibold tracking-[-0.02em]" style={{ color: tokens.ink }}>
          GridEnergy
        </span>
      </div>
      <button
        type="button"
        onClick={onOpenMenu}
        className="grid place-items-center"
        style={{
          width: 38,
          height: 38,
          background: tokens.chip,
          color: tokens.ink,
          borderRadius: 12,
          border: "none",
          cursor: "pointer",
        }}
        aria-label="Open menu"
      >
        <List size={18} weight="bold" />
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Root menu drawer                                                   */
/* ------------------------------------------------------------------ */

function MobileRoot({
  onPickAudience,
  onClose,
}: {
  onPickAudience: (key: string) => void;
  onClose: () => void;
}) {
  return (
    <div
      style={{
        position: "absolute",
        top: 44,
        left: 0,
        right: 0,
        bottom: 0,
        background: tokens.pageBg,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <MobileDrawerHeader onClose={onClose} />

      {/* scroll area */}
      <div style={{ flex: 1, overflowY: "auto", padding: "8px 16px 16px" }}>
        <p className="text-[10px] uppercase tracking-[0.16em] mb-3 mt-2" style={{ color: tokens.inkMuted, fontWeight: 700 }}>
          SOLUTIONS BY AUDIENCE
        </p>
        <ul className="flex flex-col gap-1">
          {AUDIENCES.map((a) => (
            <li key={a.key}>
              <button
                type="button"
                onClick={() => onPickAudience(a.key)}
                className="flex items-center w-full text-left transition-colors"
                style={{
                  background: "transparent",
                  border: "none",
                  borderRadius: 12,
                  padding: "12px 12px",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = tokens.pageBgDeep)}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                <span
                  className="text-[10px] uppercase tracking-[0.14em] w-7"
                  style={{ color: tokens.muted, fontWeight: 700 }}
                >
                  {a.kicker}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-[16px] font-semibold leading-tight" style={{ color: tokens.ink }}>
                    {a.label}
                  </p>
                  <p className="text-[11px] mt-0.5" style={{ color: tokens.muted }}>
                    {a.blurb}
                  </p>
                </div>
                <CaretRight size={14} weight="bold" color={tokens.inkMuted} />
              </button>
            </li>
          ))}
        </ul>

        {/* utility */}
        <div style={{ borderTop: `1px solid ${tokens.hairline}`, marginTop: 16, paddingTop: 16 }}>
          <p className="text-[10px] uppercase tracking-[0.16em] mb-2" style={{ color: tokens.inkMuted, fontWeight: 700 }}>
            COMPANY
          </p>
          <ul>
            {["About", "Partners", "Platform", "Resources", "Support", "Contact"].map((u) => (
              <li key={u}>
                <a
                  href="#"
                  className="block py-2.5 text-[14px] font-medium"
                  style={{ color: tokens.body }}
                >
                  {u}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div style={{ borderTop: `1px solid ${tokens.hairline}`, marginTop: 12, paddingTop: 12 }}>
          <div className="flex items-center gap-2">
            <span style={{ width: 6, height: 6, borderRadius: 999, background: tokens.accentLine }} />
            <span className="text-[11px] uppercase tracking-[0.14em]" style={{ color: tokens.inkMuted, fontWeight: 600 }}>
              All systems operational
            </span>
          </div>
        </div>
      </div>

      {/* sticky CTAs */}
      <MobileCTAs />
    </div>
  );
}

function MobileDrawerHeader({
  onClose,
  onBack,
  title,
}: {
  onClose: () => void;
  onBack?: () => void;
  title?: string;
}) {
  return (
    <div
      className="flex items-center justify-between px-5 py-3"
      style={{ borderBottom: `1px solid ${tokens.hairline}`, background: tokens.pageBgDeep }}
    >
      <div className="flex items-center gap-3">
        {onBack ? (
          <button
            type="button"
            onClick={onBack}
            className="grid place-items-center"
            style={{
              width: 36,
              height: 36,
              background: tokens.chip,
              color: tokens.ink,
              borderRadius: 10,
              border: "none",
              cursor: "pointer",
            }}
            aria-label="Back"
          >
            <ArrowLeft size={16} weight="bold" />
          </button>
        ) : (
          <>
            <Logo variant="gridenergy" size={26} />
            <span className="text-[14px] font-semibold tracking-[-0.02em]" style={{ color: tokens.ink }}>
              GridEnergy
            </span>
          </>
        )}
        {title && (
          <span className="text-[14px] font-semibold" style={{ color: tokens.ink }}>
            {title}
          </span>
        )}
      </div>
      <button
        type="button"
        onClick={onClose}
        className="grid place-items-center"
        style={{
          width: 38,
          height: 38,
          background: tokens.chip,
          color: tokens.ink,
          borderRadius: 12,
          border: "none",
          cursor: "pointer",
        }}
        aria-label="Close menu"
      >
        <X size={18} weight="bold" />
      </button>
    </div>
  );
}

function MobileCTAs() {
  return (
    <div
      className="flex items-center gap-2 px-4 py-3"
      style={{ borderTop: `1px solid ${tokens.hairline}`, background: tokens.pageBgDeep }}
    >
      <button
        type="button"
        className="flex-1 py-3 text-[12px] uppercase tracking-[0.08em] font-semibold"
        style={{
          background: tokens.chip,
          color: tokens.ink,
          borderRadius: 12,
          border: "none",
        }}
      >
        Talk to sales
      </button>
      <button
        type="button"
        className="flex-1 py-3 text-[12px] uppercase tracking-[0.08em] font-semibold"
        style={{
          background: tokens.brand,
          color: "white",
          borderRadius: 12,
          border: "none",
        }}
      >
        Get early access
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Drilled-in audience view                                           */
/* ------------------------------------------------------------------ */

function MobileAudience({
  audience,
  onBack,
  onClose,
}: {
  audience: Audience;
  onBack: () => void;
  onClose: () => void;
}) {
  return (
    <div
      style={{
        position: "absolute",
        top: 44,
        left: 0,
        right: 0,
        bottom: 0,
        background: tokens.pageBg,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <MobileDrawerHeader onBack={onBack} onClose={onClose} title={audience.label} />

      <div style={{ flex: 1, overflowY: "auto", padding: "12px 16px 16px" }}>
        {/* kicker + blurb */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <span style={{ width: 5, height: 5, borderRadius: 999, background: tokens.brand }} />
            <span className="text-[10px] uppercase tracking-[0.16em]" style={{ color: tokens.brand, fontWeight: 700 }}>
              {audience.kicker} · {audience.label.toUpperCase()}
            </span>
          </div>
          <p className="text-[13px] leading-[1.5]" style={{ color: tokens.body }}>
            {audience.blurb}
          </p>
        </div>

        {/* solutions tile grid */}
        <p className="text-[10px] uppercase tracking-[0.14em] mb-2" style={{ color: tokens.inkMuted, fontWeight: 700 }}>
          SOLUTIONS
        </p>
        <div className="grid grid-cols-2 gap-2 mb-6">
          {audience.solutions.map((s) => (
            <MobileTile key={s.name} solution={s} />
          ))}
        </div>

        {/* featured */}
        <p className="text-[10px] uppercase tracking-[0.14em] mb-2" style={{ color: tokens.inkMuted, fontWeight: 700 }}>
          FEATURED
        </p>
        <ul className="flex flex-col mb-6" style={{ background: tokens.card, border: `1px solid ${tokens.hairline}`, borderRadius: 14, overflow: "hidden" }}>
          {audience.featured.map((f, i) => (
            <li key={f.label} style={{ borderTop: i === 0 ? "none" : `1px solid ${tokens.hairline}` }}>
              <a href="#" className="block px-4 py-3">
                <p className="text-[13px] font-semibold leading-tight" style={{ color: tokens.ink }}>
                  {f.label}
                </p>
                <p className="text-[11px] mt-0.5" style={{ color: tokens.muted }}>
                  {f.meta}
                </p>
              </a>
            </li>
          ))}
        </ul>

        {/* spotlight */}
        <Rect fill={tokens.ink} cornerRadius={16}>
          <div className="p-4">
            <div className="flex items-center gap-1.5 mb-2">
              <span style={{ width: 5, height: 5, borderRadius: 999, background: tokens.brand }} />
              <span className="text-[9px] uppercase tracking-[0.16em]" style={{ color: tokens.brand, fontWeight: 700 }}>
                {audience.spotlight.kicker}
              </span>
            </div>
            <p className="text-[16px] font-semibold tracking-[-0.015em] leading-tight mb-2" style={{ color: "#ffffff" }}>
              {audience.spotlight.title}
            </p>
            <p className="text-[11.5px] leading-snug mb-3" style={{ color: "rgba(255,255,255,0.65)" }}>
              {audience.spotlight.bullet}
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-1 text-[10.5px] uppercase tracking-[0.12em] font-semibold"
              style={{ color: tokens.brand }}
            >
              {audience.spotlight.cta}
              <ArrowRight size={11} weight="bold" color={tokens.brand} />
            </a>
          </div>
        </Rect>
      </div>

      <MobileCTAs />
    </div>
  );
}

function MobileTile({ solution }: { solution: Audience["solutions"][number] }) {
  const { Icon, name, sub } = solution;
  return (
    <a
      href="#"
      className="block overflow-hidden"
      style={{
        background: tokens.card,
        border: `1px solid ${tokens.hairline}`,
        borderRadius: 12,
      }}
    >
      <div
        className="grid place-items-center"
        style={{ background: tokens.pageBgDeep, aspectRatio: "16 / 10" }}
      >
        <Icon size={44} weight="duotone" color={tokens.ink} style={{ opacity: 0.65 }} />
      </div>
      <div className="px-2.5 py-2">
        <p className="text-[12px] font-semibold leading-tight" style={{ color: tokens.ink }}>
          {name}
        </p>
        <p className="text-[10px] mt-0.5" style={{ color: tokens.muted }}>
          {sub}
        </p>
      </div>
    </a>
  );
}
