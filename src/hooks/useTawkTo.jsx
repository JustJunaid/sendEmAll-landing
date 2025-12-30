import { useEffect } from 'react';

const useTawkTo = () => {
  useEffect(() => {
    // Load Tawk.to script
    var Tawk_API = Tawk_API || {};
    var Tawk_LoadStart = new Date();
    (function () {
      var s1 = document.createElement('script');
      var s0 = document.getElementsByTagName('script')[0];
      s1.async = true;
      s1.src = 'https://embed.tawk.to/6926e6b17a43e3195d75e7ac/1javvaa80';
      s1.charset = 'UTF-8';
      s1.setAttribute('crossorigin', '*');
      s0.parentNode.insertBefore(s1, s0);
    })();

    // Remove Tawk.to branding
    const removeTawkBranding = () => {
      const brandingSelectors = [
        'iframe[title="chat widget"][height="45px"]',
        'iframe[title="chat widget"][height="30px"]',
        'iframe[id*="cnpm"]',
        'iframe[style*="height:45px"]',
        'iframe[style*="height: 45px"]',
        'iframe[style*="bottom:30px"]',
        'iframe[style*="bottom: 30px"]',
        'iframe[style*="min-width: 350px"][style*="height: 45px"]',
        'iframe[style*="width: 350px"][style*="height: 45px"]',
      ];

      brandingSelectors.forEach((selector) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((el) => {
          el.style.setProperty('display', 'none', 'important');
          el.style.setProperty('visibility', 'hidden', 'important');
          el.style.setProperty('height', '0', 'important');
          el.style.setProperty('min-height', '0', 'important');
        });
      });
    };

    // Set up interval to remove branding
    let attempts = 0;
    const maxAttempts = 20;
    const intervalId = setInterval(() => {
      removeTawkBranding();
      attempts++;
      if (attempts >= maxAttempts) {
        clearInterval(intervalId);
      }
    }, 300);

    // Set up MutationObserver for future changes
    const observer = new MutationObserver(() => {
      setTimeout(removeTawkBranding, 100);
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['style', 'class'],
    });

    return () => {
      clearInterval(intervalId);
      observer.disconnect();
    };
  }, []);
};

export default useTawkTo;
