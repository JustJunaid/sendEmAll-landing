// Premium SendEmAll - Optimized Performance & Animations
// No gimmicky particles - just pure sophistication

// Performance-optimized scroll handler with RAF
class PremiumScroll {
    constructor() {
        this.ticking = false;
        this.scrollY = 0;
        this.init();
    }

    init() {
        // Throttled scroll with RAF for 60fps
        window.addEventListener('scroll', () => this.requestTick(), { passive: true });
    }

    requestTick() {
        if (!this.ticking) {
            requestAnimationFrame(() => this.updateElements());
            this.ticking = true;
        }
    }

    updateElements() {
        this.scrollY = window.scrollY;
        
        // Premium navbar effect
        this.updateNavbar();
        
        // Subtle parallax for hero only
        this.updateHeroParallax();
        
        // Reset ticking
        this.ticking = false;
    }

    updateNavbar() {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;
        
        if (this.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    updateHeroParallax() {
        // Only on desktop for performance
        if (window.innerWidth <= 1024) return;
        
        const hero = document.querySelector('.hero-content');
        if (!hero) return;
        
        const speed = 0.5;
        const yPos = -(this.scrollY * speed);
        hero.style.transform = `translate3d(0, ${yPos}px, 0)`;
    }
}

// Premium Intersection Observer for reveal animations
class PremiumReveals {
    constructor() {
        this.observer = null;
        this.init();
    }

    init() {
        // Single observer for all animations
        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Stagger animation for child elements
                    this.animateElement(entry.target);
                    this.observer.unobserve(entry.target);
                }
            });
        }, options);

        this.observeElements();
    }

    observeElements() {
        // Select all elements that should animate
        const elements = document.querySelectorAll(
            '.feature-card, .pricing-card, .testimonial-card, .step, section h2, section p'
        );

        elements.forEach(el => {
            el.classList.add('reveal-element');
            this.observer.observe(el);
        });
    }

    animateElement(element) {
        element.classList.add('revealed');
        
        // Animate children with stagger
        const children = element.querySelectorAll('.reveal-child');
        children.forEach((child, index) => {
            setTimeout(() => {
                child.classList.add('revealed');
            }, index * 50);
        });
    }
}

// Premium smooth scroll with easing
class SmoothScroll {
    constructor() {
        this.isScrolling = false;
        this.init();
    }

    init() {
        // Disable default browser smooth scrolling
        document.documentElement.style.scrollBehavior = 'auto';
        
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => this.handleClick(e));
        });
    }

    handleClick(e) {
        e.preventDefault();
        e.stopPropagation();
        
        if (this.isScrolling) return;
        
        const targetId = e.currentTarget.getAttribute('href');
        if (!targetId || targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (!targetElement) return;
        
        this.isScrolling = true;
        const targetPosition = targetElement.offsetTop - 80;
        this.scrollTo(targetPosition, 1000);
    }

    scrollTo(target, duration) {
        const start = window.pageYOffset;
        const distance = target - start;
        let startTime = null;

        const animation = (currentTime) => {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            
            // Enhanced easing function for ultra smooth animation
            const easeInOutCubic = progress < 0.5 
                ? 4 * progress * progress * progress 
                : 1 - Math.pow(-2 * progress + 2, 3) / 2;
            
            const currentPosition = start + (distance * easeInOutCubic);
            window.scrollTo(0, currentPosition);
            
            if (progress < 1) {
                requestAnimationFrame(animation);
            } else {
                this.isScrolling = false;
            }
        };

        requestAnimationFrame(animation);
    }
}

// Premium Mobile Navigation
class MobileNav {
    constructor() {
        this.hamburger = document.querySelector('.hamburger');
        this.navMenu = document.querySelector('.nav-menu');
        this.navButtons = document.querySelector('.nav-buttons');
        this.isOpen = false;
        
        if (this.hamburger && this.navMenu) {
            this.init();
        }
    }

