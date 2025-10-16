import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Calendar,
  User,
  Clock,
  TrendingUp,
  Home,
  DollarSign,
  BarChart3,
  ArrowRight,
  Search,
  Tag
} from "lucide-react";

export default function BlogPage() {
  const blogPosts = [
    {
      id: "q1-2024-market-report",
      title: "Q1 2024 Texas Real Estate Market Report: Strong Growth Continues",
      excerpt: "Our comprehensive analysis of the Texas real estate market shows continued strength with emerging opportunities in secondary markets. Austin leads with 12% year-over-year growth.",
      content: "Full market analysis and investment opportunities...",
      author: "Ela Namazi",
      authorRole: "Chief Operating Officer",
      publishDate: "2024-01-15",
      readTime: "5 min read",
      category: "Market Insights",
      tags: ["Market Analysis", "Texas", "Investment Strategy"],
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=400&fit=crop",
      featured: true
    },
    {
      id: "transparency-technology",
      title: "How Technology Drives Investment Transparency at Flipco Capital",
      excerpt: "Discover the innovative technology stack that enables our investors to track every dollar spent and monitor project progress in real-time through our proprietary platform.",
      content: "Deep dive into our technology platform...",
      author: "Cameron Namazi",
      authorRole: "Founder & CEO",
      publishDate: "2024-01-10",
      readTime: "4 min read",
      category: "Technology",
      tags: ["Technology", "Transparency", "Innovation"],
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=400&fit=crop",
      featured: false
    },
    {
      id: "renovation-cost-management",
      title: "Mastering Renovation Cost Management: Our Proven Strategies",
      excerpt: "Learn the cost control methodologies we use to keep projects on budget and maximize investor returns. Real examples from our recent successful flips.",
      content: "Detailed cost management strategies...",
      author: "Alex Rezaee",
      authorRole: "Head of Construction",
      publishDate: "2024-01-05",
      readTime: "6 min read",
      category: "Construction",
      tags: ["Construction", "Cost Management", "ROI"],
      image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=400&fit=crop",
      featured: false
    },
    {
      id: "investor-success-story",
      title: "Investor Spotlight: How John Achieved 35% ROI in 6 Months",
      excerpt: "Meet John Stevens, a first-time real estate investor who partnered with Flipco Capital and achieved exceptional returns through our transparent co-ownership model.",
      content: "Investor success story details...",
      author: "Mohammad Ramezani",
      authorRole: "Chief Engineer",
      publishDate: "2023-12-28",
      readTime: "3 min read",
      category: "Success Stories",
      tags: ["Investor Stories", "ROI", "Success"],
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=400&fit=crop",
      featured: false
    },
    {
      id: "llc-structure-benefits",
      title: "Understanding LLC Partnership Benefits in Real Estate Investment",
      excerpt: "A comprehensive guide to how our unique LLC structure for each property protects investors and aligns interests for maximum transparency and returns.",
      content: "LLC structure explanation...",
      author: "Mohammad Ramezani",
      authorRole: "Chief Engineer",
      publishDate: "2023-12-20",
      readTime: "7 min read",
      category: "Legal & Finance",
      tags: ["LLC", "Legal Structure", "Investment Protection"],
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop",
      featured: false
    },
    {
      id: "austin-market-opportunities",
      title: "Austin Real Estate: Why We're Bullish on Emerging Neighborhoods",
      excerpt: "An in-depth look at Austin's emerging neighborhoods where we're finding the best investment opportunities. Market data, growth projections, and our acquisition strategy.",
      content: "Austin market analysis...",
      author: "Cameron Namazi",
      authorRole: "Founder & CEO",
      publishDate: "2023-12-15",
      readTime: "5 min read",
      category: "Market Insights",
      tags: ["Austin", "Neighborhoods", "Market Trends"],
      image: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800&h=400&fit=crop",
      featured: false
    },
    {
      id: "construction-quality-standards",
      title: "Our Quality Standards: Why We Never Cut Corners",
      excerpt: "Behind the scenes look at our construction quality standards and vendor selection process that ensures every project meets the highest standards for maximum resale value.",
      content: "Quality standards details...",
      author: "Alex Rezaee",
      authorRole: "Head of Construction",
      publishDate: "2023-12-10",
      readTime: "4 min read",
      category: "Construction",
      tags: ["Quality", "Standards", "Construction"],
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=400&fit=crop",
      featured: false
    },
    {
      id: "2024-investment-outlook",
      title: "2024 Real Estate Investment Outlook: Opportunities Ahead",
      excerpt: "Our predictions for the 2024 real estate market and how investors can position themselves for success in the changing landscape.",
      content: "2024 outlook analysis...",
      author: "Ela Namazi",
      authorRole: "Chief Operating Officer",
      publishDate: "2023-12-01",
      readTime: "6 min read",
      category: "Market Insights",
      tags: ["2024 Outlook", "Predictions", "Strategy"],
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=400&fit=crop",
      featured: false
    }
  ];

  const categories = [
    "All Posts",
    "Market Insights",
    "Technology",
    "Construction",
    "Success Stories",
    "Legal & Finance"
  ];

  const featuredPost = blogPosts.find(post => post.featured);
  const recentPosts = blogPosts.filter(post => !post.featured);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Market Insights":
        return <TrendingUp className="h-4 w-4" />;
      case "Technology":
        return <BarChart3 className="h-4 w-4" />;
      case "Construction":
        return <Home className="h-4 w-4" />;
      case "Success Stories":
        return <DollarSign className="h-4 w-4" />;
      case "Legal & Finance":
        return <User className="h-4 w-4" />;
      default:
        return <Tag className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Market Insights":
        return "bg-blue-100 text-blue-800";
      case "Technology":
        return "bg-purple-100 text-purple-800";
      case "Construction":
        return "bg-orange-100 text-orange-800";
      case "Success Stories":
        return "bg-green-100 text-green-800";
      case "Legal & Finance":
        return "bg-slate-100 text-slate-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

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
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-slate-900 mb-6">Insights & Updates</h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Stay informed with the latest market insights, technology updates, and success stories
            from the Flipco Capital team and our investor community.
          </p>
        </div>

        {/* Search and Categories */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-12">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button key={category} variant="outline" size="sm" className="gap-2">
                {getCategoryIcon(category)}
                {category}
              </Button>
            ))}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Search className="h-4 w-4 mr-2" />
              Search Posts
            </Button>
          </div>
        </div>

        {/* Featured Post */}
        {featuredPost && (
          <Card className="mb-12 overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="aspect-video lg:aspect-square">
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8">
                <div className="flex items-center gap-2 mb-4">
                  <Badge className={`gap-1 ${getCategoryColor(featuredPost.category)}`}>
                    {getCategoryIcon(featuredPost.category)}
                    {featuredPost.category}
                  </Badge>
                  <Badge variant="secondary">Featured</Badge>
                </div>
                <h2 className="text-3xl font-bold text-slate-900 mb-4">{featuredPost.title}</h2>
                <p className="text-slate-600 mb-6 text-lg leading-relaxed">{featuredPost.excerpt}</p>

                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-medium text-slate-900">{featuredPost.author}</div>
                      <div className="text-sm text-slate-600">{featuredPost.authorRole}</div>
                    </div>
                  </div>
                  <div className="text-right text-sm text-slate-600">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(featuredPost.publishDate).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                      <Clock className="h-4 w-4" />
                      {featuredPost.readTime}
                    </div>
                  </div>
                </div>

                <Button className="bg-blue-600 hover:bg-blue-700 group">
                  Read Full Article
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Recent Posts */}
        <div>
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Recent Posts</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge className={`gap-1 text-xs ${getCategoryColor(post.category)}`}>
                      {getCategoryIcon(post.category)}
                      {post.category}
                    </Badge>
                    <div className="flex items-center gap-1 text-xs text-slate-500">
                      <Clock className="h-3 w-3" />
                      {post.readTime}
                    </div>
                  </div>
                  <CardTitle className="text-xl line-clamp-2">{post.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CardDescription className="text-sm line-clamp-3">
                    {post.excerpt}
                  </CardDescription>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium text-sm text-slate-900">{post.author}</div>
                        <div className="text-xs text-slate-600">
                          {new Date(post.publishDate).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {post.tags.slice(0, 2).map((tag, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {post.tags.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{post.tags.length - 2}
                      </Badge>
                    )}
                  </div>

                  <Button variant="outline" className="w-full group">
                    Read More
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16 bg-slate-900 rounded-2xl p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter and get the latest market insights, project updates,
            and investment opportunities delivered directly to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-slate-900 border-0 focus:ring-2 focus:ring-blue-500"
            />
            <Button className="bg-blue-600 hover:bg-blue-700 px-8">
              Subscribe
            </Button>
          </div>
          <p className="text-xs text-slate-400 mt-4">
            No spam. Unsubscribe at any time. Read our privacy policy.
          </p>
        </div>
      </div>
    </div>
  );
}
