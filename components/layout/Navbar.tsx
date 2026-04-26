"use client";

import { MagneticButton } from "@/components/ui/MagneticButton";
import { cn } from "@/lib/utils";

export function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-[900] flex justify-between items-center py-6 px-6 md:px-12 bg-gradient-to-b from-[#08080E]/90 to-transparent pointer-events-none">
      <div className="flex items-center gap-3 font-bold text-lg tracking-tight pointer-events-auto">
        <img src="/logo-addictd.png" alt="Addictd.ai" className="h-8 w-auto object-contain" />addictd.ai
      </div>

      <ul className="hidden md:flex items-center gap-8 pointer-events-auto">
        {["Platform", "Campaigns", "Agencies", "Pricing"].map((item) => (
          <li key={item}>
            <a href={`#${item.toLowerCase()}`} className="text-sm font-medium text-[var(--color-text-2)] hover:text-[var(--color-text-1)] transition-colors relative group">
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-[var(--color-purple)] to-[var(--color-pink)] transition-all duration-300 group-hover:w-full" />
            </a>
          </li>
        ))}
      </ul>

      <div className="pointer-events-auto">
        <MagneticButton>
          <button className="text-[13px] font-semibold px-5 py-2.5 bg-[var(--color-surface)] border border-[var(--color-border-accent)] rounded-full text-[var(--color-text-1)] transition-colors hover:border-[var(--color-purple)]">
            Get Early Access
          </button>
        </MagneticButton>
      </div>
    </nav>
  );
}
