import { Link } from 'react-router-dom';
import { trackButtonClick } from '../hooks/useGoogleAnalytics';

const CalculatorCTA = () => {
  const handleCalculatorClick = () => {
    trackButtonClick('Campaign Sender Calculator', 'Calculator CTA Section');
  };

  return (
    <section className="py-20 bg-gradient-to-br from-[#d2b3f3]/5 via-white to-[#94E9E6]/5 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#d2b3f3]/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#94E9E6]/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left side - Content */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-[#d2b3f3]/10 text-[#d2b3f3] px-4 py-2 rounded-full text-sm font-medium border border-[#d2b3f3]/20">
                <i className="fas fa-calculator"></i>
                Free Tool
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                Not sure how many mailboxes you need?
              </h2>

              <p className="text-lg text-gray-600 leading-relaxed">
                Use our <strong>free Campaign Sender Calculator</strong> to instantly calculate the exact number of
                email senders and domains required for your cold email campaign. Get precise recommendations based
                on your volume, timeline, and ESP preferences.
              </p>

              <div className="space-y-4 pt-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#d2b3f3]/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <i className="fas fa-check text-[#d2b3f3] text-xs"></i>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Instant Infrastructure Planning</h3>
                    <p className="text-gray-600 text-sm">
                      Know exactly how many senders and domains you need before you start
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#d2b3f3]/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <i className="fas fa-check text-[#d2b3f3] text-xs"></i>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">ESP-Specific Optimization</h3>
                    <p className="text-gray-600 text-sm">
                      Tailored calculations for Google Workspace, Azure, or custom SMTP
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#d2b3f3]/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <i className="fas fa-check text-[#d2b3f3] text-xs"></i>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Health Tier Analysis</h3>
                    <p className="text-gray-600 text-sm">
                      Factor in sender health scores for accurate deliverability planning
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <Link
                  to="/campaign-sender-calculator"
                  onClick={handleCalculatorClick}
                  className="inline-flex items-center gap-3 bg-[#d2b3f3] hover:bg-[#d2b3f3]/90 text-black px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 shadow-lg shadow-[#d2b3f3]/25 hover:shadow-xl hover:shadow-[#d2b3f3]/30 hover:-translate-y-0.5"
                >
                  <i className="fas fa-calculator"></i>
                  Calculate My Campaign Needs
                  <i className="fas fa-arrow-right text-sm"></i>
                </Link>
                <p className="text-sm text-gray-500 mt-3 ml-1">
                  <i className="fas fa-sparkles text-[#d2b3f3] mr-1"></i>
                  Free to use • No credit card required
                </p>
              </div>
            </div>

            {/* Right side - Visual/Stats */}
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100 relative overflow-hidden">
                {/* Decorative gradient overlay */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#d2b3f3]/10 to-[#94E9E6]/10 rounded-full blur-3xl" />

                <div className="relative z-10 space-y-6">
                  <div className="text-center mb-8">
                    <div className="w-20 h-20 bg-gradient-to-br from-[#d2b3f3] to-[#94E9E6] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <i className="fas fa-chart-line text-white text-3xl"></i>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Real-Time Calculations</h3>
                    <p className="text-gray-600 text-sm">Powered by SendEmAll's infrastructure engine</p>
                  </div>

                  {/* Sample calculation display */}
                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-[#d2b3f3]/10 to-transparent rounded-xl p-4 border-l-4 border-[#d2b3f3]">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-600 font-medium">Campaign Volume</span>
                        <span className="text-2xl font-bold text-gray-900">10,000</span>
                      </div>
                      <div className="text-xs text-gray-500">Total emails to send</div>
                    </div>

                    <div className="bg-gradient-to-r from-[#94E9E6]/10 to-transparent rounded-xl p-4 border-l-4 border-[#94E9E6]">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-600 font-medium">Senders Needed</span>
                        <span className="text-2xl font-bold text-gray-900">12</span>
                      </div>
                      <div className="text-xs text-gray-500">Optimized for deliverability</div>
                    </div>

                    <div className="bg-gradient-to-r from-[#d2b3f3]/10 to-transparent rounded-xl p-4 border-l-4 border-[#d2b3f3]">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-600 font-medium">Domains Required</span>
                        <span className="text-2xl font-bold text-gray-900">3</span>
                      </div>
                      <div className="text-xs text-gray-500">Based on ESP limits</div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                      <i className="fas fa-shield-alt text-[#d2b3f3]"></i>
                      <span>100% accurate • Industry-tested formulas</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating stats badges */}
              <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg px-4 py-3 border border-gray-100 hidden md:block">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-[#d2b3f3]/10 rounded-lg flex items-center justify-center">
                    <i className="fas fa-clock text-[#d2b3f3]"></i>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Calculation time</div>
                    <div className="text-sm font-bold text-gray-900">&lt; 1 second</div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg px-4 py-3 border border-gray-100 hidden md:block">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-[#94E9E6]/10 rounded-lg flex items-center justify-center">
                    <i className="fas fa-users text-[#94E9E6]"></i>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Calculations run</div>
                    <div className="text-sm font-bold text-gray-900">5,000+</div>
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

export default CalculatorCTA;
