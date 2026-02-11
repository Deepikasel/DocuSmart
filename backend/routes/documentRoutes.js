const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const auth = require("../middleware/authMiddleware");

const {
  uploadDocument,
  getDocuments,
  resummarize,
  deleteDocument,
  deleteDocumentVersion,
  addComment
} = require("../controllers/documentController");

router.post("/", auth, upload.single("file"), uploadDocument);
router.get("/", auth, getDocuments);
router.post("/resummarize/:id", auth, resummarize);
router.post("/:id/comment", auth, addComment); // ✅ NEW
router.delete("/:id", auth, deleteDocument);
router.delete("/:id/version/:versionNumber", auth, deleteDocumentVersion);

module.exports = router;
