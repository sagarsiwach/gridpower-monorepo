/**
 * Settings → Organisation
 * Route: /settings/organisation
 *
 * Legal entity, GSTIN/PAN, address, billing email, primary contact,
 * brand colour override and logo upload. Mirrors the original
 * settings.tsx Company section, preserving the Field component pattern.
 */

import * as React from "react";
import { Upload, CheckCircle2, AlertTriangle, RefreshCw } from "lucide-react";
import { Input, cn } from "@gridpower/ui";

// ─── Shared primitives (token classes preserved from original) ───────────────

const FIELD_LABEL_CLS =
  "block font-body text-[11px] font-medium text-muted-foreground mb-1.5";
const META_CAPS_CLS =
  "font-mono text-[9px] uppercase tracking-[0.08em] text-muted-foreground";

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

function Field({
  id,
  label,
  required,
  type = "text",
  defaultValue,
  className,
}: {
  id: string;
  label: string;
  required?: boolean;
  type?: string;
  defaultValue?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <FieldLabel htmlFor={id} required={required}>
        {label}
      </FieldLabel>
      <Input
        id={id}
        type={type}
        defaultValue={defaultValue}
        aria-required={required ? "true" : undefined}
      />
    </div>
  );
}

function SectionDivider({ label }: { label: string }) {
  return (
    <div className="pt-5 mt-1 border-t border-border">
      <h3 className="font-body text-[12px] font-semibold text-foreground mb-4">
        {label}
      </h3>
    </div>
  );
}

function SaveBar({ saved = false }: { saved?: boolean }) {
  return (
    <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
      {saved ? (
        <span className="flex items-center gap-1.5 font-mono text-[11px] text-success">
          <CheckCircle2 size={12} aria-hidden="true" />
          Saved automatically
        </span>
      ) : (
        <span />
      )}
      <div className="flex items-center gap-2 ml-auto">
        <button
          type="button"
          className="px-4 py-2 rounded-btn border border-border font-body text-[13px] text-muted-foreground hover:bg-muted transition-colors cursor-pointer"
          onClick={() => console.log("Cancel")}
        >
          Cancel
        </button>
        <button
          type="button"
          className="px-4 py-2 rounded-btn bg-primary text-white font-body text-[13px] font-medium hover:bg-primary/90 transition-colors cursor-pointer"
          onClick={() => console.log("Save changes (stub)")}
        >
          Save changes
        </button>
      </div>
    </div>
  );
}

// ─── Brand colour swatches (semantic tokens, no raw hex) ─────────────────────

const BRAND_SWATCHES = [
  { id: "primary", label: "Primary red", className: "bg-primary" },
  { id: "info", label: "Info blue", className: "bg-info" },
  { id: "success", label: "Success green", className: "bg-success" },
  { id: "warning", label: "Warning amber", className: "bg-warning" },
  { id: "foreground", label: "Foreground", className: "bg-foreground" },
] as const;

// ─── Page ─────────────────────────────────────────────────────────────────────

type AsyncState = "idle" | "loading" | "error";

