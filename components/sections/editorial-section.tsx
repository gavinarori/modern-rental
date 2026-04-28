"use client";

import { useRef, useState, useEffect, useCallback } from "react";

const specs = [
  { label: "Engine", value: "S58" },
  { label: "Horsepower", value: "510 hp" },
  { label: "0–100 km/h", value: "3.5s" },
  { label: "Top Speed", value: "290 km/h" },
];

export function EditorialSection() {
  const videoRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const rafRef = useRef<number | null>(null);

  const updateParallax = useCallback(() => {
    if (!videoRef.current) return;
    const rect = videoRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    if (rect.bottom > 0 && rect.top < windowHeight) {
      const progress = 1 - (rect.top + rect.height / 2) / (windowHeight + rect.height);
      setScrollProgress(Math.max(0, Math.min(1, progress)));
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(updateParallax);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    updateParallax();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [updateParallax]);

  const parallaxY = (scrollProgress - 0.5) * 30;

  return (
    <section className="bg-background">
      {/* M Stripe divider */}
      <div className="flex h-1 w-full">
        {["#1C6BBA", "#6E0C0C", "#0A0A0A"].map((c, i) => (
          <div key={i} style={{ flex: 1, background: c }} />
        ))}
      </div>

      {/* Full-width Video with Parallax */}
      <div ref={videoRef} className="relative aspect-[16/9] w-full md:aspect-[21/9] overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
          style={{
            transform: `scale(1.15) translate3d(0, ${parallaxY}px, 0) translateZ(0)`,
            WebkitTransform: `scale(1.15) translate3d(0, ${parallaxY}px, 0) translateZ(0)`,
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            willChange: "transform",
          }}
          src="https://video.gumlet.io/67690fd82fbe90b354d66613/69e20cc9d04993c17eb28824/download.mp4"
        />
        {/* Overlay with M3 text */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50 flex items-center justify-between px-12 md:px-20">
          <div>
            <p className="text-white/60 text-xs uppercase tracking-[0.4em] mb-2" style={{ fontFamily: "monospace" }}>
              BMW M GmbH
            </p>
            <p className="text-white text-4xl md:text-6xl font-black tracking-tight">M3</p>
            <p className="text-white/80 text-sm md:text-base mt-1 font-light">Competition xDrive</p>
          </div>
          <div className="text-right hidden md:block">
            <p className="text-white/60 text-xs uppercase tracking-[0.3em] mb-2" style={{ fontFamily: "monospace" }}>
              Nürburgring Lap Time
            </p>
            <p className="text-white text-3xl font-black">7:49.8</p>
          </div>
        </div>
      </div>

      {/* Specs Grid */}
      <div className="grid grid-cols-2 border-t border-border md:grid-cols-4">
        {specs.map((spec, i) => (
          <div
            key={spec.label}
            className="border-b border-r border-border p-8 text-center last:border-r-0 md:border-b-0 group hover:bg-foreground transition-colors duration-300"
          >
            <p className="mb-2 text-xs uppercase tracking-widest text-muted-foreground group-hover:text-white/60 transition-colors">
              {spec.label}
            </p>
            <p className="font-black text-foreground text-4xl md:text-5xl group-hover:text-white transition-colors tracking-tighter">
              {spec.value}
            </p>
          </div>
        ))}
      </div>

      {/* M stripe bottom */}
      <div className="flex h-1 w-full">
        {["#0A0A0A", "#6E0C0C", "#1C6BBA"].map((c, i) => (
          <div key={i} style={{ flex: 1, background: c }} />
        ))}
      </div>
    </section>
  );
}