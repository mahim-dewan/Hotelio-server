const Joi = require("joi");

const makePaymentValidator = Joi.object({
  bookingId: Joi.string().min(1).required().messages({
    "any.required": "Booking ID is required",
    "string.empty": "Booking ID cannot be empty",
  }),

  currency: Joi.string().valid("BDT", "USD").required().messages({
    "any.only": "Currency must be BDT or USD",
    "any.required": "Currency is required",
  }),

  paymentPercentage: Joi.number().valid(50, 100).required().messages({
    "any.only": "Payment percentage must be 50 or 100",
    "any.required": "Payment percentage is required",
  }),
});

module.exports = { makePaymentValidator };
