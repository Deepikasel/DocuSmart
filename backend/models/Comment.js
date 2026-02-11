const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  document: { type: mongoose.Schema.Types.ObjectId, ref: "Document" },
  versionNumber: Number,
  text: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

module.exports = mongoose.model("Comment", commentSchema);
