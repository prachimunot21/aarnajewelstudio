
import React from "react";
import { AlertCircle } from "lucide-react";

interface EmptyOrdersStateProps {
  message?: string;
  subMessage?: string;
}

const EmptyOrdersState: React.FC<EmptyOrdersStateProps> = ({ 
  message = "No orders found",
  subMessage = "Try adjusting your search or filter criteria"
}) => {
  return (
    <div className="text-center py-16">
      <AlertCircle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
      <h2 className="text-xl font-medium mb-2">{message}</h2>
      <p className="text-gray-500">{subMessage}</p>
    </div>
  );
};

export default EmptyOrdersState;
