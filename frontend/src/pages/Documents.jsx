import { useEffect, useState } from "react";
import API from "../api/axios";
import React from "react";
import '../styles/Documents.css'

export default function Documents() {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const fetchDocs = async () => {
      try {
        const res = await API.get("/documents");
        setDocuments(res.data || []);
      } catch (err) {
        alert("Failed to fetch documents");
      }
    };
    fetchDocs();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">All Documents</h1>

      <div className="flex flex-col gap-3">
        {documents.map((doc) => (
          <div key={doc._id} className="border p-4 rounded shadow-sm">
            <p><strong>Title:</strong> {doc.title || "Untitled"}</p>
            <p><strong>Description:</strong> {doc.description || "—"}</p>

            <p>
              <strong>Owner:</strong>{" "}
              {doc.owner?.name || "You"}
            </p>

            <p>
              <strong>Versions:</strong>{" "}
              {doc.versions?.length || 0}
            </p>

            <p>
              <strong>Comments:</strong>{" "}
              {doc.comments?.length || 0}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
