import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export function SectionWrapper({ children, className, id }: SectionWrapperProps) {
  return (
    <section id={id} className={cn("relative w-full py-24 md:py-32 px-6 md:px-12 overflow-hidden", className)}>
      <div className="w-full max-w-7xl mx-auto relative z-10">
        {children}
      </div>
    </section>
  );
}
