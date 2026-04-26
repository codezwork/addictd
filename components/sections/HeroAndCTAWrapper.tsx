"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DataScramble } from "@/components/ui/DataScramble";
import { FloatingCard } from "@/components/ui/FloatingCard";
import { CardCTASection } from "./CardCTASection";

export function HeroAndCTAWrapper({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const [isDocked, setIsDocked] = useState(false);

  // Card Swap State & Autoplay
  const [activeCard, setActiveCard] = useState<1 | 2>(1);
  const autoplayTimer = useRef<NodeJS.Timeout | null>(null);
  const isScrolling = useRef(false);
  const swapTweens = useRef<gsap.core.Tween[]>([]);
  const handleCardSwap = (cardNum: 1 | 2) => {
    if (isScrolling.current) return;
    setActiveCard(cardNum);
    if (autoplayTimer.current) clearInterval(autoplayTimer.current);
    autoplayTimer.current = setInterval(() => {
      if (!isScrolling.current) setActiveCard((prev) => (prev === 1 ? 2 : 1));
    }, 2000);
  };

  useEffect(() => {
    autoplayTimer.current = setInterval(() => {
      if (!isScrolling.current) setActiveCard((prev) => (prev === 1 ? 2 : 1));
    }, 2000);
    return () => {
      if (autoplayTimer.current) clearInterval(autoplayTimer.current);
    };
  }, []);

  // GSAP Swap Animation
  useEffect(() => {
    if (!card1Ref.current || !card2Ref.current || isScrolling.current) return;

    // Clean up old swap tweens safely
    swapTweens.current.forEach(t => t.kill());
    swapTweens.current = [];

    if (activeCard === 1) {
      swapTweens.current.push(gsap.to(card1Ref.current, { x: -40, y: 20, rotationZ: -4, scale: 1, zIndex: 2, duration: 0.8, ease: "power3.inOut" }));
      swapTweens.current.push(gsap.to(card2Ref.current, { x: 40, y: -20, rotationZ: 5, scale: 0.95, zIndex: 1, duration: 0.8, ease: "power3.inOut" }));
    } else {
      swapTweens.current.push(gsap.to(card1Ref.current, { x: 40, y: -20, rotationZ: 5, scale: 0.95, zIndex: 1, duration: 0.8, ease: "power3.inOut" }));
      swapTweens.current.push(gsap.to(card2Ref.current, { x: -40, y: 20, rotationZ: -4, scale: 1, zIndex: 2, duration: 0.8, ease: "power3.inOut" }));
    }
  }, [activeCard]);

  useEffect(() => {
    if (!containerRef.current || !card1Ref.current || !card2Ref.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      // Set initial 3D transform states for cards in the Hero
      gsap.set(card1Ref.current, {
        x: -40,
        y: 20,
        rotationZ: -4,
        zIndex: 2,
        rotationX: 0,
        rotationY: 0,
      });

      gsap.set(card2Ref.current, {
        x: 40,
        y: -20,
        rotationZ: 5,
        zIndex: 1,
        rotationX: 0,
        rotationY: 0,
      });

      // Find the docking slots in the CTA section
      const slot1 = document.getElementById("dock-slot-1");
      const slot2 = document.getElementById("dock-slot-2");

      if (!slot1 || !slot2) return;

      // The wrapper height contains both sections
      const tl = gsap.timeline({
        onComplete: () => setIsDocked(true),
        onReverseComplete: () => setIsDocked(false),
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          onEnter: () => {
            isScrolling.current = true;
            if (autoplayTimer.current) clearInterval(autoplayTimer.current);
            swapTweens.current.forEach(t => t.kill()); // Safely kill only the interactive swap tweens
            gsap.set(card1Ref.current, { x: -40, y: 20, rotationZ: -4, scale: 1, zIndex: 2 });
            gsap.set(card2Ref.current, { x: 40, y: -20, rotationZ: 5, scale: 0.95, zIndex: 1 });
            setActiveCard(1);
          },
          onLeaveBack: () => {
            isScrolling.current = false;
            if (autoplayTimer.current) clearInterval(autoplayTimer.current);
            autoplayTimer.current = setInterval(() => {
              if (!isScrolling.current) setActiveCard((prev) => (prev === 1 ? 2 : 1));
            }, 2000);
          }
        },
      });

      // Calculate distances dynamically based on slots
      const getDist = (card: HTMLElement, slot: HTMLElement) => {
        const cRect = card.getBoundingClientRect();
        const sRect = slot.getBoundingClientRect();
        return {
          x: sRect.left - cRect.left,
          y: sRect.top - cRect.top,
        };
      };

      // Fade out hero text
      tl.to(heroContentRef.current, {
        opacity: 0,
        y: -50,
        duration: 0.2,
      }, 0);

      // Fade in CTA copy early
      const ctaCopy = document.getElementById("cta-copy");
      if (ctaCopy) {
        tl.to(ctaCopy, {
          opacity: 1,
          y: 0,
          duration: 0.2,
        }, 0.6);
      }

      // Animate Card 1 down into slot 1 with 3D rotation and glare sweep
      const dist1 = getDist(card1Ref.current!, slot1);
      tl.to(card1Ref.current, {
        x: "+=" + dist1.x, // relative offset since we already transformed
        y: "+=" + dist1.y, // approximate vertical travel down to CTA
        rotationZ: 0,
        rotationX: 15,
        rotationY: -10,
        duration: 1.2,
        ease: "power2.inOut",
      }, 0);

      // Glare effect for Card 1
      const glare1 = card1Ref.current?.querySelector(".card-glare");
      if (glare1) {
        tl.to(glare1, {
          opacity: 1,
          backgroundPosition: "0% 0%",
          duration: 1.2,
        }, 0);
      }

      // Animate Card 2 down into slot 2
      const dist2 = getDist(card2Ref.current!, slot2);
      tl.to(card2Ref.current, {
        x: "+=" + dist2.x,
        y: "+=" + dist2.y,
        rotationZ: 0,
        rotationX: 15,
        rotationY: 10,
        duration: 1.2,
        ease: "power2.inOut",
      }, 0.1);

      // Glare effect for Card 2
      const glare2 = card2Ref.current?.querySelector(".card-glare");
      if (glare2) {
        tl.to(glare2, {
          opacity: 1,
          backgroundPosition: "0% 0%",
          duration: 1.2,
        }, 0.1);
      }

      // Final settle: Flatten the cards back to perfect 2D rectangles as they land
      tl.to([card1Ref.current, card2Ref.current], {
        rotationX: 0,
        rotationY: 0,
        rotationZ: 0,
        skewX: 0,
        skewY: 0,
        duration: 0.4,
        ease: "power3.out"
      }, 0.9); // Starts at 0.9, ends at 1.3 (matching Card 2's end time)
    });

    return () => mm.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Background Hero Variant */}
      {children}

      <section className="relative min-h-screen w-full py-32 px-6 md:px-12 flex items-center justify-center pt-[15vh]">
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-center">
          
          {/* Left: Hero Copy */}
          <div ref={heroContentRef} className="max-w-xl">
            <div className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.12em] uppercase text-[var(--color-pink)] mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-pink)] animate-pulse" />
              Intelligence Layer
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.05] tracking-tight mb-6">
              Know before <br />
              <span className="font-serif font-normal italic bg-gradient-to-r from-[var(--color-purple)] to-[var(--color-pink)] text-transparent bg-clip-text">
                you post.
              </span>
            </h1>
            
            <p className="text-lg text-[var(--color-text-2)] mb-10 max-w-md">
              The AI platform predicting viral potential and conversion velocity before your content ever goes live.
            </p>
            
            <div className="flex items-center gap-10">
              <div>
                <div className="text-3xl font-extrabold bg-gradient-to-r from-[var(--color-purple)] to-[var(--color-pink)] text-transparent bg-clip-text mb-1 tracking-tight">
                  <DataScramble text="8,700+" />
                </div>
                <div className="font-mono text-[11px] tracking-widest uppercase text-white">
                  Videos Analyzed
                </div>
              </div>
              <div>
                <div className="text-3xl font-extrabold bg-gradient-to-r from-[var(--color-purple)] to-[var(--color-pink)] text-transparent bg-clip-text mb-1 tracking-tight">
                  <DataScramble text="4B+" />
                </div>
                <div className="font-mono text-[11px] tracking-widest uppercase text-white">
                  Views Connected
                </div>
              </div>
            </div>
          </div>

          {/* Right: Floating Cards */}
          <div className="relative h-[420px] flex items-center justify-center">
            {/* The friction glow */}
            <div className="absolute w-[60px] h-[120px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse,rgba(255,59,59,0.2)_0%,transparent_70%)] pointer-events-none" />
            
            <FloatingCard
              ref={card1Ref}
              title="Join a Campaign"
              tag="Clipper"
              description="Access elite affiliate campaigns, generate links, and track your conversion velocity in real-time."
              icon="⚡"
              variant="primary"
            />
            
            <FloatingCard
              ref={card2Ref}
              title="Agency Login"
              tag="Partner"
              description="Deploy campaigns, set ROAS targets, and let our predictive models manage your spend distribution."
              icon="🏢"
              variant="secondary"
            />

            {/* Bottom Navigation Dots */}
            <div className="flex items-center justify-center gap-3 mt-8 absolute -bottom-12 left-1/2 -translate-x-1/2 z-10">
              <div 
                onClick={() => handleCardSwap(1)}
                className={`rounded-full cursor-pointer transition-all duration-300 hover:bg-[var(--color-pink)] ${activeCard === 1 ? 'w-6 h-1.5 bg-[var(--color-purple)]' : 'w-1.5 h-1.5 bg-[var(--color-border-subtle)]'}`}
              />
              <div 
                onClick={() => handleCardSwap(2)}
                className={`rounded-full cursor-pointer transition-all duration-300 hover:bg-[var(--color-pink)] ${activeCard === 2 ? 'w-6 h-1.5 bg-[var(--color-purple)]' : 'w-1.5 h-1.5 bg-[var(--color-border-subtle)]'}`}
              />
            </div>
          </div>

        </div>
      </section>

      <CardCTASection />
    </div>
  );
}
