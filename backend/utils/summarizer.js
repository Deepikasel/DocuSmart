const fs = require("fs");
const path = require("path");
const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");

/**
 * Extract FULL text from file
 */
async function extractTextFromFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();

  if (ext === ".pdf") {
    const buffer = fs.readFileSync(filePath);
    const data = await pdfParse(buffer);
    return data.text || "";
  }

  if (ext === ".docx") {
    const result = await mammoth.extractRawText({ path: filePath });
    return result.value || "";
  }

  return "";
}

/**
 * REAL NLP-style summary (frequency based)
 */
function summarizeText(text, maxSentences = 6) {
  if (!text || text.length < 300) {
    return "Summary not available";
  }

  const sentences = text
    .replace(/\n+/g, " ")
    .match(/[^.!?]+[.!?]/g);

  if (!sentences) return "Summary not available";

  const freq = {};
  text
    .toLowerCase()
    .replace(/[^a-z ]/g, "")
    .split(" ")
    .forEach(word => {
      if (word.length > 4) {
        freq[word] = (freq[word] || 0) + 1;
      }
    });

  const scored = sentences.map(s => {
    let score = 0;
    s.toLowerCase().split(" ").forEach(w => {
      score += freq[w] || 0;
    });
    return { s, score };
  });

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, maxSentences)
    .map(x => x.s)
    .join(" ");
}

module.exports = { extractTextFromFile, summarizeText };
