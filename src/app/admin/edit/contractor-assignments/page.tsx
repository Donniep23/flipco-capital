"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Select } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Plus, Trash2, Save, Users, Briefcase } from "lucide-react";
import Link from "next/link";

export default function ContractorAssignmentsPage() {
  const [contractors, setContractors] = useState<Record<string, any>>({});
  const [selectedContractor, setSelectedContractor] = useState("");
  const [newProject, setNewProject] = useState({
    name: "",
    address: "",
    budget: "",
    deadline: "",
    priority: "Medium",
    status: "Planning"
  });

  useEffect(() => {
    loadContractors();
  }, []);

  const loadContractors = () => {
    const data = localStorage.getItem("flipco_contractors_data");
    if (data) {
      setContractors(JSON.parse(data));
    }
  };

  const saveContractors = (data: Record<string, any>) => {
    localStorage.setItem("flipco_contractors_data", JSON.stringify(data));
    setContractors(data);
  };

  const addProject = () => {
    if (!selectedContractor || !newProject.name) return;

    const updatedContractors = { ...contractors };

    if (!updatedContractors[selectedContractor]) {
      updatedContractors[selectedContractor] = {
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
    }

    const project = {
      id: `project-${selectedContractor}-${Date.now()}`,
      name: newProject.name,
      address: newProject.address,
      status: newProject.status,
      progress: 0,
      budget: Number.parseFloat(newProject.budget) || 0,
      spent: 0,
      deadline: newProject.deadline,
      priority: newProject.priority,
      tasks: []
    };

    updatedContractors[selectedContractor].projects.push(project);
    updatedContractors[selectedContractor].stats.activeProjects += 1;

    saveContractors(updatedContractors);

    // Reset form
    setNewProject({
      name: "",
      address: "",
      budget: "",
      deadline: "",
      priority: "Medium",
      status: "Planning"
    });

    alert(`Project added to ${selectedContractor}'s dashboard!`);
  };

  const removeProject = (contractorUsername: string, projectId: string) => {
    const updatedContractors = { ...contractors };
    updatedContractors[contractorUsername].projects =
      updatedContractors[contractorUsername].projects.filter((p: any) => p.id !== projectId);

    updatedContractors[contractorUsername].stats.activeProjects =
      updatedContractors[contractorUsername].projects.length;

    saveContractors(updatedContractors);
  };

  const updateStats = (contractorUsername: string, field: string, value: number) => {
    const updatedContractors = { ...contractors };
    if (updatedContractors[contractorUsername]) {
      updatedContractors[contractorUsername].stats[field] = value;
      saveContractors(updatedContractors);
    }
  };

  const contractorList = ["demo", "ahmed_hassan", "john_martinez", "maria_rodriguez"];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/admin/dashboard">
            <Button variant="outline" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Contractor Assignments</h1>
          <p className="text-gray-600 mt-2">Assign projects and manage contractor data</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Add New Project */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Plus className="h-5 w-5 mr-2" />
                Assign New Project
              </CardTitle>
              <CardDescription>Add a project to a contractor's dashboard</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Select Contractor</Label>
                <select
                  value={selectedContractor}
                  onChange={(e) => setSelectedContractor(e.target.value)}
                  className="w-full mt-1 px-3 py-2 border rounded-md"
                >
                  <option value="">Choose contractor...</option>
                  {contractorList.map((username) => (
                    <option key={username} value={username}>
                      {username.replace("_", " ").toUpperCase()}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Label>Project Name</Label>
                <Input
                  value={newProject.name}
                  onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                  placeholder="Oakwood Renovation"
                />
              </div>

              <div>
                <Label>Address</Label>
                <Input
                  value={newProject.address}
                  onChange={(e) => setNewProject({ ...newProject, address: e.target.value })}
                  placeholder="123 Main St, Austin, TX"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Budget ($)</Label>
                  <Input
                    type="number"
                    value={newProject.budget}
                    onChange={(e) => setNewProject({ ...newProject, budget: e.target.value })}
                    placeholder="45000"
                  />
                </div>
                <div>
                  <Label>Deadline</Label>
                  <Input
                    type="date"
                    value={newProject.deadline}
                    onChange={(e) => setNewProject({ ...newProject, deadline: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Priority</Label>
                  <select
                    value={newProject.priority}
                    onChange={(e) => setNewProject({ ...newProject, priority: e.target.value })}
                    className="w-full mt-1 px-3 py-2 border rounded-md"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
                <div>
                  <Label>Status</Label>
                  <select
                    value={newProject.status}
                    onChange={(e) => setNewProject({ ...newProject, status: e.target.value })}
                    className="w-full mt-1 px-3 py-2 border rounded-md"
                  >
                    <option value="Planning">Planning</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>

              <Button onClick={addProject} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add Project
              </Button>
            </CardContent>
          </Card>

          {/* Current Assignments */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Briefcase className="h-5 w-5 mr-2" />
                Current Assignments
              </CardTitle>
              <CardDescription>View and manage all contractor projects</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {contractorList.map((username) => {
                const contractorData = contractors[username];
                const projectCount = contractorData?.projects?.length || 0;

                return (
                  <div key={username} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">
                        {username.replace("_", " ").toUpperCase()}
                      </h3>
                      <Badge>{projectCount} projects</Badge>
                    </div>

                    {contractorData?.projects?.map((project: any) => (
                      <div key={project.id} className="flex items-center justify-between bg-gray-50 p-2 rounded mt-2">
                        <div className="flex-1">
                          <p className="font-medium text-sm">{project.name}</p>
                          <p className="text-xs text-gray-600">{project.address}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeProject(username, project.id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                      </div>
                    ))}

                    {projectCount === 0 && (
                      <p className="text-sm text-gray-500 text-center py-4">
                        No projects assigned
                      </p>
                    )}
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>

        {/* Edit Contractor Stats */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="h-5 w-5 mr-2" />
              Edit Contractor Statistics
            </CardTitle>
            <CardDescription>Update earnings, ratings, and other stats</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {contractorList.map((username) => {
                const stats = contractors[username]?.stats || {
                  totalEarnings: 0,
                  completedProjects: 0,
                  averageRating: 5.0,
                  tasksCompleted: 0
                };

                return (
                  <div key={username} className="border rounded-lg p-4 space-y-3">
                    <h4 className="font-semibold text-sm">
                      {username.replace("_", " ").toUpperCase()}
                    </h4>

                    <div>
                      <Label className="text-xs">Total Earnings ($)</Label>
                      <Input
                        type="number"
                        value={stats.totalEarnings}
                        onChange={(e) => updateStats(username, "totalEarnings", Number.parseFloat(e.target.value))}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label className="text-xs">Completed Projects</Label>
                      <Input
                        type="number"
                        value={stats.completedProjects}
                        onChange={(e) => updateStats(username, "completedProjects", Number.parseInt(e.target.value))}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label className="text-xs">Average Rating</Label>
                      <Input
                        type="number"
                        step="0.1"
                        min="0"
                        max="5"
                        value={stats.averageRating}
                        onChange={(e) => updateStats(username, "averageRating", Number.parseFloat(e.target.value))}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label className="text-xs">Tasks Completed</Label>
                      <Input
                        type="number"
                        value={stats.tasksCompleted}
                        onChange={(e) => updateStats(username, "tasksCompleted", Number.parseInt(e.target.value))}
                        className="mt-1"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
