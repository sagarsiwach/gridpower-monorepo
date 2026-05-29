import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { Link } from "react-router";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowRight,
  Bed,
  BookOpen,
  Books,
  Broadcast,
  Buildings,
  Briefcase,
  BuildingOffice,
  Factory,
  FirstAid,
  ForkKnife,
  GraduationCap,
  HardDrives,
  House,
  HouseLine,
  Lightning,
  Moon,
  Network,
  ShoppingBag,
  SignIn,
  Sun,
  TreePalm,
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
}: {
  children: ReactNode;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  cornerRadius?: number;
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

type Audience = {
  key: string;
  label: string;
  kicker: string;
  blurb: string;
  solutions: {
    Icon: Icon;
    name: string;
    sub: string;
    href: string;
    image?: string;
  }[];
  featured: { label: string; meta: string; href: string }[];
  spotlight: {
    kicker: string;
    title: string;
    bullets: string[];
    cta: string;
    platformKicker: string;
    platformTitle: string;
    platformSub: string;
    platformCta: string;
  };
};

const AUDIENCES: Audience[] = [
  {
    key: "homes",
    label: "Homes",
    kicker: "01",
    blurb: "Apartment ESS to whole-home storage. Roof solar optional.",
    solutions: [
      { Icon: Buildings, name: "Apartment ESS", sub: "3–7 kWh · single phase", href: "/solutions/homes", image: "/images/solutions/homes-apartment.png" },
      { Icon: House, name: "Small home", sub: "7–15 kWh · single phase", href: "/solutions/homes", image: "/images/solutions/homes-small.png" },
      { Icon: HouseLine, name: "Large home", sub: "15–30 kWh · 3-phase", href: "/solutions/homes", image: "/images/solutions/homes-large.png" },
      { Icon: Sun, name: "Solar storage combo", sub: "Inverter + battery", href: "/solutions/homes", image: "/images/solutions/homes-solar.png" },
    ],
    featured: [
      { label: "Apartment RWA case study", meta: "Pune-02 · 26mo payback", href: "#" },
      { label: "Home ROI calculator", meta: "Run your numbers", href: "#" },
      { label: "Datasheet · Atlas-01", meta: "PDF · 1.2MB", href: "#" },
    ],
    spotlight: {
      kicker: "POPULAR",
      title: "Apartment ESS pack",
      bullets: ["7.4 kWh modular", "Bolts to wall in 2 hours", "Pays back at ₹6/unit"],
      cta: "Configure for your flat",
      platformKicker: "PLATFORM",
      platformTitle: "GridOS Home Console",
      platformSub: "Daily meter reads. Per-asset payback. Open standards.",
      platformCta: "See GridOS",
    },
  },
  {
    key: "offices",
    label: "Offices & Industrial",
    kicker: "02",
    blurb: "Mid-office UPS to factory backup at 1MW.",
    solutions: [
      { Icon: Briefcase, name: "Small office", sub: "30–80 kWh · UPS", href: "#" },
      { Icon: BuildingOffice, name: "Mid-office UPS", sub: "100–250 kWh · arbitrage", href: "#" },
      { Icon: Buildings, name: "Large campus", sub: "500 kWh+ · multi-feeder", href: "#" },
      { Icon: Factory, name: "Factory backup", sub: "1MW+ · OCPP integrated", href: "#" },
    ],
    featured: [
      { label: "Pune-02 factory case", meta: "22mo payback · 500kW", href: "#" },
      { label: "Office ROI calculator", meta: "Run your tariff", href: "#" },
      { label: "FlexCube 500SL datasheet", meta: "PDF · 2.4MB", href: "#" },
    ],
    spotlight: {
      kicker: "MOST DEPLOYED",
      title: "FlexCube 500SL",
      bullets: ["500 kWh containerised", "Drop-in factory backup", "30 deployed in India"],
      cta: "Schedule a site survey",
      platformKicker: "PLATFORM",
      platformTitle: "GridOS Operator Console",
      platformSub: "Tariff-arbitrage scheduler. Fault flags. OCPP 2.0.1 native.",
      platformCta: "See GridOS",
    },
  },
  {
    key: "institute",
    label: "Institute",
    kicker: "03",
    blurb: "Schools, colleges, university campuses with bursty load patterns.",
    solutions: [
      { Icon: BookOpen, name: "School microgrid", sub: "Backup + roof solar", href: "#" },
      { Icon: Books, name: "College block", sub: "Per-building storage", href: "#" },
      { Icon: GraduationCap, name: "University campus", sub: "Multi-site rollup", href: "#" },
      { Icon: Buildings, name: "Hostels & PG", sub: "Shared-meter packs", href: "#" },
    ],
    featured: [
      { label: "IIT-Goa pilot", meta: "Multi-block · GridOS", href: "#" },
      { label: "Institute funding guide", meta: "PMS scheme · 60% subsidy", href: "#" },
      { label: "Maintenance contracts", meta: "Annual + 4-hour SLA", href: "#" },
    ],
    spotlight: {
      kicker: "PARTNER PROGRAM",
      title: "Education subsidy stack",
      bullets: ["Up to 60% PMS subsidy", "Free design audit", "5-year maintenance bundled"],
      cta: "Talk to education team",
      platformKicker: "PLATFORM",
      platformTitle: "GridOS Campus Dashboard",
      platformSub: "Per-building energy ledger. Subsidy tracking. Multi-site rollup.",
      platformCta: "See GridOS",
    },
  },
  {
    key: "enterprises",
    label: "Enterprises",
    kicker: "04",
    blurb: "Data centers, telecom, hospitals — load-critical with multi-site rollup.",
    solutions: [
      { Icon: HardDrives, name: "Data centers", sub: "Rack UPS + grid storage", href: "#" },
      { Icon: Broadcast, name: "Telecom towers", sub: "Diesel replacement", href: "#" },
      { Icon: FirstAid, name: "Hospitals", sub: "Critical load + stability", href: "#" },
      { Icon: Network, name: "Multi-site", sub: "30+ assets · one console", href: "#" },
    ],
    featured: [
      { label: "Vodafone Idea tower rollout", meta: "180 sites · 12mo", href: "#" },
      { label: "Enterprise SLA tiers", meta: "4hr / 8hr / next-day", href: "#" },
      { label: "GridOS API docs", meta: "OCPP 2.0.1 · MQTT", href: "#" },
    ],
    spotlight: {
      kicker: "MULTI-SITE",
      title: "GridOS Enterprise console",
      bullets: ["Roll up 30+ sites", "Per-site cost ledger", "Self-host on your infra"],
      cta: "Book platform demo",
      platformKicker: "OPEN STANDARDS",
      platformTitle: "OCPP · Modbus · MQTT",
      platformSub: "No vendor lock-in. Self-hostable. Open protocol integrations.",
      platformCta: "Read API docs",
    },
  },
  {
    key: "hospitality",
    label: "Hospitality",
    kicker: "05",
    blurb: "Hotels, resorts, restaurants, malls — round-the-clock load with high peak surges.",
    solutions: [
      { Icon: Bed, name: "Hotels", sub: "200–800 kWh · property", href: "#" },
      { Icon: TreePalm, name: "Resorts", sub: "Off-grid + diesel offset", href: "#" },
      { Icon: ForkKnife, name: "Restaurants", sub: "60–150 kWh · QSR chains", href: "#" },
      { Icon: ShoppingBag, name: "Malls", sub: "1MW+ · HVAC peak shaving", href: "#" },
    ],
    featured: [
      { label: "Resort case · Goa", meta: "Diesel offset · 18mo payback", href: "#" },
      { label: "Mall HVAC playbook", meta: "Peak-hour arbitrage", href: "#" },
      { label: "Franchise rollout SLA", meta: "30+ outlet bundles", href: "#" },
    ],
    spotlight: {
      kicker: "OFF-GRID",
      title: "Resort + solar stack",
      bullets: ["Diesel offset 80%+", "Battery-only off-peak", "Tourism-board compliant"],
      cta: "Talk to hospitality team",
      platformKicker: "PLATFORM",
      platformTitle: "GridOS Property Console",
      platformSub: "Peak-load scheduler. Diesel-offset tracking. One dashboard.",
      platformCta: "See GridOS",
    },
  },
];

export default function SiteHeader() {
  const { theme, tokens, toggle } = useMegamenuTheme();
  const [open, setOpen] = useState<string | null>(null);
  const navWrapRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      const target = e.target as Node;
      const inNav = navWrapRef.current?.contains(target);
      const inPanel = panelRef.current?.contains(target);
      if (!inNav && !inPanel) setOpen(null);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    let closeTimer: number | undefined;
    const cancelClose = () => {
      if (closeTimer !== undefined) {
        window.clearTimeout(closeTimer);
        closeTimer = undefined;
      }
    };
    const scheduleClose = () => {
      if (closeTimer === undefined) {
        closeTimer = window.setTimeout(() => {
          setOpen(null);
          closeTimer = undefined;
        }, 180);
      }
    };
    const isInside = (rect: DOMRect | undefined, x: number, y: number) =>
      rect ? x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom : false;

    const onMove = (e: MouseEvent) => {
      const navRect = navWrapRef.current?.getBoundingClientRect();
      const panelRect = panelRef.current?.getBoundingClientRect();
      if (isInside(navRect, e.clientX, e.clientY) || isInside(panelRect, e.clientX, e.clientY)) {
        cancelClose();
      } else {
        scheduleClose();
      }
    };
    document.addEventListener("mousemove", onMove);
    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelClose();
    };
  }, [open]);

  return (
    <header style={{ position: "relative", zIndex: 50 }}>
      <UtilityBar />
      <div ref={navWrapRef} style={{ position: "relative" }}>
        <MainNav active={open} onHover={(k) => setOpen(k)} theme={theme} tokens={tokens} toggle={toggle} />
        <AnimatePresence>
          {open && (
            <motion.div
              key="mega-panel-shell"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="absolute left-0 right-0"
              style={{ top: "100%", zIndex: 40, paddingBottom: 24 }}
            >
              <MegaPanel audience={AUDIENCES.find((a) => a.key === open)!} innerRef={panelRef} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

function UtilityBar() {
  const { tokens } = useMegamenuTheme();
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

function MainNav({
  active,
  onHover,
  theme,
  tokens,
  toggle,
}: {
  active: string | null;
  onHover: (key: string) => void;
  theme: "light" | "dark";
  tokens: ReturnType<typeof useMegamenuTheme>["tokens"];
  toggle: () => void;
}) {
  return (
    <div
      style={{
        borderBottom: active ? "1px solid transparent" : `1px solid ${tokens.hairline}`,
        background: `color-mix(in oklch, ${tokens.pageBg} 95%, transparent)`,
        backdropFilter: "blur(8px)",
        position: "relative",
        zIndex: 30,
      }}
    >
      <div className="mx-auto max-w-[1280px] px-8 grid grid-cols-[1fr_auto_1fr] items-center py-4">
        <Link to="/" className="flex items-center gap-2.5 justify-self-start" aria-label="GridEnergy home">
          <Logo variant="gridenergy" size={30} />
          <span className="text-[15px] font-semibold tracking-[-0.02em]" style={{ color: tokens.ink }}>
            GridEnergy
          </span>
        </Link>

        <nav className="flex items-center gap-1 justify-self-center">
          {AUDIENCES.map((a) => {
            const isActive = active === a.key;
            return (
              <button
                key={a.key}
                type="button"
                onMouseEnter={() => onHover(a.key)}
                className="relative px-4 py-2 text-[13px]"
                style={{
                  color: isActive ? tokens.ink : tokens.body,
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  fontWeight: isActive ? 600 : 500,
                  transition: "color 0.15s ease, font-weight 0s",
                }}
              >
                {isActive && (
                  <motion.span
                    layoutId="site-header-active-tab-pill"
                    className="absolute inset-0"
                    style={{
                      background: tokens.card,
                      border: `1px solid ${tokens.hairline}`,
                      borderRadius: 11,
                      zIndex: 0,
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <span style={{ position: "relative", zIndex: 1 }}>{a.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="flex items-center gap-3 justify-self-end">
          <button
            type="button"
            onClick={toggle}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.12em] font-semibold transition-colors"
            style={{
              background: tokens.chip,
              color: tokens.ink,
              padding: "5px 10px 5px 9px",
              borderRadius: 999,
              border: `1px solid ${tokens.hairline}`,
              cursor: "pointer",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = tokens.hairlineStrong)}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = tokens.hairline)}
          >
            {theme === "dark" ? <Sun size={12} weight="fill" /> : <Moon size={12} weight="fill" />}
            {theme === "dark" ? "Light" : "Dark"}
          </button>
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

function MegaPanel({
  audience,
  innerRef,
}: {
  audience: Audience;
  innerRef?: React.Ref<HTMLDivElement>;
}) {
  const { tokens } = useMegamenuTheme();
  return (
    <div className="mx-auto max-w-[1280px] px-8">
      <div ref={innerRef} style={{ filter: "drop-shadow(0 24px 48px oklch(15.3% 0.006 107.1 / 0.18))" }}>
        <Rect
          fill={tokens.card}
          stroke={tokens.hairline}
          cornerRadius={20}
          style={{ overflow: "hidden" }}
        >
          <AnimatePresence initial={false}>
            <motion.div
              key={audience.key}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4, position: "absolute", left: 0, right: 0 }}
              transition={{ duration: 0.14, ease: [0.22, 1, 0.36, 1] }}
            >
              <div
                className="flex items-center justify-between px-5 py-3"
                style={{ borderBottom: `1px solid ${tokens.hairline}` }}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-[10px] uppercase tracking-[0.18em]" style={{ color: tokens.brand, fontWeight: 700 }}>
                    {audience.kicker} · {audience.label.toUpperCase()}
                  </span>
                  <span style={{ width: 1, height: 11, background: tokens.hairlineStrong }} />
                  <span className="text-[12px]" style={{ color: tokens.body }}>
                    {audience.blurb}
                  </span>
                </div>
                <a
                  href="#"
                  className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.12em] font-semibold"
                  style={{ color: tokens.ink }}
                >
                  Explore all {audience.label} solutions
                  <ArrowRight size={12} weight="bold" />
                </a>
              </div>

              <div className="grid grid-cols-12 gap-3 p-3">
                <div className="col-span-7">
                  <p className="px-1 pb-2 text-[10px] uppercase tracking-[0.14em]" style={{ color: tokens.inkMuted, fontWeight: 700 }}>
                    SOLUTIONS
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {audience.solutions.map((s) => (
                      <SolutionTile key={s.name} solution={s} />
                    ))}
                  </div>
                </div>

                <div className="col-span-3" style={{ borderLeft: `1px solid ${tokens.hairline}`, paddingLeft: 12 }}>
                  <p className="px-1 pb-2 text-[10px] uppercase tracking-[0.14em]" style={{ color: tokens.inkMuted, fontWeight: 700 }}>
                    FEATURED
                  </p>
                  <ul className="flex flex-col">
                    {audience.featured.map((f) => (
                      <li key={f.label}>
                        <a
                          href={f.href}
                          className="block px-3 py-2.5 transition-colors"
                          style={{ borderRadius: 10 }}
                          onMouseEnter={(e) => (e.currentTarget.style.background = tokens.pageBgDeep)}
                          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                        >
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
                </div>

                <div className="col-span-2 flex flex-col gap-2">
                  <Rect fill={tokens.ink} cornerRadius={14} style={{ flex: 1 }}>
                    <div className="p-4 flex flex-col h-full">
                      <div className="flex items-center gap-1.5 mb-2">
                        <span style={{ width: 5, height: 5, borderRadius: 999, background: tokens.brand }} />
                        <span className="text-[9px] uppercase tracking-[0.16em]" style={{ color: tokens.brand, fontWeight: 700 }}>
                          {audience.spotlight.kicker}
                        </span>
                      </div>
                      <p className="text-[14px] font-semibold tracking-[-0.015em] leading-tight mb-2" style={{ color: "#ffffff" }}>
                        {audience.spotlight.title}
                      </p>
                      <p className="text-[11px] leading-snug mb-3" style={{ color: "rgba(255,255,255,0.6)" }}>
                        {audience.spotlight.bullets[0]}
                      </p>
                      <a
                        href="#"
                        className="flex items-center gap-1 mt-auto text-[10px] uppercase tracking-[0.12em] font-semibold"
                        style={{ color: tokens.brand }}
                      >
                        {audience.spotlight.cta}
                        <ArrowRight size={10} weight="bold" color={tokens.brand} />
                      </a>
                    </div>
                  </Rect>

                  <Rect
                    fill={tokens.card}
                    stroke={tokens.hairline}
                    cornerRadius={14}
                    style={{ flex: 1 }}
                  >
                    <div className="p-4 flex flex-col h-full">
                      <div className="flex items-center gap-1.5 mb-2">
                        <span style={{ width: 5, height: 5, borderRadius: 999, background: tokens.ink }} />
                        <span className="text-[9px] uppercase tracking-[0.16em]" style={{ color: tokens.ink, fontWeight: 700 }}>
                          {audience.spotlight.platformKicker}
                        </span>
                      </div>
                      <p className="text-[14px] font-semibold tracking-[-0.015em] leading-tight mb-2" style={{ color: tokens.ink }}>
                        {audience.spotlight.platformTitle}
                      </p>
                      <p className="text-[11px] leading-snug mb-3" style={{ color: tokens.muted }}>
                        {audience.spotlight.platformSub}
                      </p>
                      <a
                        href="#"
                        className="flex items-center gap-1 mt-auto text-[10px] uppercase tracking-[0.12em] font-semibold"
                        style={{ color: tokens.ink }}
                      >
                        {audience.spotlight.platformCta}
                        <ArrowRight size={10} weight="bold" color={tokens.ink} />
                      </a>
                    </div>
                  </Rect>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div
            className="flex items-center justify-between px-3 py-2.5"
            style={{ borderTop: `1px solid ${tokens.hairline}`, background: tokens.pageBgDeep }}
          >
            <div className="flex items-center gap-1.5">
              <FooterPill href="#" emphasis>Compare all 5 audiences</FooterPill>
              <FooterPill href="#">ROI calculator</FooterPill>
              <FooterPill href="#">Datasheets</FooterPill>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-[0.12em]" style={{ color: tokens.muted, fontWeight: 600 }}>
                Also from GridPower
              </span>
              <a
                href="#"
                className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.12em] font-semibold transition-colors"
                style={{
                  color: tokens.ink,
                  background: tokens.card,
                  padding: "6px 10px 6px 8px",
                  borderRadius: 10,
                  border: `1px solid ${tokens.hairline}`,
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = tokens.hairlineStrong)}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = tokens.hairline)}
              >
                <Logo variant="gridcharge" size={16} />
                GridCharge
                <ArrowRight size={12} weight="bold" />
              </a>
            </div>
          </div>
        </Rect>
      </div>
    </div>
  );
}

function FooterPill({
  children,
  href,
  emphasis,
}: {
  children: ReactNode;
  href: string;
  emphasis?: boolean;
}) {
  const { tokens } = useMegamenuTheme();
  return (
    <a
      href={href}
      className="text-[11px] uppercase tracking-[0.12em] font-semibold transition-colors"
      style={{
        color: emphasis ? tokens.ink : tokens.body,
        background: tokens.card,
        padding: "6px 12px",
        borderRadius: 10,
        border: `1px solid ${tokens.hairline}`,
      }}
      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = tokens.hairlineStrong)}
      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = tokens.hairline)}
    >
      {children}
    </a>
  );
}

function SolutionTile({ solution }: { solution: Audience["solutions"][number] }) {
  const { Icon, name, sub, href, image } = solution;
  const { theme, tokens } = useMegamenuTheme();
  const [hovered, setHovered] = useState(false);
  const displayImage = image
    ? theme === "dark"
      ? image.replace(/\.png$/, "-dark.png")
      : image
    : undefined;
  return (
    <a
      href={href}
      className="block overflow-hidden"
      style={{
        background: tokens.card,
        border: `1px solid ${hovered ? tokens.hairlineStrong : tokens.hairline}`,
        borderRadius: 12,
        boxShadow: hovered
          ? "0 12px 24px -16px oklch(15.3% 0.006 107.1 / 0.22)"
          : "0 0 0 0 transparent",
        transform: hovered ? "translateY(-1px)" : "translateY(0)",
        transition: "border-color 0.2s ease, box-shadow 0.25s ease, transform 0.25s ease",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="relative overflow-hidden"
        style={{ background: tokens.pageBgDeep, aspectRatio: "16 / 9" }}
      >
        {displayImage ? (
          <img
            src={displayImage}
            alt={name}
            className="w-full h-full"
            style={{
              objectFit: "cover",
              display: "block",
              transform: hovered ? "scale(1.05)" : "scale(1)",
              transition: "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
            }}
            loading="lazy"
          />
        ) : (
          <div className="grid place-items-center" style={{ width: "100%", height: "100%" }}>
            <Icon
              size={56}
              weight="duotone"
              color={tokens.ink}
              style={{
                opacity: hovered ? 0.8 : 0.65,
                transform: hovered ? "scale(1.05)" : "scale(1)",
                transition: "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.25s ease",
              }}
            />
          </div>
        )}
        <div
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            width: 24,
            height: 24,
            display: "grid",
            placeItems: "center",
            background: tokens.brand,
            borderRadius: 999,
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateY(0) scale(1)" : "translateY(-4px) scale(0.85)",
            transition: "opacity 0.2s ease, transform 0.25s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          <ArrowRight size={11} weight="bold" color="white" />
        </div>
      </div>
      <div className="px-3 py-2.5 flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-semibold leading-tight" style={{ color: tokens.ink }}>
            {name}
          </p>
          <p className="text-[11px] mt-0.5" style={{ color: tokens.muted }}>
            {sub}
          </p>
        </div>
        <span
          style={{
            color: tokens.brand,
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateX(0)" : "translateX(-4px)",
            transition: "opacity 0.2s ease, transform 0.2s ease",
            marginLeft: 6,
          }}
        >
          <ArrowRight size={13} weight="bold" />
        </span>
      </div>
    </a>
  );
}
