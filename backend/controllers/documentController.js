const fs = require("fs");
const path = require("path");
const Document = require("../models/Document");
const AuditLog = require("../models/AuditLog");
const { extractTextFromFile, summarizeText } = require("../utils/summarizer");

/* ================= UPLOAD ================= */
exports.uploadDocument = async (req, res) => {
  try {
    const file = req.file;
    const { title, description } = req.body;

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const extractedText = await extractTextFromFile(file.path);
    const summary = summarizeText(extractedText);

    const document = await Document.create({
      title,
      description,
      owner: req.user._id,
      versions: [
        {
          versionNumber: 1,
          fileName: file.originalname,
          fileUrl: `/uploads/${file.filename}`,
          summary,
          uploadedBy: req.user._id,
          uploadedAt: new Date()
        }
      ]
    });

    res.status(201).json(document);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Upload failed" });
  }
};

/* ================= GET ALL ================= */
exports.getDocuments = async (req, res) => {
  try {
    let docs;

    if (req.user.role === "admin" || req.user.role === "reviewer") {
      docs = await Document.find().sort({ createdAt: -1 });
    } else {
      docs = await Document.find({ owner: req.user._id }).sort({ createdAt: -1 });
    }

    res.json(docs);
  } catch (err) {
    res.status(500).json({ message: "Fetch failed" });
  }
};

/* ================= GET ONE ================= */
exports.getDocumentById = async (req, res) => {
  try {
    const doc = await Document.findById(req.params.id);
    if (!doc) return res.status(404).json({ message: "Not found" });

    if (
      req.user.role !== "admin" &&
      req.user.role !== "reviewer" &&
      doc.owner.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    res.json(doc);
  } catch (err) {
    res.status(500).json({ message: "Fetch failed" });
  }
};

/* ================= RESUMMARIZE ================= */
exports.resummarize = async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);
    if (!document) return res.status(404).json({ message: "Not found" });

    if (
      document.owner.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const latest = document.versions.at(-1);

    const filePath = path.join(
      __dirname,
      "..",
      "uploads",
      path.basename(latest.fileUrl)
    );

    if (!fs.existsSync(filePath)) {
      return res.status(400).json({ message: "File missing on server" });
    }

    const extractedText = await extractTextFromFile(filePath);
    const summary = summarizeText(extractedText);

    const newVersion = {
      versionNumber: document.versions.length + 1,
      fileName: latest.fileName,
      fileUrl: latest.fileUrl,
      summary,
      uploadedBy: req.user._id,
      uploadedAt: new Date()
    };

    document.versions.push(newVersion);
    await document.save();

    res.json(newVersion);
  } catch (err) {
    res.status(500).json({ message: "Re-summarize failed" });
  }
};

/* ================= DELETE ================= */
exports.deleteDocument = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Admins only" });
    }

    await Document.findByIdAndDelete(req.params.id);
    res.json({ message: "Document deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
};
