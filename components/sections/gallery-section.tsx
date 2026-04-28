"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useCallback } from "react";

export function GallerySection() {
  const galleryRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const rafRef = useRef<number | null>(null);

  const images = [
    { src: "/images/gallery_1.jpg", alt: "BMW M3 at dawn — first light on Frozen Orange Metallic", caption: "Dawn Run" },
    { src: "/images/gallery_2.jpg", alt: "BMW M3 at full attack — track day at Nürburgring", caption: "Nürburgring" },
    { src: "/images/gallery_3.jpg", alt: "BMW M3 at dusk — M Blue exterior catching the last light", caption: "Golden Hour" },
    { src: "/images/gallery_4.jpg", alt: "BMW M3 at night — LED halos cutting the darkness", caption: "Night Mode" },
  ];

  const updateTransform = useCallback(() => {
    if (!galleryRef.current) return;
    const rect = galleryRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const sectionHeight = galleryRef.current.offsetHeight;
    const scrollableRange = sectionHeight - windowHeight;
    const scrolled = -rect.top;
    const progress = Math.max(0, Math.min(1, scrolled / scrollableRange));
    setScrollProgress(progress);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(updateTransform);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    updateTransform();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [updateTransform]);

  const isLastImage = images.length - 1;
  const fullscreenStartProgress = 0.6;
  const fullscreenProgress = Math.max(0, Math.min(1, (scrollProgress - fullscreenStartProgress) / (1 - fullscreenStartProgress)));
  const easedFullscreenProgress = 1 - Math.pow(1 - fullscreenProgress, 3);

  // Current image index based on progress
  const currentImageIndex = Math.min(
    Math.floor(scrollProgress * images.length),
    images.length - 1
  );

  return (
    <section
      id="gallery"
      ref={galleryRef}
      className="relative bg-black"
      style={{ minHeight: `${(images.length + 1) * 100}vh` }}
    >
      {/* Section label */}
      <div className="absolute top-0 left-0 z-20 p-8">
        <p className="text-white/30 text-xs uppercase tracking-[0.4em]" style={{ fontFamily: "monospace" }}>
          M3 Gallery
        </p>
      </div>

      {/* Progress indicator */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-2">
        {images.map((_, i) => (
          <div
            key={i}
            className="transition-all duration-300"
            style={{
              width: 2,
              height: i === currentImageIndex ? 24 : 8,
              background: i === currentImageIndex ? "white" : "rgba(255,255,255,0.3)",
              borderRadius: 2,
            }}
          />
        ))}
      </div>

      {/* Sticky container */}
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center px-4">
        <div className="relative w-full max-w-5xl h-[70vh] md:h-[80vh]">
          {images.map((image, index) => {
            const isLast = index === isLastImage;
            const imageProgress = scrollProgress * images.length - index;
            const stackProgress = Math.max(0, Math.min(1, imageProgress));
            let translateY = (1 - stackProgress) * 100;
            let scale = 0.8 + stackProgress * 0.2;
            let opacity = stackProgress;

            if (isLast) {
              const normalScale = 0.8 + stackProgress * 0.2;
              const expandedScale = 1 + easedFullscreenProgress * 0.8;
              scale = normalScale + Math.max(0, stackProgress - 0.8) * 5 * (expandedScale - normalScale);
            }

            const borderRadius = isLast && easedFullscreenProgress > 0.3 ? (1 - easedFullscreenProgress) * 16 : undefined;

            return (
              <div
                key={index}
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  zIndex: index,
                  transform: `translate3d(0, ${translateY}%, 0) scale(${scale}) translateZ(0)`,
                  WebkitTransform: `translate3d(0, ${translateY}%, 0) scale(${scale}) translateZ(0)`,
                  opacity,
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  willChange: "transform, opacity",
                }}
              >
                <div
                  className="relative w-full h-full overflow-hidden rounded-xl md:rounded-2xl"
                  style={{ borderRadius: borderRadius !== undefined ? `${borderRadius}px` : undefined }}
                >
                  <Image src={image.src || "/placeholder.svg"} alt={image.alt} fill className="object-cover" priority={index < 3} />
                  {/* Caption */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 bg-gradient-to-t from-black/60 to-transparent">
                    <p className="text-white/50 text-xs uppercase tracking-[0.4em] mb-1" style={{ fontFamily: "monospace" }}>
                      {String(index + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
                    </p>
                    <p className="text-white text-2xl md:text-3xl font-black tracking-tight">{image.caption}</p>
                  </div>
                  {/* M stripe at top */}
                  <div className="absolute top-0 left-0 right-0 h-0.5 flex">
                    {["#1C6BBA", "#6E0C0C", "#0A0A0A"].map((c, i) => (
                      <div key={i} style={{ flex: 1, background: c }} />
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}