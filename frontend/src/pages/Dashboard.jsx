import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import FullDocumentModal from "../components/FullDocumentModal";
import "../styles/Dashboard.css";

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [docs, setDocs] = useState([]);
  const [versionIndex, setVersionIndex] = useState({});
  const [fileUrl, setFileUrl] = useState("");
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState({}); // ✅ object, not array

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
      <h2>{user.role.toUpperCase()} DASHBOARD</h2>

      {/* UPLOAD BUTTON */}
      {user.role !== "reviewer" && (
        <button className="upload-btn" onClick={() => navigate("/upload")}>
          ⬆ Upload Document
        </button>
      )}

      {docs.map(doc => {
        const idx = versionIndex[doc._id];
        const v = doc.versions[idx];

        return (
          <div key={doc._id} className="doc-card">
            <h3>{doc.title}</h3>

            <p><b>Version {v.versionNumber}</b></p>
            <p>{v.summary}</p>

            <button
              onClick={() => {
                setFileUrl(`http://localhost:5000${v.fileUrl}`);
                setOpen(true);
              }}
            >
              📄 View Document
            </button>

            <button
              disabled={idx === 0}
              onClick={() =>
                setVersionIndex(p => ({ ...p, [doc._id]: idx - 1 }))
              }
            >
              ⬅ Prev
            </button>

            <button
              disabled={idx === doc.versions.length - 1}
              onClick={() =>
                setVersionIndex(p => ({ ...p, [doc._id]: idx + 1 }))
              }
            >
              Next ➡
            </button>

            {/* USER + ADMIN */}
            {user.role !== "reviewer" && (
              <button
                onClick={async () => {
                  await API.post(`/documents/resummarize/${doc._id}`);
                  fetchDocs();
                }}
              >
                🔄 Resummarize
              </button>
            )}

            {/* ADMIN ONLY */}
            {user.role === "admin" && (
              <>
                <button
                  onClick={async () => {
                    await API.delete(`/documents/${doc._id}`);
                    fetchDocs();
                  }}
                >
                  🗑 Delete
                </button>

                <button
                  onClick={async () => {
                    const res = await API.get(`/comments/${doc._id}`);
                    setComments(prev => ({
                      ...prev,
                      [doc._id]: res.data
                    }));
                  }}
                >
                  👀 View Comments
                </button>
              </>
            )}

            {/* REVIEWER ONLY */}
            {user.role === "reviewer" && (
              <>
                <textarea
                  placeholder="Reviewer comment..."
                  value={comment}
                  onChange={e => setComment(e.target.value)}
                />
                <button
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

            {/* ✅ COMMENTS INSIDE DOCUMENT CARD */}
            {comments[doc._id] && (
              <div className="comments-box">
                <h4>💬 Comments</h4>

                {comments[doc._id].length === 0 ? (
                  <p>No comments yet</p>
                ) : (
                  comments[doc._id].map(c => (
                    <p key={c._id}>
                      <b>{c.user.name}</b>: {c.text} (v{c.versionNumber})
                    </p>
                  ))
                )}
              </div>
            )}
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
