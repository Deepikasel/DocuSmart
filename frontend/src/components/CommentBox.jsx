import { useState } from "react";
import API from "../api/axios";

export default function CommentBox({ documentId, versionNumber }) {
  const [text, setText] = useState("");

  const submit = async () => {
    await API.post("/comments", {
      documentId,
      versionNumber,
      text
    });
    setText("");
  };

  return (
    <div>
      <textarea
        placeholder="Add reviewer comment..."
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button onClick={submit}>💬 Comment</button>
    </div>
  );
}