export default function OrganisationSettings() {
  const [state, setState] = React.useState<AsyncState>("idle");
  const [brand, setBrand] = React.useState<string>("primary");

  const handleRetry = React.useCallback(() => {
    setState("loading");
    setTimeout(() => setState("idle"), 350);
  }, []);

  if (state === "loading") {
    return (
      <section
        aria-labelledby="organisation-heading"
        aria-busy="true"
        className="max-w-2xl"
      >
        <h2 id="organisation-heading" className="sr-only">
          Organisation
        </h2>
        <div
          role="status"
          className="flex items-center gap-2 font-mono text-[11px] text-muted-foreground"
        >
          <span
            aria-hidden="true"
            className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"
          />
          Loading organisation profile.
        </div>
      </section>
    );
  }

  if (state === "error") {
    return (
      <section
        aria-labelledby="organisation-heading"
        className="max-w-2xl"
      >
        <h2 id="organisation-heading" className="sr-only">
          Organisation
        </h2>
        <div
          role="alert"
          className="flex items-center gap-3 rounded-card border border-error bg-error/10 px-4 py-2.5"
        >
          <AlertTriangle
            size={14}
            aria-hidden="true"
            className="text-error shrink-0"
          />
          <span className="font-body text-[12px] text-foreground">
            Could not load organisation profile.
          </span>
          <button
            type="button"
            onClick={handleRetry}
            className="ml-auto inline-flex items-center gap-1.5 rounded-btn border border-border bg-transparent px-3 py-1.5 font-body text-[11px] text-foreground hover:bg-muted cursor-pointer transition-colors duration-150 ease-out"
          >
            <RefreshCw size={11} aria-hidden="true" />
            Retry
          </button>
        </div>
      </section>
    );
  }

  return (
    <section aria-labelledby="organisation-heading" className="max-w-2xl">
      <h2 id="organisation-heading" className="sr-only">
        Organisation
      </h2>

      {/* Legal entity & registrations */}
      <div className="grid grid-cols-1 gap-x-4 gap-y-4 md:grid-cols-2">
        <Field
          id="company-name"
          label="Trading name"
          required
          defaultValue="DeltaEV Mobility Pvt Ltd"
        />
        <Field
          id="company-legal"
          label="Legal entity"
          required
          defaultValue="DeltaEV Mobility Private Limited"
        />
        <Field
          id="company-street"
          label="Registered street address"
          defaultValue="Plot 14, Verna Industrial Estate"
          className="md:col-span-2"
        />
        <Field
          id="company-city"
          label="City and state"
          defaultValue="Panaji, Goa 403 722"
        />
        <Field
          id="company-billing-email"
          label="Billing email"
          required
          type="email"
          defaultValue="billing@gridpower.co.in"
        />
        <Field
          id="company-gstin"
          label="GSTIN"
          defaultValue="30AABCD1234E1Z5"
        />
        <Field id="company-pan" label="PAN" defaultValue="AABCD1234E" />
      </div>

      <SectionDivider label="Primary contact" />
      <div className="grid grid-cols-1 gap-x-4 gap-y-4 md:grid-cols-2">
        <Field
          id="contact-name"
          label="Name"
          required
          defaultValue="Sagar Siwach"
        />
        <Field
          id="contact-title"
          label="Title"
          defaultValue="Founder and CEO"
        />
        <Field
          id="contact-email"
          label="Email"
          required
          type="email"
          defaultValue="sagar@gridpower.co.in"
        />
        <Field
          id="contact-phone"
          label="Phone"
          type="tel"
          defaultValue="+91 98765 43210"
        />
      </div>

      <SectionDivider label="Brand colour override" />
      <fieldset>
        <legend className={`${META_CAPS_CLS} mb-2`}>Pick a swatch</legend>
        <div
          className="flex items-center gap-2 flex-wrap"
          role="radiogroup"
          aria-label="Brand colour"
        >
          {BRAND_SWATCHES.map((sw) => {
            const active = brand === sw.id;
            return (
              <button
                key={sw.id}
                type="button"
                role="radio"
                aria-checked={active}
                aria-label={sw.label}
                onClick={() => setBrand(sw.id)}
                className={cn(
                  "w-8 h-8 rounded-btn border-2 transition-colors cursor-pointer",
                  sw.className,
                  active ? "border-foreground" : "border-border",
                )}
              />
            );
          })}
        </div>
      </fieldset>

      <SectionDivider label="Logo" />
      <button
        type="button"
        aria-label="Upload company logo"
        className="w-40 h-20 rounded-card border border-dashed border-border bg-muted flex flex-col items-center justify-center gap-1.5 cursor-pointer hover:bg-muted/70 transition-colors"
        onClick={() => console.log("Logo upload stub")}
      >
        <Upload
          size={16}
          aria-hidden="true"
          className="text-muted-foreground"
        />
        <span className={META_CAPS_CLS}>Upload logo</span>
      </button>

      <SaveBar />
    </section>
  );
}
