"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  ArrowLeft,
  CheckCircle,
  Clock,
  Mail,
  Phone,
  User,
  MapPin,
  Briefcase,
  AlertCircle,
  Send
} from "lucide-react";

interface ContractorApplication {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone: string;
  contractorType: string;
  company?: string;
  experience: string;
  serviceAreas: string;
  availability: string;
  specialties: string;
  licenseNumber?: string;
  insurance?: string;
  references?: string;
  additionalInfo?: string;
  status: 'pending' | 'approved' | 'rejected';
  appliedDate: string;
  reviewedDate?: string;
  tempCredentials?: {
    username: string;
    password: string;
    sent: boolean;
    sentDate?: string;
  };
}

export default function ContractorApprovalPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [applications, setApplications] = useState<ContractorApplication[]>([]);
  const [selectedApp, setSelectedApp] = useState<ContractorApplication | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Check authentication
    const session = localStorage.getItem("flipco_admin_session");
    if (session !== "authenticated") {
      router.push("/admin");
      return;
    }
    setIsAuthenticated(true);

    // Load mock contractor applications (in real app, this would come from database)
    const mockApplications: ContractorApplication[] = [
      {
        id: "app-001",
        firstName: "John",
        lastName: "Martinez",
        email: "john.martinez@email.com",
        phone: "(713) 555-0123",
        contractorType: "experienced-unlicensed",
        company: "Independent Worker",
        experience: "5-8",
        serviceAreas: "Houston, TX and surrounding areas",
        availability: "full-time",
        specialties: "General Labor, Demolition, Drywall, Painting",
        licenseNumber: "Not applicable",
        insurance: "Basic liability through previous employer",
        references: "Miguel Santos (713) 555-0456 - previous supervisor at ABC Construction",
        additionalInfo: "Worked construction for 6 years, very reliable, looking for steady work",
        status: "pending",
        appliedDate: "2024-01-15T10:30:00Z"
      },
      {
        id: "app-002",
        firstName: "Maria",
        lastName: "Rodriguez",
        email: "",
        phone: "(832) 555-0789",
        contractorType: "handyman",
        company: "Independent Worker",
        experience: "3-5",
        serviceAreas: "Houston metro area",
        availability: "part-time",
        specialties: "Painting, Cleanup, Basic Plumbing, Tile Work",
        licenseNumber: "Not applicable",
        insurance: "None",
        references: "Rosa Gutierrez (832) 555-0234 - neighbor who hired me for home repairs",
        additionalInfo: "Single mother, very reliable, great attention to detail, available afternoons and weekends",
        status: "pending",
        appliedDate: "2024-01-14T14:20:00Z"
      },
      {
        id: "app-003",
        firstName: "Ahmed",
        lastName: "Hassan",
        email: "a.hassan@gmail.com",
        phone: "(281) 555-0345",
        contractorType: "specialist",
        company: "Hassan Tile Works",
        experience: "10+",
        serviceAreas: "Greater Houston area",
        availability: "project-based",
        specialties: "Tile Work, Flooring, Basic Plumbing",
        licenseNumber: "Not applicable",
        insurance: "General liability and tools coverage",
        references: "Several previous clients available",
        additionalInfo: "20+ years tile experience from home country, very detailed work, seeking opportunities to grow business",
        status: "approved",
        appliedDate: "2024-01-13T09:15:00Z",
        reviewedDate: "2024-01-13T16:30:00Z",
        tempCredentials: {
          username: "ahmed_hassan_temp",
          password: "TempPass123!",
          sent: true,
          sentDate: "2024-01-13T16:35:00Z"
        }
      }
    ];

    setApplications(mockApplications);
  }, [router]);

  const handleApprove = async (application: ContractorApplication) => {
    setIsProcessing(true);
    setMessage("");

    try {
      // Generate temporary credentials
      const tempUsername = `${application.firstName.toLowerCase()}_${application.lastName.toLowerCase()}_temp`;
      const tempPassword = generateTempPassword();

      // Send credentials email
      const response = await fetch("/api/send-contractor-credentials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contractor: application,
          credentials: {
            username: tempUsername,
            password: tempPassword
          }
        })
      });

      const result = await response.json();

      if (result.success) {
        // Update application status
        const updatedApp = {
          ...application,
          status: 'approved' as const,
          reviewedDate: new Date().toISOString(),
          tempCredentials: {
            username: tempUsername,
            password: tempPassword,
            sent: true,
            sentDate: new Date().toISOString()
          }
        };

        setApplications(prev =>
          prev.map(app => app.id === application.id ? updatedApp : app)
        );

        setMessage(`✅ ${application.firstName} ${application.lastName} approved and credentials sent!`);
      } else {
        setMessage("❌ Failed to send credentials. Please try again.");
      }
    } catch (error) {
      console.error("Approval error:", error);
      setMessage("❌ Error processing approval. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReject = (application: ContractorApplication) => {
    setApplications(prev =>
      prev.map(app =>
        app.id === application.id
          ? { ...app, status: 'rejected' as const, reviewedDate: new Date().toISOString() }
          : app
      )
    );
    setMessage(`❌ ${application.firstName} ${application.lastName} application rejected.`);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="text-orange-600"><Clock className="h-3 w-3 mr-1" />Pending</Badge>;
      case 'approved':
        return <Badge variant="default" className="text-green-600"><CheckCircle className="h-3 w-3 mr-1" />Approved</Badge>;
      case 'rejected':
        return <Badge variant="destructive"><AlertCircle className="h-3 w-3 mr-1" />Rejected</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  function generateTempPassword(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%';
    let password = '';
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  }

  if (!isAuthenticated) {
    return <div className="min-h-screen bg-slate-100 flex items-center justify-center">
      <p>Checking authentication...</p>
    </div>;
  }

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
                <h1 className="text-xl font-bold text-slate-900">Contractor Applications</h1>
                <p className="text-sm text-slate-500">Review and approve contractor applications</p>
              </div>
            </div>

            {message && (
              <Alert className="max-w-md">
                <AlertDescription>{message}</AlertDescription>
              </Alert>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Applications List */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Applications ({applications.length})
                </CardTitle>
                <CardDescription>Click to review each application</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {applications.map((app) => (
                    <div
                      key={app.id}
                      className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                        selectedApp?.id === app.id
                          ? "bg-blue-50 border-blue-200"
                          : "hover:bg-slate-50"
                      }`}
                      onClick={() => setSelectedApp(app)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-medium">{app.firstName} {app.lastName}</p>
                          <p className="text-sm text-slate-500">{app.contractorType.replace('-', ' ')}</p>
                        </div>
                        {getStatusBadge(app.status)}
                      </div>
                      <div className="text-xs text-slate-500">
                        <p className="flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {app.phone}
                        </p>
                        <p>Applied: {new Date(app.appliedDate).toLocaleDateString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Application Details */}
          <div className="lg:col-span-2">
            {selectedApp ? (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-2xl">
                          {selectedApp.firstName} {selectedApp.lastName}
                        </CardTitle>
                        <CardDescription>
                          {selectedApp.contractorType.replace('-', ' ')} • Applied {new Date(selectedApp.appliedDate).toLocaleDateString()}
                        </CardDescription>
                      </div>
                      {getStatusBadge(selectedApp.status)}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Contact Information */}
                    <div>
                      <h3 className="font-semibold mb-3">Contact Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-slate-500" />
                          <span>{selectedApp.phone}</span>
                        </div>
                        {selectedApp.email && (
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-slate-500" />
                            <span>{selectedApp.email}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-slate-500" />
                          <span>{selectedApp.serviceAreas}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Briefcase className="h-4 w-4 text-slate-500" />
                          <span>{selectedApp.experience} experience</span>
                        </div>
                      </div>
                    </div>

                    {/* Work Details */}
                    <div>
                      <h3 className="font-semibold mb-3">Work Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <strong>Company:</strong> {selectedApp.company}
                        </div>
                        <div>
                          <strong>Availability:</strong> {selectedApp.availability}
                        </div>
                        <div className="md:col-span-2">
                          <strong>Specialties:</strong> {selectedApp.specialties}
                        </div>
                        {selectedApp.licenseNumber && selectedApp.licenseNumber !== "Not applicable" && (
                          <div>
                            <strong>License:</strong> {selectedApp.licenseNumber}
                          </div>
                        )}
                        {selectedApp.insurance && (
                          <div className="md:col-span-2">
                            <strong>Insurance:</strong> {selectedApp.insurance}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* References */}
                    {selectedApp.references && (
                      <div>
                        <h3 className="font-semibold mb-3">References</h3>
                        <p className="text-sm text-slate-600">{selectedApp.references}</p>
                      </div>
                    )}

                    {/* Additional Info */}
                    {selectedApp.additionalInfo && (
                      <div>
                        <h3 className="font-semibold mb-3">Additional Information</h3>
                        <p className="text-sm text-slate-600">{selectedApp.additionalInfo}</p>
                      </div>
                    )}

                    {/* Credentials Status */}
                    {selectedApp.tempCredentials && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <h3 className="font-semibold text-green-900 mb-2">🔐 Login Credentials</h3>
                        <div className="text-sm text-green-800">
                          <p><strong>Username:</strong> {selectedApp.tempCredentials.username}</p>
                          <p><strong>Password:</strong> {selectedApp.tempCredentials.password}</p>
                          <p><strong>Sent:</strong> {selectedApp.tempCredentials.sent ? '✅ Yes' : '❌ No'}</p>
                          {selectedApp.tempCredentials.sentDate && (
                            <p><strong>Date Sent:</strong> {new Date(selectedApp.tempCredentials.sentDate).toLocaleString()}</p>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    {selectedApp.status === 'pending' && (
                      <div className="flex gap-4 pt-4 border-t">
                        <Button
                          onClick={() => handleApprove(selectedApp)}
                          disabled={isProcessing}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          {isProcessing ? "Processing..." : "Approve & Send Credentials"}
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => handleReject(selectedApp)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <AlertCircle className="h-4 w-4 mr-2" />
                          Reject Application
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card>
                <CardContent className="flex items-center justify-center h-64">
                  <div className="text-center">
                    <User className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-slate-900 mb-2">Select an Application</h3>
                    <p className="text-slate-600">Choose an application from the list to review</p>
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
