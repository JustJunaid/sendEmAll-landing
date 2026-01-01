import { Link } from 'react-router-dom';
import { trackButtonClick } from '../hooks/useGoogleAnalytics';

const CalculatorCTA = () => {
  const handleCalculatorClick = () => {
    trackButtonClick('Mailboxes Calculator', 'Calculator CTA Section');
  };

  const features = [
    {
      icon: 'fas fa-bolt',
      title: 'Instant Infrastructure Planning',
      description: 'Know exactly how many senders and domains you need before you start your campaign.',
    },
    {
      icon: 'fas fa-server',
      title: 'ESP-Specific Optimization',
      description: 'Tailored calculations for Google Workspace, Microsft 365, Azure, or SMTP providers.',
    },
    {
      icon: 'fas fa-shield-alt',
      title: 'Health Tier Analysis',
      description: 'Factor in sender health scores for accurate deliverability planning.',
    },
  ];

  return (
    <section className="features" id="calculator-cta">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">Free Tool</div>
          <h2 className="section-title">Not Sure How Many Mailboxes You Need?</h2>
          <p>
            Use our free Mailboxes Calculator to instantly calculate the exact number of email senders
            and domains required for your cold email campaign.
          </p>
        </div>

        <div className="feature-category active">
          <div className="feature-grid">
            {features.map((feature, index) => (
              <div className="feature-card reveal-element" key={index}>
                <div className="feature-icon">
                  <i className={feature.icon}></i>
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: 'var(--space-3xl)' }}>
          <Link
            to="/mailboxes-calculator"
            onClick={handleCalculatorClick}
            className="btn btn-primary btn-large"
          >
            Calculate My Campaign Needs
            <i className="fas fa-arrow-right"></i>
          </Link>
          <p style={{
            marginTop: 'var(--space-md)',
            color: 'var(--gray-400)',
            fontSize: '0.875rem'
          }}>
            Free to use - No credit card required
          </p>
        </div>
      </div>
    </section>
  );
};

export default CalculatorCTA;
