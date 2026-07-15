import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  SystemPageShell,
  SystemBlock,
} from "@/components/system/SystemPageShell";
import { Caption, CodeToken } from "@/components/system/Caption";
import { cn } from "@/lib/utils";

/*
  /system/cards.

  Cards are the lazy answer. We use them only when they are truly the best
  affordance, and we vary size to break the identical-grid trap.
  This page documents three things:
    - surface variants (on-page vs on-section)
    - composition slots (header / content / footer)
    - bento patterns (1x + 2x + 4x) that are blessed for marketing pages
    - hover treatment (translateY, no shadow)
*/

export default function CardsRoute() {
  return (
    <SystemPageShell
      eyebrow="System · Cards"
      title="Bento with variance. Never an identical grid."
      lede="A card is a small surface that holds a single idea. When five ideas need to live in the same row, we vary their size so the eye finds the lead. Identical grids of cards are the SaaS cliché — we refuse them on principle."
    >
      {/* ---------------- Surfaces ---------------- */}
      <SystemBlock
        id="surfaces"
        eyebrow="01 · Surfaces"
        title="Card-on-page is neutral-100. Card-on-section is neutral-50."
        caption="Cards always provide at least one half-step of contrast against the surface they sit on. On the neutral-50 page background, cards use neutral-100. On a neutral-100 section, they flip to neutral-50."
      >
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <SurfaceFrame
            label="On neutral-50 page"
            background="var(--color-neutral-50)"
          >
            <Card surface="on-page">
              <CardHeader>
                <Caption tone="mute" as="span" className="mb-2">
                  ATLAS 215
                </Caption>
                <CardTitle>Liquid-cooled commercial battery.</CardTitle>
                <CardDescription>
                  215 kWh per cabinet. Stack to 860 kWh per cluster. Monsoon-tested
                  IP54 enclosure rated for outdoor coastal deployments.
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button variant="ghost" size="sm">
                  See the spec sheet
                </Button>
              </CardFooter>
            </Card>
            <p className="mt-4 max-w-[36ch] text-xs text-[var(--color-text-muted)]">
              Card uses neutral-100 background. Hairline neutral-300 border.
            </p>
          </SurfaceFrame>

          <SurfaceFrame
            label="On neutral-100 section"
            background="var(--color-neutral-100)"
          >
            <Card surface="on-section">
              <CardHeader>
                <Caption tone="mute" as="span" className="mb-2">
                  HARBOR 22
                </Caption>
                <CardTitle>Hospitality wallbox.</CardTitle>
                <CardDescription>
                  22 kW AC. Tap-to-charge with UPI payouts. Hotel-branded
                  customer flow. Designed for porte cocheres and resort
                  drop-offs.
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button variant="ghost" size="sm">
                  See the spec sheet
                </Button>
              </CardFooter>
            </Card>
            <p className="mt-4 max-w-[36ch] text-xs text-[var(--color-text-muted)]">
              Card flips to neutral-50 background. Same hairline border.
            </p>
          </SurfaceFrame>
        </div>
      </SystemBlock>

      {/* ---------------- Composition slots ---------------- */}
      <SystemBlock
        id="composition"
        eyebrow="02 · Composition"
        title="Header, content, footer. Use what serves the idea."
        caption="A card never holds more than one idea. If you reach for a second heading, the card is wrong — split it into two. Slots are scaffolding, not a checklist; skip any that earns no place on the surface."
      >
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <Card surface="on-page">
            <CardHeader>
              <CardTitle>Minimal</CardTitle>
              <CardDescription>
                Title and description only. Used in dense bento rows.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card surface="on-page">
            <CardHeader>
              <Caption tone="mute" as="span" className="mb-2">
                Eyebrow
              </Caption>
              <CardTitle>Eyebrowed</CardTitle>
              <CardDescription>
                Mono label above the title. Used for product family names
                (ATLAS, HARBOR) or section types.
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button variant="ghost" size="sm">
                Read more
              </Button>
            </CardFooter>
          </Card>

          <Card surface="on-page">
            <CardHeader>
              <CardTitle>With content slot</CardTitle>
              <CardDescription>
                Stat strip in the content slot for a quick-glance summary.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <dl className="grid grid-cols-2 gap-x-6 gap-y-2 text-xs">
                <Stat label="Capacity" value="215 kWh" />
                <Stat label="Payback" value="22 mo" />
                <Stat label="IRR" value="21%" />
                <Stat label="Cooling" value="Liquid" />
              </dl>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm">
                See the spec sheet
              </Button>
            </CardFooter>
          </Card>
        </div>
      </SystemBlock>

      {/* ---------------- Bento ---------------- */}
      <SystemBlock
        id="bento"
        eyebrow="03 · Bento patterns"
        title="One large, four small. The default."
        caption="A bento has one anchor and several supporting tiles. The anchor takes 2x or 4x the area of a supporting tile. We rotate which tile leads to keep pages from feeling like a printed catalogue."
      >
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 lg:row-span-2">
            <HeroBentoTile />
          </div>
          <SupportingTile
            eyebrow="ATLAS 215"
            title="215 kWh"
            description="Liquid-cooled commercial battery. Stack to 860 kWh per cluster."
          />
          <SupportingTile
            eyebrow="HARBOR 22"
            title="22 kW AC"
            description="Hospitality wallbox. Tap-to-charge. UPI payouts."
          />
          <SupportingTile
            eyebrow="GRIDOS PLATFORM"
            title="Open by default"
            description="OCPP 1.6+2.0.1, MQTT, MODBUS. No premium tier for the protocol."
          />
          <SupportingTile
            eyebrow="GRIDPULSE"
            title="One console"
            description="Operators run 30 sites without leaving their seat."
          />
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-4">
          <SupportingTile
            eyebrow="Homes"
            title="Rooftop + battery"
            description="3 to 10 kWh systems. Diesel-free monsoon backup."
          />
          <FeaturedQuoteTile className="lg:col-span-2" />
          <SupportingTile
            eyebrow="Industrial"
            title="Demand-charge mgmt"
            description="Container ESS for factory peak shaving."
          />
        </div>
      </SystemBlock>

      {/* ---------------- Hover ---------------- */}
      <SystemBlock
        id="hover"
        eyebrow="04 · Hover"
        title="Translate up 4px. Tint the border. Never a shadow."
        caption="Cards with a hover target raise 4 to 6px and deepen the border by one step. They never lift on a drop shadow — DESIGN.md is explicit. Hover lives on transform and border-color, the two properties motion can animate without layout shift."
      >
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <HoverCard
            eyebrow="At rest"
            title="Card default"
            description="Hairline neutral-300 border. Neutral-100 surface on this page."
            hover={false}
          />
          <HoverCard
            eyebrow="On hover (simulated)"
            title="Card hover"
            description="Translate -4px on Y. Border deepens to neutral-400. 200ms ease-out."
            hover
          />
          <HoverCard
            eyebrow="As a link"
            title="With caret"
            description="The arrow nudges 2px right on hover to confirm the card is interactive."
            hover={false}
            linked
          />
        </div>
      </SystemBlock>

      {/* ---------------- Anti-patterns ---------------- */}
      <SystemBlock
        id="anti-patterns"
        eyebrow="05 · Anti-patterns"
        title="What a card is not."
        caption="Cards are the lazy default in modern web design. We hold them to a higher bar. These compositions are banned on principle."
      >
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <BanBlock
            title="Identical 3-column or 4-column grid"
            body="Six cards, same size, same icon-and-text layout, same hover. Indistinguishable from every SaaS landing page. Vary at least one dimension."
          />
          <BanBlock
            title="Nested card inside a card"
            body="If your card needs an inner card, the parent surface is wrong. Use a section background instead of nesting."
          />
          <BanBlock
            title="Drop shadow on hover"
            body="Shadows imply a pillowy z-axis lift. We use border-color and small translateY instead. Industrial-confident, not consumer-cushy."
          />
          <BanBlock
            title="Side-stripe accent border"
            body="A 4px GridRed strip down the left edge. Reads as a status badge from the early 2010s. Use a full hairline border, an eyebrow label, or nothing."
          />
        </div>
      </SystemBlock>
    </SystemPageShell>
  );
}

