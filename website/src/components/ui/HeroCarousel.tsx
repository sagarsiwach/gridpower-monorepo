"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

// ============================================================================
// TYPES
// ============================================================================

interface Slide {
  id: string;
  overline: string;
  headline: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  backgroundImage?: string;
  backgroundVideo?: string;
}

interface HeroCarouselProps {
  slides?: Slide[];
  autoplay?: boolean;
  autoplayDelay?: number;
  pauseOnHover?: boolean;
  pauseOnFocus?: boolean;
  loop?: boolean;
  showNavigation?: boolean;
  showPagination?: boolean;
  transitionDuration?: number;
  className?: string;
}

// ============================================================================
// CONSTANTS
// ============================================================================

const SWIPE_THRESHOLD = 50;

const defaultSlides: Slide[] = [
  {
    id: "slide-1",
    overline: "GRIDENERGY",
    headline: "Power Your Home. Own Your Energy.",
    subtitle:
      "Solar storage that pays for itself. Generate during the day, use at night. Stay powered when the grid goes down.",
    ctaText: "Explore Home Energy",
    ctaLink: "#gridenergy-home",
    backgroundVideo: "/video/carousel-1.mp4",
    backgroundImage:
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1920&q=80",
  },
  {
    id: "slide-2",
    overline: "GRIDENERGY",
    headline: "Cut Peaks. Save Lakhs.",
    subtitle:
      "Reduce demand charges with smart storage. Meet sustainability targets with real data. Pay less, pollute less.",
    ctaText: "Explore Office Energy",
    ctaLink: "#gridenergy-office",
    backgroundVideo: "/video/carousel-2.mp4",
    backgroundImage:
      "https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=1920&q=80",
  },
  {
    id: "slide-3",
    overline: "GRIDENERGY",
    headline: "Industrial Power. Zero Compromise.",
    subtitle:
      "Container-scale storage for factories and large facilities. Reliable backup, peak shaving, and grid independence.",
    ctaText: "Explore Industrial Energy",
    ctaLink: "#gridenergy-industrial",
    backgroundImage:
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1920&q=80",
  },
  {
    id: "slide-4",
    overline: "GRIDENERGY",
    headline: "Grid-Scale. Open Architecture.",
    subtitle:
      "Utility-grade energy storage for developers and power companies. Full documentation, custom configurations, serious capacity.",
    ctaText: "Explore Power Parks",
    ctaLink: "#gridenergy-powerpark",
    backgroundImage:
      "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1920&q=80",
  },
  {
    id: "slide-5",
    overline: "GRIDCHARGE",
    headline: "Charge at Home. Skip the Queue.",
    subtitle:
      "Install once, charge forever. Wake up to a full battery every morning. Works with any EV, any solar setup.",
    ctaText: "Explore Home Charging",
    ctaLink: "#gridcharge-home",
    backgroundImage:
      "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=1920&q=80",
  },
  {
    id: "slide-6",
    overline: "GRIDCHARGE",
    headline: "Employee Perk. Zero Hassle.",
    subtitle:
      "Add charging to your parking lot without the complexity. Access control, billing, and load management — all handled.",
    ctaText: "Explore Office Charging",
    ctaLink: "#gridcharge-office",
    backgroundImage:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80",
  },
  {
    id: "slide-7",
    overline: "GRIDCHARGE",
    headline: "Customer Amenity. Revenue Opportunity.",
    subtitle:
      "Hotels, malls, restaurants — wherever your customers park. Offer charging as a service or amenity. Your pricing, your control.",
    ctaText: "Explore Commercial Charging",
    ctaLink: "#gridcharge-commercial",
    backgroundImage:
      "https://images.unsplash.com/photo-1619767886558-efdc7b9af5a6?w=1920&q=80",
  },
  {
    id: "slide-8",
    overline: "GRIDCHARGE",
    headline: "Power Your Fleet. Scale On Demand.",
    subtitle:
      "Depot charging for logistics and delivery fleets. High-power DC, scheduling, fleet management integration. Built for uptime.",
    ctaText: "Explore Fleet Charging",
    ctaLink: "#gridcharge-enterprise",
    backgroundImage:
      "https://images.unsplash.com/photo-1530685932526-48ec92998eaa?w=1920&q=80",
  },
];

// ============================================================================
// ANIMATION VARIANTS
// ============================================================================

