import { type Icon } from "@phosphor-icons/react";
import { tokens } from "../../routes/_preview/_v3-tokens";

export type BoxItem = {
  Icon: Icon;
  name: string;
  qty: number | string;
  note?: string;
};

export type WhatsInBoxProps = {
  items: BoxItem[];
};

/*
  WhatsInBox — visual inventory list.
  3-col grid desktop, 2-col mobile.
  Each tile: olive-100 bg, ~square aspect ratio, duotone icon top, name below,
  qty as a small brand-tinted pill in the top-right corner.
*/
export function WhatsInBox({ items }: WhatsInBoxProps) {
  return (
    <section
      style={{
        background: tokens.pageBgDeep,
        borderTop: `1px solid ${tokens.hairline}`,
        borderBottom: `1px solid ${tokens.hairline}`,
      }}
    >
      <div className="mx-auto max-w-[1280px] px-8 py-16">
        {/* header */}
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
            WHAT'S IN THE BOX
          </span>
          <span style={{ flex: 1, height: 1, background: tokens.hairlineStrong }} />
          <span
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: tokens.muted,
              letterSpacing: "0.04em",
            }}
          >
            {items.length} ITEMS
          </span>
        </div>

        {/* grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 12,
          }}
          className="witb-grid"
        >
          {items.map((item) => (
            <BoxTile key={item.name} item={item} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .witb-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 440px) {
          .witb-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

function BoxTile({ item }: { item: BoxItem }) {
  const { Icon, name, qty, note } = item;
  return (
    <div
      style={{
        background: tokens.accentSoft,
        border: `1px solid ${tokens.hairline}`,
        borderRadius: 16,
        padding: 20,
        position: "relative",
        aspectRatio: "1 / 1",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/* qty pill — top right */}
      <div
        style={{
          position: "absolute",
          top: 12,
          right: 12,
          background: tokens.brandSoft,
          border: `1px solid ${tokens.brand}`,
          borderRadius: 999,
          padding: "2px 8px",
          display: "inline-flex",
          alignItems: "center",
        }}
      >
        <span
          style={{
            fontSize: 10,
            fontWeight: 700,
            color: tokens.brand,
            letterSpacing: "0.08em",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          ×{qty}
        </span>
      </div>

      {/* icon */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Icon
          size={52}
          weight="duotone"
          color={tokens.ink}
          style={{ opacity: 0.7 }}
        />
      </div>

      {/* text bottom */}
      <div style={{ marginTop: 12 }}>
        <p
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: tokens.ink,
            lineHeight: 1.2,
            letterSpacing: "-0.01em",
          }}
        >
          {name}
        </p>
        {note && (
          <p
            style={{
              fontSize: 11,
              fontWeight: 500,
              color: tokens.muted,
              marginTop: 3,
              lineHeight: 1.4,
            }}
          >
            {note}
          </p>
        )}
      </div>
    </div>
  );
}
