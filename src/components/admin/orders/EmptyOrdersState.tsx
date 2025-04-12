
import React from "react";
import { AlertCircle } from "lucide-react";

const EmptyOrdersState: React.FC = () => {
  return (
    <div className="text-center py-16">
      <AlertCircle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
      <h2 className="text-xl font-medium mb-2">No orders found</h2>
      <p className="text-gray-500">Try adjusting your search or filter criteria</p>
    </div>
  );
};

export default EmptyOrdersState;
