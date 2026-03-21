require("dotenv").config();
const app = require("./app");
const pool = require("./src/config/db");

const PORT = process.env.PORT || 8080;

async function initDb() {
  await pool.query("SELECT NOW()");
  await createTables();
}

async function createTables() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS books (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      author TEXT NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `);
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      is_verified BOOLEAN DEFAULT FALSE,
      otp_hash TEXT,
      otp_expires_at TIMESTAMPTZ,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `);
}

async function start() {
  try {
    await initDb();
    console.log("DB ready");
    app.listen(PORT, () => {
      console.log(`Server listening on ${PORT}`);
    });
  } catch (err) {
    console.error("Startup error:", err.message);
    process.exit(1);
  }
}

start();
