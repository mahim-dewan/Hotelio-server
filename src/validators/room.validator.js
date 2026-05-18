// src/validators/room.validator.js

const Joi = require("joi");

const roomValidator = Joi.object({
  image: Joi.string().uri().required(),

  gallery: Joi.array().items(Joi.string().uri()),

  category: Joi.string()
    .valid("standard", "deluxe", "suite", "luxury", "villa")
    .required(),

  title: Joi.string().min(3).max(100).trim().required(),

  description: Joi.string().min(10).required(),

  capacity: Joi.number().integer().min(1).required(),

  size: Joi.number().positive().required(),

  originalPrice: Joi.number().positive().required(),

  discountPercentage: Joi.number().min(0).max(100).optional(),

  isExclusive: Joi.boolean(),

  promoCode: Joi.string().allow(null, ""),

  aminities: Joi.array().items(Joi.string()),

  specifications: Joi.object({
    bedType: Joi.string().required(),
    view: Joi.string().required(),
    floor: Joi.string().required(),
    smoking: Joi.string().required(),
  }).required(),

  policies: Joi.object({
    checkIn: Joi.string().required(),
    checkOut: Joi.string().required(),
    cancellation: Joi.string().required(),
    pets: Joi.string().required(),
  }).required(),
});

module.exports = { roomValidator };
