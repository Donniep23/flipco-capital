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

  const [contractorData, setContractorData] = useState({
    totalEarnings: 0,
    activeProjects: 0,
    completedProjects: 0,
    averageRating: 0,
    tasksCompleted: 0,
    pendingPayments: 0
  });

  const [projects, setProjects] = useState<any[]>([]);
  const [currentUsername, setCurrentUsername] = useState("");

  useEffect(() => {
    // Load contractor name and data from localStorage
    const username = localStorage.getItem("contractor_username");
    if (username) {
      setCurrentUsername(username);

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

      // Load contractor-specific data
      loadContractorData(username);
    }
  }, []);

  const loadContractorData = (username: string) => {
    // Get all contractor data from localStorage
    const allContractorsData = localStorage.getItem("flipco_contractors_data");

    if (allContractorsData) {
      const contractorsData = JSON.parse(allContractorsData);
      const userData = contractorsData[username];

      if (userData) {
        setContractorData(userData.stats);
        setProjects(userData.projects || []);
      } else {
        // Initialize default data for this contractor
        initializeContractorData(username);
      }
    } else {
      // Initialize default data for this contractor
      initializeContractorData(username);
    }
  };

  const initializeContractorData = (username: string) => {
    // Create unique default data based on username
    const defaultData = getDefaultDataForContractor(username);

    // Get existing contractors data or create new object
    const allContractorsData = localStorage.getItem("flipco_contractors_data");
    const contractorsData = allContractorsData ? JSON.parse(allContractorsData) : {};

    // Add this contractor's data
    contractorsData[username] = defaultData;

    // Save back to localStorage
    localStorage.setItem("flipco_contractors_data", JSON.stringify(contractorsData));

    // Set state
    setContractorData(defaultData.stats);
    setProjects(defaultData.projects);
  };

  const getDefaultDataForContractor = (username: string) => {
    // Different default data for each contractor
    const defaults: Record<string, any> = {
      "demo": {
        stats: {
          totalEarnings: 85750,
          activeProjects: 2,
          completedProjects: 12,
          averageRating: 4.8,
          tasksCompleted: 146,
          pendingPayments: 12500
        },
        projects: [
          {
            id: "project-demo-1",
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
            id: "project-demo-2",
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
        ]
      },
      "ahmed_hassan": {
        stats: {
          totalEarnings: 124300,
          activeProjects: 3,
          completedProjects: 18,
          averageRating: 4.9,
          tasksCompleted: 203,
          pendingPayments: 18200
        },
        projects: [
          {
            id: "project-ahmed-1",
            name: "Maple Ridge Drive",
            address: "789 Maple Ridge Dr, Houston, TX",
            status: "In Progress",
            progress: 60,
            budget: 52500,
            spent: 31500,
            deadline: "2025-11-20",
            priority: "High",
            tasks: [
              { id: 1, title: "Foundation Repairs", status: "completed", dueDate: "2025-10-15" },
              { id: 2, title: "Roof Replacement", status: "in-progress", dueDate: "2025-11-08" },
              { id: 3, title: "HVAC Installation", status: "pending", dueDate: "2025-11-18" }
            ]
          },
          {
            id: "project-ahmed-2",
            name: "Cedar Lane Townhouse",
            address: "321 Cedar Ln, Houston, TX",
            status: "In Progress",
            progress: 85,
            budget: 38000,
            spent: 32300,
            deadline: "2025-11-10",
            priority: "High",
            tasks: [
              { id: 4, title: "Interior Painting", status: "in-progress", dueDate: "2025-11-05" },
              { id: 5, title: "Landscaping", status: "pending", dueDate: "2025-11-09" }
            ]
          }
        ]
      },
      "john_martinez": {
        stats: {
          totalEarnings: 67200,
          activeProjects: 1,
          completedProjects: 8,
          averageRating: 4.7,
          tasksCompleted: 95,
          pendingPayments: 8500
        },
        projects: [
          {
            id: "project-john-1",
            name: "Elm Street Contemporary",
            address: "555 Elm St, Dallas, TX",
            status: "In Progress",
            progress: 45,
            budget: 41000,
            spent: 18450,
            deadline: "2025-12-05",
            priority: "Medium",
            tasks: [
              { id: 1, title: "Kitchen Remodel", status: "in-progress", dueDate: "2025-11-15" },
              { id: 2, title: "Master Bath Renovation", status: "pending", dueDate: "2025-11-25" },
              { id: 3, title: "Flooring Installation", status: "pending", dueDate: "2025-12-01" }
            ]
          }
        ]
      },
      "maria_rodriguez": {
        stats: {
          totalEarnings: 98500,
          activeProjects: 2,
          completedProjects: 15,
          averageRating: 4.9,
          tasksCompleted: 178,
          pendingPayments: 14700
        },
        projects: [
          {
            id: "project-maria-1",
            name: "Birch Avenue Duplex",
            address: "890 Birch Ave, San Antonio, TX",
            status: "In Progress",
            progress: 70,
            budget: 48000,
            spent: 33600,
            deadline: "2025-11-18",
            priority: "High",
            tasks: [
              { id: 1, title: "Unit A Completion", status: "completed", dueDate: "2025-10-30" },
              { id: 2, title: "Unit B Kitchen", status: "in-progress", dueDate: "2025-11-10" },
              { id: 3, title: "Exterior Paint", status: "pending", dueDate: "2025-11-16" }
            ]
          },
          {
            id: "project-maria-2",
            name: "Willow Creek Ranch",
            address: "1200 Willow Creek Rd, San Antonio, TX",
            status: "Planning",
            progress: 30,
            budget: 62000,
            spent: 18600,
            deadline: "2025-12-30",
            priority: "Medium",
            tasks: [
              { id: 4, title: "Site Prep", status: "completed", dueDate: "2025-10-25" },
              { id: 5, title: "Foundation Work", status: "in-progress", dueDate: "2025-11-12" },
              { id: 6, title: "Framing", status: "pending", dueDate: "2025-11-20" }
            ]
          }
        ]
      }
    };

    // Return specific contractor data or generic default
    return defaults[username] || {
      stats: {
        totalEarnings: 0,
        activeProjects: 0,
        completedProjects: 0,
        averageRating: 5.0,
        tasksCompleted: 0,
        pendingPayments: 0
      },
      projects: []
    };
  };

  const currentProject = projects.find(p => p.id === selectedProject) || projects[0] || null;

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