    init() {
        this.hamburger.addEventListener('click', (e) => this.toggle(e));
        
        // Close on link click
        document.querySelectorAll('.nav-menu a, .nav-buttons a').forEach(link => {
            link.addEventListener('click', () => this.close());
        });
        
        // Close on outside click
        document.addEventListener('click', (e) => {
            if (!this.hamburger.contains(e.target) && 
                !this.navMenu.contains(e.target) && 
                this.isOpen) {
                this.close();
            }
        });
    }

    toggle(e) {
        e.preventDefault();
        e.stopPropagation();
        
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }

    open() {
        this.isOpen = true;
        this.hamburger.classList.add('active');
        this.hamburger.setAttribute('aria-expanded', 'true');
        this.navMenu.classList.add('active');
        if (this.navButtons) {
            this.navButtons.classList.add('active');
        }
        document.body.style.overflow = 'hidden';
    }

    close() {
        this.isOpen = false;
        this.hamburger.classList.remove('active');
        this.hamburger.setAttribute('aria-expanded', 'false');
        this.navMenu.classList.remove('active');
        if (this.navButtons) {
            this.navButtons.classList.remove('active');
        }
        document.body.style.overflow = '';
    }
}


// Premium Tab System
class TabSystem {
    constructor() {
        this.tabs = document.querySelectorAll('.category-tab');
        this.panels = document.querySelectorAll('.feature-category');
        
        if (this.tabs.length > 0) {
            this.init();
        }
    }

    init() {
        this.tabs.forEach(tab => {
            tab.addEventListener('click', () => this.switchTab(tab));
        });
    }

    switchTab(activeTab) {
        const targetPanel = activeTab.getAttribute('data-category');
        
        // Update tabs
        this.tabs.forEach(tab => {
            tab.classList.remove('active');
        });
        activeTab.classList.add('active');
        
        // Update panels with fade effect
        this.panels.forEach(panel => {
            if (panel.id === targetPanel) {
                panel.classList.add('active');
                panel.style.opacity = '0';
                setTimeout(() => {
                    panel.style.opacity = '1';
                }, 10);
            } else {
                panel.classList.remove('active');
            }
        });
    }
}


// Premium FAQ Accordion
class FAQAccordion {
    constructor() {
        this.items = document.querySelectorAll('.faq-item');
        
        if (this.items.length > 0) {
            this.init();
        }
    }

    init() {
        this.items.forEach(item => {
            const question = item.querySelector('.faq-question');
            question.setAttribute('tabindex', '0');
            question.setAttribute('role', 'button');
            question.setAttribute('aria-expanded', 'false');
            
            question.addEventListener('click', () => this.toggleItem(item));
            question.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.toggleItem(item);
                }
            });
        });
    }

    toggleItem(item) {
        const isActive = item.classList.contains('active');
        const question = item.querySelector('.faq-question');
        
        // Close all items
        this.items.forEach(i => {
            i.classList.remove('active');
            i.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        });
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            item.classList.add('active');
            question.setAttribute('aria-expanded', 'true');
        }
    }
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all premium features
    new PremiumScroll();
    new PremiumReveals();
    new SmoothScroll();
    new MobileNav();
    new TabSystem();
    new FAQAccordion();
    
    // Add premium loading class after everything is initialized
    document.body.classList.add('premium-loaded');
});

// Optimize animations on resize
let resizeTimer;
window.addEventListener('resize', () => {
    document.body.classList.add('resizing');
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        document.body.classList.remove('resizing');
    }, 300);
});

// Deliverability test function
function openDeliverabilityTest(inputId) {
    let url = 'https://app.sendemall.com/email-deliverability-test';
    
    // Only try to get email if inputId is provided
    if (inputId) {
        const emailInput = document.getElementById(inputId);
        if (emailInput) {
            const email = emailInput.value.trim();
            if (email && email.includes('@')) {
                url += `?email=${encodeURIComponent(email)}`;
            }
        }
    }
    
    window.open(url, '_blank');
}

