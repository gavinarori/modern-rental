"use client";

import { FadeImage } from "@/components/fade-image";

const features = [
  { image: "/images/S58 Engine.jpeg", span: "col-span-2 row-span-2", label: "S58 Engine", sub: "3.0L Twin-Turbo · 510 hp" },
  { image: "/images/cock-pit.webp", span: "col-span-1 row-span-1", label: "M Cockpit", sub: "Driver-focused" },
  { image: "/images/m seats.webp", span: "col-span-1 row-span-1", label: "M Seats", sub: "Carbon bucket" },
  { image: "/images/Rear Diffuser.jpg", span: "col-span-1 row-span-2", label: "Rear Diffuser", sub: "Active aerodynamics" },
  { image: "/images/m brakes.jpg", span: "col-span-1 row-span-1", label: "M Brakes", sub: "Carbon-ceramic" },
  { image: "/images/xDrive AWD.jpg", span: "col-span-2 row-span-1", label: "xDrive AWD", sub: "M-calibrated torque split" },
  { image: "/images/m exhaust.webp", span: "col-span-1 row-span-1", label: "M Exhaust", sub: "Active titanium" },
  { image: "/images/m3 wheels.webp", span: "col-span-1 row-span-2", label: "Wheels", sub: "21 forged" },
  { image: "/images/m3 suspension.jpg", span: "col-span-2 row-span-1", label: "M Suspension", sub: "Adaptive M chassis" },
  { image: "/images/m display.webp", span: "col-span-1 row-span-1", label: "M Display", sub: "12.3 curved" },
];

export function FeaturedProductsSection() {
  return (
    <section id="technology" className="relative bg-background py-20 md:py-32">
      <div className="px-4 md:px-12 lg:px-20">
        {/* Section header */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground mb-3" style={{ fontFamily: "monospace" }}>
              Engineering Excellence
            </p>
            <h2 className="text-4xl font-black tracking-tight text-foreground md:text-5xl">
              Every Detail.<br />Purposeful.
            </h2>
          </div>
          <p className="text-muted-foreground max-w-sm leading-relaxed">
            From the forged wheels to the carbon-ceramic brakes — no component exists without a reason.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 w-full max-w-7xl mx-auto auto-rows-[180px] md:auto-rows-[220px]">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group relative overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800 ${feature.span}`}
            >
              <FadeImage
                src={feature.image || "/placeholder.svg"}
                alt={feature.label}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* M stripe top on hover */}
              <div className="absolute top-0 left-0 right-0 h-0.5 flex opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {["#1C6BBA", "#6E0C0C", "#0A0A0A"].map((c, i) => (
                  <div key={i} style={{ flex: 1, background: c }} />
                ))}
              </div>
              {/* Label overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-4">
                <p className="text-white font-black text-sm tracking-tight leading-none">{feature.label}</p>
                <p className="text-white/70 text-xs mt-0.5">{feature.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}