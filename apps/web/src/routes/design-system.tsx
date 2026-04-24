"use client";

import * as React from "react";
import type { MetaFunction } from "react-router";
import {
  // DS.1 primitives
  Button,
  Input,
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
  Checkbox,
  RadioGroup,
  RadioGroupItem,
  Switch,
  Badge,
  Pill,
  StatusBadge,
  // DS.2 cards + data display
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  ProductCard,
  SolutionCard,
  FeatureCard,
  VerticalCard,
  ProjectCard,
  TestimonialCard,
  SubsectionNav,
  StatCard,
  DataTable,
  SpecTable,
  LineChart,
  BarChart,
  HeatmapChart,
  // DS.3 navigation + feedback
  Navbar,
  Footer,
  Sidebar,
  Topbar,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Breadcrumb,
  Pagination,
  Alert,
  toast,
  Toaster,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  EmptyState,
  Skeleton,
  SkeletonText,
  SkeletonCard,
  // DS.4 utility
  DotGrid,
  SectionLabel,
  SectionDivider,
  SectionHeader,
  ImgPlaceholder,
  ProcessSteps,
  NumbersBar,
  CTASection,
  LogoCloud,
} from "@gridpower/ui";
import {
  Home,
  Menu,
  X,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Copy,
  Share,
  Download,
  Upload,
  RefreshCw,
  Check,
  AlertTriangle,
  XCircle,
  Info,
  Loader2,
  Zap,
  Plug,
  Settings,
  LayoutDashboard,
  User,
  Bell,
  ExternalLink,
  ArrowUpRight,
  ArrowRight,
  BarChart3,
  Battery,
  Car,
  MapPin,
  Globe,
  Lock,
  Shield,
  Cpu,
  Activity,
  TrendingUp,
  TrendingDown,
  Server,
  Layers,
  BookOpen,
  HelpCircle,
  LogOut,
  Building2,
  Sun,
  Wind,
  Gauge,
  Radio,
  Wifi,
} from "lucide-react";

export const meta: MetaFunction = () => [
  { title: "Design System — GridPower" },
  { name: "robots", content: "noindex" },
];

// ─── TOC items ────────────────────────────────────────────────────────────────

const TOC_ITEMS = [
  { id: "colors-sand", label: "Colors — Sand scale" },
  { id: "colors-dark", label: "Colors — Dark scale" },
  { id: "colors-brand", label: "Colors — Brand + Semantic" },
  { id: "typography-scale", label: "Typography — Type scale" },
  { id: "typography-specimens", label: "Typography — Specimens" },
  { id: "spacing", label: "Spacing tokens" },
  { id: "radius-shadows", label: "Radius + Shadows" },
  { id: "grid-motif", label: "Grid motif" },
  { id: "buttons", label: "Buttons" },
  { id: "inputs", label: "Inputs" },
  { id: "badges-pills", label: "Badges + Pills" },
  { id: "cards", label: "Cards" },
  { id: "data-display", label: "Data display" },
  { id: "navigation", label: "Navigation" },
  { id: "feedback", label: "Feedback" },
  { id: "utility", label: "Utility" },
  { id: "iconography", label: "Iconography" },
  { id: "dark-mode", label: "Dark mode parity" },
  { id: "anti-patterns", label: "Anti-patterns" },
  { id: "downloads", label: "Downloads" },
];

// ─── Mock data ────────────────────────────────────────────────────────────────

const SAND_SWATCHES = [
  { step: 1, hex: "#fdfdfc", role: "Page background" },
  { step: 2, hex: "#f9f9f8", role: "Card / subtle bg" },
  { step: 3, hex: "#f1f0ef", role: "UI element bg, input bg" },
  { step: 4, hex: "#e9e8e6", role: "Hovered element" },
  { step: 5, hex: "#e2e1de", role: "Active element" },
  { step: 6, hex: "#dad9d6", role: "Borders, grid lines, dividers" },
  { step: 7, hex: "#cfceca", role: "Stronger borders, focus rings" },
  { step: 8, hex: "#bcbbb5", role: "Placeholder text, disabled" },
  { step: 9, hex: "#8d8d86", role: "Muted text, secondary labels" },
  { step: 10, hex: "#82827c", role: "Secondary text" },
  { step: 11, hex: "#63635e", role: "Body text" },
  { step: 12, hex: "#21201c", role: "Headlines, high contrast" },
];

const DARK_SWATCHES = [
  { step: 1, hex: "#111110", role: "Darkest bg" },
  { step: 2, hex: "#191918", role: "Card bg on dark" },
  { step: 3, hex: "#222221", role: "Elevated element" },
  { step: 4, hex: "#2a2a28", role: "Hover state" },
  { step: 5, hex: "#31312e", role: "Active state" },
  { step: 6, hex: "#3b3a37", role: "Borders, grid lines, dividers" },
  { step: 7, hex: "#494844", role: "Stronger borders" },
  { step: 8, hex: "#62615b", role: "Placeholder on dark" },
  { step: 9, hex: "#8d8d86", role: "Muted" },
  { step: 10, hex: "#a1a09a", role: "Secondary" },
  { step: 11, hex: "#c5c4bf", role: "Body text" },
  { step: 12, hex: "#eeeeec", role: "Headlines" },
];

const TYPE_SCALE = [
  {
    token: "display",
    font: "Clash Grotesk",
    weight: "600",
    size: "72px / 80px",
    ls: "−2%",
    sample: "The Open Energy Platform",
    className: "font-display font-semibold tracking-[-0.02em] text-heading",
    style: { fontSize: 42, lineHeight: "1.1" },
  },
  {
    token: "h1",
    font: "Clash Grotesk",
    weight: "600",
    size: "56px / 64px",
    ls: "−1.5%",
    sample: "Energy that works for you",
    className: "font-display font-semibold text-heading",
    style: { fontSize: 36, lineHeight: "1.14" },
  },
  {
    token: "h2",
    font: "Clash Grotesk",
    weight: "600",
    size: "40px / 48px",
    ls: "−1%",
    sample: "Charging infrastructure that pays for itself",
    className: "font-display font-semibold text-heading",
    style: { fontSize: 28, lineHeight: "1.2" },
  },
  {
    token: "h3",
    font: "Clash Grotesk",
    weight: "600",
    size: "24px / 32px",
    ls: "−0.5%",
    sample: "Three verticals. One platform.",
    className: "font-display font-semibold text-heading",
    style: { fontSize: 22, lineHeight: "1.33" },
  },
  {
    token: "h4",
    font: "Inter",
    weight: "600",
    size: "18px / 28px",
    ls: "0",
    sample: "Home Charging",
    className: "font-body font-semibold text-heading",
    style: { fontSize: 18, lineHeight: "1.55" },
  },
  {
    token: "body-lg",
    font: "Inter",
    weight: "400",
    size: "20px / 32px",
    ls: "0",
    sample: "Our hardware works with other software — open APIs, no lock-in.",
    className: "font-body text-body",
    style: { fontSize: 17, lineHeight: "1.6" },
  },
  {
    token: "body",
    font: "Inter",
    weight: "400",
    size: "16px / 26px",
    ls: "0",
    sample: "Every GridPower product connects through GridOS, our open platform.",
    className: "font-body text-body",
    style: { fontSize: 15, lineHeight: "1.625" },
  },
  {
    token: "body-sm",
    font: "Inter",
    weight: "400",
    size: "14px / 22px",
    ls: "0",
    sample: "Standard protocols. Open APIs. No lock-in.",
    className: "font-body text-body",
    style: { fontSize: 13, lineHeight: "1.57" },
  },
  {
    token: "label",
    font: "Geist Mono",
    weight: "500",
    size: "12px / 16px",
    ls: "+8%",
    sample: "GRIDCHARGE",
    className: "font-mono uppercase tracking-widest text-muted-foreground",
    style: { fontSize: 12, lineHeight: "1.33" },
  },
  {
    token: "code",
    font: "Geist Mono",
    weight: "400",
    size: "14px / 22px",
    ls: "0",
    sample: "GridCharge DC 60kW Dual-Gun",
    className: "font-mono text-body",
    style: { fontSize: 13, lineHeight: "1.57" },
  },
];

const SPACING_TOKENS = [
  { name: "--space-1", px: 4, use: "Tight gap, icon padding" },
  { name: "--space-2", px: 8, use: "Stack tight, icon-text gap" },
  { name: "--space-3", px: 12, use: "Small padding" },
  { name: "--space-4", px: 16, use: "Stack normal, input pad" },
  { name: "--space-6", px: 24, use: "Card pad, grid gap" },
  { name: "--space-8", px: 32, use: "Card pad lg" },
  { name: "--space-10", px: 40, use: "Section sub-element gap" },
  { name: "--space-12", px: 48, use: "Section pad" },
  { name: "--space-16", px: 64, use: "Content block gap" },
  { name: "--space-20", px: 80, use: "Section padding Y" },
  { name: "--space-24", px: 96, use: "Section pad Y (desktop)" },
  { name: "--space-30", px: 120, use: "Large section separator" },
  { name: "--space-40", px: 160, use: "Page hero padding" },
];

const RADIUS_TOKENS = [
  { name: "--radius-tooltip", px: 6, label: "Tooltips" },
  { name: "--radius-btn", px: 8, label: "Buttons" },
  { name: "--radius-input", px: 8, label: "Inputs" },
  { name: "--radius-card", px: 12, label: "Cards" },
  { name: "--radius-modal", px: 16, label: "Modals" },
  { name: "--radius-pill", px: 999, label: "Pills / Badges" },
];

const SHADOW_TOKENS = [
  {
    name: "--shadow-sm",
    css: "0 1px 2px rgba(0,0,0,0.05)",
    label: "Subtle (inputs, chips)",
  },
  {
    name: "--shadow-md",
    css: "0 4px 12px rgba(0,0,0,0.08)",
    label: "Cards, dropdowns",
  },
  {
    name: "--shadow-lg",
    css: "0 8px 24px rgba(0,0,0,0.12)",
    label: "Modals, popovers",
  },
  {
    name: "--shadow-xl",
    css: "0 16px 48px rgba(0,0,0,0.16)",
    label: "Sheet overlays",
  },
];

