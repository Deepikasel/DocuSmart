const express = require("express");
const router = express.Router();

const {
  uploadDocument,
  getDocuments,
  getDocumentById,
  resummarize,
  deleteDocument,
  deleteDocumentVersion
} = require("../controllers/documentController");


// ✅ FIX IS HERE (authMiddleware, NOT auth)
const protect = require("../middleware/authMiddleware");

const upload = require("../middleware/upload");

/* ROUTES */
router.post("/", protect, upload.single("file"), uploadDocument);
router.get("/", protect, getDocuments);
router.get("/:id", protect, getDocumentById);
router.post("/resummarize/:id", protect, resummarize);
router.delete(
  "/:id/version/:versionNumber",
  protect,
  deleteDocumentVersion
);

router.delete("/:id", protect, deleteDocument);

module.exports = router;
