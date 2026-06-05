/*
  Kit · Sections — the swappable body blocks a solution page is assembled from.

  Each block is a self-contained <Section> (own background rhythm via `alt`/`dark`),
  prop-driven, with honest defaults. Compose a page by stacking them in any order.
  Numbers/specs route through <Gated> so nothing fake can ship.

  Provenance (what each block is modelled on):
    LogoCloud .......... trust strip            · Stripe, EcoFlow
    BentoGrid .......... mixed-size feature grid · Linear /features
    InlineStatement .... sentence w/ inline chips· Vercel
    UseCaseSwitcher .... tabbed content swap     · EcoFlow, Linear
    WhatItPowers ....... appliance/outcome tiles · energy genre
    SpecTable .......... labelled spec rows       · Apple, EcoFlow
    StepFlow ........... ordered numbered process · install/onboarding
    StatStrip .......... restrained metric row    · (anti hero-metric)
    QuoteBand .......... dark testimonial         · Stripe (OpenAI card)
    ComparisonTable .... us-vs-alternative        · positioning
    Faq ................ accordion                 · everyone
    AppShowcase ........ phone + app features      · EcoFlow, energy genre
    FramedCTA .......... blueprint-framed close    · Vercel
    BigStatement ....... oversized closing line    · Linear
    GalleryStrip ....... horizontal photo rail     · automotive/energy
    AltFeatures ........ auto-alternating rows      · Stripe (wraps FeatureRow)
*/

import { useState, type ReactNode } from "react";
import { Link } from "react-router";
import { ArrowRight, CaretDown, Quotes, Check, X, type Icon } from "@phosphor-icons/react";
import { tokens } from "../../../routes/_preview/_v3-tokens";
import {
  Container,
  Section,
  SectionHeading,
  Reveal,
  Kicker,
  Gated,
  Button,
  MediaSlot,
  FeatureRow,
} from "../../marketing/Primitives";
import { BlueprintGrid, RegistrationCorners } from "./Backdrops";

const FONT = "Inter, ui-sans-serif, system-ui, sans-serif";
const DISPLAY = '"Clash Grotesk", Inter, ui-sans-serif, system-ui, sans-serif';
const MONO = '"Geist Mono", ui-monospace, SFMono-Regular, monospace';

type BaseProps = { id?: string; alt?: boolean; dark?: boolean };

/* ------------------------------------------------------------------ */
/*  1 · LogoCloud — trusted-by / as-seen-in strip                      */
/* ------------------------------------------------------------------ */

