const { searchBooks } = require("../services/bookService");
const { generateSummary } = require("../services/geminiService");

async function getBooks(req, res) {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({ error: "Query is required" });
    }

    const books = await searchBooks(q);

    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getBookSummary(req, res) {
  try {
    const book = req.body;

    if (!book || !book.title || !book.description) {
      return res.status(400).json({ error: "Invalid book data" });
    }

    const summary = await generateSummary(book);

    res.json({ summary });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { getBooks, getBookSummary };