# SendEmAll - React Landing Page

A modern, fully responsive React-based landing page for SendEmAll, built with Vite and preserving all original design, color schemes, and SEO optimizations.

## 🚀 Features

- ✅ Full React conversion with modern hooks and components
- ✅ Vite for lightning-fast development and optimized builds
- ✅ Complete SEO implementation with React Helmet
- ✅ Google Analytics integration
- ✅ Tawk.to live chat integration
- ✅ Smooth scroll animations and reveal effects
- ✅ Fully responsive design (mobile, tablet, desktop)
- ✅ All original color schemes preserved:
  - Primary Turquoise: `#d2b3f3`
  - Secondary Lavender: `#94e9e6`
  - Dark: `#131218`
- ✅ Structured data (JSON-LD) for better SEO
- ✅ Accessibility features (ARIA labels, keyboard navigation)

## 📁 Project Structure

```
sendEmAll-react/
├── public/
│   ├── favicon/           # All favicon files
│   └── img/              # Images and assets
├── src/
│   ├── components/       # React components
│   │   ├── SEO.jsx      # SEO component with Helmet
│   │   ├── Navigation.jsx
│   │   ├── Hero.jsx
│   │   ├── Features.jsx
│   │   ├── HowItWorks.jsx
│   │   ├── Pricing.jsx
│   │   ├── Testimonials.jsx
│   │   ├── FAQ.jsx
│   │   └── Footer.jsx
│   ├── hooks/           # Custom React hooks
│   │   ├── useScrollReveal.jsx
│   │   ├── useGoogleAnalytics.jsx
│   │   └── useTawkTo.jsx
│   ├── assets/          # CSS and static files
│   ├── App.jsx          # Main App component
│   ├── main.jsx         # Entry point
│   └── index.css        # All styles
└── index.html           # HTML template
```

## 🛠️ Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173/`

3. **Build for production:**
   ```bash
   npm run build
   ```
   This creates an optimized build in the `dist/` folder

4. **Preview production build:**
   ```bash
   npm run preview
   ```

## 📦 Dependencies

- **React 19.2** - UI library
- **Vite 7.3** - Build tool and dev server
- **react-router-dom** - For future routing needs
- **react-helmet** - SEO and meta tags management
- **react-scroll** - Smooth scrolling between sections

## 🎨 Color Scheme

The project maintains the exact color palette from the original design:

```css
--primary-turquoise: #d2b3f3
--secondary-lavender: #94e9e6
--dark: #131218
```

## 🔧 Components Overview

### SEO Component
- Manages all meta tags, Open Graph, Twitter Cards
- Structured data (JSON-LD) for Software Application and FAQ
- Canonical URLs and social sharing optimization

### Navigation
- Sticky navigation with scroll detection
- Mobile-responsive hamburger menu
- Smooth scroll to sections

### Hero
- Eye-catching hero section with CTA buttons
- Lead magnet form for free deliverability test
- Responsive grid layout

### Features
- Tab-based feature showcase
- 4 categories: Inbox Placement, Smart Warmup, AI Campaigns, Master Inbox
- Animated cards with hover effects

### Pricing
- Toggle between monthly/annual billing
- 3 pricing tiers with feature comparisons
- Highlighted "Most Popular" plan

### Testimonials
- Customer success stories
- Profile images and roles
- Responsive grid layout

### FAQ
- Accordion-style FAQ section
- Keyboard accessible
- Smooth expand/collapse animations

### Footer
- Multi-column footer with links
- Social media icons
- Company information

## 🎯 SEO Features

- Complete meta tags (title, description, keywords)
- Open Graph tags for Facebook
- Twitter Card tags
- Structured data (JSON-LD) for:
  - Software Application schema
  - FAQ Page schema
- Canonical URLs
- Proper heading hierarchy
- Alt text for all images
- Semantic HTML5

## 🔗 Third-Party Integrations

### Google Analytics
- Tracking ID: `G-4WT843MDLE`
- Automatic page view tracking
- Custom hook: `useGoogleAnalytics()`

### Tawk.to Live Chat
- Embedded live chat widget
- Auto-removed branding for clean UI
- Custom hook: `useTawkTo()`

## 📱 Responsive Design

The landing page is fully responsive with breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
1. Build the project: `npm run build`
2. Drag and drop the `dist/` folder to Netlify

### Deploy to GitHub Pages
```bash
npm run build
# Then deploy the dist/ folder
```

## 🔄 Migration Notes

This React version maintains 100% feature parity with the original HTML version:

✅ All sections converted to React components
✅ CSS preserved exactly as-is
✅ All animations and transitions working
✅ SEO tags and structured data intact
✅ Google Analytics tracking functional
✅ Tawk.to chat integration working
✅ All external links preserved
✅ Responsive design maintained

## 📝 Customization

### Update Colors
Edit the CSS variables in `src/index.css`:
```css
:root {
  --primary-turquoise: #d2b3f3;
  --secondary-lavender: #94e9e6;
  --dark: #131218;
}
```

### Update Content
Each component is self-contained. Edit the content directly in:
- `src/components/Hero.jsx` - Hero content
- `src/components/Features.jsx` - Features
- `src/components/Pricing.jsx` - Pricing plans
- etc.

### Update SEO
Modify default values in `src/components/SEO.jsx`

## 🐛 Troubleshooting

### Port already in use
```bash
# Kill the process on port 5173
lsof -ti:5173 | xargs kill -9
# Then restart
npm run dev
```

### Build errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 📄 License

© 2025 SendEmAll. All rights reserved.

## 🤝 Support

For questions or support, contact: [support@sendemall.com](mailto:support@sendemall.com)

---

**Built with ❤️ using React + Vite**
