const Document = require("../models/Document");
const fs = require("fs");
const path = require("path");
const { extractText, generateSummaryFromText } = require("../utils/summarizer");

/* ================= UPLOAD DOCUMENT ================= */
exports.uploadDocument = async (req, res) => {
  try {
    const filePath = path.join(__dirname, "..", "uploads", req.file.filename);
    const content = await extractText(filePath);
    const summary = generateSummaryFromText(content);

    const doc = await Document.create({
      title: req.body.title,
      description: req.body.description,
      owner: req.user._id,
      versions: [
        {
          versionNumber: 1,
          fileUrl: `uploads/${req.file.filename}`,
          summary
        }
      ]
    });

    res.status(201).json(doc);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================= GET DOCUMENTS ================= */
exports.getDocuments = async (req, res) => {
  try {
    let query = {};

    // ✅ Admin & Reviewer → see ALL documents
    if (req.user.role === "user") {
      query = { owner: req.user._id };
    }

    const docs = await Document.find(query)
      .populate("owner", "name role")
      .sort({ createdAt: -1 });

    res.json(docs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================= RESUMMARIZE ================= */
exports.resummarize = async (req, res) => {
  try {
    const doc = await Document.findById(req.params.id);
    const last = doc.versions.at(-1);

    const filePath = path.join(__dirname, "..", last.fileUrl);
    const content = await extractText(filePath);
    const summary = generateSummaryFromText(content);

    doc.versions.push({
      versionNumber: last.versionNumber + 1,
      fileUrl: last.fileUrl,
      summary
    });

    await doc.save();
    res.json({ message: "Resummarized successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================= DELETE VERSION ================= */
exports.deleteDocumentVersion = async (req, res) => {
  try {
    const doc = await Document.findById(req.params.id);

    doc.versions = doc.versions.filter(
      v => v.versionNumber !== Number(req.params.versionNumber)
    );

    await doc.save();
    res.json({ message: "Version deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================= DELETE DOCUMENT ================= */
exports.deleteDocument = async (req, res) => {
  try {
    const doc = await Document.findById(req.params.id);

    doc.versions.forEach(v => {
      const p = path.join(__dirname, "..", v.fileUrl);
      if (fs.existsSync(p)) fs.unlinkSync(p);
    });

    await doc.deleteOne();
    res.json({ message: "Document deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
/* ================= ADD REVIEWER COMMENT ================= */
exports.addComment = async (req, res) => {
  try {
    if (req.user.role !== "reviewer") {
      return res.status(403).json({ message: "Only reviewers can comment" });
    }

    const doc = await Document.findById(req.params.id);

    doc.comments.push({
      reviewer: req.user._id,
      comment: req.body.comment
    });

    await doc.save();
    res.json({ message: "Comment added" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
