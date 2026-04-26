"use client";

import { forwardRef, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import gsap from "gsap";

interface FloatingCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  tag: string;
  description: string;
  icon: string;
  variant: "primary" | "secondary";
  isDocked?: boolean;
}

export const FloatingCard = forwardRef<HTMLDivElement, FloatingCardProps>(
  ({ className, title, tag, description, icon, variant, isDocked = false, ...props }, ref) => {
    const innerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (!innerRef.current) return;
      const el = innerRef.current;
      
      const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });

      const handleMouseMove = (e: MouseEvent) => {
        if (!isDocked) return;

        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;

        xTo(distanceX * 0.08);
        yTo(distanceY * 0.08);
      };

      const handleMouseLeave = () => {
        xTo(0);
        yTo(0);
      };

      el.addEventListener("mousemove", handleMouseMove);
      el.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        el.removeEventListener("mousemove", handleMouseMove);
        el.removeEventListener("mouseleave", handleMouseLeave);
      };
    }, [isDocked]);

    return (
      <div
        ref={ref}
        className={cn(
          "absolute w-[300px] md:w-[340px] p-8 rounded-2xl border transition-colors duration-300 will-change-transform bg-[var(--color-surface)] z-50 group",
          variant === "primary" ? "border-[var(--color-border-accent)]" : "border-[var(--color-border-subtle)]",
          isDocked ? "hover:border-[var(--color-purple)] hover:shadow-[0_0_30px_rgba(200,75,255,0.15)] cursor-pointer" : "",
          className
        )}
        style={{ transformStyle: "preserve-3d" }}
        {...props}
      >
        {/* The Card Glare (GSAP will animate its background-position) */}
        <div 
          className="card-glare absolute inset-0 rounded-2xl pointer-events-none z-10"
          style={{
            background: "linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.1) 25%, transparent 30%)",
            backgroundSize: "200% 200%",
            backgroundPosition: "100% 100%",
            opacity: 0,
          }}
        />

        <div ref={innerRef} className="relative z-20 w-full h-full will-change-transform">
          <div className="w-10 h-10 bg-[var(--color-surface-2)] rounded-xl flex items-center justify-center text-lg mb-6">
            {icon}
          </div>
          <div className="font-mono text-[10px] tracking-widest uppercase text-[var(--color-pink)] mb-2">
            {tag}
          </div>
          <h3 className="text-2xl font-bold tracking-tight mb-2 text-[var(--color-text-1)]">
            {title}
          </h3>
          <p className="text-sm leading-relaxed text-[var(--color-text-2)] mb-6">
            {description}
          </p>
          
          <button className={cn(
            "inline-flex items-center gap-2 text-[13px] font-semibold px-5 py-2.5 rounded-full transition-transform hover:-translate-y-0.5 pointer-events-auto",
            variant === "primary" 
              ? "bg-gradient-to-r from-[var(--color-purple)] to-[var(--color-pink)] text-white" 
              : "bg-transparent border border-[var(--color-border-accent)] text-[var(--color-text-2)] hover:text-white hover:border-[var(--color-purple)]"
          )}>
            {variant === "primary" ? "Get Started" : "Login"}
          </button>
        </div>
      </div>
    );
  }
);

FloatingCard.displayName = "FloatingCard";
