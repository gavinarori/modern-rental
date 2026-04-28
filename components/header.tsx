"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

function BMWLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="BMW Logo"
    >
      <circle cx="50" cy="50" r="48" fill="black" stroke="white" strokeWidth="2" />
      <circle cx="50" cy="50" r="38" fill="none" stroke="white" strokeWidth="2" />
      {/* BMW quadrants */}
      <path d="M50 12 A38 38 0 0 0 12 50 L50 50 Z" fill="#1C6BBA" />
      <path d="M50 50 L12 50 A38 38 0 0 0 50 88 Z" fill="white" />
      <path d="M50 12 A38 38 0 0 1 88 50 L50 50 Z" fill="white" />
      <path d="M50 50 L88 50 A38 38 0 0 1 50 88 Z" fill="#1C6BBA" />
      {/* BMW text */}
      <text
        x="50"
        y="57"
        textAnchor="middle"
        fill="white"
        fontSize="12"
        fontWeight="bold"
        fontFamily="Arial, sans-serif"
        letterSpacing="1"
      >
        BMW
      </text>
    </svg>
  );
}

function MStripes() {
  return (
    <div className="flex gap-[2px] items-center">
      {(["#1C6BBA", "#6E0C0C", "#0A0A0A"] as const).map((c, i) => (
        <div key={i} style={{ width: 4, height: 18, background: c, borderRadius: 1 }} />
      ))}
    </div>
  );
}

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(true);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-3xl transition-all duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-md rounded-full" : "bg-transparent"
      }`}
      style={{
        boxShadow: isScrolled
          ? "rgba(14,63,126,0.06) 0px 0px 0px 1px, rgba(42,51,69,0.06) 0px 1px 1px -0.5px, rgba(42,51,70,0.06) 0px 6px 6px -3px, rgba(14,63,126,0.06) 0px 24px 24px -12px"
          : "none",
      }}
    >
      <div className="flex items-center justify-between transition-all duration-300 px-2 pl-4 py-2">
        {/* Logo — BMW roundel + M3 wordmark */}
        <Link href="#hero" className="flex items-center gap-3 group">
          <BMWLogo className="w-9 h-9 flex-shrink-0 transition-transform duration-300 group-hover:scale-105" />
          <div className="flex items-center gap-2">
            <MStripes />
            <span className="text-base font-black tracking-tight text-foreground leading-none">
              M3
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {[
            { label: "Performance", href: "#technology" },
            { label: "Gallery", href: "#gallery" },
            { label: "Models", href: "#accessories" },
            { label: "Heritage", href: "#about" },
          ].map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm transition-colors text-muted-foreground hover:text-foreground font-medium tracking-wide relative group"
            >
              {link.label}
              {/* M-blue underline on hover */}
              <span className="absolute -bottom-0.5 left-0 right-0 h-px bg-[#1C6BBA] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="#reserve"
            className="px-5 py-2 text-xs font-black uppercase tracking-[0.15em] transition-all rounded-full bg-foreground text-background hover:bg-[#1C6BBA] hover:text-white"
          >
            Configure
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="transition-colors md:hidden text-foreground p-1"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-t border-border bg-background/95 backdrop-blur-md px-6 py-8 md:hidden rounded-b-3xl">
          {/* M stripes divider */}
          <div className="flex h-0.5 w-full mb-8">
            {["#1C6BBA", "#6E0C0C", "#0A0A0A"].map((c, i) => (
              <div key={i} style={{ flex: 1, background: c }} />
            ))}
          </div>
          <nav className="flex flex-col gap-6">
            {[
              { label: "Performance", href: "#technology" },
              { label: "Gallery", href: "#gallery" },
              { label: "Models", href: "#accessories" },
              { label: "Heritage", href: "#about" },
            ].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-xl font-black text-foreground tracking-tight hover:text-[#1C6BBA] transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="#reserve"
              className="mt-4 bg-foreground text-background px-5 py-3.5 text-center text-xs font-black uppercase tracking-[0.2em] rounded-full hover:bg-[#1C6BBA] hover:text-white transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Configure Your M3
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}