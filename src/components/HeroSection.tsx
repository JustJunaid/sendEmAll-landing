
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden py-20 lg:py-28">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 opacity-[0.03]">
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-primary-300"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-secondary-300"></div>
      </div>
      
      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            {/* SEO-optimized hero text with target keywords */}
            <div className="inline-block px-3 py-1 mb-6 text-xs font-medium text-secondary-700 bg-secondary-50 rounded-full">
              #1 Alternative to Instantly.ai | Better Deliverability
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Send 'Em All—Cold Email at Scale, Made Simple
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-600 max-w-lg">
              Automate your outreach, boost your reply rates, and hit inboxes with 100% deliverability. The ultimate bulk cold email solution.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                className="bg-gradient-primary text-white px-6 py-6 text-lg hover:shadow-lg transition-all hover:scale-[1.02]"
              >
                Get Early Access <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                className="text-lg border-gray-300 hover:border-gray-400"
              >
                Watch Demo
              </Button>
            </div>
            
            <div className="mt-8 flex items-center">
              <div className="flex -space-x-2 mr-4">
                <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs font-medium">JD</div>
                <div className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center text-xs font-medium">KL</div>
                <div className="w-8 h-8 rounded-full bg-gray-400 border-2 border-white flex items-center justify-center text-xs font-medium">RS</div>
                <div className="w-8 h-8 rounded-full bg-gray-500 border-2 border-white flex items-center justify-center text-xs text-white font-medium">+</div>
              </div>
              <span className="text-sm text-gray-500">
                <span className="font-medium">650+ people</span> using SendEmAll
              </span>
            </div>
          </div>
          
          <div className="relative lg:ml-auto animate-fade-in">
            <div className="bg-white rounded-xl shadow-xl p-6 lg:p-8 relative overflow-hidden border border-gray-100">
              {/* Animated email illustration */}
              <div className="relative">
                <div className="w-full h-64 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg flex items-center justify-center">
                  <div className="relative w-3/4 max-w-xs animate-float">
                    <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
                      <div className="w-1/2 h-4 bg-gray-200 rounded mb-4"></div>
                      <div className="w-full h-3 bg-gray-100 rounded mb-2"></div>
                      <div className="w-full h-3 bg-gray-100 rounded mb-2"></div>
                      <div className="w-3/4 h-3 bg-gray-100 rounded mb-6"></div>
                      <div className="w-1/3 h-6 bg-gradient-primary rounded animate-pulse-light"></div>
                    </div>
                    <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center text-white">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 space-y-3">
                <h3 className="text-lg font-medium">Ready to scale your cold outreach?</h3>
                <p className="text-gray-500 text-sm">Sign up today and get:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="h-5 w-5 bg-secondary-100 rounded-full flex items-center justify-center mr-2">
                      <span className="h-2.5 w-2.5 bg-secondary-600 rounded-full"></span>
                    </span>
                    <span className="text-sm">1,000 free emails per month</span>
                  </li>
                  <li className="flex items-center">
                    <span className="h-5 w-5 bg-secondary-100 rounded-full flex items-center justify-center mr-2">
                      <span className="h-2.5 w-2.5 bg-secondary-600 rounded-full"></span>
                    </span>
                    <span className="text-sm">Premium deliverability tools</span>
                  </li>
                  <li className="flex items-center">
                    <span className="h-5 w-5 bg-secondary-100 rounded-full flex items-center justify-center mr-2">
                      <span className="h-2.5 w-2.5 bg-secondary-600 rounded-full"></span>
                    </span>
                    <span className="text-sm">Advanced analytics dashboard</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
