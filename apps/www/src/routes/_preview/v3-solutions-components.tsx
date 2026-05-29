import { Link } from "react-router-dom";

import { tokens } from "./_v3-tokens";

import SectionTop from "./_v3-solutions/section-top";
import SectionDetail from "./_v3-solutions/section-detail";
import SectionClose from "./_v3-solutions/section-close";

/*
  Showcase route for the v3 solutions-space component library.
  Composes three section files (Clusters A / B / C) built by parallel sub-agents
  per the 8-reference audit synthesis.
*/

export default function V3SolutionsComponents() {
  return (
    <div
      className="v3-page"
      style={{
        background: tokens.pageBg,
        color: tokens.body,
        fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
        minHeight: "100vh",
      }}
    >
      <style>{`
        .v3-page ::selection { background: ${tokens.brand}; color: #ffffff; }
        .v3-page ::-moz-selection { background: ${tokens.brand}; color: #ffffff; }
        .v3-page :is(h1, h2, h3, h4, h5, h6) {
          font-family: var(--font-body);
          font-weight: 600;
          font-optical-sizing: auto;
        }
        .v3-page .v3-display {
          font-family: var(--font-display);
          font-weight: 600;
        }
      `}</style>

      <PreviewHeader />

      <main>
        <ShowcaseHeader />

        <ClusterDivider
          kicker="CLUSTER A · TOP OF PAGE"
          title="Audience entry, in-page switching, ROI, trust"
          components={["AudienceHero", "InPageAudienceTabs", "ROICalculator", "TrustStrip"]}
        />
        <SectionTop />

        <ClusterDivider
          kicker="CLUSTER B · DETAIL BLOCKS"
          title="Product detail, specs, install, gallery, platform"
          components={[
            "ProductHero",
            "SpecTable",
            "WhatsInBox",
            "InstallTimeline",
            "GalleryStrip",
            "GridOSCallout",
          ]}
        />
        <SectionDetail />

        <ClusterDivider
          kicker="CLUSTER C · SOCIAL PROOF + CLOSE"
          title="Case study, subsidy, FAQ, final CTA"
          components={["CaseStudyCard", "SubsidyBlock", "FAQAccordion", "CTABanner"]}
        />
        <SectionClose />

        <Footer />
      </main>
    </div>
  );
}

function PreviewHeader() {
  return (
    <header
      className="px-8 py-3 flex items-center gap-6"
      style={{ background: tokens.ink, color: "white" }}
    >
      <Link
        to="/preview"
        className="text-[11px] tracking-[0.12em] uppercase opacity-70 hover:opacity-100"
      >
        ← all previews
      </Link>
      <div className="h-4 w-px" style={{ background: "rgba(255,255,255,0.2)" }} />
      <span
        className="text-[11px] tracking-[0.12em] uppercase"
        style={{ color: tokens.brand, fontWeight: 700 }}
      >
        V3 · SOLUTIONS COMPONENTS
      </span>
      <span className="text-[13px] font-medium">
        14 modular blocks across 3 clusters — composable per solution page
      </span>
      <span className="ml-auto text-[11px] tracking-[0.08em] uppercase opacity-50">
        /preview/v3-solutions-components
      </span>
    </header>
  );
}

