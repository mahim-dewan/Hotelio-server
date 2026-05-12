// src/middlewares/error.middleware.js

function errorHandler(err, req, res, next) {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";
  let errors = err.errors || undefined;

  // Mongoose buffering timeout
  if (
    err.name === "MongooseError" &&
    err.message.includes("buffering timed out")
  ) {
    statusCode = 503;
    message = "Something went wrong. Please try again in a moment.";
  }

  if (err.message.includes("ENOTFOUND")) {
    statusCode = 500;
    message = "Database connection failed.";
  }

  res.status(statusCode).json({
    success: false,
    message,
    errors,
  });
}

module.exports = errorHandler;
