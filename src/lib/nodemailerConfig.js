// lib/transporter.js
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",     // ✅ explicit host
  port: 587,                 // ✅ TLS port
  secure: false,             // ✅ must be false for 587
  auth: {
    user: process.env.EMAIL_ADMIN,
    pass: process.env.EMAIL_PASS, // Gmail App Password
  },
});

export default transporter;