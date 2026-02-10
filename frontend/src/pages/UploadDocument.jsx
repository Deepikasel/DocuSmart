import React, { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import "../styles/UploadDocument.css";

export default function UploadDocument() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("description", description);

    try {
      await API.post("/documents", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      alert("Document uploaded successfully");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Upload failed");
    }
  };

  return (
    <div className="upload-container">
      {/* DOCUMENT FLOAT BACKGROUND */}
      <div className="doc-bg">
        <div className="doc-sheet one"></div>
        <div className="doc-sheet two small rotate"></div>
        <div className="doc-sheet three"></div>
        <div className="doc-sheet four small rotate"></div>
        <div className="doc-sheet five"></div>
      </div>

      {/* HERO */}
      <section className="upload-hero">
        <h1>Upload <span>Document</span></h1>
        <p>Easily upload your documents and manage versions securely.</p>
      </section>

      {/* FORM */}
      <section className="upload-form-section">
        <form onSubmit={handleSubmit} className="upload-form">
          <div className="field">
            <input
              type="text"
              placeholder="Title"
              value={title}
              required
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="field">
            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="field">
            <input
              type="file"
              required
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>

          <button type="submit">Upload</button>
        </form>
      </section>
    </div>
  );
}
