import { useState, type CSSProperties } from "react";
import { Lightning, type Icon } from "@phosphor-icons/react";
import { tokens } from "../../routes/_preview/_v3-tokens";

export type ProductHeroProps = {
  kicker: string;
  productName: string;
  tagline: string;
  keySpecInline: string;
  primaryCta: { label: string; href: string };
  image?: string;
  FallbackIcon?: Icon;
};

/*
  ProductHero — solution detail page hero.
  50/50 desktop split. Marquee headline in Clash Grotesk (v3-display).
  Image fallback: large duotone Phosphor icon on olive-100 bg.
  Motion: respect prefers-reduced-motion.
*/
export function ProductHero({
  kicker,
  productName,
  tagline,
  keySpecInline,
  primaryCta,
  image,
  FallbackIcon,
}: ProductHeroProps) {
  const [ctaHovered, setCtaHovered] = useState(false);

  const prefersReduced =
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;

  const transition: CSSProperties["transition"] = prefersReduced
    ? "none"
    : "background 0.15s ease, transform 0.2s ease";

  return (
    <section
      style={{
        background: tokens.pageBg,
        borderBottom: `1px solid ${tokens.hairline}`,
      }}
    >
      <div
        className="mx-auto max-w-[1280px] px-8 py-16"
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }}
      >
        {/* — LEFT: text column — */}
        <div>
          {/* kicker */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 20,
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: 999,
                background: tokens.brand,
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: tokens.brand,
              }}
            >
              {kicker}
            </span>
          </div>

          {/* marquee headline — Clash Grotesk */}
          <h1
            className=""
            style={{
              fontSize: "clamp(40px, 5vw, 72px)",
              fontWeight: 600,
              letterSpacing: "-0.035em",
              lineHeight: 0.98,
              color: tokens.ink,
              marginBottom: 20,
            }}
          >
            {productName}
          </h1>

          {/* tagline */}
          <p
            style={{
              fontSize: 17,
              lineHeight: 1.6,
              color: tokens.body,
              maxWidth: "52ch",
              marginBottom: 24,
            }}
          >
            {tagline}
          </p>

          {/* key spec inline — Geist Mono */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              background: tokens.pageBgDeep,
              border: `1px solid ${tokens.hairline}`,
              borderRadius: 10,
              padding: "8px 14px",
              marginBottom: 32,
            }}
          >
            <span
              style={{
                fontSize: 12,
                fontWeight: 500,
                letterSpacing: "0.04em",
                color: tokens.inkMuted,
                fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
              }}
            >
              {keySpecInline}
            </span>
          </div>

          {/* CTA */}
          <div>
            <a
              href={primaryCta.href}
              onMouseEnter={() => setCtaHovered(true)}
              onMouseLeave={() => setCtaHovered(false)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "12px 20px",
                background: ctaHovered ? tokens.brandHover : tokens.brand,
                color: "#ffffff",
                borderRadius: 12,
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                textDecoration: "none",
                transition,
                transform: ctaHovered && !prefersReduced ? "translateY(-1px)" : "translateY(0)",
              }}
            >
              <Lightning size={14} weight="fill" color="white" />
              {primaryCta.label}
            </a>
          </div>
        </div>

        {/* — RIGHT: visual column — */}
        <div
          style={{
            background: tokens.pageBgDeep,
            border: `1px solid ${tokens.hairline}`,
            borderRadius: 24,
            aspectRatio: "4 / 3",
            overflow: "hidden",
            display: "grid",
            placeItems: "center",
            position: "relative",
          }}
        >
          {image ? (
            <img
              src={image}
              alt={productName}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              loading="eager"
            />
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 16,
                padding: 32,
              }}
            >
              {FallbackIcon ? (
                <FallbackIcon size={120} weight="duotone" color={tokens.ink} style={{ opacity: 0.55 }} />
              ) : (
                <Lightning size={120} weight="duotone" color={tokens.ink} style={{ opacity: 0.55 }} />
              )}
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: tokens.muted,
                }}
              >
                Product render
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Mobile layout override via inline media-query shim */}
      <style>{`
        @media (max-width: 768px) {
          .product-hero-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
