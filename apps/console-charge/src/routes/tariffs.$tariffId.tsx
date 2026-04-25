/**
 * Tariff editor — /tariffs/:tariffId
 *
 * Sections:
 *   1. Metadata: name, description, effective date, expiry date
 *   2. Pricing rules: energy rate, TOU bands, time rate, idle fee,
 *      connection fee, member discount
 *   3. Connector overrides: AC vs DC per-kWh override toggle
 *   4. Apply to: scope selector (all / city / tag / specific)
 *   5. Preview card: simulated 30-min 25 kWh session cost breakdown
 *
 * Sticky save/cancel bar at bottom.
 */

import * as React from "react";
import { useNavigate, useParams } from "react-router";
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  Clock,
  Zap,
} from "lucide-react";
import {
  Input,
  Switch,
  cn,
} from "@gridpower/ui";

import {
  ALL_TARIFFS,
  formatInr,
  previewSession,
  type Tariff,
  type TariffPricing,
  type TouBand,
} from "~/mocks/tariffs";

// ─── Shared primitives ────────────────────────────────────────────────────────

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
    <h3
      id={id}
      className="font-body text-[13px] font-semibold text-foreground"
    >
      {children}
    </h3>
  );
}

// ─── TOU timeline visual ──────────────────────────────────────────────────────

const BAND_COLORS: Record<TouBand["label"], { bg: string; text: string }> = {
  peak: { bg: "bg-error/20", text: "text-error" },
  "off-peak": { bg: "bg-warning/20", text: "text-warning" },
  "super-off-peak": { bg: "bg-success/20", text: "text-success" },
};

