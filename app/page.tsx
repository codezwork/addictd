import { Navbar } from "@/components/layout/Navbar";
import { HeroAndCTAWrapper } from "@/components/sections/HeroAndCTAWrapper";
import { HeroVariant4Ferrofluid } from "@/components/hero/HeroVariant4Ferrofluid";
import { InfoSection } from "@/components/sections/InfoSection";
import { DemoSection } from "@/components/sections/DemoSection";
import { Testimonials } from "@/components/sections/Testimonials";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Navbar />
      
      <HeroAndCTAWrapper>
        { <HeroVariant4Ferrofluid />}
      </HeroAndCTAWrapper>

      <InfoSection />
      <DemoSection />
      <Testimonials />
      
      <Footer />
    </main>
  );
}
