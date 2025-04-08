
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const AboutPage: React.FC = () => {
  return (
    <>
      <Navbar />
      <main className="py-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-serif font-medium mb-8 text-center">About Us</h1>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-lg leading-relaxed mb-6">
                Welcome to Aarna Jewel Studio, where timeless elegance meets handcrafted excellence.
              </p>
              
              <p className="text-lg leading-relaxed mb-6">
                Founded in 2025 by Prateek Munot in the heart of Beawar, Aarna Jewel Studio was born out of a deep passion for pure, sophisticated jewelry that speaks to the soul. We specialize in 925 sterling silver pieces that combine modern aesthetics with classic charm—crafted to make you feel as precious as the jewelry you wear.
              </p>
              
              <p className="text-lg leading-relaxed mb-6">
                At Aarna, we believe every piece should tell a story. That's why each creation is thoughtfully designed and meticulously finished to ensure authenticity, durability, and grace. From delicate everyday essentials to statement pieces that turn heads, our collection is crafted with love, care, and an eye for timeless beauty.
              </p>
              
              <p className="text-lg leading-relaxed mb-6">
                Rooted in trust and transparency, our mission is to bring high-quality, affordable luxury to your jewelry box—without compromising on purity or style.
              </p>
              
              <p className="text-lg leading-relaxed mb-6">
                Whether you're gifting someone special or treating yourself, Aarna Jewel Studio is here to help you shine with confidence.
              </p>
            </div>
            
            <div className="mt-16">
              <h2 className="text-2xl font-serif mb-6">Our Founder</h2>
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="w-full md:w-1/3">
                  <div className="aspect-square bg-aarna-light rounded-full overflow-hidden">
                    <img 
                      src="/public/lovable-uploads/09714401-54f1-4797-a5f2-214f1a30b92b.png" 
                      alt="Prateek Munot - Founder of Aarna Jewel Studio"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000";
                      }}
                    />
                  </div>
                </div>
                <div className="w-full md:w-2/3">
                  <h3 className="text-xl font-serif mb-2">Prateek Munot</h3>
                  <p className="text-gray-600 mb-4">Founder & Creative Director</p>
                  <p className="text-lg leading-relaxed">
                    Driven by a passion for creating unique pieces that celebrate individuality, Prateek founded Aarna Jewel Studio to bring premium silver jewelry to discerning customers who appreciate both craftsmanship and contemporary design.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default AboutPage;
