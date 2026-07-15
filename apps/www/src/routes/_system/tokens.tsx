import {
  SystemPageShell,
  SystemBlock,
} from "@/components/system/SystemPageShell";
import { ColorChip, type ColorChipData } from "@/components/system/ColorChip";
import { TypeSample, type TypeSampleData } from "@/components/system/TypeSample";
import { SpacingRuler, type SpacingData } from "@/components/system/SpacingRuler";
import { RadiusSample, type RadiusData } from "@/components/system/RadiusSample";
import { MotionDemo } from "@/components/system/MotionDemo";
import { Caption, CodeToken } from "@/components/system/Caption";

/*
  /system/tokens.

  Polish-grade reference for the token system. Every value rendered with
  its CSS variable, OKLCH value, approximate hex (for color), and a usage
  note explaining when it earns its place. Sections follow the order in
  DESIGN.md so the page and the spec stay in lock-step.
*/

// ----------------------------------------------------------------------------
// Color data
// ----------------------------------------------------------------------------

const NEUTRAL_SCALE: ColorChipData[] = [
  {
    token: "--color-neutral-50",
    oklch: "oklch(0.991 0.003 27)",
    hex: "#FCFAFA",
    label: "neutral-50 — Snow",
    role: "Page bg",
    contrast: "light",
  },
  {
    token: "--color-neutral-100",
    oklch: "oklch(0.972 0.004 27)",
    hex: "#F6F3F2",
    label: "neutral-100",
    role: "Section alt",
    contrast: "light",
  },
  {
    token: "--color-neutral-200",
    oklch: "oklch(0.946 0.005 27)",
    hex: "#EEEAE9",
    label: "neutral-200",
    role: "Card alt",
    contrast: "light",
  },
  {
    token: "--color-neutral-300",
    oklch: "oklch(0.910 0.006 27)",
    hex: "#E1DCDB",
    label: "neutral-300",
    role: "Border",
    contrast: "light",
  },
  {
    token: "--color-neutral-400",
    oklch: "oklch(0.846 0.007 27)",
    hex: "#CDC6C4",
    label: "neutral-400",
    role: "Border strong",
    contrast: "light",
  },
  {
    token: "--color-neutral-500",
    oklch: "oklch(0.732 0.008 27)",
    hex: "#ABA29F",
    label: "neutral-500",
    role: "Muted text",
    contrast: "light",
  },
  {
    token: "--color-neutral-600",
    oklch: "oklch(0.595 0.008 27)",
    hex: "#897F7C",
    label: "neutral-600",
    role: "Body 2°",
    contrast: "dark",
  },
  {
    token: "--color-neutral-700",
    oklch: "oklch(0.467 0.007 27)",
    hex: "#695F5D",
    label: "neutral-700",
    role: "Body",
    contrast: "dark",
  },
  {
    token: "--color-neutral-800",
    oklch: "oklch(0.341 0.006 27)",
    hex: "#4A4341",
    label: "neutral-800",
    role: "Heading",
    contrast: "dark",
  },
  {
    token: "--color-neutral-900",
    oklch: "oklch(0.224 0.005 27)",
    hex: "#2D2826",
    label: "neutral-900",
    role: "Display",
    contrast: "dark",
  },
  {
    token: "--color-neutral-950",
    oklch: "oklch(0.151 0.004 27)",
    hex: "#1B1715",
    label: "neutral-950",
    role: "Inverted bg",
    contrast: "dark",
  },
];

