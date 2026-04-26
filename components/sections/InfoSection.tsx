"use client";

import { useEffect, useRef, useState } from "react";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { cn } from "@/lib/utils";

function TypewriterText({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayedText, setDisplayedText] = useState("");
  const containerRef = useRef<HTMLSpanElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    
    let i = 0;
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayedText(text.substring(0, i + 1));
        i++;
        if (i >= text.length) clearInterval(interval);
      }, 15); // Fast typing effect
      return () => clearInterval(interval);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [inView, text, delay]);

  return (
    <span ref={containerRef}>
      {displayedText}
      {inView && displayedText.length < text.length && (
        <span className="animate-pulse bg-[var(--color-pink)] w-1.5 h-3 inline-block ml-1 align-middle" />
      )}
    </span>
  );
}

export function InfoSection() {
  const [activeTab, setActiveTab] = useState<"clippers" | "agencies">("clippers");
  const [slideDirection, setSlideDirection] = useState<"left" | "right">("right");
  const [hoveredBar, setHoveredBar] = useState<{ index: number; x: number; y: number } | null>(null);
  const [donutHover, setDonutHover] = useState<{ segment: 'purple' | 'pink'; x: number; y: number } | null>(null);

  const barTooltips = [
    "0:00 - Hook initiated",
    "0:01 - Visual change detected",
    "0:02 - Audio spike",
    "0:03 - Pacing accelerated",
    "0:04 - Peak retention",
    "0:05 - Micro-drop",
    "0:06 - Graphic overlay",
    "0:07 - Attention stabilizing",
    "0:08 - CTA approaching"
  ];

  const handleTabSwitch = (tab: "clippers" | "agencies") => {
    if (tab === activeTab) return;
    setSlideDirection(tab === "agencies" ? "right" : "left");
    setActiveTab(tab);
  };

  return (
    <SectionWrapper id="info">
      <style>{`
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>

      <div className="font-mono text-[11px] tracking-[0.12em] uppercase text-[var(--color-text-3)] mb-4">
        Platform Infrastructure
      </div>
      
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.05] mb-12">
        Engineered for <br />
        <span className="font-serif italic bg-gradient-to-r from-[var(--color-purple)] to-[var(--color-pink)] text-transparent bg-clip-text">
          viral outcomes.
        </span>
      </h2>

      {/* Tab Selector - Fluid Pill */}
      <div className="relative inline-flex bg-[var(--color-surface)] border border-[var(--color-border-subtle)] rounded-full p-1 mb-16">
        <div 
          className="absolute top-1 bottom-1 w-[140px] bg-gradient-to-r from-[var(--color-purple)] to-[var(--color-pink)] rounded-full transition-transform duration-500" 
          style={{ 
            transform: activeTab === 'agencies' ? 'translateX(100%)' : 'translateX(0)',
            transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)'
          }} 
        />
        <button
          onClick={() => handleTabSwitch("clippers")}
          className={cn(
            "relative z-10 w-[140px] text-center text-sm font-semibold py-2.5 transition-colors duration-300",
            activeTab === "clippers" ? "text-white" : "text-[var(--color-text-2)] hover:text-white"
          )}
        >
          For Clippers
        </button>
        <button
          onClick={() => handleTabSwitch("agencies")}
          className={cn(
            "relative z-10 w-[140px] text-center text-sm font-semibold py-2.5 transition-colors duration-300",
            activeTab === "agencies" ? "text-white" : "text-[var(--color-text-2)] hover:text-white"
          )}
        >
          For Agencies
        </button>
      </div>

      {/* Feature Cards Grid with Directional Slide */}
      <div className="overflow-hidden w-full">
        <div 
          key={activeTab}
          className={cn(
            "grid grid-cols-1 lg:grid-cols-2 gap-8 w-full",
            slideDirection === "right" 
              ? "animate-[slideInRight_0.6s_cubic-bezier(0.16,1,0.3,1)_forwards]"
              : "animate-[slideInLeft_0.6s_cubic-bezier(0.16,1,0.3,1)_forwards]"
          )}
        >
          {activeTab === "clippers" ? (
            <>
              {/* Card 1 */}
              <div className="rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-8 md:p-10 hover:border-[var(--color-border-accent)] transition-colors group">
                <div className="font-mono text-[10px] tracking-widest uppercase text-[var(--color-pink)] mb-3">
                  Predictive Scoring
                </div>
                <h3 className="text-2xl font-bold tracking-tight mb-4">AI Retention Engine</h3>
                <p className="text-sm leading-relaxed text-[var(--color-text-2)] mb-8 max-w-sm">
                  <TypewriterText text="Analyze your hooks before posting. Our model predicts audience drop-off to the millisecond." />
                </p>

                {/* Fake UI: Retention Graph */}
                <div className="relative mt-8 border border-[var(--color-border-subtle)] bg-[var(--color-surface-2)] rounded-xl p-4 overflow-hidden">
                  <div className="flex justify-between items-end h-16 gap-2">
                    {[40, 60, 50, 80, 100, 70, 90, 60, 40].map((h, i) => (
                      <div 
                        key={i} 
                        onMouseMove={(e) => setHoveredBar({ index: i, x: e.clientX, y: e.clientY })}
                        onMouseEnter={(e) => setHoveredBar({ index: i, x: e.clientX, y: e.clientY })}
                        onMouseLeave={() => setHoveredBar(null)}
                        className="flex-1 rounded-t-sm bg-gradient-to-t from-[var(--color-purple)] to-[var(--color-pink)] opacity-80 hover:opacity-100 transition-opacity cursor-crosshair" 
                        style={{ height: `${h}%` }} 
                      />
                    ))}
                  </div>
                  <div className="mt-4 flex gap-2">
                    <span className="font-mono text-[10px] px-2 py-1 rounded-full bg-[rgba(0,232,122,0.1)] text-[var(--color-green)] border border-[rgba(0,232,122,0.2)]">
                      +14% Hook Rate
                    </span>
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-8 md:p-10 hover:border-[var(--color-border-accent)] transition-colors group">
                <div className="font-mono text-[10px] tracking-widest uppercase text-[var(--color-pink)] mb-3">
                  Workflow Automation
                </div>
                <h3 className="text-2xl font-bold tracking-tight mb-4">Real-time Syndication</h3>
                <p className="text-sm leading-relaxed text-[var(--color-text-2)] mb-8 max-w-sm">
                  <TypewriterText text="Push content across multiple platforms simultaneously with auto-generated metadata." delay={100} />
                </p>

                {/* Fake UI: Campaign Strip */}
                <div className="mt-8 flex flex-col gap-3">
                  {[
                    { name: "Alpha Launch", rate: "2.4x ROAS", delay: "0ms" },
                    { name: "Beta Retarget", rate: "1.8x ROAS", delay: "100ms" },
                    { name: "Gamma Scale", rate: "3.2x ROAS", delay: "200ms" },
                  ].map((camp, i) => (
                    <div 
                      key={i} 
                      className="bg-[var(--color-surface-2)] border border-[var(--color-border-subtle)] rounded-xl p-4 flex justify-between items-center group-hover:translate-x-2 transition-transform"
                      style={{ transitionDelay: camp.delay }}
                    >
                      <div className="text-sm font-bold">{camp.name}</div>
                      <div className="font-mono text-xs text-[var(--color-green)]">{camp.rate}</div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Agency Card 1 */}
              <div className="rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-8 md:p-10 hover:border-[var(--color-border-accent)] transition-colors group">
                <div className="font-mono text-[10px] tracking-widest uppercase text-[var(--color-pink)] mb-3">
                  Command Center
                </div>
                <h3 className="text-2xl font-bold tracking-tight mb-4">Run campaigns. Not spreadsheets.</h3>
                <p className="text-sm leading-relaxed text-[var(--color-text-2)] mb-8 max-w-sm">
                  <TypewriterText text="Every campaign you manage, live in one place. Views, clippers, status — at a glance." />
                </p>

                {/* Fake UI: Active Campaigns */}
                <div className="mt-8 grid grid-cols-2 gap-4">
                  {[
                    { name: "Summer Promo", spend: "$45k", roas: "3.2x" },
                    { name: "Retargeting", spend: "$12k", roas: "4.1x" }
                  ].map((c, i) => (
                    <div key={i} className="bg-[var(--color-surface-2)] border border-[var(--color-border-subtle)] rounded-xl p-4">
                      <div className="text-xs text-[var(--color-text-2)] mb-1">{c.name}</div>
                      <div className="text-lg font-bold">{c.spend}</div>
                      <div className="text-[10px] font-mono text-[var(--color-green)] mt-1">{c.roas} ROAS</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Agency Card 2 */}
              <div className="rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-8 md:p-10 hover:border-[var(--color-border-accent)] transition-colors group">
                <div className="font-mono text-[10px] tracking-widest uppercase text-[var(--color-pink)] mb-3">
                  Clippers
                </div>
                <h3 className="text-2xl font-bold tracking-tight mb-4">See who's delivering. At a glance.</h3>
                <p className="text-sm leading-relaxed text-[var(--color-text-2)] mb-8 max-w-sm">
                  <TypewriterText text="Retention scores, clips submitted, and avg performance per clipper." delay={100} />
                </p>
                
                {/* Fake UI: Mini Leaderboard */}
                <div className="mt-8 flex flex-col gap-2">
                  {[
                    { rank: "1", name: "@viral_editor", views: "4.2M", score: "94" },
                    { rank: "2", name: "@clip_god", views: "1.8M", score: "88" },
                    { rank: "3", name: "@cut_master", views: "800K", score: "81" }
                  ].map((c, i) => (
                    <div key={i} className="flex justify-between items-center bg-[var(--color-surface-2)] border border-[var(--color-border-subtle)] rounded-lg p-3">
                      <div className="flex gap-3 items-center">
                        <div className="text-[10px] text-[var(--color-text-3)]">#{c.rank}</div>
                        <div className="text-xs font-mono">{c.name}</div>
                      </div>
                      <div className="flex gap-3 items-center">
                        <div className="text-xs font-bold">{c.views}</div>
                        <div className="text-[10px] text-[var(--color-green)] border border-[var(--color-green)]/20 px-1.5 py-0.5 rounded-full">{c.score}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Agency Card 3 */}
              <div className="rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-8 md:p-10 hover:border-[var(--color-border-accent)] transition-colors group">
                <div className="font-mono text-[10px] tracking-widest uppercase text-[var(--color-pink)] mb-3">
                  AI Quality
                </div>
                <h3 className="text-2xl font-bold tracking-tight mb-4">Only the clips that meet the bar.</h3>
                <p className="text-sm leading-relaxed text-[var(--color-text-2)] mb-8 max-w-sm">
                  <TypewriterText text="Set a minimum AI score. Clips that don't pass get flagged before you ever see them." delay={200} />
                </p>

                {/* Fake UI: Passes/Fails */}
                <div className="mt-8 flex flex-col gap-3">
                  <div className="w-full bg-[var(--color-surface-2)] border border-[var(--color-green)]/20 rounded-xl p-4 flex items-center justify-between">
                    <span className="text-xs text-[var(--color-text-2)]">Approved - High Retention</span>
                    <span className="text-sm font-mono text-[var(--color-green)] border border-[var(--color-green)]/30 px-2 py-0.5 rounded-full bg-[var(--color-green)]/10">87/100</span>
                  </div>
                  <div className="w-full bg-[var(--color-surface-2)] border border-[var(--color-red)]/20 rounded-xl p-4 flex items-center justify-between">
                    <span className="text-xs text-[var(--color-text-2)]">Flagged - Weak Hook</span>
                    <span className="text-sm font-mono text-[var(--color-red)] border border-[var(--color-red)]/30 px-2 py-0.5 rounded-full bg-[var(--color-red)]/10">52/100</span>
                  </div>
                </div>
              </div>

              {/* Agency Card 4 */}
              <div className="rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-8 md:p-10 hover:border-[var(--color-border-accent)] transition-colors group flex flex-col">
                <div className="font-mono text-[10px] tracking-widest uppercase text-[var(--color-pink)] mb-3">
                  Reporting
                </div>
                <h3 className="text-2xl font-bold tracking-tight mb-4">Prove the ROI of every campaign.</h3>
                <p className="text-sm leading-relaxed text-[var(--color-text-2)] mb-8 max-w-sm">
                  <TypewriterText text="Visualized insights so clients understand exactly where their money is working." delay={300} />
                </p>

                {/* Fake UI: Donut Chart */}
                <div className="mt-auto flex items-center justify-center bg-[var(--color-surface-2)] border border-[var(--color-border-subtle)] rounded-xl p-8 relative">
                  <div className="w-24 h-24 rounded-full border-[10px] border-[var(--color-surface)] shadow-[inset_0_0_10px_rgba(0,0,0,0.5)] relative flex items-center justify-center">
                    <div 
                      className="absolute inset-[-10px] rounded-full border-[10px] border-[var(--color-purple)] cursor-crosshair hover:opacity-80 transition-opacity" 
                      style={{ clipPath: 'polygon(50% 50%, 50% 0, 100% 0, 100% 100%, 0 100%, 0 50%)' }} 
                      onMouseMove={(e) => setDonutHover({ segment: 'purple', x: e.clientX, y: e.clientY })}
                      onMouseEnter={(e) => setDonutHover({ segment: 'purple', x: e.clientX, y: e.clientY })}
                      onMouseLeave={() => setDonutHover(null)}
                    />
                    <div 
                      className="absolute inset-[-10px] rounded-full border-[10px] border-[var(--color-pink)] cursor-crosshair hover:opacity-80 transition-opacity" 
                      style={{ clipPath: 'polygon(50% 50%, 0 50%, 0 0, 50% 0)' }} 
                      onMouseMove={(e) => setDonutHover({ segment: 'pink', x: e.clientX, y: e.clientY })}
                      onMouseEnter={(e) => setDonutHover({ segment: 'pink', x: e.clientX, y: e.clientY })}
                      onMouseLeave={() => setDonutHover(null)}
                    />
                    <span className="text-sm font-bold">+28%</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Floating Tooltips */}
      {hoveredBar !== null && (
        <div 
          className="fixed z-50 pointer-events-none bg-[var(--color-surface)] border border-[var(--color-border-accent)] px-3 py-1.5 rounded-md shadow-2xl transition-transform duration-75 ease-out"
          style={{ 
            left: hoveredBar.x, 
            top: hoveredBar.y,
            transform: "translate(-50%, -150%)" // Centers it and pushes it above the cursor
          }}
        >
          <span className="font-mono text-[10px] uppercase tracking-widest text-white whitespace-nowrap">
            {barTooltips[hoveredBar.index]}
          </span>
        </div>
      )}

      {donutHover !== null && (
        <div 
          className="fixed z-50 pointer-events-none bg-[var(--color-surface)] border border-[var(--color-border-accent)] px-3 py-1.5 rounded-md shadow-2xl transition-transform duration-75 ease-out"
          style={{ 
            left: donutHover.x, 
            top: donutHover.y,
            transform: "translate(-50%, -150%)" 
          }}
        >
          <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-pink)] whitespace-nowrap">
            {donutHover.segment === 'purple' ? "75% - High Retention Clips" : "25% - Flagged / Needs Edits"}
          </span>
        </div>
      )}
    </SectionWrapper>
  );
}
