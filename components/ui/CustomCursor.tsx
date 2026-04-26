"use client";

import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  // Use refs to store coordinates outside of React state to avoid re-renders
  const mouse = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const requestRef = useRef<number>(0);

  useEffect(() => {
    if (!dotRef.current || !ringRef.current) return;

    // Center the cursor initially (optional, but prevents it starting at 0,0)
    mouse.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    ring.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("hover-target")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    const animate = () => {
      if (dotRef.current && ringRef.current) {
        // Dot is instant
        dotRef.current.style.transform = `translate3d(${mouse.current.x}px, ${mouse.current.y}px, 0) translate(-50%, -50%)`;
        
        // Ring lerps
        ring.current.x += (mouse.current.x - ring.current.x) * 0.14;
        ring.current.y += (mouse.current.y - ring.current.y) * 0.14;
        ringRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0) translate(-50%, -50%)`;
      }
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9999] mix-blend-normal transition-[width,height,background-color] duration-200 ${
          isHovering ? "w-3.5 h-3.5 bg-[var(--color-purple)]" : "bg-[var(--color-pink)]"
        }`}
      />
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 w-9 h-9 rounded-full pointer-events-none z-[9998] border-[1.5px] transition-[width,height,border-color] duration-300 ${
          isHovering
            ? "w-[52px] h-[52px] border-[var(--color-purple)]"
            : "border-[rgba(200,75,255,0.5)]"
        }`}
      />
    </>
  );
}