const STATION_DATA = [
  {
    id: "1",
    name: "GridPower-Goa-01",
    location: "Panjim, Goa",
    status: "online",
    chargers: "4",
    utilization: "76%",
    revenue: "₹8,240",
  },
  {
    id: "2",
    name: "GridPower-Goa-02",
    location: "Margao, Goa",
    status: "online",
    chargers: "2",
    utilization: "52%",
    revenue: "₹4,110",
  },
  {
    id: "3",
    name: "GridPower-Pune-01",
    location: "Baner, Pune",
    status: "maintenance",
    chargers: "6",
    utilization: "0%",
    revenue: "₹0",
  },
  {
    id: "4",
    name: "GridPower-Blr-01",
    location: "Whitefield, Bengaluru",
    status: "offline",
    chargers: "3",
    utilization: "—",
    revenue: "₹0",
  },
];

const HEATMAP_DATA: Array<Array<0 | 1 | 2 | 3 | 4 | 5>> = [
  [0, 0, 1, 1, 2, 3, 4, 5, 4, 3, 2, 2],
  [0, 0, 0, 1, 1, 2, 3, 4, 5, 4, 3, 2],
  [1, 1, 2, 3, 4, 5, 5, 5, 4, 3, 2, 1],
  [0, 0, 1, 2, 3, 4, 5, 5, 4, 3, 2, 0],
  [1, 2, 3, 4, 5, 5, 5, 4, 3, 2, 1, 0],
  [0, 0, 1, 1, 2, 3, 3, 2, 1, 1, 0, 0],
  [0, 0, 0, 0, 1, 1, 2, 1, 1, 0, 0, 0],
];

const LINE_CHART_DATA = Array.from({ length: 30 }, (_, i) => ({
  day: `Apr ${i + 1}`,
  revenue: Math.floor(Math.random() * 20000 + 5000),
}));

const BAR_CHART_DATA = [
  { station: "Goa-01", sessions: 48 },
  { station: "Goa-02", sessions: 31 },
  { station: "Pune-01", sessions: 0 },
  { station: "Blr-01", sessions: 22 },
  { station: "Mum-01", sessions: 61 },
];

const SIDEBAR_SECTIONS = [
  {
    items: [
      { key: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={16} /> },
      { key: "stations", label: "Stations", icon: <Zap size={16} /> },
      { key: "energy", label: "Energy", icon: <Battery size={16} /> },
      { key: "fleet", label: "Fleet", icon: <Car size={16} /> },
      { key: "analytics", label: "Analytics", icon: <BarChart3 size={16} /> },
    ],
  },
  {
    label: "SYSTEM",
    items: [
      { key: "settings", label: "Settings", icon: <Settings size={16} /> },
    ],
  },
];

const ICONS_GRID = [
  // Navigation
  { icon: <Home size={20} />, label: "home" },
  { icon: <Menu size={20} />, label: "menu" },
  { icon: <X size={20} />, label: "close" },
  { icon: <ChevronLeft size={20} />, label: "back" },
  { icon: <ChevronRight size={20} />, label: "forward" },
  { icon: <Search size={20} />, label: "search" },
  { icon: <Filter size={20} />, label: "filter" },
  // Actions
  { icon: <Plus size={20} />, label: "plus" },
  { icon: <Edit size={20} />, label: "edit" },
  { icon: <Trash2 size={20} />, label: "delete" },
  { icon: <Copy size={20} />, label: "copy" },
  { icon: <Share size={20} />, label: "share" },
  { icon: <Download size={20} />, label: "download" },
  { icon: <Upload size={20} />, label: "upload" },
  { icon: <RefreshCw size={20} />, label: "refresh" },
  // Status
  { icon: <Check size={20} />, label: "check" },
  { icon: <AlertTriangle size={20} />, label: "warning" },
  { icon: <XCircle size={20} />, label: "error" },
  { icon: <Info size={20} />, label: "info" },
  { icon: <Loader2 size={20} />, label: "loading" },
  // Content
  { icon: <Zap size={20} />, label: "bolt" },
  { icon: <Plug size={20} />, label: "plug" },
  { icon: <LayoutDashboard size={20} />, label: "dashboard" },
  { icon: <Settings size={20} />, label: "settings" },
  { icon: <User size={20} />, label: "user" },
  { icon: <Bell size={20} />, label: "bell" },
  { icon: <Battery size={20} />, label: "battery" },
  { icon: <Car size={20} />, label: "car" },
  { icon: <MapPin size={20} />, label: "map-pin" },
  { icon: <Globe size={20} />, label: "globe" },
  // More
  { icon: <Lock size={20} />, label: "lock" },
  { icon: <Shield size={20} />, label: "shield" },
  { icon: <Cpu size={20} />, label: "cpu" },
  { icon: <Activity size={20} />, label: "activity" },
  { icon: <TrendingUp size={20} />, label: "trending-up" },
  { icon: <TrendingDown size={20} />, label: "trending-down" },
  { icon: <Server size={20} />, label: "server" },
  { icon: <Layers size={20} />, label: "layers" },
  { icon: <BookOpen size={20} />, label: "book" },
  { icon: <ExternalLink size={20} />, label: "external-link" },
  { icon: <ArrowUpRight size={20} />, label: "arrow-up-right" },
  { icon: <ArrowRight size={20} />, label: "arrow-right" },
  { icon: <Sun size={20} />, label: "sun" },
  { icon: <Wind size={20} />, label: "wind" },
  { icon: <Gauge size={20} />, label: "gauge" },
  { icon: <Radio size={20} />, label: "radio" },
  { icon: <Wifi size={20} />, label: "wifi" },
  { icon: <Building2 size={20} />, label: "building" },
  { icon: <LogOut size={20} />, label: "log-out" },
];

// ─── Sticky TOC ───────────────────────────────────────────────────────────────

function TableOfContents() {
  const [active, setActive] = React.useState("");

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        const first = visible[0];
        if (first) {
          setActive(first.target.id);
        }
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );
    TOC_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <aside className="hidden xl:block w-52 shrink-0">
      <div className="sticky top-24 rounded-card border border-border bg-sand-2 p-4">
        <p className="font-mono text-label text-sand-9 uppercase tracking-widest mb-3">
          On this page
        </p>
        <nav className="flex flex-col gap-0.5">
          {TOC_ITEMS.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              className={`block rounded px-2 py-1 font-body text-[12px] leading-tight transition-colors ${
                active === id
                  ? "bg-grid-red-bg text-grid-red font-medium"
                  : "text-sand-9 hover:text-sand-12"
              }`}
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </aside>
  );
}

// ─── Section wrapper ──────────────────────────────────────────────────────────

function Section({
  id,
  children,
  className = "",
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <>
      <section
        id={id}
        className={`scroll-mt-24 py-16 ${className}`}
      >
        {children}
      </section>
      <SectionDivider />
    </>
  );
}

// ─── Color swatch card ────────────────────────────────────────────────────────

function ColorSwatch({
  hex,
  label,
  sublabel,
  bordered = false,
}: {
  hex: string;
  label: string;
  sublabel?: string;
  bordered?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <div
        className={`h-12 w-full rounded-btn ${bordered ? "border border-border" : ""}`}
        style={{ background: hex }}
      />
      <div className="space-y-0.5">
        <p className="font-mono text-[11px] text-sand-12 font-medium">{hex}</p>
        <p className="font-mono text-[10px] text-sand-9 leading-tight">{label}</p>
        {sublabel && (
          <p className="font-mono text-[10px] text-sand-8 leading-tight">{sublabel}</p>
        )}
      </div>
    </div>
  );
}

// ─── Demo label ───────────────────────────────────────────────────────────────

function DemoLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-[10px] text-sand-8 uppercase tracking-widest mt-1.5 text-center">
      {children}
    </p>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DesignSystemPage() {
  const [paginationPage, setPaginationPage] = React.useState(3);
  const [darkTheme, setDarkTheme] = React.useState(false);
  const [activeSubnav, setActiveSubnav] = React.useState("overview");
  const [checkboxChecked, setCheckboxChecked] = React.useState(false);
  const [switchOn, setSwitchOn] = React.useState(true);
  const [radioValue, setRadioValue] = React.useState("home");

  return (
    <>
      <Toaster />
      {/* ── Full Navbar ──────────────────────────────────────────────── */}
      <Navbar />

      <div className="relative min-h-screen bg-sand-1">
        {/* subtle dot grid on page */}
        <DotGrid className="fixed inset-0 opacity-50" />

        <div className="relative mx-auto max-w-[1280px] px-6 pb-32">
          {/* ── Intro / Cover ─────────────────────────────────────────── */}
          <div className="pt-24 pb-16">
            <p className="gp-label-red mb-4">GridPower / DeltaEV Mobility · Version 1.0 · April 2026</p>
            <h1
              className="font-display font-semibold text-sand-12 mb-6"
              style={{ fontSize: 56, lineHeight: "1.07", letterSpacing: "-0.02em" }}
            >
              GridPower Design System
            </h1>
            <p
              className="font-body text-sand-11 max-w-2xl"
              style={{ fontSize: 20, lineHeight: "1.6" }}
            >
              The complete visual language for the GridPower digital ecosystem —
              marketing site, consoles, and mobile apps.
            </p>
          </div>

          {/* ── Two-column layout: TOC + content ──────────────────────── */}
          <div className="flex gap-12 items-start">
            <TableOfContents />

            <main className="min-w-0 flex-1">

              {/* ═══════════════════════════════════════════════════════════
                  SECTION 1 — Colors: Sand scale
              ═══════════════════════════════════════════════════════════ */}
              <Section id="colors-sand">
                <SectionHeader
                  label="01 / COLORS"
                  heading="Sand scale — light mode"
                  lead="12-step neutral palette derived from Radix Sand. Used for all light-mode surfaces, text, and borders."
                />
                <div className="mt-8 grid grid-cols-6 gap-3">
                  {SAND_SWATCHES.slice(0, 6).map((s) => (
                    <ColorSwatch
                      key={s.step}
                      hex={s.hex}
                      label={`--sand-${s.step}`}
                      sublabel={s.role}
                      bordered={s.step <= 3}
                    />
                  ))}
                </div>
                <div className="mt-3 grid grid-cols-6 gap-3">
                  {SAND_SWATCHES.slice(6).map((s) => (
                    <ColorSwatch
                      key={s.step}
                      hex={s.hex}
                      label={`--sand-${s.step}`}
                      sublabel={s.role}
                    />
                  ))}
                </div>
                <div className="mt-6 rounded-card border border-border bg-sand-1 p-5">
                  <p className="font-body text-sand-11 text-[15px]">
                    Sand 11 body text on Sand 1 background — this is the default reading surface.
                  </p>
                  <p className="font-mono text-[12px] text-sand-9 mt-1 uppercase tracking-widest">
                    --text-body on --bg-page
                  </p>
                </div>
              </Section>

              {/* ═══════════════════════════════════════════════════════════
                  SECTION 2 — Colors: Dark scale
              ═══════════════════════════════════════════════════════════ */}
              <Section id="colors-dark">
                <SectionHeader
                  label="02 / COLORS"
                  heading="Dark scale — Console + App"
                  lead="12-step dark palette for the GridPower Console and mobile app. Token-swapped via data-theme=dark."
                />
                <div className="mt-8 grid grid-cols-6 gap-3">
                  {DARK_SWATCHES.slice(0, 6).map((s) => (
                    <ColorSwatch
                      key={s.step}
                      hex={s.hex}
                      label={`--dark-${s.step}`}
                      sublabel={s.role}
                    />
                  ))}
                </div>
                <div className="mt-3 grid grid-cols-6 gap-3">
                  {DARK_SWATCHES.slice(6).map((s) => (
                    <ColorSwatch
                      key={s.step}
                      hex={s.hex}
                      label={`--dark-${s.step}`}
                      sublabel={s.role}
                    />
                  ))}
                </div>
                <div className="mt-6 rounded-card border border-dark-6 bg-dark-2 p-5">
                  <p
                    className="font-body text-[15px]"
                    style={{ color: "var(--dark-11)" }}
                  >
                    Dark 11 body text on Dark 2 card — the default Console reading surface.
                  </p>
                  <p
                    className="font-mono text-[12px] mt-1 uppercase tracking-widest"
                    style={{ color: "var(--dark-9)" }}
                  >
                    --text-body on --bg-subtle (dark mode)
                  </p>
                </div>
              </Section>

              {/* ═══════════════════════════════════════════════════════════
                  SECTION 3 — Colors: Brand + Semantic
              ═══════════════════════════════════════════════════════════ */}
              <Section id="colors-brand">
                <SectionHeader
                  label="03 / COLORS"
                  heading="Brand + Semantic colors"
                />
                <div className="mt-8 space-y-8">
                  {/* GridRed brand strip */}
                  <div>
                    <p className="font-mono text-label text-sand-9 uppercase tracking-widest mb-3">
                      GridRed — Brand
                    </p>
                    <div className="grid grid-cols-4 gap-3">
                      <ColorSwatch hex="#FA0016" label="--grid-red" sublabel="Default" />
                      <ColorSwatch hex="#E00014" label="--grid-red-hover" sublabel="Hover" />
                      <ColorSwatch hex="#C80012" label="--grid-red-active" sublabel="Active" />
                      <ColorSwatch hex="#FFF0F0" label="--grid-red-light-bg" sublabel="Light bg" bordered />
                    </div>
                  </div>

                  {/* Semantic */}
                  <div>
                    <p className="font-mono text-label text-sand-9 uppercase tracking-widest mb-3">
                      Semantic
                    </p>
                    <div className="grid grid-cols-4 gap-3">
                      <div className="space-y-2">
                        <div className="h-12 rounded-btn" style={{ background: "#30A46C" }} />
                        <p className="font-mono text-[11px] text-sand-12 font-medium">#30A46C</p>
                        <p className="font-mono text-[10px] text-sand-9">--color-success</p>
                        <p className="font-mono text-[10px] text-sand-8">Confirmations, online status, positive trends</p>
                      </div>
                      <div className="space-y-2">
                        <div className="h-12 rounded-btn" style={{ background: "#F5A623" }} />
                        <p className="font-mono text-[11px] text-sand-12 font-medium">#F5A623</p>
                        <p className="font-mono text-[10px] text-sand-9">--color-warning</p>
                        <p className="font-mono text-[10px] text-sand-8">Maintenance state, low charge, caution</p>
                      </div>
                      <div className="space-y-2">
                        <div className="h-12 rounded-btn" style={{ background: "#E5484D" }} />
                        <p className="font-mono text-[11px] text-sand-12 font-medium">#E5484D</p>
                        <p className="font-mono text-[10px] text-sand-9">--color-error</p>
                        <p className="font-mono text-[10px] text-sand-8">Offline stations, payment failures, alerts</p>
                      </div>
                      <div className="space-y-2">
                        <div className="h-12 rounded-btn" style={{ background: "#3B82F6" }} />
                        <p className="font-mono text-[11px] text-sand-12 font-medium">#3B82F6</p>
                        <p className="font-mono text-[10px] text-sand-9">--color-info</p>
                        <p className="font-mono text-[10px] text-sand-8">Info banners, neutral system messages</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Section>

              {/* ═══════════════════════════════════════════════════════════
                  SECTION 4 — Typography: Type scale
              ═══════════════════════════════════════════════════════════ */}
              <Section id="typography-scale">
                <SectionHeader
                  label="04 / TYPOGRAPHY"
                  heading="Type scale"
                  lead="Every step rendered at actual size. Clash Grotesk for display and headings, Inter for body, Geist Mono for labels and code."
                />
                <div className="mt-8 space-y-0 divide-y divide-border">
                  {TYPE_SCALE.map((t) => (
                    <div key={t.token} className="flex items-start gap-6 py-5">
                      <div className="w-52 shrink-0 pt-1">
                        <p className="font-mono text-[11px] text-grid-red uppercase tracking-widest">
                          {t.token}
                        </p>
                        <p className="font-mono text-[10px] text-sand-9 mt-1">{t.font}</p>
                        <p className="font-mono text-[10px] text-sand-8">{t.size} · {t.weight}</p>
                        {t.ls !== "0" && (
                          <p className="font-mono text-[10px] text-sand-8">{t.ls} tracking</p>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={t.className} style={t.style}>
                          {t.sample}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Section>

              {/* ═══════════════════════════════════════════════════════════
                  SECTION 5 — Typography: Font specimens
              ═══════════════════════════════════════════════════════════ */}
              <Section id="typography-specimens">
                <SectionHeader
                  label="05 / TYPOGRAPHY"
                  heading="Font specimens"
                  lead="Three type families. Each optimised for a specific role in the system."
                />
                <div className="mt-8 space-y-8">
                  {/* Clash Grotesk */}
                  <div className="rounded-card border border-border p-8 bg-sand-2">
                    <p className="font-mono text-label text-grid-red uppercase tracking-widest mb-2">
                      Clash Grotesk — Display / H1 / H2 / H3
                    </p>
                    <p
                      className="font-display font-semibold text-sand-12 mb-3"
                      style={{ fontSize: 48, lineHeight: "1.05", letterSpacing: "-0.02em" }}
                    >
                      Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll
                    </p>
                    <p
                      className="font-display font-semibold text-sand-12"
                      style={{ fontSize: 32, letterSpacing: "-0.01em" }}
                    >
                      Mm Nn Oo Pp Qq Rr Ss Tt Uu Vv Ww Xx Yy Zz · 0 1 2 3 4 5 6 7 8 9
                    </p>
                  </div>

                  {/* Inter */}
                  <div className="rounded-card border border-border p-8 bg-sand-2">
                    <p className="font-mono text-label text-grid-red uppercase tracking-widest mb-2">
                      Inter — Body LG / Body / Body SM / H4
                    </p>
                    <p
                      className="font-body text-sand-12 mb-3"
                      style={{ fontSize: 32, lineHeight: "1.3", fontWeight: 400 }}
                    >
                      Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll
                    </p>
                    <p
                      className="font-body text-sand-11"
                      style={{ fontSize: 20, fontWeight: 400 }}
                    >
                      Mm Nn Oo Pp Qq Rr Ss Tt Uu Vv Ww Xx Yy Zz · 0 1 2 3 4 5 6 7 8 9
                    </p>
                    <div className="mt-3 flex gap-6">
                      <span className="font-body text-[14px] text-sand-9 font-normal">Regular 400</span>
                      <span className="font-body text-[14px] text-sand-9 font-medium">Medium 500</span>
                      <span className="font-body text-[14px] text-sand-9 font-semibold">Semibold 600</span>
                    </div>
                  </div>

                  {/* Geist Mono */}
                  <div className="rounded-card border border-border p-8 bg-sand-2">
                    <p className="font-mono text-label text-grid-red uppercase tracking-widest mb-2">
                      Geist Mono — Labels / Code / Specs
                    </p>
                    <p
                      className="font-mono text-sand-12 mb-3"
                      style={{ fontSize: 28, lineHeight: "1.4" }}
                    >
                      Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll
                    </p>
                    <p
                      className="font-mono text-sand-11"
                      style={{ fontSize: 18 }}
                    >
                      Mm Nn Oo Pp Qq Rr Ss Tt Uu Vv Ww Xx Yy Zz · 0 1 2 3 4 5 6 7 8 9
                    </p>
                    <p className="font-mono text-[13px] text-sand-9 mt-3">
                      GridCharge DC 60kW · COMO L1 · FlexCube 500SL · GridOS v2.1
                    </p>
                  </div>
                </div>
              </Section>

              {/* ═══════════════════════════════════════════════════════════
                  SECTION 6 — Spacing tokens
              ═══════════════════════════════════════════════════════════ */}
              <Section id="spacing">
                <SectionHeader
                  label="06 / SPACING"
                  heading="Spacing tokens"
                  lead="4px base grid. All values are multiples of 4. Visual ruler shown proportionally."
                />
                <div className="mt-8 space-y-2">
                  {SPACING_TOKENS.map((s) => (
                    <div key={s.name} className="flex items-center gap-4">
                      <div className="w-36 shrink-0">
                        <p className="font-mono text-[11px] text-grid-red">{s.name}</p>
                        <p className="font-mono text-[10px] text-sand-9">{s.px}px · {s.use}</p>
                      </div>
                      <div
                        className="bg-sand-4 rounded-sm shrink-0"
                        style={{ width: Math.min(s.px * 2.5, 400), height: 20 }}
                      />
                      <span className="font-mono text-[11px] text-sand-8">{s.px}px</span>
                    </div>
                  ))}
                </div>
              </Section>

              {/* ═══════════════════════════════════════════════════════════
                  SECTION 7 — Radius + Shadows
              ═══════════════════════════════════════════════════════════ */}
              <Section id="radius-shadows">
                <SectionHeader
                  label="07 / RADIUS + SHADOWS"
                  heading="Border radius + Shadow scale"
                />
                <div className="mt-8 space-y-10">
                  {/* Radius */}
                  <div>
                    <p className="font-mono text-label text-sand-9 uppercase tracking-widest mb-4">Border radius</p>
                    <div className="flex flex-wrap gap-6">
                      {RADIUS_TOKENS.map((r) => (
                        <div key={r.name} className="flex flex-col items-center gap-2">
                          <div
                            className="w-20 h-20 border-2 border-sand-7 bg-sand-2"
                            style={{ borderRadius: Math.min(r.px, 40) }}
                          />
                          <p className="font-mono text-[10px] text-sand-9">{r.px === 999 ? "pill" : `${r.px}px`}</p>
                          <p className="font-mono text-[10px] text-sand-8">{r.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Shadows */}
                  <div>
                    <p className="font-mono text-label text-sand-9 uppercase tracking-widest mb-4">Shadow scale</p>
                    <div className="flex flex-wrap gap-8">
                      {SHADOW_TOKENS.map((s) => (
                        <div key={s.name} className="flex flex-col items-center gap-3">
                          <div
                            className="w-24 h-16 bg-sand-1 rounded-card"
                            style={{ boxShadow: s.css }}
                          />
                          <p className="font-mono text-[10px] text-grid-red">{s.name}</p>
                          <p className="font-mono text-[10px] text-sand-9 text-center max-w-[96px]">{s.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Section>

              {/* ═══════════════════════════════════════════════════════════
                  SECTION 8 — Grid motif
              ═══════════════════════════════════════════════════════════ */}
              <Section id="grid-motif">
                <SectionHeader
                  label="08 / GRID MOTIF"
                  heading="The dot grid motif"
                  lead="Blueprint-style dot grid that runs behind every light section. Quiet but always present."
                />
                <div className="mt-8 space-y-6">
                  {/* 8px spacing */}
                  <div className="relative overflow-hidden rounded-card border border-border h-32">
                    <DotGrid style={{ "--grid-bg-size": "8px 8px" } as React.CSSProperties} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <p className="font-mono text-label text-sand-9 uppercase tracking-widest">
                        8px spacing — tighter
                      </p>
                    </div>
                  </div>

                  {/* 16px spacing */}
                  <div className="relative overflow-hidden rounded-card border border-border h-32">
                    <DotGrid />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <p className="font-mono text-label text-sand-9 uppercase tracking-widest">
                        16px spacing — default
                      </p>
                    </div>
                  </div>

                  {/* Dense (darker) */}
                  <div className="relative overflow-hidden rounded-card border border-border h-32 bg-sand-12">
                    <DotGrid color="var(--dark-6)" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <p className="font-mono text-label uppercase tracking-widest" style={{ color: "var(--dark-9)" }}>
                        Dark bg variant — used in CTASection
                      </p>
                    </div>
                  </div>

                  <p className="font-mono text-label text-sand-9 uppercase tracking-widest">
                    &ldquo;Quiet but always there. The grid tells you where you are.&rdquo;
                  </p>
                </div>
              </Section>

              {/* ═══════════════════════════════════════════════════════════
                  SECTION 9 — Buttons
              ═══════════════════════════════════════════════════════════ */}
              <Section id="buttons">
                <SectionHeader
                  label="09 / BUTTONS"
                  heading="Button system"
                  lead="Every variant × size × state. GridRed primary is the only fill colour in the system."
                />

                <div className="mt-8 space-y-10">
                  {/* Primary */}
                  <div>
                    <p className="font-mono text-label text-sand-9 uppercase tracking-widest mb-4">Primary (GridRed)</p>
                    <div className="space-y-3">
                      {["lg", "md", "sm"].map((sz) => (
                        <div key={sz} className="flex flex-wrap gap-3 items-center">
                          <Button variant="primary" size={sz as "lg" | "md" | "sm"}>
                            Get started
                          </Button>
                          <Button variant="primary" size={sz as "lg" | "md" | "sm"}>
                            <Zap className="h-4 w-4" /> With icon
                          </Button>
                          <Button variant="primary" size={sz as "lg" | "md" | "sm"} disabled>
                            Disabled
                          </Button>
                          <span className="font-mono text-[10px] text-sand-8">{sz.toUpperCase()}</span>
                        </div>
                      ))}
                      <div className="flex flex-wrap gap-3 items-center">
                        <Button variant="primary" size="icon">
                          <Plus className="h-4 w-4" />
                        </Button>
                        <Button variant="primary" size="icon">
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                        <span className="font-mono text-[10px] text-sand-8">ICON ONLY</span>
                      </div>
                    </div>
                  </div>

                  {/* Ghost light */}
                  <div>
                    <p className="font-mono text-label text-sand-9 uppercase tracking-widest mb-4">Ghost (outline, light bg)</p>
                    <div className="space-y-3">
                      {["lg", "md", "sm"].map((sz) => (
                        <div key={sz} className="flex flex-wrap gap-3 items-center">
                          <Button variant="ghost" size={sz as "lg" | "md" | "sm"}>
                            Learn more
                          </Button>
                          <Button variant="ghost" size={sz as "lg" | "md" | "sm"}>
                            <ChevronLeft className="h-4 w-4" /> Back
                          </Button>
                          <Button variant="ghost" size={sz as "lg" | "md" | "sm"} disabled>
                            Disabled
                          </Button>
                          <span className="font-mono text-[10px] text-sand-8">{sz.toUpperCase()}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Ghost on dark */}
                  <div className="rounded-card bg-dark-2 p-6 border border-dark-6">
                    <p className="font-mono text-label uppercase tracking-widest mb-4" style={{ color: "var(--dark-9)" }}>
                      Ghost (outline, dark bg)
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <Button variant="ghost" size="md" className="border-dark-7 text-dark-12 hover:bg-dark-4">
                        Learn more
                      </Button>
                      <Button variant="primary" size="md">
                        Get started
                      </Button>
                      <Button variant="ghost" size="md" disabled className="border-dark-7 text-dark-11">
                        Disabled
                      </Button>
                    </div>
                  </div>

                  {/* Secondary */}
                  <div>
                    <p className="font-mono text-label text-sand-9 uppercase tracking-widest mb-4">Secondary (Sand fill)</p>
                    <div className="flex flex-wrap gap-3">
                      {["lg", "md", "sm"].map((sz) => (
                        <Button key={sz} variant="secondary" size={sz as "lg" | "md" | "sm"}>
                          {sz.toUpperCase()}
                        </Button>
                      ))}
                      <Button variant="secondary" size="md" disabled>Disabled</Button>
                    </div>
                  </div>

                  {/* Link */}
                  <div>
                    <p className="font-mono text-label text-sand-9 uppercase tracking-widest mb-4">Link / text</p>
                    <div className="flex flex-wrap gap-6 items-center">
                      <Button variant="link">View specs</Button>
                      <Button variant="link">
                        Explore GridEnergy <ArrowUpRight className="h-4 w-4" />
                      </Button>
                      <Button variant="link">
                        <ChevronLeft className="h-4 w-4" /> Back to products
                      </Button>
                    </div>
                  </div>
                </div>
              </Section>

              {/* ═══════════════════════════════════════════════════════════
                  SECTION 10 — Inputs
              ═══════════════════════════════════════════════════════════ */}
              <Section id="inputs">
                <SectionHeader
                  label="10 / INPUTS"
                  heading="Form inputs"
                  lead="All interactive controls shown across states. GridPower-relevant placeholders throughout."
                />

                <div className="mt-8 grid grid-cols-2 gap-8">
                  {/* Text input states */}
                  <div className="space-y-4">
                    <p className="font-mono text-label text-sand-9 uppercase tracking-widest">Text input</p>
                    <div>
                      <label className="font-body text-[13px] text-sand-11 mb-1 block">Station name</label>
                      <Input placeholder="e.g. GridPower-Goa-01" />
                      <DemoLabel>Empty / placeholder</DemoLabel>
                    </div>
                    <div>
                      <label className="font-body text-[13px] text-sand-11 mb-1 block">Location</label>
                      <Input defaultValue="Panjim, Goa" />
                      <DemoLabel>Filled</DemoLabel>
                    </div>
                    <div>
                      <label className="font-body text-[13px] text-sand-11 mb-1 block">API key</label>
                      <Input disabled placeholder="Will be generated automatically" />
                      <DemoLabel>Disabled</DemoLabel>
                    </div>
                  </div>

                  {/* Select */}
                  <div className="space-y-4">
                    <p className="font-mono text-label text-sand-9 uppercase tracking-widest">Select</p>
                    <div>
                      <label className="font-body text-[13px] text-sand-11 mb-1 block">Charger type</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select charger type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ac">AC Charger (3.3–22 kW)</SelectItem>
                          <SelectItem value="dc-fast">DC Fast (20–60 kW)</SelectItem>
                          <SelectItem value="dc-ultra">DC Ultra-fast (120–240 kW)</SelectItem>
                          <SelectItem value="portable">Portable (7.4 kW)</SelectItem>
                        </SelectContent>
                      </Select>
                      <DemoLabel>Closed — placeholder</DemoLabel>
                    </div>
                    <div>
                      <label className="font-body text-[13px] text-sand-11 mb-1 block">Vertical</label>
                      <Select defaultValue="charge">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="energy">GridEnergy</SelectItem>
                          <SelectItem value="charge">GridCharge</SelectItem>
                          <SelectItem value="drive">GridDrive</SelectItem>
                        </SelectContent>
                      </Select>
                      <DemoLabel>With value selected</DemoLabel>
                    </div>
                  </div>

                  {/* Checkbox */}
                  <div className="space-y-4">
                    <p className="font-mono text-label text-sand-9 uppercase tracking-widest">Checkbox</p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Checkbox id="cb1" checked={checkboxChecked} onCheckedChange={(v) => setCheckboxChecked(!!v)} />
                        <label htmlFor="cb1" className="font-body text-[14px] text-sand-11">Enable OCPP integration</label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox id="cb2" defaultChecked />
                        <label htmlFor="cb2" className="font-body text-[14px] text-sand-11">Send daily energy reports</label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox id="cb3" disabled />
                        <label htmlFor="cb3" className="font-body text-[14px] text-sand-8">Remote firmware update (disabled)</label>
                      </div>
                    </div>
                    <DemoLabel>Unchecked / checked / disabled</DemoLabel>
                  </div>

                  {/* Radio group */}
                  <div className="space-y-4">
                    <p className="font-mono text-label text-sand-9 uppercase tracking-widest">Radio group</p>
                    <RadioGroup value={radioValue} onValueChange={setRadioValue} className="space-y-2">
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="home" id="r1" />
                        <label htmlFor="r1" className="font-body text-[14px] text-sand-11">Home charging (7.4 kW)</label>
                      </div>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="destination" id="r2" />
                        <label htmlFor="r2" className="font-body text-[14px] text-sand-11">Destination charging (22 kW)</label>
                      </div>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="highway" id="r3" />
                        <label htmlFor="r3" className="font-body text-[14px] text-sand-11">Highway fast charging (120 kW)</label>
                      </div>
                    </RadioGroup>
                    <DemoLabel>Radio group — one selected</DemoLabel>
                  </div>

                  {/* Switch */}
                  <div className="space-y-4">
                    <p className="font-mono text-label text-sand-9 uppercase tracking-widest">Switch / Toggle</p>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Switch checked={switchOn} onCheckedChange={setSwitchOn} id="sw1" />
                        <label htmlFor="sw1" className="font-body text-[14px] text-sand-11">
                          Smart charging enabled
                        </label>
                        <span className="font-mono text-[11px] text-sand-8 ml-auto">{switchOn ? "ON" : "OFF"}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Switch defaultChecked={false} id="sw2" />
                        <label htmlFor="sw2" className="font-body text-[14px] text-sand-11">
                          Night rate optimization
                        </label>
                        <span className="font-mono text-[11px] text-sand-8 ml-auto">OFF</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Switch disabled id="sw3" />
                        <label htmlFor="sw3" className="font-body text-[14px] text-sand-8">
                          Advanced grid export (requires plan)
                        </label>
                      </div>
                    </div>
                    <DemoLabel>On / off / disabled</DemoLabel>
                  </div>
                </div>
              </Section>

              {/* ═══════════════════════════════════════════════════════════
                  SECTION 11 — Badges + Pills
              ═══════════════════════════════════════════════════════════ */}
              <Section id="badges-pills">
                <SectionHeader
                  label="11 / BADGES + PILLS"
                  heading="Badges, Pills, StatusBadges"
                />

                <div className="mt-8 space-y-8">
                  {/* Badges */}
                  <div>
                    <p className="font-mono text-label text-sand-9 uppercase tracking-widest mb-3">Badge — solid</p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="solid" color="neutral">Neutral</Badge>
                      <Badge variant="solid" color="red">Brand</Badge>
                      <Badge variant="solid" color="success">Success</Badge>
                      <Badge variant="solid" color="warning">Warning</Badge>
                      <Badge variant="solid" color="error">Error</Badge>
                    </div>
                  </div>

                  <div>
                    <p className="font-mono text-label text-sand-9 uppercase tracking-widest mb-3">Badge — outline</p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" color="neutral">Neutral</Badge>
                      <Badge variant="outline" color="red">Brand</Badge>
                      <Badge variant="outline" color="success">Success</Badge>
                      <Badge variant="outline" color="warning">Warning</Badge>
                      <Badge variant="outline" color="error">Error</Badge>
                    </div>
                  </div>

                  <div>
                    <p className="font-mono text-label text-sand-9 uppercase tracking-widest mb-3">Badge — dot</p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="dot" color="neutral">Charging</Badge>
                      <Badge variant="dot" color="red">GridRed</Badge>
                      <Badge variant="dot" color="success">Online</Badge>
                      <Badge variant="dot" color="warning">Maintenance</Badge>
                      <Badge variant="dot" color="error">Fault</Badge>
                    </div>
                  </div>

                  {/* Pills */}
                  <div>
                    <p className="font-mono text-label text-sand-9 uppercase tracking-widest mb-3">Pill</p>
                    <div className="flex flex-wrap gap-2">
                      <Pill variant="red">GridCharge</Pill>
                      <Pill variant="red">OCPP 2.0.1</Pill>
                      <Pill variant="neutral">Home Energy</Pill>
                      <Pill variant="neutral">DC 60 kW</Pill>
                    </div>
                  </div>

                  {/* StatusBadges */}
                  <div>
                    <p className="font-mono text-label text-sand-9 uppercase tracking-widest mb-3">StatusBadge</p>
                    <div className="flex flex-wrap gap-3">
                      <StatusBadge status="online" label="Online" />
                      <StatusBadge status="offline" label="Offline" />
                      <StatusBadge status="maintenance" label="Maintenance" />
                      <StatusBadge status="inactive" label="Inactive" />
                    </div>
                  </div>

                  {/* SubsectionNav */}
                  <div>
                    <p className="font-mono text-label text-sand-9 uppercase tracking-widest mb-3">SubsectionNav</p>
                    <SubsectionNav
                      sectionLabel="GRIDCHARGE"
                      items={[
                        { id: "overview", label: "Overview" },
                        { id: "home", label: "Home" },
                        { id: "destination", label: "Destination" },
                        { id: "fleet", label: "Fleet" },
                      ]}
                      activeId={activeSubnav}
                      onItemClick={setActiveSubnav}
                    />
                  </div>
                </div>
              </Section>

              {/* ═══════════════════════════════════════════════════════════
                  SECTION 12 — Cards
              ═══════════════════════════════════════════════════════════ */}
              <Section id="cards">
                <SectionHeader
                  label="12 / CARDS"
                  heading="Card system"
                  lead="Product, Solution, Feature, Vertical, Project, Testimonial — all with real GridPower content."
                />

                <div className="mt-8 space-y-10">
                  {/* Row 1 — large cards */}
                  <div>
                    <p className="font-mono text-label text-sand-9 uppercase tracking-widest mb-4">Large cards</p>
                    <div className="grid grid-cols-3 gap-4">
                      <ProductCard
                        title="DC 60kW Dual-Gun"
                        specs={[
                          { label: "Power", value: "60 kW" },
                          { label: "Connectors", value: "2× CCS2" },
                          { label: "Efficiency", value: "≥94%" },
                          { label: "IP rating", value: "IP55" },
                        ]}
                        price="₹2.5L"
                        ctaLabel="View specs"
                      />

                      <SolutionCard
                        label="GRIDCHARGE"
                        title="Turn parking into revenue"
                        description="Install charge points in any parking facility and monetise idle time. Fully managed via GridOS."
                      />

                      <VerticalCard
                        brand="GRIDENERGY"
                        title="GridStore Home"
                        tagline="15 kWh intelligent home storage"
                        stat="ROI in 5 years"
                      />
                    </div>
                  </div>

                  {/* Row 2 — smaller cards */}
                  <div>
                    <p className="font-mono text-label text-sand-9 uppercase tracking-widest mb-4">Smaller cards</p>
                    <div className="grid grid-cols-3 gap-4">
                      <FeatureCard
                        icon={<Globe size={18} />}
                        label="OPEN STANDARDS"
                        title="No proprietary lock-in"
                        description="OCPP 2.0.1, Modbus TCP, REST API, and MQTT. Your data stays yours."
                      />

                      <ProjectCard
                        location="GIDC VERNA · GOA"
                        title="GridPower GIDC Verna"
                        description="3 DC fast chargers, 60 kW each. Q2 2026 deployment."
                        badge="GridCharge"
                        status="Upcoming Q2 2026"
                      />

                      <TestimonialCard
                        quote="GridOS gives us real-time visibility across every charger in our fleet. Revenue reporting used to take a day — now it's live."
                        name="Rajan Mehra"
                        role="Head of Operations · Nexus Malls"
                      />
                    </div>
                  </div>

                  {/* Base Card */}
                  <div>
                    <p className="font-mono text-label text-sand-9 uppercase tracking-widest mb-4">Base Card + ImgPlaceholder</p>
                    <div className="grid grid-cols-2 gap-4">
                      <Card>
                        <CardHeader>
                          <CardTitle>GridStore Home 15kWh</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ImgPlaceholder aspect="16/9" label="Product render" />
                          <p className="mt-3 font-body text-body-sm text-sand-11">
                            Residential battery storage with integrated inverter and GridOS monitoring.
                          </p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader>
                          <CardTitle>Home solar ROI — 5yr projection</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ImgPlaceholder aspect="4/3" icon="camera" label="Lifestyle shoot" />
                          <p className="mt-3 font-body text-body-sm text-sand-11">
                            Typical payback period for a 10 kWh system with 3 kW solar in Goa.
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              </Section>

              {/* ═══════════════════════════════════════════════════════════
                  SECTION 13 — Data display
              ═══════════════════════════════════════════════════════════ */}
              <Section id="data-display">
                <SectionHeader
                  label="13 / DATA DISPLAY"
                  heading="Data display"
                  lead="StatCard, DataTable, SpecTable, LineChart, BarChart, HeatmapChart."
                />

                <div className="mt-8 space-y-10">
                  {/* Stat cards */}
                  <div>
                    <p className="font-mono text-label text-sand-9 uppercase tracking-widest mb-4">StatCard row</p>
                    <div className="grid grid-cols-4 gap-4">
                      <StatCard label="Total Stations" value="127" trend="+12 this month" trendDir="up" />
                      <StatCard label="Online Now" value="124" trend="97.6% uptime" trendDir="up" />
                      <StatCard label="Revenue Today" value="₹42,180" trend="↑ 8% vs yesterday" trendDir="up" />
                      <StatCard label="Energy Delivered" value="1,284 kWh" trend="stable" trendDir="neutral" />
                    </div>
                  </div>

                  {/* SpecTable */}
                  <div>
                    <p className="font-mono text-label text-sand-9 uppercase tracking-widest mb-4">SpecTable — DC 60kW Dual-Gun</p>
                    <SpecTable
                      title="GridCharge DC 60kW Dual-Gun · Technical Specifications"
                      rows={[
                        { label: "Output power", value: "60 kW (max)" },
                        { label: "Connectors", value: "2× CCS2 + 1× CHAdeMO" },
                        { label: "Input voltage", value: "380–415 V AC, 3-phase" },
                        { label: "Output voltage", value: "150–920 V DC" },
                        { label: "Efficiency", value: "≥ 94.5%" },
                        { label: "Protection", value: "IP55 / IK10" },
                        { label: "Comms", value: "OCPP 2.0.1, 4G LTE, Ethernet" },
                        { label: "Dimensions", value: "740 × 380 × 180 mm" },
                      ]}
                    />
                  </div>

                  {/* DataTable */}
                  <div>
                    <p className="font-mono text-label text-sand-9 uppercase tracking-widest mb-4">DataTable — Station network</p>
                    <DataTable
                      columns={[
                        { key: "name", header: "Station" },
                        { key: "location", header: "Location" },
                        {
                          key: "status",
                          header: "Status",
                          render: (row) => (
                            <StatusBadge
                              status={row["status"] as "online" | "offline" | "maintenance"}
                              label={row["status"] as string}
                            />
                          ),
                        },
                        { key: "chargers", header: "Chargers" },
                        { key: "utilization", header: "Utilization" },
                        { key: "revenue", header: "Revenue (24h)" },
                      ]}
                      data={STATION_DATA as Array<Record<string, unknown>>}
                    />
                  </div>

                  {/* Charts */}
                  <div className="grid grid-cols-2 gap-6">
                    <LineChart
                      data={LINE_CHART_DATA}
                      series={[{ dataKey: "revenue", name: "Revenue (₹)" }]}
                      xAxisKey="day"
                      yUnit="₹"
                      title="Revenue this month"
                      subtitle="April 2026 · all stations"
                      chartHeight={200}
                    />
                    <BarChart
                      data={BAR_CHART_DATA}
                      series={[{ dataKey: "sessions", name: "Sessions", highlightLast: true }]}
                      xAxisKey="station"
                      title="Sessions by station"
                      subtitle="Last 24 hours"
                      chartHeight={200}
                    />
                  </div>

                  <div>
                    <HeatmapChart
                      data={HEATMAP_DATA}
                      rowLabels={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]}
                      colLabels={["00", "02", "04", "06", "08", "10", "12", "14", "16", "18", "20", "22"]}
                      title="Utilization heatmap"
                      subtitle="Hour of day × day of week · all stations"
                      cellSize={28}
                    />
                  </div>
                </div>
              </Section>

              {/* ═══════════════════════════════════════════════════════════
                  SECTION 14 — Navigation
              ═══════════════════════════════════════════════════════════ */}
              <Section id="navigation">
                <SectionHeader
                  label="14 / NAVIGATION"
                  heading="Navigation components"
                />

                <div className="mt-8 space-y-10">
                  {/* Navbar preview */}
                  <div>
                    <p className="font-mono text-label text-sand-9 uppercase tracking-widest mb-3">Navbar (full mega menu)</p>
                    <div className="rounded-card border border-border overflow-hidden">
                      <Navbar />
                    </div>
                    <DemoLabel>Sticky navbar — GridPower logo + mega-menu + CTA buttons</DemoLabel>
                  </div>

                  {/* Sidebar */}
                  <div>
                    <p className="font-mono text-label text-sand-9 uppercase tracking-widest mb-3">Sidebar (Console)</p>
                    <div className="rounded-card overflow-hidden border border-dark-6" style={{ maxWidth: 220 }}>
                      <Sidebar
                        sections={SIDEBAR_SECTIONS}
                        activeKey="stations"
                        appName="GridPower"
                        appLabel="Console"
                        user={{ name: "Sagar Siwach", role: "Admin", initials: "SS" }}
                      />
                    </div>
                    <DemoLabel>Dark sidebar — active item has GridRed left border</DemoLabel>
                  </div>

                  {/* Topbar */}
                  <div>
                    <p className="font-mono text-label text-sand-9 uppercase tracking-widest mb-3">Topbar</p>
                    <div className="rounded-card border border-dark-6 overflow-hidden">
                      <Topbar
                        breadcrumb={
                          <Breadcrumb
                            items={[
                              { label: "Home" },
                              { label: "Stations" },
                              { label: "GridPower-Goa-01" },
                            ]}
                          />
                        }
                        userName="Sagar Siwach"
                        userInitials="SS"
                        notificationCount={3}
                      />
                    </div>
                    <DemoLabel>Console top bar with breadcrumb + search + user avatar</DemoLabel>
                  </div>

                  {/* Tabs */}
                  <div>
                    <p className="font-mono text-label text-sand-9 uppercase tracking-widest mb-3">Tabs</p>
                    <Tabs defaultValue="overview">
                      <TabsList>
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="sessions">Sessions</TabsTrigger>
                        <TabsTrigger value="energy">Energy</TabsTrigger>
                        <TabsTrigger value="settings">Settings</TabsTrigger>
                      </TabsList>
                      <TabsContent value="overview">
                        <div className="p-4 rounded-card bg-sand-2 border border-border mt-2">
                          <p className="font-body text-body text-sand-11">
                            Station overview — 4 chargers online · 76% utilization today.
                          </p>
                        </div>
                      </TabsContent>
                      <TabsContent value="sessions">
                        <div className="p-4 rounded-card bg-sand-2 border border-border mt-2">
                          <p className="font-body text-body text-sand-11">
                            48 sessions today · avg duration 42 min · avg kWh 18.3
                          </p>
                        </div>
                      </TabsContent>
                      <TabsContent value="energy">
                        <div className="p-4 rounded-card bg-sand-2 border border-border mt-2">
                          <p className="font-body text-body text-sand-11">1,284 kWh delivered today.</p>
                        </div>
                      </TabsContent>
                      <TabsContent value="settings">
                        <div className="p-4 rounded-card bg-sand-2 border border-border mt-2">
                          <p className="font-body text-body text-sand-11">Station configuration panel.</p>
                        </div>
                      </TabsContent>
                    </Tabs>
                    <DemoLabel>Tabs — underline active state, GridRed indicator</DemoLabel>
                  </div>

                  {/* Breadcrumb */}
                  <div>
                    <p className="font-mono text-label text-sand-9 uppercase tracking-widest mb-3">Breadcrumb</p>
                    <Breadcrumb
                      items={[
                        { label: "Home", href: "/" },
                        { label: "Energy", href: "/energy" },
                        { label: "Solutions", href: "/energy/solutions" },
                        { label: "Home Energy" },
                      ]}
                    />
                    <DemoLabel>4-level breadcrumb — last item not linked</DemoLabel>
                  </div>

                  {/* Pagination */}
                  <div>
                    <p className="font-mono text-label text-sand-9 uppercase tracking-widest mb-3">Pagination</p>
                    <Pagination
                      page={paginationPage}
                      totalPages={10}
                      onPageChange={setPaginationPage}
                    />
                    <p className="font-mono text-[11px] text-sand-8 mt-2">
                      Showing {(paginationPage - 1) * 10 + 1}–{paginationPage * 10} of 100 results
                    </p>
                    <DemoLabel>Active page: {paginationPage} · click to navigate</DemoLabel>
                  </div>
                </div>
              </Section>

              {/* ═══════════════════════════════════════════════════════════
                  SECTION 15 — Feedback
              ═══════════════════════════════════════════════════════════ */}
              <Section id="feedback">
                <SectionHeader
                  label="15 / FEEDBACK"
                  heading="Feedback + Overlay components"
                />

                <div className="mt-8 space-y-8">
                  {/* Alerts */}
                  <div>
                    <p className="font-mono text-label text-sand-9 uppercase tracking-widest mb-3">Alert × 4</p>
                    <div className="space-y-3">
                      <Alert variant="info" title="Firmware update available" description="GridCharge firmware v2.1.4 is ready. Schedule during off-peak hours." dismissible />
                      <Alert variant="success" title="Station back online" description="GridPower-Goa-01 reconnected after maintenance. All 4 connectors available." />
                      <Alert variant="warning" title="High utilization detected" description="GridPower-Blr-01 has been at 95%+ utilization for 6h. Consider adding a charger." dismissible />
                      <Alert variant="error" title="Payment gateway timeout" description="Razorpay API returned 504. Sessions in queue. Check your API credentials." />
                    </div>
                  </div>

                  {/* Toast */}
                  <div>
                    <p className="font-mono text-label text-sand-9 uppercase tracking-widest mb-3">Toast (Sonner)</p>
                    <div className="flex flex-wrap gap-3">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => toast.success("Station configuration saved.")}
                      >
                        <Check className="h-4 w-4" /> Success toast
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => toast.error("Payment gateway timeout. Retry in 30s.")}
                      >
                        <XCircle className="h-4 w-4" /> Error toast
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => toast.warning("High utilization on Goa-01.")}
                      >
                        <AlertTriangle className="h-4 w-4" /> Warning toast
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => toast.info("Firmware update queued for tonight.")}
                      >
                        <Info className="h-4 w-4" /> Info toast
                      </Button>
                    </div>
                    <DemoLabel>Click buttons to trigger sonner toasts</DemoLabel>
                  </div>

                  {/* Dialog */}
                  <div>
                    <p className="font-mono text-label text-sand-9 uppercase tracking-widest mb-3">Dialog</p>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="secondary" size="sm">Open dialog</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Deactivate station</DialogTitle>
                          <DialogDescription>
                            This will take GridPower-Goa-01 offline immediately. Active sessions will be gracefully terminated.
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <Button variant="ghost" size="sm">Cancel</Button>
                          <Button variant="primary" size="sm">Confirm deactivation</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    <DemoLabel>Dialog — confirm destructive action</DemoLabel>
                  </div>

                  {/* Sheet */}
                  <div>
                    <p className="font-mono text-label text-sand-9 uppercase tracking-widest mb-3">Sheet (Drawer)</p>
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button variant="secondary" size="sm">Open sheet</Button>
                      </SheetTrigger>
                      <SheetContent>
                        <SheetHeader>
                          <SheetTitle>Station settings</SheetTitle>
                          <SheetDescription>
                            GridPower-Goa-01 · Panjim, Goa · 4 chargers
                          </SheetDescription>
                        </SheetHeader>
                        <div className="mt-6 space-y-4">
                          <div>
                            <label className="font-body text-[13px] text-sand-11 mb-1 block">Display name</label>
                            <Input defaultValue="GridPower-Goa-01" />
                          </div>
                          <div>
                            <label className="font-body text-[13px] text-sand-11 mb-1 block">Network</label>
                            <Select defaultValue="4g">
                              <SelectTrigger><SelectValue /></SelectTrigger>
                              <SelectContent>
                                <SelectItem value="4g">4G LTE</SelectItem>
                                <SelectItem value="eth">Ethernet</SelectItem>
                                <SelectItem value="wifi">Wi-Fi</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </SheetContent>
                    </Sheet>
                    <DemoLabel>Sheet — side-panel for settings / details</DemoLabel>
                  </div>

                  {/* Dropdown */}
                  <div>
                    <p className="font-mono text-label text-sand-9 uppercase tracking-widest mb-3">DropdownMenu</p>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          Actions <ChevronDown className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" /> Edit station
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <RefreshCw className="h-4 w-4 mr-2" /> Restart charger
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="h-4 w-4 mr-2" /> Export sessions
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-error">
                          <Trash2 className="h-4 w-4 mr-2" /> Remove station
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <DemoLabel>DropdownMenu — actions list with separator</DemoLabel>
                  </div>

                  {/* EmptyState */}
                  <div>
                    <p className="font-mono text-label text-sand-9 uppercase tracking-widest mb-3">EmptyState</p>
                    <div className="rounded-card border border-border">
                      <EmptyState
                        icon={<Zap size={20} />}
                        title="No stations added yet"
                        description="Add your first charging station to start monitoring revenue, utilization, and energy delivery."
                        action={<Button variant="primary" size="sm"><Plus className="h-4 w-4" /> Add station</Button>}
                      />
                    </div>
                    <DemoLabel>EmptyState — zero-data screen with CTA</DemoLabel>
                  </div>

                  {/* Skeleton */}
                  <div>
                    <p className="font-mono text-label text-sand-9 uppercase tracking-widest mb-3">Skeleton loading</p>
                    <div className="grid grid-cols-3 gap-4">
                      <SkeletonCard />
                      <SkeletonCard />
                      <div className="space-y-3 rounded-card border border-border p-4">
                        <Skeleton className="h-4 w-3/4" />
                        <SkeletonText lines={4} />
                        <Skeleton className="h-8 w-28" />
                      </div>
                    </div>
                    <DemoLabel>SkeletonCard + SkeletonText + Skeleton primitives</DemoLabel>
                  </div>
                </div>
              </Section>

              {/* ═══════════════════════════════════════════════════════════
                  SECTION 16 — Utility
              ═══════════════════════════════════════════════════════════ */}
              <Section id="utility">
                <SectionHeader
                  label="16 / UTILITY"
                  heading="Utility + marketing primitives"
                  lead="DotGrid, SectionLabel, SectionDivider, SectionHeader, ImgPlaceholder, ProcessSteps, NumbersBar, CTASection, LogoCloud."
                />

                <div className="mt-8 space-y-10">
                  {/* SectionLabel */}
                  <div>
                    <p className="font-mono text-label text-sand-9 uppercase tracking-widest mb-3">SectionLabel</p>
                    <div className="space-y-2">
                      <SectionLabel>GRIDENERGY</SectionLabel>
                      <SectionLabel number="03">THE PLATFORM</SectionLabel>
                      <SectionLabel variant="neutral">GET IN TOUCH</SectionLabel>
                    </div>
                    <DemoLabel>Red (default) / with number / neutral variant</DemoLabel>
                  </div>

                  {/* SectionHeader */}
                  <div>
                    <p className="font-mono text-label text-sand-9 uppercase tracking-widest mb-3">SectionHeader</p>
                    <div className="rounded-card border border-border p-6 bg-sand-2">
                      <SectionHeader
                        label="THREE VERTICALS · ONE PLATFORM"
                        heading="Every layer of the energy stack."
                        lead="Storage, charging, and powertrain — designed to work together, built on open standards."
                      />
                    </div>
                  </div>

                  {/* ImgPlaceholder variants */}
                  <div>
                    <p className="font-mono text-label text-sand-9 uppercase tracking-widest mb-3">ImgPlaceholder</p>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <ImgPlaceholder aspect="16/9" label="Hero lifestyle" />
                        <DemoLabel>16/9 · light</DemoLabel>
                      </div>
                      <div>
                        <ImgPlaceholder aspect="4/3" icon="camera" label="Product render" />
                        <DemoLabel>4/3 · camera icon</DemoLabel>
                      </div>
                      <div>
                        <ImgPlaceholder aspect="1/1" theme="dark" label="Avatar" />
                        <DemoLabel>1/1 · dark theme</DemoLabel>
                      </div>
                    </div>
                  </div>

                  {/* ProcessSteps */}
                  <div>
                    <p className="font-mono text-label text-sand-9 uppercase tracking-widest mb-3">ProcessSteps</p>
                    <ProcessSteps
                      steps={[
                        { title: "Assess", description: "Site survey and load analysis. We identify the right solution for your energy profile." },
                        { title: "Design", description: "Custom system design with full specs, P&ID diagrams, and ROI projection." },
                        { title: "Install", description: "Certified GridPower partner installation in 1–2 days. Zero downtime." },
                        { title: "Monitor", description: "24/7 visibility via GridOS. Remote diagnostics and OTA firmware updates." },
                      ]}
                    />
                    <DemoLabel>4-step horizontal · GridRed numbered circles</DemoLabel>
                  </div>

                  {/* NumbersBar */}
                  <div>
                    <p className="font-mono text-label text-sand-9 uppercase tracking-widest mb-3">NumbersBar</p>
                    <NumbersBar
                      stats={[
                        { value: "Launch Q2 2026", label: "First deployments", accent: true },
                        { value: "5 kWh – 1 MWh", label: "Storage range" },
                        { value: "3.3 – 240 kW", label: "Charging range" },
                        { value: "2W / 3W / 4W", label: "Powertrain platforms" },
                      ]}
                    />
                    <DemoLabel>4-stat bar · accent value in GridRed</DemoLabel>
                  </div>

                  {/* LogoCloud */}
                  <div>
                    <p className="font-mono text-label text-sand-9 uppercase tracking-widest mb-3">LogoCloud</p>
                    <div className="rounded-card border border-border p-6 bg-sand-2">
                      <p className="font-mono text-label text-sand-9 uppercase tracking-widest mb-4 text-center">
                        Placeholder — 6 partner logos (monochrome by default, reveal on hover)
                      </p>
                      <div className="grid grid-cols-6 gap-8">
                        {Array.from({ length: 6 }, (_, i) => (
                          <div key={i} className="h-8 rounded bg-sand-4 flex items-center justify-center">
                            <span className="font-mono text-[10px] text-sand-8 uppercase">Logo {i + 1}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <DemoLabel>LogoCloud accepts Logo[] with src/alt/href — placeholders shown</DemoLabel>
                  </div>

                  {/* CTASection */}
                  <div>
                    <p className="font-mono text-label text-sand-9 uppercase tracking-widest mb-3">CTASection</p>
                    <CTASection
                      variant="dark"
                      heading="Ready to power your future?"
                      description="Energy storage, EV charging, and powertrain — one open platform."
                      primaryCta={<Button variant="primary" size="lg">Get early access</Button>}
                      secondaryCta={<Button variant="ghost" size="lg" className="border-dark-7 text-dark-12 hover:bg-dark-4">Learn more</Button>}
                    />
                    <DemoLabel>CTASection — dark variant (sand-12 bg) with dot grid</DemoLabel>
                  </div>
                </div>
              </Section>

              {/* ═══════════════════════════════════════════════════════════
                  SECTION 17 — Iconography
              ═══════════════════════════════════════════════════════════ */}
              <Section id="iconography">
                <SectionHeader
                  label="17 / ICONOGRAPHY"
                  heading="Icon library"
                  lead="Lucide React — 2px stroke, 24px default. Sand 11 on light, Dark 11 on dark."
                />

                <div className="mt-8">
                  <div className="grid grid-cols-[repeat(auto-fill,minmax(72px,1fr))] gap-2">
                    {ICONS_GRID.map(({ icon, label }) => (
                      <div
                        key={label}
                        className="flex flex-col items-center gap-1.5 p-3 rounded-btn border border-border bg-sand-1 hover:bg-sand-2 transition-colors"
                      >
                        <span className="text-sand-11">{icon}</span>
                        <span className="font-mono text-[9px] text-sand-8 text-center leading-tight">{label}</span>
                      </div>
                    ))}
                  </div>
                  <p className="font-mono text-label text-sand-9 uppercase tracking-widest mt-4">
                    24px default · 20px compact · 2px stroke · Sand 11 on light · Dark 11 on dark
                  </p>
                </div>
              </Section>

              {/* ═══════════════════════════════════════════════════════════
                  SECTION 18 — Dark mode parity
              ═══════════════════════════════════════════════════════════ */}
              <Section id="dark-mode">
                <SectionHeader
                  label="18 / DARK MODE PARITY"
                  heading="Token-based dark mode"
                  lead="All components designed for mode parity. Swap is token-based — Sand swaps to Dark automatically via data-theme='dark'."
                />

                <div className="mt-6 flex items-center gap-3 mb-8">
                  <Switch checked={darkTheme} onCheckedChange={setDarkTheme} id="dm-toggle" />
                  <label htmlFor="dm-toggle" className="font-body text-[14px] text-sand-11">
                    Toggle dark wrapper below
                  </label>
                  <Badge variant="solid" color={darkTheme ? "neutral" : "red"}>
                    {darkTheme ? "Dark" : "Light"}
                  </Badge>
                </div>

                <div
                  data-theme={darkTheme ? "dark" : undefined}
                  className="rounded-card overflow-hidden border"
                  style={{
                    borderColor: darkTheme ? "var(--dark-6)" : "var(--border)",
                    background: darkTheme ? "var(--dark-1)" : "var(--sand-1)",
                  }}
                >
                  <div className="p-6 space-y-6">
                    {/* Buttons */}
                    <div>
                      <p
                        className="font-mono text-[11px] uppercase tracking-widest mb-3"
                        style={{ color: darkTheme ? "var(--dark-9)" : "var(--sand-9)" }}
                      >
                        Buttons
                      </p>
                      <div className="flex gap-3 flex-wrap">
                        <Button variant="primary" size="md">Primary</Button>
                        <Button
                          variant="ghost"
                          size="md"
                          className={darkTheme ? "border-dark-7 text-dark-12 hover:bg-dark-4" : ""}
                        >
                          Ghost
                        </Button>
                        <Button variant="secondary" size="md">Secondary</Button>
                      </div>
                    </div>

                    {/* Stat cards on dark */}
                    <div>
                      <p
                        className="font-mono text-[11px] uppercase tracking-widest mb-3"
                        style={{ color: darkTheme ? "var(--dark-9)" : "var(--sand-9)" }}
                      >
                        StatCards
                      </p>
                      <div className="grid grid-cols-3 gap-4">
                        <StatCard
                          theme={darkTheme ? "dark" : "light"}
                          label="Revenue Today"
                          value="₹42,180"
                          trend="↑ 8%"
                          trendDir="up"
                        />
                        <StatCard
                          theme={darkTheme ? "dark" : "light"}
                          label="Online Now"
                          value="124"
                          trend="97.6% uptime"
                          trendDir="up"
                        />
                        <StatCard
                          theme={darkTheme ? "dark" : "light"}
                          label="Offline"
                          value="3"
                          trend="↑ 2 since last hour"
                          trendDir="down"
                        />
                      </div>
                    </div>

                    {/* Feature card */}
                    <div>
                      <p
                        className="font-mono text-[11px] uppercase tracking-widest mb-3"
                        style={{ color: darkTheme ? "var(--dark-9)" : "var(--sand-9)" }}
                      >
                        FeatureCard
                      </p>
                      <div className="max-w-xs">
                        <FeatureCard
                          icon={<Shield size={18} />}
                          label="OPEN STANDARDS"
                          title="No proprietary lock-in"
                          description="OCPP 2.0.1, Modbus TCP, REST API, and MQTT. Your data stays yours."
                        />
                      </div>
                    </div>

                    {/* Badges */}
                    <div>
                      <p
                        className="font-mono text-[11px] uppercase tracking-widest mb-3"
                        style={{ color: darkTheme ? "var(--dark-9)" : "var(--sand-9)" }}
                      >
                        StatusBadges
                      </p>
                      <div className="flex gap-3 flex-wrap">
                        <StatusBadge status="online" label="Online" />
                        <StatusBadge status="offline" label="Offline" />
                        <StatusBadge status="maintenance" label="Maintenance" />
                      </div>
                    </div>
                  </div>
                </div>

                <p className="font-mono text-label text-sand-9 uppercase tracking-widest mt-4">
                  Dark mode applies via data-theme="dark" on a wrapper element. All semantic aliases remap automatically.
                </p>
              </Section>

              {/* ═══════════════════════════════════════════════════════════
                  SECTION 19 — Anti-patterns
              ═══════════════════════════════════════════════════════════ */}
              <Section id="anti-patterns">
                <SectionHeader
                  label="19 / ANTI-PATTERNS"
                  heading="What NOT to do"
                  lead="Negative examples. Each tile shows a rejected pattern with a reason. Avoid all of these."
                />

                <div className="mt-8 grid grid-cols-2 gap-4">
                  {[
                    {
                      title: "Hero carousel",
                      why: "Auto-rotating content hides information, causes motion issues, and GridPower's content hierarchy is not meant to scroll horizontally.",
                    },
                    {
                      title: "Gradient mesh background",
                      why: "Blurry purple/pink SaaS aesthetics directly oppose GridPower's blueprint grid and clean sand palette.",
                    },
                    {
                      title: "Floating 3D product render",
                      why: "Unrealistic marketing renders undermine GridPower's engineering credibility. Prefer real photography or technical diagrams.",
                    },
                    {
                      title: "Stock photo of person at laptop",
                      why: "Generic stock images erode trust. Every visual on the site should show real GridPower hardware, sites, or data.",
                    },
                    {
                      title: "Dropshadow-heavy glass card",
                      why: "The skeuomorphic 'glassmorphism' look conflicts with the flat, grid-ruled aesthetic. Cards sit on the grid, not above it.",
                    },
                    {
                      title: "Dark mode marketing hero",
                      why: "Dark mode is for Console + App (data-dense, night-use). Marketing site is always light. Mixing breaks the system's intent.",
                    },
                    {
                      title: "Rainbow colour accents",
                      why: "GridRed is the only accent colour. Adding blue, purple, or teal accents fragments brand identity and breaks the token system.",
                    },
                    {
                      title: "Display font mid-paragraph",
                      why: "Clash Grotesk is for display/headings only. Mixing it into body paragraphs breaks the typography hierarchy and readability.",
                    },
                  ].map(({ title, why }) => (
                    <div
                      key={title}
                      className="relative rounded-card border-2 border-error/40 bg-error-bg p-5"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-error text-white mt-0.5">
                          <X size={12} strokeWidth={3} />
                        </div>
                        <div>
                          <p className="font-body text-[14px] font-semibold text-sand-12 mb-1">{title}</p>
                          <p className="font-body text-[13px] text-sand-11 leading-relaxed">{why}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Section>

              {/* ═══════════════════════════════════════════════════════════
                  SECTION 20 — Downloads
              ═══════════════════════════════════════════════════════════ */}
              <Section id="downloads">
                <SectionHeader
                  label="20 / DOWNLOADS"
                  heading="Design assets + tokens"
                  lead="Source files for designers and developers. Token CSS is the single source of truth for all values."
                />

                <div className="mt-8 grid grid-cols-3 gap-4">
                  {[
                    {
                      title: "tokens.css",
                      desc: "All CSS custom properties — colors, typography, spacing, radius, shadows, transitions.",
                      path: "/packages/tokens/src/tokens.css",
                      icon: <Cpu size={18} />,
                    },
                    {
                      title: "Clash Grotesk",
                      desc: "Self-hosted display/heading font. Variable font, weights 200–700. .woff2 format.",
                      path: "/packages/tokens/src/fonts/",
                      icon: <BookOpen size={18} />,
                    },
                    {
                      title: "Inter",
                      desc: "Self-hosted body font. Variable font, full weight range. .woff2 format.",
                      path: "/packages/tokens/src/fonts/",
                      icon: <BookOpen size={18} />,
                    },
                    {
                      title: "Geist Mono",
                      desc: "Self-hosted monospace font for labels, code, and specs.",
                      path: "/packages/tokens/src/fonts/",
                      icon: <BookOpen size={18} />,
                    },
                    {
                      title: "@gridpower/ui",
                      desc: "Component library source. All 50+ components tree-shakeable. Import from barrel.",
                      path: "/packages/ui/src/index.ts",
                      icon: <Layers size={18} />,
                    },
                    {
                      title: "Design brief",
                      desc: "GridPower Master Brief 2026-04-24 — complete design language reference.",
                      path: "/docs/GridPower-MASTER-BRIEF-2026-04-24.md",
                      icon: <BookOpen size={18} />,
                    },
                  ].map(({ title, desc, path, icon }) => (
                    <div
                      key={title}
                      className="flex flex-col gap-3 rounded-card border border-border bg-sand-2 p-5"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-btn bg-sand-3 text-sand-11">
                        {icon}
                      </div>
                      <div>
                        <p className="font-body text-[14px] font-semibold text-sand-12">{title}</p>
                        <p className="font-body text-[12px] text-sand-9 mt-1 leading-relaxed">{desc}</p>
                      </div>
                      <code className="font-mono text-[11px] text-sand-9 bg-sand-3 rounded px-2 py-1 break-all">
                        {path}
                      </code>
                    </div>
                  ))}
                </div>

                <div className="mt-8 rounded-card border border-border bg-sand-2 p-5">
                  <p className="font-mono text-label text-grid-red uppercase tracking-widest mb-2">Usage</p>
                  <pre className="font-mono text-[12px] text-sand-11 leading-relaxed overflow-x-auto">
{`import { Button, Card, StatCard, Navbar } from "@gridpower/ui";
import "@gridpower/tokens/tokens.css";`}
                  </pre>
                </div>
              </Section>

            </main>
          </div>
        </div>
      </div>

      {/* Full Footer */}
      <Footer />
    </>
  );
}
