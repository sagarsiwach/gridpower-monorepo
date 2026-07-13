/*
  VideoShowcase — a "see it work" video carousel, one slide at a time.

  Ported into the V3 light language (olive substrate + GridRed, Inter, hairline
  cards) from the reference feature carousel: a framed video on one side, the
  feature copy + prev/next controls on the other, with dot indicators. The active
  slide's video autoplays muted-looped; the others pause to save bandwidth.

  Videos are wired through `src` (+ optional `poster`). Until a real file is
  provided the slide renders the house placeholder tile (VIDEO · ASSET TBD), so
  the section is reviewable now and only needs files dropped into
  /public/videos/ later — no code change beyond the src string.
*/

import { type CSSProperties, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight, Play } from "@phosphor-icons/react";
import { Band, Rise, Eyebrow, H2, Lead, FONT, MONO, EASE } from "./atoms";
import { tokens } from "../../../routes/_preview/_v3-tokens";

export type VideoSlide = {
  /** Feature title shown beside the video. */
  title: string;
  /** One-line description. */
  body: string;
  /** Short uppercase kicker (e.g. "Solar charging"). */
  kicker?: string;
  /** Video file (e.g. "/videos/homes-solar-charge.mp4"). Placeholder if omitted. */
  src?: string;
  /** Poster frame shown before the video plays. */
  poster?: string;
};

export type VideoShowcaseProps = {
  eyebrow?: string;
  title: string;
  intro?: string;
  slides: VideoSlide[];
  /** Video aspect ratio — matches the reference framing by default. */
  ratio?: string;
  id?: string;
};

/* Circular prev/next control — mirrors the Accordion circle affordance. */
function NavButton({
  dir,
  onClick,
  label,
}: {
  dir: "prev" | "next";
  onClick: () => void;
  label: string;
}) {
  const [h, setH] = useState(false);
  const style: CSSProperties = {
    display: "grid",
    placeItems: "center",
    width: 46,
    height: 46,
    borderRadius: 999,
    background: h ? tokens.ink : tokens.card,
    border: `1px solid ${h ? tokens.ink : tokens.hairlineStrong}`,
    cursor: "pointer",
    transition: "background .18s ease, border-color .18s ease, transform .18s ease",
    transform: h ? "translateY(-1px)" : "none",
    flexShrink: 0,
  };
  const Icon = dir === "prev" ? ArrowLeft : ArrowRight;
  return (
    <button type="button" aria-label={label} onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={style}>
      <Icon size={18} weight="bold" color={h ? "#fff" : tokens.ink} />
    </button>
  );
}

