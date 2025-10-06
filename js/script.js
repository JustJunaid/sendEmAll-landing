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
            '.feature-card, .pricing-card, .testimonial-card, .stat-item, .step, section h2, section p'
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
        this.navMenu.classList.add('active');
        if (this.navButtons) {
            this.navButtons.classList.add('active');
        }
        document.body.style.overflow = 'hidden';
    }

    close() {
        this.isOpen = false;
        this.hamburger.classList.remove('active');
        this.navMenu.classList.remove('active');
        if (this.navButtons) {
            this.navButtons.classList.remove('active');
        }
        document.body.style.overflow = '';
    }
}

// Premium Counter Animation
class CounterAnimation {
    constructor() {
        this.counters = document.querySelectorAll('.stat-number[data-count]');
        this.animated = false;
        
        if (this.counters.length > 0) {
            this.init();
        }
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.animated) {
                    this.animateCounters();
                    this.animated = true;
                }
            });
        }, { threshold: 0.5 });

        const heroSection = document.querySelector('.hero-stats');
        if (heroSection) {
            observer.observe(heroSection);
        }
    }

    animateCounters() {
        this.counters.forEach(counter => {
            const target = parseFloat(counter.getAttribute('data-count'));
            const suffix = this.getSuffix(counter.textContent);
            const duration = 2000;
            const start = 0;
            const startTime = performance.now();

            const animate = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Easing function for smooth animation
                const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                const current = start + (target - start) * easeOutQuart;
                
                counter.textContent = this.formatNumber(current, suffix);
                
                if (progress < 1) {
                    requestAnimationFrame(animate);
                }
            };

            requestAnimationFrame(animate);
        });
    }

    getSuffix(text) {
        if (text.includes('%')) return '%';
        if (text.includes('x')) return 'x';
        if (text.includes('+')) return '+';
        return '';
    }

    formatNumber(num, suffix) {
        if (suffix === '%') return Math.round(num) + suffix;
        if (suffix === 'x') return num.toFixed(1) + suffix;
        if (suffix === '+') return Math.round(num).toLocaleString() + suffix;
        return Math.round(num).toLocaleString();
    }
}

// Premium Form Handler
class FormHandler {
    constructor() {
        this.forms = document.querySelectorAll('form');
        this.init();
    }

    init() {
        this.forms.forEach(form => {
            form.addEventListener('submit', (e) => this.handleSubmit(e));
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const button = form.querySelector('button[type="submit"]');
        
        // Premium loading state
        if (button) {
            button.classList.add('loading');
            button.disabled = true;
        }
        
        // Simulate API call
        setTimeout(() => {
            this.showNotification('Thank you! We\'ll be in touch soon.', 'success');
            form.reset();
            if (button) {
                button.classList.remove('loading');
                button.disabled = false;
            }
        }, 1500);
    }

    showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `premium-notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => notification.classList.add('show'), 100);
        
        // Remove after 5 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 5000);
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

// Premium Pricing Toggle
class PricingToggle {
    constructor() {
        this.toggle = document.getElementById('billing-toggle');
        this.prices = document.querySelectorAll('.amount[data-monthly][data-annual]');
        
        if (this.toggle) {
            this.init();
        }
    }

    init() {
        this.toggle.addEventListener('change', () => this.updatePrices());
    }

    updatePrices() {
        const isAnnual = this.toggle.checked;
        
        this.prices.forEach(price => {
            const monthly = price.getAttribute('data-monthly');
            const annual = price.getAttribute('data-annual');
            
            price.style.opacity = '0';
            setTimeout(() => {
                price.textContent = isAnnual ? annual : monthly;
                price.style.opacity = '1';
                price.classList.toggle('discounted', isAnnual);
            }, 150);
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
            question.addEventListener('click', () => this.toggleItem(item));
        });
    }

    toggleItem(item) {
        const isActive = item.classList.contains('active');
        
        // Close all items
        this.items.forEach(i => i.classList.remove('active'));
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            item.classList.add('active');
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
    new CounterAnimation();
    new FormHandler();
    new TabSystem();
    new PricingToggle();
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
    const emailInput = document.getElementById(inputId);
    const email = emailInput.value.trim();
    
    let url = 'https://app.sendemall.com/email-deliverability-test';
    
    if (email && email.includes('@')) {
        url += `?email=${encodeURIComponent(email)}`;
    }
    
    window.open(url, '_blank');
}