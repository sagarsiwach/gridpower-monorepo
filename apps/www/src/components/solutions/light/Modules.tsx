/*
  Flexible module library — sections distilled from best-in-class marketing pages
  (this batch: Stripe), rebuilt in the V3 language and made prop-driven so the
  page builder can assemble them. Banned patterns from the originals (side-stripe
  stats, gradient text) are reworked into our system. Numbers stay <Gated>.
*/

import { type ReactNode, type CSSProperties, useState } from "react";
import { ArrowRight, type Icon } from "@phosphor-icons/react";
import { Gated } from "../../marketing/Primitives";
import { Band, Wrap, Rise, Eyebrow, H2, Lead, Btn, TextLink, Media, Accordion, FONT, MONO, tokens } from "./atoms";

const autoGrid = (min: number, gap: number): CSSProperties => ({
  display: "grid",
  gridTemplateColumns: `repeat(auto-fit, minmax(min(100%, ${min}px), 1fr))`,
  gap,
});

/* ================================================================== */
/*  1 · FAQ + resources  (Stripe Billing FAQ — Sagar's favourite)      */
/*  Heading left, accordion right, resource cards below.               */
/* ================================================================== */

export type FaqItem = { q: string; a: ReactNode };
export type ResourceCard = { kind: string; title: string; body: string; to: string };

export function FaqResources({ eyebrow, title, lead, faqs, resources, tone = "base" }: {
  eyebrow?: string; title: string; lead?: string; faqs: FaqItem[]; resources?: ResourceCard[]; tone?: "base" | "deep";
}) {
  const [open, setOpen] = useState<number>(0);
  return (
    <Band tone={tone} id="faq">
      <div style={{ ...autoGrid(360, 56), alignItems: "start" }}>
        <Rise style={{ position: "sticky", top: 96 }}>
          <div>
            {eyebrow && <div style={{ marginBottom: 16 }}><Eyebrow>{eyebrow}</Eyebrow></div>}
            <H2 max={420}>{title}</H2>
            {lead && <div style={{ marginTop: 16 }}><Lead>{lead}</Lead></div>}
          </div>
        </Rise>
        <Rise delay={0.06}>
          <div>
            {faqs.map((f, i) => (
              <Accordion key={i} q={f.q} a={f.a} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
            ))}
          </div>
        </Rise>
      </div>

      {resources && resources.length > 0 && (
        <div style={{ marginTop: 64 }}>
          <Rise><p style={{ fontFamily: FONT, fontSize: 18, fontWeight: 600, color: tokens.ink, marginBottom: 20 }}>More resources</p></Rise>
          <div style={autoGrid(280, 16)}>
            {resources.map((r, i) => <ResourceTile key={i} r={r} delay={i * 0.04} />)}
          </div>
        </div>
      )}
    </Band>
  );
}

function ResourceTile({ r, delay }: { r: ResourceCard; delay: number }) {
  const [h, setH] = useState(false);
  return (
    <Rise delay={delay}>
      <a href={r.to} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
        style={{ display: "block", height: "100%", textDecoration: "none", background: tokens.card, border: `1px solid ${h ? tokens.hairlineStrong : tokens.hairline}`, borderRadius: 16, padding: 24, transition: "border-color .2s ease, transform .2s ease, box-shadow .25s ease", transform: h ? "translateY(-2px)" : "none", boxShadow: h ? "0 18px 40px -28px oklch(15.3% 0.006 107.1 / 0.32)" : "none" }}>
        <span style={{ fontFamily: MONO, fontSize: 10.5, fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: tokens.brand }}>{r.kind}</span>
        <h4 style={{ fontFamily: FONT, fontSize: 16.5, fontWeight: 600, color: tokens.ink, marginTop: 12, letterSpacing: "-0.015em", lineHeight: 1.25 }}>{r.title}</h4>
        <p style={{ color: tokens.muted, fontSize: 14, lineHeight: 1.55, marginTop: 8 }}>{r.body}</p>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: 16, color: tokens.brand, fontSize: 13, fontWeight: 600 }}>
          Read more <ArrowRight size={12} weight="bold" style={{ transform: h ? "translateX(3px)" : "none", transition: "transform .16s ease" }} />
        </span>
      </a>
    </Rise>
  );
}

/* ================================================================== */
/*  2 · Customer switcher  (Stripe "logo box" — Sagar's favourite)     */
/*  Per-case stats + products left, featured story card right, logo    */
/*  rail below switches the case. Side-stripe stats reworked clean.     */
/* ================================================================== */

