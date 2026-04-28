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
  const videoRef = useRef<HTMLVideoElement>(null);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [hideText, setHideText] = useState(false);

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

  // Hide giant M3 after 4 seconds once video starts
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let timer: NodeJS.Timeout;

    const handlePlay = () => {
      timer = setTimeout(() => {
        setHideText(true);
      }, 4000);
    };

    video.addEventListener("play", handlePlay);

    return () => {
      video.removeEventListener("play", handlePlay);
      clearTimeout(timer);
    };
  }, []);

  const textOpacity = hideText ? 0 : Math.max(0, 1 - scrollProgress / 0.2);

  const animationProgress = Math.max(
    0,
    Math.min(1, (scrollProgress - 0.2) / 0.8)
  );

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
              {sideImages
                .filter((img) => img.position === "left")
                .map((img, idx) => (
                  <div
                    key={idx}
                    className="relative h-full overflow-hidden"
                    style={{ flex: img.span }}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                ))}
            </div>

            {/* CENTER VIDEO */}
            <div className="relative overflow-hidden flex-1">
              <video
                ref={videoRef}
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 h-full w-full object-cover"
                style={{ opacity: 1 - animationProgress * 0.3 }}
                src="/images/BMW_M3_Family_MASTER_HD.mp4"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/30" />

              {/* Giant M3 */}
              <div
                className="absolute inset-0 z-10 flex items-center justify-center transition-opacity duration-1000"
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
                className="absolute bottom-12 left-0 right-0 z-10 text-center transition-opacity duration-1000"
                style={{ opacity: textOpacity }}
              >
                <p
                  className="mb-3 text-xs uppercase tracking-[0.4em] text-white/60"
                  style={{ fontFamily: "monospace" }}
                >
                  BMW M GmbH · Since 1992
                </p>

                <p className="text-xl font-light tracking-wide text-white md:text-2xl">
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
              {sideImages
                .filter((img) => img.position === "right")
                .map((img, idx) => (
                  <div
                    key={idx}
                    className="relative h-full overflow-hidden"
                    style={{ flex: img.span }}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      <div className="h-[200vh]" />
    </section>
  );
}