/*
  HomesHeroPanel — the Homes landing hero, rebuilt as a contained card that
  mirrors the mega-menu panel (Sagar's reference), scaled to fill the viewport.

  Full 100svh section; inside, one rounded card (cleared below the sticky header)
  holds: a header strip, a SOLUTIONS 2×2 image grid, a FEATURED column, a POPULAR
  + PLATFORM spotlight, and a footer pill strip. Olive + GridRed, Inter. Unverified
  figures are flagged inline ("Placeholder · verify"), matching the menu.
*/

import { useState, type ReactNode, type CSSProperties } from "react";
import { Link } from "react-router";
import { ArrowRight } from "@phosphor-icons/react";
import { tokens } from "../../../routes/_preview/_v3-tokens";
import { FONT } from "./directions";

type Sol = { name: string; sub: string; image: string; to: string };

const SOLUTIONS: Sol[] = [
  { name: "Apartment ESS", sub: "Compact · single phase", image: "/images/solutions/homes-apartment.png", to: "/solutions/homes/apartment" },
  { name: "Small home", sub: "Whole-home essentials", image: "/images/solutions/homes-small.png", to: "/solutions/homes/small-home" },
  { name: "Large home", sub: "Whole-villa · 3-phase", image: "/images/solutions/homes-large.png", to: "/solutions/homes/large-home" },
  { name: "Solar storage combo", sub: "Inverter + battery", image: "/images/solutions/homes-solar.png", to: "/solutions/homes/solar-storage" },
];

const FEATURED = [
  { label: "Apartment RWA case study", meta: "Placeholder · verify", to: "/support" },
  { label: "Home ROI calculator", meta: "Run your numbers", to: "/support" },
  { label: "Datasheet · Nano", meta: "Placeholder · verify", to: "/support" },
];

const FOOTER_PILLS = ["Compare all 5 audiences", "ROI calculator", "Datasheets", "About", "Partners", "Support"];

export function HomesHeroPanel() {
  return (
    <section style={{ height: "calc(100svh - 108px)", minHeight: 560, background: tokens.pageBg, paddingBlock: 16, paddingInline: 24, display: "flex" }}>
      <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column", background: tokens.card, border: `1px solid ${tokens.hairline}`, borderRadius: 20, overflow: "hidden", boxShadow: "0 24px 60px -34px oklch(15.3% 0.006 107.1 / 0.30)" }}>

        {/* header strip */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, padding: "16px 22px", borderBottom: `1px solid ${tokens.hairline}`, flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0 }}>
            <span style={{ fontFamily: FONT, fontSize: 11, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: tokens.brand, whiteSpace: "nowrap" }}>01 · Homes</span>
            <span aria-hidden style={{ width: 1, height: 13, background: tokens.hairlineStrong }} />
            <span style={{ fontFamily: FONT, fontSize: 14, color: tokens.body }}>Apartment ESS to whole-home storage. Roof solar optional.</span>
          </div>
          <Link to="/contact" style={{ display: "inline-flex", alignItems: "center", gap: 7, fontFamily: FONT, fontSize: 11.5, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: tokens.ink, textDecoration: "none" }}>
            Book a site survey <ArrowRight size={12} weight="bold" />
          </Link>
        </div>

        {/* body */}
        <div style={{ flex: 1, display: "grid", gridTemplateColumns: "7fr 3fr 2.4fr", gap: 12, padding: 12, minHeight: 0 }}>
          {/* solutions 2×2 */}
          <div style={{ display: "flex", flexDirection: "column", minHeight: 0 }}>
            <Label>Solutions</Label>
            <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "1fr 1fr", gap: 10, minHeight: 0 }}>
              {SOLUTIONS.map((s) => <SolutionTile key={s.name} s={s} />)}
            </div>
          </div>

          {/* featured */}
          <div style={{ background: tokens.pageBgDeep, borderRadius: 14, padding: "12px 4px", display: "flex", flexDirection: "column", minHeight: 0 }}>
            <div style={{ paddingInline: 16 }}><Label>Featured</Label></div>
            <ul style={{ display: "flex", flexDirection: "column" }}>
              {FEATURED.map((f) => (
                <li key={f.label}>
                  <Link to={f.to} style={{ display: "block", padding: "12px 16px", textDecoration: "none", borderRadius: 10 }}>
                    <p style={{ fontFamily: FONT, fontSize: 14, fontWeight: 600, lineHeight: 1.2, color: tokens.ink }}>{f.label}</p>
                    <p style={{ fontFamily: FONT, fontSize: 11.5, marginTop: 3, color: tokens.muted }}>{f.meta}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* spotlight: popular + platform */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10, minHeight: 0 }}>
            <div style={{ flex: "1 1 0", background: tokens.ink, borderRadius: 14, padding: 18, display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 12 }}>
                <span aria-hidden style={{ width: 6, height: 6, borderRadius: 999, background: tokens.brand }} />
                <span style={{ fontFamily: FONT, fontSize: 9.5, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: tokens.brand }}>Popular</span>
              </div>
              <p style={{ fontFamily: FONT, fontSize: 16, fontWeight: 600, letterSpacing: "-0.015em", lineHeight: 1.15, color: "#fff" }}>Apartment ESS pack</p>
              <ul style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 12 }}>
                {["Compact modular", "Wall-mounted", "Placeholder · verify"].map((b) => (
                  <li key={b} style={{ display: "flex", gap: 8, alignItems: "flex-start", fontFamily: FONT, fontSize: 12, lineHeight: 1.35, color: "rgba(255,255,255,0.78)" }}>
                    <span aria-hidden style={{ width: 3, height: 3, borderRadius: 999, background: "rgba(255,255,255,0.45)", flexShrink: 0, marginTop: 6 }} />{b}
                  </li>
                ))}
              </ul>
              <Link to="/solutions/homes/apartment" style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: "auto", paddingTop: 14, fontFamily: FONT, fontSize: 10.5, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: tokens.brand, textDecoration: "none" }}>
                Configure for your flat <ArrowRight size={11} weight="bold" />
              </Link>
            </div>

            <div style={{ flex: "0 0 auto", background: tokens.pageBgDeep, border: `1px solid ${tokens.hairline}`, borderRadius: 14, padding: 15, display: "flex", flexDirection: "column", gap: 7 }}>
              <span style={{ fontFamily: FONT, fontSize: 9.5, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: tokens.inkMuted }}>Platform</span>
              <p style={{ fontFamily: FONT, fontSize: 13, fontWeight: 600, lineHeight: 1.15, letterSpacing: "-0.01em", color: tokens.ink }}>GridOS Home Console</p>
              <p style={{ fontFamily: FONT, fontSize: 11.5, lineHeight: 1.35, color: tokens.muted }}>Daily meter reads. Per-asset payback math. Open standards.</p>
              <Link to="/platform" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: FONT, fontSize: 10.5, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: tokens.inkMuted, textDecoration: "none" }}>
                See GridOS <ArrowRight size={11} weight="bold" />
              </Link>
            </div>
          </div>
        </div>

        {/* footer strip */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, padding: "10px 14px", borderTop: `1px solid ${tokens.hairline}`, background: tokens.pageBgDeep, flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 7, flexWrap: "wrap" }}>
            {FOOTER_PILLS.map((p, i) => <FooterPill key={p} emphasis={i === 0}>{p}</FooterPill>)}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontFamily: FONT, fontSize: 10, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: tokens.muted }}>Sister site</span>
            <Link to="/" style={{ display: "inline-flex", alignItems: "center", gap: 7, fontFamily: FONT, fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: tokens.ink, background: tokens.card, padding: "6px 11px", borderRadius: 10, border: `1px solid ${tokens.hairline}`, textDecoration: "none" }}>
              GridCharge <ArrowRight size={11} weight="bold" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function Label({ children }: { children: ReactNode }) {
  return <p style={{ fontFamily: FONT, fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: tokens.inkMuted, paddingInline: 2, paddingBottom: 10 }}>{children}</p>;
}

