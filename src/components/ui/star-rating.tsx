import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  interactive?: boolean;
  onRatingChange?: (rating: number) => void;
  className?: string;
}

export function StarRating({
  rating,
  maxRating = 5,
  size = "md",
  interactive = false,
  onRatingChange,
  className
}: StarRatingProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6"
  };

  const handleStarClick = (starIndex: number) => {
    if (interactive && onRatingChange) {
      onRatingChange(starIndex + 1);
    }
  };

  return (
    <div className={cn("flex items-center gap-1", className)}>
      {Array.from({ length: maxRating }, (_, index) => {
        const isFilled = index < rating;
        const isHalfFilled = index < rating && index + 1 > rating;

        return (
          <Star
            key={index}
            className={cn(
              sizeClasses[size],
              interactive && "cursor-pointer transition-colors hover:text-yellow-400",
              isFilled
                ? "fill-yellow-400 text-yellow-400"
                : isHalfFilled
                ? "fill-yellow-200 text-yellow-400"
                : "text-gray-300"
            )}
            onClick={() => handleStarClick(index)}
          />
        );
      })}
      <span className="ml-2 text-sm text-slate-600">
        {rating.toFixed(1)} / {maxRating}
      </span>
    </div>
  );
}
