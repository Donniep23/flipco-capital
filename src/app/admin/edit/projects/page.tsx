"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import ImageUploader from "@/components/ImageUploader";
import {
  ArrowLeft,
  Save,
  Plus,
  Trash2,
  Image,
  Edit3,
  CheckCircle,
  Clock,
  Calendar,
  DollarSign,
  MapPin,
  Building2
} from "lucide-react";

interface Project {
  id: string;
  name: string;
  address: string;
  status: string;
  category: string;
  purchasePrice?: number;
  rehabCost?: number;
  rehabBudget?: number;
  salePrice?: number;
  estimatedSale?: number;
  totalProfit?: number;
  projectedProfit?: number;
  roi: number;
  timeline: string;
  startDate: string;
  completionDate?: string;
  estimatedCompletion?: string;
  progress?: number;
  beforeImage: string;
  afterImage: string;
  beforeImages?: string[];
  afterImages?: string[];
  description: string;
  highlights: string[];
}

export default function ProjectsEditor() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
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

    // Load projects data (in a real app, this would come from an API)
    const initialProjects: Project[] = [
      {
        id: "sunset-manor",
        name: "Sparks St Renovation",
        address: "3820 Sparks St, Houston, TX 77093",
        status: "Completed",
        category: "completed",
        purchasePrice: 145000,
        rehabCost: 38000,
        salePrice: 245000,
        totalProfit: 62000,
        roi: 34,
        timeline: "3 months",
        startDate: "2023-10-01",
        completionDate: "2023-12-20",
        beforeImage: "https://ugc.same-assets.com/2FRg6heNgEzAGcNZHwsXPd0YotrLGoh_.jpeg",
        afterImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
        beforeImages: [
          "https://ugc.same-assets.com/2FRg6heNgEzAGcNZHwsXPd0YotrLGoh_.jpeg",
          "https://ugc.same-assets.com/PJuyR_4fDbx6YG0rRxElNt9yfMKdLCC6.jpeg",
          "https://ugc.same-assets.com/F84bUiy8ZM04JWCxSP3ibRXdmPRjcAXW.jpeg",
          "https://ugc.same-assets.com/F067_JfXzMQjY0qJ-Wvitav8c5vCbs2k.jpeg",
          "https://ugc.same-assets.com/6s0fqiJiS0Pr7RvVoFRCzpG5BU9z0rCJ.jpeg",
          "https://ugc.same-assets.com/57nvRarNo1MNUF9Oi052de6L7vdNtBjO.jpeg",
          "https://ugc.same-assets.com/7CRWtSZyNgnsLAcHg98Cvgvv02zxqGC4.jpeg",
          "https://ugc.same-assets.com/v-7QeITUpJSdvQn02VyUrKF4aOO4FcsB.jpeg"
        ],
        description: "Complete transformation of this Houston property from dated interior to modern living space.",
        highlights: ["Red chevron accent wall removal", "Dark cabinet modernization", "Tile to hardwood conversion", "Complete interior transformation"]
      },
      {
        id: "oakwood-modern",
        name: "Katy Fwy Flip",
        address: "8211 Katy Fwy #8 Houston, TX 77024",
        status: "In Progress",
        category: "active",
        purchasePrice: 180000,
        rehabBudget: 45000,
        estimatedSale: 285000,
        projectedProfit: 60000,
        roi: 27,
        timeline: "4 months",
        progress: 75,
        startDate: "2024-01-15",
        estimatedCompletion: "2024-04-15",
        beforeImage: "/projects/katy-fwy/main-living-before.jpg",
        afterImage: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop",
        beforeImages: Array.from({length: 10}, (_, i) => `/projects/katy-fwy/photo-${i+1}-before.jpg`),
        description: "Contemporary renovation of a 1960s home featuring modern design elements.",
        highlights: ["Smart home automation", "Energy-efficient windows", "Modern kitchen design", "Landscaping overhaul"]
      },
      {
        id: "maple-victorian",
        name: "Laurel Rose Project",
        address: "1834 laurel rose ln Houston, TX 77014",
        status: "Completed",
        category: "completed",
        purchasePrice: 220000,
        rehabCost: 65000,
        salePrice: 385000,
        totalProfit: 100000,
        roi: 35,
        timeline: "5 months",
        startDate: "2023-06-01",
        completionDate: "2023-10-30",
        beforeImage: "/projects/laurel-rose/living-room-before.jpg",
        afterImage: "/projects/laurel-rose/living-room-after.jpg",
        beforeImages: Array.from({length: 7}, (_, i) => `/projects/laurel-rose/room-${i+1}-before.jpg`),
        afterImages: Array.from({length: 7}, (_, i) => `/projects/laurel-rose/room-${i+1}-after.jpg`),
        description: "Historic Victorian home restoration preserving original character while adding modern amenities.",
        highlights: ["Historical preservation", "Original hardwood restoration", "Period-appropriate fixtures", "Modern kitchen integration"]
      },
      {
        id: "cedar-ranch",
        name: "Roger Rd Project",
        address: "9907 rogers rd Houston, TX 77070",
        status: "Completed",
        category: "completed",
        purchasePrice: 165000,
        rehabCost: 42000,
        salePrice: 275000,
        totalProfit: 68000,
        roi: 33,
        timeline: "3.5 months",
        startDate: "2023-08-15",
        completionDate: "2023-11-30",
        beforeImage: "https://ugc.same-assets.com/dK_tKBSN7yZL1KTmwtQrKn3IZlFes1Nl.jpeg",
        afterImage: "https://ugc.same-assets.com/g04_Z6PEmtQI_Iq8hYBrLeElt2wBg8Ix.jpeg",
        beforeImages: Array.from({length: 18}, (_, i) => `/projects/roger-rd/area-${i+1}-before.jpg`),
        afterImages: Array.from({length: 18}, (_, i) => `/projects/roger-rd/area-${i+1}-after.jpg`),
        description: "Mid-century ranch home updated with contemporary finishes while maintaining its original charm.",
        highlights: ["Outdoor deck addition", "Updated electrical", "Modern lighting design", "Landscaping renovation"]
      }
    ];

    setProjects(initialProjects);
  }, [router]);

  const handleSaveProject = async (project: Project) => {
    setIsSaving(true);
    setSaveMessage("");

    // Simulate save delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Update projects array
    setProjects(prev => prev.map(p => p.id === project.id ? project : p));

    setSaveMessage(`✅ ${project.name} saved successfully!`);
    setIsSaving(false);

    // Clear message after 3 seconds
    setTimeout(() => setSaveMessage(""), 3000);
  };

  const addNewHighlight = (project: Project) => {
    const updated = {
      ...project,
      highlights: [...project.highlights, "New highlight"]
    };
    setSelectedProject(updated);
  };

  const removeHighlight = (project: Project, index: number) => {
    const updated = {
      ...project,
      highlights: project.highlights.filter((_, i) => i !== index)
    };
    setSelectedProject(updated);
  };

  const updateHighlight = (project: Project, index: number, value: string) => {
    const updated = {
      ...project,
      highlights: project.highlights.map((h, i) => i === index ? value : h)
    };
    setSelectedProject(updated);
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
                <h1 className="text-xl font-bold text-slate-900">Projects Editor</h1>
                <p className="text-sm text-slate-500">Manage investment projects and galleries</p>
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
          {/* Projects List */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Projects ({projects.length})
                </CardTitle>
                <CardDescription>Select a project to edit</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {projects.map((project) => (
                    <div
                      key={project.id}
                      className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                        selectedProject?.id === project.id
                          ? "bg-blue-50 border-blue-200"
                          : "hover:bg-slate-50"
                      }`}
                      onClick={() => setSelectedProject(project)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-sm">{project.name}</p>
                          <p className="text-xs text-slate-500">{project.address}</p>
                        </div>
                        <Badge
                          variant={project.status === "Completed" ? "default" : "secondary"}
                          className="text-xs"
                        >
                          {project.status === "Completed" ? <CheckCircle className="h-3 w-3 mr-1" /> : <Clock className="h-3 w-3 mr-1" />}
                          {project.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Project Editor */}
          <div className="lg:col-span-3">
            {selectedProject ? (
              <Tabs defaultValue="basic" className="space-y-6">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="basic">Basic Info</TabsTrigger>
                  <TabsTrigger value="financial">Financial</TabsTrigger>
                  <TabsTrigger value="gallery">Gallery</TabsTrigger>
                  <TabsTrigger value="content">Content</TabsTrigger>
                </TabsList>

                {/* Basic Information */}
                <TabsContent value="basic" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Basic Project Information</CardTitle>
                      <CardDescription>Core project details and status</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Project Name</Label>
                          <Input
                            id="name"
                            value={selectedProject.name}
                            onChange={(e) => setSelectedProject({
                              ...selectedProject,
                              name: e.target.value
                            })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="status">Status</Label>
                          <Select
                            value={selectedProject.status}
                            onValueChange={(value: string) => setSelectedProject({
                              ...selectedProject,
                              status: value
                            })}
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
                      </div>

                      <div>
                        <Label htmlFor="address">Address</Label>
                        <Input
                          id="address"
                          value={selectedProject.address}
                          onChange={(e) => setSelectedProject({
                            ...selectedProject,
                            address: e.target.value
                          })}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="timeline">Timeline</Label>
                          <Input
                            id="timeline"
                            value={selectedProject.timeline}
                            onChange={(e) => setSelectedProject({
                              ...selectedProject,
                              timeline: e.target.value
                            })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="startDate">Start Date</Label>
                          <Input
                            id="startDate"
                            type="date"
                            value={selectedProject.startDate}
                            onChange={(e) => setSelectedProject({
                              ...selectedProject,
                              startDate: e.target.value
                            })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="completionDate">
                            {selectedProject.status === "Completed" ? "Completion Date" : "Estimated Completion"}
                          </Label>
                          <Input
                            id="completionDate"
                            type="date"
                            value={selectedProject.completionDate || selectedProject.estimatedCompletion || ""}
                            onChange={(e) => setSelectedProject({
                              ...selectedProject,
                              ...(selectedProject.status === "Completed"
                                ? { completionDate: e.target.value }
                                : { estimatedCompletion: e.target.value }
                              )
                            })}
                          />
                        </div>
                      </div>

                      {selectedProject.status === "In Progress" && (
                        <div>
                          <Label htmlFor="progress">Progress (%)</Label>
                          <Input
                            id="progress"
                            type="number"
                            min="0"
                            max="100"
                            value={selectedProject.progress || 0}
                            onChange={(e) => setSelectedProject({
                              ...selectedProject,
                              progress: parseInt(e.target.value) || 0
                            })}
                          />
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Financial Information */}
                <TabsContent value="financial" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <DollarSign className="h-5 w-5" />
                        Financial Details
                      </CardTitle>
                      <CardDescription>Project costs, profits, and ROI</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="purchasePrice">Purchase Price</Label>
                          <Input
                            id="purchasePrice"
                            type="number"
                            value={selectedProject.purchasePrice || ""}
                            onChange={(e) => setSelectedProject({
                              ...selectedProject,
                              purchasePrice: parseInt(e.target.value) || 0
                            })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="rehabCost">
                            {selectedProject.status === "Completed" ? "Rehab Cost" : "Rehab Budget"}
                          </Label>
                          <Input
                            id="rehabCost"
                            type="number"
                            value={selectedProject.rehabCost || selectedProject.rehabBudget || ""}
                            onChange={(e) => setSelectedProject({
                              ...selectedProject,
                              ...(selectedProject.status === "Completed"
                                ? { rehabCost: parseInt(e.target.value) || 0 }
                                : { rehabBudget: parseInt(e.target.value) || 0 }
                              )
                            })}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="salePrice">
                            {selectedProject.status === "Completed" ? "Sale Price" : "Estimated Sale"}
                          </Label>
                          <Input
                            id="salePrice"
                            type="number"
                            value={selectedProject.salePrice || selectedProject.estimatedSale || ""}
                            onChange={(e) => setSelectedProject({
                              ...selectedProject,
                              ...(selectedProject.status === "Completed"
                                ? { salePrice: parseInt(e.target.value) || 0 }
                                : { estimatedSale: parseInt(e.target.value) || 0 }
                              )
                            })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="profit">
                            {selectedProject.status === "Completed" ? "Total Profit" : "Projected Profit"}
                          </Label>
                          <Input
                            id="profit"
                            type="number"
                            value={selectedProject.totalProfit || selectedProject.projectedProfit || ""}
                            onChange={(e) => setSelectedProject({
                              ...selectedProject,
                              ...(selectedProject.status === "Completed"
                                ? { totalProfit: parseInt(e.target.value) || 0 }
                                : { projectedProfit: parseInt(e.target.value) || 0 }
                              )
                            })}
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="roi">ROI (%)</Label>
                        <Input
                          id="roi"
                          type="number"
                          value={selectedProject.roi}
                          onChange={(e) => setSelectedProject({
                            ...selectedProject,
                            roi: parseInt(e.target.value) || 0
                          })}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Gallery Management */}
                <TabsContent value="gallery" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Image className="h-5 w-5" />
                        Photo Gallery Management
                      </CardTitle>
                      <CardDescription>Manage before and after images</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="beforeImage">Main Before Image</Label>
                          <Input
                            id="beforeImage"
                            value={selectedProject.beforeImage}
                            onChange={(e) => setSelectedProject({
                              ...selectedProject,
                              beforeImage: e.target.value
                            })}
                            placeholder="Image URL or path"
                          />
                        </div>
                        <div>
                          <Label htmlFor="afterImage">Main After Image</Label>
                          <Input
                            id="afterImage"
                            value={selectedProject.afterImage}
                            onChange={(e) => setSelectedProject({
                              ...selectedProject,
                              afterImage: e.target.value
                            })}
                            placeholder="Image URL or path"
                          />
                        </div>
                      </div>

                      <div>
                        <Label>Before Images Gallery ({selectedProject.beforeImages?.length || 0} photos)</Label>
                        <div className="mt-2 p-4 border rounded-lg bg-slate-50">
                          <p className="text-sm text-slate-600 mb-2">
                            Current gallery: {selectedProject.beforeImages?.length || 0} before photos
                            {selectedProject.afterImages && ` + ${selectedProject.afterImages.length} after photos`}
                          </p>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">
                              {selectedProject.beforeImages?.length || 0} Before Photos
                            </Badge>
                            {selectedProject.afterImages && (
                              <Badge variant="outline">
                                {selectedProject.afterImages.length} After Photos
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>

                      <Alert>
                        <Image className="h-4 w-4" />
                        <AlertDescription>
                          Photo galleries are configured based on the folder structure in `/public/projects/[project-folder]/`.
                          Upload your photos to the appropriate folder and they will automatically appear in the gallery.
                        </AlertDescription>
                      </Alert>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Content */}
                <TabsContent value="content" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Project Content</CardTitle>
                      <CardDescription>Description and highlights</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="description">Project Description</Label>
                        <Textarea
                          id="description"
                          value={selectedProject.description}
                          onChange={(e) => setSelectedProject({
                            ...selectedProject,
                            description: e.target.value
                          })}
                          rows={4}
                        />
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <Label>Project Highlights</Label>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => addNewHighlight(selectedProject)}
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Add Highlight
                          </Button>
                        </div>
                        <div className="space-y-2">
                          {selectedProject.highlights.map((highlight, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <Input
                                value={highlight}
                                onChange={(e) => updateHighlight(selectedProject, index, e.target.value)}
                                placeholder="Enter highlight"
                              />
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => removeHighlight(selectedProject, index)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Save Button */}
                <div className="flex justify-end">
                  <Button
                    onClick={() => handleSaveProject(selectedProject)}
                    disabled={isSaving}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {isSaving ? "Saving..." : "Save Project"}
                  </Button>
                </div>
              </Tabs>
            ) : (
              <Card>
                <CardContent className="flex items-center justify-center h-64">
                  <div className="text-center">
                    <Building2 className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-slate-900 mb-2">Select a Project</h3>
                    <p className="text-slate-600">Choose a project from the list to start editing</p>
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
