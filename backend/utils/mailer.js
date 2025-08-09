let nodemailer = require('nodemailer');
require('dotenv').config();

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

let sendWelcomeEmail = async (toEmail, username) => {
  try {
    await transporter.sendMail({
      from: `"FitTrack Team" <${process.env.EMAIL_USER}>`,
      to: toEmail,
      subject: "Welcome to FitTrack!",
      html: `<h3>Hi ${username},</h3><p>Welcome to FitTrack! We're excited to be a part of your fitness journey.</p>`
    });
    console.log("Welcome email sent to", toEmail);
  } catch (err) {
    console.error("Email error:", err.message);
  }
};

module.exports = sendWelcomeEmail;
