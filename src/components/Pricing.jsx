import { useState } from 'react';
import { trackButtonClick, trackEvent } from '../hooks/useGoogleAnalytics';

const Pricing = () => {
  const [billingPeriod, setBillingPeriod] = useState('annual');

  const plans = [
    {
      name: 'Growth',
      monthlyPrice: 29,
      annualPrice: 23,
      description: 'Perfect for small businesses and startups',
      features: [
        'Unlimited Email Accounts',
        'Built-in Email Verification',
        '2,000 Contacts',
        '7,500 Emails Monthly',
        'Google, Microsoft, SMTP Support',
        'Basic Analytics Dashboard',
        'Domain Health Checks',
        'Email Support',
      ],
      cta: 'Start Free Trial',
      ctaLink: 'https://app.sendemall.com/register',
    },
    {
      name: 'Professional',
      monthlyPrice: 79,
      annualPrice: 63,
      description: 'Perfect for growing teams and agencies',
      popular: true,
      features: [
        'Unlimited Email Accounts',
        'Built-in Email Verification',
        'AI Copy Generation',
        'Unlimited A/B Variant Testing',
        '25,000 Contacts',
        '150,000 Emails Monthly',
        'Spintax Support',
        'Domain Rotation',
        'Smart Campaign Optimization',
        'Advanced Analytics Dashboard',
        'Dedicated Inbox Management',
        'Warmup & Placement Tests',
        'Priority Support',
      ],
      cta: 'Start Free Trial',
      ctaLink: 'https://app.sendemall.com/register',
    },
    {
      name: 'Enterprise',
      customPrice: true,
      description: 'Everything in Professional + advanced features',
      features: [
        'Everything in Professional +',
        'Unlimited Contacts',
        'Up to 1M Emails Monthly',
        'Dedicated Sending Infrastructure',
        'Dedicated IP & IP Rotation',
        'White Labeling',
        'Dedicated Account Manager',
        'Premium Expert Support',
        'Custom Integrations',
        'SLA Guarantees',
      ],
      cta: 'Contact Sales',
      ctaLink: 'https://cal.com/sendemall/outbound-deliverability-strategy-call',
    },
  ];

  return (
    <section className="pricing" id="pricing">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">Pricing</div>
          <h2 className="section-title">Choose Your Growth Plan</h2>
          <p>Scale your sales outreach with the right plan for your business</p>
        </div>

        <div className="pricing-toggle-container">
          <button
            className={`pricing-toggle-btn ${billingPeriod === 'monthly' ? 'active' : ''}`}
            onClick={() => {
              setBillingPeriod('monthly');
              trackEvent('pricing_toggle', {
                event_category: 'Pricing',
                event_label: 'Monthly',
              });
            }}
          >
            Monthly
          </button>
          <button
            className={`pricing-toggle-btn ${billingPeriod === 'annual' ? 'active' : ''}`}
            onClick={() => {
              setBillingPeriod('annual');
              trackEvent('pricing_toggle', {
                event_category: 'Pricing',
                event_label: 'Annual',
              });
            }}
          >
            Annual
          </button>
          <span className="hanging-tag">2 MONTHS FREE</span>
        </div>

        <div className="pricing-grid-new">
          {plans.map((plan, index) => (
            <div
              className={`pricing-card-new ${plan.popular ? 'featured-new' : ''}`}
              key={index}
            >
              {plan.popular && <div className="popular-badge">MOST POPULAR</div>}
              <div className="pricing-header-new">
                <h3 className="plan-name-new">{plan.name}</h3>
                <div className="plan-price-new">
                  {plan.customPrice ? (
                    <span className="amount-custom">Custom</span>
                  ) : (
                    <>
                      <span className="currency-new">$</span>
                      <span className="amount-new">
                        {billingPeriod === 'annual' ? plan.annualPrice : plan.monthlyPrice}
                      </span>
                      <span className="period">/month</span>
                    </>
                  )}
                </div>
                <p className="plan-description-new">{plan.description}</p>
              </div>

              <ul className="pricing-features-new">
                {plan.features.map((feature, idx) => (
                  <li key={idx}>
                    <i className="fas fa-check"></i> {feature}
                  </li>
                ))}
              </ul>

              <a
                href={plan.ctaLink}
                target="_blank"
                rel="noopener noreferrer"
                className={`btn-pricing-new ${plan.popular ? 'primary' : ''}`}
                onClick={() => trackButtonClick(`${plan.name} - ${plan.cta}`, 'Pricing CTA')}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>

        <div className="pricing-footer-new">
          <p>
            All paid plans include a <strong>14-day free trial</strong>. No credit card required. Cancel anytime.
          </p>
          <p className="savings-text">Get 2 months free with annual billing on Growth and Professional plans</p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
