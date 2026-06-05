/*
  Marketing primitives — the shared vocabulary every GridEnergy marketing page
  is assembled from. One import surface so pages stay consistent and thin.

  Design system: V3 olive substrate + GridRed spark, read from the JS `tokens`
  object (the shipped pattern — inline styles, not Tailwind classes). Inter for
  display + body, Geist Mono for data. GridRed is the SOLE accent.

  Hard rule support: <Gated> visibly flags any number/spec/claim that is not yet
  calculated or sourced. Every gated value renders with a dashed GridRed outline
  and a "TBD" tag so it can never be mistaken for a real, shippable figure — and
  so it's greppable (search: "GATED" / component <Gated>) before launch.
*/

import {
  type CSSProperties,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { Link } from "react-router";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, type Icon } from "@phosphor-icons/react";
import { tokens } from "../../routes/_preview/_v3-tokens";

const FONT = "Inter, ui-sans-serif, system-ui, sans-serif";
// Clash Grotesk is the display face (loaded via @font-face), reserved for
// marquee headlines only — hero h1 + CTA-banner h2 — per DESIGN.md. Section h2s
// stay Inter. Falls back to Inter if Clash fails to load.
const DISPLAY = '"Clash Grotesk", Inter, ui-sans-serif, system-ui, sans-serif';
const MONO = '"Geist Mono", ui-monospace, SFMono-Regular, monospace';
const EASE = [0.22, 1, 0.36, 1] as const;
const MAXW = 1280;

/* ------------------------------------------------------------------ */
/*  Container                                                          */
/* ------------------------------------------------------------------ */

