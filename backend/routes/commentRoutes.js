const router = require("express").Router();
const protect = require("../middleware/authMiddleware");
const { addComment, getComments } = require("../controllers/commentController");

router.post("/", protect, addComment);
router.get("/:documentId", protect, getComments);

module.exports = router;
