import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import Footer from '../components/Footer';

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEO
        title="Privacy Policy - SendEmAll"
        description="SendEmAll Privacy Policy - Learn how we collect, use, and protect your personal information."
        canonicalUrl="https://sendemall.com/privacy-policy"
      />

      {/* Navigation */}
      <nav className="navbar scrolled">
        <div className="container">
          <div className="nav-container">
            <Link to="/" className="nav-brand">
              <img src="/img/sendemall-logo-new.svg" alt="SendEmAll" className="nav-logo" />
            </Link>

            <ul className="nav-menu">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <a href="/#features">Features</a>
              </li>
              <li>
                <a href="/#pricing">Pricing</a>
              </li>
              <li>
                <a href="/#contact">Contact</a>
              </li>
            </ul>

            <div className="nav-buttons">
              <a href="https://app.sendemall.com/login" className="btn btn-secondary" target="_blank" rel="noopener noreferrer">
                Login
              </a>
              <a href="https://app.sendemall.com/register" className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                Get Started
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Privacy Policy Content */}
      <section className="legal-content">
        <div className="container">
          <div className="legal-header">
            <h1>Privacy Policy</h1>
            <p className="last-updated">Last updated: November 21, 2025</p>
          </div>

          <div className="legal-body">
            <div className="legal-section">
              <h2>1. Introduction</h2>
              <p>
                SendEmAll ("we", "us", or "our") provides email outreach and marketing automation services. We respect
                your privacy and are committed to protecting your personal information.
              </p>
            </div>

            <div className="legal-section">
              <h2>2. Information We Collect</h2>
              <p>We collect:</p>
              <ul>
                <li>Account information such as name, email, and company details</li>
                <li>Billing and payment information when you subscribe</li>
                <li>Email service connection details when you connect Google, Microsoft, or SMTP accounts</li>
                <li>Usage data and analytics to improve performance and deliverability</li>
              </ul>
              <p>
                <strong>
                  We do not access your email content unless you explicitly authorize it for sending or reply handling
                  within the platform.
                </strong>
              </p>
            </div>

            <div className="legal-section">
              <h2>3. How We Use Information</h2>
              <p>We use the information we collect to:</p>
              <ul>
                <li>Provide the SendEmAll platform and its features</li>
                <li>Send and manage email campaigns</li>
                <li>Improve deliverability and performance</li>
                <li>Offer customer support</li>
                <li>Process payments and manage subscriptions</li>
                <li>Comply with legal and security requirements</li>
              </ul>
            </div>

            <div className="legal-section">
              <h2>4. Sharing of Information</h2>
              <p>
                <strong>We do not sell or rent your data.</strong>
              </p>
              <p>We may share data only with:</p>
              <ul>
                <li>
                  Trusted third-party service providers needed to run the platform (hosting, payment processors, support
                  tools)
                </li>
                <li>Legal authorities if required by law</li>
              </ul>
            </div>

            <div className="legal-section">
              <h2>5. Data Security</h2>
              <p>
                We follow industry-standard security controls, including access restrictions, encryption in transit and
                at rest, and regular monitoring.
              </p>
            </div>

            <div className="legal-section">
              <h2>6. Data Retention</h2>
              <p>
                We retain information for as long as your account is active or required for service delivery. You may
                request deletion at any time by contacting us.
              </p>
            </div>

            <div className="legal-section">
              <h2>7. Your Rights</h2>
              <p>You may:</p>
              <ul>
                <li>Request access, update, or deletion of your data</li>
                <li>Withdraw consent for connected accounts</li>
                <li>Disable or remove connected integrations anytime</li>
              </ul>
            </div>

            <div className="legal-section">
              <h2>8. Contact</h2>
              <p>For privacy questions or requests, contact us at:</p>
              <div className="contact-info">
                <p>
                  <strong>Email:</strong> junaid@sendemall.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default PrivacyPolicy;