const backgroundVariants = {
  enter: { opacity: 0 },
  center: { opacity: 1 },
  exit: { opacity: 0 },
};

const contentVariants = {
  enter: { opacity: 0 },
  center: { opacity: 1 },
  exit: { opacity: 0 },
};

// ============================================================================
// HOOKS
// ============================================================================

function useSwipe(
  onSwipeLeft: () => void,
  onSwipeRight: () => void,
  enabled = true
) {
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const onTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (!enabled) return;
      setTouchEnd(null);
      setTouchStart(e.targetTouches[0].clientX);
    },
    [enabled]
  );

  const onTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!enabled) return;
      setTouchEnd(e.targetTouches[0].clientX);
    },
    [enabled]
  );

  const onTouchEnd = useCallback(() => {
    if (!enabled || touchStart === null || touchEnd === null) return;
    const distance = touchStart - touchEnd;
    if (distance > SWIPE_THRESHOLD) onSwipeLeft();
    if (distance < -SWIPE_THRESHOLD) onSwipeRight();
  }, [enabled, touchStart, touchEnd, onSwipeLeft, onSwipeRight]);

  return { onTouchStart, onTouchMove, onTouchEnd };
}

function useReducedMotion() {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return prefersReduced;
}

// ============================================================================
// HELPER
// ============================================================================

function renderOverline(text: string) {
  const lower = text.toLowerCase();
  if (lower.includes("gridpower")) {
    return (
      <>
        <span className="font-semibold text-[#fa0015]">Grid</span>
        <span>Power</span>
      </>
    );
  }
  if (lower.includes("gridenergy")) {
    return (
      <>
        <span className="font-semibold text-[#fa0015]">Grid</span>
        <span>Energy</span>
      </>
    );
  }
  if (lower.includes("gridcharge")) {
    return (
      <>
        <span className="font-semibold text-[#fa0015]">Grid</span>
        <span>Charge</span>
      </>
    );
  }
  return <span>{text}</span>;
}

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

interface BackgroundLayerProps {
  slide: Slide;
  transitionDuration: number;
  reducedMotion: boolean;
}

