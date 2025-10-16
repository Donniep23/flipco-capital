"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Save,
  Plus,
  Trash2,
  Users,
  Home,
  TrendingUp,
  DollarSign,
  Check
} from "lucide-react";

interface InvestorProject {
  projectId: string;
  projectName: string;
  investment: number;
  status: string;
  progress: number;
  estimatedReturn: number;
}

interface Investor {
  id: string;
  name: string;
  email: string;
  totalInvested: number;
  activeProjects: number;
  projects: InvestorProject[];
}

interface AvailableProject {
  id: string;
  name: string;
  address: string;
  status: string;
}

export default function InvestorPortfoliosEditor() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [investors, setInvestors] = useState<Investor[]>([]);
  const [selectedInvestor, setSelectedInvestor] = useState<Investor | null>(null);
  const [availableProjects, setAvailableProjects] = useState<AvailableProject[]>([]);
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

    // Load investors from localStorage
    const savedInvestors = localStorage.getItem("flipco_investors");
    if (savedInvestors) {
      setInvestors(JSON.parse(savedInvestors));
    } else {
      // Default investors
      const defaultInvestors: Investor[] = [
        {
          id: "investor-1",
          name: "John Stevens",
          email: "john@example.com",
          totalInvested: 425000,
          activeProjects: 3,
          projects: [
            {
              projectId: "project-1",
              projectName: "Oakwood Renovation",
              investment: 150000,
              status: "In Progress",
              progress: 75,
              estimatedReturn: 187500
            },
            {
              projectId: "project-2",
              projectName: "Sparks St Renovation",
              investment: 125000,
              status: "Completed",
              progress: 100,
              estimatedReturn: 156250
            },
            {
              projectId: "project-3",
              projectName: "Maple Street Flip",
              investment: 150000,
              status: "Planning",
              progress: 15,
              estimatedReturn: 195000
            }
          ]
        }
      ];
      setInvestors(defaultInvestors);
      localStorage.setItem("flipco_investors", JSON.stringify(defaultInvestors));
    }

    // Available projects from your portfolio
    setAvailableProjects([
      { id: "oakwood", name: "Oakwood Renovation", address: "123 Oakwood Dr, Austin, TX", status: "In Progress" },
      { id: "sparks-st", name: "Sparks St Renovation", address: "3820 Sparks St, Houston, TX", status: "Completed" },
      { id: "maple-street", name: "Maple Street Flip", address: "789 Maple St, Houston, TX", status: "Planning" },
      { id: "katy-fwy", name: "Katy Fwy Flip", address: "8211 Katy Fwy, Houston, TX", status: "In Progress" },
      { id: "laurel-rose", name: "Laurel Rose Project", address: "1834 Laurel Rose Ln, Houston, TX", status: "Completed" },
      { id: "roger-rd", name: "Roger Rd Project", address: "9907 Rogers Rd, Houston, TX", status: "Completed" }
    ]);
  }, [router]);

  const handleSaveInvestor = async (investor: Investor) => {
    setIsSaving(true);
    setSaveMessage("");

    // Recalculate totals
    const totalInvested = investor.projects.reduce((sum, p) => sum + p.investment, 0);
    const activeProjects = investor.projects.filter(p => p.status !== "Completed").length;

    const updatedInvestor = {
      ...investor,
      totalInvested,
      activeProjects
    };

    // Update investors array
    const updatedInvestors = investors.map(inv =>
      inv.id === investor.id ? updatedInvestor : inv
    );
    setInvestors(updatedInvestors);
    setSelectedInvestor(updatedInvestor);

    // Save to localStorage
    localStorage.setItem("flipco_investors", JSON.stringify(updatedInvestors));

    setSaveMessage(`✅ ${investor.name}'s portfolio saved successfully!`);
    setIsSaving(false);

    setTimeout(() => setSaveMessage(""), 3000);
  };

  const handleAddNewInvestor = () => {
    const newInvestor: Investor = {
      id: `investor-${Date.now()}`,
      name: "New Investor",
      email: "investor@example.com",
      totalInvested: 0,
      activeProjects: 0,
      projects: []
    };

    const updatedInvestors = [...investors, newInvestor];
    setInvestors(updatedInvestors);
    localStorage.setItem("flipco_investors", JSON.stringify(updatedInvestors));
    setSelectedInvestor(newInvestor);
  };

  const handleAddProjectToInvestor = () => {
    if (!selectedInvestor) return;

    const newProject: InvestorProject = {
      projectId: `project-${Date.now()}`,
      projectName: "Select Project",
      investment: 50000,
      status: "Planning",
      progress: 0,
      estimatedReturn: 62500
    };

    const updatedInvestor = {
      ...selectedInvestor,
      projects: [...selectedInvestor.projects, newProject]
    };
    setSelectedInvestor(updatedInvestor);
  };

  const handleRemoveProject = (projectId: string) => {
    if (!selectedInvestor) return;

    const updatedInvestor = {
      ...selectedInvestor,
      projects: selectedInvestor.projects.filter(p => p.projectId !== projectId)
    };
    setSelectedInvestor(updatedInvestor);
  };

  const handleUpdateProject = (projectId: string, field: string, value: string | number) => {
    if (!selectedInvestor) return;

    const updatedProjects = selectedInvestor.projects.map(p =>
      p.projectId === projectId ? { ...p, [field]: value } : p
    );
    setSelectedInvestor({
      ...selectedInvestor,
      projects: updatedProjects
    });
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
                <h1 className="text-xl font-bold text-slate-900">Investor Portfolio Manager</h1>
                <p className="text-sm text-slate-500">Assign projects to investor portfolios</p>
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
          {/* Investors List */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Investors ({investors.length})
                    </CardTitle>
                    <CardDescription>Select to manage</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  {investors.map((investor) => (
                    <div
                      key={investor.id}
                      className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                        selectedInvestor?.id === investor.id
                          ? "bg-blue-50 border-blue-200"
                          : "hover:bg-slate-50"
                      }`}
                      onClick={() => setSelectedInvestor(investor)}
                    >
                      <p className="font-medium text-sm">{investor.name}</p>
                      <p className="text-xs text-slate-500">{investor.activeProjects} active projects</p>
                      <p className="text-xs text-slate-600 font-semibold mt-1">
                        ${investor.totalInvested.toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
                <Button
                  onClick={handleAddNewInvestor}
                  className="w-full"
                  variant="outline"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Investor
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Investor Portfolio Editor */}
          <div className="lg:col-span-3">
            {selectedInvestor ? (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Investor Information</CardTitle>
                    <CardDescription>Basic investor details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={selectedInvestor.name}
                          onChange={(e) => setSelectedInvestor({
                            ...selectedInvestor,
                            name: e.target.value
                          })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={selectedInvestor.email}
                          onChange={(e) => setSelectedInvestor({
                            ...selectedInvestor,
                            email: e.target.value
                          })}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 rounded-lg">
                      <div>
                        <p className="text-sm text-slate-600">Total Invested</p>
                        <p className="text-2xl font-bold text-slate-900">
                          ${selectedInvestor.projects.reduce((sum, p) => sum + p.investment, 0).toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-600">Active Projects</p>
                        <p className="text-2xl font-bold text-blue-600">
                          {selectedInvestor.projects.filter(p => p.status !== "Completed").length}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <Home className="h-5 w-5" />
                          Portfolio Projects ({selectedInvestor.projects.length})
                        </CardTitle>
                        <CardDescription>Assign and manage projects for this investor</CardDescription>
                      </div>
                      <Button onClick={handleAddProjectToInvestor}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Project
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {selectedInvestor.projects.length > 0 ? (
                      <div className="space-y-4">
                        {selectedInvestor.projects.map((project) => (
                          <div key={project.projectId} className="p-4 border rounded-lg space-y-4">
                            <div className="flex items-center justify-between">
                              <h4 className="font-semibold">{project.projectName}</h4>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleRemoveProject(project.projectId)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label>Select Project</Label>
                                <Select
                                  value={project.projectId}
                                  onValueChange={(value) => {
                                    const selectedProj = availableProjects.find(p => p.id === value);
                                    handleUpdateProject(project.projectId, "projectId", value);
                                    if (selectedProj) {
                                      handleUpdateProject(project.projectId, "projectName", selectedProj.name);
                                      handleUpdateProject(project.projectId, "status", selectedProj.status);
                                    }
                                  }}
                                >
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {availableProjects.map((proj) => (
                                      <SelectItem key={proj.id} value={proj.id}>
                                        {proj.name}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>

                              <div>
                                <Label>Investment Amount</Label>
                                <Input
                                  type="number"
                                  value={project.investment}
                                  onChange={(e) => handleUpdateProject(
                                    project.projectId,
                                    "investment",
                                    parseInt(e.target.value) || 0
                                  )}
                                />
                              </div>

                              <div>
                                <Label>Status</Label>
                                <Select
                                  value={project.status}
                                  onValueChange={(value) => handleUpdateProject(project.projectId, "status", value)}
                                >
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Planning">Planning</SelectItem>
                                    <SelectItem value="In Progress">In Progress</SelectItem>
                                    <SelectItem value="Completed">Completed</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>

                              <div>
                                <Label>Progress (%)</Label>
                                <Input
                                  type="number"
                                  min="0"
                                  max="100"
                                  value={project.progress}
                                  onChange={(e) => handleUpdateProject(
                                    project.projectId,
                                    "progress",
                                    parseInt(e.target.value) || 0
                                  )}
                                />
                              </div>

                              <div>
                                <Label>Estimated Return</Label>
                                <Input
                                  type="number"
                                  value={project.estimatedReturn}
                                  onChange={(e) => handleUpdateProject(
                                    project.projectId,
                                    "estimatedReturn",
                                    parseInt(e.target.value) || 0
                                  )}
                                />
                              </div>

                              <div className="flex items-end">
                                <div className="bg-green-50 p-3 rounded-lg w-full">
                                  <p className="text-xs text-green-700">Estimated Profit</p>
                                  <p className="text-lg font-bold text-green-600">
                                    +${(project.estimatedReturn - project.investment).toLocaleString()}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 text-slate-500">
                        <Home className="h-12 w-12 mx-auto mb-4 text-slate-300" />
                        <p>No projects assigned yet</p>
                        <p className="text-sm">Click "Add Project" to assign a project to this investor</p>
                      </div>
                    )}

                    <Separator className="my-6" />

                    <Button
                      onClick={() => handleSaveInvestor(selectedInvestor)}
                      disabled={isSaving}
                      className="bg-blue-600 hover:bg-blue-700 w-full"
                      size="lg"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      {isSaving ? "Saving Portfolio..." : "Save Portfolio Changes"}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card>
                <CardContent className="flex items-center justify-center h-64">
                  <div className="text-center">
                    <Users className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-slate-900 mb-2">Select an Investor</h3>
                    <p className="text-slate-600">Choose an investor from the list to manage their portfolio</p>
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
