const pool = require("../config/db");

exports.createBook = async (title, author) => {
  const result = await pool.query(
    "INSERT INTO books (title, author) VALUES ($1, $2) RETURNING *",
    [title, author]
  );
  return result.rows[0];
};

exports.getBooks = async () => {
  const result = await pool.query("SELECT * FROM books ORDER BY id DESC");
  return result.rows;
};