function ShowcaseHeader() {
  return (
    <section className="mx-auto max-w-[1200px] px-8 pt-16 pb-10">
      <div className="flex items-center gap-2 mb-4">
        <span style={{ width: 6, height: 6, borderRadius: 999, background: tokens.brand }} />
        <span
          className="text-[10px] uppercase tracking-[0.16em]"
          style={{ color: tokens.brand, fontWeight: 700 }}
        >
          SOLUTIONS SPACE · COMPONENT LIBRARY
        </span>
        <span style={{ width: 1, height: 10, background: tokens.hairlineStrong }} />
        <span
          className="text-[10px] uppercase tracking-[0.12em]"
          style={{ color: tokens.muted, fontWeight: 600 }}
        >
          v3.01 · 2026-05-16
        </span>
      </div>
      <h1
        className="v3-display text-[56px] tracking-[-0.03em] leading-[1.02] mb-5"
        style={{ color: tokens.ink }}
      >
        Fourteen modular blocks.<br />
        One register.
      </h1>
      <p className="text-[15px] leading-[1.6] max-w-[64ch]" style={{ color: tokens.body }}>
        Synthesized from the 8-reference audit (Tesla Powerwall / Megapack, Enphase IQ Battery,
        Span Panel, Stripe Payments, Vercel Edge Network, Fold.money, Meter). Every block reads from
        the same olive substrate, the same GridRed spark, the same hairline grammar. Compose them
        in different orders per audience page and the essence stays consistent while the emphasis
        shifts.
      </p>

      <div className="grid grid-cols-3 gap-3 mt-8">
        <Kpi label="COMPONENTS" value="14" sub="across 3 clusters" />
        <Kpi label="REFERENCES AUDITED" value="8" sub="Tesla → Fold" />
        <Kpi label="SHARED TOKENS" value="12" sub="olive + GridRed" />
      </div>
    </section>
  );
}

function Kpi({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div
      className="px-5 py-4"
      style={{
        background: tokens.card,
        border: `1px solid ${tokens.hairline}`,
        borderRadius: 14,
      }}
    >
      <p
        className="text-[10px] uppercase tracking-[0.14em] mb-1.5"
        style={{ color: tokens.muted, fontWeight: 700 }}
      >
        {label}
      </p>
      <p
        className="text-[28px] font-bold tracking-[-0.02em] leading-none"
        style={{ color: tokens.ink }}
      >
        {value}
      </p>
      <p className="text-[11px] mt-1.5" style={{ color: tokens.inkMuted }}>
        {sub}
      </p>
    </div>
  );
}

function ClusterDivider({
  kicker,
  title,
  components,
}: {
  kicker: string;
  title: string;
  components: string[];
}) {
  return (
    <section
      style={{
        background: tokens.pageBgDeep,
        borderTop: `1px solid ${tokens.hairline}`,
        borderBottom: `1px solid ${tokens.hairline}`,
      }}
    >
      <div className="mx-auto max-w-[1200px] px-8 py-8">
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <div>
            <div className="flex items-center gap-2 mb-2.5">
              <span
                style={{ width: 6, height: 6, borderRadius: 999, background: tokens.brand }}
              />
              <span
                className="text-[10px] uppercase tracking-[0.16em]"
                style={{ color: tokens.brand, fontWeight: 700 }}
              >
                {kicker}
              </span>
            </div>
            <h2
              className="text-[24px] tracking-[-0.02em] leading-tight"
              style={{ color: tokens.ink }}
            >
              {title}
            </h2>
          </div>
          <ul className="flex items-center gap-1.5 flex-wrap">
            {components.map((c) => (
              <li key={c}>
                <code
                  className="text-[11px]"
                  style={{
                    background: tokens.card,
                    color: tokens.ink,
                    fontFamily: "var(--font-mono)",
                    padding: "4px 10px",
                    borderRadius: 8,
                    border: `1px solid ${tokens.hairline}`,
                  }}
                >
                  {c}
                </code>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer
      style={{
        borderTop: `1px solid ${tokens.hairline}`,
        background: tokens.pageBgDeep,
      }}
    >
      <div className="mx-auto max-w-[1200px] px-8 py-10">
        <div className="flex items-center justify-between text-[11px]" style={{ color: tokens.muted }}>
          <span className="uppercase tracking-[0.14em]" style={{ fontWeight: 600 }}>
            v3 solutions component library · ready to compose into per-audience landings
          </span>
          <div className="flex items-center gap-3">
            <Link
              to="/preview/v3-megamenu-impeccable"
              className="text-[11px] uppercase tracking-[0.12em] font-semibold"
              style={{ color: tokens.ink }}
            >
              v3 · mega menu (impeccable)
            </Link>
            <span style={{ width: 1, height: 10, background: tokens.hairlineStrong }} />
            <Link
              to="/preview/v3-website"
              className="text-[11px] uppercase tracking-[0.12em] font-semibold"
              style={{ color: tokens.ink }}
            >
              v3 · website
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