// ----------------------------------------------------------------------------
// Tile primitives
// ----------------------------------------------------------------------------

function SurfaceFrame({
  label,
  background,
  children,
}: {
  label: string;
  background: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div
        className="rounded-[var(--radius-md)] border border-[var(--color-border)] p-6 lg:p-10"
        style={{ backgroundColor: background }}
      >
        {children}
      </div>
      <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
        {label}
      </p>
    </div>
  );
}

function HeroBentoTile() {
  return (
    <article className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-neutral-900)] p-8 text-[var(--color-neutral-50)] lg:p-10">
      <div>
        <Caption
          tone="mute"
          className="text-[var(--color-neutral-400)]"
        >
          Platform · GridOS
        </Caption>
        <h3 className="mt-5 max-w-[18ch] font-display text-3xl font-semibold leading-[1.05] tracking-[-0.03em] text-[var(--color-neutral-50)] lg:text-4xl">
          One console. Thirty sites. No fourth dashboard.
        </h3>
        <p className="mt-5 max-w-[44ch] text-sm leading-[1.625] text-[var(--color-neutral-400)]">
          Open protocols are the floor, not a premium tier. GridOS speaks OCPP,
          MQTT, MODBUS, and exposes an OpenAPI. Operators run the network from
          their seat.
        </p>
      </div>

      <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-[var(--color-neutral-800)] pt-6 font-mono text-sm">
        <Stat label="Uptime" value="99.97%" inverse />
        <Stat label="Sites" value="30+" inverse />
        <Stat label="Protocols" value="6" inverse />
      </dl>
    </article>
  );
}

