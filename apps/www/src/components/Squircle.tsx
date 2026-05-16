import { useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { getSvgPath } from "figma-squircle";

type Props = {
  children: ReactNode;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  cornerRadius?: number;
  cornerSmoothing?: number;
  className?: string;
  style?: CSSProperties;
};

/*
  Renders Figma-style continuous corners by overlaying a measured SVG path
  behind absolutely-positioned content. Pure 1:1 squircle smoothing — no
  large-radius approximation. Stroke is centered (1px hairlines look fine).
*/
export function Squircle({
  children,
  fill,
  stroke,
  strokeWidth = 1,
  cornerRadius = 24,
  cornerSmoothing = 0.6,
  className,
  style,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    setSize({ w: Math.ceil(el.offsetWidth), h: Math.ceil(el.offsetHeight) });

    const observer = new ResizeObserver((entries) => {
      const rect = entries[0].contentRect;
      setSize({ w: Math.ceil(rect.width), h: Math.ceil(rect.height) });
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const path =
    size.w > 0 && size.h > 0
      ? getSvgPath({
          width: size.w,
          height: size.h,
          cornerRadius,
          cornerSmoothing,
        })
      : "";

  return (
    <div ref={ref} className={className} style={{ position: "relative", ...style }}>
      <svg
        aria-hidden="true"
        width={size.w}
        height={size.h}
        viewBox={`0 0 ${size.w} ${size.h}`}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      >
        {path && (
          <path
            d={path}
            fill={fill ?? "none"}
            stroke={stroke}
            strokeWidth={stroke ? strokeWidth : 0}
          />
        )}
      </svg>
      <div style={{ position: "relative" }}>{children}</div>
    </div>
  );
}
