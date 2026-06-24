import { CodeToken } from "./Caption";

/*
  RadiusSample.

  One square per radius step. The square uses the token as its
  border-radius so the curvature is read-at-a-glance comparable.
  No fill — the rounded corner is the message. The card holds a
  hairline border so the corner stays legible.

  Square size is intentional: smaller squares (32px) read tighter
  on small radii, larger squares (96px) needed for --radius-full to
  show the pill shape clearly. We split the showcase into two rows
  to handle this contrast without breaking grid alignment.
*/

export interface RadiusData {
  token: string;       // --radius-md
  value: string;       // "6px"
  usage: string;       // when to use
}

interface RadiusSampleProps {
  data: RadiusData;
  large?: boolean;     // larger sample for radius-full / radius-2xl
}

export function RadiusSample({ data, large = false }: RadiusSampleProps) {
  const size = large ? 112 : 80;

  return (
    <div className="flex flex-col gap-3">
      <div
        className="flex items-end justify-end border border-[var(--color-border-strong)] bg-[var(--color-neutral-50)] p-3"
        style={{
          width: size,
          height: size,
          borderRadius: `var(${data.token})`,
        }}
      >
        <CodeToken tone="mute">{data.value}</CodeToken>
      </div>
      <div>
        <p className="text-sm font-medium text-[var(--color-text-heading)]">
          <CodeToken>{data.token}</CodeToken>
        </p>
        <p className="mt-1 max-w-[24ch] text-xs leading-[1.5] text-[var(--color-text-muted)]">
          {data.usage}
        </p>
      </div>
    </div>
  );
}
