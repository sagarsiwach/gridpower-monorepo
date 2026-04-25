import { useState, useEffect } from "react";
import { Form, useActionData } from "react-router";
import type { MetaFunction, ActionFunctionArgs } from "react-router";
import {
  Button,
  SectionLabel,
  SectionDivider,
  DotGrid,
  toast,
  Toaster,
} from "@gridpower/ui";

export const meta: MetaFunction = () => [
  { title: "Contact us | GridPower" },
  {
    name: "description",
    content:
      "Tell us about your project and we'll come back within one working day.",
  },
  { property: "og:title", content: "Contact us | GridPower" },
  {
    property: "og:description",
    content:
      "Tell us about your project and we'll come back within one working day.",
  },
  { property: "og:url", content: "/contact" },
  { property: "og:image", content: "/og-default.svg" },
  { name: "twitter:card", content: "summary_large_image" },
];

export async function action({ request }: ActionFunctionArgs) {
  const form = await request.formData();
  console.log("contact submission:", Object.fromEntries(form));
  return { ok: true, message: "Thanks. We'll be in touch." };
}

type ActionData = { ok: boolean; message: string };

const interestOptions = [
  "Home energy storage",
  "Commercial / industrial storage",
  "Home EV charging",
  "Destination / fleet charging",
  "OEM powertrain (GridDrive)",
  "Platform / GridOS",
  "Partnership / distribution",
  "Other",
];

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function ContactPage() {
  const actionData = useActionData<ActionData>();

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validate = (name: string, value: string): string => {
    if (name === "name" && !value.trim()) return "Name is required";
    if (name === "email") {
      if (!value.trim()) return "Email is required";
      if (!validateEmail(value)) return "Enter a valid email address";
    }
    if (name === "message" && !value.trim()) return "Message is required";
    return "";
  };

  const handleBlur = (
    e: React.FocusEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const err = validate(name, value);
    setErrors((prev) => ({ ...prev, [name]: err }));
  };

  useEffect(() => {
    if (actionData?.ok) {
      toast.success(actionData.message);
    }
  }, [actionData]);

  return (
    <div className="bg-background text-foreground">
      <Toaster />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-sand-1 px-6 pb-0 pt-16">
        <DotGrid className="absolute inset-0" color="var(--sand-5)" />
        <div className="relative mx-auto max-w-7xl pb-14">
          <SectionLabel className="mb-4">CONTACT</SectionLabel>
          <h1 className="font-heading text-display tracking-tight text-sand-12 leading-[1.05] mb-4">
            Let's build your energy future.
          </h1>
          <p className="font-body text-body-lg text-sand-11 leading-relaxed">
            Tell us about your project and we'll come back within one working
            day.
          </p>
        </div>
      </section>

      <SectionDivider />

      {/* ── Form + Office ─────────────────────────────────────── */}
      <section className="bg-sand-1 py-16 pb-24">
        <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Contact Form */}
          <div>
            {actionData?.ok ? (
              <div className="rounded-card border border-sand-6 bg-sand-2 p-8 text-center">
                <p className="font-heading text-h4 font-semibold text-sand-12 mb-2">
                  Message sent.
                </p>
                <p className="font-body text-body-sm text-sand-11">
                  We'll be in touch within one working day.
                </p>
              </div>
            ) : (
              <Form method="post" noValidate>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-body-sm text-sand-11 mb-1.5">
                      Name <span className="text-grid-red">*</span>
                    </label>
                    <input
                      name="name"
                      placeholder="Your name"
                      className="w-full rounded-input border border-sand-6 bg-sand-1 px-3.5 py-3 text-body-sm text-sand-12 placeholder:text-sand-8 outline-none focus:border-sand-7 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-colors"
                      onBlur={handleBlur}
                    />
                    {touched.name && errors.name && (
                      <p className="mt-1 text-body-sm text-destructive">
                        {errors.name}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-body-sm text-sand-11 mb-1.5">
                      Email <span className="text-grid-red">*</span>
                    </label>
                    <input
                      name="email"
                      type="email"
                      placeholder="your@email.com"
                      className="w-full rounded-input border border-sand-6 bg-sand-1 px-3.5 py-3 text-body-sm text-sand-12 placeholder:text-sand-8 outline-none focus:border-sand-7 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-colors"
                      onBlur={handleBlur}
                    />
                    {touched.email && errors.email && (
                      <p className="mt-1 text-body-sm text-destructive">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-body-sm text-sand-11 mb-1.5">
                    Company
                  </label>
                  <input
                    name="company"
                    placeholder="Your company"
                    className="w-full rounded-input border border-sand-6 bg-sand-1 px-3.5 py-3 text-body-sm text-sand-12 placeholder:text-sand-8 outline-none focus:border-sand-7 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-colors"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-body-sm text-sand-11 mb-1.5">
                    Phone
                  </label>
                  <input
                    name="phone"
                    placeholder="+91 98765 43210"
                    className="w-full rounded-input border border-sand-6 bg-sand-1 px-3.5 py-3 text-body-sm text-sand-12 placeholder:text-sand-8 outline-none focus:border-sand-7 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-colors"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-body-sm text-sand-11 mb-1.5">
                    Area of interest
                  </label>
                  <select
                    name="interest"
                    className="w-full rounded-input border border-sand-6 bg-sand-1 px-3.5 py-3 text-body-sm text-sand-12 outline-none focus:border-sand-7 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-colors cursor-pointer"
                  >
                    <option value="">Select one</option>
                    {interestOptions.map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                </div>

                <div className="mb-6">
                  <label className="block text-body-sm text-sand-11 mb-1.5">
                    Message <span className="text-grid-red">*</span>
                  </label>
                  <textarea
                    name="message"
                    placeholder="Tell us about your project…"
                    rows={5}
                    className="w-full rounded-input border border-sand-6 bg-sand-1 px-3.5 py-3 text-body-sm text-sand-12 placeholder:text-sand-8 outline-none focus:border-sand-7 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-colors resize-y"
                    onBlur={handleBlur}
                  />
                  {touched.message && errors.message && (
                    <p className="mt-1 text-body-sm text-destructive">
                      {errors.message}
                    </p>
                  )}
                </div>

                <Button type="submit" variant="primary">
                  Send message
                </Button>
              </Form>
            )}
          </div>

          {/* Office info */}
          <div>
            <div className="mb-10">
              <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-sand-9 mb-4">
                REGISTERED OFFICE
              </p>
              <p className="font-body text-body-sm text-sand-11 leading-[1.8]">
                DeltaEV Mobility Private Limited
                <br />
                GIDC Verna, Goa, 403 722
                <br />
                India
              </p>
            </div>
            <div className="mb-10">
              <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-sand-9 mb-4">
                MANUFACTURING
              </p>
              <p className="font-body text-body-sm text-sand-11 leading-[1.8]">
                Dharwad, Karnataka
                <br />
                India
              </p>
            </div>
            <div className="mb-10">
              <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-sand-9 mb-4">
                CONTACT
              </p>
              <p className="font-body text-body-sm text-sand-11 leading-[1.8]">
                hello@gridpower.co.in
                <br />
                +91 98765 43210
              </p>
            </div>

            {/* Map placeholder */}
            <div className="relative overflow-hidden rounded-card border border-sand-6 bg-sand-3 h-44 flex items-center justify-center">
              <DotGrid
                className="absolute inset-0"
                color="var(--sand-5)"
               
              />
              <p className="relative font-mono text-[10px] uppercase tracking-[0.08em] text-sand-8 text-center">
                MAP EMBED
                <br />
                GIDC VERNA · GOA
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
