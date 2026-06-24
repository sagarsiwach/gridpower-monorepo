import { Button } from "@/components/ui/button";
import {
  SystemPageShell,
  SystemBlock,
} from "@/components/system/SystemPageShell";
import { Caption, CodeToken } from "@/components/system/Caption";
import { StateGrid } from "@/components/system/StateGrid";
import { StateButton } from "@/components/system/StateButton";

/*
  /system/buttons.

  Catalogue of the production Button primitive.
    - Four variants: primary, secondary, ghost, destructive
    - Five sizes:    sm, default, lg, icon, icon-sm
    - Five states:   default, hover, focus, disabled, loading

  Each section explains when to reach for the variant and shows the
  ground truth — production component with state forced via wrapper.
*/

const ARROW = (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M3 7h8m0 0L7.5 3.5M11 7l-3.5 3.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SETTINGS_ICON = (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    aria-hidden="true"
  >
    <circle cx="7" cy="7" r="2" stroke="currentColor" strokeWidth="1.4" />
    <path
      d="M7 1.5v2m0 7v2M1.5 7h2m7 0h2M3.1 3.1l1.4 1.4m5 5l1.4 1.4M3.1 10.9l1.4-1.4m5-5l1.4-1.4"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
    />
  </svg>
);

const VARIANTS = [
  {
    variant: "primary" as const,
    label: "Primary",
    caption: "Max one per visible section. The single most important next step on the page.",
  },
  {
    variant: "secondary" as const,
    label: "Secondary",
    caption: "Outlined. Use beside a primary for the alternate path (Learn more, Talk to sales).",
  },
  {
    variant: "ghost" as const,
    label: "Ghost",
    caption: "Inline learn-more. Lives in tight rows beside other text, no border.",
  },
  {
    variant: "destructive" as const,
    label: "Destructive",
    caption: "Form-error context only. Never as a marketing CTA. De-saturated red, not GridRed.",
  },
];

export default function ButtonsRoute() {
  return (
    <SystemPageShell
      eyebrow="System · Buttons"
      title="Four variants. One CTA per section."
      lede="The button is the conversion contract. Restraint is the strategy. Primary GridRed sits alone in any visible section so the reader knows the single most important action."
    >
      {/* ---------------- Variants overview ---------------- */}
      <SystemBlock
        id="variants"
        eyebrow="01 · Variants"
        title="Four. Used differently."
        caption="A page should rarely show all four at once. Primary lives where the page is ready to convert. Secondary lives where there is a respectable alternative. Ghost is inline reading. Destructive is form errors only."
      >
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {VARIANTS.map(({ variant, label, caption }) => (
            <div
              key={variant}
              className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-neutral-50)] p-6"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-[var(--color-text-heading)]">
                  {label}
                </p>
                <CodeToken tone="mute">variant=&quot;{variant}&quot;</CodeToken>
              </div>
              <div className="my-6 flex items-center gap-3">
                <Button variant={variant}>
                  {variant === "ghost" ? (
                    <>
                      Read the case study {ARROW}
                    </>
                  ) : variant === "destructive" ? (
                    "Discard changes"
                  ) : (
                    "Request a quote"
                  )}
                </Button>
              </div>
              <p className="max-w-[44ch] text-sm leading-[1.625] text-[var(--color-text-muted)]">
                {caption}
              </p>
            </div>
          ))}
        </div>
      </SystemBlock>

      {/* ---------------- Sizes ---------------- */}
      <SystemBlock
        id="sizes"
        eyebrow="02 · Sizes"
        title="Five sizes for five contexts."
        caption="lg for marketing heroes and committed CTA sections. default for inline page CTAs and forms. sm for table rows, filters, dense controls. icon and icon-sm for chrome only — back buttons, dismiss controls."
      >
        <div className="overflow-x-auto">
          <div className="min-w-[640px] overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-neutral-50)]">
            <table className="w-full">
              <thead className="bg-[var(--color-section-alt)]">
                <tr>
                  <th className="px-5 py-3 text-left">
                    <Caption tone="mute" as="span">
                      Size
                    </Caption>
                  </th>
                  <th className="px-5 py-3 text-left">
                    <Caption tone="mute" as="span">
                      Token
                    </Caption>
                  </th>
                  <th className="px-5 py-3 text-left">
                    <Caption tone="mute" as="span">
                      Primary
                    </Caption>
                  </th>
                  <th className="px-5 py-3 text-left">
                    <Caption tone="mute" as="span">
                      Secondary
                    </Caption>
                  </th>
                  <th className="px-5 py-3 text-left">
                    <Caption tone="mute" as="span">
                      Use case
                    </Caption>
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    size: "lg" as const,
                    token: "h-11 px-6 text-base",
                    usage: "Hero CTA, committed sections.",
                  },
                  {
                    size: "default" as const,
                    token: "h-9 px-4 text-sm",
                    usage: "Inline page CTAs, forms.",
                  },
                  {
                    size: "sm" as const,
                    token: "h-8 px-3 text-xs",
                    usage: "Dense controls, table rows.",
                  },
                ].map((row) => (
                  <tr
                    key={row.size}
                    className="border-t border-[var(--color-border)]"
                  >
                    <td className="px-5 py-5 align-middle">
                      <p className="text-sm font-medium text-[var(--color-text-heading)]">
                        {row.size}
                      </p>
                    </td>
                    <td className="px-5 py-5 align-middle">
                      <CodeToken tone="mute">{row.token}</CodeToken>
                    </td>
                    <td className="px-5 py-5 align-middle">
                      <Button variant="primary" size={row.size}>
                        Request a quote
                      </Button>
                    </td>
                    <td className="px-5 py-5 align-middle">
                      <Button variant="secondary" size={row.size}>
                        Talk to sales
                      </Button>
                    </td>
                    <td className="px-5 py-5 align-middle">
                      <p className="text-xs text-[var(--color-text-muted)]">
                        {row.usage}
                      </p>
                    </td>
                  </tr>
                ))}

                {/* Icon row */}
                <tr className="border-t border-[var(--color-border)]">
                  <td className="px-5 py-5 align-middle">
                    <p className="text-sm font-medium text-[var(--color-text-heading)]">
                      icon
                    </p>
                  </td>
                  <td className="px-5 py-5 align-middle">
                    <CodeToken tone="mute">size-9</CodeToken>
                  </td>
                  <td className="px-5 py-5 align-middle">
                    <Button variant="primary" size="icon" aria-label="Settings">
                      {SETTINGS_ICON}
                    </Button>
                  </td>
                  <td className="px-5 py-5 align-middle">
                    <Button
                      variant="secondary"
                      size="icon"
                      aria-label="Settings"
                    >
                      {SETTINGS_ICON}
                    </Button>
                  </td>
                  <td className="px-5 py-5 align-middle">
                    <p className="text-xs text-[var(--color-text-muted)]">
                      Chrome controls only. Never the main CTA.
                    </p>
                  </td>
                </tr>
                <tr className="border-t border-[var(--color-border)]">
                  <td className="px-5 py-5 align-middle">
                    <p className="text-sm font-medium text-[var(--color-text-heading)]">
                      icon-sm
                    </p>
                  </td>
                  <td className="px-5 py-5 align-middle">
                    <CodeToken tone="mute">size-7</CodeToken>
                  </td>
                  <td className="px-5 py-5 align-middle">
                    <Button
                      variant="primary"
                      size="icon-sm"
                      aria-label="Settings"
                    >
                      {SETTINGS_ICON}
                    </Button>
                  </td>
                  <td className="px-5 py-5 align-middle">
                    <Button
                      variant="secondary"
                      size="icon-sm"
                      aria-label="Settings"
                    >
                      {SETTINGS_ICON}
                    </Button>
                  </td>
                  <td className="px-5 py-5 align-middle">
                    <p className="text-xs text-[var(--color-text-muted)]">
                      Dense controls, filter chips, close buttons.
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </SystemBlock>

      {/* ---------------- States ---------------- */}
      <SystemBlock
        id="states"
        eyebrow="03 · States"
        title="All five states, side by side."
        caption="Hover and focus normally need a mouse. Here we force them so the docs page reads at a glance. The underlying button is the production primitive — what you see is exactly what ships."
      >
        <StateGrid
          rows={[
            {
              label: "Primary",
              caption: "Filled GridRed. 1.02 scale on hover.",
              cells: {
                Default: <StateButton variant="primary" state="Default">Request a quote</StateButton>,
                Hover: <StateButton variant="primary" state="Hover">Request a quote</StateButton>,
                Focus: <StateButton variant="primary" state="Focus">Request a quote</StateButton>,
                Disabled: <StateButton variant="primary" state="Disabled">Request a quote</StateButton>,
                Loading: <StateButton variant="primary" state="Loading">Requesting</StateButton>,
              },
            },
            {
              label: "Secondary",
              caption: "Outlined neutral-700. Hover deepens border + tint.",
              cells: {
                Default: <StateButton variant="secondary" state="Default">Talk to sales</StateButton>,
                Hover: <StateButton variant="secondary" state="Hover">Talk to sales</StateButton>,
                Focus: <StateButton variant="secondary" state="Focus">Talk to sales</StateButton>,
                Disabled: <StateButton variant="secondary" state="Disabled">Talk to sales</StateButton>,
                Loading: <StateButton variant="secondary" state="Loading">Connecting</StateButton>,
              },
            },
            {
              label: "Ghost",
              caption: "Inline reading. No border. Hover tints the surface.",
              cells: {
                Default: <StateButton variant="ghost" state="Default">Read more</StateButton>,
                Hover: <StateButton variant="ghost" state="Hover">Read more</StateButton>,
                Focus: <StateButton variant="ghost" state="Focus">Read more</StateButton>,
                Disabled: <StateButton variant="ghost" state="Disabled">Read more</StateButton>,
                Loading: <StateButton variant="ghost" state="Loading">Loading</StateButton>,
              },
            },
            {
              label: "Destructive",
              caption: "De-saturated red. Tinted background, error text color.",
              cells: {
                Default: <StateButton variant="destructive" state="Default">Discard changes</StateButton>,
                Hover: <StateButton variant="destructive" state="Hover">Discard changes</StateButton>,
                Focus: <StateButton variant="destructive" state="Focus">Discard changes</StateButton>,
                Disabled: <StateButton variant="destructive" state="Disabled">Discard changes</StateButton>,
                Loading: <StateButton variant="destructive" state="Loading">Discarding</StateButton>,
              },
            },
          ]}
        />

        <p className="mt-6 max-w-[68ch] text-xs text-[var(--color-text-muted)]">
          Disabled uses 0.4 opacity. Loading replaces the leading icon with a
          spinner and disables the button to prevent double-submit. Focus ring
          is GridRed at 50% opacity, 2px offset.
        </p>
      </SystemBlock>

      {/* ---------------- Composition ---------------- */}
      <SystemBlock
        id="composition"
        eyebrow="04 · Composition"
        title="The CTA pair, the dual hero, the inline link."
        caption="Buttons travel together in known formations. These are the only three blessed compositions for marketing pages."
      >
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-neutral-50)] p-6">
            <Caption tone="mute" className="mb-4">
              CTA pair
            </Caption>
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="primary">Request a quote</Button>
              <Button variant="secondary">See the spec sheet</Button>
            </div>
            <p className="mt-6 max-w-[44ch] text-sm leading-[1.625] text-[var(--color-text-muted)]">
              Default hero composition. Primary leads, secondary supports.
              Stack on mobile.
            </p>
          </div>

          <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-gp-red)] p-6 text-[var(--color-neutral-50)]">
            <Caption tone="mute" className="mb-4" style={{ color: "var(--color-neutral-100)", opacity: 0.8 }}>
              Committed section
            </Caption>
            <p className="mb-5 max-w-[44ch] font-display text-2xl font-semibold leading-[1.15] tracking-[-0.02em]">
              Talk to an engineer who will install your battery.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                className="rounded-[var(--radius-sm)] bg-[var(--color-neutral-50)] px-5 py-2.5 text-sm font-medium text-[var(--color-gp-red)] transition-colors duration-200 hover:bg-[var(--color-neutral-100)]"
              >
                Request a quote
              </button>
              <button
                type="button"
                className="rounded-[var(--radius-sm)] border border-[var(--color-neutral-50)]/40 bg-transparent px-5 py-2.5 text-sm font-medium text-[var(--color-neutral-50)] transition-colors duration-200 hover:bg-[var(--color-neutral-50)]/10"
              >
                Talk to sales
              </button>
            </div>
          </div>

          <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-neutral-50)] p-6">
            <Caption tone="mute" className="mb-4">
              Inline reading
            </Caption>
            <p className="max-w-[44ch] text-sm leading-[1.625] text-[var(--color-text-body)]">
              ATLAS units run at sites from Verna to Pune.{" "}
              <Button variant="ghost" size="sm" className="-mx-2 inline">
                Read the case study {ARROW}
              </Button>{" "}
              to see how a single site saved 22% in year one.
            </p>
          </div>
        </div>

        <div className="mt-10 rounded-[var(--radius-md)] border border-[var(--color-form-error)]/40 bg-[oklch(0.52_0.15_25_/_0.04)] p-6">
          <Caption tone="mute" className="mb-4">
            Anti-patterns
          </Caption>
          <ul className="space-y-2 text-sm text-[var(--color-text-body)]">
            <li>Two primary buttons in one section. The decision becomes the visitor&apos;s, not yours.</li>
            <li>Destructive used as a marketing CTA. Discord, never delight.</li>
            <li>radius-2xl on buttons. It looks consumer-y, not industrial-confident.</li>
            <li>Drop shadow on hover. Use background colour and slight scale only.</li>
          </ul>
        </div>
      </SystemBlock>
    </SystemPageShell>
  );
}
