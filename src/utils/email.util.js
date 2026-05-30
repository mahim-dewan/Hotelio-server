// src/utils/email.util.js

const { response } = require("express");
const ApiError = require("./apiError");

const sendOtp = async ({ to, subject, template }) => {
  const apiKey = process.env.BREVO_API_KEY;
  const data = {
    sender: { name: "Hotelio", email: "mahimdewan79@gmail.com" },
    to: [{ email: to }],
    subject: subject,
    htmlContent: template,
  };

  try {
    await fetch(`https://api.brevo.com/v3/smtp/email`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        accept: "application/json",
        "api-key": apiKey,
        "content-type": "application/json",
      },
    });
  } catch (err) {
    console.error(`Email delivery failed to ${to}:`, err.message);
    throw ApiError(
      500,
      "Failed to send verification email. Please try again later.",
    );
  }
};

module.exports = { sendOtp };