export type SwitcherCase = { tab: string; name: string; blurb: string; products: string[]; stats: { value: ReactNode; label: string }[]; visual: string };

export function CustomerSwitcher({ title, cases, tone = "deep" }: { title: ReactNode; cases: SwitcherCase[]; tone?: "base" | "deep" }) {
  const [i, setI] = useState(0);
  const c = cases[i];
  if (!c) return null;
  return (
    <Band tone={tone}>
      <Rise><H2 max={620} display>{title}</H2></Rise>
      <div style={{ ...autoGrid(340, 44), alignItems: "stretch", marginTop: 44 }}>
        {/* left: stats + products for active case */}
        <Rise style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div>
            {c.stats.map((s, k) => (
              <div key={k} style={{ paddingBlock: 18, borderTop: k === 0 ? "none" : `1px solid ${tokens.hairline}` }}>
                <div style={{ fontFamily: FONT, fontSize: 30, fontWeight: 700, color: tokens.ink, letterSpacing: "-0.02em", display: "flex" }}>{s.value}</div>
                <p style={{ color: tokens.muted, fontSize: 14, marginTop: 4 }}>{s.label}</p>
              </div>
            ))}
            <div style={{ paddingTop: 18, borderTop: `1px solid ${tokens.hairline}` }}>
              <p style={{ fontFamily: MONO, fontSize: 10.5, letterSpacing: "0.12em", textTransform: "uppercase", color: tokens.inkMuted, marginBottom: 10 }}>Products used</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {c.products.map((p) => (
                  <span key={p} style={{ padding: "6px 12px", borderRadius: 999, background: tokens.card, border: `1px solid ${tokens.hairline}`, fontSize: 13, fontWeight: 500, color: tokens.body }}>{p}</span>
                ))}
              </div>
            </div>
          </div>
        </Rise>

        {/* right: featured story card */}
        <Rise delay={0.06}>
          <div style={{ position: "relative", minHeight: 300, height: "100%", borderRadius: 22, overflow: "hidden", border: `1px solid ${tokens.hairline}`, background: tokens.card, boxShadow: "0 28px 64px -40px oklch(15.3% 0.006 107.1 / 0.4)" }}>
            <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", background: tokens.pageBgDeep }}>
              <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: tokens.muted }}>{c.visual}</span>
            </div>
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 35%, oklch(15.3% 0.006 107.1 / 0.72) 100%)" }} />
            <div style={{ position: "absolute", left: 26, right: 26, bottom: 24 }}>
              <p style={{ fontFamily: FONT, fontSize: 20, fontWeight: 600, color: "#fff", letterSpacing: "-0.02em", lineHeight: 1.25, maxWidth: "26ch", textWrap: "balance" }}>{c.blurb}</p>
            </div>
          </div>
        </Rise>
      </div>

      {/* logo rail = tabs */}
      <div style={{ marginTop: 32, display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center" }}>
        {cases.map((cc, k) => {
          const on = k === i;
          return (
            <button key={cc.tab} type="button" onClick={() => setI(k)} aria-pressed={on}
              style={{ cursor: "pointer", padding: "11px 20px", borderRadius: 12, fontFamily: FONT, fontSize: 14, fontWeight: 600, color: on ? tokens.ink : tokens.muted, background: on ? tokens.card : "transparent", border: `1px solid ${on ? tokens.hairlineStrong : "transparent"}`, boxShadow: on ? "0 1px 2px oklch(15.3% 0.006 107.1 / 0.06)" : "none", transition: "all .15s ease" }}>
              {cc.tab}
            </button>
          );
        })}
      </div>
    </Band>
  );
}

/* ================================================================== */
/*  3 · Capability tiers  (Stripe no-code→API spectrum — favourite)    */
/*  Spectrum label + a row of tier cards.                              */
/* ================================================================== */

export type Tier = { tag: string; title: string; body: string; to: string; icon?: Icon };

