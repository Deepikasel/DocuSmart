const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const Document = require("../models/Document");

/* ================= ADD COMMENT ================= */
router.post("/", protect, async (req, res) => {
  try {
    const { documentId, versionNumber, text } = req.body;

    const doc = await Document.findById(documentId);
    if (!doc) {
      return res.status(404).json({ message: "Document not found" });
    }

    const version = doc.versions.find(
      v => v.versionNumber === versionNumber
    );

    if (!version) {
      return res.status(404).json({ message: "Version not found" });
    }

    version.comments.push({
      user: req.user._id,
      text,
      versionNumber
    });

    await doc.save();

    res.status(201).json({ message: "Comment added successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Comment failed" });
  }
});

/* ================= GET COMMENTS ================= */
router.get("/:documentId", protect, async (req, res) => {
  try {
    const doc = await Document.findById(req.params.documentId)
      .populate("versions.comments.user", "name role");

    if (!doc) {
      return res.status(404).json({ message: "Document not found" });
    }

    if (
      req.user.role !== "admin" &&
      req.user.role !== "reviewer" &&
      doc.owner.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const comments = doc.versions.flatMap(v =>
      v.comments.map(c => ({
        _id: c._id,
        text: c.text,
        user: c.user,
        versionNumber: v.versionNumber,
        createdAt: c.createdAt
      }))
    );

    res.json(comments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Fetch comments failed" });
  }
});

module.exports = router;
