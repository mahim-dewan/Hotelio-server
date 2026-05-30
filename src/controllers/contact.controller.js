// src/controllers/contact.controller.js

const Contact = require("../models/contact.model");
const { createContactMessageService } = require("../services/contact.service");

const createContactMessage = async (req, res, next) => {
  try {
    const savedMessage = await createContactMessageService(req?.body);

    // 3. Send successful response
    return res.status(201).json({
      success: true,
      message: "Your message has been received successfully!",
      data: savedMessage,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { createContactMessage };
