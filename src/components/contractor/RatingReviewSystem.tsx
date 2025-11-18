"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Star, MessageSquare, ThumbsUp, Calendar, User } from "lucide-react";

interface Review {
  id: string;
  projectName: string;
  clientName: string;
  rating: number;
  comment: string;
  date: string;
  response?: string;
  responseDate?: string;
  category: string;
}

interface RatingReviewSystemProps {
  contractorId: string;
}

export default function RatingReviewSystem({ contractorId }: RatingReviewSystemProps) {
  const [selectedTab, setSelectedTab] = useState<"overview" | "reviews" | "respond">("overview");
  const [responseText, setResponseText] = useState("");
  const [selectedReview, setSelectedReview] = useState<string | null>(null);

  // Mock data - in real app this would come from API
  const ratingData = {
    overallRating: 4.8,
    totalReviews: 47,
    ratingBreakdown: {
      5: 32,
      4: 11,
      3: 3,
      2: 1,
      1: 0
    },
    categoryRatings: {
      quality: 4.9,
      timeliness: 4.7,
      communication: 4.8,
      professionalism: 4.9,
      cleanliness: 4.6
    }
  };

  const reviews: Review[] = [
    {
      id: "1",
      projectName: "Oakwood Renovation",
      clientName: "Sarah Johnson",
      rating: 5,
      comment: "Exceptional work! Mike and his team completed the kitchen renovation ahead of schedule and the quality exceeded our expectations. Very professional and clean work site.",
      date: "2025-10-25",
      response: "Thank you Sarah! It was a pleasure working on your beautiful kitchen. We're thrilled you're happy with the results.",
      responseDate: "2025-10-26",
      category: "Kitchen Renovation"
    },
    {
      id: "2",
      projectName: "Pine Street Fix & Flip",
      clientName: "Flipco Capital",
      rating: 5,
      comment: "Outstanding bathroom renovation work. Attention to detail was impressive and the tile work is flawless. Highly recommend for future projects.",
      date: "2025-10-20",
      category: "Bathroom Renovation"
    },
    {
      id: "3",
      projectName: "Maple Drive Remodel",
      clientName: "Robert Chen",
      rating: 4,
      comment: "Good quality work overall. The flooring installation was done well, though there were some minor delays due to material delivery issues.",
      date: "2025-10-15",
      response: "Thanks Robert! We appreciate your understanding about the material delays. We've since improved our supply chain process.",
      responseDate: "2025-10-16",
      category: "Flooring"
    },
    {
      id: "4",
      projectName: "Cedar Hill Renovation",
      clientName: "Maria Garcia",
      rating: 5,
      comment: "Amazing transformation! The painting work was meticulous and the color choices were perfect. Very satisfied with the outcome.",
      date: "2025-10-10",
      category: "Painting"
    }
  ];

  const renderStars = (rating: number, size: "sm" | "md" | "lg" = "md") => {
    const sizeClass = {
      sm: "h-3 w-3",
      md: "h-4 w-4",
      lg: "h-5 w-5"
    }[size];

    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${sizeClass} ${
              star <= rating ? "text-yellow-400 fill-current" : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  const handleResponse = (reviewId: string) => {
    // In real app, this would call API to submit response
    console.log(`Responding to review ${reviewId}:`, responseText);
    setResponseText("");
    setSelectedReview(null);
  };

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
        <Button
          variant={selectedTab === "overview" ? "default" : "ghost"}
          size="sm"
          onClick={() => setSelectedTab("overview")}
          className="flex-1"
        >
          Overview
        </Button>
        <Button
          variant={selectedTab === "reviews" ? "default" : "ghost"}
          size="sm"
          onClick={() => setSelectedTab("reviews")}
          className="flex-1"
        >
          All Reviews
        </Button>
        <Button
          variant={selectedTab === "respond" ? "default" : "ghost"}
          size="sm"
          onClick={() => setSelectedTab("respond")}
          className="flex-1"
        >
          Respond
        </Button>
      </div>

      {/* Overview Tab */}
      {selectedTab === "overview" && (
        <div className="grid md:grid-cols-2 gap-6">
          {/* Overall Rating Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Star className="h-5 w-5 mr-2 text-yellow-400" />
                Overall Rating
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-4">
                <div className="text-4xl font-bold text-slate-900">{ratingData.overallRating}</div>
                {renderStars(ratingData.overallRating, "lg")}
                <p className="text-slate-600">Based on {ratingData.totalReviews} reviews</p>
              </div>

              <Separator className="my-4" />

              {/* Rating Breakdown */}
              <div className="space-y-2">
                {Object.entries(ratingData.ratingBreakdown).reverse().map(([stars, count]) => (
                  <div key={stars} className="flex items-center space-x-2">
                    <span className="text-sm w-2">{stars}</span>
                    <Star className="h-3 w-3 text-yellow-400 fill-current" />
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-yellow-400 h-2 rounded-full"
                        style={{ width: `${(count / ratingData.totalReviews) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm text-slate-600 w-6">{count}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Category Ratings */}
          <Card>
            <CardHeader>
              <CardTitle>Performance by Category</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(ratingData.categoryRatings).map(([category, rating]) => (
                <div key={category} className="flex items-center justify-between">
                  <span className="capitalize text-slate-700">{category}</span>
                  <div className="flex items-center space-x-2">
                    {renderStars(rating, "sm")}
                    <span className="text-sm font-medium">{rating}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}

      {/* All Reviews Tab */}
      {selectedTab === "reviews" && (
        <div className="space-y-4">
          {reviews.map((review) => (
            <Card key={review.id}>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Review Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">{review.clientName}</p>
                        <p className="text-sm text-slate-600">{review.projectName}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-2">
                        {renderStars(review.rating)}
                        <Badge variant="outline">{review.category}</Badge>
                      </div>
                      <p className="text-sm text-slate-600 mt-1">
                        <Calendar className="h-3 w-3 inline mr-1" />
                        {new Date(review.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  {/* Review Content */}
                  <p className="text-slate-700">{review.comment}</p>

                  {/* Contractor Response */}
                  {review.response && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-center mb-2">
                        <MessageSquare className="h-4 w-4 text-green-600 mr-2" />
                        <span className="text-sm font-medium text-green-800">Your Response</span>
                        <span className="text-xs text-green-600 ml-auto">
                          {new Date(review.responseDate!).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-green-700 text-sm">{review.response}</p>
                    </div>
                  )}

                  {/* Response Button */}
                  {!review.response && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedReview(review.id);
                        setSelectedTab("respond");
                      }}
                    >
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Respond to Review
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Respond Tab */}
      {selectedTab === "respond" && (
        <Card>
          <CardHeader>
            <CardTitle>Respond to Reviews</CardTitle>
            <CardDescription>
              Professional responses help build trust and show your commitment to quality
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Pending Reviews */}
            <div className="space-y-3">
              <h3 className="font-medium text-slate-900">Reviews Waiting for Response</h3>
              {reviews.filter(r => !r.response).map((review) => (
                <div key={review.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{review.clientName}</span>
                      {renderStars(review.rating, "sm")}
                    </div>
                    <span className="text-sm text-slate-600">{review.projectName}</span>
                  </div>
                  <p className="text-sm text-slate-700 mb-3">{review.comment}</p>

                  {selectedReview === review.id ? (
                    <div className="space-y-3">
                      <Textarea
                        placeholder="Write a professional response..."
                        value={responseText}
                        onChange={(e) => setResponseText(e.target.value)}
                        rows={3}
                      />
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          onClick={() => handleResponse(review.id)}
                          disabled={!responseText.trim()}
                        >
                          Submit Response
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedReview(null);
                            setResponseText("");
                          }}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedReview(review.id)}
                    >
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Respond
                    </Button>
                  )}
                </div>
              ))}
            </div>

            {/* Response Tips */}
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <h4 className="font-medium text-blue-900 mb-2">Tips for Great Responses</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Thank the client for their feedback</li>
                  <li>• Address any specific concerns mentioned</li>
                  <li>• Keep responses professional and positive</li>
                  <li>• Highlight your commitment to quality work</li>
                </ul>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
