"use client";

import { forwardRef } from "react";
import { SectionWrapper } from "@/components/layout/SectionWrapper";

export const CardCTASection = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <SectionWrapper id="cta-section" className={`min-h-screen flex items-center justify-center ${className || ""}`}>
        <div ref={ref} className="w-full flex flex-col items-center justify-center" {...props}>
          <div className="text-center mb-32 opacity-0" id="cta-copy">
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
              Choose your path. <br />
              <span className="font-serif italic bg-gradient-to-r from-[var(--color-purple)] to-[var(--color-pink)] text-transparent bg-clip-text">
                Start scaling.
              </span>
            </h2>
            <p className="text-[var(--color-text-2)] max-w-lg mx-auto text-lg">
              Whether you are looking to launch an AI campaign or manage your agency's portfolio, Addictd provides the infrastructure.
            </p>
          </div>
          
          {/* Docking slots for the floating cards to land into */}
          {/* Mobile: two vertically-stacked slots so each card gets its own row */}
          <div className="flex flex-col gap-6 items-center justify-center w-full relative md:hidden">
            <div id="dock-slot-mobile-1" className="w-[300px] h-[360px] border border-dashed border-[var(--color-border-subtle)] rounded-2xl opacity-20" />
            <div id="dock-slot-mobile-2" className="w-[300px] h-[360px] border border-dashed border-[var(--color-border-subtle)] rounded-2xl opacity-20" />
          </div>

          {/* Desktop: side-by-side slots */}
          <div className="hidden md:flex md:flex-row gap-16 items-center justify-center w-full relative h-[400px]">
            <div id="dock-slot-1" className="w-[340px] h-[360px] border border-dashed border-[var(--color-border-subtle)] rounded-2xl opacity-20" />
            <div id="dock-slot-2" className="w-[340px] h-[360px] border border-dashed border-[var(--color-border-subtle)] rounded-2xl opacity-20" />
          </div>
        </div>
      </SectionWrapper>
    );
  }
);

CardCTASection.displayName = "CardCTASection";