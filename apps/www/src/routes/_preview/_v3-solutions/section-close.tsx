import { tokens } from "../_v3-tokens";
import { CaseStudyCard } from "../../../components/solutions/CaseStudyCard";
import { SubsidyBlock } from "../../../components/solutions/SubsidyBlock";
import { FAQAccordion } from "../../../components/solutions/FAQAccordion";
import { CTABanner } from "../../../components/solutions/CTABanner";

/* ------------------------------------------------------------------ */
/*  Demo data — Homes audience, Pune-02 case study                    */
/* ------------------------------------------------------------------ */

const caseStudy = {
  image: "/images/solutions/pune-02-esa.jpg",
  imageAlt: "ATLAS-03 ESS unit installed on rooftop of Pune-02 apartment complex",
  kicker: "PUNE-02 · APARTMENT RWA",
  metrics: [
    { label: "Payback", value: "24 mo", sub: "vs 48 mo category avg" },
    { label: "kWh / day", value: "142", sub: "avg across 312 days" },
    { label: "Bill delta", value: "−38%", sub: "vs pre-install baseline" },
  ],
  quote:
    "We compared three vendors. GridEnergy was the only one that showed us the payback math before asking for a deposit. The GridOS console does exactly what they promised — daily meter reads, no surprises.",
  attribution: {
    name: "Prasad Kulkarni",
    role: "Secretary",
    org: "Emerald Heights Co-operative Housing Society, Pune",
  },
};

const subsidy = {
  scheme: "PMS (Pradhan Mantri Suryodaya Yojana)",
  amount: "Up to 60%",
  description:
    "Central government subsidy for rooftop solar + battery storage systems in residential and institutional buildings. Stacks with Maharashtra state top-up for qualifying RWA installs above 10 kW.",
  eligibility: [
    "Residential Welfare Association (RWA) or individual owner-occupier",
    "Sanctioned load above 5 kW or system size above 3 kWp",
    "Property with valid Occupation Certificate (OC)",
    "No existing net-metering subsidy claim in the last 5 years",
    "Install through a MNRE-empanelled vendor (GridEnergy is empanelled)",
  ],
  documentsHelp:
    "We handle the DISCOM application, MNRE empanelment verification, and inspection scheduling. You provide the OC copy, share certificate, and society resolution — we take care of the rest.",
  ctaLabel: "Check your eligibility",
  ctaHref: "#subsidy-check",
};

const faqItems = [
  {
    q: "How long does a typical Homes install take from site survey to commissioning?",
    a: "12 to 18 days for most apartment ESS installs. Site survey and load audit on day 1–2. Equipment lead time is 5–7 days. Installation and commissioning is 2–3 days. GridOS is live the day commissioning completes — daily meter reads start immediately.",
  },
  {
    q: "What happens if the battery degrades faster than the payback model assumed?",
    a: "Every install ships with a 10-year capacity warranty: the battery will deliver at least 80% of rated capacity at year 10 or we replace the cells at no cost. The GridOS payback timeline updates in real time as actual throughput data accumulates — it is not a static projection.",
  },
  {
    q: "Can the system run the flat during a grid outage?",
    a: "Yes, with the automatic transfer switch (ATS) option. During a grid outage the system islands within 20ms. Essential circuits (lights, fans, fridge, router) stay live. Air conditioning requires a higher inverter tier — your site audit will specify which configuration covers your load.",
  },
  {
    q: "We already have solar panels. Can GridEnergy retrofit storage onto an existing system?",
    a: "In most cases, yes. We assess the existing inverter make, model, and grid-tie configuration. AC-coupled retrofit works with any solar inverter. DC-coupled retrofit (higher efficiency) requires a compatible hybrid inverter — we quote both options with payback deltas.",
  },
  {
    q: "Is GridOS accessible to all society members or only the RWA admin?",
    a: "Role-based access: the RWA secretary gets the full operator view (meter reads, fault flags, billing reconciliation). Individual flat-owners can opt into a read-only consumption view for their circuit. The society admin controls access provisioning.",
  },
  {
    q: "What does the early-access commitment actually involve?",
    a: "No payment at this stage. You provide your site load (from your electricity bill) and tariff slab. Within 48 hours we send a sized stack, payback timeline, and a live sample GridOS console seeded with your site parameters. A site survey is the next step only if you want to proceed.",
  },
];

