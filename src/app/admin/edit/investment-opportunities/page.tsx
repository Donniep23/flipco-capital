"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import ImageUploader from "@/components/ImageUploader";
import {
  ArrowLeft,
  Save,
  Plus,
  Trash2,
  Image as ImageIcon,
  Home,
  DollarSign
} from "lucide-react";

interface InvestmentOpportunity {
  id: string;
  name: string;
  address: string;
  beds: number;
  baths: number;
  sqft: number;
  status: string;
  statusColor: string;
  roi: number;
  projectedProfit: number;
  purchasePrice: number;
  renovationBudget: number;
  estimatedARV: number;
  timeline: string;
  image: string;
  investmentTiers: {
    bronze: number;
    silver: number;
    gold: number;
  };
}

export default function InvestmentOpportunitiesEditor() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [opportunities, setOpportunities] = useState<InvestmentOpportunity[]>([]);
  const [selectedOpportunity, setSelectedOpportunity] = useState<InvestmentOpportunity | null>(null);
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

    // Load opportunities from localStorage or use defaults
    const savedOpportunities = localStorage.getItem("flipco_investment_opportunities");
    if (savedOpportunities) {
      setOpportunities(JSON.parse(savedOpportunities));
    } else {
      // Default opportunities
      const defaultOpportunities: InvestmentOpportunity[] = [
        {
          id: "maple-ridge",
          name: "Maple Ridge Drive",
          address: "Westfield, TX • 3 bed, 2 bath • 1,850 sq ft",
          beds: 3,
          baths: 2,
          sqft: 1850,
          status: "Available Now",
          statusColor: "green",
          roi: 32,
          projectedProfit: 67500,
          purchasePrice: 195000,
          renovationBudget: 52500,
          estimatedARV: 325000,
          timeline: "4 months",
          image: "https://images.unsplash.com/photo-1449844908441-8829872d2607?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          investmentTiers: {
            bronze: 28,
            silver: 30,
            gold: 32
          }
        },
        {
          id: "oakmont-circle",
          name: "Oakmont Circle",
          address: "Sugar Land, TX • 4 bed, 3 bath • 2,340 sq ft",
          beds: 4,
          baths: 3,
          sqft: 2340,
          status: "Starting Soon",
          statusColor: "orange",
          roi: 29,
          projectedProfit: 81200,
          purchasePrice: 245000,
          renovationBudget: 63800,
          estimatedARV: 400000,
          timeline: "5 months",
          image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          investmentTiers: {
            bronze: 25,
            silver: 27,
            gold: 29
          }
        }
      ];
      setOpportunities(defaultOpportunities);
    }
  }, [router]);

  const handleSaveOpportunity = async (opportunity: InvestmentOpportunity) => {
    setIsSaving(true);
    setSaveMessage("");

    // Update opportunities array
    const updatedOpportunities = opportunities.map(o =>
      o.id === opportunity.id ? opportunity : o
    );
    setOpportunities(updatedOpportunities);

    // Save to localStorage
    localStorage.setItem("flipco_investment_opportunities", JSON.stringify(updatedOpportunities));

    setSaveMessage(`✅ ${opportunity.name} saved successfully!`);
    setIsSaving(false);

    setTimeout(() => setSaveMessage(""), 3000);
  };

  const handleAddNewOpportunity = () => {
    const newOpportunity: InvestmentOpportunity = {
      id: `opportunity-${Date.now()}`,
      name: "New Property",
      address: "City, TX • 3 bed, 2 bath • 1,500 sq ft",
      beds: 3,
      baths: 2,
      sqft: 1500,
      status: "Available Now",
      statusColor: "green",
      roi: 25,
      projectedProfit: 50000,
      purchasePrice: 150000,
      renovationBudget: 40000,
      estimatedARV: 250000,
      timeline: "4 months",
      image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=600&fit=crop",
      investmentTiers: {
        bronze: 23,
        silver: 25,
        gold: 27
      }
    };

    const updatedOpportunities = [...opportunities, newOpportunity];
    setOpportunities(updatedOpportunities);
    localStorage.setItem("flipco_investment_opportunities", JSON.stringify(updatedOpportunities));
    setSelectedOpportunity(newOpportunity);
  };

  const handleDeleteOpportunity = (id: string) => {
    if (confirm("Are you sure you want to delete this investment opportunity?")) {
      const updatedOpportunities = opportunities.filter(o => o.id !== id);
      setOpportunities(updatedOpportunities);
      localStorage.setItem("flipco_investment_opportunities", JSON.stringify(updatedOpportunities));
      setSelectedOpportunity(null);
      setSaveMessage("✅ Opportunity deleted successfully!");
      setTimeout(() => setSaveMessage(""), 3000);
    }
  };

  if (!isAuthenticated) {
    return <div className="min-h-screen bg-slate-100 flex items-center justify-center">
      <p>Checking authentication...</p>
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
                <h1 className="text-xl font-bold text-slate-900">Investment Opportunities Manager</h1>
                <p className="text-sm text-slate-500">Manage properties shown on homepage</p>
              </div>
            </div>

            {saveMessage && (
              <Alert className="max-w-md">
                <AlertDescription>{saveMessage}</AlertDescription>
              </Alert>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Opportunities List */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Home className="h-5 w-5" />
                      Opportunities ({opportunities.length})
                    </CardTitle>
                    <CardDescription>Click to edit</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  {opportunities.map((opportunity) => (
                    <div
                      key={opportunity.id}
                      className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                        selectedOpportunity?.id === opportunity.id
                          ? "bg-blue-50 border-blue-200"
                          : "hover:bg-slate-50"
                      }`}
                      onClick={() => setSelectedOpportunity(opportunity)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-sm">{opportunity.name}</p>
                          <p className="text-xs text-slate-500">{opportunity.roi}% ROI</p>
                        </div>
                        <Badge
                          variant={opportunity.statusColor === "green" ? "default" : "secondary"}
                          className="text-xs"
                        >
                          {opportunity.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
                <Button
                  onClick={handleAddNewOpportunity}
                  className="w-full"
                  variant="outline"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Property
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Opportunity Editor */}
          <div className="lg:col-span-3">
            {selectedOpportunity ? (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Edit Investment Opportunity</CardTitle>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteOpportunity(selectedOpportunity.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                  <CardDescription>Update property details and investment information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Basic Information */}
                  <div>
                    <h3 className="font-semibold mb-4">Basic Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Property Name</Label>
                        <Input
                          id="name"
                          value={selectedOpportunity.name}
                          onChange={(e) => setSelectedOpportunity({
                            ...selectedOpportunity,
                            name: e.target.value
                          })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="address">Address Display</Label>
                        <Input
                          id="address"
                          value={selectedOpportunity.address}
                          onChange={(e) => setSelectedOpportunity({
                            ...selectedOpportunity,
                            address: e.target.value
                          })}
                          placeholder="City, TX • 3 bed, 2 bath • 1,500 sq ft"
                        />
                      </div>
                      <div>
                        <Label htmlFor="status">Status</Label>
                        <Select
                          value={selectedOpportunity.status}
                          onValueChange={(value) => setSelectedOpportunity({
                            ...selectedOpportunity,
                            status: value
                          })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Available Now">Available Now</SelectItem>
                            <SelectItem value="Starting Soon">Starting Soon</SelectItem>
                            <SelectItem value="Fully Funded">Fully Funded</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="statusColor">Status Badge Color</Label>
                        <Select
                          value={selectedOpportunity.statusColor}
                          onValueChange={(value) => setSelectedOpportunity({
                            ...selectedOpportunity,
                            statusColor: value
                          })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="green">Green</SelectItem>
                            <SelectItem value="orange">Orange</SelectItem>
                            <SelectItem value="blue">Blue</SelectItem>
                            <SelectItem value="red">Red</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <ImageUploader
                          label="Property Image (Drag & Drop or Click)"
                          currentImage={selectedOpportunity.image}
                          onImageUpload={(base64) => setSelectedOpportunity({
                            ...selectedOpportunity,
                            image: base64
                          })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="timeline">Timeline</Label>
                        <Input
                          id="timeline"
                          value={selectedOpportunity.timeline}
                          onChange={(e) => setSelectedOpportunity({
                            ...selectedOpportunity,
                            timeline: e.target.value
                          })}
                          placeholder="4 months"
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Financial Information */}
                  <div>
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                      <DollarSign className="h-5 w-5" />
                      Financial Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="purchasePrice">Purchase Price</Label>
                        <Input
                          id="purchasePrice"
                          type="number"
                          value={selectedOpportunity.purchasePrice}
                          onChange={(e) => setSelectedOpportunity({
                            ...selectedOpportunity,
                            purchasePrice: parseInt(e.target.value) || 0
                          })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="renovationBudget">Renovation Budget</Label>
                        <Input
                          id="renovationBudget"
                          type="number"
                          value={selectedOpportunity.renovationBudget}
                          onChange={(e) => setSelectedOpportunity({
                            ...selectedOpportunity,
                            renovationBudget: parseInt(e.target.value) || 0
                          })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="estimatedARV">Estimated ARV</Label>
                        <Input
                          id="estimatedARV"
                          type="number"
                          value={selectedOpportunity.estimatedARV}
                          onChange={(e) => setSelectedOpportunity({
                            ...selectedOpportunity,
                            estimatedARV: parseInt(e.target.value) || 0
                          })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="projectedProfit">Projected Profit</Label>
                        <Input
                          id="projectedProfit"
                          type="number"
                          value={selectedOpportunity.projectedProfit}
                          onChange={(e) => setSelectedOpportunity({
                            ...selectedOpportunity,
                            projectedProfit: parseInt(e.target.value) || 0
                          })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="roi">ROI (%)</Label>
                        <Input
                          id="roi"
                          type="number"
                          value={selectedOpportunity.roi}
                          onChange={(e) => setSelectedOpportunity({
                            ...selectedOpportunity,
                            roi: parseInt(e.target.value) || 0
                          })}
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Investment Tiers */}
                  <div>
                    <h3 className="font-semibold mb-4">Investment Tiers ROI (%)</h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="bronze">Bronze ($50K-$74K)</Label>
                        <Input
                          id="bronze"
                          type="number"
                          value={selectedOpportunity.investmentTiers.bronze}
                          onChange={(e) => setSelectedOpportunity({
                            ...selectedOpportunity,
                            investmentTiers: {
                              ...selectedOpportunity.investmentTiers,
                              bronze: parseInt(e.target.value) || 0
                            }
                          })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="silver">Silver ($75K-$99K)</Label>
                        <Input
                          id="silver"
                          type="number"
                          value={selectedOpportunity.investmentTiers.silver}
                          onChange={(e) => setSelectedOpportunity({
                            ...selectedOpportunity,
                            investmentTiers: {
                              ...selectedOpportunity.investmentTiers,
                              silver: parseInt(e.target.value) || 0
                            }
                          })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="gold">Gold ($100K+)</Label>
                        <Input
                          id="gold"
                          type="number"
                          value={selectedOpportunity.investmentTiers.gold}
                          onChange={(e) => setSelectedOpportunity({
                            ...selectedOpportunity,
                            investmentTiers: {
                              ...selectedOpportunity.investmentTiers,
                              gold: parseInt(e.target.value) || 0
                            }
                          })}
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <Button
                    onClick={() => handleSaveOpportunity(selectedOpportunity)}
                    disabled={isSaving}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {isSaving ? "Saving..." : "Save Changes"}
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="flex items-center justify-center h-64">
                  <div className="text-center">
                    <Home className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-slate-900 mb-2">Select an Opportunity</h3>
                    <p className="text-slate-600">Choose a property from the list to edit or add a new one</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
