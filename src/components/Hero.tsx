import { Button } from "@/components/ui/button";
import { Shield, GitBranch, FileSearch } from "lucide-react";
import heroImage from "@/assets/hero-sbom.jpg";

export const Hero = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="SBOM Generator Dashboard" 
          className="w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-hero opacity-90" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-primary/10 rounded-full border border-primary/20 shadow-medium">
              <Shield className="w-12 h-12 text-primary" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-primary-foreground">
            Generate Comprehensive 
            <span className="block bg-gradient-to-r from-primary-glow to-primary bg-clip-text text-transparent">
              Software Bill of Materials
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90 max-w-3xl mx-auto leading-relaxed">
            Automatically analyze your repositories and create detailed SBOMs for security compliance, 
            vulnerability tracking, and supply chain transparency.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="bg-card text-primary hover:bg-card/90 shadow-medium">
              <GitBranch className="w-5 h-5 mr-2" />
              Analyze Repository
            </Button>
            <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
              <FileSearch className="w-5 h-5 mr-2" />
              View Sample SBOM
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-success" />
              </div>
              <h3 className="text-lg font-semibold text-primary-foreground mb-2">Security First</h3>
              <p className="text-primary-foreground/80">Identify vulnerabilities and compliance issues</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <GitBranch className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-primary-foreground mb-2">Complete Analysis</h3>
              <p className="text-primary-foreground/80">Deep dependency tree scanning</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-warning/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileSearch className="w-8 h-8 text-warning" />
              </div>
              <h3 className="text-lg font-semibold text-primary-foreground mb-2">Standards Compliant</h3>
              <p className="text-primary-foreground/80">SPDX, CycloneDX, and SWID formats</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};