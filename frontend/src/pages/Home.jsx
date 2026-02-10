import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      {/* HERO SECTION */}
      {/* BACKGROUND DOCUMENT ANIMATION */}
<div className="doc-bg">
  <div className="doc-sheet one"></div>
  <div className="doc-sheet two small rotate"></div>
  <div className="doc-sheet three"></div>
  <div className="doc-sheet four small"></div>
  <div className="doc-sheet five rotate"></div>
</div>

      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            DocuSmart <span>Document Management</span>
          </h1>

          <p className="hero-subtitle">
            Upload documents, manage versions, generate summaries,
            review with comments, and control everything with role-based access.
          </p>

          <div className="hero-buttons">
            <button
              className="btn primary"
              onClick={() => navigate("/login")}
            >
              Get Started
            </button>

            <button
              className="btn secondary"
              onClick={() => navigate("/about")}
            >
              Learn More
            </button>
          </div>
        </div>

        <div className="hero-visual">
          <div className="floating-card">Version 1</div>
          <div className="floating-card delay">Version 2</div>
          <div className="floating-card delay-2">Version 3</div>
        </div>
      </section>

      {/* ROLE BASED FEATURES */}
      <section className="features">
        <h2>How DocuSmart Works</h2>

        <div className="feature-grid">
          {/* USER */}
          <div className="feature-card">
            <h3>👤 User</h3>
            <ul>
              <li>Upload documents</li>
              <li>Auto summary generation</li>
              <li>View document versions</li>
              <li>Resummarize documents</li>
            </ul>
          </div>

          {/* REVIEWER */}
          <div className="feature-card">
            <h3>🧑‍⚖️ Reviewer</h3>
            <ul>
              <li>View all documents</li>
              <li>Read summaries</li>
              <li>Add comments per version</li>
              <li>Track review history</li>
            </ul>
          </div>

          {/* ADMIN */}
          <div className="feature-card">
            <h3>🛠 Admin</h3>
            <ul>
              <li>Upload & delete documents</li>
              <li>View reviewer comments</li>
              <li>Manage all versions</li>
              <li>Full system control</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <h2>Ready to Manage Documents Smarter?</h2>
        <button
          className="btn primary"
          onClick={() => navigate("/register")}
        >
          Create Account
        </button>
      </section>
    </div>
  );
}
