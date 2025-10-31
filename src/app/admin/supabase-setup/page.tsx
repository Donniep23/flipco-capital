"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
  Database,
  CheckCircle,
  XCircle,
  Loader2,
  ArrowLeft,
  Upload,
  Download,
  RefreshCw
} from "lucide-react";

export default function SupabaseSetupPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'checking' | 'connected' | 'error' | 'not-configured'>('checking');
  const [error, setError] = useState('');
  const [migrationStatus, setMigrationStatus] = useState<'idle' | 'migrating' | 'success' | 'error'>('idle');
  const [migrationMessage, setMigrationMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Check authentication
    const session = localStorage.getItem("flipco_admin_session");
    if (session !== "authenticated") {
      router.push("/admin");
      return;
    }
    setIsAuthenticated(true);

    // Check Supabase connection
    checkSupabaseConnection();
  }, [router]);

  const checkSupabaseConnection = async () => {
    setConnectionStatus('checking');
    setError('');

    try {
      const response = await fetch('/api/investment-opportunities');
      const result = await response.json();

      if (result.success) {
        setConnectionStatus('connected');
      } else {
        setConnectionStatus('error');
        setError(result.error || 'Failed to connect to Supabase');
      }
    } catch (err: any) {
      setConnectionStatus('not-configured');
      setError(err.message || 'Supabase not configured. Please follow the setup guide.');
    }
  };

  const migrateLocalStorageData = async () => {
    setMigrationStatus('migrating');
    setMigrationMessage('Starting migration...');

    try {
      // 1. Migrate Investment Opportunities
      setMigrationMessage('Migrating investment opportunities...');
      const investmentOpportunities = localStorage.getItem('flipco_investment_opportunities');
      if (investmentOpportunities) {
        const opportunities = JSON.parse(investmentOpportunities);
        for (const opp of opportunities) {
          await fetch('/api/investment-opportunities', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              opportunity_id: opp.id,
              name: opp.name,
              address: opp.address,
              beds: opp.beds || 0,
              baths: opp.baths || 0,
              sqft: opp.sqft || 0,
              status: opp.status,
              status_color: opp.statusColor,
              roi: opp.roi,
              projected_profit: opp.projectedProfit,
              purchase_price: opp.purchasePrice,
              renovation_budget: opp.renovationBudget,
              estimated_arv: opp.estimatedARV,
              timeline: opp.timeline,
              image: opp.image,
              investment_tiers: opp.investmentTiers
            })
          });
        }
      }

      // 2. Migrate Team Members
      setMigrationMessage('Migrating team members...');
      const teamMembers = localStorage.getItem('flipco_team_members');
      if (teamMembers) {
        const members = JSON.parse(teamMembers);
        const visibleMembers = members
          .filter((m: any) => m.name && m.name.trim() !== '')
          .map((m: any, index: number) => ({
            name: m.name,
            title: m.title,
            image: m.image,
            bio: m.bio,
            experience: m.experience,
            specialties: m.specialties,
            linkedin: m.linkedin || '#',
            email: m.email,
            order_index: index,
            is_visible: true
          }));

        if (visibleMembers.length > 0) {
          await fetch('/api/team-members', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(visibleMembers)
          });
        }
      }

      // 3. Migrate Contractor Data
      setMigrationMessage('Migrating contractor data...');
      const contractorsData = localStorage.getItem('flipco_contractors_data');
      if (contractorsData) {
        const contractors = JSON.parse(contractorsData);
        for (const [username, data] of Object.entries(contractors) as any) {
          await fetch('/api/contractor-data', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              username,
              stats: {
                total_earnings: data.stats.totalEarnings,
                active_projects: data.stats.activeProjects,
                completed_projects: data.stats.completedProjects,
                average_rating: data.stats.averageRating,
                tasks_completed: data.stats.tasksCompleted,
                pending_payments: data.stats.pendingPayments
              },
              projects: data.projects
            })
          });
        }
      }

      setMigrationStatus('success');
      setMigrationMessage('✅ All data migrated successfully! You can now use Supabase.');
    } catch (err: any) {
      setMigrationStatus('error');
      setMigrationMessage(`❌ Migration failed: ${err.message}`);
    }
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
                <h1 className="text-xl font-bold text-slate-900">Supabase Setup Wizard</h1>
                <p className="text-sm text-slate-500">Configure your database connection</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Connection Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Supabase Connection Status
            </CardTitle>
            <CardDescription>Check if your database is properly configured</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {connectionStatus === 'checking' && (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
                    <span>Checking connection...</span>
                  </>
                )}
                {connectionStatus === 'connected' && (
                  <>
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="font-medium text-green-600">Connected Successfully!</span>
                  </>
                )}
                {connectionStatus === 'error' && (
                  <>
                    <XCircle className="h-5 w-5 text-red-600" />
                    <span className="font-medium text-red-600">Connection Error</span>
                  </>
                )}
                {connectionStatus === 'not-configured' && (
                  <>
                    <XCircle className="h-5 w-5 text-orange-600" />
                    <span className="font-medium text-orange-600">Not Configured</span>
                  </>
                )}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={checkSupabaseConnection}
                disabled={connectionStatus === 'checking'}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Recheck
              </Button>
            </div>

            {error && (
              <Alert className="mt-4" variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Setup Instructions */}
        {connectionStatus !== 'connected' && (
          <Card>
            <CardHeader>
              <CardTitle>Setup Instructions</CardTitle>
              <CardDescription>Follow these steps to configure Supabase</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Badge className="mt-1">1</Badge>
                  <div>
                    <p className="font-medium">Open SUPABASE-SETUP.md</p>
                    <p className="text-sm text-slate-600">Follow the complete setup guide in your project folder</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Badge className="mt-1">2</Badge>
                  <div>
                    <p className="font-medium">Create Supabase Account & Project</p>
                    <p className="text-sm text-slate-600">Free tier works perfectly for your needs</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Badge className="mt-1">3</Badge>
                  <div>
                    <p className="font-medium">Run the SQL Schema</p>
                    <p className="text-sm text-slate-600">Creates all necessary database tables</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Badge className="mt-1">4</Badge>
                  <div>
                    <p className="font-medium">Add Environment Variables</p>
                    <p className="text-sm text-slate-600">Create .env.local with your Supabase keys</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Badge className="mt-1">5</Badge>
                  <div>
                    <p className="font-medium">Restart Dev Server</p>
                    <p className="text-sm text-slate-600">Connection will be automatically detected</p>
                  </div>
                </div>
              </div>

              <Alert>
                <Database className="h-4 w-4" />
                <AlertDescription>
                  <strong>Important:</strong> After setup, add the same environment variables to Netlify for production deployment.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        )}

        {/* Data Migration */}
        {connectionStatus === 'connected' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Migrate Existing Data
              </CardTitle>
              <CardDescription>
                Transfer your localStorage data to Supabase database
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-slate-600">
                This will copy all your current data (investment opportunities, team members, contractor data)
                from browser localStorage to your Supabase database. This is a one-time operation.
              </p>

              <div className="flex items-center gap-4">
                <Button
                  onClick={migrateLocalStorageData}
                  disabled={migrationStatus === 'migrating'}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {migrationStatus === 'migrating' ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Migrating...
                    </>
                  ) : (
                    <>
                      <Upload className="h-4 w-4 mr-2" />
                      Start Migration
                    </>
                  )}
                </Button>

                {migrationStatus === 'success' && (
                  <Badge className="bg-green-600">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Migration Complete
                  </Badge>
                )}
              </div>

              {migrationMessage && (
                <Alert>
                  <AlertDescription>{migrationMessage}</AlertDescription>
                </Alert>
              )}

              {migrationStatus === 'success' && (
                <Alert className="bg-green-50 border-green-200">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">
                    <strong>Success!</strong> Your data has been migrated to Supabase.
                    Changes made in the admin panel will now be visible to everyone visiting your site.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
