require("dotenv").config();
const app = require("./app");
const pool = require("./src/config/db");

const PORT = process.env.PORT || 3000;

async function initDb() {
  await pool.query("SELECT NOW()");
  await pool.query(`
    CREATE TABLE IF NOT EXISTS books (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      author TEXT NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `);
}

async function start() {
  try {
    await initDb();
    console.log("✅ DB ready");
    app.listen(PORT, () => {
      console.log(`✅ Server listening on ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Startup error:", err.message);
    process.exit(1);
  }
}

start();
