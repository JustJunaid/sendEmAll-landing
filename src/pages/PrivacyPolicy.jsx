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
              <p>
                <strong>When you connect a Google account</strong>, SendEmAll requests the following permissions:
              </p>
              <ul>
                <li>
                  <strong>Send email on your behalf</strong> (<code>gmail.send</code>) — used solely to deliver your
                  outreach campaigns through your Gmail or Google Workspace account.
                </li>
                <li>
                  <strong>Read email metadata</strong> (<code>gmail.metadata</code>) — used to retrieve message IDs and
                  headers needed for reply tracking and email threading. We do not read email body content via this
                  scope.
                </li>
                <li>
                  <strong>Read emails</strong> (<code>gmail.readonly</code>, seed inboxes only) — used exclusively to
                  detect and sync replies to your campaigns into the unified inbox. This permission is only requested
                  when you connect a seed inbox account, not a standard sender.
                </li>
              </ul>
              <p>
                We access only the minimum data required to provide these features. We do not read, store, index, or
                share the contents of your emails for any purpose other than the features you explicitly enable.
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
              <p>
                <strong>Google OAuth tokens</strong> (access tokens and refresh tokens) are deleted immediately and
                permanently when you disconnect a Google account from SendEmAll, or when your SendEmAll account is
                deleted. You can also revoke SendEmAll's access at any time directly from your Google Account at{' '}
                <a href="https://myaccount.google.com/permissions" target="_blank" rel="noopener noreferrer">
                  myaccount.google.com/permissions
                </a>.
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
              <h2>8. Google API Services</h2>
              <p>
                SendEmAll's use and transfer to any other app of information received from Google APIs will adhere to
                the{' '}
                <a
                  href="https://developers.google.com/terms/api-services-user-data-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Google API Services User Data Policy
                </a>
                , including the Limited Use requirements.
              </p>
              <p>
                Specifically, data obtained through Google APIs is used only to provide and improve the features you
                explicitly enable within SendEmAll. We do not use Google user data for serving advertisements, and we
                do not allow humans to read your Google data except with your explicit permission or as required for
                security, legal compliance, or when you request support.
              </p>
            </div>

            <div className="legal-section">
              <h2>9. Contact</h2>
              <p>For privacy questions, data requests, or to exercise your rights under applicable law, contact us at:</p>
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
