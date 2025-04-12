
import React from "react";

interface OrderItemProps {
  product: {
    id: string;
    name: string;
    price: number;
    images: string[];
  };
  quantity: number;
  price: number;
}

const OrderItem: React.FC<OrderItemProps> = ({ product, quantity, price }) => {
  return (
    <div className="flex items-center space-x-4">
      <div className="h-16 w-16 bg-gray-100 rounded overflow-hidden">
        <img 
          src={product?.images?.[0] || "/placeholder.svg"}
          alt={product?.name || "Product"}
          className="h-full w-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/placeholder.svg";
          }}
        />
      </div>
      <div className="flex-1">
        <p className="font-medium">{product?.name}</p>
        <p className="text-sm text-gray-500">
          {quantity} × ₹{price.toLocaleString()}
        </p>
      </div>
      <div className="text-right">
        <p className="font-medium">
          ₹{(price * quantity).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default OrderItem;
