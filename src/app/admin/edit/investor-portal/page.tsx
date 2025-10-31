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
  DollarSign,
  Settings,
  Eye,
  TrendingUp,
  Shield,
  Users,
  BarChart3,
  PieChart
} from "lucide-react";

interface InvestorPortalData {
  welcome: {
    title: string;
    subtitle: string;
    description: string;
  };
  registration: {
    title: string;
    subtitle: string;
    minimumInvestment: string;
    investmentTiers: {
      name: string;
      minimum: string;
      maximum: string;
      benefits: string[];
    }[];
  };
  dashboard: {
    title: string;
    subtitle: string;
    features: {
      title: string;
      description: string;
    }[];
  };
  investments: {
    title: string;
    subtitle: string;
    riskDisclosure: string;
    expectedReturns: string;
    timeline: string;
  };
  legal: {
    title: string;
    subtitle: string;
    disclosures: string[];
    riskFactors: string[];
  };
  support: {
    title: string;
    subtitle: string;
    contactMethods: {
      method: string;
      details: string;
    }[];
  };
}

export default function InvestorPortalEditor() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [investorData, setInvestorData] = useState<InvestorPortalData | null>(null);
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

    // Load investor portal data
    const initialData: InvestorPortalData = {
      welcome: {
        title: "Welcome to Your Investment Portal",
        subtitle: "Transparent Real Estate Investment with Guaranteed Returns",
        description: "Access your investment portfolio, track project progress in real-time, and monitor your returns with complete transparency. Our co-ownership model ensures you're a true partner in every investment."
      },
      registration: {
        title: "Investor Registration",
        subtitle: "Join our exclusive investment opportunities",
        minimumInvestment: "$50,000",
        investmentTiers: [
          {
            name: "Bronze Investor",
            minimum: "$50,000",
            maximum: "$74,999",
            benefits: [
              "Quarterly investment opportunities",
              "Basic project updates",
              "Standard return rates",
              "Email support"
            ]
          },
          {
            name: "Silver Investor",
            minimum: "$75,000",
            maximum: "$99,999",
            benefits: [
              "Monthly investment opportunities",
              "Detailed project updates",
              "Priority project access",
              "Phone and email support",
              "Enhanced return rates"
            ]
          },
          {
            name: "Gold Investor",
            minimum: "$100,000",
            maximum: "Unlimited",
            benefits: [
              "Exclusive investment opportunities",
              "Real-time project monitoring",
              "VIP project access",
              "Dedicated account manager",
              "Premium return rates",
              "In-person consultations"
            ]
          }
        ]
      },
      dashboard: {
        title: "Investor Dashboard",
        subtitle: "Complete transparency and control over your investments",
        features: [
          {
            title: "Portfolio Overview",
            description: "View all your active investments, returns, and performance metrics"
          },
          {
            title: "Live Project Tracking",
            description: "Real-time updates on renovation progress with photo documentation"
          },
          {
            title: "Financial Analytics",
            description: "Detailed breakdowns of costs, profits, and projected returns"
          },
          {
            title: "Document Library",
            description: "Access all investment documents, contracts, and legal paperwork"
          },
          {
            title: "Communication Hub",
            description: "Direct messaging with project managers and support team"
          },
          {
            title: "Investment Opportunities",
            description: "Browse and invest in new opportunities matching your criteria"
          }
        ]
      },
      investments: {
        title: "Investment Structure",
        subtitle: "How our co-ownership model works",
        riskDisclosure: "All real estate investments carry inherent risks including market volatility, construction delays, and potential losses. Past performance does not guarantee future results.",
        expectedReturns: "Historical average returns of 25-35% annually, with projects typically completing within 3-6 months.",
        timeline: "Most projects are completed within 3-6 months from acquisition to sale, with regular milestone updates throughout the process."
      },
      legal: {
        title: "Legal Information",
        subtitle: "Important disclosures and risk factors",
        disclosures: [
          "All investments are structured as Limited Liability Company (LLC) partnerships",
          "Investors become co-owners of the property during the renovation period",
          "Returns are distributed based on ownership percentage in each project LLC",
          "Investment minimums and terms vary by project and investor tier",
          "All investments are subject to market conditions and property-specific risks"
        ],
        riskFactors: [
          "Real estate market volatility",
          "Construction cost overruns",
          "Unexpected property issues",
          "Permitting and regulatory delays",
          "Market demand fluctuations",
          "Interest rate changes"
        ]
      },
      support: {
        title: "Investor Support",
        subtitle: "We're here to help with your investment journey",
        contactMethods: [
          {
            method: "Phone Support",
            details: "(555) 123-4567 - Business hours: Mon-Fri 9AM-6PM CST"
          },
          {
            method: "Email Support",
            details: "invest@flipcocapital.com - Response within 24 hours"
          },
          {
            method: "Live Chat",
            details: "Available on your dashboard during business hours"
          },
          {
            method: "Dedicated Account Manager",
            details: "Available for Gold tier investors and above"
          }
        ]
      }
    };

    setInvestorData(initialData);
  }, [router]);

  const handleSave = async () => {
    setIsSaving(true);
    setSaveMessage("");

    // Simulate save delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    setSaveMessage("✅ Investor portal content saved successfully!");
    setIsSaving(false);

    // Clear message after 3 seconds
    setTimeout(() => setSaveMessage(""), 3000);
  };

  const updateWelcome = (field: keyof InvestorPortalData['welcome'], value: string) => {
    if (!investorData) return;
    setInvestorData({
      ...investorData,
      welcome: {
        ...investorData.welcome,
        [field]: value
      }
    });
  };

  const updateRegistration = (field: keyof InvestorPortalData['registration'], value: string) => {
    if (!investorData) return;
    setInvestorData({
      ...investorData,
      registration: {
        ...investorData.registration,
        [field]: value
      }
    });
  };

  const updateInvestments = (field: keyof InvestorPortalData['investments'], value: string) => {
    if (!investorData) return;
    setInvestorData({
      ...investorData,
      investments: {
        ...investorData.investments,
        [field]: value
      }
    });
  };

  if (!isAuthenticated || !investorData) {
    return <div className="min-h-screen bg-slate-100 flex items-center justify-center">
      <p>Loading investor portal editor...</p>
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
                <h1 className="text-xl font-bold text-slate-900">Investor Portal Editor</h1>
                <p className="text-sm text-slate-500">Manage investor portal content and settings</p>
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
                onClick={() => window.open("/login", "_blank")}
              >
                <Eye className="h-4 w-4 mr-2" />
                Preview Portal
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
        <Tabs defaultValue="welcome" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="welcome">Welcome</TabsTrigger>
            <TabsTrigger value="registration">Registration</TabsTrigger>
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="investments">Investments</TabsTrigger>
            <TabsTrigger value="legal">Legal</TabsTrigger>
            <TabsTrigger value="support">Support</TabsTrigger>
          </TabsList>

          {/* Welcome Section */}
          <TabsContent value="welcome" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Welcome Section
                </CardTitle>
                <CardDescription>Main landing page content for investors</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="welcomeTitle">Main Title</Label>
                  <Input
                    id="welcomeTitle"
                    value={investorData.welcome.title}
                    onChange={(e) => updateWelcome('title', e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="welcomeSubtitle">Subtitle</Label>
                  <Input
                    id="welcomeSubtitle"
                    value={investorData.welcome.subtitle}
                    onChange={(e) => updateWelcome('subtitle', e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="welcomeDescription">Description</Label>
                  <Textarea
                    id="welcomeDescription"
                    value={investorData.welcome.description}
                    onChange={(e) => updateWelcome('description', e.target.value)}
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Registration Section */}
          <TabsContent value="registration" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Registration & Investment Tiers
                </CardTitle>
                <CardDescription>Investment minimums and tier benefits</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="regTitle">Registration Title</Label>
                    <Input
                      id="regTitle"
                      value={investorData.registration.title}
                      onChange={(e) => updateRegistration('title', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="regSubtitle">Registration Subtitle</Label>
                    <Input
                      id="regSubtitle"
                      value={investorData.registration.subtitle}
                      onChange={(e) => updateRegistration('subtitle', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="minimumInvestment">Minimum Investment</Label>
                    <Input
                      id="minimumInvestment"
                      value={investorData.registration.minimumInvestment}
                      onChange={(e) => updateRegistration('minimumInvestment', e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-4">Investment Tiers</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {investorData.registration.investmentTiers.map((tier, index) => (
                      <Card key={index} className="p-4">
                        <h5 className="font-medium mb-3">{tier.name}</h5>
                        <div className="space-y-2">
                          <div>
                            <Label className="text-xs">Minimum</Label>
                            <Input
                              value={tier.minimum}
                              onChange={(e) => {
                                const updatedTiers = [...investorData.registration.investmentTiers];
                                updatedTiers[index].minimum = e.target.value;
                                setInvestorData({
                                  ...investorData,
                                  registration: {
                                    ...investorData.registration,
                                    investmentTiers: updatedTiers
                                  }
                                });
                              }}
                            />
                          </div>
                          <div>
                            <Label className="text-xs">Maximum</Label>
                            <Input
                              value={tier.maximum}
                              onChange={(e) => {
                                const updatedTiers = [...investorData.registration.investmentTiers];
                                updatedTiers[index].maximum = e.target.value;
                                setInvestorData({
                                  ...investorData,
                                  registration: {
                                    ...investorData.registration,
                                    investmentTiers: updatedTiers
                                  }
                                });
                              }}
                            />
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Investments Section */}
          <TabsContent value="investments" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Investment Structure
                </CardTitle>
                <CardDescription>Investment terms, returns, and timeline information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="expectedReturns">Expected Returns</Label>
                  <Input
                    id="expectedReturns"
                    value={investorData.investments.expectedReturns}
                    onChange={(e) => updateInvestments('expectedReturns', e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="timeline">Project Timeline</Label>
                  <Input
                    id="timeline"
                    value={investorData.investments.timeline}
                    onChange={(e) => updateInvestments('timeline', e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="riskDisclosure">Risk Disclosure</Label>
                  <Textarea
                    id="riskDisclosure"
                    value={investorData.investments.riskDisclosure}
                    onChange={(e) => updateInvestments('riskDisclosure', e.target.value)}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Other tabs content would go here */}
          <TabsContent value="dashboard" className="space-y-6">
            <Card>
              <CardContent className="flex items-center justify-center h-64">
                <div className="text-center">
                  <PieChart className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-slate-900 mb-2">Dashboard Configuration</h3>
                  <p className="text-slate-600">Configure investor dashboard features and analytics</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="legal" className="space-y-6">
            <Card>
              <CardContent className="flex items-center justify-center h-64">
                <div className="text-center">
                  <Shield className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-slate-900 mb-2">Legal & Compliance</h3>
                  <p className="text-slate-600">Manage legal disclosures and risk factors</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="support" className="space-y-6">
            <Card>
              <CardContent className="flex items-center justify-center h-64">
                <div className="text-center">
                  <Users className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-slate-900 mb-2">Support Configuration</h3>
                  <p className="text-slate-600">Configure investor support options and contact methods</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
