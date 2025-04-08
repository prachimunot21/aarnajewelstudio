
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/lib/context";
import { 
  Clock, Package, ShoppingBag, 
  CheckCircle2, XCircle, AlertTriangle, 
  ChevronDown, ChevronUp 
} from "lucide-react";
import { toast } from "sonner";

type Order = {
  id: string;
  date: string;
  status: "processing" | "shipped" | "delivered" | "cancelled";
  totalAmount: number;
  items: {
    productId: string;
    productName: string;
    quantity: number;
    price: number;
    imageUrl: string;
  }[];
};

// Mock order history data
const mockOrders: Order[] = [
  {
    id: "ORD-001",
    date: "2025-03-15T12:00:00",
    status: "delivered",
    totalAmount: 6499,
    items: [
      {
        productId: "prod-1",
        productName: "Silver Leaf Pendant",
        quantity: 1,
        price: 1999,
        imageUrl: "/placeholder.svg"
      },
      {
        productId: "prod-3",
        productName: "Pearl Earrings",
        quantity: 1,
        price: 4500,
        imageUrl: "/placeholder.svg"
      }
    ]
  },
  {
    id: "ORD-002",
    date: "2025-04-02T15:30:00",
    status: "processing",
    totalAmount: 3199,
    items: [
      {
        productId: "prod-5",
        productName: "Silver Chain Bracelet",
        quantity: 1,
        price: 3199,
        imageUrl: "/placeholder.svg"
      }
    ]
  }
];

const AccountOrdersPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, isLoggedIn } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [expandedOrders, setExpandedOrders] = useState<string[]>([]);
  
  useEffect(() => {
    // Redirect if not logged in
    if (!isLoggedIn) {
      toast.error("Please login to view your orders");
      navigate("/login");
      return;
    }
    
    // In a real app, fetch orders from API
    // For now, use mock data
    setOrders(mockOrders);
  }, [isLoggedIn, navigate]);
  
  const toggleOrderExpand = (orderId: string) => {
    setExpandedOrders(prev => 
      prev.includes(orderId) 
        ? prev.filter(id => id !== orderId) 
        : [...prev, orderId]
    );
  };
  
  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case "processing":
        return <Clock className="h-5 w-5 text-blue-500" />;
      case "shipped":
        return <Package className="h-5 w-5 text-amber-500" />;
      case "delivered":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case "cancelled":
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <AlertTriangle className="h-5 w-5 text-gray-500" />;
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric'
    });
  };

  return (
    <>
      <Navbar />
      <main className="py-8 md:py-12">
        <div className="container-custom">
          <div className="flex flex-col gap-6 max-w-4xl mx-auto">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl md:text-3xl font-serif">My Orders</h1>
              <Button 
                variant="outline" 
                className="border-aarna-primary text-aarna-primary hover:bg-aarna-light"
                onClick={() => navigate("/products")}
              >
                <ShoppingBag className="mr-2 h-4 w-4" /> Continue Shopping
              </Button>
            </div>
            
            <Separator />
            
            {orders.length === 0 ? (
              <div className="text-center py-10">
                <ShoppingBag className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h2 className="text-xl font-medium mb-2">No orders yet</h2>
                <p className="text-gray-500 mb-6">You haven't placed any orders yet.</p>
                <Button 
                  onClick={() => navigate("/products")} 
                  className="bg-aarna-primary hover:bg-aarna-dark"
                >
                  Start Shopping
                </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-6">
                {orders.map(order => (
                  <div 
                    key={order.id} 
                    className="border rounded-lg overflow-hidden bg-white shadow-sm"
                  >
                    <div 
                      className="p-4 flex flex-wrap items-center justify-between bg-gray-50 cursor-pointer"
                      onClick={() => toggleOrderExpand(order.id)}
                    >
                      <div className="flex items-center space-x-4">
                        {getStatusIcon(order.status)}
                        <div>
                          <h3 className="font-medium">Order #{order.id}</h3>
                          <p className="text-sm text-gray-500">{formatDate(order.date)}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-6">
                        <div className="text-right">
                          <p className="font-medium">₹{order.totalAmount.toLocaleString()}</p>
                          <p className="text-sm capitalize text-gray-500">
                            {order.status}
                          </p>
                        </div>
                        
                        <Button variant="ghost" size="icon">
                          {expandedOrders.includes(order.id) ? (
                            <ChevronUp size={20} />
                          ) : (
                            <ChevronDown size={20} />
                          )}
                        </Button>
                      </div>
                    </div>
                    
                    {expandedOrders.includes(order.id) && (
                      <div className="p-4 border-t">
                        <h4 className="font-medium mb-3">Order Items</h4>
                        <div className="space-y-3">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="flex items-center space-x-4">
                              <div className="h-16 w-16 bg-gray-100 rounded overflow-hidden">
                                <img 
                                  src={item.imageUrl} 
                                  alt={item.productName}
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <div className="flex-1">
                                <p className="font-medium">{item.productName}</p>
                                <p className="text-sm text-gray-500">
                                  {item.quantity} × ₹{item.price.toLocaleString()}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="font-medium">
                                  ₹{(item.price * item.quantity).toLocaleString()}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        <div className="mt-4 pt-3 border-t flex justify-between">
                          <p className="font-medium">Total</p>
                          <p className="font-medium">₹{order.totalAmount.toLocaleString()}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default AccountOrdersPage;
