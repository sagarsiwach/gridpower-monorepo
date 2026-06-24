import { useEffect, useState } from "react";
import { Link } from "react-router";

import HeroA from "../../components/solutions/hero/HeroA";
import HeroB from "../../components/solutions/hero/HeroB";
import HeroC from "../../components/solutions/hero/HeroC";
import { tokens } from "./_v3-tokens";

/*
  Three hero variants stacked vertically, each at 100vh.
  Right-edge jump nav lets the reviewer skip between A / B / C without scrolling.
*/

const VARIANTS = [
  { id: "a", label: "A", title: "Operator confidence", subtitle: "Data-dense · Type-led" },
  { id: "b", label: "B", title: "Cinematic install", subtitle: "Image-led · Parallax" },
  { id: "c", label: "C", title: "Pick your home", subtitle: "Segmented · Interactive" },
] as const;

export default function V3SolutionsHero() {
  return (
    <div
      className="v3-page"
      style={{
        background: tokens.pageBg,
        color: tokens.body,
        fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
        minHeight: "100vh",
        position: "relative",
      }}
    >
      <style>{`
        .v3-page ::selection { background: ${tokens.brand}; color: #ffffff; }
        .v3-page ::-moz-selection { background: ${tokens.brand}; color: #ffffff; }
        .v3-page :is(h1, h2, h3, h4, h5, h6) {
          font-family: var(--font-body);
          font-weight: 600;
          font-optical-sizing: auto;
        }
      `}</style>

      <FloatingBackLink />
      <JumpNav />

      <section id="hero-a" style={{ minHeight: "100vh" }}>
        <VariantLabel kicker="VARIANT A" title="Operator confidence" />
        <HeroA />
      </section>

      <section id="hero-b" style={{ minHeight: "100vh" }}>
        <VariantLabel kicker="VARIANT B" title="Cinematic install" />
        <HeroB />
      </section>

      <section id="hero-c" style={{ minHeight: "100vh" }}>
        <VariantLabel kicker="VARIANT C" title="Pick your home" />
        <HeroC />
      </section>

      <Footer />
    </div>
  );
}

function FloatingBackLink() {
  return (
    <Link
      to="/preview"
      className="text-[10px] uppercase tracking-[0.14em] transition-opacity"
      style={{
        position: "fixed",
        top: 16,
        left: 16,
        zIndex: 200,
        background: tokens.ink,
        color: "white",
        padding: "5px 10px 5px 9px",
        borderRadius: 999,
        fontWeight: 600,
        opacity: 0.55,
        backdropFilter: "blur(8px)",
      }}
      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.55")}
    >
      ← Previews
    </Link>
  );
}

function JumpNav() {
  const [active, setActive] = useState<string>("a");

  useEffect(() => {
    const sections = VARIANTS.map((v) => document.getElementById(`hero-${v.id}`));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.4) {
            setActive(entry.target.id.replace("hero-", ""));
          }
        });
      },
      { threshold: [0.4, 0.6, 0.8] }
    );
    sections.forEach((s) => s && observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      className="hidden lg:flex flex-col items-end gap-2"
      style={{
        position: "fixed",
        right: 20,
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 200,
      }}
      aria-label="Jump between hero variants"
    >
      {VARIANTS.map((v) => {
        const isActive = active === v.id;
        return (
          <a
            key={v.id}
            href={`#hero-${v.id}`}
            className="group flex items-center gap-3 transition-all"
            style={{ textDecoration: "none" }}
          >
            <span
              className="text-[10px] uppercase tracking-[0.16em] transition-opacity"
              style={{
                color: isActive ? tokens.ink : tokens.muted,
                fontWeight: 600,
                opacity: isActive ? 1 : 0,
                transform: isActive ? "translateX(0)" : "translateX(8px)",
                transition: "opacity 0.2s ease, transform 0.2s ease",
              }}
            >
              {v.title}
            </span>
            <span
              className="grid place-items-center transition-all"
              style={{
                width: isActive ? 32 : 24,
                height: isActive ? 32 : 24,
                background: isActive ? tokens.ink : "transparent",
                color: isActive ? "white" : tokens.muted,
                border: `1px solid ${isActive ? tokens.ink : tokens.hairlineStrong}`,
                borderRadius: 999,
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.04em",
              }}
            >
              {v.label}
            </span>
          </a>
        );
      })}
    </nav>
  );
}

function VariantLabel({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div
      className="flex items-center gap-2.5"
      style={{
        position: "absolute",
        top: 16,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 100,
        background: tokens.ink,
        color: "white",
        padding: "5px 12px 5px 10px",
        borderRadius: 999,
        opacity: 0.5,
      }}
    >
      <span style={{ width: 5, height: 5, borderRadius: 999, background: tokens.brand }} />
      <span className="text-[10px] uppercase tracking-[0.16em]" style={{ fontWeight: 700 }}>
        {kicker}
      </span>
      <span style={{ width: 1, height: 10, background: "rgba(255,255,255,0.25)" }} />
      <span className="text-[10px] uppercase tracking-[0.1em]" style={{ fontWeight: 500 }}>
        {title}
      </span>
    </div>
  );
}

function Footer() {
  return (
    <footer
      style={{
        borderTop: `1px solid ${tokens.hairline}`,
        background: tokens.pageBgDeep,
      }}
    >
      <div className="mx-auto max-w-[1200px] px-8 py-10 flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <span style={{ width: 6, height: 6, borderRadius: 999, background: tokens.brand }} />
          <span
            className="text-[10px] uppercase tracking-[0.16em]"
            style={{ color: tokens.muted, fontWeight: 600 }}
          >
            3 HERO VARIANTS · OPUS + IMPECCABLE DELIGHT + OVERDRIVE · 2026-05-16
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/preview/v3-megamenu"
            className="text-[11px] uppercase tracking-[0.12em] font-semibold"
            style={{ color: tokens.ink }}
          >
            v3 · mega menu
          </Link>
          <span style={{ width: 1, height: 10, background: tokens.hairlineStrong }} />
          <Link
            to="/preview/v3-solutions-components"
            className="text-[11px] uppercase tracking-[0.12em] font-semibold"
            style={{ color: tokens.ink }}
          >
            solutions components
          </Link>
        </div>
      </div>
    </footer>
  );
}
