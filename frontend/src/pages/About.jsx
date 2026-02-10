import React from "react";
import "../styles/About.css";

export default function About() {
  return (
    <div className="about-container">
      {/* HERO */}
       <div className="doc-bg">
    <div className="doc-sheet one"></div>
    <div className="doc-sheet two small rotate"></div>
    <div className="doc-sheet three"></div>
    <div className="doc-sheet four small"></div>
    <div className="doc-sheet five rotate"></div>
  </div>
      <section className="about-hero">
        <h1>
          About <span>DocuSmart</span>
        </h1>
        <p>
          DocuSmart is a smart document management platform that combines version control, summaries, 
          and collaborative review — all with role-based access.
        </p>
      </section>

      {/* WHY DOCUSMART */}
      <section className="about-section">
        <h2>Why Use DocuSmart?</h2>
        <p>
          Managing documents manually can lead to lost edits, overwritten files, and confusion in collaboration.
          DocuSmart simplifies this process by providing structured document versioning, automatic summaries,
          and easy review workflows for different user roles.
        </p>
      </section>

      {/* FEATURES */}
      <section className="about-section grid">
        {/* USER */}
        <div className="about-card">
          <h3>👤 User Features</h3>
          <ul>
            <li>Upload documents</li>
            <li>Automatic summary generation</li>
            <li>View and track all document versions</li>
            <li>Request resummarization of documents</li>
          </ul>
        </div>

        {/* REVIEWER */}
        <div className="about-card">
          <h3>🧑‍⚖️ Reviewer Features</h3>
          <ul>
            <li>Access all documents</li>
            <li>Read summaries per version</li>
            <li>Add comments and review feedback</li>
            <li>Track review history</li>
          </ul>
        </div>

        {/* ADMIN */}
        <div className="about-card">
          <h3>🛠 Admin Features</h3>
          <ul>
            <li>Upload, delete, and manage all documents</li>
            <li>View reviewer comments</li>
            <li>Manage all document versions</li>
            <li>Full system control and audit tracking</li>
          </ul>
        </div>

        {/* SMART FUNCTIONALITY */}
        
         
      </section>

      {/* TECH STACK */}
      <section className="about-section">
        <h2>Technology Stack</h2>
        <p className="tech">
          <span>React</span>
          <span>Node.js</span>
          <span>Express</span>
          <span>MongoDB</span>
          <span>JWT</span>
          <span>Multer</span>
        </p>
      </section>

      {/* FOOTER NOTE */}
      <section className="about-footer">
        <p>
          DocuSmart ensures secure, collaborative, and transparent document management for users, reviewers, 
          and admins alike — perfect for professional, academic, or enterprise environments.
        </p>
      </section>
    </div>
  );
}
