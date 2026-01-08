"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, DollarSign, Plus, Settings } from "lucide-react";

export default function InvestmentsEditor() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check authentication
    const session = localStorage.getItem("flipco_admin_session");
    if (session !== "authenticated") {
      router.push("/admin");
      return;
    }
    setIsAuthenticated(true);
  }, [router]);

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
                <h1 className="text-xl font-bold text-slate-900">Investment Opportunities</h1>
                <p className="text-sm text-slate-500">Manage current investment opportunities</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardContent className="flex items-center justify-center h-64">
            <div className="text-center">
              <DollarSign className="h-12 w-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-900 mb-2">Investment Editor Coming Soon</h3>
              <p className="text-slate-600">This section will allow you to manage current investment opportunities</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
