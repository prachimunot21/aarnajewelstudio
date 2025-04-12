
import React from "react";
import { AlertCircle, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface EmptyOrdersStateProps {
  message?: string;
  subMessage?: string;
  isAdmin?: boolean;
}

const EmptyOrdersState: React.FC<EmptyOrdersStateProps> = ({ 
  message = "No orders found",
  subMessage = "Try adjusting your search or filter criteria",
  isAdmin = true
}) => {
  return (
    <div className="text-center py-16">
      <div className="mx-auto h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
        <ShoppingBag className="h-8 w-8 text-gray-400" />
      </div>
      <h2 className="text-xl font-medium mb-2">{message}</h2>
      <p className="text-gray-500 mb-6">{subMessage}</p>
      
      {!isAdmin && (
        <Button asChild className="bg-aarna-primary hover:bg-aarna-dark">
          <Link to="/products">
            Browse Products
          </Link>
        </Button>
      )}
    </div>
  );
};

export default EmptyOrdersState;
