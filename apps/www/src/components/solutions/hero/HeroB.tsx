/*
  HeroB — Variant B: Cinematic install (image-led, aspirational).

  Audience: /solutions/homes/ on gridenergy.co.in.
  Theatre: a full-bleed install photograph slowly drifts (Ken Burns +
  parallax) under a floating white "manifest" card. The image carries the
  emotion; the card carries the operator-grade restraint. It is the
  opposite of a live console — you are standing in front of an installed
  asset feeling its presence, while the math sits in your hand.

  Craft choices, in order of conviction:
    1. Parallax + slow Ken Burns drift on the image, layered with a
       directional dark-vignette + warm olive tint so the white card is
       always legible regardless of where the user scrolls.
    2. The "26 mo" payback figure counts down from 36 → 26 once on mount,
       a small operator delight that says "we did the math, here it is".
    3. A subtle 1px GridRed scroll-progress rail under the manifest card
       (0 → 100% across the first 36vh of scroll). It connects this
       cinematic moment to the proof that lives below.
    4. Brand-dot ambient breathe (3.2s), pinned at peripheral vision —
       the only "alive" thing in an otherwise still composition.

  Honors prefers-reduced-motion: kills Ken Burns, parallax, counter
  animation, brand-dot breathe, scroll affordance bounce. Card-entrance
  staggered fade collapses to instant. Static fallback is fully usable.

  No new deps. Stack: React 19, motion v12, @phosphor-icons/react.
*/

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowRight, CaretDown, Lightning } from "@phosphor-icons/react";
import { tokens } from "../../../routes/_preview/_v3-tokens";
import { Logo } from "../../Logo";

const HERO_IMAGE = "/images/solutions/homes-apartment.png";
const EASE_OUT_CUBIC = [0.22, 1, 0.36, 1] as const;

