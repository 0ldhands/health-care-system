const nodemailer = require('nodemailer');
require('dotenv').config();

// create reusable transporter object using SMTP transport configured via .env
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT || 587,
  secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// verify transporter configuration on startup (optional)
transporter.verify().then(() => {
  console.log('Mailer is ready to send messages');
}).catch(err => {
  console.error('Mailer configuration error:', err);
});

/**
 * Send an email.
 * @param {{to: string, subject: string, text?: string, html?: string}} options
 */
async function sendMail(options) {
  const mailOptions = {
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    ...options,
  };
  return transporter.sendMail(mailOptions);
}

module.exports = { sendMail };
