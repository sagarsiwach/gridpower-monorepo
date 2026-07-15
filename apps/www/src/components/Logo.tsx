import type { CSSProperties } from "react";

type Variant = "gridenergy" | "gridcharge" | "gridpower";

type Props = {
  variant: Variant;
  size?: number;
  fill?: string;
  className?: string;
  style?: CSSProperties;
};

/*
  Inline GridEnergy / GridCharge / GridPower brand marks.
  Source: 1080x1080 SVGs from Sagar's export, brand red #FA0016.
  Renders ONLY the mark shapes (no white bg tile) so it can sit on any surface.
  Use `fill` to override brand color (e.g. white-on-dark contexts).
*/
export function Logo({ variant, size = 24, fill, className, style }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 1080 1080"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label={`${labelFor(variant)} logo`}
      className={className}
      style={style}
    >
      {variant === "gridpower" && (
        <g fill={fill ?? "#FA0016"}>
          <path d="M681 160C736.228 160 781 204.772 781 260C781 315.228 736.228 360 681 360C625.772 360 581 315.228 581 260C581 204.772 625.772 160 681 160Z" />
          <rect x="781" y="440" width="200" height="200" rx="100" transform="rotate(90 781 440)" />
          <rect x="500" y="160" width="760" height="200" rx="100" transform="rotate(90 500 160)" />
        </g>
      )}
      {variant === "gridcharge" && (
        <g fill={fill ?? "#FA0016"}>
          <path d="M400 160C455.228 160 500 204.772 500 260L500 820C500 875.228 455.228 920 400 920C344.772 920 300 875.228 300 820L300 260C300 204.772 344.772 160 400 160Z" />
          <path d="M680 160C735.228 160 780 204.772 780 260C780 315.228 735.228 360 680 360C624.772 360 580 315.228 580 260C580 204.772 624.772 160 680 160Z" />
          <path d="M680 720C735.228 720 780 764.772 780 820C780 875.228 735.228 920 680 920C624.772 920 580 875.228 580 820C580 764.772 624.772 720 680 720Z" />
        </g>
      )}
      {variant === "gridenergy" && (
        <g fill={fill ?? "#FA0016"}>
          <path d="M680 160C735.228 160 780 204.772 780 260C780 315.228 735.228 360 680 360C624.772 360 580 315.228 580 260C580 204.772 624.772 160 680 160Z" />
          <rect x="780" y="440" width="200" height="200" rx="100" transform="rotate(90 780 440)" />
          <rect x="780" y="720" width="200" height="200" rx="100" transform="rotate(90 780 720)" />
          <rect x="500" y="160" width="760" height="200" rx="100" transform="rotate(90 500 160)" />
        </g>
      )}
    </svg>
  );
}

export function LogoWordmark({
  variant,
  size = 28,
  fill,
  textColor,
  style,
}: Props & { textColor?: string }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 10, ...style }}>
      <Logo variant={variant} size={size} fill={fill} />
      <span
        style={{
          fontSize: 15,
          fontWeight: 600,
          letterSpacing: "-0.02em",
          color: textColor ?? "inherit",
          fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
        }}
      >
        {labelFor(variant)}
      </span>
    </span>
  );
}

function labelFor(v: Variant) {
  if (v === "gridenergy") return "GridEnergy";
  if (v === "gridcharge") return "GridCharge";
  return "GridPower";
}
