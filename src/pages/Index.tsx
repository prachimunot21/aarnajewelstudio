
import React from "react";
import Hero from "@/components/home/Hero";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import Categories from "@/components/home/Categories";
import Features from "@/components/home/Features";
import Newsletter from "@/components/home/Newsletter";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Link } from "react-router-dom";

const Index: React.FC = () => {
  // Footer links for information pages
  const infoLinks = [
    { name: "FAQ", path: "/faq" },
    { name: "Shipping & Returns", path: "/shipping-returns" },
    { name: "Jewelry Care", path: "/jewelry-care" },
    { name: "Terms & Conditions", path: "/terms" },
    { name: "Privacy Policy", path: "/privacy" }
  ];
  
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Categories />
        <FeaturedProducts />
        <Features />
        
        {/* Information Pages Links Banner */}
        <section className="bg-aarna-light py-6">
          <div className="container-custom">
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
              {infoLinks.map((link, index) => (
                <Link 
                  key={index}
                  to={link.path} 
                  className="text-aarna-primary hover:text-aarna-dark font-medium transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
        
        <Newsletter />
      </main>
      <Footer />
    </>
  );
};

export default Index;
