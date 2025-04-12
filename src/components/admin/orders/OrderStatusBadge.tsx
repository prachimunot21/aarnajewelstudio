
import React from "react";
import { CheckCircle2, XCircle, Clock, Package } from "lucide-react";

type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled";

interface OrderStatusBadgeProps {
  status: OrderStatus;
}

const OrderStatusBadge: React.FC<OrderStatusBadgeProps> = ({ status }) => {
  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case "pending":
      case "processing":
        return <Clock className="h-5 w-5 text-blue-500" />;
      case "shipped":
        return <Package className="h-5 w-5 text-amber-500" />;
      case "delivered":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case "cancelled":
        return <XCircle className="h-5 w-5 text-red-500" />;
    }
  };

  return getStatusIcon(status);
};

export default OrderStatusBadge;
