"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Mail, Lock, ArrowLeft, Eye, EyeOff, AlertCircle, Clock, XCircle } from "lucide-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [errorType, setErrorType] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setErrorType("");

    try {
      const response = await fetch("/api/investor-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (result.success) {
        // Store investor session
        localStorage.setItem("flipco_investor_session", JSON.stringify(result.investor));
        // Redirect to dashboard
        window.location.href = "/dashboard";
      } else {
        setError(result.error);
        setErrorType(result.status || "error");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      setErrorType("error");
    } finally {
      setIsLoading(false);
    }
  };

  const getErrorIcon = () => {
    switch (errorType) {
      case "pending":
        return <Clock className="h-5 w-5 text-amber-600" />;
      case "rejected":
        return <XCircle className="h-5 w-5 text-red-600" />;
      default:
        return <AlertCircle className="h-5 w-5 text-red-600" />;
    }
  };

  const getErrorStyles = () => {
    switch (errorType) {
      case "pending":
        return "bg-amber-50 border-amber-200 text-amber-800";
      case "rejected":
        return "bg-red-50 border-red-200 text-red-800";
      default:
        return "bg-red-50 border-red-200 text-red-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">FC</span>
            </div>
            <span className="text-2xl font-bold text-slate-900">Flipco Capital</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome Back</h1>
          <p className="text-slate-600">Access your investment portfolio</p>
        </div>

        <Card className="shadow-lg border-0">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Investor Sign In</CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access your dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="investor@example.com"
                    className="pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="pl-10 pr-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {error && (
                <div className={`p-4 border rounded-lg flex items-start gap-3 ${getErrorStyles()}`}>
                  {getErrorIcon()}
                  <div>
                    <p className="font-medium">{error}</p>
                    {errorType === "pending" && (
                      <p className="text-sm mt-1 opacity-80">
                        We're reviewing your application. This usually takes 24-48 hours.
                      </p>
                    )}
                    {errorType === "rejected" && (
                      <p className="text-sm mt-1 opacity-80">
                        Contact us at invest@flipcocapital.com for more information.
                      </p>
                    )}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2 text-sm">
                  <input type="checkbox" className="rounded border-slate-300" />
                  <span className="text-slate-600">Remember me</span>
                </label>
                <Link href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-700">
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={isLoading}
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </Button>
            </form>

            <div className="mt-6">
              <Separator className="my-4" />
              <div className="text-center space-y-2">
                <p className="text-sm text-slate-600">
                  Don't have an account?{" "}
                  <Link href="/register" className="text-blue-600 hover:text-blue-700 font-medium">
                    Apply to invest
                  </Link>
                </p>
                <p className="text-xs text-slate-500">
                  For account assistance, contact{" "}
                  <a href="mailto:support@flipcocapital.com" className="text-blue-600 hover:text-blue-700">
                    support@flipcocapital.com
                  </a>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Info Notice */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> Only approved investors can access the dashboard.
            If you recently applied, please wait for approval notification via email.
          </p>
        </div>

        {/* Security Notice */}
        <div className="mt-4 text-center">
          <p className="text-xs text-slate-500">
            Your connection is secured with 256-bit SSL encryption
          </p>
        </div>
      </div>
    </div>
  );
}
