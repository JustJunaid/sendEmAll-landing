const HowItWorks = () => {
  const steps = [
    {
      number: 1,
      title: 'Add Your Domain',
      description:
        'We generate SPF, DKIM, DMARC records automatically and start warming up your domain. No technical setup required.',
    },
    {
      number: 2,
      title: 'Test & Tune',
      description:
        'Run Inbox Placement Tests, verify your lead list, and refine your copy with AI feedback before sending.',
    },
    {
      number: 3,
      title: 'Send With Confidence',
      description:
        'Launch campaigns via Gmail, Outlook, or our infrastructure. Watch your inbox rates soar with real-time monitoring.',
    },
  ];

  return (
    <section className="how-it-works" id="how-it-works">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">How It Works</div>
          <h2 className="section-title">From Domain to Deliverability in 3 Steps</h2>
          <p>Set up your cold outreach infrastructure in minutes. Start landing in inboxes today.</p>
        </div>

        <div className="steps-grid">
          {steps.map((step) => (
            <div className="step reveal-element" key={step.number}>
              <div className="step-number">{step.number}</div>
              <div className="step-content">
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
