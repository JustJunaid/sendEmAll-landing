import { useState, useEffect } from 'react';
import SEO from '../components/SEO';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { trackCalculatorEvent } from '../hooks/useGoogleAnalytics';
import '../assets/css/styles.css';

const WEEKDAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const WEEKDAY_SHORT = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

const HealthTier = {
  EXCELLENT: 'excellent',
  FAIR: 'fair',
  CRITICAL: 'critical',
};

const EspType = {
  ALL_GOOGLE: 'all_google',
  ALL_OUTLOOK: 'all_outlook',
  ALL_CUSTOM: 'all_custom',
  MIXED: 'mixed',
};

const GoogleIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ width: '16px', height: '16px' }}>
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
);

const MicrosoftIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ width: '16px', height: '16px' }}>
    <path fill="#F25022" d="M1 1h10v10H1z"/>
    <path fill="#00A4EF" d="M1 13h10v10H1z"/>
    <path fill="#7FBA00" d="M13 1h10v10H13z"/>
    <path fill="#FFB900" d="M13 13h10v10H13z"/>
  </svg>
);

const HEALTH_TIER_CONFIG = {
  [HealthTier.EXCELLENT]: { label: 'Excellent', multiplier: 1.0 },
  [HealthTier.FAIR]: { label: 'Fair', multiplier: 0.7 },
  [HealthTier.CRITICAL]: { label: 'Critical', multiplier: 0.3 },
};

const ESP_TYPE_CONFIG = {
  [EspType.MIXED]: { label: 'Mixed', icon: <i className="fas fa-layer-group"></i> },
  [EspType.ALL_GOOGLE]: { label: 'Google/MS 365', icon: <GoogleIcon /> },
  [EspType.ALL_OUTLOOK]: { label: 'Azure', icon: <MicrosoftIcon /> },
  [EspType.ALL_CUSTOM]: { label: 'Custom SMTP', icon: <i className="fas fa-server"></i> },
};

