
import React from "react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/lib/context";
import { useAuth } from "@/lib/context";
import { toast } from "sonner";

const CartSummary: React.FC = () => {
  const { cartTotal, cart, clearCart } = useCart();
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  
  const handleCheckout = () => {
    if (!isLoggedIn) {
      toast.error("Please log in to continue to checkout");
      navigate("/login", { state: { redirect: "/checkout" } });
      return;
    }
    
    if (cart.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    
    navigate("/checkout");
  };

  // Shipping cost calculation (free shipping over ₹1999)
  const shippingCost = cartTotal >= 1999 ? 0 : 150;
  const totalWithShipping = cartTotal + shippingCost;

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm lg:sticky lg:top-24">
      <h2 className="text-xl font-serif mb-4">Order Summary</h2>
      
      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span>₹{cartTotal.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between text-gray-600">
          <span>Shipping</span>
          <span>
            {shippingCost === 0 ? (
              <span className="text-green-600">Free</span>
            ) : (
              `₹${shippingCost}`
            )}
          </span>
        </div>
        
        {cartTotal > 0 && cartTotal < 1999 && (
          <div className="text-xs text-green-600 pt-1">
            Add ₹{(1999 - cartTotal).toFixed(2)} more to get free shipping
          </div>
        )}
        
        <div className="border-t pt-3 mt-3 font-medium flex justify-between">
          <span>Total</span>
          <span>₹{totalWithShipping.toFixed(2)}</span>
        </div>
      </div>
      
      <div className="space-y-3">
        <Button 
          onClick={handleCheckout}
          className="w-full bg-aarna-primary hover:bg-aarna-dark text-white"
          disabled={cart.length === 0}
        >
          Proceed to Checkout
        </Button>
        
        <Button 
          variant="outline"
          asChild
          className="w-full border-aarna-primary text-aarna-primary hover:bg-aarna-light"
        >
          <Link to="/products">Continue Shopping</Link>
        </Button>
        
        {cart.length > 0 && (
          <Button 
            variant="ghost"
            onClick={clearCart}
            className="w-full text-gray-600 hover:text-gray-800"
          >
            Clear Cart
          </Button>
        )}
      </div>
      
      <div className="mt-6 text-center">
        <div className="text-xs text-gray-500 mb-3">Secure Payment Options</div>
        <div className="flex justify-center space-x-2">
          <span className="bg-gray-100 text-xs px-2 py-1 rounded">Visa</span>
          <span className="bg-gray-100 text-xs px-2 py-1 rounded">Mastercard</span>
          <span className="bg-gray-100 text-xs px-2 py-1 rounded">UPI</span>
          <span className="bg-gray-100 text-xs px-2 py-1 rounded">PayTM</span>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