function TouTimeline({ bands }: { bands: TouBand[] }) {
  if (bands.length === 0) return null;

  // Build 24-cell hour grid
  const grid: (TouBand | null)[] = Array.from({ length: 24 }, (_, h) => {
    return bands.find((b) => {
      if (b.startHour < b.endHour) return h >= b.startHour && h < b.endHour;
      // wraps midnight
      return h >= b.startHour || h < b.endHour;
    }) ?? null;
  });

  return (
    <div className="mt-2" aria-label="Time-of-use band timeline">
      <div className="flex h-6 w-full overflow-hidden rounded-input" role="img" aria-label="24-hour TOU band visualisation">
        {grid.map((band, h) => (
          <div
            key={h}
            title={band ? `${h}:00 - ${band.label} (₹${band.ratePerKwh}/kWh)` : `${h}:00 - unassigned`}
            className={cn(
              "flex-1 transition-colors",
              band ? BAND_COLORS[band.label].bg : "bg-muted",
            )}
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

// ─── TOU band row ─────────────────────────────────────────────────────────────

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
    band.label === "peak"
      ? "Peak"
      : band.label === "off-peak"
      ? "Off-peak"
      : "Super off-peak";

  return (
    <div className="grid grid-cols-[120px_80px_80px_120px] items-end gap-3">
      <div>
        <span
          className={cn(
            "inline-flex items-center px-2 py-0.5 rounded-pill font-mono text-[10px]",
            cfg.bg,
            cfg.text,
          )}
        >
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
            onChange={(e) =>
              onChange(idx, "ratePerKwh", parseFloat(e.target.value))
            }
          />
        </div>
      </div>
    </div>
  );
}

// ─── Preview card ─────────────────────────────────────────────────────────────

function PreviewCard({ tariff }: { tariff: Tariff }) {
  const sim = previewSession(tariff);

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
            <span className="font-body text-[12px] text-muted-foreground">
              {line.label}
            </span>
            <span
              className={cn(
                "font-mono text-[12px] tabular-nums",
                line.amount < 0 ? "text-success" : "text-foreground",
              )}
            >
              {line.amount < 0
                ? `-${formatInr(Math.abs(line.amount))}`
                : formatInr(line.amount)}
            </span>
          </div>
        ))}
      </div>

      {sim.lines.length > 0 && (
        <div className="mt-3 border-t border-border pt-3 flex items-center justify-between">
          <span className="font-body text-[13px] font-semibold text-foreground">
            Total
          </span>
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

// ─── Apply to section ──────────────────────────────────────────────────────────

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

// ─── Editor state shape ───────────────────────────────────────────────────────

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

function tariffToEditorState(t: Tariff): EditorState {
  return {
    name: t.name,
    description: t.description,
    effectiveFrom: t.effectiveFrom,
    expiresAt: t.expiresAt ?? "",
    pricing: { ...t.pricing, touBands: [...t.pricing.touBands] },
    applyScope: t.apply.scope as EditorState["applyScope"],
    applyCities: t.apply.cities ?? [],
    applyTags: t.apply.tags ?? [],
    applyStationIds: (t.apply.stationIds ?? []).join(", "),
    touEnabled: t.pricing.touBands.length > 0,
    connectorOverrideEnabled: t.pricing.connectorOverride.enabled,
  };
}

// ─── Main component ──────────────────────────────────────────────────────────

export default function TariffEditor() {
  const { tariffId } = useParams<{ tariffId: string }>();
  const navigate = useNavigate();

  const tariff = React.useMemo(
    () => ALL_TARIFFS.find((t) => t.id === tariffId) ?? null,
    [tariffId],
  );

  const [state, setState] = React.useState<EditorState | null>(
    tariff ? tariffToEditorState(tariff) : null,
  );
  const [saved, setSaved] = React.useState(false);
  const [saveError, setSaveError] = React.useState<string | null>(null);

  // Re-init if tariff changes (unlikely in mock, but safe)
  React.useEffect(() => {
    if (tariff) setState(tariffToEditorState(tariff));
  }, [tariff]);

  // ── Helpers ──────────────────────────────────────────────────────────────
  function patch(partial: Partial<EditorState>) {
    setState((prev) => (prev ? { ...prev, ...partial } : prev));
  }

  function patchPricing(partial: Partial<TariffPricing>) {
    setState((prev) =>
      prev ? { ...prev, pricing: { ...prev.pricing, ...partial } } : prev,
    );
  }

  function handleTouBandChange(
    idx: number,
    field: keyof TouBand,
    value: string | number,
  ) {
    setState((prev) => {
      if (!prev) return prev;
      const bands = prev.pricing.touBands.map((b, i) =>
        i === idx ? { ...b, [field]: value } : b,
      );
      return { ...prev, pricing: { ...prev.pricing, touBands: bands } };
    });
  }

  function handleSave() {
    setSaveError(null);
    // Stub: in production, dispatch mutation here
    console.log("Save tariff (stub):", state);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  // ── Preview tariff object (derived from editor state) ─────────────────────
  const previewTariff: Tariff | null = React.useMemo(() => {
    if (!state || !tariff) return null;
    return {
      ...tariff,
      name: state.name,
      description: state.description,
      effectiveFrom: state.effectiveFrom,
      expiresAt: state.expiresAt || undefined,
      pricing: {
        ...state.pricing,
        touBands: state.touEnabled ? state.pricing.touBands : [],
        connectorOverride: {
          enabled: state.connectorOverrideEnabled,
          acRatePerKwh: state.connectorOverrideEnabled
            ? state.pricing.connectorOverride.acRatePerKwh
            : undefined,
          dcRatePerKwh: state.connectorOverrideEnabled
            ? state.pricing.connectorOverride.dcRatePerKwh
            : undefined,
        },
      },
      apply: {
        scope: state.applyScope,
        cities: state.applyScope === "city" ? state.applyCities : undefined,
        tags: state.applyScope === "tag" ? state.applyTags : undefined,
        stationIds:
          state.applyScope === "specific"
            ? state.applyStationIds
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean)
            : undefined,
      },
    };
  }, [state, tariff]);

  // ── 404 ──────────────────────────────────────────────────────────────────
  if (!tariff || !state) {
    return (
      <section aria-labelledby="tariff-not-found" className="flex flex-col gap-4">
        <div
          role="alert"
          className="flex items-start gap-3 rounded-card border border-error bg-error/10 px-4 py-3"
        >
          <AlertTriangle
            size={16}
            aria-hidden="true"
            className="text-error mt-0.5 shrink-0"
          />
          <div>
            <h2
              id="tariff-not-found"
              className="font-body text-[13px] font-semibold text-foreground"
            >
              Tariff not found
            </h2>
            <p className="font-body text-[12px] text-muted-foreground mt-0.5">
              No tariff with ID {tariffId} exists in this network.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => navigate("/tariffs")}
          className="inline-flex items-center gap-1.5 rounded-btn border border-border bg-transparent px-3 py-2 font-body text-[12px] text-foreground hover:bg-muted cursor-pointer transition-colors duration-150 ease-out w-fit"
        >
          <ArrowLeft size={12} aria-hidden="true" />
          Back to tariffs
        </button>
      </section>
    );
  }

  const defaultTouBands: TouBand[] = state.pricing.touBands.length > 0
    ? state.pricing.touBands
    : [
        { label: "peak", startHour: 9, endHour: 21, ratePerKwh: state.pricing.energyRatePerKwh + 4 },
        { label: "off-peak", startHour: 21, endHour: 24, ratePerKwh: state.pricing.energyRatePerKwh },
        { label: "super-off-peak", startHour: 0, endHour: 9, ratePerKwh: Math.max(8, state.pricing.energyRatePerKwh - 6) },
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

      {/* ── Save error ─────────────────────────────────────────────────────── */}
      {saveError && (
        <div
          role="alert"
          className="flex items-center gap-3 rounded-card border border-error bg-error/10 px-4 py-2.5"
        >
          <AlertTriangle size={14} aria-hidden="true" className="text-error shrink-0" />
          <span className="font-body text-[12px] text-foreground">{saveError}</span>
        </div>
      )}

      {/* ── Two-column layout: editor + preview ───────────────────────────── */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_300px]">
        {/* Left: editor sections */}
        <div className="flex flex-col gap-6">

          {/* ── Section 1: Metadata ─────────────────────────────────────────── */}
          <section aria-labelledby="meta-heading" className="rounded-card border border-border bg-card p-5">
            <h2
              id="meta-heading"
              className="font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground mb-4"
            >
              Tariff details
            </h2>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Field
                id="tariff-name"
                label="Name"
                required
                value={state.name}
                onChange={(v) => patch({ name: v })}
                className="md:col-span-2"
              />

              <div className="md:col-span-2">
                <FieldLabel htmlFor="tariff-desc">Description</FieldLabel>
                <textarea
                  id="tariff-desc"
                  value={state.description}
                  onChange={(e) => patch({ description: e.target.value })}
                  rows={2}
                  className={cn(
                    "w-full resize-none rounded-input border border-border bg-secondary px-3 py-2.5",
                    "font-body text-[13px] text-foreground placeholder:text-muted-foreground",
                    "outline-none focus:border-primary focus:ring-1 focus:ring-primary/20",
                    "transition-[box-shadow,border-color] duration-150 ease-out",
                  )}
                  placeholder="Briefly describe when this tariff applies."
                />
              </div>

              <Field
                id="tariff-effective"
                label="Effective from"
                required
                type="date"
                value={state.effectiveFrom}
                onChange={(v) => patch({ effectiveFrom: v })}
              />

              <Field
                id="tariff-expires"
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
            aria-labelledby="pricing-heading"
            className="rounded-card border border-border bg-card p-5"
          >
            <h2
              id="pricing-heading"
              className="font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground mb-4"
            >
              Pricing rules
            </h2>

            <div className="flex flex-col gap-5">
              {/* Energy rate */}
              <div>
                <SectionHeading id="energy-rate-heading">Energy rate</SectionHeading>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mt-3">
                  <Field
                    id="energy-rate"
                    label="Base rate (₹ / kWh)"
                    required
                    type="number"
                    min="0"
                    step="0.5"
                    prefix="₹"
                    value={String(state.pricing.energyRatePerKwh)}
                    onChange={(v) =>
                      patchPricing({ energyRatePerKwh: parseFloat(v) || 0 })
                    }
                  />
                </div>
              </div>

              {/* TOU bands */}
              <div className="border-t border-border pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <SectionHeading id="tou-heading">Time-of-use bands</SectionHeading>
                    <p className="font-body text-[11px] text-muted-foreground mt-0.5">
                      Apply different rates by hour of day.
                    </p>
                  </div>
                  <Switch
                    id="tou-toggle"
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
                <SectionHeading id="time-rate-heading">Time rate (optional)</SectionHeading>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mt-3">
                  <Field
                    id="time-rate"
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
                <SectionHeading id="idle-heading">Idle fee</SectionHeading>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mt-3">
                  <Field
                    id="idle-threshold"
                    label="Grace period (minutes)"
                    type="number"
                    min="0"
                    step="1"
                    suffix="min"
                    value={String(state.pricing.idleThresholdMinutes ?? "")}
                    onChange={(v) =>
                      patchPricing({ idleThresholdMinutes: v === "" ? undefined : parseInt(v, 10) })
                    }
                    hint="Minutes plugged in after charging ends before idle fee starts."
                  />
                  <Field
                    id="idle-fee"
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
                    <SectionHeading id="conn-heading">Connection fee</SectionHeading>
                    <div className="mt-3">
                      <Field
                        id="connection-fee"
                        label="Flat fee per session (₹)"
                        type="number"
                        min="0"
                        step="1"
                        prefix="₹"
                        value={String(state.pricing.connectionFee ?? 0)}
                        onChange={(v) =>
                          patchPricing({ connectionFee: parseFloat(v) || 0 })
                        }
                        hint="Charged at session start. Set to 0 to disable."
                      />
                    </div>
                  </div>
                  <div>
                    <SectionHeading id="member-heading">Member discount</SectionHeading>
                    <div className="mt-3">
                      <Field
                        id="member-discount"
                        label="Discount for app members (%)"
                        type="number"
                        min="0"
                        max="100"
                        step="1"
                        suffix="%"
                        value={String(state.pricing.memberDiscountPct ?? 0)}
                        onChange={(v) =>
                          patchPricing({ memberDiscountPct: parseInt(v, 10) || 0 })
                        }
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
            aria-labelledby="connector-heading"
            className="rounded-card border border-border bg-card p-5"
          >
            <div className="flex items-start justify-between">
              <div>
                <h2
                  id="connector-heading"
                  className="font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground"
                >
                  Connector overrides
                </h2>
                <p className="font-body text-[11px] text-muted-foreground mt-1">
                  Set different energy rates for AC and DC connectors.
                </p>
              </div>
              <Switch
                id="connector-override-toggle"
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
                  id="ac-rate"
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
                  id="dc-rate"
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
            aria-labelledby="apply-heading"
            className="rounded-card border border-border bg-card p-5"
          >
            <h2
              id="apply-heading"
              className="font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground mb-4"
            >
              Apply to
            </h2>

            {/* Scope selector */}
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

            {/* City multi-select */}
            {state.applyScope === "city" && (
              <div>
                <FieldLabel htmlFor="apply-cities">Cities</FieldLabel>
                <div
                  id="apply-cities"
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

            {/* Tag multi-select */}
            {state.applyScope === "tag" && (
              <div>
                <FieldLabel htmlFor="apply-tags">Tags</FieldLabel>
                <div
                  id="apply-tags"
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

            {/* Specific station IDs */}
            {state.applyScope === "specific" && (
              <div>
                <FieldLabel htmlFor="apply-station-ids">Station IDs</FieldLabel>
                <textarea
                  id="apply-station-ids"
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
                  Comma-separated station IDs (e.g. GPWR-MUM-01). Search by name not yet available.
                </p>
              </div>
            )}

            {state.applyScope === "all" && (
              <p className="font-body text-[12px] text-muted-foreground">
                This tariff will apply to all stations in the network unless a more specific tariff is also active.
              </p>
            )}
          </section>
        </div>

        {/* Right: preview card (sticky on xl+) */}
        <div className="xl:sticky xl:top-6 h-fit">
          {previewTariff && <PreviewCard tariff={previewTariff} />}

          {/* Quick info */}
          <div className="mt-4 rounded-card border border-border bg-card p-4">
            <h3 className="font-body text-[12px] font-semibold text-foreground mb-2">
              Tariff info
            </h3>
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-muted-foreground">ID</span>
                <span className="font-mono text-[10px] text-foreground">{tariff.id}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-muted-foreground">Status</span>
                <span className="font-mono text-[10px] text-foreground capitalize">{tariff.status}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-muted-foreground">Stations</span>
                <span className="font-mono text-[10px] text-foreground">{tariff.stationsApplied}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-muted-foreground">Active drivers</span>
                <span className="font-mono text-[10px] text-foreground">{tariff.activeDrivers}</span>
              </div>
            </div>
          </div>
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
              Changes saved
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
              className="px-4 py-2 rounded-btn bg-primary text-white font-body text-[13px] font-medium hover:bg-primary/90 transition-colors cursor-pointer"
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