const Calculator = () => {
  const [totalLeads, setTotalLeads] = useState(10000);
  const [campaignDurationDays, setCampaignDurationDays] = useState(30);
  const [sendDays, setSendDays] = useState(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']);
  const [warmupRatio, setWarmupRatio] = useState(0);
  const [healthTier, setHealthTier] = useState(HealthTier.EXCELLENT);
  const [espType, setEspType] = useState(EspType.MIXED);
  const [sendingHoursPerDay, setSendingHoursPerDay] = useState(8);
  const [mixedRatios, setMixedRatios] = useState({ google: 50, outlook: 25, custom: 25 });
  const [showConfig, setShowConfig] = useState(false);
  const [sendEmAllResult, setSendEmAllResult] = useState(null);
  const [genericResult, setGenericResult] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const calculateResults = async () => {
    setIsCalculating(true);
    try {
      const espTypeMap = {
        [EspType.MIXED]: 'mixed',
        [EspType.ALL_GOOGLE]: 'all_google',
        [EspType.ALL_OUTLOOK]: 'all_outlook',
        [EspType.ALL_CUSTOM]: 'all_custom',
      };
      const healthTierMap = {
        [HealthTier.EXCELLENT]: 'excellent',
        [HealthTier.FAIR]: 'fair',
        [HealthTier.CRITICAL]: 'critical',
      };

      const requestBody = {
        totalLeads,
        campaignDurationDays,
        sendDays,
        warmupRatio,
        healthTier: healthTierMap[healthTier],
        espType: espTypeMap[espType],
        sendingHoursPerDay,
        mixedRatios: espType === EspType.MIXED ? mixedRatios : undefined,
      };

      trackCalculatorEvent('calculate_started', {
        total_leads: totalLeads,
        campaign_duration: campaignDurationDays,
        health_tier: healthTierMap[healthTier],
        esp_type: espTypeMap[espType],
        warmup_ratio: warmupRatio,
      });

      const response = await fetch('https://api.sendemall.com/open/senders-calculator/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) throw new Error('Failed to calculate results');
      const data = await response.json();

      const sendEmAllData = {
        totalSendersRequired: data.totalSendersRequired,
        totalDomainsRequired: data.totalDomainsRequired,
        sendersByEsp: data.sendersByEsp,
        domainAnalysis: { domainsByEsp: data.domainAnalysis.domainsByEsp },
        summary: {
          canComplete: data.summary.canComplete,
          estimatedCompletionDays: data.summary.estimatedCompletionDays,
        },
      };

      const genericData = {
        totalSendersRequired: data.sendersNeeded?.minimum || data.totalSendersRequired,
        totalDomainsRequired: Math.ceil((data.sendersNeeded?.minimum || data.totalSendersRequired) / 4),
        sendersByEsp: {
          google: Math.ceil((data.sendersNeeded?.minimum || data.totalSendersRequired) * (mixedRatios.google / 100)),
          outlook: Math.ceil((data.sendersNeeded?.minimum || data.totalSendersRequired) * (mixedRatios.outlook / 100)),
          custom: Math.ceil((data.sendersNeeded?.minimum || data.totalSendersRequired) * (mixedRatios.custom / 100)),
        },
        domainAnalysis: {
          domainsByEsp: {
            google: Math.ceil(Math.ceil((data.sendersNeeded?.minimum || data.totalSendersRequired) * (mixedRatios.google / 100)) / 4),
            outlook: Math.ceil(Math.ceil((data.sendersNeeded?.minimum || data.totalSendersRequired) * (mixedRatios.outlook / 100)) / 100),
            custom: Math.ceil(Math.ceil((data.sendersNeeded?.minimum || data.totalSendersRequired) * (mixedRatios.custom / 100)) / 4),
          }
        },
        summary: {
          canComplete: data.summary.canComplete,
          estimatedCompletionDays: data.summary.estimatedCompletionDays,
        },
      };

      setGenericResult(genericData);
      setSendEmAllResult(sendEmAllData);

      trackCalculatorEvent('calculate_completed', {
        senders_required: data.totalSendersRequired,
        domains_required: data.totalDomainsRequired,
        can_complete: data.summary.canComplete,
        estimated_days: data.summary.estimatedCompletionDays,
      });
    } catch (error) {
      console.error('Error calculating results:', error);
      trackCalculatorEvent('calculate_error', { error_message: error.message });
    } finally {
      setIsCalculating(false);
    }
  };

  useEffect(() => {
    calculateResults();
  }, [totalLeads, campaignDurationDays, sendDays, warmupRatio, healthTier, espType, sendingHoursPerDay, mixedRatios]);

  const toggleSendDay = (day) => {
    if (sendDays.includes(day)) {
      if (sendDays.length > 1) setSendDays(sendDays.filter((d) => d !== day));
    } else {
      setSendDays([...sendDays, day]);
    }
  };

  const styles = {
    page: {
      minHeight: '100vh',
      background: 'var(--off-white)',
    },
    heroSection: {
      padding: 'var(--space-4xl) 0 var(--space-2xl)',
      background: 'linear-gradient(135deg, var(--off-white) 0%, rgba(210, 179, 243, 0.05) 50%, rgba(148, 233, 230, 0.05) 100%)',
      marginTop: '80px',
    },
    sectionHeader: {
      textAlign: 'center',
      maxWidth: '900px',
      margin: '0 auto var(--space-2xl)',
    },
    badge: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.5rem 1rem',
      background: 'var(--gradient-glass)',
      border: '1px solid var(--primary-turquoise)',
      borderRadius: '100px',
      fontSize: '0.875rem',
      fontWeight: '600',
      color: 'var(--primary-turquoise)',
      marginBottom: 'var(--space-lg)',
    },
    title: {
      fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
      fontWeight: '800',
      color: 'var(--dark)',
      lineHeight: '1.2',
      marginBottom: 'var(--space-md)',
    },
    editableValue: {
      color: 'var(--primary-turquoise)',
      borderBottom: '3px dashed var(--primary-turquoise)',
      cursor: 'text',
      padding: '0 0.25rem',
      outline: 'none',
      transition: 'all var(--transition-fast)',
    },
    subtitle: {
      color: 'var(--gray-400)',
      fontSize: '0.875rem',
    },
    configPanel: {
      background: 'var(--white)',
      borderRadius: '20px',
      border: '1px solid var(--gray-200)',
      padding: 'var(--space-lg)',
      marginBottom: 'var(--space-2xl)',
      boxShadow: 'var(--shadow-small)',
    },
    configRow: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-lg)',
      flexWrap: 'wrap',
    },
    configLabel: {
      fontSize: '0.875rem',
      fontWeight: '600',
      color: 'var(--dark)',
      marginRight: 'var(--space-xs)',
    },
    pillGroup: {
      display: 'flex',
      gap: '0.5rem',
      flexWrap: 'wrap',
    },
    pill: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.625rem 1rem',
      borderRadius: '50px',
      fontSize: '0.875rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all var(--transition-fast)',
      border: '2px solid var(--gray-200)',
      background: 'var(--white)',
      color: 'var(--dark)',
    },
    pillActive: {
      background: 'var(--primary-turquoise)',
      borderColor: 'var(--primary-turquoise)',
      color: 'var(--dark)',
      boxShadow: '0 4px 15px rgba(210, 179, 243, 0.3)',
    },
    advancedToggle: {
      marginLeft: 'auto',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      fontSize: '0.875rem',
      fontWeight: '600',
      color: 'var(--gray-400)',
      cursor: 'pointer',
      background: 'none',
      border: 'none',
      padding: '0.5rem 1rem',
      borderRadius: '50px',
      transition: 'all var(--transition-fast)',
    },
    advancedPanel: {
      borderTop: '1px solid var(--gray-200)',
      marginTop: 'var(--space-lg)',
      paddingTop: 'var(--space-lg)',
    },
    dayButton: {
      width: '36px',
      height: '36px',
      borderRadius: '50%',
      border: '2px solid var(--gray-200)',
      background: 'var(--white)',
      color: 'var(--gray-400)',
      fontSize: '0.75rem',
      fontWeight: '700',
      cursor: 'pointer',
      transition: 'all var(--transition-fast)',
    },
    dayButtonActive: {
      background: 'var(--primary-turquoise)',
      borderColor: 'var(--primary-turquoise)',
      color: 'var(--dark)',
    },
    resultsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
      gap: 'var(--space-xl)',
      marginBottom: 'var(--space-2xl)',
    },
    resultCard: {
      background: 'var(--white)',
      borderRadius: '24px',
      border: '1px solid var(--gray-200)',
      padding: 'var(--space-2xl)',
      position: 'relative',
      transition: 'all var(--transition-base)',
    },
    resultCardFeatured: {
      background: 'var(--primary-turquoise)',
      border: 'none',
      color: 'var(--dark)',
      boxShadow: '0 20px 60px rgba(210, 179, 243, 0.4)',
    },
    cardHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 'var(--space-xl)',
    },
    cardIcon: {
      width: '48px',
      height: '48px',
      borderRadius: '16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1.25rem',
    },
    cardTitle: {
      fontSize: '1.25rem',
      fontWeight: '700',
      marginBottom: '0.25rem',
    },
    cardSubtitle: {
      fontSize: '0.75rem',
      opacity: 0.7,
    },
    cardBadge: {
      padding: '0.375rem 0.875rem',
      borderRadius: '100px',
      fontSize: '0.75rem',
      fontWeight: '600',
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 'var(--space-md)',
      marginBottom: 'var(--space-xl)',
    },
    statBox: {
      padding: 'var(--space-lg)',
      borderRadius: '16px',
      textAlign: 'center',
    },
    statLabel: {
      fontSize: '0.75rem',
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      marginBottom: '0.5rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
    },
    statValue: {
      fontSize: '2.5rem',
      fontWeight: '800',
      lineHeight: 1,
    },
    espGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 'var(--space-md)',
      padding: 'var(--space-lg)',
      borderRadius: '16px',
      marginBottom: 'var(--space-lg)',
    },
    espItem: {
      textAlign: 'center',
    },
    espIcon: {
      width: '32px',
      height: '32px',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 0.5rem',
    },
    espValue: {
      fontSize: '1.25rem',
      fontWeight: '700',
    },
    espLabel: {
      fontSize: '0.625rem',
      opacity: 0.7,
    },
    statusBar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
      padding: '0.75rem',
      borderRadius: '12px',
      fontSize: '0.875rem',
      fontWeight: '600',
    },
    ctaSection: {
      background: 'var(--dark)',
      borderRadius: '24px',
      padding: 'var(--space-3xl)',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden',
    },
    ctaTitle: {
      fontSize: 'clamp(1.5rem, 3vw, 2rem)',
      fontWeight: '700',
      color: 'var(--white)',
      marginBottom: 'var(--space-md)',
    },
    ctaText: {
      color: 'var(--gray-400)',
      marginBottom: 'var(--space-xl)',
      maxWidth: '500px',
      margin: '0 auto var(--space-xl)',
    },
    ctaButtons: {
      display: 'flex',
      justifyContent: 'center',
      gap: 'var(--space-md)',
      flexWrap: 'wrap',
    },
    loadingOverlay: {
      position: 'absolute',
      inset: 0,
      background: 'rgba(255,255,255,0.9)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '24px',
      zIndex: 10,
    },
    spinner: {
      width: '48px',
      height: '48px',
      border: '4px solid var(--gray-200)',
      borderTopColor: 'var(--primary-turquoise)',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
    },
    inputSmall: {
      width: '50px',
      height: '32px',
      textAlign: 'center',
      border: '2px solid var(--gray-200)',
      borderRadius: '8px',
      fontSize: '0.875rem',
      fontWeight: '700',
      outline: 'none',
    },
  };

  return (
    <>
      <SEO
        title="Free Mailboxes Calculator | Calculate Email Infrastructure Needs - SendEmAll"
        description="Free calculator tool to determine how many email senders and domains you need for your cold email campaign. Optimize deliverability with ESP matching, warmup schedules, and health tier analysis."
        canonicalUrl="https://sendemall.com/mailboxes-calculator"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Mailboxes Calculator",
          "url": "https://sendemall.com/mailboxes-calculator",
        }}
      />

      <Navigation />

      <div style={styles.page}>
        {/* Hero Section */}
        <section style={styles.heroSection}>
          <div className="container">
            <div style={styles.sectionHeader}>
              <div style={styles.badge}>
                <i className="fas fa-calculator"></i>
                Free Tool
              </div>
              <h1 style={styles.title}>
                How many mailboxes & domains to send{' '}
                <span
                  contentEditable
                  suppressContentEditableWarning
                  style={styles.editableValue}
                  onBlur={(e) => {
                    const num = parseInt(e.currentTarget.textContent?.replace(/,/g, '') || '1') || 1;
                    setTotalLeads(Math.max(1, num));
                    e.currentTarget.textContent = num.toLocaleString();
                  }}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), e.currentTarget.blur())}
                >
                  {totalLeads.toLocaleString()}
                </span>{' '}
                emails in{' '}
                <span
                  contentEditable
                  suppressContentEditableWarning
                  style={styles.editableValue}
                  onBlur={(e) => {
                    const num = Math.min(365, Math.max(1, parseInt(e.currentTarget.textContent || '1') || 1));
                    setCampaignDurationDays(num);
                    e.currentTarget.textContent = num.toString();
                  }}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), e.currentTarget.blur())}
                >
                  {campaignDurationDays}
                </span>{' '}
                days?
              </h1>
              <p style={styles.subtitle}>Click on the highlighted values to edit</p>
            </div>

            {/* Configuration Panel */}
            <div style={styles.configPanel}>
              <div style={styles.configRow}>
                <span style={styles.configLabel}>Provider:</span>
                <div style={styles.pillGroup}>
                  {Object.entries(ESP_TYPE_CONFIG).map(([type, config]) => (
                    <button
                      key={type}
                      onClick={() => setEspType(type)}
                      style={{
                        ...styles.pill,
                        ...(espType === type ? styles.pillActive : {}),
                      }}
                    >
                      {config.icon}
                      {config.label}
                    </button>
                  ))}
                </div>

                {espType === EspType.MIXED && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <GoogleIcon />
                      <input
                        type="number"
                        value={mixedRatios.google}
                        onChange={(e) => setMixedRatios(prev => ({ ...prev, google: Math.max(0, Math.min(100, parseInt(e.target.value) || 0)) }))}
                        style={styles.inputSmall}
                      />
                      <span style={{ color: 'var(--gray-400)', fontSize: '0.75rem' }}>%</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <MicrosoftIcon />
                      <input
                        type="number"
                        value={mixedRatios.outlook}
                        onChange={(e) => setMixedRatios(prev => ({ ...prev, outlook: Math.max(0, Math.min(100, parseInt(e.target.value) || 0)) }))}
                        style={styles.inputSmall}
                      />
                      <span style={{ color: 'var(--gray-400)', fontSize: '0.75rem' }}>%</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <i className="fas fa-server" style={{ color: 'var(--gray-400)' }}></i>
                      <input
                        type="number"
                        value={mixedRatios.custom}
                        onChange={(e) => setMixedRatios(prev => ({ ...prev, custom: Math.max(0, Math.min(100, parseInt(e.target.value) || 0)) }))}
                        style={styles.inputSmall}
                      />
                      <span style={{ color: 'var(--gray-400)', fontSize: '0.75rem' }}>%</span>
                    </div>
                  </div>
                )}

                <button
                  onClick={() => setShowConfig(!showConfig)}
                  style={styles.advancedToggle}
                >
                  <i className="fas fa-cog"></i>
                  {showConfig ? 'Less Options' : 'More Options'}
                  <i className={`fas fa-chevron-${showConfig ? 'up' : 'down'}`}></i>
                </button>
              </div>

              {showConfig && (
                <div style={styles.advancedPanel}>
                  <div style={styles.configRow}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                      <span style={styles.configLabel}><i className="fas fa-calendar" style={{ marginRight: '0.5rem' }}></i>Days:</span>
                      <div style={{ display: 'flex', gap: '0.25rem' }}>
                        {WEEKDAYS.map((day, index) => (
                          <button
                            key={day}
                            onClick={() => toggleSendDay(day)}
                            style={{
                              ...styles.dayButton,
                              ...(sendDays.includes(day) ? styles.dayButtonActive : {}),
                            }}
                          >
                            {WEEKDAY_SHORT[index]}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                      <span style={styles.configLabel}><i className="fas fa-heartbeat" style={{ marginRight: '0.5rem' }}></i>Health:</span>
                      <div style={styles.pillGroup}>
                        {Object.entries(HEALTH_TIER_CONFIG).map(([tier, config]) => (
                          <button
                            key={tier}
                            onClick={() => setHealthTier(tier)}
                            style={{
                              ...styles.pill,
                              padding: '0.5rem 0.875rem',
                              fontSize: '0.75rem',
                              ...(healthTier === tier ? styles.pillActive : {}),
                            }}
                          >
                            {config.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                      <span style={styles.configLabel}><i className="fas fa-clock" style={{ marginRight: '0.5rem' }}></i>Hours/day:</span>
                      <div style={styles.pillGroup}>
                        {[4, 8, 12].map((hours) => (
                          <button
                            key={hours}
                            onClick={() => setSendingHoursPerDay(hours)}
                            style={{
                              ...styles.pill,
                              padding: '0.5rem 0.875rem',
                              fontSize: '0.75rem',
                              ...(sendingHoursPerDay === hours ? styles.pillActive : {}),
                            }}
                          >
                            {hours}h
                          </button>
                        ))}
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                      <span style={styles.configLabel}>Warmup:</span>
                      <input
                        type="number"
                        value={warmupRatio}
                        onChange={(e) => setWarmupRatio(Math.max(0, Math.min(100, parseInt(e.target.value) || 0)))}
                        style={styles.inputSmall}
                      />
                      <span style={{ color: 'var(--gray-400)', fontSize: '0.75rem' }}>%</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Results */}
            {(sendEmAllResult || genericResult) && (
              <div style={{ position: 'relative' }}>
                {isCalculating && (
                  <div style={styles.loadingOverlay}>
                    <div style={styles.spinner}></div>
                  </div>
                )}

                <div style={styles.resultsGrid}>
                  {/* Generic Result */}
                  {genericResult && (
                    <div style={styles.resultCard}>
                      <div style={styles.cardHeader}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
                          <div style={{ ...styles.cardIcon, background: 'var(--gray-100)', color: 'var(--gray-400)' }}>
                            <i className="fas fa-globe"></i>
                          </div>
                          <div>
                            <h3 style={{ ...styles.cardTitle, color: 'var(--dark)' }}>Generic Estimate</h3>
                            <p style={{ ...styles.cardSubtitle, color: 'var(--gray-400)' }}>Simple calculation</p>
                          </div>
                        </div>
                        <span style={{ ...styles.cardBadge, background: 'var(--gray-100)', color: 'var(--gray-400)' }}>Basic</span>
                      </div>

                      <div style={styles.statsGrid}>
                        <div style={{ ...styles.statBox, background: 'var(--gray-100)' }}>
                          <div style={{ ...styles.statLabel, color: 'var(--gray-400)' }}>
                            <i className="fas fa-envelope"></i> Senders
                          </div>
                          <div style={{ ...styles.statValue, color: 'var(--dark)' }}>{genericResult.totalSendersRequired}</div>
                        </div>
                        <div style={{ ...styles.statBox, background: 'var(--gray-100)' }}>
                          <div style={{ ...styles.statLabel, color: 'var(--gray-400)' }}>
                            <i className="fas fa-globe"></i> Domains
                          </div>
                          <div style={{ ...styles.statValue, color: 'var(--dark)' }}>{genericResult.totalDomainsRequired}</div>
                        </div>
                      </div>

                      <div style={{ ...styles.espGrid, background: 'var(--gray-100)' }}>
                        <div style={styles.espItem}>
                          <div style={{ ...styles.espIcon, background: 'var(--white)' }}><GoogleIcon /></div>
                          <div style={{ ...styles.espValue, color: 'var(--dark)' }}>{genericResult.sendersByEsp.google}</div>
                          <div style={{ ...styles.espLabel, color: 'var(--gray-400)' }}>Google/MS 365</div>
                        </div>
                        <div style={styles.espItem}>
                          <div style={{ ...styles.espIcon, background: 'var(--white)' }}><MicrosoftIcon /></div>
                          <div style={{ ...styles.espValue, color: 'var(--dark)' }}>{genericResult.sendersByEsp.outlook}</div>
                          <div style={{ ...styles.espLabel, color: 'var(--gray-400)' }}>Azure</div>
                        </div>
                        <div style={styles.espItem}>
                          <div style={{ ...styles.espIcon, background: 'var(--white)' }}><i className="fas fa-server" style={{ color: 'var(--gray-400)' }}></i></div>
                          <div style={{ ...styles.espValue, color: 'var(--dark)' }}>{genericResult.sendersByEsp.custom}</div>
                          <div style={{ ...styles.espLabel, color: 'var(--gray-400)' }}>Custom</div>
                        </div>
                      </div>

                      <div style={{
                        ...styles.statusBar,
                        background: genericResult.summary.canComplete ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                        color: genericResult.summary.canComplete ? '#10b981' : '#f59e0b',
                      }}>
                        <i className={`fas fa-${genericResult.summary.canComplete ? 'check-circle' : 'exclamation-triangle'}`}></i>
                        {genericResult.summary.canComplete
                          ? `Achievable in ${genericResult.summary.estimatedCompletionDays} days`
                          : 'Needs more senders'}
                      </div>
                    </div>
                  )}

                  {/* SendEmAll Result */}
                  {sendEmAllResult && (
                    <div style={{ ...styles.resultCard, ...styles.resultCardFeatured }}>
                      <div style={styles.cardHeader}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
                          <div style={{ ...styles.cardIcon, background: 'rgba(255,255,255,0.2)', color: 'var(--dark)' }}>
                            <i className="fas fa-paper-plane"></i>
                          </div>
                          <div>
                            <h3 style={{ ...styles.cardTitle, color: 'var(--dark)' }}>With SendEmAll</h3>
                            <p style={{ ...styles.cardSubtitle, color: 'var(--dark)' }}>Optimized for deliverability</p>
                          </div>
                        </div>
                        <span style={{ ...styles.cardBadge, background: 'rgba(255,255,255,0.3)', color: 'var(--dark)' }}>Recommended</span>
                      </div>

                      <div style={styles.statsGrid}>
                        <div style={{ ...styles.statBox, background: 'rgba(255,255,255,0.2)' }}>
                          <div style={{ ...styles.statLabel, color: 'var(--dark)', opacity: 0.8 }}>
                            <i className="fas fa-envelope"></i> Senders
                          </div>
                          <div style={{ ...styles.statValue, color: 'var(--dark)' }}>{sendEmAllResult.totalSendersRequired}</div>
                        </div>
                        <div style={{ ...styles.statBox, background: 'rgba(255,255,255,0.2)' }}>
                          <div style={{ ...styles.statLabel, color: 'var(--dark)', opacity: 0.8 }}>
                            <i className="fas fa-globe"></i> Domains
                          </div>
                          <div style={{ ...styles.statValue, color: 'var(--dark)' }}>{sendEmAllResult.totalDomainsRequired}</div>
                        </div>
                      </div>

                      <div style={{ ...styles.espGrid, background: 'rgba(255,255,255,0.15)' }}>
                        <div style={styles.espItem}>
                          <div style={{ ...styles.espIcon, background: 'rgba(255,255,255,0.3)' }}><GoogleIcon /></div>
                          <div style={{ ...styles.espValue, color: 'var(--dark)' }}>{sendEmAllResult.sendersByEsp.google}</div>
                          <div style={{ ...styles.espLabel, color: 'var(--dark)' }}>Google/MS 365</div>
                        </div>
                        <div style={styles.espItem}>
                          <div style={{ ...styles.espIcon, background: 'rgba(255,255,255,0.3)' }}><MicrosoftIcon /></div>
                          <div style={{ ...styles.espValue, color: 'var(--dark)' }}>{sendEmAllResult.sendersByEsp.outlook}</div>
                          <div style={{ ...styles.espLabel, color: 'var(--dark)' }}>Azure</div>
                        </div>
                        <div style={styles.espItem}>
                          <div style={{ ...styles.espIcon, background: 'rgba(255,255,255,0.3)' }}><i className="fas fa-server" style={{ color: 'var(--dark)' }}></i></div>
                          <div style={{ ...styles.espValue, color: 'var(--dark)' }}>{sendEmAllResult.sendersByEsp.custom}</div>
                          <div style={{ ...styles.espLabel, color: 'var(--dark)' }}>Custom</div>
                        </div>
                      </div>

                      <div style={{
                        ...styles.statusBar,
                        background: sendEmAllResult.summary.canComplete ? 'rgba(16, 185, 129, 0.3)' : 'rgba(245, 158, 11, 0.3)',
                        color: 'var(--dark)',
                      }}>
                        <i className={`fas fa-${sendEmAllResult.summary.canComplete ? 'check-circle' : 'exclamation-triangle'}`}></i>
                        {sendEmAllResult.summary.canComplete
                          ? `Campaign achievable in ${sendEmAllResult.summary.estimatedCompletionDays} days`
                          : 'Needs more senders'}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Why SendEmAll Section */}
            {sendEmAllResult && genericResult && sendEmAllResult.totalSendersRequired > genericResult.totalSendersRequired && (
              <div style={{
                background: 'linear-gradient(135deg, rgba(210, 179, 243, 0.1) 0%, rgba(148, 233, 230, 0.1) 100%)',
                borderRadius: '24px',
                border: '1px solid var(--primary-turquoise)',
                padding: 'var(--space-2xl)',
                marginBottom: 'var(--space-2xl)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)', marginBottom: 'var(--space-xl)' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    background: 'var(--primary-turquoise)',
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <i className="fas fa-shield-alt" style={{ color: 'var(--dark)', fontSize: '1.25rem' }}></i>
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--dark)', marginBottom: '0.25rem' }}>
                      Why SendEmAll requires more senders
                    </h3>
                    <p style={{ fontSize: '0.875rem', color: 'var(--gray-400)' }}>
                      Optimized for deliverability, not just volume
                    </p>
                  </div>
                </div>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                  gap: 'var(--space-md)',
                }}>
                  {[
                    { icon: 'fa-check-circle', color: '#10b981', bg: 'rgba(16, 185, 129, 0.1)', title: 'Best Deliverability', desc: 'Smart intervals between emails prevent spam flags' },
                    { icon: 'fa-server', color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.1)', title: 'ESP Matching', desc: 'Sending patterns optimized for each provider' },
                    { icon: 'fa-fire', color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.1)', title: 'Warmup Driven', desc: 'Gradual ramp-up builds domain reputation' },
                    { icon: 'fa-shield-alt', color: '#ef4444', bg: 'rgba(239, 68, 68, 0.1)', title: 'Blacklist Protection', desc: 'Keep your domains off spam lists' },
                    { icon: 'fa-lock', color: '#8b5cf6', bg: 'rgba(139, 92, 246, 0.1)', title: 'GDPR Compliant', desc: 'Privacy-first email handling' },
                  ].map((item, index) => (
                    <div key={index} style={{
                      background: 'var(--white)',
                      borderRadius: '16px',
                      padding: 'var(--space-lg)',
                      border: '1px solid var(--gray-200)',
                    }}>
                      <div style={{
                        width: '40px',
                        height: '40px',
                        background: item.bg,
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: 'var(--space-sm)',
                      }}>
                        <i className={`fas ${item.icon}`} style={{ color: item.color }}></i>
                      </div>
                      <h4 style={{ fontSize: '0.875rem', fontWeight: '700', color: 'var(--dark)', marginBottom: '0.25rem' }}>
                        {item.title}
                      </h4>
                      <p style={{ fontSize: '0.75rem', color: 'var(--gray-400)', lineHeight: 1.4 }}>
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CTA Section */}
            <div style={{
              background: 'var(--gray-100)',
              borderRadius: '24px',
              padding: 'var(--space-3xl)',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
              border: '1px solid var(--gray-200)',
            }}>
              <div style={{
                position: 'absolute',
                top: '-50%',
                right: '-20%',
                width: '400px',
                height: '400px',
                background: 'linear-gradient(135deg, rgba(210, 179, 243, 0.15) 0%, rgba(148, 233, 230, 0.15) 100%)',
                borderRadius: '50%',
              }} />
              <div style={{
                position: 'absolute',
                bottom: '-30%',
                left: '-10%',
                width: '300px',
                height: '300px',
                background: 'linear-gradient(135deg, rgba(148, 233, 230, 0.15) 0%, rgba(210, 179, 243, 0.15) 100%)',
                borderRadius: '50%',
              }} />
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.5rem 1rem',
                  background: 'rgba(148, 233, 230, 0.15)',
                  border: '1px solid var(--primary-turquoise)',
                  borderRadius: '100px',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  color: 'var(--primary-turquoise)',
                  marginBottom: 'var(--space-lg)',
                }}>
                  <i className="fas fa-rocket"></i> Get Started Free
                </div>
                <h2 style={{ ...styles.ctaTitle, color: 'var(--dark)' }}>Ready to launch your campaign?</h2>
                <p style={{ ...styles.ctaText, color: 'var(--gray-400)' }}>
                  Manage senders, automate warmup, and run campaigns with optimized deliverability.
                </p>
                <div style={styles.ctaButtons}>
                  <a
                    href="https://app.sendemall.com/register"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      background: 'var(--primary-turquoise)',
                      color: 'var(--dark)',
                      padding: '1rem 2rem',
                      borderRadius: '12px',
                      fontWeight: '600',
                      fontSize: '1rem',
                      textDecoration: 'none',
                      transition: 'all 0.2s ease',
                      boxShadow: '0 4px 20px rgba(148, 233, 230, 0.3)',
                    }}
                  >
                    Get Started Free
                    <i className="fas fa-arrow-right"></i>
                  </a>
                  <a
                    href="https://app.sendemall.com/login"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      background: 'var(--white)',
                      color: 'var(--dark)',
                      padding: '1rem 2rem',
                      borderRadius: '12px',
                      fontWeight: '600',
                      fontSize: '1rem',
                      textDecoration: 'none',
                      transition: 'all 0.2s ease',
                      border: '2px solid var(--gray-200)',
                    }}
                  >
                    Sign In
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
};

export default Calculator;
