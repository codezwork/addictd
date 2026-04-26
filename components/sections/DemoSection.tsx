"use client";

import { useState } from "react";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { cn } from "@/lib/utils";

const chartData = [
  { second: 0, score: 8, retention: 1.00 },
  { second: 1, score: 8, retention: 1.00 },
  { second: 2, score: 8, retention: 0.94 },
  { second: 3, score: 7, retention: 0.87 },
  { second: 4, score: 3, retention: 0.74 },
  { second: 5, score: 4, retention: 0.69 },
  { second: 6, score: 5, retention: 0.65 },
  { second: 7, score: 6, retention: 0.62 },
  { second: 8, score: 7, retention: 0.60 },
  { second: 9, score: 6, retention: 0.57 },
  { second: 10, score: 5, retention: 0.54 },
  { second: 11, score: 5, retention: 0.51 },
  { second: 12, score: 3, retention: 0.46 },
  { second: 13, score: 3, retention: 0.42 },
  { second: 14, score: 5, retention: 0.39 },
  { second: 15, score: 6, retention: 0.37 },
  { second: 16, score: 7, retention: 0.35 },
  { second: 17, score: 6, retention: 0.33 },
  { second: 18, score: 7, retention: 0.31 },
  { second: 19, score: 8, retention: 0.29 },
  { second: 20, score: 7, retention: 0.27 },
  { second: 21, score: 5, retention: 0.25 },
  { second: 22, score: 4, retention: 0.22 },
  { second: 23, score: 3, retention: 0.19 },
  { second: 24, score: 3, retention: 0.16 },
  { second: 25, score: 3, retention: 0.14 },
];

const viewBoxHeight = 140;
const pad = 16;
const getRetY = (val: number) => pad + (1 - val) * (viewBoxHeight - 2 * pad);

const demoStates = [
  { range: [3], score: 'Hook · 94%', color: 'var(--color-green)', headline: 'Why Nobody\nWatches Your Shorts', cards: [{ type: 'good', second: 's1–3 · Hook Zone', text: 'Strong open. Red text + face at 0.5s.', fix: 'Scroll-stop confirmed. Open loop active.' }] },
  { range: [4, 6], score: 'Holding · 87%', color: 'var(--color-green)', headline: 'You\'re doing this\nwrong.', cards: [{ type: 'good', second: 's4–6 · Holding', text: 'Payoff promise lands. Stakes clear.', fix: 'Energy sustained. Good pacing.' }, { type: 'warning', second: 's4 · Micro-cliff', text: '2s static gap detected after hook.', fix: 'Fix: Cut + whoosh + arrow overlay at s4.' }] },
  { range: [7, 10], score: 'Declining · 71%', color: 'var(--color-amber)', headline: 'Most creators\nmiss this.', cards: [{ type: 'warning', second: 's7–10 · Declining', text: 'Pacing slows. No new visual stimulus.', fix: 'Fix: Add B-roll cut at s8. Text overlay at s9.' }] },
  { range: [11, 14], score: 'Dead Zone · 38%', color: 'var(--color-red)', headline: 'Dead zone.\nThey\'re gone.', cards: [{ type: 'danger', second: 's11–13 · CLIFF', text: '3s with no cut, SFX, or overlay. Worst segment.', fix: 'Fix: Red circle + click SFX at s12, cut at s13.' }, { type: 'warning', second: 's14 · Recovery gap', text: 'Slow re-entry after dead zone.', fix: 'Fix: Jump cut + zoom in at s14.' }] },
  { range: [15, 20], score: 'Recovering · 62%', color: 'var(--color-amber)', headline: 'The ones who\nstayed want more.', cards: [{ type: 'good', second: 's15–19 · Recovery', text: 'Payoff lands at s19. Committed viewers engaged.', fix: 'Strong arc. Keep this structure.' }] },
  { range: [21, 25], score: 'Trim Needed · 74%', color: 'var(--color-pink)', headline: 'Dead content.\nTrim it.', cards: [{ type: 'danger', second: 's21–25 · Dead End', text: '4s past the payoff. CTA at s21 is fine.', fix: 'Fix: Trim ending to s21. Everything after kills AVD.' }] },
];

