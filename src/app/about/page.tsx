"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Users,
  Target,
  Award,
  TrendingUp,
  Shield,
  Heart,
  Linkedin,
  Mail,
  Phone
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

export default function AboutPage() {
  // Start empty to avoid hydration mismatch - will load from localStorage
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Fallback defaults if localStorage is empty
  const defaultTeamMembers = [
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
      name: "Soora Javadian",
      title: "Chief Architect",
      image: "https://ugc.same-assets.com/XcSQ4lhUnwXoan66_eBFbAWtOwRYJGQn.jpeg",
      bio: "Experienced architect specializing in residential and commercial design with a focus on innovative and functional spaces.",
      experience: "15+ Years",
      specialties: ["Architectural Design", "Project Planning", "Construction Oversight"],
      linkedin: "#",
      email: "soora@flipcocapital.com"
    },
    // Additional team member slots (hidden until filled)
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

  // Load team members from Supabase on client side only
  useEffect(() => {
    loadTeamMembers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadTeamMembers = async () => {
    try {
      const response = await fetch('/api/team-members');
      const result = await response.json();

      if (result.success && result.data && result.data.length > 0) {
        console.log("✅ Loading team members from Supabase");
        const formatted = result.data.map((item: any) => ({
          name: item.name,
          title: item.title,
          image: item.image,
          bio: item.bio,
          experience: item.experience,
          specialties: item.specialties,
          linkedin: item.linkedin,
          email: item.email
        }));
        setTeamMembers(formatted);
      } else {
        console.log("📝 No Supabase data, using defaults");
        setTeamMembers(defaultTeamMembers);
      }
    } catch (error) {
      console.error('Error loading team members:', error);
      setTeamMembers(defaultTeamMembers);
    }
    setIsLoaded(true);
  };

  // Filter out empty team members (only show filled ones on public site)
  const visibleTeamMembers = teamMembers.filter(member => member.name && member.name.trim() !== "");

  const companyValues = [
    {
      icon: Shield,
      title: "Complete Transparency",
      description: "Every dollar spent, every decision made, every milestone reached - you see it all in real-time."
    },
    {
      icon: Users,
      title: "True Partnership",
      description: "You're not just an investor, you're our business partner with shared ownership and aligned interests."
    },
    {
      icon: Target,
      title: "Data-Driven Decisions",
      description: "Every investment is backed by thorough market analysis and proven acquisition strategies."
    },
    {
      icon: Heart,
      title: "Investor-First Approach",
      description: "Your success is our success. We prioritize investor returns and long-term relationships."
    }
  ];

  const milestones = [
    {
      year: "2005",
      title: "First Properties Purchased At The Foreclosure Trustee Auction",
      description: "Started with a goal to acquire properties at below market prices"
    },
    {
      year: "2009",
      title: "First LLC Partnership",
      description: "During the market crash of 2009 created opportunities to purchase over 500 properties at deeply discounted prices"
    },
    {
      year: "2012",
      title: "Post Pandemic Investment Opportunity",
      description: "The pandemic created unprecedented shifts in the housing market, purchased over 300 properties outside the MLS and auction at deeply discounted prices"
    },
    {
      year: "2020",
      title: "1500+ Projects Milestone",
      description: "Successfully completed 1500+ property flips with average 25% returns for investors."
    },
    {
      year: "2024",
      title: "1500+ Projects Milestone",
      description: "Successfully completed 1500+ property flips with average 25% returns for investors."
    },
    {
      year: "2025",
      title: "Technology Platform Launch",
      description: "Developed our proprietary platform for live project tracking and real-time cost monitoring."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      {/* Navigation */}
      <nav className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">FC</span>
              </div>
              <span className="text-xl font-bold text-slate-900">Flipco Capital</span>
            </Link>
            <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-slate-900 mb-6">
            About Flipco Capital
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            We're revolutionizing real estate investment through complete transparency,
            innovative technology, and true partnership models. Our mission is to provide
            investors with unprecedented visibility into every aspect of their investments.
          </p>
        </div>

        {/* Investment Approach Section */}
        <section className="mb-16">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-8 md:p-12 border border-slate-200">
              <div className="space-y-6 text-slate-700 leading-relaxed">
                <p>
                  We carefully select investment properties by drawing on our deep expertise in foreclosure and trust deed auctions, enabling us to acquire high-quality assets at significant discounts below market value.
                </p>
                <p>
                  Our proven track record as dependable, fast-closing buyers—supported by an extensive network of attorneys, engineers, contractors, and licensed professionals—consistently delivers exclusive off-market opportunities through strong industry relationships and targeted marketing efforts.
                </p>
                <p>
                  In addition, we employ a sophisticated data-driven approach powered by advanced AI analytics to identify properties in high-demand markets characterized by low days on market and strong appreciation potential.
                </p>
                <p>
                  Every prospective property undergoes rigorous due diligence, including comprehensive comparable sales analysis, detailed renovation cost estimates, and precise market timing evaluation. Only those opportunities that satisfy our stringent return-on-investment criteria are selected and presented to our investors, ensuring optimal performance and reduced risk.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Company Values */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">Our Core Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {companyValues.map((value, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{value.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Company History */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">Our Journey</h2>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex items-start space-x-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">{milestone.year}</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">{milestone.title}</h3>
                    <p className="text-slate-600">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Statistics */}
        <section className="mb-16 bg-blue-50 rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-8">By the Numbers</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">1500+</div>
              <div className="text-slate-600">Properties Flipped</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">$300M+</div>
              <div className="text-slate-600">Total Investment Volume</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">30+</div>
              <div className="text-slate-600">Happy Investors</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">30%</div>
              <div className="text-slate-600">Average ROI</div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-4">Meet Our Team</h2>
          <p className="text-slate-600 text-center mb-12 max-w-2xl mx-auto">
            Our experienced leadership team brings together decades of expertise in real estate,
            finance, construction, and technology to deliver exceptional results for our investors.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {!isLoaded ? (
              <div className="col-span-full text-center py-12 text-slate-500">
                Loading team members...
              </div>
            ) : visibleTeamMembers.length === 0 ? (
              <div className="col-span-full text-center py-12 text-slate-500">
                No team members available
              </div>
            ) : (
              visibleTeamMembers.map((member, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="aspect-square">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{member.name}</CardTitle>
                  <CardDescription className="font-medium text-blue-600">{member.title}</CardDescription>
                  <Badge variant="secondary" className="w-fit">{member.experience}</Badge>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-slate-600">{member.bio}</p>

                  <div>
                    <p className="text-sm font-medium text-slate-900 mb-2">Specialties:</p>
                    <div className="flex flex-wrap gap-1">
                      {member.specialties.map((specialty: string, idx: number) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Linkedin className="h-4 w-4 mr-1" />
                      LinkedIn
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Mail className="h-4 w-4 mr-1" />
                      Email
                    </Button>
                  </div>
                </CardContent>
              </Card>
              ))
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center bg-slate-900 rounded-2xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Partner With Us?</h2>
          <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
            Join our network of successful investors and experience the future of transparent
            real estate investment. Every project is a true partnership with complete visibility.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Link href="/register">
                <Users className="mr-2 h-5 w-5" />
                Become an Investor
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-slate-900">
              <Link href="/#contact">
                <Phone className="mr-2 h-5 w-5" />
                Schedule a Call
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
