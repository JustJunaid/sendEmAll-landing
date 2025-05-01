
import React from 'react';
import { Button } from "@/components/ui/button";
import { Check } from 'lucide-react';

interface PricingTierProps {
  name: string;
  price: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  buttonText: string;
}

const PricingTier: React.FC<PricingTierProps> = ({ 
  name, 
  price, 
  description, 
  features, 
  isPopular = false,
  buttonText
}) => {
  return (
    <div className={`
      bg-white rounded-xl overflow-hidden border transition-all duration-200
      ${isPopular ? 'shadow-lg border-primary-300 scale-[1.02]' : 'shadow-sm border-gray-100 hover:shadow'}
    `}>
      {isPopular && (
        <div className="bg-gradient-primary py-2 text-white text-center text-sm font-medium">
          Most Popular
        </div>
      )}
      <div className="p-6 md:p-8">
        <h3 className="text-xl font-bold mb-2">{name}</h3>
        <div className="mb-4">
          <span className="text-3xl font-bold">{price}</span>
          <span className="text-gray-500">/month</span>
        </div>
        <p className="text-gray-600 mb-6">
          {description}
        </p>
        <Button 
          className={`w-full ${isPopular ? 'bg-gradient-primary hover:opacity-90' : ''}`}
          variant={isPopular ? 'default' : 'outline'}
        >
          {buttonText}
        </Button>
      </div>
      <div className="p-6 md:p-8 bg-gray-50 border-t border-gray-100">
        <ul className="space-y-3">
          {features.map((feature, i) => (
            <li key={i} className="flex items-start">
              <Check size={18} className="mr-2 text-green-500 mt-1 shrink-0" />
              <span className="text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const PricingSection: React.FC = () => {
  const pricingTiers = [
    {
      name: "Starter",
      price: "$49",
      description: "Perfect for individuals and small teams just getting started with cold email.",
      features: [
        "5,000 emails per month",
        "2 email accounts",
        "Basic personalization",
        "Email validation",
        "Standard support"
      ],
      buttonText: "Get Started"
    },
    {
      name: "Pro",
      price: "$149",
      description: "For growing teams that need more power and advanced features.",
      features: [
        "50,000 emails per month",
        "10 email accounts",
        "Advanced personalization",
        "Email validation & warmup",
        "Priority support",
        "A/B testing",
        "Advanced analytics"
      ],
      isPopular: true,
      buttonText: "Try Pro Plan"
    },
    {
      name: "Enterprise",
      price: "$399",
      description: "For large teams and agencies that need the ultimate in scale and deliverability.",
      features: [
        "Unlimited emails",
        "Unlimited email accounts",
        "Advanced personalization",
        "Email validation & warmup",
        "Dedicated account manager",
        "Custom integrations",
        "Advanced analytics & API access",
        "99.9% deliverability guarantee"
      ],
      buttonText: "Contact Sales"
    }
  ];
  
  return (
    <section id="pricing" className="py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600">
            Choose the perfect plan for your cold email needs
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {pricingTiers.map((tier, index) => (
            <PricingTier key={index} {...tier} />
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-gray-500 mb-4">
            All plans include a 14-day free trial. No credit card required.
          </p>
          <p className="text-sm text-gray-400">
            Looking for a custom solution? <a href="#contact" className="text-primary-600 hover:underline">Contact our sales team</a>.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
