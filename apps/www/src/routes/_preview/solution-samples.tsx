/*
  /preview/solution-samples — compare three light design directions for the
  solution pages, across two routes (Homes / Offices). Pick a Route and a
  Direction; the full page renders below in the real site chrome.

  Sample content only — numbers/specs are placeholders flagged with <Gated>.
  Internal route: noindex.
*/

import type { MetaFunction } from "react-router";
import { useState } from "react";
import { GlobalHeader } from "../../components/site/GlobalHeader";
import { SiteFooter } from "../../components/site/SiteFooter";
import { tokens } from "./_v3-tokens";
import { SamplePage } from "../../components/solutions/light/SamplePage";
import { SolutionDock, type DockLink } from "../../components/solutions/light/SolutionDock";
import { DIRECTION_LIST, type DirectionKey, DIRECTIONS, FONT, MONO } from "../../components/solutions/light/directions";
import { SAMPLE_CONTENT, type SampleRouteKey } from "./_sample-data";

export const meta: MetaFunction = () => [
  { title: "Solution page samples — GridEnergy (internal)" },
  { name: "robots", content: "noindex" },
];

const ROUTES: { key: SampleRouteKey; label: string }[] = [
  { key: "homes", label: "Homes" },
  { key: "offices", label: "Offices & Industrial" },
];

const DOCK_LINKS: DockLink[] = [
  { id: "range", label: "Range" },
  { id: "what", label: "System" },
  { id: "outcomes", label: "Outcomes" },
  { id: "compare", label: "Compare" },
  { id: "money", label: "Economics" },
  { id: "faq", label: "FAQ" },
];

const DOCK_META: Record<SampleRouteKey, { label: string; cta: { label: string; to: string } }> = {
  homes: { label: "Home storage", cta: { label: "Book a survey", to: "/contact" } },
  offices: { label: "Offices & Industrial", cta: { label: "Get a quote", to: "/contact" } },
};

export default function SolutionSamples() {
  const [route, setRoute] = useState<SampleRouteKey>("homes");
  const [dir, setDir] = useState<DirectionKey>("aurora");
  const direction = DIRECTIONS[dir];
  const content = SAMPLE_CONTENT[route];

  return (
    <div style={{ fontFamily: FONT, background: tokens.pageBg, minHeight: "100vh" }}>
      {/* control bar */}
      <div style={{ position: "sticky", top: 0, zIndex: 60, background: "oklch(98.8% 0.003 106.5 / 0.85)", backdropFilter: "saturate(180%) blur(12px)", borderBottom: `1px solid ${tokens.hairline}` }}>
        <div style={{ maxWidth: 1200, marginInline: "auto", paddingInline: 28, paddingBlock: 12, display: "flex", flexWrap: "wrap", gap: 18, alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 18, alignItems: "center" }}>
            <Segment label="Route" options={ROUTES.map((r) => ({ key: r.key, label: r.label }))} value={route} onChange={(k) => setRoute(k as SampleRouteKey)} />
            <Segment label="Direction" options={DIRECTION_LIST.map((d) => ({ key: d.key, label: d.name }))} value={dir} onChange={(k) => setDir(k as DirectionKey)} />
          </div>
          <p style={{ fontFamily: MONO, fontSize: 11, color: tokens.muted, letterSpacing: "0.04em" }}>
            {direction.name} · {direction.reference}
          </p>
        </div>
        <div style={{ maxWidth: 1200, marginInline: "auto", paddingInline: 28, paddingBottom: 12 }}>
          <p style={{ fontFamily: FONT, fontSize: 12.5, color: tokens.muted, lineHeight: 1.5 }}>{direction.blurb}</p>
        </div>
      </div>

      {/* real site header for full-page fidelity */}
      <div className="hidden lg:contents">
        <GlobalHeader />
      </div>

      {/* the sample page, re-keyed so motion re-runs on switch */}
      <SamplePage key={`${route}-${dir}`} d={direction} content={content} />

      {/* floating bottom section-nav (Rivian-style, our language) */}
      <SolutionDock key={`dock-${route}`} label={DOCK_META[route].label} links={DOCK_LINKS} cta={DOCK_META[route].cta} />

      <SiteFooter />
    </div>
  );
}

function Segment({ label, options, value, onChange }: { label: string; options: { key: string; label: string }[]; value: string; onChange: (k: string) => void }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <span style={{ fontFamily: MONO, fontSize: 10.5, fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: tokens.inkMuted }}>{label}</span>
      <div style={{ display: "inline-flex", padding: 3, gap: 3, background: tokens.pageBgDeep, border: `1px solid ${tokens.hairline}`, borderRadius: 10 }}>
        {options.map((o) => {
          const on = o.key === value;
          return (
            <button
              key={o.key}
              type="button"
              onClick={() => onChange(o.key)}
              style={{
                fontFamily: FONT, fontSize: 13, fontWeight: 600, cursor: "pointer",
                padding: "6px 13px", borderRadius: 7, border: "1px solid transparent",
                background: on ? tokens.card : "transparent",
                color: on ? tokens.ink : tokens.muted,
                borderColor: on ? tokens.hairlineStrong : "transparent",
                boxShadow: on ? "0 1px 2px oklch(15.3% 0.006 107.1 / 0.06)" : "none",
                transition: "background .15s ease, color .15s ease",
              }}
            >
              {o.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
