const pool = require("../config/db");

const createBookmark = async (req, res) => {
  const { book_id, title, thumbnail } = req.body;
  const user_id = req.user.id;

  if (!book_id || !title) {
    return res.status(400).json({ error: "book_id and title are required" });
  }

  try {
    const result = await pool.query(
      "INSERT INTO saved_books (user_id, book_id, title, thumbnail) VALUES ($1, $2, $3, $4) RETURNING *",
      [user_id, book_id, title, thumbnail]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    // console.log(err);
    // console.log(err.code);
    
    if (err.code === "23505") {
      // unique_user_book constraint
      return res.status(400).json({ error: "Book already bookmarked" });
    }
    console.error("Error creating bookmark:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteBookmark = async (req, res) => {
  const { id } = req.params;
  const user_id = req.user.id;

  try {
    const result = await pool.query(
      "DELETE FROM saved_books WHERE id = $1 AND user_id = $2 RETURNING *",
      [id, user_id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Bookmark not found or unauthorized" });
    }

    res.json({ message: "Bookmark deleted successfully" });
  } catch (err) {
    console.error("Error deleting bookmark:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getBookmarks = async (req, res) => {
  const user_id = req.user.id;

  try {
    const result = await pool.query(
      "SELECT * FROM saved_books WHERE user_id = $1",
      [user_id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching bookmarks:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createBookmark,
  deleteBookmark,
  getBookmarks,
};
