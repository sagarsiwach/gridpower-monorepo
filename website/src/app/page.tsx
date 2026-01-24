import { HeroCarousel } from "@/components/ui/HeroCarousel";
import { Header } from "@/components/ui/Header";
import { GridEnergySection } from "@/components/ui/GridEnergySection";

export default function Home() {
  return (
    <main className="relative">
      <Header />
      <HeroCarousel />
      <GridEnergySection />
    </main>
  );
}
