
import React from "react";
import { Sparkles, Award, RefreshCw, Truck } from "lucide-react";

const Features: React.FC = () => {
  const features = [
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Authentic 925 Silver",
      description: "Our jewelry is crafted with genuine 925 sterling silver, ensuring quality and longevity."
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Handcrafted Excellence",
      description: "Each piece is meticulously handcrafted by skilled artisans for exceptional quality."
    },
    {
      icon: <RefreshCw className="w-8 h-8" />,
      title: "Easy Returns",
      description: "Not satisfied? Return within 15 days for a full refund or exchange."
    },
    {
      icon: <Truck className="w-8 h-8" />,
      title: "Free Shipping",
      description: "Enjoy complimentary shipping on all orders above ₹1999 across India."
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="text-center p-6 rounded-lg hover:shadow-md transition-shadow bg-white"
            >
              <div className="w-16 h-16 bg-aarna-light text-aarna-primary rounded-full flex items-center justify-center mx-auto mb-4">
                {feature.icon}
              </div>
              <h3 className="font-serif font-medium text-xl mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
