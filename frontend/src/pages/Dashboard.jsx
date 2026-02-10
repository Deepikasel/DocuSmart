import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import FullDocumentModal from "../components/FullDocumentModal";
import DocumentChatbot from "../components/DocumentChatbot";
import "../styles/Dashboard.css";

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [docs, setDocs] = useState([]);
  const [versionIndex, setVersionIndex] = useState({});
  const [fileUrl, setFileUrl] = useState("");
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState({});

  const fetchDocs = async () => {
    const res = await API.get("/documents");
    setDocs(res.data);

    const map = {};
    res.data.forEach(d => (map[d._id] = d.versions.length - 1));
    setVersionIndex(map);
  };

  useEffect(() => {
    fetchDocs();
  }, []);

  return (
    <div className="dashboard-container">

      {/* HEADER */}
      <div className="dashboard-header">
        <h2>{user.role.toUpperCase()} DASHBOARD</h2>

        {user.role !== "reviewer" && (
          <button
            className="upload-btn"
            onClick={() => navigate("/upload")}
          >
            ⬆ Upload Document
          </button>
        )}
      </div>

      {docs.map(doc => {
        const idx = versionIndex[doc._id];
        const v = doc.versions[idx];

        const isOwner = user._id === doc.owner;
        const canModify = user.role === "admin" || isOwner;

        return (
          <div key={doc._id} className="doc-card">
            <h3>{doc.title}</h3>
            <p><b>Version {v.versionNumber}</b></p>

            {/* ✅ SUMMARY AS BULLETS */}
            <div className="summary-box">
              <h4>📌 Summary</h4>
              <ul>
                {v.summary
                  ?.split(".")
                  .filter(s => s.trim())
                  .map((point, i) => (
                    <li key={i}>✔ {point.trim()}</li>
                  ))}
              </ul>
            </div>

            <button
              className="view-btn"
              onClick={() => {
                setFileUrl(`http://localhost:5000${v.fileUrl}`);
                setOpen(true);
              }}
            >
              📄 View Document
            </button>

            <button
              className="nav-btn"
              disabled={idx === 0}
              onClick={() =>
                setVersionIndex(p => ({ ...p, [doc._id]: idx - 1 }))
              }
            >
              ⬅ Prev
            </button>

            <button
              className="nav-btn"
              disabled={idx === doc.versions.length - 1}
              onClick={() =>
                setVersionIndex(p => ({ ...p, [doc._id]: idx + 1 }))
              }
            >
              Next ➡
            </button>

            {user.role !== "reviewer" && (
              <button
                className="resummarize-btn"
                onClick={async () => {
                  await API.post(`/documents/resummarize/${doc._id}`);
                  fetchDocs();
                }}
              >
                🔄 Resummarize
              </button>
            )}

            {canModify && (
              <button
                className="delete-btn"
                disabled={doc.versions.length === 1}
                onClick={async () => {
                  await API.delete(
                    `/documents/${doc._id}/version/${v.versionNumber}`
                  );
                  fetchDocs();
                }}
              >
                🗑 Delete This Version
              </button>
            )}

            {canModify && (
              <button
                className="delete-btn"
                onClick={async () => {
                  await API.delete(`/documents/${doc._id}`);
                  fetchDocs();
                }}
              >
                ❌ Delete Document
              </button>
            )}

           {(user.role === "admin" || isOwner) && (
  <button
    onClick={async () => {
      const res = await API.get(`/comments/${doc._id}`);
      setComments(prev => ({
        ...prev,
        [doc._id]: res.data
      }));
    }}
  >
    💬 View Reviewer Comments
  </button>
)}


            {user.role === "reviewer" && (
              <>
                <textarea
                  placeholder="Reviewer comment..."
                  value={comment}
                  onChange={e => setComment(e.target.value)}
                />
                <button
                  className="comment-btn"
                  onClick={async () => {
                    await API.post("/comments", {
                      documentId: doc._id,
                      versionNumber: v.versionNumber,
                      text: comment
                    });
                    setComment("");
                  }}
                >
                  💬 Comment
                </button>
              </>
            )}

            {comments[doc._id] && (
  <div className="comments-box">
    <h4>📝 Reviewer Feedback</h4>

    {comments[doc._id].length === 0 ? (
      <p>No feedback yet</p>
    ) : (
      comments[doc._id].map(c => (
        <div key={c._id} className="comment-item">
          <p>
            <b>{c.user.name}</b> (Reviewer) – Version {c.versionNumber}
          </p>
          <p>👉 {c.text}</p>
        </div>
      ))
    )}
  </div>
)}


            <DocumentChatbot documentId={doc._id} />
          </div>
        );
      })}

      <FullDocumentModal
        open={open}
        onClose={() => setOpen(false)}
        fileUrl={fileUrl}
      />
    </div>
  );
}
