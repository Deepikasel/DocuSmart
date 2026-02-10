const Document = require("../models/Document");
const ChatHistory = require("../models/ChatHistory");

exports.askChatbot = async (req, res) => {
  try {
    const { documentId, question } = req.body;

    const doc = await Document.findById(documentId);
    if (!doc) return res.status(404).json({ message: "Document not found" });

    const latest = doc.versions.at(-1);

  const suggestions = [
  "📄 What is this document about?",
  "📝 Give me a short summary",
  "🏷️ What is the document title?",
  "📌 What is the purpose of this document?",
  "🕒 Which version is this?",
  "📅 When was it last updated?",
  "🔍 What are the key points?",
  "👤 Who created this document?"
];



    // 👉 First load (no question)
    if (!question) {
     const greeting = `Hi 👋 Welcome to DocuSmart!

I can help you understand this document 📄  
Just tap one of the questions below 👇`;


      return res.json({
        answer: greeting,
        suggestedQuestions: suggestions
      });
    }

    let answer = "";

    if (question.toLowerCase().includes("summary")) {
      answer = latest.summary;
    } else if (question.toLowerCase().includes("title")) {
      answer = doc.title;
    } else if (question.toLowerCase().includes("version")) {
      answer = `This is version ${latest.versionNumber}`;
    } else {
      answer = "Please choose a suggested question related to this document.";
    }

    // 💾 Save chat
    await ChatHistory.findOneAndUpdate(
      { documentId },
      {
        $push: {
          messages: [
            { from: "user", text: question },
            { from: "bot", text: answer }
          ]
        }
      },
      { upsert: true }
    );

    res.json({ answer, suggestedQuestions: suggestions });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Chatbot error" });
  }
};
