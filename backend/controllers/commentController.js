const Comment = require("../models/Comment");

/* REVIEWER ADD COMMENT */
exports.addComment = async (req, res) => {
  try {
    const { documentId, versionNumber, text } = req.body;

    const comment = await Comment.create({
      document: documentId,
      versionNumber,
      text,
      user: req.user._id
    });

    res.status(201).json(comment);
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
