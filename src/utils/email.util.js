const resend = require("../config/resend");
const ApiError = require("./apiError");

const sendOtp = async ({ to, subject, template }) => {
  try {
    await resend.emails.send({
      from: `Email Verificaton <no-reply@resend.dev>`,
      to: to,
      subject,
      html: template,
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
