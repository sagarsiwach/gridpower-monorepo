import { tokens } from "../../routes/_preview/_v3-tokens";

export type TimelineStep = {
  day: string;
  label: string;
  sub: string;
};

export type InstallTimelineProps = {
  steps: TimelineStep[];
};

/*
  InstallTimeline — horizontal desktop / vertical mobile commissioning timeline.
  Circular nodes at each step connected by a hairline track.
  Active (first) step: GridRed node + ink label.
  Subsequent: olive-tinted node + muted label.
  Respects prefers-reduced-motion.
*/
export function InstallTimeline({ steps }: InstallTimelineProps) {
  return (
    <section style={{ background: tokens.pageBg }}>
      <div className="mx-auto max-w-[1280px] px-8 py-16">
        {/* header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 40,
          }}
        >
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: tokens.brand,
            }}
          >
            INSTALL & COMMISSIONING
          </span>
          <span style={{ flex: 1, height: 1, background: tokens.hairline }} />
        </div>

        {/* horizontal track — desktop */}
        <div className="install-timeline-desktop" style={{ position: "relative" }}>
          {/* connecting line */}
          <div
            style={{
              position: "absolute",
              top: 20,
              left: "calc(20px + 0%)",
              right: "calc(20px + 0%)",
              height: 1,
              background: tokens.hairlineStrong,
              zIndex: 0,
            }}
          />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${steps.length}, 1fr)`,
              gap: 0,
              position: "relative",
              zIndex: 1,
            }}
          >
            {steps.map((step, i) => {
              const isActive = i === 0;
              return (
                <div
                  key={step.day}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    paddingTop: 0,
                  }}
                >
                  {/* node */}
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 999,
                      background: isActive ? tokens.brand : tokens.pageBgDeep,
                      border: `2px solid ${isActive ? tokens.brand : tokens.hairlineStrong}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 16,
                      flexShrink: 0,
                      boxShadow: isActive
                        ? `0 0 0 4px ${tokens.brandSoft}`
                        : "none",
                    }}
                  >
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        color: isActive ? "#ffffff" : tokens.inkMuted,
                        fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
                        letterSpacing: "0.04em",
                      }}
                    >
                      {i + 1}
                    </span>
                  </div>

                  {/* day label below node */}
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: isActive ? tokens.brand : tokens.muted,
                      marginBottom: 6,
                    }}
                  >
                    {step.day}
                  </span>

                  {/* step title */}
                  <p
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: isActive ? tokens.ink : tokens.body,
                      textAlign: "center",
                      lineHeight: 1.3,
                      marginBottom: 4,
                      paddingInline: 8,
                    }}
                  >
                    {step.label}
                  </p>

                  {/* sub-description */}
                  <p
                    style={{
                      fontSize: 11,
                      fontWeight: 400,
                      color: tokens.muted,
                      textAlign: "center",
                      lineHeight: 1.5,
                      paddingInline: 8,
                    }}
                  >
                    {step.sub}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* vertical layout — mobile */}
        <div className="install-timeline-mobile" style={{ display: "none" }}>
          {steps.map((step, i) => {
            const isActive = i === 0;
            const isLast = i === steps.length - 1;
            return (
              <div
                key={step.day}
                style={{
                  display: "grid",
                  gridTemplateColumns: "40px 1fr",
                  gap: 16,
                }}
              >
                {/* left: node + vertical connector */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 999,
                      background: isActive ? tokens.brand : tokens.pageBgDeep,
                      border: `2px solid ${isActive ? tokens.brand : tokens.hairlineStrong}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      boxShadow: isActive ? `0 0 0 4px ${tokens.brandSoft}` : "none",
                    }}
                  >
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        color: isActive ? "#ffffff" : tokens.inkMuted,
                        fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
                      }}
                    >
                      {i + 1}
                    </span>
                  </div>
                  {!isLast && (
                    <div
                      style={{
                        flex: 1,
                        width: 1,
                        background: tokens.hairlineStrong,
                        minHeight: 24,
                        marginTop: 8,
                      }}
                    />
                  )}
                </div>

                {/* right: text */}
                <div style={{ paddingBottom: isLast ? 0 : 24, paddingTop: 8 }}>
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: isActive ? tokens.brand : tokens.muted,
                      display: "block",
                      marginBottom: 4,
                    }}
                  >
                    {step.day}
                  </span>
                  <p
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: isActive ? tokens.ink : tokens.body,
                      marginBottom: 4,
                    }}
                  >
                    {step.label}
                  </p>
                  <p style={{ fontSize: 12, color: tokens.muted, lineHeight: 1.5 }}>
                    {step.sub}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .install-timeline-desktop { display: none !important; }
          .install-timeline-mobile { display: flex !important; flex-direction: column; }
        }
      `}</style>
    </section>
  );
}
