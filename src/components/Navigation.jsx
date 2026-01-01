import { useState, useEffect } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink, useLocation } from 'react-router-dom';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (!isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = '';
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="nav-container">
          <RouterLink to="/" className="nav-brand">
            <img
              src="/img/sendemall-logo-new.svg"
              alt="SendEmAll - Cold Email Deliverability Platform Logo"
              className="nav-logo"
            />
          </RouterLink>

          <ul className={`nav-menu ${isMobileMenuOpen ? 'active' : ''}`}>
            {isHomePage ? (
              <>
                <li>
                  <ScrollLink
                    to="features"
                    smooth={true}
                    duration={1000}
                    offset={-80}
                    onClick={closeMobileMenu}
                  >
                    Features
                  </ScrollLink>
                </li>
                <li>
                  <ScrollLink
                    to="how-it-works"
                    smooth={true}
                    duration={1000}
                    offset={-80}
                    onClick={closeMobileMenu}
                  >
                    How It Works
                  </ScrollLink>
                </li>
                <li>
                  <ScrollLink
                    to="pricing"
                    smooth={true}
                    duration={1000}
                    offset={-80}
                    onClick={closeMobileMenu}
                  >
                    Pricing
                  </ScrollLink>
                </li>
                <li>
                  <ScrollLink
                    to="testimonials"
                    smooth={true}
                    duration={1000}
                    offset={-80}
                    onClick={closeMobileMenu}
                  >
                    Success Stories
                  </ScrollLink>
                </li>
                <li>
                  <a href="/mailboxes-calculator" target="_blank" rel="noopener noreferrer" onClick={closeMobileMenu}>
                    Mailboxes Calculator
                  </a>
                </li>
              </>
            ) : (
              <>
                <li>
                  <RouterLink to="/" onClick={closeMobileMenu}>
                    Home
                  </RouterLink>
                </li>
                <li>
                  <a href="/mailboxes-calculator" target="_blank" rel="noopener noreferrer" onClick={closeMobileMenu}>
                    Mailboxes Calculator
                  </a>
                </li>
              </>
            )}
          </ul>

          <div className={`nav-buttons ${isMobileMenuOpen ? 'active' : ''}`}>
            <a
              href="https://app.sendemall.com/login"
              className="btn btn-secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Login
            </a>
            <a
              href="https://app.sendemall.com/register"
              className="btn btn-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Get Started
            </a>
          </div>

          <button
            className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileMenuOpen}
            onClick={toggleMobileMenu}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
