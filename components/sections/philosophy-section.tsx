"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useCallback } from "react";

const titles = [
  "Pure Performance.",
  "Engineered to Dominate.",
  "The M3 Legacy.",
];

export function PhilosophySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const [titleOpacity, setTitleOpacity] = useState(0);
  const [descriptionProgress, setDescriptionProgress] = useState(0);
  const rafRef = useRef<number | null>(null);

  const updateTransforms = useCallback(() => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const sectionHeight = sectionRef.current.offsetHeight;
    const scrollableRange = sectionHeight - windowHeight;
    const scrolled = -rect.top;
    const progress = Math.max(0, Math.min(1, scrolled / scrollableRange));
    setTitleOpacity(progress);

    if (descriptionRef.current) {
      const descRect = descriptionRef.current.getBoundingClientRect();
      const descTop = descRect.top;
      const descHeight = descRect.height;
      const startTrigger = windowHeight * 0.8;
      const endTrigger = windowHeight * 0.2;
      if (descTop < startTrigger && descTop > endTrigger - descHeight) {
        const descProgress = Math.max(0, Math.min(1, (startTrigger - descTop) / (startTrigger - endTrigger)));
        setDescriptionProgress(descProgress);
      }
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(updateTransforms);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    updateTransforms();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [updateTransforms]);

  return (
    <section id="products" className="relative overflow-hidden">
      {/* BACKGROUND — BMW M3 at speed */}
      <div
        className="absolute inset-0 z-0 will-change-transform"
        style={{ transform: `scale(${0.82 + titleOpacity * 0.12})` }}
      >
        <Image
          src="/images/m4 model.webp"
          alt="BMW M3 Competition in motion"
          fill
          className="object-cover object-center"
          priority
        />
        {/* M Sport blue tint overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70" />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,30,0.6) 100%)" }} />
      </div>

      {/* CONTENT */}
      <div className="relative z-10">
        <div ref={sectionRef} className="relative" style={{ height: "200vh" }}>
          <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
            <div className="relative w-full max-w-7xl px-4">
              {/* M Badge accent */}
              <div
                className="flex justify-center mb-8"
                style={{ opacity: titleOpacity }}
              >
                <div className="flex gap-1">
                  {["#1C6BBA", "#6E0C0C", "#0A0A0A"].map((c, i) => (
                    <div key={i} style={{ width: 8, height: 32, background: c, borderRadius: 2 }} />
                  ))}
                </div>
              </div>

              {/* Title cycles */}
              <div
                className="flex items-center justify-center pointer-events-none"
                style={{ perspective: "1000px" }}
              >
                <div className="relative w-full" style={{ transformStyle: "preserve-3d", minHeight: "150px" }}>
                  {titles.map((title, index) => {
                    const isLastText = index === titles.length - 1;
                    const segmentSize = 1 / titles.length;
                    const startProgress = index * segmentSize;
                    const endProgress = (index + 1) * segmentSize;
                    let rotateX = 0;
                    let opacity = 0;

                    if (titleOpacity >= startProgress && titleOpacity < endProgress) {
                      const localProgress = (titleOpacity - startProgress) / segmentSize;
                      rotateX = (1 - localProgress) * 90;
                      opacity = localProgress;
                    } else if (titleOpacity >= endProgress) {
                      if (isLastText) { rotateX = 0; opacity = 1; }
                      else { rotateX = -90; opacity = 0; }
                    } else {
                      rotateX = 90; opacity = 0;
                    }

                    return (
                      <h2
                        key={index}
                        className="absolute inset-0 flex items-center justify-center font-black leading-tight tracking-tighter text-white text-center px-4"
                        style={{
                          fontSize: "clamp(2.5rem, 7vw, 6rem)",
                          transform: `rotateX(${rotateX}deg)`,
                          opacity,
                          transformStyle: "preserve-3d",
                          backfaceVisibility: "hidden",
                          WebkitBackfaceVisibility: "hidden",
                          willChange: "transform, opacity",
                          textShadow: "0 4px 40px rgba(0,119,255,0.3)",
                        }}
                      >
                        {title}
                      </h2>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div
          ref={descriptionRef}
          className="px-6 pt-8 pb-20 md:px-12 md:pt-12 md:pb-28 lg:px-20 lg:pt-16 lg:pb-36"
        >
          <div className="text-center">
            <p className="mt-8 leading-relaxed text-white/80 text-3xl text-center max-w-5xl mx-auto">
              {(
                "Thirty years of motorsport DNA, distilled into one machine. The BMW M3 isn't built for the ordinary — it's engineered for those who demand absolute mastery of the road. With 510 hp, an S58 twin-turbo straight-six, and a soul forged on the Nürburgring, it redefines what a performance sedan can be."
              )
                .split(" ")
                .map((word, index, array) => {
                  const wordProgress = Math.max(0, Math.min(1, descriptionProgress * array.length - index));
                  return (
                    <span
                      key={index}
                      style={{
                        opacity: wordProgress,
                        filter: `blur(${(1 - wordProgress) * 40}px)`,
                        transition: "opacity 0.3s ease, filter 0.3s ease",
                      }}
                    >
                      {word}{index < array.length - 1 ? " " : ""}
                    </span>
                  );
                })}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}