const BRAND_FAMILY: ColorChipData[] = [
  {
    token: "--color-gp-red",
    oklch: "oklch(0.58 0.245 27)",
    hex: "#E11D2C",
    label: "GridRed",
    role: "Brand",
    contrast: "dark",
  },
  {
    token: "--color-gp-red-hover",
    oklch: "oklch(0.53 0.245 27)",
    hex: "#C9101D",
    label: "GridRed — hover",
    role: "Hover",
    contrast: "dark",
  },
  {
    token: "--color-gp-red-muted",
    oklch: "oklch(0.58 0.15 27)",
    hex: "#B7494A",
    label: "GridRed — muted",
    role: "Muted",
    contrast: "dark",
  },
  {
    token: "--color-gp-red-tinted",
    oklch: "oklch(0.96 0.04 27)",
    hex: "#FDEEEB",
    label: "GridRed — tinted",
    role: "Surface",
    contrast: "light",
  },
];

const SEMANTIC_FAMILY: ColorChipData[] = [
  {
    token: "--color-form-error",
    oklch: "oklch(0.52 0.15 25)",
    hex: "#9F3A38",
    label: "form-error",
    role: "Errors",
    contrast: "dark",
  },
  {
    token: "--color-form-success",
    oklch: "oklch(0.65 0.13 145)",
    hex: "#4D8E5A",
    label: "form-success",
    role: "Submitted",
    contrast: "dark",
  },
];

const SURFACE_ASSIGNMENTS: ColorChipData[] = [
  {
    token: "--color-page-bg",
    oklch: "oklch(0.991 0.003 27)",
    label: "Page background",
    role: "page-bg",
    contrast: "light",
  },
  {
    token: "--color-section-alt",
    oklch: "oklch(0.972 0.004 27)",
    label: "Section alternate",
    role: "section-alt",
    contrast: "light",
  },
  {
    token: "--color-card-on-page",
    oklch: "oklch(0.972 0.004 27)",
    label: "Card on neutral-50 page",
    role: "card",
    contrast: "light",
  },
  {
    token: "--color-card-on-section",
    oklch: "oklch(0.991 0.003 27)",
    label: "Card on neutral-100 section",
    role: "card",
    contrast: "light",
  },
  {
    token: "--color-inverted-bg",
    oklch: "oklch(0.224 0.005 27)",
    label: "Inverted section bg",
    role: "platform showcase",
    contrast: "dark",
  },
];

// ----------------------------------------------------------------------------
// Type scale data
// ----------------------------------------------------------------------------

