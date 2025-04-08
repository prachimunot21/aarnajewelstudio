
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartItem from "@/components/cart/CartItem";
import CartSummary from "@/components/cart/CartSummary";
import EmptyCart from "@/components/cart/EmptyCart";
import { useCart } from "@/lib/context";

const CartPage: React.FC = () => {
  const { cart } = useCart();

  return (
    <>
      <Navbar />
      <main className="py-8 md:py-12">
        <div className="container-custom">
          <h1 className="text-3xl font-serif mb-8">Shopping Cart</h1>
          
          {cart.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                  <div className="divide-y">
                    {cart.map(item => (
                      <CartItem key={item.id} item={item} />
                    ))}
                  </div>
                </div>
              </div>
              
              <div>
                <CartSummary />
              </div>
            </div>
          ) : (
            <EmptyCart />
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default CartPage;
