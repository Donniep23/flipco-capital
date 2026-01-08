"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  DollarSign,
  TrendingUp,
  Eye,
  Filter,
  Search,
  ArrowRight,
  Home,
  Clock,
  CheckCircle
} from "lucide-react";

interface Project {
  id: string;
  name: string;
  address: string;
  status: string;
  category: string;
  beforeImage: string;
  afterImage: string;
  beforeImages?: string[]; // Array of before photos for gallery view
  afterImages?: string[]; // Array of after photos for gallery view
  description: string;
  highlights: string[];
  purchasePrice?: number;
  rehabCost?: number;
  rehabBudget?: number;
  salePrice?: number;
  estimatedSale?: number;
  totalProfit?: number;
  projectedProfit?: number;
  roi?: number;
  timeline?: string;
  progress?: number;
  startDate?: string;
  completionDate?: string;
  estimatedCompletion?: string;
}

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [showBeforeGallery, setShowBeforeGallery] = useState<string | null>(null);
  const [showAfterGallery, setShowAfterGallery] = useState<string | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [settings, setSettings] = useState({
    total_properties: 1500,
    average_roi: 30,
    projects_page_title: "Our Project Portfolio",
    projects_page_subtitle: "Explore our successful property transformations and see the transparency and quality that drives our investment returns. Each project showcases our commitment to excellence."
  });

  // Load site settings
  useEffect(() => {
    fetch('/api/site-settings')
      .then(res => res.json())
      .then(result => {
        if (result.success && result.data) {
          setSettings({
            total_properties: result.data.total_properties || 1500,
            average_roi: result.data.average_roi || 30,
            projects_page_title: result.data.projects_page_title || "Our Project Portfolio",
            projects_page_subtitle: result.data.projects_page_subtitle || "Explore our successful property transformations and see the transparency and quality that drives our investment returns. Each project showcases our commitment to excellence."
          });
        }
      })
      .catch(err => console.error('Error loading settings:', err));
  }, []);

  // Load enhanced project data from API/localStorage
  const loadProjectEnhancements = async () => {
    try {
      // Try API first
      const response = await fetch('/api/projects');
      const result = await response.json();

      if (result.success && result.data) {
        const enhancementMap = new Map();
        result.data.forEach((p: any) => {
          enhancementMap.set(p.project_id, {
            beforeImage: p.before_image,
            afterImage: p.after_image,
            beforeImages: p.before_images,
            afterImages: p.after_images,
            description: p.description,
            highlights: p.highlights,
            status: p.status,
            category: p.category,
            progress: p.progress
          });
        });
        return enhancementMap;
      }
    } catch (error) {
      console.error('Error loading project enhancements from API:', error);
    }

    // Fallback to localStorage
    try {
      const savedProjects = JSON.parse(localStorage.getItem('flipco_projects') || '{}');
      const enhancementMap = new Map();
      Object.entries(savedProjects).forEach(([id, project]: [string, any]) => {
        enhancementMap.set(id, {
          beforeImage: project.beforeImage,
          afterImage: project.afterImage,
          beforeImages: project.beforeImages,
          afterImages: project.afterImages,
          description: project.description,
          highlights: project.highlights,
          status: project.status,
          category: project.category,
          progress: project.progress
        });
      });
      return enhancementMap;
    } catch (error) {
      console.error('Error loading project enhancements from localStorage:', error);
    }

    return new Map();
  };

  const loadInvestmentOpportunities = async (existingProjects: Project[], enhancementMap: Map<string, any>) => {
    try {
      const response = await fetch('/api/investment-opportunities');
      const result = await response.json();

      let upcomingProjects: Project[] = [];

      if (result.success && result.data && result.data.length > 0) {
        // Convert from database format to project format
        upcomingProjects = result.data.map((opp: any) => {
          // Check for enhanced project data
          const enhancement = enhancementMap.get(opp.opportunity_id);

          return {
            id: opp.opportunity_id,
            name: opp.name,
            address: opp.address,
            status: enhancement?.status || opp.status,
            category: enhancement?.category || "upcoming",
            purchasePrice: opp.purchase_price,
            rehabBudget: opp.renovation_budget,
            estimatedSale: opp.estimated_arv,
            projectedProfit: opp.projected_profit,
            roi: opp.roi,
            timeline: opp.timeline,
            progress: enhancement?.progress || 0,
            // Use enhanced images if available, otherwise fall back to opportunity image
            beforeImage: enhancement?.beforeImage || opp.image,
            afterImage: enhancement?.afterImage || opp.image,
            beforeImages: enhancement?.beforeImages && enhancement.beforeImages.length > 0
              ? enhancement.beforeImages
              : undefined,
            afterImages: enhancement?.afterImages && enhancement.afterImages.length > 0
              ? enhancement.afterImages
              : undefined,
            description: enhancement?.description || `Investment opportunity available now. ${opp.name} offers ${opp.roi}% projected ROI with completion in ${opp.timeline}.`,
            highlights: enhancement?.highlights && enhancement.highlights.length > 0
              ? enhancement.highlights
              : [
                  `${opp.roi}% Projected ROI`,
                  `${opp.timeline} timeline`,
                  `$${opp.projected_profit.toLocaleString()} projected profit`,
                  "Co-ownership through LLC"
                ]
          };
        });
      }

      // Apply enhancements to existing projects too
      const enhancedExistingProjects = existingProjects.map(project => {
        const enhancement = enhancementMap.get(project.id);
        if (enhancement) {
          return {
            ...project,
            beforeImage: enhancement.beforeImage || project.beforeImage,
            afterImage: enhancement.afterImage || project.afterImage,
            beforeImages: enhancement.beforeImages && enhancement.beforeImages.length > 0
              ? enhancement.beforeImages
              : project.beforeImages,
            afterImages: enhancement.afterImages && enhancement.afterImages.length > 0
              ? enhancement.afterImages
              : project.afterImages,
            description: enhancement.description || project.description,
            highlights: enhancement.highlights && enhancement.highlights.length > 0
              ? enhancement.highlights
              : project.highlights,
            status: enhancement.status || project.status,
            category: enhancement.category || project.category,
            progress: enhancement.progress ?? project.progress
          };
        }
        return project;
      });

      // Merge existing projects with investment opportunities
      const allProjects = [...enhancedExistingProjects, ...upcomingProjects];
      setProjects(allProjects);
    } catch (error) {
      console.error('Error loading investment opportunities:', error);
      setProjects(existingProjects);
    }
  };

  // Load projects including investment opportunities from homepage
  useEffect(() => {
    // Existing completed and active projects
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
        afterImage: "https://ugc.same-assets.com/FUvKtuvajonl32TCoeJIpMKZqBNzCOo2.jpeg",
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
        description: "Complete transformation of this Houston property from dated interior to modern living space. Property featured original tile flooring, dark wood cabinets, and dated finishes requiring full renovation including flooring, kitchen, and living areas.",
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
        beforeImage: "https://ugc.same-assets.com/O2Fd9L-ryKuMtk7WCWgeJaC2VeY6Sxf-.jpeg",
        afterImage: "https://ugc.same-assets.com/bngZfrqrtcB7O4JHHsjd4w9EnTSJ9tPR.jpeg",
        beforeImages: [
          "https://ugc.same-assets.com/O2Fd9L-ryKuMtk7WCWgeJaC2VeY6Sxf-.jpeg",
          "https://ugc.same-assets.com/uyCD-gU9-_KCeokpFoYDFdl1NhRcz8Rb.jpeg",
          "/projects/katy-fwy/master-bedroom-before.jpg",
          "/projects/katy-fwy/bathroom1-before.jpg",
          "/projects/katy-fwy/exterior-front-before.jpg",
          "/projects/katy-fwy/backyard-patio-before.jpg",
          "/projects/katy-fwy/second-bedroom-before.jpg",
          "/projects/katy-fwy/bathroom2-before.jpg",
          "/projects/katy-fwy/garage-storage-before.jpg",
          "/projects/katy-fwy/additional-room-before.jpg"
        ],
        description: "Contemporary renovation of a 1960s home featuring modern design elements, energy-efficient upgrades, and smart home technology integration.",
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
        beforeImage: "https://ugc.same-assets.com/dWfstVdGTgJK-gPlgdGN9mZdiE-SJ52J.jpeg",
        afterImage: "https://ugc.same-assets.com/szbxB4WS6Rxq9lTpJ2OkLYEBBe2UpcDn.jpeg",
        beforeImages: [
          "https://ugc.same-assets.com/dWfstVdGTgJK-gPlgdGN9mZdiE-SJ52J.jpeg",
          "/projects/laurel-rose/kitchen-before.jpg",
          "/projects/laurel-rose/master-bedroom-before.jpg",
          "/projects/laurel-rose/bathroom-before.jpg",
          "/projects/laurel-rose/exterior-before.jpg",
          "/projects/laurel-rose/dining-room-before.jpg",
          "/projects/laurel-rose/backyard-before.jpg"
        ],
        afterImages: [
          "https://ugc.same-assets.com/szbxB4WS6Rxq9lTpJ2OkLYEBBe2UpcDn.jpeg",
          "/projects/laurel-rose/kitchen-after.jpg",
          "/projects/laurel-rose/master-bedroom-after.jpg",
          "/projects/laurel-rose/bathroom-after.jpg",
          "/projects/laurel-rose/exterior-after.jpg",
          "/projects/laurel-rose/dining-room-after.jpg",
          "/projects/laurel-rose/backyard-after.jpg"
        ],
        description: "Historic Victorian home restoration preserving original character while adding modern amenities. Featured in Houston Home & Garden magazine.",
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
        beforeImages: [
          "https://ugc.same-assets.com/dK_tKBSN7yZL1KTmwtQrKn3IZlFes1Nl.jpeg",
          "/projects/roger-rd/kitchen-before.jpg",
          "/projects/roger-rd/master-bedroom-before.jpg",
          "/projects/roger-rd/master-bathroom-before.jpg",
          "/projects/roger-rd/guest-bedroom1-before.jpg",
          "/projects/roger-rd/guest-bedroom2-before.jpg",
          "/projects/roger-rd/guest-bathroom-before.jpg",
          "/projects/roger-rd/dining-room-before.jpg",
          "/projects/roger-rd/family-room-before.jpg",
          "/projects/roger-rd/laundry-room-before.jpg",
          "/projects/roger-rd/garage-before.jpg",
          "/projects/roger-rd/exterior-front-before.jpg",
          "/projects/roger-rd/exterior-back-before.jpg",
          "/projects/roger-rd/backyard-before.jpg",
          "/projects/roger-rd/driveway-before.jpg",
          "/projects/roger-rd/basement-before.jpg",
          "/projects/roger-rd/attic-before.jpg",
          "/projects/roger-rd/utility-room-before.jpg"
        ],
        afterImages: [
          "https://ugc.same-assets.com/g04_Z6PEmtQI_Iq8hYBrLeElt2wBg8Ix.jpeg",
          "/projects/roger-rd/kitchen-after.jpg",
          "/projects/roger-rd/master-bedroom-after.jpg",
          "/projects/roger-rd/master-bathroom-after.jpg",
          "/projects/roger-rd/guest-bedroom1-after.jpg",
          "/projects/roger-rd/guest-bedroom2-after.jpg",
          "/projects/roger-rd/guest-bathroom-after.jpg",
          "/projects/roger-rd/dining-room-after.jpg",
          "/projects/roger-rd/family-room-after.jpg",
          "/projects/roger-rd/laundry-room-after.jpg",
          "/projects/roger-rd/garage-after.jpg",
          "/projects/roger-rd/exterior-front-after.jpg",
          "/projects/roger-rd/exterior-back-after.jpg",
          "/projects/roger-rd/backyard-after.jpg",
          "/projects/roger-rd/driveway-after.jpg",
          "/projects/roger-rd/basement-after.jpg",
          "/projects/roger-rd/attic-after.jpg",
          "/projects/roger-rd/utility-room-after.jpg"
        ],
        description: "Mid-century ranch home updated with contemporary finishes while maintaining its original charm. Added outdoor living space and modern lighting.",
        highlights: ["Outdoor deck addition", "Updated electrical", "Modern lighting design", "Landscaping renovation"]
      },
      {
        id: "pine-cottage",
        name: "Harvard Pointe Dr Project",
        address: "808 Harvard Pointe Dr, Houston, TX 77573",
        status: "Planning",
        category: "upcoming",
        purchasePrice: 155000,
        rehabBudget: 35000,
        estimatedSale: 245000,
        projectedProfit: 55000,
        roi: 29,
        timeline: "3 months",
        startDate: "2024-03-01",
        estimatedCompletion: "2024-06-01",
        beforeImage: "https://images.unsplash.com/photo-1559767254-57b94a16d48b?w=800&h=600&fit=crop",
        afterImage: "https://images.unsplash.com/photo-1600607688618-b8ea4c8b6c8a?w=800&h=600&fit=crop",
        description: "Charming 1940s cottage renovation focusing on maximizing space and natural light while preserving vintage character elements.",
        highlights: ["Space optimization", "Natural light enhancement", "Vintage preservation", "Garden landscaping"]
      },
      {
        id: "elm-contemporary",
        name: "Elm Street Contemporary",
        address: "987 Elm Ave, Plano, TX 75023",
        status: "In Progress",
        category: "active",
        purchasePrice: 195000,
        rehabBudget: 55000,
        estimatedSale: 325000,
        projectedProfit: 75000,
        roi: 30,
        timeline: "4.5 months",
        progress: 45,
        startDate: "2024-02-01",
        estimatedCompletion: "2024-06-15",
        beforeImage: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=600&fit=crop",
        afterImage: "https://images.unsplash.com/photo-1600607688058-b7a2e6f6c7e6?w=800&h=600&fit=crop",
        description: "Complete transformation of a 1980s home into a contemporary masterpiece with clean lines, open spaces, and luxury finishes.",
        highlights: ["Open concept design", "Luxury finishes", "Pool installation", "Smart home features"]
      }
    ];

    // Load project enhancements first, then load investment opportunities
    const loadData = async () => {
      const enhancementMap = await loadProjectEnhancements();
      await loadInvestmentOpportunities(existingProjects, enhancementMap);
    };

    loadData();
  }, []);

  const categories = [
    { id: "all", label: "All Projects", count: projects.length },
    { id: "completed", label: "Completed", count: projects.filter(p => p.category === "completed").length },
    { id: "active", label: "In Progress", count: projects.filter(p => p.category === "active").length },
    { id: "upcoming", label: "Upcoming", count: projects.filter(p => p.category === "upcoming").length }
  ];

  const filteredProjects = selectedCategory === "all"
    ? projects
    : projects.filter(p => p.category === selectedCategory);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "In Progress":
        return <Clock className="h-4 w-4 text-blue-600" />;
      case "Planning":
        return <Calendar className="h-4 w-4 text-yellow-600" />;
      default:
        return <Home className="h-4 w-4 text-slate-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "success";
      case "In Progress":
        return "default";
      case "Planning":
        return "secondary";
      default:
        return "outline";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      {/* Navigation */}
      <nav className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">FC</span>
              </div>
              <span className="text-xl font-bold text-slate-900">Flipco Capital</span>
            </Link>
            <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-slate-900 mb-6">{settings.projects_page_title}</h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            {settings.projects_page_subtitle}
          </p>
        </div>

        {/* Portfolio Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-blue-600">{settings.total_properties}+</CardTitle>
              <CardDescription>Total Projects</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-green-600">{settings.average_roi}%</CardTitle>
              <CardDescription>Average ROI</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-purple-600">3.7</CardTitle>
              <CardDescription>Avg. Timeline (Months)</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-orange-600">$2.1M</CardTitle>
              <CardDescription>Total Investor Profits</CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className="gap-2"
              >
                <Filter className="h-4 w-4" />
                {category.label} ({category.count})
              </Button>
            ))}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
            <Button variant="outline" size="sm">
              <Eye className="h-4 w-4 mr-2" />
              View All
            </Button>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              {/* Before/After Images */}
              <div className="relative h-48 bg-slate-100 overflow-hidden">
                <div className="absolute inset-0 grid grid-cols-2 overflow-hidden">
                  <div className="relative">
                    {project.beforeImages && project.beforeImages.length > 1 ? (
                      // Multiple before images - show enhanced gallery
                      <div
                        className="relative w-full h-full overflow-hidden cursor-pointer group"
                        onClick={() => setShowBeforeGallery(project.id)}
                      >
                        {/* Main photo */}
                        <img
                          src={project.beforeImages[0]}
                          alt={`${project.name} - Before`}
                          className="w-full h-full object-cover"
                        />

                        {/* Photo count indicator */}
                        <div className="absolute bottom-2 left-2 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                          BEFORE ({project.beforeImages.length} photos)
                        </div>

                        {/* Thumbnail strip */}
                        <div className="absolute top-2 right-2 flex flex-col gap-1">
                          {project.beforeImages.slice(1, 4).map((image, index) => (
                            <div key={index} className="w-8 h-8 rounded border-2 border-white shadow-md overflow-hidden">
                              <img
                                src={image}
                                alt={`Preview ${index + 2}`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ))}
                          {project.beforeImages.length > 4 && (
                            <div className="w-8 h-8 rounded border-2 border-white shadow-md bg-black/70 flex items-center justify-center">
                              <span className="text-white text-xs font-bold">+{project.beforeImages.length - 4}</span>
                            </div>
                          )}
                        </div>

                        {/* Click indicator - static, no hover effect */}

                        {/* Permanent gallery hint */}
                        <div className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 rounded text-xs font-bold animate-pulse">
                          📷 GALLERY
                        </div>
                      </div>
                    ) : (
                      // Single before image
                      <>
                        <img
                          src={project.beforeImage}
                          alt={`${project.name} - Before`}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
                          BEFORE
                        </div>
                      </>
                    )}
                  </div>
                  <div className="relative">
                    {project.afterImages && project.afterImages.length > 1 ? (
                      // Multiple after images - show enhanced gallery
                      <div
                        className="relative w-full h-full overflow-hidden cursor-pointer group"
                        onClick={() => setShowAfterGallery(project.id)}
                      >
                        {/* Main after photo */}
                        <img
                          src={project.afterImages[0]}
                          alt={`${project.name} - After`}
                          className="w-full h-full object-cover"
                        />

                        {/* Photo count indicator */}
                        <div className="absolute bottom-2 right-2 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                          AFTER ({project.afterImages.length} photos)
                        </div>

                        {/* Thumbnail strip */}
                        <div className="absolute top-2 left-2 flex flex-col gap-1">
                          {project.afterImages.slice(1, 4).map((image, index) => (
                            <div key={index} className="w-8 h-8 rounded border-2 border-white shadow-md overflow-hidden">
                              <img
                                src={image}
                                alt={`After preview ${index + 2}`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ))}
                          {project.afterImages.length > 4 && (
                            <div className="w-8 h-8 rounded border-2 border-white shadow-md bg-black/70 flex items-center justify-center">
                              <span className="text-white text-xs font-bold">+{project.afterImages.length - 4}</span>
                            </div>
                          )}
                        </div>

                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                          <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
                            <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                              📷 Click to view all {project.afterImages.length} after photos
                            </div>
                          </div>
                        </div>

                        {/* Permanent gallery hint */}
                        <div className="absolute top-2 right-2 bg-green-600 text-white px-2 py-1 rounded text-xs font-bold animate-pulse">
                          📷 AFTER GALLERY
                        </div>
                      </div>
                    ) : (
                      // Single after image
                      <>
                        <img
                          src={project.afterImage}
                          alt={`${project.name} - After`}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-2 right-2 bg-green-500 text-white px-2 py-1 rounded text-xs font-medium">
                          AFTER
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <div className="absolute top-4 right-4">
                  <Badge variant={getStatusColor(project.status) as "success" | "default" | "secondary" | "outline"} className="gap-1">
                    {getStatusIcon(project.status)}
                    {project.status}
                  </Badge>
                </div>
              </div>

              <CardHeader>
                <CardTitle className="text-xl">{project.name}</CardTitle>
                <CardDescription className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {project.address}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-sm text-slate-600">{project.description}</p>

                {/* Progress for active projects */}
                {project.status === "In Progress" && project.progress && (
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Project Progress</span>
                      <span>{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-2" />
                  </div>
                )}

                {/* Financial Summary */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-slate-600">Purchase Price</div>
                    <div className="font-semibold">${(project.purchasePrice || 0).toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-slate-600">
                      {project.status === "Completed" ? "Total Profit" : "Projected Profit"}
                    </div>
                    <div className="font-semibold text-green-600">
                      ${(project.totalProfit || project.projectedProfit || 0).toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-slate-600">Timeline</div>
                    <div className="font-semibold">{project.timeline}</div>
                  </div>
                  <div>
                    <div className="text-slate-600">ROI</div>
                    <div className="font-semibold text-blue-600">{project.roi}%</div>
                  </div>
                </div>

                {/* Highlights */}
                <div>
                  <div className="text-sm font-medium text-slate-900 mb-2">Key Highlights:</div>
                  <div className="flex flex-wrap gap-1">
                    {project.highlights.slice(0, 2).map((highlight, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {highlight}
                      </Badge>
                    ))}
                    {project.highlights.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{project.highlights.length - 2} more
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  {/* Before Gallery Button */}
                  {project.beforeImages && project.beforeImages.length > 1 && (
                    <Button
                      variant="outline"
                      className="flex-1 group bg-red-50 hover:bg-red-100 border-red-200"
                      onClick={() => setShowBeforeGallery(project.id)}
                    >
                      📷 Before ({project.beforeImages.length})
                    </Button>
                  )}

                  {/* After Gallery Button */}
                  {project.afterImages && project.afterImages.length > 1 && (
                    <Button
                      variant="outline"
                      className="flex-1 group bg-green-50 hover:bg-green-100 border-green-200"
                      onClick={() => setShowAfterGallery(project.id)}
                    >
                      📷 After ({project.afterImages.length})
                    </Button>
                  )}

                  {/* View Details Button */}
                  <Button
                    variant="outline"
                    className={`group ${
                      (project.beforeImages && project.beforeImages.length > 1) ||
                      (project.afterImages && project.afterImages.length > 1)
                        ? 'flex-1' : 'w-full'
                    }`}
                    onClick={() => setSelectedProject(project.id)}
                  >
                    View Details
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center bg-blue-50 rounded-2xl p-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Ready to Invest in Our Next Project?
          </h2>
          <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
            Join our investor network and get access to exclusive opportunities with complete transparency,
            live project tracking, and guaranteed returns through our proven co-ownership model.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Link href="/register">
                <TrendingUp className="mr-2 h-5 w-5" />
                Start Investing
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/#contact">
                <Calendar className="mr-2 h-5 w-5" />
                Schedule Consultation
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* After Images Gallery Modal - NEW */}
      {showAfterGallery && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-6xl max-h-[95vh] overflow-auto shadow-2xl">
            <div className="sticky top-0 bg-gradient-to-r from-green-600 to-green-700 text-white p-6 flex justify-between items-center rounded-t-2xl">
              <div>
                <h3 className="text-2xl font-bold flex items-center gap-2">
                  📷 After Photos Gallery
                </h3>
                <p className="text-green-100 mt-1">
                  {projects.find(p => p.id === showAfterGallery)?.name} - Completed Transformation Results
                </p>
              </div>
              <Button
                variant="outline"
                onClick={() => setShowAfterGallery(null)}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 min-w-[100px]"
              >
                ✕ Close
              </Button>
            </div>

            <div className="p-8">
              <div className="mb-6 text-center">
                <div className="inline-flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full text-green-700 text-sm font-semibold">
                  ✨ Completed Renovation Results • Professional Transformation
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {projects.find(p => p.id === showAfterGallery)?.afterImages?.map((image, index) => (
                  <div key={index} className="space-y-4 group">
                    <div className="relative overflow-hidden rounded-xl shadow-lg">
                      <img
                        src={image}
                        alt={`After photo ${index + 1}`}
                        className="w-full h-72 object-cover"
                      />
                      <div className="absolute top-3 left-3 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                        After {index + 1} of {projects.find(p => p.id === showAfterGallery)?.afterImages?.length}
                      </div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-slate-900 mb-1">
                        {projects.find(p => p.id === showAfterGallery)?.id === "cedar-ranch" ? (
                          <>
                            {index === 0 && "🏠 Living Room - Completed"}
                            {index === 1 && "🍳 Kitchen - Renovated"}
                            {index === 2 && "🛏️ Master Bedroom - Finished"}
                            {index === 3 && "🚿 Master Bathroom - Modernized"}
                            {index === 4 && "🛏️ Guest Bedroom 1 - Finished"}
                            {index === 5 && "🛏️ Guest Bedroom 2 - Completed"}
                            {index === 6 && "🚿 Guest Bathroom - Modernized"}
                            {index === 7 && "🍽️ Dining Room - Transformed"}
                            {index === 8 && "👨‍👩‍👧‍👦 Family Room - Enhanced"}
                            {index === 9 && "🧺 Laundry Room - Upgraded"}
                            {index === 10 && "🚗 Garage - Organized"}
                            {index === 11 && "🏡 Exterior Front - Enhanced"}
                            {index === 12 && "🏠 Exterior Back - Improved"}
                            {index === 13 && "🌿 Backyard - Landscaped"}
                            {index === 14 && "🚗 Driveway - Renewed"}
                            {index === 15 && "🏠 Basement - Finished"}
                            {index === 16 && "🏠 Attic - Upgraded"}
                            {index === 17 && "⚙️ Utility Room - Modernized"}
                          </>
                        ) : (
                          <>
                            {index === 0 && "🏠 Living Room - Completed"}
                            {index === 1 && "🍳 Kitchen - Renovated"}
                            {index === 2 && "🛏️ Master Bedroom - Finished"}
                            {index === 3 && "🚿 Bathroom - Modernized"}
                            {index === 4 && "🏡 Exterior - Enhanced"}
                            {index === 5 && "🍽️ Dining Room - Transformed"}
                            {index === 6 && "🌿 Backyard - Landscaped"}
                          </>
                        )}
                      </h4>
                      <p className="text-sm text-slate-600">
                        {projects.find(p => p.id === showAfterGallery)?.id === "cedar-ranch" ? (
                          <>
                            {index === 0 && "Modern living space with new hardwood floors, updated lighting, fresh paint"}
                            {index === 1 && "Completely renovated kitchen with new cabinets, quartz counters, stainless appliances"}
                            {index === 2 && "Master bedroom with luxury vinyl plank, modern lighting, walk-in closet organization"}
                            {index === 3 && "Master bathroom with new tile, vanity, fixtures, and modern shower"}
                            {index === 4 && "Guest bedroom 1 with new flooring, paint, lighting, and window treatments"}
                            {index === 5 && "Guest bedroom 2 with updated flooring, fresh paint, and built-in improvements"}
                            {index === 6 && "Guest bathroom with modern fixtures, new tile, vanity, and lighting"}
                            {index === 7 && "Dining room with refinished floors, modern lighting, and elegant finishes"}
                            {index === 8 && "Family room with new flooring, updated fireplace, and entertainment features"}
                            {index === 9 && "Laundry room with new appliances, storage solutions, and utility upgrades"}
                            {index === 10 && "Garage with organization systems, new electrical, and overhead door"}
                            {index === 11 && "Front exterior with new landscaping, walkway, and enhanced curb appeal"}
                            {index === 12 && "Back exterior with updated siding, windows, and outdoor access improvements"}
                            {index === 13 && "Backyard with professional landscaping, new patio, and outdoor living features"}
                            {index === 14 && "Driveway with new concrete, improved drainage, and enhanced approach"}
                            {index === 15 && "Basement with finished flooring, lighting, storage, and utility organization"}
                            {index === 16 && "Attic with improved insulation, ventilation, and organized storage solutions"}
                            {index === 17 && "Utility room with upgraded HVAC, new water heater, and electrical improvements"}
                          </>
                        ) : (
                          <>
                            {index === 0 && "Modern living space with updated flooring, lighting, and finishes"}
                            {index === 1 && "Renovated kitchen with new cabinets, countertops, and appliances"}
                            {index === 2 && "Master bedroom with premium finishes and improved layout"}
                            {index === 3 && "Modernized bathroom with contemporary fixtures and tiles"}
                            {index === 4 && "Enhanced exterior with improved curb appeal and landscaping"}
                            {index === 5 && "Transformed dining space with elegant finishes"}
                            {index === 6 && "Professional landscaping and outdoor living improvements"}
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 text-center bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl border border-green-200">
                <p className="text-slate-700 font-medium mb-2">
                  ✅ Renovation Complete • Before & After Documentation
                </p>
                <p className="text-sm text-slate-600">
                  Professional transformation showcasing the quality workmanship and attention to detail
                  that delivers exceptional returns for our investment partners.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Before Images Gallery Modal - ENHANCED */}
      {showBeforeGallery && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-6xl max-h-[95vh] overflow-auto shadow-2xl">
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 flex justify-between items-center rounded-t-2xl">
              <div>
                <h3 className="text-2xl font-bold flex items-center gap-2">
                  📷 Before Photos Gallery
                </h3>
                <p className="text-blue-100 mt-1">
                  {projects.find(p => p.id === showBeforeGallery)?.name} - Complete Property Documentation
                </p>
              </div>
              <Button
                variant="outline"
                onClick={() => setShowBeforeGallery(null)}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 min-w-[100px]"
              >
                ✕ Close
              </Button>
            </div>

            <div className="p-8">
              <div className="mb-6 text-center">
                <div className="inline-flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full text-blue-700 text-sm font-semibold">
                  🏠 Property Original Condition • Complete Transparency
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {projects.find(p => p.id === showBeforeGallery)?.beforeImages?.map((image, index) => (
                  <div key={index} className="space-y-4 group">
                    <div className="relative overflow-hidden rounded-xl shadow-lg">
                      <img
                        src={image}
                        alt={`Before photo ${index + 1}`}
                        className="w-full h-72 object-cover"
                      />
                      <div className="absolute top-3 left-3 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                        Photo {index + 1} of {projects.find(p => p.id === showBeforeGallery)?.beforeImages?.length}
                      </div>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-slate-900 mb-1">
                        {projects.find(p => p.id === showBeforeGallery)?.id === "sunset-manor" ? (
                          <>
                            {index === 0 && "🏠 Living Room Area"}
                            {index === 1 && "🍳 Kitchen & Dining"}
                            {index === 2 && "💼 Office/Bedroom Space"}
                            {index === 3 && "🚿 Bathroom Facilities"}
                            {index === 4 && "🏡 Exterior & Front"}
                            {index === 5 && "🌿 Backyard & Outdoor"}
                            {index === 6 && "🏠 Basement/Storage"}
                            {index === 7 && "🛏️ Additional Bedroom"}
                          </>
                        ) : projects.find(p => p.id === showBeforeGallery)?.id === "cedar-ranch" ? (
                          <>
                            {index === 0 && "🏠 Living Room"}
                            {index === 1 && "🍳 Kitchen"}
                            {index === 2 && "🛏️ Master Bedroom"}
                            {index === 3 && "🚿 Master Bathroom"}
                            {index === 4 && "🛏️ Guest Bedroom 1"}
                            {index === 5 && "🛏️ Guest Bedroom 2"}
                            {index === 6 && "🚿 Guest Bathroom"}
                            {index === 7 && "🍽️ Dining Room"}
                            {index === 8 && "👨‍👩‍👧‍👦 Family Room"}
                            {index === 9 && "🧺 Laundry Room"}
                            {index === 10 && "🚗 Garage"}
                            {index === 11 && "🏡 Exterior Front"}
                            {index === 12 && "🏠 Exterior Back"}
                            {index === 13 && "🌿 Backyard"}
                            {index === 14 && "🚗 Driveway"}
                            {index === 15 && "🏠 Basement"}
                            {index === 16 && "🏠 Attic"}
                            {index === 17 && "⚙️ Utility Room"}
                          </>
                        ) : (
                          <>
                            {index === 0 && "🏠 Main Living Area"}
                            {index === 1 && "🍳 Kitchen Area"}
                            {index === 2 && "🛏️ Master Bedroom"}
                            {index === 3 && "🚿 Bathroom 1"}
                            {index === 4 && "🏡 Exterior Front"}
                            {index === 5 && "🌿 Backyard/Patio"}
                            {index === 6 && "🛏️ Second Bedroom"}
                            {index === 7 && "🚿 Bathroom 2"}
                            {index === 8 && "🚗 Garage/Storage"}
                            {index === 9 && "🛏️ Additional Room"}
                          </>
                        )}
                      </h4>
                      <p className="text-sm text-slate-600">
                        {projects.find(p => p.id === showBeforeGallery)?.id === "sunset-manor" ? (
                          <>
                            {index === 0 && "Red chevron accent wall, tile flooring, original furniture arrangement"}
                            {index === 1 && "Dark wood cabinets, granite countertops, dated appliances"}
                            {index === 2 && "Built-in storage systems, hardwood floors, office setup"}
                            {index === 3 && "Original fixtures, tile work, bathroom layout"}
                            {index === 4 && "Front curb appeal, landscaping, exterior condition"}
                            {index === 5 && "Outdoor living space, patio area, yard condition"}
                            {index === 6 && "Lower level storage, basement condition, utilities"}
                            {index === 7 && "Additional sleeping area, room condition, layout"}
                          </>
                        ) : projects.find(p => p.id === showBeforeGallery)?.id === "cedar-ranch" ? (
                          <>
                            {index === 0 && "Main living area original condition, dated furniture, old carpet/flooring"}
                            {index === 1 && "Original kitchen cabinets, countertops, appliances, outdated design"}
                            {index === 2 && "Master bedroom original state, carpet, dated fixtures, closet condition"}
                            {index === 3 && "Master bathroom original tile, fixtures, vanity, shower condition"}
                            {index === 4 && "First guest bedroom, carpet, paint, closet space, window treatments"}
                            {index === 5 && "Second guest bedroom, original condition, flooring, built-ins"}
                            {index === 6 && "Guest bathroom original fixtures, tile work, vanity condition"}
                            {index === 7 && "Dining room original condition, flooring, lighting, built-in features"}
                            {index === 8 && "Family room original state, fireplace, flooring, entertainment area"}
                            {index === 9 && "Laundry room original condition, appliances, storage, utility connections"}
                            {index === 10 && "Garage original state, storage, electrical, overhead doors"}
                            {index === 11 && "Front exterior original condition, landscaping, driveway, curb appeal"}
                            {index === 12 && "Back exterior original state, siding, windows, outdoor access"}
                            {index === 13 && "Backyard original landscaping, patio, fencing, outdoor features"}
                            {index === 14 && "Driveway original condition, concrete, parking, approach"}
                            {index === 15 && "Basement original state, storage, utilities, foundation access"}
                            {index === 16 && "Attic original condition, insulation, storage, ventilation"}
                            {index === 17 && "Utility room original state, HVAC, water heater, electrical panel"}
                          </>
                        ) : (
                          <>
                            {index === 0 && "Main living space, original layout, furniture placement"}
                            {index === 1 && "Kitchen condition, cabinets, appliances, countertops"}
                            {index === 2 && "Master bedroom original state, flooring, fixtures"}
                            {index === 3 && "Primary bathroom, original tile, fixtures, vanity"}
                            {index === 4 && "Front exterior, curb appeal, landscaping, entrance"}
                            {index === 5 && "Backyard space, patio area, outdoor condition"}
                            {index === 6 && "Second bedroom, closet space, flooring condition"}
                            {index === 7 && "Secondary bathroom, shower, vanity, tile work"}
                            {index === 8 && "Garage storage, utility access, vehicle space"}
                            {index === 9 && "Additional room, potential uses, original condition"}
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 text-center bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl border border-green-200">
                <p className="text-slate-700 font-medium mb-2">
                  ✅ Complete Before Documentation • 100% Transparency
                </p>
                <p className="text-sm text-slate-600">
                  Every photo shows the actual property condition before our renovation work began.
                  This level of documentation ensures complete investor confidence and project accountability.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
