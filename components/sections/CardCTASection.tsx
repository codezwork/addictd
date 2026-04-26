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
          <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-center justify-center w-full relative h-[400px]">
            {/* Left Slot - Card 1 */}
            <div id="dock-slot-1" className="w-[300px] md:w-[340px] h-[360px] border border-dashed border-[var(--color-border-subtle)] rounded-2xl opacity-20 hidden md:block" />
            
            {/* Right Slot - Card 2 */}
            <div id="dock-slot-2" className="w-[300px] md:w-[340px] h-[360px] border border-dashed border-[var(--color-border-subtle)] rounded-2xl opacity-20 hidden md:block" />
          </div>
        </div>
      </SectionWrapper>
    );
  }
);

CardCTASection.displayName = "CardCTASection";
