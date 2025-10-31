"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Home,
  DollarSign,
  TrendingUp,
  Calendar,
  PlayCircle,
  FileText,
  Bell,
  Settings,
  Menu,
  X,
  Camera,
  BarChart3,
  MapPin,
  Clock,
  Users,
  Download,
  ChevronLeft,
  ChevronRight,
  Maximize,
  Minimize
} from "lucide-react";

interface Project {
  id: string;
  name: string;
  address: string;
  status: string;
  progress?: number;
  investment: number;
  estimatedReturn?: number;
  actualReturn?: number;
  purchasePrice: number;
  roi: number;
}

interface MobileOptimizedDashboardProps {
  projects: Project[];
  selectedProject: string;
  onProjectChange: (projectId: string) => void;
}

export default function MobileOptimizedDashboard({
  projects,
  selectedProject,
  onProjectChange
}: MobileOptimizedDashboardProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCompactView, setIsCompactView] = useState(false);
  const [swipeStartX, setSwipeStartX] = useState(0);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);

  const currentProject = projects.find(p => p.id === selectedProject) || projects[0];

  useEffect(() => {
    // Detect mobile device
    const isMobile = window.innerWidth < 768;
    setIsCompactView(isMobile);

    // Set current project index
    const index = projects.findIndex(p => p.id === selectedProject);
    setCurrentProjectIndex(index >= 0 ? index : 0);

    // Handle resize
    const handleResize = () => {
      setIsCompactView(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [selectedProject, projects]);

  // Touch/swipe handlers for project navigation
  const handleTouchStart = (e: React.TouchEvent) => {
    setSwipeStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const swipeEndX = e.changedTouches[0].clientX;
    const swipeDistance = swipeStartX - swipeEndX;
    const minSwipeDistance = 50;

    if (Math.abs(swipeDistance) > minSwipeDistance) {
      if (swipeDistance > 0 && currentProjectIndex < projects.length - 1) {
        // Swipe left - next project
        const nextProject = projects[currentProjectIndex + 1];
        onProjectChange(nextProject.id);
      } else if (swipeDistance < 0 && currentProjectIndex > 0) {
        // Swipe right - previous project
        const prevProject = projects[currentProjectIndex - 1];
        onProjectChange(prevProject.id);
      }
    }
  };

  const handlePrevProject = () => {
    if (currentProjectIndex > 0) {
      const prevProject = projects[currentProjectIndex - 1];
      onProjectChange(prevProject.id);
    }
  };

  const handleNextProject = () => {
    if (currentProjectIndex < projects.length - 1) {
      const nextProject = projects[currentProjectIndex + 1];
      onProjectChange(nextProject.id);
    }
  };

  if (!isCompactView) {
    return null; // Use regular dashboard for desktop
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      {/* Mobile Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">FC</span>
            </div>
            <div>
              <h1 className="font-semibold text-slate-900 text-sm">Flipco Capital</h1>
              <p className="text-xs text-slate-600">Investor Portal</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" className="p-2">
              <Bell className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white border-b border-slate-200 shadow-lg">
            <div className="p-4 space-y-2">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <BarChart3 className="h-4 w-4" />
                Dashboard
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Camera className="h-4 w-4" />
                Live Cameras
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-2">
                <FileText className="h-4 w-4" />
                Documents
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Settings className="h-4 w-4" />
                Settings
              </Button>
            </div>
          </div>
        )}
      </header>

      <div className="px-4 py-6 space-y-6">
        {/* Quick Stats Cards */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">$498K</div>
              <div className="text-xs text-slate-600">Portfolio Value</div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">+17.3%</div>
              <div className="text-xs text-slate-600">Total Return</div>
            </div>
          </Card>
        </div>

        {/* Project Navigation */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">Your Projects</h2>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrevProject}
                disabled={currentProjectIndex === 0}
                className="p-2"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm text-slate-600">
                {currentProjectIndex + 1} of {projects.length}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleNextProject}
                disabled={currentProjectIndex === projects.length - 1}
                className="p-2"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Current Project Card with Swipe */}
          <Card
            className="overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start">
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-lg truncate">{currentProject.name}</CardTitle>
                  <CardDescription className="flex items-center gap-1 text-sm">
                    <MapPin className="h-3 w-3 flex-shrink-0" />
                    <span className="truncate">{currentProject.address}</span>
                  </CardDescription>
                </div>
                <Badge
                  variant={
                    currentProject.status === "Completed" ? "default" :
                    currentProject.status === "In Progress" ? "secondary" : "outline"
                  }
                  className="ml-2 flex-shrink-0"
                >
                  {currentProject.status}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Progress Bar */}
              {currentProject.progress && (
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Progress</span>
                    <span>{currentProject.progress}%</span>
                  </div>
                  <Progress value={currentProject.progress} className="h-2" />
                </div>
              )}

              {/* Financial Summary */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-slate-600">Your Investment</div>
                  <div className="font-semibold">${currentProject.investment.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-slate-600">Est. Return</div>
                  <div className="font-semibold text-green-600">
                    ${(currentProject.estimatedReturn || currentProject.actualReturn || 0).toLocaleString()}
                  </div>
                </div>
                <div>
                  <div className="text-slate-600">Purchase Price</div>
                  <div className="font-semibold">${currentProject.purchasePrice.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-slate-600">ROI</div>
                  <div className="font-semibold text-blue-600">{currentProject.roi}%</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-2">
                <Button variant="outline" size="sm" className="gap-1">
                  <Camera className="h-3 w-3" />
                  Live Feed
                </Button>
                <Button variant="outline" size="sm" className="gap-1">
                  <FileText className="h-3 w-3" />
                  Reports
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-3 gap-3">
          <Button variant="outline" className="h-16 flex-col gap-1">
            <Camera className="h-5 w-5" />
            <span className="text-xs">Cameras</span>
          </Button>
          <Button variant="outline" className="h-16 flex-col gap-1">
            <Download className="h-5 w-5" />
            <span className="text-xs">Reports</span>
          </Button>
          <Button variant="outline" className="h-16 flex-col gap-1">
            <Calendar className="h-5 w-5" />
            <span className="text-xs">Schedule</span>
          </Button>
        </div>

        {/* Recent Activity - Compact */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium truncate">Kitchen renovation completed</p>
                <p className="text-xs text-slate-600">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium truncate">New cost report uploaded</p>
                <p className="text-xs text-slate-600">1 day ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium truncate">Permit approved for electrical</p>
                <p className="text-xs text-slate-600">3 days ago</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Swipe Hint */}
        <div className="text-center py-4">
          <p className="text-xs text-slate-500">
            👈 Swipe left or right to browse projects 👉
          </p>
        </div>
      </div>
    </div>
  );
}
