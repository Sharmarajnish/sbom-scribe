import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { 
  Upload, 
  Link, 
  Download, 
  FileText, 
  Shield, 
  AlertTriangle,
  CheckCircle,
  GitBranch,
  Package
} from "lucide-react";

interface SBOMComponent {
  name: string;
  version: string;
  license: string;
  vulnerabilities: number;
  type: string;
}

export const SBOMGenerator = () => {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [repoUrl, setRepoUrl] = useState("");
  const [results, setResults] = useState<SBOMComponent[] | null>(null);

  const mockComponents: SBOMComponent[] = [
    { name: "react", version: "18.3.1", license: "MIT", vulnerabilities: 0, type: "library" },
    { name: "express", version: "4.18.2", license: "MIT", vulnerabilities: 1, type: "framework" },
    { name: "lodash", version: "4.17.20", license: "MIT", vulnerabilities: 2, type: "utility" },
    { name: "@types/node", version: "20.5.0", license: "MIT", vulnerabilities: 0, type: "dev-dependency" },
    { name: "axios", version: "1.4.0", license: "MIT", vulnerabilities: 0, type: "library" },
  ];

  const handleGenerate = async () => {
    if (!repoUrl.trim()) {
      toast({
        title: "Repository URL Required",
        description: "Please enter a repository URL to analyze",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    setProgress(0);
    setResults(null);

    // Simulate SBOM generation process
    const steps = [
      "Cloning repository...",
      "Scanning dependencies...",
      "Analyzing security vulnerabilities...",
      "Generating SBOM report...",
      "Processing complete!"
    ];

    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setProgress(((i + 1) / steps.length) * 100);
      
      toast({
        title: "Processing",
        description: steps[i],
      });
    }

    setResults(mockComponents);
    setIsGenerating(false);
    
    toast({
      title: "SBOM Generated Successfully",
      description: `Found ${mockComponents.length} components with ${mockComponents.reduce((sum, c) => sum + c.vulnerabilities, 0)} vulnerabilities`,
    });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      toast({
        title: "File Upload",
        description: `${file.name} uploaded successfully`,
      });
    }
  };

  const totalVulnerabilities = results?.reduce((sum, component) => sum + component.vulnerabilities, 0) || 0;

  return (
    <section className="py-16 px-6">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Generate Your SBOM</h2>
          <p className="text-lg text-muted-foreground">
            Choose your input method and get a comprehensive analysis of your software components
          </p>
        </div>

        <Card className="p-8 bg-gradient-card shadow-large border-border/50">
          <Tabs defaultValue="repository" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="repository" className="flex items-center gap-2">
                <Link className="w-4 h-4" />
                Repository URL
              </TabsTrigger>
              <TabsTrigger value="upload" className="flex items-center gap-2">
                <Upload className="w-4 h-4" />
                Upload Files
              </TabsTrigger>
            </TabsList>

            <TabsContent value="repository" className="space-y-6">
              <div className="space-y-4">
                <Label htmlFor="repo-url" className="text-base font-medium">
                  Repository URL
                </Label>
                <Input
                  id="repo-url"
                  type="url"
                  placeholder="https://github.com/username/repository"
                  value={repoUrl}
                  onChange={(e) => setRepoUrl(e.target.value)}
                  className="text-base h-12"
                />
                <p className="text-sm text-muted-foreground">
                  Supports GitHub, GitLab, Bitbucket, and other Git repositories
                </p>
              </div>
            </TabsContent>

            <TabsContent value="upload" className="space-y-6">
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <Label htmlFor="file-upload" className="text-base font-medium cursor-pointer">
                  Drop files here or click to upload
                </Label>
                <Input
                  id="file-upload"
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <p className="text-sm text-muted-foreground mt-2">
                  Upload package.json, requirements.txt, pom.xml, or entire project folders
                </p>
              </div>
            </TabsContent>

            {isGenerating && (
              <div className="space-y-4 mt-8">
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-2">Generating SBOM...</h3>
                  <Progress value={progress} className="w-full max-w-md mx-auto" />
                  <p className="text-sm text-muted-foreground mt-2">{progress.toFixed(0)}% complete</p>
                </div>
              </div>
            )}

            <div className="flex justify-center mt-8">
              <Button
                onClick={handleGenerate}
                disabled={isGenerating}
                size="lg"
                className="bg-gradient-primary hover:opacity-90 transition-opacity"
              >
                {isGenerating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Generating SBOM...
                  </>
                ) : (
                  <>
                    <Shield className="w-5 h-5 mr-2" />
                    Generate SBOM
                  </>
                )}
              </Button>
            </div>
          </Tabs>
        </Card>

        {results && (
          <Card className="mt-8 p-8 bg-gradient-card shadow-large">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold flex items-center gap-2">
                  <FileText className="w-6 h-6 text-primary" />
                  SBOM Results
                </h3>
                <p className="text-muted-foreground">
                  {results.length} components analyzed
                </p>
              </div>
              <Button variant="outline" className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                Download SBOM
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center p-4 bg-success/10 rounded-lg border border-success/20">
                <CheckCircle className="w-8 h-8 text-success mx-auto mb-2" />
                <div className="text-2xl font-bold text-success">
                  {results.filter(c => c.vulnerabilities === 0).length}
                </div>
                <p className="text-sm text-success/80">Secure Components</p>
              </div>
              <div className="text-center p-4 bg-warning/10 rounded-lg border border-warning/20">
                <AlertTriangle className="w-8 h-8 text-warning mx-auto mb-2" />
                <div className="text-2xl font-bold text-warning">{totalVulnerabilities}</div>
                <p className="text-sm text-warning/80">Vulnerabilities Found</p>
              </div>
              <div className="text-center p-4 bg-primary/10 rounded-lg border border-primary/20">
                <Package className="w-8 h-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-primary">{results.length}</div>
                <p className="text-sm text-primary/80">Total Components</p>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-lg font-semibold">Component Details</h4>
              {results.map((component, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-card rounded-lg border border-border shadow-soft"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Package className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h5 className="font-semibold">{component.name}</h5>
                      <p className="text-sm text-muted-foreground">
                        v{component.version} • {component.license} • {component.type}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {component.vulnerabilities > 0 ? (
                      <div className="flex items-center gap-1 text-warning">
                        <AlertTriangle className="w-4 h-4" />
                        <span className="text-sm font-medium">
                          {component.vulnerabilities} vuln{component.vulnerabilities !== 1 ? 's' : ''}
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 text-success">
                        <CheckCircle className="w-4 h-4" />
                        <span className="text-sm font-medium">Secure</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </section>
  );
};