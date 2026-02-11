import React, { useEffect, useRef, useState } from "react";
import API from "../api/axios";
import "../styles/Chatbot.css";

export default function DocumentChatbot({ documentId }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [typing, setTyping] = useState(false);

  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  useEffect(() => {
    if (!open || messages.length > 0) return;

    (async () => {
      setTyping(true);
      const res = await API.post("/chat/ask", { documentId });
      setTyping(false);

      setMessages([{ from: "bot", text: res.data.answer }]);
      setSuggestions(res.data.suggestedQuestions);
    })();
  }, [open, documentId]);

  const ask = async (q) => {
    setMessages(p => [...p, { from: "user", text: q }]);
    setTyping(true);

    const res = await API.post("/chat/ask", {
      documentId,
      question: q
    });

    setTyping(false);
    setMessages(p => [...p, { from: "bot", text: res.data.answer }]);
    setSuggestions(res.data.suggestedQuestions);
  };

  return (
    <div className="doc-chatbot-wrapper">
      <button className="doc-chatbot-fab" onClick={() => setOpen(o => !o)}>
        🤖
      </button>

      {open && (
        <div className="doc-chatbot-panel">
          <div className="doc-chatbot-header">
            <span>DocuSmart Assistant</span>
            <button onClick={() => setOpen(false)}>✖</button>
          </div>

          <div className="doc-chatbot-messages">
            {messages.map((m, i) => (
              <div key={i} className={`bubble ${m.from}`}>
                {m.text}
              </div>
            ))}

            {typing && <div className="bubble bot">Typing...</div>}
            <div ref={chatEndRef} />
          </div>

          <div className="doc-chatbot-suggestions">
            {suggestions.map((s, i) => (
              <button key={i} onClick={() => ask(s)}>
                {s}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
