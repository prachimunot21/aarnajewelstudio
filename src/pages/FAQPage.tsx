
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQPage: React.FC = () => {
  const faqs = [
    {
      question: "What is 925 silver?",
      answer: "925 silver, also known as sterling silver, contains 92.5% pure silver mixed with 7.5% other metals (usually copper). This combination creates a durable yet beautiful metal that maintains silver's lustrous appearance while being strong enough for everyday wear."
    },
    {
      question: "How do I care for my silver jewelry?",
      answer: "To keep your silver jewelry looking its best, clean it regularly with a soft polishing cloth, store in an airtight container or anti-tarnish bag, and avoid contact with chemicals, perfumes, and lotions. Visit our Jewelry Care page for more detailed instructions."
    },
    {
      question: "Are your products nickel-free?",
      answer: "Yes, all our jewelry is nickel-free and hypoallergenic, making it suitable for sensitive skin."
    },
    {
      question: "Do you offer international shipping?",
      answer: "Yes, we ship worldwide. International shipping times vary by location, typically taking 7-14 business days. Additional customs fees may apply depending on your country's import regulations."
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for unworn items in their original packaging. Please visit our Shipping & Returns page for detailed instructions on how to initiate a return."
    },
    {
      question: "How do I know what size to order?",
      answer: "We provide detailed size guides for all our products. For rings, we recommend having your finger professionally measured at a local jeweler for the most accurate fit."
    },
    {
      question: "Do your products come with a warranty?",
      answer: "All our jewelry comes with a 1-year warranty against manufacturing defects. This doesn't cover normal wear and tear or damage caused by improper care."
    },
    {
      question: "Are gift options available?",
      answer: "Yes, all orders can be shipped in our elegant gift packaging at no extra cost. You can also add a personalized message during checkout."
    }
  ];

  return (
    <>
      <Navbar />
      <main className="py-12 md:py-16 bg-gray-50">
        <div className="container-custom max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-serif mb-8 text-center">Frequently Asked Questions</h1>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border rounded-md px-4">
                  <AccordionTrigger className="text-lg font-medium py-4">{faq.question}</AccordionTrigger>
                  <AccordionContent className="py-4 text-gray-700">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Still have questions? Feel free to <a href="/contact" className="text-aarna-primary hover:underline">contact us</a>.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default FAQPage;
