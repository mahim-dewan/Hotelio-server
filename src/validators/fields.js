// src/validators/fields.js

const Joi = require("joi");

const nameField = Joi.string().trim().min(2).max(30).required().messages({
  "string.empty": "Name is required",
  "string.min": "Name must be at least 2 characters long",
  "string.min": "Name must be at most 30 characters long",
});

const emailField = Joi.string()
  .trim()
  .lowercase()
  .email({ tlds: { allow: false } })
  .required()
  .messages({
    "string.empty": "Email is required",
    "string.email": "Please enter a valid email",
  });

const passwordField = Joi.string()
  .min(8)
  .max(128)
  .pattern(/^(?=.*[A-Za-z])(?=.*\d).{8,}$/)
  .required()
  .messages({
    "string.min": "Password must be at least 8 characters long",
    "string.pattern.base":
      "Password must contain at least one letter and one number",
    "string.empty": "Password is required",
  });

const otpField = Joi.string().trim().length(6).required().messages({
  "string.empty": "OTP is required",
  "string.min": "OTP must be at least 2 characters long",
  "string.min": "OTP must be at most 30 characters long",
});

module.exports = {
  nameField,
  emailField,
  passwordField,
  otpField,
};
