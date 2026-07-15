/*
  Blocks — the remaining canonical solution-page sections, in the same clean
  atoms language as Modules.tsx. Together (Blocks + Modules) these are the merged,
  single-language block library a solution page is assembled from. No brutal
  motifs, no gradients; olive + GridRed, honest by default.
*/

import { type ReactNode, type CSSProperties, useState } from "react";
import { Link } from "react-router";
import { Check, Minus, ArrowLeft, type Icon } from "@phosphor-icons/react";
import { Gated } from "../../marketing/Primitives";
import { Band, Wrap, Rise, Eyebrow, H2, Lead, Btn, Media, FONT, MONO, tokens } from "./atoms";

const autoGrid = (min: number, gap: number): CSSProperties => ({
  display: "grid",
  gridTemplateColumns: `repeat(auto-fit, minmax(min(100%, ${min}px), 1fr))`,
  gap,
});

/* ---- 1 · Hero (split) ---- */
export function SolutionHero({ eyebrow, title, sub, chips, primary, secondary, visual, back }: {
  eyebrow: string; title: string; sub: string; chips: string[];
  primary: { label: string; to: string }; secondary: { label: string; to: string }; visual: string;
  back?: { label: string; to: string };
}) {
  return (
    <section style={{ background: tokens.pageBg, paddingTop: 80, paddingBottom: 92, borderBottom: `1px solid ${tokens.hairline}` }}>
      <Wrap>
        <div style={{ ...autoGrid(380, 56), alignItems: "center" }}>
          <Rise>
            <div>
              {back && (
                <Link to={back.to} style={{ display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 16, fontFamily: FONT, fontSize: 13, fontWeight: 600, color: tokens.inkMuted, textDecoration: "none" }}>
                  <ArrowLeft size={13} weight="bold" />{back.label}
                </Link>
              )}
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "7px 14px", borderRadius: 999, background: tokens.card, border: `1px solid ${tokens.hairline}`, fontSize: 13, fontWeight: 600, color: tokens.body }}>
                <span aria-hidden style={{ width: 7, height: 7, borderRadius: 999, background: tokens.brand }} />{eyebrow}
              </span>
              <h1 style={{ fontFamily: FONT, color: tokens.ink, fontSize: "clamp(38px,5.2vw,60px)", fontWeight: 600, letterSpacing: "-0.035em", lineHeight: 1.02, marginTop: 22, textWrap: "balance" }}>{title}</h1>
              <p style={{ color: tokens.muted, fontSize: 19, lineHeight: 1.55, marginTop: 22, maxWidth: 500 }}>{sub}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 30 }}>
                <Btn to={primary.to}>{primary.label}</Btn>
                <Btn to={secondary.to} kind="secondary">{secondary.label}</Btn>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 9, marginTop: 26 }}>
                {chips.map((c) => (
                  <span key={c} style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "7px 13px", borderRadius: 999, background: tokens.card, border: `1px solid ${tokens.hairline}`, fontSize: 13, fontWeight: 500, color: tokens.body }}>
                    <span aria-hidden style={{ width: 6, height: 6, borderRadius: 999, background: tokens.brand }} />{c}
                  </span>
                ))}
              </div>
            </div>
          </Rise>
          <Rise delay={0.1}><Media caption={visual} ratio="4 / 3.3" radius={22} depth /></Rise>
        </div>
      </Wrap>
    </section>
  );
}

/* ---- 2 · Trust bar ---- */
export function TrustBar({ lead, items }: { lead: string; items: string[] }) {
  return (
    <Band tone="deep" py={48}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 22, alignItems: "center" }}>
        <p style={{ fontFamily: FONT, fontSize: 13, fontWeight: 600, color: tokens.inkMuted, flexShrink: 0, maxWidth: 220 }}>{lead}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, flex: 1 }}>
          {items.map((t) => (
            <span key={t} style={{ padding: "9px 15px", borderRadius: 999, background: tokens.card, border: `1px solid ${tokens.hairline}`, fontSize: 13.5, fontWeight: 500, color: tokens.body }}>{t}</span>
          ))}
        </div>
      </div>
    </Band>
  );
}

