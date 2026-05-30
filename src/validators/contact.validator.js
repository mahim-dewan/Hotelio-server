// src/validators/contact.validator.js

const Joi = require("joi");

const contactValidator = Joi.object({
  full_name: Joi.string().min(3).max(50).required().messages({
    "string.empty": "Full name is required.",
    "string.min": "Full name should be at least 3 characters long.",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Please provide a valid email address.",
    "string.empty": "Email is required.",
  }),
  category: Joi.string().min(3).max(30).required().messages({
    "string.empty": "Category is required.",
  }),
  message: Joi.string().min(10).max(1000).required().messages({
    "string.empty": "Message is required.",
    "string.min": "Message should be at least 10 characters long.",
  }),
});

module.exports = { contactValidator };
