import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-column">
            <Link to="/" className="footer-brand">
              <img src="/img/sendemall-logo-new.svg" alt="SendEmAll - Cold Email Deliverability Platform" height="48" />
            </Link>
            <p className="footer-description">
              Sales email infrastructure that helps businesses close more deals. Test delivery, warm domains,
              and scale outreach campaigns that turn prospects into customers.
            </p>
          </div>

          <div className="footer-column">
            <h4>Product</h4>
            <ul className="footer-links">
              <li>
                <a href="/#features">Features</a>
              </li>
              <li>
                <a href="/#pricing">Pricing</a>
              </li>
              <li>
                <a href="/#integrations">Integrations</a>
              </li>
              <li>
                <a href="/#api">API</a>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Company</h4>
            <ul className="footer-links">
              <li>
                <a href="/#about">About</a>
              </li>
              <li>
                <a href="/#blog">Blog</a>
              </li>
              <li>
                <a href="/#careers">Careers</a>
              </li>
              <li>
                <a href="/#contact">Contact</a>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Legal</h4>
            <ul className="footer-links">
              <li>
                <Link to="/privacy-policy">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms-of-service">Terms of Service</Link>
              </li>
              <li>
                <Link to="/cookie-policy">Cookie Policy</Link>
              </li>
              <li>
                <Link to="/privacy-policy#gdpr">GDPR</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-copyright">
            <p>&copy; 2025 SendEmAll. All rights reserved.</p>
          </div>
          <div className="footer-socials">
            <a href="https://x.com/send_em_all" className="social-link" target="_blank" rel="noopener noreferrer">
              <span style={{ fontWeight: 600, fontSize: '14px' }}>𝕏</span>
            </a>
            <a
              href="https://www.linkedin.com/company/sendemall"
              className="social-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
