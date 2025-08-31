import { Hero } from "@/components/Hero";
import { SBOMGenerator } from "@/components/SBOMGenerator";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Hero />
      <SBOMGenerator />
    </main>
  );
};

export default Index;