/* The framed stage: a real video, or the house ASSET TBD placeholder. */
function Stage({ slide, ratio }: { slide: VideoSlide; ratio: string }) {
  const frame: CSSProperties = {
    aspectRatio: ratio,
    borderRadius: 24,
    overflow: "hidden",
    background: tokens.pageBgDeep,
    border: `3px solid ${tokens.card}`,
    boxShadow: "0 34px 70px -40px oklch(15.3% 0.006 107.1 / 0.42)",
    outline: `1px solid ${tokens.hairline}`,
  };

  if (slide.src) {
    return (
      <div style={frame}>
        <video
          key={slide.src}
          src={slide.src}
          poster={slide.poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          style={{ display: "block", width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
    );
  }

  // Placeholder — coherent with the site's <Media> ASSET TBD convention.
  return (
    <div style={{ ...frame, display: "grid", placeItems: "center" }}>
      <div style={{ textAlign: "center", padding: 24 }}>
        <span style={{ display: "grid", placeItems: "center", width: 52, height: 52, borderRadius: 999, margin: "0 auto 14px", background: tokens.card, border: `1px solid ${tokens.hairlineStrong}` }}>
          <Play size={22} weight="fill" color={tokens.brand} />
        </span>
        <span style={{ display: "block", fontFamily: MONO, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: tokens.muted }}>
          Video · {slide.kicker ?? slide.title}
        </span>
        <p style={{ fontFamily: MONO, fontSize: 9, color: tokens.brand, marginTop: 6, letterSpacing: "0.1em" }}>ASSET TBD</p>
      </div>
    </div>
  );
}

export function VideoShowcase({ eyebrow = "See it work", title, intro, slides, ratio = "61 / 34", id }: VideoShowcaseProps) {
  const reduce = useReducedMotion() ?? false;
  const [i, setI] = useState(0);
  const dirRef = useRef(1);
  const n = slides.length;

  const go = (next: number) => {
    dirRef.current = next > i || (i === n - 1 && next === 0) ? 1 : -1;
    setI(((next % n) + n) % n);
  };
  const prev = () => go(i - 1);
  const next = () => go(i + 1);

  const active = slides[i];

  return (
    <Band id={id}>
      <div style={{ maxWidth: 720, marginBottom: 44 }}>
        <Rise><div style={{ marginBottom: 16 }}><Eyebrow>{eyebrow}</Eyebrow></div></Rise>
        <Rise delay={0.04}><H2 max={640}>{title}</H2></Rise>
        {intro && (
          <Rise delay={0.08}>
            <div style={{ marginTop: 16 }}><Lead>{intro}</Lead></div>
          </Rise>
        )}
      </div>

      <Rise delay={0.06}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.25fr)",
            gap: 40,
            alignItems: "center",
          }}
          className="video-showcase__grid"
        >
          {/* Copy + controls */}
          <div style={{ minHeight: 240, display: "flex", flexDirection: "column" }}>
            <span style={{ fontFamily: MONO, fontSize: 11, fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", color: tokens.muted }}>
              {String(i + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
            </span>

            <div style={{ position: "relative", flex: 1, marginTop: 18 }}>
              <AnimatePresence mode="wait" custom={dirRef.current}>
                <motion.div
                  key={i}
                  initial={reduce ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -10 }}
                  transition={{ duration: 0.36, ease: EASE }}
                >
                  {active.kicker && (
                    <span style={{ display: "inline-block", marginBottom: 10, fontFamily: FONT, fontSize: 12.5, fontWeight: 600, color: tokens.brand }}>
                      {active.kicker}
                    </span>
                  )}
                  <h3 style={{ fontFamily: FONT, color: tokens.ink, fontSize: 25, fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.15, maxWidth: 380 }}>
                    {active.title}
                  </h3>
                  <p style={{ fontFamily: FONT, color: tokens.body, fontSize: 16, lineHeight: 1.6, marginTop: 12, maxWidth: 400 }}>
                    {active.body}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Dots + prev/next */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20, marginTop: 32 }}>
              <div style={{ display: "flex", gap: 8 }} role="tablist" aria-label="Video slides">
                {slides.map((s, k) => (
                  <button
                    key={s.title}
                    type="button"
                    role="tab"
                    aria-selected={k === i}
                    aria-label={`Show ${s.title}`}
                    onClick={() => go(k)}
                    style={{
                      width: k === i ? 26 : 8,
                      height: 8,
                      borderRadius: 999,
                      border: "none",
                      cursor: "pointer",
                      padding: 0,
                      background: k === i ? tokens.brand : tokens.hairlineStrong,
                      transition: "width .24s ease, background .24s ease",
                    }}
                  />
                ))}
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <NavButton dir="prev" onClick={prev} label="Previous video" />
                <NavButton dir="next" onClick={next} label="Next video" />
              </div>
            </div>
          </div>

          {/* Video stage */}
          <div style={{ position: "relative" }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={i}
                initial={reduce ? false : { opacity: 0, scale: 0.985 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduce ? undefined : { opacity: 0, scale: 0.985 }}
                transition={{ duration: 0.4, ease: EASE }}
              >
                <Stage slide={active} ratio={ratio} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Rise>

      {/* Single-column stack on narrow viewports. */}
      <style>{`
        @media (max-width: 860px) {
          .video-showcase__grid {
            grid-template-columns: 1fr !important;
            gap: 28px !important;
          }
          .video-showcase__grid > div:first-child { order: 2; min-height: 0 !important; }
          .video-showcase__grid > div:last-child { order: 1; }
        }
      `}</style>
    </Band>
  );
}
