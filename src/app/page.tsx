"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import DemoVideoModal from "@/components/DemoVideoModal";
import PWAInstaller from "@/components/PWAInstaller";
import InstallAppButton from "@/components/InstallAppButton";
import { Phone, Mail, PlayCircle, TrendingUp, Shield, Eye, Users, Home, DollarSign, BarChart3, Menu, X } from "lucide-react";


interface InvestmentOpportunity {
  id: string;
  name: string;
  address: string;
  status: string;
  statusColor: string;
  roi: number;
  projectedProfit: number;
  purchasePrice: number;
  renovationBudget: number;
  estimatedARV: number;
  timeline: string;
  image: string;
  investmentTiers: {
    bronze: number;
    silver: number;
    gold: number;
  };
}


interface InvestmentOpportunity {
  id: string;
  name: string;
  address: string;
  status: string;
  statusColor: string;
  roi: number;
  projectedProfit: number;
  purchasePrice: number;
  renovationBudget: number;
  estimatedARV: number;
  timeline: string;
  image: string;
  investmentTiers: {
    bronze: number;
    silver: number;
    gold: number;
  };
}

export default function HomePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showDemoVideo, setShowDemoVideo] = useState(false);
  const [opportunities, setOpportunities] = useState<InvestmentOpportunity[]>([]);

  // Load investment opportunities from admin panel
  useEffect(() => {
    const savedOpportunities = localStorage.getItem("flipco_investment_opportunities");
    if (savedOpportunities) {
      setOpportunities(JSON.parse(savedOpportunities));
    } else {
      // Default opportunities if none saved - save them to localStorage so they appear in projects page
      const defaultOpportunities = [
        {
          id: "maple-ridge",
          name: "Maple Ridge Drive",
          address: "Westfield, TX • 3 bed, 2 bath • 1,850 sq ft",
          status: "Available Now",
          statusColor: "green",
          roi: 32,
          projectedProfit: 67500,
          purchasePrice: 195000,
          renovationBudget: 52500,
          estimatedARV: 325000,
          timeline: "4 months",
          image: "https://images.unsplash.com/photo-1449844908441-8829872d2607?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          investmentTiers: { bronze: 28, silver: 30, gold: 32 }
        },
        {
          id: "oakmont-circle",
          name: "Oakmont Circle",
          address: "Sugar Land, TX • 4 bed, 3 bath • 2,340 sq ft",
          status: "Starting Soon",
          statusColor: "orange",
          roi: 29,
          projectedProfit: 81200,
          purchasePrice: 245000,
          renovationBudget: 63800,
          estimatedARV: 400000,
          timeline: "5 months",
          image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          investmentTiers: { bronze: 25, silver: 27, gold: 29 }
        }
      ];

      // Save defaults to localStorage so they sync to projects page
      localStorage.setItem("flipco_investment_opportunities", JSON.stringify(defaultOpportunities));
      setOpportunities(defaultOpportunities);
    }
  }, []);

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");

    const formData = new FormData(e.currentTarget);
    const data = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      investment: formData.get("investment"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitMessage("Thank you for your interest! We'll contact you within 24 hours.");
        (e.target as HTMLFormElement).reset();
      } else {
        setSubmitMessage("There was an error submitting your form. Please try again.");
      }
    } catch (error) {
      setSubmitMessage("There was an error submitting your form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen relative">
      {/* Background Image with Overlay */}
      <div
        className="fixed inset-0 w-full h-full"
        style={{
          backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center bottom",
          backgroundRepeat: "no-repeat",
          zIndex: -1
        }}
      />

      {/* Content Layer */}
      <div className="relative z-10">
        {/* Navigation */}
        <nav className="fixed top-0 w-full bg-white/98 backdrop-blur-md border-b border-slate-200 z-50 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">FC</span>
                </div>
                <span className="text-slate-900 font-bold text-xl">Flipco Capital</span>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-6">
                <a href="#home" className="text-slate-700 hover:text-blue-600 transition-colors">Home</a>
                <a href="/about" className="text-slate-700 hover:text-blue-600 transition-colors">About</a>
                <a href="/projects" className="text-slate-700 hover:text-blue-600 transition-colors">Projects</a>
                <a href="#contact" className="text-slate-700 hover:text-blue-600 transition-colors">Contact</a>
                <a href="/login" className="text-slate-700 hover:text-blue-600 transition-colors">Investor Portal</a>
                <a href="/contractor-login" className="text-slate-700 hover:text-green-600 transition-colors">Contractor Portal</a>
                <a href="#faq" className="text-slate-700 hover:text-blue-600 transition-colors">FAQ</a>
                <Button asChild className="bg-blue-600 hover:bg-blue-700">
                  <a href="/register">Get Started</a>
                </Button>
              </div>

              {/* Mobile Menu Button */}
              <div className="md:hidden">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            {/* Mobile Navigation */}
            {isMobileMenuOpen && (
              <div className="md:hidden">
                <div className="px-2 pt-2 pb-3 space-y-1 bg-blue-600 border-t border-blue-500">
                  <a href="#home" className="block px-3 py-2 text-white hover:text-blue-200 transition-colors">Home</a>
                  <a href="/about" className="block px-3 py-2 text-white hover:text-blue-200 transition-colors">About</a>
                  <a href="/projects" className="block px-3 py-2 text-white hover:text-blue-200 transition-colors">Projects</a>
                  <a href="#contact" className="block px-3 py-2 text-white hover:text-blue-200 transition-colors">Contact</a>
                  <a href="/login" className="block px-3 py-2 text-white hover:text-blue-200 transition-colors">Investor Portal</a>
                  <a href="/contractor-login" className="block px-3 py-2 text-white hover:text-green-300 transition-colors">Contractor Portal</a>
                  <a href="#faq" className="block px-3 py-2 text-white hover:text-blue-200 transition-colors">FAQ</a>
                  <div className="px-3 py-2">
                    <Button asChild className="w-full bg-white text-blue-600 hover:bg-blue-50">
                      <a href="/register">Get Started</a>
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Hero Section */}
        <section
          id="home"
          className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 relative"
        >
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[600px]">
              <div className="space-y-8">
                <div className="space-y-4">
                  <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight drop-shadow-lg">
                    Real Estate Investment
                    <span className="text-blue-400 block">Made Transparent</span>
                  </h1>
                  <p className="text-xl text-gray-100 leading-relaxed drop-shadow-md">
                    Partner with Flipco Capital for complete transparency in fix-and-flip investments. Every project is co-owned with live tracking, real-time cost breakdowns, and guaranteed returns.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3">
                    <DollarSign className="mr-2 h-5 w-5" />
                    Start Investing
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="text-lg px-8 py-3"
                    onClick={() => setShowDemoVideo(true)}
                  >
                    <PlayCircle className="mr-2 h-5 w-5" />
                    Watch Demo
                  </Button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white border-opacity-30">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-400 drop-shadow-lg">1500+</div>
                    <div className="text-sm text-gray-100 drop-shadow-md">Properties Flipped</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-400 drop-shadow-lg">30%</div>
                    <div className="text-sm text-gray-100 drop-shadow-md">Average ROI</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-400 drop-shadow-lg">100%</div>
                    <div className="text-sm text-gray-100 drop-shadow-md">Transparency</div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-8 text-white shadow-2xl">
                  <div className="space-y-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-blue-100">Live Project Tracking</span>
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>Purchase Price</span>
                        <span className="font-semibold">$180,000</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Rehab Budget</span>
                        <span className="font-semibold">$45,000</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Estimated Sale</span>
                        <span className="font-semibold">$285,000</span>
                      </div>
                      <div className="border-t border-blue-400 pt-2">
                        <div className="flex justify-between items-center text-lg font-bold">
                          <span>Projected Profit</span>
                          <span className="text-green-300">$60,000</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-700/50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm">Project Progress</span>
                        <span className="text-sm">75%</span>
                      </div>
                      <div className="w-full bg-blue-800 rounded-full h-2">
                        <div className="bg-green-400 h-2 rounded-full" style={{width: '75%'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Partnership Model Section */}
        <section className="py-16 bg-white/90 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">
                True Partnership Investment Model
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-6">
                At Flipco Capital, we partner up with investors. Every project is co-owned with the investor
                under a separate limited liability company created for every property.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 max-w-4xl mx-auto">
                <p className="text-lg text-blue-900 leading-relaxed">
                  We focus on strategically acquiring low-risk properties in high-demand markets, specifically targeting areas with historically low days on market. Our data-driven approach and rigorous due diligence have resulted in a <strong>95% profitability rate</strong> across all transactions, delivering consistent and reliable returns for our investment partners.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">Co-Ownership Structure</h3>
                    <p className="text-slate-600">
                      Each project has its own LLC where you and Flipco Capital are co-owners.
                      You provide capital, we provide equity and expertise.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Eye className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">Live Video Monitoring</h3>
                    <p className="text-slate-600">
                      Watch your investment progress with live video feeds of every project.
                      See the transformation happen in real-time.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <BarChart3 className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">Real-Time Cost Tracking</h3>
                    <p className="text-slate-600">
                      Complete transparency with live breakdowns of actual vs estimated costs,
                      holding costs, rehab expenses, and projected profits.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg mt-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-6">Full Transparency Breakdown</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="text-slate-600">Purchase Price</span>
                    <span className="font-semibold">Disclosed</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="text-slate-600">Holding Costs</span>
                    <span className="font-semibold">Live Tracking</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="text-slate-600">Rehab Costs</span>
                    <span className="font-semibold">Real-Time Updates</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="text-slate-600">Sales Price</span>
                    <span className="font-semibold">Market Analysis</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="text-slate-600">Closing Costs</span>
                    <span className="font-semibold">Detailed Breakdown</span>
                  </div>
                  <div className="flex justify-between items-center py-3 bg-blue-50 px-4 rounded-lg mt-4">
                    <span className="text-blue-900 font-semibold">Net Income</span>
                    <span className="text-blue-900 font-bold">Guaranteed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section id="process" className="py-16 bg-slate-50/90 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">Our Process</h2>
              <p className="text-xl text-slate-600">Simple, transparent, and profitable</p>
              <p className="text-2xl font-semibold text-blue-600 mt-4">We Unlock Wealth with Unmatched Ease</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center p-6 border-2 hover:border-blue-200 transition-colors">
                <CardHeader>
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Home className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">We Find the Deals</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Our expert team identifies undervalued properties with high profit potential
                    using proven market analysis and acquisition strategies.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="text-center p-6 border-2 hover:border-blue-200 transition-colors">
                <CardHeader>
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <DollarSign className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">You Invest</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Choose from our vetted investment opportunities. Each project forms a separate LLC
                    where you become our co-owner and capital partner.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="text-center p-6 border-2 hover:border-blue-200 transition-colors">
                <CardHeader>
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">We Execute & Profit</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    We handle all renovation work with complete transparency. Track progress live
                    and receive your returns when the property sells.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 bg-white/90 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">Platform Features</h2>
              <p className="text-xl text-slate-600">Advanced technology for complete investment transparency</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <PlayCircle className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Live Video Feed</h3>
                <p className="text-slate-600">
                  24/7 access to live video streams of your property renovation progress.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Cost Tracking</h3>
                <p className="text-slate-600">
                  Real-time breakdown of all project costs with actual vs estimated comparisons.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Legal Protection</h3>
                <p className="text-slate-600">
                  Each investment is protected under its own LLC structure for maximum security.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Profit Projections</h3>
                <p className="text-slate-600">
                  Detailed financial projections updated throughout the project lifecycle.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <Eye className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Full Transparency</h3>
                <p className="text-slate-600">
                  Complete visibility into every aspect of your investment from start to finish.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Partnership Model</h3>
                <p className="text-slate-600">
                  True partnership where you and Flipco Capital are co-owners of every project.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-16 bg-slate-50/90 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
              <p className="text-xl text-slate-600">
                Get answers to common questions about investing with Flipco Capital
              </p>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <details className="group">
                  <summary className="flex justify-between items-center p-6 cursor-pointer hover:bg-gray-50 transition-colors">
                    <h3 className="text-lg font-semibold text-slate-900">What is the minimum investment amount?</h3>
                    <span className="text-2xl text-blue-600 group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <div className="px-6 pb-6 text-slate-600">
                    <p>Our minimum investment is $50,000 per project. This allows us to maintain quality partnerships while ensuring each investor has meaningful equity in the project. We also offer multiple investment tiers to accommodate different capital levels, with larger investments receiving preferential terms.</p>
                  </div>
                </details>
              </div>

              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <details className="group">
                  <summary className="flex justify-between items-center p-6 cursor-pointer hover:bg-gray-50 transition-colors">
                    <h3 className="text-lg font-semibold text-slate-900">What is the typical timeline for a project?</h3>
                    <span className="text-2xl text-blue-600 group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <div className="px-6 pb-6 text-slate-600">
                    <p>Most fix-and-flip projects are completed within 4-6 months from purchase to sale. This includes 2-3 months for renovation and 1-3 months for marketing and sale. You'll receive regular updates throughout the process and can track progress in real-time through our investor portal.</p>
                  </div>
                </details>
              </div>

              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <details className="group">
                  <summary className="flex justify-between items-center p-6 cursor-pointer hover:bg-gray-50 transition-colors">
                    <h3 className="text-lg font-semibold text-slate-900">What are the main risks involved?</h3>
                    <span className="text-2xl text-blue-600 group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <div className="px-6 pb-6 text-slate-600">
                    <p>Like all real estate investments, risks include market fluctuations, construction delays, and unexpected repair costs. However, our 95% profitability rate reflects our rigorous due diligence process. We mitigate risks through thorough property inspections, conservative ARV estimates, and maintaining contingency reserves for each project.</p>
                  </div>
                </details>
              </div>

              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <details className="group">
                  <summary className="flex justify-between items-center p-6 cursor-pointer hover:bg-gray-50 transition-colors">
                    <h3 className="text-lg font-semibold text-slate-900">How are profits distributed?</h3>
                    <span className="text-2xl text-blue-600 group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <div className="px-6 pb-6 text-slate-600">
                    <p>Profits are distributed based on the equity percentage outlined in your LLC operating agreement. Typically, investors receive their initial capital back first, followed by a predetermined profit split. All distributions are made within 30 days of the property sale closing, with full documentation provided.</p>
                  </div>
                </details>
              </div>

              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <details className="group">
                  <summary className="flex justify-between items-center p-6 cursor-pointer hover:bg-gray-50 transition-colors">
                    <h3 className="text-lg font-semibold text-slate-900">How do you select properties?</h3>
                    <span className="text-2xl text-blue-600 group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <div className="px-6 pb-6 text-slate-600">
                    <p>We use a data-driven approach focusing on properties in high-demand markets with historically low days on market. Each property undergoes comprehensive analysis including neighborhood comps, renovation cost estimates, and market timing. Only properties meeting our strict ROI criteria are presented to investors.</p>
                  </div>
                </details>
              </div>

              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <details className="group">
                  <summary className="flex justify-between items-center p-6 cursor-pointer hover:bg-gray-50 transition-colors">
                    <h3 className="text-lg font-semibold text-slate-900">What level of involvement do investors have?</h3>
                    <span className="text-2xl text-blue-600 group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <div className="px-6 pb-6 text-slate-600">
                    <p>As co-owners through the LLC structure, investors have full transparency and regular communication but can remain passive. We handle all day-to-day operations, contractor management, and sales processes. Investors receive weekly progress reports and have access to our live video feeds and cost tracking systems.</p>
                  </div>
                </details>
              </div>

              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <details className="group">
                  <summary className="flex justify-between items-center p-6 cursor-pointer hover:bg-gray-50 transition-colors">
                    <h3 className="text-lg font-semibold text-slate-900">Are there any tax implications I should know about?</h3>
                    <span className="text-2xl text-blue-600 group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <div className="px-6 pb-6 text-slate-600">
                    <p>Profits from fix-and-flip investments are typically treated as ordinary income rather than capital gains. Each project LLC will provide you with a K-1 form for tax reporting. We recommend consulting with a tax professional familiar with real estate investments to understand your specific situation and potential strategies.</p>
                  </div>
                </details>
              </div>

              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <details className="group">
                  <summary className="flex justify-between items-center p-6 cursor-pointer hover:bg-gray-50 transition-colors">
                    <h3 className="text-lg font-semibold text-slate-900">How do I get started?</h3>
                    <span className="text-2xl text-blue-600 group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <div className="px-6 pb-6 text-slate-600">
                    <p>Getting started is simple: (1) Schedule a consultation to discuss your investment goals, (2) Review our current available projects, (3) Complete our investor qualification process, (4) Choose your investment amount and project, (5) Sign the LLC operating agreement (6) Fund your investment by wire transfer to the attorney of record IOLTA trust account for auction purchases, or the Title Company for outside auction purchases. The entire process typically takes 1-2 business days.</p>
                  </div>
                </details>
              </div>
            </div>
          </div>
        </section>

        {/* Current Investment Opportunities Section */}
        <section id="opportunities" className="py-16 bg-white/90 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">Current Investment Opportunities</h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Partner with us on these vetted, high-potential fix-and-flip projects. Each opportunity includes full transparency, live monitoring, and co-ownership through dedicated LLCs.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 mb-12">
              {opportunities.map((opportunity) => {
                const statusColorMap: { [key: string]: string } = {
                  green: "bg-green-600",
                  orange: "bg-orange-600",
                  blue: "bg-blue-600",
                  red: "bg-red-600"
                };
                const statusBg = statusColorMap[opportunity.statusColor] || "bg-blue-600";

                return (
                  <div key={opportunity.id} className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
                    <div className="relative h-64">
                      <img
                        src={opportunity.image}
                        alt={`${opportunity.name} Property`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <span className={`${statusBg} text-white px-3 py-1 rounded-full text-sm font-semibold`}>
                          {opportunity.status}
                        </span>
                      </div>
                      <div className="absolute top-4 right-4">
                        <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                          {opportunity.roi}% Projected ROI
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-2xl font-bold text-slate-900">{opportunity.name}</h3>
                          <p className="text-slate-600">{opportunity.address}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-green-600">
                            ${opportunity.projectedProfit.toLocaleString()}
                          </p>
                          <p className="text-sm text-slate-500">Projected Profit</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-slate-50 p-3 rounded-lg">
                          <p className="text-sm text-slate-600">Purchase Price</p>
                          <p className="text-lg font-semibold">${opportunity.purchasePrice.toLocaleString()}</p>
                        </div>
                        <div className="bg-slate-50 p-3 rounded-lg">
                          <p className="text-sm text-slate-600">Renovation Budget</p>
                          <p className="text-lg font-semibold">${opportunity.renovationBudget.toLocaleString()}</p>
                        </div>
                        <div className="bg-slate-50 p-3 rounded-lg">
                          <p className="text-sm text-slate-600">Estimated ARV</p>
                          <p className="text-lg font-semibold">${opportunity.estimatedARV.toLocaleString()}</p>
                        </div>
                        <div className="bg-slate-50 p-3 rounded-lg">
                          <p className="text-sm text-slate-600">Timeline</p>
                          <p className="text-lg font-semibold">{opportunity.timeline}</p>
                        </div>
                      </div>

                      <div className="border-t pt-4 mb-4">
                        <h4 className="font-semibold text-slate-900 mb-2">Investment Tiers</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-slate-600">Bronze ($50K-$74K)</span>
                            <span className="text-sm font-semibold text-blue-600">{opportunity.investmentTiers.bronze}% ROI</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-slate-600">Silver ($75K-$99K)</span>
                            <span className="text-sm font-semibold text-blue-600">{opportunity.investmentTiers.silver}% ROI</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-slate-600">Gold ($100K+)</span>
                            <span className="text-sm font-semibold text-blue-600">{opportunity.investmentTiers.gold}% ROI</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex space-x-3">
                        <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                          Reserve Your Spot
                        </Button>
                        <Button variant="outline" className="flex-1">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Recently Completed Project */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 border border-green-200">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">✅ Recently Completed Success Story</h3>
                <p className="text-slate-600">See the results our investors achieved with our last project</p>
              </div>

              <div className="grid md:grid-cols-4 gap-6 text-center">
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <div className="text-2xl font-bold text-green-600 mb-2">Heritage Lane</div>
                  <div className="text-sm text-slate-600">Katy, TX</div>
                  <div className="text-lg font-semibold text-slate-900 mt-2">$89,500 Profit</div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <div className="text-3xl font-bold text-blue-600 mb-2">34%</div>
                  <div className="text-sm text-slate-600">Actual ROI</div>
                  <div className="text-sm text-green-600 mt-2">+4% over projection</div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <div className="text-3xl font-bold text-blue-600 mb-2">3.8</div>
                  <div className="text-sm text-slate-600">Months to Complete</div>
                  <div className="text-sm text-green-600 mt-2">Ahead of schedule</div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <div className="text-3xl font-bold text-blue-600 mb-2">12</div>
                  <div className="text-sm text-slate-600">Days on Market</div>
                  <div className="text-sm text-green-600 mt-2">Sold above asking</div>
                </div>
              </div>
            </div>

            <div className="text-center mt-12">
              <div className="bg-blue-50 rounded-xl p-8 border border-blue-200">
                <h3 className="text-2xl font-bold text-blue-900 mb-4">🚀 Limited Investment Spots Available</h3>
                <p className="text-blue-700 mb-6 max-w-2xl mx-auto">
                  Our investment opportunities fill up quickly due to high demand and limited partnership spots per project. Reserve your position today to secure access to our highest-performing deals.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 flex-1">
                    Schedule Consultation
                  </Button>
                  <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 flex-1">
                    Download Deal Sheet
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-16 bg-slate-50/90 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-4xl font-bold text-slate-900 mb-6">Ready to Start Investing?</h2>
                <p className="text-xl text-slate-600 mb-8">
                  Get in touch with our team to learn more about our partnership opportunities
                  and start your journey toward transparent real estate investing.
                </p>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-blue-600" />
                    <span className="text-slate-700">(713) 545-3662</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-blue-600" />
                    <span className="text-slate-700">invest@flipcocapital.com</span>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-blue-50 rounded-xl">
                  <h3 className="text-lg font-semibold text-blue-900 mb-2">Investment Minimums</h3>
                  <p className="text-blue-700">Starting at $50,000 per project</p>
                  <p className="text-sm text-blue-600 mt-2">
                    Multiple investment tiers available to accommodate different capital levels
                  </p>
                </div>
              </div>

              <Card className="p-8">
                <CardHeader>
                  <CardTitle className="text-2xl">Contact Us</CardTitle>
                  <CardDescription>
                    Leave your details and we'll get back to you within 24 hours to discuss investment opportunities.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" name="firstName" placeholder="John" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" name="lastName" placeholder="Doe" required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" name="email" type="email" placeholder="john@example.com" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" name="phone" type="tel" placeholder="(555) 123-4567" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="investment">Investment Amount</Label>
                      <Input id="investment" name="investment" placeholder="$50,000" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea id="message" name="message" placeholder="Tell us about your investment goals..." rows={4} required />
                    </div>

                    {submitMessage && (
                      <div className={`p-3 rounded-lg text-sm ${
                        submitMessage.includes("Thank you")
                          ? "bg-green-50 text-green-800 border border-green-200"
                          : "bg-red-50 text-red-800 border border-red-200"
                      }`}>
                        {submitMessage}
                      </div>
                    )}

                    <Button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-blue-600 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8">
              <div className="col-span-2">
                <div className="flex items-center space-x-3 mb-4">
                  <img
                    src="/flipco-logo.svg"
                    alt="Flipco Capital"
                    className="w-20 h-16"
                  />
                  <span className="text-white font-bold text-2xl">Flipco Capital</span>
                </div>
                <p className="text-blue-100 mb-4">
                  Transparent real estate investment partnerships with complete visibility
                  and guaranteed returns through our innovative co-ownership model.
                </p>
                <p className="text-sm text-blue-200">
                  © 2024 Flipco Capital. All rights reserved.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Company</h3>
                <ul className="space-y-2 text-blue-100">
                  <li><a href="/about" className="hover:text-white transition-colors">About Us</a></li>
                  <li><a href="/projects" className="hover:text-white transition-colors">Projects</a></li>
                  <li><a href="/blog" className="hover:text-white transition-colors">Blog</a></li>
                  <li><a href="/dashboard" className="hover:text-white transition-colors">Investor Portal</a></li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Legal</h3>
                <ul className="space-y-2 text-blue-100">
                  <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Investment Disclaimer</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">SEC Filings</a></li>
                </ul>
              </div>
            </div>
          </div>
        </footer>

        {/* Demo Video Modal */}
        <DemoVideoModal
          isOpen={showDemoVideo}
          onClose={() => setShowDemoVideo(false)}
        />

        {/* PWA Install Prompt */}
        <PWAInstaller />
        
        {/* Manual Install Button for Firefox and other browsers */}
        <InstallAppButton />
      </div>
    </div>
  );
}
