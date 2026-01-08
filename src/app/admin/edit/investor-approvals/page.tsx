"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  Check,
  X,
  Clock,
  User,
  Mail,
  Phone,
  Building,
  DollarSign,
  Calendar,
  RefreshCw,
  Send
} from "lucide-react";

interface InvestorApplication {
  id: string;
  investor_id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  investment_amount: string;
  investment_goals: string;
  risk_tolerance: string;
  status: 'pending' | 'approved' | 'rejected';
  notes: string;
  created_at: string;
  updated_at: string;
}

export default function InvestorApprovalsPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [applications, setApplications] = useState<InvestorApplication[]>([]);
  const [selectedApp, setSelectedApp] = useState<InvestorApplication | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('pending');
  const router = useRouter();

  useEffect(() => {
    const session = localStorage.getItem("flipco_admin_session");
    if (session !== "authenticated") {
      router.push("/admin");
      return;
    }
    setIsAuthenticated(true);
    loadApplications();
  }, [router]);

  const loadApplications = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/investor-approvals');
      const result = await response.json();

      if (result.success) {
        setApplications(result.data || []);
      }
    } catch (error) {
      console.error('Error loading applications:', error);
    }
    setIsLoading(false);
  };

  const updateStatus = async (investorId: string, newStatus: 'approved' | 'rejected', sendEmail: boolean = false) => {
    setIsSaving(true);
    try {
      const response = await fetch('/api/investor-approvals', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          investor_id: investorId,
          status: newStatus,
          send_notification: sendEmail
        })
      });

      const result = await response.json();

      if (result.success) {
        // Update local state
        setApplications(prev => prev.map(app =>
          app.investor_id === investorId ? { ...app, status: newStatus } : app
        ));
        if (selectedApp?.investor_id === investorId) {
          setSelectedApp({ ...selectedApp, status: newStatus });
        }
        setMessage(`✅ Investor ${newStatus === 'approved' ? 'approved' : 'rejected'} successfully!${sendEmail ? ' Email notification sent.' : ''}`);
      } else {
        setMessage(`❌ Error: ${result.error}`);
      }
    } catch (error) {
      setMessage('❌ Error updating status');
    }
    setIsSaving(false);
    setTimeout(() => setMessage(""), 4000);
  };

  const filteredApplications = applications.filter(app => {
    if (filter === 'all') return true;
    return app.status === filter;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary" className="bg-amber-100 text-amber-800"><Clock className="h-3 w-3 mr-1" /> Pending</Badge>;
      case 'approved':
        return <Badge variant="default" className="bg-green-100 text-green-800"><Check className="h-3 w-3 mr-1" /> Approved</Badge>;
      case 'rejected':
        return <Badge variant="destructive" className="bg-red-100 text-red-800"><X className="h-3 w-3 mr-1" /> Rejected</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

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
                <h1 className="text-xl font-bold text-slate-900">Investor Approvals</h1>
                <p className="text-sm text-slate-500">Review and approve investor applications</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {message && (
                <Alert className="max-w-md">
                  <AlertDescription>{message}</AlertDescription>
                </Alert>
              )}
              <Button variant="outline" onClick={loadApplications} disabled={isLoading}>
                <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <Card className="cursor-pointer hover:bg-slate-50" onClick={() => setFilter('all')}>
            <CardContent className="pt-4">
              <div className="text-2xl font-bold">{applications.length}</div>
              <div className="text-sm text-slate-500">Total Applications</div>
            </CardContent>
          </Card>
          <Card className={`cursor-pointer hover:bg-amber-50 ${filter === 'pending' ? 'ring-2 ring-amber-400' : ''}`} onClick={() => setFilter('pending')}>
            <CardContent className="pt-4">
              <div className="text-2xl font-bold text-amber-600">{applications.filter(a => a.status === 'pending').length}</div>
              <div className="text-sm text-slate-500">Pending Review</div>
            </CardContent>
          </Card>
          <Card className={`cursor-pointer hover:bg-green-50 ${filter === 'approved' ? 'ring-2 ring-green-400' : ''}`} onClick={() => setFilter('approved')}>
            <CardContent className="pt-4">
              <div className="text-2xl font-bold text-green-600">{applications.filter(a => a.status === 'approved').length}</div>
              <div className="text-sm text-slate-500">Approved</div>
            </CardContent>
          </Card>
          <Card className={`cursor-pointer hover:bg-red-50 ${filter === 'rejected' ? 'ring-2 ring-red-400' : ''}`} onClick={() => setFilter('rejected')}>
            <CardContent className="pt-4">
              <div className="text-2xl font-bold text-red-600">{applications.filter(a => a.status === 'rejected').length}</div>
              <div className="text-sm text-slate-500">Rejected</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Applications List */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Applications ({filteredApplications.length})
                </CardTitle>
                <CardDescription>
                  {filter === 'pending' ? 'Awaiting your review' : `Showing ${filter} applications`}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {filteredApplications.length === 0 ? (
                  <p className="text-center text-slate-500 py-8">
                    No {filter === 'all' ? '' : filter} applications found.
                  </p>
                ) : (
                  <div className="space-y-2">
                    {filteredApplications.map((app) => (
                      <div
                        key={app.investor_id}
                        className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                          selectedApp?.investor_id === app.investor_id
                            ? "bg-blue-50 border-blue-200"
                            : "hover:bg-slate-50"
                        }`}
                        onClick={() => setSelectedApp(app)}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-medium text-sm">{app.name}</p>
                          {getStatusBadge(app.status)}
                        </div>
                        <p className="text-xs text-slate-500">{app.email}</p>
                        <p className="text-xs text-slate-400">{formatDate(app.created_at)}</p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Application Details */}
          <div className="lg:col-span-2">
            {selectedApp ? (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {selectedApp.name}
                        {getStatusBadge(selectedApp.status)}
                      </CardTitle>
                      <CardDescription>Applied: {formatDate(selectedApp.created_at)}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Contact Information */}
                  <div>
                    <h3 className="font-semibold mb-3">Contact Information</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-slate-400" />
                        <span className="text-sm">{selectedApp.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-slate-400" />
                        <span className="text-sm">{selectedApp.phone || 'Not provided'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Building className="h-4 w-4 text-slate-400" />
                        <span className="text-sm">{selectedApp.company || 'Not provided'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-slate-400" />
                        <span className="text-sm">{selectedApp.investment_amount || 'Not specified'}</span>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Investment Details */}
                  <div>
                    <h3 className="font-semibold mb-3">Investment Profile</h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs text-slate-500 uppercase">Investment Goals</p>
                        <p className="text-sm">{selectedApp.investment_goals || 'Not specified'}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 uppercase">Risk Tolerance</p>
                        <p className="text-sm">{selectedApp.risk_tolerance || 'Not specified'}</p>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Notes */}
                  <div>
                    <h3 className="font-semibold mb-3">Admin Notes</h3>
                    <p className="text-sm text-slate-600">{selectedApp.notes || 'No notes yet'}</p>
                  </div>

                  <Separator />

                  {/* Action Buttons */}
                  {selectedApp.status === 'pending' && (
                    <div className="space-y-4">
                      <h3 className="font-semibold">Take Action</h3>
                      <div className="flex gap-3">
                        <Button
                          onClick={() => updateStatus(selectedApp.investor_id, 'approved', true)}
                          disabled={isSaving}
                          className="flex-1 bg-green-600 hover:bg-green-700"
                        >
                          <Check className="h-4 w-4 mr-2" />
                          Approve & Notify
                        </Button>
                        <Button
                          onClick={() => updateStatus(selectedApp.investor_id, 'rejected', true)}
                          disabled={isSaving}
                          variant="destructive"
                          className="flex-1"
                        >
                          <X className="h-4 w-4 mr-2" />
                          Reject & Notify
                        </Button>
                      </div>
                      <p className="text-xs text-slate-500 text-center">
                        The investor will receive an email notification about the decision.
                      </p>
                    </div>
                  )}

                  {selectedApp.status !== 'pending' && (
                    <div className="bg-slate-50 p-4 rounded-lg">
                      <p className="text-sm text-slate-600">
                        This application has been <strong>{selectedApp.status}</strong>.
                      </p>
                      <div className="flex gap-2 mt-3">
                        {selectedApp.status === 'rejected' && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateStatus(selectedApp.investor_id, 'approved', true)}
                            disabled={isSaving}
                          >
                            <Check className="h-4 w-4 mr-2" />
                            Change to Approved
                          </Button>
                        )}
                        {selectedApp.status === 'approved' && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateStatus(selectedApp.investor_id, 'rejected', false)}
                            disabled={isSaving}
                          >
                            <X className="h-4 w-4 mr-2" />
                            Revoke Access
                          </Button>
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="flex items-center justify-center h-64">
                  <div className="text-center">
                    <User className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-slate-900 mb-2">Select an Application</h3>
                    <p className="text-slate-600">Choose an investor application to review</p>
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
