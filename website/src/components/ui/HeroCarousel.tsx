"use client";

import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
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
  autoplayDelay?: number;
  className?: string;
}

// ============================================================================
// DEFAULT SLIDES
// ============================================================================

const defaultSlides: Slide[] = [
  {
    id: "slide-1",
    overline: "GRIDENERGY",
    headline: "Power Your Home. Own Your Energy.",
    subtitle:
      "Solar storage that pays for itself. Generate during the day, use at night. Stay powered when the grid goes down.",
    ctaText: "Explore Home Energy",
    ctaLink: "#gridenergy-home",
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
// HELPER
// ============================================================================

function renderOverline(text: string) {
  const lower = text.toLowerCase();
  if (lower.includes("gridenergy")) {
    return (
      <>
        <span className="text-[#FA0015] font-semibold">Grid</span>
        <span>Energy</span>
      </>
    );
  }
  if (lower.includes("gridcharge")) {
    return (
      <>
        <span className="text-[#FA0015] font-semibold">Grid</span>
        <span>Charge</span>
      </>
    );
  }
  return <span>{text}</span>;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function HeroCarousel({
  slides = defaultSlides,
  autoplayDelay = 5000,
  className,
}: HeroCarouselProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({
      delay: autoplayDelay,
      stopOnInteraction: false,
      stopOnMouseEnter: false,
    }),
  ]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setProgress(0);
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 1) return 0;
        return prev + 50 / autoplayDelay;
      });
    }, 50);
    return () => clearInterval(interval);
  }, [selectedIndex, autoplayDelay]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi]
  );

  const currentSlide = slides[selectedIndex];

  return (
    <div className={cn("relative w-full h-screen overflow-hidden bg-black", className)}>
      {/* Background Slides */}
      <div className="absolute inset-0" ref={emblaRef}>
        <div className="flex h-full">
          {slides.map((slide) => (
            <div key={slide.id} className="flex-[0_0_100%] min-w-0 relative">
              {slide.backgroundVideo ? (
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                >
                  <source src={slide.backgroundVideo} type="video/mp4" />
                </video>
              ) : (
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${slide.backgroundImage})` }}
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/40" />
            </div>
          ))}
        </div>
      </div>

      {/* Content Card */}
      <div className="absolute bottom-[clamp(100px,12vh,160px)] left-1/2 -translate-x-1/2 w-[min(420px,calc(100vw-48px))] z-10">
        <div className="bg-white/60 backdrop-blur-xl rounded-2xl p-2 shadow-lg">
          <div className="inline-block bg-white rounded-t-xl rounded-br-none px-4 py-3">
            <AnimatePresence mode="wait">
              <motion.span
                key={currentSlide.overline}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="text-xl text-gray-500 tracking-tight"
              >
                {renderOverline(currentSlide.overline)}
              </motion.span>
            </AnimatePresence>
          </div>

          <div className="bg-white rounded-tr-xl rounded-b-xl px-6 py-10 text-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-4xl font-semibold text-gray-900 mb-1 leading-tight tracking-tight">
                  {currentSlide.headline}
                </h2>
                <p className="text-base text-gray-700 mb-6 leading-relaxed">
                  {currentSlide.subtitle}
                </p>
                <a
                  href={currentSlide.ctaLink}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-b from-red-600 via-red-700 to-red-700 text-white text-base font-medium rounded-lg uppercase font-mono tracking-tight border border-red-700 shadow-[inset_0_0_1px_0_rgba(254,242,242,0.5),0_0.5px_0_0_#EF4444] hover:scale-[1.02] transition-transform"
                >
                  {currentSlide.ctaText}
                  <ArrowRight className="w-4 h-4" />
                </a>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <button
        onClick={scrollPrev}
        aria-label="Previous slide"
        className="absolute left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/15 border border-white/20 text-white flex items-center justify-center backdrop-blur-md hover:bg-white/25 transition-colors cursor-pointer"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={scrollNext}
        aria-label="Next slide"
        className="absolute right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/15 border border-white/20 text-white flex items-center justify-center backdrop-blur-md hover:bg-white/25 transition-colors cursor-pointer"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Progress Indicators */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {slides.map((slide, index) => {
          const isActive = index === selectedIndex;
          const isPast = index < selectedIndex;
          return (
            <button
              key={slide.id}
              onClick={() => scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={cn(
                "relative h-[3px] rounded-sm bg-white/30 transition-all duration-300 overflow-hidden cursor-pointer",
                isActive ? "w-12" : "w-6"
              )}
            >
              {isPast && <div className="absolute inset-0 bg-white/70" />}
              {isActive && (
                <motion.div
                  className="absolute top-0 left-0 bottom-0 bg-white"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress * 100}%` }}
                  transition={{ duration: 0.05, ease: "linear" }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default HeroCarousel;
