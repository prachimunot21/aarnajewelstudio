
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ShoppingCart, User, Menu, X, Heart, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose
} from "@/components/ui/sheet";
import { useCart } from "@/lib/context";
import { useAuth } from "@/lib/context";
import { useIsMobile } from "@/hooks/use-mobile";

const Navbar: React.FC = () => {
  const { totalItems } = useCart();
  const { user, isLoggedIn } = useAuth();
  const isMobile = useIsMobile();
  const [searchOpen, setSearchOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/products" },
    { name: "Collections", path: "/collections" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100">
      <div className="container-custom py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link to="/" className="flex flex-col items-center">
            <h1 className="text-2xl font-serif font-bold text-aarna-primary">
              Aarna
            </h1>
            <span className="text-xs -mt-1">Jewel Studio</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors hover:text-aarna-primary ${
                  isActive ? "text-aarna-primary" : "text-gray-700"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* Right Icons */}
        <div className="flex items-center space-x-4">
          {/* Search Button */}
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setSearchOpen(!searchOpen)}
            className="hover:bg-aarna-light hover:text-aarna-primary"
          >
            <Search size={20} />
          </Button>

          {/* Wishlist */}
          <Link to="/wishlist">
            <Button 
              variant="ghost" 
              size="icon" 
              className="hover:bg-aarna-light hover:text-aarna-primary"
            >
              <Heart size={20} />
            </Button>
          </Link>

          {/* User Account */}
          <Link to={isLoggedIn ? "/account" : "/login"}>
            <Button 
              variant="ghost" 
              size="icon" 
              className="hover:bg-aarna-light hover:text-aarna-primary"
            >
              <User size={20} />
            </Button>
          </Link>

          {/* Cart */}
          <Link to="/cart" className="relative">
            <Button 
              variant="ghost" 
              size="icon" 
              className="hover:bg-aarna-light hover:text-aarna-primary"
            >
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-aarna-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Button>
          </Link>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="hover:bg-aarna-light">
                <Menu size={24} />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between py-4 border-b">
                  <h2 className="font-serif text-xl font-medium">Menu</h2>
                  <SheetClose asChild>
                    <Button variant="ghost" size="icon">
                      <X size={24} />
                    </Button>
                  </SheetClose>
                </div>
                <nav className="flex flex-col space-y-4 py-8">
                  {navLinks.map((link) => (
                    <SheetClose asChild key={link.name}>
                      <NavLink
                        to={link.path}
                        className={({ isActive }) =>
                          `text-lg font-medium px-2 py-2 transition-colors hover:text-aarna-primary ${
                            isActive
                              ? "text-aarna-primary bg-aarna-light rounded-md"
                              : "text-gray-700"
                          }`
                        }
                      >
                        {link.name}
                      </NavLink>
                    </SheetClose>
                  ))}
                </nav>
                <div className="mt-auto border-t py-4">
                  {isLoggedIn ? (
                    <div className="flex flex-col space-y-2">
                      <p className="text-sm text-gray-500">
                        Signed in as{" "}
                        <span className="font-medium">{user?.name}</span>
                      </p>
                      <SheetClose asChild>
                        <Link to="/account">
                          <Button 
                            variant="outline" 
                            className="w-full border-aarna-primary text-aarna-primary hover:bg-aarna-light"
                          >
                            My Account
                          </Button>
                        </Link>
                      </SheetClose>
                    </div>
                  ) : (
                    <div className="flex flex-col space-y-2">
                      <SheetClose asChild>
                        <Link to="/login">
                          <Button 
                            variant="outline" 
                            className="w-full border-aarna-primary text-aarna-primary hover:bg-aarna-light"
                          >
                            Sign In
                          </Button>
                        </Link>
                      </SheetClose>
                      <SheetClose asChild>
                        <Link to="/register">
                          <Button className="w-full bg-aarna-primary text-white hover:bg-aarna-dark">
                            Create Account
                          </Button>
                        </Link>
                      </SheetClose>
                    </div>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Search Bar */}
      {searchOpen && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-md p-4 border-t border-gray-100 animate-fade-in">
          <div className="container-custom">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full p-3 pl-10 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-aarna-primary"
              />
              <Search className="absolute left-3 top-3.5 text-gray-400" size={20} />
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-2 top-2"
                onClick={() => setSearchOpen(false)}
              >
                <X size={20} />
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
