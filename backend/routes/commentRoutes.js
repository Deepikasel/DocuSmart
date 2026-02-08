const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

const {
  addComment,
  getCommentsByDocument
} = require("../controllers/commentController");

router.post("/", protect, addComment);
router.get("/:documentId", protect, getCommentsByDocument);

module.exports = router;
