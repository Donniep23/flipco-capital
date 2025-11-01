"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowLeft, Save, Settings } from "lucide-react";

export default function SiteSettingsEditor() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const router = useRouter();

  const [settings, setSettings] = useState({
    total_properties: 1500,
    average_roi: 30,
    total_investment_volume: 300,
    happy_investors: 30,
    company_phone: "(713) 545-3662",
    company_email: "invest@flipcocapital.com"
  });

  useEffect(() => {
    const session = localStorage.getItem("flipco_admin_session");
    if (session !== "authenticated") {
      router.push("/admin");
      return;
    }
    setIsAuthenticated(true);
    loadSettings();
  }, [router]);

  const loadSettings = async () => {
    try {
      const response = await fetch('/api/site-settings');
      const result = await response.json();

      if (result.success && result.data) {
        setSettings(result.data);
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveMessage("");

    try {
      const response = await fetch('/api/site-settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });

      const result = await response.json();

      if (result.success) {
        setSaveMessage("✅ Settings saved! Changes will appear on all pages.");
      } else {
        setSaveMessage(`❌ Error: ${result.error}`);
      }
    } catch (error: any) {
      setSaveMessage(`❌ Error: ${error.message}`);
    }

    setIsSaving(false);
    setTimeout(() => setSaveMessage(""), 3000);
  };

  if (!isAuthenticated) {
    return <div className="min-h-screen bg-slate-100 flex items-center justify-center">
      <p>Checking authentication...</p>
    </div>;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Button variant="ghost" onClick={() => router.push("/admin/dashboard")} className="mr-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              <div>
                <h1 className="text-xl font-bold text-slate-900">Site Settings</h1>
                <p className="text-sm text-slate-500">Edit global content across all pages</p>
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Global Statistics
            </CardTitle>
            <CardDescription>
              These numbers appear on homepage and projects page
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="total_properties">Total Properties Flipped</Label>
                <Input
                  id="total_properties"
                  type="number"
                  value={settings.total_properties}
                  onChange={(e) => setSettings({ ...settings, total_properties: parseInt(e.target.value) || 0 })}
                />
                <p className="text-xs text-slate-500 mt-1">Shows on homepage & projects page</p>
              </div>

              <div>
                <Label htmlFor="average_roi">Average ROI (%)</Label>
                <Input
                  id="average_roi"
                  type="number"
                  value={settings.average_roi}
                  onChange={(e) => setSettings({ ...settings, average_roi: parseInt(e.target.value) || 0 })}
                />
                <p className="text-xs text-slate-500 mt-1">Shows on homepage & projects page</p>
              </div>

              <div>
                <Label htmlFor="total_investment_volume">Total Investment Volume ($M)</Label>
                <Input
                  id="total_investment_volume"
                  type="number"
                  value={settings.total_investment_volume}
                  onChange={(e) => setSettings({ ...settings, total_investment_volume: parseInt(e.target.value) || 0 })}
                />
                <p className="text-xs text-slate-500 mt-1">Shows on About page</p>
              </div>

              <div>
                <Label htmlFor="happy_investors">Happy Investors</Label>
                <Input
                  id="happy_investors"
                  type="number"
                  value={settings.happy_investors}
                  onChange={(e) => setSettings({ ...settings, happy_investors: parseInt(e.target.value) || 0 })}
                />
                <p className="text-xs text-slate-500 mt-1">Shows on About page</p>
              </div>

              <div>
                <Label htmlFor="company_phone">Company Phone</Label>
                <Input
                  id="company_phone"
                  value={settings.company_phone}
                  onChange={(e) => setSettings({ ...settings, company_phone: e.target.value })}
                />
                <p className="text-xs text-slate-500 mt-1">Shows on all pages</p>
              </div>

              <div>
                <Label htmlFor="company_email">Company Email</Label>
                <Input
                  id="company_email"
                  type="email"
                  value={settings.company_email}
                  onChange={(e) => setSettings({ ...settings, company_email: e.target.value })}
                />
                <p className="text-xs text-slate-500 mt-1">Shows on all pages</p>
              </div>
            </div>

            <Button onClick={handleSave} disabled={isSaving} className="w-full bg-blue-600 hover:bg-blue-700" size="lg">
              <Save className="h-4 w-4 mr-2" />
              {isSaving ? "Saving..." : "Save All Settings"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
