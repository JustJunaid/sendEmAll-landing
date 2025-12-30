import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { trackCalculatorEvent } from '../hooks/useGoogleAnalytics';

const WEEKDAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const WEEKDAY_SHORT = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

const ESP_DAILY_LIMITS = {
  GOOGLE: 30,
  OUTLOOK: 5,
  CUSTOM: 50,
};

const ESP_SENDERS_PER_DOMAIN = {
  GOOGLE: 4,
  OUTLOOK: 100,
  CUSTOM: 4,
};

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

// Google brand icon SVG
const GoogleIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
);

// Microsoft/Outlook brand icon SVG
const MicrosoftIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path fill="#F25022" d="M1 1h10v10H1z"/>
    <path fill="#00A4EF" d="M1 13h10v10H1z"/>
    <path fill="#7FBA00" d="M13 1h10v10H13z"/>
    <path fill="#FFB900" d="M13 13h10v10H13z"/>
  </svg>
);

const HEALTH_TIER_CONFIG = {
  [HealthTier.EXCELLENT]: {
    label: 'Excellent',
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
    description: '70-100',
    multiplier: 1.0,
  },
  [HealthTier.FAIR]: {
    label: 'Fair',
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
    description: '40-69',
    multiplier: 0.7,
  },
  [HealthTier.CRITICAL]: {
    label: 'Critical',
    color: 'text-rose-600',
    bgColor: 'bg-rose-50',
    borderColor: 'border-rose-200',
    description: '<40',
    multiplier: 0.3,
  },
};

