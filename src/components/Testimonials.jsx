const Testimonials = () => {
  const testimonials = [
    {
      quote:
        'Generated $180K in new revenue in 3 months. Our cold email campaigns finally reach decision-makers instead of spam folders.',
      author: 'David M.',
      role: 'Sales Director • SaaS Company',
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face&auto=format',
    },
    {
      quote:
        'Tripled our qualified lead pipeline. The real-time delivery insights help us fix issues before they hurt our campaigns.',
      author: 'Alex P.',
      role: 'Growth Lead • Marketing Agency',
      avatar:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face&auto=format',
    },
    {
      quote:
        'Closed 40% more deals this quarter. No more emails stuck in spam - our prospects actually receive and respond to our outreach.',
      author: 'Lisa K.',
      role: 'VP Sales • Enterprise Software',
      avatar:
        'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face&auto=format',
    },
  ];

  return (
    <section className="testimonials" id="testimonials">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">Success Stories</div>
          <h2 className="section-title">Scale Your Revenue with Email That Actually Works</h2>
          <p>
            Join 154+ businesses using SendEmAll to turn cold prospects into paying customers through proven
            email campaigns that reach the inbox.
          </p>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div className="testimonial-card reveal-element" key={index}>
              <div className="testimonial-content">
                <p>"{testimonial.quote}"</p>
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.author}
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '2px solid #e5e7eb',
                    }}
                    loading="lazy"
                  />
                </div>
                <div className="author-info">
                  <div className="author-name">{testimonial.author}</div>
                  <div className="author-title">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
