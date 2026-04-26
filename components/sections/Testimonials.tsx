"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SectionWrapper } from "@/components/layout/SectionWrapper";

interface Testimonial {
  quote: string;
  author: string;
  company: string;
}

function TestimonialCard({ quote, author, company }: Testimonial) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current || !glareRef.current) return;

    // Highly performant GSAP setters
    const xTo = gsap.quickTo(cardRef.current, "rotationY", { duration: 0.3, ease: "power3.out" });
    const yTo = gsap.quickTo(cardRef.current, "rotationX", { duration: 0.3, ease: "power3.out" });
    const txTo = gsap.quickTo(cardRef.current, "x", { duration: 0.3, ease: "power3.out" });
    const tyTo = gsap.quickTo(cardRef.current, "y", { duration: 0.3, ease: "power3.out" });
    
    const glareX = gsap.quickTo(glareRef.current, "x", { duration: 0.2, ease: "power2.out" });
    const glareY = gsap.quickTo(glareRef.current, "y", { duration: 0.2, ease: "power2.out" });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = cardRef.current!.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;

      // Normalize values between -1 and 1
      const normalizedX = mouseX / (rect.width / 2);
      const normalizedY = mouseY / (rect.height / 2);

      const maxTilt = 8; // Heavy, premium tilt
      
      // Calculate 3D tilt. Moving right = positive Y rot. Moving down = negative X rot.
      xTo(normalizedX * maxTilt);
      yTo(-normalizedY * maxTilt);
      
      // Subtle magnetic translation
      txTo(normalizedX * 4);
      tyTo(normalizedY * 4);
      
      // Translate the glare element
      glareX(normalizedX * 100);
      glareY(normalizedY * 100);
    };

    const handleMouseLeave = () => {
      gsap.to(cardRef.current, { 
        rotationX: 0, rotationY: 0, x: 0, y: 0, 
        duration: 1, ease: "elastic.out(1, 0.3)" 
      });
      gsap.to(glareRef.current, { 
        x: 0, y: 0, 
        duration: 0.5, ease: "power3.out" 
      });
    };

    cardRef.current.addEventListener("mousemove", handleMouseMove);
    cardRef.current.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      if (cardRef.current) {
        cardRef.current.removeEventListener("mousemove", handleMouseMove);
        cardRef.current.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  return (
    <div style={{ perspective: "1000px" }} className="group h-full">
      <div 
        ref={cardRef} 
        className="relative h-full bg-[var(--color-surface)] border border-[var(--color-border-subtle)] rounded-2xl p-8 group-hover:border-[var(--color-border-accent)] transition-colors overflow-hidden"
        style={{ transformStyle: "preserve-3d", willChange: "transform" }}
      >
        {/* Specular Glare */}
        <div className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300 opacity-0 group-hover:opacity-100">
          <div 
            ref={glareRef}
            className="absolute w-[200%] h-[200%] -top-[50%] -left-[50%]"
            style={{ background: 'radial-gradient(circle at center, rgba(200,75,255,0.12) 0%, transparent 40%)' }}
          />
        </div>
        
        {/* Card Content (Translated Z to pop in 3D) */}
        <div className="relative z-20" style={{ transform: "translateZ(30px)" }}>
          <div className="text-4xl font-serif text-[var(--color-text-3)] mb-4">"</div>
          <p className="text-sm leading-relaxed text-[var(--color-text-1)] mb-8">
            {quote}
          </p>
          <div>
            <div className="font-bold text-sm">{author}</div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-text-2)] mt-1">{company}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Testimonials() {
  const testimonials = [
    {
      quote: "Addictd completely removed the guesswork from our scaling strategy. We test hooks through the AI, and only shoot what the model approves.",
      author: "Director of Scaling",
      company: "Apex Media",
    },
    {
      quote: "We've increased our campaign ROAS by 2.4x simply by listening to the retention predictions. It feels like cheating.",
      author: "Lead Buyer",
      company: "Velocity Partners",
    },
    {
      quote: "The interface is brutal, fast, and gives us exactly the data we need without the fluff. An absolute necessity for modern agencies.",
      author: "Founder",
      company: "Neon Studios",
    }
  ];

  return (
    <SectionWrapper id="testimonials">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
          Trusted by the <br />
          <span className="font-serif italic bg-gradient-to-r from-[var(--color-purple)] to-[var(--color-pink)] text-transparent bg-clip-text">
            top 1%.
          </span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((t, idx) => (
          <TestimonialCard 
            key={idx}
            quote={t.quote}
            author={t.author}
            company={t.company}
          />
        ))}
      </div>
    </SectionWrapper>
  );
}
