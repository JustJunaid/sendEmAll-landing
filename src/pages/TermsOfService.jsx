import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import Footer from '../components/Footer';

const TermsOfService = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEO
        title="Terms of Service - SendEmAll"
        description="SendEmAll Terms of Service - Read our terms and conditions for using our email marketing platform."
        canonicalUrl="https://sendemall.com/terms-of-service"
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

      {/* Terms of Service Content */}
      <section className="legal-content">
        <div className="container">
          <div className="legal-header">
            <h1>Terms of Service</h1>
            <p className="last-updated">Last updated: November 21, 2025</p>
          </div>

          <div className="legal-body">
            <div className="legal-section">
              <h2>1. Acceptance of Terms</h2>
              <p>By using SendEmAll, you agree to the following terms.</p>
            </div>

            <div className="legal-section">
              <h2>2. Use of the Service</h2>
              <p>You must:</p>
              <ul>
                <li>Be at least 18 years old</li>
                <li>Use the service in compliance with all applicable laws, including email regulations (CAN-SPAM, GDPR, etc.)</li>
                <li>Only upload lead lists you legally own the right to use</li>
              </ul>
              <p>You are responsible for your content, campaigns, and messages.</p>
            </div>

            <div className="legal-section">
              <h2>3. Acceptable Use</h2>
              <p>You agree not to:</p>
              <ul>
                <li>Send illegal, abusive, or fraudulent messages</li>
                <li>Use SendEmAll for phishing, harassment, or spam</li>
                <li>Attempt to reverse engineer or attack the platform</li>
              </ul>
              <p>We reserve the right to suspend accounts violating these terms.</p>
            </div>

            <div className="legal-section">
              <h2>4. Account Access & Integrations</h2>
              <p>When connecting Google, Microsoft, SMTP, or other accounts, you grant SendEmAll permission solely for:</p>
              <ul>
                <li>Sending email campaigns</li>
                <li>Managing replies if enabled</li>
                <li>Tracking deliverability</li>
              </ul>
              <p>We do not access or store unrelated emails or files.</p>
            </div>

            <div className="legal-section">
              <h2>5. Payment & Billing</h2>
              <p>Subscription plans are billed monthly or annually. Cancellations stop future charges but do not refund current billing periods unless required by law.</p>
            </div>

            <div className="legal-section">
              <h2>6. Service Availability</h2>
              <p>We aim for 99.9% uptime but cannot guarantee uninterrupted service. We are not liable for outages caused by third-party providers.</p>
            </div>

            <div className="legal-section">
              <h2>7. Limitation of Liability</h2>
              <p>SendEmAll is not liable for any indirect, incidental, or consequential damages from using the service.</p>
            </div>

            <div className="legal-section">
              <h2>8. Termination</h2>
              <p>We may suspend or terminate accounts for violations, fraud, or non-payment. You may cancel anytime from your account settings.</p>
            </div>

            <div className="legal-section">
              <h2>9. Changes to Terms</h2>
              <p>We may update these terms. Continued use after changes constitutes acceptance.</p>
            </div>

            <div className="legal-section">
              <h2>10. Contact</h2>
              <p>For questions about these terms, contact us at:</p>
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

export default TermsOfService;
