const pool = require("../config/db");
const bcrypt = require("bcryptjs");

const findUserByEmail = async (email) => {
  const result = await pool.query(
    "SELECT id, name, email, password_hash, is_verified, otp_hash, otp_expires_at FROM users WHERE email = $1",
    [email]
  );
  return result.rows[0];
};

const createUser = async ({ name, email, passwordHash, otpHash, otpExpiresAt }) => {
  const result = await pool.query(
    `
    INSERT INTO users (name, email, password_hash, otp_hash, otp_expires_at)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id, name, email, is_verified, created_at
    `,
    [name, email, passwordHash, otpHash, otpExpiresAt]
  );
  return result.rows[0];
};

const updateUserOtp = async ({ email, otpHash, otpExpiresAt }) => {
  const result = await pool.query(
    `
    UPDATE users
    SET otp_hash = $1, otp_expires_at = $2
    WHERE email = $3
    RETURNING id, name, email, is_verified, created_at
    `,
    [otpHash, otpExpiresAt, email]
  );
  return result.rows[0];
};

const markUserVerified = async (email) => {
  const result = await pool.query(
    `
    UPDATE users
    SET is_verified = TRUE, otp_hash = NULL, otp_expires_at = NULL
    WHERE email = $1
    RETURNING id, name, email, is_verified
    `,
    [email]
  );
  return result.rows[0];
};

const comparePassword = async (password, passwordHash) => {
  return bcrypt.compare(password, passwordHash);
};

const hashPassword = async (password) => {
  return bcrypt.hash(password, 10);
};

module.exports = {
  findUserByEmail,
  createUser,
  updateUserOtp,
  markUserVerified,
  comparePassword,
  hashPassword,
};
