
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Truck, RotateCw, Clock, MapPin } from "lucide-react";

const ShippingPage: React.FC = () => {
  return (
    <>
      <Navbar />
      <main className="py-12 md:py-16 bg-gray-50">
        <div className="container-custom max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-serif mb-8 text-center">Shipping & Returns</h1>
          
          <div className="bg-white p-6 md:p-8 rounded-lg shadow-sm mb-10">
            <div className="mb-10">
              <div className="flex items-center mb-4">
                <Truck className="h-6 w-6 text-aarna-primary mr-3" />
                <h2 className="text-2xl font-serif">Shipping Information</h2>
              </div>
              
              <div className="border-l-2 border-aarna-light pl-4 ml-3 space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Domestic Shipping (India)</h3>
                  <p className="text-gray-700 mb-2">We offer the following shipping options for all domestic orders:</p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                    <li>Standard Shipping (3-5 business days): ₹99 or FREE on orders above ₹1500</li>
                    <li>Express Shipping (1-2 business days): ₹199</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">International Shipping</h3>
                  <p className="text-gray-700 mb-2">We ship worldwide with the following options:</p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                    <li>Standard International (7-14 business days): ₹999</li>
                    <li>Express International (3-5 business days): ₹1999</li>
                  </ul>
                  <p className="text-gray-700 mt-2 text-sm">
                    Please note that international orders may be subject to customs duties and taxes imposed by the destination country.
                    These charges are the responsibility of the recipient.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Shipping Restrictions</h3>
                  <p className="text-gray-700">
                    We currently do not ship to P.O. boxes. Please provide a physical address for delivery.
                  </p>
                </div>
              </div>
            </div>
            
            <div>
              <div className="flex items-center mb-4">
                <RotateCw className="h-6 w-6 text-aarna-primary mr-3" />
                <h2 className="text-2xl font-serif">Returns & Exchanges</h2>
              </div>
              
              <div className="border-l-2 border-aarna-light pl-4 ml-3 space-y-4">
                <p className="text-gray-700">
                  We want you to be completely satisfied with your purchase. If for any reason you're not happy with your order,
                  we offer a simple return and exchange policy.
                </p>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Return Policy</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                    <li>Returns are accepted within 30 days of delivery</li>
                    <li>Items must be unworn, undamaged, and in their original packaging</li>
                    <li>Earrings cannot be returned due to hygiene reasons</li>
                    <li>Custom or personalized items cannot be returned unless defective</li>
                    <li>Refunds will be issued to the original payment method</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">How to Return an Item</h3>
                  <ol className="list-decimal list-inside text-gray-700 space-y-1 ml-4">
                    <li>Contact our customer service team at support@aarnasilver.com</li>
                    <li>Fill out the return form included with your order</li>
                    <li>Package your items securely in their original packaging</li>
                    <li>Ship the package to our return address</li>
                  </ol>
                  <p className="text-gray-700 mt-2">
                    Return shipping costs are the responsibility of the customer, except in cases of defective items.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Exchanges</h3>
                  <p className="text-gray-700">
                    If you'd like to exchange an item for a different size or style, please follow the same process as returns.
                    Once we receive your return, we'll process the exchange and ship the new item to you.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <Clock className="h-5 w-5 text-aarna-primary mr-2" />
                <h3 className="text-xl font-serif">Processing Times</h3>
              </div>
              <p className="text-gray-700">
                Orders are typically processed within 1-2 business days. During peak seasons or sales events,
                processing may take up to 3 business days. Custom or personalized orders may require additional time.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <MapPin className="h-5 w-5 text-aarna-primary mr-2" />
                <h3 className="text-xl font-serif">Tracking Your Order</h3>
              </div>
              <p className="text-gray-700">
                Once your order ships, you'll receive a confirmation email with tracking information.
                You can also track your order by logging into your account or contacting our customer service team.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ShippingPage;
