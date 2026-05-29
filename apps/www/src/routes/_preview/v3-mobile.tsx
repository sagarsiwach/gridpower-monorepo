import { Link } from "react-router-dom";
import { useMegamenuTheme } from "./_v3-tokens";
import MobileSiteNav from "../../components/site/MobileSiteNav";

export default function V3Mobile() {
  const { theme, tokens } = useMegamenuTheme();
  return (
    <div
      className="v3-page"
      data-theme={theme}
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
      <PreviewHeader />

      <div className="mx-auto max-w-[860px] px-8 pt-16 pb-12">
        <Header />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <PhoneFrame>
            <MobileSiteNav currentRoute="home" />
          </PhoneFrame>
        </div>
        <Captions />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Preview chrome                                                     */
/* ------------------------------------------------------------------ */

function FloatingBackLink() {
  const { tokens } = useMegamenuTheme();
  return (
    <Link
      to="/preview"
      className="text-[10px] uppercase tracking-[0.14em] transition-opacity"
      style={{
        position: "fixed",
        top: 12,
        right: 12,
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

function PreviewHeader() {
  const { tokens } = useMegamenuTheme();
  return (
    <header
      className="px-8 py-3 flex items-center gap-6"
      style={{ background: tokens.ink, color: "white" }}
    >
      <Link
        to="/preview"
        className="text-[11px] tracking-[0.12em] uppercase opacity-70 hover:opacity-100"
      >
        ← all previews
      </Link>
      <div className="h-4 w-px" style={{ background: "rgba(255,255,255,0.2)" }} />
      <span className="text-[11px] tracking-[0.12em] uppercase" style={{ color: tokens.brand, fontWeight: 700 }}>
        V3 · MOBILE MENU
      </span>
      <span className="text-[13px] font-medium">GridEnergy — mobile nav prototype</span>
      <span className="ml-auto text-[11px] tracking-[0.08em] uppercase opacity-50">
        /preview/v3-mobile
      </span>
    </header>
  );
}

function Header() {
  const { tokens } = useMegamenuTheme();
  return (
    <div className="mb-10 text-center">
      <div className="flex items-center justify-center gap-2 mb-3">
        <span style={{ width: 6, height: 6, borderRadius: 999, background: tokens.brand }} />
        <span className="text-[10px] uppercase tracking-[0.16em]" style={{ color: tokens.brand, fontWeight: 700 }}>
          MOBILE MENU PROTOTYPE
        </span>
      </div>
      <h1 className="text-[36px] font-semibold tracking-[-0.025em] leading-[1.1] mb-3" style={{ color: tokens.ink }}>
        Tap the hamburger to open. Tap an audience to drill in.
      </h1>
      <p className="text-[14px] leading-[1.6] max-w-[52ch] mx-auto" style={{ color: tokens.body }}>
        Three states in one interactive frame: closed → root menu → audience drill-down. Tap
        outside the frame to dismiss. Mobile dimensions: 390×844 (iPhone 14).
      </p>
    </div>
  );
}

function PhoneFrame({ children }: { children: React.ReactNode }) {
  const { tokens } = useMegamenuTheme();
  return (
    <div
      style={{
        width: 390,
        height: 844,
        borderRadius: 56,
        background: tokens.ink,
        padding: 10,
        boxShadow: "0 32px 96px oklch(15.3% 0.006 107.1 / 0.30)",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 46,
          background: tokens.pageBg,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* status bar */}
        <div
          className="flex items-center justify-between px-7"
          style={{ height: 44, color: tokens.ink }}
        >
          <span className="text-[13px] font-semibold">9:41</span>
          <span className="text-[12px]" style={{ color: tokens.ink }}>
            ▮▮▮▮▮
          </span>
        </div>
        {/* notch */}
        <div
          style={{
            position: "absolute",
            top: 8,
            left: "50%",
            transform: "translateX(-50%)",
            width: 110,
            height: 28,
            background: tokens.ink,
            borderRadius: 18,
          }}
        />
        {children}
      </div>
    </div>
  );
}

function Captions() {
  const { tokens } = useMegamenuTheme();
  return (
    <div className="grid grid-cols-3 gap-4 mt-10">
      {[
        { kicker: "01 · CLOSED", title: "Mobile nav bar", sub: "Logo left + hamburger right. No drawer." },
        { kicker: "02 · ROOT", title: "Root menu drawer", sub: "5 audiences + utility links + CTAs at bottom." },
        { kicker: "03 · DRILLED", title: "Audience detail", sub: "Solutions tile grid + featured + spotlight, stacked." },
      ].map((c) => (
        <div
          key={c.kicker}
          style={{
            background: tokens.card,
            border: `1px solid ${tokens.hairline}`,
            borderRadius: 14,
          }}
        >
          <div className="p-4">
            <p className="text-[10px] uppercase tracking-[0.14em] mb-2" style={{ color: tokens.brand, fontWeight: 700 }}>
              {c.kicker}
            </p>
            <p className="text-[14px] font-semibold leading-tight mb-1" style={{ color: tokens.ink }}>
              {c.title}
            </p>
            <p className="text-[12px]" style={{ color: tokens.muted }}>
              {c.sub}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
