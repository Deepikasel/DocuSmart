import React from "react";
import "../styles/Modal.css";

export default function FullDocumentModal({ open, onClose, fileUrl }) {
  if (!open) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <button className="close-btn" onClick={onClose}>✖</button>

        <iframe
          src={fileUrl}
          width="100%"
          height="600"
          title="Document Viewer"
        />
      </div>
    </div>
  );
}
