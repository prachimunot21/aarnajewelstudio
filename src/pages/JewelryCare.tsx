
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Sparkles, Droplets, ShoppingBag, AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const JewelryCare: React.FC = () => {
  return (
    <>
      <Navbar />
      <main className="py-12 md:py-16 bg-gray-50">
        <div className="container-custom max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-serif mb-3 text-center">Jewelry Care Guide</h1>
          <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
            Learn how to keep your 925 silver jewelry looking beautiful for years to come with our care instructions
          </p>
          
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-serif mb-6 flex items-center">
                <Sparkles className="h-6 w-6 text-aarna-primary mr-3" />
                Caring for Silver Jewelry
              </h2>
              
              <div className="bg-white p-6 md:p-8 rounded-lg shadow-sm">
                <p className="mb-4 text-gray-700">
                  Sterling silver (925 silver) is a beautiful and durable precious metal that requires some care to maintain its lustrous appearance.
                  Silver naturally oxidizes (tarnishes) when exposed to air and certain chemicals, which is a normal process that can
                  be prevented with proper care and storage.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="text-lg font-medium mb-3">Daily Care Tips</h3>
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex items-start">
                          <span className="text-aarna-primary mr-2">•</span>
                          <span>Remove jewelry before showering, swimming, or engaging in activities that involve water or perspiration</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-aarna-primary mr-2">•</span>
                          <span>Apply perfumes, lotions, and cosmetics before putting on your jewelry</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-aarna-primary mr-2">•</span>
                          <span>Wipe pieces with a soft cloth after wearing to remove oils and moisture</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-aarna-primary mr-2">•</span>
                          <span>Avoid exposing silver to household chemicals, chlorinated water, and sulfur-containing substances</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="text-lg font-medium mb-3">Proper Storage</h3>
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex items-start">
                          <span className="text-aarna-primary mr-2">•</span>
                          <span>Store pieces individually in anti-tarnish bags or cloth pouches</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-aarna-primary mr-2">•</span>
                          <span>Keep in a cool, dry place away from direct sunlight</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-aarna-primary mr-2">•</span>
                          <span>Add silica gel packets to your jewelry box to absorb moisture</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-aarna-primary mr-2">•</span>
                          <span>Avoid storing multiple pieces together to prevent scratches and tangling</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-serif mb-6 flex items-center">
                <Droplets className="h-6 w-6 text-aarna-primary mr-3" />
                Cleaning Your Jewelry
              </h2>
              
              <div className="bg-white p-6 md:p-8 rounded-lg shadow-sm">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-3">Regular Cleaning</h3>
                    <p className="text-gray-700 mb-3">
                      For regular maintenance, gently polish your silver jewelry with a soft microfiber or silver polishing cloth. 
                      This removes tarnish and restores shine without scratching the surface.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-3">Deep Cleaning Method</h3>
                    <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-4">
                      <li>Mix a solution of mild dish soap and warm water</li>
                      <li>Soak your silver jewelry for 5-10 minutes</li>
                      <li>Gently scrub with a soft toothbrush, focusing on detailed areas</li>
                      <li>Rinse thoroughly with clean water</li>
                      <li>Dry completely with a soft cloth</li>
                      <li>Polish with a silver polishing cloth</li>
                    </ol>
                  </div>
                  
                  <div className="bg-aarna-light p-4 rounded-md">
                    <h3 className="text-lg font-medium mb-2 flex items-center">
                      <AlertCircle className="h-5 w-5 text-aarna-primary mr-2" />
                      What to Avoid
                    </h3>
                    <ul className="space-y-1 text-gray-700 ml-4">
                      <li>• Harsh chemicals, including chlorine and ammonia</li>
                      <li>• Abrasive cleaners or toothpastes</li>
                      <li>• Ultrasonic cleaners (for pieces with gemstones)</li>
                      <li>• Extended exposure to saltwater</li>
                      <li>• Rubber and latex (causes severe tarnishing)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-serif mb-6 flex items-center">
                <ShoppingBag className="h-6 w-6 text-aarna-primary mr-3" />
                Professional Services
              </h2>
              
              <div className="bg-white p-6 md:p-8 rounded-lg shadow-sm">
                <p className="text-gray-700 mb-4">
                  For heavily tarnished pieces or jewelry with intricate designs, professional cleaning may be the best option.
                  We offer the following services:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border border-gray-200 rounded-md p-4">
                    <h3 className="text-lg font-medium mb-2">Professional Cleaning</h3>
                    <p className="text-gray-700 text-sm">Deep cleaning that restores shine and removes tarnish</p>
                    <p className="mt-2 font-medium">₹499 per item</p>
                  </div>
                  
                  <div className="border border-gray-200 rounded-md p-4">
                    <h3 className="text-lg font-medium mb-2">Replating Service</h3>
                    <p className="text-gray-700 text-sm">Restore white gold or rhodium plated items to original finish</p>
                    <p className="mt-2 font-medium">₹999 per item</p>
                  </div>
                </div>
                
                <p className="mt-6 text-center text-gray-600">
                  Contact our customer service team to inquire about these professional services.
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default JewelryCare;
