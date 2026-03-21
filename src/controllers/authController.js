const jwt = require("jsonwebtoken");
const authService = require("../services/authService");
const { generateOtp, hashOtp, compareOtp } = require("../utils/otp");
const { sendOtpEmail } = require("../utils/mailer");

const buildToken = (user) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET must be set");
  }

  const payload = { id: user.id, email: user.email, name: user.name };
  const expiresIn = process.env.JWT_EXPIRES_IN || "7d";
  return jwt.sign(payload, secret, { expiresIn });
};

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "name, email, and password are required" });
    }

    const existing = await authService.findUserByEmail(email);
    if (existing) {
      if (existing.is_verified) {
        return res.status(409).json({ error: "User already exists" });
      }

      const otp = generateOtp();
      const otpHash = await hashOtp(otp);
      const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);

      await authService.updateUserOtp({ email, otpHash, otpExpiresAt });
      await sendOtpEmail({ to: email, otp });

      return res.status(200).json({
        message: "Verification code resent. Please verify your email.",
      });
    }

    const passwordHash = await authService.hashPassword(password);
    const otp = generateOtp();
    const otpHash = await hashOtp(otp);
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);

    const user = await authService.createUser({
      name,
      email,
      passwordHash,
      otpHash,
      otpExpiresAt,
    });

    await sendOtpEmail({ to: email, otp });

    res.status(201).json({
      message: "Signup successful. Please verify your email.",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        is_verified: user.is_verified,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.verify = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({ error: "email and otp are required" });
    }

    const user = await authService.findUserByEmail(email);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.is_verified) {
      const token = buildToken(user);
      return res.status(200).json({ message: "Already verified", token });
    }

    if (!user.otp_hash || !user.otp_expires_at) {
      return res.status(400).json({ error: "No active verification code" });
    }

    const isExpired = new Date(user.otp_expires_at).getTime() < Date.now();
    if (isExpired) {
      return res.status(400).json({ error: "Verification code expired" });
    }

    const isValid = await compareOtp(otp, user.otp_hash);
    if (!isValid) {
      return res.status(400).json({ error: "Invalid verification code" });
    }

    const verifiedUser = await authService.markUserVerified(email);
    const token = buildToken(verifiedUser);

    return res.status(200).json({
      message: "Email verified successfully",
      token,
      user: {
        id: verifiedUser.id,
        name: verifiedUser.name,
        email: verifiedUser.email,
        is_verified: verifiedUser.is_verified,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "email and password are required" });
    }

    const user = await authService.findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const passwordOk = await authService.comparePassword(
      password,
      user.password_hash
    );
    if (!passwordOk) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    if (!user.is_verified) {
      return res.status(403).json({ error: "Email not verified" });
    }

    const token = buildToken(user);

    res.status(200).json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        is_verified: user.is_verified,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
