import { Helmet } from 'react-helmet';

const SEO = ({
  title = "SendEmAll - AI-Powered Cold Email Deliverability Platform | Boost Inbox Placement",
  description = "SendEmAll is the #1 cold email deliverability platform trusted by 10,000+ businesses. Maximize inbox placement, automate warmup, and scale your outreach with AI-powered email infrastructure. Get 99% deliverability guaranteed.",
  keywords = "cold email platform, email deliverability, email warmup, cold outreach, inbox placement, email automation, SMTP relay, email infrastructure, B2B email marketing, sales automation, email sender reputation, domain warmup, SendEmAll",
  author = "SendEmAll",
  ogImage = "https://sendemall.com/img/sendemall-og-image.png",
  canonicalUrl = "https://sendemall.com/",
  ogType = "website",
  twitterHandle = "@SendEmAll",
  jsonLd = null
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="bingbot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />

      {/* Theme color for mobile browsers */}
      <meta name="theme-color" content="#d2b3f3" />
      <meta name="msapplication-TileColor" content="#d2b3f3" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="SendEmAll" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonicalUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={ogImage} />
      <meta name="twitter:creator" content={twitterHandle} />
      <meta name="twitter:site" content={twitterHandle} />

      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

      {/* Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&display=swap"
        rel="stylesheet"
      />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
      />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "SendEmAll",
          "description": "Cold email deliverability platform that provides inbox placement tests, email warmup, and infrastructure to ensure your cold emails reach the inbox, not spam.",
          "url": "https://sendemall.com",
          "applicationCategory": "BusinessApplication",
          "operatingSystem": "Web",
          "offers": {
            "@type": "Offer",
            "price": "49",
            "priceCurrency": "USD",
            "priceValidUntil": "2025-12-31"
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "ratingCount": "150"
          },
          "author": {
            "@type": "Organization",
            "name": "SendEmAll",
            "url": "https://sendemall.com"
          },
          "featureList": [
            "Inbox placement testing",
            "Cold email deliverability optimization",
            "Email warmup automation",
            "Sender reputation monitoring",
            "DKIM SPF DMARC configuration",
            "Multi-infrastructure sending",
            "Real-time deliverability analytics",
            "Domain blacklist monitoring"
          ]
        })}
      </script>

      {/* FAQ Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "How do Inbox Placement Tests work?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "We send test emails from your domain to real Gmail, Outlook, and Yahoo inboxes, then report back exactly where they land (Inbox, Promotions, or Spam). You get a live screenshot and actionable fixes."
              }
            },
            {
              "@type": "Question",
              "name": "What's included in the free test?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "2 placement tests (you can test 2 different subject lines or sending setups), live inbox screenshots, spam score analysis, and a deliverability report with specific fixes."
              }
            },
            {
              "@type": "Question",
              "name": "Can I use my own domain or send via Gmail?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes! Connect your own domain for better deliverability, or send through Gmail/Google Workspace. We support SMTP, API, and direct Gmail integration."
              }
            },
            {
              "@type": "Question",
              "name": "Do credits expire?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "No. Buy credits once, use them whenever you need placement tests. Perfect for agencies managing multiple clients or businesses with seasonal campaigns."
              }
            },
            {
              "@type": "Question",
              "name": "How accurate are deliverability reports?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Our placement tests use real email accounts at major providers (not simulated), so you get actual inbox placement results. We also include spam score analysis and authentication checks."
              }
            }
          ]
        })}
      </script>

      {/* Custom JSON-LD */}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
