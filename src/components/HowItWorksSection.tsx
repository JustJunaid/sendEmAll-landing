
import React from 'react';

const steps = [
  {
    number: "01",
    title: "Import Your List",
    description: "Upload a CSV or connect your CRM to import contacts. Our system automatically validates and cleans your email list.",
    image: "/placeholder.svg" // We're using the placeholder for now
  },
  {
    number: "02",
    title: "Design Your Campaign",
    description: "Create your email template with dynamic tags for personalization. Set up your follow-up sequence and delivery rules.",
    image: "/placeholder.svg"
  },
  {
    number: "03",
    title: "Hit Send & We Do The Rest",
    description: "Our system handles sending, tracking, and follow-ups. You focus on responding to interested prospects.",
    image: "/placeholder.svg"
  }
];

const HowItWorksSection: React.FC = () => {
  return (
    <section id="how-it-works" className="py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How SendEmAll Works
          </h2>
          <p className="text-xl text-gray-600">
            Send cold emails at scale with just three simple steps
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connect steps with line on desktop */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-[calc(100%_-_16px)] w-[calc(100%_-_30px)] h-0.5 bg-gray-200 z-0" />
              )}
              
              <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 relative z-10">
                <div className="h-48 bg-gray-50 p-6 flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <span className="text-4xl font-bold text-gray-400">{step.number}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <div className="inline-block py-2 px-4 bg-primary-50 rounded-full text-primary-700 text-sm font-medium mb-4">
            As easy as 1-2-3
          </div>
          <h3 className="text-2xl font-bold mb-2">Ready to automate your cold email outreach?</h3>
          <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
            Join thousands of sales professionals and marketers who use SendEmAll to scale their cold email campaigns.
          </p>
          <a 
            href="#cta" 
            className="inline-block px-8 py-3 bg-gradient-primary rounded-lg text-white font-medium hover:opacity-90 transition-opacity"
          >
            Start Your Free Trial
          </a>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
