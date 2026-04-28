"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

function ScrollRevealText({ text }: { text: string }) {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const startOffset = windowHeight * 0.9;
      const endOffset = windowHeight * 0.1;
      const totalDistance = startOffset - endOffset;
      const currentPosition = startOffset - rect.top;
      setProgress(Math.max(0, Math.min(1, currentPosition / totalDistance)));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const words = text.split(" ");
  return (
    <p ref={containerRef} className="text-3xl font-semibold leading-snug text-white md:text-4xl lg:text-5xl">
      {words.map((word, index) => {
        const appearProgress = progress * (words.length + 1);
        const wordAppearProgress = Math.max(0, Math.min(1, appearProgress - index));
        return (
          <span
            key={index}
            className="inline-block"
            style={{
              opacity: wordAppearProgress,
              filter: `blur(${(1 - wordAppearProgress) * 40}px)`,
              transition: "opacity 0.1s linear, filter 0.1s linear",
              marginRight: "0.3em",
            }}
          >
            {word}
          </span>
        );
      })}
    </p>
  );
}

const sideImages = [
  { src: "/images/right side headlight.jpg", alt: "BMW M3 M Sport headlight", position: "left" },
  { src: "/images/side_3.jpg", alt: "BMW M3 carbon fibre detail", position: "right" },
];

const textCycles = [
  "S58 Twin-Turbo Inline-Six.",
  "0–100 km/h in 3.5s.",
  "Track. Street. Obsession.",
];

export function TechnologySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textSectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  
  const descriptionText = "The S58 engine produces 510 hp and 650 Nm of torque, channelled through an 8-speed M Steptronic transmission with Drivelogic. Active M Differential, M xDrive all-wheel drive, and carbon-ceramic brakes bring the full force of BMW Motorsport to every corner. This is precision engineering without compromise.";

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const scrollableHeight = window.innerHeight * 4;
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / scrollableHeight));
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const titleOpacity = Math.max(0, 1 - scrollProgress / 0.2);
  const imageProgress = Math.max(0, Math.min(1, (scrollProgress - 0.2) / 0.8));
  const centerWidth = 100 - imageProgress * 58;
  const sideWidth = imageProgress * 22;
  const sideOpacity = imageProgress;
  const sideTranslateLeft = -100 + imageProgress * 100;
  const sideTranslateRight = 100 - imageProgress * 100;
  const gap = imageProgress * 16;

  return (
    <section ref={sectionRef} className="relative bg-foreground">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="flex h-full w-full items-center justify-center">
          <div
            className="relative flex h-full w-full items-stretch justify-center"
            style={{ gap: `${gap}px`, padding: `${imageProgress * 16}px` }}
          >
            {/* Left Column */}
            <div
              className="relative overflow-hidden will-change-transform"
              style={{ width: `${sideWidth}%`, height: "100%", transform: `translateX(${sideTranslateLeft}%)`, opacity: sideOpacity }}
            >
              {sideImages.filter(img => img.position === "left").map((img, idx) => (
                <Image key={idx} src={img.src || "/placeholder.svg"} alt={img.alt} fill className="object-cover" />
              ))}
            </div>

            {/* Main Center */}
            <div
              className="relative overflow-hidden will-change-transform"
              style={{ width: `${centerWidth}%`, height: "100%", flex: "0 0 auto" }}
            >
              <Image src="/images/side_2.jpg" alt="BMW M3 Competition" fill className="object-cover" />
              <Image src="/images/side_1.jpg" alt="BMW M3 track" fill className="absolute inset-0 object-cover" style={{ opacity: Math.max(0, Math.min(1, (scrollProgress - 0.1) / 0.2)) }} />
              <Image src="/images/side_4.avif" alt="BMW M3 night" fill className="absolute inset-0 object-cover" style={{ opacity: Math.max(0, Math.min(1, (scrollProgress - 0.4) / 0.2)) }} />
              <Image src="/images/side 5.jpg" alt="BMW M3 speed blur" fill className="absolute inset-0 object-cover" style={{ opacity: Math.max(0, Math.min(1, (scrollProgress - 0.7) / 0.2)) }} />
              <div className="absolute inset-0 bg-foreground/40" />

              {/* M stripes accent top */}
              <div className="absolute top-0 left-0 right-0 h-1 flex">
                {["#1C6BBA", "#6E0C0C", "#0A0A0A"].map((c, i) => (
                  <div key={i} style={{ flex: 1, background: c }} />
                ))}
              </div>

              {/* Text cycles */}
              <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
                {textCycles.map((text, cycleIndex) => {
                  const cycleStart = cycleIndex / textCycles.length;
                  const cycleEnd = (cycleIndex + 1) / textCycles.length;
                  const words = text.split(" ");
                  return (
                    <h2 key={cycleIndex} className="absolute max-w-3xl font-black leading-tight tracking-tight text-white md:text-5xl lg:text-7xl text-5xl">
                      {words.map((word, wordIndex) => {
                        let wordOpacity = 0;
                        let wordBlur = 40;
                        if (scrollProgress >= cycleStart && scrollProgress < cycleEnd) {
                          const localProgress = (scrollProgress - cycleStart) / (cycleEnd - cycleStart);
                          if (localProgress < 0.5) {
                            const p = (localProgress / 0.5) * (words.length + 1);
                            const wp = Math.max(0, Math.min(1, p - wordIndex));
                            wordOpacity = wp; wordBlur = (1 - wp) * 40;
                          } else {
                            const p = ((localProgress - 0.5) / 0.5) * (words.length + 1);
                            const wp = Math.max(0, Math.min(1, p - wordIndex));
                            wordOpacity = 1 - wp; wordBlur = wp * 40;
                          }
                        }
                        return (
                          <span key={wordIndex} className="inline-block" style={{ opacity: wordOpacity, filter: `blur(${wordBlur}px)`, transition: "opacity 0.1s linear, filter 0.1s linear", marginRight: "0.3em" }}>
                            {word}
                          </span>
                        );
                      })}
                    </h2>
                  );
                })}
              </div>
            </div>

            {/* Right Column */}
            <div
              className="relative overflow-hidden will-change-transform"
              style={{ width: `${sideWidth}%`, height: "100%", transform: `translateX(${sideTranslateRight}%)`, opacity: sideOpacity }}
            >
              {sideImages.filter(img => img.position === "right").map((img, idx) => (
                <Image key={idx} src={img.src || "/placeholder.svg"} alt={img.alt} fill className="object-cover" />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="h-[400vh]" />

      {/* Description Section */}
      <div ref={textSectionRef} className="relative overflow-hidden px-6 py-24 md:px-12 md:py-32 lg:px-20 lg:py-40 bg-black">
        <div className="absolute top-0 left-0 right-0 z-0 pointer-events-none" style={{ height: "150px", background: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)" }} />
        {/* M stripes */}
        <div className="absolute top-0 left-0 right-0 h-1 flex">
          {["#1C6BBA", "#6E0C0C", "#0A0A0A"].map((c, i) => (
            <div key={i} style={{ flex: 1, background: c }} />
          ))}
        </div>
        <div className="relative z-10 mx-auto max-w-4xl">
          <p className="text-xs uppercase tracking-[0.4em] text-white/40 mb-8" style={{ fontFamily: "monospace" }}>
            M Performance Technology
          </p>
          <ScrollRevealText text={descriptionText} />
        </div>
      </div>
    </section>
  );
}