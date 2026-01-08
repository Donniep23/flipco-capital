"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Calendar,
  DollarSign,
  Clock,
  User,
  FileText,
  Send,
  Eye,
  Search,
  Hammer,
  CheckCircle,
  XCircle,
  Award,
  Timer
} from "lucide-react";

interface ProjectListing {
  id: string;
  title: string;
  description: string;
  address: string;
  client: string;
  budget: {
    min: number;
    max: number;
  };
  deadline: string;
  startDate: string;
  projectType: "kitchen" | "bathroom" | "full_renovation" | "flooring" | "electrical" | "plumbing";
  status: "open" | "bidding_closed" | "awarded";
  requirements: string[];
  bidsReceived: number;
  postedDate: string;
  priority: "low" | "medium" | "high";
}

interface Bid {
  id: string;
  projectId: string;
  contractorId: string;
  amount: number;
  timeline: number;
  proposal: string;
  materials_included: boolean;
  warranty_years: number;
  status: "submitted" | "under_review" | "accepted" | "rejected";
  submitDate: string;
  notes?: string;
}

interface BiddingSystemProps {
  contractorId: string;
}

export default function BiddingSystem({ contractorId }: BiddingSystemProps) {
  const [activeTab, setActiveTab] = useState<"available" | "my_bids" | "awarded">("available");
  const [selectedProject, setSelectedProject] = useState<ProjectListing | null>(null);
  const [showBidForm, setShowBidForm] = useState(false);
  const [filterType, setFilterType] = useState<"all" | ProjectListing["projectType"]>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [bidFormData, setBidFormData] = useState({
    amount: "",
    timeline: "",
    proposal: "",
    materials_included: true,
    warranty_years: "1"
  });

  // Mock data
  const availableProjects: ProjectListing[] = [
    {
      id: "proj-001",
      title: "Modern Kitchen Renovation",
      description: "Complete kitchen remodel including cabinets, countertops, appliances, and flooring.",
      address: "1234 Oak Street, Austin, TX 78701",
      client: "Flipco Capital",
      budget: { min: 45000, max: 65000 },
      deadline: "2025-12-15",
      startDate: "2025-11-15",
      projectType: "kitchen",
      status: "open",
      requirements: [
        "Licensed contractor with kitchen experience",
        "Insurance coverage minimum $1M",
        "Local Austin references required",
        "Timeline: 6-8 weeks maximum"
      ],
      bidsReceived: 8,
      postedDate: "2025-10-28",
      priority: "high"
    },
    {
      id: "proj-002",
      title: "Master Bathroom Remodel",
      description: "Luxury master bathroom renovation with walk-in shower and dual vanities.",
      address: "5678 Pine Avenue, Austin, TX 78704",
      client: "Flipco Capital",
      budget: { min: 25000, max: 35000 },
      deadline: "2025-11-30",
      startDate: "2025-11-10",
      projectType: "bathroom",
      status: "open",
      requirements: [
        "Plumbing license required",
        "Tile installation experience",
        "Waterproofing certification",
        "Timeline: 4-5 weeks"
      ],
      bidsReceived: 12,
      postedDate: "2025-10-25",
      priority: "medium"
    },
    {
      id: "proj-003",
      title: "Hardwood Flooring Installation",
      description: "Install premium hardwood flooring throughout main living areas.",
      address: "9012 Cedar Lane, Austin, TX 78745",
      client: "Flipco Capital",
      budget: { min: 15000, max: 22000 },
      deadline: "2025-11-20",
      startDate: "2025-11-05",
      projectType: "flooring",
      status: "open",
      requirements: [
        "Flooring installation experience",
        "Wood flooring certification preferred",
        "Timeline: 2-3 weeks"
      ],
      bidsReceived: 6,
      postedDate: "2025-10-30",
      priority: "low"
    }
  ];

  const myBids: Bid[] = [
    {
      id: "bid-001",
      projectId: "proj-001",
      contractorId: contractorId,
      amount: 58000,
      timeline: 7,
      proposal: "Complete kitchen renovation with premium materials and finishes.",
      materials_included: true,
      warranty_years: 2,
      status: "under_review",
      submitDate: "2025-10-29",
      notes: "Submitted competitive bid with extended warranty"
    },
    {
      id: "bid-002",
      projectId: "proj-002",
      contractorId: contractorId,
      amount: 31500,
      timeline: 4,
      proposal: "Luxury bathroom remodel with waterproof membrane installation.",
      materials_included: true,
      warranty_years: 1,
      status: "accepted",
      submitDate: "2025-10-26",
      notes: "Bid accepted! Project starts November 10th"
    }
  ];

  const filteredProjects = availableProjects.filter(project => {
    const matchesType = filterType === "all" || project.projectType === filterType;
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.address.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch && project.status === "open";
  });

  const getStatusColor = (status: Bid["status"]) => {
    switch (status) {
      case "accepted": return "bg-green-100 text-green-800";
      case "under_review": return "bg-blue-100 text-blue-800";
      case "submitted": return "bg-yellow-100 text-yellow-800";
      case "rejected": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: ProjectListing["priority"]) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleBidSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProject) return;

    console.log("Submitting bid:", {
      projectId: selectedProject.id,
      contractorId,
      ...bidFormData
    });

    setBidFormData({
      amount: "",
      timeline: "",
      proposal: "",
      materials_included: true,
      warranty_years: "1"
    });
    setShowBidForm(false);
    setSelectedProject(null);
  };

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
        <Button
          variant={activeTab === "available" ? "default" : "ghost"}
          size="sm"
          onClick={() => setActiveTab("available")}
          className="flex-1"
        >
          <Search className="h-4 w-4 mr-2" />
          Available Projects
        </Button>
        <Button
          variant={activeTab === "my_bids" ? "default" : "ghost"}
          size="sm"
          onClick={() => setActiveTab("my_bids")}
          className="flex-1"
        >
          <FileText className="h-4 w-4 mr-2" />
          My Bids ({myBids.length})
        </Button>
        <Button
          variant={activeTab === "awarded" ? "default" : "ghost"}
          size="sm"
          onClick={() => setActiveTab("awarded")}
          className="flex-1"
        >
          <Award className="h-4 w-4 mr-2" />
          Awarded Projects
        </Button>
      </div>

      {/* Available Projects Tab */}
      {activeTab === "available" && (
        <div className="space-y-6">
          {/* Filters and Search */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search projects..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex space-x-2">
                  {(["all", "kitchen", "bathroom", "flooring", "electrical", "plumbing"] as const).map((type) => (
                    <Button
                      key={type}
                      variant={filterType === type ? "default" : "outline"}
                      size="sm"
                      onClick={() => setFilterType(type)}
                    >
                      {type === "all" ? "All" : type.charAt(0).toUpperCase() + type.slice(1)}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Projects List */}
          <div className="grid gap-6">
            {filteredProjects.map((project) => (
              <Card key={project.id} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <Hammer className="h-5 w-5 text-green-600" />
                        <h3 className="text-xl font-semibold text-slate-900">{project.title}</h3>
                        <Badge className={getPriorityColor(project.priority)}>
                          {project.priority} priority
                        </Badge>
                      </div>
                      <p className="text-slate-600 mb-3">{project.description}</p>
                      <div className="grid md:grid-cols-2 gap-4 text-sm text-slate-600">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2" />
                          {project.address}
                        </div>
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-2" />
                          Client: {project.client}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2" />
                          Start: {formatDate(project.startDate)}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2" />
                          Deadline: {formatDate(project.deadline)}
                        </div>
                      </div>
                    </div>

                    <div className="text-right space-y-2">
                      <div className="text-2xl font-bold text-green-600">
                        {formatCurrency(project.budget.min)} - {formatCurrency(project.budget.max)}
                      </div>
                      <div className="text-sm text-slate-600">
                        {project.bidsReceived} bids received
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedProject(project)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => {
                            setSelectedProject(project);
                            setShowBidForm(true);
                          }}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <Send className="h-4 w-4 mr-2" />
                          Submit Bid
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-medium text-slate-900 mb-2">Key Requirements:</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.requirements.slice(0, 3).map((req, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {req}
                        </Badge>
                      ))}
                      {project.requirements.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{project.requirements.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* My Bids Tab */}
      {activeTab === "my_bids" && (
        <div className="space-y-4">
          {myBids.map((bid) => {
            const project = availableProjects.find(p => p.id === bid.projectId);
            return (
              <Card key={bid.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-slate-900">
                          {project?.title || "Project Title"}
                        </h3>
                        <Badge className={getStatusColor(bid.status)}>
                          {bid.status.replace('_', ' ')}
                        </Badge>
                      </div>
                      <p className="text-slate-600 mb-3">{project?.address}</p>
                      <div className="grid md:grid-cols-3 gap-4 text-sm text-slate-600">
                        <div>
                          <span className="font-medium">Bid Amount:</span> {formatCurrency(bid.amount)}
                        </div>
                        <div>
                          <span className="font-medium">Timeline:</span> {bid.timeline} weeks
                        </div>
                        <div>
                          <span className="font-medium">Submitted:</span> {formatDate(bid.submitDate)}
                        </div>
                      </div>
                      {bid.notes && (
                        <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm text-slate-600">{bid.notes}</p>
                        </div>
                      )}
                    </div>

                    <div className="text-right">
                      {bid.status === "accepted" && (
                        <CheckCircle className="h-8 w-8 text-green-600 mb-2" />
                      )}
                      {bid.status === "rejected" && (
                        <XCircle className="h-8 w-8 text-red-600 mb-2" />
                      )}
                      {bid.status === "under_review" && (
                        <Timer className="h-8 w-8 text-blue-600 mb-2" />
                      )}
                      <div className="text-lg font-bold text-slate-900">
                        {formatCurrency(bid.amount)}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Awarded Projects Tab */}
      {activeTab === "awarded" && (
        <Card>
          <CardContent className="p-6">
            {myBids.filter(bid => bid.status === "accepted").length > 0 ? (
              <div className="space-y-4">
                {myBids.filter(bid => bid.status === "accepted").map((bid) => {
                  const project = availableProjects.find(p => p.id === bid.projectId);
                  return (
                    <div key={bid.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-slate-900">{project?.title}</h3>
                          <p className="text-slate-600">{project?.address}</p>
                          <div className="flex items-center space-x-4 text-sm text-slate-600 mt-2">
                            <span>Amount: {formatCurrency(bid.amount)}</span>
                            <span>Timeline: {bid.timeline} weeks</span>
                            <span>Start: {formatDate(project?.startDate || '')}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge className="bg-green-100 text-green-800">Awarded</Badge>
                          <Button variant="outline" size="sm" className="ml-2">
                            View Project
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8">
                <Award className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Awarded Projects Yet</h3>
                <p className="text-gray-600">Keep submitting competitive bids to win projects!</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Project Detail Modal */}
      {selectedProject && !showBidForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">{selectedProject.title}</h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedProject(null)}
                >
                  ✕
                </Button>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-3">Project Overview</h3>
                  <p className="text-slate-600 mb-4">{selectedProject.description}</p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <span className="font-medium">Location:</span>
                      <p className="text-slate-600">{selectedProject.address}</p>
                    </div>
                    <div>
                      <span className="font-medium">Client:</span>
                      <p className="text-slate-600">{selectedProject.client}</p>
                    </div>
                    <div>
                      <span className="font-medium">Budget Range:</span>
                      <p className="text-slate-600">
                        {formatCurrency(selectedProject.budget.min)} - {formatCurrency(selectedProject.budget.max)}
                      </p>
                    </div>
                    <div>
                      <span className="font-medium">Bids Received:</span>
                      <p className="text-slate-600">{selectedProject.bidsReceived}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Requirements</h3>
                  <ul className="space-y-2">
                    {selectedProject.requirements.map((req, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-600">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex justify-end space-x-3">
                  <Button
                    variant="outline"
                    onClick={() => setSelectedProject(null)}
                  >
                    Close
                  </Button>
                  <Button
                    onClick={() => setShowBidForm(true)}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Submit Bid
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bid Form Modal */}
      {showBidForm && selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Submit Bid</h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setShowBidForm(false);
                    setSelectedProject(null);
                  }}
                >
                  ✕
                </Button>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-slate-900">{selectedProject.title}</h3>
                <p className="text-slate-600">{selectedProject.address}</p>
                <p className="text-sm text-slate-500">
                  Budget Range: {formatCurrency(selectedProject.budget.min)} - {formatCurrency(selectedProject.budget.max)}
                </p>
              </div>

              <form onSubmit={handleBidSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="amount">Bid Amount *</Label>
                  <Input
                    id="amount"
                    type="number"
                    value={bidFormData.amount}
                    onChange={(e) => setBidFormData({...bidFormData, amount: e.target.value})}
                    placeholder="Enter your bid amount"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="timeline">Timeline (weeks) *</Label>
                  <Input
                    id="timeline"
                    type="number"
                    value={bidFormData.timeline}
                    onChange={(e) => setBidFormData({...bidFormData, timeline: e.target.value})}
                    placeholder="Project completion timeline"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="proposal">Project Proposal *</Label>
                  <Textarea
                    id="proposal"
                    value={bidFormData.proposal}
                    onChange={(e) => setBidFormData({...bidFormData, proposal: e.target.value})}
                    placeholder="Describe your approach and why you're the best choice..."
                    rows={4}
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="warranty">Warranty (years)</Label>
                    <select
                      id="warranty"
                      value={bidFormData.warranty_years}
                      onChange={(e) => setBidFormData({...bidFormData, warranty_years: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="1">1 year</option>
                      <option value="2">2 years</option>
                      <option value="3">3 years</option>
                      <option value="5">5 years</option>
                    </select>
                  </div>
                  <div className="flex items-center space-x-2 pt-6">
                    <input
                      type="checkbox"
                      id="materials"
                      checked={bidFormData.materials_included}
                      onChange={(e) => setBidFormData({...bidFormData, materials_included: e.target.checked})}
                      className="w-4 h-4"
                    />
                    <Label htmlFor="materials">Materials included in bid</Label>
                  </div>
                </div>

                <div className="flex justify-end space-x-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setShowBidForm(false);
                      setSelectedProject(null);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Submit Bid
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
