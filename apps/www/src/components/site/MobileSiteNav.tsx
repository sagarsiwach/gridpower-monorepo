import { useState, type CSSProperties, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
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
  Lightning,
  List,
  Moon,
  Network,
  ShoppingBag,
  Sun,
  TreePalm,
  X,
  type Icon,
} from "@phosphor-icons/react";

import { Logo } from "../Logo";
import { useMegamenuTheme } from "../../routes/_preview/_v3-tokens";

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
  solutions: { Icon: Icon; name: string; sub: string; image?: string }[];
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
      { Icon: Buildings, name: "Apartment ESS", sub: "3–7 kWh · single phase", image: "/images/solutions/homes-apartment.png" },
      { Icon: House, name: "Small home", sub: "7–15 kWh · single phase", image: "/images/solutions/homes-small.png" },
      { Icon: HouseLine, name: "Large home", sub: "15–30 kWh · 3-phase", image: "/images/solutions/homes-large.png" },
      { Icon: Sun, name: "Solar storage combo", sub: "Inverter + battery", image: "/images/solutions/homes-solar.png" },
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

type TabKey = "home" | "solutions" | "platform" | "about" | "contact";

const BOTTOM_TABS: { key: TabKey; label: string }[] = [
  { key: "home", label: "Home" },
  { key: "solutions", label: "Solutions" },
  { key: "platform", label: "Platform" },
  { key: "about", label: "About" },
  { key: "contact", label: "Contact" },
];

type View = "closed" | "root" | string;

export default function MobileSiteNav({ currentRoute = "home" }: { currentRoute?: string }) {
  const { tokens } = useMegamenuTheme();
  const [view, setView] = useState<View>("closed");
  const audience = AUDIENCES.find((a) => a.key === view);
  const reduce = useReducedMotion();

  const drawerSlide = reduce
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: 20 } };

  const audienceSlide = reduce
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : { initial: { opacity: 0, x: 32 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: 32 } };

  const transition = { duration: reduce ? 0 : 0.22, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <div style={{ position: "relative" }}>
      <MobileNavBar onOpenMenu={() => setView("root")} />

      <AnimatePresence>
        {view === "root" && (
          <motion.div
            key="mobile-root"
            {...drawerSlide}
            transition={transition}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 60,
              display: "flex",
              flexDirection: "column",
              background: tokens.pageBg,
              fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
            }}
          >
            <MobileRoot
              onPickAudience={(k) => setView(k)}
              onClose={() => setView("closed")}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {audience && (
          <motion.div
            key={`mobile-audience-${audience.key}`}
            {...audienceSlide}
            transition={transition}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 70,
              display: "flex",
              flexDirection: "column",
              background: tokens.pageBg,
              fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
            }}
          >
            <MobileAudience
              audience={audience}
              onBack={() => setView("root")}
              onClose={() => setView("closed")}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <MobileBottomTabBar currentRoute={currentRoute} onOpenSolutions={() => setView("root")} />
    </div>
  );
}

function MobileNavBar({ onOpenMenu }: { onOpenMenu: () => void }) {
  const { theme, tokens, toggle } = useMegamenuTheme();
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
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={toggle}
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
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
        >
          {theme === "dark" ? <Sun size={16} weight="fill" /> : <Moon size={16} weight="fill" />}
        </button>
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
    </div>
  );
}

