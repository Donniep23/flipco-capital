"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Save,
  Users,
  Plus,
  X,
  Eye,
  EyeOff
} from "lucide-react";

interface TeamMember {
  name: string;
  title: string;
  image: string;
  bio: string;
  experience: string;
  specialties: string[];
  linkedin: string;
  email: string;
}

export default function TeamMembersEditor() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const [newSpecialty, setNewSpecialty] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Check authentication
    const session = localStorage.getItem("flipco_admin_session");
    if (session !== "authenticated") {
      router.push("/admin");
      return;
    }
    setIsAuthenticated(true);

    // Load team members from localStorage
    const savedTeam = localStorage.getItem("flipco_team_members");
    if (savedTeam) {
      setTeamMembers(JSON.parse(savedTeam));
    } else {
      // Initialize with default team
      const defaultTeam: TeamMember[] = [
        {
          name: "Cameron Namazi",
          title: "Founder & CEO",
          image: "https://ugc.same-assets.com/RgFq8d8gduOl8nY0rxg9BoWmrYpunj35.jpeg",
          bio: "23+ years in real estate investment and development. Purchased over 1500 properties at foreclosure auctions, managed the remodels, and sold as the real estate agent. Licensed in Texas and California.",
          experience: "23+ Years",
          specialties: ["Property Acquisition", "Investment Strategy", "Portfolio Management"],
          linkedin: "#",
          email: "michael@flipcocapital.com"
        },
        {
          name: "Ela Namazi",
          title: "Chief Operating Officer",
          image: "https://ugc.same-assets.com/ZVi4vIxacC9TZm-vPWu5GzCu2znOuI42.jpeg",
          bio: "20+ years of experience in insurance and banking, with a double major degree. Formerly an underwriter for top-tier financial institutions, expertise in B2B and client relationship management.",
          experience: "20+ Years",
          specialties: ["Operations Management", "Investor Relations", "Process Optimization"],
          linkedin: "#",
          email: "sarah@flipcocapital.com"
        },
        {
          name: "Alex Rezaee",
          title: "Head of Construction",
          image: "https://ugc.same-assets.com/IQ7OS3kr5M2NywTJk0ZWkOxF43UPwUGg.jpeg",
          bio: "Licensed contractor with 10+ years experience in residential renovation and project management. Specialist in high-end property transformations.",
          experience: "10+ Years",
          specialties: ["Construction Management", "Renovation Planning", "Quality Control"],
          linkedin: "#",
          email: "alex@flipcocapital.com"
        },
        {
          name: "Mohammad Ramezani",
          title: "Chief Engineer",
          image: "https://ugc.same-assets.com/Q-gY_031w-skOD8rqZ7HXy-tVMKJsfyB.webp",
          bio: "Professional Engineer with expertise in real estate infrastructure and development. Licensed in Texas by the Texas Board of Professional Engineers.",
          experience: "10+ Years",
          specialties: ["Structural Analysis", "Project Estimation", "Permits and Engineer work"],
          linkedin: "#",
          email: "jessica@flipcocapital.com"
        },
        {
          name: "James Stokes",
          title: "Attorney of Record",
          image: "https://ugc.same-assets.com/a-QeIx1ORryvgqHWI1dnA4X-JpEp6pbq.jpeg",
          bio: "Real Estate Attorney and Trustee of Foreclosures for 40 years. Outstanding Corporate council Award in Houston business journal.",
          experience: "40+ Years",
          specialties: ["Foreclosures", "Contracts", "Mediation"],
          linkedin: "#",
          email: "email@flipcocapital.com"
        },
        {
          name: "",
          title: "",
          image: "",
          bio: "",
          experience: "",
          specialties: [],
          linkedin: "",
          email: ""
        },
        {
          name: "",
          title: "",
          image: "",
          bio: "",
          experience: "",
          specialties: [],
          linkedin: "",
          email: ""
        },
        {
          name: "",
          title: "",
          image: "",
          bio: "",
          experience: "",
          specialties: [],
          linkedin: "",
          email: ""
        }
      ];
      setTeamMembers(defaultTeam);
      localStorage.setItem("flipco_team_members", JSON.stringify(defaultTeam));
    }
  }, [router]);

  const handleSave = () => {
    setIsSaving(true);
    setSaveMessage("");

    // Save to localStorage
    localStorage.setItem("flipco_team_members", JSON.stringify(teamMembers));

    setSaveMessage("✅ Team members saved successfully!");
    setIsSaving(false);

    setTimeout(() => setSaveMessage(""), 3000);
  };

  const handleUpdateMember = (field: string, value: string) => {
    const updated = [...teamMembers];
    updated[selectedIndex] = {
      ...updated[selectedIndex],
      [field]: value
    };
    setTeamMembers(updated);
  };

  const handleAddSpecialty = () => {
    if (newSpecialty.trim()) {
      const updated = [...teamMembers];
      updated[selectedIndex].specialties = [
        ...updated[selectedIndex].specialties,
        newSpecialty.trim()
      ];
      setTeamMembers(updated);
      setNewSpecialty("");
    }
  };

  const handleRemoveSpecialty = (index: number) => {
    const updated = [...teamMembers];
    updated[selectedIndex].specialties = updated[selectedIndex].specialties.filter((_, i) => i !== index);
    setTeamMembers(updated);
  };

  const isSlotFilled = (member: TeamMember) => {
    return member.name && member.name.trim() !== "";
  };

  if (!isAuthenticated) {
    return <div className="min-h-screen bg-slate-100 flex items-center justify-center">
      <p>Checking authentication...</p>
    </div>;
  }

  const currentMember = teamMembers[selectedIndex];
  const filled = isSlotFilled(currentMember);

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
                <h1 className="text-xl font-bold text-slate-900">Team Members Editor</h1>
                <p className="text-sm text-slate-500">Manage your team members (8 slots available)</p>
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
          {/* Team Members List */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Team Slots (8)
                </CardTitle>
                <CardDescription>Select to edit</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {teamMembers.map((member, index) => {
                    const filled = isSlotFilled(member);
                    return (
                      <div
                        key={index}
                        className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                          selectedIndex === index
                            ? "bg-blue-50 border-blue-200"
                            : "hover:bg-slate-50"
                        }`}
                        onClick={() => setSelectedIndex(index)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm truncate">
                              {filled ? member.name : `Slot ${index + 1} (Empty)`}
                            </p>
                            {filled && (
                              <p className="text-xs text-slate-500 truncate">{member.title}</p>
                            )}
                          </div>
                          {filled ? (
                            <Eye className="h-4 w-4 text-green-600 flex-shrink-0 ml-2" />
                          ) : (
                            <EyeOff className="h-4 w-4 text-slate-400 flex-shrink-0 ml-2" />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-xs text-blue-700">
                    💡 <strong>Tip:</strong> Empty slots won't show on the public website.
                    Fill in the details to make them visible!
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Team Member Editor */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>
                      {filled ? `Edit: ${currentMember.name}` : `Slot ${selectedIndex + 1} - Add New Team Member`}
                    </CardTitle>
                    <CardDescription>
                      {filled ? "Update team member information" : "Fill in details to add this team member to the public site"}
                    </CardDescription>
                  </div>
                  {filled ? (
                    <Badge variant="default" className="bg-green-600">
                      <Eye className="h-3 w-3 mr-1" />
                      Visible on Site
                    </Badge>
                  ) : (
                    <Badge variant="secondary">
                      <EyeOff className="h-3 w-3 mr-1" />
                      Hidden
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Basic Information */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={currentMember.name}
                      onChange={(e) => handleUpdateMember("name", e.target.value)}
                      placeholder="e.g., John Smith"
                    />
                  </div>
                  <div>
                    <Label htmlFor="title">Job Title *</Label>
                    <Input
                      id="title"
                      value={currentMember.title}
                      onChange={(e) => handleUpdateMember("title", e.target.value)}
                      placeholder="e.g., Chief Financial Officer"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="experience">Experience</Label>
                    <Input
                      id="experience"
                      value={currentMember.experience}
                      onChange={(e) => handleUpdateMember("experience", e.target.value)}
                      placeholder="e.g., 15+ Years"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={currentMember.email}
                      onChange={(e) => handleUpdateMember("email", e.target.value)}
                      placeholder="e.g., john@flipcocapital.com"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="image">Profile Image URL</Label>
                  <Input
                    id="image"
                    value={currentMember.image}
                    onChange={(e) => handleUpdateMember("image", e.target.value)}
                    placeholder="https://example.com/image.jpg"
                  />
                  {currentMember.image && (
                    <div className="mt-2">
                      <img
                        src={currentMember.image}
                        alt="Preview"
                        className="w-32 h-32 object-cover rounded-lg"
                      />
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="bio">Bio / Description *</Label>
                  <Textarea
                    id="bio"
                    value={currentMember.bio}
                    onChange={(e) => handleUpdateMember("bio", e.target.value)}
                    placeholder="Brief description of experience and expertise..."
                    rows={4}
                  />
                </div>

                <Separator />

                {/* Specialties */}
                <div>
                  <Label>Specialties</Label>
                  <div className="flex gap-2 mt-2">
                    <Input
                      value={newSpecialty}
                      onChange={(e) => setNewSpecialty(e.target.value)}
                      placeholder="Add a specialty..."
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddSpecialty();
                        }
                      }}
                    />
                    <Button onClick={handleAddSpecialty} variant="outline">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-3">
                    {currentMember.specialties.map((specialty, index) => (
                      <Badge key={index} variant="secondary" className="gap-1">
                        {specialty}
                        <button
                          onClick={() => handleRemoveSpecialty(index)}
                          className="ml-1 hover:text-red-600"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="linkedin">LinkedIn URL</Label>
                  <Input
                    id="linkedin"
                    value={currentMember.linkedin}
                    onChange={(e) => handleUpdateMember("linkedin", e.target.value)}
                    placeholder="https://linkedin.com/in/..."
                  />
                </div>

                <Separator />

                <Button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="bg-blue-600 hover:bg-blue-700 w-full"
                  size="lg"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {isSaving ? "Saving..." : "Save All Team Members"}
                </Button>

                {!filled && (
                  <Alert>
                    <AlertDescription>
                      <strong>Note:</strong> This team member slot is currently empty and won't appear on the public website.
                      Fill in at least the Name, Title, and Bio fields to make it visible.
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