export default function HeroB() {
  const reduce = useReducedMotion() ?? false;
  const sectionRef = useRef<HTMLElement | null>(null);

  /* ---------- scroll: parallax + progress rail ---------- */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  /* Image drifts upward at half-rate as we scroll the hero out. */
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  /* Manifest card eases out faster than the image — gentle depth. */
  const cardY = useTransform(scrollYProgress, [0, 1], ["0%", "-6%"]);
  const cardOpacity = useTransform(scrollYProgress, [0, 0.65, 1], [1, 1, 0]);
  /* Red rail under the card fills 0 → 100% over the first third of scroll. */
  const railScale = useTransform(scrollYProgress, [0, 0.36], [0, 1]);

  /* ---------- scroll affordance: fade after first scroll ---------- */
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 24) setScrolled(true);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ---------- payback counter: 36 → 26, once on mount ---------- */
  const [payback, setPayback] = useState(reduce ? 26 : 36);
  useEffect(() => {
    if (reduce) return;
    let raf = 0;
    const start = performance.now();
    const dur = 1400; // ms
    const from = 36;
    const to = 26;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / dur);
      // ease-out-cubic
      const eased = 1 - Math.pow(1 - t, 3);
      const value = Math.round(from + (to - from) * eased);
      setPayback(value);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    // tiny defer so first paint shows 36 and the count is perceptible
    const start1 = requestAnimationFrame(() => {
      raf = requestAnimationFrame(tick);
    });
    return () => {
      cancelAnimationFrame(start1);
      cancelAnimationFrame(raf);
    };
  }, [reduce]);

  /* ---------- entrance stagger ---------- */
  const stagger = (i: number) =>
    reduce
      ? { initial: false }
      : ({
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: {
            duration: 0.7,
            ease: EASE_OUT_CUBIC,
            delay: 0.12 + i * 0.06,
          },
        } as const);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="hero-b-headline"
      className="relative w-full overflow-hidden"
      style={{
        minHeight: "100vh",
        background: tokens.ink,
        fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
      }}
    >
      {/* ─── Image layer: full-bleed, parallax, slow Ken Burns drift ─── */}
      <motion.div
        aria-hidden
        className="absolute inset-0"
        style={{ y: reduce ? "0%" : imageY, willChange: "transform" }}
      >
        <motion.img
          src={HERO_IMAGE}
          alt=""
          className="absolute inset-0 h-full w-full select-none"
          style={{
            objectFit: "cover",
            objectPosition: "center 38%",
            willChange: "transform",
          }}
          draggable={false}
          loading="eager"
          decoding="async"
          initial={{ scale: 1.04, opacity: 0 }}
          animate={
            reduce
              ? { scale: 1.04, opacity: 1 }
              : { scale: 1.1, opacity: 1 }
          }
          transition={
            reduce
              ? { duration: 0.4 }
              : {
                  opacity: { duration: 1.2, ease: EASE_OUT_CUBIC },
                  scale: { duration: 24, ease: "linear" },
                }
          }
        />
        {/* Warm olive tint — pulls image into the brand neutral. */}
        <div
          className="absolute inset-0"
          style={{
            background: tokens.ink,
            mixBlendMode: "multiply",
            opacity: 0.18,
          }}
        />
        {/* Directional vignette: darker bottom-left where the card lands. */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 90% at 78% 20%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.18) 55%, rgba(0,0,0,0.55) 100%)",
          }}
        />
        {/* Subtle film grain via stacked low-opacity ink — kills banding. */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0) 22%, rgba(0,0,0,0) 60%, rgba(0,0,0,0.22) 100%)",
          }}
        />
      </motion.div>

      {/* ─── Top chrome row: logo + brand kicker (lives on top of image) ─── */}
      <div
        className="relative z-10 mx-auto flex w-full items-center justify-between"
        style={{
          maxWidth: 1280,
          padding: "28px 32px 0",
        }}
      >
        <motion.div
          className="flex items-center gap-2.5"
          {...stagger(0)}
        >
          <Logo variant="gridenergy" size={28} fill="#ffffff" />
          <span
            style={{
              color: "#ffffff",
              fontSize: 15,
              fontWeight: 600,
              letterSpacing: "-0.02em",
              opacity: 0.94,
            }}
          >
            GridEnergy
          </span>
        </motion.div>

        <motion.div
          className="hidden items-center gap-2 md:flex"
          {...stagger(1)}
        >
          <span
            style={{
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.78)",
            }}
          >
            For Indian homes
          </span>
          <span
            style={{
              width: 4,
              height: 4,
              borderRadius: 999,
              background: tokens.brand,
              boxShadow: `0 0 12px ${tokens.brand}`,
            }}
          />
        </motion.div>
      </div>

      {/* ─── Manifest card: the only solid surface, the only voice ─── */}
      <motion.div
        className="relative z-10 mx-auto"
        style={{
          maxWidth: 1280,
          padding: "0 32px",
          y: reduce ? "0%" : cardY,
          opacity: reduce ? 1 : cardOpacity,
        }}
      >
        <div
          className="grid w-full grid-cols-12 gap-8"
          style={{
            minHeight: "calc(100vh - 88px)",
            alignContent: "center",
            paddingTop: "calc(8vh + 24px)",
            paddingBottom: "12vh",
          }}
        >
          <motion.article
            className="col-span-12 lg:col-span-7 xl:col-span-6"
            initial={
              reduce
                ? false
                : { opacity: 0, y: 24, filter: "blur(8px)" }
            }
            animate={
              reduce
                ? undefined
                : { opacity: 1, y: 0, filter: "blur(0px)" }
            }
            transition={
              reduce
                ? undefined
                : { duration: 0.9, ease: EASE_OUT_CUBIC, delay: 0.05 }
            }
            style={{
              position: "relative",
              background: tokens.card,
              borderRadius: 28,
              border: `1px solid ${tokens.hairline}`,
              padding: "32px 36px 32px",
              boxShadow:
                "0 1px 0 rgba(255,255,255,0.4) inset, 0 24px 60px -20px rgba(0,0,0,0.45), 0 8px 24px -12px rgba(0,0,0,0.30)",
              overflow: "hidden",
            }}
          >
            {/* Kicker */}
            <motion.div
              className="mb-6 flex items-center gap-2"
              {...stagger(0)}
            >
              <motion.span
                aria-hidden
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: 999,
                  background: tokens.brand,
                  flexShrink: 0,
                  boxShadow: `0 0 0 0 ${tokens.brand}`,
                }}
                animate={
                  reduce
                    ? undefined
                    : { opacity: [0.55, 1, 0.55] }
                }
                transition={
                  reduce
                    ? undefined
                    : { duration: 3.2, repeat: Infinity, ease: "easeInOut" }
                }
              />
              <span
                style={{
                  color: tokens.brand,
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                }}
              >
                01 · Homes
              </span>
              <span
                aria-hidden
                style={{
                  marginLeft: 6,
                  width: 18,
                  height: 1,
                  background: tokens.hairlineStrong,
                }}
              />
              <span
                style={{
                  color: tokens.muted,
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                }}
              >
                Installed, not promised
              </span>
            </motion.div>

            {/* Headline — Inter only, weight + scale carry hierarchy. */}
            <motion.h1
              id="hero-b-headline"
              {...stagger(1)}
              style={{
                color: tokens.ink,
                fontSize: "clamp(40px, 6.4vw, 72px)",
                fontWeight: 600,
                letterSpacing: "-0.035em",
                lineHeight: 0.98,
                marginBottom: 24,
                maxWidth: "14ch",
              }}
            >
              Storage that pays{" "}
              <span style={{ position: "relative", whiteSpace: "nowrap" }}>
                itself back.
                {/* Hand-drawn underline accent — single GridRed stroke. */}
                <svg
                  aria-hidden
                  width="100%"
                  height="10"
                  viewBox="0 0 240 10"
                  preserveAspectRatio="none"
                  style={{
                    position: "absolute",
                    left: 0,
                    bottom: "-0.18em",
                    width: "100%",
                    height: "0.18em",
                    pointerEvents: "none",
                  }}
                >
                  <motion.path
                    d="M2 6 C 60 2, 120 9, 238 4"
                    stroke={tokens.brand}
                    strokeWidth="3"
                    strokeLinecap="round"
                    fill="none"
                    initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={
                      reduce
                        ? { duration: 0 }
                        : {
                            duration: 1.1,
                            ease: EASE_OUT_CUBIC,
                            delay: 0.55,
                          }
                    }
                  />
                </svg>
              </span>
            </motion.h1>

            {/* Lead */}
            <motion.p
              {...stagger(2)}
              style={{
                color: tokens.body,
                fontSize: 17,
                lineHeight: 1.55,
                marginBottom: 28,
                maxWidth: "52ch",
              }}
            >
              An 18–36 month payback on residential storage, sized to your
              tariff and load. Daily meter reads, per-asset ROI, and fault
              flags that actually flag — surfaced in{" "}
              <span style={{ color: tokens.ink, fontWeight: 600 }}>
                GridOS
              </span>
              , the operator console you keep.
            </motion.p>

            {/* CTAs */}
            <motion.div
              {...stagger(3)}
              className="flex flex-wrap items-center gap-3"
            >
              {/* Primary — GridRed pill, white text, fill-Lightning glyph. */}
              <a
                href="#early-access"
                className="group inline-flex items-center gap-2"
                style={{
                  background: tokens.brand,
                  color: "#ffffff",
                  borderRadius: 999,
                  padding: "14px 22px",
                  fontSize: 13,
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  boxShadow: "none",
                  transition:
                    "background-color 160ms ease, transform 160ms ease, box-shadow 160ms ease",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = tokens.brandHover;
                  if (!reduce) el.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = tokens.brand;
                  el.style.transform = "translateY(0)";
                }}
              >
                <Lightning size={13} weight="fill" color="#ffffff" />
                Get early access
                <ArrowRight
                  size={12}
                  weight="bold"
                  color="#ffffff"
                  style={{ transition: "transform 160ms ease" }}
                  className="group-hover:translate-x-0.5"
                />
              </a>

              {/* Secondary — text + chevron, ink underline on hover. */}
              <a
                href="#talk-home-expert"
                className="inline-flex items-center gap-1.5"
                style={{
                  color: tokens.ink,
                  borderRadius: 999,
                  padding: "14px 18px",
                  fontSize: 13,
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  border: `1px solid ${tokens.hairlineStrong}`,
                  background: tokens.cardSoft,
                  transition: "background-color 160ms ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background =
                    tokens.pageBgDeep;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background =
                    tokens.cardSoft;
                }}
              >
                Talk to a home expert
                <ArrowRight size={11} weight="bold" />
              </a>

              {/* Microcopy reassurance, vertical hairline separator. */}
              <span
                aria-hidden
                style={{
                  width: 1,
                  height: 22,
                  background: tokens.hairlineStrong,
                  marginLeft: 4,
                }}
              />
              <span
                style={{
                  color: tokens.muted,
                  fontSize: 12,
                  fontWeight: 500,
                }}
              >
                48-hour sized stack · No call to qualify
              </span>
            </motion.div>

            {/* Inline operator proof row — three numbers, hairlined. */}
            <motion.div
              {...stagger(4)}
              style={{
                marginTop: 36,
                paddingTop: 24,
                borderTop: `1px solid ${tokens.hairline}`,
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 0,
              }}
            >
              <ProofCell
                label="Avg payback"
                value={
                  <>
                    <span
                      style={{
                        fontVariantNumeric: "tabular-nums",
                        fontFeatureSettings: '"tnum"',
                      }}
                    >
                      {payback}
                    </span>
                    <span
                      style={{
                        fontSize: 18,
                        fontWeight: 500,
                        color: tokens.inkMuted,
                        marginLeft: 4,
                      }}
                    >
                      mo
                    </span>
                  </>
                }
                delta="vs 48mo industry avg"
                first
              />
              <ProofCell
                label="Sites live"
                value={
                  <span
                    style={{
                      fontVariantNumeric: "tabular-nums",
                      fontFeatureSettings: '"tnum"',
                    }}
                  >
                    142
                  </span>
                }
                delta="Across 11 Indian cities"
              />
              <ProofCell
                label="GridOS uptime"
                value={
                  <>
                    <span
                      style={{
                        fontVariantNumeric: "tabular-nums",
                        fontFeatureSettings: '"tnum"',
                      }}
                    >
                      99.94
                    </span>
                    <span
                      style={{
                        fontSize: 18,
                        fontWeight: 500,
                        color: tokens.inkMuted,
                        marginLeft: 2,
                      }}
                    >
                      %
                    </span>
                  </>
                }
                delta="Trailing 90 days"
              />
            </motion.div>

            {/* Scroll-progress rail along card bottom — fills 0 → 100%. */}
            <motion.div
              aria-hidden
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 0,
                height: 2,
                background: tokens.hairline,
              }}
            >
              <motion.div
                style={{
                  height: "100%",
                  background: tokens.brand,
                  transformOrigin: "0% 50%",
                  scaleX: reduce ? 0 : railScale,
                }}
              />
            </motion.div>
          </motion.article>
        </div>
      </motion.div>

      {/* ─── Scroll affordance pinned to bottom-center ─── */}
      <motion.div
        aria-hidden
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: scrolled ? 0 : 1 }}
        transition={{ duration: 0.45, ease: EASE_OUT_CUBIC, delay: 1.1 }}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
          pointerEvents: "none",
        }}
      >
        <span
          style={{
            color: "rgba(255,255,255,0.78)",
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
          }}
        >
          Scroll
        </span>
        <motion.span
          style={{
            display: "inline-flex",
            color: "rgba(255,255,255,0.85)",
          }}
          animate={
            reduce
              ? undefined
              : { y: [0, 4, 0] }
          }
          transition={
            reduce
              ? undefined
              : { duration: 2.4, repeat: Infinity, ease: "easeInOut" }
          }
        >
          <CaretDown size={14} weight="bold" />
        </motion.span>
      </motion.div>

      {/* ─── ::selection accent + reduced-motion CSS fallback ─── */}
      <style>{`
        section[aria-labelledby="hero-b-headline"] ::selection {
          background: ${tokens.brand};
          color: #ffffff;
        }
        @media (prefers-reduced-motion: reduce) {
          section[aria-labelledby="hero-b-headline"] * {
            animation-duration: 0.001ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.001ms !important;
          }
        }
      `}</style>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  ProofCell — inline operator stat                                   */
/* ------------------------------------------------------------------ */

function ProofCell({
  label,
  value,
  delta,
  first,
}: {
  label: string;
  value: React.ReactNode;
  delta: string;
  first?: boolean;
}) {
  return (
    <div
      style={{
        paddingLeft: first ? 0 : 20,
        paddingRight: 20,
        borderLeft: first ? "none" : `1px solid ${tokens.hairline}`,
      }}
    >
      <p
        style={{
          color: tokens.muted,
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          marginBottom: 6,
        }}
      >
        {label}
      </p>
      <p
        style={{
          color: tokens.ink,
          fontSize: 36,
          fontWeight: 700,
          letterSpacing: "-0.025em",
          lineHeight: 1,
          marginBottom: 6,
          display: "flex",
          alignItems: "baseline",
        }}
      >
        {value}
      </p>
      <p
        style={{
          color: tokens.inkMuted,
          fontSize: 12,
          fontWeight: 500,
        }}
      >
        {delta}
      </p>
    </div>
  );
}
