import { MagneticButton } from "@/components/ui/MagneticButton";

export function Footer() {
  return (
    <footer className="w-full border-t border-[var(--color-border-subtle)] py-12 px-6 md:px-12 mt-24">
      <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2 font-bold text-lg tracking-tight">
          <div className="w-8 h-8 bg-[var(--color-surface)] rounded-lg flex items-center justify-center">
            <div className="w-5 h-3 bg-gradient-to-r from-[var(--color-purple)] to-[var(--color-pink)] rounded-sm opacity-50" />
          </div>
          addictd.ai
        </div>
        
        <div className="flex gap-6">
          {["Privacy", "Terms", "Contact"].map((item) => (
            <a key={item} href="#" className="text-sm text-[var(--color-text-2)] hover:text-white transition-colors">
              {item}
            </a>
          ))}
        </div>

        <MagneticButton>
          <button className="text-sm font-mono text-[var(--color-text-3)] hover:text-[var(--color-text-1)] transition-colors">
            © 2026 addictd.ai. All rights reserved.
          </button>
        </MagneticButton>
      </div>
    </footer>
  );
}
