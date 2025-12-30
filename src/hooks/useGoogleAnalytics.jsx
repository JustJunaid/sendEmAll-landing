import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Initialize Google Analytics script (call this outside Router)
export const initializeGA = (trackingId = 'G-4WT843MDLE') => {
  // Check if script already exists
  const existingScript = document.querySelector(`script[src*="googletagmanager.com/gtag/js"]`);

  if (!existingScript) {
    // Load Google Analytics script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`;
    document.head.appendChild(script);

    // Initialize dataLayer and gtag function
    window.dataLayer = window.dataLayer || [];
    window.gtag = function() {
      window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', trackingId, {
      send_page_view: false, // We'll manually track page views
    });
  }
};

// Hook for tracking page views (use inside Router)
const useGoogleAnalytics = () => {
  const location = useLocation();

  // Track page views on route change
  useEffect(() => {
    if (window.gtag) {
      // Track page view
      window.gtag('event', 'page_view', {
        page_path: location.pathname + location.search,
        page_location: window.location.href,
        page_title: document.title,
      });

      // Optional: Log for debugging (remove in production)
      console.log('GA Page View:', location.pathname);
    }
  }, [location]);
};

// Utility function to track custom events
export const trackEvent = (eventName, eventParams = {}) => {
  if (window.gtag) {
    window.gtag('event', eventName, eventParams);
    console.log('GA Event:', eventName, eventParams);
  }
};

// Utility function to track button clicks
export const trackButtonClick = (buttonName, category = 'Button') => {
  trackEvent('click', {
    event_category: category,
    event_label: buttonName,
  });
};

// Utility function to track form submissions
export const trackFormSubmission = (formName, formData = {}) => {
  trackEvent('form_submission', {
    event_category: 'Form',
    event_label: formName,
    ...formData,
  });
};

// Utility function to track calculator usage
export const trackCalculatorEvent = (action, params = {}) => {
  trackEvent('calculator_interaction', {
    event_category: 'Calculator',
    event_label: action,
    ...params,
  });
};

export default useGoogleAnalytics;
