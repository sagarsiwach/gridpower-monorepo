import { useState, useId, type ChangeEvent } from "react";
import { ArrowRight, CaretDown } from "@phosphor-icons/react";
import { tokens } from "../../routes/_preview/_v3-tokens";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface ROICalculatorProps {
  /** Override the default lead-capture CTA label */
  ctaLabel?: string;
  /** Override href for the lead-capture CTA */
  ctaHref?: string;
}

/* ------------------------------------------------------------------ */
/*  City tariff table (stub — replace with real data in phase 2)      */
/* ------------------------------------------------------------------ */

const CITIES = [
  { name: "Pune", tariff: 9.5 },
  { name: "Mumbai", tariff: 11.2 },
  { name: "Bangalore", tariff: 8.8 },
  { name: "Delhi", tariff: 8.0 },
  { name: "Hyderabad", tariff: 9.0 },
  { name: "Goa", tariff: 7.5 },
] as const;

type CityName = (typeof CITIES)[number]["name"];

/* ------------------------------------------------------------------ */
/*  Stub formula (TODO: replace with real engineering model)          */
/*                                                                     */
/*  Assumptions (placeholder):                                         */
/*  - System cost per kWh: ₹15,000 (rough residential ESS)           */
/*  - Battery capacity estimated from bill: 1 kWh per ₹(tariff)*30   */
/*  - Annual savings = capacity * tariff * 365 * 0.8 (80% utilisation) */
/*  - Payback = system_cost / annual_savings (in months)              */
/*  - Lifetime 15 years                                               */
/* ------------------------------------------------------------------ */

function compute(
  billPerMonth: number,
  solarKw: number | null,
  cityTariff: number
): { paybackMonths: number; annualSavings: number; lifetimeSavings: number } {
  // TODO: wire to real sizing engine in phase 2
  const monthlyKwh = billPerMonth / cityTariff;
  const storageKwh = solarKw ? solarKw * 4 : monthlyKwh * 0.3;
  const systemCostRs = storageKwh * 15_000;
  const annualSavingsRs = storageKwh * cityTariff * 365 * 0.8;
  const paybackMonths = annualSavingsRs > 0 ? Math.round((systemCostRs / annualSavingsRs) * 12) : 0;
  const lifetimeSavings = Math.round(annualSavingsRs * 15 - systemCostRs);
  return {
    paybackMonths,
    annualSavings: Math.round(annualSavingsRs),
    lifetimeSavings,
  };
}

