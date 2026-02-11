const Comment = require("../models/Comment");

exports.addComment = async (req, res) => {
  const comment = await Comment.create({
    document: req.body.documentId,
    versionNumber: req.body.versionNumber,
    text: req.body.text,
    user: req.user._id
  });
  res.status(201).json(comment);
};

exports.getComments = async (req, res) => {
  const comments = await Comment.find({
    document: req.params.documentId
  }).populate("user", "name");
  res.json(comments);
};
