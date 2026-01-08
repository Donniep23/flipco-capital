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
import { Separator } from "@/components/ui/separator";
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
  Building2,
  X,
  Link as LinkIcon,
  RefreshCw
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
  // Track if this project is synced from investment opportunities
  syncedFromOpportunity?: boolean;
  opportunityId?: string;
}

// Hardcoded synced opportunities - these MUST always appear
const HARDCODED_SYNCED_OPPORTUNITIES: Project[] = [
  {
    id: "maple-ridge",
    name: "Maple Ridge Drive",
    address: "Westfield, TX • 3 bed, 2 bath • 1,850 sq ft",
    status: "Planning",
    category: "upcoming",
    purchasePrice: 195000,
    rehabBudget: 52500,
    estimatedSale: 325000,
    projectedProfit: 67500,
    roi: 32,
    timeline: "4 months",
    startDate: new Date().toISOString().split('T')[0],
    beforeImage: "https://images.unsplash.com/photo-1449844908441-8829872d2607?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    afterImage: "https://images.unsplash.com/photo-1449844908441-8829872d2607?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    beforeImages: [],
    afterImages: [],
    description: "Investment opportunity - Maple Ridge Drive. 32% projected ROI with completion in 4 months.",
    highlights: ["32% Projected ROI", "4 months timeline", "Co-ownership through LLC"],
    syncedFromOpportunity: true,
    opportunityId: "maple-ridge"
  },
  {
    id: "oakmont-circle",
    name: "Oakmont Circle",
    address: "Sugar Land, TX • 4 bed, 3 bath • 2,340 sq ft",
    status: "Planning",
    category: "upcoming",
    purchasePrice: 245000,
    rehabBudget: 63800,
    estimatedSale: 400000,
    projectedProfit: 81200,
    roi: 29,
    timeline: "5 months",
    startDate: new Date().toISOString().split('T')[0],
    beforeImage: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    afterImage: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    beforeImages: [],
    afterImages: [],
    description: "Investment opportunity - Oakmont Circle. 29% projected ROI with completion in 5 months.",
    highlights: ["29% Projected ROI", "5 months timeline", "Co-ownership through LLC"],
    syncedFromOpportunity: true,
    opportunityId: "oakmont-circle"
  }
];

