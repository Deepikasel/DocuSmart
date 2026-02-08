


const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    document: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Document"
    },
    action: String,
    details: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("Activity", activitySchema);
