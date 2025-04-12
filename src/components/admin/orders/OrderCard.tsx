
import React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import OrderStatusBadge from "./OrderStatusBadge";
import OrderDetails from "./OrderDetails";

type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled";

interface OrderCardProps {
  order: {
    id: string;
    user_id: string;
    profile: {
      name: string;
      email: string;
      phone: string;
    };
    created_at: string;
    status: OrderStatus;
    total: number;
    order_items: {
      id: string;
      product: {
        id: string;
        name: string;
        price: number;
        images: string[];
      };
      quantity: number;
      price: number;
    }[];
    shipping_address: {
      name: string;
      street: string;
      city: string;
      state: string;
      postalCode: string;
      country: string;
    };
  };
  isExpanded: boolean;
  toggleExpand: (orderId: string) => void;
  updatingOrder: string | null;
  onUpdateStatus: (orderId: string, status: OrderStatus) => Promise<void>;
}

const OrderCard: React.FC<OrderCardProps> = ({
  order,
  isExpanded,
  toggleExpand,
  updatingOrder,
  onUpdateStatus
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="border rounded-lg overflow-hidden bg-white">
      <div 
        className="p-4 flex flex-wrap items-center justify-between bg-gray-50 cursor-pointer"
        onClick={() => toggleExpand(order.id)}
      >
        <div className="flex items-center space-x-4">
          <OrderStatusBadge status={order.status} />
          <div>
            <h3 className="font-medium">{order.id}</h3>
            <p className="text-sm text-gray-500">{formatDate(order.created_at)}</p>
          </div>
        </div>
        
        <div className="flex items-center md:space-x-8 flex-wrap gap-y-2">
          <div>
            <p className="text-sm text-gray-500">Customer</p>
            <p className="font-medium">{order.profile?.name || "Unknown"}</p>
          </div>
          
          <div>
            <p className="text-sm text-gray-500">Amount</p>
            <p className="font-medium">₹{order.total.toLocaleString()}</p>
          </div>
          
          <div>
            <p className="text-sm text-gray-500">Status</p>
            <p className="font-medium capitalize">{order.status}</p>
          </div>
          
          <Button variant="ghost" size="icon">
            {isExpanded ? (
              <ChevronUp size={20} />
            ) : (
              <ChevronDown size={20} />
            )}
          </Button>
        </div>
      </div>
      
      {isExpanded && (
        <OrderDetails 
          order={order}
          updatingOrder={updatingOrder}
          onUpdateStatus={onUpdateStatus}
        />
      )}
    </div>
  );
};

export default OrderCard;
