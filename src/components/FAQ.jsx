import { useState } from 'react';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: 'How do Inbox Placement Tests work?',
      answer:
        'We send test emails from your domain to real Gmail, Outlook, and Yahoo inboxes, then report back exactly where they land (Inbox, Promotions, or Spam). You get a live screenshot and actionable fixes.',
    },
    {
      question: "What's included in the free test?",
      answer:
        '2 placement tests (you can test 2 different subject lines or sending setups), live inbox screenshots, spam score analysis, and a deliverability report with specific fixes.',
    },
    {
      question: 'Can I use my own domain or send via Gmail?',
      answer:
        'Yes! Connect your own domain for better deliverability, or send through Gmail/Google Workspace. We support SMTP, API, and direct Gmail integration.',
    },
    {
      question: 'Do credits expire?',
      answer:
        'No. Buy credits once, use them whenever you need placement tests. Perfect for agencies managing multiple clients or businesses with seasonal campaigns.',
    },
    {
      question: 'How accurate are deliverability reports?',
      answer:
        'Our placement tests use real email accounts at major providers (not simulated), so you get actual inbox placement results. We also include spam score analysis and authentication checks.',
    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="faq" id="faq">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">FAQ</div>
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p>Everything you need to know about SendEmAll</p>
        </div>

        <div className="faq-container">
          {faqs.map((faq, index) => (
            <div className={`faq-item ${activeIndex === index ? 'active' : ''}`} key={index}>
              <div
                className="faq-question"
                onClick={() => toggleFAQ(index)}
                role="button"
                tabIndex={0}
                aria-expanded={activeIndex === index}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleFAQ(index);
                  }
                }}
              >
                {faq.question}
              </div>
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
