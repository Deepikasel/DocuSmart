const fs = require("fs");
const path = require("path");
const pdfParse = require("pdf-parse");

async function extractText(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (!fs.existsSync(filePath)) return "";

  if (ext === ".pdf") {
    const buffer = fs.readFileSync(filePath);
    const data = await pdfParse(buffer);
    return data.text || "";
  }

  if (ext === ".txt") {
    return fs.readFileSync(filePath, "utf-8");
  }

  return "";
}

function generateSummaryFromText(text, maxPoints = 5) {
  if (!text.trim()) return ["No readable content found"];

  return text
    .replace(/\n+/g, " ")
    .split(".")
    .map(s => s.trim())
    .filter(s => s.length > 30)
    .slice(0, maxPoints);
}

module.exports = { extractText, generateSummaryFromText };
