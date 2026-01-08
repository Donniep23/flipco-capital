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
  Users,
  Settings,
  Eye,
  UserPlus,
  Building2,
  Mail,
  Phone,
  MapPin
} from "lucide-react";

interface ContractorPortalData {
  welcome: {
    title: string;
    subtitle: string;
    description: string;
  };
  registration: {
    title: string;
    subtitle: string;
    requirements: string[];
    benefits: string[];
  };
  dashboard: {
    title: string;
    subtitle: string;
    features: {
      title: string;
      description: string;
    }[];
  };
  projects: {
    title: string;
    subtitle: string;
    projectTypes: string[];
  };
  requirements: {
    title: string;
    subtitle: string;
    licensing: string[];
    insurance: string[];
    experience: string[];
  };
  compensation: {
    title: string;
    subtitle: string;
    paymentStructure: string;
    paymentTerms: string;
    bonusStructure: string;
  };
}

export default function ContractorPortalEditor() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [contractorData, setContractorData] = useState<ContractorPortalData | null>(null);
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

    // Load contractor portal data
    const initialData: ContractorPortalData = {
      welcome: {
        title: "Join Our Trusted Contractor Network",
        subtitle: "Partner with Flipco Capital on High-Quality Renovation Projects",
        description: "We're looking for experienced, reliable contractors who share our commitment to excellence. Join our exclusive network and work on premium fix-and-flip projects with guaranteed payment and ongoing opportunities."
      },
      registration: {
        title: "Contractor Registration",
        subtitle: "Apply to become a Flipco Capital contractor partner",
        requirements: [
          "Valid contractor's license",
          "General liability insurance ($1M minimum)",
          "Workers' compensation insurance",
          "3+ years of renovation experience",
          "References from previous clients",
          "Bonded and insured"
        ],
        benefits: [
          "Guaranteed payment within 15 days",
          "Steady stream of projects",
          "Premium project budgets",
          "Long-term partnership opportunities",
          "Performance bonuses available",
          "Direct communication with project managers"
        ]
      },
      dashboard: {
        title: "Contractor Dashboard",
        subtitle: "Manage your projects and track performance",
        features: [
          {
            title: "Active Projects",
            description: "View and manage all your current renovation projects with Flipco Capital"
          },
          {
            title: "Payment Tracking",
            description: "Monitor payment status and history for all completed work"
          },
          {
            title: "Project Documents",
            description: "Access blueprints, specifications, and project requirements"
          },
          {
            title: "Communication Hub",
            description: "Direct messaging with project managers and support team"
          },
          {
            title: "Performance Metrics",
            description: "Track your completion times, quality ratings, and performance statistics"
          },
          {
            title: "Bid Opportunities",
            description: "View and bid on new project opportunities in your area"
          }
        ]
      },
      projects: {
        title: "Project Types",
        subtitle: "Renovation categories available to contractors",
        projectTypes: [
          "Complete home renovations",
          "Kitchen remodeling",
          "Bathroom renovations",
          "Flooring installation",
          "Electrical work",
          "Plumbing upgrades",
          "HVAC installation",
          "Exterior improvements",
          "Landscaping projects",
          "Specialty trades work"
        ]
      },
      requirements: {
        title: "Contractor Requirements",
        subtitle: "Standards and qualifications for partnership",
        licensing: [
          "Valid general contractor license",
          "Specialty trade licenses as applicable",
          "Current license in good standing",
          "Local permit pulling authority"
        ],
        insurance: [
          "General liability: $1M minimum",
          "Workers' compensation: As required by state",
          "Commercial auto insurance",
          "Professional liability coverage"
        ],
        experience: [
          "Minimum 3 years in renovation/construction",
          "Portfolio of completed projects",
          "References from previous clients",
          "Demonstrated quality workmanship"
        ]
      },
      compensation: {
        title: "Compensation Structure",
        subtitle: "Fair and competitive payment terms",
        paymentStructure: "Fixed-price contracts based on detailed scope of work with milestone payments",
        paymentTerms: "Payment within 15 days of milestone completion and approval",
        bonusStructure: "Performance bonuses for early completion and exceptional quality"
      }
    };

    setContractorData(initialData);
  }, [router]);

  const handleSave = async () => {
    setIsSaving(true);
    setSaveMessage("");

    // Simulate save delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    setSaveMessage("✅ Contractor portal content saved successfully!");
    setIsSaving(false);

    // Clear message after 3 seconds
    setTimeout(() => setSaveMessage(""), 3000);
  };

  const updateWelcome = (field: keyof ContractorPortalData['welcome'], value: string) => {
    if (!contractorData) return;
    setContractorData({
      ...contractorData,
      welcome: {
        ...contractorData.welcome,
        [field]: value
      }
    });
  };

  const updateRegistration = (field: keyof ContractorPortalData['registration'], value: string | string[]) => {
    if (!contractorData) return;
    setContractorData({
      ...contractorData,
      registration: {
        ...contractorData.registration,
        [field]: value
      }
    });
  };

  const updateCompensation = (field: keyof ContractorPortalData['compensation'], value: string) => {
    if (!contractorData) return;
    setContractorData({
      ...contractorData,
      compensation: {
        ...contractorData.compensation,
        [field]: value
      }
    });
  };

  const addRequirement = (category: 'requirements' | 'benefits') => {
    if (!contractorData) return;
    const updated = { ...contractorData };
    if (category === 'requirements') {
      updated.registration.requirements.push("New requirement");
    } else {
      updated.registration.benefits.push("New benefit");
    }
    setContractorData(updated);
  };

  const removeRequirement = (category: 'requirements' | 'benefits', index: number) => {
    if (!contractorData) return;
    const updated = { ...contractorData };
    if (category === 'requirements') {
      updated.registration.requirements.splice(index, 1);
    } else {
      updated.registration.benefits.splice(index, 1);
    }
    setContractorData(updated);
  };

  const updateRequirement = (category: 'requirements' | 'benefits', index: number, value: string) => {
    if (!contractorData) return;
    const updated = { ...contractorData };
    if (category === 'requirements') {
      updated.registration.requirements[index] = value;
    } else {
      updated.registration.benefits[index] = value;
    }
    setContractorData(updated);
  };

  if (!isAuthenticated || !contractorData) {
    return <div className="min-h-screen bg-slate-100 flex items-center justify-center">
      <p>Loading contractor portal editor...</p>
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
                <h1 className="text-xl font-bold text-slate-900">Contractor Portal Editor</h1>
                <p className="text-sm text-slate-500">Manage contractor portal content and settings</p>
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
                onClick={() => window.open("/contractor-login", "_blank")}
              >
                <Eye className="h-4 w-4 mr-2" />
                Preview Portal
              </Button>
              <Button
                onClick={handleSave}
                disabled={isSaving}
                className="bg-green-600 hover:bg-green-700"
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
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="requirements">Requirements</TabsTrigger>
            <TabsTrigger value="compensation">Compensation</TabsTrigger>
          </TabsList>

          {/* Welcome Section */}
          <TabsContent value="welcome" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Welcome Section
                </CardTitle>
                <CardDescription>Main landing page content for contractors</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="welcomeTitle">Main Title</Label>
                  <Input
                    id="welcomeTitle"
                    value={contractorData.welcome.title}
                    onChange={(e) => updateWelcome('title', e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="welcomeSubtitle">Subtitle</Label>
                  <Input
                    id="welcomeSubtitle"
                    value={contractorData.welcome.subtitle}
                    onChange={(e) => updateWelcome('subtitle', e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="welcomeDescription">Description</Label>
                  <Textarea
                    id="welcomeDescription"
                    value={contractorData.welcome.description}
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
                  <UserPlus className="h-5 w-5" />
                  Registration Content
                </CardTitle>
                <CardDescription>Registration page content and requirements</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="regTitle">Registration Title</Label>
                    <Input
                      id="regTitle"
                      value={contractorData.registration.title}
                      onChange={(e) => updateRegistration('title', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="regSubtitle">Registration Subtitle</Label>
                    <Input
                      id="regSubtitle"
                      value={contractorData.registration.subtitle}
                      onChange={(e) => updateRegistration('subtitle', e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Requirements */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label>Requirements</Label>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => addRequirement('requirements')}
                      >
                        <UserPlus className="h-4 w-4 mr-2" />
                        Add Requirement
                      </Button>
                    </div>
                    <div className="space-y-2">
                      {contractorData.registration.requirements.map((req, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Input
                            value={req}
                            onChange={(e) => updateRequirement('requirements', index, e.target.value)}
                            placeholder="Enter requirement"
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeRequirement('requirements', index)}
                          >
                            ✕
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Benefits */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label>Benefits</Label>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => addRequirement('benefits')}
                      >
                        <UserPlus className="h-4 w-4 mr-2" />
                        Add Benefit
                      </Button>
                    </div>
                    <div className="space-y-2">
                      {contractorData.registration.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Input
                            value={benefit}
                            onChange={(e) => updateRequirement('benefits', index, e.target.value)}
                            placeholder="Enter benefit"
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeRequirement('benefits', index)}
                          >
                            ✕
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Compensation Section */}
          <TabsContent value="compensation" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Compensation Structure
                </CardTitle>
                <CardDescription>Payment terms and compensation details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="paymentStructure">Payment Structure</Label>
                  <Textarea
                    id="paymentStructure"
                    value={contractorData.compensation.paymentStructure}
                    onChange={(e) => updateCompensation('paymentStructure', e.target.value)}
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="paymentTerms">Payment Terms</Label>
                  <Input
                    id="paymentTerms"
                    value={contractorData.compensation.paymentTerms}
                    onChange={(e) => updateCompensation('paymentTerms', e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="bonusStructure">Bonus Structure</Label>
                  <Input
                    id="bonusStructure"
                    value={contractorData.compensation.bonusStructure}
                    onChange={(e) => updateCompensation('bonusStructure', e.target.value)}
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
                  <Settings className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-slate-900 mb-2">Dashboard Settings</h3>
                  <p className="text-slate-600">Configure contractor dashboard features and layout</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="projects" className="space-y-6">
            <Card>
              <CardContent className="flex items-center justify-center h-64">
                <div className="text-center">
                  <Building2 className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-slate-900 mb-2">Project Types</h3>
                  <p className="text-slate-600">Manage available project categories for contractors</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="requirements" className="space-y-6">
            <Card>
              <CardContent className="flex items-center justify-center h-64">
                <div className="text-center">
                  <Users className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-slate-900 mb-2">Requirements Management</h3>
                  <p className="text-slate-600">Configure contractor licensing and insurance requirements</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
