/**
 * New tariff — /tariffs/new
 *
 * Same editor shape as /tariffs/:tariffId but with a blank default state.
 * Adds a template picker at the top: quick-fill from preset templates
 * (Standard DC, Off-peak Special, Member Discount Tier, Fleet Bulk, Per-min Quick).
 */

import * as React from "react";
import { useNavigate } from "react-router";
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  ChevronDown,
  Zap,
} from "lucide-react";
import {
  Input,
  Switch,
  cn,
} from "@gridpower/ui";

import { formatInr, previewSession, type Tariff, type TariffPricing, type TouBand } from "~/mocks/tariffs";

// ─── Shared primitives (same as editor; duplicated here so the route is self-contained) ──────

const FIELD_LABEL_CLS =
  "block font-body text-[11px] font-medium text-muted-foreground mb-1.5";

function FieldLabel({
  htmlFor,
  required,
  children,
}: {
  htmlFor: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className={FIELD_LABEL_CLS}>
      {children}
      {required && (
        <span aria-hidden="true" className="text-error ml-0.5">
          *
        </span>
      )}
    </label>
  );
}

interface FieldProps {
  id: string;
  label: string;
  required?: boolean;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  className?: string;
  hint?: string;
  prefix?: string;
  suffix?: string;
  min?: string;
  max?: string;
  step?: string;
}

function Field({
  id,
  label,
  required,
  type = "text",
  value,
  onChange,
  className,
  hint,
  prefix,
  suffix,
  min,
  max,
  step,
}: FieldProps) {
  return (
    <div className={className}>
      <FieldLabel htmlFor={id} required={required}>
        {label}
      </FieldLabel>
      <div className="relative flex items-center">
        {prefix && (
          <span className="absolute left-3 font-mono text-[12px] text-muted-foreground pointer-events-none select-none">
            {prefix}
          </span>
        )}
        <Input
          id={id}
          type={type}
          value={value}
          min={min}
          max={max}
          step={step}
          aria-required={required ? "true" : undefined}
          onChange={(e) => onChange(e.target.value)}
          className={cn(prefix && "pl-7", suffix && "pr-10")}
        />
        {suffix && (
          <span className="absolute right-3 font-mono text-[11px] text-muted-foreground pointer-events-none select-none">
            {suffix}
          </span>
        )}
      </div>
      {hint && (
        <p className="mt-1 font-body text-[11px] text-muted-foreground">{hint}</p>
      )}
    </div>
  );
}

function SectionHeading({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h3 id={id} className="font-body text-[13px] font-semibold text-foreground">
      {children}
    </h3>
  );
}

// ─── TOU band row ─────────────────────────────────────────────────────────────

const BAND_COLORS: Record<TouBand["label"], { bg: string; text: string }> = {
  peak: { bg: "bg-error/20", text: "text-error" },
  "off-peak": { bg: "bg-warning/20", text: "text-warning" },
  "super-off-peak": { bg: "bg-success/20", text: "text-success" },
};

function TouTimeline({ bands }: { bands: TouBand[] }) {
  if (bands.length === 0) return null;
  const grid: (TouBand | null)[] = Array.from({ length: 24 }, (_, h) =>
    bands.find((b) => {
      if (b.startHour < b.endHour) return h >= b.startHour && h < b.endHour;
      return h >= b.startHour || h < b.endHour;
    }) ?? null,
  );
  return (
    <div className="mt-2" aria-label="Time-of-use band timeline">
      <div
        className="flex h-6 w-full overflow-hidden rounded-input"
        role="img"
        aria-label="24-hour TOU band visualisation"
      >
        {grid.map((band, h) => (
          <div
            key={h}
            title={
              band
                ? `${h}:00 - ${band.label} (₹${band.ratePerKwh}/kWh)`
                : `${h}:00 - unassigned`
            }
            className={cn("flex-1 transition-colors", band ? BAND_COLORS[band.label].bg : "bg-muted")}
          />
        ))}
      </div>
      <div className="flex items-center gap-4 mt-2">
        {(["peak", "off-peak", "super-off-peak"] as TouBand["label"][]).map((lbl) => {
          const cfg = BAND_COLORS[lbl];
          return (
            <span key={lbl} className={cn("inline-flex items-center gap-1 font-mono text-[10px]", cfg.text)}>
              <span className={cn("h-2 w-2 rounded-sm", cfg.bg)} aria-hidden="true" />
              {lbl === "peak" ? "Peak" : lbl === "off-peak" ? "Off-peak" : "Super off-peak"}
            </span>
          );
        })}
      </div>
    </div>
  );
}

