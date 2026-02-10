const Document = require("../models/Document");

/* REVIEWER ADD COMMENT */
exports.addComment = async (req, res) => {
  try {
    const { documentId, versionNumber, text } = req.body;

    const doc = await Document.findById(documentId);
    if (!doc) {
      return res.status(404).json({ message: "Document not found" });
    }

    // find version
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

    res.status(201).json({ message: "Comment added" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Comment failed" });
  }
};

/* ADMIN VIEW COMMENTS */
exports.getCommentsByDocument = async (req, res) => {
  try {
    const comments = await Comment.find({
      document: req.params.documentId
    })
      .populate("user", "name role")
      .sort({ createdAt: -1 });

    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: "Fetch comments failed" });
  }
};
