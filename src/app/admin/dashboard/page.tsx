"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Settings,
  Home,
  Building2,
  Users,
  MessageSquare,
  DollarSign,
  LogOut,
  Edit3,
  Save,
  Eye,
  Shield,
  FileText,
  Image,
  BarChart3
} from "lucide-react";

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminUser, setAdminUser] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Check authentication
    const session = localStorage.getItem("flipco_admin_session");
    const timestamp = localStorage.getItem("flipco_admin_timestamp");

    if (session === "authenticated" && timestamp) {
      // Check if session is still valid (24 hours)
      const sessionTime = parseInt(timestamp);
      const currentTime = Date.now();
      const hoursDiff = (currentTime - sessionTime) / (1000 * 60 * 60);

      if (hoursDiff < 24) {
        setIsAuthenticated(true);
        setAdminUser("Flipco Admin");
      } else {
        // Session expired
        handleLogout();
      }
    } else {
      router.push("/admin");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("flipco_admin_session");
    localStorage.removeItem("flipco_admin_timestamp");
    router.push("/admin");
  };

  const quickActions = [
    {
      title: "Supabase Setup",
      description: "⚡ Connect database & migrate data (DO THIS FIRST!)",
      icon: Settings,
      color: "bg-red-600",
      action: "../supabase-setup"
    },
    {
      title: "Site Settings",
      description: "Edit global text and numbers (properties flipped, ROI%, etc.)",
      icon: Settings,
      color: "bg-purple-600",
      action: "site-settings"
    },
    {
      title: "Edit Homepage",
      description: "Update hero section, taglines, and featured content",
      icon: Home,
      color: "bg-blue-500",
      action: "homepage"
    },
    {
      title: "Manage Projects",
      description: "Add, edit, or remove investment projects",
      icon: Building2,
      color: "bg-green-500",
      action: "projects"
    },
    {
      title: "Contractor Portal",
      description: "Manage contractor registration and portal content",
      icon: Users,
      color: "bg-emerald-500",
      action: "contractor-portal"
    },
    {
      title: "Contractor Applications",
      description: "Review and approve contractor applications",
      icon: Users,
      color: "bg-green-600",
      action: "contractor-approval"
    },
    {
      title: "Contractor Assignments",
      description: "Assign projects to contractors and manage their dashboards",
      icon: Users,
      color: "bg-teal-600",
      action: "contractor-assignments"
    },
    {
      title: "Investor Portal",
      description: "Configure investor portal and registration settings",
      icon: DollarSign,
      color: "bg-blue-600",
      action: "investor-portal"
    },
    {
      title: "Investment Opportunities",
      description: "Manage properties shown on homepage",
      icon: Home,
      color: "bg-purple-600",
      action: "investment-opportunities"
    },
    {
      title: "Investor Portfolios",
      description: "Assign projects to investor accounts",
      icon: Users,
      color: "bg-indigo-600",
      action: "investor-portfolios"
    },
    {
      title: "Team Members",
      description: "Add and edit team member profiles",
      icon: Users,
      color: "bg-green-600",
      action: "team-members"
    },
    {
      title: "FAQ Management",
      description: "Modify frequently asked questions",
      icon: MessageSquare,
      color: "bg-orange-500",
      action: "faq"
    },
    {
      title: "Content & Media",
      description: "Manage images, videos, and documents",
      icon: Image,
      color: "bg-pink-500",
      action: "media"
    }
  ];

  const recentActivity = [
    { action: "Project Updated", item: "Roger Rd Project", time: "2 hours ago" },
    { action: "Gallery Enhanced", item: "36-photo system added", time: "3 hours ago" },
    { action: "Address Changed", item: "Cedar Ranch → Roger Rd", time: "3 hours ago" },
    { action: "Documentation Created", item: "Upload guides generated", time: "4 hours ago" }
  ];

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="text-center">
          <Shield className="h-12 w-12 text-slate-400 mx-auto mb-4" />
          <p className="text-slate-600">Verifying authentication...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold text-sm">FC</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">Flipco Capital Admin</h1>
                <p className="text-sm text-slate-500">Content Management System</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={() => window.open("/", "_blank")}
                className="flex items-center gap-2"
              >
                <Eye className="h-4 w-4" />
                View Site
              </Button>
              <div className="text-right">
                <p className="text-sm font-medium text-slate-900">{adminUser}</p>
                <p className="text-xs text-slate-500">Administrator</p>
              </div>
              <Button
                variant="outline"
                onClick={handleLogout}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Overview */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Dashboard Overview</h2>
          <p className="text-slate-600">Manage your Flipco Capital website content and settings</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Building2 className="h-8 w-8 text-blue-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-slate-600">Total Projects</p>
                  <p className="text-2xl font-bold text-slate-900">4</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Image className="h-8 w-8 text-green-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-slate-600">Photo Slots</p>
                  <p className="text-2xl font-bold text-slate-900">57</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <DollarSign className="h-8 w-8 text-purple-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-slate-600">Active Investments</p>
                  <p className="text-2xl font-bold text-slate-900">2</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <MessageSquare className="h-8 w-8 text-orange-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-slate-600">FAQ Items</p>
                  <p className="text-2xl font-bold text-slate-900">8</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Quick Actions
                </CardTitle>
                <CardDescription>
                  Access frequently used content management tools
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {quickActions.map((action, index) => (
                    <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-3">
                          <div className={`p-2 rounded-lg ${action.color}`}>
                            <action.icon className="h-5 w-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-slate-900 mb-1">{action.title}</h3>
                            <p className="text-sm text-slate-600">{action.description}</p>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="mt-2 text-blue-600 hover:text-blue-700 p-0"
                              onClick={() => router.push(`/admin/edit/${action.action}`)}
                            >
                              <Edit3 className="h-3 w-3 mr-1" />
                              Edit
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Recent Activity
                </CardTitle>
                <CardDescription>
                  Latest changes to your website
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-900">{activity.action}</p>
                        <p className="text-sm text-slate-600">{activity.item}</p>
                        <p className="text-xs text-slate-500 mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4" size="sm">
                  View All Activity
                </Button>
              </CardContent>
            </Card>

            {/* System Status */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  System Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Website Status</span>
                    <span className="text-sm font-medium text-green-600">Online</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Last Backup</span>
                    <span className="text-sm font-medium text-slate-900">2 hours ago</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Admin Session</span>
                    <span className="text-sm font-medium text-blue-600">Active</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