/* ---- 3 · Range grid ---- */
export function RangeGrid({ label, title, intro, items }: {
  label?: string; title: string; intro?: string; items: { icon: Icon; name: string; sub: string; to?: string }[];
}) {
  const [hover, setHover] = useState<string | null>(null);
  return (
    <Band id="range">
      <Head label={label} title={title} intro={intro} />
      <div style={autoGrid(220, 18)}>
        {items.map((it, i) => {
          const Ico = it.icon; const on = hover === it.name;
          return (
            <Rise key={it.name} delay={i * 0.04}>
              <a href={it.to ?? "/contact"} onMouseEnter={() => setHover(it.name)} onMouseLeave={() => setHover(null)}
                style={{ display: "block", height: "100%", textDecoration: "none", background: tokens.card, border: `1px solid ${on ? tokens.hairlineStrong : tokens.hairline}`, borderRadius: 16, overflow: "hidden", transform: on ? "translateY(-2px)" : "none", boxShadow: on ? "0 18px 40px -28px oklch(15.3% 0.006 107.1 / 0.3)" : "none", transition: "all .2s ease" }}>
                <div style={{ aspectRatio: "4 / 3", background: tokens.pageBgDeep, display: "grid", placeItems: "center", borderBottom: `1px solid ${tokens.hairline}` }}>
                  <Ico size={34} weight="duotone" color={tokens.inkMuted} />
                </div>
                <div style={{ padding: 20 }}>
                  <h3 style={{ fontFamily: FONT, color: tokens.ink, fontSize: 16, fontWeight: 600 }}>{it.name}</h3>
                  <p style={{ color: tokens.muted, fontSize: 13.5, lineHeight: 1.5, marginTop: 6 }}>{it.sub}</p>
                </div>
              </a>
            </Rise>
          );
        })}
      </div>
    </Band>
  );
}

