"use client";

import { ArrowRight } from "lucide-react";

export function GridEnergySection() {
  return (
    <section
      id="energy"
      className="relative w-full h-screen min-h-[700px] overflow-hidden"
    >
      {/* Video Background */}
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/video/carousel-2.mp4" type="video/mp4" />
        </video>
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/40" />
      </div>

      {/* Content Container with responsive max-width */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          maxWidth: "1536px",
          margin: "0 auto",
          padding: "24px",
        }}
        className="max-[1440px]:max-w-[1280px] max-[1024px]:max-w-[896px] max-[768px]:max-w-[576px] max-[640px]:max-w-none max-[640px]:px-4"
      >
        {/* Content Card - Top Left Position */}
        <div
          style={{
            position: "absolute",
            top: "24px",
            left: "24px",
            width: "min(560px, calc(100vw - 48px))",
            zIndex: 15,
          }}
          className="max-[640px]:left-4 max-[640px]:right-4 max-[640px]:w-auto"
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
                "11px 11px 4px 0px rgba(0,0,0,0), 7px 7px 4px 0px rgba(0,0,0,0.01), 4px 4px 3px 0px rgba(0,0,0,0.05), 2px 2px 3px 0px rgba(0,0,0,0.09), 0px 0px 1px 0px rgba(0,0,0,0.1)",
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
              <span
                style={{
                  display: "inline-block",
                  fontSize: "20px",
                  fontWeight: 400,
                  letterSpacing: "-0.4px",
                  color: "#6b7280",
                  fontFamily: "'Google Sans Flex', 'Google Sans', Inter, sans-serif",
                }}
              >
                <span style={{ fontWeight: 600, color: "#fa0015" }}>Grid</span>
                <span>Power</span>
              </span>
            </div>

            {/* Main content section */}
            <div
              style={{
                backgroundColor: "#fff",
                borderRadius: "0 12px 12px 12px",
                padding: "40px 24px",
              }}
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
                  fontFamily: "'Google Sans Flex', 'Google Sans', Inter, sans-serif",
                }}
              >
                The Open Energy Platform
              </h2>

              {/* Subtitle */}
              <p
                style={{
                  fontSize: "16px",
                  color: "#374151",
                  marginBottom: "40px",
                  lineHeight: 1.5,
                  letterSpacing: "-0.32px",
                  fontFamily: "'Google Sans', Inter, sans-serif",
                }}
              >
                Charging stations. Energy storage. EV powertrains. All built on open technology. No vendor lock-in. No black boxes. Just transparent infrastructure that works for you, not against you.
              </p>

              {/* CTA Button */}
              <a
                href="#express-interest"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "8px 16px",
                  background: "linear-gradient(180deg, #e5e7eb 0%, #d1d5db 70%, #d1d5db 100%)",
                  color: "#374151",
                  fontSize: "16px",
                  fontWeight: 500,
                  borderRadius: "8px",
                  textDecoration: "none",
                  fontFamily: "'Google Sans', Inter, sans-serif",
                  letterSpacing: "-0.32px",
                  border: "0.5px solid #9ca3af",
                  boxShadow: "inset 0 0 1px 0 #f3f4f6, 0 0.5px 0 0 #6b7280",
                  transition: "transform 0.15s ease, box-shadow 0.15s ease",
                }}
                className="hover:scale-[1.02] active:scale-[0.98]"
              >
                Express Interest
                <ArrowRight style={{ width: "16px", height: "16px" }} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default GridEnergySection;