// Pricing toggle functionality
class PricingToggle {
    constructor() {
        this.toggleButtons = document.querySelectorAll('.pricing-toggle-btn');
        this.amounts = document.querySelectorAll('.amount-new');
        this.currentPeriod = 'annual';
        
        this.toggleButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const period = e.currentTarget.dataset.period;
                this.switchPeriod(period);
            });
        });
    }
    
    switchPeriod(period) {
        if (this.currentPeriod === period) return;
        
        this.currentPeriod = period;
        
        // Update button states
        this.toggleButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.period === period) {
                btn.classList.add('active');
            }
        });
        
        // Update pricing
        this.updatePricing();
    }
    
    updatePricing() {
        const isAnnual = this.currentPeriod === 'annual';
        
        this.amounts.forEach(amount => {
            const monthly = amount.getAttribute('data-monthly');
            const annual = amount.getAttribute('data-annual');
            
            if (monthly && annual) {
                amount.textContent = isAnnual ? annual : monthly;
            }
        });
    }
}

// Initialize pricing toggle
new PricingToggle();

// Remove Tawk.to branding
function removeTawkBranding() {
    let attempts = 0;
    const maxAttempts = 20; // Stop after 6 seconds (20 * 300ms)
    
    const intervalId = setInterval(() => {
        const found = hideTawkBranding();
        attempts++;
        
        // Stop checking if we found and hid the branding, or after max attempts
        if (found || attempts >= maxAttempts) {
            clearInterval(intervalId);
            
            // Set up a MutationObserver for any future changes
            if (found) {
                setupTawkObserver();
            }
        }
    }, 300);
}

function hideTawkBranding() {
    // Target the branding iframe specifically
    const brandingSelectors = [
        'iframe[title="chat widget"][height="45px"]',
        'iframe[title="chat widget"][height="30px"]', 
        'iframe[id*="cnpm"]',
        'iframe[style*="height:45px"]',
        'iframe[style*="height: 45px"]',
        'iframe[style*="bottom:30px"]',
        'iframe[style*="bottom: 30px"]',
        'iframe[style*="min-width: 350px"][style*="height: 45px"]',
        'iframe[style*="width: 350px"][style*="height: 45px"]'
    ];
    
    let found = false;
    brandingSelectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            el.style.setProperty('display', 'none', 'important');
            el.style.setProperty('visibility', 'hidden', 'important');
            el.style.setProperty('height', '0', 'important');
            el.style.setProperty('min-height', '0', 'important');
            found = true;
        });
    });
    
    // Also target by DOM content - look for "Powered by tawk.to" text
    try {
        const allIframes = document.querySelectorAll('iframe[title="chat widget"]');
        allIframes.forEach(iframe => {
            // Check if this iframe contains branding based on its positioning
            const style = iframe.getAttribute('style') || '';
            const isLikelyBranding = (
                style.includes('height: 45px') || 
                style.includes('height:45px') ||
                style.includes('bottom: 30px') ||
                style.includes('bottom:30px') ||
                (style.includes('width: 350px') && style.includes('height: 45px'))
            );
            
            if (isLikelyBranding) {
                iframe.style.setProperty('display', 'none', 'important');
                iframe.style.setProperty('visibility', 'hidden', 'important');
                iframe.style.setProperty('height', '0', 'important');
                iframe.style.setProperty('min-height', '0', 'important');
                found = true;
            }
        });
    } catch (e) {
        // Fail silently if iframe access is restricted
    }
    
    return found;
}

// Use MutationObserver for better performance
function setupTawkObserver() {
    const observer = new MutationObserver((mutations) => {
        let shouldCheck = false;
        
        mutations.forEach((mutation) => {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === 1 && (node.tagName === 'IFRAME' || node.querySelector('iframe'))) {
                        shouldCheck = true;
                    }
                });
            }
            // Also check for attribute changes on iframes (style changes)
            if (mutation.type === 'attributes' && mutation.target.tagName === 'IFRAME') {
                shouldCheck = true;
            }
        });
        
        if (shouldCheck) {
            // Small delay to ensure DOM is updated
            setTimeout(hideTawkBranding, 100);
        }
    });
    
    // Observe the body for new iframes and attribute changes
    observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['style', 'class']
    });
}

// Start removing branding when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', removeTawkBranding);
} else {
    removeTawkBranding();
}