const express = require("express");
const { createBooking } = require("../controllers/booking.controller");
const validate = require("../middlewares/validate.middleware");
const { bookingValidator } = require("../validators/booking.validator");

const bookingRouter = express.Router();

bookingRouter.post("/", validate(bookingValidator), createBooking);

module.exports = bookingRouter;
