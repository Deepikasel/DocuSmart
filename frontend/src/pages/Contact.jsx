import React, { useState } from "react";
import "../styles/Contact.css";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent successfully 🚀");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="contact-container">

      {/* DOCUMENT BACKGROUND – DIFFERENT ANIMATION */}
      <div className="doc-bg">
        <div className="doc-sheet pulse one"></div>
        <div className="doc-sheet slide two small"></div>
        <div className="doc-sheet pulse three rotate"></div>
        <div className="doc-sheet slide four"></div>
        <div className="doc-sheet pulse five small"></div>
      </div>

      {/* HERO */}
      <section className="contact-hero">
        <h1>
          Get in <span>Touch</span>
        </h1>
        <p>
          Questions about DocuSmart, feedback, or feature requests?
          Reach out and we’ll get back to you.
        </p>
      </section>

      {/* CONTENT */}
      <section className="contact-content">
        <div className="contact-info">
          <h2>Reach Me</h2>
          <p>
            DocuSmart streamlines document management for Users, Reviewers, and Admins.
            Your feedback helps us improve the platform.
          </p>

          <ul>
            <li>📧 Email: support@docusmart.app</li>
            <li>🌍 Global collaboration platform</li>
            <li>🔐 Secure & role-based access</li>
            <li>💡 Feature suggestions welcome</li>
          </ul>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="field">
            <label>Your Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="field">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="field">
            <label>Message</label>
            <textarea
              rows="5"
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Write your message here..."
              required
            />
          </div>

          <button type="submit">Send Message →</button>
        </form>
      </section>
    </div>
  );
}