function TouBandRow({
  band,
  idx,
  onChange,
}: {
  band: TouBand;
  idx: number;
  onChange: (idx: number, field: keyof TouBand, value: string | number) => void;
}) {
  const cfg = BAND_COLORS[band.label];
  const label =
    band.label === "peak" ? "Peak" : band.label === "off-peak" ? "Off-peak" : "Super off-peak";
  return (
    <div className="grid grid-cols-[120px_80px_80px_120px] items-end gap-3">
      <div>
        <span className={cn("inline-flex items-center px-2 py-0.5 rounded-pill font-mono text-[10px]", cfg.bg, cfg.text)}>
          {label}
        </span>
      </div>
      <div>
        <label htmlFor={`tou-start-${idx}`} className={FIELD_LABEL_CLS}>
          Start (h)
        </label>
        <Input
          id={`tou-start-${idx}`}
          type="number"
          min="0"
          max="23"
          value={String(band.startHour)}
          onChange={(e) => onChange(idx, "startHour", parseInt(e.target.value, 10))}
        />
      </div>
      <div>
        <label htmlFor={`tou-end-${idx}`} className={FIELD_LABEL_CLS}>
          End (h)
        </label>
        <Input
          id={`tou-end-${idx}`}
          type="number"
          min="0"
          max="24"
          value={String(band.endHour)}
          onChange={(e) => onChange(idx, "endHour", parseInt(e.target.value, 10))}
        />
      </div>
      <div>
        <label htmlFor={`tou-rate-${idx}`} className={FIELD_LABEL_CLS}>
          Rate (₹/kWh)
        </label>
        <div className="relative flex items-center">
          <span className="absolute left-3 font-mono text-[12px] text-muted-foreground pointer-events-none select-none">
            ₹
          </span>
          <Input
            id={`tou-rate-${idx}`}
            type="number"
            min="0"
            step="0.5"
            value={String(band.ratePerKwh)}
            className="pl-7"
            onChange={(e) => onChange(idx, "ratePerKwh", parseFloat(e.target.value))}
          />
        </div>
      </div>
    </div>
  );
}

// ─── Preview card ─────────────────────────────────────────────────────────────

function PreviewCard({ draft }: { draft: EditorState }) {
  // Build a synthetic Tariff object from editor state for the preview simulation
  const fakeTariff: Tariff = {
    id: "DRAFT",
    name: draft.name || "New tariff",
    description: draft.description,
    type:
      draft.pricing.timeRatePerMin && draft.pricing.energyRatePerKwh > 0
        ? "hybrid"
        : draft.pricing.timeRatePerMin
        ? "per-min"
        : "per-kwh",
    status: "scheduled",
    effectiveFrom: draft.effectiveFrom || new Date().toISOString().slice(0, 10),
    stationsApplied: 0,
    activeDrivers: 0,
    pricing: {
      ...draft.pricing,
      touBands: draft.touEnabled ? draft.pricing.touBands : [],
      connectorOverride: {
        enabled: draft.connectorOverrideEnabled,
        acRatePerKwh: draft.connectorOverrideEnabled
          ? draft.pricing.connectorOverride.acRatePerKwh
          : undefined,
        dcRatePerKwh: draft.connectorOverrideEnabled
          ? draft.pricing.connectorOverride.dcRatePerKwh
          : undefined,
      },
    },
    apply: { scope: draft.applyScope },
    modifiedAt: new Date().toISOString(),
  };

  const sim = previewSession(fakeTariff);

  return (
    <div className="rounded-card border border-border bg-card p-4">
      <div className="flex items-center gap-2 mb-3">
        <Zap size={14} className="text-primary" aria-hidden="true" />
        <h3 className="font-body text-[13px] font-semibold text-foreground">
          Session preview
        </h3>
      </div>
      <p className="font-mono text-[10px] text-muted-foreground mb-3">
        Simulated: 30 min, 25 kWh
      </p>
      <div className="flex flex-col gap-1.5">
        {sim.lines.map((line) => (
          <div key={line.label} className="flex items-center justify-between">
            <span className="font-body text-[12px] text-muted-foreground">{line.label}</span>
            <span
              className={cn(
                "font-mono text-[12px] tabular-nums",
                line.amount < 0 ? "text-success" : "text-foreground",
              )}
            >
              {line.amount < 0 ? `-${formatInr(Math.abs(line.amount))}` : formatInr(line.amount)}
            </span>
          </div>
        ))}
      </div>
      {sim.lines.length > 0 && (
        <div className="mt-3 border-t border-border pt-3 flex items-center justify-between">
          <span className="font-body text-[13px] font-semibold text-foreground">Total</span>
          <span className="font-mono text-[16px] font-semibold text-primary tabular-nums">
            {formatInr(sim.total)}
          </span>
        </div>
      )}
      {sim.lines.length === 0 && (
        <p className="font-body text-[12px] text-muted-foreground">
          Configure pricing rules to see session cost.
        </p>
      )}
      <p className="mt-3 font-mono text-[9px] text-muted-foreground">
        Calculation uses peak rate where TOU is enabled. Idle fee not included.
      </p>
    </div>
  );
}

