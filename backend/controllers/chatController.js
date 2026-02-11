const Document = require("../models/Document");

// ================= ASK CHATBOT =================
exports.askChatbot = async (req, res) => {
  try {
    const { documentId, question } = req.body;

    const doc = await Document.findById(documentId).populate("owner", "name");
    if (!doc) return res.status(404).json({ message: "Document not found" });

    const latest = doc.versions.at(-1);

    const suggestedQuestions = [
      "What is this document about?",
      "Give me a short summary",
      "Who created this document?",
      "Which version is this?",
      "What are the key points?"
    ];

    // FIRST LOAD (no question)
    if (!question) {
      return res.json({
        answer: `Hi 👋  
I can help you understand this document.

Choose a question below 👇`,
        suggestedQuestions
      });
    }

    const q = question.toLowerCase();
    let answer = "";

    if (q.includes("summary")) {
      answer = latest.summary.join("\n• ");
    } 
    else if (q.includes("about")) {
      answer = latest.summary.slice(0, 2).join(" ");
    } 
    else if (q.includes("creator")) {
      answer = `This document was created by ${doc.owner?.name}`;
    } 
    else if (q.includes("version")) {
      answer = `You are viewing version ${latest.versionNumber}`;
    } 
    else if (q.includes("key")) {
      answer = latest.summary.join("\n• ");
    } 
    else {
      answer = "Please select one of the suggested questions.";
    }

    res.json({
      answer,
      suggestedQuestions
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Chatbot error" });
  }
};