function SolutionTile({ s }: { s: Sol }) {
  const [h, setH] = useState(false);
  return (
    <Link to={s.to} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ position: "relative", display: "block", textDecoration: "none", borderRadius: 14, overflow: "hidden", border: `1px solid ${h ? tokens.hairlineStrong : tokens.hairline}`, background: tokens.pageBgDeep, minHeight: 0, transition: "border-color .2s ease" }}>
      <img src={s.image} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", transform: h ? "scale(1.04)" : "scale(1)", transition: "transform .5s cubic-bezier(0.22,1,0.36,1)" }} />
      <div aria-hidden style={{ position: "absolute", inset: 0, background: "linear-gradient(0deg, oklch(15.3% 0.006 107.1 / 0.72) 0%, oklch(15.3% 0.006 107.1 / 0.12) 42%, transparent 70%)" }} />
      <div style={{ position: "absolute", left: 16, right: 16, bottom: 14, display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 8 }}>
        <div>
          <p style={{ fontFamily: FONT, fontSize: 16, fontWeight: 600, letterSpacing: "-0.01em", color: "#fff" }}>{s.name}</p>
          <p style={{ fontFamily: FONT, fontSize: 12.5, color: "rgba(255,255,255,0.78)", marginTop: 3 }}>{s.sub}</p>
        </div>
        <ArrowRight size={15} weight="bold" color="#fff" style={{ opacity: h ? 1 : 0.5, transform: h ? "translateX(2px)" : "none", transition: "all .2s ease", flexShrink: 0 }} />
      </div>
    </Link>
  );
}

function FooterPill({ children, emphasis }: { children: ReactNode; emphasis?: boolean }) {
  const [h, setH] = useState(false);
  const style: CSSProperties = {
    fontFamily: FONT, fontSize: 11, fontWeight: 600, letterSpacing: "0.04em", padding: "7px 13px", borderRadius: 999,
    textDecoration: "none", cursor: "pointer", transition: "all .15s ease",
    color: emphasis ? "#fff" : tokens.body,
    background: emphasis ? (h ? tokens.brandHover : tokens.brand) : (h ? tokens.card : "transparent"),
    border: `1px solid ${emphasis ? "transparent" : tokens.hairline}`,
  };
  return <Link to="/contact" onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={style}>{children}</Link>;
}
