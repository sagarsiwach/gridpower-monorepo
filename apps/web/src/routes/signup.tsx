import { useState, useEffect } from "react";
import { Form, useActionData } from "react-router";
import type { MetaFunction, ActionFunctionArgs } from "react-router";
import {
  Button,
  SectionLabel,
  DotGrid,
  toast,
  Toaster,
} from "@gridpower/ui";

export const meta: MetaFunction = () => [
  { title: "Join the waitlist — GridPower" },
  {
    name: "description",
    content:
      "Be among the first to access GridPower's platform when we launch Q2 2026.",
  },
  { property: "og:title", content: "Join the waitlist — GridPower" },
  {
    property: "og:description",
    content:
      "Be among the first to access GridPower's platform when we launch Q2 2026.",
  },
  { property: "og:url", content: "/signup" },
  { property: "og:image", content: "/og-default.svg" },
  { name: "twitter:card", content: "summary_large_image" },
];

export async function action({ request }: ActionFunctionArgs) {
  const form = await request.formData();
  console.log("signup submission:", Object.fromEntries(form));
  return { ok: true, message: "You're on the list." };
}

type ActionData = { ok: boolean; message: string };

const verticalOptions = [
  "Home / residential",
  "Commercial / industrial",
  "Fleet operator",
  "EV OEM",
  "Charging network operator",
  "Real estate / developer",
  "System integrator",
  "Other",
];

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function SignupPage() {
  const actionData = useActionData<ActionData>();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validate = (name: string, value: string): string => {
    if (name === "name" && !value.trim()) return "Name is required";
    if (name === "email") {
      if (!value.trim()) return "Email is required";
      if (!validateEmail(value)) return "Enter a valid email address";
    }
    return "";
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
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

      {/* ── Hero + Form ───────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-sand-1 min-h-[80vh] flex items-center justify-center py-24">
        <DotGrid className="absolute inset-0" color="var(--sand-5)" />
        <div className="relative mx-auto max-w-lg w-full px-6 text-center">
          <SectionLabel className="mb-4 justify-center">
            EARLY ACCESS
          </SectionLabel>
          <h1 className="font-heading text-display tracking-tight text-sand-12 leading-[1.1] mb-4">
            Get early access to GridOS.
          </h1>
          <p className="text-base text-sand-11 leading-[1.65] mb-10">
            Be among the first to access GridPower's platform when we launch Q2
            2026. No spam — just launch updates.
          </p>

          {actionData?.ok ? (
            <div className="rounded-xl border border-sand-6 bg-sand-2 p-8">
              <p className="font-heading text-lg font-semibold text-sand-12 mb-2">
                You're on the list.
              </p>
              <p className="text-sm text-sand-11">
                We'll be in touch before Q2 2026 launch.
              </p>
            </div>
          ) : (
            <Form method="post" noValidate className="text-left">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm text-sand-11 mb-1.5">
                    Name <span className="text-grid-red">*</span>
                  </label>
                  <input
                    name="name"
                    placeholder="Your name"
                    className="w-full rounded-lg border border-sand-6 bg-sand-1 px-3.5 py-3 text-sm text-sand-12 placeholder:text-sand-8 outline-none focus:border-sand-7 transition-colors"
                    onBlur={handleBlur}
                  />
                  {touched.name && errors.name && (
                    <p className="mt-1 text-xs text-destructive">{errors.name}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm text-sand-11 mb-1.5">
                    Email <span className="text-grid-red">*</span>
                  </label>
                  <input
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    className="w-full rounded-lg border border-sand-6 bg-sand-1 px-3.5 py-3 text-sm text-sand-12 placeholder:text-sand-8 outline-none focus:border-sand-7 transition-colors"
                    onBlur={handleBlur}
                  />
                  {touched.email && errors.email && (
                    <p className="mt-1 text-xs text-destructive">{errors.email}</p>
                  )}
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm text-sand-11 mb-1.5">
                  Company
                </label>
                <input
                  name="company"
                  placeholder="Your company"
                  className="w-full rounded-lg border border-sand-6 bg-sand-1 px-3.5 py-3 text-sm text-sand-12 placeholder:text-sand-8 outline-none focus:border-sand-7 transition-colors"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm text-sand-11 mb-1.5">
                  Vertical / Interest
                </label>
                <select
                  name="vertical"
                  className="w-full rounded-lg border border-sand-6 bg-sand-1 px-3.5 py-3 text-sm text-sand-12 outline-none focus:border-sand-7 transition-colors cursor-pointer"
                >
                  <option value="">Select one</option>
                  {verticalOptions.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm text-sand-11 mb-1.5">
                  Use case
                </label>
                <textarea
                  name="usecase"
                  placeholder="Describe what you want to build or deploy…"
                  rows={3}
                  className="w-full rounded-lg border border-sand-6 bg-sand-1 px-3.5 py-3 text-sm text-sand-12 placeholder:text-sand-8 outline-none focus:border-sand-7 transition-colors resize-y"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm text-sand-11 mb-1.5">
                  Location
                </label>
                <input
                  name="location"
                  placeholder="City, State"
                  className="w-full rounded-lg border border-sand-6 bg-sand-1 px-3.5 py-3 text-sm text-sand-12 placeholder:text-sand-8 outline-none focus:border-sand-7 transition-colors"
                />
              </div>

              <Button type="submit" variant="primary" className="w-full">
                Get early access
              </Button>
            </Form>
          )}

          <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.06em] text-sand-8">
            No spam. Unsubscribe any time.
          </p>
        </div>
      </section>
    </div>
  );
}
