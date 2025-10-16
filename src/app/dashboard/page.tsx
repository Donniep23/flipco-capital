"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import LiveVideoFeed from "@/components/LiveVideoFeed";
import {
  Home,
  DollarSign,
  TrendingUp,
  Calendar,
  PlayCircle,
  FileText,
  Bell,
  Settings,
  LogOut,
  Eye,
  BarChart3,
  MapPin,
  Clock,
  Users,
  Download,
  Camera,
  Video
} from "lucide-react";

export default function DashboardPage() {
  const [selectedProject, setSelectedProject] = useState("project-1");
  const [showLiveVideo, setShowLiveVideo] = useState(false);

  // Mock data - in real app this would come from API
  const portfolioData = {
    totalInvested: 425000,
    currentValue: 498750,
    totalReturn: 73750,
    returnPercentage: 17.35,
    activeProjects: 3,
    completedProjects: 5
  };

  const projects = [
    {
      id: "project-1",
      name: "Oakwood Renovation",
      address: "123 Oakwood Dr, Austin, TX",
      status: "In Progress",
      progress: 75,
      investment: 150000,
      estimatedReturn: 187500,
      purchasePrice: 180000,
      rehabBudget: 45000,
      estimatedSale: 285000,
      startDate: "2024-01-15",
      estimatedCompletion: "2024-03-15",
      llcName: "Oakwood Properties LLC"
    },
    {
      id: "project-2",
      name: "Sparks St Renovation",
      address: "3820 Sparks St, Houston, TX 77093",
      status: "Completed",
      progress: 100,
      investment: 125000,
      actualReturn: 156250,
      purchasePrice: 145000,
      rehabCost: 38000,
      salePrice: 245000,
      startDate: "2023-10-01",
      completionDate: "2023-12-20",
      llcName: "Sunset Investment LLC"
    },
    {
      id: "project-3",
      name: "Maple Street Flip",
      address: "789 Maple St, Houston, TX",
      status: "Planning",
      progress: 15,
      investment: 150000,
      estimatedReturn: 195000,
      purchasePrice: 165000,
      rehabBudget: 50000,
      estimatedSale: 315000,
      startDate: "2024-02-01",
      estimatedCompletion: "2024-05-01",
      llcName: "Maple Ventures LLC"
    }
  ];

  const currentProject = projects.find(p => p.id === selectedProject) || projects[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">FC</span>
                </div>
                <span className="text-lg font-bold text-slate-900">Flipco Capital</span>
              </div>
              <Separator orientation="vertical" className="h-6" />
              <h1 className="text-xl font-semibold text-slate-900">Investor Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Button variant="outline" size="sm">
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Welcome back, John!</h2>
          <p className="text-slate-600">Here's your investment portfolio overview and project updates.</p>
        </div>

        {/* Portfolio Overview */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Invested</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${portfolioData.totalInvested.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Across {portfolioData.activeProjects + portfolioData.completedProjects} projects</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Portfolio Value</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${portfolioData.currentValue.toLocaleString()}</div>
              <p className="text-xs text-green-600">+{portfolioData.returnPercentage}% overall return</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Returns</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">+${portfolioData.totalReturn.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Realized + unrealized gains</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
              <Home className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{portfolioData.activeProjects}</div>
              <p className="text-xs text-muted-foreground">{portfolioData.completedProjects} completed</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Project List */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Your Projects</CardTitle>
                <CardDescription>Select a project to view details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                      selectedProject === project.id
                        ? "border-blue-500 bg-blue-50"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                    onClick={() => setSelectedProject(project.id)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-slate-900">{project.name}</h3>
                      <Badge
                        variant={
                          project.status === "Completed" ? "success" :
                          project.status === "In Progress" ? "default" : "secondary"
                        }
                      >
                        {project.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-600 mb-2">{project.address}</p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Project Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* View Toggle Tabs */}
            <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
              <Button
                variant={!showLiveVideo ? "default" : "ghost"}
                onClick={() => setShowLiveVideo(false)}
                className={`flex-1 gap-2 ${!showLiveVideo ? "bg-white shadow-sm" : ""}`}
              >
                <BarChart3 className="h-4 w-4" />
                Project Details
              </Button>
              <Button
                variant={showLiveVideo ? "default" : "ghost"}
                onClick={() => setShowLiveVideo(true)}
                className={`flex-1 gap-2 ${showLiveVideo ? "bg-white shadow-sm" : ""}`}
              >
                <Video className="h-4 w-4" />
                Live Video Feed
              </Button>
            </div>

            {/* Conditional Content */}
            {showLiveVideo ? (
              <LiveVideoFeed
                projectId={currentProject.id}
                projectName={currentProject.name}
              />
            ) : (
              <>
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl">{currentProject.name}</CardTitle>
                    <CardDescription className="flex items-center mt-1">
                      <MapPin className="h-4 w-4 mr-1" />
                      {currentProject.address}
                    </CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <PlayCircle className="h-4 w-4 mr-2" />
                      Live Video
                    </Button>
                    <Button variant="outline" size="sm">
                      <FileText className="h-4 w-4 mr-2" />
                      Documents
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Progress Overview */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold">Project Progress</h3>
                    <span className="text-sm text-slate-600">{currentProject.progress}% Complete</span>
                  </div>
                  <Progress value={currentProject.progress} className="h-3" />
                  <div className="flex justify-between text-sm text-slate-600 mt-2">
                    <span suppressHydrationWarning>Started: {new Date(currentProject.startDate).toLocaleDateString()}</span>
                    <span suppressHydrationWarning>
                      {currentProject.status === "Completed"
                        ? `Completed: ${new Date(currentProject.completionDate!).toLocaleDateString()}`
                        : `Est. Completion: ${new Date(currentProject.estimatedCompletion!).toLocaleDateString()}`
                      }
                    </span>
                  </div>
                </div>

                {/* Financial Breakdown */}
                <div>
                  <h3 className="font-semibold mb-4">Financial Overview</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Purchase Price</span>
                        <span className="font-semibold">${currentProject.purchasePrice.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">
                          {currentProject.status === "Completed" ? "Total Rehab Cost" : "Rehab Budget"}
                        </span>
                        <span className="font-semibold">
                          ${(currentProject.rehabCost || currentProject.rehabBudget || 0).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Your Investment</span>
                        <span className="font-semibold">${currentProject.investment.toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-slate-600">
                          {currentProject.status === "Completed" ? "Sale Price" : "Estimated Sale"}
                        </span>
                        <span className="font-semibold">
                          ${(currentProject.salePrice || currentProject.estimatedSale || 0).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">
                          {currentProject.status === "Completed" ? "Your Return" : "Estimated Return"}
                        </span>
                        <span className="font-semibold text-green-600">
                          ${(currentProject.actualReturn || currentProject.estimatedReturn || 0).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between border-t pt-2">
                        <span className="text-slate-600 font-medium">Profit Share</span>
                        <span className="font-bold text-green-600">
                          ${((currentProject.actualReturn || currentProject.estimatedReturn || 0) - currentProject.investment).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* LLC Information */}
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <Users className="h-5 w-5 text-blue-600 mr-2" />
                    <h3 className="font-semibold text-blue-900">LLC Partnership</h3>
                  </div>
                  <p className="text-blue-800 text-sm">
                    This project is owned through <strong>{currentProject.llcName}</strong> where you and Flipco Capital
                    are co-owners. You hold equity rights and receive detailed financial reporting.
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setShowLiveVideo(true)}
                  >
                    <Camera className="h-4 w-4 mr-2" />
                    View Live Feed
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Download className="h-4 w-4 mr-2" />
                    Download Reports
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Visit
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest updates on your projects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium">Kitchen renovation completed - Oakwood Project</p>
                      <p className="text-xs text-slate-600">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium">New cost report uploaded - Maple Street Project</p>
                      <p className="text-xs text-slate-600">1 day ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium">Permit approved for electrical work - Oakwood Project</p>
                      <p className="text-xs text-slate-600">3 days ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium">Sparks St Renovation sold - Final profit: $31,250</p>
                      <p className="text-xs text-slate-600">1 week ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
