import { useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  SystemPageShell,
  SystemBlock,
} from "@/components/system/SystemPageShell";
import { Caption, CodeToken } from "@/components/system/Caption";
import { StateGrid } from "@/components/system/StateGrid";
import {
  Field,
  Label,
  HelperText,
  Textarea,
  StateInput,
} from "@/components/system/FormPrimitives";

/*
  /system/forms.

  The form catalogue. Inputs (text/email/number/textarea), labels (above,
  never inside), helper text (muted), error and success states.

  Every sample is a real GridPower field — quote requests, site
  assessments, sales-talk forms. No "Enter your name" placeholders.
*/

export default function FormsRoute() {
  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }, []);

  return (
    <SystemPageShell
      eyebrow="System · Forms"
      title="Sharp inputs. Above-label hierarchy. No floats."
      lede="Forms are conversion contracts in their own right. We use a 2px radius so inputs read sharper than the rest of the UI. Labels above. Helper text below. Errors replace helpers. No animations on focus beyond the ring."
    >
      {/* ---------------- Anatomy ---------------- */}
      <SystemBlock
        id="anatomy"
        eyebrow="01 · Anatomy"
        title="Label, control, helper, in that order."
        caption="The label always sits above. Helper text sits below the input in muted text. On error, the helper is replaced by an error message in the form-error color. On success, success message in form-success."
      >
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_minmax(0,260px)] lg:items-start">
          <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-neutral-50)] p-8">
            <Field
              label="Site capacity needed"
              helper="Approximate kWh you need. We will refine on site visit."
              required
            >
              {(id) => (
                <Input id={id} placeholder="215 kWh ATLAS" type="text" />
              )}
            </Field>
          </div>
          <ul className="space-y-3 text-sm">
            <li className="flex items-baseline gap-3">
              <CodeToken tone="mute">1</CodeToken>
              <span>
                <span className="font-medium text-[var(--color-text-heading)]">
                  Label
                </span>{" "}
                <span className="text-[var(--color-text-muted)]">
                  — text-sm, neutral-900, weight 500. Required marker uses GridRed asterisk.
                </span>
              </span>
            </li>
            <li className="flex items-baseline gap-3">
              <CodeToken tone="mute">2</CodeToken>
              <span>
                <span className="font-medium text-[var(--color-text-heading)]">
                  Input
                </span>{" "}
                <span className="text-[var(--color-text-muted)]">
                  — h-10, radius-xs, 1px neutral-300 border, neutral-500 placeholder.
                </span>
              </span>
            </li>
            <li className="flex items-baseline gap-3">
              <CodeToken tone="mute">3</CodeToken>
              <span>
                <span className="font-medium text-[var(--color-text-heading)]">
                  Helper
                </span>{" "}
                <span className="text-[var(--color-text-muted)]">
                  — text-xs, neutral-500. Replaced by error or success message when relevant.
                </span>
              </span>
            </li>
          </ul>
        </div>
      </SystemBlock>

      {/* ---------------- Input types ---------------- */}
      <SystemBlock
        id="types"
        eyebrow="02 · Input types"
        title="One control surface, several semantic types."
        caption="text, email, tel, number, textarea. All share the same visual treatment. The only thing that changes is the keyboard surface a phone shows and the kind of validation we hang off the input."
      >
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <FieldCard caption="text — open ended">
            <Field label="Company name" helper="As it appears on your GST documents.">
              {(id) => (
                <Input id={id} placeholder="DeltaEV Mobility Pvt Ltd" type="text" />
              )}
            </Field>
          </FieldCard>

          <FieldCard caption="email — RFC 5322">
            <Field
              label="Work email"
              helper="We reply within one business day."
              required
            >
              {(id) => (
                <Input id={id} placeholder="ops@hotel-name.in" type="email" />
              )}
            </Field>
          </FieldCard>

          <FieldCard caption="tel — Indian mobile">
            <Field label="Mobile" helper="Whatsapp preferred. Format: +91 followed by 10 digits.">
              {(id) => <Input id={id} placeholder="+91 98765 43210" type="tel" />}
            </Field>
          </FieldCard>

          <FieldCard caption="number — quantitative">
            <Field
              label="Number of chargers needed"
              helper="Estimate. We can split into phases."
            >
              {(id) => (
                <Input id={id} placeholder="6" type="number" inputMode="numeric" />
              )}
            </Field>
          </FieldCard>

          <FieldCard caption="textarea — multi-line" className="sm:col-span-2 lg:col-span-2">
            <Field
              label="Tell us about the site"
              helper="Power available, parking layout, hours of operation."
            >
              {(id) => (
                <Textarea
                  id={id}
                  rows={4}
                  placeholder="Six parking bays. 33kV connection. Open 24/7. Goa, Verna."
                />
              )}
            </Field>
          </FieldCard>
        </div>
      </SystemBlock>

      {/* ---------------- States ---------------- */}
      <SystemBlock
        id="states"
        eyebrow="03 · States"
        title="Default, focus, error, success, disabled."
        caption="Hover doesn't change an input — it is not a button. Focus shows a GridRed ring at 50% opacity. Error swaps border + helper text to form-error. Success swaps to form-success. Disabled drops to 0.4 opacity."
      >
        <StateGrid
          states={["Default", "Focus", "Disabled"]}
          rows={[
            {
              label: "Text input",
              caption: "Default Input primitive.",
              cells: {
                Default: (
                  <div className="w-full max-w-[240px]">
                    <StateInput state="Default" placeholder="215 kWh ATLAS" />
                  </div>
                ),
                Focus: (
                  <div className="w-full max-w-[240px]">
                    <StateInput state="Focus" placeholder="215 kWh ATLAS" />
                  </div>
                ),
                Disabled: (
                  <div className="w-full max-w-[240px]">
                    <StateInput state="Disabled" placeholder="Locked while site assessment runs" />
                  </div>
                ),
              },
            },
            {
              label: "Error",
              caption: "Border + helper switch to form-error.",
              cells: {
                Default: (
                  <div className="w-full max-w-[240px]">
                    <StateInput state="Error" placeholder="not-an-email" defaultValue="not-an-email" />
                    <HelperText tone="error" className="mt-1">
                      Use a work email, not a free address.
                    </HelperText>
                  </div>
                ),
              },
            },
            {
              label: "Success",
              caption: "Submitted-state confirmation.",
              cells: {
                Default: (
                  <div className="w-full max-w-[240px]">
                    <StateInput state="Success" defaultValue="ops@grandhyatt.in" />
                    <HelperText tone="success" className="mt-1">
                      Verified. We will reach out shortly.
                    </HelperText>
                  </div>
                ),
              },
            },
          ]}
        />

        <p className="mt-6 max-w-[68ch] text-xs text-[var(--color-text-muted)]">
          Hover state is intentionally omitted — an input is not a button.
          Visual change on hover would suggest an action that does not exist.
        </p>
      </SystemBlock>

      {/* ---------------- Live form composition ---------------- */}
      <SystemBlock
        id="composition"
        eyebrow="04 · Composition"
        title="A real GridPower form."
        caption="Two-column inputs above a textarea. Stack on mobile. Submit is a primary button — never gray-out. If a field is missing we surface the error inline, not in a modal."
      >
        <form
          onSubmit={handleSubmit}
          className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-neutral-50)] p-8"
        >
          <div className="mb-8 flex items-baseline justify-between">
            <div>
              <h3 className="font-display text-2xl font-semibold leading-[1.15] tracking-[-0.02em] text-[var(--color-text-heading)]">
                Request a quote
              </h3>
              <p className="mt-2 max-w-[60ch] text-sm text-[var(--color-text-muted)]">
                Five fields. Two minutes. An engineer replies within one
                business day with a feasibility note for your site.
              </p>
            </div>
            <Caption tone="mute">5 fields</Caption>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <Field
              label="Your name"
              required
            >
              {(id) => <Input id={id} type="text" placeholder="Priya Naik" />}
            </Field>

            <Field
              label="Work email"
              helper="Used for the quote PDF."
              required
            >
              {(id) => (
                <Input id={id} type="email" placeholder="priya@grandhyatt.in" />
              )}
            </Field>

            <Field
              label="Company"
              required
            >
              {(id) => (
                <Input id={id} type="text" placeholder="Grand Hyatt Goa" />
              )}
            </Field>

            <Field
              label="Mobile"
              helper="Whatsapp preferred."
            >
              {(id) => (
                <Input id={id} type="tel" placeholder="+91 98765 43210" />
              )}
            </Field>

            <div className="sm:col-span-2">
              <Field
                label="Tell us about the site"
                helper="Power available, layout, hours of operation. The more we know, the more accurate the first reply."
              >
                {(id) => (
                  <Textarea
                    id={id}
                    rows={5}
                    placeholder="Six bays under the porch. 33kV connection on the property. Open 24/7. We want destination charging plus a backup option."
                  />
                )}
              </Field>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--color-border)] pt-6">
            <p className="max-w-[40ch] text-xs text-[var(--color-text-muted)]">
              By submitting you agree to be contacted about your enquiry. No
              marketing list. No sharing with third parties.
            </p>
            <div className="flex items-center gap-3">
              <Button variant="ghost" type="button">
                Save for later
              </Button>
              <Button variant="primary" type="submit">
                Send the request
              </Button>
            </div>
          </div>
        </form>

        <p className="mt-6 max-w-[68ch] text-xs text-[var(--color-text-muted)]">
          The submit button never gray-outs while the form is incomplete.
          Disabling it hides the reason. Inline errors are clearer.
        </p>
      </SystemBlock>

      {/* ---------------- Labels & helpers ---------------- */}
      <SystemBlock
        id="labels"
        eyebrow="05 · Labels and helpers"
        title="Label first. Helper supports. Error replaces."
        caption="The label is the promise. The helper is the context the visitor needs to fill the field correctly. The error is the consequence when the promise is broken. They never co-exist on the same field at the same time."
      >
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-neutral-50)] p-6">
            <Label className="mb-2">Required field</Label>
            <Input placeholder="Site PIN code" />
            <HelperText>Six digits. Used to estimate distance for installation.</HelperText>
          </div>
          <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-neutral-50)] p-6">
            <Label className="mb-2" required>
              With required marker
            </Label>
            <Input placeholder="Annual energy spend (lakhs)" />
            <HelperText>An approximate figure unlocks the ROI estimate.</HelperText>
          </div>
          <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-neutral-50)] p-6">
            <Label className="mb-2">Validation error</Label>
            <Input aria-invalid defaultValue="not-a-pincode" />
            <HelperText tone="error">PIN code should be six digits.</HelperText>
          </div>
        </div>
      </SystemBlock>
    </SystemPageShell>
  );
}

function FieldCard({
  caption,
  className,
  children,
}: {
  caption: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={
        "rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-neutral-50)] p-6 " +
        (className ?? "")
      }
    >
      <Caption tone="mute" className="mb-4">
        {caption}
      </Caption>
      {children}
    </div>
  );
}