export default function ProjectsEditor() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // Initialize with hardcoded synced opportunities
  const [projects, setProjects] = useState<Project[]>(HARDCODED_SYNCED_OPPORTUNITIES);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [debugInfo, setDebugInfo] = useState<string>(""); // Debug info
  const router = useRouter();

  useEffect(() => {
    // Check authentication
    const session = localStorage.getItem("flipco_admin_session");
    if (session !== "authenticated") {
      router.push("/admin");
      return;
    }
    setIsAuthenticated(true);
    loadAllProjects();
  }, [router]);

  const loadAllProjects = async () => {
    setIsLoading(true);
    let debug = "Loading projects...\n";

    // ALWAYS define these fallback defaults first - they will be used if anything fails
    const defaultOpportunities = [
      {
        opportunity_id: "maple-ridge",
        name: "Maple Ridge Drive",
        address: "Westfield, TX • 3 bed, 2 bath • 1,850 sq ft",
        status: "Available Now",
        purchase_price: 195000,
        renovation_budget: 52500,
        estimated_arv: 325000,
        projected_profit: 67500,
        roi: 32,
        timeline: "4 months",
        image: "https://images.unsplash.com/photo-1449844908441-8829872d2607?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      },
      {
        opportunity_id: "oakmont-circle",
        name: "Oakmont Circle",
        address: "Sugar Land, TX • 4 bed, 3 bath • 2,340 sq ft",
        status: "Starting Soon",
        purchase_price: 245000,
        renovation_budget: 63800,
        estimated_arv: 400000,
        projected_profit: 81200,
        roi: 29,
        timeline: "5 months",
        image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      }
    ];

    // Default existing projects
    const existingProjects: Project[] = [
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

    // Create fallback synced projects from default opportunities
    const createSyncedProjects = (opportunities: typeof defaultOpportunities) => {
      return opportunities.map((opp) => ({
        id: opp.opportunity_id,
        name: opp.name,
        address: opp.address,
        status: "Planning",
        category: "upcoming",
        purchasePrice: opp.purchase_price,
        rehabBudget: opp.renovation_budget,
        estimatedSale: opp.estimated_arv,
        projectedProfit: opp.projected_profit,
        roi: opp.roi,
        timeline: opp.timeline,
        startDate: new Date().toISOString().split('T')[0],
        estimatedCompletion: "",
        progress: 0,
        beforeImage: opp.image,
        afterImage: opp.image,
        beforeImages: [] as string[],
        afterImages: [] as string[],
        description: `Investment opportunity - ${opp.name}. ${opp.roi}% projected ROI with completion in ${opp.timeline}.`,
        highlights: [
          `${opp.roi}% Projected ROI`,
          `${opp.timeline} timeline`,
          "Co-ownership through LLC"
        ],
        syncedFromOpportunity: true,
        opportunityId: opp.opportunity_id
      }));
    };

    // Create initial fallback - these will be used if API calls fail
    let finalProjects: Project[] = [...existingProjects, ...createSyncedProjects(defaultOpportunities)];
    debug += `Initial fallback: ${finalProjects.length} projects (${existingProjects.length} existing + ${defaultOpportunities.length} synced)\n`;

    try {
      // Create a map for saved project data
      const savedDataMap = new Map();

      // Try to load saved project data from API (but don't fail if it errors)
      try {
        const projectsResponse = await fetch('/api/projects');
        const projectsResult = await projectsResponse.json();
        debug += `Projects API: ${projectsResult.success ? 'success' : 'failed'}\n`;
        if (projectsResult.success && projectsResult.data) {
          projectsResult.data.forEach((p: { project_id: string }) => {
            savedDataMap.set(p.project_id, p);
          });
        }
      } catch (err) {
        debug += `Projects API error: ${err}\n`;
        // Continue without saved project data
      }

      // Try to load investment opportunities from API
      let opportunitiesData = defaultOpportunities; // Default to fallback
      try {
        const oppResponse = await fetch('/api/investment-opportunities');
        const oppResult = await oppResponse.json();
        debug += `Opportunities API: ${oppResult.success ? 'success' : 'failed'}, count: ${oppResult.data?.length || 0}\n`;

        if (oppResult.success && oppResult.data && oppResult.data.length > 0) {
          opportunitiesData = oppResult.data;
          debug += `Using ${opportunitiesData.length} opportunities from API\n`;
        } else {
          debug += `Using ${defaultOpportunities.length} default opportunities\n`;
        }
      } catch (err) {
        debug += `Opportunities API error: ${err}\n`;
        // Continue with default opportunities
      }

      // Convert investment opportunities to projects with saved data merged
      const investmentOpportunityProjects: Project[] = opportunitiesData.map((opp: {
        opportunity_id: string;
        name: string;
        address: string;
        purchase_price: number;
        renovation_budget: number;
        estimated_arv: number;
        projected_profit: number;
        roi: number;
        timeline: string;
        image: string;
      }) => {
        const savedData = savedDataMap.get(opp.opportunity_id) as Record<string, unknown> | undefined;

        return {
          id: opp.opportunity_id,
          name: opp.name,
          address: opp.address,
          status: (savedData?.status as string) || "Planning",
          category: (savedData?.category as string) || "upcoming",
          purchasePrice: opp.purchase_price,
          rehabBudget: opp.renovation_budget,
          estimatedSale: opp.estimated_arv,
          projectedProfit: opp.projected_profit,
          roi: opp.roi,
          timeline: opp.timeline,
          startDate: (savedData?.start_date as string) || new Date().toISOString().split('T')[0],
          estimatedCompletion: (savedData?.estimated_completion as string) || "",
          progress: (savedData?.progress as number) || 0,
          beforeImage: (savedData?.before_image as string) || opp.image,
          afterImage: (savedData?.after_image as string) || opp.image,
          beforeImages: (savedData?.before_images as string[]) || [],
          afterImages: (savedData?.after_images as string[]) || [],
          description: (savedData?.description as string) || `Investment opportunity - ${opp.name}. ${opp.roi}% projected ROI with completion in ${opp.timeline}.`,
          highlights: (savedData?.highlights as string[]) || [
            `${opp.roi}% Projected ROI`,
            `${opp.timeline} timeline`,
            "Co-ownership through LLC"
          ],
          syncedFromOpportunity: true,
          opportunityId: opp.opportunity_id
        };
      });

      debug += `Created ${investmentOpportunityProjects.length} synced projects\n`;

      // Merge saved data into existing projects
      const mergedExistingProjects = existingProjects.map(project => {
        const savedData = savedDataMap.get(project.id) as Record<string, unknown> | undefined;
        if (savedData) {
          return {
            ...project,
            status: (savedData.status as string) || project.status,
            category: (savedData.category as string) || project.category,
            beforeImage: (savedData.before_image as string) || project.beforeImage,
            afterImage: (savedData.after_image as string) || project.afterImage,
            beforeImages: (savedData.before_images as string[]) || project.beforeImages,
            afterImages: (savedData.after_images as string[]) || project.afterImages,
            description: (savedData.description as string) || project.description,
            highlights: (savedData.highlights as string[]) || project.highlights,
            progress: (savedData.progress as number) ?? project.progress
          };
        }
        return project;
      });

      // Combine all projects - existing first, then investment opportunities
      finalProjects = [...mergedExistingProjects, ...investmentOpportunityProjects];
      debug += `Final: ${finalProjects.length} total projects (${mergedExistingProjects.length} existing + ${investmentOpportunityProjects.length} synced)\n`;
    } catch (error) {
      debug += `Error loading projects: ${error}\n`;
      console.error('Error loading projects:', error);
      // finalProjects already has fallback data
    }

    // ALWAYS set projects - even if everything fails, we have fallbacks
    setProjects(finalProjects);
    setDebugInfo(debug);
    setIsLoading(false);
  };

  const handleSaveProject = async (project: Project) => {
    setIsSaving(true);
    setSaveMessage("");

    try {
      // Save project data to API
      const response = await fetch('/api/projects', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: project.id,
          project_id: project.id,
          name: project.name,
          address: project.address,
          status: project.status,
          category: project.category,
          purchase_price: project.purchasePrice,
          rehab_cost: project.rehabCost,
          rehab_budget: project.rehabBudget,
          sale_price: project.salePrice,
          estimated_sale: project.estimatedSale,
          total_profit: project.totalProfit,
          projected_profit: project.projectedProfit,
          roi: project.roi,
          timeline: project.timeline,
          start_date: project.startDate,
          completion_date: project.completionDate,
          estimated_completion: project.estimatedCompletion,
          progress: project.progress,
          before_image: project.beforeImage,
          after_image: project.afterImage,
          before_images: project.beforeImages,
          after_images: project.afterImages,
          description: project.description,
          highlights: project.highlights,
          synced_from_opportunity: project.syncedFromOpportunity,
          opportunity_id: project.opportunityId
        })
      });

      const result = await response.json();

      if (result.success) {
        // Update projects array
        setProjects(prev => prev.map(p => p.id === project.id ? project : p));
        setSaveMessage(`✅ ${project.name} saved successfully!`);
      } else {
        // If Supabase table doesn't exist yet, save to localStorage as fallback
        console.log('Saving to localStorage as fallback');
        const savedProjects = JSON.parse(localStorage.getItem('flipco_projects') || '{}');
        savedProjects[project.id] = project;
        localStorage.setItem('flipco_projects', JSON.stringify(savedProjects));

        setProjects(prev => prev.map(p => p.id === project.id ? project : p));
        setSaveMessage(`✅ ${project.name} saved successfully!`);
      }
    } catch (error: any) {
      console.error('Error saving project:', error);

      // Fallback to localStorage
      const savedProjects = JSON.parse(localStorage.getItem('flipco_projects') || '{}');
      savedProjects[project.id] = project;
      localStorage.setItem('flipco_projects', JSON.stringify(savedProjects));

      setProjects(prev => prev.map(p => p.id === project.id ? project : p));
      setSaveMessage(`✅ ${project.name} saved (local backup)!`);
    }

    setIsSaving(false);
    setTimeout(() => setSaveMessage(""), 3000);
  };

  const addNewProject = async () => {
    const newProject: Project = {
      id: `project-${Date.now()}`,
      name: "New Project",
      address: "City, TX • 3 bed, 2 bath • 1,500 sq ft",
      status: "Planning",
      category: "upcoming",
      purchasePrice: 150000,
      rehabBudget: 40000,
      estimatedSale: 250000,
      projectedProfit: 50000,
      roi: 25,
      timeline: "4 months",
      startDate: new Date().toISOString().split('T')[0],
      beforeImage: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=600&fit=crop",
      afterImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
      beforeImages: [],
      afterImages: [],
      description: "Enter project description here...",
      highlights: ["Highlight 1", "Highlight 2", "Highlight 3"],
      syncedFromOpportunity: false
    };

    try {
      // Save to database
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          project_id: newProject.id,
          name: newProject.name,
          address: newProject.address,
          status: newProject.status,
          category: newProject.category,
          purchase_price: newProject.purchasePrice,
          rehab_budget: newProject.rehabBudget,
          estimated_sale: newProject.estimatedSale,
          projected_profit: newProject.projectedProfit,
          roi: newProject.roi,
          timeline: newProject.timeline,
          start_date: newProject.startDate,
          before_image: newProject.beforeImage,
          after_image: newProject.afterImage,
          before_images: newProject.beforeImages,
          after_images: newProject.afterImages,
          description: newProject.description,
          highlights: newProject.highlights,
          synced_from_opportunity: false
        })
      });

      const result = await response.json();
      if (result.success) {
        setProjects(prev => [newProject, ...prev]);
        setSelectedProject(newProject);
        setSaveMessage("✅ New project created! Edit the details and save.");
      } else {
        // Fallback to local state
        setProjects(prev => [newProject, ...prev]);
        setSelectedProject(newProject);
        setSaveMessage("✅ New project created locally. Save to sync.");
      }
    } catch (error) {
      console.error('Error creating project:', error);
      setProjects(prev => [newProject, ...prev]);
      setSelectedProject(newProject);
      setSaveMessage("✅ New project created locally. Save to sync.");
    }

    setTimeout(() => setSaveMessage(""), 3000);
  };

  const deleteProject = async (projectId: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      await fetch(`/api/projects?id=${projectId}`, { method: 'DELETE' });
      setProjects(prev => prev.filter(p => p.id !== projectId));
      if (selectedProject?.id === projectId) {
        setSelectedProject(null);
      }
      setSaveMessage("✅ Project deleted successfully!");
    } catch (error) {
      console.error('Error deleting project:', error);
      setSaveMessage("❌ Error deleting project");
    }

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

  const existingProjectsList = projects.filter(p => !p.syncedFromOpportunity);
  const syncedProjectsList = projects.filter(p => p.syncedFromOpportunity);

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
                <p className="text-sm text-slate-500">Manage all projects including synced investment opportunities</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {saveMessage && (
                <Alert className="max-w-md">
                  <AlertDescription>{saveMessage}</AlertDescription>
                </Alert>
              )}
              <Button
                onClick={addNewProject}
                className="bg-green-600 hover:bg-green-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add New Project
              </Button>
              <Button
                variant="outline"
                onClick={loadAllProjects}
                disabled={isLoading}
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Projects List */}
          <div className="lg:col-span-1 space-y-6">
            {/* Existing Projects */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Existing Projects ({existingProjectsList.length})
                </CardTitle>
                <CardDescription>Completed and active projects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {existingProjectsList.map((project) => (
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
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm">{project.name}</p>
                          <p className="text-xs text-slate-500 truncate max-w-[120px]">{project.address}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <Badge
                            variant={project.status === "Completed" ? "default" : "secondary"}
                            className="text-xs"
                          >
                            {project.status === "Completed" ? <CheckCircle className="h-3 w-3 mr-1" /> : <Clock className="h-3 w-3 mr-1" />}
                            {project.status}
                          </Badge>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteProject(project.id);
                            }}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Synced from Investment Opportunities */}
            <Card className="border-orange-200 bg-orange-50/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-700">
                  <LinkIcon className="h-5 w-5" />
                  From Opportunities ({syncedProjectsList.length})
                </CardTitle>
                <CardDescription>Investment opportunities as projects - add before/after photos here!</CardDescription>
              </CardHeader>
              <CardContent>
                {syncedProjectsList.length === 0 ? (
                  <p className="text-sm text-slate-500 text-center py-4">
                    No investment opportunities yet. Add them in the Investment Opportunities Manager.
                  </p>
                ) : (
                  <div className="space-y-2">
                    {syncedProjectsList.map((project) => (
                      <div
                        key={project.id}
                        className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                          selectedProject?.id === project.id
                            ? "bg-orange-100 border-orange-300"
                            : "hover:bg-orange-50 border-orange-200"
                        }`}
                        onClick={() => setSelectedProject(project)}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-sm">{project.name}</p>
                            <p className="text-xs text-slate-500">{project.roi}% ROI</p>
                          </div>
                          <Badge variant="outline" className="text-xs border-orange-300 text-orange-700">
                            <Calendar className="h-3 w-3 mr-1" />
                            Upcoming
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
            {/* Debug info for development */}
            {debugInfo && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-xs text-slate-400">Debug Info</CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="text-xs text-slate-500 whitespace-pre-wrap">{debugInfo}</pre>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Project Editor */}
          <div className="lg:col-span-3">
            {selectedProject ? (
              <Tabs defaultValue="basic" className="space-y-6">
                {/* Synced Project Notice */}
                {selectedProject.syncedFromOpportunity && (
                  <Alert className="bg-orange-50 border-orange-200">
                    <LinkIcon className="h-4 w-4 text-orange-600" />
                    <AlertDescription className="text-orange-800">
                      <strong>Synced from Investment Opportunities</strong> - This project's basic info (name, address, price, ROI) comes from the Investment Opportunities Manager.
                      You can add before/after photos, description, and highlights here!
                    </AlertDescription>
                  </Alert>
                )}

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
                            disabled={selectedProject.syncedFromOpportunity}
                          />
                          {selectedProject.syncedFromOpportunity && (
                            <p className="text-xs text-orange-600 mt-1">Edit in Investment Opportunities Manager</p>
                          )}
                        </div>
                        <div>
                          <Label htmlFor="status">Status</Label>
                          <Select
                            value={selectedProject.status}
                            onValueChange={(value: string) => setSelectedProject({
                              ...selectedProject,
                              status: value,
                              category: value === "Completed" ? "completed" : value === "In Progress" ? "active" : "upcoming"
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
                          disabled={selectedProject.syncedFromOpportunity}
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
                            disabled={selectedProject.syncedFromOpportunity}
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
                            disabled={selectedProject.syncedFromOpportunity}
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
                            disabled={selectedProject.syncedFromOpportunity}
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
                            disabled={selectedProject.syncedFromOpportunity}
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
                          disabled={selectedProject.syncedFromOpportunity}
                        />
                      </div>

                      {selectedProject.syncedFromOpportunity && (
                        <Alert className="bg-orange-50 border-orange-200">
                          <AlertDescription className="text-orange-800">
                            Financial data is synced from Investment Opportunities. To edit pricing and ROI, go to the Investment Opportunities Manager.
                          </AlertDescription>
                        </Alert>
                      )}
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
                      <CardDescription>
                        {selectedProject.syncedFromOpportunity
                          ? "Add before and after photos for this investment opportunity!"
                          : "Manage before and after images"
                        }
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <ImageUploader
                            label="Main Before Image"
                            currentImage={selectedProject.beforeImage}
                            onImageUpload={(base64) => setSelectedProject({
                              ...selectedProject,
                              beforeImage: base64
                            })}
                          />
                        </div>
                        <div>
                          <ImageUploader
                            label="Main After Image"
                            currentImage={selectedProject.afterImage}
                            onImageUpload={(base64) => setSelectedProject({
                              ...selectedProject,
                              afterImage: base64
                            })}
                          />
                        </div>
                      </div>

                      {/* Before Images Gallery */}
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <Label className="text-lg font-semibold">Before Images Gallery ({selectedProject.beforeImages?.length || 0} photos)</Label>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              const updated = { ...selectedProject };
                              if (!updated.beforeImages) updated.beforeImages = [];
                              updated.beforeImages.push("");
                              setSelectedProject(updated);
                            }}
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Add Before Photo
                          </Button>
                        </div>

                        <div className="space-y-4">
                          {selectedProject.beforeImages?.map((image, index) => (
                            <div key={index} className="flex gap-4 items-start">
                              <div className="flex-1">
                                <ImageUploader
                                  label={`Before Photo ${index + 1}`}
                                  currentImage={image}
                                  onImageUpload={(base64) => {
                                    const updated = { ...selectedProject };
                                    if (updated.beforeImages) {
                                      updated.beforeImages[index] = base64;
                                      setSelectedProject(updated);
                                    }
                                  }}
                                />
                              </div>
                              <Button
                                type="button"
                                variant="destructive"
                                size="sm"
                                onClick={() => {
                                  const updated = { ...selectedProject };
                                  if (updated.beforeImages) {
                                    updated.beforeImages = updated.beforeImages.filter((_, i) => i !== index);
                                    setSelectedProject(updated);
                                  }
                                }}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}

                          {(!selectedProject.beforeImages || selectedProject.beforeImages.length === 0) && (
                            <p className="text-sm text-slate-500 text-center py-8 border rounded-lg bg-slate-50">
                              No before photos yet. Click "Add Before Photo" to start adding photos.
                            </p>
                          )}
                        </div>
                      </div>

                      <Separator />

                      {/* After Images Gallery */}
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <Label className="text-lg font-semibold">After Images Gallery ({selectedProject.afterImages?.length || 0} photos)</Label>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              const updated = { ...selectedProject };
                              if (!updated.afterImages) updated.afterImages = [];
                              updated.afterImages.push("");
                              setSelectedProject(updated);
                            }}
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Add After Photo
                          </Button>
                        </div>

                        <div className="space-y-4">
                          {selectedProject.afterImages?.map((image, index) => (
                            <div key={index} className="flex gap-4 items-start">
                              <div className="flex-1">
                                <ImageUploader
                                  label={`After Photo ${index + 1}`}
                                  currentImage={image}
                                  onImageUpload={(base64) => {
                                    const updated = { ...selectedProject };
                                    if (updated.afterImages) {
                                      updated.afterImages[index] = base64;
                                      setSelectedProject(updated);
                                    }
                                  }}
                                />
                              </div>
                              <Button
                                type="button"
                                variant="destructive"
                                size="sm"
                                onClick={() => {
                                  const updated = { ...selectedProject };
                                  if (updated.afterImages) {
                                    updated.afterImages = updated.afterImages.filter((_, i) => i !== index);
                                    setSelectedProject(updated);
                                  }
                                }}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}

                          {(!selectedProject.afterImages || selectedProject.afterImages.length === 0) && (
                            <p className="text-sm text-slate-500 text-center py-8 border rounded-lg bg-slate-50">
                              No after photos yet. Click "Add After Photo" to start adding photos.
                            </p>
                          )}
                        </div>
                      </div>
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
                    <p className="text-sm text-orange-600 mt-2">
                      Investment opportunities from the homepage appear in the orange section - click them to add before/after photos!
                    </p>
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
