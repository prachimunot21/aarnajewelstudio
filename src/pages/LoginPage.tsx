
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useAuth } from "@/lib/context";
import { ShoppingBag, Loader2 } from "lucide-react";
import { signUp } from "@/lib/api";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const { login, loading, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = location.state?.redirect || "/";

  // Redirect if already logged in
  useEffect(() => {
    if (isLoggedIn) {
      navigate(redirectPath);
    }
  }, [isLoggedIn, navigate, redirectPath]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isRegister) {
      // Handle registration
      const result = await signUp(email, password, name);
      if (result) {
        // Auto-login after successful registration
        await login(email, password);
      }
    } else {
      // Handle login
      await login(email, password);
    }
  };

  return (
    <>
      <Navbar />
      <main className="py-12 bg-gray-50">
        <div className="container-custom max-w-md">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-serif mb-2">
                {isRegister ? "Create Account" : "Sign In"}
              </h1>
              <p className="text-gray-600">
                {isRegister
                  ? "Join Aarna Jewel Studio today"
                  : "Welcome back to Aarna Jewel Studio"
                }
              </p>
            </div>
            
            <div className="bg-aarna-light/50 border border-aarna-light rounded-lg p-4 mb-6">
              <div className="flex items-start">
                <ShoppingBag className="text-aarna-primary mt-1 mr-3 flex-shrink-0" size={20} />
                <p className="text-sm text-gray-700">
                  {isRegister
                    ? "Create an account to place orders, track your purchases, and save your favorite items to your wishlist."
                    : "Sign in to place orders, track your purchases, and save your favorite items to your wishlist."
                  }
                </p>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {isRegister && (
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-aarna-primary"
                    placeholder="Your Name"
                    required={isRegister}
                  />
                </div>
              )}
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-aarna-primary"
                  placeholder="you@example.com"
                  required
                />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  {!isRegister && (
                    <a href="#" className="text-xs text-aarna-primary hover:underline">
                      Forgot Password?
                    </a>
                  )}
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-aarna-primary"
                  placeholder="••••••••"
                  required
                />
              </div>
              
              <Button
                type="submit"
                className="w-full bg-aarna-primary hover:bg-aarna-dark text-white"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {isRegister ? "Creating Account..." : "Signing in..."}
                  </>
                ) : (
                  isRegister ? "Create Account" : "Sign In"
                )}
              </Button>
              
              {!isRegister && (
                <div className="text-center">
                  <p className="text-sm">
                    For demo purposes, use: <br />
                    Admin: admin@aarna.com / password <br />
                    Customer: customer@example.com / password
                  </p>
                </div>
              )}
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                {isRegister ? (
                  <>
                    Already have an account?{" "}
                    <button 
                      onClick={() => setIsRegister(false)}
                      className="text-aarna-primary hover:underline"
                    >
                      Sign In
                    </button>
                  </>
                ) : (
                  <>
                    Don't have an account?{" "}
                    <button
                      onClick={() => setIsRegister(true)}
                      className="text-aarna-primary hover:underline"
                    >
                      Create Account
                    </button>
                  </>
                )}
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default LoginPage;
