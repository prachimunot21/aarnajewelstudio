
import React from "react";
import { Link } from "react-router-dom";
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Youtube, 
  Mail, 
  Phone, 
  MapPin 
} from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-aarna-primary text-white">
      <div className="container-custom pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-serif mb-4">
              Aarna
              <span className="text-xs align-text-top ml-1">Jewel Studio</span>
            </h2>
            <p className="text-gray-100 mb-6">
              Exquisite 925 silver jewelry for the modern woman. Handcrafted with love and precision.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
              >
                <Twitter size={18} />
              </a>
              <a
                href="#"
                className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
              >
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-100 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-100 hover:text-white transition-colors">
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/collections" className="text-gray-100 hover:text-white transition-colors">
                  Collections
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-100 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-100 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-medium mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/faq" className="text-gray-100 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-gray-100 hover:text-white transition-colors">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link to="/care" className="text-gray-100 hover:text-white transition-colors">
                  Jewelry Care
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-100 hover:text-white transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-100 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-medium mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="mt-1 flex-shrink-0" />
                <span>72, Vinod Nagar, Beawar, Rajasthan, India</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={18} className="flex-shrink-0" />
                <a href="tel:+919571839844" className="hover:underline">
                  +91 9571839844
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={18} className="flex-shrink-0" />
                <a href="mailto:contact@aarnajewels.com" className="hover:underline">
                  contact@aarnajewels.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mt-12 pt-8 border-t border-white/20">
          <div className="flex flex-wrap items-center justify-between">
            <div className="text-gray-300 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} Aarna Jewel Studio. All rights reserved.
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="bg-white/10 text-xs px-3 py-1 rounded">Visa</span>
              <span className="bg-white/10 text-xs px-3 py-1 rounded">Mastercard</span>
              <span className="bg-white/10 text-xs px-3 py-1 rounded">UPI</span>
              <span className="bg-white/10 text-xs px-3 py-1 rounded">PayTM</span>
              <span className="bg-white/10 text-xs px-3 py-1 rounded">Razorpay</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
