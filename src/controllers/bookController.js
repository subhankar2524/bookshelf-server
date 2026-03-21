const { searchBooks } = require("../services/bookService");

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

module.exports = { getBooks };