const TYPE_SCALE: TypeSampleData[] = [
  {
    token: "--text-7xl",
    pxApprox: "119.6px",
    remValue: "7.478rem",
    family: "display",
    weight: 600,
    leading: "--leading-display",
    tracking: "--tracking-display",
    sample: "The energy platform.",
    usage: "Mega hero. One per site, only on landing.",
  },
  {
    token: "--text-6xl",
    pxApprox: "89.8px",
    remValue: "5.610rem",
    family: "display",
    weight: 600,
    leading: "--leading-display",
    tracking: "--tracking-display",
    sample: "Storage that pays itself back in 18 months.",
    usage: "Hero display. Homepage, audience hero.",
  },
  {
    token: "--text-5xl",
    pxApprox: "67.3px",
    remValue: "4.209rem",
    family: "display",
    weight: 600,
    leading: "--leading-display",
    tracking: "--tracking-display",
    sample: "Run thirty sites from one console.",
    usage: "H1 medium. Solution page heroes, committed CTAs.",
  },
  {
    token: "--text-4xl",
    pxApprox: "50.5px",
    remValue: "3.157rem",
    family: "display",
    weight: 600,
    leading: "--leading-display",
    tracking: "--tracking-display",
    sample: "Open protocols are the floor, not the ceiling.",
    usage: "H1 small. Internal page leads.",
  },
  {
    token: "--text-3xl",
    pxApprox: "37.9px",
    remValue: "2.369rem",
    family: "display",
    weight: 600,
    leading: "--leading-section",
    tracking: "--tracking-heading",
    sample: "How we think about pricing.",
    usage: "H2. Section heads.",
  },
  {
    token: "--text-2xl",
    pxApprox: "28.4px",
    remValue: "1.777rem",
    family: "display",
    weight: 600,
    leading: "--leading-section",
    tracking: "--tracking-heading",
    sample: "Liquid-cooled, monsoon-tested.",
    usage: "H3. Sub-section heads.",
  },
  {
    token: "--text-xl",
    pxApprox: "21.3px",
    remValue: "1.333rem",
    family: "body",
    weight: 500,
    leading: "--leading-section",
    tracking: "--tracking-heading",
    sample: "Hospitality buyers think in revenue, not kWh.",
    usage: "H4. Block leads, large body emphasis.",
  },
  {
    token: "--text-lg",
    pxApprox: "18px",
    remValue: "1.125rem",
    family: "body",
    weight: 400,
    leading: "--leading-body",
    tracking: "--tracking-body",
    sample:
      "Hospitality buyers think in revenue per square metre. A charger that draws drivers off the highway is a customer-acquisition channel.",
    usage: "Emphasized body. Hero ledes, audience paragraphs.",
  },
  {
    token: "--text-base",
    pxApprox: "16px",
    remValue: "1rem",
    family: "body",
    weight: 400,
    leading: "--leading-body",
    tracking: "--tracking-body",
    sample:
      "A rooftop solar array without storage pays back through net-metering credits. The same array paired with an ATLAS unit becomes a revenue engine. It shifts solar to peak hours, shaves demand charges, and earns DR payouts during stress events.",
    usage: "Body default. Narrative copy.",
  },
  {
    token: "--text-sm",
    pxApprox: "14px",
    remValue: "0.875rem",
    family: "body",
    weight: 400,
    leading: "--leading-body",
    tracking: "--tracking-body",
    sample:
      "Operators run thirty sites from one console. Without leaving their seat. Without learning a fourth dashboard. Without paying per seat.",
    usage: "Secondary body, UI text.",
  },
  {
    token: "--text-xs",
    pxApprox: "12px",
    remValue: "0.75rem",
    family: "body",
    weight: 400,
    leading: "--leading-body",
    tracking: "--tracking-body",
    sample: "Image credit. Footnote. Caption.",
    usage: "Captions, footnotes, helper text.",
  },
];

const MONO_SCALE: TypeSampleData[] = [
  {
    token: "--text-sm",
    pxApprox: "14px",
    remValue: "0.875rem",
    family: "mono",
    weight: 500,
    leading: "--leading-mono",
    tracking: "--tracking-body",
    sample: "215 kWh   /   18 months   /   24% IRR",
    usage: "Spec table values. Stat strips.",
  },
  {
    token: "--text-xs",
    pxApprox: "12px",
    remValue: "0.75rem",
    family: "mono",
    weight: 500,
    leading: "--leading-mono",
    tracking: "--tracking-mono-label",
    sample: "PLATFORM · GRIDOS · OPEN",
    usage: "Uppercase mono labels. Section eyebrows.",
  },
];

// ----------------------------------------------------------------------------
// Spacing data
// ----------------------------------------------------------------------------

const SPACING_SCALE: SpacingData[] = [
  { token: "--space-1", px: "4px", rem: "0.25rem", usage: "Hairline gap, icon-label." },
  { token: "--space-2", px: "8px", rem: "0.5rem", usage: "Inline form gaps." },
  { token: "--space-3", px: "12px", rem: "0.75rem", usage: "List item padding." },
  { token: "--space-4", px: "16px", rem: "1rem", usage: "Default content gutter." },
  { token: "--space-5", px: "20px", rem: "1.25rem", usage: "Card inner padding (small)." },
  { token: "--space-6", px: "24px", rem: "1.5rem", usage: "Card inner padding (default)." },
  { token: "--space-8", px: "32px", rem: "2rem", usage: "Section spacing inside columns." },
  { token: "--space-10", px: "40px", rem: "2.5rem", usage: "Heading-to-body gap on heroes." },
  { token: "--space-12", px: "48px", rem: "3rem", usage: "Compact section padding." },
  { token: "--space-16", px: "64px", rem: "4rem", usage: "Compact section (large)." },
  { token: "--space-20", px: "80px", rem: "5rem", usage: "Standard section padding." },
  { token: "--space-24", px: "96px", rem: "6rem", usage: "Standard section (rhythmic)." },
  { token: "--space-32", px: "128px", rem: "8rem", usage: "Hero / committed section padding." },
  { token: "--space-40", px: "160px", rem: "10rem", usage: "Hero (max). Use sparingly." },
  { token: "--space-48", px: "192px", rem: "12rem", usage: "Once per page, hero only." },
  { token: "--space-64", px: "256px", rem: "16rem", usage: "Rarely. Cinematic spacers only." },
];

