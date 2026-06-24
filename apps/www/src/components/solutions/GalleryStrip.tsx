import { useState, useRef } from "react";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import { tokens } from "../../routes/_preview/_v3-tokens";

export type GalleryImage = {
  src: string;
  alt: string;
  caption?: string;
};

export type GalleryStripProps = {
  images: GalleryImage[];
  aspectRatio?: string;
};

/*
  GalleryStrip — horizontal scroll image carousel.
  Snap scroll on mobile. Scroll-button navigation on desktop.
  Each tile: rounded-rect. Caption fades in on hover (desktop only).
  Click opens full-size in new tab via <a> wrap — NO lightbox.
  Respects prefers-reduced-motion for scroll behavior.
*/
export function GalleryStrip({ images, aspectRatio = "4 / 3" }: GalleryStripProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const prefersReduced =
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;

  function scroll(direction: "left" | "right") {
    const el = scrollRef.current;
    if (!el) return;
    const tileWidth = el.firstElementChild
      ? (el.firstElementChild as HTMLElement).offsetWidth + 12
      : 300;
    el.scrollBy({
      left: direction === "right" ? tileWidth * 2 : -tileWidth * 2,
      behavior: prefersReduced ? "instant" : "smooth",
    });
  }

  function handleScroll() {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
  }

  return (
    <section
      style={{
        background: tokens.pageBgDeep,
        borderTop: `1px solid ${tokens.hairline}`,
        borderBottom: `1px solid ${tokens.hairline}`,
      }}
    >
      <div className="mx-auto max-w-[1280px] px-8 py-16">
        {/* header + controls */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 24,
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
            GALLERY
          </span>
          <span style={{ flex: 1, height: 1, background: tokens.hairlineStrong }} />
          {/* desktop scroll buttons */}
          <div className="gallery-buttons" style={{ display: "flex", gap: 6 }}>
            <ScrollButton
              direction="left"
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
            />
            <ScrollButton
              direction="right"
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
            />
          </div>
        </div>

        {/* scroll container */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          style={{
            display: "flex",
            gap: 12,
            overflowX: "auto",
            scrollSnapType: "x mandatory",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            paddingBottom: 4,
          }}
          className="gallery-scroll"
        >
          {images.map((img) => (
            <GalleryTile key={img.src} image={img} aspectRatio={aspectRatio} />
          ))}
        </div>
      </div>

      <style>{`
        .gallery-scroll::-webkit-scrollbar { display: none; }
        @media (max-width: 640px) {
          .gallery-buttons { display: none !important; }
        }
      `}</style>
    </section>
  );
}

function GalleryTile({
  image,
  aspectRatio,
}: {
  image: GalleryImage;
  aspectRatio: string;
}) {
  const [hovered, setHovered] = useState(false);

  const prefersReduced =
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;

  return (
    <a
      href={image.src}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "block",
        flexShrink: 0,
        width: "clamp(220px, 32vw, 380px)",
        aspectRatio,
        borderRadius: 16,
        overflow: "hidden",
        position: "relative",
        scrollSnapAlign: "start",
        border: `1px solid ${tokens.hairline}`,
        background: tokens.pageBg,
      }}
    >
      <img
        src={image.src}
        alt={image.alt}
        loading="lazy"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
          transform:
            hovered && !prefersReduced ? "scale(1.04)" : "scale(1)",
          transition: prefersReduced ? "none" : "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      />

      {/* caption overlay on hover */}
      {image.caption && (
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: "32px 16px 14px",
            background:
              "linear-gradient(to top, oklch(15.3% 0.006 107.1 / 0.72) 0%, transparent 100%)",
            opacity: hovered && !prefersReduced ? 1 : 0,
            transition: prefersReduced ? "none" : "opacity 0.2s ease",
          }}
        >
          <p
            style={{
              fontSize: 12,
              fontWeight: 500,
              color: "rgba(255,255,255,0.9)",
              lineHeight: 1.4,
            }}
          >
            {image.caption}
          </p>
        </div>
      )}
    </a>
  );
}

function ScrollButton({
  direction,
  onClick,
  disabled,
}: {
  direction: "left" | "right";
  onClick: () => void;
  disabled: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: 32,
        height: 32,
        borderRadius: 999,
        border: `1px solid ${tokens.hairlineStrong}`,
        background: disabled
          ? tokens.pageBgDeep
          : hovered
          ? tokens.card
          : tokens.pageBg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.4 : 1,
        transition: "background 0.15s ease, opacity 0.15s ease",
      }}
      aria-label={direction === "left" ? "Scroll left" : "Scroll right"}
    >
      {direction === "left" ? (
        <ArrowLeft size={13} weight="bold" color={tokens.ink} />
      ) : (
        <ArrowRight size={13} weight="bold" color={tokens.ink} />
      )}
    </button>
  );
}
