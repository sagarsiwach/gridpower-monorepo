import { useCallback, useState } from "react";
import { motion, easings, durations } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { CodeToken } from "./Caption";

/*
  MotionDemo.

  Interactive playground. User picks an easing + duration combination,
  hits Play, and a small block slides through a 200px track using that
  exact pair. No autoplay loop — we never animate on idle. Motion fires
  on demand.

  Easings and durations are read off the locked tokens in lib/motion.ts
  so the demo always matches what production components actually do.
  No invented curves.
*/

type EasingKey = "outExpo" | "outQuart" | "hover";
type DurationKey = "hover" | "page" | "reveal" | "hero" | "image" | "nav";

interface PresetMeta {
  key: EasingKey;
  label: string;
  curve: string;
  notes: string;
}

const EASING_PRESETS: PresetMeta[] = [
  {
    key: "outExpo",
    label: "out-expo",
    curve: "cubic-bezier(0.16, 1, 0.3, 1)",
    notes: "Default. Hero reveals, scroll-into-view, section entries.",
  },
  {
    key: "outQuart",
    label: "out-quart",
    curve: "cubic-bezier(0.25, 1, 0.5, 1)",
    notes: "Image clip-path reveals. Slightly less aggressive overshoot.",
  },
  {
    key: "hover",
    label: "hover",
    curve: "cubic-bezier(0.25, 1, 0.5, 1)",
    notes: "Hover transitions on cards, buttons, nav items.",
  },
];

const DURATION_KEYS: { key: DurationKey; label: string; usage: string }[] = [
  { key: "hover", label: "hover (200ms)", usage: "Button + card hover" },
  { key: "nav", label: "nav (180ms)", usage: "Mega-menu open / close" },
  { key: "page", label: "page (400ms)", usage: "Route transitions" },
  { key: "reveal", label: "reveal (600ms)", usage: "Scroll-in section reveals" },
  { key: "hero", label: "hero (800ms)", usage: "Hero word stagger fade-up" },
  { key: "image", label: "image (800ms)", usage: "Image clip-path reveal" },
];

export function MotionDemo() {
  const [easingKey, setEasingKey] = useState<EasingKey>("outExpo");
  const [durationKey, setDurationKey] = useState<DurationKey>("reveal");
  const [tick, setTick] = useState(0);

  const ease = easings[easingKey];
  const duration = durations[durationKey];

  const handlePlay = useCallback(() => setTick((t) => t + 1), []);

  return (
    <div className="overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-neutral-50)]">
      <div className="grid grid-cols-1 gap-0 lg:grid-cols-[1fr_240px]">
        {/* Stage */}
        <div className="relative flex flex-col gap-6 border-b border-[var(--color-border)] p-6 lg:border-b-0 lg:border-r">
          <div className="flex items-center justify-between">
            <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
              Stage
            </p>
            <button
              type="button"
              onClick={handlePlay}
              className="rounded-[var(--radius-sm)] bg-[var(--color-gp-red)] px-4 py-2 text-xs font-medium text-[var(--color-neutral-50)] transition-colors duration-200 hover:bg-[var(--color-gp-red-hover)]"
            >
              Play
            </button>
          </div>

          <div className="relative h-32 rounded-[var(--radius-xs)] border border-dashed border-[var(--color-border-strong)] bg-[var(--color-section-alt)]">
            <motion.div
              key={tick}
              initial={{ x: 0, opacity: 0 }}
              animate={{ x: "calc(100% - 64px)", opacity: 1 }}
              transition={{ duration, ease }}
              className="absolute top-1/2 left-2 h-16 w-16 -translate-y-1/2 rounded-[var(--radius-sm)] bg-[var(--color-gp-red)]"
              aria-hidden="true"
            />
          </div>

          <dl className="grid grid-cols-2 gap-x-6 gap-y-2 text-xs">
            <div className="flex items-baseline justify-between gap-3">
              <dt className="font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
                easing
              </dt>
              <dd>
                <CodeToken>{easingKey}</CodeToken>
              </dd>
            </div>
            <div className="flex items-baseline justify-between gap-3">
              <dt className="font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
                duration
              </dt>
              <dd>
                <CodeToken>{(duration * 1000).toFixed(0)}ms</CodeToken>
              </dd>
            </div>
            <div className="col-span-2 mt-1 flex items-baseline justify-between gap-3">
              <dt className="font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
                curve
              </dt>
              <dd>
                <CodeToken tone="mute">
                  {EASING_PRESETS.find((p) => p.key === easingKey)!.curve}
                </CodeToken>
              </dd>
            </div>
          </dl>
        </div>

        {/* Controls */}
        <div className="grid grid-cols-1 gap-0 lg:grid-rows-2">
          <div className="border-b border-[var(--color-border)] p-6">
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
              Easing
            </p>
            <ul className="space-y-1">
              {EASING_PRESETS.map((preset) => (
                <PickerItem
                  key={preset.key}
                  active={easingKey === preset.key}
                  label={preset.label}
                  value={preset.key}
                  onPick={setEasingKey}
                  showActive
                />
              ))}
            </ul>
          </div>

          <div className="p-6">
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
              Duration
            </p>
            <ul className="space-y-1">
              {DURATION_KEYS.map((d) => (
                <PickerItem
                  key={d.key}
                  active={durationKey === d.key}
                  label={d.label}
                  value={d.key}
                  onPick={setDurationKey}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Footer caption */}
      <div className="border-t border-[var(--color-border)] bg-[var(--color-section-alt)] px-6 py-3">
        <p className="text-xs text-[var(--color-text-muted)]">
          Use case: {EASING_PRESETS.find((p) => p.key === easingKey)!.notes}{" "}
          <span className="opacity-60">/</span>{" "}
          {DURATION_KEYS.find((d) => d.key === durationKey)!.usage}.
        </p>
      </div>
    </div>
  );
}

interface PickerItemProps<T extends string> {
  active: boolean;
  label: string;
  value: T;
  onPick: (value: T) => void;
  showActive?: boolean;
}

function PickerItem<T extends string>({
  active,
  label,
  value,
  onPick,
  showActive,
}: PickerItemProps<T>) {
  const handleClick = useCallback(() => onPick(value), [onPick, value]);
  return (
    <li>
      <button
        type="button"
        onClick={handleClick}
        className={cn(
          "flex w-full items-center justify-between rounded-[var(--radius-xs)] px-3 py-2 text-left text-xs transition-colors duration-200",
          active
            ? "bg-[var(--color-gp-red-tinted)] text-[var(--color-gp-red)]"
            : "text-[var(--color-text-body)] hover:bg-[var(--color-section-alt)]",
        )}
      >
        <span className="font-medium">{label}</span>
        {showActive && active ? (
          <span className="font-mono text-[10px] uppercase tracking-[0.08em]">
            active
          </span>
        ) : null}
      </button>
    </li>
  );
}
