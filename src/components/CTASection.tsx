
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';

const CTASection: React.FC = () => {
  return (
    <section id="cta" className="py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-5xl mx-auto bg-gradient-primary rounded-2xl overflow-hidden shadow-xl">
          <div className="p-8 md:p-12 lg:p-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Ready to Send 'Em All?
                </h2>
                <p className="text-white text-opacity-90 text-lg mb-8">
                  Join thousands of businesses sending cold emails at scale with industry-leading deliverability. Try SendEmAll free for 14 days.
                </p>
                <div className="space-x-4">
                  <Button 
                    className="bg-white text-primary-700 hover:bg-opacity-90 transition-all"
                  >
                    Start Your Free Trial <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button 
                    variant="link" 
                    className="text-white hover:text-white hover:underline"
                  >
                    Book a Demo
                  </Button>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="relative">
                  <div className="absolute -top-24 -right-24 w-64 h-64 bg-white bg-opacity-10 rounded-full"></div>
                  <div className="absolute -bottom-20 -left-16 w-48 h-48 bg-white bg-opacity-10 rounded-full"></div>
                  <div className="bg-white bg-opacity-20 p-8 rounded-xl backdrop-blur-sm">
                    <div className="bg-white rounded-lg shadow-sm p-6">
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <div className="h-3 w-24 bg-gray-200 rounded"></div>
                        </div>
                        <div className="h-8 w-8 bg-primary-100 rounded-full"></div>
                      </div>
                      <div className="space-y-2 mb-6">
                        <div className="h-2 w-full bg-gray-100 rounded"></div>
                        <div className="h-2 w-5/6 bg-gray-100 rounded"></div>
                        <div className="h-2 w-4/6 bg-gray-100 rounded"></div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="h-6 w-20 bg-primary-100 rounded"></div>
                        <div className="h-6 w-6 bg-primary-100 rounded-full"></div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="text-white text-sm text-center">
                        Powerful, easy-to-use cold email platform
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
