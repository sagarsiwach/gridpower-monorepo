import { Link } from "react-router";
import {
  SystemPageShell,
  SystemBlock,
} from "@/components/system/SystemPageShell";
import { Caption, CodeToken } from "@/components/system/Caption";
import { cn } from "@/lib/utils";

/*
  /system.

  The catalogue. Quick-jump cards to every other /system/* page plus an
  at-a-glance summary of what the design system covers, what it bans,
  and what it leaves open.
*/

interface CatalogEntry {
  href: string;
  label: string;
  eyebrow: string;
  description: string;
  status: "Ready" | "Owned by Agent B";
  preview: React.ReactNode;
  size: "lg" | "sm";
}

const CATALOG: CatalogEntry[] = [
  {
    href: "/system/tokens",
    label: "Tokens",
    eyebrow: "01 · Foundation",
    description:
      "Color, type, spacing, radii, motion. Every value with its CSS variable, OKLCH, hex, and a usage note.",
    status: "Ready",
    size: "lg",
    preview: <TokensPreview />,
  },
  {
    href: "/system/buttons",
    label: "Buttons",
    eyebrow: "02 · Elements",
    description:
      "Four variants, five sizes, five states. Primary GridRed sits alone in any visible section.",
    status: "Ready",
    size: "sm",
    preview: <ButtonsPreview />,
  },
  {
    href: "/system/forms",
    label: "Forms",
    eyebrow: "03 · Elements",
    description:
      "Inputs, labels, helpers, errors, success. Sharp 2px radius. Labels above. No floats.",
    status: "Ready",
    size: "sm",
    preview: <FormsPreview />,
  },
  {
    href: "/system/cards",
    label: "Cards",
    eyebrow: "04 · Composition",
    description:
      "Bento layouts with size variance. Surface contrast. Hover treatment. No drop shadows.",
    status: "Ready",
    size: "sm",
    preview: <CardsPreview />,
  },
  {
    href: "/system/menus",
    label: "Menus",
    eyebrow: "05 · Navigation",
    description:
      "Mega-menu, dropdowns, mobile sheet drawer. Owned by Agent B in this rollout.",
    status: "Owned by Agent B",
    size: "sm",
    preview: <MenusPreview />,
  },
];

