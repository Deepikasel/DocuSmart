import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import FullDocumentModal from "../components/FullDocumentModal";

export default function DocumentDetails() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [doc, setDoc] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    const res = await API.get(`/documents/${id}`);
    setDoc(res.data);
  };

  useEffect(() => {
    load();
  }, [id]);

  if (!doc) return <p>Loading...</p>;

  const latest = doc.versions[doc.versions.length - 1];

  const resummarize = async () => {
    setLoading(true);
    await API.post(`/documents/resummarize/${doc._id}`);
    await load();
    setLoading(false);
  };

  return (
    <div className="doc-details">
      <h2>{doc.title}</h2>
      <p>{doc.description}</p>

      <div className="doc-card">
        <h3>Summary (Version {latest.versionNumber})</h3>
        <p>{latest.summary}</p>

        <button onClick={() => setOpen(true)}>
          📄 View Full Document
        </button>

        {(user.role === "admin" || user._id === doc.owner) && (
          <button onClick={resummarize} disabled={loading}>
            🔄 {loading ? "Re-Summarizing..." : "Re-Summarize"}
          </button>
        )}
      </div>

      <FullDocumentModal
  open={open}
  onClose={() => setOpen(false)}
  fileUrl={`http://localhost:5000${latest.fileUrl}`}
/>

    </div>
  );
}
