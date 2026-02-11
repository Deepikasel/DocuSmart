import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import DocumentChatbot from "../components/DocumentChatbot";
import "../styles/Dashboard.css";

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [docs, setDocs] = useState([]);
  const [versionIndex, setVersionIndex] = useState({});
  const [commentText, setCommentText] = useState("");
  const [showComments, setShowComments] = useState({});

  const fetchDocs = async () => {
    const res = await API.get("/documents");
    setDocs(res.data || []);

    const map = {};
    (res.data || []).forEach(d => {
      map[d._id] = d.versions.length - 1;
    });
    setVersionIndex(map);
  };

  useEffect(() => {
    fetchDocs();
  }, []);

  const prevVersion = (docId) => {
    setVersionIndex(p => ({
      ...p,
      [docId]: Math.max((p[docId] ?? 0) - 1, 0)
    }));
  };

  const nextVersion = (docId, max) => {
    setVersionIndex(p => ({
      ...p,
      [docId]: Math.min((p[docId] ?? 0) + 1, max)
    }));
  };

  const deleteVersion = async (docId, versionNumber) => {
    if (!window.confirm("Delete this version?")) return;
    await API.delete(`/documents/${docId}/version/${versionNumber}`);
    fetchDocs();
  };

  const deleteDocument = async (docId) => {
    if (!window.confirm("Delete entire document?")) return;
    await API.delete(`/documents/${docId}`);
    fetchDocs();
  };

  // ✅ RESUMMARIZE
  const resummarizeDoc = async (docId) => {
    await API.post(`/documents/resummarize/${docId}`);
    fetchDocs();
  };

  const submitComment = async (docId) => {
    if (!commentText.trim()) return;

    await API.post(`/documents/${docId}/comment`, {
      comment: commentText
    });

    setCommentText("");
    fetchDocs();
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>{user?.role?.toUpperCase()} DASHBOARD</h2>

        {user?.role !== "reviewer" && (
          <button onClick={() => navigate("/upload")}>
            ⬆ Upload Document
          </button>
        )}
      </div>

      {docs.length === 0 && (
        <p style={{ textAlign: "center", marginTop: "40px" }}>
          No documents available
        </p>
      )}

      {docs.map(doc => {
        const idx = versionIndex[doc._id] ?? 0;
        const v = doc.versions?.[idx];
        if (!v) return null;

        return (
          <div key={doc._id} className="doc-card">
            <h3>{doc.title}</h3>
            <p>Owner: {doc.owner?.name}</p>
            <p><b>Version {v.versionNumber}</b></p>

            <div className="version-nav">
              <button disabled={idx === 0} onClick={() => prevVersion(doc._id)}>
                ⏮ Prev
              </button>
              <button
                disabled={idx === doc.versions.length - 1}
                onClick={() => nextVersion(doc._id, doc.versions.length - 1)}
              >
                ⏭ Next
              </button>
            </div>

            <div className="summary-box">
              <ul>
                {v.summary.map((s, i) => (
                  <li key={i}>• {s}</li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => {
                const p = v.fileUrl.replace(/^\/+/, "");
                window.open(`http://localhost:5000/${p}`, "_blank");
              }}
            >
              📄 View Document
            </button>

            {/* ✅ RESUMMARIZE BUTTON (ADMIN + USER) */}
            {(user.role === "admin" || doc.owner?._id === user._id) && (
              <button onClick={() => resummarizeDoc(doc._id)}>
                🔄 Resummarize
              </button>
            )}

            {(user.role === "admin" || doc.owner?._id === user._id) && (
              <>
                <button onClick={() => deleteVersion(doc._id, v.versionNumber)}>
                  🗑 Delete Version
                </button>
                <button onClick={() => deleteDocument(doc._id)}>
                  ❌ Delete Document
                </button>
              </>
            )}

            {/* ===== REVIEWER COMMENT ===== */}
            {user.role === "reviewer" && (
              <div className="comment-box">
                <textarea
                  placeholder="Add review comment..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                />
                <button onClick={() => submitComment(doc._id)}>
                  💬 Submit Comment
                </button>
              </div>
            )}

            {/* ===== VIEW COMMENTS ===== */}
            {(user.role === "admin" || user.role === "user") && (
              <>
                <button
                  onClick={() =>
                    setShowComments(p => ({
                      ...p,
                      [doc._id]: !p[doc._id]
                    }))
                  }
                >
                  👁 View Comments
                </button>

                {showComments[doc._id] && (
                  <div className="comment-view">
                    {doc.comments?.length === 0 && <p>No comments yet</p>}
                    {doc.comments?.map((c, i) => (
                      <p key={i}>• {c.comment}</p>
                    ))}
                  </div>
                )}
              </>
            )}

            <DocumentChatbot documentId={doc._id} />
          </div>
        );
      })}
    </div>
  );
}
