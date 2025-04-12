
import React from "react";
import { Loader2 } from "lucide-react";

interface LoadingStateProps {
  message?: string;
  size?: "small" | "medium" | "large";
}

const LoadingState: React.FC<LoadingStateProps> = ({ 
  message = "Loading orders...",
  size = "medium"
}) => {
  const sizeClasses = {
    small: "h-8 w-8 mb-2",
    medium: "h-12 w-12 mb-4",
    large: "h-16 w-16 mb-5"
  };
  
  const textClasses = {
    small: "text-base",
    medium: "text-xl",
    large: "text-2xl"
  };
  
  return (
    <div className="text-center py-16">
      <Loader2 className={`mx-auto text-aarna-primary animate-spin ${sizeClasses[size]}`} />
      <h2 className={`font-medium ${textClasses[size]}`}>{message}</h2>
      <p className="text-gray-500 mt-2">This may take a few seconds</p>
    </div>
  );
};

export default LoadingState;
