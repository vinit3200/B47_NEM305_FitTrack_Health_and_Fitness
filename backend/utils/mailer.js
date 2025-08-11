let nodemailer = require('nodemailer');
require('dotenv').config();

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
});

async function sendWelcomeEmail(to, username){
  await transporter.sendMail({
    from: `"FitTrack" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Welcome to FitTrack",
    html: `<h3>Welcome ${username || ''}!</h3><p>Thanks for joining FitTrack 👟</p>`
  }).catch(err => console.error("Mail error:", err.message));
}

module.exports = { sendWelcomeEmail };