export default function SystemIndexRoute() {
  return (
    <SystemPageShell
      eyebrow="System · Index"
      title="The GridPower design system, page by page."
      lede="This is the design system reference. It lives at /system inside the prototype and stays here permanently. Every primitive is documented with the rules from DESIGN.md, the rationale from PRODUCT.md, and the real GridPower content it was built to carry."
    >
      <SystemBlock
        id="catalog"
        eyebrow="01 · Catalogue"
        title="Five sections. One stays parked for Agent B."
        caption="Tokens is the source. Buttons, forms and cards are the elements that compose every marketing page. Menus is the navigation surface, which Agent B owns in this rollout."
      >
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {CATALOG.map((entry) => (
            <Link
              key={entry.href}
              to={entry.href}
              className={cn(
                "group relative flex flex-col overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-neutral-100)] transition-[transform,border-color] duration-200 hover:-translate-y-1 hover:border-[var(--color-border-strong)]",
                entry.size === "lg" && "lg:col-span-3",
              )}
            >
              <div
                className={cn(
                  "flex min-h-[180px] items-center justify-center border-b border-[var(--color-border)] bg-[var(--color-neutral-50)]",
                  entry.size === "lg" && "min-h-[280px]",
                )}
              >
                {entry.preview}
              </div>
              <div className="flex flex-1 flex-col justify-between p-6">
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <Caption tone="brand">{entry.eyebrow}</Caption>
                    {entry.status === "Owned by Agent B" ? (
                      <Caption tone="mute">Pending</Caption>
                    ) : (
                      <Caption tone="mute">Ready</Caption>
                    )}
                  </div>
                  <p className="mt-4 font-display text-2xl font-semibold leading-[1.15] tracking-[-0.02em] text-[var(--color-text-heading)]">
                    {entry.label}
                  </p>
                  <p className="mt-3 max-w-[48ch] text-sm leading-[1.625] text-[var(--color-text-body)]">
                    {entry.description}
                  </p>
                </div>
                <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-gp-red)]">
                  Open
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    className="transition-transform duration-200 group-hover:translate-x-0.5"
                  >
                    <path
                      d="M2 6h7m0 0L6 3m3 3-3 3"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </SystemBlock>

      <SystemBlock
        id="how-to-read"
        eyebrow="02 · How to read this system"
        title="A pattern, not a paint-by-numbers."
        caption="Every page on the GridPower marketing site composes from the elements in this catalogue. The catalogue is intentionally narrow — fewer primitives, used with more care, beats a hundred half-built ones. If a screen needs an element that does not exist here, the answer is to discuss it before forking it."
      >
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <RuleCard
            number="01"
            title="Tokens are sovereign."
            body="If a screen needs a value not listed in /system/tokens, the token system is incomplete. Add a token in globals.css, not an inline override in a component."
          />
          <RuleCard
            number="02"
            title="Restraint is the strategy."
            body="GridRed sits at less than 10% of the surface on a typical page. One committed-GridRed section per page maximum. The rest is sand-warm neutrals."
          />
          <RuleCard
            number="03"
            title="Every page reads PRODUCT.md."
            body="The voice is confident, technical, India-grounded. No em dashes, no exclamation marks, no AI-first claims. The system enforces the surface; PRODUCT.md enforces the words."
          />
        </div>
      </SystemBlock>

      <SystemBlock
        id="absolute-bans"
        eyebrow="03 · Absolute bans"
        title="What the system refuses, on principle."
        caption="From DESIGN.md absolute bans + impeccable shared design laws. These are not preferences, they are guardrails. If a design lands inside any of them, it is AI slop, regardless of how good the rest looks."
      >
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {ABSOLUTE_BANS.map((ban) => (
            <div
              key={ban}
              className="rounded-[var(--radius-xs)] border border-[var(--color-border)] bg-[var(--color-neutral-50)] px-4 py-3"
            >
              <p className="text-sm text-[var(--color-text-body)]">{ban}</p>
            </div>
          ))}
        </div>
      </SystemBlock>

      <SystemBlock
        id="provenance"
        eyebrow="04 · Provenance"
        title="Where each rule comes from."
        caption="Source-of-truth lookup for the questions that come up later when someone asks why."
      >
        <div className="overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-border)]">
          <table className="w-full">
            <thead className="bg-[var(--color-section-alt)]">
              <tr>
                <th className="px-5 py-3 text-left">
                  <Caption tone="mute" as="span">
                    Question
                  </Caption>
                </th>
                <th className="px-5 py-3 text-left">
                  <Caption tone="mute" as="span">
                    Source
                  </Caption>
                </th>
              </tr>
            </thead>
            <tbody className="bg-[var(--color-neutral-50)]">
              {PROVENANCE.map((row) => (
                <tr
                  key={row.question}
                  className="border-t border-[var(--color-border)]"
                >
                  <td className="px-5 py-4 align-top">
                    <p className="text-sm text-[var(--color-text-heading)]">
                      {row.question}
                    </p>
                  </td>
                  <td className="px-5 py-4 align-top">
                    <CodeToken tone="mute">{row.source}</CodeToken>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SystemBlock>
    </SystemPageShell>
  );
}

// ----------------------------------------------------------------------------
// Previews — each catalog tile gets a hand-drawn miniature.
// Built from the same tokens as the routes themselves so they stay in sync.
// ----------------------------------------------------------------------------

function TokensPreview() {
  return (
    <div className="flex w-full items-stretch gap-1 px-10 py-8">
      {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map((step) => (
        <div
          key={step}
          className="flex-1 rounded-[var(--radius-xs)]"
          style={{
            backgroundColor: `var(--color-neutral-${step})`,
            height: 140,
            border:
              step === 50 || step === 100
                ? "1px solid var(--color-border)"
                : undefined,
          }}
        />
      ))}
      <div
        className="flex-1 rounded-[var(--radius-xs)]"
        style={{ backgroundColor: "var(--color-gp-red)", height: 140 }}
      />
    </div>
  );
}

function ButtonsPreview() {
  return (
    <div className="flex flex-col items-center gap-3">
      <span className="inline-flex items-center rounded-[var(--radius-sm)] bg-[var(--color-gp-red)] px-4 py-2 text-xs font-medium text-[var(--color-neutral-50)]">
        Request a quote
      </span>
      <span className="inline-flex items-center rounded-[var(--radius-sm)] border border-[var(--color-neutral-700)] px-4 py-2 text-xs font-medium text-[var(--color-neutral-700)]">
        Talk to sales
      </span>
    </div>
  );
}

function FormsPreview() {
  return (
    <div className="w-full max-w-[220px] px-6">
      <p className="mb-2 text-[10px] font-medium text-[var(--color-text-heading)]">
        Work email
      </p>
      <div className="h-9 rounded-[var(--radius-xs)] border border-[var(--color-border-strong)] bg-transparent" />
      <p className="mt-1 text-[9px] text-[var(--color-text-muted)]">
        We reply within one business day.
      </p>
    </div>
  );
}

function CardsPreview() {
  return (
    <div className="grid w-full max-w-[260px] grid-cols-3 grid-rows-2 gap-1.5 p-6">
      <div className="col-span-2 row-span-2 rounded-[var(--radius-xs)] bg-[var(--color-neutral-900)]" />
      <div className="rounded-[var(--radius-xs)] bg-[var(--color-neutral-200)]" />
      <div className="rounded-[var(--radius-xs)] bg-[var(--color-gp-red-tinted)]" />
    </div>
  );
}

function MenusPreview() {
  return (
    <div className="w-full max-w-[260px] px-6">
      <div className="flex h-8 items-center justify-between rounded-[var(--radius-xs)] border border-[var(--color-border-strong)] px-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
          Solutions
        </span>
        <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
          <path
            d="M2 3l2 2 2-2"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className="mt-1.5 space-y-1 rounded-[var(--radius-xs)] border border-[var(--color-border)] bg-[var(--color-neutral-50)] p-2">
        <div className="h-2 w-3/4 rounded-[var(--radius-xs)] bg-[var(--color-neutral-200)]" />
        <div className="h-2 w-1/2 rounded-[var(--radius-xs)] bg-[var(--color-neutral-200)]" />
        <div className="h-2 w-2/3 rounded-[var(--radius-xs)] bg-[var(--color-neutral-200)]" />
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------------
// Static content
// ----------------------------------------------------------------------------

function RuleCard({
  number,
  title,
  body,
}: {
  number: string;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-neutral-50)] p-6">
      <Caption tone="brand">{number}</Caption>
      <p className="mt-4 font-display text-xl font-semibold leading-[1.15] tracking-[-0.02em] text-[var(--color-text-heading)]">
        {title}
      </p>
      <p className="mt-3 max-w-[44ch] text-sm leading-[1.625] text-[var(--color-text-body)]">
        {body}
      </p>
    </div>
  );
}

const ABSOLUTE_BANS = [
  "Side-stripe colored borders on cards",
  "Gradient text (background-clip: text)",
  "Glassmorphism as decoration",
  "Drop shadows on cards or buttons",
  "Identical card grids",
  "Modal as a first thought",
  "The hero-metric template",
  "Em dashes",
  "Emojis",
  "Exclamation marks",
  "AI-first or AI-powered copy",
  "Smiling-people-in-suits stock",
  "Gradient mesh backgrounds",
  "Hero carousels",
  "Rotating client logo strips",
];

const PROVENANCE: { question: string; source: string }[] = [
  { question: "Which red?", source: "DESIGN.md · Brand color · GridRed" },
  { question: "What hue for neutrals?", source: "DESIGN.md · Neutral scale" },
  { question: "When can I use a committed-GridRed section?", source: "DESIGN.md · Color strategy" },
  { question: "What ratio for type scale?", source: "DESIGN.md · Type scale" },
  { question: "How much space between sections?", source: "DESIGN.md · Spacing" },
  { question: "Which radius for buttons?", source: "DESIGN.md · Radii" },
  { question: "What easing for hover?", source: "DESIGN.md · Motion language" },
  { question: "Why no shadows on cards?", source: "DESIGN.md · Absolute bans" },
  { question: "What is the brand voice?", source: "PRODUCT.md · Voice and tone" },
  { question: "What references do we reject?", source: "PRODUCT.md · Anti-references" },
];
