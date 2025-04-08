
import React from "react";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const EmptyCart: React.FC = () => {
  return (
    <div className="py-16 text-center">
      <div className="mx-auto w-24 h-24 bg-aarna-light text-aarna-primary rounded-full flex items-center justify-center mb-6">
        <ShoppingCart size={40} />
      </div>
      <h2 className="text-2xl font-serif mb-3">Your Cart is Empty</h2>
      <p className="text-gray-600 mb-8 max-w-md mx-auto">
        Looks like you haven't added any jewelry to your cart yet. Explore our collections and find something you love.
      </p>
      <Button
        asChild
        className="bg-aarna-primary hover:bg-aarna-dark text-white"
      >
        <Link to="/products">
          Start Shopping
        </Link>
      </Button>
    </div>
  );
};

export default EmptyCart;
