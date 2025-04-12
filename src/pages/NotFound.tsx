
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft, Home, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center max-w-md mx-auto p-6">
        <h1 className="text-6xl font-bold text-aarna-primary mb-4">404</h1>
        <h2 className="text-2xl font-medium text-gray-800 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          We couldn't find the page you're looking for. The page might have been removed, 
          renamed, or is temporarily unavailable.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
          <Button 
            variant="outline" 
            onClick={() => window.history.back()}
            className="flex items-center"
          >
            <ArrowLeft size={16} className="mr-2" />
            Go Back
          </Button>
          
          <Button asChild className="bg-aarna-primary hover:bg-aarna-dark">
            <Link to="/" className="flex items-center">
              <Home size={16} className="mr-2" />
              Return Home
            </Link>
          </Button>
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-2">Popular Pages</h3>
          <div className="flex flex-wrap justify-center gap-2 mt-3">
            <Link to="/products" className="text-aarna-primary hover:underline text-sm px-3 py-1">Products</Link>
            <Link to="/collections" className="text-aarna-primary hover:underline text-sm px-3 py-1">Collections</Link>
            <Link to="/faq" className="text-aarna-primary hover:underline text-sm px-3 py-1">FAQs</Link>
            <Link to="/contact" className="text-aarna-primary hover:underline text-sm px-3 py-1">Contact Us</Link>
            <Link to="/shipping-returns" className="text-aarna-primary hover:underline text-sm px-3 py-1">Shipping & Returns</Link>
          </div>
        </div>
        
        <div className="mt-8 border-t pt-6 flex justify-center">
          <Button asChild variant="link" className="text-gray-500 hover:text-aarna-primary">
            <Link to="/contact" className="flex items-center">
              <HelpCircle size={16} className="mr-2" />
              Need Help? Contact Support
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