export function CapabilityTiers({ eyebrow, title, lead, spectrumLeft, spectrumRight, tiers, tone = "base" }: {
  eyebrow?: string; title: string; lead?: string; spectrumLeft: string; spectrumRight: string; tiers: Tier[]; tone?: "base" | "deep";
}) {
  return (
    <Band tone={tone}>
      <div style={{ textAlign: "center", maxWidth: 640, marginInline: "auto", marginBottom: 40 }}>
        {eyebrow && <Rise><div style={{ marginBottom: 16 }}><Eyebrow align="center">{eyebrow}</Eyebrow></div></Rise>}
        <Rise delay={0.04}><H2 align="center">{title}</H2></Rise>
        {lead && <Rise delay={0.08}><div style={{ marginTop: 16 }}><Lead align="center">{lead}</Lead></div></Rise>}
      </div>

      {/* spectrum bar */}
      <Rise>
        <div style={{ display: "flex", alignItems: "center", gap: 14, maxWidth: 760, marginInline: "auto", marginBottom: 24 }}>
          <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: tokens.inkMuted, whiteSpace: "nowrap" }}>{spectrumLeft}</span>
          <span style={{ flex: 1, height: 2, borderRadius: 2, background: `linear-gradient(90deg, ${tokens.hairlineStrong}, ${tokens.brand})` }} />
          <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: tokens.brand, whiteSpace: "nowrap" }}>{spectrumRight}</span>
        </div>
      </Rise>

      <div style={autoGrid(220, 16)}>
        {tiers.map((t, i) => <TierCard key={t.title} t={t} delay={i * 0.04} />)}
      </div>
    </Band>
  );
}

function TierCard({ t, delay }: { t: Tier; delay: number }) {
  const [h, setH] = useState(false);
  const Ico = t.icon;
  return (
    <Rise delay={delay}>
      <a href={t.to} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
        style={{ display: "flex", flexDirection: "column", height: "100%", textDecoration: "none", background: tokens.card, border: `1px solid ${h ? tokens.hairlineStrong : tokens.hairline}`, borderRadius: 16, padding: 22, transition: "border-color .2s ease, transform .2s ease, box-shadow .25s ease", transform: h ? "translateY(-2px)" : "none", boxShadow: h ? "0 18px 40px -28px oklch(15.3% 0.006 107.1 / 0.3)" : "none" }}>
        {Ico && (
          <span style={{ display: "grid", placeItems: "center", width: 40, height: 40, borderRadius: 11, background: tokens.pageBgDeep, border: `1px solid ${tokens.hairline}`, marginBottom: 16 }}>
            <Ico size={20} weight="duotone" color={tokens.ink} />
          </span>
        )}
        <span style={{ fontFamily: MONO, fontSize: 10.5, fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: tokens.brand }}>{t.tag}</span>
        <h3 style={{ fontFamily: FONT, fontSize: 19, fontWeight: 600, color: tokens.ink, marginTop: 8, letterSpacing: "-0.02em" }}>{t.title}</h3>
        <p style={{ color: tokens.muted, fontSize: 14, lineHeight: 1.55, marginTop: 8, flex: 1 }}>{t.body}</p>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: 18, color: tokens.brand, fontSize: 13, fontWeight: 600 }}>
          Learn more <ArrowRight size={12} weight="bold" style={{ transform: h ? "translateX(3px)" : "none", transition: "transform .16s ease" }} />
        </span>
      </a>
    </Rise>
  );
}

/* ================================================================== */
/*  4 · How it works  (Stripe 3-step — "create a link, sell anywhere") */
/*  Numbered sequence (earned) + optional visual.                      */
/* ================================================================== */

export type Step = { t: string; b: string };