export function DemoSection() {
  const [currentTime, setCurrentTime] = useState(0);

  const getActiveState = (time: number) => {
    return demoStates.find(state => {
      if (state.range.length === 1) return time <= state.range[0];
      return time >= state.range[0] && time <= state.range[1];
    }) || demoStates[0];
  };

  const activeState = getActiveState(currentTime);
  const progressPercent = (currentTime / 25) * 100;
  
  // Removed static pathD constructor

  return (
    <SectionWrapper id="demo">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
        
        {/* Left Column: Wrapper to allow sticky scrolling */}
        <div className="relative w-full">
          {/* Video Player UI */}
          <div className="relative lg:sticky lg:top-0 aspect-[9/16] max-w-[320px] mx-auto lg:mx-0 w-full rounded-[2rem] border-[8px] border-[var(--color-surface)] bg-black overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#08080E] z-10 pointer-events-none" />
          
          {/* Fake Video Content */}
          <div className="absolute inset-0 bg-[var(--color-surface-2)] animate-pulse" />
          
          {/* Video Headline Overlay */}
          <div className="absolute inset-0 flex items-center justify-center p-6 z-10 pointer-events-none">
            <h3 
              key={activeState.headline}
              className="text-white font-extrabold text-2xl text-center leading-tight drop-shadow-xl whitespace-pre-line animate-[tabFadeIn_0.3s_ease-out_forwards]"
            >
              {activeState.headline}
            </h3>
          </div>

          {/* UI Overlay */}
          <div className="absolute bottom-6 left-6 right-6 z-20">
            <div className="flex justify-between items-end mb-3">
              <div className="flex gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[var(--color-purple)] to-[var(--color-pink)]" />
                <div>
                  <div className="text-sm font-bold text-white">@creator_alpha</div>
                  <div className="text-[10px] text-[var(--color-text-2)]">2 hours ago</div>
                </div>
              </div>
              <div className="text-xs font-mono text-white/80">
                0:{currentTime.toString().padStart(2, '0')} / 0:25
              </div>
            </div>
            
            {/* Scrubber Input */}
            <div className="relative group mt-6">
              {/* UX Cue */}
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] text-[var(--color-pink)] font-mono animate-bounce pointer-events-none whitespace-nowrap">
                Drag to analyze ↔
              </div>
              
              <div className="relative h-4 cursor-pointer flex items-center">
                <div className="absolute w-full h-1 bg-[rgba(255,255,255,0.2)] rounded-full overflow-hidden pointer-events-none">
                  <div 
                    className="h-full transition-all duration-300 rounded-full" 
                    style={{ width: `${progressPercent}%`, backgroundColor: activeState.color }} 
                  />
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="25" 
                  step="1" 
                  value={currentTime} 
                  onChange={(e) => setCurrentTime(Number(e.target.value))}
                  className="w-full absolute inset-0 opacity-0 cursor-pointer h-full z-10"
                />
              </div>
            </div>
          </div>
        </div>
        </div>

        {/* Right Column: Interactive Demo Data */}
        <div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6">
            Stop guessing. <br />
            <span className="text-[var(--color-text-2)]">Start knowing.</span>
          </h2>
          <p className="text-sm md:text-base leading-relaxed text-[var(--color-text-2)] mb-10 max-w-md">
            Our timeline analyzer breaks down your content frame-by-frame, highlighting exactly where engagement drops and suggesting AI-driven edits to maximize your conversion rate.
          </p>

          <div className="mb-6 font-mono font-bold text-lg" style={{ color: activeState.color }}>
            {activeState.score}
          </div>

          {/* Retention Graph (Dynamically Driven React SVG) */}
          <div className="relative w-full h-[120px] mb-10 bg-[var(--color-surface)] border border-[var(--color-border-subtle)] rounded-xl overflow-hidden p-0">
            <svg viewBox="0 0 100 140" preserveAspectRatio="none" className="w-full h-full cursor-crosshair">
              {/* Layer 1: Grid Lines */}
              {[1.0, 0.75, 0.5, 0.25].map((val, i) => (
                <line 
                  key={i} 
                  x1="0" x2="100" 
                  y1={getRetY(val)} y2={getRetY(val)} 
                  stroke="rgba(255,255,255,0.05)" strokeWidth="0.3" 
                  vectorEffect="non-scaling-stroke"
                />
              ))}

              {/* Layer 2: Hook Region */}
              <rect x="0" y="0" width={(3 / 25) * 100} height="140" fill="rgba(255,255,255,0.03)" />
              <line 
                x1={(3 / 25) * 100} x2={(3 / 25) * 100} 
                y1="0" y2="140" 
                stroke="rgba(255,255,255,0.12)" strokeWidth="0.5" 
                strokeDasharray="2,2" vectorEffect="non-scaling-stroke" 
              />

              {/* Layer 3: Area Fill */}
              <path 
                d={`M0,${getRetY(chartData[0].retention)} ${chartData.map((d, i) => `L${(i / 25) * 100},${getRetY(d.retention)}`).join(' ')} L100,140 L0,140 Z`}
                fill="rgba(255,255,255,0.02)"
              />

              {/* Layer 4: Segmented Line */}
              {chartData.map((d, i) => {
                if (i === 0) return null;
                const prev = chartData[i - 1];
                const x1 = ((i - 1) / 25) * 100;
                const y1 = getRetY(prev.retention);
                const x2 = (i / 25) * 100;
                const y2 = getRetY(d.retention);
                const color = d.score >= 7 ? 'var(--color-green)' : d.score >= 4 ? 'var(--color-amber)' : 'var(--color-red)';
                
                return (
                  <line 
                    key={i}
                    x1={x1} y1={y1} x2={x2} y2={y2}
                    stroke={color} strokeWidth="1.8" strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                  />
                );
              })}

              {/* Playhead */}
              <line 
                x1={(currentTime / 25) * 100} x2={(currentTime / 25) * 100} 
                y1="0" y2="140" 
                stroke="rgba(255,255,255,0.5)" strokeWidth="1"
                vectorEffect="non-scaling-stroke"
                className="transition-all duration-300 ease-out"
              />
              <circle 
                cx={(currentTime / 25) * 100} 
                cy={getRetY(chartData[currentTime].retention)} 
                r="3" fill="white" 
                vectorEffect="non-scaling-stroke"
                className="transition-all duration-300 ease-out"
              />
            </svg>
          </div>

          {/* AI Suggestion Cards */}
          <div className="min-h-[320px]">
            <div key={activeState.headline} className="flex flex-col gap-4 animate-[tabFadeIn_0.3s_ease-out_forwards]">
            {activeState.cards.map((card, idx) => {
              const typeColor = card.type === 'good' ? 'var(--color-green)' : card.type === 'warning' ? 'var(--color-amber)' : card.type === 'danger' ? 'var(--color-red)' : 'var(--color-pink)';
              
              return (
                <div 
                  key={idx} 
                  className="bg-[var(--color-surface)] border border-[var(--color-border-subtle)] rounded-xl p-5 relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-1 h-full" style={{ backgroundColor: typeColor }} />
                  
                  <div className="flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase mb-3" style={{ color: typeColor }}>
                    <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: typeColor }} />
                    {card.second}
                  </div>
                  
                  <div className="font-mono text-sm leading-relaxed text-[var(--color-text-1)] mb-2">
                    &gt; {card.text}
                  </div>
                  <div className="font-mono text-sm leading-relaxed text-[var(--color-text-2)]">
                    &gt; {card.fix}
                  </div>
                </div>
              );
            })}
            </div>
          </div>

        </div>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes tabFadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}} />
    </SectionWrapper>
  );
}
