const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  documentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Document",
  },
  messages: [
    {
      from: String,
      text: String,
      createdAt: { type: Date, default: Date.now }
    }
  ]
});

module.exports = mongoose.model("ChatHistory", chatSchema);
