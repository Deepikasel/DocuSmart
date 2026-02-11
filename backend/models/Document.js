const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  reviewer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  comment: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const versionSchema = new mongoose.Schema({
  versionNumber: Number,
  fileUrl: String,
  summary: {
    type: [String],
    default: []
  }
});

const documentSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    versions: [versionSchema],
    comments: [commentSchema] // ✅ NEW
  },
  { timestamps: true }
);

module.exports = mongoose.model("Document", documentSchema);
