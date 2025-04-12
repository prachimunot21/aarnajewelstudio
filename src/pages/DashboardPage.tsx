
import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Package, ShoppingBag, Settings, Users, BarChart3, Tag } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useAuth } from "@/lib/context";

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, isLoggedIn } = useAuth();
  
  useEffect(() => {
    if (!isLoggedIn) {
      toast.error("You must be logged in to access the dashboard");
      navigate("/login", { state: { redirect: "/dashboard" } });
      return;
    }
    
    if (user && user.role !== "admin") {
      toast.error("You don't have permission to access the dashboard");
      navigate("/");
      return;
    }
  }, [isLoggedIn, navigate, user]);

  if (!isLoggedIn || (user && user.role !== "admin")) {
    return null;
  }

  const dashboardItems = [
    {
      title: "Products",
      description: "Manage your product catalog",
      icon: <Package className="h-8 w-8 text-aarna-primary" />,
      path: "/admin"
    },
    {
      title: "Orders",
      description: "View and manage customer orders",
      icon: <ShoppingBag className="h-8 w-8 text-aarna-primary" />,
      path: "/admin/orders"
    },
    {
      title: "Collections",
      description: "Organize products into collections",
      icon: <Tag className="h-8 w-8 text-aarna-primary" />,
      path: "/admin/collections"
    },
    {
      title: "Customers",
      description: "View and manage customers",
      icon: <Users className="h-8 w-8 text-aarna-primary" />,
      path: "/admin/customers"
    },
    {
      title: "Analytics",
      description: "View sales and traffic analytics",
      icon: <BarChart3 className="h-8 w-8 text-aarna-primary" />,
      path: "/admin/analytics"
    },
    {
      title: "Settings",
      description: "Configure store settings",
      icon: <Settings className="h-8 w-8 text-aarna-primary" />,
      path: "/admin/settings"
    }
  ];

  return (
    <>
      <Navbar />
      <main className="py-8 md:py-12">
        <div className="container-custom">
          <h1 className="text-3xl font-serif mb-8">Admin Dashboard</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dashboardItems.map((item, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow duration-200">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-3">
                    {item.icon}
                    <span>{item.title}</span>
                  </CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full bg-aarna-primary hover:bg-aarna-dark">
                    <Link to={item.path}>Manage {item.title}</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default DashboardPage;
