const express = require("express");
const router = express.Router();
const AuditLog = require("../models/AuditLog");
const { protect } = require("../middleware/authMiddleware");

router.get("/:docId", protect, async (req, res) => {
  const logs = await AuditLog.find({ document: req.params.docId })
    .populate("user", "name role")
    .sort({ createdAt: -1 });

  res.json(logs);
});

module.exports = router;
