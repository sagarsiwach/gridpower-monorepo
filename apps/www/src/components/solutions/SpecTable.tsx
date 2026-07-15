import { tokens } from "../../routes/_preview/_v3-tokens";

export type SpecRow = {
  name: string;
  value: string;
  note?: string;
};

export type SpecSection = {
  label: string;
  rows: SpecRow[];
};

export type SpecTableProps = {
  sections: SpecSection[];
};

/*
  SpecTable — dense tabular product specs.
  Hairline-divided rows. Tabular numerals.
  Desktop: label / value 2-col within each section.
  Mobile: stacked (name over value).
  No nested cards — flat tabular layout.
*/
export function SpecTable({ sections }: SpecTableProps) {
  return (
    <section style={{ background: tokens.pageBg }}>
      <div className="mx-auto max-w-[1280px] px-8 py-16">
        {/* section header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 32,
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
            SPECIFICATIONS
          </span>
          <span
            style={{ flex: 1, height: 1, background: tokens.hairline }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {sections.map((section, si) => (
            <div key={section.label}>
              {/* section label row */}
              <div
                style={{
                  padding: "10px 0",
                  borderTop: si === 0 ? `1px solid ${tokens.hairlineStrong}` : `1px solid ${tokens.hairline}`,
                  borderBottom: `1px solid ${tokens.hairlineStrong}`,
                  display: "grid",
                  gridTemplateColumns: "220px 1fr",
                  gap: 24,
                  alignItems: "center",
                  background: tokens.pageBgDeep,
                }}
              >
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: tokens.inkMuted,
                    paddingLeft: 0,
                  }}
                >
                  {section.label}
                </span>
              </div>

              {/* rows */}
              {section.rows.map((row, ri) => (
                <div
                  key={row.name}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "220px 1fr auto",
                    gap: 24,
                    alignItems: "baseline",
                    padding: "12px 0",
                    borderBottom:
                      ri < section.rows.length - 1
                        ? `1px solid ${tokens.hairline}`
                        : "none",
                  }}
                >
                  {/* name */}
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 500,
                      color: tokens.inkMuted,
                      letterSpacing: "0",
                    }}
                  >
                    {row.name}
                  </span>

                  {/* value — tabular numerals, Geist Mono for numbers */}
                  <span
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: tokens.ink,
                      fontVariantNumeric: "tabular-nums",
                      fontFamily: isNumericHeavy(row.value)
                        ? "Inter, ui-sans-serif, system-ui, sans-serif"
                        : "inherit",
                      letterSpacing: isNumericHeavy(row.value) ? "0.02em" : "inherit",
                    }}
                  >
                    {row.value}
                  </span>

                  {/* optional note */}
                  {row.note && (
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 500,
                        color: tokens.muted,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {row.note}
                    </span>
                  )}
                </div>
              ))}

              {/* section bottom spacing */}
              <div style={{ height: 12 }} />
            </div>
          ))}
        </div>
      </div>

      {/* Mobile: stack name above value */}
      <style>{`
        @media (max-width: 640px) {
          .spec-row {
            grid-template-columns: 1fr !important;
            gap: 4px !important;
          }
        }
      `}</style>
    </section>
  );
}

/** Heuristic: value contains digits — use monospace */
function isNumericHeavy(value: string): boolean {
  return /\d/.test(value);
}
