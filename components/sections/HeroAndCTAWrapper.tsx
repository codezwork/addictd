"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DataScramble } from "@/components/ui/DataScramble";
import { FloatingCard } from "@/components/ui/FloatingCard";
import { CardCTASection } from "./CardCTASection";

export function HeroAndCTAWrapper({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLElement>(null);
  const card2Ref = useRef<HTMLElement>(null);
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
    // On mobile, Three.js/WebGL takes longer to initialise. Delay the first
    // autoplay tick so the swap animation does not fire into an invisible canvas.
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const initialDelay = isMobile ? 4000 : 500;

    const startAutoplay = () => {
      autoplayTimer.current = setInterval(() => {
        if (!isScrolling.current) setActiveCard((prev) => (prev === 1 ? 2 : 1));
      }, 2000);
    };

    const delayTimer = setTimeout(startAutoplay, initialDelay);
    return () => {
      clearTimeout(delayTimer);
      if (autoplayTimer.current) clearInterval(autoplayTimer.current);
    };
  }, []);

  // GSAP Swap Animation — runs on both desktop and mobile
  useEffect(() => {
    if (!card1Ref.current || !card2Ref.current || isScrolling.current) return;

    swapTweens.current.forEach((t) => t.kill());
    swapTweens.current = [];

    const isMobile = window.innerWidth < 768;

    if (isMobile) {
      // On mobile the cards are stacked; active card floats up and forward
      if (activeCard === 1) {
        swapTweens.current.push(gsap.to(card1Ref.current, { y: -10, rotationZ: -2, scale: 1, zIndex: 2, duration: 0.8, ease: "power3.inOut" }));
        swapTweens.current.push(gsap.to(card2Ref.current, { y: 10, rotationZ: 2, scale: 0.93, zIndex: 1, duration: 0.8, ease: "power3.inOut" }));
      } else {
        swapTweens.current.push(gsap.to(card1Ref.current, { y: 10, rotationZ: 2, scale: 0.93, zIndex: 1, duration: 0.8, ease: "power3.inOut" }));
        swapTweens.current.push(gsap.to(card2Ref.current, { y: -10, rotationZ: -2, scale: 1, zIndex: 2, duration: 0.8, ease: "power3.inOut" }));
      }
    } else {
      // Desktop: original side-by-side swap offsets
      if (activeCard === 1) {
        swapTweens.current.push(gsap.to(card1Ref.current, { x: -40, y: 20, rotationZ: -4, scale: 1, zIndex: 2, duration: 0.8, ease: "power3.inOut" }));
        swapTweens.current.push(gsap.to(card2Ref.current, { x: 40, y: -20, rotationZ: 5, scale: 0.95, zIndex: 1, duration: 0.8, ease: "power3.inOut" }));
      } else {
        swapTweens.current.push(gsap.to(card1Ref.current, { x: 40, y: -20, rotationZ: 5, scale: 0.95, zIndex: 1, duration: 0.8, ease: "power3.inOut" }));
        swapTweens.current.push(gsap.to(card2Ref.current, { x: -40, y: 20, rotationZ: -4, scale: 1, zIndex: 2, duration: 0.8, ease: "power3.inOut" }));
      }
    }
  }, [activeCard]);

  useEffect(() => {
    if (!containerRef.current || !card1Ref.current || !card2Ref.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();

    // ─── MOBILE: stacked cards + scroll-docking into CTA section ────────────
    mm.add("(max-width: 767px)", () => {
      // Set initial stacked positions
      gsap.set(card1Ref.current, { x: 0, y: -10, rotationZ: -2, scale: 1, zIndex: 2 });
      gsap.set(card2Ref.current, { x: 0, y: 10, rotationZ: 2, scale: 0.93, zIndex: 1 });

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
            swapTweens.current.forEach((t) => t.kill());
            gsap.set(card1Ref.current, { x: 0, y: -10, rotationZ: -2, scale: 1, zIndex: 2 });
            gsap.set(card2Ref.current, { x: 0, y: 10, rotationZ: 2, scale: 0.93, zIndex: 1 });
            setActiveCard(1);
          },
          onLeaveBack: () => {
            isScrolling.current = false;
            if (autoplayTimer.current) clearInterval(autoplayTimer.current);
            autoplayTimer.current = setInterval(() => {
              if (!isScrolling.current) setActiveCard((prev) => (prev === 1 ? 2 : 1));
            }, 2000);
          },
        },
      });

      // Fade out hero copy
      tl.to(heroContentRef.current, { opacity: 0, y: -50, duration: 0.2 }, 0);

      // Reveal CTA copy
      const ctaCopy = document.getElementById("cta-copy");
      if (ctaCopy) {
        tl.to(ctaCopy, { opacity: 1, y: 0, duration: 0.2 }, 0.6);
      }

      const getDist = (card: HTMLElement, slot: HTMLElement) => {
        const cRect = card.getBoundingClientRect();
        const sRect = slot.getBoundingClientRect();
        return { x: sRect.left - cRect.left, y: sRect.top - cRect.top };
      };

      const mobileSlot1 = document.getElementById("dock-slot-mobile-1");
      const mobileSlot2 = document.getElementById("dock-slot-mobile-2");

      if (mobileSlot1 && mobileSlot2 && card1Ref.current && card2Ref.current) {
        // Each card gets its own vertical slot — fully accessible, no overlap
        const dist1 = getDist(card1Ref.current, mobileSlot1);
        tl.to(
          card1Ref.current,
          { x: dist1.x, y: dist1.y, rotationZ: -3, rotationX: 8, scale: 1, duration: 1.2, ease: "power2.inOut" },
          0
        );
        const dist2 = getDist(card2Ref.current, mobileSlot2);
        tl.to(
          card2Ref.current,
          { x: dist2.x, y: dist2.y, rotationZ: 3, rotationX: 8, scale: 1, zIndex: 2, duration: 1.2, ease: "power2.inOut" },
          0.1
        );
      } else {
        // Fallback: stack vertically with a generous gap so both remain tappable
        tl.to(card1Ref.current, { x: 0, y: -190, rotationZ: -3, rotationX: 8, scale: 1, duration: 1.2, ease: "power2.inOut" }, 0);
        tl.to(card2Ref.current, { x: 0, y: 190, rotationZ: 3, rotationX: 8, scale: 1, duration: 1.2, ease: "power2.inOut" }, 0.1);
      }

      // Settle flat at the end of the animation
      tl.to(
        [card1Ref.current, card2Ref.current],
        { rotationX: 0, rotationZ: 0, duration: 0.4, ease: "power3.out" },
        0.9
      );
    });

    // ─── DESKTOP: original scroll-docking animation, untouched ───────────────
    mm.add("(min-width: 768px)", () => {
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

      const slot1 = document.getElementById("dock-slot-1");
      const slot2 = document.getElementById("dock-slot-2");

      if (!slot1 || !slot2) return;

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
            swapTweens.current.forEach((t) => t.kill());
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
          },
        },
      });

      const getDist = (card: HTMLElement, slot: HTMLElement) => {
        const cRect = card.getBoundingClientRect();
        const sRect = slot.getBoundingClientRect();
        return {
          x: sRect.left - cRect.left,
          y: sRect.top - cRect.top,
        };
      };

      tl.to(heroContentRef.current, { opacity: 0, y: -50, duration: 0.2 }, 0);

      const ctaCopy = document.getElementById("cta-copy");
      if (ctaCopy) {
        tl.to(ctaCopy, { opacity: 1, y: 0, duration: 0.2 }, 0.6);
      }

      const dist1 = getDist(card1Ref.current!, slot1);
      tl.to(
        card1Ref.current,
        { x: "+=" + dist1.x, y: "+=" + dist1.y, rotationZ: 0, rotationX: 15, rotationY: -10, duration: 1.2, ease: "power2.inOut" },
        0
      );

      const glare1 = card1Ref.current?.querySelector(".card-glare");
      if (glare1) {
        tl.to(glare1, { opacity: 1, backgroundPosition: "0% 0%", duration: 1.2 }, 0);
      }

      const dist2 = getDist(card2Ref.current!, slot2);
      tl.to(
        card2Ref.current,
        { x: "+=" + dist2.x, y: "+=" + dist2.y, rotationZ: 0, rotationX: 15, rotationY: 10, duration: 1.2, ease: "power2.inOut" },
        0.1
      );

      const glare2 = card2Ref.current?.querySelector(".card-glare");
      if (glare2) {
        tl.to(glare2, { opacity: 1, backgroundPosition: "0% 0%", duration: 1.2 }, 0.1);
      }

      tl.to(
        [card1Ref.current, card2Ref.current],
        { rotationX: 0, rotationY: 0, rotationZ: 0, skewX: 0, skewY: 0, duration: 0.4, ease: "power3.out" },
        0.9
      );
    });

    return () => mm.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Background Hero Variant */}
      {children}

      <section className="relative z-50 min-h-screen w-full py-32 px-6 md:px-12 flex items-center justify-center pt-[15vh]">
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
          {/*
            On mobile (single column) the card container is shorter and the
            cards are centred / stacked rather than side-by-side. The reduced
            height prevents the cards from feeling oversized on a narrow screen.
          */}
          <div className="relative h-[320px] md:h-[420px] flex items-center justify-center">
            {/* Friction glow */}
            <div className="absolute w-[60px] h-[120px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse,rgba(255,59,59,0.2)_0%,transparent_70%)] pointer-events-none" />

            <FloatingCard
              ref={card1Ref}
              title="Join a Campaign"
              tag="Clipper"
              description="Access elite affiliate campaigns, generate links, and track your conversion velocity in real-time."
              icon="⚡"
              variant="primary"
              href="https://app-addictd.vercel.app/"
            />

            <FloatingCard
              ref={card2Ref}
              title="Agency Login"
              tag="Partner"
              description="Deploy campaigns, set ROAS targets, and let our predictive models manage your spend distribution."
              icon="🏢"
              variant="secondary"
              href="https://app-addictd.vercel.app/"
            />

            {/* Bottom Navigation Dots */}
            <div className="flex items-center justify-center gap-3 mt-8 absolute -bottom-12 left-1/2 -translate-x-1/2 z-10">
              <div
                onClick={() => handleCardSwap(1)}
                className={`rounded-full cursor-pointer transition-all duration-300 hover:bg-[var(--color-pink)] ${
                  activeCard === 1
                    ? "w-6 h-1.5 bg-[var(--color-purple)]"
                    : "w-1.5 h-1.5 bg-[var(--color-border-subtle)]"
                }`}
              />
              <div
                onClick={() => handleCardSwap(2)}
                className={`rounded-full cursor-pointer transition-all duration-300 hover:bg-[var(--color-pink)] ${
                  activeCard === 2
                    ? "w-6 h-1.5 bg-[var(--color-purple)]"
                    : "w-1.5 h-1.5 bg-[var(--color-border-subtle)]"
                }`}
              />
            </div>
          </div>

        </div>
      </section>

      <CardCTASection />
    </div>
  );
}