export function HowItWorks({ eyebrow, title, steps, media, tone = "base" }: {
  eyebrow?: string; title: string; steps: Step[]; media?: string; tone?: "base" | "deep";
}) {
  return (
    <Band tone={tone} id="how">
      <div style={{ ...autoGrid(380, 56), alignItems: "center" }}>
        <Rise>
          <div>
            {eyebrow && <div style={{ marginBottom: 14 }}><Eyebrow>{eyebrow}</Eyebrow></div>}
            <H2 max={460}>{title}</H2>
            <div style={{ marginTop: 32, display: "flex", flexDirection: "column", gap: 26 }}>
              {steps.map((s, i) => (
                <div key={s.t} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                  <span style={{ flexShrink: 0, display: "grid", placeItems: "center", width: 30, height: 30, borderRadius: 999, background: tokens.ink, color: "#fff", fontFamily: FONT, fontSize: 14, fontWeight: 700 }}>{i + 1}</span>
                  <div>
                    <p style={{ fontFamily: FONT, fontSize: 17, fontWeight: 600, color: tokens.ink, letterSpacing: "-0.01em" }}>{s.t}</p>
                    <p style={{ color: tokens.muted, fontSize: 14.5, lineHeight: 1.55, marginTop: 5, maxWidth: 420 }}>{s.b}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Rise>
        <Rise delay={0.08}>
          <Media caption={media ?? "Step visual"} ratio="4 / 3.2" radius={20} depth />
        </Rise>
      </div>
    </Band>
  );
}

/* ================================================================== */
/*  5 · Stat band  (Stripe "scales with you")                          */
/* ================================================================== */

export function StatBand({ title, lead, stats, tone = "deep" }: {
  title: ReactNode; lead?: string; stats: { value: ReactNode; label: string }[]; tone?: "base" | "deep";
}) {
  return (
    <Band tone={tone}>
      <div style={{ maxWidth: 560, marginBottom: 44 }}>
        <Rise><H2 max={460}>{title}</H2></Rise>
        {lead && <Rise delay={0.06}><div style={{ marginTop: 16 }}><Lead>{lead}</Lead></div></Rise>}
      </div>
      <div style={autoGrid(220, 0)}>
        {stats.map((s, i) => (
          <Rise key={i} delay={i * 0.05}>
            <div style={{ padding: "8px 24px 8px 0", borderLeft: i === 0 ? "none" : undefined }}>
              <div style={{ fontFamily: FONT, fontSize: "clamp(30px,3.4vw,42px)", fontWeight: 700, color: tokens.ink, letterSpacing: "-0.03em", display: "flex" }}>{s.value}</div>
              <p style={{ color: tokens.muted, fontSize: 14.5, lineHeight: 1.5, marginTop: 10, maxWidth: 220 }}>{s.label}</p>
            </div>
          </Rise>
        ))}
      </div>
    </Band>
  );
}

/* ================================================================== */
/*  6 · Story cards  (Stripe "Trusted by industry leaders")            */
/* ================================================================== */

export type StoryCard = { logo: string; quote: string; cta: string; to: string };

export function StoryCards({ eyebrow, title, lead, cards, tone = "base" }: {
  eyebrow?: string; title: string; lead?: string; cards: StoryCard[]; tone?: "base" | "deep";
}) {
  return (
    <Band tone={tone}>
      <div style={{ maxWidth: 620, marginBottom: 40 }}>
        {eyebrow && <Rise><div style={{ marginBottom: 16 }}><Eyebrow>{eyebrow}</Eyebrow></div></Rise>}
        <Rise delay={0.04}><H2 max={480}>{title}</H2></Rise>
        {lead && <Rise delay={0.08}><div style={{ marginTop: 16 }}><Lead>{lead}</Lead></div></Rise>}
      </div>
      <div style={autoGrid(300, 18)}>
        {cards.map((c, i) => <StoryTile key={i} c={c} delay={i * 0.05} />)}
      </div>
    </Band>
  );
}

function StoryTile({ c, delay }: { c: StoryCard; delay: number }) {
  const [h, setH] = useState(false);
  return (
    <Rise delay={delay}>
      <a href={c.to} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
        style={{ display: "flex", flexDirection: "column", height: "100%", textDecoration: "none", background: tokens.card, border: `1px solid ${h ? tokens.hairlineStrong : tokens.hairline}`, borderRadius: 18, overflow: "hidden", transition: "border-color .2s ease, transform .2s ease, box-shadow .25s ease", transform: h ? "translateY(-3px)" : "none", boxShadow: h ? "0 22px 48px -30px oklch(15.3% 0.006 107.1 / 0.34)" : "none" }}>
        <div style={{ aspectRatio: "16 / 9", background: tokens.pageBgDeep, display: "grid", placeItems: "center", borderBottom: `1px solid ${tokens.hairline}` }}>
          <span style={{ fontFamily: FONT, fontSize: 18, fontWeight: 700, color: tokens.inkMuted, letterSpacing: "-0.01em" }}>{c.logo}</span>
        </div>
        <div style={{ padding: 24, display: "flex", flexDirection: "column", flex: 1 }}>
          <p style={{ fontFamily: FONT, fontSize: 16.5, fontWeight: 500, color: tokens.body, lineHeight: 1.45, letterSpacing: "-0.01em", flex: 1, textWrap: "balance" }}>{c.quote}</p>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: 20, color: tokens.brand, fontSize: 13.5, fontWeight: 600 }}>
            {c.cta} <ArrowRight size={12} weight="bold" style={{ transform: h ? "translateX(3px)" : "none", transition: "transform .16s ease" }} />
          </span>
        </div>
      </a>
    </Rise>
  );
}

export { Gated };
export { FONT, MONO } from "./atoms";