export function LogoCloud({
  label = "Trusted on sites across Goa",
  items,
  alt = true,
  id,
}: BaseProps & { label?: string; items: string[] }) {
  return (
    <Section alt={alt} py={56} id={id}>
      <Reveal>
        <p style={{ textAlign: "center", fontFamily: MONO, fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: tokens.muted, marginBottom: 26 }}>
          {label}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px 44px", alignItems: "center" }}>
          {items.map((name) => (
            <span key={name} style={{ fontFamily: DISPLAY, fontSize: 20, fontWeight: 600, letterSpacing: "-0.02em", color: tokens.inkMuted, opacity: 0.78 }}>
              {name}
            </span>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/*  2 · BentoGrid — mixed-size feature cards                           */
/* ------------------------------------------------------------------ */

export type BentoItem = {
  label?: string;
  title: ReactNode;
  body?: ReactNode;
  media?: ReactNode;
  to?: string;
  /** 1 = half width, 2 = full width spotlight. */
  span?: 1 | 2;
};

export function BentoGrid({
  kicker,
  title,
  intro,
  items,
  alt = false,
  id,
}: BaseProps & { kicker?: string; title?: ReactNode; intro?: ReactNode; items: BentoItem[] }) {
  return (
    <Section alt={alt} id={id}>
      {title && <SectionHeading kicker={kicker} title={title} intro={intro} />}
      <div className="md:grid-cols-2" style={{ display: "grid", gridTemplateColumns: "1fr", gap: 20 }}>
        {items.map((it, i) => (
          <BentoCard key={i} item={it} />
        ))}
      </div>
    </Section>
  );
}

function BentoCard({ item }: { item: BentoItem }) {
  const [hover, setHover] = useState(false);
  const inner = (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: "relative",
        height: "100%",
        minHeight: 260,
        display: "flex",
        flexDirection: "column",
        background: tokens.card,
        border: `1px solid ${hover ? tokens.hairlineStrong : tokens.hairline}`,
        borderRadius: 20,
        overflow: "hidden",
        transition: "border-color 0.2s ease, transform 0.2s ease, box-shadow 0.25s ease",
        transform: item.to && hover ? "translateY(-2px)" : "none",
        boxShadow: item.to && hover ? "0 22px 50px -34px oklch(15.3% 0.006 107.1 / 0.4)" : "none",
      }}
    >
      <div style={{ flex: "1 1 auto", minHeight: 150, background: tokens.pageBgDeep, borderBottom: `1px solid ${tokens.hairline}`, display: "grid", placeItems: "center" }}>
        {item.media ?? (
          <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.12em", color: tokens.muted }}>VISUAL TBD</span>
        )}
      </div>
      <div style={{ padding: 24 }}>
        {item.label && (
          <span style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 12, fontWeight: 600, color: tokens.inkMuted, marginBottom: 8 }}>
            <span aria-hidden style={{ width: 6, height: 6, borderRadius: 999, background: tokens.brand }} />
            {item.label}
          </span>
        )}
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12 }}>
          <h3 style={{ fontFamily: FONT, color: tokens.ink, fontSize: 19, fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.2 }}>
            {item.title}
          </h3>
          {item.to && (
            <ArrowRight size={16} weight="bold" color={tokens.brand} style={{ opacity: hover ? 1 : 0.35, transform: hover ? "translateX(2px)" : "none", transition: "all 0.2s ease", flexShrink: 0 }} />
          )}
        </div>
        {item.body && <p style={{ color: tokens.muted, fontSize: 14.5, lineHeight: 1.55, marginTop: 8, maxWidth: 460 }}>{item.body}</p>}
      </div>
    </div>
  );
  const spanClass = item.span === 2 ? "md:col-span-2" : "";
  if (item.to) {
    return (
      <Reveal className={spanClass}>
        <Link to={item.to} style={{ textDecoration: "none", display: "block", height: "100%" }}>{inner}</Link>
      </Reveal>
    );
  }
  return <Reveal className={spanClass}>{inner}</Reveal>;
}

/* ------------------------------------------------------------------ */
/*  3 · InlineStatement — big sentence with embedded chips             */
/* ------------------------------------------------------------------ */

export type StatementPart = string | { chip: string; icon?: Icon };

export function InlineStatement({
  parts,
  alt = false,
  dark = false,
  id,
}: BaseProps & { parts: StatementPart[] }) {
  const ink = dark ? "#fff" : tokens.ink;
  return (
    <Section alt={alt} dark={dark} py={88} id={id}>
      <Reveal>
        <p
          style={{
            fontFamily: DISPLAY,
            fontSize: "clamp(26px, 3.6vw, 42px)",
            fontWeight: 600,
            letterSpacing: "-0.025em",
            lineHeight: 1.3,
            color: ink,
            maxWidth: 960,
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "0.32em",
            textWrap: "balance",
          }}
        >
          {parts.map((p, i) =>
            typeof p === "string" ? (
              <span key={i}>{p}</span>
            ) : (
              <span
                key={i}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  fontFamily: FONT,
                  fontSize: "0.62em",
                  fontWeight: 600,
                  color: dark ? "#fff" : tokens.ink,
                  background: dark ? "rgba(255,255,255,0.08)" : tokens.card,
                  border: `1px solid ${dark ? "rgba(255,255,255,0.2)" : tokens.hairlineStrong}`,
                  borderRadius: 999,
                  padding: "0.28em 0.7em",
                  verticalAlign: "middle",
                }}
              >
                {p.icon && <p.icon size={18} weight="duotone" color={tokens.brand} />}
                {p.chip}
              </span>
            ),
          )}
        </p>
      </Reveal>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/*  4 · UseCaseSwitcher — chip-driven content swap (interactive)       */
