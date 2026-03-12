import { useState, useEffect } from "react";
import Header from "../components/Header";
import { sendContactForm } from "../services/mailService";

const contactStyles = `
  .contact-page * { box-sizing: border-box; margin: 0; padding: 0; }

  .contact-page {
    min-height: 100vh;
    background: linear-gradient(135deg, #f3e8ff 0%, #ede9fe 50%, #ddd6fe 100%);
    font-family: 'Segoe UI', sans-serif;
  }

  /* ── Blobs ── */
  .contact-blob {
    position: absolute;
    border-radius: 50%;
    pointer-events: none;
    filter: blur(60px);
  }
  .contact-blob-1 { top: 40px; left: 25%; width: 256px; height: 256px; background: #7c3aed; opacity: 0.2; }
  .contact-blob-2 { bottom: 0; right: 25%; width: 192px; height: 192px; background: #a78bfa; opacity: 0.15; }

  /* ── Hero ── */
  .contact-hero {
    position: relative;
    overflow: hidden;
    padding: 96px 16px 56px;
    text-align: center;
  }

  .contact-fade {
    transition: opacity 0.7s ease, transform 0.7s ease;
  }
  .contact-fade.hidden { opacity: 0; transform: translateY(28px); }
  .contact-fade.visible { opacity: 1; transform: translateY(0); }

  .contact-badge {
    display: inline-block;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    padding: 6px 16px;
    border-radius: 999px;
    margin-bottom: 20px;
    background: rgba(124,58,237,0.1);
    color: #7c3aed;
    border: 1px solid rgba(124,58,237,0.2);
  }

  .contact-hero-title {
    font-size: clamp(30px, 6vw, 48px);
    font-weight: 900;
    color: #4c1d95;
    line-height: 1.2;
    margin-bottom: 16px;
  }
  .contact-hero-title span { color: #7c3aed; }

  .contact-hero-sub {
    font-size: 14px;
    color: #6b21a8;
    max-width: 440px;
    margin: 0 auto;
    line-height: 1.7;
  }

  /* ── Section Wrapper ── */
  .contact-section {
    padding: 0 16px 48px;
    max-width: 1000px;
    margin: 0 auto;
  }

  /* ── Contact Cards ── */
  .contact-cards-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
    margin-bottom: 48px;
  }
  @media (min-width: 600px) { .contact-cards-grid { grid-template-columns: repeat(3, 1fr); } }

  .contact-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 24px;
    border-radius: 24px;
    background: rgba(255,255,255,0.75);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(167,139,250,0.25);
    box-shadow: 0 4px 20px rgba(124,58,237,0.08);
    transition: transform 0.3s ease;
  }
  .contact-card:hover { transform: translateY(-4px); }

  .contact-card-icon {
    width: 48px; height: 48px;
    border-radius: 14px;
    display: flex; align-items: center; justify-content: center;
    font-size: 22px;
    margin-bottom: 12px;
    background: linear-gradient(135deg, #ede9fe, #ddd6fe);
  }
  .contact-card-title { font-size: 13px; font-weight: 900; color: #4c1d95; margin-bottom: 4px; }
  .contact-card-value { font-size: 13px; font-weight: 600; color: #7c3aed; margin-bottom: 2px; }
  .contact-card-sub { font-size: 11px; color: #9d8ec7; }

  /* ── Form + FAQ Layout ── */
  .contact-main-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 24px;
  }
  @media (min-width: 900px) { .contact-main-grid { grid-template-columns: 3fr 2fr; } }

  /* ── Form Panel ── */
  .contact-form-panel {
    border-radius: 28px;
    padding: 32px;
    background: rgba(255,255,255,0.8);
    backdrop-filter: blur(16px);
    border: 1px solid rgba(167,139,250,0.25);
    box-shadow: 0 8px 32px rgba(124,58,237,0.1);
  }

  .contact-form-title { font-size: 20px; font-weight: 900; color: #4c1d95; margin-bottom: 4px; }
  .contact-form-sub { font-size: 12px; color: #7c3aed; margin-bottom: 24px; }

  .contact-form-fields { display: flex; flex-direction: column; gap: 16px; }

  .contact-row {
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
  }
  @media (min-width: 500px) { .contact-row { grid-template-columns: 1fr 1fr; } }

  .contact-field { display: flex; flex-direction: column; gap: 6px; }
  .contact-label { font-size: 12px; font-weight: 700; color: #4c1d95; }

  .contact-input {
    width: 100%;
    background: rgba(255,255,255,0.8);
    border: 1.5px solid rgba(167,139,250,0.3);
    border-radius: 14px;
    padding: 12px 16px;
    font-size: 14px;
    color: #4c1d95;
    outline: none;
    transition: all 0.2s ease;
    font-family: 'Segoe UI', sans-serif;
  }
  .contact-input:focus {
    border-color: #7c3aed;
    box-shadow: 0 0 0 4px rgba(124,58,237,0.08);
  }
  .contact-input::placeholder { color: #c4b5fd; }

  textarea.contact-input { resize: none; line-height: 1.6; }
  select.contact-input { cursor: pointer; }

  /* Submit Button */
  .contact-submit {
    width: 100%;
    height: 48px;
    border-radius: 14px;
    font-size: 14px;
    font-weight: 900;
    color: white;
    border: none;
    cursor: pointer;
    background: linear-gradient(135deg, #7c3aed, #5b21b6);
    box-shadow: 0 6px 20px rgba(124,58,237,0.4);
    transition: transform 0.3s ease, opacity 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }
  .contact-submit:hover { transform: scale(1.02); }
  .contact-submit:active { transform: scale(0.98); }
  .contact-submit:disabled { opacity: 0.85; cursor: not-allowed; transform: none; }

  /* Spinner */
  .contact-spinner {
    width: 16px; height: 16px;
    border-radius: 50%;
    border: 2px solid white;
    border-top-color: transparent;
    animation: contact-spin 0.7s linear infinite;
  }
  @keyframes contact-spin { to { transform: rotate(360deg); } }

  /* Success State */
  .contact-success {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 48px 16px;
    text-align: center;
    gap: 16px;
  }
  .contact-success-icon {
    width: 80px; height: 80px;
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 36px;
    background: linear-gradient(135deg, #ede9fe, #ddd6fe);
  }
  .contact-success-title { font-size: 22px; font-weight: 900; color: #4c1d95; }
  .contact-success-sub { font-size: 13px; color: #6b21a8; max-width: 280px; line-height: 1.6; }
  .contact-success-sub strong { color: #4c1d95; }

  .contact-retry-btn {
    margin-top: 8px;
    padding: 10px 24px;
    border-radius: 12px;
    font-size: 13px;
    font-weight: 700;
    color: white;
    border: none;
    cursor: pointer;
    background: linear-gradient(135deg, #7c3aed, #5b21b6);
    transition: transform 0.3s ease;
  }
  .contact-retry-btn:hover { transform: scale(1.05); }

  /* ── FAQ Panel ── */
  .contact-faq-panel { display: flex; flex-direction: column; gap: 12px; }

  .contact-faq-label {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #7c3aed;
    margin-bottom: 2px;
  }
  .contact-faq-heading { font-size: 20px; font-weight: 900; color: #4c1d95; margin-bottom: 4px; }

  /* FAQ Accordion */
  .contact-faq-item {
    border-radius: 18px;
    overflow: hidden;
    cursor: pointer;
    background: rgba(255,255,255,0.75);
    backdrop-filter: blur(12px);
    transition: border 0.2s ease, box-shadow 0.2s ease;
  }
  .contact-faq-item.open {
    border: 1.5px solid rgba(124,58,237,0.35) !important;
    box-shadow: 0 4px 20px rgba(124,58,237,0.1);
  }
  .contact-faq-item.closed { border: 1px solid rgba(167,139,250,0.2); }

  .contact-faq-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 16px;
    gap: 12px;
  }
  .contact-faq-q { font-size: 12px; font-weight: 700; color: #4c1d95; line-height: 1.4; flex: 1; }
  .contact-faq-icon {
    font-size: 18px;
    color: #7c3aed;
    flex-shrink: 0;
    transition: transform 0.3s ease;
    font-weight: 400;
    line-height: 1;
  }
  .contact-faq-icon.open { transform: rotate(45deg); }

  .contact-faq-body {
    overflow: hidden;
    transition: max-height 0.3s ease;
  }
  .contact-faq-a { padding: 0 16px 14px; font-size: 12px; color: #6b21a8; line-height: 1.6; }

  /* Social Box */
  .contact-social-box {
    padding: 20px;
    border-radius: 20px;
    background: rgba(255,255,255,0.7);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(167,139,250,0.2);
  }
  .contact-social-label {
    font-size: 11px;
    font-weight: 900;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #7c3aed;
    margin-bottom: 12px;
  }
  .contact-social-btns { display: flex; gap: 8px; flex-wrap: wrap; }

  .contact-social-btn {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 8px 12px;
    border-radius: 10px;
    font-size: 12px;
    font-weight: 700;
    color: #6b21a8;
    background: rgba(124,58,237,0.08);
    border: 1px solid rgba(167,139,250,0.2);
    cursor: pointer;
    transition: transform 0.2s ease, background 0.2s ease;
  }
  .contact-social-btn:hover { transform: scale(1.05); background: rgba(124,58,237,0.14); }

  /* ── Footer ── */
  .contact-footer { background: linear-gradient(135deg, #2e1065, #4c1d95); }
  .contact-footer-wave { display: block; width: 100%; height: 40px; line-height: 0; }
  .contact-footer-inner {
    padding: 20px 24px;
    max-width: 1000px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    color: #9d8ec7;
  }
  @media (min-width: 600px) { .contact-footer-inner { flex-direction: row; justify-content: space-between; } }
  .contact-footer-inner strong { color: white; }
  .contact-footer-heart { color: #f472b6; }
`;

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`contact-faq-item ${open ? "open" : "closed"}`}
      onClick={() => setOpen(!open)}
    >
      <div className="contact-faq-header">
        <p className="contact-faq-q">{q}</p>
        <span className={`contact-faq-icon ${open ? "open" : ""}`}>+</span>
      </div>
      <div className="contact-faq-body" style={{ maxHeight: open ? "120px" : "0px" }}>
        <p className="contact-faq-a">{a}</p>
      </div>
    </div>
  );
}

