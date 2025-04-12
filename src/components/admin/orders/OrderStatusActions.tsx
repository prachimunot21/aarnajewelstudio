
import React from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled";

interface OrderStatusActionsProps {
  orderId: string;
  currentStatus: OrderStatus;
  updatingOrder: string | null;
  onUpdateStatus: (orderId: string, status: OrderStatus) => Promise<void>;
}

const OrderStatusActions: React.FC<OrderStatusActionsProps> = ({
  orderId,
  currentStatus,
  updatingOrder,
  onUpdateStatus,
}) => {
  return (
    <div className="flex flex-wrap gap-2">
      <Button 
        variant={currentStatus === "pending" ? "default" : "outline"}
        size="sm"
        onClick={() => onUpdateStatus(orderId, "pending")}
        disabled={currentStatus === "pending" || updatingOrder === orderId}
      >
        {updatingOrder === orderId ? (
          <Loader2 size={14} className="mr-1 animate-spin" />
        ) : null}
        Pending
      </Button>
      <Button 
        variant={currentStatus === "processing" ? "default" : "outline"}
        size="sm"
        onClick={() => onUpdateStatus(orderId, "processing")}
        disabled={currentStatus === "processing" || updatingOrder === orderId}
      >
        {updatingOrder === orderId ? (
          <Loader2 size={14} className="mr-1 animate-spin" />
        ) : null}
        Processing
      </Button>
      <Button 
        variant={currentStatus === "shipped" ? "default" : "outline"}
        size="sm"
        onClick={() => onUpdateStatus(orderId, "shipped")}
        disabled={currentStatus === "shipped" || updatingOrder === orderId}
      >
        {updatingOrder === orderId ? (
          <Loader2 size={14} className="mr-1 animate-spin" />
        ) : null}
        Shipped
      </Button>
      <Button 
        variant={currentStatus === "delivered" ? "default" : "outline"}
        size="sm"
        onClick={() => onUpdateStatus(orderId, "delivered")}
        disabled={currentStatus === "delivered" || updatingOrder === orderId}
      >
        {updatingOrder === orderId ? (
          <Loader2 size={14} className="mr-1 animate-spin" />
        ) : null}
        Delivered
      </Button>
      <Button 
        variant={currentStatus === "cancelled" ? "destructive" : "outline"}
        size="sm"
        onClick={() => onUpdateStatus(orderId, "cancelled")}
        disabled={currentStatus === "cancelled" || updatingOrder === orderId}
      >
        {updatingOrder === orderId ? (
          <Loader2 size={14} className="mr-1 animate-spin" />
        ) : null}
        Cancel
      </Button>
    </div>
  );
};

export default OrderStatusActions;