function formatINR(n: number): string {
  if (n >= 1_00_000) return `₹${(n / 1_00_000).toFixed(1)}L`;
  if (n >= 1_000) return `₹${(n / 1_000).toFixed(0)}K`;
  return `₹${n}`;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

/**
 * ROICalculator — inline payback calculator.
 *
 * Three inputs in one row (electricity bill, optional solar kW, city).
 * Outputs payback months (GridRed, large) + annual + lifetime savings.
 * Lead-capture pill below the output nudges toward personalised quote.
 * Fold-style density: labels are small-caps, inputs are tight.
 */
export function ROICalculator({
  ctaLabel = "Get personalised math →",
  ctaHref = "#early-access",
}: ROICalculatorProps) {
  const uid = useId();

  const [bill, setBill] = useState<string>("5000");
  const [solar, setSolar] = useState<string>("");
  const [city, setCity] = useState<CityName>("Pune");

  const cityTariff = CITIES.find((c) => c.name === city)?.tariff ?? 9.5;
  const billNum = parseFloat(bill) || 0;
  const solarNum = solar ? parseFloat(solar) : null;

  const { paybackMonths, annualSavings, lifetimeSavings } = compute(billNum, solarNum, cityTariff);
  const hasResult = billNum > 0;

  return (
    <div
      style={{
        background: tokens.card,
        border: `1px solid ${tokens.hairline}`,
        borderRadius: 22,
        fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
      }}
    >
      <div className="p-5">
        {/* Section kicker */}
        <div className="flex items-center gap-2 mb-4">
          <span
            style={{ width: 6, height: 6, borderRadius: 999, background: tokens.brand, flexShrink: 0 }}
          />
          <span
            className="text-[10px] uppercase tracking-[0.16em]"
            style={{ color: tokens.brand, fontWeight: 700 }}
          >
            ECONOMICS · ROI MATH
          </span>
        </div>

        {/* Inputs — tight 3-col row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
          {/* Bill */}
          <FieldGroup
            label="Monthly bill"
            htmlFor={`${uid}-bill`}
            unit="₹ / mo"
          >
            <input
              id={`${uid}-bill`}
              type="number"
              min={0}
              step={500}
              value={bill}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setBill(e.target.value)}
              placeholder="5000"
              style={inputStyle}
            />
          </FieldGroup>

          {/* Solar capacity (optional) */}
          <FieldGroup
            label="Solar capacity"
            htmlFor={`${uid}-solar`}
            unit="kW (optional)"
          >
            <input
              id={`${uid}-solar`}
              type="number"
              min={0}
              step={0.5}
              value={solar}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setSolar(e.target.value)}
              placeholder="—"
              style={inputStyle}
            />
          </FieldGroup>

          {/* City */}
          <FieldGroup label="City" htmlFor={`${uid}-city`} unit={`₹${cityTariff}/kWh`}>
            <div style={{ position: "relative" }}>
              <select
                id={`${uid}-city`}
                value={city}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => setCity(e.target.value as CityName)}
                style={{ ...inputStyle, appearance: "none", paddingRight: 28, cursor: "pointer" }}
              >
                {CITIES.map((c) => (
                  <option key={c.name} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
              <CaretDown
                size={12}
                weight="bold"
                color={tokens.inkMuted}
                style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}
              />
            </div>
          </FieldGroup>
        </div>

        {/* Output */}
        {hasResult ? (
          <div
            className="pt-4"
            style={{ borderTop: `1px solid ${tokens.hairline}` }}
          >
            {/* Primary number */}
            <p
              className="text-[10px] uppercase tracking-[0.14em] mb-1"
              style={{ color: tokens.muted, fontWeight: 600 }}
            >
              EST. PAYBACK PERIOD
            </p>
            <div className="flex items-baseline gap-2 mb-1">
              <span
                className="text-[56px] font-bold tracking-[-0.035em] leading-none"
                style={{ color: tokens.brand }}
              >
                {paybackMonths}
              </span>
              <span className="text-[22px] font-medium" style={{ color: tokens.inkMuted }}>
                months
              </span>
            </div>
            <p className="text-[11px] mb-4" style={{ color: tokens.muted }}>
              Stub estimate · real math requires site survey
            </p>

            {/* Secondary numbers — 2-cell micro fact row */}
            <div
              className="grid grid-cols-2 pt-4 mb-5"
              style={{ borderTop: `1px solid ${tokens.hairline}` }}
            >
              <MicroFact label="Annual savings" value={formatINR(annualSavings)} />
              <MicroFact
                label="Lifetime savings (15yr)"
                value={lifetimeSavings > 0 ? formatINR(lifetimeSavings) : "—"}
              />
            </div>
          </div>
        ) : (
          <div
            className="py-6 text-center"
            style={{ borderTop: `1px solid ${tokens.hairline}` }}
          >
            <p className="text-[13px]" style={{ color: tokens.muted }}>
              Enter your electricity bill to see the numbers.
            </p>
          </div>
        )}

        {/* Lead-capture CTA pill */}
        <a
          href={ctaHref}
          className="inline-flex items-center gap-2 px-5 py-2.5 text-[12px] uppercase tracking-[0.1em] font-semibold transition-colors"
          style={{
            background: tokens.pageBgDeep,
            border: `1px solid ${tokens.hairlineStrong}`,
            borderRadius: 999,
            color: tokens.ink,
            textDecoration: "none",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = tokens.brand;
            (e.currentTarget as HTMLElement).style.color = "#ffffff";
            (e.currentTarget as HTMLElement).style.borderColor = tokens.brand;
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = tokens.pageBgDeep;
            (e.currentTarget as HTMLElement).style.color = tokens.ink;
            (e.currentTarget as HTMLElement).style.borderColor = tokens.hairlineStrong;
          }}
        >
          {ctaLabel}
          <ArrowRight size={12} weight="bold" />
        </a>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Private atoms                                                      */
/* ------------------------------------------------------------------ */

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "oklch(96.6% 0.005 106.5)", // pageBgDeep — tokens not imported as CSS var here
  border: `1px solid oklch(93% 0.007 106.5)`,
  borderRadius: 10,
  padding: "8px 10px",
  fontSize: 15,
  fontWeight: 500,
  color: "oklch(15.3% 0.006 107.1)",
  outline: "none",
  fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
};

function FieldGroup({
  label,
  htmlFor,
  unit,
  children,
}: {
  label: string;
  htmlFor: string;
  unit: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={htmlFor}
        className="text-[10px] uppercase tracking-[0.14em]"
        style={{ color: tokens.muted, fontWeight: 600 }}
      >
        {label}
      </label>
      {children}
      <span className="text-[10px]" style={{ color: tokens.inkMuted }}>
        {unit}
      </span>
    </div>
  );
}

function MicroFact({ label, value }: { label: string; value: string }) {
  return (
    <div className="pr-4">
      <p
        className="text-[10px] uppercase tracking-[0.12em]"
        style={{ color: tokens.muted, fontWeight: 600 }}
      >
        {label}
      </p>
      <p
        className="text-[20px] font-bold tracking-[-0.02em] mt-0.5"
        style={{ color: tokens.ink }}
      >
        {value}
      </p>
    </div>
  );
}
