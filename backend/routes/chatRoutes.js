const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const { askChatbot } = require("../controllers/chatController");

router.post("/ask", auth, askChatbot);

module.exports = router;
