// src/validators/auth.schema.js

const Joi = require("joi");
const { nameField, emailField, passwordField, otpField } = require("./fields");

// User Register Schema
const userRegistrationSchema = Joi.object({
  name: nameField,
  email: emailField,
  password: passwordField,
}).options({
  abortEarly: false,
});

// Verify Register Schema
const verifyRegisterSchema = Joi.object({
  name: nameField,
  email: emailField,
  password: passwordField,
  otp: otpField,
}).options({ abortEarly: false });

// Reset Password Schema
const resetPasswordSchema = Joi.object({
  email: emailField,
  otp: otpField,
  password: passwordField,
}).options({ abortEarly: false });

module.exports = {
  userRegistrationSchema,
  verifyRegisterSchema,
  resetPasswordSchema,
};
