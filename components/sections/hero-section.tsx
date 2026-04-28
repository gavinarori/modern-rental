"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const word = "M3";

const sideImages = [
  {
    src: "/images/hero/unified_r1_c1.jpg",
    alt: "BMW M3 Competition front quarter",
    position: "left",
    span: 1,
  },
  {
    src: "/images/hero/unified_r1_c2.jpg",
    alt: "BMW M3 interior cockpit",
    position: "left",
    span: 1,
  },
  {
    src: "/images/hero/unified_r1_c3.jpg",
    alt: "BMW M3 rear diffuser detail",
    position: "right",
    span: 1,
  },
  {
    src: "/images/hero/unified_r1_c4.jpg",
    alt: "BMW M3 on track at night",
    position: "right",
    span: 1,
  },
];

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const scrollableHeight = window.innerHeight * 2;
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / scrollableHeight));
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const textOpacity = Math.max(0, 1 - scrollProgress / 0.2);
  const animationProgress = Math.max(0, Math.min(1, (scrollProgress - 0.2) / 0.8));
  const sideWidth = animationProgress * 35;
  const sideOpacity = animationProgress;
  const sideTranslateLeft = -100 + animationProgress * 100;
  const sideTranslateRight = 100 - animationProgress * 100;
  const gap = animationProgress * 4;

  return (
    <section ref={sectionRef} className="relative bg-background">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="flex h-full w-full items-center justify-center">
          <div
            className="relative flex h-full w-full items-stretch justify-center"
            style={{ gap: `${gap}px`, overflow: "hidden" }}
          >
            {/* LEFT COLUMN */}
            <div
              className="flex h-full flex-row will-change-transform gap-2"
              style={{
                width: `${sideWidth}%`,
                transform: `translateX(${sideTranslateLeft}%)`,
                opacity: sideOpacity,
              }}
            >
              {sideImages.filter(img => img.position === "left").map((img, idx) => (
                <div
                  key={idx}
                  className="relative h-full overflow-hidden will-change-transform"
                  style={{ flex: img.span }}
                >
                  <Image src={img.src} alt={img.alt} fill className="object-cover" priority />
                </div>
              ))}
            </div>

            {/* CENTER - Video */}
            <div className="relative overflow-hidden will-change-transform flex-1">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 h-full w-full object-cover"
                style={{ opacity: 1 - animationProgress * 0.3 }}
                src="https://video.gumlet.io/67690fd82fbe90b354d66613/69df56c2e034f96e26cd6deb/download.mp4"
              />
              {/* Dark overlay for text contrast */}
              <div className="absolute inset-0 bg-black/30" />

              {/* M3 Giant Text */}
              <div
                className="absolute inset-0 z-10 flex items-center justify-center"
                style={{ opacity: textOpacity }}
              >
                <h1
                  className="whitespace-nowrap font-black leading-none tracking-tighter text-white"
                  style={{
                    fontSize: "28vw",
                    textShadow: "0 0 120px rgba(0,119,255,0.4)",
                    letterSpacing: "-0.04em",
                  }}
                >
                  {word}
                </h1>
              </div>

              {/* Subtitle */}
              <div
                className="absolute bottom-12 left-0 right-0 z-10 text-center"
                style={{ opacity: textOpacity }}
              >
                <p
                  className="text-xs uppercase tracking-[0.4em] text-white/60 mb-3"
                  style={{ fontFamily: "monospace" }}
                >
                  BMW M GmbH · Since 1992
                </p>
                <p className="text-white text-xl md:text-2xl font-light tracking-wide">
                  The icon. Evolved.
                </p>
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div
              className="flex h-full flex-row will-change-transform gap-2"
              style={{
                width: `${sideWidth}%`,
                transform: `translateX(${sideTranslateRight}%)`,
                opacity: sideOpacity,
              }}
            >
              {sideImages.filter(img => img.position === "right").map((img, idx) => (
                <div
                  key={idx}
                  className="relative h-full overflow-hidden will-change-transform"
                  style={{ flex: img.span }}
                >
                  <Image src={img.src} alt={img.alt} fill className="object-cover" priority />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tagline */}
      

      <div className="h-[200vh]" />
    </section>
  );
}