// ----------------------------------------------------------------------------
// Radii data
// ----------------------------------------------------------------------------

const RADII_SMALL: RadiusData[] = [
  { token: "--radius-none", value: "0", usage: "Spec tables, hairline dividers." },
  { token: "--radius-xs", value: "2px", usage: "Inputs, chips, helper rows." },
  { token: "--radius-sm", value: "4px", usage: "Buttons default." },
  { token: "--radius-md", value: "6px", usage: "Cards default." },
  { token: "--radius-lg", value: "8px", usage: "Featured cards, modals." },
  { token: "--radius-xl", value: "12px", usage: "Hero cards." },
];

const RADII_LARGE: RadiusData[] = [
  { token: "--radius-2xl", value: "16px", usage: "Image masks. Never buttons or inputs." },
  { token: "--radius-full", value: "9999px", usage: "Pills, tags, avatars." },
];

// ----------------------------------------------------------------------------
// Page
// ----------------------------------------------------------------------------

export default function TokensRoute() {
  const lastSpacing = SPACING_SCALE[SPACING_SCALE.length - 1];
  const maxSpacingRem = lastSpacing
    ? Number(lastSpacing.rem.replace("rem", ""))
    : 16;

  return (
    <SystemPageShell
      eyebrow="System · Tokens"
      title="One token, one decision, every page."
      lede="Color, type, spacing, radii, motion. Every value is sourced from DESIGN.md. If a screen needs a value not listed here, the token system is incomplete and the answer is a new token, not an inline override."
    >
      {/* ----------------- Color ----------------- */}
      <SystemBlock
        id="color"
        eyebrow="01 · Color"
        title="Restrained baseline, committed accents."
        caption="Sand-warm neutrals carry 90% of the surface. GridRed earns its place at less than 10%. Never #fff. Never #000. Every neutral is hue-locked to 27° so the warmth is felt, not seen."
      >
        <div className="space-y-12">
          <div>
            <Caption tone="mute" className="mb-4">
              Brand family
            </Caption>
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
              {BRAND_FAMILY.map((c) => (
                <ColorChip key={c.token} data={c} size="lg" />
              ))}
            </div>
          </div>

          <div>
            <Caption tone="mute" className="mb-4">
              Whisper-warm neutrals
            </Caption>
            <div className="grid grid-cols-2 gap-5 sm:grid-cols-4 lg:grid-cols-6">
              {NEUTRAL_SCALE.map((c) => (
                <ColorChip key={c.token} data={c} />
              ))}
            </div>
          </div>

          <div>
            <Caption tone="mute" className="mb-4">
              Semantic — minimal by design
            </Caption>
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
              {SEMANTIC_FAMILY.map((c) => (
                <ColorChip key={c.token} data={c} />
              ))}
            </div>
            <p className="mt-4 max-w-[68ch] text-sm text-[var(--color-text-muted)]">
              No warning. No info. We resist proliferation. Use prose, bold
              weight, or a neutral-900 callout block instead.
            </p>
          </div>

          <div>
            <Caption tone="mute" className="mb-4">
              Surface assignments
            </Caption>
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
              {SURFACE_ASSIGNMENTS.map((c) => (
                <ColorChip key={c.token} data={c} />
              ))}
            </div>
            <p className="mt-4 max-w-[68ch] text-sm text-[var(--color-text-muted)]">
              These are aliases that point at neutrals or GridRed. Components
              should reference the semantic alias{" "}
              <CodeToken>{"var(--color-text-body)"}</CodeToken> rather than the
              raw step{" "}
              <CodeToken>{"var(--color-neutral-700)"}</CodeToken> so the
              mapping can be remapped centrally.
            </p>
          </div>
        </div>
      </SystemBlock>

      {/* ----------------- Typography ----------------- */}
      <SystemBlock
        id="typography"
        eyebrow="02 · Typography"
        title="Three families. One ratio. Every step earns its place."
        caption="Clash Grotesk Semibold for display. Inter for body and UI. Geist Mono for specs, labels, numbers. Scale ratio 1.333 (Perfect Fourth). Every claim earns its place — no filler latin in this page or any page that ships."
      >
        <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-neutral-50)] px-6 lg:px-10">
          {TYPE_SCALE.map((s) => (
            <TypeSample key={s.token} data={s} />
          ))}
        </div>

        <div className="mt-12">
          <Caption tone="mute" className="mb-4">
            Mono — labels and specs
          </Caption>
          <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-neutral-50)] px-6 lg:px-10">
            {MONO_SCALE.map((s) => (
              <TypeSample key={s.token + s.sample} data={s} />
            ))}
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-neutral-50)] p-6">
            <Caption tone="mute" className="mb-3">
              Line height
            </Caption>
            <dl className="space-y-1 font-mono text-xs text-[var(--color-text-body)]">
              <Row term="--leading-display" value="1.05" />
              <Row term="--leading-section" value="1.15" />
              <Row term="--leading-body" value="1.625" />
              <Row term="--leading-ui" value="1.20" />
              <Row term="--leading-mono" value="1.40" />
            </dl>
          </div>
          <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-neutral-50)] p-6">
            <Caption tone="mute" className="mb-3">
              Letter spacing
            </Caption>
            <dl className="space-y-1 font-mono text-xs text-[var(--color-text-body)]">
              <Row term="--tracking-display" value="-0.03em" />
              <Row term="--tracking-heading" value="-0.02em" />
              <Row term="--tracking-body" value="0em" />
              <Row term="--tracking-mono-label" value="0.08em" />
              <Row term="--tracking-button" value="-0.01em" />
            </dl>
          </div>
          <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-neutral-50)] p-6">
            <Caption tone="mute" className="mb-3">
              Rules
            </Caption>
            <ul className="space-y-2 text-xs text-[var(--color-text-body)]">
              <li>Body line length capped at 65 to 75ch.</li>
              <li>Optical sizing on for Inter and Geist Mono.</li>
              <li>No em dashes anywhere on the site.</li>
            </ul>
          </div>
        </div>
      </SystemBlock>

      {/* ----------------- Spacing ----------------- */}
      <SystemBlock
        id="spacing"
        eyebrow="03 · Spacing"
        title="Vary the rhythm. Never uniform padding."
        caption="Base unit 4px. Within a page, alternate between space-20 and space-32 sections to keep the eye moving. Three same-padding sections in a row reads as a wall."
      >
        <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-neutral-50)] px-6 lg:px-10">
          {SPACING_SCALE.map((s) => (
            <SpacingRuler key={s.token} data={s} maxRem={maxSpacingRem} />
          ))}
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-neutral-50)] p-6">
            <Caption tone="mute" className="mb-3">
              Section padding by type
            </Caption>
            <dl className="space-y-2 text-sm">
              <Row term="Hero" value="space-32 to space-48" tone="body" />
              <Row term="Standard" value="space-20 to space-24" tone="body" />
              <Row term="Compact" value="space-12 to space-16" tone="body" />
              <Row term="Inline" value="space-8" tone="body" />
            </dl>
          </div>
          <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-neutral-50)] p-6">
            <Caption tone="mute" className="mb-3">
              Grid gutters
            </Caption>
            <dl className="space-y-2 text-sm">
              <Row term="Mobile" value="16px" tone="body" />
              <Row term="Tablet" value="24px" tone="body" />
              <Row term="Desktop" value="32px" tone="body" />
            </dl>
          </div>
        </div>
      </SystemBlock>

      {/* ----------------- Radii ----------------- */}
      <SystemBlock
        id="radii"
        eyebrow="04 · Radii"
        title="Subtle. Sharp end of the spectrum."
        caption="Buttons sit at 4px. Inputs at 2px. Cards at 6px. Anything pillowier reads consumer-y. Radius-2xl is reserved for image masks. Radius-full only for pills, tags, avatars."
      >
        <div>
          <Caption tone="mute" className="mb-4">
            Small to medium
          </Caption>
          <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-6">
            {RADII_SMALL.map((r) => (
              <RadiusSample key={r.token} data={r} />
            ))}
          </div>
        </div>

        <div className="mt-12">
          <Caption tone="mute" className="mb-4">
            Large and pill
          </Caption>
          <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
            {RADII_LARGE.map((r) => (
              <RadiusSample key={r.token} data={r} large />
            ))}
          </div>
        </div>
      </SystemBlock>

      {/* ----------------- Motion ----------------- */}
      <SystemBlock
        id="motion"
        eyebrow="05 · Motion"
        title="Expressive-professional. No bounce. No scroll-jacking."
        caption="Motion lives on hero text, scroll reveals, card hovers, CTA hover, and mega-menu open. It does not live on body text, footers, forms, spec tables, or logos. Choose an easing and a duration, press Play."
      >
        <MotionDemo />

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-neutral-50)] p-6">
            <Caption tone="mute" className="mb-3">
              Where motion lives
            </Caption>
            <ul className="space-y-2 text-sm text-[var(--color-text-body)]">
              <li>Hero text on first paint (word stagger fade-up).</li>
              <li>Section reveals on scroll-into-view (fade-up, 60-100px below viewport).</li>
              <li>Card hovers (4-6px translateY, 200ms).</li>
              <li>Primary CTA hover (1.02 scale, 200ms).</li>
              <li>Nav mega-menu open / close (180ms).</li>
              <li>Image reveals on scroll (clip-path masks).</li>
            </ul>
          </div>
          <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-neutral-50)] p-6">
            <Caption tone="mute" className="mb-3">
              Bans
            </Caption>
            <ul className="space-y-2 text-sm text-[var(--color-text-body)]">
              <li>No bounce, no spring-back, no elastic.</li>
              <li>No scroll-jacking. The visitor controls scroll speed.</li>
              <li>No parallax that misaligns content.</li>
              <li>Never animate width, height, top, left, padding, margin.</li>
              <li>No animated counters on stats.</li>
              <li>No floating shapes, morphing blobs, orbiting orbs.</li>
            </ul>
          </div>
        </div>
      </SystemBlock>
    </SystemPageShell>
  );
}

// ----------------------------------------------------------------------------
// Helpers
// ----------------------------------------------------------------------------

function Row({
  term,
  value,
  tone = "mono",
}: {
  term: string;
  value: string;
  tone?: "mono" | "body";
}) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <dt
        className={
          tone === "mono"
            ? "font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--color-text-muted)]"
            : "text-sm text-[var(--color-text-body)]"
        }
      >
        {term}
      </dt>
      <dd
        className={
          tone === "mono"
            ? "font-mono text-xs text-[var(--color-text-body)]"
            : "font-mono text-xs text-[var(--color-text-heading)]"
        }
      >
        {value}
      </dd>
    </div>
  );
}
