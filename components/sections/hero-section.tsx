"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { VideoPlayer } from "../video-player";

const word = "";

const sideImages = [
  {
    src: "/images/hero/unified_r1_c1.jpg",
    alt: "Modern architecture with corten steel",
    position: "left",
    span: 1,
  },
  {
    src: "/images/hero/unified_r1_c2.jpg",
    alt: "Aerial view of modern home",
    position: "left",
    span: 1,
  },
  {
    src: "/images/hero/unified_r1_c3.jpg",
    alt: "Interior view with landscape",
    position: "right",
    span: 1,
  },
  {
    src: "/images/hero/unified_r1_c4.jpg",
    alt: "Modern architecture at night",
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

  // TEXT fades out first (0 to 0.2)
  const textOpacity = Math.max(0, 1 - scrollProgress / 0.2);

  // ANIMATION starts after (0.2 to 1.0)
  const animationProgress = Math.max(0, Math.min(1, (scrollProgress - 0.2) / 0.8));

  // Side columns animation
  const sideWidth = animationProgress * 35; // Grows from 0% to 35% each side
  const sideOpacity = animationProgress;

  const sideTranslateLeft = -100 + animationProgress * 100; // Slides in from left
  const sideTranslateRight = 100 - animationProgress * 100; // Slides in from right

  // Polish
  const borderRadius = 0;
  const gap = animationProgress * 4;

  return (
    <section ref={sectionRef} className="relative bg-background">
      {/* Sticky container */}
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="flex h-full w-full items-center justify-center">
          <div
            className="relative flex h-full w-full items-stretch justify-center"
            style={{ gap: `${gap}px`, overflow: "hidden" }}
          >
            {/* LEFT COLUMN - Side images */}
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
                  style={{
                    flex: img.span,
                    borderRadius: `${borderRadius}px`,
                  }}
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

            {/* CENTER - Video */}
            <div
              className="relative overflow-hidden will-change-transform  flex-1"
              style={{
                borderRadius: `${borderRadius}px`,
              }}
            >
              {/* VIDEO PLAYER */}
              <VideoPlayer
                src="https://video.gumlet.io/67690fd82fbe90b354d66613/69df56c2e034f96e26cd6deb/download.mp4"
                className="absolute inset-0 h-full w-full object-cover"
                style={{
                  opacity: 1 - animationProgress * 0.3,
                }}
                autoPlay
                loop
                muted
              />

              {/* Text overlay */}
              <div
                className="absolute inset-0 z-0 flex items-center justify-center"
                style={{ opacity: textOpacity, transform: "translateY(-200px)" }}
              >
                <h1 className="whitespace-nowrap text-[35vw] font-bold leading-[0.8] tracking-tighter text-black">
                  {word.split("").map((letter, index) => (
                    <span
                      key={index}
                      className="inline-block animate-[slideUp_0.8s_ease-out_forwards] opacity-0"
                      style={{
                        animationDelay: `${index * 0.08}s`,
                        transition: "all 1.5s",
                        transitionTimingFunction: "cubic-bezier(0.86, 0, 0.07, 1)",
                      }}
                    >
                      {letter}
                    </span>
                  ))}
                </h1>
              </div>
            </div>

            {/* RIGHT COLUMN - Side images */}
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
                  style={{
                    flex: img.span,
                    borderRadius: `${borderRadius}px`,
                  }}
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

      {/* Tagline */}
      <div
        className="pointer-events-none fixed bottom-0 left-0 right-0 z-10 px-6 pb-12 md:px-12 md:pb-16 lg:px-20 lg:pb-20"
        style={{ opacity: textOpacity }}
      >
        <p className="mx-auto max-w-2xl text-center text-2xl leading-relaxed text-white md:text-3xl lg:text-[2.5rem] lg:leading-snug">
          Lightweight, durable
          <br />
          and adventure-ready.
        </p>
      </div>

      {/* Scroll space */}
      <div className="h-[200vh]" />
    </section>
  );
}
