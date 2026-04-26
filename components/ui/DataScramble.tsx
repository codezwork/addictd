"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const CHARACTERS = "!<>-_\\\\/[]{}—=+*^?#________";

export function DataScramble({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [isScrambling, setIsScrambling] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    gsap.registerPlugin(ScrollTrigger);

    let frame = 0;
    let animationFrameId: number;
    const queue: { from: string; to: string; start: number; end: number; char?: string }[] = [];
    let resolvePromise: () => void;
    
    // Prepare scramble queue
    const length = text.length;
    for (let i = 0; i < length; i++) {
      const from = CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
      const start = Math.floor(Math.random() * 40);
      const end = start + Math.floor(Math.random() * 40);
      queue.push({ from, to: text[i], start, end });
    }

    const update = () => {
      if (!ref.current) return;
      let output = "";
      let complete = 0;

      for (let i = 0, n = queue.length; i < n; i++) {
        const { from, to, start, end, char } = queue[i];
        
        if (frame >= end) {
          complete++;
          output += to;
        } else if (frame >= start) {
          if (!char || Math.random() < 0.28) {
            queue[i].char = CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
          }
          output += `<span class="opacity-50">${queue[i].char}</span>`;
        } else {
          output += from;
        }
      }

      ref.current.innerHTML = output;

      if (complete === queue.length) {
        if (resolvePromise) resolvePromise();
        setIsScrambling(false);
      } else {
        animationFrameId = requestAnimationFrame(update);
        frame++;
      }
    };

    const startScramble = () => {
      setIsScrambling(true);
      frame = 0;
      update();
    };

    ScrollTrigger.create({
      trigger: ref.current,
      start: "top 85%",
      onEnter: startScramble,
      once: true,
    });

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [text]);

  return <span ref={ref} className={className} dangerouslySetInnerHTML={{ __html: text }} />;
}
