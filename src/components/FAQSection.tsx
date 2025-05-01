
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection: React.FC = () => {
  const faqs = [
    {
      question: "How does SendEmAll ensure high deliverability for bulk cold emails?",
      answer: "SendEmAll uses a combination of advanced techniques including email warmup, proper DKIM/SPF/DMARC setup, AI-powered sending patterns, and domain reputation management. Our system automatically adjusts sending volume and timing based on domain age and reputation to maximize inbox placement, even with bulk cold email campaigns."
    },
    {
      question: "How is SendEmAll different from Instantly.ai and other cold email tools?",
      answer: "Unlike other tools, SendEmAll focuses exclusively on deliverability and personalization at scale. We offer more advanced email validation, better analytics, and higher deliverability rates. Our infrastructure is specifically designed for cold email, with features like automatic warm-up and intelligent sending patterns that other platforms charge extra for."
    },
    {
      question: "Can I integrate SendEmAll with my existing CRM?",
      answer: "Yes! SendEmAll integrates seamlessly with popular CRMs including Salesforce, HubSpot, Pipedrive, and more. We also offer a robust API for custom integrations with any system you currently use, making it easy to sync your cold email campaigns with your existing sales workflow."
    },
    {
      question: "What happens if I exceed my plan's monthly email limit?",
      answer: "If you reach your monthly email limit, you can either upgrade to a higher plan or purchase additional email credits as needed. We'll notify you when you're approaching your limit so you can make an informed decision without any interruption to your cold email campaigns."
    },
    {
      question: "Does SendEmAll comply with anti-spam laws like GDPR and CAN-SPAM?",
      answer: "Absolutely. SendEmAll is designed with compliance in mind. We enforce unsubscribe links, proper physical address inclusion, and other requirements of major anti-spam regulations. We also provide tools to help you manage consent and maintain clean lists in accordance with GDPR and other privacy regulations."
    },
    {
      question: "Can I track and analyze the performance of my cold email campaigns?",
      answer: "Yes, our analytics dashboard provides detailed insights on opens, clicks, replies, and conversions. You can segment performance by campaign, email template, sending time, and more. These actionable insights help you continuously optimize your cold email strategy for maximum effectiveness."
    }
  ];

  return (
    <section id="faq" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to know about our bulk cold email platform
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-medium text-lg py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-4">
            Still have questions about our bulk cold email platform?
          </p>
          <a 
            href="#contact" 
            className="inline-block text-primary-600 font-medium hover:text-primary-700"
          >
            Contact our support team
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
