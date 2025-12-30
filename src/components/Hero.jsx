import { trackButtonClick } from '../hooks/useGoogleAnalytics';

const Hero = () => {
  const openDeliverabilityTest = () => {
    trackButtonClick('Free Deliverability Test', 'Hero CTA');
    window.open('https://app.sendemall.com/email-deliverability-test', '_blank');
  };

  return (
    <section className="hero">
      <div className="container">
        <div className="hero-grid">
          <div className="hero-content">
            <blockquote className="hero-blockquote">
              "The Cold Email Platform That Closes Deals, Not Just Sends Emails."
            </blockquote>

            <h1>Stop guessing. Start inboxing. Just Send`EmAll.</h1>

            <p className="hero-description">
              SendEmAll ensures your sales emails reach decision-makers, not spam folders. Test delivery, warm
              domains, and scale outreach that actually generates revenue.
            </p>

            <div className="hero-buttons">
              <a
                href="https://app.sendemall.com/register"
                className="btn btn-primary btn-large"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Sign up for a free SendEmAll account"
                onClick={() => trackButtonClick('Sign Up Free', 'Hero CTA')}
              >
                Sign Up Free
                <i className="fas fa-arrow-right" aria-hidden="true"></i>
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://cal.com/sendemall/outbound-deliverability-strategy-call"
                className="btn btn-secondary btn-large"
                aria-label="Book a call with SendEmAll"
                onClick={() => trackButtonClick('Book a Call', 'Hero CTA')}
              >
                <i className="fas fa-phone" aria-hidden="true"></i>
                Book a Call
              </a>
            </div>

            <p
              style={{
                textAlign: 'left',
                marginTop: '0.5rem',
                marginLeft: '1rem',
                fontSize: '0.75rem',
                color: 'var(--gray-400)',
              }}
            >
              By signing up, you agree to our{' '}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://sendemall.com/privacy-policy.html"
                style={{ color: 'var(--primary-turquoise)', textDecoration: 'underline' }}
              >
                Privacy Policy
              </a>
            </p>
          </div>

          <div className="hero-image">
            <div className="hero-lead-magnet">
              <div className="lead-magnet-icon">
                <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                  <circle cx="30" cy="30" r="30" fill="url(#gradient)" />
                  <path d="M20 25h20v15H20z" fill="white" opacity="0.9" />
                  <path d="M22 27h16v2H22zM22 31h12v2H22zM22 35h8v2H22z" fill="currentColor" opacity="0.7" />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{ stopColor: '#D2B3F3' }} />
                      <stop offset="100%" style={{ stopColor: '#94E9E6' }} />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <h2>Free InboxNinja Test — See Where Your Emails Really Land.</h2>
              <p>
                Upload your sender + copy → run 2 free tests → get a live report (Inbox / Promotions / Spam)
                in your inbox.
              </p>
              <div className="lead-magnet-form">
                <button
                  className="btn btn-primary"
                  onClick={openDeliverabilityTest}
                  aria-label="Start free email deliverability test"
                >
                  Try Free Test →
                </button>
              </div>
              <div className="lead-magnet-subtext">No credit card. 2 free tests on us.</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