// ─── Templates ────────────────────────────────────────────────────────────────

interface TariffTemplate {
  id: string;
  label: string;
  description: string;
  state: Partial<EditorState>;
}

const TEMPLATES: TariffTemplate[] = [
  {
    id: "standard-dc",
    label: "Standard DC",
    description: "Flat ₹22/kWh for DC chargers with ₹3/min idle fee.",
    state: {
      name: "Standard DC",
      description: "Default rate for DC fast-chargers across the network.",
      pricing: {
        energyRatePerKwh: 22,
        touBands: [],
        idleThresholdMinutes: 15,
        idleFeePerMin: 3,
        connectionFee: 0,
        memberDiscountPct: 5,
        connectorOverride: { enabled: false },
      },
      touEnabled: false,
      connectorOverrideEnabled: false,
    },
  },
  {
    id: "off-peak-special",
    label: "Off-peak special",
    description: "TOU tariff with super-cheap overnight rates to shift load.",
    state: {
      name: "Off-Peak Special",
      description: "Incentivises overnight charging with heavily discounted off-peak rates.",
      pricing: {
        energyRatePerKwh: 18,
        touBands: [
          { label: "peak", startHour: 9, endHour: 21, ratePerKwh: 22 },
          { label: "off-peak", startHour: 21, endHour: 24, ratePerKwh: 14 },
          { label: "super-off-peak", startHour: 0, endHour: 9, ratePerKwh: 10 },
        ],
        idleThresholdMinutes: 15,
        idleFeePerMin: 4,
        connectionFee: 10,
        memberDiscountPct: 0,
        connectorOverride: { enabled: false },
      },
      touEnabled: true,
      connectorOverrideEnabled: false,
    },
  },
  {
    id: "member-discount",
    label: "Member discount tier",
    description: "15% off for verified app users with a modest base rate.",
    state: {
      name: "Member Discount Tier",
      description: "Exclusive lower rate for verified GridCharge app members.",
      pricing: {
        energyRatePerKwh: 18,
        touBands: [
          { label: "peak", startHour: 9, endHour: 21, ratePerKwh: 20 },
          { label: "off-peak", startHour: 21, endHour: 24, ratePerKwh: 14 },
          { label: "super-off-peak", startHour: 0, endHour: 9, ratePerKwh: 10 },
        ],
        idleThresholdMinutes: 20,
        idleFeePerMin: 2,
        connectionFee: 0,
        memberDiscountPct: 15,
        connectorOverride: { enabled: true, acRatePerKwh: 10, dcRatePerKwh: 18 },
      },
      touEnabled: true,
      connectorOverrideEnabled: true,
    },
  },
  {
    id: "highway-premium",
    label: "Highway premium",
    description: "₹25/kWh for highway corridor DC chargers with connection fee.",
    state: {
      name: "Highway Premium",
      description: "Premium rate for highway corridor DC chargers with guaranteed uptime.",
      pricing: {
        energyRatePerKwh: 25,
        touBands: [],
        idleThresholdMinutes: 10,
        idleFeePerMin: 5,
        connectionFee: 20,
        memberDiscountPct: 0,
        connectorOverride: { enabled: false },
      },
      touEnabled: false,
      connectorOverrideEnabled: false,
    },
  },
  {
    id: "per-min-quick",
    label: "Per-min quick",
    description: "₹4.50/min for fast top-up sessions at high-dwell locations.",
    state: {
      name: "Per-Min Quick",
      description: "Per-minute billing for drivers needing a fast top-up.",
      pricing: {
        energyRatePerKwh: 0,
        touBands: [],
        timeRatePerMin: 4.5,
        idleThresholdMinutes: 10,
        idleFeePerMin: 3,
        connectionFee: 0,
        memberDiscountPct: 0,
        connectorOverride: { enabled: false },
      },
      touEnabled: false,
      connectorOverrideEnabled: false,
    },
  },
];

