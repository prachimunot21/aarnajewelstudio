
import React from "react";
import { Loader2 } from "lucide-react";

interface LoadingStateProps {
  message?: string;
}

const LoadingState: React.FC<LoadingStateProps> = ({ message = "Loading orders..." }) => {
  return (
    <div className="text-center py-16">
      <Loader2 className="mx-auto h-12 w-12 text-aarna-primary animate-spin mb-4" />
      <h2 className="text-xl font-medium mb-2">{message}</h2>
    </div>
  );
};

export default LoadingState;
