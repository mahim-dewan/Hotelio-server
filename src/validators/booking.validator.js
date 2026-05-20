// src/validators/booking.validator.js

const Joi = require("joi");

const today = new Date();
today.setHours(0, 0, 0, 0);

const bookingValidator = Joi.object({
  room: Joi.string().length(24).hex().required().messages({
    "string.base": "Room ID must be a string",
    "string.length": "Room ID must be a valid MongoDB ObjectId",
    "string.hex": "Room ID must be a valid hex value",
    "any.required": "Room ID is required",
  }),

  checkIn: Joi.date().iso().required().min(today).messages({
    "date.base": "Check-in date must be a valid date.",
    "date.format": "Check-in date must be in YYYY-MM-DD format.",
    "date.iso": "Check-in date must be in YYYY-MM-DD format.",
    "date.min": "Check-in date cannot be before today.",
    "any.required": "Check-in date is required.",
  }),

  checkOut: Joi.date().iso().greater(Joi.ref("checkIn")).required().messages({
    "date.base": "Check-out date must be a valid date.",
    "date.format": "Check-out date must be in YYYY-MM-DD format.",
    "date.iso": "Check-out date must be in YYYY-MM-DD format.",
    "date.greater": "Check-out date must be after check-in date.",
    "any.required": "Check-out date is required.",
  }),
});

module.exports = { bookingValidator };