/* ------------------------------------------------------------------ */

export type UseCase = { key: string; label: string; title: ReactNode; body: ReactNode; media?: ReactNode; bullets?: string[] };

export function UseCaseSwitcher({
  kicker,
  title,
  intro,
  cases,
  alt = false,
  id,
}: BaseProps & { kicker?: string; title?: ReactNode; intro?: ReactNode; cases: UseCase[] }) {
  const [active, setActive] = useState(cases[0]?.key);
  const current = cases.find((c) => c.key === active) ?? cases[0];

  return (
    <Section alt={alt} id={id}>
      {title && <SectionHeading kicker={kicker} title={title} intro={intro} />}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 28 }}>
        {cases.map((c) => {
          const on = c.key === active;
          return (
            <button
              key={c.key}
              onClick={() => setActive(c.key)}
              style={{
                fontFamily: FONT,
                fontSize: 13.5,
                fontWeight: 600,
                padding: "9px 16px",
                borderRadius: 999,
                cursor: "pointer",
                border: `1px solid ${on ? tokens.brand : tokens.hairlineStrong}`,
                background: on ? tokens.brand : tokens.card,
                color: on ? "#fff" : tokens.body,
                transition: "all 0.15s ease",
              }}
            >
              {c.label}
            </button>
          );
        })}
      </div>
      {current && (
        <div className="lg:grid-cols-2" style={{ display: "grid", gridTemplateColumns: "1fr", gap: 44, alignItems: "center" }}>
          <Reveal key={current.key}>
            <div>
              <h3 style={{ fontFamily: FONT, color: tokens.ink, fontSize: "clamp(22px, 2.6vw, 30px)", fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.15 }}>
                {current.title}
              </h3>
              <p style={{ color: tokens.muted, fontSize: 16, lineHeight: 1.6, marginTop: 14, maxWidth: 480 }}>{current.body}</p>
              {current.bullets && (
                <ul style={{ marginTop: 18, display: "flex", flexDirection: "column", gap: 10 }}>
                  {current.bullets.map((b) => (
                    <li key={b} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                      <Check size={16} weight="bold" color={tokens.brand} style={{ marginTop: 2, flexShrink: 0 }} />
                      <span style={{ color: tokens.body, fontSize: 15, lineHeight: 1.5 }}>{b}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </Reveal>
          <Reveal key={`${current.key}-m`} delay={0.06}>
            {current.media ?? <MediaSlot label={`${current.label} visual`} ratio="4 / 3" />}
          </Reveal>
        </div>
      )}
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/*  5 · WhatItPowers — appliance / outcome tile grid                   */
/* ------------------------------------------------------------------ */

export function WhatItPowers({
  kicker = "What it powers",
  title,
  intro,
  items,
  note,
  alt = false,
  id,
}: BaseProps & { kicker?: string; title: ReactNode; intro?: ReactNode; items: { icon: Icon; label: string }[]; note?: string }) {
  return (
    <Section alt={alt} id={id}>
      <SectionHeading kicker={kicker} title={title} intro={intro} />
      <div className="sm:grid-cols-3 lg:grid-cols-6" style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 14 }}>
        {items.map((p) => (
          <Reveal key={p.label}>
            <div style={{ background: tokens.card, border: `1px solid ${tokens.hairline}`, borderRadius: 16, padding: "24px 14px", textAlign: "center", height: "100%" }}>
              <p.icon size={26} weight="duotone" color={tokens.ink} />
              <p style={{ fontSize: 13, color: tokens.body, marginTop: 12, fontWeight: 500 }}>{p.label}</p>
            </div>
          </Reveal>
        ))}
      </div>
      {note && (
        <p style={{ marginTop: 18, fontSize: 13 }}>
          <Gated note="confirm run-time figure once sizing model is verified">{note}</Gated>
        </p>
      )}
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/*  6 · SpecTable — labelled rows, gated-aware                         */
/* ------------------------------------------------------------------ */

export type SpecRow = { label: string; value?: ReactNode; gatedNote?: string };

export function SpecTable({
  kicker,
  title,
  intro,
  rows,
  alt = false,
  id,
}: BaseProps & { kicker?: string; title?: ReactNode; intro?: ReactNode; rows: SpecRow[] }) {
  return (
    <Section alt={alt} id={id}>
      {title && <SectionHeading kicker={kicker} title={title} intro={intro} />}
      <Reveal>
        <div style={{ background: tokens.card, border: `1px solid ${tokens.hairline}`, borderRadius: 18, overflow: "hidden", maxWidth: 680 }}>
          {rows.map((r, i) => (
            <div key={r.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, padding: "15px 22px", borderTop: i === 0 ? "none" : `1px solid ${tokens.hairline}` }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: tokens.ink }}>{r.label}</span>
              <span style={{ fontSize: 13.5, color: tokens.body, fontFamily: MONO, textAlign: "right" }}>
                {r.gatedNote ? <Gated note={r.gatedNote}>—</Gated> : r.value}
              </span>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/*  7 · StepFlow — ordered numbered process (numbering is earned here) */
/* ------------------------------------------------------------------ */

export function StepFlow({
  kicker = "How it works",
  title,
  intro,
  steps,
  alt = false,
  id,
}: BaseProps & { kicker?: string; title: ReactNode; intro?: ReactNode; steps: { title: string; body: string }[] }) {
  return (
    <Section alt={alt} id={id}>
      <SectionHeading kicker={kicker} title={title} intro={intro} />
      <div className="md:grid-cols-2 lg:grid-cols-4" style={{ display: "grid", gridTemplateColumns: "1fr", gap: 24 }}>
        {steps.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.05}>
            <div style={{ position: "relative", paddingTop: 8 }}>
              <span style={{ fontFamily: MONO, fontSize: 13, fontWeight: 600, color: tokens.brand }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <div style={{ height: 1, background: tokens.hairlineStrong, marginBlock: 14 }} />
              <h3 style={{ fontFamily: FONT, color: tokens.ink, fontSize: 17, fontWeight: 600, letterSpacing: "-0.015em" }}>{s.title}</h3>
              <p style={{ color: tokens.muted, fontSize: 14.5, lineHeight: 1.55, marginTop: 8 }}>{s.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/*  8 · StatStrip — restrained metric row (gated-aware)               */
/* ------------------------------------------------------------------ */

export function StatStrip({
  stats,
  alt = false,
  dark = false,
  id,
}: BaseProps & { stats: { value?: ReactNode; label: string; gatedNote?: string }[] }) {
  const ink = dark ? "#fff" : tokens.ink;
  const sub = dark ? "rgba(255,255,255,0.6)" : tokens.muted;
  return (
    <Section alt={alt} dark={dark} py={72} id={id}>
      <div className="sm:grid-cols-3" style={{ display: "grid", gridTemplateColumns: "1fr", gap: 32 }}>
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.06}>
            <div style={{ borderLeft: `1px solid ${dark ? "rgba(255,255,255,0.16)" : tokens.hairlineStrong}`, paddingLeft: 20 }}>
              <div style={{ fontFamily: DISPLAY, fontSize: "clamp(34px, 4vw, 52px)", fontWeight: 600, letterSpacing: "-0.03em", color: ink, lineHeight: 1 }}>
                {s.gatedNote ? <Gated note={s.gatedNote}>—</Gated> : s.value}
              </div>
              <p style={{ color: sub, fontSize: 14, lineHeight: 1.5, marginTop: 12, maxWidth: 240 }}>{s.label}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/*  9 · QuoteBand — dark testimonial                                   */
/* ------------------------------------------------------------------ */

export function QuoteBand({
  quote,
  author,
  role,
  logo,
  id,
}: BaseProps & { quote: ReactNode; author: string; role?: string; logo?: string }) {
  return (
    <Section dark py={104} id={id}>
      <Reveal>
        <div style={{ maxWidth: 880, marginInline: "auto", textAlign: "center" }}>
          <Quotes size={40} weight="fill" color={tokens.brand} style={{ opacity: 0.9 }} />
          <p style={{ fontFamily: DISPLAY, color: "#fff", fontSize: "clamp(24px, 3.4vw, 40px)", fontWeight: 500, letterSpacing: "-0.02em", lineHeight: 1.28, marginTop: 22, textWrap: "balance" }}>
            {quote}
          </p>
          <div style={{ marginTop: 30, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            {logo && <span style={{ fontFamily: DISPLAY, fontSize: 18, fontWeight: 600, color: "rgba(255,255,255,0.9)" }}>{logo}</span>}
            <p style={{ color: "#fff", fontSize: 15, fontWeight: 600 }}>{author}</p>
            {role && <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 13 }}>{role}</p>}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/*  10 · ComparisonTable — us vs the alternative                       */
/* ------------------------------------------------------------------ */

export function ComparisonTable({
  kicker,
  title,
  intro,
  columns,
  rows,
  alt = false,
  id,
}: BaseProps & {
  kicker?: string;
  title?: ReactNode;
  intro?: ReactNode;
  /** [ours, theirs] header labels. */
  columns: [string, string];
  rows: { label: string; a: ReactNode | boolean; b: ReactNode | boolean }[];
}) {
  const Cell = ({ v, accent }: { v: ReactNode | boolean; accent?: boolean }) => {
    if (v === true) return <Check size={18} weight="bold" color={accent ? tokens.brand : tokens.inkMuted} />;
    if (v === false) return <X size={16} weight="bold" color={tokens.muted} style={{ opacity: 0.5 }} />;
    return <span style={{ fontSize: 14, color: accent ? tokens.ink : tokens.body, fontWeight: accent ? 600 : 400 }}>{v}</span>;
  };
  return (
    <Section alt={alt} id={id}>
      {title && <SectionHeading kicker={kicker} title={title} intro={intro} />}
      <Reveal>
        <div style={{ border: `1px solid ${tokens.hairline}`, borderRadius: 18, overflow: "hidden", maxWidth: 820 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr 1fr", background: tokens.pageBgDeep, borderBottom: `1px solid ${tokens.hairline}` }}>
            <div style={{ padding: "16px 22px" }} />
            <div style={{ padding: "16px 18px", textAlign: "center", fontSize: 13, fontWeight: 700, color: tokens.brand, letterSpacing: "-0.01em" }}>{columns[0]}</div>
            <div style={{ padding: "16px 18px", textAlign: "center", fontSize: 13, fontWeight: 600, color: tokens.muted }}>{columns[1]}</div>
          </div>
          {rows.map((r, i) => (
            <div key={r.label} style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr 1fr", borderTop: i === 0 ? "none" : `1px solid ${tokens.hairline}`, alignItems: "center" }}>
              <div style={{ padding: "15px 22px", fontSize: 14, fontWeight: 500, color: tokens.ink }}>{r.label}</div>
              <div style={{ padding: "15px 18px", display: "grid", placeItems: "center", background: "oklch(0.95 0.040 27 / 0.25)" }}><Cell v={r.a} accent /></div>
              <div style={{ padding: "15px 18px", display: "grid", placeItems: "center" }}><Cell v={r.b} /></div>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/*  11 · Faq — accordion (interactive)                                 */
/* ------------------------------------------------------------------ */

export function Faq({
  kicker = "Questions",
  title = "Good questions to ask.",
  items,
  alt = false,
  id,
}: BaseProps & { kicker?: string; title?: ReactNode; items: { q: string; a: ReactNode }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <Section alt={alt} id={id}>
      <div style={{ maxWidth: 760, marginInline: "auto" }}>
        <SectionHeading kicker={kicker} title={title} align="center" maxWidth={760} />
        <div style={{ border: `1px solid ${tokens.hairline}`, borderRadius: 16, overflow: "hidden", background: tokens.card }}>
          {items.map((it, i) => {
            const isOpen = open === i;
            return (
              <div key={i} style={{ borderTop: i === 0 ? "none" : `1px solid ${tokens.hairline}` }}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, padding: "20px 24px", background: "transparent", border: "none", cursor: "pointer", textAlign: "left" }}
                >
                  <span style={{ fontFamily: FONT, fontSize: 16, fontWeight: 600, color: tokens.ink }}>{it.q}</span>
                  <CaretDown size={16} weight="bold" color={tokens.muted} style={{ flexShrink: 0, transform: isOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s ease" }} />
                </button>
                {isOpen && (
                  <div style={{ padding: "0 24px 22px" }}>
                    <p style={{ color: tokens.muted, fontSize: 15, lineHeight: 1.6, maxWidth: 620 }}>{it.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/*  12 · AppShowcase — phone frame + app features                      */
/* ------------------------------------------------------------------ */

export function AppShowcase({
  kicker = "GridOS",
  title,
  body,
  features,
  media,
  reverse = false,
  alt = false,
  id,
}: BaseProps & { kicker?: string; title: ReactNode; body?: ReactNode; features: { icon: Icon; label: string }[]; media?: ReactNode; reverse?: boolean }) {
  return (
    <Section alt={alt} id={id}>
      <div className="lg:grid-cols-2" style={{ display: "grid", gridTemplateColumns: "1fr", gap: 56, alignItems: "center" }}>
        <Reveal style={{ order: reverse ? 2 : 1 }}>
          <div>
            <Kicker>{kicker}</Kicker>
            <h3 style={{ fontFamily: FONT, color: tokens.ink, fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 600, letterSpacing: "-0.025em", lineHeight: 1.1, marginTop: 14 }}>{title}</h3>
            {body && <p style={{ color: tokens.muted, fontSize: 16, lineHeight: 1.6, marginTop: 16, maxWidth: 480 }}>{body}</p>}
            <div className="sm:grid-cols-2" style={{ display: "grid", gridTemplateColumns: "1fr", gap: 18, marginTop: 28 }}>
              {features.map((f) => (
                <div key={f.label} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <span style={{ flexShrink: 0, width: 36, height: 36, borderRadius: 10, background: tokens.pageBgDeep, border: `1px solid ${tokens.hairline}`, display: "grid", placeItems: "center" }}>
                    <f.icon size={18} weight="duotone" color={tokens.ink} />
                  </span>
                  <span style={{ fontSize: 14.5, color: tokens.body, lineHeight: 1.4, paddingTop: 8 }}>{f.label}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.08} style={{ order: reverse ? 1 : 2 }}>
          {media ?? <MediaSlot label="GridOS app" ratio="3 / 4" />}
        </Reveal>
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/*  13 · FramedCTA — blueprint-framed closing block                    */
/* ------------------------------------------------------------------ */

export function FramedCTA({
  title,
  body,
  primary = { label: "Book a free site survey", to: "/contact" },
  secondary,
  id,
}: BaseProps & { title: ReactNode; body?: ReactNode; primary?: { label: string; to: string }; secondary?: { label: string; to: string } }) {
  return (
    <section style={{ background: tokens.ink, paddingBlock: 100 }} id={id}>
      <Container>
        <div style={{ position: "relative", border: "1px solid rgba(255,255,255,0.16)", borderRadius: 24, padding: "clamp(40px, 6vw, 72px)", overflow: "hidden" }}>
          <BlueprintGrid dark fade={false} opacity={0.5} />
          <RegistrationCorners inset={0} dark />
          <div style={{ position: "relative", zIndex: 1, textAlign: "center", maxWidth: 680, marginInline: "auto" }}>
            <Reveal>
              <h2 style={{ fontFamily: DISPLAY, color: "#fff", fontSize: "clamp(30px, 4.2vw, 50px)", fontWeight: 600, letterSpacing: "-0.035em", lineHeight: 1.05, textWrap: "balance" }}>{title}</h2>
              {body && <p style={{ color: "rgba(255,255,255,0.66)", fontSize: 17, lineHeight: 1.55, marginTop: 18, maxWidth: 480, marginInline: "auto" }}>{body}</p>}
              <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12, marginTop: 32 }}>
                <Button to={primary.to} variant="primary" size="lg">{primary.label}</Button>
                {secondary && <Button to={secondary.to} variant="secondary" size="lg" trailingArrow={false} onDark>{secondary.label}</Button>}
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  14 · BigStatement — oversized closing line                         */
/* ------------------------------------------------------------------ */

export function BigStatement({
  line,
  primary,
  secondary,
  dark = true,
  id,
}: BaseProps & { line: ReactNode; primary?: { label: string; to: string }; secondary?: { label: string; to: string } }) {
  const ink = dark ? "#fff" : tokens.ink;
  return (
    <Section dark={dark} py={120} id={id}>
      <div className="md:flex-row md:items-end md:justify-between" style={{ display: "flex", flexDirection: "column", gap: 32 }}>
        <Reveal>
          <h2 style={{ fontFamily: DISPLAY, color: ink, fontSize: "clamp(34px, 5.5vw, 68px)", fontWeight: 600, letterSpacing: "-0.04em", lineHeight: 1.0, maxWidth: "18ch", textWrap: "balance" }}>{line}</h2>
        </Reveal>
        {(primary || secondary) && (
          <Reveal delay={0.08}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              {primary && <Button to={primary.to} variant="primary" size="lg">{primary.label}</Button>}
              {secondary && <Button to={secondary.to} variant="secondary" size="lg" trailingArrow={false} onDark={dark}>{secondary.label}</Button>}
            </div>
          </Reveal>
        )}
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/*  15 · GalleryStrip — horizontal photo rail                          */
/* ------------------------------------------------------------------ */

export function GalleryStrip({
  kicker,
  title,
  images,
  alt = false,
  id,
}: BaseProps & { kicker?: string; title?: ReactNode; images: { src: string; caption?: string }[] }) {
  return (
    <Section alt={alt} id={id}>
      {title && <SectionHeading kicker={kicker} title={title} />}
      <div style={{ display: "flex", gap: 18, overflowX: "auto", paddingBottom: 12, scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" }}>
        {images.map((im, i) => (
          <figure key={i} style={{ flex: "0 0 auto", width: "min(82vw, 460px)", margin: 0, scrollSnapAlign: "start" }}>
            <div style={{ aspectRatio: "4 / 3", borderRadius: 18, overflow: "hidden", border: `1px solid ${tokens.hairline}`, background: tokens.pageBgDeep }}>
              <img src={im.src} alt={im.caption ?? ""} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            {im.caption && <figcaption style={{ fontSize: 13, color: tokens.muted, marginTop: 10 }}>{im.caption}</figcaption>}
          </figure>
        ))}
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/*  16 · AltFeatures — auto-alternating Stripe-style rows              */
/* ------------------------------------------------------------------ */

export function AltFeatures({
  kicker,
  title,
  intro,
  rows,
  alt = false,
  id,
}: BaseProps & {
  kicker?: string;
  title?: ReactNode;
  intro?: ReactNode;
  rows: { kicker?: string; title: ReactNode; body?: ReactNode; bullets?: string[]; media?: ReactNode; cta?: { label: string; to: string } }[];
}) {
  return (
    <Section alt={alt} id={id}>
      {title && <SectionHeading kicker={kicker} title={title} intro={intro} />}
      <div style={{ display: "flex", flexDirection: "column", gap: 88 }}>
        {rows.map((r, i) => (
          <FeatureRow key={i} {...r} reverse={i % 2 === 1} />
        ))}
      </div>
    </Section>
  );
}
