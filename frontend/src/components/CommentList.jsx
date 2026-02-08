import { useEffect, useState } from "react";
import API from "../api/axios";

export default function CommentList({ documentId }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    API.get(`/comments/${documentId}`)
      .then(res => setComments(res.data));
  }, [documentId]);

  return (
    <div>
      {comments.map(c => (
        <p key={c._id}>
          <strong>{c.reviewer.name}:</strong> {c.text}
        </p>
      ))}
    </div>
  );
}
