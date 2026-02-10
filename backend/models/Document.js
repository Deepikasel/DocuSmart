const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  text: String,
  versionNumber: Number,
  createdAt: { type: Date, default: Date.now }
});

const versionSchema = new mongoose.Schema({
  versionNumber: Number,
  fileName: String,
  fileUrl: String,
  fileHash: String,
  summary: String,
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  uploadedAt: { type: Date, default: Date.now },
  comments: [commentSchema]
});

const documentSchema = new mongoose.Schema(
  {
    title: String,
    description: String,

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    fullText: String,

    sharedWith: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
      }
    ],

    shareToken: String,
    shareExpiresAt: Date,

    versions: [versionSchema]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Document", documentSchema);
