/**
 * Settings organisation — /settings/organisation
 * Field component pattern from console-charge.
 */
import * as React from "react";
import { Upload, CheckCircle2 } from "lucide-react";
import { Input } from "@gridpower/ui";

const FIELD_LABEL_CLS = "block font-body text-[11px] font-medium text-muted-foreground mb-1.5";

function Field({ id, label, required, type = "text", defaultValue, className }: { id: string; label: string; required?: boolean; type?: string; defaultValue?: string; className?: string }) {
  return (
    <div className={className}>
      <label htmlFor={id} className={FIELD_LABEL_CLS}>
        {label}
        {required && <span aria-hidden="true" className="text-error ml-0.5">*</span>}
      </label>
      <Input id={id} type={type} defaultValue={defaultValue} aria-required={required ? "true" : undefined} />
    </div>
  );
}

function SectionDivider({ label }: { label: string }) {
  return (
    <div className="pt-5 mt-1 border-t border-border">
      <h3 className="font-body text-[12px] font-semibold text-foreground mb-4">{label}</h3>
    </div>
  );
}

export default function OrganisationSettings() {
  const [saved, setSaved] = React.useState(false);

  return (
    <section aria-labelledby="org-heading" className="max-w-2xl">
      <h2 id="org-heading" className="sr-only">Organisation</h2>
      <div className="grid grid-cols-1 gap-x-4 gap-y-4 md:grid-cols-2">
        <Field id="org-name"    label="Trading name"              required defaultValue="DeltaEV Mobility Pvt Ltd"     />
        <Field id="org-legal"   label="Legal entity"             required defaultValue="DeltaEV Mobility Private Limited" />
        <Field id="org-street"  label="Registered street address" defaultValue="Plot 14, Verna Industrial Estate" className="md:col-span-2" />
        <Field id="org-city"    label="City and state"            defaultValue="Panaji, Goa 403 722" />
        <Field id="org-billing" label="Billing email"            required type="email" defaultValue="billing@gridenergy.co.in" />
        <Field id="org-gstin"   label="GSTIN"                     defaultValue="30AABCD1234E1Z5" />
        <Field id="org-pan"     label="PAN"                       defaultValue="AABCD1234E" />
      </div>
      <SectionDivider label="Primary contact" />
      <div className="grid grid-cols-1 gap-x-4 gap-y-4 md:grid-cols-2">
        <Field id="contact-name"  label="Name"  required defaultValue="Priya Sharma"                  />
        <Field id="contact-title" label="Title" defaultValue="Head of Operations"                     />
        <Field id="contact-email" label="Email" required type="email" defaultValue="priya.s@gridenergy.co.in" />
        <Field id="contact-phone" label="Phone" type="tel" defaultValue="+91 98765 43210"             />
      </div>
      <SectionDivider label="Logo" />
      <button type="button" aria-label="Upload company logo"
        className="w-40 h-20 rounded-card border border-dashed border-border bg-muted flex flex-col items-center justify-center gap-1.5 cursor-pointer hover:bg-muted/70 transition-colors">
        <Upload size={16} aria-hidden="true" className="text-muted-foreground" />
        <span className="font-mono text-[9px] uppercase tracking-[0.08em] text-muted-foreground">Upload logo</span>
      </button>
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
        {saved ? (
          <span className="flex items-center gap-1.5 font-mono text-[11px] text-success"><CheckCircle2 size={12} />Saved automatically</span>
        ) : <span />}
        <div className="flex items-center gap-2 ml-auto">
          <button type="button" className="px-4 py-2 rounded-btn border border-border font-body text-[13px] text-muted-foreground hover:bg-muted transition-colors cursor-pointer">Cancel</button>
          <button type="button" onClick={() => setSaved(true)}
            className="px-4 py-2 rounded-btn bg-primary text-white font-body text-[13px] font-medium hover:bg-primary/90 transition-colors cursor-pointer">Save changes</button>
        </div>
      </div>
    </section>
  );
}
