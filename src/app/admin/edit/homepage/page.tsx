"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  ArrowLeft,
  Save,
  Home,
  Type,
  Image,
  BarChart3,
  MessageSquare,
  DollarSign,
  Eye
} from "lucide-react";

interface HomepageData {
  hero: {
    title: string;
    subtitle: string;
    tagline: string;
    backgroundImage: string;
    ctaText: string;
    secondaryCtaText: string;
  };
  stats: {
    propertiesFlipped: string;
    averageROI: string;
    transparency: string;
  };
  strategy: {
    title: string;
    description: string;
    profitabilityRate: string;
  };
  process: {
    title: string;
    subtitle: string;
    tagline: string;
    steps: {
      title: string;
      description: string;
    }[];
  };
  features: {
    title: string;
    subtitle: string;
    items: {
      title: string;
      description: string;
    }[];
  };
  tracking: {
    purchasePrice: string;
    rehabBudget: string;
    estimatedSale: string;
    projectedProfit: string;
    progress: number;
  };
}

export default function HomepageEditor() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [homepageData, setHomepageData] = useState<HomepageData | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Check authentication
    const session = localStorage.getItem("flipco_admin_session");
    if (session !== "authenticated") {
      router.push("/admin");
      return;
    }
    setIsAuthenticated(true);

    // Load homepage data (in a real app, this would come from an API)
    const initialData: HomepageData = {
      hero: {
        title: "Real Estate Investment",
        subtitle: "Made Transparent",
        tagline: "We Unlock Wealth with Unmatched Ease",
        backgroundImage: "house with swimming pool",
        ctaText: "Start Investing",
        secondaryCtaText: "Watch Demo"
      },
      stats: {
        propertiesFlipped: "50+",
        averageROI: "25%",
        transparency: "100%"
      },
      strategy: {
        title: "True Partnership Investment Model",
        description: "At Flipco Capital, we partner up with investors. Every project is co-owned with the investor under a separate limited liability company created for every property.",
        profitabilityRate: "95%"
      },
      process: {
        title: "Our Process",
        subtitle: "Simple, transparent, and profitable",
        tagline: "We Unlock Wealth with Unmatched Ease",
        steps: [
          {
            title: "We Find the Deals",
            description: "Our expert team identifies undervalued properties with high profit potential using proven market analysis and acquisition strategies."
          },
          {
            title: "You Invest",
            description: "Choose from our vetted investment opportunities. Each project forms a separate LLC where you become our co-owner and capital partner."
          },
          {
            title: "We Execute & Profit",
            description: "We handle all renovation work with complete transparency. Track progress live and receive your returns when the property sells."
          }
        ]
      },
      features: {
        title: "Platform Features",
        subtitle: "Advanced technology for complete investment transparency",
        items: [
          {
            title: "Live Video Feed",
            description: "24/7 access to live video streams of your property renovation progress."
          },
          {
            title: "Cost Tracking",
            description: "Real-time breakdown of all project costs with actual vs estimated comparisons."
          },
          {
            title: "Legal Protection",
            description: "Each investment is protected under its own LLC structure for maximum security."
          },
          {
            title: "Profit Projections",
            description: "Detailed financial projections updated throughout the project lifecycle."
          },
          {
            title: "Full Transparency",
            description: "Complete visibility into every aspect of your investment from start to finish."
          },
          {
            title: "Partnership Model",
            description: "True partnership where you and Flipco Capital are co-owners of every project."
          }
        ]
      },
      tracking: {
        purchasePrice: "$180,000",
        rehabBudget: "$45,000",
        estimatedSale: "$285,000",
        projectedProfit: "$60,000",
        progress: 75
      }
    };

    setHomepageData(initialData);
  }, [router]);

  const handleSave = async () => {
    setIsSaving(true);
    setSaveMessage("");

    // Simulate save delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    setSaveMessage("✅ Homepage content saved successfully!");
    setIsSaving(false);

    // Clear message after 3 seconds
    setTimeout(() => setSaveMessage(""), 3000);
  };

  const updateHero = (field: keyof HomepageData['hero'], value: string) => {
    if (!homepageData) return;
    setHomepageData({
      ...homepageData,
      hero: {
        ...homepageData.hero,
        [field]: value
      }
    });
  };

  const updateStats = (field: keyof HomepageData['stats'], value: string) => {
    if (!homepageData) return;
    setHomepageData({
      ...homepageData,
      stats: {
        ...homepageData.stats,
        [field]: value
      }
    });
  };

  const updateStrategy = (field: keyof HomepageData['strategy'], value: string) => {
    if (!homepageData) return;
    setHomepageData({
      ...homepageData,
      strategy: {
        ...homepageData.strategy,
        [field]: value
      }
    });
  };

  const updateProcessStep = (index: number, field: 'title' | 'description', value: string) => {
    if (!homepageData) return;
    const updatedSteps = [...homepageData.process.steps];
    updatedSteps[index] = {
      ...updatedSteps[index],
      [field]: value
    };
    setHomepageData({
      ...homepageData,
      process: {
        ...homepageData.process,
        steps: updatedSteps
      }
    });
  };

  const updateFeature = (index: number, field: 'title' | 'description', value: string) => {
    if (!homepageData) return;
    const updatedItems = [...homepageData.features.items];
    updatedItems[index] = {
      ...updatedItems[index],
      [field]: value
    };
    setHomepageData({
      ...homepageData,
      features: {
        ...homepageData.features,
        items: updatedItems
      }
    });
  };

  const updateTracking = (field: keyof HomepageData['tracking'], value: string | number) => {
    if (!homepageData) return;
    setHomepageData({
      ...homepageData,
      tracking: {
        ...homepageData.tracking,
        [field]: value
      }
    });
  };

  if (!isAuthenticated || !homepageData) {
    return <div className="min-h-screen bg-slate-100 flex items-center justify-center">
      <p>Loading homepage editor...</p>
    </div>;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Button
                variant="ghost"
                onClick={() => router.push("/admin/dashboard")}
                className="mr-4"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              <div>
                <h1 className="text-xl font-bold text-slate-900">Homepage Editor</h1>
                <p className="text-sm text-slate-500">Edit your website's main content</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {saveMessage && (
                <Alert className="max-w-md">
                  <AlertDescription>{saveMessage}</AlertDescription>
                </Alert>
              )}
              <Button
                variant="outline"
                onClick={() => window.open("/", "_blank")}
              >
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
              <Button
                onClick={handleSave}
                disabled={isSaving}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Save className="h-4 w-4 mr-2" />
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="hero" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="hero">Hero Section</TabsTrigger>
            <TabsTrigger value="stats">Statistics</TabsTrigger>
            <TabsTrigger value="strategy">Strategy</TabsTrigger>
            <TabsTrigger value="process">Process</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="tracking">Live Tracking</TabsTrigger>
          </TabsList>

          {/* Hero Section */}
          <TabsContent value="hero" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Home className="h-5 w-5" />
                  Hero Section
                </CardTitle>
                <CardDescription>Main headline and call-to-action area</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Main Title</Label>
                    <Input
                      id="title"
                      value={homepageData.hero.title}
                      onChange={(e) => updateHero('title', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="subtitle">Subtitle</Label>
                    <Input
                      id="subtitle"
                      value={homepageData.hero.subtitle}
                      onChange={(e) => updateHero('subtitle', e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="tagline">Tagline</Label>
                  <Input
                    id="tagline"
                    value={homepageData.hero.tagline}
                    onChange={(e) => updateHero('tagline', e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="backgroundImage">Background Image Description</Label>
                  <Input
                    id="backgroundImage"
                    value={homepageData.hero.backgroundImage}
                    onChange={(e) => updateHero('backgroundImage', e.target.value)}
                    placeholder="e.g., house with swimming pool"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="ctaText">Primary Button Text</Label>
                    <Input
                      id="ctaText"
                      value={homepageData.hero.ctaText}
                      onChange={(e) => updateHero('ctaText', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="secondaryCtaText">Secondary Button Text</Label>
                    <Input
                      id="secondaryCtaText"
                      value={homepageData.hero.secondaryCtaText}
                      onChange={(e) => updateHero('secondaryCtaText', e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Statistics */}
          <TabsContent value="stats" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Key Statistics
                </CardTitle>
                <CardDescription>Homepage statistics section</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="propertiesFlipped">Properties Flipped</Label>
                    <Input
                      id="propertiesFlipped"
                      value={homepageData.stats.propertiesFlipped}
                      onChange={(e) => updateStats('propertiesFlipped', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="averageROI">Average ROI</Label>
                    <Input
                      id="averageROI"
                      value={homepageData.stats.averageROI}
                      onChange={(e) => updateStats('averageROI', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="transparency">Transparency</Label>
                    <Input
                      id="transparency"
                      value={homepageData.stats.transparency}
                      onChange={(e) => updateStats('transparency', e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Strategy */}
          <TabsContent value="strategy" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Type className="h-5 w-5" />
                  Investment Strategy
                </CardTitle>
                <CardDescription>Partnership model and profitability information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="strategyTitle">Section Title</Label>
                  <Input
                    id="strategyTitle"
                    value={homepageData.strategy.title}
                    onChange={(e) => updateStrategy('title', e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="strategyDescription">Description</Label>
                  <Textarea
                    id="strategyDescription"
                    value={homepageData.strategy.description}
                    onChange={(e) => updateStrategy('description', e.target.value)}
                    rows={4}
                  />
                </div>

                <div>
                  <Label htmlFor="profitabilityRate">Profitability Rate</Label>
                  <Input
                    id="profitabilityRate"
                    value={homepageData.strategy.profitabilityRate}
                    onChange={(e) => updateStrategy('profitabilityRate', e.target.value)}
                    placeholder="e.g., 95%"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Process */}
          <TabsContent value="process" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Our Process Section
                </CardTitle>
                <CardDescription>Three-step process explanation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="processTitle">Section Title</Label>
                    <Input
                      id="processTitle"
                      value={homepageData.process.title}
                      onChange={(e) => setHomepageData({
                        ...homepageData,
                        process: { ...homepageData.process, title: e.target.value }
                      })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="processSubtitle">Subtitle</Label>
                    <Input
                      id="processSubtitle"
                      value={homepageData.process.subtitle}
                      onChange={(e) => setHomepageData({
                        ...homepageData,
                        process: { ...homepageData.process, subtitle: e.target.value }
                      })}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  {homepageData.process.steps.map((step, index) => (
                    <Card key={index} className="p-4">
                      <h4 className="font-medium mb-3">Step {index + 1}</h4>
                      <div className="space-y-3">
                        <div>
                          <Label htmlFor={`step${index}Title`}>Title</Label>
                          <Input
                            id={`step${index}Title`}
                            value={step.title}
                            onChange={(e) => updateProcessStep(index, 'title', e.target.value)}
                          />
                        </div>
                        <div>
                          <Label htmlFor={`step${index}Description`}>Description</Label>
                          <Textarea
                            id={`step${index}Description`}
                            value={step.description}
                            onChange={(e) => updateProcessStep(index, 'description', e.target.value)}
                            rows={3}
                          />
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Features */}
          <TabsContent value="features" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Image className="h-5 w-5" />
                  Platform Features
                </CardTitle>
                <CardDescription>Technology and transparency features</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="featuresTitle">Section Title</Label>
                    <Input
                      id="featuresTitle"
                      value={homepageData.features.title}
                      onChange={(e) => setHomepageData({
                        ...homepageData,
                        features: { ...homepageData.features, title: e.target.value }
                      })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="featuresSubtitle">Subtitle</Label>
                    <Input
                      id="featuresSubtitle"
                      value={homepageData.features.subtitle}
                      onChange={(e) => setHomepageData({
                        ...homepageData,
                        features: { ...homepageData.features, subtitle: e.target.value }
                      })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {homepageData.features.items.map((feature, index) => (
                    <Card key={index} className="p-4">
                      <h4 className="font-medium mb-3">Feature {index + 1}</h4>
                      <div className="space-y-3">
                        <div>
                          <Label htmlFor={`feature${index}Title`}>Title</Label>
                          <Input
                            id={`feature${index}Title`}
                            value={feature.title}
                            onChange={(e) => updateFeature(index, 'title', e.target.value)}
                          />
                        </div>
                        <div>
                          <Label htmlFor={`feature${index}Description`}>Description</Label>
                          <Textarea
                            id={`feature${index}Description`}
                            value={feature.description}
                            onChange={(e) => updateFeature(index, 'description', e.target.value)}
                            rows={2}
                          />
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Live Tracking */}
          <TabsContent value="tracking" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Live Project Tracking
                </CardTitle>
                <CardDescription>Featured project tracking widget</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="purchasePrice">Purchase Price</Label>
                    <Input
                      id="purchasePrice"
                      value={homepageData.tracking.purchasePrice}
                      onChange={(e) => updateTracking('purchasePrice', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="rehabBudget">Rehab Budget</Label>
                    <Input
                      id="rehabBudget"
                      value={homepageData.tracking.rehabBudget}
                      onChange={(e) => updateTracking('rehabBudget', e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="estimatedSale">Estimated Sale</Label>
                    <Input
                      id="estimatedSale"
                      value={homepageData.tracking.estimatedSale}
                      onChange={(e) => updateTracking('estimatedSale', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="projectedProfit">Projected Profit</Label>
                    <Input
                      id="projectedProfit"
                      value={homepageData.tracking.projectedProfit}
                      onChange={(e) => updateTracking('projectedProfit', e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="progress">Project Progress (%)</Label>
                  <Input
                    id="progress"
                    type="number"
                    min="0"
                    max="100"
                    value={homepageData.tracking.progress}
                    onChange={(e) => updateTracking('progress', parseInt(e.target.value) || 0)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