/* ------------------------------------------------------------------ */
/*  Section labels (demo chrome, not part of the components)           */
/* ------------------------------------------------------------------ */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="flex items-center gap-3 mb-4"
      style={{ fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif" }}
    >
      <span
        className="text-[10px] uppercase tracking-[0.16em] font-semibold px-3 py-1"
        style={{
          background: tokens.pageBgDeep,
          color: tokens.inkMuted,
          borderRadius: 999,
          border: `1px solid ${tokens.hairline}`,
        }}
      >
        {children}
      </span>
      <span style={{ flex: 1, height: 1, background: tokens.hairline }} />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Section heading atom (used inside demo for FAQ + CTA)              */
/* ------------------------------------------------------------------ */

function SectionHeading({ kicker, headline }: { kicker: string; headline: string }) {
  return (
    <div className="mb-6" style={{ fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif" }}>
      <div className="flex items-center gap-2 mb-3">
        <span style={{ width: 6, height: 6, borderRadius: 999, background: tokens.brand }} />
        <span
          className="text-[10px] uppercase tracking-[0.16em]"
          style={{ color: tokens.brand, fontWeight: 700 }}
        >
          {kicker}
        </span>
      </div>
      <h2
        className="text-[32px] font-semibold tracking-[-0.025em] leading-[1.05]"
        style={{ color: tokens.ink }}
      >
        {headline}
      </h2>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Demo component                                                     */
/* ------------------------------------------------------------------ */

/**
 * SectionClose — demo of CLUSTER C social-proof + close components.
 * Stacks CaseStudyCard → SubsidyBlock → FAQAccordion → CTABanner.
 * Wire into a preview route; do not compose into App.tsx directly.
 */
export default function SectionClose() {
  return (
    <div
      style={{
        background: tokens.pageBg,
        color: tokens.body,
        fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
        minHeight: "100vh",
      }}
    >
      {/* ── Preview header ── */}
      <header
        className="px-8 py-3 flex items-center gap-6"
        style={{ background: tokens.ink, color: "white" }}
      >
        <span className="text-[11px] tracking-[0.12em] uppercase opacity-70">
          GridEnergy · v3 Solutions
        </span>
        <div style={{ width: 1, height: 16, background: "rgba(255,255,255,0.2)" }} />
        <span
          className="text-[11px] tracking-[0.12em] uppercase font-bold"
          style={{ color: tokens.brand }}
        >
          CLUSTER C · SOCIAL-PROOF + CLOSE
        </span>
        <span className="ml-auto text-[11px] tracking-[0.08em] uppercase opacity-50">
          /preview/v3-solutions/section-close
        </span>
      </header>

      {/* ── Global v3 CSS vars ── */}
      <style>{`
        .v3-display {
          font-family: var(--font-display, "Clash Grotesk", ui-sans-serif, system-ui, sans-serif);
          font-weight: 600;
        }
      `}</style>

      <div className="mx-auto max-w-[1280px] px-8 py-16 flex flex-col gap-16">

        {/* ── 1. CaseStudyCard ── */}
        <section>
          <SectionLabel>CaseStudyCard</SectionLabel>
          <SectionHeading
            kicker="01 · HOMES · CASE STUDY"
            headline="26 months to payback. No surprises."
          />
          <CaseStudyCard {...caseStudy} />
        </section>

        {/* ── 2. SubsidyBlock ── */}
        <section>
          <SectionLabel>SubsidyBlock</SectionLabel>
          <SectionHeading
            kicker="GOVERNMENT SUPPORT"
            headline="60% of your install cost may be subsidised."
          />
          <SubsidyBlock {...subsidy} />
        </section>

        {/* ── 3. FAQAccordion ── */}
        <section>
          <SectionLabel>FAQAccordion</SectionLabel>
          <SectionHeading
            kicker="FREQUENTLY ASKED"
            headline="The questions every buyer actually has."
          />
          <FAQAccordion items={faqItems} defaultOpen={0} />
        </section>

        {/* ── 4. CTABanner — ink variant (default) ── */}
        <section>
          <SectionLabel>CTABanner — variant: ink (default)</SectionLabel>
          <CTABanner
            variant="ink"
            kicker="EARLY ACCESS · 2,140 ON WAITLIST"
            headline={`Start with the math.\nWe'll bring the asset.`}
            lead="Give us your site load and tariff. We'll send back a sized stack, payback timeline, and a sample GridOS console for your site within 48 hours. No deposit required."
            primaryCta={{ label: "Get early access", href: "#waitlist" }}
            secondaryLink={{ label: "Read the whitepaper", href: "#whitepaper" }}
          />
        </section>

        {/* ── 5. CTABanner — olive variant ── */}
        <section>
          <SectionLabel>CTABanner — variant: olive</SectionLabel>
          <CTABanner
            variant="olive"
            kicker="HOMES · PMS SCHEME CLOSES MARCH 2027"
            headline={`Subsidy eligibility expires.\nApply before the window closes.`}
            lead="Your RWA may qualify for up to 60% central subsidy under PMS. We run the eligibility check, handle the DISCOM application, and send a subsidised payback projection within 48 hours."
            primaryCta={{ label: "Check eligibility", href: "#subsidy-check" }}
            secondaryLink={{ label: "See scheme details", href: "#subsidy-details" }}
          />
        </section>

      </div>
    </div>
  );
}
