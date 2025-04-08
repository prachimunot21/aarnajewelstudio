
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero: React.FC = () => {
  return (
    <section className="relative bg-aarna-light py-16 sm:py-24">
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <div>
              <p className="text-aarna-primary font-medium mb-2">Handcrafted Elegance</p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium leading-tight">
                Discover the Beauty of <span className="text-gradient">925 Silver</span> Jewelry
              </h1>
            </div>
            <p className="text-gray-700 text-lg">
              Exquisite pieces that blend timeless elegance with contemporary designs.
              Each item is meticulously crafted to add a touch of luxury to your everyday style.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                asChild
                className="bg-aarna-primary hover:bg-aarna-dark text-white rounded-md px-6 py-3 h-auto"
              >
                <Link to="/products">
                  Shop Collection
                </Link>
              </Button>
              <Button 
                asChild
                variant="outline" 
                className="border-aarna-primary text-aarna-primary hover:bg-aarna-light flex gap-2 items-center rounded-md px-6 py-3 h-auto"
              >
                <Link to="/about">
                  <span>Learn More</span>
                  <ArrowRight size={16} />
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="relative order-first md:order-last">
            <div className="aspect-square bg-white rounded-full p-4 shadow-xl overflow-hidden">
              <img
                src="/placeholder.svg"
                alt="Aarna Silver Jewelry Collection"
                className="object-cover w-full h-full rounded-full"
              />
              <div className="absolute -bottom-4 -right-4 bg-aarna-primary text-white p-4 rounded-full shadow-lg">
                <div className="text-center">
                  <div className="text-xl font-bold">₹999</div>
                  <div className="text-xs">Starting at</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="hidden md:block absolute top-10 left-10 w-24 h-24 bg-aarna-primary/10 rounded-full"></div>
      <div className="hidden md:block absolute bottom-10 right-10 w-32 h-32 bg-aarna-primary/10 rounded-full"></div>
    </section>
  );
};

export default Hero;
