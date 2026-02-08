const mongoose = require("mongoose");

const auditSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  document: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Document"
  },
  action: String,
  meta: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("AuditLog", auditSchema);
