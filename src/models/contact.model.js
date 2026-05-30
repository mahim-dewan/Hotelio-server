// src/models/contact.model.js

const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    full_name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true },
);

const Contact =
  mongoose.models.Contact || mongoose.model("Contact", contactSchema);
module.exports = Contact;
