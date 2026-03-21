const nodemailer = require('nodemailer');

const createTransporter = () => {
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || '0', 10);
  const secure = process.env.SMTP_SECURE === 'true';
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !port) {
    throw new Error('SMTP_HOST and SMTP_PORT must be set');
  }

  const transportOptions = {
    host,
    port,
    secure
  };

  if (user || pass) {
    transportOptions.auth = { user, pass };
  }

  return nodemailer.createTransport(transportOptions);
};

const sendOtpEmail = async ({ to, otp }) => {
  const transporter = createTransporter();
  const from = process.env.EMAIL_FROM || process.env.SMTP_USER || 'no-reply@bookshelf.in';

  const subject = 'Your Bookshelf verification code';
  const text = `Your verification code is ${otp}. It expires soon.`;

  try {
    await transporter.sendMail({ from, to, subject, text });
  } catch (err) {
    console.error(`Failed to send OTP: ${err.message}`);
    throw err;
  }
};

module.exports = { sendOtpEmail };
