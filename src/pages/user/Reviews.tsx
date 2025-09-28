import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Star, 
  ThumbsUp, 
  MessageCircle, 
  Filter,
  Fuel,
  Wrench,
  User,
  Calendar,
  Send
} from "lucide-react";

const Reviews = () => {
  const [selectedRating, setSelectedRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterRating, setFilterRating] = useState("all");

  const myReviews = [
    {
      id: 1,
      orderId: "FO-2024-001",
      service: "Premium Petrol Delivery",
      type: "fuel",
      rating: 5,
      comment: "Excellent service! Driver was punctual and professional. Fuel quality was top-notch.",
      date: "2024-01-15",
      driverName: "Rajesh Kumar",
      response: "Thank you for the great review! We're glad you had a positive experience.",
      likes: 3,
      helpful: true
    },
    {
      id: 2,
      orderId: "GS-2024-002",
      service: "Oil Change Service",
      type: "garage",
      rating: 4,
      comment: "Good service overall. Mechanic was knowledgeable but arrived 15 minutes late.",
      date: "2024-01-12",
      mechanicName: "Amit Singh",
      response: null,
      likes: 1,
      helpful: false
    },
    {
      id: 3,
      orderId: "FO-2024-003",
      service: "Diesel Delivery",
      type: "fuel",
      rating: 5,
      comment: "Fast delivery and great communication. Will definitely use again!",
      date: "2024-01-10",
      driverName: "Priya Sharma",
      response: "Thank you! We look forward to serving you again.",
      likes: 5,
      helpful: true
    }
  ];

  const pendingReviews = [
    {
      id: "FO-2024-004",
      service: "Premium Petrol",
      type: "fuel",
      date: "2024-01-16",
      amount: "₹5,125"
    },
    {
      id: "GS-2024-005",
      service: "Brake Service",
      type: "garage",
      date: "2024-01-14",
      amount: "₹2,950"
    }
  ];

  const StarRating = ({ rating, size = "w-5 h-5", interactive = false, onRatingChange }: any) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => interactive && onRatingChange?.(star)}
            disabled={!interactive}
            className={`${size} ${
              star <= rating 
                ? "text-yellow-500 fill-current" 
                : "text-gray-300"
            } ${interactive ? "hover:text-yellow-400 cursor-pointer" : ""}`}
          >
            <Star className="w-full h-full" />
          </button>
        ))}
      </div>
    );
  };

  const submitReview = (orderId: string) => {
    if (selectedRating === 0 || !reviewText.trim()) return;
    
    // Here you would submit the review
    console.log("Submitting review:", { orderId, rating: selectedRating, comment: reviewText });
    
    // Reset form
    setSelectedRating(0);
    setReviewText("");
  };

  const filteredReviews = myReviews.filter(review => {
    const typeMatch = filterType === "all" || review.type === filterType;
    const ratingMatch = filterRating === "all" || review.rating === parseInt(filterRating);
    return typeMatch && ratingMatch;
  });

  return (
    <DashboardLayout userRole="user">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-fuel-gradient rounded-lg p-6 text-white">
          <h1 className="text-3xl font-bold mb-2">Reviews & Feedback</h1>
          <p className="text-white/90">Share your experience and help us improve our services</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Pending Reviews */}
            {pendingReviews.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="w-5 h-5" />
                    Pending Reviews
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {pendingReviews.map((order) => (
                    <div key={order.id} className="p-4 border border-border rounded-lg">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            order.type === "fuel" ? "bg-red-500" : "bg-blue-500"
                          }`}>
                            {order.type === "fuel" ? 
                              <Fuel className="w-4 h-4 text-white" /> : 
                              <Wrench className="w-4 h-4 text-white" />
                            }
                          </div>
                          <div>
                            <p className="font-medium">{order.service}</p>
                            <p className="text-sm text-muted-foreground">
                              Order {order.id} • {order.date}
                            </p>
                          </div>
                        </div>
                        <span className="font-medium">{order.amount}</span>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <Label className="text-sm font-medium">Rate your experience</Label>
                          <div className="mt-2">
                            <StarRating 
                              rating={selectedRating} 
                              interactive={true}
                              onRatingChange={setSelectedRating}
                            />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="review-text" className="text-sm font-medium">
                            Share your feedback
                          </Label>
                          <Textarea
                            id="review-text"
                            placeholder="Tell us about your experience..."
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                            className="mt-1"
                          />
                        </div>

                        <Button 
                          onClick={() => submitReview(order.id)}
                          disabled={selectedRating === 0 || !reviewText.trim()}
                          className="w-full"
                        >
                          <Send className="w-4 h-4 mr-2" />
                          Submit Review
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* My Reviews */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>My Reviews</CardTitle>
                  <div className="flex gap-2">
                    <Select value={filterType} onValueChange={setFilterType}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Services</SelectItem>
                        <SelectItem value="fuel">Fuel Delivery</SelectItem>
                        <SelectItem value="garage">Garage Service</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={filterRating} onValueChange={setFilterRating}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Ratings</SelectItem>
                        <SelectItem value="5">5 Stars</SelectItem>
                        <SelectItem value="4">4 Stars</SelectItem>
                        <SelectItem value="3">3 Stars</SelectItem>
                        <SelectItem value="2">2 Stars</SelectItem>
                        <SelectItem value="1">1 Star</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {filteredReviews.map((review) => (
                    <div key={review.id} className="border border-border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            review.type === "fuel" ? "bg-red-500" : "bg-blue-500"
                          }`}>
                            {review.type === "fuel" ? 
                              <Fuel className="w-5 h-5 text-white" /> : 
                              <Wrench className="w-5 h-5 text-white" />
                            }
                          </div>
                          <div>
                            <p className="font-medium">{review.service}</p>
                            <p className="text-sm text-muted-foreground">
                              Order {review.orderId}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <StarRating rating={review.rating} />
                          <p className="text-xs text-muted-foreground mt-1">{review.date}</p>
                        </div>
                      </div>

                      <p className="text-sm mb-4">{review.comment}</p>

                      {review.response && (
                        <div className="bg-muted/50 rounded-lg p-3 mb-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Avatar className="w-6 h-6">
                              <AvatarFallback className="text-xs">
                                {review.type === "fuel" ? "D" : "M"}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm font-medium">
                              {review.driverName || review.mechanicName} responded:
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">{review.response}</p>
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <Button variant="ghost" size="sm">
                            <ThumbsUp className="w-4 h-4 mr-1" />
                            {review.likes} Helpful
                          </Button>
                          <Badge variant={review.helpful ? "default" : "secondary"}>
                            {review.helpful ? "Verified Purchase" : "Pending Verification"}
                          </Badge>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          Service by {review.driverName || review.mechanicName}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Review Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Review Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">4.7</div>
                  <StarRating rating={5} />
                  <p className="text-sm text-muted-foreground mt-1">Average rating</p>
                </div>

                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((rating) => {
                    const count = myReviews.filter(r => r.rating === rating).length;
                    const percentage = (count / myReviews.length) * 100;
                    
                    return (
                      <div key={rating} className="flex items-center gap-2 text-sm">
                        <span className="w-8">{rating}★</span>
                        <div className="flex-1 bg-muted rounded-full h-2">
                          <div 
                            className="bg-yellow-500 h-2 rounded-full" 
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className="w-8 text-muted-foreground">{count}</span>
                      </div>
                    );
                  })}
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{myReviews.length}</div>
                    <div className="text-xs text-muted-foreground">Total Reviews</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{pendingReviews.length}</div>
                    <div className="text-xs text-muted-foreground">Pending</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Review Guidelines */}
            <Card>
              <CardHeader>
                <CardTitle>Review Guidelines</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <Star className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                  <p>Be honest and specific about your experience</p>
                </div>
                <div className="flex items-start gap-2">
                  <MessageCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <p>Focus on the service quality and professionalism</p>
                </div>
                <div className="flex items-start gap-2">
                  <User className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                  <p>Keep comments respectful and constructive</p>
                </div>
                <div className="flex items-start gap-2">
                  <Calendar className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                  <p>Review within 7 days for best visibility</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Reviews;