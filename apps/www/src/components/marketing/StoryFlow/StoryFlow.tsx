/*
  StoryFlow — the engine + harness for the scroll-scrubbed "why storage" story.

  Model
  -----
  Two columns share one scroll:
    • LEFT  — the wire stage, CSS-sticky (pinned) for the section's length.
              GSAP ScrollTrigger scrubs a master timeline over the section:
              the main line draws down, an energy pulse rides it (MotionPath),
              waste branches draw then fade, node art fades in on cue.
    • RIGHT — the story copy in normal document flow, revealed with motion.
              Because both columns scroll together, copy beat i lines up with
              wire beat i without manually syncing them.

  Harness
  -------
  Dial Kit (dev only) exposes the live knobs — scrub, scene length, wire width,
  pulse size, waste fade, colour, and a ScrollTrigger markers toggle. Dragging a
  dial re-keys `useGSAP` (via dependencies) so the timeline rebuilds instantly.
  The faint guide track + markers make the line visible while tuning. Whatever
  values feel right get written back into story.config.ts as the new defaults.

  Fallback
  --------
  gsap.matchMedia only runs the scrubbed timeline on capable desktop
  (min-width 768px, no reduced-motion). Otherwise the SVG's default attributes
  render the fully-drawn diagram and the copy reveals normally — accessible and
  SSR-clean (useGSAP is client-only; Dial Kit ships a server snapshot).
*/

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { useGSAP } from "@gsap/react";
import { motion, useReducedMotion } from "motion/react";
import { DialRoot, useDialKit } from "dialkit";
import "dialkit/styles.css";

import { Wire } from "./Wire";
import { NodeSlot } from "./NodeSlot";
import { DIALS, NODES, SCENES, STAGE, COLORS } from "./story.config";

gsap.registerPlugin(useGSAP, ScrollTrigger, MotionPathPlugin);

const FONT = "Inter, ui-sans-serif, system-ui, sans-serif";
const EASE = [0.22, 1, 0.36, 1] as const;
const DEV = import.meta.env.DEV;
// Temporarily hidden per Sagar — flip back to true to bring the tuning panel back.
const SHOW_DIALKIT = false;

export function StoryFlow() {
  const reduce = useReducedMotion() ?? false;
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  // Live tuning values (Dial Kit in dev; config defaults everywhere else).
  const d = useDialKit("StoryFlow", DIALS);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        // Hidden start state (only on capable desktop; static fallback keeps
        // the fully-drawn diagram everywhere else).
        gsap.set(".sf-main", { strokeDashoffset: 1 });
        gsap.set(".sf-waste", { strokeDashoffset: 1, opacity: 1 });
        gsap.set(".sf-node", { autoAlpha: 0, y: 18 });
        gsap.set(".sf-pulse", { autoAlpha: 0 });

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: d.scrub,
            markers: d.markers,
          },
        });

        // Main spine draws across the whole scroll; the pulse rides it.
        tl.to(".sf-main", { strokeDashoffset: 0, duration: 1 }, 0);
        tl.to(".sf-pulse", { autoAlpha: 1, duration: 0.03 }, 0);
        tl.to(
          ".sf-pulse",
          { duration: 1, motionPath: { path: ".sf-main", align: ".sf-main", alignOrigin: [0.5, 0.5] } },
          0,
        );

        // Waste branches: draw out, then bleed away.
        tl.to(".sf-waste", { strokeDashoffset: 0, duration: 0.18, stagger: 0.03 }, 0.18);
        tl.to(".sf-waste", { opacity: d.wasteEndOpacity, duration: 0.16 }, 0.36);

        // Node art fades in on each configured cue.
        NODES.forEach((n) => {
          tl.to(`.sf-node-${n.key}`, { autoAlpha: 1, y: 0, duration: 0.08 }, n.reveal);
        });
      });

      return () => mm.revert();
    },
    {
      scope: stageRef,
      dependencies: [d.scrub, d.sceneVh, d.wireWidth, d.pulseR, d.wasteEndOpacity, d.markers, d.wireColor],
      revertOnUpdate: true,
    },
  );

  return (
    <section
      ref={sectionRef}
      className="sf-section"
      style={{
        position: "relative",
        background: `linear-gradient(180deg, ${COLORS.pageBg} 0%, ${COLORS.pageBgDeep} 100%)`,
      }}
    >
      {/* Section heading — in flow, not pinned. */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "clamp(64px, 9vh, 120px) 24px clamp(8px, 2vh, 24px)" }}>
        <div style={{ fontSize: 12.5, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: COLORS.brand }}>
          Why storage, why now
        </div>
        <h2 style={{ fontFamily: FONT, color: COLORS.ink, fontSize: "clamp(28px, 4vw, 46px)", fontWeight: 600, letterSpacing: "-0.035em", lineHeight: 1.05, marginTop: 12, maxWidth: "18ch" }}>
          Power isn't the problem. Storing and controlling it is.
        </h2>
      </div>

      {/* Two-column scroller. */}
      <div className="sf-grid" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "grid", gridTemplateColumns: "minmax(0, 46%) minmax(0, 54%)", gap: 32, alignItems: "start" }}>
        {/* LEFT — sticky wire stage. */}
        <div className="sf-sticky" style={{ position: "sticky", top: 0, height: "100vh", display: "grid", placeItems: "center" }}>
          <div ref={stageRef} className="sf-stage" style={{ position: "relative", height: "84vh", aspectRatio: `${STAGE.w} / ${STAGE.h}` }}>
            <Wire wireWidth={d.wireWidth} wireColor={d.wireColor} guideOpacity={d.guideOpacity} pulseR={d.pulseR} />
            {NODES.map((n) => (
              <NodeSlot key={n.key} node={n} />
            ))}
          </div>
        </div>

        {/* RIGHT — story copy, one scene per scroll beat. */}
        <div className="sf-copy">
          {SCENES.map((s, i) => (
            <motion.div
              key={i}
              initial={reduce ? false : { opacity: 0, y: 26 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, ease: EASE }}
              style={{ minHeight: `${d.sceneVh}vh`, display: "flex", flexDirection: "column", justifyContent: "center", maxWidth: 480 }}
            >
              <div style={{ fontSize: 12.5, fontWeight: 700, color: COLORS.brand, marginBottom: 12 }}>
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 style={{ fontFamily: FONT, color: COLORS.ink, fontSize: "clamp(24px, 2.6vw, 34px)", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1.1 }}>
                {s.title}
              </h3>
              <p style={{ color: COLORS.body, fontSize: "clamp(15px, 1.5vw, 17px)", lineHeight: 1.6, marginTop: 14 }}>
                {s.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mobile / narrow: stack columns, drop the sticky pin, shrink the stage. */}
      <style>{`
        @media (max-width: 767px) {
          .sf-grid { grid-template-columns: 1fr !important; gap: 8px !important; }
          .sf-sticky { position: static !important; height: auto !important; padding: 24px 0 8px !important; }
          .sf-stage { height: 62vh !important; margin: 0 auto; }
          .sf-copy > div { min-height: 64vh !important; }
        }
      `}</style>

      {/* NOTE: `productionEnabled` is DialKit's master render gate (returns null
          when false), NOT a "prod-only" flag. Omit it → defaults to dev-on/prod-off.
          The DEV guard already keeps it out of production builds. */}
      {DEV && SHOW_DIALKIT && <DialRoot position="bottom-right" theme="light" defaultOpen />}
    </section>
  );
}
