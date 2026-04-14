const express = require("express");
const {
  createBooking,
  getBookingsByUser,
  cancelBookingByUser,
} = require("../controllers/booking.controller");
const validate = require("../middlewares/validate.middleware");
const { bookingValidator } = require("../validators/booking.validator");

const bookingRouter = express.Router();

bookingRouter.post("/", validate(bookingValidator), createBooking);
bookingRouter.get("/getBookingsByUser", getBookingsByUser);
bookingRouter.patch("/:id/cancel", cancelBookingByUser);

module.exports = bookingRouter;
