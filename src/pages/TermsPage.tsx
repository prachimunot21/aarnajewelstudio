
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const TermsPage: React.FC = () => {
  return (
    <>
      <Navbar />
      <main className="py-12 md:py-16 bg-gray-50">
        <div className="container-custom max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-serif mb-8 text-center">Terms & Conditions</h1>
          
          <div className="bg-white p-6 md:p-8 rounded-lg shadow-sm">
            <p className="text-gray-600 mb-8">
              Last Updated: April 12, 2025
            </p>
            
            <div className="space-y-6 text-gray-700">
              <section>
                <h2 className="text-xl font-medium mb-3">1. Introduction</h2>
                <p>
                  Welcome to Aarna Silver ("we," "our," or "us"). By accessing and using our website at www.aarnasilver.com (the "Site"), 
                  you agree to be bound by these Terms & Conditions, our Privacy Policy, and any other policies referenced herein. 
                  If you do not agree with any part of these terms, please do not use our Site or services.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-medium mb-3">2. Account Registration</h2>
                <p className="mb-2">
                  When you create an account with us, you must provide accurate, complete, and current information. You are responsible for safeguarding 
                  your account credentials and for all activity that occurs under your account.
                </p>
                <p>
                  We reserve the right to disable any user account if, in our opinion, you have violated any provision of these Terms & Conditions.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-medium mb-3">3. Products and Orders</h2>
                <p className="mb-2">
                  All products displayed on our Site are subject to availability. We reserve the right to discontinue or modify any product without notice.
                </p>
                <p className="mb-2">
                  Product prices are as quoted on our Site and are subject to change without notice. All prices are in Indian Rupees (₹) unless otherwise stated.
                </p>
                <p>
                  We take reasonable steps to display product images that accurately reflect their appearance, but we cannot guarantee that your device's display 
                  will accurately reflect the actual colors and details of our products.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-medium mb-3">4. Payment Terms</h2>
                <p className="mb-2">
                  We accept various payment methods as indicated during the checkout process. By providing your payment information, you represent and warrant that 
                  you are authorized to use the designated payment method.
                </p>
                <p>
                  All payments are processed securely through our payment gateway partners. We do not store complete credit card details on our servers.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-medium mb-3">5. Shipping and Delivery</h2>
                <p className="mb-2">
                  Shipping costs and estimated delivery times are provided during the checkout process. We make reasonable efforts to deliver products within the 
                  estimated timeframes, but we do not guarantee delivery dates.
                </p>
                <p>
                  Risk of loss and title for items purchased pass to you upon delivery of the items to the shipping carrier.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-medium mb-3">6. Returns and Refunds</h2>
                <p>
                  Our return and refund policy is as described in our Shipping & Returns page. By making a purchase, you agree to the terms of that policy.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-medium mb-3">7. Intellectual Property</h2>
                <p className="mb-2">
                  All content on our Site, including text, graphics, logos, images, and software, is the property of Aarna Silver or our content suppliers and 
                  is protected by copyright, trademark, and other intellectual property laws.
                </p>
                <p>
                  You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit 
                  any of the material on our Site without our prior written consent.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-medium mb-3">8. User Content</h2>
                <p>
                  By submitting reviews, comments, or other content to our Site, you grant us a non-exclusive, royalty-free, perpetual, irrevocable, and fully 
                  sublicensable right to use, reproduce, modify, adapt, publish, translate, create derivative works from, distribute, and display such content 
                  throughout the world in any media.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-medium mb-3">9. Limitation of Liability</h2>
                <p>
                  To the fullest extent permitted by law, Aarna Silver shall not be liable for any indirect, incidental, special, consequential, or punitive damages, 
                  or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses resulting 
                  from your access to or use of or inability to access or use the Site or services.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-medium mb-3">10. Governing Law</h2>
                <p>
                  These Terms & Conditions shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law principles.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-medium mb-3">11. Changes to Terms</h2>
                <p>
                  We reserve the right to modify these Terms & Conditions at any time. Changes will be effective immediately upon posting to the Site. 
                  Your continued use of the Site following any changes constitutes your acceptance of the revised terms.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-medium mb-3">12. Contact Information</h2>
                <p>
                  If you have any questions about these Terms & Conditions, please contact us at legal@aarnasilver.com.
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default TermsPage;
