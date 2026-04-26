"use client";

import { useRef } from "react";

export function MagneticButton({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  // Removed magnetic pulling logic to ensure zero spatial hijacking on the interface.
  // This component now acts as a standard wrapper.

  return (
    <div ref={ref} className={`inline-block ${className}`}>
      {children}
    </div>
  );
}
