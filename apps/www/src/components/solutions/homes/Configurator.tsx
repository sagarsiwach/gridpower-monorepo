import { useRef, useState } from "react";
import { ArrowRight } from "@phosphor-icons/react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { useMegamenuTheme } from "../../../routes/_preview/_v3-tokens";

type ConfigKey = "apartment" | "small" | "large" | "solar";

type Config = {
  key: ConfigKey;
  image: string;
  label: string;
  capacity: string;
  price: string;
  payback: string;
  footprint: string;
};

const CONFIGS: Config[] = [
  {
    key: "apartment",
    image: "/images/solutions/homes-apartment.png",
    label: "Apartment ESS",
    capacity: "5 kWh",
    price: "₹6.4L",
    payback: "24 months",
    footprint: "2 BHK",
  },
  {
    key: "small",
    image: "/images/solutions/homes-small.png",
    label: "Small home",
    capacity: "10 kWh",
    price: "₹12.8L",
    payback: "28 months",
    footprint: "3 BHK",
  },
  {
    key: "large",
    image: "/images/solutions/homes-large.png",
    label: "Large home",
    capacity: "20 kWh",
    price: "₹26.5L",
    payback: "32 months",
    footprint: "4 BHK+",
  },
  {
    key: "solar",
    image: "/images/solutions/homes-solar.png",
    label: "Solar combo",
    capacity: "15 kWh + 5kW solar",
    price: "₹18.2L",
    payback: "22 months",
    footprint: "Best ROI",
  },
];

const STAT_LABELS: Record<string, string> = {
  capacity: "Capacity",
  price: "Indicative price",
  payback: "Est. payback",
  footprint: "Best fit",
};

const STAT_KEYS = ["capacity", "price", "payback", "footprint"] as const;