function BackgroundLayer({
  slide,
  transitionDuration,
  reducedMotion,
}: BackgroundLayerProps) {
  const isVideo = !!slide.backgroundVideo;
  const backgroundSrc =
    slide.backgroundVideo ||
    slide.backgroundImage ||
    "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1920";

  return (
    <motion.div
      key={slide.id}
      variants={backgroundVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{
        duration: reducedMotion ? 0.2 : transitionDuration,
        ease: "easeInOut",
      }}
      className="absolute inset-0"
    >
      {isVideo ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={slide.backgroundImage}
          className="w-full h-full object-cover"
        >
          <source src={backgroundSrc} type="video/mp4" />
        </video>
      ) : (
        <div
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundSrc})` }}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/40" />
    </motion.div>
  );
}

// ============================================================================
// CONTENT CARD - Exact Figma Implementation
// ============================================================================

interface ContentCardProps {
  slide: Slide;
  transitionDuration: number;
  reducedMotion: boolean;
}

function ContentCard({
  slide,
  transitionDuration,
  reducedMotion,
}: ContentCardProps) {
  const duration = reducedMotion ? 0.15 : transitionDuration * 0.5;

  return (
    <div
      style={{
        position: "absolute",
        bottom: "clamp(100px, 12vh, 160px)",
        left: "50%",
        transform: "translateX(-50%)",
        width: "min(420px, calc(100vw - 48px))",
        zIndex: 15,
      }}
    >
      {/* Frosted glass card container */}
      <div
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.6)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderRadius: "16px",
          padding: "8px",
          boxShadow:
            "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        }}
      >
        {/* Overline chiplet - inline-block to hug content */}
        <div
          style={{
            display: "inline-block",
            backgroundColor: "#fff",
            borderRadius: "12px 12px 0 0",
            padding: "12px 16px",
            marginBottom: "2px",
          }}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={slide.overline}
              variants={contentVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration }}
              style={{
                display: "inline-block",
                fontSize: "20px",
                fontWeight: 400,
                letterSpacing: "-0.4px",
                color: "#6b7280",
                fontFamily:
                  "'Google Sans Flex', 'Google Sans', Inter, sans-serif",
              }}
            >
              {renderOverline(slide.overline)}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* Main content section */}
        <div
          style={{
            backgroundColor: "#fff",
            borderRadius: "0 12px 12px 12px",
            padding: "40px 24px",
            textAlign: "center",
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              variants={contentVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration }}
            >
              {/* Headline */}
              <h2
                style={{
                  fontSize: "36px",
                  fontWeight: 600,
                  color: "#1F2937",
                  marginBottom: "4px",
                  lineHeight: 1.1,
                  letterSpacing: "-0.72px",
                  fontFamily:
                    "'Google Sans Flex', 'Google Sans', Inter, sans-serif",
                }}
              >
                {slide.headline}
              </h2>

              {/* Subtitle */}
              <p
                style={{
                  fontSize: "16px",
                  color: "#374151",
                  marginBottom: "24px",
                  lineHeight: 1.5,
                  letterSpacing: "-0.32px",
                  fontFamily: "'Google Sans', Inter, sans-serif",
                }}
              >
                {slide.subtitle}
              </p>

              {/* CTA Button */}
              {slide.ctaText && (
                <a
                  href={slide.ctaLink || "#"}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "8px 16px",
                    background:
                      "linear-gradient(180deg, #DC2626 0%, #B91C1C 70%, #B91C1C 100%)",
                    color: "#fff",
                    fontSize: "16px",
                    fontWeight: 500,
                    borderRadius: "8px",
                    textDecoration: "none",
                    textTransform: "uppercase",
                    fontFamily: "'JetBrains Mono', monospace",
                    letterSpacing: "-0.32px",
                    border: "0.5px solid #B91C1C",
                    boxShadow:
                      "inset 0 0 1px 0 rgba(254, 242, 242, 0.5), 0 0.5px 0 0 #EF4444",
                    transition: "transform 0.15s ease, box-shadow 0.15s ease",
                  }}
                  className="hover:scale-[1.02] active:scale-[0.98]"
                >
                  {slide.ctaText}
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// NAVIGATION & INDICATORS
// ============================================================================

interface NavigationButtonProps {
  direction: "prev" | "next";
  onClick: () => void;
  disabled?: boolean;
}

function NavigationButton({
  direction,
  onClick,
  disabled,
}: NavigationButtonProps) {
  const isNext = direction === "next";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={isNext ? "Next slide" : "Previous slide"}
      className={cn(
        "absolute top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full",
        "bg-white/15 border border-white/20 backdrop-blur-md",
        "flex items-center justify-center transition-all duration-200",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50",
        disabled
          ? "text-white/30 cursor-not-allowed"
          : "text-white hover:bg-white/25 cursor-pointer",
        isNext ? "right-8" : "left-8"
      )}
    >
      {isNext ? (
        <ChevronRight className="w-5 h-5" />
      ) : (
        <ChevronLeft className="w-5 h-5" />
      )}
    </button>
  );
}

interface ProgressIndicatorsProps {
  slides: Slide[];
  currentIndex: number;
  onSelect: (index: number) => void;
  progress: number;
  autoplay: boolean;
}

function ProgressIndicators({
  slides,
  currentIndex,
  onSelect,
  progress,
  autoplay,
}: ProgressIndicatorsProps) {
  return (
    <div
      role="tablist"
      aria-label="Slide navigation"
      className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2"
    >
      {slides.map((slide, index) => {
        const isActive = index === currentIndex;
        const isPast = index < currentIndex;

        return (
          <button
            key={slide.id}
            role="tab"
            aria-selected={isActive}
            aria-label={`Go to slide ${index + 1}`}
            onClick={() => onSelect(index)}
            className={cn(
              "relative h-[3px] rounded-sm bg-white/30 transition-all duration-300 overflow-hidden cursor-pointer",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
              isActive ? "w-12" : "w-6"
            )}
          >
            {isPast && <div className="absolute inset-0 bg-white/70" />}
            {isActive && (
              <motion.div
                className="absolute top-0 left-0 bottom-0 bg-white"
                initial={{ width: "0%" }}
                animate={{ width: autoplay ? `${progress * 100}%` : "100%" }}
                transition={{ duration: 0.05, ease: "linear" }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function HeroCarousel({
  slides = defaultSlides,
  autoplay = true,
  autoplayDelay = 5000,
  pauseOnHover = false,
  pauseOnFocus = true,
  loop = true,
  showNavigation = true,
  showPagination = true,
  transitionDuration = 0.8,
  className,
}: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [autoplayProgress, setAutoplayProgress] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const progressIntervalRef = useRef<ReturnType<typeof setInterval> | null>(
    null
  );

  const prefersReducedMotion = useReducedMotion();

  const activeSlides = slides.filter((s) => s && (s.headline || s.overline));
  const totalSlides = activeSlides.length;
  const canGoNext = loop || currentIndex < totalSlides - 1;
  const canGoPrev = loop || currentIndex > 0;

  const goToSlide = useCallback(
    (index: number) => {
      if (index === currentIndex) return;
      let newIndex = index;
      if (loop) {
        if (index < 0) newIndex = totalSlides - 1;
        if (index >= totalSlides) newIndex = 0;
      } else {
        newIndex = Math.max(0, Math.min(totalSlides - 1, index));
      }
      setCurrentIndex(newIndex);
      setAutoplayProgress(0);
    },
    [currentIndex, totalSlides, loop]
  );

  const goToNext = useCallback(() => {
    if (!canGoNext && !loop) return;
    goToSlide(currentIndex + 1);
  }, [currentIndex, canGoNext, loop, goToSlide]);

  const goToPrev = useCallback(() => {
    if (!canGoPrev && !loop) return;
    goToSlide(currentIndex - 1);
  }, [currentIndex, canGoPrev, loop, goToSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!containerRef.current?.contains(document.activeElement)) return;
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goToPrev();
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        goToNext();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToNext, goToPrev]);

  // Autoplay
  const shouldAutoplay =
    autoplay && totalSlides > 1 && !isPaused && !(pauseOnFocus && isFocused);

  useEffect(() => {
    if (!shouldAutoplay) {
      if (progressIntervalRef.current)
        clearInterval(progressIntervalRef.current);
      setAutoplayProgress(0);
      return;
    }

    setAutoplayProgress(0);
    const startTime = Date.now();

    progressIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / autoplayDelay, 1);
      setAutoplayProgress(progress);

      if (progress >= 1) {
        if (progressIntervalRef.current)
          clearInterval(progressIntervalRef.current);
        setCurrentIndex((prev) => (prev + 1) % totalSlides);
      }
    }, 50);

    return () => {
      if (progressIntervalRef.current)
        clearInterval(progressIntervalRef.current);
    };
  }, [shouldAutoplay, autoplayDelay, currentIndex, totalSlides]);

  // Swipe handlers
  const swipeHandlers = useSwipe(goToNext, goToPrev, totalSlides > 1);

  // Empty state
  if (totalSlides === 0) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-black text-white">
        Add at least one slide
      </div>
    );
  }

  const currentSlide = activeSlides[currentIndex];

  return (
    <div
      ref={containerRef}
      role="region"
      aria-roledescription="carousel"
      aria-label="Hero carousel"
      tabIndex={0}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={(e) => {
        if (!containerRef.current?.contains(e.relatedTarget as Node)) {
          setIsFocused(false);
        }
      }}
      {...swipeHandlers}
      className={cn(
        "relative w-full h-screen overflow-hidden bg-black outline-none",
        className
      )}
      style={{ fontFamily: "var(--font-sans)" }}
    >
      {/* Background slides - crossfade */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <BackgroundLayer
            key={currentSlide.id}
            slide={currentSlide}
            transitionDuration={transitionDuration}
            reducedMotion={prefersReducedMotion}
          />
        </AnimatePresence>
      </div>

      {/* Fixed content card */}
      <ContentCard
        slide={currentSlide}
        transitionDuration={transitionDuration}
        reducedMotion={prefersReducedMotion}
      />

      {/* Navigation arrows */}
      {showNavigation && totalSlides > 1 && (
        <>
          <NavigationButton
            direction="prev"
            onClick={goToPrev}
            disabled={!canGoPrev}
          />
          <NavigationButton
            direction="next"
            onClick={goToNext}
            disabled={!canGoNext}
          />
        </>
      )}

      {/* Progress indicators */}
      {showPagination && totalSlides > 1 && (
        <ProgressIndicators
          slides={activeSlides}
          currentIndex={currentIndex}
          onSelect={goToSlide}
          progress={autoplayProgress}
          autoplay={shouldAutoplay}
        />
      )}
    </div>
  );
}

export default HeroCarousel;
