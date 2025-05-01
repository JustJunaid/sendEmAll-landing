
import React from 'react';
import { Mail, Users, Check, Search, Settings } from 'lucide-react';

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Feature: React.FC<FeatureProps> = ({ icon, title, description }) => {
  return (
    <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="h-12 w-12 rounded-lg bg-gradient-primary text-white flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: <Mail size={24} />,
      title: "Upload & Validate Emails",
      description: "Instantly cleanse your list with built-in email validation. Ensure 95%+ deliverability with our advanced list management tools."
    },
    {
      icon: <Users size={24} />,
      title: "Personalize at Scale",
      description: "Dynamic tags for custom first-name, company, role and more. Create truly personalized cold emails that get responses."
    },
    {
      icon: <Check size={24} />,
      title: "Deliverability Tools",
      description: "Automatic email warm-up, DKIM/SPF/DMARC setup, and smart sending patterns ensure your bulk cold emails reach the inbox."
    },
    {
      icon: <Search size={24} />,
      title: "Analytics Dashboard",
      description: "Track open, click, and reply rates in real time. Optimize your cold email campaigns with actionable insights."
    },
    {
      icon: <Settings size={24} />,
      title: "A/B Testing",
      description: "Test different subject lines, email copy, and CTAs to find what works best. Continuous optimization for better results."
    },
    {
      icon: <Mail size={24} />,
      title: "Follow-up Sequences",
      description: "Set up automated follow-up emails to boost response rates. Perfect timing and persistence without the manual work."
    }
  ];

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Bulk Cold Email Features That Drive Results
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to send cold emails at scale with industry-leading deliverability
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Feature
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-gray-500 mb-5">
            Looking for a better alternative to Instantly.ai, Lemlist, or other cold email tools?
          </p>
          <a 
            href="#pricing" 
            className="inline-block px-8 py-3 bg-gradient-primary rounded-lg text-white font-medium hover:opacity-90 transition-opacity"
          >
            See All Features
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