const ESP_TYPE_CONFIG = {
  [EspType.MIXED]: {
    label: 'Mixed',
    description: 'Google + Azure + Custom',
    icon: <i className="fas fa-layer-group text-sm"></i>,
  },
  [EspType.ALL_GOOGLE]: {
    label: 'Google/MS Workspace',
    description: `${ESP_DAILY_LIMITS.GOOGLE} emails/day`,
    icon: <GoogleIcon className="h-4 w-4" />,
  },
  [EspType.ALL_OUTLOOK]: {
    label: 'Azure',
    description: `${ESP_DAILY_LIMITS.OUTLOOK} emails/day`,
    icon: <MicrosoftIcon className="h-4 w-4" />,
  },
  [EspType.ALL_CUSTOM]: {
    label: 'Custom',
    description: `${ESP_DAILY_LIMITS.CUSTOM} emails/day`,
    icon: <i className="fas fa-server text-sm"></i>,
  },
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
      // Map ESP type to API format
      const espTypeMap = {
        [EspType.MIXED]: 'mixed',
        [EspType.ALL_GOOGLE]: 'all_google',
        [EspType.ALL_OUTLOOK]: 'all_outlook',
        [EspType.ALL_CUSTOM]: 'all_custom',
      };

      // Map health tier to API format
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

      console.log('API Request:', requestBody);

      // Track calculator usage
      trackCalculatorEvent('calculate_started', {
        total_leads: totalLeads,
        campaign_duration: campaignDurationDays,
        health_tier: healthTierMap[healthTier],
        esp_type: espTypeMap[espType],
        warmup_ratio: warmupRatio,
      });

      const response = await fetch('https://api.sendemall.com/open/senders-calculator/calculate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error('Failed to calculate results');
      }

      const data = await response.json();

      console.log('API Response:', data);

      // Transform API response to match our component's expected format
      // The API returns a single calculation, we'll use it for SendEmAll result
      // and create a simplified generic result from the same data

      const sendEmAllData = {
        totalSendersRequired: data.totalSendersRequired,
        totalDomainsRequired: data.totalDomainsRequired,
        sendersByEsp: data.sendersByEsp,
        domainAnalysis: {
          domainsByEsp: data.domainAnalysis.domainsByEsp
        },
        summary: {
          canComplete: data.summary.canComplete,
          estimatedCompletionDays: data.summary.estimatedCompletionDays,
        },
      };

      // For generic estimate, we'll use the minimum senders needed
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

      // Set results from API response
      setGenericResult(genericData);
      setSendEmAllResult(sendEmAllData);

      // Track successful calculation
      trackCalculatorEvent('calculate_completed', {
        senders_required: data.totalSendersRequired,
        domains_required: data.totalDomainsRequired,
        can_complete: data.summary.canComplete,
        estimated_days: data.summary.estimatedCompletionDays,
      });
    } catch (error) {
      console.error('Error calculating results:', error);

      // Track calculation error
      trackCalculatorEvent('calculate_error', {
        error_message: error.message,
      });

      // Keep previous results on error
    } finally {
      setIsCalculating(false);
    }
  };

  useEffect(() => {
    calculateResults();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalLeads, campaignDurationDays, sendDays, warmupRatio, healthTier, espType, sendingHoursPerDay, mixedRatios]);

  const toggleSendDay = (day) => {
    if (sendDays.includes(day)) {
      if (sendDays.length > 1) {
        setSendDays(sendDays.filter((d) => d !== day));
      }
    } else {
      setSendDays([...sendDays, day]);
    }
  };

  return (
    <>
      <SEO
        title="Free Campaign Sender Calculator | Calculate Email Infrastructure Needs - SendEmAll"
        description="Free calculator tool to determine how many email senders and domains you need for your cold email campaign. Optimize deliverability with ESP matching, warmup schedules, and health tier analysis. Get instant results."
        keywords="sender calculator, email sender calculator, cold email calculator, domain calculator, email infrastructure calculator, ESP calculator, campaign sender tool, mailbox calculator, email deliverability calculator"
        canonicalUrl="https://sendemall.com/campaign-sender-calculator"
        ogImage="https://sendemall.com/img/calculator-og-image.png"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Campaign Sender Calculator",
          "description": "Calculate how many email senders and domains you need for your cold email campaigns with real-time deliverability optimization.",
          "url": "https://sendemall.com/campaign-sender-calculator",
          "applicationCategory": "BusinessApplication",
          "operatingSystem": "Web",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "featureList": [
            "Calculate required senders and domains",
            "ESP provider optimization (Google, Outlook, Azure, Custom)",
            "Health tier analysis",
            "Warmup schedule planning",
            "Daily sending capacity calculation",
            "Real-time API integration"
          ]
        }}
      />

      <div className="min-h-screen bg-[#fafafa]">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center gap-3">
                <img
                  src="/img/sendemall-logo-new.svg"
                  alt="SendEmAll"
                  width={130}
                  height={28}
                  className="hover:opacity-80 transition-opacity"
                />
              </Link>
              <div className="flex items-center gap-4">
                <span className="bg-[#d2b3f3] text-white border-[#d2b3f3]/50 px-3 py-1.5 rounded-full text-xs font-medium inline-flex items-center gap-1.5">
                  <i className="fas fa-sparkles text-sm"></i>
                  Free Tool
                </span>
                <a
                  href="https://app.sendemall.com/login"
                  className="border border-gray-200 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Sign In
                </a>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-6 py-12">
          {/* Hero Question */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-[#d2b3f3] text-white px-5 py-2.5 rounded-full text-sm font-medium mb-6 border border-[#d2b3f3]/30">
              <i className="fas fa-calculator"></i>
              Campaign Sender Calculator
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
              How many mailboxes & domains required to send{' '}
              <span
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => {
                  const text = e.currentTarget.textContent || '';
                  const num = parseInt(text.replace(/,/g, '')) || 1;
                  setTotalLeads(Math.max(1, num));
                  e.currentTarget.textContent = num.toLocaleString();
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    e.currentTarget.blur();
                  }
                }}
                className="text-[#d2b3f3] border-b-2 border-dashed border-[#d2b3f3] hover:border-[#d2b3f3] focus:border-[#d2b3f3] focus:outline-none cursor-text px-1 transition-colors"
              >
                {totalLeads.toLocaleString()}
              </span>{' '}
              emails in{' '}
              <span
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => {
                  const text = e.currentTarget.textContent || '';
                  const num = parseInt(text) || 1;
                  const clamped = Math.min(365, Math.max(1, num));
                  setCampaignDurationDays(clamped);
                  e.currentTarget.textContent = clamped.toString();
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    e.currentTarget.blur();
                  }
                }}
                className="text-[#d2b3f3] border-b-2 border-dashed border-[#d2b3f3] hover:border-[#d2b3f3] focus:border-[#d2b3f3] focus:outline-none cursor-text px-1 transition-colors"
              >
                {campaignDurationDays}
              </span>{' '}
              days?
            </h1>
            <p className="text-sm text-gray-400 mt-2">Click on the highlighted values to edit</p>
          </div>

          {/* Configuration Panel - Compact */}
          <div className="bg-white rounded-xl border border-gray-200 px-4 py-3 mb-8 shadow-sm">
            <div className="flex items-center gap-4 flex-wrap">
              {/* ESP Type - Inline Pills */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-gray-500">Provider:</span>
                <div className="flex gap-1">
                  {Object.entries(ESP_TYPE_CONFIG).map(([type, config]) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setEspType(type)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        espType === type
                          ? 'bg-[#d2b3f3] text-white shadow-sm'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {config.icon}
                      {config.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mixed ESP Ratios - Inline */}
              {espType === EspType.MIXED && (
                <div className="flex items-center gap-2 animate-in fade-in duration-200">
                  <span className="text-xs text-gray-400">|</span>
                  <div className="flex items-center gap-1 bg-gray-50 rounded-lg px-2 py-1">
                    <GoogleIcon className="h-3.5 w-3.5" />
                    <input
                      type="number"
                      value={mixedRatios.google}
                      onChange={(e) => setMixedRatios(prev => ({ ...prev, google: Math.max(0, Math.min(100, parseInt(e.target.value) || 0)) }))}
                      min={0}
                      max={100}
                      className="h-6 w-10 text-center text-xs font-bold border-0 bg-transparent p-0 focus:outline-none"
                    />
                    <span className="text-gray-400 text-xs">%</span>
                  </div>
                  <div className="flex items-center gap-1 bg-gray-50 rounded-lg px-2 py-1">
                    <MicrosoftIcon className="h-3.5 w-3.5" />
                    <input
                      type="number"
                      value={mixedRatios.outlook}
                      onChange={(e) => setMixedRatios(prev => ({ ...prev, outlook: Math.max(0, Math.min(100, parseInt(e.target.value) || 0)) }))}
                      min={0}
                      max={100}
                      className="h-6 w-10 text-center text-xs font-bold border-0 bg-transparent p-0 focus:outline-none"
                    />
                    <span className="text-gray-400 text-xs">%</span>
                  </div>
                  <div className="flex items-center gap-1 bg-gray-50 rounded-lg px-2 py-1">
                    <i className="fas fa-server text-gray-500 text-xs"></i>
                    <input
                      type="number"
                      value={mixedRatios.custom}
                      onChange={(e) => setMixedRatios(prev => ({ ...prev, custom: Math.max(0, Math.min(100, parseInt(e.target.value) || 0)) }))}
                      min={0}
                      max={100}
                      className="h-6 w-10 text-center text-xs font-bold border-0 bg-transparent p-0 focus:outline-none"
                    />
                    <span className="text-gray-400 text-xs">%</span>
                  </div>
                  {mixedRatios.google + mixedRatios.outlook + mixedRatios.custom !== 100 && (
                    <div className="text-xs text-amber-600 flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-lg">
                      <i className="fas fa-exclamation-triangle text-xs"></i>
                      {mixedRatios.google + mixedRatios.outlook + mixedRatios.custom}%
                    </div>
                  )}
                </div>
              )}

              {/* Spacer */}
              <div className="flex-1" />

              {/* Advanced Toggle */}
              <button
                type="button"
                onClick={() => setShowConfig(!showConfig)}
                className="text-xs text-gray-500 hover:text-gray-700 font-medium flex items-center gap-1"
              >
                <i className="fas fa-cog text-xs"></i>
                {showConfig ? 'Less' : 'More'}
                <i className={`fas fa-chevron-down text-xs transition-transform ${showConfig ? 'rotate-180' : ''}`}></i>
              </button>
            </div>

            {/* Advanced Configuration - Compact */}
            {showConfig && (
              <div className="border-t border-gray-100 mt-3 pt-3">
                <div className="flex items-center gap-6 flex-wrap">
                  {/* Send Days */}
                  <div className="flex items-center gap-2">
                    <i className="fas fa-calendar text-gray-400 text-xs"></i>
                    <span className="text-xs text-gray-500">Days:</span>
                    <div className="flex gap-0.5">
                      {WEEKDAYS.map((day, index) => (
                        <button
                          key={day}
                          type="button"
                          onClick={() => toggleSendDay(day)}
                          className={`w-7 h-7 text-[10px] font-bold rounded transition-all ${
                            sendDays.includes(day)
                              ? 'bg-[#d2b3f3] text-white'
                              : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                          }`}
                        >
                          {WEEKDAY_SHORT[index]}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Health Tier */}
                  <div className="flex items-center gap-2">
                    <i className="fas fa-shield text-gray-400 text-xs"></i>
                    <span className="text-xs text-gray-500">Health:</span>
                    <div className="flex gap-1">
                      {Object.entries(HEALTH_TIER_CONFIG).map(([tier, config]) => (
                        <button
                          key={tier}
                          type="button"
                          onClick={() => setHealthTier(tier)}
                          className={`px-2.5 py-1 rounded text-[10px] font-semibold transition-all ${
                            healthTier === tier
                              ? `${config.bgColor} ${config.color} ring-1 ${config.borderColor.replace('border-', 'ring-')}`
                              : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                          }`}
                        >
                          {config.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Hours per day */}
                  <div className="flex items-center gap-2">
                    <i className="fas fa-clock text-gray-400 text-xs"></i>
                    <span className="text-xs text-gray-500">Hours:</span>
                    <div className="flex gap-0.5">
                      {[4, 8, 12].map((hours) => (
                        <button
                          key={hours}
                          type="button"
                          onClick={() => setSendingHoursPerDay(hours)}
                          className={`px-2 py-1 text-[10px] font-bold rounded transition-all ${
                            sendingHoursPerDay === hours
                              ? 'bg-[#d2b3f3] text-white'
                              : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                          }`}
                        >
                          {hours}h
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Warmup */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">Warmup:</span>
                    <div className="flex items-center gap-0.5 bg-gray-50 rounded px-1.5 py-0.5">
                      <input
                        type="number"
                        value={warmupRatio}
                        onChange={(e) => setWarmupRatio(parseInt(e.target.value) || 0)}
                        min={0}
                        max={100}
                        className="h-5 w-8 text-center text-xs font-bold border-0 bg-transparent p-0 focus:outline-none"
                      />
                      <span className="text-gray-400 text-xs">%</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Results Section - Continue in next message due to length */}
          {(sendEmAllResult || genericResult) && (
            <div className="relative">
              {isCalculating && (
                <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex items-center justify-center rounded-3xl">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 border-4 border-[#d2b3f3] border-t-#d2b3f3 rounded-full animate-spin"></div>
                    <p className="text-sm font-medium text-gray-600">Calculating...</p>
                  </div>
                </div>
              )}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Generic Results */}
              {genericResult && (
                <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 p-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-gray-100/50 rounded-full -translate-y-1/2 translate-x-1/2" />
                  <div className="relative">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                          <i className="fas fa-globe text-gray-600"></i>
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">Generic Estimate</h3>
                          <p className="text-gray-500 text-xs">Simple calculation, no platform constraints</p>
                        </div>
                      </div>
                      <span className="bg-gray-100 text-gray-600 border border-gray-200 text-xs px-3 py-1 rounded-full font-medium">
                        Basic
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-gray-50 rounded-2xl p-4 text-center border border-gray-100">
                        <div className="flex items-center justify-center gap-1.5 mb-1">
                          <i className="fas fa-envelope text-gray-400 text-sm"></i>
                          <span className="text-gray-500 text-xs font-medium uppercase">Senders</span>
                        </div>
                        <div className="text-4xl font-bold text-gray-900">{genericResult.totalSendersRequired}</div>
                      </div>
                      <div className="bg-gray-50 rounded-2xl p-4 text-center border border-gray-100">
                        <div className="flex items-center justify-center gap-1.5 mb-1">
                          <i className="fas fa-globe text-gray-400 text-sm"></i>
                          <span className="text-gray-500 text-xs font-medium uppercase">Domains</span>
                        </div>
                        <div className="text-4xl font-bold text-gray-900">{genericResult.totalDomainsRequired}</div>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-4 mb-4 border border-gray-100">
                      <div className="text-xs text-gray-500 mb-3 font-medium">Senders & Domains by ESP</div>
                      <div className="grid grid-cols-3 gap-3">
                        <div className="text-center">
                          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center mx-auto mb-1 shadow-sm">
                            <GoogleIcon className="h-4 w-4" />
                          </div>
                          <div className="text-xl font-bold text-gray-900">{genericResult.sendersByEsp.google}</div>
                          <div className="text-[10px] text-gray-500">Google/MS Workspace</div>
                          {genericResult.sendersByEsp.google > 0 && (
                            <div className="text-[10px] text-[#d2b3f3] mt-0.5">
                              across {genericResult.domainAnalysis.domainsByEsp.google} domain{genericResult.domainAnalysis.domainsByEsp.google !== 1 ? 's' : ''}
                            </div>
                          )}
                        </div>
                        <div className="text-center">
                          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center mx-auto mb-1 shadow-sm">
                            <MicrosoftIcon className="h-4 w-4" />
                          </div>
                          <div className="text-xl font-bold text-gray-900">{genericResult.sendersByEsp.outlook}</div>
                          <div className="text-[10px] text-gray-500">Azure senders</div>
                          {genericResult.sendersByEsp.outlook > 0 && (
                            <div className="text-[10px] text-[#d2b3f3] mt-0.5">
                              across {genericResult.domainAnalysis.domainsByEsp.outlook} domain{genericResult.domainAnalysis.domainsByEsp.outlook !== 1 ? 's' : ''}
                            </div>
                          )}
                        </div>
                        <div className="text-center">
                          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center mx-auto mb-1 shadow-sm">
                            <i className="fas fa-server text-gray-500 text-sm"></i>
                          </div>
                          <div className="text-xl font-bold text-gray-900">{genericResult.sendersByEsp.custom}</div>
                          <div className="text-[10px] text-gray-500">Custom senders</div>
                          {genericResult.sendersByEsp.custom > 0 && (
                            <div className="text-[10px] text-[#d2b3f3] mt-0.5">
                              across {genericResult.domainAnalysis.domainsByEsp.custom} domain{genericResult.domainAnalysis.domainsByEsp.custom !== 1 ? 's' : ''}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className={`flex items-center justify-center gap-2 py-2 rounded-lg ${
                      genericResult.summary.canComplete ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                    }`}>
                      {genericResult.summary.canComplete ? (
                        <>
                          <i className="fas fa-check-circle"></i>
                          <span className="text-sm font-medium">Achievable in {genericResult.summary.estimatedCompletionDays} days</span>
                        </>
                      ) : (
                        <>
                          <i className="fas fa-exclamation-triangle"></i>
                          <span className="text-sm font-medium">Needs more senders</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* SendEmAll Results */}
              {sendEmAllResult && (
                <div className="bg-[#d2b3f3] rounded-3xl shadow-2xl shadow-[#d2b3f3]/30 p-6 text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                  <div className="relative">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                          <i className="fas fa-paper-plane"></i>
                        </div>
                        <div>
                          <h3 className="text-lg text-white font-bold">Within SendEmAll</h3>
                          <p className="text-white/70 text-xs">Optimized with ramping & health tiers</p>
                        </div>
                      </div>
                      <span className="bg-white/20 text-white border border-white/30 text-xs px-3 py-1 rounded-full font-medium">
                        Recommended
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-4 text-center">
                        <div className="flex items-center justify-center gap-1.5 mb-1">
                          <i className="fas fa-envelope text-white/70 text-sm"></i>
                          <span className="text-white/70 text-xs font-medium uppercase">Senders</span>
                        </div>
                        <div className="text-4xl font-bold">{sendEmAllResult.totalSendersRequired}</div>
                      </div>
                      <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-4 text-center">
                        <div className="flex items-center justify-center gap-1.5 mb-1">
                          <i className="fas fa-globe text-white/70 text-sm"></i>
                          <span className="text-white/70 text-xs font-medium uppercase">Domains</span>
                        </div>
                        <div className="text-4xl font-bold">{sendEmAllResult.totalDomainsRequired}</div>
                      </div>
                    </div>

                    <div className="bg-white/10 rounded-xl p-4 mb-4">
                      <div className="text-xs text-white/70 mb-3 font-medium">Senders & Domains by ESP</div>
                      <div className="grid grid-cols-3 gap-3">
                        <div className="text-center">
                          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-1">
                            <GoogleIcon className="h-4 w-4" />
                          </div>
                          <div className="text-xl font-bold">{sendEmAllResult.sendersByEsp.google}</div>
                          <div className="text-[10px] text-white/60">Google/MS Workspace</div>
                          {sendEmAllResult.sendersByEsp.google > 0 && (
                            <div className="text-[10px] text-white/80 mt-0.5">
                              across {sendEmAllResult.domainAnalysis.domainsByEsp.google} domain{sendEmAllResult.domainAnalysis.domainsByEsp.google !== 1 ? 's' : ''}
                            </div>
                          )}
                        </div>
                        <div className="text-center">
                          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-1">
                            <MicrosoftIcon className="h-4 w-4" />
                          </div>
                          <div className="text-xl font-bold">{sendEmAllResult.sendersByEsp.outlook}</div>
                          <div className="text-[10px] text-white/60">Azure senders</div>
                          {sendEmAllResult.sendersByEsp.outlook > 0 && (
                            <div className="text-[10px] text-white/80 mt-0.5">
                              across {sendEmAllResult.domainAnalysis.domainsByEsp.outlook} domain{sendEmAllResult.domainAnalysis.domainsByEsp.outlook !== 1 ? 's' : ''}
                            </div>
                          )}
                        </div>
                        <div className="text-center">
                          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-1">
                            <i className="fas fa-server text-white"></i>
                          </div>
                          <div className="text-xl font-bold">{sendEmAllResult.sendersByEsp.custom}</div>
                          <div className="text-[10px] text-white/60">Custom senders</div>
                          {sendEmAllResult.sendersByEsp.custom > 0 && (
                            <div className="text-[10px] text-white/80 mt-0.5">
                              across {sendEmAllResult.domainAnalysis.domainsByEsp.custom} domain{sendEmAllResult.domainAnalysis.domainsByEsp.custom !== 1 ? 's' : ''}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className={`flex items-center justify-center gap-2 py-2 rounded-lg ${
                      sendEmAllResult.summary.canComplete ? 'bg-emerald-500/30' : 'bg-amber-500/30'
                    }`}>
                      {sendEmAllResult.summary.canComplete ? (
                        <>
                          <i className="fas fa-check-circle"></i>
                          <span className="text-sm font-medium">Campaign achievable in {sendEmAllResult.summary.estimatedCompletionDays} days</span>
                        </>
                      ) : (
                        <>
                          <i className="fas fa-exclamation-triangle"></i>
                          <span className="text-sm font-medium">Needs more senders</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )}
              </div>
            </div>
          )}

          {/* Why SendEmAll Section */}
          {sendEmAllResult && genericResult && sendEmAllResult.totalSendersRequired > genericResult.totalSendersRequired && (
            <div className="bg-gradient-to-r from-[#d2b3f3] to-indigo-50 rounded-2xl border border-[#d2b3f3] p-6 mb-8">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-[#d2b3f3] rounded-xl flex items-center justify-center">
                  <i className="fas fa-shield text-[#d2b3f3]"></i>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Why SendEmAll requires more senders</h3>
                  <p className="text-sm text-gray-500">Optimized for deliverability, not just volume</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                <div className="bg-white rounded-xl p-4 border border-[#d2b3f3] shadow-sm">
                  <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center mb-2">
                    <i className="fas fa-check-circle text-emerald-600"></i>
                  </div>
                  <h4 className="font-semibold text-gray-900 text-sm mb-1">Best Deliverability</h4>
                  <p className="text-xs text-gray-500">Smart intervals between emails prevent spam flags</p>
                </div>
                <div className="bg-white rounded-xl p-4 border border-[#d2b3f3] shadow-sm">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mb-2">
                    <i className="fas fa-server text-blue-600"></i>
                  </div>
                  <h4 className="font-semibold text-gray-900 text-sm mb-1">ESP Matching</h4>
                  <p className="text-xs text-gray-500">Sending patterns optimized for each provider</p>
                </div>
                <div className="bg-white rounded-xl p-4 border border-[#d2b3f3] shadow-sm">
                  <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center mb-2">
                    <i className="fas fa-sparkles text-amber-600"></i>
                  </div>
                  <h4 className="font-semibold text-gray-900 text-sm mb-1">Warmup Driven</h4>
                  <p className="text-xs text-gray-500">Gradual ramp-up builds domain reputation</p>
                </div>
                <div className="bg-white rounded-xl p-4 border border-[#d2b3f3] shadow-sm">
                  <div className="w-8 h-8 bg-rose-100 rounded-lg flex items-center justify-center mb-2">
                    <i className="fas fa-shield text-rose-600"></i>
                  </div>
                  <h4 className="font-semibold text-gray-900 text-sm mb-1">Blacklist Protection</h4>
                  <p className="text-xs text-gray-500">Keep your domains off spam lists</p>
                </div>
                <div className="bg-white rounded-xl p-4 border border-[#d2b3f3] shadow-sm">
                  <div className="w-8 h-8 bg-[#d2b3f3] rounded-lg flex items-center justify-center mb-2">
                    <i className="fas fa-globe text-[#d2b3f3]"></i>
                  </div>
                  <h4 className="font-semibold text-gray-900 text-sm mb-1">GDPR Compliant</h4>
                  <p className="text-xs text-gray-500">Privacy-first email handling</p>
                </div>
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="relative overflow-hidden rounded-2xl bg-[#d2b3f3] p-8 md:p-10">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
            <div className="absolute top-0 right-0 w-72 h-72 bg-[#d2b3f3]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-56 h-56 bg-indigo-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />

            <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1 mb-4">
                  <i className="fas fa-sparkles text-[#d2b3f3] text-xs"></i>
                  <span className="text-xs font-medium text-black">Free to get started</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  Ready to launch your campaign?
                </h3>
                <p className="text-white max-w-md">
                  Manage senders, automate warmup, and run campaigns with optimized deliverability.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href="https://app.sendemall.com/register"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white text-gray-900 hover:bg-gray-100 shadow-lg shadow-white/20 h-11 px-6 font-semibold rounded-xl transition-all hover:scale-105"
                >
                  Get Started
                  <i className="fas fa-arrow-right text-sm"></i>
                </a>
                <a
                  href="https://app.sendemall.com/login"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:bg-white/10 h-11 px-6 rounded-xl inline-flex items-center font-medium transition-colors"
                >
                  Sign In
                </a>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Calculator;