export default function Contact() {
  const [visible, setVisible] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => { setTimeout(() => setVisible(true), 100); }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) return;
    setSubmitting(true);
    try {
      await sendContactForm(form);
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      // optionally show a user notification/error
      alert(err.message || "Failed to send message");
    } finally {
      setSubmitting(false);
    }
  };

  const contactCards = [
    { icon: "📧", title: "Email Us",     value: "hello@healthhub.app", sub: "We reply within 24 hours" },
    { icon: "💬", title: "Live Chat",    value: "Available in App",    sub: "Mon – Fri, 9am – 6pm" },
    { icon: "📍", title: "Location",     value: "Remote-first Team",   sub: "Serving users worldwide" },
  ];

  const faqs = [
    { q: "Is HealthHub completely free?",  a: "Yes! All 8 modules are 100% free with no hidden charges or subscriptions." },
    { q: "Is my health data safe?",        a: "Absolutely. Your data stays on your device and is never shared with third parties." },
    { q: "Can I use it on mobile?",        a: "HealthHub is fully responsive and works seamlessly on all screen sizes." },
    { q: "How do I report a bug?",         a: "Use the contact form above or email us directly and we'll fix it ASAP." },
  ];

  const subjects = ["General Inquiry", "Bug Report", "Feature Request", "Partnership", "Medical Advice", "Other"];

  const socials = [
    { icon: "𝕏",  label: "Twitter" },
    { icon: "f",  label: "Facebook" },
    { icon: "in", label: "LinkedIn" },
    { icon: "📷", label: "Instagram" },
  ];

  return (
    <>
     <Header/>
      <style>{contactStyles}</style>

      <div className="contact-page">
       

        {/* ── Hero ── */}
        <div className="contact-hero">
          <div className="contact-blob contact-blob-1" />
          <div className="contact-blob contact-blob-2" />

          <div className={`contact-fade ${visible ? "visible" : "hidden"}`}>
            <span className="contact-badge">✦ Get In Touch</span>
            <h1 className="contact-hero-title">
              We'd Love to <span>Hear</span><br />From You
            </h1>
            <p className="contact-hero-sub">
              Have a question, suggestion, or just want to say hi? Our team is here to help you every step of the way.
            </p>
          </div>
        </div>

        <div className="contact-section">

          {/* ── Contact Cards ── */}
          <div className="contact-cards-grid">
            {contactCards.map(({ icon, title, value, sub }) => (
              <div key={title} className="contact-card">
                <div className="contact-card-icon">{icon}</div>
                <p className="contact-card-title">{title}</p>
                <p className="contact-card-value">{value}</p>
                <p className="contact-card-sub">{sub}</p>
              </div>
            ))}
          </div>

          {/* ── Form + FAQ ── */}
          <div className="contact-main-grid">

            {/* Form */}
            <div className="contact-form-panel">
              {!submitted ? (
                <>
                  <p className="contact-form-title">Send a Message</p>
                  <p className="contact-form-sub">Fill in the form and we'll get back to you shortly.</p>

                  <div className="contact-form-fields">
                    <div className="contact-row">
                      <div className="contact-field">
                        <label className="contact-label">Full Name *</label>
                        <input
                          className="contact-input"
                          name="name" value={form.name}
                          onChange={handleChange} placeholder="John Doe"
                        />
                      </div>
                      <div className="contact-field">
                        <label className="contact-label">Email Address *</label>
                        <input
                          className="contact-input"
                          name="email" type="email" value={form.email}
                          onChange={handleChange} placeholder="john@email.com"
                        />
                      </div>
                    </div>

                    <div className="contact-field">
                      <label className="contact-label">Subject</label>
                      <select
                        className="contact-input"
                        name="subject" value={form.subject} onChange={handleChange}
                      >
                        <option value="">Select a topic...</option>
                        {subjects.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>

                    <div className="contact-field">
                      <label className="contact-label">Message *</label>
                      <textarea
                        className="contact-input"
                        name="message" value={form.message}
                        onChange={handleChange}
                        placeholder="Tell us how we can help you..."
                        rows={5}
                      />
                    </div>

                    <button
                      className="contact-submit"
                      onClick={handleSubmit}
                      disabled={submitting}
                      style={{ background: submitting ? "linear-gradient(135deg,#a78bfa,#7c3aed)" : "linear-gradient(135deg,#7c3aed,#5b21b6)" }}
                    >
                      {submitting
                        ? <><div className="contact-spinner" /> Sending...</>
                        : <>Send Message 💬</>
                      }
                    </button>
                  </div>
                </>
              ) : (
                <div className="contact-success">
                  <div className="contact-success-icon">✅</div>
                  <p className="contact-success-title">Message Sent!</p>
                  <p className="contact-success-sub">
                    Thanks for reaching out, <strong>{form.name}</strong>! We'll get back to you at <strong>{form.email}</strong> within 24 hours.
                  </p>
                  <button
                    className="contact-retry-btn"
                    onClick={() => { setSubmitted(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
                  >
                    Send Another
                  </button>
                </div>
              )}
            </div>

            {/* FAQ + Social */}
            <div className="contact-faq-panel">
              <div>
                <p className="contact-faq-label">Quick Answers</p>
                <p className="contact-faq-heading">FAQs</p>
              </div>

              {faqs.map(({ q, a }, i) => <FaqItem key={i} q={q} a={a} />)}

              <div className="contact-social-box">
                <p className="contact-social-label">Find Us Online</p>
                <div className="contact-social-btns">
                  {socials.map(({ icon, label }) => (
                    <button key={label} className="contact-social-btn">
                      <span>{icon}</span>{label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Footer ── */}
        <footer className="contact-footer">
          <svg className="contact-footer-wave" viewBox="0 0 1440 50" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0,25 C360,55 1080,0 1440,25 L1440,0 L0,0 Z" fill="#ddd6fe" />
          </svg>
          <div className="contact-footer-inner">
            <p>© {new Date().getFullYear()} <strong>HealthHub</strong>. All rights reserved.</p>
            <p>Made with <span className="contact-footer-heart">❤️</span> for a healthier you</p>
          </div>
        </footer>

      </div>
    </>
  );
}