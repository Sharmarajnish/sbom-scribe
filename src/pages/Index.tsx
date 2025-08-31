import { Hero } from "@/components/Hero";
import { SBOMGenerator } from "@/components/SBOMGenerator";

const Index = () => {
  console.log("Index page is loading...");
  console.log("Hero component:", Hero);
  console.log("SBOMGenerator component:", SBOMGenerator);
  
  return (
    <main className="min-h-screen bg-background">
      <Hero />
      <SBOMGenerator />
    </main>
  );
};

export default Index;
