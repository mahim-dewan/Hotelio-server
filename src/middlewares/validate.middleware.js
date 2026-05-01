// src/middlewares/validate.middleware.js

const ApiError = require("../utils/apiError");

const validate = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    throw ApiError(
      400,
      "Validation Error",
      error.details.map((err) => err.message.replace(/"/g, "")),
    );
  }

  req.body = value;
  next();
};

module.exports = validate;
