
import React from "react";
import { Trash, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/context";
import { CartItem as CartItemType } from "@/lib/types";
import { placeholderImage } from "@/lib/data";

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const { product, quantity, id } = item;
  
  const handleIncrementQuantity = () => {
    updateQuantity(id, quantity + 1);
  };
  
  const handleDecrementQuantity = () => {
    if (quantity > 1) {
      updateQuantity(id, quantity - 1);
    }
  };

  return (
    <div className="flex items-center py-4 border-b last:border-b-0">
      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
        <img
          src={product.images[0] || placeholderImage}
          alt={product.name}
          className="h-full w-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = placeholderImage;
          }}
        />
      </div>

      <div className="ml-4 flex-1">
        <div className="flex flex-col sm:flex-row sm:justify-between mb-1">
          <h3 className="font-medium text-gray-800">
            {product.name}
          </h3>
          <p className="font-medium text-gray-800">
            ₹{(product.discountPrice || product.price) * quantity}
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-1">
          <div className="flex items-center mt-2 sm:mt-0">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={handleDecrementQuantity}
              disabled={quantity <= 1}
            >
              <Minus size={16} />
            </Button>
            <span className="mx-3 text-gray-700">
              {quantity}
            </span>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={handleIncrementQuantity}
              disabled={quantity >= product.stockQuantity}
            >
              <Plus size={16} />
            </Button>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => removeFromCart(id)}
            className="mt-2 sm:mt-0 flex items-center text-red-500 hover:text-red-700 hover:bg-red-50"
          >
            <Trash size={16} className="mr-1" />
            <span>Remove</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
