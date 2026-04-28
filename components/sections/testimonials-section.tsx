"use client";

import Image from "next/image";

export function TestimonialsSection() {
  return (
    <section id="about" className="bg-background">
      {/* Full-width hero image with quote overlay */}
      <div className="relative aspect-[16/9] w-full">
        <Image
          src="/images/testimonial-1.jpg"
          alt="BMW M3 Competition xDrive — the definitive performance sedan"
          fill
          className="object-cover"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        {/* M stripe at very top */}
        <div className="absolute top-0 left-0 right-0 h-1 flex z-10">
          {["#1C6BBA", "#6E0C0C", "#0A0A0A"].map((c, i) => (
            <div key={i} style={{ flex: 1, background: c }} />
          ))}
        </div>

        {/* Label top left */}
        <div className="absolute top-8 left-8 md:top-12 md:left-16 z-10">
          <p className="text-white/40 text-xs uppercase tracking-[0.4em]" style={{ fontFamily: "monospace" }}>
            The M3 Philosophy
          </p>
        </div>

        {/* Main quote */}
        <div className="absolute inset-0 flex items-end justify-center px-6 pb-16 md:px-12 md:pb-24 lg:px-20 lg:pb-32 z-10">
          <div className="max-w-5xl text-center">
            {/* Quote mark */}
            <div className="flex justify-center mb-6">
              <div className="flex gap-1">
                {["#1C6BBA", "#6E0C0C", "#0A0A0A"].map((c, i) => (
                  <div key={i} style={{ width: 6, height: 28, background: c, borderRadius: 2 }} />
                ))}
              </div>
            </div>
            <p className="text-2xl leading-relaxed text-white md:text-3xl lg:text-[2.5rem] lg:leading-snug font-light">
              A performance sedan that refuses to compromise — 
              built for drivers who demand the absolute limits of what four doors and two turbos can achieve.
            </p>
            <p className="mt-8 text-white/50 text-xs uppercase tracking-[0.3em]" style={{ fontFamily: "monospace" }}>
              BMW M3 Competition xDrive · G80 Generation · 2021–Present
            </p>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 border-t border-border">
        {[
          { label: "Lap Record", value: "7:49.8", sub: "Nürburgring Nordschleife" },
          { label: "Production", value: "30+ yrs", sub: "M3 heritage since 1986" },
          { label: "Power Output", value: "510 hp", sub: "S58 twin-turbo six" },
          { label: "Variants", value: "6", sub: "Sedan, Touring, CS & more" },
        ].map((stat) => (
          <div key={stat.label} className="p-8 border-r border-b md:border-b-0 last:border-r-0 border-border group hover:bg-foreground transition-colors duration-300">
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2 group-hover:text-white/50 transition-colors">
              {stat.label}
            </p>
            <p className="text-4xl font-black tracking-tight text-foreground group-hover:text-white transition-colors">
              {stat.value}
            </p>
            <p className="text-xs text-muted-foreground mt-1 group-hover:text-white/40 transition-colors">
              {stat.sub}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}