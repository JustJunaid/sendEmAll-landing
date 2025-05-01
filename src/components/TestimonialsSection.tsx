
import React from 'react';
import { Star } from 'lucide-react';

interface TestimonialProps {
  quote: string;
  author: string;
  role: string;
  company: string;
  rating: number;
}

const Testimonial: React.FC<TestimonialProps> = ({ quote, author, role, company, rating }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
      <div className="flex mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star 
            key={i}
            size={18}
            className={i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
          />
        ))}
      </div>
      <blockquote className="mb-6 text-gray-700">"{quote}"</blockquote>
      <div>
        <div className="font-medium">{author}</div>
        <div className="text-sm text-gray-500">{role}, {company}</div>
      </div>
    </div>
  );
};

const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      quote: "SendEmAll dramatically improved our cold email deliverability. We went from a 15% open rate to consistently above 45%. It's a game-changer for our outbound sales.",
      author: "Michael Johnson",
      role: "Head of Sales",
      company: "TechGrowth Inc.",
      rating: 5
    },
    {
      quote: "After trying Instantly.ai and other alternatives, I can confidently say that SendEmAll offers the best deliverability and features for the price. The analytics are incredible.",
      author: "Sarah Martinez",
      role: "Marketing Director",
      company: "SaaS Solutions",
      rating: 5
    },
    {
      quote: "The ability to personalize emails at scale is incredible. We're seeing 3x more replies with SendEmAll compared to our previous cold email tool.",
      author: "David Chen",
      role: "Founder",
      company: "GrowthHackers",
      rating: 5
    }
  ];

  // Logos for social proof
  const logos = [
    "TechCorp", "GrowthCo", "SalesPro", "MarketEdge", "LeadGen"
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Trusted by Sales Teams Everywhere
          </h2>
          <p className="text-xl text-gray-600">
            See why companies choose SendEmAll over Instantly.ai and other cold email platforms
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <Testimonial key={index} {...testimonial} />
          ))}
        </div>
        
        {/* Company Logos */}
        <div className="pt-10 border-t border-gray-200">
          <p className="text-center text-gray-500 mb-10">Trusted by industry leaders:</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {logos.map((logo, index) => (
              <div key={index} className="flex items-center justify-center">
                <div className="h-8 bg-gray-200 rounded px-6 flex items-center justify-center">
                  <span className="font-medium text-gray-600">{logo}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
