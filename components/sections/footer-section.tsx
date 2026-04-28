"use client";

import Link from "next/link";

const footerLinks = {
  explore: [
    { label: "M3 Lineup", href: "#accessories" },
    { label: "Performance Tech", href: "#technology" },
    { label: "Gallery", href: "#gallery" },
    { label: "Configure Yours", href: "#" },
  ],
  motorsport: [
    { label: "M Heritage", href: "#" },
    { label: "DTM Legacy", href: "#" },
    { label: "Nürburgring", href: "#" },
    { label: "M Drivers Club", href: "#" },
  ],
  ownership: [
    { label: "Test Drive", href: "#" },
    { label: "Financing", href: "#" },
    { label: "M Care", href: "#" },
    { label: "Warranty", href: "#" },
  ],
};

export function FooterSection() {
  return (
    <footer className="bg-background">
      {/* M stripe top */}
      <div className="flex h-1 w-full">
        {["#1C6BBA", "#6E0C0C", "#0A0A0A"].map((c, i) => (
          <div key={i} style={{ flex: 1, background: c }} />
        ))}
      </div>

      {/* Main Footer Content */}
      <div className="border-b border-border px-6 py-16 md:px-12 md:py-20 lg:px-20">
        <div className="grid grid-cols-2 gap-12 md:grid-cols-4 lg:grid-cols-5">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1 lg:col-span-2">
            <Link href="#hero" className="flex items-center gap-3 group">
              {/* M badge color stripes */}
              <div className="flex gap-0.5">
                {["#1C6BBA", "#6E0C0C", "#0A0A0A"].map((c, i) => (
                  <div key={i} style={{ width: 5, height: 28, background: c, borderRadius: 1 }} />
                ))}
              </div>
              <span className="text-2xl font-black text-foreground tracking-tight">BMW M3</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              The purest expression of BMW Motorsport engineering. Precision, power, and passion — engineered for those who settle for nothing less.
            </p>
            {/* CTA */}
            <Link
              href="#"
              className="inline-flex items-center gap-2 mt-6 text-xs font-black uppercase tracking-[0.2em] text-foreground border border-foreground px-5 py-3 rounded-full hover:bg-foreground hover:text-background transition-colors duration-300"
            >
              Build Your M3
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M1 6h10M7 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>

          {/* Explore */}
          <div>
            <h4 className="mb-4 text-xs font-black uppercase tracking-[0.2em] text-foreground">Explore</h4>
            <ul className="space-y-3">
              {footerLinks.explore.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Motorsport */}
          <div>
            <h4 className="mb-4 text-xs font-black uppercase tracking-[0.2em] text-foreground">Motorsport</h4>
            <ul className="space-y-3">
              {footerLinks.motorsport.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Ownership */}
          <div>
            <h4 className="mb-4 text-xs font-black uppercase tracking-[0.2em] text-foreground">Ownership</h4>
            <ul className="space-y-3">
              {footerLinks.ownership.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="px-6 py-6 md:px-12 lg:px-20">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-xs text-muted-foreground">
            © 2026 BMW M GmbH. All rights reserved. BMW M3 is a trademark of BMW AG.
          </p>
          <p className="text-xs text-muted-foreground hidden md:block">
            Sheer Driving Pleasure.
          </p>
          {/* Social Links */}
          <div className="flex items-center gap-4">
            {["Instagram", "YouTube", "X (Twitter)"].map((s) => (
              <Link key={s} href="#" className="text-xs text-muted-foreground transition-colors hover:text-foreground">
                {s}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}