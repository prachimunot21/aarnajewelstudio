
import React from "react";
import OrderCard from "./OrderCard";
import EmptyOrdersState from "./EmptyOrdersState";
import LoadingState from "./LoadingState";

type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled";

interface Order {
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
}

interface OrderListProps {
  orders: Order[];
  expandedOrders: string[];
  toggleOrderExpand: (orderId: string) => void;
  isLoading: boolean;
  updatingOrder: string | null;
  onUpdateStatus: (orderId: string, status: OrderStatus) => Promise<void>;
}

const OrderList: React.FC<OrderListProps> = ({
  orders,
  expandedOrders,
  toggleOrderExpand,
  isLoading,
  updatingOrder,
  onUpdateStatus
}) => {
  if (isLoading) {
    return <LoadingState />;
  }

  if (orders.length === 0) {
    return <EmptyOrdersState />;
  }

  return (
    <div className="space-y-4">
      {orders.map(order => (
        <OrderCard
          key={order.id}
          order={order}
          isExpanded={expandedOrders.includes(order.id)}
          toggleExpand={toggleOrderExpand}
          updatingOrder={updatingOrder}
          onUpdateStatus={onUpdateStatus}
        />
      ))}
    </div>
  );
};

export default OrderList;