function SupportingTile({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <article className="flex h-full flex-col justify-between rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-neutral-100)] p-6">
      <div>
        <Caption tone="mute">{eyebrow}</Caption>
        <p className="mt-4 font-display text-2xl font-semibold leading-[1.15] tracking-[-0.02em] text-[var(--color-text-heading)]">
          {title}
        </p>
        <p className="mt-3 text-sm leading-[1.625] text-[var(--color-text-body)]">
          {description}
        </p>
      </div>
    </article>
  );
}

function FeaturedQuoteTile({ className }: { className?: string }) {
  return (
    <article
      className={cn(
        "flex h-full flex-col justify-between rounded-[var(--radius-md)] border border-[var(--color-gp-red)]/30 bg-[var(--color-gp-red-tinted)] p-6 lg:p-8",
        className,
      )}
    >
      <div>
        <Caption tone="brand">Hospitality · case study</Caption>
        <p className="mt-5 font-display text-2xl font-semibold leading-[1.2] tracking-[-0.02em] text-[var(--color-text-heading)]">
          Our porte cochere stopped being a cost centre. It is a parking
          revenue line now.
        </p>
        <p className="mt-5 text-sm text-[var(--color-text-muted)]">
          GM, mid-scale resort, Goa. Two HARBOR 22 wallboxes, 14 months
          live, 18% drivers convert into restaurant covers.
        </p>
      </div>
      <Button variant="ghost" size="sm" className="-ml-3 mt-6 self-start">
        Read the case study
      </Button>
    </article>
  );
}

function HoverCard({
  eyebrow,
  title,
  description,
  hover,
  linked,
}: {
  eyebrow: string;
  title: string;
  description: string;
  hover: boolean;
  linked?: boolean;
}) {
  return (
    <article
      className={cn(
        "flex h-full flex-col justify-between rounded-[var(--radius-md)] border bg-[var(--color-neutral-100)] p-6 transition-[transform,border-color] duration-200",
        hover
          ? "-translate-y-1 border-[var(--color-border-strong)]"
          : "border-[var(--color-border)] hover:-translate-y-1 hover:border-[var(--color-border-strong)]",
      )}
    >
      <div>
        <Caption tone="mute">{eyebrow}</Caption>
        <p className="mt-4 font-display text-xl font-semibold leading-[1.15] tracking-[-0.02em] text-[var(--color-text-heading)]">
          {title}
        </p>
        <p className="mt-3 text-sm leading-[1.625] text-[var(--color-text-body)]">
          {description}
        </p>
      </div>
      {linked ? (
        <div className="mt-5 inline-flex items-center gap-1.5 text-xs font-medium text-[var(--color-gp-red)]">
          <span>View</span>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M2 6h7m0 0L6 3m3 3-3 3"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      ) : null}
    </article>
  );
}

function Stat({
  label,
  value,
  inverse,
}: {
  label: string;
  value: string;
  inverse?: boolean;
}) {
  return (
    <div className="flex flex-col">
      <dt
        className={cn(
          "font-mono text-[10px] uppercase tracking-[0.08em]",
          inverse
            ? "text-[var(--color-neutral-400)]"
            : "text-[var(--color-text-muted)]",
        )}
      >
        {label}
      </dt>
      <dd
        className={cn(
          "mt-1 font-mono text-lg",
          inverse
            ? "text-[var(--color-neutral-50)]"
            : "text-[var(--color-text-heading)]",
        )}
      >
        {value}
      </dd>
    </div>
  );
}

function BanBlock({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-[var(--radius-md)] border border-[var(--color-form-error)]/30 bg-[oklch(0.52_0.15_25_/_0.04)] p-6">
      <Caption tone="mute" className="mb-3">
        Banned
      </Caption>
      <p className="font-display text-xl font-semibold leading-[1.15] tracking-[-0.02em] text-[var(--color-text-heading)]">
        {title}
      </p>
      <p className="mt-3 max-w-[44ch] text-sm leading-[1.625] text-[var(--color-text-body)]">
        {body}
      </p>
      <p className="mt-4">
        <CodeToken tone="mute">DESIGN.md · Absolute bans</CodeToken>
      </p>
    </div>
  );
}