// ─── Editor state ─────────────────────────────────────────────────────────────

interface EditorState {
  name: string;
  description: string;
  effectiveFrom: string;
  expiresAt: string;
  pricing: TariffPricing;
  applyScope: "all" | "city" | "tag" | "specific";
  applyCities: string[];
  applyTags: string[];
  applyStationIds: string;
  touEnabled: boolean;
  connectorOverrideEnabled: boolean;
}

const BLANK_STATE: EditorState = {
  name: "",
  description: "",
  effectiveFrom: "",
  expiresAt: "",
  pricing: {
    energyRatePerKwh: 0,
    touBands: [],
    timeRatePerMin: undefined,
    idleThresholdMinutes: undefined,
    idleFeePerMin: undefined,
    connectionFee: 0,
    memberDiscountPct: 0,
    connectorOverride: { enabled: false },
  },
  applyScope: "all",
  applyCities: [],
  applyTags: [],
  applyStationIds: "",
  touEnabled: false,
  connectorOverrideEnabled: false,
};

const SCOPE_OPTIONS = [
  { value: "all", label: "All stations" },
  { value: "city", label: "By city" },
  { value: "tag", label: "By tag" },
  { value: "specific", label: "Specific list" },
] as const;

const CITY_OPTIONS = [
  "Mumbai", "Delhi", "Bengaluru", "Hyderabad", "Pune",
  "Chennai", "Ahmedabad", "Kolkata",
];

const TAG_OPTIONS = ["DC", "AC", "highway", "mall", "parking", "member-eligible"];

// ─── Main component ──────────────────────────────────────────────────────────