/* ---- 4 · System feature rows (alternating) ---- */
export function SystemRows({ label, title, intro, features }: {
  label?: string; title: string; intro?: string; features: { kicker: string; title: string; body: string; bullets: string[]; visual: string }[];
}) {
  return (
    <Band tone="deep" id="what">
      <Head label={label} title={title} intro={intro} />
      <div style={{ display: "flex", flexDirection: "column", gap: 72 }}>
        {features.map((f, i) => {
          const reverse = i % 2 === 1;
          return (
            <div key={f.title} style={{ ...autoGrid(400, 48), alignItems: "center" }}>
              <Rise style={{ order: reverse ? 2 : 1 }}>
                <div>
                  <Eyebrow>{f.kicker}</Eyebrow>
                  <h3 style={{ fontFamily: FONT, color: tokens.ink, fontSize: "clamp(23px,2.8vw,32px)", fontWeight: 600, letterSpacing: "-0.025em", lineHeight: 1.1, marginTop: 14 }}>{f.title}</h3>
                  <p style={{ color: tokens.muted, fontSize: 16.5, lineHeight: 1.6, marginTop: 16, maxWidth: 480 }}>{f.body}</p>
                  <ul style={{ marginTop: 22, display: "flex", flexDirection: "column", gap: 11 }}>
                    {f.bullets.map((b) => (
                      <li key={b} style={{ display: "flex", gap: 11, alignItems: "flex-start" }}>
                        <Check size={16} weight="bold" color={tokens.brand} style={{ flexShrink: 0, marginTop: 3 }} />
                        <span style={{ color: tokens.body, fontSize: 15, lineHeight: 1.5 }}>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Rise>
              <Rise delay={0.08} style={{ order: reverse ? 1 : 2 }}><Media caption={f.visual} ratio="4 / 3" radius={16} /></Rise>
            </div>
          );
        })}
      </div>
    </Band>
  );
}

/* ---- 5 · Outcomes grid ---- */
export function OutcomeGrid({ label, title, intro, items }: {
  label?: string; title: string; intro?: string; items: { icon: Icon; title: string; body: string }[];
}) {
  return (
    <Band id="outcomes">
      <Head label={label} title={title} intro={intro} />
      <div style={autoGrid(330, 18)}>
        {items.map((o, i) => {
          const Ico = o.icon;
          return (
            <Rise key={o.title} delay={i * 0.03}>
              <div style={{ height: "100%", padding: 24, background: tokens.card, border: `1px solid ${tokens.hairline}`, borderRadius: 16 }}>
                <span style={{ display: "grid", placeItems: "center", width: 44, height: 44, borderRadius: 12, background: tokens.pageBgDeep, border: `1px solid ${tokens.hairline}` }}>
                  <Ico size={22} weight="duotone" color={tokens.ink} />
                </span>
                <h3 style={{ fontFamily: FONT, color: tokens.ink, fontSize: 17, fontWeight: 600, marginTop: 16, letterSpacing: "-0.01em" }}>{o.title}</h3>
                <p style={{ color: tokens.muted, fontSize: 14, lineHeight: 1.55, marginTop: 7 }}>{o.body}</p>
              </div>
            </Rise>
          );
        })}
      </div>
    </Band>
  );
}

/* ---- 6 · Comparison ---- */
export function Comparison({ title, intro, usLabel, themLabel, rows }: {
  title: string; intro?: string; usLabel: string; themLabel: string; rows: { label: string; us: string; them: string }[];
}) {
  return (
    <Band tone="deep" id="compare">
      <Head title={title} intro={intro} />
      <Rise>
        <div style={{ background: tokens.card, border: `1px solid ${tokens.hairline}`, borderRadius: 16, overflow: "hidden", maxWidth: 880 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr" }}>
            <div style={{ padding: "16px 20px" }} />
            <div style={{ padding: "16px 20px", textAlign: "center", borderLeft: `1px solid ${tokens.hairline}`, background: tokens.brandSoft }}><span style={{ fontFamily: FONT, fontSize: 14, fontWeight: 700, color: tokens.ink }}>{usLabel}</span></div>
            <div style={{ padding: "16px 20px", textAlign: "center", borderLeft: `1px solid ${tokens.hairline}` }}><span style={{ fontFamily: FONT, fontSize: 14, fontWeight: 600, color: tokens.muted }}>{themLabel}</span></div>
          </div>
          {rows.map((r, i) => (
            <div key={r.label} style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr", borderTop: `1px solid ${tokens.hairline}`, background: i % 2 ? tokens.pageBg : "transparent" }}>
              <div style={{ padding: "15px 20px", fontFamily: FONT, fontSize: 14, fontWeight: 500, color: tokens.body }}>{r.label}</div>
              <div style={{ padding: "15px 20px", textAlign: "center", borderLeft: `1px solid ${tokens.hairline}`, background: tokens.brandSoft, display: "flex", alignItems: "center", justifyContent: "center", gap: 7 }}>
                <Check size={15} weight="bold" color={tokens.brand} /><span style={{ fontFamily: FONT, fontSize: 13.5, color: tokens.ink, fontWeight: 500 }}>{r.us}</span>
              </div>
              <div style={{ padding: "15px 20px", textAlign: "center", borderLeft: `1px solid ${tokens.hairline}`, display: "flex", alignItems: "center", justifyContent: "center", gap: 7 }}>
                <Minus size={14} weight="bold" color={tokens.muted} /><span style={{ fontFamily: FONT, fontSize: 13.5, color: tokens.muted }}>{r.them}</span>
              </div>
            </div>
          ))}
        </div>
      </Rise>
    </Band>
  );
}

/* ---- 7 · App showcase (GridOS) ---- */
export function AppShowcase({ label, title, intro, features, visual }: {
  label?: string; title: string; intro?: string; features: string[]; visual: string;
}) {
  return (
    <Band id="gridos">
      <div style={{ ...autoGrid(360, 56), alignItems: "center" }}>
        <Rise>
          <div>
            <Head label={label} title={title} intro={intro} inline />
            <ul style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 13 }}>
              {features.map((f) => (
                <li key={f} style={{ display: "flex", gap: 11, alignItems: "flex-start" }}>
                  <Check size={16} weight="bold" color={tokens.brand} style={{ flexShrink: 0, marginTop: 3 }} />
                  <span style={{ color: tokens.body, fontSize: 15.5, lineHeight: 1.5 }}>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </Rise>
        <Rise delay={0.08}><Media caption={visual} ratio="3 / 3.6" radius={20} depth /></Rise>
      </div>
    </Band>
  );
}

/* ---- 8 · Framed CTA ---- */
export function FramedCTA({ title, sub, primary, secondary }: {
  title: string; sub: string; primary: { label: string; to: string }; secondary?: { label: string; to: string };
}) {
  return (
    <section style={{ background: tokens.pageBg, paddingBlock: 96 }}>
      <Wrap>
        <Rise>
          <div style={{ background: tokens.ink, borderRadius: 24, padding: "64px 48px", textAlign: "center" }}>
            <h2 style={{ fontFamily: FONT, color: "#fff", fontSize: "clamp(28px,4vw,44px)", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1.08, maxWidth: "18ch", marginInline: "auto", textWrap: "balance" }}>{title}</h2>
            <p style={{ color: "rgba(255,255,255,.65)", fontSize: 16.5, lineHeight: 1.55, marginTop: 16, maxWidth: 480, marginInline: "auto" }}>{sub}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center", marginTop: 30 }}>
              <Btn to={primary.to}>{primary.label}</Btn>
              {secondary && <Btn to={secondary.to} kind="secondary" onDark>{secondary.label}</Btn>}
            </div>
          </div>
        </Rise>
      </Wrap>
    </section>
  );
}

/* ---- 9 · Spec strip (recommended product + key specs, gated) ---- */
export function SpecStrip({ label, title, product, specs }: {
  label?: string; title: string; product: string; specs: { label: string; value: ReactNode }[];
}) {
  return (
    <Band tone="deep" id="spec">
      <Head label={label} title={title} />
      <Rise>
        <div style={{ background: tokens.card, border: `1px solid ${tokens.hairline}`, borderRadius: 18, overflow: "hidden", maxWidth: 920 }}>
          <div style={{ padding: "18px 24px", borderBottom: `1px solid ${tokens.hairline}`, display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontFamily: MONO, fontSize: 10.5, fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: tokens.brand }}>Recommended</span>
            <span style={{ fontFamily: FONT, fontSize: 17, fontWeight: 600, color: tokens.ink }}>{product}</span>
          </div>
          <div style={autoGrid(200, 0)}>
            {specs.map((s, i) => (
              <div key={i} style={{ padding: "20px 24px", borderTop: i >= 0 ? `1px solid ${tokens.hairline}` : undefined, borderLeft: i % 2 ? `1px solid ${tokens.hairline}` : undefined }}>
                <div style={{ fontFamily: FONT, fontSize: 18, fontWeight: 600, color: tokens.ink, display: "flex" }}>{s.value}</div>
                <p style={{ color: tokens.muted, fontSize: 13, marginTop: 8, fontWeight: 500 }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </Rise>
    </Band>
  );
}

/* ---- 10 · Powers grid (what it runs — appliance tiles) ---- */
export function PowersGrid({ label, title, intro, items, note }: {
  label?: string; title: string; intro?: string; items: { icon: Icon; label: string }[]; note?: ReactNode;
}) {
  return (
    <Band id="powers">
      <Head label={label} title={title} intro={intro} />
      <div style={autoGrid(170, 14)}>
        {items.map((it, i) => {
          const Ico = it.icon;
          return (
            <Rise key={it.label} delay={i * 0.03}>
              <div style={{ display: "flex", alignItems: "center", gap: 13, padding: "18px 18px", background: tokens.card, border: `1px solid ${tokens.hairline}`, borderRadius: 14 }}>
                <span style={{ display: "grid", placeItems: "center", width: 40, height: 40, borderRadius: 11, background: tokens.pageBgDeep, border: `1px solid ${tokens.hairline}`, flexShrink: 0 }}>
                  <Ico size={20} weight="duotone" color={tokens.ink} />
                </span>
                <span style={{ fontFamily: FONT, fontSize: 14.5, fontWeight: 600, color: tokens.ink, letterSpacing: "-0.01em" }}>{it.label}</span>
              </div>
            </Rise>
          );
        })}
      </div>
      {note && <Rise delay={0.1}><p style={{ color: tokens.muted, fontSize: 13.5, marginTop: 20, maxWidth: 560 }}>{note}</p></Rise>}
    </Band>
  );
}

/* ---- shared heading ---- */
function Head({ label, title, intro, inline }: { label?: string; title: string; intro?: ReactNode; inline?: boolean }) {
  return (
    <div style={{ maxWidth: 720, marginBottom: inline ? 0 : 48 }}>
      {label && <Rise><div style={{ marginBottom: 16 }}><Eyebrow>{label}</Eyebrow></div></Rise>}
      <Rise delay={0.04}><H2 max={620}>{title}</H2></Rise>
      {intro && <Rise delay={0.08}><div style={{ marginTop: 16 }}><Lead>{intro}</Lead></div></Rise>}
    </div>
  );
}

export { Gated };
