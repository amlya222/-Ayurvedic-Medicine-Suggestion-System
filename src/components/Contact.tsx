import React from 'react';
import './Contact.css';

const Contact: React.FC = () => {
  return (
    <main className="main">
      <section className="contact-page">
        <h1 className="page-title">Contact Us</h1>
        
        <div className="contact-content">
          <div className="contact-info">
            <h2 className="section-title">Get in Touch</h2>
            <p className="contact-description">
              Have questions about our Ayurvedic Medicine Suggestion System? 
              We're here to help! Reach out to us through any of the following channels.
            </p>
            
            <div className="contact-methods">
              <div className="contact-method">
                <div className="contact-icon">📧</div>
                <div className="contact-details">
                  <h3 className="method-title">Email</h3>
                  <p className="method-info">support@ayurvedicmedicine.com</p>
                  <p className="method-description">For general inquiries and support</p>
                </div>
              </div>

              <div className="contact-method">
                <div className="contact-icon">💬</div>
                <div className="contact-details">
                  <h3 className="method-title">Live Chat</h3>
                  <p className="method-info">Available 24/7</p>
                  <p className="method-description">Get instant help from our support team</p>
                </div>
              </div>

              <div className="contact-method">
                <div className="contact-icon">📞</div>
                <div className="contact-details">
                  <h3 className="method-title">Phone</h3>
                  <p className="method-info">+1 (555) 123-4567</p>
                  <p className="method-description">Monday to Friday, 9 AM - 6 PM EST</p>
                </div>
              </div>

              <div className="contact-method">
                <div className="contact-icon">📍</div>
                <div className="contact-details">
                  <h3 className="method-title">Address</h3>
                  <p className="method-info">123 Ayurvedic Way, Wellness City, WC 12345</p>
                  <p className="method-description">Visit our office for in-person consultations</p>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-form-section">
            <h2 className="section-title">Send us a Message</h2>
            <form className="contact-form">
              <div className="form-group">
                <label htmlFor="name" className="form-label">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-input"
                  placeholder="Your full name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-input"
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject" className="form-label">Subject</label>
                <select id="subject" name="subject" className="form-input" required>
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="technical">Technical Support</option>
                  <option value="feedback">Feedback</option>
                  <option value="partnership">Partnership</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="message" className="form-label">Message</label>
                <textarea
                  id="message"
                  name="message"
                  className="form-textarea"
                  placeholder="Tell us how we can help you..."
                  rows={5}
                  required
                ></textarea>
              </div>

              <button type="submit" className="submit-button">
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="faq-section">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <div className="faq-container">
            <div className="faq-item">
              <h3 className="faq-question">How accurate are the medicine suggestions?</h3>
              <p className="faq-answer">
                Our system provides recommendations based on Ayurvedic principles and general guidelines. 
                However, individual results may vary, and we always recommend consulting with a qualified 
                Ayurvedic practitioner for personalized advice.
              </p>
            </div>

            <div className="faq-item">
              <h3 className="faq-question">Is the system free to use?</h3>
              <p className="faq-answer">
                Yes, our basic medicine suggestion service is completely free. We believe in making 
                Ayurvedic knowledge accessible to everyone.
              </p>
            </div>

            <div className="faq-item">
              <h3 className="faq-question">Can I use this system for serious health conditions?</h3>
              <p className="faq-answer">
                This system is designed for general wellness and minor health concerns. For serious 
                health conditions, please consult with a healthcare professional immediately.
              </p>
            </div>

            <div className="faq-item">
              <h3 className="faq-question">How do you protect my privacy?</h3>
              <p className="faq-answer">
                We take your privacy seriously. All health information you provide is encrypted and 
                used only for generating recommendations. We never share your personal data with third parties.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact; 