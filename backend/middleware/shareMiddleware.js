const Document = require("../models/Document");

module.exports = async (req, res, next) => {
  const doc = await Document.findOne({
    shareToken: req.params.token,
    shareExpiresAt: { $gt: Date.now() }
  });

  if (!doc) {
    return res.status(403).json({ message: "Invalid or expired link" });
  }

  req.document = doc;
  next();
};