function MobileBottomTabBar({
  currentRoute,
  onOpenSolutions,
}: {
  currentRoute: string;
  onOpenSolutions: () => void;
}) {
  const { tokens } = useMegamenuTheme();
  return (
    <div
      className="fixed bottom-0 left-0 right-0 flex items-center justify-around"
      style={{
        height: 64,
        background: tokens.pageBgDeep,
        borderTop: `1px solid ${tokens.hairline}`,
        zIndex: 50,
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
      }}
    >
      {BOTTOM_TABS.map((tab) => {
        const isActive = currentRoute === tab.key;
        return (
          <button
            key={tab.key}
            type="button"
            onClick={tab.key === "solutions" ? onOpenSolutions : undefined}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 3,
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "8px 0",
            }}
          >
            <span
              style={{
                width: 28,
                height: 3,
                borderRadius: 999,
                background: isActive ? tokens.brand : "transparent",
                marginBottom: 2,
              }}
            />
            <span
              className="text-[11px] font-semibold"
              style={{ color: isActive ? tokens.brand : tokens.muted }}
            >
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function MobileRoot({
  onPickAudience,
  onClose,
}: {
  onPickAudience: (key: string) => void;
  onClose: () => void;
}) {
  const { tokens } = useMegamenuTheme();
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <MobileDrawerHeader onClose={onClose} />
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
                <span className="text-[10px] uppercase tracking-[0.14em] w-7" style={{ color: tokens.muted, fontWeight: 700 }}>
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

        <div style={{ borderTop: `1px solid ${tokens.hairline}`, marginTop: 16, paddingTop: 16 }}>
          <p className="text-[10px] uppercase tracking-[0.16em] mb-2" style={{ color: tokens.inkMuted, fontWeight: 700 }}>
            COMPANY
          </p>
          <ul>
            {["About", "Partners", "Platform", "Resources", "Support", "Contact"].map((u) => (
              <li key={u}>
                <a href="#" className="block py-2.5 text-[14px] font-medium" style={{ color: tokens.body }}>
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
  const { tokens } = useMegamenuTheme();
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
  const { tokens } = useMegamenuTheme();
  return (
    <div
      className="flex items-center gap-2 px-4 py-3"
      style={{ borderTop: `1px solid ${tokens.hairline}`, background: tokens.pageBgDeep }}
    >
      <button
        type="button"
        className="flex-1 py-3 text-[12px] uppercase tracking-[0.08em] font-semibold"
        style={{ background: tokens.chip, color: tokens.ink, borderRadius: 12, border: "none" }}
      >
        Talk to sales
      </button>
      <button
        type="button"
        className="flex-1 py-3 text-[12px] uppercase tracking-[0.08em] font-semibold"
        style={{ background: tokens.brand, color: "white", borderRadius: 12, border: "none" }}
      >
        <Lightning size={12} weight="fill" color="white" style={{ display: "inline", marginRight: 6 }} />
        Get early access
      </button>
    </div>
  );
}

function MobileAudience({
  audience,
  onBack,
  onClose,
}: {
  audience: Audience;
  onBack: () => void;
  onClose: () => void;
}) {
  const { tokens } = useMegamenuTheme();
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <MobileDrawerHeader onBack={onBack} onClose={onClose} title={audience.label} />
      <div style={{ flex: 1, overflowY: "auto", padding: "12px 16px 16px" }}>
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

        <p className="text-[10px] uppercase tracking-[0.14em] mb-2" style={{ color: tokens.inkMuted, fontWeight: 700 }}>
          SOLUTIONS
        </p>
        <div className="grid grid-cols-2 gap-2 mb-6">
          {audience.solutions.map((s) => (
            <MobileTile key={s.name} solution={s} />
          ))}
        </div>

        <p className="text-[10px] uppercase tracking-[0.14em] mb-2" style={{ color: tokens.inkMuted, fontWeight: 700 }}>
          FEATURED
        </p>
        <ul
          className="flex flex-col mb-6"
          style={{ background: tokens.card, border: `1px solid ${tokens.hairline}`, borderRadius: 14, overflow: "hidden" }}
        >
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
  const { Icon, name, sub, image } = solution;
  const { theme, tokens } = useMegamenuTheme();
  const displayImage = image
    ? theme === "dark"
      ? image.replace(/\.png$/, "-dark.png")
      : image
    : undefined;
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
      <div className="overflow-hidden" style={{ background: tokens.pageBgDeep, aspectRatio: "16 / 10" }}>
        {displayImage ? (
          <img
            src={displayImage}
            alt={name}
            className="w-full h-full"
            style={{ objectFit: "cover", display: "block" }}
            loading="lazy"
          />
        ) : (
          <div className="grid place-items-center" style={{ width: "100%", height: "100%" }}>
            <Icon size={44} weight="duotone" color={tokens.ink} style={{ opacity: 0.65 }} />
          </div>
        )}
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
