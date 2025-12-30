import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import Footer from '../components/Footer';

const CookiePolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEO
        title="Cookie Policy - SendEmAll"
        description="SendEmAll Cookie Policy - Learn about how we use cookies and similar technologies on our platform."
        canonicalUrl="https://sendemall.com/cookie-policy"
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

      {/* Cookie Policy Content */}
      <section className="legal-content">
        <div className="container">
          <div className="legal-header">
            <h1>Cookie Policy</h1>
            <p className="last-updated">Last updated: November 21, 2025</p>
          </div>

          <div className="legal-body">
            <div className="legal-section">
              <h2>1. Cookie Usage</h2>
              <p>SendEmAll uses cookies to:</p>
              <ul>
                <li>Operate and secure the platform</li>
                <li>Analyze performance and improve features</li>
                <li>Track anonymous usage to understand activity</li>
              </ul>
            </div>

            <div className="legal-section">
              <h2>2. Types of Cookies</h2>
              <p>We use:</p>
              <ul>
                <li>Essential cookies (required to run the service)</li>
                <li>Analytics cookies (for performance insights)</li>
              </ul>
              <p>You can disable cookies in your browser, but some features may not work correctly.</p>
            </div>

            <div className="legal-section">
              <h2>3. Contact Us</h2>
              <p>If you have any questions about our use of cookies or this Cookie Policy, please contact us:</p>
              <div className="contact-info">
                <p>
                  <strong>Email:</strong> junaid@sendemall.com
                </p>
                <p>
                  <strong>Address:</strong> SendEmAll Inc., 123 Business Street, Tech City, TC 12345
                </p>
                <p>
                  <strong>Phone:</strong> +1 (555) 123-4567
                </p>
              </div>
            </div>

            <div className="legal-section">
              <h2>4. Related Policies</h2>
              <p>This Cookie Policy should be read in conjunction with our:</p>
              <ul>
                <li>
                  <Link to="/privacy-policy">Privacy Policy</Link> - for information about how we collect and use your
                  personal data
                </li>
                <li>
                  <Link to="/terms-of-service">Terms of Service</Link> - for the terms governing your use of our
                  services
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default CookiePolicy;
