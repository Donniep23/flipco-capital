"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import RatingReviewSystem from "@/components/contractor/RatingReviewSystem";
import RealtimeChat from "@/components/contractor/RealtimeChat";
import PhotoProgressTracking from "@/components/contractor/PhotoProgressTracking";
import PaymentInvoiceSystem from "@/components/contractor/PaymentInvoiceSystem";
import BiddingSystem from "@/components/contractor/BiddingSystem";
import {
  HardHat,
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
  Video,
  CheckCircle,
  AlertCircle,
  Wrench,
  Upload,
  MessageSquare,
  Star,
  CreditCard,
  Gavel
} from "lucide-react";

export default function ContractorDashboardPage() {
  const [selectedProject, setSelectedProject] = useState("project-1");
  const [activeTab, setActiveTab] = useState<"dashboard" | "ratings" | "chat" | "photos" | "payments" | "bidding">("dashboard");
  const [contractorName, setContractorName] = useState("Contractor");

  useEffect(() => {
    // Load contractor name from localStorage
    const username = localStorage.getItem("contractor_username");
    if (username) {
      // Convert username to display name (e.g., "demo" -> "Demo Contractor")
      if (username === "demo") {
        setContractorName("Demo Contractor");
      } else {
        // Capitalize and format username
        const formatted = username.split("_").map(word =>
          word.charAt(0).toUpperCase() + word.slice(1)
        ).join(" ");
        setContractorName(formatted);
      }
    }
  }, []);

  // Mock data - in real app this would come from API
  const contractorData = {
    totalEarnings: 85750,
    activeProjects: 2,
    completedProjects: 12,
    averageRating: 4.8,
    tasksCompleted: 146,
    pendingPayments: 12500
  };

  const projects = [
    {
      id: "project-1",
      name: "Oakwood Renovation",
      address: "123 Oakwood Dr, Austin, TX",
      status: "In Progress",
      progress: 75,
      budget: 45000,
      spent: 33750,
      deadline: "2025-11-15",
      priority: "High",
      tasks: [
        { id: 1, title: "Kitchen Cabinet Installation", status: "completed", dueDate: "2025-10-28" },
        { id: 2, title: "Bathroom Tile Work", status: "in-progress", dueDate: "2025-11-05" },
        { id: 3, title: "Hardwood Floor Installation", status: "pending", dueDate: "2025-11-12" },
        { id: 4, title: "Final Paint Touch-ups", status: "pending", dueDate: "2025-11-14" }
      ]
    },
    {
      id: "project-2",
      name: "Pine Street Fix & Flip",
      address: "456 Pine St, Austin, TX",
      status: "Planning",
      progress: 25,
      budget: 38000,
      spent: 9500,
      deadline: "2025-12-20",
      priority: "Medium",
      tasks: [
        { id: 5, title: "Demolition Work", status: "completed", dueDate: "2025-10-20" },
        { id: 6, title: "Electrical Rough-in", status: "in-progress", dueDate: "2025-11-03" },
        { id: 7, title: "Plumbing Installation", status: "pending", dueDate: "2025-11-10" },
        { id: 8, title: "Drywall Installation", status: "pending", dueDate: "2025-11-17" }
      ]
    }
  ];

  const currentProject = projects.find(p => p.id === selectedProject) || projects[0];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-800";
      case "in-progress": return "bg-blue-100 text-blue-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "bg-red-100 text-red-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-green-800 rounded-lg flex items-center justify-center">
                <HardHat className="text-white h-5 w-5" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">Contractor Dashboard</h1>
                <p className="text-sm text-slate-600">Welcome back, {contractorName}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
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
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main Navigation Tabs */}
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1 mb-8">
          <Button
            variant={activeTab === "dashboard" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("dashboard")}
            className="flex-1"
          >
            <BarChart3 className="h-4 w-4 mr-2" />
            Dashboard
          </Button>
          <Button
            variant={activeTab === "ratings" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("ratings")}
            className="flex-1"
          >
            <Star className="h-4 w-4 mr-2" />
            Ratings & Reviews
          </Button>
          <Button
            variant={activeTab === "chat" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("chat")}
            className="flex-1"
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            Chat
          </Button>
          <Button
            variant={activeTab === "photos" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("photos")}
            className="flex-1"
          >
            <Camera className="h-4 w-4 mr-2" />
            Photo Progress
          </Button>
          <Button
            variant={activeTab === "payments" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("payments")}
            className="flex-1"
          >
            <CreditCard className="h-4 w-4 mr-2" />
            Payments & Invoices
          </Button>
          <Button
            variant={activeTab === "bidding" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("bidding")}
            className="flex-1"
          >
            <Gavel className="h-4 w-4 mr-2" />
            Project Bidding
          </Button>
        </div>

        {/* Dashboard Tab Content */}
        {activeTab === "dashboard" && (
          <>
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Total Earnings</p>
                  <p className="text-2xl font-bold text-slate-900">${contractorData.totalEarnings.toLocaleString()}</p>
                </div>
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Active Projects</p>
                  <p className="text-2xl font-bold text-slate-900">{contractorData.activeProjects}</p>
                </div>
                <Wrench className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Average Rating</p>
                  <p className="text-2xl font-bold text-slate-900">{contractorData.averageRating}/5.0</p>
                </div>
                <BarChart3 className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Pending Payment</p>
                  <p className="text-2xl font-bold text-slate-900">${contractorData.pendingPayments.toLocaleString()}</p>
                </div>
                <Clock className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Project List */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Active Projects
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                      selectedProject === project.id ? 'border-green-500 bg-green-50' : 'border-slate-200 hover:border-slate-300'
                    }`}
                    onClick={() => setSelectedProject(project.id)}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-slate-900">{project.name}</h3>
                        <Badge className={getPriorityColor(project.priority)}>
                          {project.priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-600 flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        {project.address}
                      </p>
                      <div className="flex items-center justify-between">
                        <Badge className={getStatusColor(project.status)}>
                          {project.status}
                        </Badge>
                        <span className="text-sm text-slate-600">{project.progress}%</span>
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
            {/* Project Overview */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{currentProject.name}</CardTitle>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Camera className="h-4 w-4 mr-2" />
                      Upload Photos
                    </Button>
                    <Button variant="outline" size="sm">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Chat
                    </Button>
                  </div>
                </div>
                <CardDescription className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  {currentProject.address}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Budget</p>
                    <p className="text-xl font-bold text-slate-900">${currentProject.budget.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-600">Spent</p>
                    <p className="text-xl font-bold text-slate-900">${currentProject.spent.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-600">Deadline</p>
                    <p className="text-xl font-bold text-slate-900">{new Date(currentProject.deadline).toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-600">Project Progress</span>
                    <span className="text-sm font-bold text-slate-900">{currentProject.progress}%</span>
                  </div>
                  <Progress value={currentProject.progress} className="h-3" />
                </div>
              </CardContent>
            </Card>

            {/* Task List */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Tasks & Milestones
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {currentProject.tasks.map((task) => (
                    <div key={task.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        {task.status === "completed" ? (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : task.status === "in-progress" ? (
                          <Clock className="h-5 w-5 text-blue-600" />
                        ) : (
                          <AlertCircle className="h-5 w-5 text-yellow-600" />
                        )}
                        <div>
                          <p className="font-medium text-slate-900">{task.title}</p>
                          <p className="text-sm text-slate-600">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getStatusColor(task.status)}>
                          {task.status.replace('-', ' ')}
                        </Badge>
                        {task.status !== "completed" && (
                          <Button variant="outline" size="sm">
                            Update
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button variant="outline" className="h-16 flex-col">
                    <Upload className="h-5 w-5 mb-1" />
                    Upload Progress Photos
                  </Button>
                  <Button variant="outline" className="h-16 flex-col">
                    <FileText className="h-5 w-5 mb-1" />
                    Submit Invoice
                  </Button>
                  <Button variant="outline" className="h-16 flex-col">
                    <MessageSquare className="h-5 w-5 mb-1" />
                    Message Client
                  </Button>
                  <Button variant="outline" className="h-16 flex-col">
                    <Calendar className="h-5 w-5 mb-1" />
                    Schedule Inspection
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        </>
      )}

      {/* Ratings & Reviews Tab */}
      {activeTab === "ratings" && (
        <RatingReviewSystem contractorId="contractor-1" />
      )}

      {/* Chat Tab */}
      {activeTab === "chat" && (
        <RealtimeChat contractorId="contractor-1" currentUserId="contractor-1" />
      )}

      {/* Photo Progress Tab */}
      {activeTab === "photos" && (
        <PhotoProgressTracking contractorId="contractor-1" currentProjectId={selectedProject} />
      )}

      {/* Payments & Invoices Tab */}
      {activeTab === "payments" && (
        <PaymentInvoiceSystem contractorId="contractor-1" />
      )}

      {/* Project Bidding Tab */}
      {activeTab === "bidding" && (
        <BiddingSystem contractorId="contractor-1" />
      )}

      </div>
    </div>
  );
}
