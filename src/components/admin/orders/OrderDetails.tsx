
import React from "react";
import OrderItem from "./OrderItem";
import OrderStatusActions from "./OrderStatusActions";

type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled";

interface OrderDetailProps {
  order: {
    id: string;
    status: OrderStatus;
    total: number;
    profile: {
      name: string;
      email: string;
      phone: string;
    };
    shipping_address: {
      street: string;
      city: string;
      state: string;
      postalCode: string;
      country: string;
    };
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
  };
  updatingOrder: string | null;
  onUpdateStatus: (orderId: string, status: OrderStatus) => Promise<void>;
}

const OrderDetails: React.FC<OrderDetailProps> = ({ 
  order, 
  updatingOrder, 
  onUpdateStatus 
}) => {
  return (
    <div className="p-4 border-t">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-medium mb-3">Order Items</h4>
          <div className="space-y-3">
            {order.order_items?.map((item, idx) => (
              <OrderItem 
                key={idx}
                product={item.product}
                quantity={item.quantity}
                price={item.price}
              />
            ))}
          </div>
          
          <div className="mt-4 pt-3 border-t flex justify-between">
            <p className="font-medium">Total</p>
            <p className="font-medium">₹{order.total.toLocaleString()}</p>
          </div>
        </div>
        
        <div>
          <h4 className="font-medium mb-3">Customer Details</h4>
          <div className="space-y-2">
            <p><span className="font-medium">Name:</span> {order.profile?.name || "N/A"}</p>
            <p><span className="font-medium">Email:</span> {order.profile?.email || "N/A"}</p>
            <p><span className="font-medium">Phone:</span> {order.profile?.phone || "N/A"}</p>
          </div>
          
          <h4 className="font-medium mt-4 mb-3">Shipping Address</h4>
          <div className="space-y-1">
            <p>{order.shipping_address?.street || "N/A"}</p>
            <p>{order.shipping_address?.city || "N/A"}, {order.shipping_address?.state || "N/A"}</p>
            <p>{order.shipping_address?.postalCode || "N/A"}</p>
            <p>{order.shipping_address?.country || "N/A"}</p>
          </div>
          
          <h4 className="font-medium mt-4 mb-3">Update Status</h4>
          <OrderStatusActions
            orderId={order.id}
            currentStatus={order.status}
            updatingOrder={updatingOrder}
            onUpdateStatus={onUpdateStatus}
          />
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
