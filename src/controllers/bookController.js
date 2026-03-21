const bookService = require("../services/bookService");

exports.addBook = async (req, res) => {
  try {
    const { title, author } = req.body;

    const book = await bookService.createBook(title, author);

    res.status(201).json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllBooks = async (req, res) => {
  try {
    const books = await bookService.getBooks();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};