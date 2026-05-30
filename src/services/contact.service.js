// src/services/contact.service.js

const Contact = require("../models/contact.model");

// Create a new contact message service
const createContactMessageService = async (data) => {
  // 1. Destructure validated data
  const { full_name, email, category, message } = data;

  // 2. Create and save the new contact message
  const newMessage = new Contact({
    full_name,
    email,
    category,
    message,
  });

  return await newMessage.save();
};

module.exports = { createContactMessageService };