export default function Configurator() {
  const { theme, tokens } = useMegamenuTheme();
  const reduce = useReducedMotion();
  const [selected, setSelected] = useState<ConfigKey>("apartment");
  const active = CONFIGS.find((c) => c.key === selected)!;

  const displayImage = (img: string) =>
    theme === "dark" ? img.replace(/\.png$/, "-dark.png") : img;

  return (
    <section style={{ background: tokens.pageBgDeep, borderBottom: `1px solid ${tokens.hairline}` }}>
      <div className="mx-auto max-w-[1280px]" style={{ padding: "128px 32px" }}>
        <motion.div
          className="mb-14"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center gap-2 mb-4">
            <span style={{ width: 5, height: 5, borderRadius: 999, background: tokens.brand }} />
            <span
              className="text-[11px] uppercase tracking-[0.18em]"
              style={{ color: tokens.brand, fontWeight: 700 }}
            >
              PICK YOUR HOME
            </span>
          </div>
          <h2
            style={{
              color: tokens.ink,
              fontSize: "clamp(28px, 3.5vw, 44px)",
              fontWeight: 600,
              letterSpacing: "-0.025em",
              lineHeight: 1.1,
            }}
          >
            Storage sized for the way you live.
          </h2>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 12,
            marginBottom: 24,
          }}
        >
          {CONFIGS.map((config, i) => (
            <PickerTile
              key={config.key}
              config={config}
              index={i}
              isActive={config.key === selected}
              onSelect={() => setSelected(config.key)}
              displayImage={displayImage}
            />
          ))}
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 0,
            background: tokens.card,
            border: `1px solid ${tokens.hairline}`,
            borderRadius: 20,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              background: tokens.pageBgDeep,
              aspectRatio: "16/10",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <AnimatePresence mode="popLayout">
              <motion.img
                key={active.image + theme}
                src={displayImage(active.image)}
                alt={active.label}
                initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </AnimatePresence>

            <div
              style={{
                position: "absolute",
                left: 18,
                bottom: 16,
                display: "flex",
                alignItems: "center",
                gap: 8,
                background: tokens.ink,
                color: "white",
                padding: "5px 11px",
                borderRadius: 999,
                opacity: 0.85,
              }}
            >
              <motion.span
                style={{ width: 5, height: 5, borderRadius: 999, background: tokens.brand }}
                animate={reduce ? undefined : { opacity: [1, 0.4, 1] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              />
              <span
                className="text-[10px] uppercase tracking-[0.14em]"
                style={{ fontWeight: 700 }}
              >
                {active.label}
              </span>
            </div>
          </div>

          <div
            style={{
              padding: "36px 36px 36px 36px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <p
                className="text-[11px] uppercase tracking-[0.16em]"
                style={{ color: tokens.brand, fontWeight: 700, marginBottom: 20 }}
              >
                Configuration · {active.label}
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {STAT_KEYS.map((stat, i) => (
                  <div
                    key={stat}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "16px 0",
                      borderTop: i === 0 ? "none" : `1px solid ${tokens.hairline}`,
                      minHeight: 50,
                    }}
                  >
                    <span
                      className="text-[13px]"
                      style={{ color: tokens.muted, fontWeight: 500 }}
                    >
                      {STAT_LABELS[stat]}
                    </span>
                    <div style={{ position: "relative", height: 22, overflow: "hidden" }}>
                      <AnimatePresence mode="popLayout">
                        <motion.span
                          key={active[stat]}
                          initial={reduce ? { opacity: 0 } : { y: 14, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={reduce ? { opacity: 0 } : { y: -14, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                          className="text-[15px] font-semibold"
                          style={{
                            color: tokens.ink,
                            display: "block",
                            textAlign: "right",
                            whiteSpace: "nowrap",
                            fontVariantNumeric: "tabular-nums",
                          }}
                        >
                          {active[stat]}
                        </motion.span>
                      </AnimatePresence>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 28 }}>
              <MagneticCta tokens={tokens} reduce={!!reduce} />
              <button
                type="button"
                className="text-[12px] uppercase tracking-[0.08em] font-semibold"
                style={{
                  background: "transparent",
                  color: tokens.ink,
                  border: `1px solid ${tokens.hairline}`,
                  borderRadius: 12,
                  padding: "12px 20px",
                  cursor: "pointer",
                  transition: "border-color 0.2s ease",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.borderColor = tokens.hairlineStrong)
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.borderColor = tokens.hairline)
                }
              >
                See full specs
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function PickerTile({
  config,
  index,
  isActive,
  onSelect,
  displayImage,
}: {
  config: Config;
  index: number;
  isActive: boolean;
  onSelect: () => void;
  displayImage: (img: string) => string;
}) {
  const { tokens } = useMegamenuTheme();
  const reduce = useReducedMotion();
  const [hovered, setHovered] = useState(false);

  return (
    <motion.button
      type="button"
      onClick={onSelect}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={reduce ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: 0.08 + index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: "relative",
        background: isActive ? tokens.card : tokens.pageBg,
        border: `1px solid ${tokens.hairline}`,
        borderRadius: 16,
        padding: 0,
        cursor: "pointer",
        overflow: "hidden",
        textAlign: "left",
        transition: "background 0.25s ease",
      }}
    >
      {isActive && (
        <motion.div
          layoutId="config-selection-ring"
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 16,
            border: `2px solid ${tokens.brand}`,
            pointerEvents: "none",
            zIndex: 3,
          }}
          transition={{ type: "spring", stiffness: 340, damping: 30 }}
        />
      )}

      <div style={{ position: "relative", overflow: "hidden" }}>
        <div
          style={{
            aspectRatio: "4/5",
            background: tokens.pageBgDeep,
            overflow: "hidden",
          }}
        >
          <motion.img
            src={displayImage(config.image)}
            alt={config.label}
            loading="lazy"
            animate={{ scale: hovered && !reduce ? 1.06 : 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        </div>
        <div
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            background: tokens.brand,
            borderRadius: 999,
            padding: "3px 10px",
            zIndex: 2,
          }}
        >
          <span
            className="text-[10px] font-semibold"
            style={{ color: "white", whiteSpace: "nowrap" }}
          >
            {config.payback}
          </span>
        </div>
      </div>
      <div
        style={{
          padding: "12px 14px 14px",
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <motion.span
          animate={{
            width: isActive ? 6 : 0,
            opacity: isActive ? 1 : 0,
          }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{
            height: 6,
            borderRadius: 999,
            background: tokens.brand,
            display: "inline-block",
          }}
        />
        <p className="text-[13px] font-semibold" style={{ color: tokens.ink }}>
          {config.label}
        </p>
      </div>
    </motion.button>
  );
}

function MagneticCta({ tokens, reduce }: { tokens: ReturnType<typeof useMegamenuTheme>["tokens"]; reduce: boolean }) {
  const ref = useRef<HTMLButtonElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 220, damping: 18, mass: 0.4 });
  const y = useSpring(rawY, { stiffness: 220, damping: 18, mass: 0.4 });
  const [hovered, setHovered] = useState(false);

  const onMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;
    rawX.set(offsetX * 0.18);
    rawY.set(offsetY * 0.22);
  };

  const onLeave = () => {
    rawX.set(0);
    rawY.set(0);
    setHovered(false);
  };

  return (
    <motion.button
      ref={ref}
      type="button"
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onLeave}
      className="flex items-center justify-center gap-2 text-[12px] uppercase tracking-[0.08em] font-semibold"
      style={{
        background: hovered ? tokens.brandHover : tokens.brand,
        color: "white",
        border: "none",
        borderRadius: 12,
        padding: "14px 20px",
        cursor: "pointer",
        x,
        y,
        transition: "background 0.2s ease",
      }}
    >
      Book a survey for this setup
      <motion.span
        animate={{ x: hovered && !reduce ? 4 : 0 }}
        transition={{ type: "spring", stiffness: 280, damping: 20 }}
        style={{ display: "inline-flex" }}
      >
        <ArrowRight size={13} weight="bold" />
      </motion.span>
    </motion.button>
  );
}
