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
        {/* INFO */}
        <div className="contact-info">
          <h2>Reach Me</h2>
          <p>
            DocuSmart streamlines document management for Users, Reviewers, and Admins.
            Whether it’s about uploading, reviewing, or system management, your feedback
            helps us make it better.
          </p>

          <ul>
            <li>📧 Email: support@docusmart.app</li>
            <li>🌍 Global platform for teams and organizations</li>
            <li>🔐 Secure, role-based access and data privacy</li>
            <li>💡 Suggestions for new features are welcome!</li>
          </ul>
        </div>

        {/* FORM */}
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

          <button type="submit">
            Send Message →
          </button>
        </form>
      </section>
    </div>
  );
}