export function Container({
  children,
  className,
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      className={className}
      style={{ maxWidth: MAXW, marginInline: "auto", paddingInline: 32, ...style }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Reveal — fade-up on scroll into view (reduced-motion safe)         */
/* ------------------------------------------------------------------ */

export function Reveal({
  children,
  delay = 0,
  y = 16,
  className,
  style,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const reduce = useReducedMotion() ?? false;
  return (
    <motion.div
      className={className}
      style={style}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Kicker — small uppercase eyebrow, GridRed by default               */
/* ------------------------------------------------------------------ */

export function Kicker({
  children,
  color = tokens.brand,
  style,
}: {
  children: ReactNode;
  color?: string;
  style?: CSSProperties;
}) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        color,
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: "0.16em",
        textTransform: "uppercase",
        ...style,
      }}
    >
      <span
        aria-hidden
        style={{ width: 6, height: 6, borderRadius: 999, background: tokens.brand, flexShrink: 0 }}
      />
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Gated — visible placeholder flag for unsourced values              */
/* ------------------------------------------------------------------ */

export function Gated({
  children,
  note,
  block,
}: {
  children: ReactNode;
  /** What needs to happen before this can ship (shown on hover / in report). */
  note?: string;
  block?: boolean;
}) {
  return (
    <span
      data-gated="true"
      title={note ? `PLACEHOLDER — ${note}` : "PLACEHOLDER — verify/source before launch"}
      style={{
        display: block ? "block" : "inline-flex",
        alignItems: "center",
        gap: 6,
        position: "relative",
        border: `1px dashed ${tokens.brand}`,
        borderRadius: 6,
        padding: block ? "10px 12px" : "1px 6px",
        background: "oklch(0.95 0.040 27 / 0.35)",
      }}
    >
      <span
        aria-hidden
        style={{
          fontFamily: MONO,
          fontSize: 8,
          fontWeight: 600,
          letterSpacing: "0.1em",
          color: tokens.brand,
          textTransform: "uppercase",
          opacity: 0.85,
        }}
      >
        TBD
      </span>
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Button — primary / secondary / ghost                               */
/* ------------------------------------------------------------------ */

type ButtonProps = {
  children: ReactNode;
  to?: string;
  href?: string;
  variant?: "primary" | "secondary" | "ghost";
  size?: "md" | "lg";
  icon?: Icon;
  trailingArrow?: boolean;
  onDark?: boolean;
  style?: CSSProperties;
};

export function Button({
  children,
  to,
  href,
  variant = "primary",
  size = "md",
  icon: IconCmp,
  trailingArrow = true,
  onDark = false,
  style,
}: ButtonProps) {
  const [hover, setHover] = useState(false);
  const pad = size === "lg" ? "15px 26px" : "12px 20px";
  const fontSize = size === "lg" ? 14 : 13;

  const base: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    fontFamily: FONT,
    fontSize,
    fontWeight: 600,
    letterSpacing: "-0.005em",
    borderRadius: 14,
    padding: pad,
    textDecoration: "none",
    cursor: "pointer",
    border: "1px solid transparent",
    transition: "background 0.16s ease, border-color 0.16s ease, transform 0.16s ease",
    transform: hover ? "translateY(-1px)" : "translateY(0)",
  };

  const variants: Record<string, CSSProperties> = {
    primary: {
      background: hover ? tokens.brandHover : tokens.brand,
      color: "#ffffff",
    },
    secondary: {
      background: onDark ? "transparent" : tokens.card,
      color: onDark ? "#ffffff" : tokens.ink,
      borderColor: onDark ? "rgba(255,255,255,0.28)" : tokens.hairlineStrong,
    },
    ghost: {
      background: "transparent",
      color: onDark ? "#ffffff" : tokens.ink,
      borderColor: "transparent",
    },
  };

  const content = (
    <>
      {IconCmp && <IconCmp size={fontSize + 1} weight="fill" />}
      {children}
      {trailingArrow && (
        <ArrowRight
          size={fontSize - 1}
          weight="bold"
          style={{ transform: hover ? "translateX(2px)" : "translateX(0)", transition: "transform 0.16s ease" }}
        />
      )}
    </>
  );

  const merged = { ...base, ...variants[variant], ...style };
  const handlers = {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
  };

  if (to) return <Link to={to} style={merged} {...handlers}>{content}</Link>;
  return <a href={href ?? "#"} style={merged} {...handlers}>{content}</a>;
}

/* ------------------------------------------------------------------ */
/*  Section — vertical rhythm wrapper, optional alt substrate          */
/* ------------------------------------------------------------------ */

export function Section({
  children,
  id,
  alt = false,
  dark = false,
  py = 96,
  style,
}: {
  children: ReactNode;
  id?: string;
  alt?: boolean;
  dark?: boolean;
  py?: number;
  style?: CSSProperties;
}) {
  const bg = dark ? tokens.ink : alt ? tokens.pageBgDeep : tokens.pageBg;
  return (
    <section
      id={id}
      style={{
        background: bg,
        color: dark ? "#ffffff" : tokens.body,
        paddingBlock: py,
        borderTop: alt ? `1px solid ${tokens.hairline}` : undefined,
        borderBottom: alt ? `1px solid ${tokens.hairline}` : undefined,
        ...style,
      }}
    >
      <Container>{children}</Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  SectionHeading                                                     */
/* ------------------------------------------------------------------ */

export function SectionHeading({
  kicker,
  title,
  intro,
  align = "left",
  dark = false,
  maxWidth = 720,
}: {
  kicker?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  dark?: boolean;
  maxWidth?: number;
}) {
  return (
    <div
      style={{
        textAlign: align,
        marginInline: align === "center" ? "auto" : undefined,
        maxWidth,
        marginBottom: 48,
      }}
    >
      {kicker && (
        <Reveal>
          <Kicker style={{ justifyContent: align === "center" ? "center" : "flex-start" }}>
            {kicker}
          </Kicker>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2
          style={{
            fontFamily: FONT,
            color: dark ? "#ffffff" : tokens.ink,
            fontSize: "clamp(30px, 4vw, 46px)",
            fontWeight: 600,
            letterSpacing: "-0.03em",
            lineHeight: 1.06,
            marginTop: kicker ? 16 : 0,
            textWrap: "balance",
          }}
        >
          {title}
        </h2>
      </Reveal>
      {intro && (
        <Reveal delay={0.1}>
          <p
            style={{
              color: dark ? "rgba(255,255,255,0.7)" : tokens.muted,
              fontSize: 17,
              lineHeight: 1.6,
              marginTop: 18,
              maxWidth: 640,
              marginInline: align === "center" ? "auto" : undefined,
            }}
          >
            {intro}
          </p>
        </Reveal>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  PageHero — interior-page hero (compact, type-led)                  */
/* ------------------------------------------------------------------ */

export function PageHero({
  kicker,
  title,
  subtitle,
  primary,
  secondary,
  align = "left",
}: {
  kicker?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  primary?: { label: string; to: string };
  secondary?: { label: string; to: string };
  align?: "left" | "center";
}) {
  return (
    <section
      style={{
        background: tokens.pageBg,
        paddingTop: 88,
        paddingBottom: 72,
        borderBottom: `1px solid ${tokens.hairline}`,
      }}
    >
      <Container>
        <div
          style={{
            maxWidth: 820,
            marginInline: align === "center" ? "auto" : undefined,
            textAlign: align,
          }}
        >
          {kicker && (
            <Reveal>
              <Kicker style={{ justifyContent: align === "center" ? "center" : "flex-start" }}>
                {kicker}
              </Kicker>
            </Reveal>
          )}
          <Reveal delay={0.05}>
            <h1
              style={{
                fontFamily: DISPLAY,
                color: tokens.ink,
                fontSize: "clamp(38px, 6vw, 66px)",
                fontWeight: 600,
                letterSpacing: "-0.035em",
                lineHeight: 1.0,
                marginTop: kicker ? 20 : 0,
                textWrap: "balance",
              }}
            >
              {title}
            </h1>
          </Reveal>
          {subtitle && (
            <Reveal delay={0.1}>
              <p
                style={{
                  color: tokens.muted,
                  fontSize: 19,
                  lineHeight: 1.55,
                  marginTop: 22,
                  maxWidth: 620,
                  marginInline: align === "center" ? "auto" : undefined,
                }}
              >
                {subtitle}
              </p>
            </Reveal>
          )}
          {(primary || secondary) && (
            <Reveal delay={0.15}>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 12,
                  marginTop: 32,
                  justifyContent: align === "center" ? "center" : "flex-start",
                }}
              >
                {primary && (
                  <Button to={primary.to} variant="primary" size="lg">
                    {primary.label}
                  </Button>
                )}
                {secondary && (
                  <Button to={secondary.to} variant="secondary" size="lg" trailingArrow={false}>
                    {secondary.label}
                  </Button>
                )}
              </div>
            </Reveal>
          )}
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  FeatureRow — Stripe-style: copy one side, media slot the other     */
/* ------------------------------------------------------------------ */

export function FeatureRow({
  kicker,
  title,
  body,
  bullets,
  media,
  reverse = false,
  cta,
}: {
  kicker?: string;
  title: ReactNode;
  body?: ReactNode;
  bullets?: string[];
  media?: ReactNode;
  reverse?: boolean;
  cta?: { label: string; to: string };
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr",
        gap: 40,
        alignItems: "center",
      }}
      className="md:grid-cols-2"
    >
      <Reveal style={{ order: reverse ? 2 : 1 }}>
        <div>
          {kicker && <Kicker>{kicker}</Kicker>}
          <h3
            style={{
              fontFamily: FONT,
              color: tokens.ink,
              fontSize: "clamp(24px, 3vw, 34px)",
              fontWeight: 600,
              letterSpacing: "-0.025em",
              lineHeight: 1.1,
              marginTop: kicker ? 14 : 0,
            }}
          >
            {title}
          </h3>
          {body && (
            <p style={{ color: tokens.muted, fontSize: 16, lineHeight: 1.6, marginTop: 16, maxWidth: 480 }}>
              {body}
            </p>
          )}
          {bullets && (
            <ul style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 10 }}>
              {bullets.map((b) => (
                <li key={b} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <span
                    aria-hidden
                    style={{ width: 6, height: 6, borderRadius: 999, background: tokens.brand, flexShrink: 0, marginTop: 8 }}
                  />
                  <span style={{ color: tokens.body, fontSize: 15, lineHeight: 1.5 }}>{b}</span>
                </li>
              ))}
            </ul>
          )}
          {cta && (
            <div style={{ marginTop: 28 }}>
              <Button to={cta.to} variant="secondary">{cta.label}</Button>
            </div>
          )}
        </div>
      </Reveal>
      <Reveal delay={0.08} style={{ order: reverse ? 1 : 2 }}>
        {media ?? <MediaSlot />}
      </Reveal>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  MediaSlot — default placeholder surface for screenshots/mockups    */
/* ------------------------------------------------------------------ */

export function MediaSlot({
  label = "UI mockup",
  ratio = "4 / 3",
  children,
}: {
  label?: string;
  ratio?: string;
  children?: ReactNode;
}) {
  return (
    <div
      style={{
        aspectRatio: ratio,
        background: tokens.card,
        border: `1px solid ${tokens.hairline}`,
        borderRadius: 18,
        overflow: "hidden",
        display: "grid",
        placeItems: "center",
        boxShadow: "0 24px 60px -34px oklch(15.3% 0.006 107.1 / 0.4)",
      }}
    >
      {children ?? (
        <div style={{ textAlign: "center" }}>
          <span
            style={{
              fontFamily: MONO,
              fontSize: 11,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: tokens.muted,
            }}
          >
            {label}
          </span>
          <p style={{ fontFamily: MONO, fontSize: 9, color: tokens.brand, marginTop: 6, letterSpacing: "0.1em" }}>
            ASSET TBD
          </p>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  CardGrid + FeatureCard                                             */
/* ------------------------------------------------------------------ */

export function CardGrid({
  children,
  cols = 3,
}: {
  children: ReactNode;
  cols?: 2 | 3 | 4;
}) {
  const colsClass =
    cols === 2 ? "sm:grid-cols-2" : cols === 4 ? "sm:grid-cols-2 lg:grid-cols-4" : "sm:grid-cols-2 lg:grid-cols-3";
  return (
    <div className={`grid grid-cols-1 gap-5 ${colsClass}`}>{children}</div>
  );
}

export function FeatureCard({
  icon: IconCmp,
  title,
  body,
  meta,
  to,
  image,
}: {
  icon?: Icon;
  title: ReactNode;
  body?: ReactNode;
  meta?: ReactNode;
  to?: string;
  image?: string;
}) {
  const [hover, setHover] = useState(false);
  const inner = (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        height: "100%",
        background: tokens.card,
        border: `1px solid ${hover ? tokens.hairlineStrong : tokens.hairline}`,
        borderRadius: 16,
        overflow: "hidden",
        transition: "border-color 0.2s ease, transform 0.2s ease, box-shadow 0.25s ease",
        transform: to && hover ? "translateY(-2px)" : "translateY(0)",
        boxShadow: to && hover ? "0 18px 40px -28px oklch(15.3% 0.006 107.1 / 0.35)" : "none",
      }}
    >
      {image && (
        <div style={{ aspectRatio: "16 / 9", overflow: "hidden", background: tokens.pageBgDeep }}>
          <img
            src={image}
            alt=""
            loading="lazy"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transform: hover ? "scale(1.04)" : "scale(1)",
              transition: "transform 0.5s cubic-bezier(0.22,1,0.36,1)",
            }}
          />
        </div>
      )}
      <div style={{ padding: 24 }}>
        {IconCmp && (
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 11,
              background: tokens.pageBgDeep,
              border: `1px solid ${tokens.hairline}`,
              display: "grid",
              placeItems: "center",
              marginBottom: 16,
            }}
          >
            <IconCmp size={20} weight="duotone" color={tokens.ink} />
          </div>
        )}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
          <h3 style={{ fontFamily: FONT, color: tokens.ink, fontSize: 17, fontWeight: 600, letterSpacing: "-0.015em" }}>
            {title}
          </h3>
          {to && (
            <ArrowRight
              size={15}
              weight="bold"
              color={tokens.brand}
              style={{ opacity: hover ? 1 : 0.35, transform: hover ? "translateX(2px)" : "none", transition: "all 0.2s ease", flexShrink: 0 }}
            />
          )}
        </div>
        {body && (
          <p style={{ color: tokens.muted, fontSize: 14, lineHeight: 1.55, marginTop: 8 }}>{body}</p>
        )}
        {meta && (
          <div style={{ marginTop: 14, fontSize: 12, color: tokens.body, fontWeight: 500 }}>{meta}</div>
        )}
      </div>
    </div>
  );
  if (to) return <Link to={to} style={{ textDecoration: "none", display: "block", height: "100%" }}>{inner}</Link>;
  return inner;
}

/* ------------------------------------------------------------------ */
/*  CTASection — type-led closing conversion band                      */
/* ------------------------------------------------------------------ */

export function CTASection({
  title,
  subtitle,
  primary = { label: "Book a free site survey", to: "/contact" },
  secondary,
  dark = true,
}: {
  title: ReactNode;
  subtitle?: ReactNode;
  primary?: { label: string; to: string };
  secondary?: { label: string; to: string };
  dark?: boolean;
}) {
  return (
    <section style={{ background: dark ? tokens.ink : tokens.pageBgDeep, paddingBlock: 96 }}>
      <Container>
        <div
          className="md:flex-row md:items-end md:justify-between"
          style={{ display: "flex", flexDirection: "column", gap: 32 }}
        >
          <Reveal>
            <h2
              style={{
                fontFamily: DISPLAY,
                color: dark ? "#ffffff" : tokens.ink,
                fontSize: "clamp(28px, 4vw, 44px)",
                fontWeight: 600,
                letterSpacing: "-0.03em",
                lineHeight: 1.08,
                maxWidth: "16ch",
                textWrap: "balance",
              }}
            >
              {title}
            </h2>
            {subtitle && (
              <p style={{ color: dark ? "rgba(255,255,255,0.65)" : tokens.muted, fontSize: 16, lineHeight: 1.55, marginTop: 16, maxWidth: 460 }}>
                {subtitle}
              </p>
            )}
          </Reveal>
          <Reveal delay={0.08}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              <Button to={primary.to} variant="primary" size="lg">{primary.label}</Button>
              {secondary && (
                <Button to={secondary.to} variant="secondary" size="lg" trailingArrow={false} onDark={dark}>
                  {secondary.label}
                </Button>
              )}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Hairline rule                                                      */
/* ------------------------------------------------------------------ */

export function Rule({ style }: { style?: CSSProperties }) {
  return <div style={{ height: 1, background: tokens.hairline, ...style }} />;
}

/* small util kept for pages that need an in-view counter later */
export function useInViewOnce<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { rootMargin: "-60px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [seen]);
  return [ref, seen] as const;
}
