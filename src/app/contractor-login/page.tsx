"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowLeft, HardHat, User, Lock, Eye, EyeOff, AlertCircle } from "lucide-react";

export default function ContractorLoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [requiresPasswordChange, setRequiresPasswordChange] = useState(false);
  const [tempCredentials, setTempCredentials] = useState({ username: "", tempPassword: "" });
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const formData = new FormData(e.target as HTMLFormElement);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    try {
      // Check if this is a temporary credential login
      const tempCredentialsCheck = await fetch("/api/check-temp-credentials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });

      const tempResult = await tempCredentialsCheck.json();

      if (tempResult.isTemporary) {
        // This is a temporary credential - require password change
        setRequiresPasswordChange(true);
        setTempCredentials({ username, tempPassword: password });
        setError("");
      } else {
        // Regular login attempt
        const loginResponse = await fetch("/api/contractor-login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password })
        });

        const loginResult = await loginResponse.json();

        if (loginResult.success) {
          // Store session and redirect to dashboard
          localStorage.setItem("contractor_session", "authenticated");
          localStorage.setItem("contractor_username", username);
          router.push("/contractor-dashboard");
        } else {
          setError("Invalid username or password. If you just received temporary credentials, make sure you're using them exactly as provided.");
        }
      }
    } catch (error) {
      setError("Login failed. Please try again or contact support at (555) 123-4567.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const formData = new FormData(e.target as HTMLFormElement);
    const newUsername = formData.get("newUsername") as string;
    const newPassword = formData.get("newPassword") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (newPassword !== confirmPassword) {
      setError("New passwords don't match.");
      setIsLoading(false);
      return;
    }

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters long.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/change-contractor-credentials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tempUsername: tempCredentials.username,
          tempPassword: tempCredentials.tempPassword,
          newUsername,
          newPassword
        })
      });

      const result = await response.json();

      if (result.success) {
        // Store session and redirect
        localStorage.setItem("contractor_session", "authenticated");
        localStorage.setItem("contractor_username", newUsername);
        router.push("/contractor-dashboard");
      } else {
        setError(result.error || "Failed to change credentials. Please try again.");
      }
    } catch (error) {
      setError("Failed to change credentials. Please try again or contact support.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center text-green-600 hover:text-green-700 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-green-800 rounded-lg flex items-center justify-center">
              <HardHat className="text-white h-6 w-6" />
            </div>
            <span className="text-2xl font-bold text-slate-900">Contractor Portal</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            {requiresPasswordChange ? "Set Your Credentials" : "Contractor Login"}
          </h1>
          <p className="text-slate-600">
            {requiresPasswordChange
              ? "Choose your own username and password"
              : "Access your contractor dashboard"
            }
          </p>
        </div>

        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="flex items-center justify-center gap-2">
              {requiresPasswordChange ? (
                <>
                  <Lock className="h-5 w-5" />
                  Create Your Credentials
                </>
              ) : (
                <>
                  <User className="h-5 w-5" />
                  Login
                </>
              )}
            </CardTitle>
            <CardDescription className="text-center">
              {requiresPasswordChange
                ? "Your temporary credentials worked! Now create your permanent login details."
                : "Enter your username and password to continue"
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!requiresPasswordChange ? (
              /* Regular Login Form */
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="Enter your username"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="pr-10"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <Button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700"
                  disabled={isLoading}
                >
                  {isLoading ? "Logging in..." : "Login"}
                </Button>
              </form>
            ) : (
              /* Password Change Form */
              <form onSubmit={handlePasswordChange} className="space-y-4">
                <Alert className="bg-green-50 border-green-200">
                  <AlertCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">
                    First-time login detected. Please create your permanent credentials below.
                  </AlertDescription>
                </Alert>

                <div className="space-y-2">
                  <Label htmlFor="newUsername">Choose Your Username</Label>
                  <Input
                    id="newUsername"
                    name="newUsername"
                    type="text"
                    placeholder="Create your username"
                    defaultValue={tempCredentials.username.replace('_temp', '')}
                    required
                  />
                  <p className="text-xs text-slate-500">This will be your permanent username</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="newPassword">Create Password</Label>
                  <div className="relative">
                    <Input
                      id="newPassword"
                      name="newPassword"
                      type={showNewPassword ? "text" : "password"}
                      placeholder="Create a secure password"
                      className="pr-10"
                      required
                      minLength={8}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                  <p className="text-xs text-slate-500">At least 8 characters</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      className="pr-10"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <Button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700"
                  disabled={isLoading}
                >
                  {isLoading ? "Setting up..." : "Complete Setup & Login"}
                </Button>
              </form>
            )}

            {!requiresPasswordChange && (
              <div className="mt-6 text-center">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">New Contractor?</h4>
                  <p className="text-sm text-green-800 mb-3">
                    If you just applied and received temporary credentials via email or phone, use those to login.
                  </p>
                  <Link
                    href="/contractor-register"
                    className="text-green-600 hover:text-green-700 font-medium text-sm"
                  >
                    Don't have credentials yet? Apply here →
                  </Link>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <p className="text-xs text-slate-500">
            Having trouble logging in? Call or text us at (555) 123-4567
          </p>
        </div>
      </div>
    </div>
  );
}