export default function TariffNew() {
  const navigate = useNavigate();
  const [state, setState] = React.useState<EditorState>(BLANK_STATE);
  const [templateOpen, setTemplateOpen] = React.useState(false);
  const [saved, setSaved] = React.useState(false);
  const [validationError, setValidationError] = React.useState<string | null>(null);

  const templateRef = React.useRef<HTMLDivElement>(null);

  // Close template dropdown on outside click
  React.useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (templateRef.current && !templateRef.current.contains(e.target as Node)) {
        setTemplateOpen(false);
      }
    }
    if (templateOpen) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [templateOpen]);

  function patch(partial: Partial<EditorState>) {
    setState((prev) => ({ ...prev, ...partial }));
  }

  function patchPricing(partial: Partial<TariffPricing>) {
    setState((prev) => ({ ...prev, pricing: { ...prev.pricing, ...partial } }));
  }

  function handleTouBandChange(idx: number, field: keyof TouBand, value: string | number) {
    setState((prev) => {
      const bands = prev.pricing.touBands.map((b, i) =>
        i === idx ? { ...b, [field]: value } : b,
      );
      return { ...prev, pricing: { ...prev.pricing, touBands: bands } };
    });
  }

  function applyTemplate(tpl: TariffTemplate) {
    setState((prev) => ({
      ...prev,
      ...tpl.state,
      pricing: { ...BLANK_STATE.pricing, ...(tpl.state.pricing ?? {}) },
    }));
    setTemplateOpen(false);
  }

  function handleSave() {
    setValidationError(null);
    if (!state.name.trim()) {
      setValidationError("Tariff name is required.");
      return;
    }
    if (!state.effectiveFrom) {
      setValidationError("Effective from date is required.");
      return;
    }
    // Stub: in production, POST to API
    console.log("Create tariff (stub):", state);
    setSaved(true);
    setTimeout(() => navigate("/tariffs"), 800);
  }

  const defaultTouBands: TouBand[] = [
    { label: "peak", startHour: 9, endHour: 21, ratePerKwh: 22 },
    { label: "off-peak", startHour: 21, endHour: 24, ratePerKwh: 15 },
    { label: "super-off-peak", startHour: 0, endHour: 9, ratePerKwh: 11 },
  ];

  return (
    <div className="flex flex-col gap-6 pb-24">
      {/* ── Back link ──────────────────────────────────────────────────────── */}
      <button
        type="button"
        onClick={() => navigate("/tariffs")}
        className="inline-flex items-center gap-1.5 font-body text-[12px] text-muted-foreground hover:text-foreground cursor-pointer transition-colors duration-150 ease-out w-fit"
        aria-label="Back to tariffs list"
      >
        <ArrowLeft size={12} aria-hidden="true" />
        Tariffs
      </button>

      {/* ── Template picker ───────────────────────────────────────────────── */}
      <div className="flex items-start gap-3 flex-wrap">
        <div className="flex flex-col gap-0.5">
          <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground">
            Start from template
          </span>
          <span className="font-body text-[11px] text-muted-foreground">
            Choose a preset to pre-fill the editor, or start blank.
          </span>
        </div>

        <div className="relative ml-auto" ref={templateRef}>
          <button
            type="button"
            onClick={() => setTemplateOpen((v) => !v)}
            aria-haspopup="listbox"
            aria-expanded={templateOpen}
            className="inline-flex items-center gap-2 rounded-btn border border-border bg-card px-4 py-2 font-body text-[12px] text-foreground hover:bg-muted cursor-pointer transition-colors duration-150 ease-out"
          >
            Choose template
            <ChevronDown
              size={12}
              aria-hidden="true"
              className={cn("transition-transform duration-150", templateOpen && "rotate-180")}
            />
          </button>

          {templateOpen && (
            <div
              role="listbox"
              aria-label="Tariff templates"
              className="absolute right-0 top-full mt-1 z-20 w-72 rounded-card border border-border bg-card shadow-lg overflow-hidden"
            >
              {TEMPLATES.map((tpl) => (
                <button
                  key={tpl.id}
                  role="option"
                  aria-selected={false}
                  type="button"
                  onClick={() => applyTemplate(tpl)}
                  className="w-full px-4 py-3 text-left hover:bg-muted transition-colors duration-150 ease-out border-b border-border last:border-0 cursor-pointer"
                >
                  <span className="block font-body text-[13px] font-medium text-foreground">
                    {tpl.label}
                  </span>
                  <span className="block font-body text-[11px] text-muted-foreground mt-0.5">
                    {tpl.description}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Validation error ──────────────────────────────────────────────── */}
      {validationError && (
        <div
          role="alert"
          className="flex items-center gap-3 rounded-card border border-error bg-error/10 px-4 py-2.5"
        >
          <AlertTriangle size={14} aria-hidden="true" className="text-error shrink-0" />
          <span className="font-body text-[12px] text-foreground">{validationError}</span>
        </div>
      )}

      {/* ── Two-column layout ─────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_300px]">
        {/* Left: editor sections */}
        <div className="flex flex-col gap-6">

          {/* ── Section 1: Metadata ─────────────────────────────────────────── */}
          <section aria-labelledby="new-meta-heading" className="rounded-card border border-border bg-card p-5">
            <h2
              id="new-meta-heading"
              className="font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground mb-4"
            >
              Tariff details
            </h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Field
                id="new-tariff-name"
                label="Name"
                required
                value={state.name}
                onChange={(v) => patch({ name: v })}
                className="md:col-span-2"
              />
              <div className="md:col-span-2">
                <FieldLabel htmlFor="new-tariff-desc">Description</FieldLabel>
                <textarea
                  id="new-tariff-desc"
                  value={state.description}
                  onChange={(e) => patch({ description: e.target.value })}
                  rows={2}
                  placeholder="Briefly describe when this tariff applies."
                  className={cn(
                    "w-full resize-none rounded-input border border-border bg-secondary px-3 py-2.5",
                    "font-body text-[13px] text-foreground placeholder:text-muted-foreground",
                    "outline-none focus:border-primary focus:ring-1 focus:ring-primary/20",
                    "transition-[box-shadow,border-color] duration-150 ease-out",
                  )}
                />
              </div>
              <Field
                id="new-effective"
                label="Effective from"
                required
                type="date"
                value={state.effectiveFrom}
                onChange={(v) => patch({ effectiveFrom: v })}
              />
              <Field
                id="new-expires"
                label="Expires (optional)"
                type="date"
                value={state.expiresAt}
                onChange={(v) => patch({ expiresAt: v })}
                hint="Leave blank for an ongoing tariff."
              />
            </div>
          </section>

          {/* ── Section 2: Pricing rules ─────────────────────────────────────── */}
          <section
            aria-labelledby="new-pricing-heading"
            className="rounded-card border border-border bg-card p-5"
          >
            <h2
              id="new-pricing-heading"
              className="font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground mb-4"
            >
              Pricing rules
            </h2>

            <div className="flex flex-col gap-5">
              {/* Energy rate */}
              <div>
                <SectionHeading id="new-energy-rate-heading">Energy rate</SectionHeading>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mt-3">
                  <Field
                    id="new-energy-rate"
                    label="Base rate (₹ / kWh)"
                    required
                    type="number"
                    min="0"
                    step="0.5"
                    prefix="₹"
                    value={String(state.pricing.energyRatePerKwh)}
                    onChange={(v) => patchPricing({ energyRatePerKwh: parseFloat(v) || 0 })}
                  />
                </div>
              </div>

              {/* TOU bands */}
              <div className="border-t border-border pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <SectionHeading id="new-tou-heading">Time-of-use bands</SectionHeading>
                    <p className="font-body text-[11px] text-muted-foreground mt-0.5">
                      Apply different rates by hour of day.
                    </p>
                  </div>
                  <Switch
                    id="new-tou-toggle"
                    checked={state.touEnabled}
                    aria-label="Enable time-of-use bands"
                    onCheckedChange={(val) => {
                      patch({
                        touEnabled: val,
                        pricing: {
                          ...state.pricing,
                          touBands: val ? defaultTouBands : [],
                        },
                      });
                    }}
                  />
                </div>

                {state.touEnabled && (
                  <div className="mt-4 flex flex-col gap-3">
                    <TouTimeline bands={state.pricing.touBands} />
                    <div className="flex flex-col gap-3 mt-2">
                      {state.pricing.touBands.map((band, i) => (
                        <TouBandRow
                          key={band.label}
                          band={band}
                          idx={i}
                          onChange={handleTouBandChange}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Time rate */}
              <div className="border-t border-border pt-4">
                <SectionHeading id="new-time-rate-heading">Time rate (optional)</SectionHeading>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mt-3">
                  <Field
                    id="new-time-rate"
                    label="Rate (₹ / min)"
                    type="number"
                    min="0"
                    step="0.5"
                    prefix="₹"
                    suffix="/min"
                    value={String(state.pricing.timeRatePerMin ?? "")}
                    onChange={(v) =>
                      patchPricing({ timeRatePerMin: v === "" ? undefined : parseFloat(v) })
                    }
                    hint="For per-minute or hybrid billing. Leave blank for energy-only."
                  />
                </div>
              </div>

              {/* Idle fee */}
              <div className="border-t border-border pt-4">
                <SectionHeading id="new-idle-heading">Idle fee</SectionHeading>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mt-3">
                  <Field
                    id="new-idle-threshold"
                    label="Grace period (minutes)"
                    type="number"
                    min="0"
                    step="1"
                    suffix="min"
                    value={String(state.pricing.idleThresholdMinutes ?? "")}
                    onChange={(v) =>
                      patchPricing({ idleThresholdMinutes: v === "" ? undefined : parseInt(v, 10) })
                    }
                    hint="Minutes before idle fee starts after charging ends."
                  />
                  <Field
                    id="new-idle-fee"
                    label="Idle fee (₹ / min)"
                    type="number"
                    min="0"
                    step="0.5"
                    prefix="₹"
                    suffix="/min"
                    value={String(state.pricing.idleFeePerMin ?? "")}
                    onChange={(v) =>
                      patchPricing({ idleFeePerMin: v === "" ? undefined : parseFloat(v) })
                    }
                  />
                </div>
              </div>

              {/* Connection fee + member discount */}
              <div className="border-t border-border pt-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <SectionHeading id="new-conn-heading">Connection fee</SectionHeading>
                    <div className="mt-3">
                      <Field
                        id="new-connection-fee"
                        label="Flat fee per session (₹)"
                        type="number"
                        min="0"
                        step="1"
                        prefix="₹"
                        value={String(state.pricing.connectionFee ?? 0)}
                        onChange={(v) => patchPricing({ connectionFee: parseFloat(v) || 0 })}
                        hint="Charged at session start. Set to 0 to disable."
                      />
                    </div>
                  </div>
                  <div>
                    <SectionHeading id="new-member-heading">Member discount</SectionHeading>
                    <div className="mt-3">
                      <Field
                        id="new-member-discount"
                        label="Discount for app members (%)"
                        type="number"
                        min="0"
                        max="100"
                        step="1"
                        suffix="%"
                        value={String(state.pricing.memberDiscountPct ?? 0)}
                        onChange={(v) => patchPricing({ memberDiscountPct: parseInt(v, 10) || 0 })}
                        hint="Applied to total session cost for verified app users."
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ── Section 3: Connector overrides ───────────────────────────────── */}
          <section
            aria-labelledby="new-connector-heading"
            className="rounded-card border border-border bg-card p-5"
          >
            <div className="flex items-start justify-between">
              <div>
                <h2
                  id="new-connector-heading"
                  className="font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground"
                >
                  Connector overrides
                </h2>
                <p className="font-body text-[11px] text-muted-foreground mt-1">
                  Set different energy rates for AC and DC connectors.
                </p>
              </div>
              <Switch
                id="new-connector-override-toggle"
                checked={state.connectorOverrideEnabled}
                aria-label="Enable connector type overrides"
                onCheckedChange={(val) => {
                  patch({ connectorOverrideEnabled: val });
                  patchPricing({
                    connectorOverride: {
                      ...state.pricing.connectorOverride,
                      enabled: val,
                    },
                  });
                }}
              />
            </div>

            {state.connectorOverrideEnabled && (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mt-4">
                <Field
                  id="new-ac-rate"
                  label="AC rate (₹ / kWh)"
                  type="number"
                  min="0"
                  step="0.5"
                  prefix="₹"
                  value={String(state.pricing.connectorOverride.acRatePerKwh ?? "")}
                  onChange={(v) =>
                    patchPricing({
                      connectorOverride: {
                        ...state.pricing.connectorOverride,
                        acRatePerKwh: parseFloat(v) || 0,
                      },
                    })
                  }
                  hint="Overrides base rate for AC 22kW connectors."
                />
                <Field
                  id="new-dc-rate"
                  label="DC rate (₹ / kWh)"
                  type="number"
                  min="0"
                  step="0.5"
                  prefix="₹"
                  value={String(state.pricing.connectorOverride.dcRatePerKwh ?? "")}
                  onChange={(v) =>
                    patchPricing({
                      connectorOverride: {
                        ...state.pricing.connectorOverride,
                        dcRatePerKwh: parseFloat(v) || 0,
                      },
                    })
                  }
                  hint="Overrides base rate for DC 60kW and 120kW connectors."
                />
              </div>
            )}
          </section>

          {/* ── Section 4: Apply to ─────────────────────────────────────────── */}
          <section
            aria-labelledby="new-apply-heading"
            className="rounded-card border border-border bg-card p-5"
          >
            <h2
              id="new-apply-heading"
              className="font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground mb-4"
            >
              Apply to
            </h2>

            <div
              className="flex flex-wrap gap-2 mb-4"
              role="group"
              aria-label="Select which stations this tariff applies to"
            >
              {SCOPE_OPTIONS.map((opt) => {
                const active = state.applyScope === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => patch({ applyScope: opt.value })}
                    aria-pressed={active}
                    className={cn(
                      "inline-flex items-center rounded-btn px-3 py-1.5 font-body text-[12px] cursor-pointer transition-colors duration-150 ease-out border",
                      active
                        ? "bg-muted border-border text-foreground"
                        : "bg-transparent border-transparent text-muted-foreground hover:bg-muted",
                    )}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>

            {state.applyScope === "city" && (
              <div>
                <FieldLabel htmlFor="new-apply-cities">Cities</FieldLabel>
                <div
                  id="new-apply-cities"
                  className="flex flex-wrap gap-1.5"
                  role="group"
                  aria-label="Select cities"
                >
                  {CITY_OPTIONS.map((city) => {
                    const sel = state.applyCities.includes(city);
                    return (
                      <button
                        key={city}
                        type="button"
                        aria-pressed={sel}
                        onClick={() =>
                          patch({
                            applyCities: sel
                              ? state.applyCities.filter((c) => c !== city)
                              : [...state.applyCities, city],
                          })
                        }
                        className={cn(
                          "rounded-pill px-2.5 py-1 font-body text-[11px] cursor-pointer transition-colors duration-150 ease-out border",
                          sel
                            ? "bg-primary/10 border-primary/30 text-primary"
                            : "bg-muted border-border text-muted-foreground hover:text-foreground",
                        )}
                      >
                        {city}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {state.applyScope === "tag" && (
              <div>
                <FieldLabel htmlFor="new-apply-tags">Tags</FieldLabel>
                <div
                  id="new-apply-tags"
                  className="flex flex-wrap gap-1.5"
                  role="group"
                  aria-label="Select tags"
                >
                  {TAG_OPTIONS.map((tag) => {
                    const sel = state.applyTags.includes(tag);
                    return (
                      <button
                        key={tag}
                        type="button"
                        aria-pressed={sel}
                        onClick={() =>
                          patch({
                            applyTags: sel
                              ? state.applyTags.filter((t) => t !== tag)
                              : [...state.applyTags, tag],
                          })
                        }
                        className={cn(
                          "rounded-pill px-2.5 py-1 font-body text-[11px] cursor-pointer transition-colors duration-150 ease-out border",
                          sel
                            ? "bg-primary/10 border-primary/30 text-primary"
                            : "bg-muted border-border text-muted-foreground hover:text-foreground",
                        )}
                      >
                        {tag}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {state.applyScope === "specific" && (
              <div>
                <FieldLabel htmlFor="new-apply-station-ids">Station IDs</FieldLabel>
                <textarea
                  id="new-apply-station-ids"
                  value={state.applyStationIds}
                  onChange={(e) => patch({ applyStationIds: e.target.value })}
                  rows={2}
                  placeholder="GPWR-MUM-01, GPWR-BLR-03, ..."
                  className={cn(
                    "w-full resize-none rounded-input border border-border bg-secondary px-3 py-2.5",
                    "font-mono text-[12px] text-foreground placeholder:text-muted-foreground",
                    "outline-none focus:border-primary focus:ring-1 focus:ring-primary/20",
                    "transition-[box-shadow,border-color] duration-150 ease-out",
                  )}
                />
                <p className="mt-1 font-body text-[11px] text-muted-foreground">
                  Comma-separated station IDs (e.g. GPWR-MUM-01).
                </p>
              </div>
            )}

            {state.applyScope === "all" && (
              <p className="font-body text-[12px] text-muted-foreground">
                This tariff will apply to all stations unless a more specific tariff is also active.
              </p>
            )}
          </section>
        </div>

        {/* Right: preview */}
        <div className="xl:sticky xl:top-6 h-fit">
          <PreviewCard draft={state} />
        </div>
      </div>

      {/* ── Sticky save bar ───────────────────────────────────────────────── */}
      <div
        className="fixed bottom-0 left-0 right-0 z-10 border-t border-border bg-card/95 backdrop-blur-sm px-6 py-3"
        role="region"
        aria-label="Save actions"
      >
        <div className="mx-auto flex max-w-screen-2xl items-center justify-between gap-4">
          {saved ? (
            <span
              role="status"
              aria-live="polite"
              className="flex items-center gap-1.5 font-mono text-[11px] text-success"
            >
              <CheckCircle2 size={12} aria-hidden="true" />
              Tariff created
            </span>
          ) : (
            <span />
          )}
          <div className="flex items-center gap-2 ml-auto">
            <button
              type="button"
              onClick={() => navigate("/tariffs")}
              className="px-4 py-2 rounded-btn border border-border font-body text-[13px] text-muted-foreground hover:bg-muted transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              aria-busy={saved}
              className="px-4 py-2 rounded-btn bg-primary text-white font-body text-[13px] font-medium hover:bg-primary/90 transition-colors cursor-pointer"
            >
              Create tariff
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
