import { useState } from 'react';

const Features = () => {
  const [activeTab, setActiveTab] = useState('ai-features');

  const features = {
    'ai-features': [
      {
        icon: 'fas fa-search',
        title: 'Inbox Placement Intelligence',
        description: 'Run real placement tests before every send and get actionable fixes.',
      },
      {
        icon: 'fas fa-chart-pie',
        title: 'Deliverability Analytics',
        description:
          'Track spam scores, authentication status, and domain reputation in real-time. Get actionable insights to improve inbox rates.',
      },
      {
        icon: 'fas fa-stop-circle',
        title: 'Auto-Stop Protection',
        description:
          'Automatically pause campaigns if bounce rates exceed 10%. Protect your domain reputation and avoid blacklists.',
      },
    ],
    deliverability: [
      {
        icon: 'fas fa-rocket',
        title: 'Smart Warm-Up Engine',
        description: 'Auto-ramps your sending volume and builds domain reputation safely.',
      },
      {
        icon: 'fas fa-cogs',
        title: 'DNS Auto-Configuration',
        description:
          'We generate SPF, DKIM, DMARC records automatically. Just add your domain and we handle the technical setup.',
      },
      {
        icon: 'fas fa-shield-check',
        title: 'Reputation Monitoring',
        description:
          'Continuous monitoring of domain health, spam scores, and blacklist status across major providers.',
      },
    ],
    analytics: [
      {
        icon: 'fas fa-chart-bar',
        title: 'Real-time Analytics',
        description:
          'Track opens, clicks, conversions, and revenue in real-time with detailed performance insights.',
      },
      {
        icon: 'fas fa-magic',
        title: 'AI Campaign Generator',
        description: '3-step sequences × 2 variants each — tone-aware, variable-injected, no placeholders.',
      },
      {
        icon: 'fas fa-check-double',
        title: 'Deliverability Guardrails',
        description: 'Built-in verification + auto-pause above 10% bounce.',
      },
    ],
    campaigns: [
      {
        icon: 'fas fa-inbox',
        title: 'Master Inbox & Agency Workspaces',
        description: 'Manage replies and teams across clients from one dashboard.',
      },
      {
        icon: 'fas fa-server',
        title: 'Multi-Infrastructure Sending',
        description:
          'Send via Gmail, Outlook, SMTPs, or our whitelabel Postal infrastructure. Scale without limits.',
      },
      {
        icon: 'fas fa-chart-line',
        title: 'Deliverability Analytics',
        description:
          'Track inbox placement, spam scores, and engagement metrics. Get actionable insights to improve performance.',
      },
    ],
  };

  const tabs = [
    { id: 'ai-features', label: 'Inbox Placement' },
    { id: 'deliverability', label: 'Smart Warmup' },
    { id: 'analytics', label: 'AI Campaigns' },
    { id: 'campaigns', label: 'Master Inbox' },
  ];

  return (
    <section className="features" id="features">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">Features</div>
          <h2 className="section-title">Built by Cold-Emailers for Cold-Emailers</h2>
          <p>Every feature is engineered for inbox success. Stop burning domains. Start landing emails.</p>
        </div>

        <div className="feature-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`category-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className={`feature-category ${activeTab ? 'active' : ''}`}>
          <div className="feature-grid">
            {features[activeTab]?.map((feature, index) => (
              <div className="feature-card reveal-element" key={index}>
                <div className="feature-icon">
                  <i className={feature.icon}></i>
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
