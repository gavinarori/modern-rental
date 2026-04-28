"use client";

import { FadeImage } from "@/components/fade-image";

const models = [
  {
    id: 1,
    name: "M3 Competition",
    description: "503 hp · RWD · 8-speed M Steptronic · 0–100 in 3.9s",
    price: "From $75,900",
    badge: "PURE",
    image: "/images/models_1.avif",
  },
  {
    id: 2,
    name: "M3 Competition xDrive",
    description: "510 hp · AWD · M xDrive · 0–100 in 3.5s",
    price: "From $82,400",
    badge: "BESTSELLER",
    image: "/images/model_2.webp",
  },
  {
    id: 3,
    name: "M3 CS",
    description: "543 hp · Carbon roof · Track-tuned · Limited production",
    price: "From $119,900",
    badge: "ULTIMATE",
    image: "/images/model_3.avif",
  },
];

export function CollectionSection() {
  return (
    <section id="accessories" className="bg-background">
      {/* Section Title */}
      <div className="px-6 py-20 md:px-12 lg:px-20 md:py-16 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground mb-3" style={{ fontFamily: "monospace" }}>
            Choose Your M
          </p>
          <h2 className="text-4xl font-black tracking-tight text-foreground md:text-5xl">
            M3 Lineup
          </h2>
        </div>
        <p className="text-muted-foreground text-sm max-w-xs md:text-right leading-relaxed">
          Three levels of obsession. One legendary nameplate.
        </p>
      </div>

      {/* Models Grid */}
      <div className="pb-24">
        {/* Mobile: Horizontal Carousel */}
        <div className="flex gap-6 overflow-x-auto px-6 pb-4 md:hidden snap-x snap-mandatory scrollbar-hide">
          {models.map((model) => (
            <div key={model.id} className="group flex-shrink-0 w-[75vw] snap-center">
              <div className="relative aspect-[2/3] overflow-hidden rounded-2xl bg-secondary">
                <FadeImage src={model.image || "/placeholder.svg"} alt={model.name} fill className="object-cover group-hover:scale-105" />
                {/* Badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-black text-white text-[10px] font-black tracking-[0.2em] px-3 py-1 rounded-full">
                    {model.badge}
                  </span>
                </div>
              </div>
              <div className="py-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-black leading-snug text-foreground tracking-tight">{model.name}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{model.description}</p>
                  </div>
                  <span className="text-lg font-bold text-foreground">{model.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop: Grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-8 md:px-12 lg:px-20">
          {models.map((model) => (
            <div key={model.id} className="group cursor-pointer">
              <div className="relative aspect-[2/3] overflow-hidden rounded-2xl bg-secondary">
                <FadeImage src={model.image || "/placeholder.svg"} alt={model.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                {/* Badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-black text-white text-[10px] font-black tracking-[0.2em] px-3 py-1.5 rounded-full">
                    {model.badge}
                  </span>
                </div>
                {/* Hover CTA */}
                <div className="absolute bottom-6 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <button className="bg-white text-black text-xs font-black tracking-[0.2em] px-6 py-3 rounded-full hover:bg-[#1C6BBA] hover:text-white transition-colors">
                    CONFIGURE
                  </button>
                </div>
                {/* M stripes */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 flex opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {["#1C6BBA", "#6E0C0C", "#0A0A0A"].map((c, i) => (
                    <div key={i} style={{ flex: 1, background: c }} />
                  ))}
                </div>
              </div>

              <div className="py-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-black leading-snug text-foreground tracking-tight">{model.name}</h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{model.description}</p>
                  </div>
                  <span className="font-black text-foreground text-xl text-right whitespace-nowrap">{model.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}